---
title: Java教程系列之集合
author: Mr.Niu
toc: true
abbrlink: 46100
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png'
categories:
  - Java教程
tags:
  - 集合
date: 2020-04-07 16:23:56
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "1304861566" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}





## 一、Java集合介绍



> 在Java中，如果一个Java对象可以在内部持有若干其他Java对象，并对外提供访问接口，我们把这种Java对象称为集合！



- 数组就是一种集合：

```java
String[] ss = new String[10]; // 可以持有10个String对象
ss[0] = "Hello"; // 可以放入String对象
String first = ss[0]; // 可以获取String对象
```





### 1、数组的不足



- 数组初始化后大小不可变；
- 数组只能按索引顺序存取。

### 2、需要各种类型的集合



- 可变大小的顺序链表；
- 保证无重复元素的集合；
- ...



### 3、Collection



> `Collection`，它是除`Map`外所有其他集合类的根接口，来自于`java.util`包！



#### 3.1 三种主要集合：



- `List`：一种有序列表的集合
- `Set`：一种保证没有重复元素的集合
- `Map`：一种通过键值（key-value）查找的映射表集合



#### 3.2 Java集合的特点：



- 一是实现了接口和实现类相分离，例如，有序表的接口是`List`，具体的实现类有`ArrayList`，`LinkedList`等.
- 二是支持泛型，我们可以限制在一个集合中只能放入同一种数据类型的元素.

```java
List<String> list = new ArrayList<>(); // 只能放入String类型
```



#### 3.3 集合访问（Iterator）



> Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储的。

> Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储的。



#### 3.4 不建议继续使用的集合



由于Java的集合设计非常久远，中间经历过大规模改进，我们要注意到有一小部分集合类是遗留类，不应该继续使用：

- `Hashtable`：一种线程安全的`Map`实现；
- `Vector`：一种线程安全的`List`实现；
- `Stack`：基于`Vector`实现的`LIFO`的栈。

还有一小部分接口是遗留接口，也不应该继续使用：

- `Enumeration`：已被`Iterator`取代。





## 二、使用List



> `List`是最基础的一种集合：它是一种有序链表。





### 1、数组的删除和添加



- 删除：删掉指定索引位置后将后面元素整体前移一位；
- 添加：将指定索引位置及之后元素后移一位，将新元素插入该位置；



可见：操作增删是很复杂的，需要人为介入去处理！



### 2、ArrayList



> 把添加和删除的操作封装起来，让我们操作`List`类似于操作数组，却不用关心内部元素如何移动。
>
> 变成了自动操作！





- 增删可以直接使用，已经封装为函数！
- 数组已满时的操作：
  - 先创建一个更大的新数组，然后把旧数组的所有元素复制到新数组，紧接着用新数组取代旧数组





### 3、`List<E>`接口



主要的接口方法：



- 在末尾添加一个元素：`void add(E e)`
- 在指定索引添加一个元素：`void add(int index, E e)`
- 删除指定索引的元素：`int remove(int index)`：返回索引+1，从1开始计数！
- 删除某个元素：`int remove(Object e)`
- 获取指定索引的元素：`E get(int index)`
- 获取链表大小（包含元素的个数）：`int size()`





### 4、ArrayList与LinkedList





> 都是List接口实现的实例类！
>
> `LinkedList`相当于单链表，有前后的指针关系！
>
> 通常情况下，我们总是优先使用`ArrayList`。



区别：



|                     | ArrayList    | LinkedList           |
| :------------------ | :----------- | :------------------- |
| 获取指定元素        | 速度很快     | 需要从头开始查找元素 |
| 添加元素到末尾      | 速度很快     | 速度很快             |
| 在指定位置添加/删除 | 需要移动元素 | 不需要移动元素       |
| 内存占用            | 少           | 较大                 |





### 5、List的特点



- 元素可重复
- 允许添加`null`



```java
package com.learn.java;

import java.util.ArrayList;
import java.util.List;

public class ListTest {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("hello");
        list.add("hello");
        list.add(null);
        System.out.println(list.size()); // 3
        System.out.println(list.toString()); // [hello, hello, null]
    }
}
```



### 6、创建List



> 通过`List`接口提供的`of()`方法，根据给定元素快速创建`List`：
>
> 但是`List.of()`方法不接受`null`值，如果传入`null`，会抛出`NullPointerException`异常。



```java
List<String> list1 = List.of("hello", "hello", "world");
// 无法传入null:
List<String> list2 = List.of(null);
```





### 7、遍历List



#### 7.1 通过get方法遍历（不推荐）



> 缺点：
>
> 一是代码复杂；
>
> 二是因为`get(int)`方法只有`ArrayList`的实现是高效的，换成`LinkedList`后，索引越大，访问速度越慢。

```java
package com.learn.java;

import java.util.ArrayList;
import java.util.List;

public class ListTest {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("hello");
        list.add("hello");
        list.add(null);
        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i));
        }
    }
}
```





#### 7.2 通过Iterator遍历



> 使用迭代器`Iterator`来访问`List`。
>
> `Iterator`本身也是一个对象，但它是由`List`的实例调用`iterator()`方法的时候创建的。
>
> `Iterator`对象知道如何遍历一个`List`，并且不同的`List`类型，返回的`Iterator`对象实现也是不同的，但总是具有最高的访问效率。

两个方法：

- `boolean hasNext()`：判断是否有下一个元素
- `E next()`：返回下一个元素

```java
package com.learn.java;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ListTest {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("hello");
        list.add("hello");
        list.add(null);
        for (Iterator<String> it = list.iterator(); it.hasNext(); ){
            System.out.println(it.next());
        }
    }
}
```





#### 7.3 通过for each遍历（推荐）



> 编译器内部其实会通过Iterator来实现遍历，达到最高效！
>
> 和7.2的实现是一样的，但是更加简单使用，推荐使用！
>
> 只要实现了`Iterable`接口的集合类都可以直接用`for each`循环来遍历，Java编译器本身并不知道如何遍历集合对象，但它会自动把`for each`循环变成`Iterator`的调用，原因就在于`Iterable`接口定义了一个`Iterator iterator()`方法，强迫集合类必须返回一个`Iterator`实例。





```java
package com.learn.java;

import java.util.ArrayList;
import java.util.List;

public class ListTest {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("hello");
        list.add("hello");
        list.add(null);
        for (String s : list) {
            System.out.println(s);
        }
    }
}
```



### 8、List转换为Array





#### 8.1 使用toArray()方法



> 调用`toArray()`方法直接返回一个`Object[]`数组：
>
> 这种方法会丢失类型信息，所以实际应用很少。



```java
List<String> list = List.of("apple", "pear", "banana");
Object[] array = list.toArray();
```



#### 8.2 使用toArray(T[])方法



> 给`toArray(T[])`传入一个类型相同的`Array`，`List`内部自动把元素复制到传入的`Array`中：
>
> 该方法的泛型参数`<T>`并不是`List`接口定义的泛型参数`<E>`！
>
> 参数可传入实际类型及其父类：



```java
package com.learn.java;

import java.util.List;

public class ListTest {
    public static void main(String[] args) {
        List<Integer> list = List.of(1, 3, 5);
        Number[] arr = list.toArray(new Number[3]);
        Object[] arr1 = list.toArray(new Object[3]);

        for (Number number : arr) {
            System.out.print(number + " ");
        }
        System.out.println();
        for (Object o : arr1) {
            System.out.print(o + " ");
        }
    }
}
```





- 如果传入的数组不够大，那么`List`内部会创建一个新的刚好够大的数组，填充后返回；

- 如果传入的数组比`List`元素还要多，那么填充完元素后，剩下的数组元素一律填充`null`。





#### 8.3 传入恰好大小的数组



```java
List<Integer> list = List.of(1, 3, 5);
Integer[] array = list.toArray(new Integer[list.size()]);
```



#### 8.4 使用函数式写法



> 更简洁的写法是通过`List`接口定义的`T[] toArray(IntFunction generator)`方法：
>
> 函数式写法后面会讲到：



```java
Integer[] array = list.toArray(Integer[]::new);
```





### 9、Array转换为List



> 直接借助List.of()方法：

```java
Integer[] array = { 1, 2, 3 };
List<Integer> list = List.of(array);

// jdk11之前可以这样用：
List<Integer> list = Arrays.asList(array);
```



> 使用List.of()方法返回的是一个只读的List，无法调用add和remove等方法！
>
> 会抛出`UnsupportedOperationException`。



```java
// 正确：
List<Integer> lis = new ArrayList<>();
lis.add(3);

// 抛出错误：
List<Integer> list = List.of(1, 3, 5);
list.add(5);
```





## 三、编写equals方法





### 1、contains 和 indexOf方法



- `List`还提供了`boolean contains(Object o)`方法来判断`List`是否包含某个指定元素.
- `int indexOf(Object o)`方法可以返回某个元素的索引，如果元素不存在，就返回`-1`。



```java
package com.learn.java;

import java.util.List;

public class Equals {
    public static void main(String[] args) {
        List<String> list = List.of("A", "B", "C");
        System.out.println(list.contains("C")); // true
        System.out.println(list.contains("X")); // false
        System.out.println(list.indexOf("C")); // 2
        System.out.println(list.indexOf("X")); // -1
    }
}
```



### 2、判断两个元素相等



> 传入不同的实例，仍然可以通过下面两个函数比较得到结果：
>
> 因为`List`内部并不是通过`==`判断两个元素是否相等，而是使用`equals()`方法判断两个元素是否相等：
>
> Java标准中的引用类型定义的类已经正确实现了equals方法！
>
> 所以自定义的类需要手动覆写equals方法；



```java
System.out.println(list.contains(new String("C"))); // true
System.out.println(list.indexOf(new String("C"))); // 2
```





### 3、编写equals方法



#### 3.1 equals方法需要满足的条件

- 自反性（Reflexive）：对于非`null`的`x`来说，`x.equals(x)`必须返回`true`；
- 对称性（Symmetric）：对于非`null`的`x`和`y`来说，如果`x.equals(y)`为`true`，则`y.equals(x)`也必须为`true`；
- 传递性（Transitive）：对于非`null`的`x`、`y`和`z`来说，如果`x.equals(y)`为`true`，`y.equals(z)`也为`true`，那么`x.equals(z)`也必须为`true`；
- 一致性（Consistent）：对于非`null`的`x`和`y`来说，只要`x`和`y`状态不变，则`x.equals(y)`总是一致地返回`true`或者`false`；
- 对`null`的比较：即`x.equals(null)`永远返回`false`。



#### 3.2 equals方法编写步骤



1. 先确定实例“相等”的逻辑，即哪些字段相等，就认为实例相等；
2. 用`instanceof`判断传入的待比较的`Object`是不是当前类型，如果是，继续比较，否则，返回`false`；
3. 对引用类型用`Objects.equals()`比较，对基本类型直接用`==`比较。



> 对于引用字段比较，我们使用`equals()`，对于基本类型字段的比较，我们使用`==`。
>
> 使用`instanceof`来判断两个对象类型是否一致！当然参数为当前对象子类时也可以进入判断！



- 普通方法编写：



> 要判断`null`的特殊情况！

```java
public class Person {
    public String name;
    public int age;
    
    public boolean equals(Object o) {
        if (o instanceof Person) {
            Person p = (Person) o;
            boolean nameEquals = false;
            // 都是null返回true
            if (this.name == null && p.name == null) {
                nameEquals = true;
            }
            if (this.name != null) {
                nameEquals = this.name.equals(p.name);
            }
            return nameEquals && this.age == p.age;
        }
        return false;
    }
    
}
```



- 借助Objects.equals()方法判断



> 使用`Objects.equals()`比较两个引用类型是否相等的目的是省去了判断`null`的麻烦。两个引用类型都是`null`时它们也是相等的。



```java
public class Person {
    public String name;
    public int age;
    
    public boolean equals(Object o) {
        if (o instanceof Person) {
            Person p = (Person) o;
            return Objects.equals(this.name, p.name) && this.age == p.age;
        }
        return false;
    }
    
}
```



### 4、什么时候需要编写equals方法



如果不调用`List`的`contains()`、`indexOf()`这些方法，那么放入的元素就不需要实现`equals()`方法。



总而言之：不需要进行元素的比较就不需要编写！





## 四、使用Map



> Map是一种键值（key-value）映射表的数据结构，作用就是能高效通过`key`快速查找`value`（元素）。
>
> `Map`和`List`一样也是一个接口，最常用的实现类是`HashMap`。





### 1、常用方法

- `V put(K key, V value)`：存储键值对，没有键时返回`null`，有键时返回`旧的value`，新的覆盖旧的！
- `V get(K key)`：获取键对应的值！
- `boolean containsKey(K key)`：查询键是否存在！





```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("apple", 123);
        map.put("pear", 456);
        System.out.println(map.get("apple")); // 123
        map.put("apple", 789); // 再次放入apple作为key，但value变为789
        System.out.println(map.get("apple")); // 789
        
        // 当然：value可重复
        Map<String, Integer> map = new HashMap<>();
        map.put("apple", 123);
        map.put("pear", 123); // ok
    }
}
```





### 2、Map遍历



> `Map`存储的是`key-value`的映射关系，并且，它*不保证顺序*，即遍历的顺序是不确定的！



三种遍历如下：



```java
package com.learn.java;

import java.util.HashMap;
import java.util.Map;

public class MapTest {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("niu", 20);
        map.put("ge", 30);
        map.put("hello", 30);

        // 遍历key
        for(String key : map.keySet()){
            System.out.println(key);
        }
        // 遍历value
        for(Integer value : map.values()){
            System.out.println(value);
        }
        // 遍历key-value
        for(Map.Entry<String, Integer> entry : map.entrySet()){
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
    }
}
```





### 3、高效查找例子



> List来存储所有信息，Map来存储经常需要查询的信息！提高查找效率！
>
> 现在Map中找，找到直接返回，找不到再从List中找，找到将这组信息放入Map，并返回该信息！
>
> Map永远存储最常用的信息，极大提高效率！



```java
package com.learn.java;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapWork {
    public static void main(String[] args) {
        List<Student> list = List.of(
                new Student("Bob", 78),
                new Student("Alice", 85),
                new Student("Brush", 66),
                new Student("Newton", 99));
        var holder = new Students(list);
        System.out.println(holder.getScore("Bob") == 78 ? "测试成功!" : "测试失败!");
        System.out.println(holder.getScore("Alice") == 85 ? "测试成功!" : "测试失败!");
        System.out.println(holder.getScore("Tom") == -1 ? "测试成功!" : "测试失败!");
    }
}

class Students {
    List<Student> list;
    Map<String, Integer> cache;

    Students(List<Student> list) {
        this.list = list;
        cache = new HashMap<>();
    }

    /**
     * 根据name查找score，找到返回score，未找到返回-1
     */
    Integer getScore(String name) {
        // 先在Map中查找:
        Integer score = this.cache.get(name);
        if (score == null) {
            // TODO:
            score = findInList(name);
            if(score != null){
                cache.put(name, score);
            }
        }
        return score == null ? -1 : score;
    }

    Integer findInList(String name) {
        for (var ss : this.list) {
            if (ss.name.equals(name)) {
                return ss.score;
            }
        }
        return null;
    }
}

class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
```





## 五、编写hashCode和equals方法



>当然是针对HashMap的，get方法查找的时候HashMap内部要进行比对，通过equals方法，编写方法同第三大节的编写equals方法，当自定义的类出现时，就需要去覆写equals方法。
>
>在`Map`的内部，对`key`做比较是通过`equals()`实现的，这一点和`List`查找元素需要正确覆写`equals()`是一样的，即正确使用`Map`必须保证：作为`key`的对象必须正确覆写`equals()`方法。
>
>Map内部是通过`hashCode()`方法来计算key对应的value的索引，



正确使用`Map`必须保证：

1. 作为`key`的对象必须正确覆写`equals()`方法，相等的两个`key`实例调用`equals()`必须返回`true`；
2. 作为`key`的对象还必须正确覆写`hashCode()`方法，且`hashCode()`方法要严格遵循以下规范：

- 如果两个对象相等，则两个对象的`hashCode()`必须相等；
- 如果两个对象不相等，则两个对象的`hashCode()`尽量不要相等。





第一条规范是正确性，必须保证实现，否则`HashMap`不能正常工作。

而第二条如果尽量满足，则可以保证查询效率，因为不同的对象，如果返回相同的`hashCode()`，会造成`Map`内部存储冲突，使存取的效率下降。





### 1、equals方法覆写



同第三节的编写equals方法！



### 2、编写hashCode方法



> 当然还是针对自定义类的覆写，标准库的类，java内部已经实现！



#### 2.1 实现原理

> 此方法并没有处理参数为`null`的问题，要想写完整需要加上关于`null`的判断！
>
> 在计算`Person`的`hashCode()`时，反复使用`31*h`，这样做的目的是为了尽量把不同的`Person`实例的`hashCode()`均匀分布到整个`int`范围。

```java
public class Person {
    String firstName;
    String lastName;
    int age;

    @Override
    int hashCode() {
        int h = 0;
        h = 31 * h + firstName.hashCode();
        h = 31 * h + lastName.hashCode();
        h = 31 * h + age;
        return h;
    }
}
```

#### 2.2 使用Objects.hash方法

> 直接借助`Objects.hash()`方法，自动实现`null`的处理；

```java
int hashCode() {
    return Objects.hash(firstName, lastName, age);
}
```



#### 2.3 编写原则



- `equals()`用到的用于比较的每一个字段，都必须在`hashCode()`中用于计算；
- `equals()`中没有使用到的字段，绝不可放在`hashCode()`中计算。

另外注意，对于放入`HashMap`的`value`对象，没有任何要求。



#### 2.4 完整示例



```java
package com.learn.java;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class HashCode {
    public static void main(String[] args) {
        Map<Persons, String> map = new HashMap<>();
        map.put(new Persons("hello1", "world1", 20), "first");
        map.put(new Persons("hello2", "world2", 21), "second");
        map.put(new Persons("hello3", "world3", 22), "three");

        String str = map.get(new Persons("hello2", "world2", 21));
        System.out.println(str); // second

        Persons key = new Persons("hello2", "world2", 21);
        int index = key.hashCode() & 0xf;
        System.out.println(index); // 4
    }
}

class Persons {
    String firstName;
    String lastName;
    int age;

    Persons(String firstName, String lastName, int age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    @Override
    public boolean equals(Object o){
        if(o instanceof Persons){
            Persons p = (Persons) o;
            return Objects.equals(this.firstName, p.firstName) && Objects.equals(this.lastName, p.lastName)
                    && this.age == p.age;
        }
        return false;
    }

    /*@Override
    // 普通方法：
    public int hashCode() {
        int h = 0;
        h = 31 * h + firstName.hashCode();
        h = 31 * h + lastName.hashCode();
        h = 31 * h + age;
        return h;
    }*/

    @Override
    public int hashCode(){
        return Objects.hash(firstName, lastName, age);
    }
}
```





### 3、hashCode延伸





> `HashMap`内部使用了数组，通过计算`key`的`hashCode()`直接定位`value`所在的索引！



#### 3.1 HashMap的数组变化



`HashMap`初始化时默认的数组大小只有16，索引为在0～15，超过范围，自动扩容为原来的二倍，即长度为16的数组扩展为长度32，相应地，需要重新确定`hashCode()`计算的索引位置。



> 扩容会导致重新分布已有的`key-value`，所以，频繁扩容对`HashMap`的性能影响很大，所以在创建时就指定容量！
>
> 虽然指定容量是`10000`，但`HashMap`内部的数组长度总是2<sup>n</sup>，因此，实际数组长度被初始化为比`10000`大的`16384`（2<sup>14</sup>）。





```java
Persons key = new Persons("hello2", "world2", 21);
// 调用hashCode方法与容量做按位与获取value下标：
int index = key.hashCode() & 0xf;
System.out.println(index);

// 在创建时指定容量：
Map<String, Integer> maps = new HashMap<>(10000);
```





#### 3.2 hashCode计算得到的索引相同



>若计算出的数组索引相同，并不会发生覆盖现象，只要`key`不相同，它们映射的`value`就互不干扰！
>
>假设`"a"`和`"b"`这两个`key`最终计算出的索引都是5，那么，在`HashMap`的数组中，实际存储的不是一个`Person`实例，而是一个`List`，它包含两个`Entry`，一个是`"a"`的映射，一个是`"b"`的映射！
>
>HashMap内部通过`"a"`找到的实际上是`List>`，它还需要遍历这个`List`，并找到一个`Entry`，它的`key`字段是`"a"`，才能返回对应的`Person`实例！
>
>我们把不同的`key`具有相同的`hashCode()`的情况称之为哈希冲突。在冲突的时候，一种最简单的解决办法是用`List`存储`hashCode()`相同的`key-value`。显然，如果冲突的概率越大，这个`List`就越长，`Map`的`get()`方法效率就越低，这就是为什么要尽量满足条件二：
>
>如果两个对象不相等，则两个对象的hashCode()尽量不要相等。



```java
map.put("a", new Person("Xiao Ming"));
map.put("b", new Person("Xiao Hong"));
```







## 六、使用EnumMap



>`HashMap`是一种通过对key计算`hashCode()`，通过空间换时间的方式，直接定位到value所在的内部数组的索引，因此，查找效率非常高。
>
>如果作为key的对象是`enum`类型，那么，还可以使用Java集合库提供的一种`EnumMap`，它在内部以一个非常紧凑的数组存储value，并且根据`enum`类型的key直接定位到内部数组的索引，并不需要计算`hashCode()`，不但效率最高，而且没有额外的空间浪费。
>
>使用`EnumMap`的时候，我们总是用`Map`接口来引用它，因此，实际上把`HashMap`和`EnumMap`互换，在客户端看来没有任何区别。



```java
package com.learn.java;

import java.time.DayOfWeek;
import java.util.EnumMap;
import java.util.Map;

public class EnumMapTest {
    public static void main(String[] args) {
        // 参数作用：泛型擦除，方法内部从T拿不到class
        Map<DayOfWeek, String> map = new EnumMap<>(DayOfWeek.class);
        map.put(DayOfWeek.MONDAY, "星期一");
        map.put(DayOfWeek.TUESDAY, "星期二");
        map.put(DayOfWeek.WEDNESDAY, "星期三");
        map.put(DayOfWeek.THURSDAY, "星期四");
        map.put(DayOfWeek.FRIDAY, "星期五");
        map.put(DayOfWeek.SATURDAY, "星期六");
        map.put(DayOfWeek.SUNDAY, "星期日");
        System.out.println(map);
        System.out.println(map.get(DayOfWeek.MONDAY));
        /*
        {MONDAY=星期一, TUESDAY=星期二, WEDNESDAY=星期三, THURSDAY=星期四, FRIDAY=星期五, SATURDAY=星期六, SUNDAY=星期日}
		星期一
		*/
    }
}
```







## 七、使用TreeMap





>`HashMap`是一种以空间换时间的映射表，它的实现原理决定了内部的Key是无序的，即遍历`HashMap`的Key时，其顺序是不可预测的（但每个Key都会遍历一次且仅遍历一次）。
>
>还有一种`Map`，它在内部会对Key进行排序，这种`Map`就是`SortedMap`。
>
>注意到`SortedMap`是接口，它的实现类是`TreeMap`。



### 1、Map的继承关系：

```ascii
       ┌───┐
       │Map│
       └───┘
         ▲
    ┌────┴─────┐
    │          │
┌───────┐ ┌─────────┐
│HashMap│ │SortedMap│
└───────┘ └─────────┘
               ▲
               │
          ┌─────────┐
          │ TreeMap │
          └─────────┘
```





### 2、普通排序



> 使用`TreeMap`时，放入的Key必须实现`Comparable`接口。`String`、`Integer`这些类已经实现了`Comparable`接口，因此可以直接作为Key使用。作为Value的对象则没有任何要求。



```java
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new TreeMap<>();
        map.put("orange", 1);
        map.put("apple", 2);
        map.put("pear", 3);
        for (String key : map.keySet()) {
            System.out.println(key);
        }
        // apple, orange, pear
    }
}
```



### 3、自定义类的排序



>通过`Comparable`接口实现一个自定义排序算法：
>
>- String类型通过compareTo()方法比较，int通过`-`比较！
>- 不需要覆写`equals()`和`hashCode()`，因为`TreeMap`不使用`equals()`和`hashCode()`。
>
>在创建TreeMap时的参数中传入排序算法：

```java
package com.learn.java;

import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

public class TreeMapTest {
    public static void main(String[] args) {
        Map<Person1, Integer> map = new TreeMap<>(new Comparator<Person1>() {
            @Override
            public int compare(Person1 o1, Person1 o2) {
                return o1.name.compareTo(o2.name);
            }
        });

        map.put(new Person1("Tom"), 1);
        map.put(new Person1("Bob"), 2);
        map.put(new Person1("Lily"), 3);

        for(var key : map.keySet()){
            System.out.println(key);
        }

        for(var entry : map.entrySet()){
            System.out.println(entry.getKey() + " " + entry.getValue());
        }

        System.out.println(map.get(new Person1("Lily"))); // 3
    }
}

class Person1{
    public String name;

    Person1(String name){
        this.name = name;
    }

   public String toString(){
        return "name: " + name;
   }
}
```



## 八、使用Properties



> 在编写应用程序的时候，经常需要读写配置文件！
>
> 配置文件的特点是，它的Key-Value一般都是`String`-`String`类型的，因此我们完全可以用`Map`来表示它。
>
> 因为配置文件非常常用，所以Java集合库提供了一个`Properties`来表示一组“配置”。由于历史遗留原因，`Properties`内部本质上是一个`Hashtable`，但我们只需要用到`Properties`自身关于读写配置的接口。





### 1、读取配置文件

> 用`Properties`读取配置文件非常简单。Java默认配置文件以`.properties`为扩展名，每行以`key=value`表示，以`#`课开头的是注释。以下是一个典型的配置文件：



- 配置文件实例：

```properties
# setting.properties

last_open_file=/data/hello.txt
auto_save_interval=60
```

- 读取步骤：



`Properties`读取配置文件，一共有三步：

1. 创建`Properties`实例；
2. 调用`load()`读取文件；
3. 调用`getProperty()`获取配置。（如果key不存在，将返回`null`。我们还可以提供一个默认值，这样，当key不存在的时候，就返回默认值。）

> 也可以从classpath读取`.properties`文件，因为`load(InputStream)`方法接收一个`InputStream`实例，表示一个字节流，它不一定是文件流，也可以是从jar包中读取的资源流！



```java
// 读取步骤：
String f = "setting.properties";
Properties props = new Properties();
props.load(new java.io.FileInputStream(f));
// 获取属性值：
String filepath = props.getProperty("last_open_file");
String interval = props.getProperty("auto_save_interval", "120");

// 从classpath读取配置文件：
Properties props = new Properties();
props.load(getClass().getResourceAsStream("/common/setting.properties"));
```



### 2、配置读取实例



> 从内存读取一个字节流：



```java
package com.learn.java;

import java.io.ByteArrayInputStream;
import java.util.Properties;

public class PropertiesTest {
    public static void main(String[] args) throws Exception{
        String settings = "# test" + "\n" + "course=Java" + "\n" + "last_open_date=2019-08-07T12:35:01";
        ByteArrayInputStream input = new ByteArrayInputStream(settings.getBytes("UTF-8"));
        Properties props = new Properties();
        props.load(input);

        System.out.println("course: " + props.getProperty("course"));
        System.out.println("last_open_date: " + props.getProperty("last_open_date"));
        System.out.println("last_open_file: " + props.getProperty("last_open_file"));
        System.out.println("auto_save: " + props.getProperty("auto_save", "60"));
    }
}
```

输出结果：

```
course: Java
last_open_date: 2019-08-07T12:35:01
last_open_file: null
auto_save: 60
```



### 3、多配置文件



> 可以反复调用`load()`读取，后读取的key-value会覆盖已读取的key-value：
>
> 下面的代码演示了`Properties`的一个常用用法：可以把默认配置文件放到classpath中，然后，根据机器的环境编写另一个配置文件，覆盖某些默认的配置。



```java
Properties props = new Properties();
props.load(getClass().getResourceAsStream("/common/setting.properties"));
props.load(new FileInputStream("C:\\conf\\setting.properties"));
```

`Properties`设计的目的是存储`String`类型的key－value，但`Properties`实际上是从`Hashtable`派生的，它的设计实际上是有问题的，但是为了保持兼容性，现在已经没法修改了。除了`getProperty()`和`setProperty()`方法外，还有从`Hashtable`继承下来的`get()`和`put()`方法，这些方法的参数签名是`Object`，我们在使用`Properties`的时候，不要去调用这些从`Hashtable`继承下来的方法。



### 4、写入配置文件





> 使用`setProperty()`方法修改`Properties`实例；
>
> 可以把配置写入文件，以便下次启动时获得最新配置。写入配置文件使用`store()`方法！



```java
Properties props2 = new Properties();
props2.setProperty("url", "https://itnxd.eu.org/");
props2.setProperty("language", "Java");
//E:\MyJavaProgram\Settings 已写入我的E盘
props2.store(new FileOutputStream("E:\\MyJavaProgram\\Settings\\setting.properties"), "这是写入的properties注释");

```



结果如下：

> 第一行是“这是写入的properties注释”的Unicode编码！
>
> 第二行是生成的时间：
>
> 后面是你设置的属性！

```properties
#\u8FD9\u662F\u5199\u5165\u7684properties\u6CE8\u91CA
#Wed Apr 08 21:58:45 CST 2020
url=https\://itnxd.eu.org/
language=Java
```



### 5、编码



> 早期版本的Java规定`.properties`文件编码是ASCII编码（ISO8859-1），如果涉及到中文就必须用`name=\u4e2d\u6587`来表示，非常别扭。从JDK9开始，Java的`.properties`文件可以使用UTF-8编码了。
>
> 不过，需要注意的是，由于`load(InputStream)`默认总是以ASCII编码读取字节流，所以会导致读到乱码。我们需要用另一个重载方法`load(Reader)`读取！
>
> 就可以正常读取中文。`InputStream`和`Reader`的区别是一个是字节流，一个是字符流。字符流在内存中已经以`char`类型表示了，不涉及编码问题。





```java
Properties props3 = new Properties();
props3.load(new FileReader("E:\\MyJavaProgram\\Settings\\setting.properties", StandardCharsets.UTF_8));
System.out.println(props3.getProperty("language")); // Java
System.out.println(props3.getProperty("url")); // https://itnxd.eu.org/
```











## 九、使用Set





>`Map`用于存储key-value的映射，对于充当key的对象，是不能重复的，并且，不但需要正确覆写`equals()`方法，还要正确覆写`hashCode()`方法。
>
>如果我们只需要存储不重复的key，并不需要存储映射的value，那么就可以使用`Set`。
>
>`Set`实际上相当于只存储key、不存储value的`Map`。我们经常用`Set`用于去除重复元素。
>
>因为放入`Set`的元素和`Map`的key类似，都要正确实现`equals()`和`hashCode()`方法，否则该元素无法正确地放入`Set`。





### 1、常用方法



- 将元素添加进`Set`：`boolean add(E e)`
- 将元素从`Set`删除：`boolean remove(Object e)`
- 判断是否包含元素：`boolean contains(Object e)`



```java
package com.learn.java;

import java.util.HashSet;
import java.util.Set;

public class SetTest {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        System.out.println(set.add("abc")); // true
        System.out.println(set.add("xyz")); // true
        System.out.println(set.add("xyz")); // false，添加失败，因为元素已存在
        System.out.println(set.contains("xyz")); // true，元素存在
        System.out.println(set.contains("XYZ")); // false，元素不存在
        System.out.println(set.remove("hello")); // false，删除失败，因为元素不存在
        System.out.println(set.size()); // 2，一共两个元素
    }
}
```





### 2、Set实现代码简化版



> 最常用的`Set`实现类是`HashSet`，实际上，`HashSet`仅仅是对`HashMap`的一个简单封装，它的核心代码如下：

```java
public class HashSet<E> implements Set<E> {
    // 持有一个HashMap:
    private HashMap<E, Object> map = new HashMap<>();

    // 放入HashMap的value:
    private static final Object PRESENT = new Object();

    public boolean add(E e) {
        // 放入成功会返回null，失败返回旧value
        return map.put(e, PRESENT) == null;
    }

    public boolean contains(Object o) {
        return map.containsKey(o);
    }

    public boolean remove(Object o) {
        // 删除成功返回value,失败返回null
        return map.remove(o) == PRESENT;
    }
}
```





### 3、两种Set实现类



- `HashSet`是无序的，因为它实现了`Set`接口，并没有实现`SortedSet`接口；
- `TreeSet`是有序的，因为它实现了`SortedSet`接口。



继承关系如下：



```ascii
       ┌───┐
       │Set│
       └───┘
         ▲
    ┌────┴─────┐
    │          │
┌───────┐ ┌─────────┐
│HashSet│ │SortedSet│
└───────┘ └─────────┘
               ▲
               │
          ┌─────────┐
          │ TreeSet │
          └─────────┘
```



#### 3.1 HashSet



> 是无序的，类似HashMap！
>
> 自定义类同样需要实现`equals()` 和 `hashCode()`方法！



#### 3.2 TreeSet



> 实现了`SortedSet`接口！
>
> 自定义类必须正确实现`Comparable`接口！
>
> TreeSet不需要覆写`equals()`和`hashCode()`方法：



> [关于TreeSet不需要覆写两个方法！](https://zhidao.baidu.com/question/181297973472160204.html)



```java
package com.learn.java;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class TreeSetTest {
    public static void main(String[] args) {
        Set<Person2> set = new TreeSet<>(new Comparator<Person2>() {
            @Override
            public int compare(Person2 o1, Person2 o2) {
                if(o1.age != o2.age) return o1.age - o2.age;
                else return o1.name.compareTo(o2.name);
            }
        });

        set.add(new Person2("hello", 25));
        set.add(new Person2("world", 25));
        set.add(new Person2("abc", 30));
        set.add(new Person2("abc", 30));

        for (var p : set){
            System.out.println(p.toString());
        }
    }
}

class Person2{
    public String name;
    public int age;

    Person2(String name, int age){
        this.age = age;
        this.name = name;
    }

    @Override
    public String toString(){
        return this.name + " " + this.age;
    }

    /* 不需要覆写：
    @Override
    public boolean equals(Object o){
        if(o instanceof Person2){
            Person2 p = (Person2) o;
            return Objects.equals(this.name, p.name) && this.age == p.age;
        }
        return false;
    }

    @Override
    public int hashCode(){
        return Objects.hash(name, age);
    }*/
}
```





### 4、一个去重例子



> 在聊天软件中，发送方发送消息时，遇到网络超时后就会自动重发，因此，接收方可能会收到重复的消息，在显示给用户看的时候，需要首先去重，使用Set去重！
>
> 注释中的两种方法：



```java
package com.learn.java;

import java.util.*;

public class TreeSetTest02 {
    public static void main(String[] args){
        List<Message> received = List.of(
                new Message(1, "Hello!"),
                new Message(2, "发工资了吗？"),
                new Message(2, "发工资了吗？"),
                new Message(3, "去哪吃饭？"),
                new Message(3, "去哪吃饭？"),
                new Message(4, "Bye")
        );
        List<Message> displayMessages = process(received);
        for (Message message : displayMessages) {
            System.out.println(message.text);
        }
    }

    static List<Message> process(List<Message> received) {
        // TODO: 按sequence去除重复消息
        
        // 方法一：通过覆写equals和hashCode方法，来使用Set去重
		/*Set<Message> set = new HashSet<>();
        List<Message> ls = new ArrayList<>();
        for(var list : received) {
            if (set.add(list)) ls.add(list);
        }
        return ls;*/

        // 方法二：使用TreeSet进行去重，不需要覆写那两个方法：当然必须实现一个Comparator方法
        Set<Message> set = new TreeSet<>(new Comparator<Message>() {
            @Override
            public int compare(Message o1, Message o2) {
                // 这里随便，按照sequence从小到大排
                return o1.sequence - o2.sequence;
            }
        });

		// 将原List放入TreeSet自动实现去重
        set.addAll(received);
        // 返回一个由Set构造的List
        return new ArrayList<Message>(set);
    }
}

class Message {
    public final int sequence;
    public final String text;
    public Message(int sequence, String text) {
        this.sequence = sequence;
        this.text = text;
    }
    /* 方法一的覆写：
    @Override
    public boolean equals(Object o){
        if(o instanceof Message){
            Message m = (Message) o;
            return Objects.equals(this.text, m.text) && this.sequence == m.sequence;
        }
        return false;
    }

    @Override
    public int hashCode(){
        return Objects.hash(sequence, text);
    }*/
}
```





## 十、使用Queue



>队列（`Queue`）是一种经常使用的集合。`Queue`实际上是实现了一个先进先出（FIFO：First In First Out）的有序表。它和`List`的区别在于，`List`可以在任意位置添加和删除元素，而`Queue`只有两个操作：

- 把元素添加到队列末尾；
- 从队列头部取出元素。







### 1、常用方法



- `int size()`：获取队列长度；
- `boolean add(E)`/`boolean offer(E)`：添加元素到队尾；
- `E remove()`/`E poll()`：获取队首元素并从队列中删除；
- `E element()`/`E peek()`：获取队首元素但并不从队列中删除。



关于上面方法的区别：



|                    | THROW EXCEPTION | 返回false或null    |
| :----------------- | :-------------- | ------------------ |
| 添加元素到队尾     | add(E e)        | boolean offer(E e) |
| 取队首元素并删除   | E remove()      | E poll()           |
| 取队首元素但不删除 | E element()     | E peek()           |



- add方法超过队列容量会抛出异常，offer方法超过队列容量会返回false；
- remove方法删除空队列会抛出异常，poll方法删除空队列会返回null;
- ....







```java
package com.learn.java;

import java.util.LinkedList;
import java.util.Queue;

public class QueueTest {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();

        System.out.println(queue.peek()); // null
        //System.out.println(queue.element()); // throws NoSuchElementException
        System.out.println(queue.poll()); // null
        //System.out.println(queue.remove()); // throws NoSuchElementException

        queue.offer("hello");
        queue.offer("world");
        queue.add("add");

        System.out.println(queue.size()); // 3
        // 获取队首并删除
        System.out.println(queue.remove()); // hello
        System.out.println(queue.poll()); // world
        // 获取队首不删除
        System.out.println(queue.element()); // add
        System.out.println(queue.peek()); // add
    }
}
```



### 2、注意点



- 注意：不要把`null`添加到队列中，否则`poll()`方法返回`null`时，很难确定是取到了`null`元素还是队列为空。



- `LinkedList`即实现了`List`接口，又实现了`Queue`接口，但是，在使用的时候，如果我们把它当作List，就获取List的引用，如果我们把它当作Queue，就获取Queue的引用：



```java
// 这是一个List:
List<String> list = new LinkedList<>();
// 这是一个Queue:
Queue<String> queue = new LinkedList<>();
```





## 十一、使用PriorityQueue



> 用来实现“VIP插队”的业务！
>
> `PriorityQueue`和`Queue`的区别在于，它的出队顺序与元素的优先级有关，对`PriorityQueue`调用`remove()`或`poll()`方法，返回的总是优先级最高的元素。



### 1、标准类的优先队列



> 所谓不需要实现Comparable接口，因为Java已经实现了这些标准类了！
>
> String当然是按照字母顺序来排列的！



```java
package com.learn.java;

import java.util.PriorityQueue;

public class PriorityQueueTest01 {
    public static void main(String[] args) {
        PriorityQueue<String> pq = new PriorityQueue<>();
        pq.offer("hello");
        pq.offer("world");
        pq.offer("ababa");

        for(var s : pq){
            System.out.println(s);
        }
    }
}
```



### 2、自定义类的优先队列



> 和TreeSet一样，实现一个Comparator对象即可！







```java
package com.learn.java;

import java.util.Comparator;
import java.util.PriorityQueue;

public class PriorityQueueTest02 {
    public static void main(String[] args) {
        PriorityQueue<User>  pq = new PriorityQueue<User>(new Comparator<User>() {
            @Override
            public int compare(User o1, User o2) {
                if(o1.age == o2.age){
                    return o1.name .compareTo(o2.name);
                }
                return o1.age - o2.age;
            }
        });

        pq.offer(new User("hello", 25));
        pq.offer(new User("world", 10));
        pq.offer(new User("abcde", 25));
        pq.offer(new User("cfgeg", 30));

        while (!pq.isEmpty()){
            System.out.println(pq.poll());
        }

    }
}

class User{
    public String name;
    public int age;

    User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString(){
        return name + " " + age;
    }
}
```





- 也可以这样写



```java
package com.learn.java;

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;

public class PriorityQueueTest03 {
    public static void main(String[] args) {
        Queue<Users> pq = new PriorityQueue<Users>(new UsersComparator());

        pq.offer(new Users("hello", 25));
        pq.offer(new Users("world", 10));
        pq.offer(new Users("abcde", 25));
        pq.offer(new Users("cfgeg", 30));

        while (!pq.isEmpty()){
            System.out.println(pq.poll());
        }
    }
}

class UsersComparator implements Comparator<Users> {
    public int compare(Users o1, Users o2) {
        if(o1.age == o2.age){
            return o1.name .compareTo(o2.name);
        }
        return o1.age - o2.age;
    }
}

class Users{
    public String name;
    public int age;

    public Users(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString(){
        return name + " " + age;
    }
}
```





## 十二、使用Deque





> `Deque`是一个接口，它的实现类有`ArrayDeque`和`LinkedList`。
>
> `LinkedList`真是一个全能选手，它即是`List`，又是`Queue`，还是`Deque`的接口！
>
> 两头都进，两头都出，这种队列叫双端队列（Double Ended Queue），学名`Deque`。



### 1、常用方法



|                    | queue                  | Deque                           |
| :----------------- | :--------------------- | ------------------------------- |
| 添加元素到队尾     | add(E e) / offer(E e)  | addLast(E e) / offerLast(E e)   |
| 取队首元素并删除   | E remove() / E poll()  | E removeFirst() / E pollFirst() |
| 取队首元素但不删除 | E element() / E peek() | E getFirst() / E peekFirst()    |
| 添加元素到队首     | 无                     | addFirst(E e) / offerFirst(E e) |
| 取队尾元素并删除   | 无                     | E removeLast() / E pollLast()   |
| 取队尾元素但不删除 | 无                     | E getLast() / E peekLast()      |





```java
package com.learn.java;

import java.util.Deque;
import java.util.LinkedList;

public class DequeTest01 {
    public static void main(String[] args) {
        Deque<String> deque = new LinkedList<>();
        deque.offerLast("A"); // A
        deque.offerLast("B"); // B -> A
        deque.offerFirst("C"); // B -> A -> C
        System.out.println(deque.pollFirst()); // C, 剩下B -> A
        System.out.println(deque.pollLast()); // B
        System.out.println(deque.pollFirst()); // A
        System.out.println(deque.pollFirst()); // null
    }
}
```



### 2、一些建议



- `Deque`接口实际上扩展自`Queue`！`Queue`提供的`add()`/`offer()`方法在`Deque`中也可以使用，但是，使用`Deque`，最好不要调用`offer()`，而是调用`offerLast()`：



```java
public interface Deque<E> extends Queue<E> {
    ...
}
```





- 不要使用接口去实例化

> 尽量持有接口，而不是具体的实现类。

```java
// 不推荐的写法:
LinkedList<String> d1 = new LinkedList<>();
d1.offerLast("z");
// 推荐的写法：
Deque<String> d2 = new LinkedList<>();
d2.offerLast("z");
```



## 十三、使用Stack



> 栈（Stack）是一种后进先出（LIFO：Last In First Out）的数据结构。





`Stack`只有入栈和出栈的操作：

- 把元素压栈：`push(E)`；
- 把栈顶的元素“弹出”：`pop(E)`；
- 取栈顶元素但不弹出：`peek(E)`。

在Java中，我们用`Deque`可以实现`Stack`的功能：

- 把元素压栈：`push(E)`/`addFirst(E)`；
- 把栈顶的元素“弹出”：`pop(E)`/`removeFirst()`；
- 取栈顶元素但不弹出：`peek(E)`/`peekFirst()`。



>Java的集合类没有单独的`Stack`接口呢？因为有个遗留类名字就叫`Stack`，出于兼容性考虑，所以没办法创建`Stack`接口，只能用`Deque`接口来“模拟”一个`Stack`了。
>
>当我们把`Deque`作为`Stack`使用时，注意只调用`push()`/`pop()`/`peek()`方法，不要调用`addFirst()`/`removeFirst()`/`peekFirst()`方法，这样代码更加清晰。
>
>不要使用遗留类`Stack`。使用Deque来实现Stack即可！





### 1、一个例子



> 使用Stack实现十进制转化为十六进制：



```java
package com.learn.java;

import java.util.Deque;
import java.util.LinkedList;

public class StackTest {
    public static void main(String[] args) {
        String hex = toHex(12500);
        if (hex.equalsIgnoreCase("30D4")) {
            System.out.println("测试通过");
        } else {
            System.out.println("测试失败");
        }
    }

    static String toHex(int n) {
        Deque<String> stack = new LinkedList<>();

        String[] str = {"0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"};

        while(n != 0){
            int t = n % 16; n /= 16;
            stack.push(str[t]);
        }
        
        StringBuilder s = new StringBuilder();
        while(!stack.isEmpty()) {
            s.append(stack.pop());
        }
        return s.toString();
    }
}
```





## 十四、使用Iterator





### 1、`for each`遍历的实现



> Java编译器并不知道如何遍历`List`。上述代码能够编译通过，只是因为编译器把`for each`循环通过`Iterator`改写为了普通的`for`循环：



```java
List<String> list = List.of("Apple", "Orange", "Pear");
for (String s : list) {
    System.out.println(s);
}

// 编译器编译为如下：
for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
     String s = it.next();
     System.out.println(s);
}
```



### 2、迭代器



> 我们把这种通过`Iterator`对象遍历集合的模式称为迭代器。
>
> 使用迭代器的好处在于，调用方总是以统一的方式遍历各种集合类型，而不必关系它们内部的存储结构。
>
> 这样一来，调用方就必须知道集合的内部存储结构。并且，如果把`ArrayList`换成`LinkedList`，`get(int)`方法耗时会随着index的增加而增加。如果把`ArrayList`换成`Set`，上述代码就无法编译，因为`Set`内部没有索引。
>
> 用`Iterator`遍历就没有上述问题，因为`Iterator`对象是集合对象自己在内部创建的，它自己知道如何高效遍历内部的数据集合，调用方则获得了统一的代码，编译器才能把标准的`for each`循环自动转换为`Iterator`遍历。





### 3、编写Iterator



我们自己编写了一个集合类，想要使用`for each`循环，只需满足以下条件：

- 集合类实现`Iterable`接口，该接口要求返回一个`Iterator`对象；
- 用`Iterator`对象迭代集合内部数据。

这里的关键在于，集合类通过调用`iterator()`方法，返回一个`Iterator`对象，这个对象必须自己知道如何遍历该集合。





> 一个例子：实现List逆序的迭代器！
>
> 稍有点复杂，要记得多看多练多查资料！





```java
package com.learn.java;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorTest {
    public static void main(String[] args) {
        ReverseList<String> rlist = new ReverseList<>();
        rlist.add("Apple");
        rlist.add("Orange");
        rlist.add("Pear");
        for (String s : rlist) {
            System.out.println(s);
        }
    }
}

class ReverseList<T> implements Iterable<T> {
	// 内部使用List存储
    private List<T> list = new ArrayList<>();

    public void add(T t) {
        list.add(t);
    }

    @Override
    // 覆写Iterator方法：
    public Iterator<T> iterator() {
        return new ReverseIterator(list.size());
    }
	
    // 实现迭代器：内部类：
    class ReverseIterator implements Iterator<T> {
        int index;
		
        // 内部类构造方法：
        ReverseIterator(int index) {
            this.index = index;
        }

        @Override
        // 覆写hasNext
        public boolean hasNext() {
            return index > 0;
        }

        @Override
        // 覆写next
        public T next() {
            index--;
            // 从index输出，即从后向前，访问外部类ReverseList的list的get方法来获取元素：
            return ReverseList.this.list.get(index);
        }
    }
}
```





## 十五、使用Collections





> `Collection`，它是除`Map`外所有其他集合类的根接口，来自于`java.util`包！
>
> `Collections`是JDK提供的工具类，同样位于`java.util`包中。它提供了一系列静态方法，能更方便地操作各种集合。
>
> 注意Collections结尾多了一个s，不是Collection！



### 1、addAll方法



> 方法可以给一个`Collection`类型的集合添加若干元素。因为方法签名是`Collection`，所以我们可以传入`List`，`Set`等各种集合类型。

```java
public static boolean addAll(Collection<? super T> c, T... elements) { ... }
```



```java
package com.learn.java;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        List<String> list2 = List.of("hello", "world", "hello");
        // 1. 分开写
        /*Set<String> set = new HashSet<>();
        set.addAll(list2);*/
        // 2.直接可以合并
        Set<String> set1 = new HashSet<>(list2);
        for(var s : set1){
            System.out.println(s);
        }
    }
}
```



### 2、创建空集合



- 创建空List：`List emptyList()`
- 创建空Map：`Map emptyMap()`
- 创建空Set：`Set emptySet()`



> 要注意到返回的空集合是不可变集合，无法向其中添加或删除元素。
>
> 其他类还可以用`类.of()`方法来创建空集合！



```java
package com.learn.java;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        List<String> list = Collections.emptyList();
        List<String> list1 = List.of();
        list.add("hello"); // throws UnsupportedOperationException
        list1.add("hello"); // throws UnsupportedOperationException
        Map<String, Integer> map = Collections.emptyMap();
    }
}
```



### 3、创建单元素集合



- 创建一个元素的List：`List singletonList(T o)`
- 创建一个元素的Map：`Map singletonMap(K key, V value)`
- 创建一个元素的Set：`Set singleton(T o)`



> 要注意到返回的单元素集合也是不可变集合，无法向其中添加或删除元素。
>
> 也可以用各个集合接口提供的`of(T...)`方法创建单元素集合
>
> 使用`of()`方法创建的都是不变集合，无法进行增删！
>
> 使用`of()`方法可以实现任意大小的不变集合，比Collections更加方便！



```java
List<String> list5 = List.of("apple");
List<String> list6 = Collections.singletonList("apple");
list5.add("hhh"); // UnsupportedOperationException

List<String> list7 = List.of(); // empty list
 List<String> list8 = List.of("apple"); // 1 element
List<String> list3 = List.of("apple", "pear"); // 2 elements
List<String> list4 = List.of("apple", "pear", "orange"); // 3 elements

list3.add("hello"); // UnsupportedOperationException
```

### 4、排序



> `Collections`可以对`List`进行排序。因为排序会直接修改`List`元素的位置，因此必须传入可变`List`：
>
> 只能对List排序！

```java
package com.learn.java;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        List<String> list01 = new ArrayList<>();
        list01.add("apple");
        list01.add("pear");
        list01.add("orange");
        // 排序前:
        System.out.println(list01); // [apple, pear, orange]
        Collections.sort(list01);
        // 排序后:
        System.out.println(list01); // [apple, orange, pear]
    }
}
```





### 5、洗牌算法



> `Collections`提供了洗牌算法，即传入一个有序的`List`，可以随机打乱`List`内部元素的顺序，效果相当于让计算机洗牌：
>
> 只针对List！

```java
package com.learn.java;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        List<Integer> list02 = new ArrayList<>();
        for (int i=0; i<10; i++) {
            list02.add(i);
        }
        // 洗牌前:
        System.out.println(list02); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        Collections.shuffle(list02);
        // 洗牌后:
        System.out.println(list02); // [5, 7, 1, 4, 9, 2, 6, 0, 8, 3]
    }
}
```





### 6、不可变集合



`Collections`还提供了一组方法把可变集合封装成不可变集合：

- 封装成不可变List：`List unmodifiableList(List list)`
- 封装成不可变Set：`Set unmodifiableSet(Set set)`
- 封装成不可变Map：`Map unmodifiableMap(Map m)`



> 下面这种情况可以用`of()`方法代替，不过其他情况就不一定了，必须使用该方法了！



```java
package com.learn.java;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        List<String> mutable = new ArrayList<>();
        mutable.add("apple");
        mutable.add("pear");
        // 变为不可变集合:
        List<String> immutable = Collections.unmodifiableList(mutable);
        List<String> immutable = List.of("apple", "pear");
        immutable.add("orange"); // UnsupportedOperationException!
    }
}
```



- 继续对原始的可变`List`进行增删是可以的，并且，会直接影响到封装后的“不可变”`List`：

> 原List可修改，会影响到封装后的List！所以需要将原List扔掉！

```java
package com.learn.java;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        List<String> mutable = new ArrayList<>();
        mutable.add("apple");
        mutable.add("pear");
        // 变为不可变集合:
        List<String> immutable = Collections.unmodifiableList(mutable);
        List<String> immutable = List.of("apple", "pear");
        immutable.add("orange"); // UnsupportedOperationException!
        System.out.println(immutable); //[apple, pear]
        mutable.add("orange"); 
        System.out.println(immutable); //[apple, pear, orange]
    }
}
```



- 扔掉原List



> 操作：将原List置为null即可！





```java
package com.learn.java;

import java.util.*;

public class CollectionsTest {
    public static void main(String[] args) {
        List<String> mutable = new ArrayList<>();
        mutable.add("apple");
        mutable.add("pear");
        // 变为不可变集合:
        List<String> immutable = Collections.unmodifiableList(mutable);
        // 立刻扔掉mutable的引用:
        mutable = null;
         System.out.println(immutable); //[apple, pear]
    }
}
```



### 7、线程安全集合





`Collections`还提供了一组方法，可以把线程不安全的集合变为线程安全的集合：

- 变为线程安全的List：`List synchronizedList(List list)`
- 变为线程安全的Set：`Set synchronizedSet(Set s)`
- 变为线程安全的Map：`Map synchronizedMap(Map m)`

多线程的概念我们会在后面讲。因为从Java 5开始，引入了更高效的并发集合类，所以上述这几个同步方法已经没有什么用了。





<center style="color:red; font-size:25px">集合这一章完结，敬请期待后续章节！</center>