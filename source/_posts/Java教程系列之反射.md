---
title: Java教程系列之反射
author: Mr.Niu
toc: true
abbrlink: 39487
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/f0fae310f1ddfd67bb50ee27cd565a6c.png'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/f0fae310f1ddfd67bb50ee27cd565a6c.png'
categories:
  - Java教程
tags:
  - 反射
date: 2020-04-01 18:05:20
updated:
---



{% meting "1407358755" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



## 一、什么是反射



反射：Reflection



反射是为了解决在运行期，对某个实例一无所知的情况下，如何调用其方法。

通过`Class`实例获取`class`信息的方法称为反射（Reflection）。



## 二、Class类



> `class`是由JVM在执行过程中动态加载的。JVM在第一次读取到一种`class`类型时，将其加载进内存。
>
> 每加载一种`class`，JVM就为其创建一个`Class`类型的实例，并关联起来！
>
> 这里的`Class`类型是一个名叫`Class`的`class`。。。。





1、以`String`类为例，当JVM加载`String`类时，它首先读取`String.class`文件到内存，然后，为`String`类创建一个`Class`实例并关联起来

2、`Class`实例是JVM内部创建的，如果我们查看JDK源码，可以发现`Class`类的构造方法是`private`，只有JVM能创建`Class`实例，我们自己的Java程序是无法创建`Class`实例的。

3、此处为JVM自动创建，是一个私有类！

```java
Class cls = new Class(String);
```



**一个`Class`实例包含了该`class`的所有完整信息！**

> 由于JVM为每个加载的`class`创建了对应的`Class`实例，并在实例中保存了该`class`的所有信息，包括类名、包名、父类、实现的接口、所有方法、字段等，因此，如果获取了某个`Class`实例，我们就可以通过这个`Class`实例获取到该实例对应的`class`的所有信息。
>
> 这种通过`Class`实例获取`class`信息的方法称为反射（Reflection）。





### 1、创建CLass



- 直接通过一个`class`的静态变量`class`获取：
- 通过该实例变量提供的`getClass()`方法获取：
- 通过静态方法`Class.forName()`获取，参数为完整类名：



> 因为`Class`实例在JVM中是唯一的，所以，上述方法获取的`Class`实例是同一个实例。可以用`==`比较两个`Class`实例：

```java
String s = "";
Class cls = String.class;
Class cls1 = s.getClass();
Class cls2 = Class.forName("java.lang.String");
System.out.println(cls == cls1);
```





### 2、`==` 和 `instanceof()`



> instanceof可以判断子类及继承关系！
>
> `==`可以用来精确判断类的类型！
>
> 通常情况下，我们应该用`instanceof`判断数据类型，因为面向抽象编程的时候，我们不关心具体的子类型。只有在需要精确判断一个类型是不是某个`class`的时候，我们才使用`==`判断`class`实例。

```java
Integer n = new Integer(123);

boolean b1 = n instanceof Integer; // true，因为n是Integer类型
boolean b2 = n instanceof Number; // true，因为n是Number类型的子类

boolean b3 = n.getClass() == Integer.class; // true，因为n.getClass()返回Integer.class
boolean b4 = n.getClass() == Number.class; // false，因为Integer.class!=Number.class
```



 

### 3、通过Class来获取相关信息





```java
package com.test;

public class reflection {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        printClassInfo("".getClass());
        printClassInfo(Runnable.class);
        printClassInfo(java.time.Month.class);
        printClassInfo(String[].class);
        printClassInfo(int.class);

        System.out.println("end");
    }

    static void printClassInfo(Class cls) {
        System.out.println("Class name: " + cls.getName());
        System.out.println("Simple name: " + cls.getSimpleName());
        if (cls.getPackage() != null) {
            System.out.println("Package name: " + cls.getPackage().getName());
        }
        System.out.println("is interface: " + cls.isInterface());
        System.out.println("is enum: " + cls.isEnum());
        System.out.println("is array: " + cls.isArray());
        System.out.println("is primitive: " + cls.isPrimitive());
    }
}

```



输出结果：



> 数组（例如`String[]`）也是一种`Class`，而且不同于`String.class`，它的类名是`[Ljava.lang.String`

```java
Class name: java.lang.String
Simple name: String
Package name: java.lang
is interface: false
is enum: false
is array: false
is primitive: false
Class name: java.lang.Runnable
Simple name: Runnable
Package name: java.lang
is interface: true
is enum: false
is array: false
is primitive: false
Class name: java.time.Month
Simple name: Month
Package name: java.time
is interface: false
is enum: true
is array: false
is primitive: false
// 特殊：String 类型的数组
Class name: [Ljava.lang.String;
Simple name: String[]
is interface: false
is enum: false
is array: true
is primitive: false
Class name: int
Simple name: int
is interface: false
is enum: false
is array: false
is primitive: true
end
```



### 4、动态加载



> JVM在执行Java程序的时候，并不是一次性把所有用到的class全部加载到内存，而是第一次需要用到class时才加载：
>
> 当执行`Main.java`时，由于用到了`Main`，因此，JVM首先会把`Main.class`加载到内存。然而，并不会加载`Person.class`，除非程序执行到`create()`方法，JVM发现需要加载`Person`类时，才会首次加载`Person.class`。如果没有执行`create()`方法，那么`Person.class`根本就不会被加载。





```java
package com.test;

public class reflectionTest {
    public static void main(String[] args) {
        if(args.length > 0){
            create(args[0]);
        }
    }

    static void create(String name){
        Person1 p = new Person1(name);
    }
}

class Person1{
    public String name;
    public Person1(String name){
        this.name = name;
    }
}
```



### 5、Log的动态加载



> 动态加载`class`的特性对于Java程序非常重要。利用JVM动态加载`class`的特性，我们才能在运行期根据条件加载不同的实现类。例如，Commons Logging总是优先使用Log4j，只有当Log4j不存在时，才使用JDK的logging。利用JVM动态加载特性，大致的实现代码如下：
>
> 所以我们只需要把Log4j的jar包放到classpath中，Commons Logging就会自动使用Log4j的原因。



```java
// Commons Logging优先使用Log4j:
LogFactory factory = null;
if (isClassPresent("org.apache.logging.log4j.Logger")) {
    factory = createLog4j();
} else {
    factory = createJdkLog();
}

boolean isClassPresent(String name) {
    try {
        Class.forName(name);
        return true;
    } catch (Exception e) {
        return false;
    }
}
```





## 三、访问字段





### 1、访问字段



- Field getField(name)：根据字段名获取某个public的field（包括父类）
- Field getDeclaredField(name)：根据字段名获取当前类的某个field（不包括父类）
- Field[] getFields()：获取所有public的field（包括父类）
- Field[] getDeclaredFields()：获取当前类的所有field（不包括父类）





```java
public class Main {
    public static void main(String[] args) throws Exception {
        Class stdClass = Student.class;
        // 获取public字段"score":
        System.out.println(stdClass.getField("score"));
        // 获取继承的public字段"name":
        System.out.println(stdClass.getField("name"));
        // 获取private字段"grade":
        System.out.println(stdClass.getDeclaredField("grade"));
    }
}

class Student extends Person {
    public int score;
    private int grade;
}

class Person {
    public String name;
}
```



```
public int Student.score
public java.lang.String Person.name
private int Student.grade
```



### 2、field对象方法



一个`Field`对象包含了一个字段的所有信息：

- `getName()`：返回字段名称，例如，`"name"`；
- `getType()`：返回字段类型，也是一个`Class`实例，例如，`String.class`；
- `getModifiers()`：返回字段的修饰符，它是一个`int`，不同的bit表示不同的含义。

String类的value字段如下定义：

```java
public final class String {
    private final byte[] value;
}
```

获取所有信息：

```java
package com.test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

public class field {
    public static void main(String[] args) throws Exception {
        Field f = String.class.getDeclaredField("value");
        System.out.println(f.getName()); // "value"
        System.out.println(f.getType()); // class [B 表示byte[]类型
        int m = f.getModifiers();
        System.out.println(m); // 18
        System.out.println(Modifier.isFinal(m)); // true
        System.out.println(Modifier.isPublic(m)); // false
        System.out.println(Modifier.isProtected(m)); // false
        System.out.println(Modifier.isPrivate(m)); // true
        System.out.println(Modifier.isStatic(m)); // false
    }
}
```





### 3、获取字段值



> 先获取`Class`实例：
>
> 再获取`Field`实例：
>
> 然后，用`Field.get(Object)`获取指定实例的指定字段的值。



```java
package com.test;

import java.lang.reflect.Field;

public class getField {
    public static void main(String[] args) throws Exception {
        Object p = new Person3("Xiao Ming");
        Class c = p.getClass();
        Field f = c.getDeclaredField("name");
        Object value = f.get(p);
        System.out.println(value); // "Xiao Ming"
    }
}

class Person3{
    // public字段
    public String name;
    public Person3(String name){
        this.name = name;
    }
}
```



- private字段main类是无法访问的：

> 直接访问会得到一个`IllegalAccessException`！



解决方法：

在调用`Object value = f.get(p);`前，先写一句：

```java
f.setAccessible(true);
```

> 调用`Field.setAccessible(true)`的意思是，别管这个字段是不是`public`，一律允许访问。
>
> 如果使用反射可以获取`private`字段的值，那么类的封装还有什么意义？
>
> 答案是正常情况下，我们总是通过`p.name`来访问`Person`的`name`字段，编译器会根据`public`、`protected`和`private`决定是否允许访问字段，这样就达到了数据封装的目的。
>
> 而反射是一种非常规的用法，使用反射，首先代码非常繁琐，其次，它更多地是给工具或者底层框架来使用，目的是在不知道目标实例任何信息的情况下，获取特定字段的值。
>
> 此外，`setAccessible(true)`可能会失败。如果JVM运行期存在`SecurityManager`，那么它会根据规则进行检查，有可能阻止`setAccessible(true)`。例如，某个`SecurityManager`可能不允许对`java`和`javax`开头的`package`的类调用`setAccessible(true)`，这样可以保证JVM核心库的安全。

修改如下：

```java
package com.test;

import java.lang.reflect.Field;

public class getField {
    public static void main(String[] args) throws Exception {
        Object p = new Person3("Xiao Ming");
        Class c = p.getClass();
        Field f = c.getDeclaredField("name");
        f.setAccessible(true);
        Object value = f.get(p);
        System.out.println(value); // "Xiao Ming"
    }
}

class Person3{
    private String name;
    public Person3(String name){
        this.name = name;
    }
}
```



### 4、设置字段值



> 设置字段值是通过`Field.set(Object, Object)`实现的，其中第一个`Object`参数是指定的实例，第二个`Object`参数是待修改的值：
>
> 修改非`public`字段，需要首先调用`setAccessible(true)`。





```java
package com.test;

import java.lang.reflect.Field;

public class getField {
    public static void main(String[] args) throws Exception {
        Person3 p = new Person3("Xiao Ming");
        System.out.println(p.getName());
        Class c = p.getClass();
        Field f = c.getDeclaredField("name");
        f.setAccessible(true);
        //Object value = f.get(p);
        f.set(p, "Xiao Hong");
        System.out.println(p.getName()); // "Xiao Hong"
    }
}

class Person3{
    private String name;
    public Person3(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```







## 四、调用方法



### 1、调用方法

我们已经能通过`Class`实例获取所有`Field`对象，同样的，可以通过`Class`实例获取所有`Method`信息。`Class`类提供了以下几个方法来获取`Method`：

- `Method getMethod(name, Class...)`：获取某个`public`的`Method`（包括父类）
- `Method getDeclaredMethod(name, Class...)`：获取当前类的某个`Method`（不包括父类）
- `Method[] getMethods()`：获取所有`public`的`Method`（包括父类）
- `Method[] getDeclaredMethods()`：获取当前类的所有`Method`（不包括父类）



```java
package com.test;

public class method {
    public static void main(String[] args) throws Exception {
        Class stdClass = Students.class;
        // 获取public方法getScore，参数为String:
        System.out.println(stdClass.getMethod("getScore", String.class));
        // 获取继承的public方法getName，无参数:
        System.out.println(stdClass.getMethod("getName"));
        // 获取private方法getGrade，参数为int:
        System.out.println(stdClass.getDeclaredMethod("getGrade", int.class));
    }
}

class Students extends Person4 {
    public int getScore(String type) {
        return 99;
    }
    private int getGrade(int year) {
        return 1;
    }
}

class Person4 {
    public String getName() {
        return "Person";
    }
}
```

输出结果：

```
public int com.test.Students.getScore(java.lang.String)
public java.lang.String com.test.Person4.getName()
private int com.test.Students.getGrade(int)
```



### 2、method对象方法





一个`Method`对象包含一个方法的所有信息：

- `getName()`：返回方法名称，例如：`"getScore"`；
- `getReturnType()`：返回方法返回值类型，也是一个Class实例，例如：`String.class`；
- `getParameterTypes()`：返回方法的参数类型，是一个Class数组，例如：`{String.class, int.class}`；
- `getModifiers()`：返回方法的修饰符，它是一个`int`，不同的bit表示不同的含义。



### 3、调用方法

用反射来调用`substring`方法：

> 对`Method`实例调用`invoke`就相当于调用该方法，`invoke`的第一个参数是对象实例，即在哪个实例上调用该方法，后面的可变参数要与方法参数一致，否则将报错。

```java
package com.test;

import java.lang.reflect.Method;

public class getMethod {
    public static void main(String[] args) throws Exception{
        // String对象:
        String s = "Hello world";
        // 获取String substring(int)方法，参数为int:
        Method m = String.class.getMethod("substring", int.class);
        System.out.println(m);
        // 在s对象上调用该方法并获取结果:
        String r = (String) m.invoke(s, 6);
        // 打印调用结果:
        System.out.println(r);
    }
}
```

输出结果如下：

```
public java.lang.String java.lang.String.substring(int)
world
```

### 4、调用静态方法



> 如果获取到的Method表示一个静态方法，调用静态方法时，由于无需指定实例对象，所以`invoke`方法传入的第一个参数永远为`null`。

```java
package com.test;

import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        // 获取Integer.parseInt(String)方法，参数为String:
        Method m = Integer.class.getMethod("parseInt", String.class);
        // 调用该静态方法并获取结果:
        Integer n = (Integer) m.invoke(null, "12345");
        // 打印调用结果:
        System.out.println(n); // 12345
    }
}
```



### 5、调用非public方法



> 和Field类似，对于非public方法，我们虽然可以通过`Class.getDeclaredMethod()`获取该方法实例，但直接对其调用将得到一个`IllegalAccessException`。为了调用非public方法，我们通过`Method.setAccessible(true)`允许其调用：
>
> 此外，`setAccessible(true)`可能会失败。如果JVM运行期存在`SecurityManager`，那么它会根据规则进行检查，有可能阻止`setAccessible(true)`。例如，某个`SecurityManager`可能不允许对`java`和`javax`开头的`package`的类调用`setAccessible(true)`，这样可以保证JVM核心库的安全。



```java
package com.test;

import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        Person p = new Person();
        Method m = p.getClass().getDeclaredMethod("setName", String.class);
        // 关键点：
        m.setAccessible(true);
        m.invoke(p, "Bob");
        System.out.println(p.name);
    }
}

class Person {
    String name;
    private void setName(String name) {
        this.name = name;
    }
}

```





### 6、多态





> 我们来考察这样一种情况：一个`Person`类定义了`hello()`方法，并且它的子类`Student`也覆写了`hello()`方法，那么，从`Person.class`获取的`Method`，作用于`Student`实例时，调用的方法到底是哪个？





```java
package com.test;

import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        // 获取Person的hello方法:
        Method h = Person.class.getMethod("hello");
        // 对Student实例调用hello方法:
        h.invoke(new Student()); //Student:hello
    }
}

class Person {
    public void hello() {
        System.out.println("Person:hello");
    }
}

class Student extends Person {
    public void hello() {
        System.out.println("Student:hello");
    }
}

```



使用反射调用方法时，仍然遵循多态原则：即总是调用实际类型的覆写方法（如果存在）



```java
Method m = Person.class.getMethod("hello");
m.invoke(new Student());

// 相当于：
Person p = new Student();
p.hello();
```





### 7、链式编程



```java
// 普通方法：
Method m1 = Integer.class.getMethod("parseInt", String.class);
Integer n = (Integer) m1.invoke(null, "12345");
System.out.println(n);

// 链式编程：
Integer n = (Integer) Integer.class.getMethod("parseInt", String.class).invoke(null, "123456");
// 打印调用结果:
System.out.println(n);
```

## 五、调用构造方法



### 1、通过调用Class提供的newInstance()方法来创建构造方法实例



> 调用Class.newInstance()的局限是，它只能调用该类的public无参数构造方法。如果构造方法带有参数，或者不是public，就无法直接通过Class.newInstance()来调用。



```java
Person p = Person.class.newInstance();
```





### 2、通过调用Java的反射API提供了Constructor对象来创建构造方法实例



通过Class实例获取Constructor的方法如下：

- `getConstructor(Class...)`：获取某个`public`的`Constructor`；
- `getDeclaredConstructor(Class...)`：获取某个`Constructor`；
- `getConstructors()`：获取所有`public`的`Constructor`；
- `getDeclaredConstructors()`：获取所有`Constructor`。



>注意`Constructor`总是当前类定义的构造方法，和父类无关，因此不存在多态的问题。
>
>调用非`public`的`Constructor`时，必须首先通过`setAccessible(true)`设置允许访问。`setAccessible(true)`可能会失败。
>
>Constructor对象和Method非常类似，不同之处仅在于它是一个构造方法，并且，调用结果总是返回实例：







```java
import java.lang.reflect.Constructor;

public class Main {
    public static void main(String[] args) throws Exception {
        // 获取构造方法Integer(int):
        Constructor cons1 = Integer.class.getConstructor(int.class);
        // 调用构造方法:
        Integer n1 = (Integer) cons1.newInstance(123);
        System.out.println(n1); // 123

        // 获取构造方法Integer(String)
        Constructor cons2 = Integer.class.getConstructor(String.class);
        Integer n2 = (Integer) cons2.newInstance("456");
        System.out.println(n2); // 456
    }
}
```



## 六、获取继承关系





### 1、获取父类Class



- 使用`getSuperclass()`方法：

```java
public class Main {
    public static void main(String[] args) throws Exception {
        Class i = Integer.class;
        Class n = i.getSuperclass();
        System.out.println(n);
        Class o = n.getSuperclass();
        System.out.println(o);
        System.out.println(o.getSuperclass());
    }
}
```

输出结果：

> `Integer`的父类类型是`Number`，`Number`的父类是`Object`，`Object`的父类是`null`。
>
> 除`Object`外，其他任何非`interface`的`Class`都必定存在一个父类类型。

```
class java.lang.Number
class java.lang.Object
null
```



### 2、获取接口Interface



- 使用`getInterfaces()`方法：



> 如果一个类没有实现任何`interface`，那么`getInterfaces()`返回空数组。



```java
public class Main {
    public static void main(String[] args) throws Exception {
        Class s = Integer.class;
        Class[] is = s.getInterfaces();
        for (Class i : is) {
            System.out.println(i);
        }
    }
}

```

输出结果：

> 可知Integer有以下三个接口：

```
interface java.lang.Comparable
interface java.lang.constant.Constable
interface java.lang.constant.ConstantDesc
```



要特别注意：`getInterfaces()`只返回当前类直接实现的接口类型，并不包括其父类实现的接口类型：



```java
public class Main {
    public static void main(String[] args) throws Exception {
        Class s = Integer.class.getSuperclass();
        System.out.println(s);
        Class[] is = s.getInterfaces();
        for (Class i : is) {
            System.out.println(i);
        }
    }
}
```

输出结果如下：

> 可知Number的接口只有下面这一个：

```
class java.lang.Number
interface java.io.Serializable
```

- 接口使用`getSuperclass()`方法永远返回`null`：



### 3、Class的继承关系



- 判断普通实例使用`instanceof ()`方法：
- 判断Class实例使用`isAssignableFrom()`方法：



> 可以这样简单理解：括号内的是否继承自外面的！



```java
// Integer i = ?
Integer.class.isAssignableFrom(Integer.class); // true，因为Integer可以赋值给Integer
// Number n = ?
Number.class.isAssignableFrom(Integer.class); // true，因为Integer可以赋值给Number
// Object o = ?
Object.class.isAssignableFrom(Integer.class); // true，因为Integer可以赋值给Object
// Integer i = ?
Integer.class.isAssignableFrom(Number.class); // false，因为Number不能赋值给Integer
```



## 七、动态代理（Dynamic Proxy）



### 1、class 和 interface



`class`和`interface`的区别：

- 可以实例化`class`（非`abstract`）；
- 不能实例化`interface`。



### 2、静态代理实现



- 定义接口
- 编写实现类
- 创建实例转型为接口并调用

```java
package com.test;

public class DynamicProxy {
    public static void main(String[] args) {
        Hello hello = new HelloWorlds();
        hello.morning("Bob");
    }
}

class HelloWorlds implements Hello {
    public void morning(String name) {
        System.out.println("Good morning, " + name);
    }
}

interface Hello {
    void morning(String name);
}
```



### 3、动态代理实现



在运行期动态创建一个`interface`实例的方法如下：

1. 定义一个`InvocationHandler`实例，它负责实现接口的方法调用；

2. 通过`Proxy.newProxyInstance()`

   创建`interface`实例，它需要3个参数：

   1. 使用的`ClassLoader`，通常就是接口类的`ClassLoader`；
   2. 需要实现的接口数组，至少需要传入一个接口进去；
   3. 用来处理接口方法调用的`InvocationHandler`实例。

3. 将返回的`Object`强制转型为接口。

> ClassLoader，它是类加载器，用来将.class字节码加载转换成class类对象的！
>
> `InvocationHandler`相当于：第一个参数传入了创建的实例`hello`，第二个参数传入了`Hello`的抽象方法`morning`，第三个参数传入了抽象方法`morning`的参数`BOb`。



```java
package com.test;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class DynamicProxy {
    public static void main(String[] args) {
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println(method);
                if (method.getName().equals("morning")) {
                    System.out.println("Good morning, " + args[0]);
                }
                return null;
            }
        };
        Hello1 hello = (Hello1) Proxy.newProxyInstance(
                Hello1.class.getClassLoader(), // 传入ClassLoader
                new Class[] { Hello1.class }, // 传入要实现的接口
                handler); // 传入处理调用方法的InvocationHandler
        hello.morning("Bob");
    }
}

interface Hello1 {
    void morning(String name);
}
```

输出结果：

```
public abstract void com.test.Hello1.morning(java.lang.String)
Good morning, Bob
```



### 4、动态代理实际实现方法



> 动态代理实际上是JDK在运行期动态创建class字节码并加载的过程，它并没有什么黑魔法，把上面的动态代理改写为静态实现类大概长这样：
>
> 其实就是JDK帮我们自动编写了一个上述类（不需要源码，可以直接生成字节码），并不存在可以直接实例化接口的黑魔法。
>
> 目前我还不太会调用。。。





```java
public class HelloDynamicProxy implements Hello {
    InvocationHandler handler;
    public HelloDynamicProxy(InvocationHandler handler) {
        this.handler = handler;
    }
    public void morning(String name) {
        handler.invoke(
           this,
           Hello.class.getMethod("morning"),
           new Object[] { name });
    }
}
```

