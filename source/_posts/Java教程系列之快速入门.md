---
title: Java教程系列之快速入门
author: Mr.Niu
toc: true
abbrlink: 12025
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/mmexport1581051788215.jpg'
categories:
  - Java教程
tags:
  - 基础
  - 入门
  - Java
date: 2020-02-09 19:50:45
updated:
top_img: https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/mmexport1581051788215.jpg
---



## 首先来首歌曲来放松一下吧！

{% meting "1407551413" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}

## 为什么Java应用最广泛？

### 从互联网到企业平台，Java是应用最广泛的编程语言，原因在于：

- Java是基于JVM虚拟机的跨平台语言，一次编写，到处运行；
- Java程序易于编写，而且有内置垃圾收集，不必考虑内存管理；
- Java虚拟机拥有工业级的稳定性和高度优化的性能，且经过了长时期的考验；
- Java拥有最广泛的开源社区支持，各种高质量组件随时可用。

### Java语言常年霸占着三大市场：

- 互联网和企业应用，这是Java EE的长期优势和市场地位；
- 大数据平台，主要有Hadoop、Spark、Flink等，他们都是Java或Scala（一种运行于JVM的编程语言）开发的；
- Android移动平台。

这意味着Java拥有最广泛的就业市场。



## 一、Java 的诞生

### Java的出现

> Java最早是由SUN公司（已被Oracle收购）的[詹姆斯·高斯林](https://en.wikipedia.org/wiki/James_Gosling)（高司令，人称Java之父）在上个世纪90年代初开发的一种编程语言，最初被命名为Oak，目标是针对小型家电设备的嵌入式应用，结果市场没啥反响。谁料到互联网的崛起，让Oak重新焕发了生机，于是SUN公司改造了Oak，在1995年以Java的名称正式发布，原因是Oak已经被人注册了，因此SUN注册了Java这个商标。随着互联网的高速发展，Java逐渐成为最重要的网络编程语言。

### Java语言类型

> Java介于编译型语言和解释型语言之间。
>
> 编译型语言如C、C++，代码是直接编译成机器码执行，但是不同的平台（x86、ARM等）CPU的指令集不同，因此，需要编译出每一种平台的对应机器码。
>
> 解释型语言如Python、Ruby没有这个问题，可以由解释器直接加载源码然后运行，代价是运行效率太低。
>
> 而Java是将代码编译成一种“字节码”，它类似于抽象的CPU指令，然后，针对不同平台编写虚拟机，不同平台的虚拟机负责加载字节码并执行，这样就实现了“一次编写，到处运行”的效果。当然，这是针对Java开发者而言。对于虚拟机，需要为每个平台分别开发。为了保证不同平台、不同公司开发的虚拟机都能正确执行Java字节码，SUN公司制定了一系列的Java虚拟机规范。从实践的角度看，JVM的兼容性做得非常好，低版本的Java字节码完全可以正常运行在高版本的JVM上。

### Java三个版本



- Java SE：Standard Edition
- Java EE：Enterprise Edition
- Java ME：Micro Edition

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210191720.png)

> Java SE就是标准版，包含标准的JVM和标准库
>
> 而Java EE是企业版，它只是在Java SE的基础上加上了大量的API和库，以便方便开发Web应用、数据库、消息服务等，Java EE的应用使用的虚拟机和Java SE完全相同。
>
> Java ME就和Java SE不同，它是一个针对嵌入式设备的“瘦身版”，Java SE的标准库无法在Java ME上使用，Java ME的虚拟机也是“瘦身版”。

### Java学习路线



1. 首先要学习Java SE，掌握Java语言本身、Java核心开发技术以及Java标准库的使用；
2. 如果继续学习Java EE，那么Spring框架、数据库开发、分布式架构就是需要学习的；
3. 如果要学习大数据开发，那么Hadoop、Spark、Flink这些大数据平台就是需要学习的，他们都基于Java或Scala开发；
4. 如果想要学习移动开发，那么就深入Android平台，掌握Android App开发。

无论怎么选择，Java SE的核心技术是基础



### Java版本

> 1995年发布，目前已经到了 Java13



### 名次解释



#### JDK 和 JRE

- JDK：Java Development Kit
- JRE：Java Runtime Environment

> JRE就是运行Java字节码的虚拟机。但是，如果只有Java源码，要编译成Java字节码，就需要JDK，因为JDK除了包含JRE，还提供了编译器、调试器等开发工具。

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210192759.png)

#### JSR 和JCP

- JSR规范：Java Specification Request
- JCP组织：Java Community Process

#### RI 和 TCK



> 比如有人提议要搞一个基于Java开发的消息服务器，这个提议很好啊，但是光有提议还不行，得贴出真正能跑的代码，这就是RI。如果有其他人也想开发这样一个消息服务器，如何保证这些消息服务器对开发者来说接口、功能都是相同的？所以还得提供TCK。
>
> 通常来说，RI只是一个“能跑”的正确的代码，它不追求速度，所以，如果真正要选择一个Java的消息服务器，一般是没人用RI的，大家都会选择一个有竞争力的商用或开源产品。



- RI：Reference Implementation                   参考实现
- TCK：Technology Compatibility Kit          兼容性测试套件

## 二、JDK的安装



### 环境变量配置



>  都在系统变量里设置：

#### 1、新建`JAVA_HOME`变量，变量值为安装JDK的路径

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210201656.png)



#### 2、新建`CLASSPATH`变量，变量值为`.;%JAVA_HOME%\lib`。

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210201734.png)



3、新增`CLASSPATH`变量，变量值为`%JAVA_HOME%\bin`。

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210201804.png)

 找到PATH点击编辑->新建



![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210201827.png)



### 测试

win + R键打开cmd:

输入`java -version`，若显示如下，则说明配置正确，否则需要检查路径问题，重新配置。

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210202637.png)



## 三、Java编程规范



```java
public class Hello 
{
    public static void main(String[] args)
    {
        System.out.println("Hello, world!");
    }
}
```



### 大小写敏感

- Java规定，某个类定义的`public static void main(String[] args)`是Java程序的固定入口方法，因此，Java程序总是从`main`方法开始执行。

- 当我们把代码保存为文件时，文件名必须是`Hello.java`，而且文件名也要注意大小写，因为要和我们定义的类名`Hello`完全保持一致。

<p style="color: red; font-size: 25px">注意：文件名，必须和类名一致。</p>

### 运行程序

> Java源码本质上是一个文本文件，我们需要先用`javac`把`Hello.java`编译成字节码文件`Hello.class`，然后，用`java`命令执行这个字节码文件：
>
> 因此，可执行文件`javac`是编译器，而可执行文件`java`就是虚拟机。
>
> 或者直接使用`java hello.java` 一次性完成两个过程

```bash
$ javac hello.java //生成hello.class
$ java hello

$ java hello.java
```

- 第一种，javac 后跟`文件名.java` , java后跟 类名，无后缀。
- 第二种，直接java 后跟`文件名.java`

> 需要注意的是，在实际项目中，单个不依赖第三方库的Java源码是非常罕见的，所以，绝大多数情况下，我们无法直接运行一个Java源码文件，原因是它需要依赖其他的库。

> 1.Java保存的文件名必须与类名一致； 
>
> 2.如果文件中只有一个类，文件名必须与类名一致； 
>
> 3.一个Java文件中只能有一个public类； 
>
> 4.如果文件中不止一个类，文件名必须与public类名一致； 
>
> 5.如果文件中不止一个类，而且没有public类，文件名可与任一类名一致。

## 四、java 程序基础

### 1、类

>  Java是面向对象的语言，一个程序的基本单位就是`class`，`class`是关键字



类名要求：

- 类名必须以英文字母开头，后接字母，数字和下划线的组合
- 习惯以大写字母开头



<p style="color: red; font-size: 25px">注意：</p> 


- Java入口程序规定的方法必须是静态方法，方法名必须为`main`，括号内的参数必须是String数组。
- 在`class`内部，可以定义若干方法（method）
- 句子以分号结束

### 2、注释

- // ：单行注释
- /* */：多行注释
- /**          */：如果有多行，每行通常以星号开头，可以用来自动创建文档的注释



```java
/**
 * 可以用来自动创建文档的注释
 * 
 * @auther Mr.Niu
 */
public class Hello 
{
    public static void main(String[] args) 
    {
        System.out.println("Hello, world!");
    }
}
```

### 3、数据类型

> 计算机内存的最小存储单元是字节（byte），一个字节就是一个8位二进制数，即8个bit。它的二进制表示范围从`00000000~11111111`，换算成十进制是`0~255`，换算成十六进制是`00~ff`。

- 整数类型：
  - byte						一个字节
  - short                       两个字节
  - int                            四个字节
  - long                         八个字节
- 浮点数类型：
  - float                         四个字节
  - double                     八个字节
- 字符类型：
  - char                          两个字节
- 布尔类型：
  - boolean                   两个字节

So.......范围如下：

- byte：-128 ~ 127
- short: -32768 ~ 32767
- int: -2147483648 ~ 2147483647
- long: -9223372036854775808 ~ 9223372036854775807

注意：long型数据结尾需要加`L`，否则会报错。不加L默认为int型。

```java
public class Main
{
    public static void main(String[] args) 
    {
        int i = 2147483647;
        int i2 = -2147483648;
        int i3 = 2_000_000_000; // 加下划线更容易识别
        int i4 = 0xff0000; // 十六进制表示的16711680
        int i5 = 0b1000000000; // 二进制表示的512
        long l = 9000000000000000000L; // long型的结尾需要加L
    }
}
```

注意：float型数据末尾必须加`f`，否则会报错，不加f默认为double类型。

```java
float f1 = 3.14f;
float f2 = 3.14e38f; // 科学计数法表示的3.14x10^38
double d = 1.79e308;
double d2 = -1.79e308;
double d3 = 4.9e-324; // 科学计数法表示的4.9x10^-324
```

浮点数可表示的范围非常大，`float`类型可最大表示3.4x10<sup>38</sup>，而`double`类型可最大表示1.79x10<sup>308</sup>。



注意：boolean类型只有flase 和 true两个值

```java
boolean b1 = true;
boolean b2 = false;
boolean isGreater = 5 > 3; // 计算结果为true
int age = 12;
boolean isAdult = age >= 18; // 计算结果为false
```



注意：char类型既可以表示ASCII码也可以表示Unicode字符

- 单引号表示字符，双引号表示字符串

```java
public class Main
{
    public static void main(String[] args) 
    {
        char a = 'A';
        char zh = '中';
        System.out.println(a);
        System.out.println(zh);
    }
}

```

### 4、常量

> 定义变量的时候，如果加上`final`修饰符，这个变量就变成了常量：

```java
final double PI = 3.14; // PI是一个常量
double r = 5.0;
double area = PI * r * r;
PI = 300; // compile error!
```

### 5、var关键字

> 编译器会根据赋值语句自动推断出变量类型，省时，省力

```java
StringBuilder sb = new StringBuilder();

var sb = new StringBuilder();
```



### 6、数据运算



#### 除0编译可以通过，但运行会报错

#### 可以使用`+=`等等

#### 可以使用`++`、`--` 运算符

#### 移位运算

- 带符号位移动：
  - 左移 `<<` ：相当于乘2
  - 右移 `>>` ：相当于除2
- 不带符号位移动：
  - 右移 `>>>` ：相当于除2

```java
int n = 7;       // 00000000 00000000 00000000 00000111 = 7
int a = n << 1;  // 00000000 00000000 00000000 00001110 = 14
int b = n << 2;  // 00000000 00000000 00000000 00011100 = 28
int c = n >> 1;  // 00000000 00000000 00000000 00000011 = 3
int d = n >> 2;  // 00000000 00000000 00000000 00000001 = 1
```

注意：对一个负数进行右移，最高位的`1`不动，结果仍然是一个负数：

```java
int n = -536870912;
int a = n >> 1;  // 11110000 00000000 00000000 00000000 = -268435456
int b = n >> 2;  // 10111000 00000000 00000000 00000000 = -134217728
int c = n >> 28; // 11111111 11111111 11111111 11111110 = -2
int d = n >> 29; // 11111111 11111111 11111111 11111111 = -1
```

注意：使用不带符号右移，负数右移，会将最高位符号位也右移，变为正数

```java
int n = -536870912;
int a = n >>> 1;  // 01110000 00000000 00000000 00000000 = 1879048192
int b = n >>> 2;  // 00111000 00000000 00000000 00000000 = 939524096
int c = n >>> 29; // 00000000 00000000 00000000 00000111 = 7
int d = n >>> 31; // 00000000 00000000 00000000 00000001 = 1
```

注意：对`byte`和`short`类型进行移位时，会首先转换为`int`再进行位移。

### 7、位运算

>  位运算是按位进行与、或、非和异或的运算。

- &：按位与 
- | ：按位或
- ~ ：按位非
- ^ ： 按位异或 :不同为1，相同为0

### 8、运算符优先级

从高到低：

- `()`
- `!` `~` `++` `--`
- `*` `/` `%`
- `+` `-`
- `<<` `>>` `>>>`
- `&`
- `|`
- `+=` `-=` `*=` `/=`

### 9、类型提升和强转类型转换

略，太简单了！

### 10、浮点数

> 由于计算机二进制表示，判断浮点数相等仍得通过阀值和绝对值函数来实现。

```java
// 比较x和y是否相等，先计算其差的绝对值:
double r = Math.abs(x - y);
// 再判断绝对值是否足够小:
if (r < 0.00001) {
    // 可以认为相等
} else {
    // 不相等
}
```

### 11、溢出

- `NaN`表示Not a Number
- `Infinity`表示无穷大
- `-Infinity`表示负无穷大

```java
double d1 = 0.0 / 0; // NaN
double d2 = 1.0 / 0; // Infinity
double d3 = -1.0 / 0; // -Infinity
```

### 12、boolean运算

- 比较运算符：`>`，`>=`，`<`，`<=`，`==`，`!=`
- 与运算 `&&`
- 或运算 `||`
- 非运算 `!`

```java
boolean isGreater = 5 > 3; // true
int age = 12;
boolean isZero = age == 0; // false
boolean isNonZero = !isZero; // true
boolean isAdult = age >= 18; // false
boolean isTeenager = age >6 && age <18; // true
```

注意：若boolean运算可以判断最终结果为真或假，则不会进行后续无意义计算，即便后面有除0运算

```java
boolean result = true || (5 / 0 > 0); // true
```

### 13、三目运算符

`？：`

...不介绍了。

### 14、字符和字符串

#### char

> char类型既可以表示ASCII码也可以表示Unicode字符
>
> 用转义字符`\u`+Unicode编码来表示一个字符：

```java
// 注意是十六进制:
char c3 = '\u0041'; // 'A'，因为十六进制0041 = 十进制65
char c4 = '\u4e2d'; // '中'，因为十六进制4e2d = 十进制20013
```



#### String

> 用双引号表示
>
> 用\表示转义

##### 字符串连接

> 用+号连接

```java
public class Main
{
    public static void main(String[] args) 
    {
        String s1 = "Hello";
        String s2 = "world";
        String s = s1 + " " + s2 + "!";
        System.out.println(s);
    }
}
```



##### 多行字符串

- 笨办法：

```java
String s = "first line \n"
         + "second line \n"
         + "end";
```

- 新办法：

```java
String s = """ 
           SELECT * FROM
             users
           WHERE id > 100
           ORDER BY name DESC
    		"""
String s = """ 
           SELECT * FROM
             users
           WHERE id > 100
           ORDER BY name DESC""";
String s = """ 
SELECT * FROM
users
WHERE id > 100
ORDER BY name DESC""";
```



![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200210223841.png)

注意：上面表示五行还有一个换行符`\n`

注意：下面表示四行，没有换行符

注意：最终格式总是以最靠左边的为基准。

第三种可以避免空格问题出现。。

若要使用cmd：

```bash
$ javac --source 13 --enable-preview Main.java
```

##### String的不可变特性

```java
public class Main 
{
    public static void main(String[] args) 
    {
        String s = "hello";
        System.out.println(s); // 显示 hello
        s = "world";
        System.out.println(s); // 显示 world
    }
}
```

> 原来的字符串`"hello"`还在，只是我们无法通过变量`s`访问它而已。因此，字符串的不可变是指字符串内容不可变。
>
> 相当于指针指向换了，

##### 空值null

```java
String s1 = null; // s1是null
String s2; // 没有赋初值值，s2也是null
String s3 = s1; // s3也是null
String s4 = ""; // s4指向空字符串，不是null
```

### 15、数组类型

#### 数组定义

> 定义一个数组类型的变量，使用数组类型“类型[]”，例如，`int[]`。和单个基本类型变量不同，数组变量初始化必须使用`new int[5]`表示创建一个可容纳5个`int`元素的数组

Java的数组有几个特点：

- 数组所有元素初始化为默认值，整型都是`0`，浮点型是`0.0`，布尔型是`false`；
- 数组一旦创建后，大小就不可改变。
- 可以使用`.length`来获取数组长度

##### 第一种

```java
public class Main 
{
    public static void main(String[] args) 
    {
        int[] ns = new int[5];
        System.out.println(ns.length); // 5
    }
}
```

##### 第二种

可以用{}来初始化，自动推算数组大小：

```java
public class Main 
{
    public static void main(String[] args)
    {
        // 5位同学的成绩:
        int[] ns = new int[] { 68, 79, 91, 85, 62 };
        System.out.println(ns.length); // 编译器自动推算数组大小为5
    }
}

```

##### 第三种：简略版

```java
int[] ns = { 68, 79, 91, 85, 62 };
```

#### 数组大小不可变

如下：

```java
public class Main 
{
    public static void main(String[] args) 
    {
        // 5位同学的成绩:
        int[] ns;
        ns = new int[] { 68, 79, 91, 85, 62 };
        System.out.println(ns.length); // 5
        ns = new int[] { 1, 2, 3 };
        System.out.println(ns.length); // 3
    }
}
```



看似大小变了，实际是数组指向变了，由原来指向五个数据的地方，指向了三个数据地方，而原来五个数组没有指向他的，所以无法访问了。

原有的5个元素的数组并没有改变，只是无法通过变量`ns`引用到它们而已。



String类型数组，一样，改变一个值，值并没有消失，只是指向改变了，原来的值无法通过下标为1的数组来访问。



```java
public class Main
{
    public static void main(String[] args)
    {
        String[] names = {"ABC", "XYZ", "zoo"};
        String s = names[1];
        names[1] = "cat";
        System.out.println(s); // XYZ
    }
}
```



## 五、流程控制



### 1、输出

 #### System.out.println()

>  `println`是print line的缩写，表示输出并换行

#### System.out.print()

> `print`：不换行

```java
public class Main 
{
    public static void main(String[] args) 
    {
        System.out.print("A,");
        System.out.print("B,");
        System.out.print("C.");
        System.out.println();//可以用来换行
        System.out.println("END");
    }
}
```



#### System.out.printf()

> 格式化输出，和C语言printf类似
>
> 可以%08.3f来控制小数与宽度与补位数

占位符：

|   %d |          格式化输出整数          |
| ---: | :------------------------------: |
|   %x |      格式化输出十六进制整数      |
|   %f |         格式化输出浮点数         |
|   %e | 格式化输出科学计数法表示的浮点数 |
|   %s |           格式化字符串           |



注意，由于%表示占位符，因此，连续两个%%表示一个%字符本身



```java
public class Main
{
    public static void main(String[] args) 
    {
        int n = 12345000;
        System.out.printf("n=%d, hex=%08x\n", n, n); 
        double d = 239.3839;
        System.out.printf("%09.2f", d);//000239.38
    }
}
```

### 2、输入



> 首先，我们通过`import`语句导入`java.util.Scanner`，`import`是导入某个类的语句，必须放到Java源代码的开头
>
> 然后，创建`Scanner`对象并传入`System.in`。`System.out`代表标准输出流，而`System.in`代表标准输入流。直接使用`System.in`读取用户输入虽然是可以的，但需要更复杂的代码，而通过`Scanner`就可以简化后续的代码。
>
> 有了`Scanner`对象后，要读取用户输入的字符串，使用`scanner.nextLine()`，要读取用户输入的整数，使用`scanner.nextInt()`。`Scanner`会自动转换数据类型，因此不必手动转换。

```java
import java.util.Scanner;

public class Main
{
    public static void main(String[] args) 
    {
        Scanner scanner = new Scanner(System.in); // 创建Scanner对象
        System.out.print("Input your name: "); // 打印提示
        String name = scanner.nextLine(); // 读取一行输入并获取字符串
        System.out.print("Input your age: "); // 打印提示
        int age = scanner.nextInt(); // 读取一行输入并获取整数
        System.out.printf("Hi, %s, you are %d\n", name, age); // 格式化输出
    }
}
```

### 3、if语句



#### 判断引用类型相等

>  在Java中，判断值类型的变量是否相等，可以使用`==`运算符。
>
> 但是，判断引用类型的变量是否相等，`==`表示“引用是否相等”，或者说，是否指向同一个对象。
>
> 例如，下面的两个String类型，它们的内容是相同的，但是，分别指向不同的对象，用`==`判断，结果为`false`：



```java
public class Main 
{
    public static void main(String[] args) 
    {
        String s1 = "hello";
        String s2 = "HELLO".toLowerCase();
        System.out.println(s1);
        System.out.println(s2);
        if (s1 == s2)
            System.out.println("s1 == s2");
        else
            System.out.println("s1 != s2");
    }
}

```

> 要判断引用类型的变量内容是否相等，必须使用`equals()`方法：



```java
public class Main 
{
    public static void main(String[] args) 
    {
        String s1 = "hello";
        String s2 = "HELLO".toLowerCase();
        System.out.println(s1);
        System.out.println(s2);
        if (s1.equals(s2))
            System.out.println("s1 equals s2");
        else
            System.out.println("s1 not equals s2");
    }
}
```

注意： 执行语句`s1.equals(s2)`时，如果变量`s1`为`null`，会报`NullPointerException`：



### 4、switch语句

> switch case break default
>
> 与C++一样，不介绍



#### switch表达式

> 使用`switch`时，如果遗漏了`break`，就会造成严重的逻辑错误，而且不易在源代码中发现错误。
>
> 从Java 12开始，`switch`语句升级为更简洁的表达式语法，使用类似模式匹配（Pattern Matching）的方法，保证只有一种路径会被执行，并且不需要`break`语句：
>
> 注意新语法使用`->`，如果有多条语句，需要用`{}`括起来。不要写`break`语句，因为新语法只会执行匹配的语句，没有穿透效应。

```java
public class Main
{
    public static void main(String[] args) 
    {
        String fruit = "apple";
        switch (fruit) 
        {
        	case "apple" -> System.out.println("Selected apple");
        	case "pear" -> System.out.println("Selected pear");
        	case "mango" -> 
            {
            	System.out.println("Selected mango");
            	System.out.println("Good choice!");
        	}
        	default -> System.out.println("No fruit selected");
        }
    }
}
```

```java
public class Main 
{
    public static void main(String[] args)
    {
        String fruit = "apple";
        int opt = switch (fruit) 
        {
            case "apple" -> 1;
            case "pear", "mango" -> 2;
            default -> 0;
        }; // 注意赋值语句要以;结束
        System.out.println("opt = " + opt);
    }
}
```

### 5、yield

> 大多数时候，在`switch`表达式内部，我们会返回简单的值。
>
> 但是，如果需要复杂的语句，我们也可以写很多语句，放到`{...}`里，然后，用`yield`返回一个值作为`switch`语句的返回值：

````java
public class Main
{
    public static void main(String[] args) 
    {
        String fruit = "orange";
        int opt = switch (fruit) 
        {
            case "apple" -> 1;
            case "pear", "mango" -> 2;
            default -> 
            {
                int code = fruit.hashCode();
                yield code; // switch语句返回值
            }
        };
        System.out.println("opt = " + opt);
    }
}
````

运行结果：

> 注: Main.java 使用预览语言功能。
> 注: 有关详细信息，请使用 -Xlint:preview 重新编译。
> opt = -1008851410



### 6、while和do while



略。。。与C++一样。。。



### 7、for循环

略。。。与C++一样。。。

#### for each

> 和`for`循环相比，`for each`循环的变量n不再是计数器，而是直接对应到数组的每个元素。`for each`循环的写法也更简洁。但是，`for each`循环无法指定遍历顺序，也无法获取数组的索引。
>
> 除了数组外，`for each`循环能够遍历所有“可迭代”的数据类型，包括后面会介绍的`List`、`Map`等。



```java
public class Main
{
    public static void main(String[] args) 
    {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int n : ns) 
        {
            System.out.println(n);
        }
    }
}
```

### 8、break 和 continue

略。。。与C++一样。。。

## 六、 数组操作



### 1、for each 遍历

参考第五个的for each

### 2、直接打印数组名

>  得到的是在JVM中的地址。。。

### 3、`Arrays.toString()`

> 需引入java.util.Arrays库，可以用来遍历数组

```java
import java.util.Arrays;

public class Main 
{
    public static void main(String[] args) 
    {
        int[] ns = { 1, 1, 2, 3, 5, 8 };
        System.out.println(Arrays.toString(ns));//[1, 1, 2, 3, 5, 8]
    }
}

```

### 4、`Arrays.sort()`

> 排序
>
> 对int排序，数组内存存储顺序已经改变
>
> 对String类型排序，数组内存存储顺序没有改变，只是指向的改变

```java
import java.util.Arrays;

public class Main 
{
    public static void main(String[] args) 
    {
        int[] ns = { 28, 12, 89, 73, 65, 18, 96, 50, 8, 36 };
        Arrays.sort(ns);
        System.out.println(Arrays.toString(ns));
    }
}

```

### 5、多维数组



#### 多维数组定义：

```java
public class Main 
{
    public static void main(String[] args) 
    {
        int[][] arr = new int[100][100];
        int[][] ns = 
        {
            { 1, 2, 3, 4 },
            { 5, 6, 7, 8 },
            { 9, 10, 11, 12 }
        };
        System.out.println(ns.length); // 3
    }
}

```

#### 多维数组遍历

> 普通遍历
>
> 使用for each遍历



````java
public class Main 
{
    public static void main(String[] args) 
    {
        int[][] arr = new int[100][100];
        int[][] ns = 
        {
            { 1, 2, 3, 4 },
            { 5, 6, 7, 8 },
            { 9, 10, 11, 12 }
        };
        
        for (int[] t : ns) 
        {
            for (int n : t) 
            {
                System.out.print(n);
                System.out.print(", ");
            }
            System.out.println();
        }
}
````

### 6、命令行参数

> 命令行参数类型是`String[]`数组；
>
> 命令行参数由JVM接收用户输入并传给`main`方法；
>
> 我们可以利用接收到的命令行参数，根据不同的参数执行不同的代码。例如，实现一个`-version`参数，打印程序版本号

```java
public class Main 
{
    public static void main(String[] args)
    {
        for (String arg : args)
        {
            System.out.println(arg);
        }
        for (String arg : args) 
        {
            if ("-version".equals(arg)) 
            {
                System.out.println("v 1.0");
                break;
            }
        }
    }
}
```

```bash
$ javac Main.java
$ java Main -version # 传一个参数
v 1.0
```



# 快速入门结束，敬请期待后续内容，to be continued.

