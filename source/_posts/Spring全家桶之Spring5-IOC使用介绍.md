---
title: Spring全家桶之Spring5-IOC使用介绍
author: ITNXD
toc: true
abbrlink: 50148
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@7ac41d51c951f7f506f4b1742fd800727bef52be/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@7ac41d51c951f7f506f4b1742fd800727bef52be/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
categories:
  - 开发框架
tags:
  - Spring
  - IOC
date: 2021-03-25 22:36:57
updated:
---





# 一、Spring介绍





> Spring 是轻量级的开源的 JavaEE 框架。Spring 可以解决企业应用开发的复杂性！





## 1、概述





**Spring 有两个核心部分：**

1. IOC：控制反转，把创建对象过程交给 Spring 进行管理
2. Aop：面向切面，不修改源代码进行功能增强





**Spring 特点：**

1. 方便解耦，简化开发
2. Aop 编程支持
3. 方便程序测试
4. 方便和其他框架进行整合
5. 方便进行事务操作
6. 降低 API 开发难度





## 2、Spring下载





[下载地址，点击这里！](https://repo.spring.io/release/org/springframework/spring/)



下载完成后解压找到lib目录，其中就是相关jar包！



**SpringIOC基本包：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e58dcebf779022bff65ad8fed661d20ada3d84f2/2021/03/23/5a6b833dc918e890bff69a7cf787319a.png)





**注意**：Spring使用依赖于一个日志包，`commons-logging`包，为第三方包！











# 二、IOC概述









## 1、什么是IOC







IOC：（Inversion Of Control）控制反转，把**对象创建**和对象之间的**调用**过程，交给 Spring 进行管理

使用 IOC 目的：**为了降低耦合度**













## 2、IOC底层原理





**三大组成部分：**

1. xml 解析
2. 工厂模式
3. 反射



**原理如下方简图：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@77f5bc0e62479fac8d25ca6dd03060558624a0ce/2021/03/23/3de345bf550cfe245889cea0f5487a7f.png)









# 三、IOC容器两种接口





> IOC 思想基于 IOC 容器完成，IOC 容器底层就是对象工厂!





**Spring 提供 IOC 容器实现两种方式：（两个接口）**

- BeanFactory：IOC 容器基本实现，是 Spring 内部的使用接口，**不提供开发人员进行使用**
  - 加载配置文件时候不会创建对象，在获取对象（使用）才去创建对象

- ApplicationContext：BeanFactory 接口的**子接口**，提供更多更强大的功能，**一般由开发人进行使用**
  - 加载配置文件时候就会将配置文件中对象进行创建



**两种Bean创建示例：**



getBean方法：参数只有Class对象时，会获取到此类的所有实现类(子类)，参数也可为id值和Class对象！



```java
@Test
public void test2(){
    // 1. 加载配置文件（马上创建）
    BeanFactory context =
        new ClassPathXmlApplicationContext("bean1.xml");
    // (使用时候创建)
    BeanFactory context1 = new XmlBeanFactory(new InputStreamResource(
        BeanFactory.class.getResourceAsStream("bean1.xml")));

    // 2. 获取配置创建的对象
    User user = context.getBean("user", User.class);
    System.out.println(user);
    // 调用方法！
    user.hello();
}
```





**ApplicationContext 接口有实现类：**



- FileSystemXmlApplicationContext：加载的是配置文件在系统的全路径`C://....`（一般不用）
- ClassPathXmlApplicationContext：加载的是配置文件在src下的相对路径



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@103e92e76dcce26a97afbf5e9d183a12374baf32/2021/03/23/4d1acb125da0305a37310400e13f9de1.png)









# 四、IOC操作Bean管理







> Bean 管理指的是两个操作：
>
> - Spring 创建对象
> - Spirng 注入属性！
>
> Bean 管理操作有两种方式：
>
> - 基于 xml 配置文件方式实现
> - 基于注解方式实现







## 1、基XML方式







#### 1.1、导包



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e58dcebf779022bff65ad8fed661d20ada3d84f2/2021/03/23/5a6b833dc918e890bff69a7cf787319a.png)





#### 1.2、创建XML配置文件



**创建方式如下：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d0f0d73444bd564670d59195bb9071a55d0b9351/2021/03/23/e8dd12b744f567d2c257d0ff15f2f998.png)









#### 1.3、创建对象





```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--1、配置user对象创建！-->
    <bean id="user" class="com.atguigu.spring.User"></bean>
</beans>
```





**在 spring 配置文件中，使用 bean 标签，标签里面添加对应属性，就可以实现对象创建：**

- 在 bean 标签有很多属性，两个常用的属性：
  - id 属性：唯一标识
  - class 属性：类全路径（包类路径）

- 补充：name属性，针对以前的struct1实现，可以添加特殊符号，作用同id属性，但id属性不可加特殊符号



**创建对象时候，默认也是执行无参数构造方法完成对象创建：**



> 若该类有有参构造器，则会发生No default constructor found（NoSuchMethodException）异常！
>
> 即底层使用反射调用构造器使用的是newInstance()方法，该方法不传参数，则默认调用无参构造器，而你有了有参构造器，则系统默认的无参构造器就失效了，所以创建构造器要有参无参一起写！或者都不写！







#### 1.4、注入属性



> **注意：**
>
> - **容器中使用property标签时会调用set方法为属性赋值！**
>
> - **property标签的name属性由getter/setter方法的方法名决定！**



**1.4.1 通过set方法注入**



> 配置文件中配置！该方法调用set方法注入，类内没有set方法会报错！



```xml
<!--2、set方法注入属性（可以又多组）-->
<bean id="person" class="com.atguigu.spring.Person">
    <!--
        使用property标签配置属性！
        name：属性名
        value：属性值
        -->
    <property name="name" value="itnxd"></property>
</bean>
```







**1.4.2 通过有参构造注入**



> 无需set方法和空参构造，该类不要求有无参构造器，默认会从xml配置文件读取构造器参数进行调用对应的有参构造！
>
> - xml文件的constructor-arg标签 可以不使用name属性，但要求这些标签的顺序必须与构造器中参数的顺序一致
> - 构造器重载时，可以在 constructor-arg标签 中使用type属性指定参数的类型
> -  可以在 constructor-arg标签 中使用index属性指定构造器中参数的索引，从0开始





```xml
<!--3、有参构造器注入（可以又多组）-->
<!--无需set方法和空参构造-->
<bean id="order" class="com.atguigu.spring.Order">
    <constructor-arg name="name" value="itnxd"></constructor-arg>
    <!--<constructor-arg name="name" value="itnxd" type="java.lang.String"></constructor-arg>-->
    <!--index为构造器第几个参数，基本不使用该方法！-->
    <!--<constructor-arg index="0" value="itnxd"></constructor-arg>-->
</bean>
```





**1.4.3 通过p名称空间注入**

>即在最上方添加一行`xmlns:p="http://www.springframework.org/schema/p"`！
>
>同样需要有对应属性的set方法，无需构造器！



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


	<!--4、添加p名称空间，即上方最后一行-->
    <!--底层还是前一种方式的set方法注入-->
    <bean id="stu" class="com.atguigu.spring.Stu" p:name="itnxd">
    </bean>
</beans>
```



#### 1.5、注入其他属性







**1.5.1 字面量null值**

> 虽然不设置默认为null，这里只是表示可以通过xml设置
>
> 需要有set方法和空参构造！





```xml
<bean name="order1" class="com.atguigu.spring.Order">
    <property name="name">
        <null/>
    </property>
</bean>
```





**1.5.2 属性值包含特殊符号**



> - 把`<>`进行转义` &lt; &gt;`
> - 把带特殊符号内容写到` <![CDATA[]]>`





```xml
    <bean name="order2" class="com.atguigu.spring.Order">
        <!--<property name="name" value="&lt;itnxd&gt;"></property>-->
        <!--或者   <![CDATA[]]>  -->
        <property name="name">
            <!--这里最好放到两个value标签里，不要换行，否则输出就有空格了-->
            <value><![CDATA[<itnxd>]]></value>
        </property>
</bean>
```







#### 1.6、注入属性，外部bean



> 外部bean例子: 通过service层去调用dao层！
>
> 需要有Set方法！





```java
public class UserService {

    // 现在方式：
    // 1. 创建UserDao属性，并生成对应set方法
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    // 2. 在bean2.xml中配置

    public void show(){
        System.out.println("UserService show() ....");
        
        userDao.update();
        
//        // service调用dao！
//
//        // 原始方式：
//        UserDao userDao = new UserDaoImpl();
//        userDao.update();
    }
}
```



**XML配置：**



ref：表示引用外部的bean，通过id值引用



```xml
<!--1. 创建service和dao对象-->
<bean id="userService" class="com.atguigu.spring.service.UserService">

    <!--
    2. 注入dao
    name：service中的属性值
    ref：该属性值对应的实现类的bean标签的id值
    -->
    <property name="userDao" ref="userDaoImpl"></property>

</bean>
<!--全类名不能是接口，使用他的是实现类即可-->
<bean id="userDaoImpl" class="com.atguigu.spring.dao.UserDaoImpl"></bean>
```





#### 1.7、注入属性，内部bean



> 与外部bean一样，只是将该bean进行了嵌套!
>
> 需要有对应属性的set方法！



**Emp里有Dept对象！**



```xml
<!--内部bean-->
<bean id="emp" class="com.atguigu.spring.bean.Emp">
    <!--普通属性-->
    <property name="name" value="itnxd"></property>
    <property name="gender" value="boy"></property>
    <!--对象类型属性-->
    <property name="dept">
        <bean id="dept" class="com.atguigu.spring.bean.Dept">
            <property name="name" value="学生部门"></property>
        </bean>
    </property>
</bean>
```







#### 1.8、注入属性，级联赋值



> 表示一个类中有另个一类的属性，为另一个类赋值时候，需要通过`类.属`性进行赋值：`dept.name`





```xml
<!--级联赋值一-->
<bean id="emp" class="com.atguigu.spring.bean.Emp">
    <!--普通属性-->
    <property name="name" value="itnxd"></property>
    <property name="gender" value="boy"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept"></property>
</bean>
<bean id="dept" class="com.atguigu.spring.bean.Dept">
    <property name="name" value="学生部门"></property>
</bean>


<!--级联赋值二-->
<bean id="emp1" class="com.atguigu.spring.bean.Emp">
    <!--普通属性-->
    <property name="name" value="itnxd"></property>
    <property name="gender" value="boy"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept1"></property>
    <!--在这里赋值(需要有对应属性的get方法)-->
    <property name="dept.name" value="学生部门"></property>
</bean>
<bean id="dept1" class="com.atguigu.spring.bean.Dept"></bean>
```





#### 1.9、基于xml注入集合属性



>  同样需要有set方法！





1. 注入数组类型属性
2. 注入 List 集合类型属性
3. 注入 Map 集合类型属性
4. 在集合里面设置对象类型值





**JavaBean类型：**

```java
public class Stu {
    private String[] str;
    private List<String> list;
    private Map<String, String> map;
    private Set<String> set;

    private List<Course> courseList;
    
    ...set方法
}
```



**XML配置实现：**



```xml
<!--xml 注入集合属性一(需要有属性对应的set方法)-->
<bean id="stu" class="com.atguigu.spring1.Stu">
    <!--数组类型属性注入-->
    <property name="str">
        <array>
            <value>java 课程</value>
            <value>数据库课程</value>
        </array>
    </property>
    <!--list 类型属性注入-->
    <property name="list">
        <list>
            <value>张三</value>
            <value>小三</value>
        </list>
    </property>
    <!--map 类型属性注入-->
    <property name="map">
        <map>
            <entry key="JAVA" value="java"></entry>
            <entry key="PHP" value="php"></entry>
        </map>
    </property>
    <!--set 类型属性注入-->
    <property name="set">
        <set>
            <value>MySQL</value>
            <value>Redis</value>
        </set>
    </property>
    <!--注入 list 集合类型，值是对象-->
    <property name="courseList">
        <list>
            <ref bean="course1"></ref>
            <ref bean="course2"></ref>
        </list>
    </property>

</bean>
<!--创建多个 course 对象-->
<bean id="course1" class="com.atguigu.spring1.Course">
    <property name="name" value="Spring5 框架"></property>
</bean>
<bean id="course2" class="com.atguigu.spring1.Course">
    <property name="name" value="MyBatis 框架"></property>
</bean>
```









**把集合注入公共部分提取出来：**







> 类里为`private List<String> list`类型！
>
> 在 spring 配置文件中引入名称空间 util！



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

       这里添加一行：
       xmlns:util="http://www.springframework.org/schema/util"

       xsi:schemaLocation=
               "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                这里添加一行：同上方，将关键词全改为util即可！
                http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd"

>

    <!--对公共部分进行提取！-->

    <!--在 spring 配置文件中引入名称空间 util-->

    <!--1. 提取list集合属性-->
    <util:list id="bookList">
        <value>易筋经</value>
        <value>九阴真经</value>
        <value>九阳神功</value>
    </util:list>

    <!--2.提取 list 集合类型属性注入使用-->
    <bean id="book" class="com.atguigu.spring1.Book">
        <property name="list" ref="bookList"></property>
    </bean>
    
</beans>
```









## 2、基于注解方式



> 可以使用注解来简化XML配置！





#### 2.1、导包



`spring-aop-5.3.5.jar`



#### 2.2、四大创建对象的注解



**Spring 针对 Bean 管理中创建对象提供注解：**

1. @Service：一般用于Service层
2. @Controller：一般用于Web层（Servlet）
3. @Repository：一般用于Dao层
4. @Component：其他层次使用



上面四个注解功能是一样的，都可以用来创建 bean 实例





#### 2.3、注解方式创建对象





1. 开启组件扫描（引入context命名空间）
   1. 如果扫描多个包，多个包使用逗号隔开
2. 在类上面添加创建对象注解（四种任意一种即可）
   1. 在注解里面 value 属性值可以省略不写
   2. 默认值是类名称，首字母小写
3. 开启注解扫描细节配置
   1. `use-default-filters="false"`：表示现在不使用默认 filter，自己配置 filter
   2. `context:include-filter` ：设置扫描哪些内容 
   3. `context:exclude-filter`：设置不扫描那些内容
   4. `expression`：指定该注解是否扫描





**类上添加创建对象注解：**



```java
//UserService --> userService
@Service(value = "userService") // 同bean的写法
public class UserService {
    
}
```



**XML配置：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       添加context名称空间：
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           还有这一行：
                           http://www.springframework.org/schema/context  http://www.springframework.org/schema/context/spring-context.xsd">


    <!--一、开启组件扫描（引入context命名空间）
    指定那个包那个类！
     1 如果扫描多个包，多个包使用逗号隔开
     2 扫描包上层目录
    -->
    
<!--    <context:component-scan base-package="com.atguigu.spring.dao, com.atguigu.spring.service"></context:component-scan>-->
    <!--或-->
    <context:component-scan base-package="com.atguigu.spring"></context:component-scan>

    <!--二、开启组件扫描细节配置-->
    <!--示例 1
     use-default-filters="false" 表示现在不使用默认 filter，自己配置 filter
     context:include-filter ，设置扫描哪些内容
     expression：表示只扫描该注解的类
    -->
    <context:component-scan base-package="com.atguigu.spring" use-default-filters="false">
        <context:include-filter type="annotation"
                                expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!--示例 2
     下面配置扫描包所有内容
     context:exclude-filter： 设置哪些内容不进行扫描

     默认全部扫描中排除exclude-filter!
    -->
    <context:component-scan base-package="com.atguigu">
        <context:exclude-filter type="annotation"
                                expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>
</beans>
```





**测试：**



> 基于注解和XML混合方式：



```java
@Test
public void test1(){
    ApplicationContext context =
        new ClassPathXmlApplicationContext("bean1.xml");

    UserService userService = context.getBean("userService", UserService.class);

    System.out.println(userService);
    userService.show();

}
```





#### 2.4、注解方式实现属性注入





**2.4.1 @Autowired：根据属性类型进行自动装配**



> 不需要添加 set 方法！



- 第一步 把 service 和 dao 对象创建，在 service 和 dao 类添加创建对象注解
- 第二步 在 service 注入 dao 对象，在 service 类添加 dao 类型属性，在属性上面使用注解





```java
@Repository
public class UserDaoImpl implements UserDao{
    
}


@Service
public class UserService {
    @Autowired
    private UserDao userDao;
}
```







**2.4.2 @Qualifier：根据名称进行注入**



> 这个@Qualifier 注解的使用，一定要和上面@Autowired 一起使用！
>
> 相当于一步步缩小范围来唯一确定，Autowired通过类型缩小范围，Qualifier再通过名称唯一确定！



```java
@Repository(value = "userDaoImpl_1")
public class UserDaoImpl implements UserDao{
    
}


@Service
public class UserService {
    @Autowired
    @Qualifier(value = "userDaoImpl_1")
    private UserDao userDao;
}
```







**2.4.3 @Resource：可以根据类型注入，可以根据名称注入**



> jdk11及以上已经移除该包！
>
> 需要引入：`import javax.annotation.Resource;`
>
> javax为拓展包，需要去下载导入该包`javax.annotation-api-1.3.2.jar`
>
> 下载地址：[https://mvnrepository.com/artifact/javax.annotation/javax.annotation-api](https://mvnrepository.com/artifact/javax.annotation/javax.annotation-api)



**关于Resource介绍：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4a9096ee7c565cbb6eb7fc7a967654bf8dcf7953/2021/03/20/2538980f51cd4b36cbdf288968c89eb9.png)



**总结：**

1. 默认byName，也可byType
2. 指定name属性，则为byName
3. 指定type属性，则为byType
4. 同时指定name和type，则可唯一匹配



```java
@Repository(value = "userDaoImpl_1")
public class UserDaoImpl implements UserDao{
    
}


@Service
public class UserService {
    
    // @Resource(name = "userDaoImpl_1")
    // @Resource(type = UserDaoImpl.class)
    @Resource
    private UserDao userDao;
}
```





**2.4.4 @Value：注入普通类型属性**



```java
@Value("abc")
private String name;
```







## 3、完全注解开发



> 创建配置类，实现完全注解开发，摆脱XML方式！





- `@Configuration`：表名是一个配置类
- `@ComponentScan(basePackages = {"com.atguigu.spring"})`：替代XML开启组件扫描，`basePackages`指定扫描包路径





**配置类：**



```java
@Configuration // 作为配置类，替代xml文件
@ComponentScan(basePackages = {"com.atguigu.spring"}) // 替代xml的组件扫描
public class SpringConfig {

}
```







**测试：**



```java
@Test
public void test2(){
    ApplicationContext context =
        new AnnotationConfigApplicationContext(SpringConfig.class);

    UserService userService = context.getBean("userService", UserService.class);

    System.out.println(userService);
    userService.show();
}
```













# 五、Spring两种Bean







## 1、普通Bean



> 在配置文件中定义 bean 类型就是返回类型







## 2、工厂FactoryBean



> 在配置文件定义 bean 类型可以和返回类型不一样！



- 第一步 创建类，让这个类作为工厂 bean，实现接口 FactoryBean
-  第二步 实现接口里面的方法，在实现的方法中定义返回的 bean 类型





```java
public class MyBean implements FactoryBean<Course> {

    @Override
    public Course getObject() throws Exception {
        Course course = new Course();
        course.setName("course");
        return course;
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}
```

**XML：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myBean" class="com.atguigu.spring2.MyBean"></bean>

</beans>
```



**测试：** 返回类型不一定是MyBean！

```java
@Test
public void test13(){
    ApplicationContext context =
        new ClassPathXmlApplicationContext("bean7.xml");

    // bean的类型和返回类型不一样！
    Course course = context.getBean("myBean", Course.class);

    System.out.println(course);
}
```









# 六、Bean作用域







## 1、Bean属性Scope



> 在 Spring 里面，默认情况下，bean 是单实例对象，我们可以通过scope属性来设置单例还是多例！





**scope 属性值：**

- singleton，表示是单实例对象
- prototype，表示是多实例对象



**注意：**

- 设置 scope 值是 singleton 时候，加载 spring 配置文件时候就会创建单实例对象
- 设置 scope 值是 prototype 时候，不是在加载 spring 配置文件时候创建 对象，在调用 getBean 方法时候创建多实例对象
- scope：也可以是session和request（意思同javaWeb）





```xml
<bean id="book" class="com.atguigu.spring1.Book" scope="prototype"></bean>
```







# 七、Bean生命周期







## 1、五步





1. 通过构造器创建 bean 实例（无参数构造）
2. 为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）
3. 调用 bean 的初始化的方法（需要进行配置初始化的方法）
4. bean 可以使用了（对象获取到了）
5. 当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）





**演示：**



```java
public class Order {
    private String name;

    public Order() {
        System.out.println("1. 执行无参构造创建bean实例");
    }

    public void setName(String name) {
        this.name = name;
        System.out.println("2. 调用set方法设置属性值");
    }

    // 3. 配置初始化 bean9.xml
    // 创建初始化方法，去配置文件中配置为初始化方法去执行
    public void initMethod(){
        System.out.println("3. 调用初始化方法");
    }

    // 5. 配置销毁方法
    // 需要去配置文件配置
    public void destroyMethod(){
        System.out.println("5. 执行销毁的方法");
    }
}
```





```java
@Test
public void test15(){
    ApplicationContext context =
        new ClassPathXmlApplicationContext("bean9.xml");
    com.atguigu.spring2.Order order = context.getBean("order", com.atguigu.spring2.Order.class);

    System.out.println("4. 获取到bean对象创建的实例");
    System.out.println(order);

    // 5. 手动让bean实例销毁
    // 需要强转为子类才可调用其中的方法！
    ((ClassPathXmlApplicationContext) context).close();

}
```







**XML配置初始化和销毁方法：**



```xml
<!--配置初始化方法！ init-method标签，配置销毁方法！destroy-method标签-->
<bean id="order" class="com.atguigu.spring2.Order" init-method="initMethod" destroy-method="destroyMethod">
    <property name="name" value="itnxd"></property>
</bean>
```





## 2、七步



> bean 的后置处理器，bean 生命周期有七步：初始化前后各一个（第三步和第五步）



1. 通过构造器创建 bean 实例（无参数构造）
2. 为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）
3. **把 bean 实例传递 bean 后置处理器的方法 postProcessBeforeInitialization**
4. 调用 bean 的初始化的方法（需要进行配置初始化的方法）
5. **把 bean 实例传递 bean 后置处理器的方法 postProcessAfterInitialization**
6. bean 可以使用了（对象获取到了）
7. 当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）





**添加后置处理器：**

- 创建类，实现接口 BeanPostProcessor，创建后置处理器
- 配置xml文件，该文件中的bean都会默认使用这个后置处理器！



```java
public class MyBeanPost implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之前执行的postProcessBeforeInitialization方法！");
        return null;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之后执行的postProcessBeforeInitialization方法！");
        return null;
    }
}
```



```xml
<!--配置后置处理器-->
<bean id="myBeanPost" class="com.atguigu.spring2.MyBeanPost"></bean>
```











# 八、XML自动装配









> 根据指定装配规则（属性名称或者属性类型），Spring 自动将匹配的属性值进行注入！





**通过bean 标签属性 autowire，配置自动装配：**

- byName 根据属性名称注入 ，注入值 bean 的 id 值和类属性名称一样    
- byType 根据属性类型注入，只能有一个对应beanId







```xml
<!--手动装配-->
<!--
	<bean id="emp" class="com.atguigu.spring3.Emp">
        <property name="dept" ref="dept"></property>
    </bean>
    <bean id="dept" class="com.atguigu.spring3.Dept"></bean>
-->

<bean id="emp" class="com.atguigu.spring3.Emp" autowire="byName"></bean>
<!--    <bean id="emp" class="com.atguigu.spring3.Emp" autowire="byType"></bean>-->
<bean id="dept" class="com.atguigu.spring3.Dept"></bean>
<!--    <bean id="dept1" class="com.atguigu.spring3.Dept"></bean>-->
```









# 九、XML外部属性文件







> 以使用XML配置Druid数据库连接池举例：
>
> 先导入druid的包！





## 1、直接配置





```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/test"></property>
    <property name="username" value="root"></property>
    <property name="password" value="xxx"></property>
</bean>
```





## 2、引入外部属性文件



> 通过src目录下新建jdbc.properties配置文件然后使用XML进行读取！



**注意：**

- classpath 对应 src目录下
- 需要引入context名称空间





**jdbc.properties：**

```properties
prop.driverClass=com.mysql.cj.jdbc.Driver
prop.url=jdbc:mysql://localhost:3306/test
prop.userName=root
prop.password=xxx
```





**XML文件：**



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       引入context名称空间：
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           加入以下这一行，关键词全改为context
                           http://www.springframework.org/schema/context  http://www.springframework.org/schema/context/spring-context.xsd
">
    
    <!--引入外部属性文件-->
	<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

    <!--配置连接池-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${prop.driverClass}"></property>
        <property name="url" value="${prop.url}"></property>
        <property name="username" value="${prop.userName}"></property>
        <property name="password" value="${prop.password}"></property>
    </bean>
</beans>
```























