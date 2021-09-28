---
title: Spring全家桶之Spring5-AOP使用介绍
author: ITNXD
toc: true
abbrlink: 38615
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@7ac41d51c951f7f506f4b1742fd800727bef52be/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@7ac41d51c951f7f506f4b1742fd800727bef52be/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
categories:
  - 开发框架
tags:
  - Spring
  - AOP
date: 2021-03-26 09:09:56
updated:
---







# 一、AOP概述





## 1、概述



1. Aspect Oriented Programming，面向切面编程，利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。
2. 通俗描述：不通过修改源代码方式，在主干功能里面添加新功能







## 2、AOP底层原理



> 底层自然是通过**动态代理**实现的！





#### 2.1、JDK动态代理



> 有接口情况，使用 JDK 动态代理！



创建接口实现类代理对象，增强类的方法！







#### 2.2、CGLIB动态代理



> 没有接口情况，使用 CGLIB 动态代理！





创建子类的代理对象，增强类的方法！















# 二、JDK动态代理







## 1、创建接口，定义方法



```java
public interface UserDao {
    int add(int a, int b);
}
```





## 2、创建接口实现类，实现方法



```java
public class UserDaoImpl implements UserDao {

    @Override
    public int add(int a, int b) {
        System.out.println("add方法执行了！");
        return a + b;
    }
}
```





## 3、使用 Proxy 类创建接口代理对象



`public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)`：

- 参数一：类加载器，任何类都可，都是调用的系统类加载器
- 参数二：实现类接口，`Class[]`类型，即`xxxDao`，支持多个接口
- 参数三：`InvocationHandler`，实现这个接口 `InvocationHandler`，创建代理对象，写增强的部分





```java
public class JDKProxy {

    public static void main(String[] args) {

        // 创建接口实现类的代理对象！
        
        Class[] interfaces = {UserDao.class};
        /*Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                return null;
            }
        });*/

        // 类似：UserDao userDao = new UserDaoImpl();
        UserDao userDao = (UserDao) Proxy.newProxyInstance(JDKProxy.class.getClassLoader(),
                interfaces, new UserDaoProxy(new UserDaoImpl()));

        int res = userDao.add(2, 5);
        System.out.println(res);
    }
}
```





**代理对象UserDaoProxy类，实现InvocationHandler：**



- 将要被代理的类传递过来，通过有参构造传递，一般是接口的实现类
- 重写`invoke`方法，实现方法增强
- 可以通过`method.getName()`来判断传入的方法，进行区别对待，增强不同方法！
- `public Object invoke(Object obj, Object... args)`：
  - 参数一：调用增强方法的对象实现类对象`UserDaoImpl`
  - 参数二：增强方法add的参数



```java
public class UserDaoProxy implements InvocationHandler {


    // 假设要增强UserDaoImpl的add方法！


    /*
        1. 将要被代理的类传过来
            通过有参构造传递
    */
    private Object obj;
    
    public UserDaoProxy(Object obj){
        this.obj = obj;
    }

    /**
     * 增强方法的逻辑！
     *
     * 可以通过method.getName来判断传入的方法，进行区别对待，增强不同方法！
     *
     * @param proxy 代理对象
     * @param method 当前方法
     * @param args 参数
     * @return
     * @throws Throwable
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        // 方法之前：获取到当前增强方法的名称
        System.out.println("方法执行之前执行！" + " 方法名：" + method.getName() +
                " 参数：" + Arrays.toString(args));

        // 被增强的方法执行
        // 参数一：调用增强方法的对象实现类对象UserDaoImpl
        // 参数二：增强方法add的参数
        Object res = method.invoke(obj, args);

        // 方法之后
        System.out.println("方法执行之后执行！" + obj);

        return res;
    }
}
```





# 三、AOP相关术语







## 1、连接点





指的是类里面哪些方法可以被增强，这些方法就是连接点！















## 2、切入点





实际真正被增强的方法称为切入点！







## 3、通知







实际增强的逻辑部分称为通知！





**通知分类：**



1. 前置通知：执行目标方法之前运行
2. 后置通知：目标方法正常执行完之后执行
3. 环绕通知：目标方法前后分别执行，需要显式调用目标方法
4. 异常通知：目标方法出现异常执行
5. 最终通知：一定会执行











## 4、切面





是一个动作，将通知应用到切入点的过程！

人话：就是将增强的实现逻辑应用到需要被增强方法的过程！







# 四、AOP使用





## 1、导包







> 从下载的Spring5的包内找到下面几个包，导入即可！
>
> 图中几个两个com开头的包不在Spring5包内，需要额外下载！可以从名称看到，他的作用就是支持`CGLIB`！
>
> AspectJ 不是 Spring 组成部分，独立 AOP 框架，一般把 AspectJ 和 Spirng 框架一起使用，进行 AOP 操作！



**注意**：旧版本`com.springsource.org.aspectj.weaver-1.6.8.RELEASE.jar`会报错！新版JDK不兼容，要使用`aspectjweaver-1.9.6.jar`



**下载地址**：[https://mvnrepository.com/artifact/org.aspectj/aspectjweaver](https://mvnrepository.com/artifact/org.aspectj/aspectjweaver)





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4aacb9d5d4a472c859e56a82d87601ca79d2480d/2021/03/26/256df5fb1b081e1171c7e6c7fce32125.png)







## 2、切入点表达式





**切入点表达式作用**：知道对哪个类里面的哪个方法进行增强



**语法结构**： `execution([权限修饰符] [返回类型] [类全路径] [方法名称]([参数列表]) )`

- 权限修饰符可以省略，默认为`public`
- 返回类型可以使用通配符`*`表示
- 全类名和方法名也可使用通配符代替
- 参数列表，固定写法`(..)`



**注意点**：表示返回类型的`*`号后面一定要有一个空格



**几个例子：**



```java
execution(* com.atguigu.dao.BookDao.add(..))

execution(* com.atguigu.dao.BookDao.* (..))

execution(* com.atguigu.dao.*.* (..))
```





## 3、基于AspectJ 注解







#### 3.1、创建增强类和被增强类



- User



```java
public class User {
    public void add(){
        System.out.println("add().............");
    }
}
```



- UserProxy



```java
public class UserProxy {

    /**
     * 前置通知！
     */
    @Before(value = "execution(* com.atguigu.aop.anno.User.add(..))")
    public void before(){
        System.out.println("UserProxy.before()................");
    }
}
```



#### 3.2、具体步骤





1. 引入context名称空间，开启注解扫描
2. 使用注解创建User和UserProxy对象
3. 在增强类上面添加注解 `@Aspect`
4. 引入aop名称空间，在 spring 配置文件中开启生成代理对象
5. 配置不同类型的通知



**User：**



```java
@Component(value = "user")
public class User {
```







**UserProxy：**



> 在增强类的里面，在作为通知方法上面添加通知类型注解，使用切入点表达式配置！





1. 前置通知：执行目标方法之前运行
2. 后置通知：目标方法正常执行完之后执行
3. 环绕通知：目标方法前后分别执行，需要显式调用目标方法` proceedingJoinPoint.proceed()`
4. 异常通知：目标方法出现异常执行
5. 最终通知：一定会执行



```java
@Component // 生成代理对象
@Aspect // 生成代理对象！
public class UserProxy {



    /**
     * 前置通知！
     */
    @Before(value = "execution(* com.atguigu.aop.anno.User.add(..))")
    public void before(){
        System.out.println("UserProxy.before()................");
    }

    /**
     * 后置通知：正常返回会执行！
     */
    @AfterReturning(value = "execution(* com.atguigu.aop.anno.User.add(..))")
    public void afterReturning(){
        System.out.println("afterReturning()................");
    }

    /**
     * 最终通知：正常返回和抛异常都会执行！因此称之为最终通知！
     */
    @After(value = "execution(* com.atguigu.aop.anno.User.add(..))")
    public void after(){
        System.out.println("after()................");
    }

    /**
     * 异常通知：有异常才会执行！
     */
    @AfterThrowing(value = "execution(* com.atguigu.aop.anno.User.add(..))")
    public void afterThrowing(){
        System.out.println("afterThrowing()................");
    }

    /**
     * 环绕通知：在被增强方法前后执行！需要显示调用被增强方法!
     * @param proceedingJoinPoint
     * @throws Throwable
     */
    @Around(value = "execution(* com.atguigu.aop.anno.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("around()之前................");

        // 执行被增强的方法！
        proceedingJoinPoint.proceed();

        System.out.println("around()之后................");
    }
}
```



**XML配置：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">


    <!--添加context和aop命名空间!-->

    <!--1. 开启注解扫描-->
    <context:component-scan base-package="com.atguigu.aop.anno"></context:component-scan>

    <!--2. 开启Aspect生成代理对象-->
    <!--回去找有Aspect注解的类，有就生成代理对象-->
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

</beans>
```





**测试：**



```java
@Test
public void test1(){
    ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");

    // 这里的id无需配置，已经通过注解Component实现，value默认为首字符小写
    User user = context.getBean("user", User.class);
    user.add();
}
```



**执行结果：**



> 后三个执行顺序或有不同，可能为如此，也可能为完全倒序，原因是spring版本更新后，底层修改了执行顺序！



```
执行顺序：
    around()之前................
    before()................
    add().............
    afterReturning()................
    after()................
    around()之后................

有异常的执行顺序：
    around()之前................
    before()................
    afterThrowing()................
    after()................
```





#### 3.3、相同切入点抽取



**抽取：**



```java
/**
 * 相同切入点抽取！
 * 用到该切入点的直接在五种通知的value中调用该方法即可！
 * 也可以使用final字符串常量抽取！
 */
@Pointcut(value = "execution(* com.atguigu.aop.anno.User.add(..))")
public void pointCut(){
}
```



**使用：**



```java
@Before(value = "pointCut()")
public void before(){
    System.out.println("UserProxy.before()................");
}
```





#### 3.4、设置增强类优先级



> 在增强类上面添加注解 `@Order(数字类型值)`，数字类型值越小优先级越高!





```java
@Component // 生成代理对象
@Aspect // 生成代理对象！
@Order(value = 1) // 设置优先级，值越小优先级越高
public class UserProxy {

}


@Component // 代理对象创建
@Aspect // 生成代理对象
@Order(value = 0) // 设置优先级，值越小优先级越高
public class PersonProxy {

}
```









#### 3.5、完全注解开发





**创建配置类：**





```java
@Configuration // 表名是配置类
@ComponentScan(basePackages = {"com.atguigu.aop.anno"}) // 开启注解扫描
@EnableAspectJAutoProxy(proxyTargetClass = true) // 开启Aspect生成代理对象
public class AOPConfig {
}
```



**测试：**



```java
@Test
public void test3(){
    ConfigurableApplicationContext context = new AnnotationConfigApplicationContext(AOPConfig.class);

    User user = context.getBean("user", User.class);
    
    user.add();
}
```





## 4、基于AspectJ 配置文件（了解）





1. 创建增强类和被增强类
2. 在XML中配置创建两个对象
3. 在XML中配置切入点



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">


    <!--添加context和aop命名空间!-->

    <!--1. 创建对象-->
    <bean id="book" class="com.atguigu.aop.xml.Book"></bean>
    <bean id="bookProxy" class="com.atguigu.aop.xml.BookProxy"></bean>

    <!--2. 配置aop增强-->
    <aop:config>
        <!--配置切入点-->
        <aop:pointcut id="p" expression="execution(* com.atguigu.aop.xml.Book.buy(..))"/>
        <!--配置切面：通知应用到切入点的过程-->
        <aop:aspect ref="bookProxy">
            <!--增强作用在具体的方法上：哪个通知方法作用到哪个具体方法上-->
            <aop:before method="before" pointcut-ref="p"></aop:before>
        </aop:aspect>

    </aop:config>
</beans>
```





**测试：**



```java
@Test
public void test2(){
    ApplicationContext context = new ClassPathXmlApplicationContext("bean2.xml");

    Book book = context.getBean("book", Book.class);
    book.buy();
}
```

