---
title: Spring全家桶之Spring5新功能-整合Log4j2日志、Nullable注解、整合JUnit5
author: ITNXD
toc: true
abbrlink: 34962
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
categories:
  - 开发框架
tags:
  - Spring5
  - Log4j2
  - Junit5
  - Nullable
date: 2021-03-26 15:25:48
updated:
---







> 整个 Spring5 框架的代码基于 Java8，运行时兼容 JDK9，许多不建议使用的类和方法在代码库中删除！
>
> Spring5中文版新功能可以在这里看到：[https://cntofu.com/book/95/33-what-new-in-the-spring-framework.md](https://cntofu.com/book/95/33-what-new-in-the-spring-framework.md)



# 一、Spring整合Log4j2日志框架







> Spring 5.0 框架自带了通用的日志封装 ，Spring5 已经移除 Log4jConfigListener，官方建议使用 Log4j2





## 1、导包



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/26/ab9426790713b876f043052b2376fcfd.png)





## 2、创建 log4j2.xml 配置文件





> 配置文件要放到src下，且名字只能为` log4j2.xml`





```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL -->
<!--Configuration后面的status用于设置log4j2自身内部的信息输出，可以不设置，当设置成trace时，可以看到log4j2内部各种详细输出-->
<configuration status="INFO">
    <!--先定义所有的appender-->
    <appenders>
        <!--输出日志信息到控制台-->
        <console name="Console" target="SYSTEM_OUT">
            <!--控制日志输出的格式-->
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </console>
    </appenders>
    <!--然后定义logger，只有定义了logger并引入的appender，appender才会生效-->
    <!--root：用于指定项目的根日志，如果没有单独指定Logger，则会使用root作为默认的日志输出-->
    <loggers>
        <root level="info">
            <appender-ref ref="Console"/>
        </root>
    </loggers>
</configuration>
```







```java
// 手动创建日志输出！
public static void main(String[] args) {
    logger.info("hello log4j2!!!");
    logger.warn("hello lo4j2!!!");
}
```









# 二、Spring5新注解Nullable









> Spring5 框架核心容器支持@Nullable 注解。
>
> @Nullable 注解可以使用在方法上面，属性上面，参数上面，表示方法返回可以为空，属性值可以为空，参数值可以为空

















# 三、Spring整合Junit单元测试





**导包：`spring-test-5.3.5.jar`**





## 1、Spring整合Junit4



```java
@RunWith(SpringJUnit4ClassRunner.class) // 指定单元测试框架
@ContextConfiguration("classpath:bean1.xml") // 指定加载的配置文件
public class Junit4Test {


//    以前写法：

//    @Test
//    public void test1() {
//        ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
//        UserService userService = context.getBean("userService", UserService.class);
//        userService.accountMoney();
//    }

    // 现在写法：
    @Autowired
    private UserService userService;

    @Test
    public void test1(){
        userService.accountMoney();
    }
}
```







## 2、Spring整合Junit5





Junit5的注解有一个复合注解`@SpringJUnitConfig`，可以一次性完成两个注解！



```java
//@ExtendWith(SpringExtension.class) // 指定单元测试框架
//@ContextConfiguration("classpath:bean1.xml") // 指定加载的配置文件

// Spring5对于junit5的复合注解
@SpringJUnitConfig(locations = "classpath:bean1.xml")
public class Junit5Test {

    @Autowired
    private UserService userService;

    @Test
    public void test1(){
        userService.accountMoney();
    }
}
```