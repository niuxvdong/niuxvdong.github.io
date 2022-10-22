---
title: 再学Java之StringBuffer、StringBuilder、枚举类、注解、集合和泛型
author: ITNXD
toc: true
abbrlink: 54748
date: 2021-02-15 19:06:25
updated:
top_img: https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/9fd846795f34be8edc6238ce1ef30584.png
cover: https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/9fd846795f34be8edc6238ce1ef30584.png
categories:
	- Java教程
tags:
	- StringBuilder
	- StringBuffer
	- 枚举类
	- 注解
  	- 集合
  	- 泛型
---







# 一、StringBuffer VS StringBuilder

-----



## 1、String、StringBuffer、StringBuilder三者的对比



 *      `String`：不可变的字符序列，底层使用`char[]`存储。
 *      `StringBuffer`：可变的字符序列，**线程安全的，效率低**。底层使用`char[]`存储。
 *      `StringBuilder`：可变的字符序列，**JDK5.0**新增的，**线程不安全的，效率高**。底层使用`char[]`存储。



**因此，他们的效率高低依次为：`StringBuilder > StringBuffer > String`**



**注意：** JDK8之后的版本使用的是`byte[]`存储！



## 2、使用建议



**只要不是多线程问题，操作共享数据，都使用新增的`StringBuilder`**！



## 3、StringBuffer、StringBuilder内存解析

> 二者在内存层面存储扩容方面几乎一致，这里以`StringBuffer`为例！

#### 3.1、先来看一下String的存储



`String`底层使用`private final`存储！



```java
String str = new String(); // char[] value = new char[0];
String str1 = new String("abc"); // char[] value = new char[]{'a','b','c'};
```



#### 3.2、StringBuffer



- **默认开辟长度为16的数组**
- 若为有参构造器，则开辟参数的长度 + 16的数组
- **扩容问题**：如果要添加的数据底层数组盛不下了，那就需要扩容底层的数组。默认情况下，**扩容为原来容量的2倍 + 2**，同时将原数组中的元素复制到新的数组中。



```java
StringBuffer sb1 = new StringBuffer();//char[] value = new char[16];底层创建了一个长度是16的数组。
System.out.println(sb1.length());//
sb1.append('a');//value[0] = 'a';
sb1.append('b');//value[1] = 'b';
StringBuffer sb2 = new StringBuffer("abc");//char[] value = new char["abc".length() + 16];
```



#### 3.3、总结



开发中建议大家使用：`StringBuffer(int capacity)` 或 `StringBuilder(int capacity)`，提高效率！





---



# 二、枚举类



> JDK5.0之前，自定义枚举类，JDK5.0之后，使用enum关键字！



-----



## 1、自定义枚举类



```java
//1. 自定义枚举类
class Season{
    //1.声明Season对象的属性:private final修饰
    private final String seasonName;
    private final String seasonDesc;

    //2.私化类的构造器,并给对象属性赋值
    private Season(String seasonName,String seasonDesc){
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }

    //3.提供当前枚举类的多个对象：public static final的
    public static final Season SPRING = new Season("春天","春暖花开");
    public static final Season SUMMER = new Season("夏天","夏日炎炎");
    public static final Season AUTUMN = new Season("秋天","秋高气爽");
    public static final Season WINTER = new Season("冬天","冰天雪地");

    //4.其他诉求1：获取枚举类对象的属性
    public String getSeasonName() {
        return seasonName;
    }

    public String getSeasonDesc() {
        return seasonDesc;
    }
    //4.其他诉求2：提供toString()
    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                ", seasonDesc='" + seasonDesc + '\'' +
                '}';
    }
}
```





## 2、使用enum关键字

- `enum`类的主要方法：
   - `values() `方法：返回枚举类型的对象数组。该方法可以很方便地遍历所有的枚举值。
   - `valueOf(String str)`：可以把一个字符串转为对应的枚举类对象。要求字符
   - 串必须是枚举类对象的`名字`。如不是，会有运行时异常：`IllegalArgumentException`。
   - `toString()`：返回当前枚举类对象常量的名称



**代码示例：**



```java
public static void main(String[] args) {

    Season1 autumn = Season1.AUTUMN;
    // 默认实现了toString()，为常量名
    System.out.println(autumn); // AUTUMN
    System.out.println(Season1.class.getSuperclass()); // class java.lang.Enum

    // 也可以重写：
    System.out.println(autumn); // Season{seasonName='秋天', seasonDesc='秋高气爽'}

    /*=============================================*/
    //1. toString():返回枚举类对象的名称
    System.out.println(autumn.toString()); // AUTUMN
    //2. values():返回所的枚举类对象构成的数组
    Season1[] values = Season1.values();
    for (int i = 0; i < values.length; i++) {
        System.out.println(values[i]);
    }
    Thread.State[] values1 = Thread.State.values();
    for (int i = 0; i < values1.length; i++) {
        System.out.println(values1[i]);
    }
    //3. valueOf(String objName):返回枚举类中对象名是objName的对象。
    //如果没objName的枚举类对象，则抛异常：IllegalArgumentException
    //        Season1 autumn11 = Season1.valueOf("AUTUMN1");
    Season1 autumn1 = Season1.valueOf("AUTUMN");
    System.out.println(autumn1);


    // =======================
    // 1. 每个对象都是相同的show
    Season1 summer = Season1.SUMMER;
    summer.show(); // 这是一个季节！
    // 2. 每个对象都有自己的show
    Season1.SPRING.show();
    Season1.SUMMER.show();
    Season1.AUTUMN.show();
    Season1.WINTER.show();

}
```



-----





- 使用`enum`定义枚举类之后，如何让枚举类对象分别实现接口：
   - 实现接口，在枚举类中实现抽象方法
   - 让枚举类对象分别实现接口中的抽象方法



**代码示例：**



```java
// 2. 使用enum
enum Season1 implements Info{
    //1.提供当前枚举类的对象，多个对象之间用","隔开，末尾对象";"结束
    SPRING("春天","春暖花开"){
        @Override
        public void show() {
            System.out.println("春天在哪里！");
        }
    },
    SUMMER("夏天","夏日炎炎"){
        @Override
        public void show() {
            System.out.println("夏天在哪里！");
        }
    },
    AUTUMN("秋天","秋高气爽"){
        @Override
        public void show() {
            System.out.println("秋天在哪里！");
        }
    },
    WINTER("冬天","冰天雪地"){
        @Override
        public void show() {
            System.out.println("冬天在哪里！");
        }
    };

    //2.声明Season对象的属性:private final修饰
    private final String seasonName;
    private final String seasonDesc;


    private Season1(String seasonName,String seasonDesc){
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }

    //4.其他诉求1：获取枚举类对象的属性
    public String getSeasonName() {
        return seasonName;
    }

    public String getSeasonDesc() {
        return seasonDesc;
    }
    //4.其他诉求1：提供toString()
    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                ", seasonDesc='" + seasonDesc + '\'' +
                '}';
    }

    @Override
    public void show() {
        System.out.println("这是一个季节！");
    }
}
```





---



# 三、注解



> JDK5.0 新增的功能！
>
> **框架 = 注解 + 反射机制 + 设计模式**



----



## 1、注解概述



- `Annotation` 其实就是代码里的特殊标记, 这些标记可以在**编译, 类加载, 运行时被读取, 并执行相应的处理**。通过使用 `Annotation`, 程序员可以在不改变原逻辑的情况下, 在源文件中**嵌入一些补充信息**。
- 在`JavaSE`中，注解的使用目的比较简单，例如**标记过时的功能，忽略警告**等。在`JavaEE/Android`中注解占据了更重要的角色，例如用来**配置应用程序的任何切面**，代替`JavaEE`旧版中所遗留的繁冗代码和`XML`配置等。





## 2、注解的作用



- 生成文档相关的注解

- 在**编译时进行格式检查**(JDK内置的几个基本注解)
   - `@Override`: 限定重写父类方法, 该注解只能用于方法
   - `@Deprecated`: 用于表示所修饰的元素(类, 方法等)已过时。通常是因为所修饰的结构危险或存在更好的选择
   - `@SuppressWarnings`: 抑制编译器警告
 - 跟踪代码依赖性，实现替代配置文件功能



```java
@Test
public void test1(){
    // @Deprecated
    Date date = new Date(2021, 2, 3);

    // 灰色是一个未使用的警告
    int i1 = 10;

    // 这样就变黑了，编译将不会再有警告
    @SuppressWarnings("unused")
    int i2 = 10;

    // 表示未使用和未使用泛型
    @SuppressWarnings({"unused", "rawtypes"})
    ArrayList arrayList = new ArrayList();
}
```



## 3、自定义注解



> 参照`@SuppressWarnings`定义！



1. 注解声明为：`@interface`

2. 内部定义成员，通常使用`value`表示
3. 可以指定成员的默认值，使用`default`定义
4. 如果自定义注解没成员，表明是一个**标识**作用。



**说明：**

 * 如果注解有成员，在使用注解时，需要指明成员的值。
 * 自定义注解必须配上注解的信息处理流程(使用**反射**)才意义。
 * 自定义注解通常都会指明两个元注解：`Retention`、`Target`



```java
// 自定义注解
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, MODULE,
        TYPE_PARAMETER, TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation{
    // 1. 可以没有成员变量，没有则表名是一个标识

    // 2. 声明成员变量，可以使用default定义默认值
    String value() default "hello";

    // 3. 也可定义为数组，表示参数为多个
//    String[] value1();
}

@Test
public void test2(){
    // 自定义注解若有成员，必须显示赋值（default除外）
    @MyAnnotation(value = "hi")
    int n = 10;

    // 提供了默认值，可以不写值
    @MyAnnotation
    int m = 10;
}
```







## 4、JDK中的四种元注解



> 对现有的注解进行解释说明的注解！
>
> 后两种不常用。前两种常用，一般自定义注解都要有后两种！





1. `Retention`：指定所修饰的 `Annotation` 的生命周期：`SOURCE\CLASS（默认行为)\RUNTIME`，**只有声明为`RUNTIME`生命周期的注解，才能通过反射获取。**
   1. `RetentionPolicy.SOURCE`：在源文件中有效（即源文件保留），编译器直接丢弃这种策略的注解
   2. `RetentionPolicy.CLASS`：在`class`文件中有效（即`class`保留） ，当运行 `Java` 程序时, `JVM`不会保留注解。 这是默认值
   3. `RetentionPolicy.RUNTIME`：在运行时有效（即运行时保留），当运行 `Java ` 程序时, `JVM`会保留注解。程序可以通过反射获取该注解
2. `Target`：用于指定被修饰的 `Annotation` 能用于修饰哪些程序元素
3. `Documented`：表示所修饰的注解在被`javadoc`解析时，保留下来。
4. `Inherited`：被它修饰的 `Annotation `将具继承性。（解释：即父类使用了带有`Inherited`的注解，子类自动具有该注解）



**`Target`注解的课取值：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/17/c091f6bdcf447d758b7310e81d1c553d.png)



## 5、JDK8中的新注解



#### 5.1、可重复注解@Repeatable



- 在`MyAnnotation`上声明`@Repeatable`，成员值为`MyAnnotations.class`
-  `MyAnnotation`的`Target`和`Retention`**等**元注解与`MyAnnotations`相同。



```java
// JDK8之前实现方式：数组
@interface MyAnnotation{
    String value() default "hello";
}

@interface MyAnnotations{
    MyAnnotation[] value();
}

// 使用
@MyAnnotations({@MyAnnotation(value = "aa"), @MyAnnotation(value = "bb")})
class Person{
}

/****************************************************************/

// JDK8之中实现方式：
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, MODULE,
        TYPE_PARAMETER, TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
// 多一个该注解：
@Repeatable(MyAnnotations.class)
@interface MyAnnotation{
    String value() default "hello";
}

@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, MODULE,
        TYPE_PARAMETER, TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotations{
    MyAnnotation[] value();
}

// 使用：
@MyAnnotation(value = "aa")
@MyAnnotation(value = "bb")
class Person{
}
```





#### 5.2、类型注解



> 在target的属性中加入该类型即可！

- `ElementType.TYPE_PARAMETER` ：表示该注解能写在类型变量的声明语句中，如：泛型声明
- `ElementType.TYPE_USE` ：表示该注解能写在使用类型的任何语句中。



```java
// 类型注解一：TYPE_PARAMETER 能写在类型变量的声明语句中，可以修饰泛型！
// 在target的属性中加入该类型即可！
class P<@MyAnnotation T>{

    // 类型注解二：TYPE_USE 能写在使用类型的任何语句中！
    // 在target的属性中加入该类型即可！
    public void show()throws @MyAnnotation Exception{
        int i = (@MyAnnotation int) 111L;
        ArrayList<@MyAnnotation String> list = new ArrayList<>();
    }
}
```







----





# 四、集合



> **集合概述：**
>
> - Collection：单列集合
>   - List：存储序的、可重复的数据（JDK1.2）
>     - ArrayList：**线程不安全的，效率高**，底层使用`Object[] elementData`存储。（JDK1.2）
>     - LinkedList：对于频繁的插入、删除操作，使用此类效率比`ArrayList`高，底层使用**双向链表**存储。（JDK1.2）
>     - Vector：作为`List`接口的**古老**实现类，**线程安全的，效率低**，底层使用`Object[] elementData`存储。（JDK1.0）
>   - Set：存储无序的、不可重复的数据（JDK1.2）
>     - HashSet：线程不安全的，可以存储`null`值（JDK1.2）
>       - LinkedHashSet：`HashSet`的子类，`HashSet`基础上加了双链表，可按序遍历。对于频繁的插入、删除操作，使用此类效率比`HashSet`高。（JDK1.4）
>     - TreeSet：可以照添加对象的指定属性，进行排序。（JDK1.2）
> - Map：双列数据，存储`key-value`对的数据（JDK1.2）
>   - HashMap：**线程不安全的，效率高**。可存储`null`的`key`和`value`（JDK1.2）
>     - LinkedHashMap：`HashMap`的子类，`HashMap`基础上加了双链表，可按序遍历。对于频繁的插入、删除操作，使用此类效率比`HashMap`高（JDK1.4）
>   - TreeMap：可按`key`进行自然排序或定制排序。（JDK1.2）
>   - Hashtable：作为**古老**的实现类，**线程安全的，效率低**，不能存储`null`的`key`和`value`。（JDK1.0）
>     - Properties：常用来处理配置文件。`key`和`value`都是`String`类型。（JDK1.0）



----





## 1、List源码分析



#### 1.1、ArrayList





> JDK7中的`ArrayList`的对象的创建类似于**单例的饿汉式**，而JDK8中的`ArrayList`的对象的创建类似于**单例的懒汉式**，延迟了数组的创建，节省内存。
>
> 
>
> JDK7中：



- `ArrayList list = new ArrayList()`：底层创建了长度是10的`Object[]`数组`elementData`
- **扩容**：默认情况下，扩容为原来的容量的**1.5倍**，同时需要将原有数组中的数据复制到新的数组中
- **开发中建议**：使用**带参**的构造器：`ArrayList list = new ArrayList(int capacity)`





> JDK8中：



- `ArrayList list = new ArrayList()`：底层`Object[] elementData`初始化为`{}`，**并没创建长度为10的数组**
- 第一次调用`add()`时，底层**才创建**了长度10的数组，并将数据添加到`elementData[0]`







#### 1.2、LinkedList





- `LinkedList list = new LinkedList()`：内部声明了`Node`类型的`first`和`last`属性，默认值为`null`

- `list.add(123)`：将123封装到`Node`中，创建了`Node`对象。



**其中`Node`静态内部类长这样：** 体现了`LinkedList`的双向链表的说法！



```java
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```





#### 1.3、Vector



> 在多线程问题中，即使`vector`是线程安全的，也不去用它，而去用`Collections`工具类的`SynchronizedList`方法去将`ArrayList`扔进去返回的就是线程安全的集合！



- JDK7和JDK8中通过`Vector()`构造器创建对象时，底层都创建了长度为**10**的数组
- **扩容方面**：默认扩容为原来的数组长度的**2倍**。







## 2、Set源码分析



> 关于存储数据无序的、不可重复的说明：
>
> 1. 无序性：不等于随机性。存储的数据在底层数组中并非照数组索引的顺序添加，而是根据数据的**哈希值**决定的。
> 2. 不可重复性：保证添加的元素照`equals()`判断时，不能返回`true`即：相同的元素只能添加一个。
>
> 
>
> 因此，`HashSet`和`LinkedHashSet`存储对象所在类的要求：
>
> 1. 向`Set`（主要指：`HashSet`、`LinkedHashSet`）中添加的数据，其所在的类一定要重写`hashCode()`和`equals()`
> 2. 重写的`hashCode()`和`equals()`尽可能保持一致性：相等的对象必须具有相等的**散列码**
>     * 重写两个方法的小技巧：对象中用作 `equals() `方法比较的 `Field`，都应该用来计算` hashCode `值。
>
> 
>
> **Set接口中没额外定义新的方法，使用的都是Collection中声明过的方法！**
>
> 
>
> 三个实现类底层都是以`Map`存储的，详细的请看下一节的`Map`源码分析！





#### 2.1、HashSet



> **七上八下**存储：
>
> - JDK 7 ：元素`a`放到数组中，指向原来的元素。
> - JDK 8 ：原来的元素在数组中，指向元素`a`



**HashSet元素添加过程：**



- 我们向`HashSet`中添加元素`a`，首先调用元素a所在类的`hashCode()`方法，计算元素`a`的哈希值，此哈希值接着通过某种算法计算出在`HashSet`底层数组中的存放位置（即为：索引位置)，判断数组此位置上是否已经元素：

- 如果此位置上没其他元素，则元素`a`添加成功。 --->情况1
-  如果此位置上其他元素`b`(或以**链表**形式存在的多个元素)，则比较元素`a`与元素`b`的`hash`值：
  -  如果`hash`值不相同，则元素`a`添加成功。--->情况2
  - 如果`hash`值相同，进而需要调用元素`a`所在类的`equals()`方法：
    - `equals()`返回`true`,元素`a`添加失败。
    - `equals()`返回`false`,则元素`a`添加成功。--->情况3





**`HashSet`底层实际是用`HashMap`存储的：**



- 具体细节在下面Map源码分析中详解！



```java
private transient HashMap<E,Object> map;

public HashSet() {
    map = new HashMap<>();
}
```





#### 2.2、LinkedHashSet



> 继承自`HashSet`，同样底层实际使用`LinkedHashMap`存储！
>
> 再添加数据的同时，维护了两个变量存储前后数据位置，类似双链表方式维护！
>
> 具体在`HashMap`中详细讲解！







#### 2.3、TreeSet



1. 向`TreeSet`中添加的数据，要求是**相同类的对象**。
2. 两种**排序**方式：自然排序（实现`Comparable`接口） 和 定制排序（`Comparator`）
3. 底层仍然是使用的`TreeMap`存储





## 3、Map源码分析



>1. `Map`中的`key`：无序的、不可重复的，使用`Set`存储所的`key`  ---> `key`所在的类要重写`equals()`和`hashCode() `
>
>2. `Map`中的`value`：无序的、可重复的，使用`Collection`存储所的`value` --->`value`所在的类要重写`equals()`
>3. 一个键值对：`key-value`构成了一个`Entry`对象。
>4. `Map`中的`entry`：无序的、不可重复的，使用`Set`存储所的`entry`



#### 3.1、HashMap



> JDK7中：



`HashMap map = new HashMap()：`

 * 在实例化以后，底层创建了**长度是16**的一维数组`Entry[] table`

`map.put(key1,value1)：`

 * 首先，调用`key1`所在类的`hashCode()`计算`key1`哈希值，此哈希值经过某种算法计算以后，得到在`Entry`数组中的存放位置。
 * 如果此位置上的数据为空，此时的`key1-value1`添加成功。 ---- **情况1**
 * 如果此位置上的数据不为空，(意味着此位置上存在一个或多个数据(以**链表**形式存在)),比较`key1`和已经存在的一个或多个数据的哈希值：
    * 如果`key1`的哈希值与已经存在的数据的哈希值都不相同，此时`key1-value1`添加成功。---- **情况2**
    * 如果`key1`的哈希值和已经存在的某一个数据(`key2-value2`)的哈希值相同，继续比较：调用`key1`所在类的`equals(key2)`方法，比较：
       * 如果`equals()`返回`false`:此时`key1-value1`添加成功。---- **情况3**
       * 如果`equals()`返回`true`:使用`value1`**替换**`value2`。
 * **补充**：关于情况2和情况3：此时`key1-value1`和原来的数据以**链表**的方式存储。
 * 在不断的添加过程中，会涉及到**扩容问题**：当超出**临界值**(且要存放的位置非空)时，扩容。默认的扩容方式：**扩容为原来容量的2倍**，并将原的数据复制过来。







> JDK8中与之前的不同之处：



1. `new HashMap()`：底层**没**创建一个长度为16的数组
2. JDK8底层的数组是：`Node[]`,而非`Entry[]`
3. 首次调用`put()`方法时，底层**创建长度为16的数组**
4. **JDK7底层结构：数组+链表。jdk8底层结构：数组+链表+红黑树。**
   1. 形成链表时，**七上八下**（jdk7:新的元素指向旧的元素。jdk8：旧的元素指向新的元素）
   2. 当数组的某一个索引位置上的元素以链表形式存在的**数据个数 > 8 且当前数组的长度 > 64**时，此时此索引位置上的所数据**改为使用红黑树存储。**





---





> `HashMap`底层典型属性的属性的说明：



 *  `DEFAULT_INITIAL_CAPACITY` : `HashMap`的默认容量，**16**
 *  `DEFAULT_LOAD_FACTOR`：`HashMap`的默认**负载因子**：**0.75**
 *  `threshold`：扩容的**临界值** = 容量 * 填充因子`：16 * 0.75 => 12
 *  `TREEIFY_THRESHOLD`：`Bucket`中链表长度大于该默认值，转化为**红黑树**，**8**
 *  `MIN_TREEIFY_CAPACITY`：桶中的`Node`被树化时最小的`hash`表容量，**64**
 *  `UNTREEIFY_THRESHOLD` ：`Bucket`中红黑树存储的`Node`小于该默认值，转化为链表

 * `MIN_TREEIFY_CAPACITY` ：桶中的`Node`被树化时最小的`hash`表容量。（当桶中`Node`的数量大到需要变红黑树时，若`hash`表容量小于`MIN_TREEIFY_CAPACITY`时，此时应执行`resize`扩容操作这个`MIN_TREEIFY_CAPACITY`的值至少是`TREEIFY_THRESHOLD`的4倍。）







---



> 负载因子（填充比）的作用：



- 负载因子的大小决定了`HashMap`的数据密度。

 * 负载因子越大密度越大，发生碰撞的几率越高，数组中的链表越容易长,造成查询或插入时的比较次数增多，性能会下降。
 * 负载因子越小，就越容易触发扩容，数据密度也越小，意味着发生碰撞的几率越小，数组中的链表也就越短，查询和插入时比较的次数也越小，性能会更高。但是会浪费一定的内容空间。而且经常扩容也会影响性能，建议初始化预设大一点的空间。
 * 按照其他语言的参考及研究经验，会考虑将负载因子设置为`0.7~0.75`，此时平均检索长度接近于常数







#### 3.2、LinkedHashMap



> `LinkedHashMap`底层使用的结构与`HashMap`相同，因为`LinkedHashMap`继承于`HashMap`.
>
> 区别就在于：`LinkedHashMap`内部提供了`Entry`，替换`HashMap`中的`Node`.





```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}


static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```





#### 3.3、TreeMap



- 向`TreeMap`中添加`key-value`，要求`key`必须是由**同一个类**创建的对象！
- 照`key`进行排序：自然排序 、定制排序



#### 3.4、Properties



> 是`Hashtable`的子类常用来处理配置文件。`key`和`value`都是`String`类型！
>
> 本测试不放到`main`中找不到配置文件！
>
> **配置文件中文乱码**：打开IDEA设置的`file encoding` 中的`Properties`的勾勾！并且**删掉原配置文件重新新建**！
>
> **配置文件新建方式**：选择`Resource Bundle`写入文件名回车即可！ 配置文件中**不要有空格**！

```java
public static void main(String[] args){
    FileInputStream fis = null;
    try {
        Properties pros = new Properties();

        // 加载配置文件到流
        fis = new FileInputStream("test.properties");
        pros.load(fis);

        String name = pros.getProperty("name");
        String password = pros.getProperty("password");
        System.out.println(name + " " + password);
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if(fis != null){
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```







---

# 五、泛型



> JDK5.0新增！

---



## 1、泛型注意事项



2. 泛型类的构造器如下：`public GenericClass(){}`。而下面是错误的：`public GenericClass<E>(){}`
3. 实例化后，操作原来泛型位置的结构必须与指定的泛型类型一致。
4. **泛型不同的引用不能相互赋值**：尽管在编译时`ArrayList<String>`和`ArrayList<Integer>`是两种类型，但是，在运行时只有一个`ArrayList`被加载到JVM中。
5. 泛型如果不指定，将被擦除，泛型对应的类型均按照Object处理，但不等价于Object。 经验：泛型要使用一路都用。要不用，一路都不要用。
7. **jdk1.7**，泛型的**简化**操作：`ArrayList<Fruit> flist = new ArrayList<>();`
8. 泛型的指定中不能使用基本数据类型，可以使用包装类替换
9. 在类/接口上声明的泛型，在本类或本接口中即代表某种类型，可以作为非静态属性的类型、非静态方法的参数类型、非静态方法的返回值类型。**但在静态方法中不能使用类的泛型**。（**静态方法在类创建时加载时，但此时还没有造对象，T并不清楚**）
10. **异常类不能是泛型**的 `try catch(T e)`也不行！
11. 不能使用`new E[]`。但是可以：`E[] elements = (E[])new Object[capacity];`参考：`ArrayList`源码中声明：`Object[] elementData`，而非泛型参数类型数组。
12. 父类有泛型，子类可以选择保留泛型也可以选择指定泛型类型：
    1. 子类不保留父类的泛型：按需实现
       2. 没有类型 擦除
       2. 具体类型
    2. 子类保留父类的泛型：泛型子类
       1. 全部保留
       2. 部分保留



---



**关于第10点的说明：**



> 防止晕头转向，这里稍微总结一下：看每种情况后面的泛型！



```java
class Father<T1, T2> {
}
// 子类不保留父类的泛型
// 1)没有类型 擦除：<Object,Object>
class Son1 extends Father {// 等价于class Son extends Father<Object,Object>{
}
// 2)具体类型：<Integer, String>
class Son2 extends Father<Integer, String> {
}
// 子类保留父类的泛型 
// 1)全部保留：<任意类型1, 任意类型2>
class Son3<T1, T2> extends Father<T1, T2> {
}
// 2)部分保留：<Integer, 任意类型2>
class Son4<T2> extends Father<Integer, T2> {
}

//====================================================================================

// 子类不保留父类的泛型
// 1)没有类型 擦除：<Object,Object>
class Son<A, B> extends Father{//等价于class Son extends Father<Object,Object>{
}
// 2)具体类型：默认为<Integer, String>，但子类泛型若指定，父类泛型失效
class Son2<A, B> extends Father<Integer, String> {
}
// 子类保留父类的泛型
// 1)全部保留：<任意类型1, 任意类型2，任意类型3，任意类型4>
class Son3<T1, T2, A, B> extends Father<T1, T2> {
}
// 2)部分保留：<Ingeter, 任意类型2，任意类型3，任意类型4>
class Son4<T2, A, B> extends Father<Integer, T2> {
}
```











## 2、泛型方法



> 泛型方法：在方法中出现了泛型的结构，泛型参数与类的泛型参数没有任何关系。
>
> **换句话说，泛型方法所属的类是不是泛型类都没关系。**
>
> 泛型方法，可以声明为**静态**的。原因：泛型参数是在调用方法时确定的。并非在实例化类时确定。





#### 2.1、格式



```java
[ 访问权限] < 泛型> 型 返回类型 名 方法名([ 泛型标识 称 参数名称])  抛出的异常
```



#### 2.2、举例



```java
// <E>：作用：表名E是一个泛型而不是一个类！
public <E> List<E> copyArrayFromList(E[] arr){
    ArrayList<E> list = new ArrayList<>();
    for(E e : arr){
        list.add(e);
    }
    return list;
}

@Test
public void test5(){
    Person<String> p = new Person<>();
    Integer[] integer = new Integer[] {1, 2, 3, 4};
    // 泛型方法调用时，指明泛型参数类型
    List<Integer> list = p.copyArrayFromList(integer);

    System.out.println(list); // [1, 2, 3, 4]
}
```









## 3、泛型在继承方面体现



- 虽然类`A`是类`B`的父类，但是`G<A> `和`G<B>`二者不具备子父类关系，二者是**并列关系。**
- 补充：类`A`是类`B`的父类（或接口），`A<G> `是 `B<G>` 的父类



```java
@Test
public void test6(){
    ArrayList<String> list1 = new ArrayList<>();
    ArrayList<Integer> list2 = new ArrayList<>();

    // 编译错误：二者内存上指向同一个地址，对list1的操作会导致list2也修改，会产生类型不一致问题！
    //        list1 = list2;


    List<String> list3 = null;
    AbstractList<String> list5 = null;
    ArrayList<String> list4 = null;

    // 编译通过：
    list3 = list4;`
    list5 = list4;
}
```











## 4、通配符使用



> 通配符：`?`
>
> - 类`A`是类`B`的父类，`G<A>`和`G<B>`是没关系的，二者**共同的父类**是：`G<?>`







**限制条件的通配符的使用：**

- `? extends A`: 上界是`A`。  `G<? extends A>` 可以作为`G<A>`和`G<B>`的父类，其中B是A的子类
- `? super A`: 下界是`A` 。`G<? super A>` 可以作为`G<A>`和`G<B>`的父类，其中B是A的父类



```java
@Test
public void test7(){
    ArrayList<Object> list1 = new ArrayList<>();
    ArrayList<String> list2 = new ArrayList<>();

    ArrayList<?> list = new ArrayList<>();

    // 可赋值！

    list = list1;
    list = list2;

    show(list);

    // 允许读不允许写：
    //        list.add("AA");
    // 不允许写：null除外（任何类型都可以使用null赋值）
    list.add(null);

    // 允许读：返回为Object（任何类型父类都是Object）
    Object o = list.get(0);

    ArrayList<? extends Person> list3 = null;
    ArrayList<? super Person> list4 = null;

    ArrayList<Person> list5 = null;
    ArrayList<Sons> list6 = null;
    ArrayList<Object> list7 = null;

    // =========================

    // 父类接收子类
    list3 = list5;
    list3 = list6;
    //        list3 = list7;

    // 父类接收子类
    list4 = list5;
    //        list4 = list6;
    list4 = list7;

    // 读取数据举例：都是拿上界去接受即可！
    Person p = list3.get(0);
    Object o1 = list4.get(0);

    // 写入数据举例：
    // 编译错误：list3就是继承自Person的子类，但并不明确是哪个子类，无法放入数据！
    //        list3.add(new Person());
    // 编译正确：list4是Person的父类，自然可以放入Person及其子类！
    list4.add(new Person());
    list4.add(new Sons());
}

public void show(List<?> list){
    Iterator<?> iterator = list.iterator();
    while(iterator.hasNext()){
        System.out.println(iterator.next());
    }
}
```