---
title: 再学Java之面向对象与异常
author: ITNXD
toc: true
abbrlink: 6640
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c0e31f1ad80376e7f59bff73e7de464fd0c93f9c/2021/02/06/57ea9cb8f94698210de69d9742d81d04.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c0e31f1ad80376e7f59bff73e7de464fd0c93f9c/2021/02/06/57ea9cb8f94698210de69d9742d81d04.png
categories:
  - Java教程
tags:
  - 面向对象
date: 2021-02-15 13:09:23
updated:
---





> 这里仅记录我认为没有了解透彻的知识，并不很全面系统，仅用于自己的查漏补缺！不过，我相信我没写的大家都是了解清楚的！



---



# 一、面向对象学习的三条主线



> 1. Java类及类的成员：属性、方法、构造器；代码块、内部类
>
> 2. 面向对象的大特征：封装性、继承性、多态性、(抽象性)
> 3. 其它关键字：`this`、`super`、`static`、`final`、`abstract`、`interface`、`package`、`import`等

---



# 二、零零碎碎

---



## 1、可变个数形参



> JDK 5.0新增的内容：



1. 可变个数形参的格式：`数据类型 ... 变量名`
2. 当调用可变个数形参的方法时，传入的参数个数可以是：0个，1个，2个，。。。
3. 可变个数形参的方法与本类中方法名相同，形参不同的方法之间构成重载
4. 可变个数形参的方法与本类中方法名相同，形参类型也相同的数组之间不构成重载。换句话说，二者**不能共存**。
5. **可变个数形参在方法的形参中，必须声明在末尾**
6. 可变个数形参在方法的形参中，最多只能声明一个可变形参。





## 2、方法重载



**参数个数或者参数类型不同即可！**



## 3、Eclipse的Junit单元测试



**步骤：**

 * 选中当前工程 - 右键择：`build path - add libraries - JUnit 4 - 下一步`
 * 创建Java类，进行单元测试。



**此时的Java类要求：**

- 此类是public的  
- 此类提供公共的无参的构造器



## 4、包装类



#### 4.1、八种基本数据类型对应的包装类

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c20d1850a644fb3b94e6d053bb3e331dc5f99c1b/2021/02/15/0a205dc1bcac802a31740c31f9e8adc5.png)



#### 4.2、基本数据类型、包装类、String的转换



- 基本数据类型 ---> 包装类 ：调用包装类的构造器
- 包装类 ---> 基本数据类型 ：调用包装类的`Xxx`的`xxxValue()`方法
- 基本数据类型 <---> 包装类：JDK 5.0 新特性：自动装箱 与自动拆箱
- 基本数据类型、包装类 ---> `String`: 调用`String`重载的`valueOf(Xxx xxx)` 可能会报`NumberFormatException`异常！

- `String` ---> 基本数据类型、包装类: 调用包装类的`parseXxx(String s)`



#### 4.3、包装类注意点



```java
@Test
public void test6() {
    // 注意点一：
    // 三元运算符要保证两个表达式一致，例如int和String就会编译出错。
    // 这里相当于自动向上转型，都按照Double进行比较了！
    Object obj = true ? new Integer(1) : new Double(2.0);
    System.out.println(obj); // 1.0

    // 注意点二：
    // Integer类内部有一个IntegerCache的结构，定义了一个缓存数组，存储-128 ~ 127的数，因为最常用，
    //  从缓存加载可以提高速度！
    // 所以Integer自动装箱的数如果在上述范围，则取到的是同一个地址！
    Integer in1 = new Integer(1);
    Integer in2 = new Integer(1);
    System.out.println(in1 == in2); // false

    Integer in3 = 1;
    Integer in4 = 1;
    System.out.println(in3 == in4); // true

    Integer in5 = 128;
    Integer in6 = 128;
    System.out.println(in5 == in6); // false
}
```



---



# 三、面向对象



---



## 1、四种权限修饰符

> - 4种权限都可以用来修饰类的内部结构：属性、方法、构造器、内部类。
>
> - 修饰类的话，只能使用：缺省、public

 

**四种权限修饰符的具体修饰范围：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@280c6659fbae0ccdd10bbda48068ab404b58dea8/2021/02/15/ee319173db444ad6e01123f3155015c0.png)





## 2、JavaBean使用



> **所谓`JavaBean`，是指符合如下标准的`Java`类,是`java`语言的可重用组件：**

 *		类是公共的
 *		一个无参的公共的构造器
 *		属性，且对应的`get、set`方法



```java
public class JavaBeanTest {
    String name;
    public JavaBeanTest() {

    }
    public void setName(String s) {
        name = s;
    }
    public String getName() {
        return name;
    }
}
```





## 3、this关键字



**`this`修饰：属性、方法、构造器**

`this`不能调用自己本身的构造器！（this无法递归。。。)

**注意点：**

 * 我们在类的构造器中，可以显式的使用`this(形参列表)`方式，调用本类中指定的其他构造器
 * 构造器中不能通过`this(形参列表)`方式调用自己
 * 如果一个类中有`n`个构造器，则最多有 `n - 1`构造器中使用了`this(形参列表)`
 * 规定：`this(形参列表)`必须声明在当前构造器的首行
 * 构造器内部，最多只能声明一个`this(形参列表)`，用来调用其他的构造器



## 4、super关键字



**`super`修饰：属性、方法、构造器**



- `super`调用属性、方法：
  - 我们可以在子类的方法或构造器中。通过使用`super.属性`或`super.方法`的方式，显式的调用父类中声明的属性或方法。但是，通常情况下，我们习惯省略`super.`
  - 特殊情况：当子类和父类中定义了**同名的属性**时，我们要想在子类中调用父类中声明的属性，则必须显式的使用`super.属性`的方式，表明调用的是父类中声明的属性。
  - 特殊情况：当**子类重写了父类中的方法**以后，我们想在子类的方法中调用父类中被重写的方法时，则必须显式的使用`super.方法`的方式，表明调用的是父类中被重写的方法。

- `super`调用构造器：
  - 我们可以在子类的构造器中显式的使用`super(形参列表)`的方式，调用父类中声明的指定的构造器
  - `super(形参列表)`的使用，必须声明在子类构造器的首行！
  - 我们在类的构造器中，针对于`this(形参列表)`或`super(形参列表)`**只能二选一，不能同时出现**
  - 在构造器的首行，没显式的声明`this(形参列表)`或`super(形参列表)`，则默认调用的是父类中空参的构造器：`super()`
  - 在类的多个构造器中，至少一个类的构造器中使用了`super(形参列表)`，调用父类中的构造器



## 5、import关键字



1. 在源文件中显式的使用`import`结构导入指定包下的类、接口
2. 声明在包的声明和类的声明之间
3. 如果需要导入多个结构，则并列写出即可
4. 可以使用`xxx.`的方式，表示可以导入`xxx`包下的所结构
5. 如果使用的类或接口是`java.lang`包下定义的，则可以省略`import`结构
6. 如果使用的类或接口是本包下定义的，则可以省略`import`结构
7. 如果在源文件中，使用了不同包下的同名的类，则必须至少一个类需要以**全类名**的方式显示。
8. 使用`xxx.*`方式表明可以调用`xxx`包下的所有结构。但是如果使用的是`xxx`子包下的结构，则仍需要显式导入
9. `import static`：导入指定类或接口中的静态结构：属性或方法。





## 6、面向对象的继承性



#### 6.1、子类继承父类的不同



**特别的，父类中声明为`private`的属性或方法，子类继承父类以后，仍然认为获取了父类中私的结构。只因为封装性的影响，使得子类不能直接调用父类的结构而已。**



#### 6.2、方法重写



- 子类重写的方法的方法名和形参列表与父类被重写的方法的方法名和形参列表相同

 *      子类重写的方法的权限修饰符不小于父类被重写的方法的权限修饰符
 *      	**特殊情况**：子类不能重写父类中声明为`private`权限的方法
 *      **返回值类型**：
         *      	父类被重写的方法的返回值类型是`void`，则子类重写的方法的返回值类型只能是`void`
         *      	父类被重写的方法的返回值类型是`A`类型，则子类重写的方法的返回值类型可以是`A`类或`A`类的子类
         *      	父类被重写的方法的返回值类型是基本数据类型(比如：`double`)，则子类重写的方法的返回值类型必须是相同的基本数据类型(必须也是`double`)
 *		子类重写的方法抛出的异常类型不大于父类被重写的方法抛出的异常类型
 *	子类和父类中的同名同参数的方法要么都声明为非`static`的（考虑重写，要么都声明为`static`的（不是重写))。	



#### 6.3、重载与重写



1. 对于重载而言，在方法调用之前，编译器就已经确定了所要调用的方法，这称为**“早绑定”或“静态绑定”**

2. 而对于重写（即多态），只有等到方法调用的那一刻，解释运行器才会确定所要调用的具体方法，这称为**“晚绑定”或“动态绑定”** 







## 7、面向对象的多态性



#### 7.1、多态性的使用



 * 有了对象的多态性以后，我们在编译期，只能调用父类中声明的方法！

 * 但在运行期，我们实际执行的是子类重写父类的方法。

 * **虚拟方法调用**：调用父子类同名方法，实际执行的是子类重写父类的方法！此时父类方法称为**虚拟/虚方法**

   

**总结：编译，看左边；运行，看右边。（编译在父类，运行在子类）**



#### 7.2、多态性的使用前提



- 类的继承关系 
- 方法的重写



#### 7.3、多态性使用的注意点

 - 对象的多态性，只适用于方法，不适用于属性（编译和运行都看左边）

#### 7.4、多态是编译时行为还是运行时行为？



**运行时行为（只有在运行才能真正确定是哪个对象！）**





#### 7.5、向下转型



> 有了对象的多态性以后，内存中实际上是加载了子类特有的属性和方法的，但是由于变量声明为父类类型，导致编译时，只能调用父类中声明的属性和方法。子类特有的属性和方法不能调用。
>
> **解决方法：向下转型！**



**注意点：**

 * 		使用强转时，可能出现`ClassCastException`的异常。
 * 		为了避免在向下转型时出现`ClassCastException`的异常，我们在向下转型之前，先进行`instanceof`的判断，一旦返回`true`，就进行向下转型。如果返回`false`，不进行向下转型。





## 8、static关键字



**`static`修饰：属性、方法、代码块、内部类**



> **补充：栈（局部变量），堆（new出来的结构），方法区（类的加载信息，静态域，常量池）**

#### 8.1、static修饰属性



- 属性，是否使`static`修饰，又分为：静态属性  vs 非静态属性(实例变量)

- `static`修饰属性的其他说明：
  - 静态变量随着类的加载而加载。可以通过`类.静态变量`的方式进行调用
  - 静态变量的加载要早于对象的创建。
  - 由于类只会加载一次，则静态变量在内存中也只会存在一份：存在方法区的静态域中。





#### 8.2、static修饰方法：静态方法、类方法



- 随着类的加载而加载，可以通过`类.静态方法`的方式进行调用

 * **静态方法中，只能调用静态的方法或属性**

   

#### 8.3、static的注意点



在静态的方法内，不能使用`this`关键字、`super`关键字，关于静态属性和静态方法的使用，大家都从生命周期的角度去理解！



#### 8.4、使用static关键字



 * 关于属性：
    * 属性是可以被多个对象所共享的，不会随着对象的不同而不同的。
    * 类中的常量也常常声明为`static`
 * 关于方法：
    * **操作静态属性的方法，通常设置为`static`的**
    * 			**工具类中的方法，习惯上声明为`static`的。** 比如：`Math、Arrays、Collections`







## 9、代码块使用



 * 代码块的作用：用来初始化类、对象的信息

 * 分类：代码块要是使用修饰符，只能使用static。静态代码块  vs 非静态代码块

 * 静态代码块：
      *		内部可以输出语句
      *		随着类的加载而执行,而且只执行一次
      *		作用：初始化类的信息
      *		如果一个类中定义了多个静态代码块，则按照声明的先后顺序执行
      *		静态代码块的执行要优先于非静态代码块的执行
      * 静态代码块内只能调用静态的属性、静态的方法，不能调用非静态的结构

 * 非静态代码块：
      *		内部可以输出语句
      *		随着对象的创建而执行
      *		每创建一个对象，就执行一次非静态代码块
      *		作用：可以在创建对象时，对对象的属性等进行初始化
      *		如果一个类中定义了多个非静态代码块，则按照声明的先后顺序执行
      * 非静态代码块内可以调用静态的属性、静态的方法，或非静态的属性、非静态的方法

​     

**简单补充：类内不能直接对属性进行操作，但可以将其放到代码块内进行初始化！**



 * 实例化子类对象时，涉及到父类、子类中静态代码块、非静态代码块、构造器的加载顺序：

     **由父及子，静态先行。**

 * 属性的赋值顺序：

      * 	① 默认初始化
      * 	② 显式初始化 / ⑤在代码块中赋值（谁在前谁先执行，后覆盖前）
      * 	③ 构造器中初始化
      * 	④ 有了对象以后，可以通过"对象.属性"或"对象.方法"的方式，进行赋值

 * 执行的先后顺序：① - ② / ⑤ - ③ - ④



## 10、final关键字



**`final`修饰：类、方法、变量**



- 修饰类:此类不能被其他类所继承。
- 修饰方法：表明此方法不可以被重写
- 修饰变量：此时的"变量"就称为是一个常量
   - 修饰属性：可以考虑赋值的位置：显式初始化、代码块中初始化、构造器中初始化
   
   - 修饰局部变量：尤其是使用`final`修饰形参时，表明此形参是一个常量。当我们调用此方法时，给常量形参赋一个实参。一旦赋值以后，就只能在方法体内使用此形参，但不能进行重新赋值。
   
     

- `static final` 用来修饰属性：全局常量



## 11、abstract关键字



**`abstract`修饰：类、方法**



#### 11.1、abstract修饰类：抽象类

 * 此类不能实例化

 * 抽象类中一定有构造器，便于子类实例化时调用

 * 开发中，都会提供抽象类的子类，让子类对象实例化，完成相关的操作

   

**抽象的使用前提：继承性**



#### 11.2、abstract修饰方法：抽象方法

 * 		抽象方法只方法的声明，没方法体
 * 		包含抽象方法的类，一定是一个抽象类。反之，**抽象类中可以没有抽象方法的。**
 *      若子类重写了父类中的所的抽象方法后，此子类方可实例化
 *          若子类没重写父类中的所的抽象方法，则此子类也是一个抽象类，需要使用`abstract`修饰

#### 11.3、abstract注意点： 

 * 		`abstract`不能用来修饰：属性、构造器等结构
 * 		`abstract`不能用来修饰私有方法、静态方法、`final`的方法、`final`的类



**补充：`abstract `和 `final`水火不容！**



```java
// 抽象类
abstract class Person{
    String name;
    int age;

    public Person() {

    }
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public void show() {
        System.out.println("show()...");
    }

    // 抽象方法：
    public abstract void eat();
}
```



#### 11.4、抽象类的匿名类



> 目的：只用一次该抽象类的子类，无需再使用class编写，而是用完就销毁，方便！



```java
public static void main(String[] args) {
    Son son = new Son();
    method(son); // 非匿名的类，非匿名的对象！

    method(new Son()); // 非匿名的类，匿名的对象

    // 1. 抽象类的匿名类：创建了一个匿名子类的对象，多态性，由父类Person接收
    Person p = new Person() {
        @Override
        public void eat() {
            System.out.println("匿名类...");
        }
    };
    // 多态性...
    method(p);

    // 2. 直接在方法内部使用时进行匿名编写
    // 匿名的类，匿名的对象
    method(new Person() {
        @Override
        public void eat() {
            System.out.println("匿名类...");
        }
    });
}
```







## 12、interface关键字



> Java中，接口和类是**并列**的两个结构！



#### 12.1、接口中可定义的成员



JDK7及以前：只能定义全局常量和抽象方法
 * 			全局常量：`public static final`的，但是书写时，**可以省略不写**
 * 			抽象方法：`public abstract`的，但是书写时，**可以省略不写**

**接口中不能定义构造器的！意味着接口不可以实例化**



```java
interface Flyable{
    public static final int MAX_SPEED = 7900;
    // 系统自动添加：public static final
    int MIN_SPEED = 1;

    public abstract void fly();
    // 系统自动添加：public abstract
    void stop();
}
```



#### 12.2、其他注意点



- 如果实现类覆盖了接口中的所有抽象方法，则此实现类就可以实例化

- 如果实现类没覆盖接口中所的抽象方法，则此实现类仍为一个抽象类
- Java类可以实现多个接口
- **接口与接口之间可以继承，而且可以多继承**
- **接口，实际上可以看做是一种规范**



```java
// 接口之间可以继承！
interface AA{

}

interface BB{

}

interface CC extends AA, BB{

}
```





#### 12.3、Java8中关于接口的新规范

> JDK8：除了定义全局常量和抽象方法之外，还可以定义**静态方法、默认方法**

 *		知识点1：接口中定义的静态方法，只能通过接口来调用。
 * 知识点2：通过实现类的对象，可以调用接口中的默认方法。
    *				如果实现类重写了接口中的默认方法，调用时，仍然调用的是重写以后的方法
 * 知识点3：如果子类(或实现类)继承的父类和实现的接口中声明了同名同参数的默认方法，
    *				那么子类在没重写此方法的情况下，默认调用的是父类中的同名同参数的方法。--> **类优先原则**
 * 知识点4：如果实现类实现了多个接口，而这多个接口中定义了同名同参数的默认方法，
    *				那么在实现类没重写此方法的情况下，报错。--> **接口冲突。**这就需要我们必须在实现类中重写此方法

 *		知识点5：如何在子类(或实现类)的方法中调用父类、接口中被重写的方法？



```java
interface AAA{
    public static void method1() {
        System.out.println("静态方法一");
    }
    public default void method2() {
        System.out.println("默认方法二");
    }
    // 默认就是public，省略不写
    default void method3() {
        System.out.println("默认方法二");
    }
}

class SuperClass{
    public void method3() {
        System.out.println("SuperClass");
    }
}

class BBB extends SuperClass implements AAA{
    public void method() {
        // 调用父类方法
        super.method3();
        // 接口调用静态方法
        AAA.method1();
        // 接口调用非静态方法
        AAA.super.method2();
        AAA.super.method3();
    }
}
```





## 13、内部类



#### 13.1、内部类的分类

- 成员内部类（静态、非静态 ）

- 局部内部类(方法内、代码块内、构造器内)



#### 13.2、成员内部类的使用

 * 一方面，作为外部类的成员：
    * 			调用外部类的结构
    * 			可以被`static`修饰
    * 			可以被4种不同的权限修饰
 * 另一方面，作为一个类：
    * 			类内可以定义属性、方法、构造器等
    * 			可以被`final`修饰，表示此类不能被继承。言外之意，不使用`final`，就可以被继承
    * 			可以被`abstract`修饰



#### 13.3、局部内部类的使用



**注意点：**

 *	在局部内部类的方法中（比如：show如果调用局部内部类所声明的方法(比如：method)中的局部变量(比如：num)
 *	的话,要求此局部变量声明为final的。
 *	jdk 7及之前版本：要求此局部变量显式的声明为final的
 *	jdk 8及之后的版本：可以省略final的声明





```java
public class InnerClassTest {
    public static void main(String[] args) {
        // 4.1 如何创建成员内部类的对象？(静态的，非静态的)
        // 静态：
        Person.Dog dog = new Person.Dog();
        dog.show();
        // 非静态：
        //		Person.Bird bird = new Person.Bird(); 错误
        Person p = new Person();
        Person.Bird bird = p.new Bird();
        bird.sing();
        bird.display("333");
    }

    // 第6点解释：相当于InnerClassTest和两个AA两个字节码文件，互相独立
    public void method() {
        // 局部变量：实际为final
        int num = 10;

        class AA{
            // 此时num相当于局部变量num的副本
            //			num = 20; 错误，不能修改
            public void show() {
                System.out.println(num);
            }
        }
    }
}

class Person{
    String name = "111";
    int age;

    public void eat() {
        System.out.println("人吃饭");
    }
    // 静态成员内部类：
    static class Dog{
        String name;
        int age;

        public void show() {
            System.out.println("狗子");
        }
    }
    // 非静态成员内部类：
    class Bird{
        String name = "222";
        public Bird() {

        }
        // 4.2 如何在成员内部类中调用外部类的结构？
        public void sing() {
            // 1.调用外部类的非静态属性一
            eat();
            // 2.调用外部类的非静态属性二
            Person.this.eat();
        }
        public void display(String name) {
            System.out.println(name); // 形参
            System.out.println(this.name); // 内部类属性
            System.out.println(Person.this.name); // 外部类属性
        }
    }

    // 局部内部类：
    public Person() {
        class AA{

        }
    }
    public void show() {
        class BB{

        }
    }
    {
        class CC{

        }
    }
    // =========================================================
    // 局部内部类的使用：
    //返回一个实现了Comparable接口的类的对象
    public Comparable getComparable() {

        //创建一个实现了Comparable接口的类:局部内部类
        //方式一：
        class MyComparable implements Comparable{

            @Override
            public int compareTo(Object o) {
                return 0;
            }

        }

        //		return new MyComparable();

        // 方法二：创建了一个实现该接口的匿名实现类的匿名对象
        return new Comparable() {

            @Override
            public int compareTo(Object o) {
                // TODO Auto-generated method stub
                return 0;
            }
        };
    }
}
```





#### 13.4、总结



成员内部类和局部内部类，在编译以后，都会生成字节码文件：



 *	格式：
    *	员内部类：`外部类$内部类名.class`
    *        	局部内部类：`外部类$数字 内部类名.class`





---





























---







# 四、异常

---



## 1、异常体系结构



```
java.lang.Throwable
    |-----java.lang.Error:一般不编写针对性的代码进行处理。
    |-----java.lang.Exception:可以进行异常的处理
		|------编译时异常(checked)
			|-----IOException
				|-----FileNotFoundException
			|-----ClassNotFoundException
		|------运行时异常(unchecked,RuntimeException)
                    |-----NullPointerException
                    |-----ArrayIndexOutOfBoundsException
                    |-----ClassCastException
                    |-----NumberFormatException
                    |-----InputMismatchException
                    |-----ArithmeticException
```





## 2、如何自定义异常类？

 * 继承于现的异常结构：`RuntimeException 、Exception`
 * 提供全局常量：`serialVersionUID`
 * 提供重载的构造器



```java
public class MyException extends Exception{
    static final long serialVersionUID = -338751699319999948L;
    public MyException() {

    }
    public MyException(String msg) {
        super(msg);
    }
}
```



## 3、throw 和  throws区别

- `throw` 表示抛出一个异常类的对象，生成异常对象的过程。声明在方法体内。
- `throws` 属于异常处理的一种方式，声明在方法的声明处。



## 4、注意点

- `catch`中的异常类型如果没子父类关系，则谁声明在上，谁声明在下无所谓。

- `catch`中的异常类型如果满足子父类关系，则要求子类一定声明在父类的上面。否则，报错

**常用的异常对象处理的方式： ① `String  getMessage()`    ② `printStackTrace()`**





## 5、编译时异常和运行时异常

 * 体会1：使用`try-catch-finally`处理编译时异常，是得程序在编译时就不再报错，但是运行时仍可能报错。相当于我们使用`try-catch-finally`将一个**编译时可能出现的异常，延迟到运行时出现**。
 * 体会2：开发中，由于运行时异常比较常见，所以我们通常就不针对运行时异常编写`try-catch-finally`了。针对于编译时异常，我们说一定要考虑异常的处理。



## 6、开发中应该如何

 *  如果父类中被重写的方法没`throws`方式处理异常，则子类重写的方法也不能使用`throws`，意味着如果子类重写的方法中异常，必须使用`try-catch-finally`方式处理。
 *  执行的方法a中，先后又调用了另外的几个方法，这几个方法是递进关系执行的。我们建议这几个方法使用`throws`的方式进行处理。而执行的方法a可以考虑使用`try-catch-finally`方式进行处理。





----

