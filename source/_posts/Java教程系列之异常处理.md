---
title: Java教程系列之异常处理
author: Mr.Niu
toc: true
abbrlink: 19314
cover: 'https://img.niuxvdong.top/t016b5f21f795099717.jpg'
top_img: 'https://img.niuxvdong.top/t016b5f21f795099717.jpg'
categories:
  - Java教程
tags:
  - 异常处理
date: 2020-03-30 19:55:07
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "280464" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



## 一、Java的异常



### 1、异常的来源



#### 1.1 来源

- 用户输入造成
- 随机出现的错误
  - 网络突然断了，连接不到远程服务器；
  - 内存耗尽，程序崩溃了；
  - 用户点“打印”，但根本没有打印机；
  - ……



#### 1.2 处理错误的方法



- 方法一：约定返回错误码。



> 例如，处理一个文件，如果返回`0`，表示成功，返回其他整数，表示约定的错误码：
>
> 因为使用`int`类型的错误码，想要处理就非常麻烦。这种方式常见于底层C函数。
>
> 一般不这样处理！

```java
int code = processFile("C:\\test.txt");
if (code == 0) {
    // ok:
} else {
    // error:
    switch (code) {
    case 1:
        // file not found:
    case 2:
        // no read permission:
    default:
        // unknown error:
    }
}
```



- 方法二：在语言层面上提供一个异常处理机制。



>Java内置了一套异常处理机制，总是使用异常来表示错误。
>
>异常是一种`class`，因此它本身带有类型信息。异常可以在任何地方抛出，但只需要在上层捕获，这样就和方法调用分离了！
>
>使用的是`try...catch...语句`：



```java
try {
    String s = processFile(“C:\\test.txt”);
    // ok:
} catch (FileNotFoundException e) {
    // file not found:
} catch (SecurityException e) {
    // no read permission:
} catch (IOException e) {
    // io error:
} catch (Exception e) {
    // other error:
}
```



#### 1.3 异常的继承关系





```ascii
                     ┌───────────┐
                     │  Object   │
                     └───────────┘
                           ▲
                           │
                     ┌───────────┐
                     │ Throwable │
                     └───────────┘
                           ▲
                 ┌─────────┴─────────┐
                 │                   │
           ┌───────────┐       ┌───────────┐
           │   Error   │       │ Exception │
           └───────────┘       └───────────┘
                 ▲                   ▲
         ┌───────┘              ┌────┴──────────┐
         │                      │               │
┌─────────────────┐    ┌─────────────────┐┌───────────┐
│OutOfMemoryError │... │RuntimeException ││IOException│...
└─────────────────┘    └─────────────────┘└───────────┘
                                ▲
                    ┌───────────┴─────────────┐
                    │                         │
         ┌─────────────────────┐ ┌─────────────────────────┐
         │NullPointerException │ │IllegalArgumentException │...
         └─────────────────────┘ └─────────────────────────┘
```



> `Throwable`是异常体系的根，它继承自`Object`。`Throwable`有两个体系：`Error`和`Exception`，`Error`表示严重的错误，程序对此一般无能为力：



- `OutOfMemoryError`：内存耗尽
- `NoClassDefFoundError`：无法加载某个Class
- `StackOverflowError`：栈溢出



> 而`Exception`则是运行时的错误，它可以被捕获并处理！
>
> 某些异常是应用程序逻辑处理的一部分，应该捕获并处理！
>
> 还有一些异常是程序逻辑编写不对造成的，应该修复程序本身！



- `NumberFormatException`：数值类型的格式错误
- `FileNotFoundException`：未找到文件
- `SocketException`：读取网络失败
- `NullPointerException`：对某个`null`的对象调用方法或字段
- `IndexOutOfBoundsException`：数组索引越界



Exception分为两大类：

- `RuntimeException`以及它的子类；

- 非`RuntimeException`（包括`IOException`、`ReflectiveOperationException`等等）



#### 1.4 哪些异常需要处理



Java规定：

- 必须捕获的异常，包括`Exception`及其子类，但不包括`RuntimeException`及其子类，这种类型的异常称为Checked Exception。
- 不需要捕获的异常，包括`Error`及其子类，`RuntimeException`及其子类。



### 2、捕获异常（catch）



> 捕获异常使用`try...catch`语句，把可能发生异常的代码放到`try {...}`中，然后使用`catch`捕获对应的`Exception`及其子类！



#### 2.1 方法内部使用`try catch`捕获



> 不去捕获错误会发生编译错误：
>
> ```
> Main.java:15: 错误: 未报告的异常错误UnsupportedEncodingException; 必须对其进行捕获或声明以便抛出
>         return s.getBytes("GBK");
>                          ^
> 1 个错误
> 错误: 编译失败
> ```



```java
package com.test;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class codeTest {
    public static void main(String[] args) {
        byte[] bs = toGBK("中国");
        System.out.println(Arrays.toString(bs));
    }

    public static byte[] toGBK(String s) {
        try {
            // 用指定编码转换String为byte[]:
            return s.getBytes("GBK");
        } catch (UnsupportedEncodingException e) {
            // 如果系统不支持GBK编码，会捕获到UnsupportedEncodingException:
            System.out.println(e);// 打印错误信息
            e.printStackTrace();
            return s.getBytes();// 尝试使用用默认编码
        }
    }
}
```



来看一下`String.getBytes(String)`方法的定义：

> 在方法定义的时候，使用`throws Xxx`表示该方法可能抛出的异常类型。调用方在调用的时候，必须强制捕获这些异常，否则编译器会报错。

```java
public byte[] getBytes(String charsetName) throws UnsupportedEncodingException {
    ...
}
```



#### 2.2 方法定义处使用throws



> 在方法定义处用throws表示`toGBK()`方法可能会抛出`UnsupportedEncodingException`，就可以让`toGBK()`方法通过编译器检查：
>
> 告诉编译器可能会抛出错误，编译器会跳过检查该方法，但是会在main方法里面抛出异常：
>
> ```
> Main.java:8: 错误: 未报告的异常错误UnsupportedEncodingException; 必须对其进行捕获或声明以便抛出
>         byte[] bs = toGBK("中文");
>                          ^
> 1 个错误
> 错误: 编译失败
> ```



```java
package com.test;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class codeTest {
    public static void main(String[] args) {
        byte[] bs = toGBK("中国");
        System.out.println(Arrays.toString(bs));
    }

    public static byte[] toGBK(String s) throws UnsupportedEncodingException {
        return s.getBytes("GBK");
    }
}
```



做出修改如下：

- 修改一：在main方法内捕获异常：

```java
package com.test;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class codeTest {
    public static void main(String[] args) {
        try {
            byte[] bs = toGBK("中国");
            System.out.println(Arrays.toString(bs));
        }catch (UnsupportedEncodingException e) {
            System.out.println(e);
        }
    }

    public static byte[] toGBK(String s) throws UnsupportedEncodingException {
        return s.getBytes("GBK");
    }
}
```



- 修改二：将main方法定义为`throws Exception`

> `main()`方法声明了可能抛出`Exception`，也就声明了可能抛出所有的`Exception`，因此在内部就无需捕获了。代价就是一旦发生异常，程序会立刻退出。

```java
package com.test;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class codeTest {
    public static void main(String[] args) throws Exception {
        byte[] bs = toGBK("中国");
        System.out.println(Arrays.toString(bs));
    }

    public static byte[] toGBK(String s) throws UnsupportedEncodingException {
        return s.getBytes("GBK");
    }
}
```



#### 2.3 使用printStackTrace()打印异常栈



> 没有弄明白这样写为什么不会执行catch内部的语句。。。



```java
package com.test;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class codeTest {
    public static void main(String[] args) {
        try {
            byte[] bs = toGBK("中国");
            System.out.println(Arrays.toString(bs));
        }catch (UnsupportedEncodingException e) {
            System.out.println(e);
            e.printStackTrace();
        }
    }

    public static byte[] toGBK(String s) throws UnsupportedEncodingException {
        return s.getBytes("GBK");
    }
}
```



## 二、捕获异常



### 1、多条catch语句



> 可以使用多个`catch`语句，每个`catch`分别捕获对应的`Exception`及其子类。JVM在捕获到异常后，会从上到下匹配`catch`语句，匹配到某个`catch`后，执行`catch`代码块，然后*不再*继续匹配。
>
> 多条catch语句只执行一个！
>
> 由于从上到下匹配，所以catch语句要从子类开始写起，防止被一个父类直接截断！
>
> 若将下方两个catch互换，则`UnsupportedEncodingException`根本无法执行，会被其父类`IOException`给截断！



```java
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (UnsupportedEncodingException e) {
        System.out.println("Bad encoding");
    } catch (IOException e) {
        System.out.println("IO error");
    }
}
```





### 2、finally语句



> 无论是否有异常发生，如果我们都希望执行一些语句，例如清理工作，怎么写？
>
> 当然可以在每个catch语句都写一遍，显然这样很麻烦！
>
> 所以引入一个finally语句，有无错误都会执行！
>
> 可见，`finally`是用来保证一些代码必须执行的。
>
> 如果捕获异常跳转执行 catch 里面的语句块，return 先执行。finally 里面的代码总是最后执行。



注意`finally`的两个特点：

1. `finally`语句不是必须的，可写可不写；
2. `finally`总是最后执行。



执行流程：

如果没有发生异常，就正常执行`try { ... }`语句块，然后执行`finally`。如果发生了异常，就中断执行`try { ... }`语句块，然后跳转执行匹配的`catch`语句块，最后执行`finally`。



```java
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (UnsupportedEncodingException e) {
        System.out.println("Bad encoding");
    } catch (IOException e) {
        System.out.println("IO error");
    } finally {
        System.out.println("END");
    }
}
```



`try...finally`语句：

> 某些情况下，可以没有`catch`，只使用`try ... finally`结构！



```java
void process(String file) throws IOException {
    try {
        ...
    } finally {
        System.out.println("END");
    }
}
```





### 3、异常逻辑相同则合并



> 处理`IOException`和`NumberFormatException`的代码是相同的，所以我们可以把它两用`|`合并到一起：

```java
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException | NumberFormatException e) { // IOException或NumberFormatException
        System.out.println("Bad input");
    } catch (Exception e) {
        System.out.println("Unknown error");
    }
}
```



## 三、抛出异常



>目的：是为了在代码执行发生错误的时候，停止，或者进行处理，以及抛出信息帮助程序员定位出现bug的位置！
>
>所以，需要在可能发生异常的地方，使用 throw 语句抛出异常！
>
>异常抛出之后，需要对异常进行捕获！

### 1、异常的传播



> 当某个方法抛出了异常时，如果当前方法没有捕获异常，异常就会被抛到上层调用方法，直到遇到某个`try ... catch`被捕获为止：





```java
package com.test;

public class codeTest {
    public static void main(String[] args) {
        try {
            process1();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void process1() {
        process2();
    }

    static void process2() {
        Integer.parseInt(null); // 会抛出NumberFormatException
    }
}
```



使用`printStackTrace()`方法打印方法的调用栈：

> `printStackTrace()`对于调试错误非常有用，下面信息表示：`NumberFormatException`是在`java.lang.Integer.parseInt`方法中被抛出的！



```
java.lang.NumberFormatException: null
	at java.base/java.lang.Integer.parseInt(Integer.java:614)
	at java.base/java.lang.Integer.parseInt(Integer.java:770)
	at com.test.codeTest.process2(codeTest.java:17)
	at com.test.codeTest.process1(codeTest.java:13)
	at com.test.codeTest.main(codeTest.java:6)

Process finished with exit code 0

```



打印的是异常栈，是栈，所以从下往上看：



- `main()`调用`process1()`；
- `process1()`调用`process2()`；
- `process2()`调用`Integer.parseInt(String)`；
- `Integer.parseInt(String)`调用`Integer.parseInt(String, int)`。



### 2、抛出异常



#### 2.1 创建并抛出



- 创建某个`Exception`的实例；

- 用`throw`语句抛出。



通常会合并到一起来写：



```java
void process2(String s) {
    if (s==null) {
        NullPointerException e = new NullPointerException();
        throw e;
    }
}

// 合并写法：
void process2(String s) {
    if (s==null) {
        throw new NullPointerException();
    }
}
```





#### 2.2 异常转换

> 如果一个方法捕获了某个异常后，又在`catch`子句中抛出新的异常，就相当于把抛出的异常类型“转换”了：
>
> 后者覆盖前者：
>
> 当`process2()`抛出`NullPointerException`后，被`process1()`捕获，然后抛出`IllegalArgumentException()`。



```java
public class Main {
    public static void main(String[] args) {
        try {
            process1();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void process1() {
        try {
            process2();
        } catch (NullPointerException e) {
            throw new IllegalArgumentException();
        }
    }

    static void process2() {
        throw new NullPointerException();
    }
}
```



#### 2.3 传入原始`Exception`来保留原始`Exception`



> 捕获到异常并再次抛出时，一定要留住原始异常，否则很难定位第一案发现场！



```java
public class Main {
    public static void main(String[] args) {
        try {
            process1();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void process1() {
        try {
            process2();
        } catch (NullPointerException e) {
            // 关键点，传入原始Exception e
            throw new IllegalArgumentException(e);
        }
    }

    static void process2() {
        throw new NullPointerException();
    }
}
```

抛出信息的异常栈信息如下：

> 注意到`Caused by: Xxx`，说明捕获的`IllegalArgumentException`并不是造成问题的根源，根源在于`NullPointerException`，是在`Main.process2()`方法抛出的。

```
java.lang.IllegalArgumentException: java.lang.NullPointerException
	at com.test.codeTest.process1(codeTest.java:16)
	at com.test.codeTest.main(codeTest.java:6)
// 关键点：
Caused by: java.lang.NullPointerException
	at com.test.codeTest.process2(codeTest.java:23)
	at com.test.codeTest.process1(codeTest.java:14)
```



### 3、finally语句是否执行



> 在`catch`中抛出异常，不会影响`finally`的执行。JVM会先执行`finally`，然后抛出异常。



```java
public class Main {
    public static void main(String[] args) {
        try {
            Integer.parseInt("abc");
        } catch (Exception e) {
            System.out.println("catched");
            throw new RuntimeException(e);
        } finally {
            System.out.println("finally");
        }
    }
}
```



```
catched
finally
Exception in thread "main" java.lang.IllegalArgumentException
    at Main.main(Main.java:11)
```



### 4、异常屏蔽



> 在执行`finally`语句时抛出异常,`catch`语句的异常会被屏蔽！
>
> `finally`抛出异常后，原来在`catch`中准备抛出的异常就“消失”了，因为只能抛出一个异常。没有被抛出的异常称为“被屏蔽”的异常（Suppressed Exception）
>
> Suppressed ：屏蔽
>
> 绝大多数情况下，在`finally`中不要抛出异常。因此，我们通常不需要关心`Suppressed Exception`。



```java
public class Main {
    public static void main(String[] args) {
        try {
            Integer.parseInt("abc");
        } catch (Exception e) {
            System.out.println("catched");
            throw new RuntimeException(e);
        } finally {
            System.out.println("finally");
            throw new IllegalArgumentException();
        }
    }
}
```



抛出异常如下：



```
catched
finally
Exception in thread "main" java.lang.IllegalArgumentException
    at Main.main(Main.java:11)
```



解决方法：



> 如果需要获知所有的异常，方法是先用`origin`变量保存原始异常，然后调用`Throwable.addSuppressed()`，把原始异常添加进来，最后在`finally`抛出：
>
> Suppressed ：屏蔽



```java
public class Main {
    public static void main(String[] args) throws Exception {
        Exception origin = null;
        try {
            System.out.println(Integer.parseInt("abc"));
        } catch (Exception e) {
            origin = e;
            throw e;
        } finally {
            Exception e = new IllegalArgumentException();
            if (origin != null) {
                e.addSuppressed(origin);
            }
            throw e;
        }
    }
}
```



抛出异常信息如下：



```java
Exception in thread "main" java.lang.IllegalArgumentException
    at Main.main(Main.java:11)
    // 关键点：屏蔽异常信息：NumberFormatException
    Suppressed: java.lang.NumberFormatException: For input string: "abc"
        at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:68)
        at java.base/java.lang.Integer.parseInt(Integer.java:652)
        at java.base/java.lang.Integer.parseInt(Integer.java:770)
```



## 四、自定义异常



### 1、Java标准库定义的 常用异常：



```ascii
Exception
│
├─ RuntimeException
│  │
│  ├─ NullPointerException
│  │
│  ├─ IndexOutOfBoundsException
│  │
│  ├─ SecurityException
│  │
│  └─ IllegalArgumentException
│     │
│     └─ NumberFormatException
│
├─ IOException
│  │
│  ├─ UnsupportedCharsetException
│  │
│  ├─ FileNotFoundException
│  │
│  └─ SocketException
│
├─ ParseException
│
├─ GeneralSecurityException
│
├─ SQLException
│
└─ TimeoutException
```





### 2、自定义异常



>在一个大型项目中，可以自定义新的异常类型，但是，保持一个合理的异常继承体系是非常重要的。
>
>一个常见的做法是自定义一个`BaseException`作为“根异常”，然后，派生出各种业务类型的异常。
>
>`BaseException`需要从一个适合的`Exception`派生，通常建议从`RuntimeException`派生：
>
>`BaseException`构造方法实际上都是原样照抄`RuntimeException`。这样，抛出异常的时候，就可以选择合适的构造方法。通过IDE可以根据父类快速生成子类的构造方法。



```java
public class BaseException extends RuntimeException {
    public BaseException() {
        super();
    }

    public BaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public BaseException(String message) {
        super(message);
    }

    public BaseException(Throwable cause) {
        super(cause);
    }
}

public class UserNotFoundException extends BaseException {
}

public class LoginFailedException extends BaseException {
}

...
```



## 五、NullPointerException





> 所有的`RuntimeException`异常中，最常见的就是`NullPointerException`了！
>
> `NullPointerException`即空指针异常，俗称NPE。如果一个对象为`null`，调用其方法或访问其字段就会产生`NullPointerException`，这个异常通常是由JVM抛出的！



### 1、处理NullPointerException



> `NullPointerException`是一种代码逻辑错误，遇到`NullPointerException`，遵循原则是早暴露，早修复，严禁使用`catch`来隐藏这种编码错误：





#### 1.1 变量定义时尽量不使用`null`

>使用空字符串`""`而不是默认的`null`可避免很多`NullPointerException`，编写业务逻辑时，用空字符串`""`表示未填写比`null`安全得多。

```java
public class Person {
    private String name = "";
}
```

#### 1.2 返回时尽量不返回`null`



```java
package com.test;

public class codeTest {
    public static void main(String[] args) {
        String name = getName();
        System.out.println(name.toString());
    }

    public static String getName() {
        //return null;
        return "";
    }
}
```



#### 1.3 必须返回`null`时使用`Optional<T>`



> 使用`Optional.isPresent()来判断是不是null`
>
> 使用`Optional.of()`返回T类型的值：



```java
package com.test;

import java.util.Optional;

public class codeTest {
    public static void main(String[] args) {
        Optional<String> name = getName();
        if(name.isPresent()) {
            System.out.println(name);
        }else{
            System.out.println("NULL");
        }
    }

    public static Optional<String> getName() {
        //return null;
        //return Optional.of("hhh");
        return Optional.empty();
    }
}
```



### 2、定位NullPointerException



> 这种增强的`NullPointerException`详细信息是Java 14新增的功能，但默认是关闭的，我们可以给JVM添加一个`-XX:+ShowCodeDetailsInExceptionMessages`参数启用它：



```
java -XX:+ShowCodeDetailsInExceptionMessages Main.java
```





```java
package com.test;

public class codeTest {
    public static void main(String[] args) {
        Persons p = new Persons();
        System.out.println(p.address.city.toLowerCase());
    }
}

class Persons {
    String[] name = new String[2];
    Address address = new Address();
}

class Address {
    String city;
    String street;
    String zipcode;
}
```



定位信息如下：`city`是空的！

```
java -XX:+ShowCodeDetailsInExceptionMessages Main.java

// 信息如下：
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.toLowerCase()" because "<local1>.address.city" is null
        at com.test.codeTest.main(codeTest.java:6)
```



## 六、使用断言



> 实际开发中，很少使用断言。更好的方法是编写单元测试！
>
> 断言条件预期为`true`，则正常执行。断言条件为`false`，抛出`AssertionError`。
>
> 后面可加参数来打印提示信息，更加便于调试！
>
> Java断言的特点是：断言失败时会抛出`AssertionError`，导致程序结束退出。因此，断言不能用于可恢复的程序错误，只应该用于开发和测试阶段。
>
> 对可恢复的错误不能使用断言，而应该抛出异常；

```java
assert x >= 0 : "x must >= 0";
```



```java
public class Main {
    public static void main(String[] args) {
        int x = -1;
        assert x > 0;
        System.out.println(x);
    }
}
```





> JVM默认关闭断言指令，即遇到`assert`语句就自动忽略了，不执行。
>
> 要执行`assert`语句，必须给Java虚拟机传递`-enableassertions`（可简写为`-ea`）参数启用断言。所以，上述程序必须在命令行下运行才有效果：



```java
$ java -ea Main.java
Exception in thread "main" java.lang.AssertionError
	at Main.main(Main.java:5)
```





## 七、使用JDK Loging





> 编写程序的过程中，发现程序运行结果与预期不符，使用`System.out.println()`打印变量信息！异常麻烦！
>
> 所以使用Loging，日志就是Logging，它的目的是为了取代`System.out.println()`。
>
> 使用日志最大的好处是，它自动打印了时间、调用类、调用方法等很多有用的信息。



### 几点好处：

1. 可以设置输出样式，避免自己每次都写`"ERROR: " + var`；
2. 可以设置输出级别，禁止某些级别输出。例如，只输出错误日志；
3. 可以被重定向到文件，这样可以在程序运行结束后查看日志；
4. 可以按包名控制日志级别，只输出某些包打的日志；
5. 可以……



```java
package com.test;

import java.util.logging.Logger;

public class codeTest {
    public static void main(String[] args) {
        Logger logger = Logger.getGlobal();
        logger.info("start process...");
        logger.warning("memory is running out...");
        logger.fine("ignored.");
        logger.severe("process will be terminated...");
    }
}
```



输出信息如下：

```
3月 31, 2020 6:12:33 下午 com.test.codeTest main
信息: start process...
3月 31, 2020 6:12:33 下午 com.test.codeTest main
警告: memory is running out...
3月 31, 2020 6:12:33 下午 com.test.codeTest main
严重: process will be terminated...
```





### Logger日志的七个级别：



> 默认级别是INFO，因此，INFO级别以下的日志，不会被打印出来。使用日志级别的好处在于，调整级别，就可以屏蔽掉很多调试相关的日志输出。

- SEVERE
- WARNING
- INFO
- CONFIG
- FINE
- FINER
- FINEST





Logging系统在JVM启动时读取配置文件并完成初始化，一旦开始运行`main()`方法，就无法修改配置；

配置不太方便，需要在JVM启动时传递参数`-Djava.util.logging.config.file=`。

因此，Java标准库内置的Logging使用并不是非常广泛。



一个例子：





```java
package com.test;

import com.sun.tools.javac.Main;

import java.io.UnsupportedEncodingException;
import java.util.logging.Logger;

public class codeTest {
    public static void main(String[] args) {
        Logger logger = Logger.getLogger(Main.class.getName());
        logger.info("Start process...");
        try {
            "".getBytes("invalidCharsetName");
        } catch (UnsupportedEncodingException e) {
            // TODO: 使用logger.severe()打印异常
            logger.severe(e.toString());
        }
        logger.info("Process end.");
    }
}
```



日志如下：



```
3月 31, 2020 6:18:43 下午 com.test.codeTest main
信息: Start process...
3月 31, 2020 6:18:43 下午 com.test.codeTest main
严重: java.io.UnsupportedEncodingException: invalidCharsetName
3月 31, 2020 6:18:43 下午 com.test.codeTest main
信息: Process end.

Process finished with exit code 0

```





## 八、使用Commons Logging



>和Java标准库提供的日志不同，Commons Logging是一个第三方日志库，它是由Apache创建的日志模块。
>
>Commons Logging的特色是，它可以挂接不同的日志系统，并通过配置文件指定挂接的日志系统。默认情况下，Commons Loggin自动搜索并使用Log4j（Log4j是另一个流行的日志系统），如果没有找到Log4j，再使用JDK Logging。



Commons Logging是一个第三方提供的库，所以，必须先把它[下载](https://commons.apache.org/proper/commons-logging/download_logging.cgi)下来。下载后，解压，找到`commons-logging-1.2.jar`这个文件，再把Java源码`Main.java`放到一个目录下



### 1、idea 导入方式：

1.打开 File -> Project Structure 

2.单击 Modules -> Dependencies -> "+" -> "Jars or directories"

3.选择硬盘上的jar包

4.Apply -> OK



然后将鼠标放到导入的包上，点击提示信息的add classspath....即可成功导入！





```java
package com.test;

import com.sun.tools.javac.Main;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class codeTest {
    public static void main(String[] args) {
        Log log = LogFactory.getLog(Main.class);
        log.info("start...");
        log.warn("end.");
    }
}
```

信息如下：

```
3月 31, 2020 6:51:39 下午 com.sun.tools.javac.Main main
信息: start...
3月 31, 2020 6:51:39 下午 com.sun.tools.javac.Main main
警告: end.
```



### 2、Commons Logging定义了6个日志级别：

- FATAL
- ERROR
- WARNING
- INFO
- DEBUG
- TRACE

默认级别是`INFO`。

### 3、静态方法中引用log定义静态类型变量：





```java
/ 在静态方法中引用Log:
public class Main {
    static final Log log = LogFactory.getLog(Main.class);

    static void foo() {
        log.info("foo");
    }
}
```

### 4、实例方法中引用log定义实例类型变量：



> 注意到实例变量log的获取方式是`LogFactory.getLog(getClass())`，虽然也可以用`LogFactory.getLog(Person.class)`，但是前一种方式有个非常大的好处，就是子类可以直接使用该`log`实例：
>
> 由于Java类的动态特性，子类获取的`log`字段实际上相当于`LogFactory.getLog(Student.class)`，但却是从父类继承而来，并且无需改动代码：



```java
// 在实例方法中引用Log:
public class Person {
    protected final Log log = LogFactory.getLog(getClass());

    void foo() {
        log.info("foo");
    }
}


// 在子类中使用父类实例化的log:
public class Student extends Person {
    void bar() {
        log.info("bar");
    }
}
```



### 5、可抛出异常：



> Commons Logging的日志方法，例如`info()`，除了标准的`info(String)`外，还提供了一个非常有用的重载方法：`info(String, Throwable)`，这使得记录异常更加简单：



本例子使用了：

- 实例方法引用log定义实例变量
- 使用`LogFactory.getLog(getClass())`来是子类直接继承log
- 使用log的两个参数，第二个参数来抛出异常：



```java
package com.test;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class codeTest {
    public static void main(String[] args) {
        var s = new Persons();
        s.foo();
        var t = new Tests();
        t.bar();
    }
}

class Persons{
    protected final Log log = LogFactory.getLog(getClass());

    void foo(){
        try {
            Integer n = Integer.parseInt("abs");
        }catch (NumberFormatException e){
            log.error("foo", e);
        }
    }
}

class Tests extends Persons{
    void bar(){
        log.info("bar");
    }
}
```



结果如下：



```
3月 31, 2020 7:09:22 下午 com.test.Persons foo
严重: foo
java.lang.NumberFormatException: For input string: "abs"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:68)
	at java.base/java.lang.Integer.parseInt(Integer.java:652)
	at java.base/java.lang.Integer.parseInt(Integer.java:770)
	at com.test.Persons.foo(codeTest.java:20)
	at com.test.codeTest.main(codeTest.java:9)

3月 31, 2020 7:09:22 下午 com.test.Tests bar
信息: bar
```



## 九、使用Log4j





>前面介绍了Commons Logging，可以作为“日志接口”来使用。而真正的“日志实现”可以使用Log4j。
>
>Log4j是一种非常流行的日志框架，最新版本是2.x。
>
>在开发阶段，始终使用Commons Logging接口来写入日志，并且开发阶段无需引入Log4j。如果需要把日志写入文件， 只需要把正确的配置文件和Log4j相关的jar包放入`classpath`，就可以自动把日志切换成使用Log4j写入，无需修改任何代码。



### 1、Log4j架构：

Log4j是一个组件化设计的日志系统，它的架构大致如下：



```ascii
log.info("User signed in.");
 │
 │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 ├──>│ Appender │───>│  Filter  │───>│  Layout  │───>│ Console  │
 │   └──────────┘    └──────────┘    └──────────┘    └──────────┘
 │
 │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 ├──>│ Appender │───>│  Filter  │───>│  Layout  │───>│   File   │
 │   └──────────┘    └──────────┘    └──────────┘    └──────────┘
 │
 │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 └──>│ Appender │───>│  Filter  │───>│  Layout  │───>│  Socket  │
     └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

当我们使用Log4j输出一条日志时，Log4j自动通过不同的Appender把同一条日志输出到不同的目的地。例如：

- console：输出到屏幕；
- file：输出到文件；
- socket：通过网络输出到远程计算机；
- jdbc：输出到数据库

在输出日志的过程中，通过Filter来过滤哪些log需要被输出，哪些log不需要被输出。例如，仅输出`ERROR`级别的日志。

最后，通过Layout来格式化日志信息，例如，自动添加日期、时间、方法名称等信息。



### 2、配置XML文件

上述结构虽然复杂，但我们在实际使用的时候，并不需要关心Log4j的API，而是通过配置文件来配置它。



> 将下面保存到文件并命名为：log4j2.xml放到src目录下即可：
>
> 虽然配置Log4j比较繁琐，但一旦配置完成，使用起来就非常方便。对上面的配置文件，凡是`INFO`级别的日志，会自动输出到屏幕，而`ERROR`级别的日志，不但会输出到屏幕，还会同时输出到文件。并且，一旦日志文件达到指定大小（1MB），Log4j就会自动切割新的日志文件，并最多保留10份。



```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
	<Properties>
        <!-- 定义日志格式 -->
		<Property name="log.pattern">%d{MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36}%n%msg%n%n</Property>
        <!-- 定义文件名变量 -->
		<Property name="file.err.filename">log/err.log</Property>
		<Property name="file.err.pattern">log/err.%i.log.gz</Property>
	</Properties>
    <!-- 定义Appender，即目的地 -->
	<Appenders>
        <!-- 定义输出到屏幕 -->
		<Console name="console" target="SYSTEM_OUT">
            <!-- 日志格式引用上面定义的log.pattern -->
			<PatternLayout pattern="${log.pattern}" />
		</Console>
        <!-- 定义输出到文件,文件名引用上面定义的file.err.filename -->
		<RollingFile name="err" bufferedIO="true" fileName="${file.err.filename}" filePattern="${file.err.pattern}">
			<PatternLayout pattern="${log.pattern}" />
			<Policies>
                <!-- 根据文件大小自动切割日志 -->
				<SizeBasedTriggeringPolicy size="1 MB" />
			</Policies>
            <!-- 保留最近10份 -->
			<DefaultRolloverStrategy max="10" />
		</RollingFile>
	</Appenders>
	<Loggers>
		<Root level="info">
            <!-- 对info级别的日志，输出到console -->
			<AppenderRef ref="console" level="info" />
            <!-- 对error级别的日志，输出到err，即上面定义的RollingFile -->
			<AppenderRef ref="err" level="error" />
		</Root>
	</Loggers>
</Configuration>
```



> 虽然配置Log4j比较繁琐，但一旦配置完成，使用起来就非常方便。对上面的配置文件，凡是`INFO`级别的日志，会自动输出到屏幕，而`ERROR`级别的日志，不但会输出到屏幕，还会同时输出到文件。并且，一旦日志文件达到指定大小（1MB），Log4j就会自动切割新的日志文件，并最多保留10份。



### 3、下载并配置Log4j

有了配置文件还不够，因为Log4j也是一个第三方库，我们需要从[这里](https://logging.apache.org/log4j/2.x/download.html)下载Log4j，解压后，把以下3个jar包放到`classpath`中：

- log4j-api-2.x.jar
- log4j-core-2.x.jar
- log4j-jcl-2.x.jar

>因为Commons Logging会自动发现并使用Log4j，所以，把上一节下载的`commons-logging-1.2.jar`也放到`classpath`中。
>
>要打印日志，只需要按Commons Logging的写法写，不需要改动任何代码，就可以得到Log4j的日志输出，类似：



第八节第五点的输出信息变为如下：



```
03-31 19:35:03.119 [main] ERROR com.test.Persons
foo

java.lang.NumberFormatException: For input string: "abs"
	at java.lang.NumberFormatException.forInputString(NumberFormatException.java:68) ~[?:?]
	at java.lang.Integer.parseInt(Integer.java:652) ~[?:?]
	at java.lang.Integer.parseInt(Integer.java:770) ~[?:?]
	at com.test.Persons.foo(codeTest.java:20) [java-base/:?]
	at com.test.codeTest.main(codeTest.java:9) [java-base/:?]
03-31 19:35:03.146 [main] INFO  com.test.Tests
bar
```

### 4、小结



- 通过Commons Logging实现日志，不需要修改代码即可使用Log4j；

- 使用Log4j只需要把log4j2.xml和相关jar放入classpath；

- 如果要更换Log4j，只需要移除log4j2.xml和相关jar；

- 只有扩展Log4j时，才需要引用Log4j的接口（例如，将日志加密写入数据库的功能，需要自己开发）。

## 十、使用SLF4J和Logback





>前面介绍了Commons Logging和Log4j这一对好基友，它们一个负责充当日志API，一个负责实现日志底层，搭配使用非常便于开发。
>
>有的童鞋可能还听说过SLF4J和Logback。这两个东东看上去也像日志，它们又是啥？
>
>其实SLF4J类似于Commons Logging，也是一个日志接口，而Logback类似于Log4j，是一个日志的实现。
>
>为什么有了Commons Logging和Log4j，又会蹦出来SLF4J和Logback？这是因为Java有着非常悠久的开源历史，不但OpenJDK本身是开源的，而且我们用到的第三方库，几乎全部都是开源的。开源生态丰富的一个特定就是，同一个功能，可以找到若干种互相竞争的开源库。
>
>因为对Commons Logging的接口不满意，有人就搞了SLF4J。因为对Log4j的性能不满意，有人就搞了Logback。



来看看SLF4J对Commons Logging的接口有何改进：

> SLF4J的日志接口传入的是一个带占位符的字符串，用后面的变量自动替换占位符，所以看起来更加自然。

```java
int score = 99;
p.setScore(score);
// Commons Logging 的拼接字符串：
log.info("Set score " + score + " for Person " + p.getName() + " ok.");

// SLF4J
int score = 99;
p.setScore(score);
// 改进后的拼接字符串：
logger.info("Set score {} for Person {} ok.", score, p.getName());
```

如何使用SLF4J？它的接口实际上和Commons Logging几乎一模一样！



### 配置相关：

使用SLF4J和Logback和前面讲到的使用Commons Logging加Log4j是类似的，先分别下载[SLF4J](https://www.slf4j.org/download.html)和[Logback](https://logback.qos.ch/download.html)，然后把以下jar包放到classpath下：

- slf4j-api-1.7.x.jar
- logback-classic-1.2.x.jar
- logback-core-1.2.x.jar



在src目录下新建一个logback.xml文件，写入下面内容：



```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

	<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
		</encoder>
	</appender>

	<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<encoder>
			<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
			<charset>utf-8</charset>
		</encoder>
		<file>log/output.log</file>
		<rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
			<fileNamePattern>log/output.log.%i</fileNamePattern>
		</rollingPolicy>
		<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
			<MaxFileSize>1MB</MaxFileSize>
		</triggeringPolicy>
	</appender>

	<root level="INFO">
		<appender-ref ref="CONSOLE" />
		<appender-ref ref="FILE" />
	</root>
</configuration>
```





### 代码修改如下：



```java
package com.test;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

public class codeTest {
    public static void main(String[] args) {
        var s = new Persons();
        s.foo();
        var t = new Tests();
        t.bar();
    }
}

class Persons{
    //protected final Logger log = LoggerFactory.getLogger(getClass());
    final Logger logger = LoggerFactory.getLogger(getClass());

    void foo(){
        try {
            Integer n = Integer.parseInt("abs");
        }catch (NumberFormatException e){
            logger.error("foo", e);
        }
    }
}

class Tests extends Persons{
    String name = "Mr.Niu";
    int age = 100;
    void bar(){
        logger.info("bar");
        // 拼接字符串新方法：
        logger.info("name:{}, age:{}",name, age);
    }
}
```

输出信息如下：

```
20:14:19.679 [main] ERROR com.test.Persons - foo
java.lang.NumberFormatException: For input string: "abs"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:68)
	at java.base/java.lang.Integer.parseInt(Integer.java:652)
	at java.base/java.lang.Integer.parseInt(Integer.java:770)
	at com.test.Persons.foo(codeTest.java:21)
	at com.test.codeTest.main(codeTest.java:9)
20:14:19.693 [main] INFO  com.test.Tests - bar
20:14:19.697 [main] INFO  com.test.Tests - name:Mr.Niu, age:100
```





### 小结

- SLF4J和Logback可以取代Commons Logging和Log4j；

- 始终使用SLF4J的接口写入日志，使用Logback只需要配置，不需要修改代码。





<center style="color:red; font-size:25px">异常处理已完结，敬请期待后续章节！</center>