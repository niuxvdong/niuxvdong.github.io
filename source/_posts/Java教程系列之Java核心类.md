---
title: Java教程系列之Java核心类
author: Mr.Niu
toc: true
abbrlink: 22799
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@11228a65b2c18cadaa52b67e37eb1c63c8ca6362/2021/02/06/dbce4ec19a17c8cd73e7695dbbbbd2d0.png'
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@11228a65b2c18cadaa52b67e37eb1c63c8ca6362/2021/02/06/dbce4ec19a17c8cd73e7695dbbbbd2d0.png'
categories:
  - Java教程
tags:
  - String
  - JavaBean
  - 包装类型
date: 2020-03-27 17:56:43
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "30953009" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}





## 一、字符串和编码



### 1、字符串（String）





> 在Java中，`String`是一个引用类型，它本身也是一个`class`。但是，Java编译器对`String`有特殊处理，即可以直接用`"..."`来表示一个字符串！
>
> 实际上字符串在`String`内部是通过一个`char[]`数组表示的，因此，按下面的写法也是可以的！
>
> 因为`String`太常用了，所以Java提供了`"..."`这种字符串字面量表示方法。
>
> Java字符串的一个重要特点就是字符串*不可变*。这种不可变性是通过内部的`private final char[]`字段，以及没有任何修改`char[]`的方法实现的。





```java
String s1 = "hello!";
String s2 = new String(new char[] {'H', 'e', 'l', 'l', 'o', '!'});
```

> 下面这个输出结果不一样，因为不可变性，所以其实就是指向变了！原来的字符串仍然在内存中！

```java
public class Main {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s); //Hello
        s = s.toUpperCase(); //HELLO
        System.out.println(s);
    }
}
```



#### 1.1 字符串比较（equal）



> 必须使用`equals()`方法而不能用`==`！
>
> `equal()`方法比较的是实实在在指向的内容！
>
> `==`则比较的指向的对象或实例是否相同！
>
> 一般情况下我们只需要比较内容，所以一定要射用equal方法！



从表面上看，两个字符串用`==`和`equals()`比较都为`true`，但实际上那只是Java编译器在编译期，会自动把所有相同的字符串当作一个对象放入常量池，自然`s1`和`s2`的引用就是相同的。



```java
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "hello";
        System.out.println(s1 == s2);//true
        System.out.println(s1.equals(s2));//true
        
        // 上面纯属巧合！
        String s3 = "hello";
        String s4 = "HELLO".toLowerCase();
        System.out.println(s3 == s4);//false
        System.out.println(s3.equals(s4));//true
    }
}
```



- 要忽略大小写比较，使用`equalsIgnoreCase()`方法。



```java
package com.test;

public class codeTest {
    public static void main(String[] args) {
        String s = "hello";
        String t = s.toUpperCase();
        System.out.println(s.equals(t));//false
        System.out.println(s.equalsIgnoreCase(t));//true
    }
}
```



#### 1.2 字符串搜索



- `contains()`：参数是`CharSequence`而不是`String`，因为`CharSequence`是`String`的父类。查找子串，返回bool型！
- `indexof()`：返回查找第一次出现子串的下标位置！
- `lastIndexOf()`：返回最后一次出现子串的下标位置！
- `startsWith()`：返回是否以子串开头的bool型值！
- `endwith()`：返回是否以子串结尾的bool型值！
- `substring()`：截取子串！
  - `substring(a)`：返回下标a开始到最后！
  - `substring(a, b)`：返回下标a开始到b为止，左闭右开！



```java
// 是否包含子串:
"Hello".contains("ll"); // true

"Hello".indexOf("l"); // 2
"Hello".lastIndexOf("l"); // 3

"Hello".startsWith("He"); // true
"Hello".endsWith("lo"); // true

"Hello".substring(2); // "llo"
"Hello".substring(2, 4); "ll"
```



#### 1.3 取出首尾空白字符



- `trim()`：移除字符串首尾空白字符。空白字符包括空格，`\t`，`\r`，`\n`!并没有改变字符串的内容，而是返回了一个新字符串。
- `strip()`：移除字符串首尾空白字符。它和`trim()`不同的是，类似中文的空格字符`\u3000`也会被移除！
- `stripLeading()`：移除首部！
- `stripTrailing()`：移除尾部！
- `isEmpty()`：潘福安字符串是否为空！
- `isBlank()`：判断字符串是否为空白字符（空格）！

```java

"  \tHello\r\n ".trim(); // "Hello"

"\u3000Hello\u3000".strip(); // "Hello"
" Hello ".stripLeading(); // "Hello "
" Hello ".stripTrailing(); // " Hello"

"".isEmpty(); // true，因为字符串长度为0
"  ".isEmpty(); // false，因为字符串长度不为0
"  \n".isBlank(); // true，因为只包含空白字符
" Hello ".isBlank(); // false，因为包含非空白字符
```



#### 1.4 子串替换（replace）



- 使用`replace()`方法：



```java
String s = "hello";
s.replace('l', 'w'); // "hewwo"，所有字符'l'被替换为'w'
s.replace("ll", "~~"); // "he~~o"，所有子串"ll"被替换为"~~"
```

- 使用正则表达式：

> [参考我之前在JavaScript教程的RegExp：点击这里!](https://niuxvdong.top/posts/15769.html)
>
> 当然语法不太相同，后面的java教程会讲到Re！



```java
String s = "A,,B;C ,D";
String tt = s.replaceAll("[,;\\s]+", ","); // "A,B,C,D"
```



#### 1.5 字符串分割

- `split()`：参数为正则表达式！

```java
String s = "A,B,C,D";
String[] ss = s.split(","); // {"A", "B", "C", "D"}
```



#### 1.6 字符串拼接



- `join()`：用指定的字符串连接字符串数组!



```java
String[] arr = {"A", "B", "C"};
String s = String.join("***", arr); // "A***B***C"
```



#### 1.7 类型转换



其他类型转换为字符串：

- `valueof()`：把任意基本类型或引用类型转换为字符串，这是一个重载方法，编译器会根据参数自动选择合适的方法！



```java
String.valueOf(123); // "123"
String.valueOf(45.67); // "45.67"
String.valueOf(true); // "true"
String.valueOf(new Object()); // 输出java.lang.Object@636be97c
```



字符串转换为其他类型：



- `Integer.parseInt()`：int转换为String！
- `Boolean.parseBoolean()`：boolean转换为String！



```java
int n1 = Integer.parseInt("123"); // 123
int n2 = Integer.parseInt("ff", 16); // 按十六进制转换，255

boolean b1 = Boolean.parseBoolean("true"); // true
boolean b2 = Boolean.parseBoolean("FALSE"); // false
```

`Integer`的`getInteger(String)`方法，它不是将字符串转换为`int`，而是把该字符串对应的系统变量转换为`Integer`：

```java
System.out.println("java版本：" + Integer.getInteger("java.version"));// java版本：14
```



#### 1.8 String与char[]互转



- String转char[]：使用toCharArray()方法！
- char[]转String：使用new String()方法！



```java
char[] cs = "Hello".toCharArray(); // String -> char[]
String s = new String(cs); // char[] -> String
```

> 通过`new String(char[])`创建新的`String`实例时，它并不会直接引用传入的`char[]`数组，而是会复制一份，所以，修改外部的`char[]`数组不会影响`String`实例内部的`char[]`数组，因为这是两个不同的数组。
>
> `new String()`时：传入的是一个复制！

```java
public class Main {
    public static void main(String[] args) {
        char[] cs = "Hello".toCharArray();
        String s = new String(cs);
        System.out.println(s);
        cs[0] = 'X';
        System.out.println(s);
    }
}
```



> 当向类中传入引用时，外部改变会影响类的改变！
>
> 由于`Score`内部直接引用了外部传入的`int[]`数组，这会造成外部代码对`int[]`数组的修改，影响到`Score`类的字段。如果外部代码不可信，这就会造成安全隐患。
>
> 可以使用数组的`clone()`方法，



```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] scores = new int[] { 88, 77, 51, 66 };
        Score s = new Score(scores);
        s.printScores();//[88, 77, 51, 66]
        scores[2] = 99;
        s.printScores();//[88, 77, 99, 66]修改后[88, 77, 51, 66]
    }
}

class Score {
    private int[] scores;
    public Score(int[] scores) {
        this.scores = scores;
        // 修改为使用克隆方法！
        this.scores = scores.clone();
    }

    public void printScores() {
        System.out.println(Arrays.toString(scores));
    }
}
```





### 2、字符编码



> [可参考廖雪峰的字符编码教程：点击这里！](https://www.liaoxuefeng.com/wiki/1252599548343744/1260469698963456)
>
> 始终牢记：Java的`String`和`char`在内存中总是以Unicode编码表示。

#### 2.1 ASCII编码



> 在早期的计算机系统中，为了给字符编码，美国国家标准学会（American National Standard Institute：ANSI）制定了一套英文字母、数字和常用符号的编码，它占用一个字节，编码范围从`0`到`127`，最高位始终为`0`，称为`ASCII`编码。例如，字符`'A'`的编码是`0x41`，字符`'1'`的编码是`0x31`。





#### 2.2 GB2312和GBK编码

> 如果要把汉字也纳入计算机编码，很显然一个字节是不够的。`GB2312`标准使用两个字节表示一个汉字，其中第一个字节的最高位始终为`1`，以便和`ASCII`编码区分开。例如，汉字`'中'`的`GB2312`编码是`0xd6d0`。



> 1、收录不同：GB2312标准共收录6763个汉字，其中一级汉字3755个，二级汉字3008个；GBK共收入21886个汉字和图形符号。
>
> 2、表示不同：GB2312对任意一个图形字符都采用两个字节表示，并对所收汉字进行了“分区”处理，每区含有94个汉字／符号，分别对应第一字节和第二字节。GBK采用双字节表示，总体编码范围为8140-FEFE之间，首字节在81-FE之间，尾字节在40-FE之间。
>
> 3、处理功能不同：对于人名、古汉语等方面出现的罕用字，GB2312不能处理，这导致了后来GBK 及GB18030 汉字字符集的出现。
>
> 
>
> GBK: 汉字国标扩展码,基本上采用了原来GB2312-80所有的汉字及码位，并涵盖了原Unicode中所有的汉字20902，总共收录了883个符号， 21003个汉字及提供了1894个造字码位。 Microsoft简体版中文[Windows](https://www.baidu.com/s?wd=Windows&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) [95](https://www.baidu.com/s?wd=95&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)就是以GBK为内码，又由于GBK同时也涵盖了Unicode所有CJK汉字，所以也可以和Unicode做一一对应。
>
> GB码，全称是GB2312-80《信息交换用汉字编码字符集 基本集》，1980年发布，是[中文信息处理](https://www.baidu.com/s?wd=中文信息处理&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的国家标准，在大陆及海外使用简体中文的地区（如新加坡等）是强制使用的唯一中文编码。P-[Windows](https://www.baidu.com/s?wd=Windows&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)3.2和苹果OS就是以GB2312为基本汉字编码， [Windows](https://www.baidu.com/s?wd=Windows&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) [95](https://www.baidu.com/s?wd=95&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)/98则以GBK为基本汉字编码、但兼容支持GB2312。GB码共收录6763个简体汉字、682个符号，其中汉字部分：一级字3755，以拼音排序，二级字3008，以偏旁排序。该标准的制定和应用为规范、推动中文信息化进程起了很大作用。
>
> GBK编码是中国大陆制订的、等同于UCS的新的中文编码扩展国家标准。GBK工作小组于19[95](https://www.baidu.com/s?wd=95&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)年10月，同年12月完成GBK规范。该编码标准兼容GB2312，共收录汉字21003个、符号883个，并提供1894个造字码位，简、繁体字融于一库。

#### 2.3 Unicode编码



>为了统一全球所有语言的编码，全球统一码联盟发布了`Unicode`编码，它把世界上主要语言都纳入同一个编码，这样，中文、日文、韩文和其他语言就不会冲突。
>
>`Unicode`编码需要两个或者更多字节表示！



#### 2.4 UTF-8编码



>因为英文字符的`Unicode`编码高字节总是`00`，包含大量英文的文本会浪费空间，所以，出现了`UTF-8`编码，它是一种变长编码，用来把固定长度的`Unicode`编码变成1～4字节的变长编码。通过`UTF-8`编码，英文字符`'A'`的`UTF-8`编码变为`0x41`，正好和`ASCII`码一致，而中文`'中'`的`UTF-8`编码为3字节`0xe4b8ad`。
>
>`UTF-8`编码的另一个好处是容错能力强。如果传输过程中某些字符出错，不会影响后续字符，因为`UTF-8`编码依靠高字节位来确定一个字符究竟是几个字节，它经常用来作为传输编码。





在Java中，`char`类型实际上就是两个字节的`Unicode`编码。如果我们要手动把字符串转换成其他编码，可以这样做：



> `getBytes("UTF-8")`：这个编译通不过。。
>
> 使用`getBytes(StandardCharsets.UTF_8)`才可以！
>
> 了解一下就好！
>
> 转换编码后，就不再是`char`类型，而是`byte`类型表示的数组。



```java
byte[] b1 = "Hello".getBytes(); // 按系统默认编码转换，不推荐
byte[] b2 = "Hello".getBytes("UTF-8"); // 按UTF-8编码转换
byte[] b2 = "Hello".getBytes("GBK"); // 按GBK编码转换
byte[] b3 = "Hello".getBytes(StandardCharsets.UTF_8); // 按UTF-8编码转换
```



将`byte[]`转换为`String`，可以这样做：

```java
byte[] b = ...
String s1 = new String(b, "GBK"); // 按GBK转换
String s2 = new String(b, StandardCharsets.UTF_8); // 按UTF-8转换
```

### 3、String存储方式



- 早期JDK版本的`String`总是以`char[]`存储：



```java
public final class String {
    private final char[] value;
    private final int offset;
    private final int count;
}
```

- 较新的JDK版本的`String`则以`byte[]`存储：

> 如果`String`仅包含ASCII字符，则每个`byte`存储一个字符，否则，每两个`byte`存储一个字符，这样做的目的是为了节省内存，因为大量的长度较短的`String`通常仅包含ASCII字符：
>
> 对于使用者来说，`String`内部的优化不影响任何已有代码，因为它的`public`方法签名是不变的。



```java
public final class String {
    private final byte[] value;
    private final byte coder; // 0 = LATIN1, 1 = UTF16
```



## 二、StringBuilder





>使用`String`拼接字符串时，在循环中，每次循环都会创建新的字符串对象，然后扔掉旧的字符串。这样，绝大部分字符串都是临时对象，不但浪费内存，还会影响GC(垃圾回收)效率。
>
>为了能高效拼接字符串，Java标准库提供了`StringBuilder`，它是一个可变对象，可以预分配缓冲区，这样，往`StringBuilder`中新增字符时，不会创建新的临时对象：
>
>其他许多方法去编译器就可以看到！
>
>你可能还听说过`StringBuffer`，这是Java早期的一个`StringBuilder`的线程安全版本，它通过同步来保证多个线程操作`StringBuffer`也是安全的，但是同步会带来执行速度的下降。
>
>`StringBuilder`和`StringBuffer`接口完全相同，现在完全没有必要使用`StringBuffer`。
>
>也就是说`StringBuffer`已经是一个淘汰品了，不需要使用了！
>
>最大作用：高效拼接字符串！



- 可以进行链式操作：

> 进行链式操作的关键是，定义的`append()`方法会返回`this`，这样，就可以不断调用自身的其他方法！
>
> 参数capacity为初始容量，不够时，自动扩大为当前的二倍！
>
> 也可以不写该参数！

```java
public class Main {
    public static void main(String[] args) {
        var sb = new StringBuilder(1024);
        sb.append("Mr ")
          .append("Bob")
          .append("!")
          .insert(0, "Hello, ");
        System.out.println(sb.toString());
    }
}
```

- 来设计一个支持链式操作的类！关键当然是可以返回this即可！



```java
public class Main {
    public static void main(String[] args) {
        Adder adder = new Adder();
        adder.add(3)
             .add(5)
             .inc()
             .add(10);
        System.out.println(adder.value());
    }
}

class Adder {
    private int sum = 0;

    public Adder add(int n) {
        sum += n;
        return this;
    }

    public Adder inc() {
        sum ++;
        return this;
    }

    public int value() {
        return sum;
    }
}

```



> 对于普通的字符串`+`操作，并不需要我们将其改写为`StringBuilder`，因为Java编译器在编译时就自动把多个连续的`+`操作编码为`StringConcatFactory`的操作。在运行期，`StringConcatFactory`会自动把字符串连接操作优化为数组复制或者`StringBuilder`操作。





## 三、StringJoiner



> 最大作用：可以用分隔符拼接字符串，也可以指定开始和结束！
>
> `StringJoiner`内部实际上就是使用了`StringBuilder`，所以拼接效率和`StringBuilder`几乎是一模一样的！！





```java
import java.util.StringJoiner;

public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        // 按逗号分隔
        var sj = new StringJoiner(", ");
        // 指定开头和结尾
        var sj = new StringJoiner(", ", "Hello ", "!");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());
    }
}
```



- 不需要开头结尾时，可以使用更方便的`String.join()`



```java
String[] names = {"Bob", "Alice", "Grace"};
var s = String.join(", ", names);
```



## 四、包装类型



Java的两种数据类型：

- 基本类型：`byte`，`short`，`int`，`long`，`boolean`，`float`，`double`，`char`
- 引用类型：所有`class`和`interface`类型

引用类型可以赋值为`null`，表示空，但基本类型不能赋值为`null`：

```java
String s = null;
int n = null; // compile error!
```



> 将基本类型转换为引用类型就是包装类型！



### 1、int转Integer



```java
Integer n = null;
Integer n2 = new Integer(99);
Integer n3 = 98;
Integer n4 = Integer.valueOf(99);
// 通过静态方法valueOf(String)创建Integer实例:
Integer n5 = Integer.valueOf("100");
int n6 = n2.intValue();
int n7 = n3;
```

Java对应的基本类型的包装类型：

| 基本类型 | 对应的引用类型      |
| :------- | :------------------ |
| boolean  | java.lang.Boolean   |
| byte     | java.lang.Byte      |
| short    | java.lang.Short     |
| int      | java.lang.Integer   |
| long     | java.lang.Long      |
| float    | java.lang.Float     |
| double   | java.lang.Double    |
| char     | java.lang.Character |





### 2、Auto Boxing



> 由于可以自动互转，所以可以直接简化的写，编译器自动完成转换加上相应语句！
>
> 这种直接把`int`变为`Integer`的赋值写法，称为自动装箱（Auto Boxing），反过来，把`Integer`变为`int`的赋值写法，称为自动拆箱（Auto Unboxing）。
>
> 注意：自动装箱和自动拆箱只发生在编译阶段，目的是为了少写代码。
>
> 装箱和拆箱会影响代码的执行效率，因为编译后的`class`代码是严格区分基本类型和引用类型的。并且，自动拆箱执行时可能会报`NullPointerException`：



```java
Integer n = 100; // 编译器自动使用Integer.valueOf(int)
int x = n; // 编译器自动使用Integer.intValue()

// 这样拆箱会报错的：
Integer n = null;
int i = n;
```



### 3、不变类（final class）



> 所有的包装类型都是不变类，如Integer的源码：
>
> 两个`Integer`比较大小，不能使用`==`, 一定要用`equal()`方法!
>
> ，`==`比较，较小的两个相同的`Integer`返回`true`，较大的两个相同的`Integer`返回`false`，这是因为`Integer`是不变类，编译器把`Integer x = 127;`自动变为`Integer x = Integer.valueOf(127);`，为了节省内存，`Integer.valueOf()`对于较小的数，始终返回相同的实例，因此，`==`比较“恰好”为`true`，但我们*绝不能*因为Java标准库的`Integer`内部有缓存优化就用`==`比较，必须用`equals()`方法比较两个`Integer`。





```java
public final class Integer {
    private final int value;
}

// 比较：
public class Main {
    public static void main(String[] args) {
        Integer x = 127;
        Integer y = 127;
        Integer m = 99999;
        Integer n = 99999;
        System.out.println("x == y: " + (x==y)); // true
        System.out.println("m == n: " + (m==n)); // false
        System.out.println("x.equals(y): " + x.equals(y)); // true
        System.out.println("m.equals(n): " + m.equals(n)); // true
    }
}
```



因为`Integer.valueOf()`可能始终返回同一个`Integer`实例，因此，在我们自己创建`Integer`的时候，以下两种方法：

- 方法1：`Integer n = new Integer(100);`
- 方法2：`Integer n = Integer.valueOf(100);`

方法2更好，因为方法1总是创建新的`Integer`实例，方法2把内部优化留给`Integer`的实现者去做，即使在当前版本没有优化，也有可能在下一个版本进行优化。

> 我们把能创建“新”对象的静态方法称为**静态工厂方法**。`Integer.valueOf()`就是静态工厂方法，它尽可能地返回缓存的实例以节省内存。

 创建新对象时，优先选用静态工厂方法而不是new操作符。

如果我们考察`Byte.valueOf()`方法的源码，可以看到，标准库返回的`Byte`实例全部是缓存实例，但调用者并不关心静态工厂方法以何种方式创建新实例还是直接返回缓存的实例！



### 4、Integer的进制转换



> 使用`Integer.parseInt()`方法或者是`toString()....`等等！
>
> 输出结果都是`String`类型！

```java
public class Main {
    public static void main(String[] args) {
        // 将字符串解析成一个整数：
        int x1 = Integer.parseInt("100"); // 100
		int x2 = Integer.parseInt("100", 16); // 256,因为按16进制解析
        
        System.out.println(Integer.toString(100)); // "100",表示为10进制
        System.out.println(Integer.toString(100, 36)); // "2s",表示为36进制
        System.out.println(Integer.toHexString(100)); // "64",表示为16进制
        System.out.println(Integer.toOctalString(100)); // "144",表示为8进制
        System.out.println(Integer.toBinaryString(100)); // "1100100",表示为2进制
    }
}
```

### 5、静态变量



一些静态变量：



```java
// boolean只有两个值true/false，其包装类型只需要引用Boolean提供的静态字段:
Boolean t = Boolean.TRUE;
Boolean f = Boolean.FALSE;
// int可表示的最大/最小值:
int max = Integer.MAX_VALUE; // 2147483647
int min = Integer.MIN_VALUE; // -2147483648
// long类型占用的bit和byte数量:
int sizeOfLong = Long.SIZE; // 64 (bits)
int bytesOfLong = Long.BYTES; // 8 (bytes)
```

所有的整数和浮点数的包装类型都继承自`Number`，因此，可以非常方便地直接通过包装类型获取各种基本类型：

```java
// 向上转型为Number:
Number num = new Integer(999);
// 获取byte, int, long, float, double:
byte b = num.byteValue();
int n = num.intValue();
long ln = num.longValue();
float f = num.floatValue();
double d = num.doubleValue();
```



### 5、无符号处理



> 在Java中，并没有无符号整型（Unsigned）的基本数据类型。`byte`、`short`、`int`和`long`都是带符号整型，最高位是符号位。而C语言则提供了CPU支持的全部数据类型，包括无符号整型。无符号整型和有符号整型的转换在Java中就需要借助包装类型的静态方法完成。
>
> 因为`byte`的`-1`的二进制表示是`11111111`，以无符号整型转换后的`int`就是`255`。
>
> 类似的，可以把一个`short`按unsigned转换为`int`，把一个`int`按unsigned转换为`long`。



```java
public class Main {
    public static void main(String[] args) {
        byte x = -1;
        byte y = 1;
        short r = -1;
        int t = -1;
        System.out.println(Byte.toUnsignedInt(x)); // 255
        System.out.println(Byte.toUnsignedInt(y)); // 127
        System.out.println(Short.toUnsignedInt(r));//65535

        System.out.println(Integer.toUnsignedLong(t));//4294967295
    }
}
```



## 无、JavaBean





在Java中，有很多`class`的定义都符合这样的规范：

- 若干`private`实例字段；
- 通过`public`方法来读写实例字段。

### 1、JavaBean规范

如果读写方法符合以下这种命名规范：

```java
// 读方法:
public Type getXyz()
// 写方法:
public void setXyz(Type value)

// boolean特殊：读方法一般命名为isXyz()：
// 读方法:
public boolean isChild()
// 写方法:
public void setChild(boolean value)
```

那么这种`class`被称为`JavaBean`：

> 上面的字段是`xyz`，那么读写方法名分别以`get`和`set`开头，并且后接大写字母开头的字段名`Xyz`，因此两个读写方法名分别是`getXyz()`和`setXyz()`
>
> 我们通常把一组对应的读方法（`getter`）和写方法（`setter`）称为属性（`property`）。例如，`name`属性：
>
> - 对应的读方法是`String getName()`
> - 对应的写方法是`setName(String)`
>
> 只有`getter`的属性称为只读属性（read-only），例如，定义一个age只读属性：
>
> - 对应的读方法是`int getAge()`
> - 无对应的写方法`setAge(int)`
>
> 类似的，只有`setter`的属性称为只写属性（write-only）。
>
> 很明显，只读属性很常见，只写属性不常见。
>
> getter和setter就实现了一种数据封装的方法！



```java
public class Person {
    private String name;
    private int age;

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return this.age; }
    public void setAge(int age) { this.age = age; }

    public boolean isChild() {
        return age <= 6;
    }
}
```





### 2、JavaBean作用



>JavaBean主要用来传递数据，即把一组数据组合成一个JavaBean便于传输。此外，JavaBean可以方便地被IDE工具分析，生成读写属性的代码，主要用在图形界面的可视化设计中。
>
>通过IDE，可以快速生成`getter`和`setter`！



### 3、枚举JavaBean属性



> 了解即可！
>
> 使用`Introspector.getBeanInfo()`可以获取属性列表。



```java
package com.test;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;

public class codeTest {
    public static void main(String[] args) throws IntrospectionException {
        BeanInfo info = Introspector.getBeanInfo(Person.class);
        for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
            System.out.println(pd.getName());
            System.out.println("  " + pd.getReadMethod());
            System.out.println("  " + pd.getWriteMethod());
        }
    }
}

class Persons {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```

输出结果：

```
age
  public int com.test.Person.getAge()
  public void com.test.Person.setAge(int)
birth
  public int com.test.Person.getBirth()
  public void com.test.Person.setBirth(int)
class
  public final native java.lang.Class java.lang.Object.getClass()
  null
name
  public java.lang.String com.test.Person.getName()
  public void com.test.Person.setName(java.lang.String)
```





## 六、枚举类（enum）



> 为了让编译器能自动检查某个值在枚举的集合内，并且，不同用途的枚举需要不同的类型来标记，不能混用，我们可以使用`enum`来定义枚举类！
>
> 注意到定义枚举类是通过关键字`enum`实现的，我们只需依次列出枚举的常量名。
>
> 和`int`定义的常量相比，使用`enum`定义枚举有如下好处：
>
> 首先，`enum`常量本身带有类型信息，即`Weekday.SUN`类型是`Weekday`，编译器会自动检查出类型错误。
>
> 其次，不可能引用到非枚举的值，因为无法通过编译。
>
> 最后，不同类型的枚举不能互相比较或者赋值，因为类型不符！
>
> 使用`enum`定义的枚举类是一种引用类型。前面我们讲到，引用类型比较，要使用`equals()`方法，如果使用`==`比较，它比较的是两个引用类型的变量是否是同一个对象。因此，引用类型比较，要始终使用`equals()`方法，但`enum`类型可以例外。
>
> 因为`enum`类型的每个常量在JVM中只有一个唯一实例，所以可以直接用`==`比较：





```java
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        if (day == Weekday.SAT || day == Weekday.SUN) {
            System.out.println("Work at home!");
        } else {
            System.out.println("Work at office!");
        }
        
        // 这样是编译不会通过的：
        int day = 1;
		if (day == Weekday.SUN) { // Compile error: bad operand types for binary operator '=='
		}
    }
}

enum Weekday {
    SUN, MON, TUE, WED, THU, FRI, SAT;
}
```



### 1、enum类型



通过`enum`定义的枚举类，和其他的`class`有什么区别？

答案是没有任何区别。`enum`定义的类型就是`class`，只不过它有以下几个特点：

- 定义的`enum`类型总是继承自`java.lang.Enum`，且无法被继承；
- 只能定义出`enum`的实例，而无法通过`new`操作符创建`enum`的实例；
- 定义的每个实例都是引用类型的唯一实例；
- 可以将`enum`类型用于`switch`语句。



```java
public enum Color {
    RED, GREEN, BLUE;
}

// 编译后大概长这样：
public final class Color extends Enum { // 继承自Enum，标记为final class
    // 每个实例均为全局唯一:
    public static final Color RED = new Color();
    public static final Color GREEN = new Color();
    public static final Color BLUE = new Color();
    // private构造方法，确保外部无法调用new操作符:
    private Color() {}
}
```



编译后的`enum`类和普通`class`并没有任何区别。但是我们自己无法按定义普通`class`那样来定义`enum`，必须使用`enum`关键字，这是Java语法规定的。

因为`enum`是一个`class`，每个枚举的值都是`class`实例！



### 2、常用方法





- `name()`：返回常量名！
- `ordinal()`：返回定义常量的顺序（从0开始）！

```java
String s = Weekday.SUN.name(); // "SUN"
int n = Weekday.MON.ordinal(); // 1
```



注意：当枚举类Weekday内部的顺序发生变化时，通过`ordinal()`方法获取到的值也会相应改变！

想要不受影响，新增的变量值一定要放到最后！



解决方法：



> 要编写健壮的代码，就不要依靠`ordinal()`的返回值。因为`enum`本身是`class`，所以我们可以定义`private`的构造方法，并且，给每个枚举常量添加字段：
>
> 默认情况下，对枚举常量调用`toString()`会返回和`name()`一样的字符串。但是，`toString()`可以被覆写，而`name()`则不行。我们可以给`Weekday`添加`toString()`方法：
>
> 覆写`toString()`的目的是在输出时更有可读性。

注意：判断枚举常量的名字，要始终使用name()方法，绝不能调用toString()！

- 默认调用day的toString()方法！
- toString()覆写后则调用覆写后的方法！



```java
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        if (day.dayValue == 6 || day.dayValue == 0) {
            // 默认调用day的toString()方法：
            System.out.println("Today is " + day + ". Work at home!");
        } else {
            System.out.println("Today is " + day + ". Work at office!");
        }
    }
}

enum Weekday {
    MON(1, "星期一"), TUE(2, "星期二"), WED(3, "星期三"), THU(4, "星期四"), FRI(5, "星期五"), SAT(6, "星期六"), SUN(0, "星期日");

    public final int dayValue;
    private final String chinese;

    private Weekday(int dayValue, String chinese) {
        this.dayValue = dayValue;
        this.chinese = chinese;
    }

    @Override
    public String toString() {
        return this.chinese;
    }
}

```



### 3、使用switch语句



```java
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        switch(day) {
        case MON:
        case TUE:
        case WED:
        case THU:
        case FRI:
            System.out.println("Today is " + day + ". Work at office!");
            break;
        case SAT:
        case SUN:
            System.out.println("Today is " + day + ". Work at home!");
            break;
        }
    }
}

enum Weekday {
    MON, TUE, WED, THU, FRI, SAT, SUN;
}
```





## 七、记录类（record）





> 使用`String`、`Integer`等类型的时候，这些类型都是不变类，一个不变类具有以下特点：
>
> 1. 定义class时使用`final`，无法派生子类；
> 2. 每个字段使用`final`，保证创建实例后无法修改任何字段。
>
> 为了保证不变类的比较，还需要正确覆写`equals()`和`hashCode()`方法，这样才能在集合类中正常使用。



从Java 14开始，引入了新的`Record`类。我们定义`Record`类时，使用关键字`record`，



### 1、record类



>除了用`final`修饰class以及每个字段外，编译器还自动为我们创建了构造方法，和字段名同名的方法，以及覆写`toString()`、`equals()`和`hashCode()`方法。
>
>换句话说，使用`record`关键字，可以一行写出一个不变类。
>
>和`enum`类似，我们自己不能直接从`Record`派生，只能通过`record`关键字由编译器实现继承。



```java
public class Main {
    public static void main(String[] args) {
        Point p = new Point(123, 456);
        System.out.println(p.x());
        System.out.println(p.y());
        System.out.println(p);
    }
}

public record Point(int x, int y) {}
```



编译时编译器自动完成所需要的代码以及需要覆写的代码：



```java
public final class Point extends Record {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() {
        return this.x;
    }

    public int y() {
        return this.y;
    }

    public String toString() {
        return String.format("Point[x=%s, y=%s]", x, y);
    }

    public boolean equals(Object o) {
        ...
    }
    public int hashCode() {
        ...
    }
}
```



### 2、record的构造方法



>编译器默认按照`record`声明的变量顺序自动创建一个构造方法，并在方法内给字段赋值。那么问题来了，如果我们要检查参数，应该怎么办？
>
>假设`Point`类的`x`、`y`不允许负数，我们就得给`Point`的构造方法加上检查逻辑：





```java
public record Point(int x, int y) {
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException();
        }
    }
}

// 编译后的代码长这样：
public final class Point extends Record {
    public Point(int x, int y) {
        // 这是我们编写的Compact Constructor:
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException();
        }
        // 这是编译器继续生成的赋值代码:
        this.x = x;
        this.y = y;
    }
    ...
}
```

### 3、可以编写静态方法



```java
public record Point(int x, int y) {
    public static Point of() {
        return new Point(0, 0);
    }
    public static Point of(int x, int y) {
        return new Point(x, y);
    }
}

var z = Point.of();
var p = Point.of(123, 456);
```

### 4、小结：



从Java 14开始，提供新的`record`关键字，可以非常方便地定义Data Class：

- 使用`record`定义的是不变类；
- 可以编写Compact Constructor（构造方法）对参数进行验证；
- 可以定义静态方法。



## 八、BigInteger



> 超出long的范围时可以使用`java.math.BigInteger`，来模拟大整数！
>
> `BigInteger`内部用一个`int[]`数组来模拟一个非常大的整数！
>
> 做运算时，只能通过实例方法来进行！
>
> 和`long`型整数运算比，`BigInteger`不会有范围限制，但缺点是速度比较慢！
>
> 可以使用`longVanlue()`方法来将其转化为long类型，前提当然是没有超过long的范围！超过会把报错！





```java
BigInteger bi = new BigInteger("1234567890");
System.out.println(bi.pow(5)); // 2867971860299718107233761438093672048294900000

// 加法
BigInteger i1 = new BigInteger("1234567890");
BigInteger i2 = new BigInteger("12345678901234567890");
BigInteger sum = i1.add(i2); // 12345678902469135780
// 转换为long
BigInteger i = new BigInteger("123456789000");
System.out.println(i.longValue()); // 123456789000
System.out.println(i.multiply(i).longValueExact()); // java.lang.ArithmeticException: BigInteger out of long range

// + - * /
BigInteger s1 = s.add(new BigInteger("328423"));
BigInteger s3 = s.subtract(new BigInteger("89789797"));
BigInteger s2 = s.multiply(new BigInteger("328423"));
BigInteger s4 = s.divide(new BigInteger("2379743489"));

// s的5次方
BigInteger s5 = s.pow(5);
```

`BigInteger`和`Integer`、`Long`一样，也是不可变类，并且也继承自`Number`类。因为`Number`定义了转换为基本类型的几个方法：



- 转换为`byte`：`byteValue()`
- 转换为`short`：`shortValue()`
- 转换为`int`：`intValue()`
- 转换为`long`：`longValue()`
- 转换为`float`：`floatValue()`
- 转换为`double`：`doubleValue()`



> 因此，通过上述方法，可以把`BigInteger`转换成基本类型。如果`BigInteger`表示的范围超过了基本类型的范围，转换时将丢失高位信息，即结果不一定是准确的。如果需要准确地转换成基本类型，可以使用`intValueExact()`、`longValueExact()`等方法，在转换时如果超出范围，将直接抛出`ArithmeticException`异常。
>
> float没有`floatValueExact()`方法，超出范围会输出`Infintity`；



```java
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        BigInteger n = new BigInteger("999999").pow(99);
        float f = n.floatValue();
        System.out.println(f);//Infinity
        
        int s = n.intValueExact();
        System.out.println(s);//报错
        
        int s = n.intValue();
        System.out.println(s);//结果会丢失，不准确！
    }
}
```



## 九、BigDecimal



> 和`BigInteger`类似，`BigDecimal`可以表示一个任意大小且精度完全准确的浮点数。
>
> `BigDecimal`也是从`Number`继承的，也是不可变对象。
>
> 当然也有和BigInteger一样的方法！
>
> `BigDecimal`用于表示精确的小数，常用于财务计算；





```java
BigDecimal bd = new BigDecimal("123.4567");
System.out.println(bd.multiply(bd)); // 15241.55677489
```



- `scale()`：可以计算小数位数！
- `stripTrailingZeros()`：去掉小数末尾的0！
- 若为整数，则返回整数末尾的0的个数，为负值！



```java
BigDecimal d1 = new BigDecimal("123.45");
BigDecimal d2 = new BigDecimal("123.4500");
BigDecimal d3 = new BigDecimal("1234500");
System.out.println(d1.scale()); // 2,两位小数
System.out.println(d2.scale()); // 4
System.out.println(d3.scale()); // 0

BigDecimal d1 = new BigDecimal("123.4500");
BigDecimal d2 = d1.stripTrailingZeros();
System.out.println(d1.scale()); // 4
System.out.println(d2.scale()); // 2,因为去掉了00

BigDecimal d3 = new BigDecimal("1234500");
BigDecimal d4 = d3.stripTrailingZeros();
System.out.println(d3.scale()); // 0
System.out.println(d4.scale()); // -2
```



- `setScale()`：设置精度，小数位数。两种截断方法：
  - `RoundingMode.HALF_UP`：四舍五入截断
  - `RoundingMode.DOWN`：直接截断

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        BigDecimal d1 = new BigDecimal("123.456789");
        BigDecimal d2 = d1.setScale(4, RoundingMode.HALF_UP); // 四舍五入，123.4568
        BigDecimal d3 = d1.setScale(4, RoundingMode.DOWN); // 直接截断，123.4567
        System.out.println(d2);
        System.out.println(d3);
    }
}
```

> 对`BigDecimal`做加、减、乘时，精度不会丢失，但是做除法时，存在无法除尽的情况，这时，就必须指定精度以及如何进行截断：



```java
BigDecimal d1 = new BigDecimal("123.456");
BigDecimal d2 = new BigDecimal("23.456789");
BigDecimal d3 = d1.divide(d2, 10, RoundingMode.HALF_UP); // 保留10位小数并四舍五入
BigDecimal d4 = d1.divide(d2); // 报错：ArithmeticException，因为除不尽
```

- `divideAndRemainder()`：返回除数和余数！
- `signum()`：有余数返回1，余数为0返回0！

> 调用`divideAndRemainder()`方法时，返回的数组包含两个`BigDecimal`，分别是商和余数，其中商总是整数，余数不会大于除数。我们可以利用这个方法判断两个`BigDecimal`是否是整数倍数：

```java
BigDecimal n = new BigDecimal("12.345");
BigDecimal m = new BigDecimal("0.12");
BigDecimal[] dr = n.divideAndRemainder(m);
System.out.println(dr[0]); // 102
System.out.println(dr[1]); // 0.105

BigDecimal n = new BigDecimal("12.75");
BigDecimal m = new BigDecimal("0.15");
BigDecimal[] dr = n.divideAndRemainder(m);
if (dr[1].signum() == 0) {
    // n是m的整数倍
}
```





- BigDecimal比较



> `equal()`方法，不但要求两个`BigDecimal`的值相等，还要求它们的`scale()`相等！
>
> 可以使用`stripTrailingZeros()`去掉末尾0再比较！
>
> 也可以使用`compareTo()`方法：它根据两个值的大小分别返回负数、正数和`0`，分别表示小于、大于和等于。
>
> 比较必须使用`compareTo()`方法！



```java
BigDecimal d1 = new BigDecimal("123.456");
BigDecimal d2 = new BigDecimal("123.45600");
System.out.println(d1.equals(d2)); // false,因为scale不同
System.out.println(d1.equals(d2.stripTrailingZeros())); // true,因为d2去除尾部0后scale变为2
System.out.println(d1.compareTo(d2)); // 0
```





## 十、其他常用类



### 1、Math类



> Java标准库还提供了一个`StrictMath`，它提供了和`Math`几乎一模一样的方法。这两个类的区别在于，由于浮点数计算存在误差，不同的平台（例如x86和ARM）计算的结果可能不一致（指误差不同），因此，`StrictMath`保证所有平台计算结果都是完全相同的，而`Math`会尽量针对平台优化计算速度，所以，绝大多数情况下，使用`Math`就足够了。

- `abs()`：绝对值
- `max()`：最大
- `min()`：最小
- `sqrt()`：开方
- `exp()`：e的x次方
- `log()`：以e为底对数
- `log10()`：以10为底对数
- `sin()、cos()、tan()、asin()、acos()`：三角函数
- `PI`：pai(3.14....)
- `E`：e(2.718....)

```java
Math.abs(-100); // 100
Math.max(100, 99); // 100
Math.min(1.2, 2.3); // 1.2
Math.pow(2, 10); // 2的10次方=1024
Math.sqrt(2); // 1.414...
Math.exp(2); // 7.389...
Math.log(4); // 1.386...
Math.log10(100); // 2
Math.sin(3.14); // 0.00159...
Math.cos(3.14); // -0.9999...
Math.tan(3.14); // -0.0015...
Math.asin(1.0); // 1.57079...
Math.acos(1.0); // 0.0

double pi = Math.PI; // 3.14159...
double e = Math.E; // 2.7182818...
Math.sin(Math.PI / 6); // sin(π/6) = 0.5
```



### 2、Random类



>`Random`用来创建伪随机数。所谓伪随机数，是指只要给定一个初始的种子，产生的随机数序列是完全一样的。
>
>要生成一个随机数，可以使用`nextInt()`、`nextLong()`、`nextFloat()`、`nextDouble()`：

```java
Random r = new Random();
r.nextInt(); // 2071575453,每次都不一样
r.nextInt(10); // 5,生成一个[0,10)之间的int
r.nextLong(); // 8811649292570369305,每次都不一样
r.nextFloat(); // 0.54335...生成一个[0,1)之间的float
r.nextDouble(); // 0.3716...生成一个[0,1)之间的double
```

倘若在创建实例时给定一个种子，则随机生成的数都是一定的，不会改变，不给种子是按照当前的时间戳自动确定种子，由于每时每刻时间不同，所以生成的数不同：

```java
Random r = new Random(3);
System.out.println(r.nextInt());//-1155099828
```



### 3、SecureRandom类



> 有伪随机数，就有真随机数。实际上真正的真随机数只能通过量子力学原理来获取，而我们想要的是一个不可预测的安全的随机数，`SecureRandom`就是用来创建安全的随机数的！
>
> `SecureRandom`无法指定种子，它使用RNG（random number generator）算法。JDK的`SecureRandom`实际上有多种不同的底层实现，有的使用安全随机种子加上伪随机数算法来产生安全的随机数，有的使用真正的随机数生成器。实际使用的时候，可以优先获取高强度的安全随机数生成器，如果没有提供，再使用普通等级的安全随机数生成器：
>
> `SecureRandom`的安全性是通过操作系统提供的安全的随机种子来生成随机数。这个种子是通过CPU的热噪声、读写磁盘的字节、网络流量等各种随机事件产生的“熵”。
>
> 在密码学中，安全的随机数非常重要。如果使用不安全的伪随机数，所有加密体系都将被攻破。因此，时刻牢记必须使用`SecureRandom`来产生安全的随机数。
>
>  需要使用安全随机数的时候，必须使用SecureRandom，绝不能使用Random！



虽然有点没看懂！以后回来再看！



```java
package com.test;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

public class codeTest {
    public static void main(String[] args) {
        SecureRandom s = new SecureRandom();
        System.out.println(s.nextInt());

        SecureRandom sr = null;
        try {
            sr = SecureRandom.getInstanceStrong(); // 获取高强度安全随机数生成器
        } catch (NoSuchAlgorithmException e) {
            sr = new SecureRandom(); // 获取普通的安全随机数生成器
        }
        byte[] buffer = new byte[16];
        sr.nextBytes(buffer); // 用安全随机数填充buffer
        System.out.println(Arrays.toString(buffer));
    }
}
```







<center style="color:red; font-size:25px">常用Java核心类终于完结，敬请期待后续内容！</center>



















