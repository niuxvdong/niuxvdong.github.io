---
title: Java教程系列之单元测试
author: Mr.Niu
toc: true
abbrlink: 44270
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/f0fae310f1ddfd67bb50ee27cd565a6c.png'
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/f0fae310f1ddfd67bb50ee27cd565a6c.png'
categories:
  - Java教程
tags:
  - JUnit
date: 2020-04-16 18:05:18
updated:
---



{% meting "1415819768" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



## 一、编写Junit测试





> 单元测试就是针对最小的功能单元编写测试代码。Java程序最小的功能单元是方法，因此，对Java程序进行单元测试就是针对单个Java方法的测试。
>
> 实现测试与主程序分离，实现打印测试结果，可编写通用测试代码！





### 1、Junit



>JUnit是一个开源的Java语言的单元测试框架，专门针对Java设计，使用最广泛。JUnit是事实上的单元测试的标准框架，任何Java开发者都应当学习并使用JUnit编写单元测试。
>
>使用JUnit编写单元测试的好处在于，我们可以非常简单地组织测试代码，并随时运行它们，JUnit就会给出成功的测试和失败的测试，还可以生成测试报告，不仅包含测试的成功率，还可以统计测试的代码覆盖率，即被测试的代码本身有多少经过了测试。对于高质量的代码来说，测试覆盖率应该在80%以上。
>
>JUnit目前最新版本是5。





### 2、步骤：

- 首先在src同级下建立test目录
- 设置为测试专用文件夹，右键test目录找到`Mark Directory as` 选择子选项的`Test Sources Root`
- 回到src，找到需要测试的方法，右键选择`Go To`的子选项`Test`，出现的选项中点击`Creat new Test`
- 后面用到的Junit等相关库，Idea会自动去导包，并加入classpath!
- 写好主程序和测试程序后，去测试程序运行即可：



### 3、编写举例





> 核心测试方法`testFact()`加上了`@Test`注解，这是JUnit要求的，它会把带有`@Test`的方法识别为测试方法。
>
> 习惯上将Test文件的名字命名为`需测试类名+Test.java`：
>
> eg：主程序：Factory.java
>
> 测试程序：FactoryTest.java
>
> 以计算阶乘的方法为例：



#### 测试成功情况：

Factory：

```java
package com.org;

public class Factory {
    public static long fact(long n) {
        long r = 1;
        for (long i = 1; i <= n; i++) {
            r = r * i;
        }
        return r;
    }
}
```

FactoryTest：

```java
package com.org;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class FactoryTest {

    @Test
    void fact() {
        assertEquals(1, Factory.fact(1));
        assertEquals(2, Factory.fact(2));
        assertEquals(6, Factory.fact(3));
        assertEquals(3628800, Factory.fact(10));
        assertEquals(2432902008176640000L, Factory.fact(20));
    }
}
```



没有问题不会输出东西：

```
Process finished with exit code 0
```

#### 测试失败情况：

> 将测试程序认为改一下：
>
> `assertEquals(1, Factory.fact(1))` -> `assertEquals(2, Factory.fact(1))`：



输出结果：

会显示不一致的地方：

```
org.opentest4j.AssertionFailedError: 
Expected :2
Actual   :1
<Click to see difference>


	at org.junit.jupiter.api.AssertionUtils.fail(AssertionUtils.java:55)
	at org.junit.jupiter.api.AssertEquals.failNotEqual(AssertEquals.java:195)
	at .....
```



#### 浮点数的处理



> 由于浮点数运算会有误差，所以需要设置一个误差值来限定：
>
> 使用`assertEquals()`的重载方法，第三个参数指定误差范围即可：

```java
package com.org;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class Double01Test {

    @Test
    void calc() {
        //assertEquals(0.1, Math.abs(1 - 9 / 10.0)); // 0.09999999999999998
        assertEquals(0.1, Math.abs(1 - 9 / 10.0), 0.000001);
        assertEquals(0.2, Math.abs(1 - 8 / 10.0), 0.000001);
        //assertEquals(0.1, Math.abs(1 - 0.9)); // 0.09999999999999998
        assertEquals(0.1, Math.abs(1 - 0.9), 0.0000001);
    }
}
```











### 4、Assertion（断言）



> 在测试方法内部，我们用`assertEquals(1, Factorial.fact(1))`表示，期望`Factorial.fact(1)`返回`1`。`assertEquals(expected, actual)`是最常用的测试方法，它在`Assertion`类中定义。
>
> [在异常处理一节第六点提到过断言，点击这里！](https://www.itnxd.cn/posts/19314.html)



`Assertion`还定义了其他断言方法，例如：

- `assertTrue()`: 期待结果为`true`
- `assertFalse()`: 期待结果为`false`
- `assertNotNull()`: 期待结果为非`null`
- `assertArrayEquals()`: 期待结果为数组并与期望数组每个元素的值均相等
- ...





### 5、单元测试总结



> 单元测试可以确保单个方法按照正确预期运行，如果修改了某个方法的代码，只需确保其对应的单元测试通过，即可认为改动正确。此外，测试代码本身就可以作为示例代码，用来演示如何调用该方法。
>
> 使用JUnit进行单元测试，我们可以使用断言（`Assertion`）来测试期望结果，可以方便地组织和运行测试，并方便地查看测试结果。此外，JUnit既可以直接在IDE中运行，也可以方便地集成到Maven这些自动化工具中运行。



在编写单元测试的时候，我们要遵循一定的规范：

- 一是单元测试代码本身必须非常简单，能一下看明白，决不能再为测试代码编写测试；

- 二是每个单元测试应当互相独立，不依赖运行的顺序；

- 三是测试时不但要覆盖常用测试用例，还要特别注意测试边界条件，例如输入为`0`，`null`，空字符串`""`等情况。





## 二、使用Fixture



> 
>
> 在一个单元测试中，我们经常编写多个`@Test`方法，来分组、分类对目标代码进行测试。
>
> 在测试的时候，我们经常遇到一个对象需要初始化，测试完可能还需要清理的情况。如果每个`@Test`方法都写一遍这样的重复代码，显然比较麻烦。
>
> JUnit提供了编写测试前准备、测试后清理的固定代码，我们称之为Fixture。





### 1、@BeforeEach 和 @AfterEach





> 在`CalculatorTest`测试中，有两个标记为`@BeforeEach`和`@AfterEach`的方法，它们会在运行每个`@Test`方法前后自动运行：
>
> 通过`@BeforeEach`来初始化，通过`@AfterEach`来清理资源：
>
> 试了一下，不用Fixture，也可以正常测试成功，所以我觉得Java默认是有这两个方法在每个test方法前后去执行的，不过自己加上更加明显，修改之类的都可以更加方便，所以还是自己写上为好：（Idea可以在go to 后直接选择添加，并不需要手写：）
>
> 举一个例子：



Calculator类：



```java
package com.org;

public class Calculator {
    private long n = 0;

    public long add(long x) {
        n = n + x;
        return n;
    }

    public long sub(long x) {
        n = n - x;
        return n;
    }
}
```



CalculatorTest类：



```java
package com.org;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    Calculator calculator;

    @BeforeEach
    void setUp() {
         this.calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        this.calculator = null;
    }

    @Test
    void add() {
        assertEquals(100, this.calculator.add(100));
        assertEquals(150, this.calculator.add(50));
        assertEquals(130, this.calculator.add(-20));
    }

    @Test
    void sub() {
        assertEquals(-100, this.calculator.sub(100));
        assertEquals(-150, this.calculator.sub(50));
        assertEquals(-130, this.calculator.sub(-20));
    }
}
```





### 2、@BeforeAll 和 @AfterAll



> 它们在运行所有@Test前后运行：
>
> 因为`@BeforeAll`和`@AfterAll`在所有`@Test`方法运行前后仅运行一次，因此，它们只能初始化静态方法的静态变量：
>
> 有一些资源初始化和清理可能更加繁琐，而且会耗费较长的时间：（例如初始化数据库）
>
> 一般不会用到这两个！





[不举例子了，点击这里：](https://www.liaoxuefeng.com/wiki/1252599548343744/1304049490067490)





### 3、小结



> 大多数情况下，使用`@BeforeEach`和`@AfterEach`就足够了。只有某些测试资源初始化耗费时间太长，以至于我们不得不尽量“复用”时才会用到`@BeforeAll`和`@AfterAll`。
>
> 注意到每次运行一个`@Test`方法前，JUnit首先创建一个`XxxTest`实例，因此，每个`@Test`方法内部的成员变量都是独立的，不能也无法把成员变量的状态从一个`@Test`方法带到另一个`@Test`方法。
>
> 这样说来就解释了第一点不使用Fixture仍然可以测试成功的原因：



1. 对于实例变量，在`@BeforeEach`中初始化，在`@AfterEach`中清理，它们在各个`@Test`方法中互不影响，因为是不同的实例；
2. 对于静态变量，在`@BeforeAll`中初始化，在`@AfterAll`中清理，它们在各个`@Test`方法中均是唯一实例，会影响各个`@Test`方法。



## 三、异常测试





>在Java程序中，异常处理是非常重要的。
>
>我们自己编写的方法，也经常抛出各种异常。对于可能抛出的异常进行测试，本身就是测试的重要环节。
>
>因此，在编写JUnit测试的时候，除了正常的输入输出，我们还要特别针对可能导致异常的情况进行测试：
>
>还是以`Factory()`方法举例：





Factory类：



> 在方法入口，我们增加了对参数`n`的检查，如果为负数，则直接抛出`IllegalArgumentException`。



```java
package com.org;

public class Factory {
    public static long fact(long n) {
        if(n < 0){
            throw new IllegalArgumentException();
        }
        long r = 1;
        for (long i = 1; i <= n; i++) {
            r = r * i;
        }
        return r;
    }
}
```





FactoryTest类：



> 我们希望对异常进行测试。在JUnit测试中，我们可以编写一个`@Test`方法专门测试异常`testNegative()`方法：
>
> JUnit提供`assertThrows()`来期望捕获一个指定的异常。第二个参数`Executable`封装了我们要执行的会产生异常的代码。当我们执行`Factorial.fact(-1)`时，必定抛出`IllegalArgumentException`。`assertThrows()`在捕获到指定异常时表示通过测试，未捕获到异常，或者捕获到的异常类型不对，均表示测试失败。
>
> 编写一个`Executable`的匿名类实在是太繁琐了。实际上，Java 8开始引入了函数式编程，所有单方法接口都可以简写如下`testNegative1()`方法：



```java
package com.org;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import static org.junit.jupiter.api.Assertions.*;

public class FactoryTest {

    @Test
    void fact() {
        assertEquals(1, Factory.fact(1));
        assertEquals(2, Factory.fact(2));
        assertEquals(6, Factory.fact(3));
        assertEquals(3628800, Factory.fact(10));
        assertEquals(2432902008176640000L, Factory.fact(20));
    }

    // 普通写法：
    @Test
    void testNegative(){
        assertThrows(IllegalArgumentException.class, new Executable() {
            @Override
            public void execute() throws Throwable {
                Factory.fact(-1);
            }
        });
    }

    // 使用函数式编程简化：
    @Test
    void testNegative1(){
        assertThrows(IllegalArgumentException.class, ()->{Factory.fact(-1);});
    }
}
```





## 四、条件测试



> 简单来说就是控制`@test`在什么条件下才执行：
>
> 在`@test`后面再加一些条件注解：



一些常用的条件注解：

- @Disabled("bug-101")：此测试不会执行，括号参数可选，为输出提示信息。
- @EnabledOnOs(OS.WINDOWS)：在什么系统测试。
- @DisabledOnOs(OS.WINDOWS)：不在什么系统测试。
-  @DisabledOnJre(JRE.JAVA_8)：不在Java8test。
- @EnabledIfSystemProperty(named = "os.arch", matches = ".*64.*")：只能在六十四位系统测试。
-  @EnabledIfEnvironmentVariable(named = "DEBUG", matches = "true")：需要传入环境变量`DEBUG=true`才能执行的测试，即控制台里面传入该参数才可以。
- @EnabledIf("java.time.LocalDate.now().getDayOfWeek()==java.time.DayOfWeek.SUNDAY")：万能判断语句，当前是星期日才会执行测试。





> 万能的`@EnableIf`可以执行任意Java语句并根据返回的`boolean`决定是否执行测试。



Config类：



```java
package com.org;

public class Config {
    public String getConfigFile(String filename) {
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            return "C:\\" + filename;
        }
        if (os.contains("mac") || os.contains("linux") || os.contains("unix")) {
            return "/usr/local/" + filename;
        }
        throw new UnsupportedOperationException();
    }
}
```



ConfigTest类：



```java
package com.org;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConfigTest {

    Config config;

    @BeforeEach
    public void setUp() {
        this.config = new Config();
    }

    @Test
    @EnabledOnOs(OS.WINDOWS)
    void testWindows() {
        assertEquals("C:\\test.ini", config.getConfigFile("test.ini"));
    }

    @Test
    @EnabledOnOs({ OS.LINUX, OS.MAC })
    void testLinuxAndMac() {
        assertEquals("/usr/local/test.cfg", config.getConfigFile("test.cfg"));
    }

    @Test
    @Disabled("bug-101")
    void testBug101() {
        // TODO: this test is disabled for bug fixing
    }

    @Test
    @DisabledOnOs(OS.WINDOWS)
    void testOnNonWindowsOs() {
        // TODO: this test is disabled on windows
    }

    @Test
    @DisabledOnJre(JRE.JAVA_8)
    void testOnJava9OrAbove() {
        // TODO: this test is disabled on java 8
    }

    @Test
    @EnabledIfSystemProperty(named = "os.arch", matches = ".*64.*")
    void testOnlyOn64bitSystem() {
        // TODO: this test is only run on 64 bit system
    }

    @Test
    @EnabledIfEnvironmentVariable(named = "DEBUG", matches = "true")
    void testOnlyOnDebugMode() {
        // TODO: this test is only run on DEBUG=true
    }

    @Test
    @EnabledIf("java.time.LocalDate.now().getDayOfWeek()==java.time.DayOfWeek.SUNDAY")
    void testOnlyOnSunday() {
        // TODO: this test is only run on Sunday
    }
}
```



测试输出结果及提示信息：

```
Environment variable [DEBUG] does not exist

Warning: Nashorn engine is planned to be removed from a future JDK release

Script `java.time.LocalDate.now().getDayOfWeek()==java.time.DayOfWeek.SUNDAY` evaluated to: false

bug-101

Disabled on operating system: Windows 10

Disabled on operating system: Windows 10
```



## 五、参数化测试



> 如果待测试的输入和输出是一组数据： 可以把测试数据组织起来 用不同的测试数据调用相同的测试方法
>
> 参数化测试和普通测试稍微不同的地方在于，一个测试方法需要接收至少一个参数，然后，传入一组参数反复运行。
>
> JUnit提供了一个`@ParameterizedTest`注解，用来进行参数化测试。
>
> 与之前的测试不同，不再使用`@test`了！



- 以下方例子进行测试：将字符串转化为第一个字母大写，后面小写的形式：



```java
package com.org;

public class ArgumentsN {
    public static String capitalize(String s) {
        if (s.length() == 0) {
            return s;
        }
        return Character.toUpperCase(s.charAt(0)) + s.substring(1).toLowerCase();
    }
}
```



### 1、使用@MethodSource



> 编写一个同名的静态方法来提供测试参数：
>
> 返回一个`List<Arguments>`，方法内使用`Arguments.arguments()`方法，指定输入和输出参数。
>
> 如果静态方法和测试方法的名称不同，@MethodSource也允许指定方法名。但使用默认同名方法最方便。



```java
package com.org;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ArgumentsNTest {

    @ParameterizedTest
    @MethodSource
    void testCapitalize(String input, String result) {
        assertEquals(result, ArgumentsN.capitalize(input));
    }

    static List<Arguments> testCapitalize() {
        return List.of( // arguments:
                Arguments.arguments("abc", "Abc"), //
                Arguments.arguments("APPLE", "Apple"), //
                Arguments.arguments("gooD", "Good"));
    }
    
    // 静态方法名字不一致时：指定静态方法名：（一般不这样写）
    @ParameterizedTest
    @MethodSource("testCapitalize1")
    void testCapitalize(String input, String result) {
        assertEquals(result, ArgumentsN.capitalize(input));
    }

    static List<Arguments> testCapitalize1() {
        return List.of( // arguments:
                Arguments.arguments("abc", "Abc"), //
                Arguments.arguments("APPLE", "Apple"), //
                Arguments.arguments("gooD", "Good"));
    }
}
```



### 2、使用@CsvSource



>它的每一个字符串表示一行，一行包含的若干参数用`,`分隔，如下：



```java
package com.org;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ArgumentsNTest {

    @ParameterizedTest
    @CsvSource({ "abc, Abc", "APPLE, Apple", "gooD, Good" })
    void testCapitalize(String input, String result) {
        assertEquals(result, ArgumentsN.capitalize(input));
    }
}
```



### 3、使用@CsvFileSource



>如果有成百上千的测试输入，那么，直接写`@CsvSource`就很不方便。这个时候，我们可以把测试数据提到一个独立的CSV文件中，然后标注上`@CsvFileSource`：(使用参数指定csv的路径名)
>
>JUnit只在classpath中查找指定的CSV文件，因此，`test-capitalize.csv`这个文件要放到`test`目录下：（Idea可以写好路径，快捷进行创建文件：）



- CSV文件的内容：（逗号分隔，一行一个）



```
apple, Apple
HELLO, Hello
JUnit, Junit
reSource, Resource
```



```java
package com.org;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ArgumentsNTest {

    @ParameterizedTest
    @CsvFileSource(resources = { "/test-capitalize.csv" })
    void testCapitalizeUsingCsvFile(String input, String result) {
        assertEquals(result, ArgumentsN.capitalize(input));
    }
}
```





<center style="color:red; font-size:25px">单元测试一节已然完结，敬请期待后续内容！</center>





