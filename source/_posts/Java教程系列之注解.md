---
title: Java教程系列之注解
author: Mr.Niu
toc: true
abbrlink: 35258
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/ACG.GY_39.jpg'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/ACG.GY_39.jpg'
categories:
  - Java教程
tags:
  - 注解
date: 2020-04-02 17:50:48
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "468800755" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}





## 一、什么是注解



> 注解是放在Java源码的类、方法、字段、参数前的一种特殊“注释”
>
> 注释会被编译器直接忽略，注解则可以被编译器打包进入class文件，因此，注解是一种用作标注的“元数据”。



### 注解的作用



> 从JVM的角度看，注解本身对代码逻辑没有任何影响，如何使用注解完全由工具决定：



Java的注解可以分为三类：

- 由编译器使用的注解
- 由工具处理`.class`文件使用的注解
- 在程序运行期能够读取的注解



> 第一类注解不会被编译进入`.class`文件，它们在编译后就被编译器扔掉了。
>
> 第二类注解会被编译进入`.class`文件，但加载结束后并不会存在于内存中。这类注解只被一些底层库使用，一般我们不必自己处理。
>
> 第三类加载后一直存在于JVM中，这也是最常用的注解



注解的参数：



- 所有基本类型；
- String；
- 枚举类型；
- 基本类型、String以及枚举的数组。





>因为配置参数必须是常量，所以，上述限制保证了注解在定义时就已经确定了每个参数的值。
>
>注解的配置参数可以有默认值，缺少某个配置参数时将使用默认值。
>
>此外，大部分注解会有一个名为`value`的配置参数，对此参数赋值，可以只写常量，相当于省略了value参数。
>
>如果只写注解，相当于全部使用默认值。



## 二、定义注解



### 1、如何定义注解（Annotation）



- 用`@interface`定义注解
- 添加参数、默认值
- 用元注解配置注解



> 必须设置`@Target`和`@Retention`，`@Retention`一般设置为`RUNTIME`，因为我们自定义的注解通常要求在运行期读取。一般情况下，不必写`@Inherited`和`@Repeatable`。
>
> 注解的参数类似无参数方法，可以用`default`设定一个默认值（强烈推荐）。最常用的参数应当命名为`value`。



```java
// 第三步：
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
// 第一步：
public @interface Report {
    // 第二步：
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```





### 2、元注解



> 有一些注解可以修饰其他注解，这些注解就称为元注解（meta annotation）。Java标准库已经定义了一些元注解，我们只需要使用元注解，通常不需要自己去编写元注解。



#### target



> 使用`@Target`可以定义`Annotation`能够被应用于源码的哪些位置：
>
> 实际上`@Target`定义的`value`是`ElementType[]`数组，只有一个元素时，可以省略数组的写法。



- 类或接口：`ElementType.TYPE`；
- 字段：`ElementType.FIELD`；
- 方法：`ElementType.METHOD`；
- 构造方法：`ElementType.CONSTRUCTOR`；
- 方法参数：`ElementType.PARAMETER`。



```java
// 一个参数：
@Target(ElementType.METHOD)
// 多个参数：
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```



#### Retention



> 定义了`Annotation`的生命周期：
>
> 如果`@Retention`不存在，则该`Annotation`默认为`CLASS`。因为通常我们自定义的`Annotation`都是`RUNTIME`，所以，务必要加上`@Retention(RetentionPolicy.RUNTIME)`这个元注解



- 仅编译期：`RetentionPolicy.SOURCE`；
- 仅class文件：`RetentionPolicy.CLASS`；
- 运行期：`RetentionPolicy.RUNTIME`。



```java
@Retention(RetentionPolicy.RUNTIME)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```



#### Repeatable



> 可以定义`Annotation`是否可重复。这个注解应用不是特别广泛。



```java
// 参数为重复类的Class
@Repeatable(Hellos.class)
//@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@interface Hello {
    int type() default 0;

    String level() default "info";

    String value() default "";
}

@Target(ElementType.TYPE)
@interface Hellos{
    Hello[] value();
}

// 重复注解：
@Hello(type = 1, level = "debug", value = "test")
@Hello(type = 2, level = "warning", value = "warn")
@Hello(type = 3, value = "niu")
class Test{

}
```



#### Inherited





> 使用`@Inherited`定义子类是否可继承父类定义的`Annotation`。
>
> `@Inherited`仅针对`@Target(ElementType.TYPE)`类型的`annotation`有效，并且仅针对`class`的继承，对`interface`的继承无效





```java
@Inherited
@Target(ElementType.TYPE)
@interface Hello {
    int type() default 0;

    String level() default "info";

    String value() default "";
}

@Hello(type = 1, level = "debug", value = "test")
class Test{

}

class TestSon extends Test{

}
```





## 三、处理注解





根据`@Retention`的配置

>如何使用注解完全由工具决定。`SOURCE`类型的注解主要由编译器使用，因此我们一般只使用，不编写。`CLASS`类型的注解主要由底层工具库使用，涉及到class的加载，一般我们很少用到。
>
>只有`RUNTIME`类型的注解不但要使用，还经常需要编写。

因此，我们只讨论如何读取`RUNTIME`类型的注解。

注解定义后也是一种`class`，所有的注解都继承自`java.lang.annotation.Annotation`，因此，读取注解，需要使用反射API。





### 1、使用反射读取注解



Java提供的使用反射API读取`Annotation`的方法包括：

判断某个注解是否存在于`Class`、`Field`、`Method`或`Constructor`：

- `Class.isAnnotationPresent(Class)`
- `Field.isAnnotationPresent(Class)`
- `Method.isAnnotationPresent(Class)`
- `Constructor.isAnnotationPresent(Class)`



使用反射API读取Annotation：

- `Class.getAnnotation(Class)`
- `Field.getAnnotation(Class)`
- `Method.getAnnotation(Class)`
- `Constructor.getAnnotation(Class)`



#### 先判断`Annotation`是否存在再读取



注解及类的定义：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Hello {
    int type() default 0;

    String level() default "info";

    String value() default "";
}

@Target(ElementType.TYPE)
@interface Hellos{
    Hello[] value();
}

@Hello(type = 1, level = "debug", value = "test")
class Test{

}
```



```java
Class cls = Test.class;
if(cls.isAnnotationPresent(Hello.class)){
    Hello hello = (Hello) cls.getAnnotation(Hello.class);
    System.out.println(hello.level()); // debug
    System.out.println(hello.type()); // 1
    System.out.println(hello.value()); // test
}
```



#### 直接读取`Annotation`，不存在返回null



```java
Class cls1 = Test.class;
Hello hello = (Hello) cls1.getAnnotation(Hello.class);
if(hello != null){
    System.out.println(hello.level()); // debug
    System.out.println(hello.type()); // 1
    System.out.println(hello.value()); // test
}
```



#### 读取方法参数的注解



> 有点没看懂。。先搁这里！[点击这里查看！](https://www.liaoxuefeng.com/wiki/1252599548343744/1265102026065728#0)



### 2、注解的使用





> 注解好处：再需要检查的字段或方法前加上再写一个Check方法即可实现所有检查！
>
> 提高了效率：



```java
package com.hello;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;

public class Annotation1 {
    public static void main(String[] args){
        Person p1 = new Person("niuge", "xinzhou");
        Person p2 = new Person("niuge", "shanxixinzhou");
        for(Person p : new Person[]{p1, p2}){
            try{
                Check(p);
                System.out.println("String 参数无误！");
            }catch (IllegalAccessException e){
                System.out.println("String 参数有误！" + e.toString());
            }
        }
    }

    static void Check(Person p) throws IllegalAccessException {
        // 获取Person实例p的每个字段field
        for(Field field : p.getClass().getFields()){
            // 获取每个字段的注解
            Range range = field.getAnnotation(Range.class);
            // 注解存在时
            if(range != null){
                // 获取当前字段的值
                Object value = field.get(p);
                // 是String类型时：
                if(value instanceof String){
                    String s = (String) value;
                    // 判断是否符合范围Range
                    if(s.length() < range.min() || s.length() > range.max()){
                        throw new IllegalAccessException("String 有误！(Check函数抛出)");
                    }
                }
            }
        }
    }
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface Range{
    int min() default 0;
    int max() default 0x3f;
}

class Person{
    @Range(min = 1, max = 20)
    public String name;
    @Range(max = 10)
    public String city;

    public Person(String name, String city){
        this.name = name;
        this.city = city;
    }
}
```

输出结果：

```
String 参数无误！
String 参数有误！java.lang.IllegalAccessException: String 有误！(Check函数抛出)
```





<center style="font-size:25px; color:red">注解已经完结，敬请期待后续内容！</center>

