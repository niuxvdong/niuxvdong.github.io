---
title: Java教程系列之泛型
author: Mr.Niu
toc: true
abbrlink: 16438
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/98d2ed3a9828ab66607e1b1a637e676e.png'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/98d2ed3a9828ab66607e1b1a637e676e.png'
categories:
  - Java教程
tags:
  - 泛型
date: 2020-04-04 18:27:50
updated:
---



{% meting "1304861566" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



## 一、泛型是什么



>泛型就是编写模板代码来适应任意类型；
>
>泛型的好处是使用时不必对类型进行强制转换，它通过编译器对类型进行检查；





### 1、以ArrayList举例



> 例如将其模板化：
>
> `T`可以是任何class。这样一来，我们就实现了：编写一次模版，可以创建任意类型的`ArrayList`：
>
> 编译器会针对定义类型进行检查：



```java
public class ArrayList<T> {
    private T[] array;
    private int size;
    public void add(T e) {...}
    public void remove(int index) {...}
    public T get(int index) {...}
}

// 创建可以存储String的ArrayList:
ArrayList<String> strList = new ArrayList<String>();
// 创建可以存储Float的ArrayList:
ArrayList<Float> floatList = new ArrayList<Float>();
// 创建可以存储Person的ArrayList:
ArrayList<Person> personList = new ArrayList<Person>();

strList.add("hello"); // OK
String s = strList.get(0); // OK
strList.add(new Integer(123)); // compile error!
Integer n = strList.get(0); // compile error!
```





### 2、向上转型



> Java标准库中的`ArrayList`实现了`List`接口，它可以向上转型为`List`：



```java
public class ArrayList<T> implements List<T> {
    ...
}

List<String> list = new ArrayList<String>();
```



### 3、特别注意



> 不能把`ArrayList<Integer>`向上转型为`ArrayList<Number>`或`List<Number>`。
>
> 我们把一个`ArrayList`转型为`ArrayList`类型后，这个`ArrayList`就可以接受`Float`类型，因为`Float`是`Number`的子类。但是，`ArrayList`实际上和`ArrayList`是同一个对象，也就是`ArrayList`类型，它不可能接受`Float`类型， 所以在获取`Integer`的时候将产生`ClassCastException`。
>
> 实际上，编译器为了避免这种错误，根本就不允许把`ArrayList`转型为`ArrayList`。
>
> 但是java14似乎连转型的第六行赋值都会报错。。。



```java
// 创建ArrayList<Integer>类型：
ArrayList<Integer> integerList = new ArrayList<Integer>();
// 添加一个Integer：
integerList.add(new Integer(123));
// “向上转型”为ArrayList<Number>：
ArrayList<Number> numberList = integerList;
// 添加一个Float，因为Float也是Number：
numberList.add(new Float(12.34));
// 从ArrayList<Integer>获取索引为1的元素（即添加的Float）：
Integer n = integerList.get(1); // ClassCastException!
```



## 二、使用泛型





### 1、泛型接口



接口定义：

```java
public interface Comparable<T> {
    /**
     * 返回-1: 当前实例比参数o小
     * 返回0: 当前实例与参数o相等
     * 返回1: 当前实例比参数o大
     */
    int compareTo(T o);
}
```



具体用法：

> 对Person0数组按年龄升序排列，年龄相同，按照姓名字典序排序！
>
> 如果使用了泛型`Comparable<Person0>`则类内部必须进行compareTo的覆写：



```java
package com.hello;

import java.util.Arrays;

public class TYPE {
    public static void main(String[] args) {
        Person0[] list = new Person0[]{
                new Person0("B", 2),
                new Person0("A", 3),
                new Person0("G", 0),
                new Person0("A", 2),
                new Person0("L", 4)
        };

        Arrays.sort(list);
        System.out.println(Arrays.toString(list));
		
        // String 类型的排序，本身已经实现了Comparable接口：
        String[] str = {"hello", "world", "hhhh", "wor", "adv"};
        Arrays.sort(str);
        System.out.println(Arrays.toString(str));
    }
}

// 使用泛型覆写compareTo方法进行比较：
class Person0 implements Comparable<Person0> {
    public String name;
    public int age;

    Person0(String name, int age){
        this.name = name;
        this.age = age;
    }
	
    // 重构toString方法：
    public String toString(){
        return this.name + "-" + this.age;
    }
	
    // 覆写compareTo方法：
    @Override
    public int compareTo(Person0 o) {
        if(this.age != o.age) return this.age - o.age;
        else return this.name.compareTo(o.name);
    }
}
```

结果如下：

```
[G-0, A-2, B-2, A-3, L-4]
[adv, hello, hhhh, wor, world]
```



## 三、编写泛型



### 1、编写泛型



> 像这样，将需要的写类型的地方全部替换为T，类名称后面加一个`<T>`即可：

```java
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() {
        return first;
    }
    public T getLast() {
        return last;
    }
}
```





### 2、静态方法



>普通的方法是通过类的实例来调用的，创建实例的过程调用了构造方法，也就是说对象已经知道这个时候类上面定义的<T>的具体类型了；
>
>而静态方法不需要对象实例来调用，是直接通过类名调用的，两者必须得区分开来写：并且在static后面再加一个`<K>`：



```java
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public T getLast() { ... }

    // 静态泛型方法应该使用其他类型区分:
    public static <K> Pair<K> create(K first, K last) {
        return new Pair<K>(first, last);
    }
}
```



### 3、多参数泛型



> 同样的操作方法：
>
> Java标准库的`Map`就是使用两种泛型类型的例子。它对Key使用一种类型，对Value使用另一种类型。

```java
public class Pair<T, K> {
    private T first;
    private K last;
    public Pair(T first, K last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public K getLast() { ... }
}

Pair<String, Integer> p = new Pair<>("test", 123);
```





## 四、擦拭法



> Java语言的泛型实现方式是擦拭法（Type Erasure）。
>
> 擦拭法是指，虚拟机对泛型其实一无所知，所有的工作都是编译器做的。



Java使用擦拭法实现泛型，导致了：

- 编译器把类型`<T>`视为`Object`；
- 编译器根据`<T>`实现安全的强制转型。



### 1、擦拭法过程



编译器看到的代码：



```
Pair<String> p = new Pair<>("Hello", "world");
String first = p.getFirst();
String last = p.getLast();
```



虚拟机看到的代码：

```
Pair p = new Pair("Hello", "world");
String first = (String) p.getFirst();
String last = (String) p.getLast();
```



### 2、擦拭法实现泛型的局限





- `<T>`不能是基本类型（必须是引用类型，因为会被编译器处理为`Object`）
- 无法取得带泛型的`Class`（获取到的`Class`是类的`Class`）
- 无法使用`instanceof`判断类型关系（同上一点原因）
- 不能实例化`T`类型



```java
// 第一点：int和Object矛盾
Pair<int> p = new Pair<>(1, 2); // compile error!

// 第二点：都是Pair.class...
Pair<String> p1 = new Pair<>("Hello", "world");
Pair<Integer> p2 = new Pair<>(123, 456);
Class c1 = p1.getClass();
Class c2 = p2.getClass();
System.out.println(c1==c2); // true
System.out.println(c1==Pair.class); // true

// 第三点：同第二点:
Pair<Integer> p = new Pair<>(123, 456);
// Compile error:
if (p instanceof Pair<String>.class) {
}
```



> 第四点：创建`new Pair<String>()`和创建`new Pair<Integer>()`就全部成了`Object`，显然编译器要阻止这种类型不对的代码。
>
> 要实例化`T`类型，我们必须借助额外的`Class<T>`参数：
>
> 上述代码借助`Class<T>`参数并通过反射来实例化`T`类型，使用的时候，也必须传入`Class<T>`



```java
// 第四点：无法实例化
public class Pair<T> {
    private T first;
    private T last;
    public Pair() {
        // Compile error:
        first = new T();
        last = new T();
    }
}

// 借助Class实例化：
package com.hello;

public class ClassInstance {
    public static void main(String[] args) throws Exception {
        PairOne<String> p = new PairOne<>(String.class);
    }
}

class PairOne <T> {
    public T first;
    public T second;

    PairOne(Class<T> clazz) throws Exception {
        first = clazz.newInstance();
        second = clazz.newInstance();
    }
}
```



### 3、无法覆写



> 定义的`equals(T t)`方法实际上会被擦拭成`equals(Object t)`，而这个方法是继承自`Object`的，编译器会阻止一个实际上会变成覆写的泛型方法定义。





```java
class PairOne <T> {
    // 无法覆写Object的方法:编译报错
    public boolean equals(T t){
        return this == t;
    }
    // 改名即可：
    public boolean equal(T t){
        return this == t;
    }
}
```



### 4、泛型继承



> 无法获取`Pair<T>`的`T`类型，即给定一个变量`Pair<String> p`，无法从`p`中获取到`String`类型。
>
> 但是，在父类是泛型类型的情况下，编译器就必须把类型`T`（对`PairOne`来说，也就是`String`类型）保存到子类的class文件中，不然编译器就不知道`PairOne`只能存取`String`这种类型。
>
> 在继承了泛型类型的情况下，子类可以获取父类的泛型类型。
>
> 实现方法如下；



```java
package com.hello;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public class ClassInstance {
    public static void main(String[] args) throws Exception {
        PairOne<String> p = new PairOne<>(String.class);

        // 获取父类的T类型：
        Class<PairTwo> cls = PairTwo.class;
        Type t = cls.getGenericSuperclass();
        if(t instanceof ParameterizedType){
            ParameterizedType pt = (ParameterizedType) t;
            Type[] types = pt.getActualTypeArguments();
            Type firstType = types[0];
            Class<?> typeClass = (Class<?>) firstType;
            System.out.println(typeClass);
        }
    }
}

class PairOne <T> {
    public T first;
    public T second;

    PairOne(T first, T second){
        this.first = first;
        this.second = second;
    }

    PairOne(Class<T> clazz) throws Exception {
        first = clazz.newInstance();
        second = clazz.newInstance();
    }
    // 无法覆写Object的方法
    /*public boolean equals(T t){
        return this == t;
    }*/
    // 改名即可：
    public boolean equal(T t){
        return this == t;
    }
}

class PairTwo extends PairOne<String>{

    PairTwo(String first, String second) {
        super(first, second);
    }
}
```

Java 类型的结构图：



```ascii
                      ┌────┐
                      │Type│
                      └────┘
                         ▲
                         │
   ┌────────────┬────────┴─────────┬───────────────┐
   │            │                  │               │
┌─────┐┌─────────────────┐┌────────────────┐┌────────────┐
│Class││ParameterizedType││GenericArrayType││WildcardType│
└─────┘└─────────────────┘└────────────────┘└────────────┘
```





## 五、extends通配符



> `PairThree<Number>`不是`PairThree<Ingeter>`的子类。
>
> 因为`PairThree<Number>`不是`PairThree<Ingeter>`的子类，因此，`add(PairThree<Number>)`不接受参数类型`PairThree<Integer>`。



### 1、无继承关系无法传参

```java
package com.hello;

public class Extends {
    public static void main(String[] args) {
        PairThree<Number> p = new PairThree<>(23, 89);
        System.out.println(add(p));

        PairThree<Integer> i = new PairThree<>(23, 89);
        System.out.println(add(i));// 编程错误
    }

    static int add(PairThree<Number> p){
        Number first = p.getA();
        Number second = p.getB();
        return first.intValue() + second.intValue();
    }
}

class PairThree <T> {
    private T a;
    private T b;

    public PairThree(T a, T b){
        this.a = a;
        this.b = b;
    }

    public T getA() {
        return a;
    }

    public T getB() {
        return b;
    }
}
```





>很明显这里没什么毛病，属于向上转型，因为Integer向上转型为Number!
>
>但是问题在add方法的参数上，`PairThree<Number>`是不可能接受`PairThree<Integer> `的，毕竟没有继承关系。。。



```java
Number first = p.getA();
Number last = p.getB();
```



### 2、通过extends通配符传继承子类



> Java中的通配符：`?`
>
> 只要是Number的子类就可以进行传参：
>
> 使用`<? extends Number>`的泛型定义称之为上界通配符（Upper Bounds Wildcards），即把泛型类型`T`的上界限定在`Number`了。

```java
static int add(PairThree<? extends Number> p){
    Number first = p.getA();
    Number second = p.getB();
    return first.intValue() + second.intValue();
}
```

> 下面的赋值是无法通过的！
>
> 编译器只是知道传入的是Number或其子类，并不知道到底是谁，具体类型无法确定！无法完成赋值！

```java
Integer x = p.getFirst();
```







### 3、extends通配符处理set方法



> 如此效果，也就是你只能对其进行获取，不能进行修改，极大保证了数据安全性！



```java
static int addOne(PairThree<? extends Number> p){
    Number first = p.getA();
    Number second = p.getB();
    // 当前p类型为PairThree<? extends Number> 无法传入除null之外的其他类型
    // 报错
    //p.setA(new Integer(123));
    //p.setB(new Integer(345));
    p.setA(null);// ok, 但是后面会抛出NullPointerException
	p.getA().intValue(); // NullPointerException
    return p.getA().intValue()+ p.getB().intValue();
}
```



### 4、extends通配符作用



> 当然和上一点的安全性脱不了关系：
>
> 方法使用了通配符参数，有什么用呢？



优点：

- 允许调用`get()`方法获取`Integer`的引用；
- 不允许调用`set(? extends Integer)`方法并传入任何`Integer`的引用（`null`除外）。
- 即通过通配符参数实现了List类的只读效果，保证了安全！



```java
public interface List<T> {
    int size(); // 获取个数
    T get(int index); // 根据索引获取指定元素
    void add(T t); // 添加一个新元素
    void remove(T t); // 删除一个已有元素
}

int sumOfList(List<? extends Integer> list) {
    int sum = 0;
    for (int i=0; i<list.size(); i++) {
        Integer n = list.get(i);
        sum = sum + n;
    }
    return sum;
}
```



### 5、使用extends通配符限定T类型



> 则在定义时只能是Number及其子类！
>
> 其他类型将无法通过编译：

```java
public class Pair<T extends Number> { ... }
```





## 六、super通配符





> 和extends相反，extends通配符可以接收当前类以及子类，super通配符可以接收当前类及其父类：
>
> 但是无法通过当前类或其他类来接收当前获取到的值，除了Object对象：
>
> 很好理解：当前类型p是Integer本身或其父类，编译器无法确定到底是和类型，无法用一个Integer来接收Number，当然Object是可以接收的，所有类型都可以向上转型为Object对象！





### 1、只能写不能读



使用`<? super Integer>`通配符表示：

- 允许调用`set(? super Integer)`方法传入`Integer`的引用；
- 不允许调用`get()`方法获得`Integer`的引用。

唯一例外是可以获取`Object`的引用：`Object o = p.getFirst()`。

换句话说，使用`<? super Integer>`通配符作为方法参数，表示方法内部代码对于参数只能写，不能读。



```java
package com.hello;

public class Super {
    public static void main(String[] args) {
        PairFive<Integer> p1 = new PairFive<>(123, 567);
        PairFive<Number> p2 = new PairFive<>(34, 69);

        setName(p1, 100);
        setName(p2, 200);
        System.out.println(p1.getA()); // 100
        System.out.println(p2.getA()); // 200
    }

    static void setName(PairFive<? super Integer> p, Integer n){
        // 唯一可接受get方法的是Object
        Object oc = p.getA();
        // 这样无法接收：
        Number nc = p.getA();
        Integer ic = p.getA();
        p.setA(n);
        p.setB(n);
    }
}


class PairFive <T> {
    private T a;
    private T b;

    public PairFive(T a, T b){
        this.a = a;
        this.b = b;
    }

    public void setA(T a) {
        this.a = a;
    }

    public void setB(T b) {
        this.b = b;
    }

    public T getA() {
        return a;
    }

    public T getB() {
        return b;
    }
}
```





### 2、extends 与 super 区别



作为方法参数，`<? super T>`类型和`<? extends T>`类型的区别在于：

- `<? extends T>`允许调用读方法`T get()`获取`T`的引用，但不允许调用写方法`set(T)`传入`T`的引用（传入`null`除外）；
- `<? super T>`允许调用写方法`set(T)`传入`T`的引用，但不允许调用读方法`T get()`获取`T`的引用（获取`Object`除外）。



一个是允许读不允许写，另一个是允许写不允许读。





#### 一个很好的例子：



> 作用：将`src`的元素全部添加到`dest`中：



这个`copy()`方法的定义就完美地展示了`extends`和`super`的意图：

- `copy()`方法内部不会读取`dest`，因为不能调用`dest.get()`来获取`T`的引用；
- `copy()`方法内部也不会修改`src`，因为不能调用`src.add(T)`。
- 倘若意外修改了`src`，或者意外读取了`dest`，就会导致一个编译错误：
- 

```java
package com.hello;

import java.util.List;

public class CollectionsTest {
    public static void main(String[] args) {
        
    }
}

class CollectionsDemo {
    // 把src的每个元素复制到dest中:
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        // 下面的循环可以用这句话替代：
        // dest.addAll(src);
        for (int i=0; i<src.size(); i++) {
            T t = src.get(i);
            dest.add(t);
        }
        
        // 无法实现：
        T t = dest.get(0); // compile error!
        src.add(t); // compile error!
    }
}
```

- 当然，也无法反过来添加：

> 这些都是通过`super`和`extends`通配符，并由编译器强制检查来实现的。

```java
// copy List<Integer> to List<Number> ok:
List<Number> numList = ...;
List<Integer> intList = ...;
CollectionDemo.copy(numList, intList);

// ERROR: cannot copy List<Number> to List<Integer>:
CollectionDemo.copy(intList, numList);
```



### 3、PECS 原则





> 何时使用`extends`，何时使用`super`？
>
> 为了便于记忆，我们可以用PECS原则：Producer Extends Consumer Super。
>
> 如果需要返回`T`，它是生产者（Producer），要使用`extends`通配符；如果需要写入`T`，它是消费者（Consumer），要使用`super`通配符。



任然使用这个例子：

```java
public class Collections {
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (int i=0; i<src.size(); i++) {
            T t = src.get(i); // src是producer
            dest.add(t); // dest是consumer
        }
    }
}
```



### 4、无界定通配符



> 即只定义一个`<?>`：



因为`<?>`通配符既没有`extends`，也没有`super`，因此：

- 不允许调用`set(T)`方法并传入引用（`null`除外）；
- 不允许调用`T get()`方法并获取`T`引用（只能获取`Object`引用）。

换句话说，既不能读，也不能写，那只能做一些`null`判断：



```java
static boolean isNull(Pair<?> p){
    return p.getFirst() == null || p.getSecond() == null;
}
```



大多数情况下，可以引入泛型参数`<T>`消除`<?>`通配符：(一般这样使用)



```java
static <T> boolean isNull(Pair<T> p) {
    return p.getFirst() == null || p.getSecond() == null;
}
```



`<?>`通配符有一个独特的特点，就是：`Pair<?>`是所有`Pair<T>`的超类(即父类)：



### 5、super通配符不能用于class



> 无法这样写：
>
> extends可以！

```java
class demo <T super Number> {

}
```



## 七、泛型与反射



### 1、`Class<T>`是泛型



```java
// 编译警告：可运行
Class cls = String.class;
String str0 = (String)cls.newInstance();

// 无问题：
Class<String> cl = String.class;
String str = cl.newInstance();

Class<? super String> sup = String.class.getSuperclass();
```

### 2、`Constructor<T>`是泛型



```java
Class<Integer> clazz = Integer.class;
Constructor<Integer> cons = clazz.getConstructor(int.class);
Integer i = cons.newInstance(123);
System.out.println(i); // 123
```

### 3、泛型数组创建



> 不能用`new`操作符创建带泛型的数组：
>
> 必须通过强制转型实现带泛型的数组：

可以声明带泛型的数组，但不能直接创建带泛型的数组，必须强制转型：

```java
Pair<String>[] ps = null; // ok
Pair<String>[] ps1 = new Pair<String>[2]; // compile error!

// 正确使用：
@SuppressWarnings("unchecked")
Pair<String>[] ps2 = (Pair<String>[]) new Pair[2];
```

可以通过`Array.newInstance(Class, int)`创建`T[]`数组，需要强制转型：



> [廖雪峰教程，有点没看懂，以后再看！。。。](https://www.liaoxuefeng.com/wiki/1252599548343744/1265105940850016)



### 4、谨慎使用泛型可变参数



> 如果在方法内部创建了泛型数组，最好不要将它返回给外部使用。
>
> 直接调用`asArray(T...)`似乎没有问题，但是在另一个方法中，我们返回一个泛型数组就会产生`ClassCastException`，原因还是因为擦拭法，在`pickTwo()`方法内部，编译器无法检测`K[]`的正确类型，因此返回了`Object[]`。
>
> 如果仔细观察，可以发现编译器对所有可变泛型参数都会发出警告，除非确认完全没有问题，才可以用`@SafeVarargs`消除警告。



```java
package com.learn.java;

import java.util.Arrays;

public class Main01 {
    public static void main(String[] args) {
        String[] arr = asArray("one", "two", "three");
        System.out.println(Arrays.toString(arr));
        // ClassCastException:
        String[] firstTwo = pickTwo("one", "two", "three");
        System.out.println(Arrays.toString(firstTwo));
    }

    static <K> K[] pickTwo(K k1, K k2, K k3) {
        return asArray(k1, k2);
    }

    @SafeVarargs
    static <T> T[] asArray(T... objs) {
        return objs;
    }
}
```

输出结果：

```
[one, two, three]
Exception in thread "main" java.lang.ClassCastException: class [Ljava.lang.Object; cannot be cast to class [Ljava.lang.String; ([Ljava.lang.Object; and [Ljava.lang.String; are in module java.base of loader 'bootstrap')
	at com.learn.java.Main01.main(Main01.java:10)
```



<center style="color:red; font-size:25px">泛型章节终于结束，敬请期待后续内容！</center>