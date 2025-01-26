---
title: 再学Java之单例、模板方法、动静态代理设计模式
author: ITNXD
toc: true
abbrlink: 22183
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png
categories:
  - Java教程
tags:
  - 设计模式
date: 2021-02-17 21:29:59
updated:
---







# 一、设计模式之单例设计模式



---





> 1. 设计模式：
>
>    设计模式是在大量的实践中总结和理论化之后优的代码结构、编程风格、以及解决问题的思考方式。
>
> 2. **常用设计模式  --- 23种经典的设计模式  GOF**
>
>  * 		创建型模式，共5种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。 
>  * 		结构型模式，共7种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。 
>  * 		行为型模式，共11种：策略模式、模板方法模式、观察者模式、迭代器模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。 
>
> 3. 单例设计模式：
>
>    所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例。



## 1、饿汉式实现



 * 坏处：对象加载时间过长。

 * 好处：饿汉式是线程安全的

   

```java
public class SingletonTest1 {
    public static void main(String[] args) {
        Bank bank1 = Bank.getInstance();
        Bank bank2 = Bank.getInstance();
        System.out.println(bank1 == bank2); // true
    }
}

class Bank{
    // 1. 私有化类构造器
    private Bank() {

    }

    // 2. 内部创建类对象
    // 4. 要求此对象也声明为静态
    private static Bank instance = new Bank();

    // 3. 提供公共静态方法，返回类对象
    public static Bank getInstance() {
        return instance;
    }
}

```



## 2、懒汉式实现



 *   		好处：延迟对象的创建。
 *   		目前的写法坏处：线程不安全



```java
public class SingletonTest2 {
    public static void main(String[] args) {
        Order order1 = Order.getInstance();
        Order order2 = Order.getInstance();
        System.out.println(order1 == order2); // true
    }
}

class Order{

    //1.私化类的构造器
    private Order(){

    }

    //2.声明当前类对象，没初始化
    //4.此对象也必须声明为static的
    private static Order instance = null;

    //3.声明public、static的返回当前类对象的方法
    public static Order getInstance(){
        if(instance == null) {
            instance = new Order();
        }
        return instance;
    }
}

```



## 3、懒汉式线程安全实现



```java
class Order1{

    private Order1(){}

    private static Order1 instance = null;

    // 方式一：效率稍差
    /*public static Order1 getInstance(){

        synchronized (Order1.class) {
            if(instance == null) {
                instance = new Order1();
            }
            return instance;
        }
    }*/

    // 方式二：效率稍高
    public static Order1 getInstance(){

        if(instance == null){
            synchronized (Order1.class) {
                if(instance == null) {
                    instance = new Order1();
                }
            }
        }
        return instance;
    }

    // synchronized 写到函数声明上也可
    /*public static synchronized Order1 getInstance(){
        if(instance == null) {
            instance = new Order1();
        }
        return instance;
    }*/
}
```









## 4、单例设计模式应用场景



 *  网站的计数器，一般也是单例模式实现，否则难以同步。
 *  应用程序的日志应用，一般都使用单例模式实现，这一般是由于共享的日志文件一直处于打开状态，因为只能有一个实例去操作，否则内容不好追加。
 *  数据库连接池的设计一般也是采用单例模式，因为数据库连接是一种数据库资源。
 *  项目中，读取配置文件的类，一般也只有一个对象。没有必要每次使用配置文件数据，都生成一个对象去读取。
 *  `Application` 也是单例的典型应用
 *  `Windows`的`Task Manager` (任务管理器)就是很典型的单例模式
 *  `Windows`的`Recycle Bin` (回收站)也是典型的单例应用。在整个系统运行过程中，回收站一直维护着仅有的一个实例。





---



# 二、设计模式之模板方法设计模式

---



## 1、解决的问题



 * 在软件开发中实现一个算法时，整体步骤很固定、通用，这些步骤已经在父类中写好了。但是某些部分易变，易变
 * 部分可以抽象出来，供不同子类实现。这就是一种模板模式。



## 2、模板方法应用



**模板方法设计模式是编程中经常用得到的模式。各个框架、类库中都有他的影子，比如常见的有：**

 * 数据库访问的封装
 * `Junit`单元测试
 * `JavaWeb`的`Servlet`中关于`doGet/doPost`方法调用
 * `Hibernate`中模板程序
 * `Spring`中`JDBCTemlate`、`HibernateTemplate`等



## 3、代码实现

```java
abstract class Template{

    //计算某段代码执行所需要花费的时间
    public void spendTime(){

        long start = System.currentTimeMillis();

        this.code();//不确定的部分、易变的部分

        long end = System.currentTimeMillis();

        System.out.println("花费的时间为：" + (end - start));

    }

    public abstract void code();

}

// 模板方法实现抽象接口：
class SubTemplate extends Template{

    @Override
    public void code() {

        for(int i = 2;i <= 1000;i++){
            boolean isFlag = true;
            for(int j = 2;j <= Math.sqrt(i);j++){

                if(i % j == 0){
                    isFlag = false;
                    break;
                }
            }
            if(isFlag){
                System.out.println(i);
            }
        }
    }
}
```



---



# 三、设计模式之静态代理设计模式

---



## 1、解决的问题



代理模式是Java开发中使用较多的一种设计模式。代理设计就是为其他对象提供一种代理以控制对这个对象的访问。 





## 2、静态代理的缺点



1. 代理类和目标对象的类都是在编译期间确定下来，不利于程序的扩展。
2. 每一个代理类只能为一个接口服务，这样一来程序开发中必然产生过多的代理。





## 3、代码实现



- 代理类：通用的入口

 * 被代理类：具体的某一个



```java
public class StaticProxyTest {
    public static void main(String[] args) {
        // 创建被代理类对象:
        NikeProxyClothFactory nike = new NikeProxyClothFactory();
        // 创建代理类对象：
        ProxyClothFactory proxyClothFactory = new ProxyClothFactory(nike);
        // 使用代理类对象调用被代理类方法：
        proxyClothFactory.produceCloth();
    }
}

interface ClothFactory{
    void produceCloth();
}

// 代理类：
class ProxyClothFactory implements ClothFactory{

    // 用被代理类对象实例化：
    private ClothFactory clothFactory;

    public ProxyClothFactory(ClothFactory clothFactory) {
        this.clothFactory = clothFactory;
    }

    @Override
    public void produceCloth() {
        System.out.println("代理工厂做一些准备工作！");
        clothFactory.produceCloth();
        System.out.println("代理工厂做一些后续工作！");
    }
}

// 被代理类：
class NikeProxyClothFactory implements ClothFactory{

    @Override
    public void produceCloth() {
        System.out.println("Nike工厂生产一批衣服！");
    }
}
```



---







# 四、设计模式之动态代理设计模式



> 反射的应用！
>
> 
>
> 代理模式的原理：
>
>  * 使用一个代理将对象包装起来, 然后用该代理对象取代原始对象。任何对原始对象的调用都要通过代理。代理对象决定是否以及何时将方法调用转到原始对象上。

--------





## 1、需要解决的两个主要问题





1. 如何根据加载到内存中的被代理类，动态的创建一个代理类及其对象。（通过`Proxy.newProxyInstance()`实现）
2. 当通过代理类的对象调用方法`a`时，如何动态的去调用被代理类中的同名方法`a`。(通过`InvocationHandler`接口的实现类及其方法`invoke()`



## 2、动态代理的特点

动态代理是指客户通过代理类来调用其它对象的方法，并且是在程序运行时根据需要**动态创建目标类的代理**对象。



## 3、代码实现





```java
public class DynamicProxyTest {
    public static void main(String[] args) {
        // 例子一：

        // 1. 通过被代理类动态创建一个代理类对象
        // 体现多态，我拿接口去接收！
        Human human = (Human) ProxyFactory.getProxyInstance(new SuperMan());
        // 2. 通过该代理类对象调用方法，自动调用被代理类的同方法！
        human.eat("apple");
        String belief = human.getBelief();
        System.out.println(belief);

        System.out.println("=====================================");

        // 例子二：动态性的体现；创建静态代理中用过的衣服工厂的例子！
        ClothFactory nike = (ClothFactory) ProxyFactory.getProxyInstance(new NikeProxyClothFactory());
        nike.produceCloth();

        // 至此：实现任何被代理类的动态代理！

    }
}

interface Human{
    String getBelief();
    void eat(String food);
}

// 被代理类：
class SuperMan implements Human{

    @Override
    public String getBelief() {
        return "I believe I can fly!";
    }

    @Override
    public void eat(String food) {
        System.out.println("超人喜欢吃" + food);
    }
}

// 1. 专门生产代理类的工厂：解决问题一
class ProxyFactory{

    // 2. 调用此方法，返回一个代理类对象！
    // obj：被代理类对象！
    public static Object getProxyInstance(Object obj){

        MyInvocationHandler handler = new MyInvocationHandler();

        // 9. 通过MyInvocationHandler绑定当前被代理类对象！
        handler.bind(obj);

        // 3.调用Proxy.newProxyInstance方法获取代理类对象
        // 参数一：指明被代理类的classLoader
        // 参数二：指明被代理类实现的接口
        // 6. 参数三：指明被代理类的InvocationHandler，即解决问题二！
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(),
                obj.getClass().getInterfaces(), handler);
    }
}

// 4.
class MyInvocationHandler implements InvocationHandler{

    // 8. 创建被代理类对象：
    private Object obj;

    public void bind(Object obj){
        this.obj = obj;
    }

    // 5. 当我们通过代理类对象，调用方法a时，会自动调用如下方法：invoke()
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 7. 通过第三步的参数传来的方法名、参数去调用被代理类的方法！
        // 10. 通过第九步绑定的被代理类对象来调用该对象的method方法！
        return method.invoke(obj, args);
    }
}
```



## 4、AOP动态代理（Aspect Orient Programming）



 * 使用`Proxy`生成一个动态代理时，往往并不会凭空产生一个动态代理，这样没有太大的意义。通常都是为指定的目标对象生成动态代理
 * 这种动态代理在`AOP`中被称为`AOP`代理，AOP代理可代替目标对象，`AOP`代理包含了目标对象的全部方法。但`AOP`代理中的方法与目标对象的方法存在差异





```java
class HumanUtil{

    public void method1(){
        System.out.println("===================通用方法一=======================");
    }
    public void method2(){
        System.out.println("===================通用方法二=======================");

    }
}

// 改造上面的该方法：

class MyInvocationHandler1 implements InvocationHandler{

    private Object obj;

    public void bind(Object obj){
        this.obj = obj;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        HumanUtil humanUtil = new HumanUtil();

        humanUtil.method1();
        Object returnVal = method.invoke(obj, args);
        humanUtil.method2();

        return returnVal;
    }
}
```





