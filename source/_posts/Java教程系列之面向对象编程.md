---
title: Java教程系列之面向对象编程
author: Mr.Niu
toc: true
abbrlink: 40947
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/792a0206bd0f5540313e680d1b426692.png'
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/792a0206bd0f5540313e680d1b426692.png'
categories:
  - Java教程
tags:
  - 面向对象
date: 2020-03-25 18:11:00
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "514761281" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



## 一、class 和 instance



> 就是常说的类和实例！



### 1、定义class



> 一个`class`可以包含多个字段（`field`），字段用来描述一个类的特征。
>
> 上面的`Person`类，我们定义了两个字段，一个是`String`类型的字段，命名为`name`，一个是`int`类型的字段，命名为`age`。因此，通过`class`，把一组数据汇集到一个对象上，实现了数据封装。
>
> `public`是用来修饰字段的，它表示这个字段可以被外部访问。



```java
package com.test;

public class codeTest {
    public static void main(String[] args) {
        
    }
}

class Person {
    public String name;
    public int age;
}
```



### 2、创建instance



> 定义了class，只是定义了对象模版，而要根据对象模版创建出真正的对象实例，必须用new操作符。
>
> new操作符可以创建一个实例，然后，我们需要定义一个引用类型的变量来指向这个实例：
>
> 访问实例变量可以用`变量.字段` !



小贴士：new出来的东西都在堆区，其他在栈区！



```java
package com.test;

public class codeTest {
    public static void main(String[] args) {
        Person ming = new Person();
        ming.name = "Xiao Ming"; // 对字段name赋值
        ming.age = 12; // 对字段age赋值
        System.out.println(ming.name); // 访问字段name

        Person hong = new Person();
        hong.name = "Xiao Hong";
        hong.age = 15;
    }
}

```



上面创建的两个实例分别指向两块内存，存放在堆中！



## 二、普通方法

> 通过在类的内部定义方法可以实现数据的封装，由于private的特性可以保证外部无法访问到私有成员field！
>
> 一般使用set和get函数来进行赋值和获取，而字段field是private的，可以保证不被外部所修改！保证数据的安全性！



```java
public class Main {
    public static void main(String[] args) {
        Person ming = new Person();
        ming.setName("Xiao Ming"); // 设置name
        ming.setAge(12); // 设置age
        System.out.println(ming.getName() + ", " + ming.getAge());
    }
}

class Person {
    private String name;
    private int age;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        if (age < 0 || age > 100) {
            throw new IllegalArgumentException("invalid age value");
        }
        this.age = age;
    }
}
```



### 1、定义方法



> 方法返回值通过`return`语句实现，如果没有返回值，返回类型设置为`void`，可以省略`return`。

```
修饰符 方法返回类型 方法名(方法参数列表) {
    若干方法语句;
    return 方法返回值;
}
```



### 2、private方法



> 和`private`字段一样，`private`方法不允许外部调用，那我们定义`private`方法有什么用？
>
> 定义`private`方法的理由是内部方法是可以调用`private`方法的。例如：



```java
public class Main {
    public static void main(String[] args) {
        Person ming = new Person();
        ming.setBirth(2008);
        System.out.println(ming.getAge());
    }
}

class Person {
    private String name;
    private int birth;

    public void setBirth(int birth) {
        this.birth = birth;
    }

    public int getAge() {
        return calcAge(2019); // 调用private方法
    }

    // private方法:
    private int calcAge(int currentYear) {
        return currentYear - this.birth;
    }
}
```



> 观察上述代码，`calcAge()`是一个`private`方法，外部代码无法调用，但是，内部方法`getAge()`可以调用它。
>
> 此外，我们还注意到，这个`Person`类只定义了`birth`字段，没有定义`age`字段，获取`age`时，通过方法`getAge()`返回的是一个实时计算的值，并非存储在某个字段的值。这说明方法可以封装一个类的对外接口，调用方不需要知道也不关心`Person`实例在内部到底有没有`age`字段。



### 3、this变量

> 在方法内部，可以使用一个隐含的变量`this`，它始终指向当前实例。因此，通过`this.field`就可以访问当前实例的字段。

#### 3.1 没有命名冲突，直接return

```java
class Person {
    private String name;

    public String getName() {
        return name; // 相当于this.name
    }
}
```

#### 3.2 有冲突，使用this.field

```java
class Person {
    private String name;

    public void setName(String name) {
        this.name = name; // 前面的this不可少，少了就变成局部变量name了
    }
}
```

### 4、方法参数



> 方法可以包含0个或任意个参数。方法参数用于接收传递给方法的变量值。调用方法时，必须严格按照参数的定义一一传递，对应位置对应相等！

#### 4.1 不可变参数

```java
class Person {
    ...
    public void setNameAndAge(String name, int age) {
        ...
    }
}
```

#### 4.2 可变参数

> 可变参数用`类型...`定义，可变参数相当于数组类型：



```java
class Group {
    private String[] names;

    public void setNames(String... names) {
        this.names = names;
    }
}
```

> 也可以直接接收数组

```java
class Group {
    private String[] names;

    public void setNames(String[] names) {
        this.names = names;
    }
}
```



二者的区别：

> 第一种可以直接方便的传参，而第二种只能使用new来传参，相比之下，第一种更加方便！

```java
public class Main {
    public static void main(String[] args) {
        // 第一种：
        Group g = new Group();
        g.setNames("Xiao Ming", "Xiao Hong", "Xiao Jun"); // 传入3个String
        g.setNames("Xiao Ming"); // 传入1个String
        g.setNames(); // 传入0个String
        
        // 第二种：
        Group g = new Group();
        g.setNames(new String[] {"Xiao Ming", "Xiao Hong", "Xiao Jun"}); // 传入1个String[]
    }
}


```

> 可变参数可以保证无法传入`null`，因为传入0个参数时，接收到的实际值是一个空数组而不是`null`。



### 5、参数绑定

> 基本类型参数的传递：是调用外部方法值的复制。双方各自的后续修改，互不影响。
>
> 引用类型参数的绑定：调用方的变量，和接收方的参数变量，指向的是同一个对象。双方任意一方对这个对象的修改，都会影响对方（因为指向同一个对象嘛）。
>
> 下面就是引用型参数例子，main中的修改会影响到类的field，因为指向的是同一块内存地址！



```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        String[] fullname = new String[] { "Homer", "Simpson" };
        p.setName(fullname); // 传入fullname数组
        System.out.println(p.getName()); // "Homer Simpson"
        fullname[0] = "Bart"; // fullname数组的第一个元素修改为"Bart"
        System.out.println(p.getName()); // "Homer Simpson"还是"Bart Simpson"?
    }
}

class Person {
    private String[] name;

    public String getName() {
        return this.name[0] + " " + this.name[1];
    }

    public void setName(String[] name) {
        this.name = name;
    }
}
```



## 三、构造方法





> 在创建对象实例时就把内部字段进行初始化的操作！



### 1、构造方法

> 没有在构造方法中初始化字段时，引用类型的字段默认是`null`，数值类型的字段用默认值，`int`类型默认值是`0`，布尔类型默认值是`false`：
>
> 默认任何`class`都有构造方法！
>
> 编译器自动生成：它没有参数，也没有执行语句，类似这样：



```java
class Person {
    public Person() {
    }
}
```

> 如果我们自定义了一个构造方法，那么，编译器就*不再*自动创建默认构造方法：
>
> 如下方：无法找到默认构造函数Person()！

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person(); // 编译错误:找不到这个构造方法
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return this.name;
    }

    public int getAge() {
        return this.age;
    }
}
```

当然可以将原来的默认方法与自定义的构造方法通过重载都写出来！



### 2、构造方法重载



> 默认的构造方法依然可以使用！
>
> 在通过`new`操作符调用的时候，编译器通过构造方法的参数数量、位置和类型自动区分

```java
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person(String name) {
        this.name = name;
        this.age = 12;
    }

    public Person() {
    }
}
```

### 3、构造方法自我调用



> 一个构造方法可以调用其他构造方法，这样做的目的是便于代码复用。调用其他构造方法的语法是`this(…)`：

```java
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person(String name) {
        this(name, 18); // 调用另一个构造方法Person(String, int)
    }

    public Person() {
        this("Unnamed"); // 调用另一个构造方法Person(String)
    }
}
```



## 四、继承





> 继承是面向对象编程中非常强大的一种机制，它首先可以复用代码。当我们让`Student`从`Person`继承时，`Student`就获得了`Person`的所有功能，我们只需要为`Student`编写新增的功能。





### 1、使用extends实现继承



> 在OOP的术语中，我们把`Person`称为超类（super class），父类（parent class），基类（base class），把`Student`称为子类（subclass），扩展类（extended class）。



```java
class Person {
    private String name;
    private int age;

    public String getName() {...}
    public void setName(String name) {...}
    public int getAge() {...}
    public void setAge(int age) {...}
}

class Student extends Person {
    // 不要重复name和age字段/方法,
    // 只需要定义新增score字段/方法:
    private int score;

    public int getScore() { … }
    public void setScore(int score) { … }
}
```



> 注意到我们在定义`Person`的时候，没有写`extends`。在Java中，没有明确写`extends`的类，编译器会自动加上`extends Object`。所以，任何类，除了`Object`，都会继承自某个类。
>
> Java只允许一个class继承自一个类，因此，一个类有且仅有一个父类。只有`Object`特殊，它没有父类。



### 2、使用protected



> 子类无法访问父类的private的字段field，可以使用protected来修饰字段，使得该字段可以在一个继承树中被访问！
>
> `protected`关键字可以把字段和方法的访问权限控制在继承树内部，一个`protected`字段和方法可以被其子类，以及子类的子类所访问



```java
class Person {
    protected String name;
    protected int age;
}

class Student extends Person {
    public String hello() {
        return "Hello, " + name; // OK!
    }
}
```





### 3、super



> `super`关键字表示父类（超类）。子类引用父类的字段时，可以用`s uper.fieldName`!
>
> 

```java
class Student extends Person {
    public String hello() {
        return "Hello, " + super.name;
    }
}
```

> 使用`super.name`，或者`this.name`，或者`name`，效果都是一样的。编译器会自动定位到父类的`name`字段。



> 在Java中，任何`class`的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句`super();`
>
> 如果父类没有默认的构造方法，子类就必须显式调用`super()`并给出参数以便让编译器定位到父类的一个合适的构造方法。
>
> 小贴士：子类*不会继承*任何父类的构造方法。子类默认的构造方法是编译器自动生成的，不是继承的。
>
> 若父类是默认构造方法，则子类使用时会自动调用，不需要写；若是自定义构造方法，需要调用super并加上参数！

```java
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Xiao Ming", 12, 89);
    }
}

class Person {
    protected String name;
    protected int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    protected int score;

    public Student(String name, int age, int score) {
        super(name, age); // 自动调用父类的构造方法
        this.score = score;
    }
}

```



### 4、向上转型



> 把一个子类类型安全地变为父类类型的赋值，被称为向上转型（upcasting）。
>
> `Student`继承自`Person`，因此，它拥有`Person`的全部功能。`Person`类型的变量，如果指向`Student`类型的实例，对它进行操作，是没有问题的！
>
> 继承树是`Student > Person > Object` ，所以可以把`Student`类型转型为`Person`，或者更高层次的`Object`。
>
> 老子可以拓展到儿子级别扩大功能！！！。。

```java
Student s = new Student();
Person p = new Person();

Person p = new Student(); // ???
```



### 5、向下转型



> 和向上转型相反，如果把一个父类类型强制转型为子类类型，就是向下转型（downcasting）



```java
Person p1 = new Student(); // upcasting, ok
Person p2 = new Person();
Student s1 = (Student) p1; // ok
Student s2 = (Student) p2; // runtime error! ClassCastException!
```

> `Person`类型`p1`实际指向`Student`实例，`Person`类型变量`p2`实际指向`Person`实例。在向下转型的时候，把`p1`转型为`Student`会成功，因为`p1`确实指向`Student`实例，把`p2`转型为`Student`会失败，因为`p2`的实际类型是`Person`，不能把父类变为子类，因为子类功能比父类多，多的功能无法凭空变出来。
>
> 向下转型错误时候，Java虚拟机会报`ClassCastException`。
>
> 总而言之：就是少的可以拓展为多的，多的无法删减为少的（从左到右说）！



#### 使用instanceof



> `instanceof`实际上判断一个变量所指向的实例是否是指定类型，或者这个类型的子类。如果一个引用变量为`null`，那么对任何`instanceof`的判断都为`false`。



如果实里原来就是子类，则将其向下转型时是可以正确转型的！

可以使用`instaceof` 来判断原来是不是子类，使得话则可以向下转型，这样就可以避免转型错误的发生！

```java
Person p = new Student();
if (p instanceof Student) {
    // 只有判断成功才会向下转型:
    Student s = (Student) p; // 一定会成功
}
```



从Java 14开始，判断`instanceof`后，可以直接转型为指定变量，避免再次强制转型。例如，对于以下代码：

> 直接使用`obj instanceof String s` 即可在判断可以向下转型的条件下直接进行转型到变量 s！
>
> 使用`instanceof variable`这种判断并转型为指定类型变量的语法时，必须打开编译器开关`--source 14`和`--enable-preview`。
>
> 这是java14的语法！

```java
Object obj = "hello";
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.toUpperCase());
}

Object obj = "hello";
if (obj instanceof String s) {
    // 可以直接使用变量s:
    System.out.println(s.toUpperCase());
}
```



## 五、多态



### 1、覆写（Override）



> 在继承关系中，子类如果定义了一个与父类方法签名完全相同的方法，被称为覆写（Override）。
>
> Override和Overload不同的是，如果方法签名不同，就是Overload，Overload方法是一个新方法；如果方法签名相同，并且返回值也相同，就是`Override`。
>
> 就和重载一样，全部一样才是才叫覆写！



```java
class Person {
    public void run() {
        System.out.println("Person.run");
    }
}

class Student extends Person {
    @Override
    public void run() {
        System.out.println("Student.run");
    }
}
```





### 2、关于`@Override`



> 加上`@Override`可以让编译器来判断你是不是进行覆写时参数或类型写错了，若不同则会直接编译错误！
>
> 倘若不加的话，是不会去检查的，编译器认为这是你新写的方法，编译通过！
>
> 如下方：加上，编译错误，不加，编译通过！



```java
public class Main {
    public static void main(String[] args) {
    }
}

class Person {
    public void run() {}
}

public class Student extends Person {
    //@Override // Compile error!
    public void run(String s) {}
}

```



### 3、多态（Polymorphic）



> 多态是指，针对某个类型的方法调用，其真正执行的方法取决于运行时期实际类型的方法



```java
public void runTwice(Person p) {
    p.run();
    p.run();
}
```



> 它传入的参数类型是`Person`，我们是无法知道传入的参数实际类型究竟是`Person`，还是`Student`，还是`Person`的其他子类，因此，也无法确定调用的是不是`Person`类定义的`run()`方法。
>
> 所以，多态的特性就是，运行期才能动态决定调用的子类方法。对某个类型调用某个方法，执行的实际方法可能是某个子类的覆写方法。这种不确定性的方法调用，究竟有什么作用？



#### 举个例子:



> 三种收税情况，覆写三种getTax函数，利用多态自动调用需要的覆写方法！
>
> 观察`totalTax()`方法：利用多态，`totalTax()`方法只需要和`Income`打交道，它完全不需要知道`Salary`和`StateCouncilSpecialAllowance`的存在，就可以正确计算出总的税。如果我们要新增一种稿费收入，只需要从`Income`派生，然后正确覆写`getTax()`方法就可以。把新的类型传入`totalTax()`，不需要修改任何代码。
>
> 可见，多态具有一个非常强大的功能，就是允许添加更多类型的子类实现功能扩展，却不需要修改基于父类的代码。

```java
public class Main {
    public static void main(String[] args) {
        // 给一个有普通收入、工资收入和享受国务院特殊津贴的小伙伴算税:
        Income[] incomes = new Income[] {
            new Income(3000),
            new Salary(7500),
            new StateCouncilSpecialAllowance(15000)
        };
        System.out.println(totalTax(incomes));
    }

    public static double totalTax(Income... incomes) {
        double total = 0;
        for (Income income: incomes) {
            total = total + income.getTax();
        }
        return total;
    }
}

class Income {
    protected double income;

    public Income(double income) {
        this.income = income;
    }

    public double getTax() {
        return income * 0.1; // 税率10%
    }
}

class Salary extends Income {
    public Salary(double income) {
        super(income);
    }

    @Override
    public double getTax() {
        if (income <= 5000) {
            return 0;
        }
        return (income - 5000) * 0.2;
    }
}

class StateCouncilSpecialAllowance extends Income {
    public StateCouncilSpecialAllowance(double income) {
        super(income);
    }

    @Override
    public double getTax() {
        return 0;
    }
}
```



#### 覆写object方法



> 因为所有的`class`最终都继承自`Object`，而`Object`定义了几个重要的方法：



- `toString()`：把instance输出为`String`；
- `equals()`：判断两个instance是否逻辑相等；
- `hashCode()`：计算一个instance的哈希值。



```java
class Person {
    ...
    // 显示更有意义的字符串:
    @Override
    public String toString() {
        return "Person:name=" + name;
    }

    // 比较是否相等:
    @Override
    public boolean equals(Object o) {
        // 当且仅当o为Person类型:
        if (o instanceof Person) {
            Person p = (Person) o;
            // 并且name字段相同时，返回true:
            return this.name.equals(p.name);
        }
        return false;
    }

    // 计算hash:
    @Override
    public int hashCode() {
        return this.name.hashCode();
    }
}
```



#### 调用super

> 在子类的覆写方法中，如果要调用父类的被覆写的方法，可以通过`super`来调用。



```java
class Person {
    protected String name;
    public String hello() {
        return "Hello, " + name;
    }
}

Student extends Person {
    @Override
    public String hello() {
        // 调用父类的hello()方法:
        return super.hello() + "!";
    }
}
```

#### 使用final



- 继承可以允许子类覆写父类的方法。如果一个父类不允许子类对它的某个方法进行覆写，可以把该方法标记为`final`。用`final`修饰的方法不能被`Override`：

```java
class Person {
    protected String name;
    public final String hello() {
        return "Hello, " + name;
    }
}

Student extends Person {
    // compile error: 不允许覆写
    @Override
    public String hello() {
    }
}
```



- 如果一个类不希望任何其他类继承自它，那么可以把这个类本身标记为`final`。用`final`修饰的类不能被继承：



```java
final class Person {
    protected String name;
}

// compile error: 不允许继承自Person
Student extends Person {
}
```



- 对于一个类的实例字段，同样可以用`final`修饰。用`final`修饰的字段在初始化后不能被修改

> 可使用构造方法来进行给final字段赋值，赋值完毕，值将不可修改！



```java
class Person {
    public final String name = "Unamed";
}

Person p = new Person();
p.name = "New Name"; // compile error!

// 定义构造函数赋值final字段
class Person {
    public final String name;
    public Person(String name) {
        this.name = name;
    }
}
```



### 4、一句话总结多态：



> JAVA变量在调用类方法时，以实际指向的实例类型为准，而不是声明类型



## 六、抽象类



> 如果父类的方法本身不需要实现任何功能，仅仅是为了定义方法签名，目的是让子类去覆写它，那么，可以把父类的方法声明为抽象方法：
>
> 把一个方法声明为`abstract`，表示它是一个抽象方法，本身没有实现任何方法语句。因为这个抽象方法本身是无法执行的，所以，`Person`类也无法被实例化。编译器会告诉我们，无法编译`Person`类，因为它包含抽象方法。
>
> 必须把`Person`类本身也声明为`abstract`，才能正确编译它：
>
> 抽象方法不需要写大括号！



```java
abstract class Person {
    public abstract void run();
}
```



### 1、抽象类



> 如果一个`class`定义了方法，但没有具体执行代码，这个方法就是抽象方法，抽象方法用`abstract`修饰。
>
> 因为无法执行抽象方法，因此这个类也必须申明为抽象类（abstract class）。
>
> 使用`abstract`修饰的类就是抽象类。我们无法实例化一个抽象类：
>
> 无法实例化的抽象类有什么用？
>
> 因为抽象类本身被设计成只能用于被继承，因此，抽象类可以强迫子类实现其定义的抽象方法，否则编译会报错。因此，抽象方法实际上相当于定义了“规范”。
>
> 例如，`Person`类定义了抽象方法`run()`，那么，在实现子类`Student`的时候，就必须覆写`run()`方法：





```java
public class Main {
    public static void main(String[] args) {
        Person p = new Student();
        p.run();
    }
}

abstract class Person {
    public abstract void run();
}

class Student extends Person {
    @Override
    public void run() {
        System.out.println("Student.run");
    }
}
```





> 倘若不进行覆写run方法，则会直接编译错误！





### 2、面向抽象编程



> 当我们定义了抽象类`Person`，以及具体的`Student`、`Teacher`子类的时候，我们可以通过抽象类`Person`类型去引用具体的子类的实例：
>
> 这种引用抽象类的好处在于，我们对其进行方法调用，并不关心`Person`类型变量的具体子类型：
>
> 同样的代码，如果引用的是一个新的子类，我们仍然不关心具体类型：
>
> 这种尽量引用高层类型，避免引用实际子类型的方式，称之为面向抽象编程。



```java
Person s = new Student();
Person t = new Teacher();

// 不关心Person变量的具体子类型:
s.run();
t.run();

// 同样不关心新的子类是如何实现run()方法的：
Person e = new Employee();
e.run();
```



面向抽象编程的本质就是：

- 上层代码只定义规范（例如：`abstract class Person`）；
- 不需要子类就可以实现业务逻辑（正常编译）；
- 具体的业务逻辑由不同的子类实现，调用者并不关心。



## 七、接口



> 在抽象类中，抽象方法本质上是定义接口规范：即规定高层类的接口，从而保证所有子类都有相同的接口实现，这样，多态就能发挥出威力。
>
> 如果一个抽象类没有字段，所有方法全部都是抽象方法：

```java
abstract class Person {
    public abstract void run();
    public abstract String getName();
}
```

### 1、接口（interface）



就可以把该抽象类改写为接口：`interface`。

> 在Java中，使用`interface`可以声明一个接口：
>
> 所谓`interface`，就是比抽象类还要抽象的纯抽象接口，因为它连字段都不能有。因为接口定义的所有方法默认都是`public abstract`的，所以这两个修饰符不需要写出来（写不写效果都一样）。
>
> Java的接口特指`interface`的定义，表示一个接口类型和一组方法签名，而编程接口泛指接口规范，如方法签名，数据格式，网络协议等。



```java
interface Person {
    void run();
    String getName();
}
```



### 2、implements 



> 当一个具体的`class`去实现一个`interface`时，需要使用`implements`关键字。举个例子：

```java
class Student implements Person {
    private String name;

    public Student(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println(this.name + " run");
    }

    @Override
    public String getName() {
        return this.name;
    }
}
```



> 我们知道，在Java中，一个类只能继承自另一个类，不能从多个类继承。但是，一个类可以实现多个`interface`，例如：



```java
class Student implements Person, Hello { // 实现了两个interface
    ...
}
```





### 3、接口继承



> 一个`interface`可以继承自另一个`interface`。`interface`继承自`interface`使用`extends`，它相当于扩展了接口的方法。例如：
>
> 此时，`Person`接口继承自`Hello`接口，因此，`Person`接口现在实际上有3个抽象方法签名，其中一个来自继承的`Hello`接口。



```java
interface Hello {
    void hello();
}

interface Person extends Hello {
    void run();
    String getName();
}
```



### 4、抽象类与接口



> 合理设计`interface`和`abstract class`的继承关系，可以充分复用代码。一般来说，公共逻辑适合放在`abstract class`中，具体逻辑放到各个子类，而接口层次代表抽象程度。
>
> 在使用的时候，实例化的对象永远只能是某个具体的子类，但总是通过接口去引用它，因为接口比抽象类更抽象!



### 5、default方法



> 在接口中，可以定义`default`方法。例如，把`Person`接口的`run()`方法改为`default`方法：
>
> 实现类可以不必覆写`default`方法。`default`方法的目的是，当我们需要给接口新增一个方法时，会涉及到修改全部子类。如果新增的是`default`方法，那么子类就不必全部修改，只需要在需要覆写的地方去覆写新增方法。
>
> `default`方法和抽象类的普通方法是有所不同的。因为`interface`没有字段，`default`方法无法访问字段，而抽象类的普通方法可以访问实例字段。



```java
public class Main {
    public static void main(String[] args) {
        Person p = new Student("Xiao Ming");
        p.run();
    }
}

interface Person {
    String getName();
    default void run() {
        System.out.println(getName() + " run");
    }
}

class Student implements Person {
    private String name;

    public Student(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
```



### 6、一些接口的笔记



#### 为什么要有接口

因为java中为了避免多重继承可能带来的继承关系混乱所以只允许单一继承，java为了 满足多重继承的需要，采用了规格的多重继承即接口,如果使用，即使没有继承关系的不同种类的对象也可以做共通的处理（我们可以在接口中定义一个方法，然后在两个没有继承关系的对象的不同父类中写一个相同方法签名和返回类型的方法）



#### 接口和抽象类的区别

1. 接口的方法默认是 public，所有方法在接口中不能有实现(Java 8 开始接口方法可以有默认实现），而抽象类可以有非抽象的方法。
2. 接口中除了static、final变量，不能有其他变量，而抽象类中则不一定。
3. 一个类可以实现多个接口，但只能实现一个抽象类。接口自己本身可以通过extends关键字扩展多个接口。
4. 接口方法默认修饰符是public，抽象方法可以有public、protected和default这些修饰符（抽象方法就是为了被重写所以不能使用private关键字修饰！）。
5. 从设计层面来说，抽象是对类的抽象，是一种模板设计，而接口是对行为的抽象，是一种行为的规范。

备注：在JDK8中，接口也可以定义静态方法，可以直接用接口名调用。实现类和实例是不可以调用的。如果同时实现两个接口，接口中定义了一样的默认方法，则必须重写，不然会报错。



#### 类实现两个接口有同名方法时会发生的几种情况：

1. 两个接口方法签名相同返回类型相同时 不会编译出错，可以直接override
2. 两个接口方法签名相同返回类型不同，会编译出错。
3. 两个接口方法名相同,在实现类里这两个同名方法签名符合overload条件的话可以同时实现不会报错，只要符合overload那方法返回类型就不重要了，一样不会报错。



#### 类实现两个接口有同名default方法时会发生的几种情况

1. 如果两个方法的方法签名相同方法返回类型相同那么需要在实现类override这个同名方法。
2. 如果两个方法方法签名相同，返回类型不同会编译出错。
3. 如果两个方法符合overload条件可以正常实现。



#### 关于接口中的静态方法，静态变量

静态变量： 可直接通过实现类或者实现类的实例直接访问到接口的静态变量,但如果多继承时这样调用会编译出错。

静态方法 无法通过实现类和它的实例访问到接口的静态方法





## 八、静态字段和静态方法





### 1、静态字段



>在一个`class`中定义的字段，我们称之为实例字段。实例字段的特点是，每个实例都有独立的字段，各个实例的同名字段互不影响。
>
>还有一种字段，是用`static`修饰的字段，称为静态字段：`static field`。
>
>实例字段在每个实例中都有自己的一个独立“空间”，但是静态字段只有一个共享“空间”，所有实例都会共享该字段





```java
public class Main {
    public static void main(String[] args) {
        Person ming = new Person("Xiao Ming", 12);
        Person hong = new Person("Xiao Hong", 15);
        ming.number = 88;
        System.out.println(hong.number);
        hong.number = 99;
        System.out.println(ming.number);
    }
}

class Person {
    public String name;
    public int age;

    public static int number;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

```



如下图：

```ascii
        ┌──────────────────┐
ming ──>│Person instance   │
        ├──────────────────┤
        │name = "Xiao Ming"│
        │age = 12          │
        │number ───────────┼──┐    ┌─────────────┐
        └──────────────────┘  │    │Person class │
                              │    ├─────────────┤
                              ├───>│number = 99  │
        ┌──────────────────┐  │    └─────────────┘
hong ──>│Person instance   │  │
        ├──────────────────┤  │
        │name = "Xiao Hong"│  │
        │age = 15          │  │
        │number ───────────┼──┘
        └──────────────────┘
```



> 虽然实例可以访问静态字段，但是它们指向的其实都是`Person class`的静态字段。所以，所有实例共享一个静态字段。
>
> 因此，不推荐用`实例变量.静态字段`去访问静态字段，因为在Java程序中，实例对象并没有静态字段。在代码中，实例对象能访问静态字段只是因为编译器可以根据实例类型自动转换为`类名.静态字段`来访问静态对象。
>
> 推荐用类名来访问静态字段。可以把静态字段理解为描述`class`本身的字段（非实例字段）。对于上面的代码，更好的写法是：



```java
Person.number = 99;
System.out.println(Person.number);
```



### 2、静态方法



> 有静态字段，就有静态方法。用`static`修饰的方法称为静态方法。
>
> 调用实例方法必须通过一个实例变量，而调用静态方法则不需要实例变量，通过类名就可以调用。静态方法类似其它编程语言的函数!
>
> 因为静态方法属于`class`而不属于实例，因此，静态方法内部，无法访问`this`变量，也无法访问实例字段，它只能访问静态字段。
>
> 通过实例变量也可以调用静态方法，但这只是编译器自动帮我们把实例改写成类名而已。
>
> 通常情况下，通过实例变量访问静态字段和静态方法，会得到一个编译警告。



```java
public class Main {
    public static void main(String[] args) {
        Person.setNumber(99);
        System.out.println(Person.number);
    }
}

class Person {
    public static int number;

    public static void setNumber(int value) {
        number = value;
    }
}
```





### 3、接口静态字段



> 因为`interface`是一个纯抽象类，所以它不能定义实例字段。但是，`interface`是可以有静态字段的，并且静态字段必须为`final`类型。
>
> 实际上，因为`interface`的字段只能是`public static final`类型，所以我们可以把这些修饰符都去掉！
>
> 编译器会自动把该字段变为`public static final`类型。
>
> 记得一个java文件只能有一个public类哦！



```java
public interface Person {
    public static final int MALE = 1;
    public static final int FEMALE = 2;
}

// 改进写法！
public interface Person {
    // 编译器会自动加上public statc final:
    int MALE = 1;
    int FEMALE = 2;
}
```



## 九、包（package）





### 1、package



> 在Java中，我们使用`package`来解决名字冲突。
>
> Java定义了一种名字空间，称之为包：`package`。一个类总是属于某个包，类名（比如`Person`）只是一个简写，真正的完整类名是`包名.类名`。
>
> 包可以是多层结构，用`.`隔开。例如：`java.util`。
>
> 没有定义包名的`class`，它使用的是默认包，非常容易引起名字冲突，因此，不推荐不写包名的做法。



 **要特别注意：包没有父子关系。java.util和java.util.zip是不同的包，两者没有任何继承关系。**



```java
package ming; // 申明包名ming

public class Person {
    
}

// 第二个包
package mr.jun; // 申明包名mr.jun

public class Arrays {
    
}
```

我们还需要按照包结构把上面的Java文件组织起来。假设以`package_sample`作为根目录，`src`作为源码目录，那么所有文件结构就是：



```ascii
package_sample
└─ src
    ├─ hong
    │  └─ Person.java
    │  ming
    │  └─ Person.java
    └─ mr
       └─ jun
          └─ Arrays.java
```

编译后的`.class`文件也需要按照包结构存放。如果使用IDE，把编译后的`.class`文件放到`bin`目录下，那么，编译的文件结构就是：

```ascii
package_sample
└─ bin
   ├─ hong
   │  └─ Person.class
   │  ming
   │  └─ Person.class
   └─ mr
      └─ jun
         └─ Arrays.class
```



### 2、包作用域





> 位于同一个包的类，可以访问包作用域的字段和方法。不用`public`、`protected`、`private`修饰的字段和方法就是包作用域。



```java
package hello;

public class Person {
    // 包作用域:
    void hello() {
        System.out.println("Hello!");
    }
}

// 同包调用
package hello;

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.hello(); // 可以调用，因为Main和Person在同一个包
    }
}
```





### 3、import



> 为了引用其他包的类可以使用import导入包名！
>
> 导入也可以直接写完整路径，很明显，不这样做！



```java
// Person.java
package ming;

public class Person {
    public void run() {
        mr.jun.Arrays arrays = new mr.jun.Arrays();
    }
}

// Person.java
package ming;

// 导入完整类名:
import mr.jun.Arrays;

public class Person {
    public void run() {
        Arrays arrays = new Arrays();
    }
}
```





- 在写`import`的时候，可以使用`*`，表示把这个包下面的所有`class`都导入进来（但不包括子包的`class`）：
- 我们一般不推荐这种写法，因为在导入了多个包后，很难看出`Arrays`类属于哪个包。



```java
// Person.java
package ming;

// 导入mr.jun包的所有class:
import mr.jun.*;

public class Person {
    public void run() {
        Arrays arrays = new Arrays();
    }
}
```



- 还有一种`import static`的语法，它可以导入可以导入一个类的静态字段和静态方法：

> `import static`很少使用。



```java
package main;

// 导入System类的所有静态字段和静态方法:
import static java.lang.System.*;

public class Main {
    public static void main(String[] args) {
        // 相当于调用System.out.println(…)
        out.println("Hello, world!");
    }
}
```





### 4、包命名





为了避免名字冲突，我们需要确定唯一的包名。推荐的做法是使用倒置的域名来确保唯一性。例如：

- org.apache
- org.apache.commons.log
- com.niuge.sample

子包就可以根据功能自行命名。



### 5、class查找顺序



Java编译器最终编译出的`.class`文件只使用*完整类名*，因此，在代码中，当编译器遇到一个`class`名称时：

- 如果是完整类名，就直接根据完整类名查找这个`class`；
- 如果是简单类名，按下面的顺序依次查找：
  - 查找当前`package`是否存在这个`class`；
  - 查找`import`的包是否包含这个`class`；
  - 查找`java.lang`包是否包含这个`class`。

如果按照上面的规则还无法确定类名，则编译报错。



因此，编写class的时候，编译器会自动帮我们做两个import动作：

- 默认自动`import`当前`package`的其他`class`；
- 默认自动`import java.lang.*`。



> 注意：自动导入的是java.lang包，但类似java.lang.reflect这些包仍需要手动导入。



如果有两个`class`名称相同，例如，`mr.jun.Arrays`和`java.util.Arrays`，那么只能`import`其中一个，另一个必须写完整类名。



## 十、作用域



> 在Java中，我们经常看到`public`、`protected`、`private`这些修饰符。在Java中，这些修饰符可以用来限定访问作用域。





### 1、public



> 定义为`public`的`class`、`interface`可以被其他任何类访问：
>
> 定义为`public`的`field`、`method`可以被其他类访问，前提是首先有访问`class`的权限：
>
> 导入包，只可以访问public类型的class等等！



### 2、private



> 定义为`private`的`field`、`method`无法被其他类访问：
>
> 实际上，确切地说，`private`访问权限被限定在`class`的内部，而且与方法声明顺序*无关*。推荐把`private`方法放到后面，因为`public`方法定义了类对外提供的功能，阅读代码的时候，应该先关注`public`方法：



```java
package abc;

public class Hello {
    public void hello() {
        this.hi();
    }

    private void hi() {
    }
}
```



#### 嵌套类



> Java支持嵌套类，如果一个类内部还定义了嵌套类，那么，嵌套类拥有访问`private`的权限：
>
> 定义在一个`class`内部的`class`称为嵌套类（`nested class`），Java支持好几种嵌套类。
>
> 内部嵌套类必须使用static修饰！



```java
public class Main {
    public static void main(String[] args) {
        Inner i = new Inner();
        i.hi();
    }

    // private方法:
    private static void hello() {
        System.out.println("private hello!");
    }

    // 静态内部类:
    static class Inner {
        public void hi() {
            Main.hello();
        }
    }
}
```



### 3、protected



> `protected`作用于继承关系。定义为`protected`的字段和方法可以被子类访问，以及子类的子类：



### 4、包作用域



详见第九点的小2！



### 5、局部变量



> 在方法内部定义的变量称为局部变量，局部变量作用域从变量声明处开始到对应的块结束。方法参数也是局部变量。



### 6、final



请查看第五点的小3的final！





### 7、tips



- 如果不确定是否需要`public`，就不声明为`public`，即尽可能少地暴露对外的字段和方法。

- 把方法定义为`package`权限有助于测试，因为测试类和被测试类只要位于同一个`package`，测试代码就可以访问被测试类的`package`权限方法。

- 一个`.java`文件只能包含一个`public`类，但可以包含多个非`public`类。如果有`public`类，文件名必须和`public`类的名字相同。





## 十一、classpath和jar



> [廖雪峰本节教程参考！点击这里！](https://www.liaoxuefeng.com/wiki/1252599548343744/1260466914339296)

### 1、classpath



> `classpath`是JVM用到的一个环境变量，它用来指示JVM如何搜索`class`。
>
> 因为Java是编译型语言，源码文件是`.java`，而编译后的`.class`文件才是真正可以被JVM执行的字节码。因此，JVM需要知道，如果要加载一个`abc.xyz.Hello`的类，应该去哪搜索对应的`Hello.class`文件。
>
> 一般不需要设置，IDE编译时会自动引入当前bin目录的参数！。。。。



- 所以，`classpath`就是一组目录的集合，它设置的搜索路径与操作系统相关。例如，在Windows系统上，用`;`分隔，带空格的目录用`""`括起来，可能长这样：



```
C:\work\project1\bin;C:\shared;"D:\My Documents\project1\bin"
```



- 在Linux系统上，用`:`分隔，可能长这样：



```
/usr/shared:/usr/local/bin:/home/liaoxuefeng/bin
```

现在我们假设`classpath`是`.;C:\work\project1\bin;C:\shared`，当JVM在加载`abc.xyz.Hello`这个类时，会依次查找：

- <当前目录>\abc\xyz\Hello.class
- C:\work\project1\bin\abc\xyz\Hello.class
- C:\shared\abc\xyz\Hello.class

注意到`.`代表当前目录。如果JVM在某个路径下找到了对应的`class`文件，就不再往后继续搜索。如果所有路径下都没有找到，就报错。

`classpath`的设定方法有两种：

- 在系统环境变量中设置`classpath`环境变量，不推荐；

- 在启动JVM时设置`classpath`变量，推荐。

我们强烈*不推荐*在系统环境变量中设置`classpath`，那样会污染整个系统环境。在启动JVM时设置`classpath`才是推荐的做法。实际上就是给`java`命令传入`-classpath`或`-cp`参数：

```
java -classpath .;C:\work\project1\bin;C:\shared abc.xyz.Hello
```

或者使用`-cp`的简写：

```
java -cp .;C:\work\project1\bin;C:\shared abc.xyz.Hello
```

没有设置系统环境变量，也没有传入`-cp`参数，那么JVM默认的`classpath`为`.`，即当前目录：

```
java abc.xyz.Hello
```

上述命令告诉JVM只在当前目录搜索`Hello.class`。

在IDE中运行Java程序，IDE自动传入的`-cp`参数是当前工程的`bin`目录和引入的jar包。

通常，我们在自己编写的`class`中，会引用Java核心库的`class`，例如，`String`、`ArrayList`等。这些`class`应该上哪去找？

有很多“如何设置classpath”的文章会告诉你把JVM自带的`rt.jar`放入`classpath`，但事实上，根本不需要告诉JVM如何去Java核心库查找`class`，JVM怎么可能笨到连自己的核心库在哪都不知道？

 不要把任何Java核心库添加到classpath中！JVM根本不依赖classpath加载核心库！

**更好的做法是，不要设置`classpath`！默认的当前目录`.`对于绝大多数情况都够用了。**





### 2、jar



>如果有很多`.class`文件，散落在各层目录中，肯定不便于管理。如果能把目录打一个包，变成一个文件，就方便多了。
>
>jar包就是用来干这个事的，它可以把`package`组织的目录层级，以及各个目录下的所有文件（包括`.class`文件和其他文件）都打成一个jar文件，这样一来，无论是备份，还是发给客户，就简单多了。
>
>jar包实际上就是一个zip格式的压缩文件，而jar包相当于目录。如果我们要执行一个jar包的`class`，就可以把jar包放到`classpath`中：
>
>就是用来打包class的文件！



```
java -cp ./hello.jar abc.xyz.Hello
```

这样JVM会自动在`hello.jar`文件里去搜索某个类。



那么问题来了：如何创建jar包？

因为jar包就是zip包，所以，直接在资源管理器中，找到正确的目录，点击右键，在弹出的快捷菜单中选择“发送到”，“压缩(zipped)文件夹”，就制作了一个zip文件。然后，把后缀从`.zip`改为`.jar`，一个jar包就创建成功。

假设编译输出的目录结构是这样：

```ascii
package_sample
└─ bin
   ├─ hong
   │  └─ Person.class
   │  ming
   │  └─ Person.class
   └─ mr
      └─ jun
         └─ Arrays.class
```

这里需要特别注意的是，jar包里的第一层目录，不能是`bin`，而应该是`hong`、`ming`、`mr`。

> 打包位置应该是bin目录进去之后，或者是IDEA的out目录进去之后！





jar包还可以包含一个特殊的`/META-INF/MANIFEST.MF`文件，`MANIFEST.MF`是纯文本，可以指定`Main-Class`和其它信息。JVM会自动读取这个`MANIFEST.MF`文件，如果存在`Main-Class`，我们就不必在命令行指定启动的类名，而是用更方便的命令：

```
java -jar hello.jar
```

jar包还可以包含其它jar包，这个时候，就需要在`MANIFEST.MF`文件里配置`classpath`了。

在大型项目中，不可能手动编写`MANIFEST.MF`文件，再手动创建zip包。Java社区提供了大量的开源构建工具，例如[Maven](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945359327200)，可以非常方便地创建jar包。



## 十二、模块



> [廖雪峰模块教程，点击这里！](https://www.liaoxuefeng.com/wiki/1252599548343744/1281795926523938)
>
> 
>
> 从Java 9开始，JDK又引入了模块（Module）。
>
> 我们知道，`.class`文件是JVM看到的最小可执行文件，而一个大型程序需要编写很多Class，并生成一堆`.class`文件，很不便于管理，所以，`jar`文件就是`class`文件的容器。
>
> 在Java 9之前，一个大型Java程序会生成自己的jar文件，同时引用依赖的第三方jar文件，而JVM自带的Java标准库，实际上也是以jar文件形式存放的，这个文件叫`rt.jar`，一共有60多M。
>
> 如果是自己开发的程序，除了一个自己的`app.jar`以外，还需要一堆第三方的jar包
>
> 此节有点复杂以后回来再看！。。。



### 1、模块



运行一个Java程序，一般来说，命令行写这样：

```bash
java -cp app.jar:a.jar:b.jar:c.jar com.liaoxuefeng.sample.Main
```

注意：JVM自带的标准库rt.jar不要写到classpath中，写了反而会干扰JVM的正常运行。



> 如果漏写了某个运行时需要用到的jar，那么在运行期极有可能抛出`ClassNotFoundException`。
>
> 所以，jar只是用于存放class的容器，它并不关心class之间的依赖。
>
> 从Java 9开始引入的模块，主要是为了解决“依赖”这个问题。如果`a.jar`必须依赖另一个`b.jar`才能运行，那我们应该给`a.jar`加点说明啥的，让程序在编译和运行的时候能自动定位到`b.jar`，这种自带“依赖关系”的class容器就是模块。
>
> 为了表明Java模块化的决心，从Java 9开始，原有的Java标准库已经由一个单一巨大的`rt.jar`分拆成了几十个模块，这些模块以`.jmod`扩展名标识，可以在`$JAVA_HOME/jmods`目录下找到它们：



- java.base.jmod
- java.compiler.jmod
- java.datatransfer.jmod
- java.desktop.jmod
- ...



> 这些`.jmod`文件每一个都是一个模块，模块名就是文件名。例如：模块`java.base`对应的文件就是`java.base.jmod`。模块之间的依赖关系已经被写入到模块内的`module-info.class`文件了。所有的模块都直接或间接地依赖`java.base`模块，只有`java.base`模块不依赖任何模块，它可以被看作是“根模块”，好比所有的类都是从`Object`直接或间接继承而来。
>
> 把一堆class封装为jar仅仅是一个打包的过程，而把一堆class封装为模块则不但需要打包，还需要写入依赖关系，并且还可以包含二进制代码（通常是JNI扩展）。此外，模块支持多版本，即在同一个模块中可以为不同的JVM提供不同的版本。



### 2、编写模块



那么，我们应该如何编写模块呢？还是以具体的例子来说。首先，创建模块和原有的创建Java项目是完全一样的，以`oop-module`工程为例，它的目录结构如下：

```ascii
oop-module
├── bin
├── build.sh
└── src
    ├── com
    │   └── itranswarp
    │       └── sample
    │           ├── Greeting.java
    │           └── Main.java
    └── module-info.java
```

其中，`bin`目录存放编译后的class文件，`src`目录存放源码，按包名的目录结构存放，仅仅在`src`目录下多了一个`module-info.java`这个文件，这就是模块的描述文件。在这个模块中，它长这样：

```java
module hello.world {
	requires java.base; // 可不写，任何模块都会自动引入java.base
	requires java.xml;
}
```

其中，`module`是关键字，后面的`hello.world`是模块的名称，它的命名规范与包一致。花括号的`requires xxx;`表示这个模块需要引用的其他模块名。除了`java.base`可以被自动引入外，这里我们引入了一个`java.xml`的模块。

当我们使用模块声明了依赖关系后，才能使用引入的模块。例如，`Main.java`代码如下：

```java
package com.itranswarp.sample;

// 必须引入java.xml模块后才能使用其中的类:
import javax.xml.XMLConstants;

public class Main {
	public static void main(String[] args) {
		Greeting g = new Greeting();
		System.out.println(g.hello(XMLConstants.XML_NS_PREFIX));
	}
}
```

如果把`requires java.xml;`从`module-info.java`中去掉，编译将报错。可见，模块的重要作用就是声明依赖关系。





下面，我们用JDK提供的命令行工具来编译并创建模块。

首先，我们把工作目录切换到`oop-module`，在当前目录下编译所有的`.java`文件，并存放到`bin`目录下，命令如下：

```bash
$ javac -d bin src/module-info.java src/com/itranswarp/sample/*.java
```

如果编译成功，现在项目结构如下：

```ascii
oop-module
├── bin
│   ├── com
│   │   └── itranswarp
│   │       └── sample
│   │           ├── Greeting.class
│   │           └── Main.class
│   └── module-info.class
└── src
    ├── com
    │   └── itranswarp
    │       └── sample
    │           ├── Greeting.java
    │           └── Main.java
    └── module-info.java
```

注意到`src`目录下的`module-info.java`被编译到`bin`目录下的`module-info.class`。

下一步，我们需要把bin目录下的所有class文件先打包成jar，在打包的时候，注意传入`--main-class`参数，让这个jar包能自己定位`main`方法所在的类：

```bash
$ jar --create --file hello.jar --main-class com.itranswarp.sample.Main -C bin .
```

现在我们就在当前目录下得到了`hello.jar`这个jar包，它和普通jar包并无区别，可以直接使用命令`java -jar hello.jar`来运行它。但是我们的目标是创建模块，所以，继续使用JDK自带的`jmod`命令把一个jar包转换成模块：

```bash
$ jmod create --class-path hello.jar hello.jmod
```

于是，在当前目录下我们又得到了`hello.jmod`这个模块文件，这就是最后打包出来的传说中的模块！





### 3、运行模块



> 要运行一个jar，我们使用`java -jar xxx.jar`命令。要运行一个模块，我们只需要指定模块名。试试：

```bash
$ java --module-path hello.jmod --module hello.world
```

结果是一个错误：

```bash
Error occurred during initialization of boot layer
java.lang.module.FindException: JMOD format not supported at execution time: hello.jmod
```

原因是`.jmod`不能被放入`--module-path`中。换成`.jar`就没问题了：

```bash
$ java --module-path hello.jar --module hello.world
Hello, xml!
```

那我们辛辛苦苦创建的`hello.jmod`有什么用？答案是我们可以用它来打包JRE。



### 4、打包JRE

> 前面讲了，为了支持模块化，Java 9首先带头把自己的一个巨大无比的`rt.jar`拆成了几十个`.jmod`模块，原因就是，运行Java程序的时候，实际上我们用到的JDK模块，并没有那么多。不需要的模块，完全可以删除。
>
> 过去发布一个Java应用程序，要运行它，必须下载一个完整的JRE，再运行jar包。而完整的JRE块头很大，有100多M。怎么给JRE瘦身呢？
>
> 现在，JRE自身的标准库已经分拆成了模块，只需要带上程序用到的模块，其他的模块就可以被裁剪掉。怎么裁剪JRE呢？并不是说把系统安装的JRE给删掉部分模块，而是“复制”一份JRE，但只带上用到的模块。为此，JDK提供了`jlink`命令来干这件事。命令如下：

```bash
$ jlink --module-path hello.jmod --add-modules java.base,java.xml,hello.world --output jre/
```

我们在`--module-path`参数指定了我们自己的模块`hello.jmod`，然后，在`--add-modules`参数中指定了我们用到的3个模块`java.base`、`java.xml`和`hello.world`，用`,`分隔。最后，在`--output`参数指定输出目录。

现在，在当前目录下，我们可以找到`jre`目录，这是一个完整的并且带有我们自己`hello.jmod`模块的JRE。试试直接运行这个JRE：

```bash
$ jre/bin/java --module hello.world
Hello, xml!
```

要分发我们自己的Java应用程序，只需要把这个`jre`目录打个包给对方发过去，对方直接运行上述命令即可，既不用下载安装JDK，也不用知道如何配置我们自己的模块，极大地方便了分发和部署。

### 5、访问权限

> 前面我们讲过，Java的class访问权限分为public、protected、private和默认的包访问权限。引入模块后，这些访问权限的规则就要稍微做些调整。
>
> 确切地说，class的这些访问权限只在一个模块内有效，模块和模块之间，例如，a模块要访问b模块的某个class，必要条件是b模块明确地导出了可以访问的包。
>
> 举个例子：我们编写的模块`hello.world`用到了模块`java.xml`的一个类`javax.xml.XMLConstants`，我们之所以能直接使用这个类，是因为模块`java.xml`的`module-info.java`中声明了若干导出：

```java
module java.xml {
    exports java.xml;
    exports javax.xml.catalog;
    exports javax.xml.datatype;
    ...
}
```

只有它声明的导出的包，外部代码才被允许访问。换句话说，如果外部代码想要访问我们的`hello.world`模块中的`com.itranswarp.sample.Greeting`类，我们必须将其导出：

```
module hello.world {
    exports com.itranswarp.sample;

    requires java.base;
	requires java.xml;
}
```

因此，模块进一步隔离了代码的访问权限。





<center style="color:red; font-size:25px">Java面向对象告一段落了，敬请期待后序内容！</center>