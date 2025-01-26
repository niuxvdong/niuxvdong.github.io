---
title: JVM学习总结
author: ITNXD
toc: true
abbrlink: 43777
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/08/06/d625a577df424a8e480bb87940d0debc.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/08/06/d625a577df424a8e480bb87940d0debc.png
categories:
  - JVM
tags:
  - JVM
date: 2022-01-14 13:31:39
updated:
---





# 一、什么是JVM







## 定义

Java Virtual Machine，JAVA程序的**运行环境**（JAVA二进制字节码的运行环境）

## 好处

- 一次编写，到处运行
- 自动内存管理，垃圾回收机制
- 数组下标越界检查
- 多态，使用虚方法机制调用实现

## 比较

JVM JRE JDK的区别



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/14/0b9147ca101a32aa7733d8a650b385bc.png)





























































# 二、内存结构





## 0、整体结构



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/14/b84becadbc0a8cba98a5ee2ad7ae5634.png)



- 方法区：类保存位置
- 堆：实例、对象保存位置
- 虚拟机栈、程序计数器、本地方法栈：实例对象调用方法时用到
- 解释器：解释字节码变为机器码
- JIT即时编译器：对热点数据优化处理
- 本地方法接口：Java无法实现的部分，根操作系统底层打交道的接口





## 1、程序计数器



### 定义



Program Counter Register 程序计数器（寄存器） 


### 作用

**用于保存JVM中下一条所要执行的指令的地址**



### 特点

- 线程私有
  - CPU会为每个线程分配时间片，当当前线程的时间片使用完以后，CPU就会去执行另一个线程中的代码
  - 程序计数器是**每个线程**所**私有**的，当另一个线程的时间片用完，又返回来执行当前线程的代码时，通过程序计数器可以知道应该执行哪一句指令
- 不会存在内存溢出
  - JVM中唯一一个内存不会溢出的规范





## 2、虚拟机栈





### 定义



Java Virtual Machine Stacks （Java 虚拟机栈）



- 每个**线程**运行需要的内存空间，称为**虚拟机栈**，多个线程多个虚拟机栈
- 每个栈由多个**栈帧**组成，对应着每个方法运行时所占用的内存（操作数栈，局部变量表、方法返回地址、动态链接）
- 每个线程只能有**一个活动栈帧**，对应着**当前正在执行的方法**



### 问题辨析



- 垃圾回收是否涉及栈内存？
  - **不需要**。因为虚拟机栈中是由一个个栈帧组成的，在方法执行完毕后，对应的栈帧就会被弹出栈。所以无需通过垃圾回收机制去回收内存。
  - 垃圾回收主要是回收**堆中**的无用对象
- 栈内存的分配越大越好吗？
  - 不是。因为**物理内存是一定的**，栈内存越大，可以支持更多的递归调用，但是可执行的线程数就会越少。
  - **解释**：物理内存空间一定，栈内存设置越大，由于每个线程都会占用一个虚拟机栈，因此虚拟机栈的个数，即线程数会大大降低
  - `-Xss`：可以指定栈大小
- 方法内的局部变量是否是线程安全的？（**逃逸分析**）
  - 如果方法内**局部变量没有逃离方法的作用范围**，则是**线程安全**的
  - 如果**局部变量引用了对象**，并**逃离了方法的作用范围**，则需要考虑线程安全问题







### 栈内存溢出





**Java.lang.stackOverflowError** 栈内存溢出



**发生原因**

- 虚拟机栈中，**栈帧过多**（无限递归）
- 每个栈帧**所占用过大**





### 线程运行诊断



CPU占用过高

- Linux环境下运行某些程序的时候，可能导致CPU的占用过高，这时需要定位占用CPU过高的线程
  - **top**命令，查看是哪个**进程**占用CPU过高
  - **ps H -eo pid, tid（线程id） %cpu | grep 刚才通过top查到的进程号** 通过ps命令进一步查看是哪个线程占用CPU过高
  - **jstack 进程id** 通过查看进程中的线程的nid，刚才通过ps命令看到的tid来**对比定位**，注意jstack查找出的线程id是**16进制的**，**需要转换**
  - 可以根据线程id 找到有问题的线程，进一步定位到问题代码的源码行号





## 3、本地方法栈



**Native Method Stack**

一些带有**native关键字**的方法就是需要JAVA去调用本地的C或者C++方法，因为JAVA有时候没法直接和操作系统底层交互，所以需要用到本地方法！





## 4、堆



#### 定义

Heap 堆

通过new关键字创建的对象都会被放在堆内存



#### 特点

- **所有线程共享**，堆内存中的对象都需要**考虑线程安全问题**
- 有垃圾回收机制





#### 堆内存溢出



**java.lang.OutofMemoryError** ：java heap space. 堆内存溢出

- `-Xmx`：设置堆内存大小



#### 堆内存诊断



1. jps 工具：查看当前系统中有哪些 java 进程
2. jmap 工具：查看堆内存占用情况  jmap -heap 进程id
3. jconsole 工具：图形界面的，多功能的监测工具，可以连续监测









## 5、方法区



Method Area



### 结构



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/14/33d7471bdee5af88e9c8d887b27958b2.png)



方法区类似接口，做规范！永久代和元空间为方法区的实现！

StringTable：字符串常量

- jdk1.8以前：永久代PermGen作为方法区的实现，字符串常量放在永久代的常量池
- jdk1.8及以后：元空间Metaspace作为方法区的实现，字符串常量和静态变量移动到了堆中







### 内存溢出



`-XX:MetaspaceSize=8m`：指定元空间大小

- **java.lang.OutofMemoryError** ：Metaspace

`-XX:MaxPermSize=8m`：指定永久代大小

- **java.lang.OutofMemoryError** ：PermGen sapce

`-Xmx10m`：字符串常量池爆了之后的错误

- **java.lang.OutofMemoryError** ：GC overhead limit exceeded

`-Xmx10m -XX:-UseGCOverheadLimit`：会关掉堆的GC

- **java.lang.OutofMemoryError** ：java heap space





### 常量池





二进制字节码的组成：

- 类的基本信息
- 常量池：地址和数据的映射关系，就是一张表
- 类的方法定义（包含了虚拟机指令）会用到常量池进行查表

**通过反编译来查看类的信息**：javap -v xxx.class



```java
❯ javap -v .\Demo1.class
// 类基本信息
Classfile /E:/IdeaProject/JVM/target/classes/com/itnxd/jvm/constant/Demo1.class
  Last modified 2022年1月14日; size 564 bytes
  SHA-256 checksum 9ccef1cb17e18fe2ec9045cbbc224e3645fa43545466c2f0fdf327728e75d265
  Compiled from "Demo1.java"
public class com.itnxd.jvm.constant.Demo1
  minor version: 0
  major version: 52
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #5                          // com/itnxd/jvm/constant/Demo1
  super_class: #6                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 2, attributes: 1

// 常量池
Constant pool:
   #1 = Methodref          #6.#20         // java/lang/Object."<init>":()V
   #2 = Fieldref           #21.#22        // java/lang/System.out:Ljava/io/PrintStream;
   #3 = String             #23            // hello world
   #4 = Methodref          #24.#25        // java/io/PrintStream.println:(Ljava/lang/String;)V
   #5 = Class              #26            // com/itnxd/jvm/constant/Demo1
   #6 = Class              #27            // java/lang/Object
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/itnxd/jvm/constant/Demo1;
  #14 = Utf8               main
  #15 = Utf8               ([Ljava/lang/String;)V
  #16 = Utf8               args
  #17 = Utf8               [Ljava/lang/String;
  #18 = Utf8               SourceFile
  #19 = Utf8               Demo1.java
  #20 = NameAndType        #7:#8          // "<init>":()V
  #21 = Class              #28            // java/lang/System
  #22 = NameAndType        #29:#30        // out:Ljava/io/PrintStream;
  #23 = Utf8               hello world
  #24 = Class              #31            // java/io/PrintStream
  #25 = NameAndType        #32:#33        // println:(Ljava/lang/String;)V
  #26 = Utf8               com/itnxd/jvm/constant/Demo1
  #27 = Utf8               java/lang/Object
  #28 = Utf8               java/lang/System
  #29 = Utf8               out
  #30 = Utf8               Ljava/io/PrintStream;
  #31 = Utf8               java/io/PrintStream
  #32 = Utf8               println
  #33 = Utf8               (Ljava/lang/String;)V
// 类的方法定义
{
  public com.itnxd.jvm.constant.Demo1();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 7: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/itnxd/jvm/constant/Demo1;

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=1, args_size=1
                  
         // 虚拟机中执行编译的方法（框内的是真正编译执行的内容，#号的内容需要在常量池中查找）
                  
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String hello world
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 10: 0
        line 11: 8
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  args   [Ljava/lang/String;
}
SourceFile: "Demo1.java"
```



### 运行时常量池



- **常量池**
  - 就是一张表（如上图中的constant pool），虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量信息
- **运行时常量池**
  - 常量池是*.class文件中的，当该**类被加载以后**，它的常量池信息就会**放入运行时常量池**，并把里面的**符号地址变为真实地址**





### 字符串常量池 StringTable



StringTable：字符串常量池底层就是HashTable，不能扩容！

jdk1.8串池被移动到了堆中！



**原因：**

- jdk1.7及以前：方法区实现是永久代，永久代只有老年代满了才会执行一次full gc，因此字符串常量池会很晚才会垃圾回收，真个系统会占用大量的字符串常量，若不及时回收，会导致内存占用，效率低下
- jdk1.8及以后：



**特征**

- 常量池中的字符串仅是符号，只有**在被用到时才会转化为对象**
  - 被用到：就是包含该符号的指令或方法真正被加载执行
- 串池中的字符串常量都是**不重复**的：利用串池的机制，来避免重复创建字符串对象



### 字符串常量拼接



- 字符串**变量**拼接的原理是**StringBuilder**
- 字符串**常量**拼接的原理是**编译器优化**



**注意**：

- 只要拼接双方有一个是变量则结果都在堆中！
- 若修饰双方变量的都有final，则此时就是编译期常量了，拼接的结果在字符串常量池中
- **建议**：针对final修饰类、方法、引用数据类型、基本数据类型时，建议加上final，可以使得加载的时机更早一些



```java
public static void main(String[] args) {

    String s1 = "a";
    String s2 = "b";
    String s3 = "ab"; // 处于堆中的字符串常量池
    
    // 常量拼接编译器优化：编译期间可以确定，相当于 String s4 = "ab"; 不会改变，直接从字符串常量池中获取了
    String s4 = "a" + "b";
    
    // 变量拼接StringBuilder：编译期间无法确定，运行时动态确定
    String s5 = s1 + s2; // 处于堆中，为一个new出来的对象
	/*
	String s5 = s1 + s2; 流程：
	
	    1. new StringBuilder()
        2. StringBuilder.append(a)
        2. StringBuilder.append(b)
        3. StringBuilder.toString() 调用的是new String(byte[])
        4. new String(byte[])
        	注意：这里构造函数传入的不是""，因此这里不会在字符串常量池中放一份
	*/
    
    System.out.println(s3 == s5); // false
}


// 反编译截取

 		 0: ldc           #2                  // String a
         2: astore_1
         3: ldc           #3                  // String b
         5: astore_2
         6: ldc           #4                  // String ab
         8: astore_3
         9: ldc           #4                  // String ab
        11: astore        4
        13: new           #5                  // class java/lang/StringBuilder
        16: dup
        17: invokespecial #6                  // Method java/lang/StringBuilder."<init>":()V
        20: aload_1
        21: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        24: aload_2
        25: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        28: invokevirtual #8                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
        31: astore        5


```





### intern方法



- 可以使用**intern方法**，主动将串池中还没有的字符串对象放入串池中
- **注意**：无论是串池还是堆里面的字符串，都是对象



- jdk1.7及以后：将这个字符串对象尝试放入串池，如果有则并不会放入，如果没有则放入串池为**对象的引用地址复制**，会把串池中的对象返回
  - 1.7及以后，由于字符串常量池移到了堆中，因此更好的操作是一个空间放一份即可，放多了浪费
  - 因此：intern方法执行完后，s2指向的是堆中的地址"ab"，s指向的是字符串常量池中的一个对象地址，该对象指向堆中的"ab"，也就是s2指向的就是堆中的"ab"
- jdk1.6及以前：将这个字符串对象尝试放入串池，如果有则并不会放入，如果没有会把此**对象复制一份**，放入串池，会把串池中的对象返回
  - 因此：intern方法返回的对象其实指向的是新拷贝的对象在字符串常量池的地址



```java
 public static void main(String[] args) {

     String x = "ab";

     // 注意：字符串常量池不会有"ab"，调用的不是new String(""),而是new String(byte[])
     String s = new String("a") + new String("b");

     // 将堆中的数据放一份到字符串常量池，如已有则不放，最终都是返回常量池中的对象
     String s2 = s.intern();

     // 一、若前面注释掉x一行
     System.out.println(s2 == "ab"); // true 都是字符串常量池
     System.out.println(s == "ab"); // jdk6 false jdk7/8 true

     // 二、添加x一行
     System.out.println(s == "ab"); // false
     
     System.out.println(s2 == "ab"); // true 都是常量池中的同一个对象

 }
```



### new String()创建几个对象





```java
String s = new String("a");
创建的对象有：
1. 堆中一个
2. 字符串常量池中的"a"一个

String s = new String("a") + new String("b");
创建的对象有：
1. new StringBuilder()
2. new String("a")
3. new String("b")
4. 字符串常量池的"a"
5. 字符串常量池的"b"
6. StringBuilder.toString() 调用的 new String(byte[])
    注意：new String("xxx")：会向字符串常量池放一份
         new String(byte[])：不会操作字符串常量池
```





### StringTable 垃圾回收





StringTable在内存紧张时，会发生垃圾回收

```java
/**
 * 演示 StringTable 垃圾回收
 * -Xmx10m -XX:+PrintStringTableStatistics -XX:+PrintGCDetails -verbose:gc
 */
public class Demo1_7 {
    public static void main(String[] args) throws InterruptedException {
        int i = 0;
        try {
            for (int j = 0; j < 100000; j++) { // j=100, j=10000
                String.valueOf(j).intern();
                i++;
            }
        } catch (Throwable e) {
            e.printStackTrace();
        } finally {
            System.out.println(i);
        }

    }
}
```



### StringTable 性能调优





- 因为StringTable是由HashTable实现的，所以可以**适当增加HashTable桶的个数**，来减少字符串放入串池所需要的时间

  ```java
  -XX:StringTableSize=桶个数（最小值为1009）
  桶太少会导致一个桶里放的数据太多，哈希冲突也会变大
  ```

  

- 考虑是否需要将字符串对象入池：可以通过**intern方法减少重复入池**



### 直接内存



Direct Memory

- **属于操作系统**，常见于NIO操作时，**用于数据缓冲区**
- **分配回收成本较高，但读写性能高**
- **不受JVM内存回收管理**



```java
public class Demo1_9 {
    static final String FROM = "E:\\编程资料\\第三方教学视频\\youtube\\Getting Started with Spring Boot-sbPSjI4tt10.mp4";
    static final String TO = "E:\\a.mp4";
    static final int _1Mb = 1024 * 1024;

    public static void main(String[] args) {
        io(); // io 用时：1535.586957 1766.963399 1359.240226
        directBuffer(); // directBuffer 用时：479.295165 702.291454 562.56592
    }

    private static void directBuffer() {
        long start = System.nanoTime();
        try (FileChannel from = new FileInputStream(FROM).getChannel();
             FileChannel to = new FileOutputStream(TO).getChannel();
        ) {
            ByteBuffer bb = ByteBuffer.allocateDirect(_1Mb);
            while (true) {
                int len = from.read(bb);
                if (len == -1) {
                    break;
                }
                bb.flip();
                to.write(bb);
                bb.clear();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long end = System.nanoTime();
        System.out.println("directBuffer 用时：" + (end - start) / 1000_000.0);
    }

    private static void io() {
        long start = System.nanoTime();
        try (FileInputStream from = new FileInputStream(FROM);
             FileOutputStream to = new FileOutputStream(TO);
        ) {
            byte[] buf = new byte[_1Mb];
            while (true) {
                int len = from.read(buf);
                if (len == -1) {
                    break;
                }
                to.write(buf, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long end = System.nanoTime();
        System.out.println("io 用时：" + (end - start) / 1000_000.0);
    }
}
```



**使用普通流读写数据：会有两次复制操作**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/b187842fc4be99d0fcb27ce7c1dd9087.png)



**使用NIO读写会分配直接内存，少了一次复制**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/4aa202a219bcc1ab633de6160612fd03.png)





### 直接内存溢出



**java.lang.OutofMemoryError** ：Direct buffer Memory



```java
public class Demo1_10 {
    static int _100Mb = 1024 * 1024 * 100;

    public static void main(String[] args) {
        List<ByteBuffer> list = new ArrayList<>();
        int i = 0;
        try {
            while (true) {
                ByteBuffer byteBuffer = ByteBuffer.allocateDirect(_100Mb);
                list.add(byteBuffer);
                i++;
            }
        } finally {
            System.out.println(i);
        }
    }
}
```





### 直接内存回收释放原理



- 直接内存回收不是Java虚拟机的垃圾回收
- 使用的是底层的Unsafe方法，调用的是顶层操作系统的释放内存方法



**通过反射得到Unsafe方法来对直接内存进行释放：**



```java
public class Demo1_27 {
    static int _1Gb = 1024 * 1024 * 1024;

    public static void main(String[] args) throws IOException {
        Unsafe unsafe = getUnsafe();
        // 分配内存
        long base = unsafe.allocateMemory(_1Gb);
        unsafe.setMemory(base, _1Gb, (byte) 0);
        System.in.read();

        // 释放内存
        unsafe.freeMemory(base);
        System.in.read();
    }

    public static Unsafe getUnsafe() {
        try {
            Field f = Unsafe.class.getDeclaredField("theUnsafe");
            f.setAccessible(true);
            Unsafe unsafe = (Unsafe) f.get(null);
            return unsafe;
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
```



**详细原理**



DirectByteBuffer实现如下：**虚引用机制**
    1. 分配和回收都是调用操作系统的UNSAFE方法
    2. Cleaner 方法关联了一个任务回调对象，回调方法实现了Runnable接口，run方法调用了UNSAFE的释放内存方法
    3. Cleaner是一个虚引用对象，当他关联的对象（ByteBuffer）被Java才能进回收时，就会触发自己的clean方法
    4. clean方法会调用Runnable线程的run方法进行释放内存（底层会有一个引用handler监控虚引用对象）



- 使用了 Unsafe 对象完成直接内存的分配回收，并且回收需要主动调用 freeMemory 方法 
- ByteBuﬀer 的实现类内部，使用了 Cleaner （虚引用）来监测 ByteBuﬀer 对象，一旦ByteBuﬀer 对象被垃圾回收，那么就会由 **ReferenceHandler 线程**通过 Cleaner 的 clean 方法调用 freeMemory 来释放直接内存



```java
//通过ByteBuffer申请1M的直接内存
ByteBuffer byteBuffer = ByteBuffer.allocateDirect(_1M);
```

申请直接内存，但JVM并不能回收直接内存中的内容，它是如何实现回收的呢？

**allocateDirect的实现**

```java
public static ByteBuffer allocateDirect(int capacity) {
    return new DirectByteBuffer(capacity);
}
```

DirectByteBuffer类

```java
DirectByteBuffer(int cap) {   // package-private
   
    super(-1, 0, cap, cap);
    boolean pa = VM.isDirectMemoryPageAligned();
    int ps = Bits.pageSize();
    long size = Math.max(1L, (long)cap + (pa ? ps : 0));
    Bits.reserveMemory(size, cap);

    long base = 0;
    try {
        base = unsafe.allocateMemory(size); //申请内存
    } catch (OutOfMemoryError x) {
        Bits.unreserveMemory(size, cap);
        throw x;
    }
    unsafe.setMemory(base, size, (byte) 0);
    if (pa && (base % ps != 0)) {
        // Round up to page boundary
        address = base + ps - (base & (ps - 1));
    } else {
        address = base;
    }
    //通过虚引用，来实现直接内存的释放，this为虚引用的实际对
    cleaner = Cleaner.create(this, new Deallocator(base, size, cap)); 象
    att = null;
}
```

这里调用了一个Cleaner的create方法，且后台线程还会对虚引用的对象监测，如果虚引用的实际对象（这里是DirectByteBuffer）被回收以后，就会调用Cleaner的clean方法，来清除直接内存中占用的内存

```java
public void clean() {
       if (remove(this)) {
           try {
               this.thunk.run(); //调用run方法
           } catch (final Throwable var2) {
               AccessController.doPrivileged(new PrivilegedAction<Void>() {
                   public Void run() {
                       if (System.err != null) {
                           (new Error("Cleaner terminated abnormally", var2)).printStackTrace();
                       }

                       System.exit(1);
                       return null;
                   }
               });
           }Copy
```

对应对象的run方法

```java
public void run() {
    if (address == 0) {
        // Paranoia
        return;
    }
    unsafe.freeMemory(address); //释放直接内存中占用的内存
    address = 0;
    Bits.unreserveMemory(size, capacity);
}
```



### 禁用显示垃圾回收对直接内存释放影响



- -XX:+DisableExplicitGC：禁用显示垃圾回收，System.gc()将会失效，因此直接内存释放会受到影响
- 直接内存只有等到真正发生GC的时候才会去释放
- 但也可以通过Unsafe的方法手动释放直接内存



```java
public class Demo1_26 {
    static int _1Gb = 1024 * 1024 * 1024;

    /*
     * -XX:+DisableExplicitGC 显式的
     */
    public static void main(String[] args) throws IOException {
        ByteBuffer byteBuffer = ByteBuffer.allocateDirect(_1Gb);
        System.out.println("分配完毕...");
        System.in.read();
        System.out.println("开始释放...");
        byteBuffer = null;
        System.gc(); // 显式的垃圾回收，Full GC
        System.in.read();
    }
}
```















# 三、垃圾回收





## 1、如何判断对象可以回收





### 引用计数法



**弊端**：**循环引用**时，两个对象的计数都为1，导致两个对象都无法被释放





### 可达性分析算法



- JVM中的垃圾回收器通过**可达性分析**来探索所有存活的对象
- 扫描堆中的对象，看能否沿着GC Root对象为起点的引用链找到该对象，如果**找不到，则表示可以回收**
- 可以作为GC Root的对象
  - 本地方法栈：本地方法栈中JNI（即一般说的**Native方法**）引用的对象
  - Thread：虚拟机栈（**栈帧**中的**本地变量表**）中**引用的对象**。　
  - System Class：**系统核心类**
  - Busy Monitor：正在使用的**被加锁的对象**
  - 方法区中类静态属性引用的对象
  - 方法区中常量引用的对象



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/9fcfeeb1071535145539b24ce349a687.png)





### 五种引用



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/b79dc1b4f389e18ccc33bcbedced7a85.png)



1. **强引用**
   1. 只有所有 GC Roots 对象都不通过【强引用】引用该对象，该对象才能被垃圾回收
   2. 如上图B、C对象**都不强引用**A1对象时，A1对象才会被回收

2. **软引用（SoftReference）**
   1. 仅有软引用引用该对象时，在垃圾回收后，**内存仍不足**时会**再次**出发垃圾回收，回收软引用对象
   2. 可以配合引用队列来释放软引用自身
   3. 如上图如果B对象**不再强引用**A2对象**且内存不足**时，软引用所引用的A2对象就会被回收

3. **弱引用（WeakReference）**
   1. 仅有弱引用引用该对象时，在垃圾回收时，**无论内存是否充足**，都会回收，回收弱引用对象
   2. 可以配合引用队列来释放弱引用自身
   3. 如上图如果B对象不再引用A3对象，则A3对象会被回收

4. **虚引用（PhantomReference）**
   1. 必须配合引用队列使用，**主要配合 ByteBuﬀer** 使用，被引用对象回收时，会将虚引用入队，由 **Reference Handler 线程**调用虚引用相关方法释放直接内存
   2. 虚引用的一个体现是**释放直接内存所分配的内存**，当引用的对象ByteBuffer被垃圾回收以后，虚引用对象Cleaner就会被放入引用队列中，然后调用Cleaner的clean方法来释放直接内存
   3. 如上图，B对象不再引用ByteBuffer对象，ByteBuffer就会被回收。但是直接内存中的内存还未被回收。这时需要将虚引用对象Cleaner放入引用队列中，然后调用它的clean方法来释放直接内存

5. **终结器引用（FinalReference）**
   1. 无需手动编码，但其内部配合引用队列使用，在垃圾回收时，终结器引用**先入队**（被引用对象**暂时没有被回收**），再由 Finalizer 线程通过终结器引用找到被引用对象并调用它的 ﬁnalize方法，**第二次 GC** 时才能回收被引用对象
   2. 如上图，B对象不再引用A4对象。这是终结器对象就会被放入引用队列中，引用队列会根据它，找到它所引用的对象。然后调用被引用对象的finalize方法。调用以后，该对象就可以被垃圾回收了


**终接器引用补充：**

- 所有的类都继承自Object类，Object类有一个finalize方法。当某个对象不再被其他的对象所引用时，会先将终结器引用对象放入引用队列中，然后根据终结器引用对象找到它所引用的对象，然后调用该对象的finalize方法。调用以后，该对象就可以被垃圾回收了
- 处理终接器引用的FinalizeHandler的**线程优先级很低**，被执行机会很少，可能导致被引用对象迟迟不会释放，因此**不推荐使用finalize方法释放内存**



**引用队列**

- 软引用和弱引用**可以配合**引用队列
  - 在**弱引用**和**虚引用**所引用的对象被回收以后，会将这些引用放入引用队列中，方便一起回收这些软/弱引用对象
- 虚引用和终结器引用**必须配合**引用队列
  - 虚引用和终结器引用在使用时会关联一个引用队列





### 软引用应用



- 强引用：内存占满后会 java.lang.OutofMemoryError：java heap space
- 弱引用：内存紧张会时会**再次**出触发一次垃圾回收Full GC，使得内存一定可以放下下一步的占用



```java
/**
 * 演示软引用
 * -Xmx20m -XX:+PrintGCDetails -verbose:gc
 */
public class Demo2_3 {

    private static final int _4MB = 4 * 1024 * 1024;



    // 强引用
    public static void main(String[] args) throws IOException {
        /*List<byte[]> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            list.add(new byte[_4MB]);
        }

        System.in.read();*/
        soft();


    }

    public static void soft() {
        // list --> SoftReference --> byte[]

        List<SoftReference<byte[]>> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            SoftReference<byte[]> ref = new SoftReference<>(new byte[_4MB]);
            System.out.println(ref.get());
            list.add(ref);
            System.out.println(list.size());

        }
        System.out.println("循环结束：" + list.size());
        for (SoftReference<byte[]> ref : list) {
            // 四个null 一个有值
            System.out.println(ref.get());
        }
    }
}
```







### 软引用引用队列

- 关联了引用队列， 当软引用所关联的 byte[]被回收时，软引用自己会加入到 queue 中去
- 从队列中获取无用的软引用对象，并移除（从队列移除后自然软引用自身也会被下一次GC掉）

```java
/**
 * 演示软引用, 配合引用队列
 */
public class Demo2_4 {
    private static final int _4MB = 4 * 1024 * 1024;

    public static void main(String[] args) {
        List<SoftReference<byte[]>> list = new ArrayList<>();

        // 引用队列
        ReferenceQueue<byte[]> queue = new ReferenceQueue<>();

        for (int i = 0; i < 5; i++) {
            // 关联了引用队列， 当软引用所关联的 byte[]被回收时，软引用自己会加入到 queue 中去
            SoftReference<byte[]> ref = new SoftReference<>(new byte[_4MB], queue);
            System.out.println(ref.get());
            list.add(ref);
            System.out.println(list.size());
        }

        // 从队列中获取无用的 软引用对象，并移除（从队列移除后自然软引用自身也会被下一次GC掉）
        Reference<? extends byte[]> poll = queue.poll();
        while( poll != null) {
            list.remove(poll);
            poll = queue.poll();
        }

        System.out.println("===========================");
        for (SoftReference<byte[]> reference : list) {
            // 此时由于移除了软引用为null的，因此只会打印一次有值
            System.out.println(reference.get());
        }

    }
}
```





### 弱引用



- 软引用内存不够会再次触发一次Full GC
- 弱引用在垃圾回收时就会将一些弱引用对象进行回收，内存非常吃紧时候才会进行一次Full GC



```java
public class Demo2_5 {
    private static final int _4MB = 4 * 1024 * 1024;

    public static void main(String[] args) {
        //  list --> WeakReference --> byte[]
        List<WeakReference<byte[]>> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            WeakReference<byte[]> ref = new WeakReference<>(new byte[_4MB]);
            list.add(ref);
            for (WeakReference<byte[]> w : list) {
                System.out.print(w.get()+" ");
            }
            System.out.println();

        }
        System.out.println("循环结束：" + list.size());
    }
}
```





## 2、垃圾回收算法



### 标记清除

Mark Sweep

**定义**：标记清除算法顾名思义，是指在虚拟机执行垃圾回收的过程中，先采用标记算法确定可回收对象，然后垃圾回收器根据标识清除相应的内容，给堆内存腾出相应的空间

- 这里的腾出内存空间并不是将内存空间的字节清0，而是**记录下这段内存的起始结束地址**，下次分配内存的时候，会直接**覆盖**这段内存

优点：速度快

**缺点**：**容易产生大量的内存碎片**，可能无法满足大对象的内存分配，一旦导致无法分配对象，那就会导致jvm启动gc，一旦启动gc，我们的应用程序就会暂停，这就导致应用的响应速度变慢







### 标记整理

Mark Compact



标记-整理：会将不被GC Root引用的对象回收，清楚其占用的内存空间。然后整理剩余的对象，可以有效避免因内存碎片而导致的问题，但是因为整体需要消耗一定的时间，所以**效率较低**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/8f304731c0f2286838026d6f481e7869.png)





### 复制算法

Copy

将内存分为等大小的两个区域，FROM和TO（TO中为空）。先将被GC Root引用的对象从FROM放入TO中，再回收不被GC Root引用的对象。然后交换FROM和TO。

优点：这样也可以避免内存碎片的问题

缺点：但是会占用双倍的内存空间



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/205fe28736db1a8067c231dffd276e7d.png)



### 复制与标记整理对比



**复制的性能好于标记整理？**

- 复制：直接进行大片内存移动即可，
- 标记整理：整理本身就是复制的过程，但是确比复制更加复制，产生很多碎片，得判断碎片大小，移动位置





### 总结



JVM是根据具体情况，选择一个或多个垃圾回收算法协同工作！





## 3、分代垃圾回收





### 堆内存划分



**堆内存被划分为：**

- 新生代：适合用完就回收的 **Minor GC** **默认空间比例：8:1:1**
  - 伊甸园区
  - 幸存区From
  - 幸存区To
- 老年代：后续还要使用的



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/1f5e14c33e17ea8fbb77ef128025a038.png)



### GC流程



1. 对象首先分配在伊甸园区域
2. 伊甸园空间不足时，触发 minor gc，伊甸园和 from 存活的对象使用 copy 复制到 to 中，存活的对象年龄加 1并且**交换 from to**
3. minor gc 会引发 stop the world，暂停其它用户的线程，等垃圾回收结束，用户线程才恢复运行 （防止线程使用的内存地址不匹配，出现问题，回收时间很快）
4. 当对象寿命超过阈值时，会晋升至老年代，**最大**寿命是15（4bit）（最大不是一定，某些情到不了15）
5. 当老年代空间不足，会先尝试触发 **minor gc**，如果之后空间仍不足，那么触发 **full gc**，**STW**（stop the world）的**时间更长**





### 相关 JVM 参数





- 堆初始大小：-Xms
- 堆最大大小：-Xmx 或 -XX:MaxHeapSize=size
- 新生代大小：-Xmn 或 (-XX:NewSize=size + -XX:MaxNewSize=size )
- 幸存区比例（动态）：-XX:InitialSurvivorRatio=ratio 和 -XX:+UseAdaptiveSizePolicy
- 幸存区比例：-XX:SurvivorRatio=ratio
- 晋升阈值：-XX:MaxTenuringThreshold=threshold
- GC详情：-XX:+PrintGCDetails -verbose:gc
- 晋升详情：-XX:+PrintTenuringDistribution
- FullGC 前 MinorGC：-XX:+ScavengeBeforeFullGC



### GC 分析



#### 大对象处理策略

当遇到一个**较大的对象**时，在新生代的**伊甸园**为空，也**无法容纳该对象**时，会将该对象**直接晋升为老年代**

#### 线程内存溢出

某个线程的内存溢出了而抛异常（out of memory），不会让其他的线程结束运行

这是因为当一个线程**抛出OOM异常后**，**它所占据的内存资源会全部被释放掉**，从而不会影响其他线程的运行，**进程依然正常**







## 4、垃圾回收器









 

 

###  串行

- 单线程
- 堆内存较小，适合个人电脑
- -XX:+UseSerialGC = Serial + SerialOld



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/5cede90cbd52c231f4d2ebd92a9f75fa.png)



**安全点**：让其他线程都在这个点停下来，以免垃圾回收时移动对象地址，使得其他线程找不到被移动的对象

因为是串行的，所以只有一个垃圾回收线程。且在该线程执行回收工作时，其他线程进入**阻塞**状态

#### Serial 回收器

Serial 回收器是最基本的、发展历史最悠久的回收器

**特点：** **单线程**、简单高效（与其他回收器的单线程相比），采用**复制算法**。对于限定单个CPU的环境来说，Serial回收器由于没有线程交互的开销，专心做垃圾收集自然可以获得最高的单线程手机效率。回收器进行垃圾回收时，必须暂停其他所有的工作线程，直到它结束（Stop The World）

#### ParNew 回收器

ParNew回收器其实就是Serial回收器的多线程版本

**特点**：**多线程**、ParNew回收器默认开启的收集线程数与CPU的数量相同，在CPU非常多的环境中，可以使用-XX:ParallelGCThreads参数来限制垃圾收集的线程数。和Serial回收器一样存在Stop The World问题

#### Serial Old 回收器

Serial Old是Serial回收器的老年代版本

**特点**：同样是**单线程**回收器，采用**标记-整理算法**







###  吞吐量优先



#### 简介



- 多线程
- 堆内存较大，多核 cpu
- 让单位时间内，STW 的时间最短，垃圾回收时间占比最低，这样就称吞吐量高（多食少餐）



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/284ee66db633400c039378e8a3c76938.png)



```java
-XX:+UseParallelGC ~ -XX:+UseParallelOldGC 
-XX:+UseAdaptiveSizePolicy
-XX:GCTimeRatio=ratio 
-XX:MaxGCPauseMillis=ms 
-XX:ParallelGCThreads=n
```





**Parallel：并行**

- 即用户线程和垃圾回收线程并行执行



#### Parallel Scavenge 回收器



- 与吞吐量关系密切，故也称为吞吐量优先回收器
- **特点**：属于新生代回收器也是采用**复制算法**的回收器（用到了新生代的幸存区），又是并行的多线程回收器（与ParNew回收器类似）
- 该回收器的目标是达到一个可控制的吞吐量。还有一个值得关注的点是：**GC自适应调节策略**（与ParNew回收器最重要的一个区别）



#### Parallel Old 回收器

- 是Parallel Scavenge回收器的老年代版本
- **特点**：**多线程**，采用**标记-整理算法**（老年代没有幸存区）
- 响应时间优先



#### GC自适应调节策略

- Parallel Scavenge回收器可设置-XX:+UseAdptiveSizePolicy参数。
- 当开关打开时**不需要**手动指定新生代的大小（-Xmn）、Eden与Survivor区的比例（-XX:SurvivorRation）、晋升老年代的对象年龄（-XX:PretenureSizeThreshold）等
- 虚拟机会根据系统的运行状况收集性能监控信息，动态设置这些参数以提供最优的停顿时间和最高的吞吐量，这种调节方式称为GC的自适应调节策略。

- Parallel Scavenge回收器使用三个参数**控制吞吐量**：

  - XX:MaxGCPauseMillis=ms：控制最大的垃圾收集停顿时间，与下一个互斥，堆大了，每次垃圾回收耗时就会增加，默认为200ms

  - XX:GCTimeRatio=radio：（堆调大了）直接设置吞吐量的大小，非垃圾回收时间与总时间占比，即吞吐量：1 / (1+ radio)，一般设置为19
  - -XX:ParallelGCThreads：控制线程数





### 响应时间优先



#### 简介



- 多线程
- 堆内存较大，多核 cpu
- 尽可能让单次 STW 的时间最短 （少食多餐，尽可能不影响其他人）



 ![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/d524db8ff677cb9382456b9d32fae393.png)

```java
-XX:+UseConcMarkSweepGC（并发标记清除） ~ -XX:+UseParNewGC ~ SerialOld 
-XX:ParallelGCThreads=n ~ -XX:ConcGCThreads=threads 
-XX:CMSInitiatingOccupancyFraction=percent
-XX:+CMSScavengeBeforeRemark
```



#### 参数介绍



**Concurrent：并发**

- 即用户线程和垃圾回收线程并发执行，互不影响

**ConcMarkSweep：并发标记清除CMS**





**-XX:+UseConcMarkSweepGC ~ -XX:+UseParNewGC ~ SerialOld ：**

- 从左往后：
  - CMS（老年代，**标记清除**算法）
  - ParNew回收器（新生代，复制算法）
  - CMS**并发失败**的补救措施，**退化**为单线程的Serial Old基于**标记整理**回收器（单线程）
    - CMS基于标记清除算法，因此会有大量的内存碎片
    - 新生代和老年代内存都不足就会造成并发失败（内存碎片太多）
    - 退化为SerialOld回收器，做一次单线程串行的**内存整理**
    - 一旦发生并发失败，垃圾回收的处理时间会一下子飙升，完成一次Full GC（单线程的内存整理慢）

**-XX:ParallelGCThreads=n ~ -XX:ConcGCThreads=threads** 

- 从左往右：
  - 设置并行总的线程数，默认4
  - 设置并发时GC线程数，建议设置为并行线程数的1/4

**-XX:CMSInitiatingOccupancyFraction=percent**

- 指浮动垃圾清理的时机为堆内存占用的percent的百分比，相当于预留空间给浮动垃圾，也就是给用户进程留出空间

**-XX:+CMSScavengeBeforeRemark**

- 重新标记前先对新生代进行一次垃圾回收，这样可以减轻重新标记的压力





#### CMS 回收器



Concurrent Mark Sweep，并发标记清除回收器，一种以获取**最短回收停顿时间**为目标的**老年代**回收器



**特点**：基于**标记-清除算法**实现。并发收集、**低停顿**，但是**会产生内存碎片**

**应用场景**：适用于注重服务的响应速度，希望系统**停顿时间最短**，给用户带来更好的体验等场景下。如web程序、b/s服务

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/d524db8ff677cb9382456b9d32fae393.png)

**CMS回收器的运行过程分为下列4步：**

- **初始标记**：由于老年代内存不足导致，标记GC Roots能直接到的对象。**速度很快**但是**仍存在Stop The World问题**（**耗时最短**）
- **并发标记**：进行**可达性分析的过程**，遍历整个对象图，找出存活对象且用户线程可并发执行（这里的并发指的宏观上用户线程和垃圾回收线程同时存在）（**耗时最长**）
- **重新标记**：为了**修正并发标记期间**因用户程序继续运行而导致标记产生**变动**的那一部分对象的标记记录。**仍然存在Stop The World问题**
- **并发清除**：对标记的对象进行清除回收（这里的并发指的宏观上用户线程和垃圾回收线程同时存在）



CMS回收器的内存回收过程是与用户线程一起**并发执行**的



#### CMS的目的

最大可能减少STW的占用时间，发生STW的为两个阶段

- 初始标记：标记的东西少，速度很快
- 重新标记：只是为了修正并发标记的变动，速度很快



#### CMS的缺点



虽然做到了响应时间优先，但**占有了一定的CPU使用量**（尤其是重新标记），对系统的吞吐量是有影响的！

- 进行垃圾会收的次数也相对之下多了不少
- 例如，并发清理时候，由于用户线程也在运行，又会产生新的垃圾（**浮动垃圾**）
- 此方式又不会向其他回收器一样，等到下一次堆空间不足GC；也就是浮动垃圾不会等到堆内存不足才清理，提前清理
  - 详见上面讲的这个参数：**-XX:CMSInitiatingOccupancyFraction=percent**

 



### 默认垃圾回收器



```java
-XX:+PrintCommandLineFlags 参数可查看默认设置收集器类型
-XX:+PrintGCDetails 亦可通过打印的GC日志的新生代、老年代名称判断

JDK8：Parallel Scavenge（新生代）+ Serial Old（老年代）
JDK9：G1
```





### G1





#### 简介



定义：Garbage First

- 2004 论文发布
- 2009 JDK 6u14 体验 
- 2012 JDK 7u4 官方支持 
- 2017 JDK 9 默认，而且替代了CMS 收集器



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/84fc3158676faf3bd95af8ce6411526d.png)





**流程：**

1. 初始标记
2. 并发标记
3. 重新标记
4. 筛选回收



**适用场景**

- **同时**注重**吞吐量**（Throughput）和**低延迟**（Low latency），默认的暂停目标是 **200 ms**
- 超大堆内存，会将堆**划分为多个大小相等的Region**
  - 每个region都**只放一类**：伊甸园区，幸存者区，老年代
  - 划分的目的：分治，速度会加快
- 整体上是 **标记+整理**  算法，两个区域之间是 **复制**  算法 

相关 JVM 参数

- -XX:+UseG1GC：jdk9以后默认，无需显示指定
- -XX:G1HeapRegionSize=size ：设置G1每个堆分区大小
- -XX:MaxGCPauseMillis=time：设置最大暂停目标时长，也就是垃圾处理最大STW时间，可以调大一点来增加吞吐量





#### G1垃圾回收阶段





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/f673d4a96b76ce1d520ffa02df567fe6.png)



新生代内存超过阈值—–>新生代回收+并发标记—–>混合回收，回收新生代伊甸园、幸存区、老年代内存——>新生代伊甸园垃圾回收(重新开始)







#### Young Collection



E：伊甸园区

S：幸存者区

O：老年区

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/a8fc1dd147b359145427bdde4669f0c9.png)







**Young Collection：会 STW**

1. G1划分了的堆的分区Region
2. **分代**是按对象的生命周期划分
3. **分区**则是将堆空间划分连续几个不同小区间，每一个小区间独立回收，可以控制一次回收多少个小区间，方便控制 GC 产生的停顿时间



#### Young Collection + CM

CM：并发标记

- 在 Young GC 时会**对 GC Root 进行初始标记**
- 在老年代**占用堆内存的比例**达到阈值时，对进行**并发标记**（**不会STW**），阈值可以根据用户来进行设定
  - -XX:InitiatingHeapOccupancyPercent=percent （默认45%)





#### Mixed Collection

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/84fc3158676faf3bd95af8ce6411526d.png)

会对 E、S、O 进行全面垃圾回收

- **最终标记**（**也叫重新标记，Remark**）：处于并发标记之后，并发标记时，也有用户线程，会产生垃圾，再进行一次重新标记，**会 STW** 
- **拷贝存活（筛选回收）**（Evacuation）：回收最不紧要的垃圾，拷贝最有价值的对象到新的老年区，这时旧的只有不仅要的垃圾用于回收 **会STW**
- -XX:MaxGCPauseMillis=ms：用于指定最长的停顿时间
- 局部是复制，整体是标记整理，没有碎片产生



**为什么有的老年代被拷贝了，有的没拷贝？**

- 例如下图只有两个红色的O复制到了一个新的黄色的O，其他旧的O并没有**复制**过去？

因为指定了最大停顿时间，如果对所有老年代都进行回收，耗时可能过高。为了保证时间不超过设定的停顿时间，会**选择回收最有价值的老年代**（回收后，能够得到更多内存）

- 这样复制的次数和内存都少了，降低了回收的暂停停顿时间
  - 复制一方面为了**保留存活对象**
  - 另一方面为了**整理内存，减少碎片**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/66085803ce7310c4f5a790453fc7eed2.png)







### 垃圾回收器辨析



#### SerialGC

- 新生代内存不足发生的垃圾收集 - minor gc 
- 老年代内存不足发生的垃圾收集 - full gc

#### ParallelGC

- 新生代内存不足发生的垃圾收集 - minor gc 
- 老年代内存不足发生的垃圾收集 - full gc

#### CMS

- 新生代内存不足发生的垃圾收集 - minor gc 
- 老年代内存不足
  - CMS并发失败，老年代退化为串行时，才会触发一次Full GC

#### G1

- 新生代内存不足发生的垃圾收集 - minor gc 
- 老年代内存不足
  - G1在老年代内存不足时（老年代所占内存超过阈值）
    - 如果垃圾回收速度**快于**垃圾产生速度，**不会触发**Full GC，而是**进行并发清理**
    - 如果垃圾回收速度**慢于**垃圾产生速度，便**会触发**Full GC，为多线程





### 新生代跨代引用



**新生代回收的跨代引用（老年代引用新生代）问题？**



新生代回收垃圾对象过程：

- 找到Root根对象，根对象进行可达性分析找到存活对象
  - 根对象有一部分来自老年代，老年代的根对象非常多，遍历查找效率会很低
  - 因此采用一种**卡表CardTable**技术，将老年代区域进行**细分**，每个Card大小为512B
  - 老年代某个Card引用了新生代伊甸园对象，我们将其标记为**脏卡**
  - 因此我们找根对象可以直接找脏卡，减小搜索范围，提高效率
  - 新生代会有 **Remembered Set** 来记录脏卡对自己的引用
  - 如果对伊甸园做垃圾回收，可以直接通过 Remembered Set 找到老年代的根对象脏卡
  - 通过脏卡根对象遍历Root，提高了效率
- 存活对象复制到幸存区



**名词：**

- **卡表**：老年区划分为一个个Card，所有Card构成了CardTable
- Remembered Set：记录脏卡对自己的引用
- post-write barrier + dirty card queue：**写屏障 + 脏卡队列**
  - 在脏卡对象引用变更时通过写屏障更新脏卡（异步）
  - 脏卡不会立即更新，会先放到脏卡队列，将来使用一个线程去队列完成脏卡更新操作
    - concurrent refinement threads **更新 Remembered Set**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/f123563089607b90b85bfab6216264f4.png)



### Remark

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/84fc3158676faf3bd95af8ce6411526d.png)





Remark叫重新标记，也叫最终标记！



**并发标记阶段时，对象的处理状态：**



pre-write barrier + satb_mark_queue：写屏障 + 重新标记队列

- 黑色：处理完毕，但有强引用指向，不会回收
- 灰色：正在处理，也有强引用，处理完也会变为黑色不会回收
- 白色：未处理，也有强引用，不会回收
- 单独的白色：被回收

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/ba9346c6b47661c4829002ea1c6d2bf7.png)



```java
// 来自深入理解JVM

我们引入三色标记（Tri-color Marking）[1]作为工具来辅助推导，把遍历对象图过程中遇到的对象，按照“是否访问过”这个条件标记成以下三种颜色：
·白色：表示对象尚未被垃圾收集器访问过。显然在可达性分析刚刚开始的阶段，所有的对象都是白色的，若在分析结束的阶段，仍然是白色的对象，即代表不可达。
·黑色：表示对象已经被垃圾收集器访问过，且这个对象的所有引用都已经扫描过。黑色的对象代表已经扫描过，它是安全存活的，如果有其他对象引用指向了黑色对象，无须重新扫描一遍。黑色对象不可能直接（不经过灰色对象）指向某个白色对象。
·灰色：表示对象已经被垃圾收集器访问过，但这个对象上至少存在一个引用还没有被扫描过。

如果用户线程此时是冻结的，只有收集器线程在工作，那不会有任何问题。但如果用户线程与收集器是并发工作呢？收集器在对象图上标记颜色，同时用户线程在修改引用关系——即修改对象图的结构，这样可能出现两种后果。

一种是把原本消亡的对象错误标记为存活，这不是好事，但其实是可以容忍的，只不过产生了一点逃过本次收集的浮动垃圾而已，下次收集清理掉就好。
另一种是把原本存活的对象错误标记为已消亡，这就是非常致命的后果了，程序肯定会因此发生错误。
    
Wilson于1994年在理论上证明了，当且仅当以下两个条件同时满足时，会产生“对象消失”的问题，即原本应该是黑色的对象被误标为白色：
·赋值器插入了一条或多条从黑色对象到白色对象的新引用；
·赋值器删除了全部从灰色对象到该白色对象的直接或间接引用。
因此，我们要解决并发扫描时的对象消失问题，只需破坏这两个条件的任意一个即可。由此分别 

产生了两种解决方案：增量更新（Incremental Update）和原始快照（Snapshot At The Beginning，SATB）。

增量更新要破坏的是第一个条件，当黑色对象插入新的指向白色对象的引用关系时，就将这个新插入的引用记录下来，等并发扫描结束之后，再将这些记录过的引用关系中的黑色对象为根，重新扫描一次。这可以简化理解为，黑色对象一旦新插入了指向白色对象的引用之后，它就变回灰色对象了。

原始快照要破坏的是第二个条件，当灰色对象要删除指向白色对象的引用关系时，就将这个要删除的引用记录下来，在并发扫描结束之后，再将这些记录过的引用关系中的灰色对象为根，重新扫描一次。这也可以简化理解为，无论引用关系删除与否，都会按照刚刚开始扫描那一刻的对象图快照来进行搜索。

以上无论是对引用关系记录的插入还是删除，虚拟机的记录操作都是通过写屏障实现的。在HotSpot虚拟机中，增量更新和原始快照这两种解决方案都有实际应用，譬如，CMS是基于增量更新来做并发标记的，G1、Shenandoah则是用原始快照来实现。
```



来自深入理解JVM：

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/fa3a5280ede2ed36fbd83e1b7e0b5b80.png)













**仍然是并发标记阶段**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/2b5ce2f7c730dee0071a86e4b97e5496.png)

**并发标记过程中**

- 由于用户线程和并发标记线程同时存在
  - **情况一**：因此B和C可能由于用户线程的加入而断掉引用
  - 由于此时C变为了孤立的白色，并发标记结束就会被回收掉
  - **情况二**：用户线程改变了C的引用，指向了A
  - 由于A被处理过了，因此并发标记过程不会再次处理到C
  - 我们仍然认为C是垃圾，会在并发标记结束将其回收掉
    - 但这里不对的，由于C有来自A的强引用，无法回收
    - 因此需要对其进行**重新标记**



**重新标记流程：**

- 当C的引用发生改变时，JVM就会加入**写屏障**，该段代码就会执行
- **写屏障**：会将C加入队列，并将其变为灰色，表示未处理完
- 此时**重新标记**就会STW，暂停所有用户线程，从队列中进一步检查，发现是灰色的
- 则进行进一步处理，发现有强引用在引用，因此将其变为黑色，有强引用指向，不会被回收



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/15/92a58a8e455439f7fa8b680805cbb2ac.png)







### JDK 8U20字符串去重





```java
/**
 * 字符串去重
 *
 * -XX:+UseStringDeduplication （默认打开）
 *
 * @author ITNXD
 * @create 2022-01-16 10:05
 */
public class Demo3 {

    public static void main(String[] args) {
        String s1 = new String("hello"); // char[]{'h','e','l','l','o'}
        String s2 = new String("hello"); // char[]{'h','e','l','l','o'}
        // 只是char[]数组指向一致，s1和s2指向不一致
        System.out.println(s1 == s2); // false
    }
}
```



- 将所有新分配的字符串（char[]）放入一个队列
- 当新生代回收时，G1**并发检查**是否有字符串重复 
- **如果它们值一样，让它们引用同一个 char[]** 
- 注意，与   String.intern() 不一样
  - String.intern() 关注的是字符串对象 
  - 而字符串去重关注的是 char[]
  - 在 JVM 内部，使用了不同的字符串表



**优点**：节省大量内存

**缺点**：略微多占用了 cpu 时间，新生代回收时间略微增加







### JDK 8u40 并发标记类卸载



所有对象都经过并发标记后，就能知道哪些类不再被使用，当一个**类加载器的所有类都不再使用**，则**卸载它所加载的所有类**

-XX:+ClassUnloadingWithConcurrentMark 默认启用







### JDK 8u60 回收巨型对象



**巨型对象** ：一个对象大于 region（相同大小的堆分区） 的一半时，称之为巨型对象

- 不拷贝：G1 不会对巨型对象进行拷贝
- 优先回收：回收时被优先考虑
- G1 会跟踪老年代所有 incoming 引用，这样老年代 incoming 引用为0 的巨型对象就可以在新生代垃圾回收时处理掉
  - 当老年代的卡表不再引用巨型对象时，就会在新生代被回收



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/9cc15bb6f98e542991d3e15d405ce7be.png)









### JDK 9 并发标记起始时间的调整



- 并发标记必须在堆空间占满前完成，否则**退化**为 FullGC 
  - 如果垃圾回收速度**慢于**垃圾产生速度，便**会触发**Full GC，为多线程
  - Full GC 触发的 STW 时间更长，要尽可能避免
    - 可以提前让并发标记，混合收集开始
- JDK 9 之前需要使用   -XX:InitiatingHeapOccupancyPercent：老年代在堆内存的占比阈值，默认45%
- JDK 9 可以动态调整
  - -XX:InitiatingHeapOccupancyPercent 用来设置**初始值** 
  - 进行数据采样并**动态调整**
  - 总会添加一个安全的空档空间













### JDK 9 更高效的回收



- 250+增强 
- 180+bug修复
- https://docs.oracle.com/en/java/javase/12/gctuning



## 5、垃圾回收器调优





查看虚拟机参数命令：

```java
java -XX:+PrintFlagsFinal -version | findstr "GC"
```



### 调优领域

- 内存 
- 锁竞争 
- cpu 占用 
- io



### 确定目标

低延迟/高吞吐量？ 选择合适的GC

- 低延迟、响应时间优先：CMS G1 ZGC（jdk12使用）
- 高吞吐量：ParallelGC
- Zing（据说零延迟。。。）





### 最快的GC是不发生GC

首先排除减少因为自身编写的代码而引发的内存问题

- 查看Full GC前后的内存占用，考虑以下几个问题
  - 数据是不是太多？
    - 数据库查表将整张表加入内存
  - 数据表示是否太臃肿
    - 对象图
    - 对象大小
      - 包装类型占用内存大于基本类型
  - 是否存在内存泄漏
    - 不使用本地静态Map作为缓存，可能会内存泄露
    - 可以使用软引用和弱引用，在内存吃紧时进行一次GC
    - 使用第三方缓存



### 新生代调优



- **新生代的特点**
  - 所有的new操作分配内存都是非常廉价的
    - TLAB：thread-local allocation buﬀer，线程局部本地分配缓存区
    - TLAB可以保证线程内存分配时的并发安全，仅在自身线程缓存区内进行再分配
  - 死亡对象回收零代价
    - 伊甸园和幸存区From复制到幸存区To，则伊甸园和幸存区From的垃圾就可以零代价回收掉
  - 大部分对象用过即死（朝生夕死）
  - MInor GC 所用时间远小于Full GC
- **新生代内存越大越好么？**
  - 参数：-Xmn
  - **不是**
    - 新生代内存太小：频繁触发Minor GC，会STW，会使得吞吐量下降
    - 新生代内存太大：老年代内存占比有所降低，会更频繁地触发Full GC。而且触发Minor GC时，清理新生代所花费的时间会更长
  - 新生代内存设置为内容纳**[并发量*(请求+响应)]**的数据为宜







### 幸存区调优

- 幸存区需要能够保存 **当前活跃对象**+**需要晋升的对象**
- 晋升阈值配置得当，让长时间存活的对象尽快晋升
  - -XX:MaxTenuringThreshold=threshold
  - -XX:+PrintTenuringDistribution：显示晋升详细信息





### 老年代调优

以 CMS 为例

- CMS 的老年代内存越大越好
- 先尝试不做调优，先尝试调优新生代 
- 观察发生 Full GC 时老年代内存占用，将老年代内存预设调大 1/4 ~ 1/3
  - -XX:CMSInitiatingOccupancyFraction=percent：老年代占用达到多少进行Full GC
  - 一般设置为75%-80%



### 案例



- 案例1 Full GC 和 Minor GC频繁
  - 新生代空间小，幸存区小，更快进入老年区，Full GC 频繁
  - 解决：增大新生代和老年代内存空间，提高晋升阈值
- 案例2 请求高峰期发生 Full GC，单次暂停时间特别长  （**CMS**） 
  - 业务要求低延迟，响应时间，选择了CMS
  - CMS并发标记最慢，业务高峰期新生代对象比较多，重新扫描一次就会很费时间，单词暂停时间特别长
  - 解决：在并发标记前先进行一次Minor GC 减轻扫描压力
- 案例3 老年代充裕情况下，发生 Full GC （**CMS jdk1.7**）
  - jdk1.7方法区实现为永久代，1.8位元空间
  - 永久代空间不足也会导致Full GC
  - 元空间内存则不是有Java控制了，使用的是操作系统，空间充裕，一般不会发生GC
  - 解决：增大永久代内存









# 四、类加载与字节码





## 1、类文件结构





### 简介



一个简单的 HelloWorld.java



```java
package cn.itcast.jvm.t5; 
// HelloWorld 示例
public class HelloWorld {
    public static void main(String[] args) { 
        System.out.println("hello world"); 
    }
}
```



执行 `javac -parameters -d . HellowWorld.java`

编译为 HelloWorld.class 后是这个样子的：



```java
[root@localhost ~]# od -t xC HelloWorld.class
0000000 ca fe ba be 00 00 00 34 00 23 0a 00 06 00 15 09
0000020 00 16 00 17 08 00 18 0a 00 19 00 1a 07 00 1b 07
0000040 00 1c 01 00 06 3c 69 6e 69 74 3e 01 00 03 28 29
0000060 56 01 00 04 43 6f 64 65 01 00 0f 4c 69 6e 65 4e
0000100 75 6d 62 65 72 54 61 62 6c 65 01 00 12 4c 6f 63
0000120 61 6c 56 61 72 69 61 62 6c 65 54 61 62 6c 65 01
0000140 00 04 74 68 69 73 01 00 1d 4c 63 6e 2f 69 74 63
0000160 61 73 74 2f 6a 76 6d 2f 74 35 2f 48 65 6c 6c 6f
0000200 57 6f 72 6c 64 3b 01 00 04 6d 61 69 6e 01 00 16
0000220 28 5b 4c 6a 61 76 61 2f 6c 61 6e 67 2f 53 74 72
0000240 69 6e 67 3b 29 56 01 00 04 61 72 67 73 01 00 13
0000260 5b 4c 6a 61 76 61 2f 6c 61 6e 67 2f 53 74 72 69
0000300 6e 67 3b 01 00 10 4d 65 74 68 6f 64 50 61 72 61
0000320 6d 65 74 65 72 73 01 00 0a 53 6f 75 72 63 65 46
0000340 69 6c 65 01 00 0f 48 65 6c 6c 6f 57 6f 72 6c 64
0000360 2e 6a 61 76 61 0c 00 07 00 08 07 00 1d 0c 00 1e
0000400 00 1f 01 00 0b 68 65 6c 6c 6f 20 77 6f 72 6c 64
0000420 07 00 20 0c 00 21 00 22 01 00 1b 63 6e 2f 69 74
0000440 63 61 73 74 2f 6a 76 6d 2f 74 35 2f 48 65 6c 6c
0000460 6f 57 6f 72 6c 64 01 00 10 6a 61 76 61 2f 6c 61
0000500 6e 67 2f 4f 62 6a 65 63 74 01 00 10 6a 61 76 61
0000520 2f 6c 61 6e 67 2f 53 79 73 74 65 6d 01 00 03 6f
0000540 75 74 01 00 15 4c 6a 61 76 61 2f 69 6f 2f 50 72
0000560 69 6e 74 53 74 72 65 61 6d 3b 01 00 13 6a 61 76
0000600 61 2f 69 6f 2f 50 72 69 6e 74 53 74 72 65 61 6d
0000620 01 00 07 70 72 69 6e 74 6c 6e 01 00 15 28 4c 6a
0000640 61 76 61 2f 6c 61 6e 67 2f 53 74 72 69 6e 67 3b
0000660 29 56 00 21 00 05 00 06 00 00 00 00 00 02 00 01
0000700 00 07 00 08 00 01 00 09 00 00 00 2f 00 01 00 01
0000720 00 00 00 05 2a b7 00 01 b1 00 00 00 02 00 0a 00
0000740 00 00 06 00 01 00 00 00 04 00 0b 00 00 00 0c 00
0000760 01 00 00 00 05 00 0c 00 0d 00 00 00 09 00 0e 00
0001000 0f 00 02 00 09 00 00 00 37 00 02 00 01 00 00 00
0001020 09 b2 00 02 12 03 b6 00 04 b1 00 00 00 02 00 0a
0001040 00 00 00 0a 00 02 00 00 00 06 00 08 00 07 00 0b
0001060 00 00 00 0c 00 01 00 00 00 09 00 10 00 11 00 00
0001100 00 12 00 00 00 05 01 00 10 00 00 00 01 00 13 00
0001120 00 00 02 00 14
```



根据 JVM 规范，**类文件结构**如下：



u4：表示字节顺序，前四个字节...依次类推



```java
ClassFile {
   u4             magic;
   u2             minor_version;
   u2             major_version;
   u2             constant_pool_count;
   cp_info        constant_pool[constant_pool_count-1]; 
   u2             access_flags;
   u2             this_class;
   u2             super_class;
   u2             interfaces_count;
   u2             interfaces[interfaces_count]; 
   u2             fields_count;
   field_info     fields[fields_count]; 
   u2             methods_count;
   method_info    methods[methods_count]; 
   u2             attributes_count;
   attribute_info attributes[attributes_count]; 
}
```



### 魔数

u4 magic

0 ~3 字节，表示它是否是【class】类型的文件

0000000 **ca fe ba be** 00 00 00 34 00 23 0a 00 06 00 15 09

### 版本

u2 minor_version;

u2 major_version;

4~7 字节，表示类的版本 00 34（52）  表示是 Java 8 

0000000 ca fe ba be **00 00 00 34** 00 23 0a 00 06 00 15 09

34H = 52，代表JDK8



### 常量池

u2  constant_pool_count

8~9 字节，表示常量池长度，00 23 （35）  表示常量池有 #1~#34项，注意 #0 项不计入，也没有值 

0000000 ca fe ba be 00 00 00 34 **00 23** 0a 00 06 00 15 09



简单来说：就是通过字节对应的信息去找常量表对应信息，后面就是：含义-长度-具体内存



具体查看官方文档！

[https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html)



### 其他

- 访问标识与继承信息
- Field 信息
- Method 信息
- 附加属性















## 2、字节码指令



### JavaP工具



自己分析类文件结构太麻烦了，Oracle 提供了 javap 工具来反编译 class 文件



```java
javap -v 类名.class
```



```java
❯ javap -v .\Demo3.class
Classfile /E:/IdeaProject/JVM/target/classes/com/itnxd/jvm/constant/Demo3.class
  Last modified 2022年1月16日; size 564 bytes
  SHA-256 checksum 1b57bc932cf3e94ddf755cdddc124232bb98f8a3ef47554d17aa5717564b78fc
  Compiled from "Demo3.java"
public class com.itnxd.jvm.constant.Demo3
  minor version: 0
  major version: 52 // JDK8
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER // 类访问修饰符 public
  this_class: #5                          // com/itnxd/jvm/constant/Demo3
  super_class: #6                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 2, attributes: 1
Constant pool: // 常量池
   #1 = Methodref          #6.#20         // java/lang/Object."<init>":()V
   #2 = Fieldref           #21.#22        // java/lang/System.out:Ljava/io/PrintStream;
   #3 = String             #23            // hello world
   #4 = Methodref          #24.#25        // java/io/PrintStream.println:(Ljava/lang/String;)V
   #5 = Class              #26            // com/itnxd/jvm/constant/Demo3
   #6 = Class              #27            // java/lang/Object
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/itnxd/jvm/constant/Demo3;
  #14 = Utf8               main
  #15 = Utf8               ([Ljava/lang/String;)V
  #16 = Utf8               args
  #17 = Utf8               [Ljava/lang/String;
  #18 = Utf8               SourceFile
  #19 = Utf8               Demo3.java
  #20 = NameAndType        #7:#8          // "<init>":()V
  #21 = Class              #28            // java/lang/System
  #22 = NameAndType        #29:#30        // out:Ljava/io/PrintStream;
  #23 = Utf8               hello world
  #24 = Class              #31            // java/io/PrintStream
  #25 = NameAndType        #32:#33        // println:(Ljava/lang/String;)V
  #26 = Utf8               com/itnxd/jvm/constant/Demo3
  #27 = Utf8               java/lang/Object
  #28 = Utf8               java/lang/System
  #29 = Utf8               out
  #30 = Utf8               Ljava/io/PrintStream;
  #31 = Utf8               java/io/PrintStream
  #32 = Utf8               println
  #33 = Utf8               (Ljava/lang/String;)V
 
// 方法信息
{
  // 构造方法
  public com.itnxd.jvm.constant.Demo3();
    descriptor: ()V // 空参
    flags: (0x0001) ACC_PUBLIC // 访问修饰符 public
    // 代码段
    Code:
      // 栈深度，局部变量表大小，参数个数
      stack=1, locals=1, args_size=1
         // 0 1 4 代表字节码文件的行号
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      // 行号表
      LineNumberTable:
    	// java文件行号 字节码行号
        line 11: 0
      // 本地变量表
      LocalVariableTable:
        // 5行字节码 slot 槽位号 局部变量名this 类型 Demo3
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/itnxd/jvm/constant/Demo3;

  // 主方法
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V // 参数字符串数组
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC // 访问修饰符 public static
    Code:
      // 栈深度，局部变量表大小，参数个数
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String hello world
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      // 行号表
      LineNumberTable:
        // java文件行号 字节码行号
        line 14: 0
        line 15: 8
      // 本地变量表
      LocalVariableTable:
        // 9行字节码 slot 槽位号 局部变量名args 类型 String
        Start  Length  Slot  Name   Signature
            0       9     0  args   [Ljava/lang/String;
}
SourceFile: "Demo3.java"

```





### 图解方法执行流程





#### 原始Java代码



- a和字节码指令存储在一起，寄存器中（由于缓存了-128-127）
- b存储在运行时常量池



```java
public class Demo3_1 {    
    public static void main(String[] args) {        
        int a = 10;        
        int b = Short.MAX_VALUE + 1;        
        int c = a + b;        
        System.out.println(c);   
    } 
}
```



#### 编译后的字节码文件



```java
❯ javap -v .\Demo3.class
Classfile /E:/IdeaProject/JVM/target/classes/com/itnxd/jvm/constant/Demo3.class
  Last modified 2022年1月16日; size 623 bytes
  SHA-256 checksum 6659bf5f03d9bff0a1aa9e3c1ace941ac1be502fb0df539ec7eccb3123a65a01
  Compiled from "Demo3.java"
public class com.itnxd.jvm.constant.Demo3
  minor version: 0
  major version: 52
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #6                          // com/itnxd/jvm/constant/Demo3
  super_class: #7                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 2, attributes: 1
Constant pool:
   #1 = Methodref          #7.#25         // java/lang/Object."<init>":()V
   #2 = Class              #26            // java/lang/Short
   #3 = Integer            32768
   #4 = Fieldref           #27.#28        // java/lang/System.out:Ljava/io/PrintStream;
   #5 = Methodref          #29.#30        // java/io/PrintStream.println:(I)V
   #6 = Class              #31            // com/itnxd/jvm/constant/Demo3
   #7 = Class              #32            // java/lang/Object
   #8 = Utf8               <init>
   #9 = Utf8               ()V
  #10 = Utf8               Code
  #11 = Utf8               LineNumberTable
  #12 = Utf8               LocalVariableTable
  #13 = Utf8               this
  #14 = Utf8               Lcom/itnxd/jvm/constant/Demo3;
  #15 = Utf8               main
  #16 = Utf8               ([Ljava/lang/String;)V
  #17 = Utf8               args
  #18 = Utf8               [Ljava/lang/String;
  #19 = Utf8               a
  #20 = Utf8               I
  #21 = Utf8               b
  #22 = Utf8               c
  #23 = Utf8               SourceFile
  #24 = Utf8               Demo3.java
  #25 = NameAndType        #8:#9          // "<init>":()V
  #26 = Utf8               java/lang/Short
  #27 = Class              #33            // java/lang/System
  #28 = NameAndType        #34:#35        // out:Ljava/io/PrintStream;
  #29 = Class              #36            // java/io/PrintStream
  #30 = NameAndType        #37:#38        // println:(I)V
  #31 = Utf8               com/itnxd/jvm/constant/Demo3
  #32 = Utf8               java/lang/Object
  #33 = Utf8               java/lang/System
  #34 = Utf8               out
  #35 = Utf8               Ljava/io/PrintStream;
  #36 = Utf8               java/io/PrintStream
  #37 = Utf8               println
  #38 = Utf8               (I)V
{
  public com.itnxd.jvm.constant.Demo3();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 11: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/itnxd/jvm/constant/Demo3;

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=4, args_size=1
         0: bipush        10
         2: istore_1
         3: ldc           #3                  // int 32768
         5: istore_2
         6: iload_1
         7: iload_2
         8: iadd
         9: istore_3
        10: getstatic     #4                  // Field java/lang/System.out:Ljava/io/PrintStream;
        13: iload_3
        14: invokevirtual #5                  // Method java/io/PrintStream.println:(I)V
        17: return
      LineNumberTable:
        line 14: 0
        line 15: 3
        line 16: 6
        line 17: 10
        line 18: 17
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      18     0  args   [Ljava/lang/String;
            3      15     1     a   I
            6      12     2     b   I
           10       8     3     c   I
}
SourceFile: "Demo3.java"

```



#### 常量池载入运行时常量池



运行时常量池应该在方法区，由于特殊拎了出来！

Class常量池载入运行时常量池



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/907fb88366a8a9e5b3973188f3550880.png)





#### 方法字节码载入方法区



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/22b33d00055b1233e8584cd636eb991f.png)



#### main 线程开始运行，分配栈帧内存 





（stack=2，locals=4）对应操作数栈有 2 个空间（每个空间 4 个字节），局部变量表中有 4 个槽位。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/a24878c0214d42b6c8e2f8e45d304b21.png)





#### 执行引擎开始执行字节码 



**bipush 10**

- **将一个 byte 压入操作数栈**（其长度会**补齐** 4 个字节），类似的指令还有
- sipush 将一个 short 压入操作数栈（其长度会补齐 4 个字节）
- ldc 将一个 int 压入操作数栈
- ldc2_w 将一个 long 压入操作数栈（分**两次**压入，因为 long 是 8 个字节）
- 这里小的数字都是和字节码指令存在一起，超过 short 范围的数字存入了常量池

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/ce55ea80e0e599bc1d9a3a5f37d4f575.png)





**istore_1**

- 将操作数栈顶数据弹出，存入局部变量表的 slot 1

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/1e43aa67463a8bc063a0dbe412804350.png)

**ldc #3**

- 从常量池加载 #3 数据到操作数栈
- 注意 Short.MAX_VALUE 是 32767，所以 32768 = Short.MAX_VALUE + 1 实际是在编译期间计算好的



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/cba0e0085749e323aac079f4502254fa.png)



**istore_2**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/9945b5e47765d16f49f87d222ba712c8.png)



**iload_1**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/8995dd4238018a336d42dee081072b37.png)





**iload_2**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/6a79a8666eee3fb93720b3e7622ac409.png)

**iadd**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/d74b123fe1fa08cacd8dcc7f1b4bbd93.png)



**istore_3**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/b70bfceec9f1c707f367d93561df5fa0.png)

**getstatic #4**



- 在运行时常量池中找到#4，发现是一个对象
- 在堆内存中找到该对象，并将其**引用**放入操作数栈中

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/241e1cbad891fa4450d541d3b199733a.png)

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/0865a5ae1d18ec4046a102f858587d42.png)

**iload_3**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/890f9a7876cee187802fd2b086258504.png)

**invokevirtual #5**

- 找到常量池 #5 项
- 定位到方法区   java/io/PrintStream.println:(I)V 方法 
- 生成新的栈帧（分配 locals、stack等）
- 传递参数，执行新栈帧中的字节码

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/421289d6891a8d646aa3c45d30a083d2.png)

- 执行完毕，弹出栈帧 
- 清除 main 操作数栈内容

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/63211caa2df2267bc969326165be80b6.png)



**return**

- 完成 main 方法调用，**弹出 main 栈帧** 
- 程序结束



### 字节码分析a++



- **注意 iinc 指令是直接在局部变量 slot 上进行运算** 
- **a++ 和 ++a 的区别是先执行 iload 还是 先执行 iinc**





```java
/**
* 从字节码角度分析       a++  相关题目 
*/
public class Demo3_2 {
    public static void main(String[] args) { 
        int a = 10;
        int b = a++ + ++a + a--; 
        System.out.println(a); // 11
        System.out.println(b); // 34
    }
}
```



**对应字节码：**

```java
	 Code:
      stack=2, locals=3, args_size=1
         0: bipush        10
         2: istore_1 // 存到slot1
         3: iload_1 // 加载slot1的a到操作数栈 此时slot1的a=10仍然存在
         4: iinc          1, 1 // 对slot1执行自增1 a++ 
         7: iinc          1, 1 // 对slot1执行增增1 ++a
        10: iload_1 // 加载slot1的a=12到操作数栈
        11: iadd // 操作数栈中的10和12执行一次加法 22
        12: iload_1 // 加载slot1的a=12到操作数栈
        13: iinc          1, -1 // 对slot1的a执行减1 a = 11 
        16: iadd // 操作数栈的22和12执行一次加法 34
        17: istore_2 // 存储操作数栈中的34到slot2

```





### 条件判断指令



几点说明：

- byte，short，char 都会按 int 比较，因为操作数栈都是 4 字节 
- goto 用来进行跳转到指定行号的字节码



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/86eb6001dfce606f934b5cbe2fa11e3f.png)



```java
public class Demo3_3 {
    public static void main(String[] args) { 
        int a = 0;
        if(a == 0) { 
            a = 10; 
        } else {
            a = 20; 
        }
    } 
}
```



字节码：

```java
0: iconst_0 // -1 5之间使用iconst
1: istore_1
2: iload_1      
3: ifne          12 // 条件判断指令，成立直接向下执行，不成立跳转到后面的行数12
6: bipush        10 
8: istore_1
9: goto         15 // 跳出等于的逻辑
12: bipush       20 
14: istore_1
15: return
```



### 循环控制指令



do while for类似！

```java
public class Demo3_4 {
    public static void main(String[] args) { 
        int a = 0;
        while (a < 10) { 
            a++;
        } 
    }
}
```



字节码：



```java
0: iconst_0 
1: istore_1 
2: iload_1
3: bipush        10 
5: if_icmpge     14 
8: iinc          1, 1 
11: goto          2 
14: return
```



### 小面试题

很明显，每次赋值操作赋值的都是0，即最后是0！

```java
public class Demo3_6_1 {
    public static void main(String[] args) { 
        int i = 0;
        int x = 0;
        while (i < 10) { 
            x = x++;
            i++; 
        }
        System.out.println(x); // 结果是    0 
    }
}
```



字节码原理解释：

- x++的操作对应：iload iinc两条指令
- 第一步将x=0放入slot（局部变量表）
- 第二步执行iload，将0压入操作数栈
- 第三步执行iinc，在slot内进行自增
- 第四步执行赋值操作，将操作数栈的0把slot的1进行覆盖
- 因此：最终一定是0



### 构造方法





#### cinit

`<cinit>()V`：类构造方法



```java
public class Demo3_8_1 { 
    static int i = 10; 
    static {
        i = 20; 
    }
    static { 
        i = 30; 
    }
}
```



编译器会按从上到下的顺序，收集所有 static 静态代码块和静态成员赋值的代码，**合并**为一个特殊的方法 `<cinit>()V`

```java
0: bipush        10
2: putstatic     #2                  // Field i:I 
5: bipush        20
7: putstatic     #2                  // Field i:I 
10: bipush        30
12: putstatic     #2                  // Field i:I 
15: return
```



`<cinit>()V` 方法会在类加载的初始化阶段被调用

练习
同学们可以自己调整一下 static 变量和静态代码块的位置，观察字节码的改动



#### init

`<init>()V`：对象构造方法

```java
public class Demo3_8_2 { 
    private String a = "s1"; 
    {
        b = 20; 
    }
    private int b = 10; 
    {
        a = "s2"; 
    }
    public Demo3_8_2(String a, int b) { 
        this.a = a;
        this.b = b; 
    }
    public static void main(String[] args) { 
        Demo3_8_2 d = new Demo3_8_2("s3", 30); 
        System.out.println(d.a);
        System.out.println(d.b); 
    }
}
```



编译器会按**从上至下**的顺序，收集所有 {} 代码块和成员变量赋值的代码，形成新的构造方法，但**原始构造方法内的代码总是在最后**！



**顺序：静态代码块、代码块、构造方法**



```java
{
  public com.itnxd.jvm.constant.Demo3(java.lang.String, int);
    descriptor: (Ljava/lang/String;I)V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: aload_0
         5: ldc           #2                  // String s1
         7: putfield      #3                  // Field a:Ljava/lang/String;
        10: aload_0
        11: bipush        20
        13: putfield      #4                  // Field b:I
        16: aload_0
        17: bipush        10
        19: putfield      #4                  // Field b:I
        22: aload_0
        23: ldc           #5                  // String s2
        25: putfield      #3                  // Field a:Ljava/lang/String;
        //原始构造方法在最后执行
        28: aload_0
        29: aload_1
        30: putfield      #3                  // Field a:Ljava/lang/String;
        33: aload_0
        34: iload_2
        35: putfield      #4                  // Field b:I
        38: return
      LineNumberTable:
        line 21: 0
        line 13: 4
        line 15: 10
        line 17: 16
        line 19: 22
        line 22: 28
        line 23: 33
        line 24: 38
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      39     0  this   Lcom/itnxd/jvm/constant/Demo3;
            0      39     1     a   Ljava/lang/String;
            0      39     2     b   I
```



### 方法调用



```java
public class Demo3_9 {
    public Demo3_9() { }
    private void test1() { }
    private final void test2() { }
    public void test3() { }
    public static void test4() { }
    public static void main(String[] args) { 
        Demo3_9 d = new Demo3_9();
        d.test1();
        d.test2();
        d.test3();
        d.test4();
        Demo3_9.test4(); 
    }
}
```



**字节码：**



```java
0: new           #2                  // class cn/itcast/jvm/t3/bytecode/Demo3_9 
3: dup
4: invokespecial #3                  // Method "<init>":()V 
7: astore_1
8: aload_1
9: invokespecial #4                  // Method test1:()V 
12: aload_1
13: invokespecial #5                  // Method test2:()V 
16: aload_1
17: invokevirtual #6                  // Method test3:()V 
20: aload_1
21: pop
22: invokestatic #7                 // Method test4:()V 
25: invokestatic #7                 // Method test4:()V 
28: return
```



**各方法区别？**

- 私有、构造、被 final 修饰的方法，在调用时都使用 invokespecial 指令
- 普通成员方法在调用时，使用 invokevirtual 指令。因为编译期间无法确定该方法的内容，只有在运行期间才能确定（重写的问题）
- 静态方法在调用时使用 invokestatic 指令
- invokespecial 和 invokestatic 的效率都要比 invokevirtual 高，**静态绑定和动态绑定**



**字节码详细解释：**

- new 是创建【对象】
  - 给对象分配堆内存
  - 执行成功会将【**对象引用**】压入操作数栈
- dup 是**复制**操作数栈栈顶的内容，本例即为【对象引用】，为什么需要两份引用呢，
  - 一个是要**配合 invokespecial 调用该对象的构造方法**   `<init>:()V` ，（会消耗掉栈顶一个引用），调用完成后从栈中清除
  - **另一个要配合 astore_1 赋值给局部变量或非static方法**
- 最终方法（ﬁnal），私有方法（private），构造方法都是由 invokespecial 指令来调用，属于**静态绑定**
- 普通成员方法是由 **invokevirtual** 调用，属于**动态绑定**，即支持**多态**
- **成员方法与静态方法调用的另一个区别是，  执行方法前是否需要【对象引用】**
- 比较有意思的是   d.test4()：（**对象调用类的静态方法 aload_1  pop 两条无意义指令**）
  - 是通过【对象引用】调用一个静态方法（**静态方法不需要通过对象引用来调用，因此多了两条无意义指令**）
  - 可以看到在调用invokestatic 之前执行了 pop 指令
  - 把【对象引用】从操作数栈弹掉了
- 还有一个执行 invokespecial 的情况是通过 super 调用父类方法







### 多态原理





当执行 invokevirtual 指令时：
1. 先通过栈帧中的对象引用找到对象
2. 分析对象头，找到对象的实际 Class指针
3. Class 结构中有 **vtable虚方法表**（多态相关的，ﬁnal，static 不会列入）它在类加载的**链接阶段**就已经根据方法的重写规则生成好了
4. 查表得到方法的具体地址
5. 执行方法的字节码







### 异常处理



#### try-catch



```java
public class Demo3_11_1 {
    public static void main(String[] args) { 
        int i = 0;
        try {
            i = 10;
        } catch (Exception e) { 
            i = 20;
        } 
    }
}
```



**字节码**



- 可以看到多出来一个 **Exception table （异常表）的结构**，[from, to) 是**前闭后开**的检测范围
- 一旦这个范围内的字节码执行出现异常，则通过 type 匹配异常类型，如果一致，进入 target 所指示行号 
- 8 行的字节码指令 astore_2 是将**异常对象引用**存入**局部变量表**的 slot 2 位置



```java
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=1, locals=3, args_size=1
         0: iconst_0
         1: istore_1
         2: bipush        10
         4: istore_1
         5: goto          12 // 不发生异常这里就直接return了
         8: astore_2  // 查看局部变量表slot发现存储的是Exception
         9: bipush        20
        11: istore_1
        12: return
      // 异常表
      Exception table:
         // [2,5)，值上面的字节码行号
         from    to  target type
             2     5     8   Class java/lang/Exception
      LineNumberTable:
        line 14: 0
        line 16: 2
        line 19: 5
        line 17: 8
        line 18: 9
        line 20: 12
      // 局部变量表slot
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            9       3     2     e   Ljava/lang/Exception;
            0      13     0  args   [Ljava/lang/String;
            2      11     1     i   I
      StackMapTable: number_of_entries = 2
        frame_type = 255 /* full_frame */
          offset_delta = 8
          locals = [ class "[Ljava/lang/String;", int ]
          stack = [ class java/lang/Exception ]
        frame_type = 3 /* same */
}
SourceFile: "Demo3.java"

```





#### 多 single-catch 块的情况



```java
public class Demo3_11_2 {
    public static void main(String[] args) { 
        int i = 0;
        try { 
            因为异常出现时，只能进入 Exception table 中一个分支，所以局部变量表 slot 2 位置被共用
                multi-catch 的情况
                    i = 10;
        } catch (ArithmeticException e) { 
            i = 30;
        } catch (NullPointerException e) { 
            i = 40;
        } catch (Exception e) { 
            i = 50;
        } 
    }
}
```







**字节码：**



因为异常出现时，只能进入 Exception table 中**一个分支**

- **局部变量表 slot 2 位置被共用**
- 但是起始位置不同，



```java
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=1, locals=3, args_size=1
         0: iconst_0
         1: istore_1
         2: bipush        10
         4: istore_1
         5: goto          26
         8: astore_2
         9: bipush        30
        11: istore_1
        12: goto          26
        15: astore_2
        16: bipush        40
        18: istore_1
        19: goto          26
        22: astore_2
        23: bipush        50
        25: istore_1
        26: return
      Exception table:
         from    to  target type
             2     5     8   Class java/lang/ArithmeticException
             2     5    15   Class java/lang/NullPointerException
             2     5    22   Class java/lang/Exception
      LineNumberTable:
        line 14: 0
        line 16: 2
        line 23: 5
        line 17: 8
        line 18: 9
        line 23: 12
        line 19: 15
        line 20: 16
        line 23: 19
        line 21: 22
        line 22: 23
        line 24: 26
      // 局部变量表被slot2被共用了，但是起始位置不同
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            9       3     2     e   Ljava/lang/ArithmeticException;
           16       3     2     e   Ljava/lang/NullPointerException;
           23       3     2     e   Ljava/lang/Exception;
            0      27     0  args   [Ljava/lang/String;
            2      25     1     i   I
      StackMapTable: number_of_entries = 4
        frame_type = 255 /* full_frame */
          offset_delta = 8
          locals = [ class "[Ljava/lang/String;", int ]
          stack = [ class java/lang/ArithmeticException ]
        frame_type = 70 /* same_locals_1_stack_item */
          stack = [ class java/lang/NullPointerException ]
        frame_type = 70 /* same_locals_1_stack_item */
          stack = [ class java/lang/Exception ]
        frame_type = 3 /* same */
}
SourceFile: "Demo3.java"
```



#### multi-catch 的情况



```java
public class Demo3_11_3 {
    public static void main(String[] args) { 
        try {
            Method test = Demo3_11_3.class.getMethod("test"); 
            test.invoke(null);
        } catch (NoSuchMethodException | IllegalAccessException | 
                 InvocationTargetException e) {
            e.printStackTrace(); 
        }
    }
    public static void test() { 
        System.out.println("ok"); 
    }

}
```



字节码，基本和上一种类似！



```java
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=3, locals=2, args_size=1
         0: ldc           #2                  // class com/itnxd/jvm/constant/Demo3
         2: ldc           #3                  // String test
         4: iconst_0
         5: anewarray     #4                  // class java/lang/Class
         8: invokevirtual #5                  // Method java/lang/Class.getMethod:(Ljava/lang/String;[Ljava/lang/Class;)Ljava/lang/reflect/Method;
        11: astore_1
        12: aload_1
        13: aconst_null
        14: iconst_0
        15: anewarray     #6                  // class java/lang/Object
        18: invokevirtual #7                  // Method java/lang/reflect/Method.invoke:(Ljava/lang/Object;[Ljava/lang/Object;)Ljava/lang/Object;
        21: pop
        22: goto          30
        25: astore_1 // 发生异常将异常对象存储到slot1
        26: aload_1 // 加载异常对象引用到操作数栈
        27: invokevirtual #11                 // Method java/lang/ReflectiveOperationException.printStackTrace:()V 执行异常对象方法
        30: return
      Exception table:
         from    to  target type
             0    22    25   Class java/lang/NoSuchMethodException
             0    22    25   Class java/lang/IllegalAccessException
             0    22    25   Class java/lang/reflect/InvocationTargetException
      LineNumberTable:
        line 18: 0
        line 19: 12
        line 23: 22
        line 20: 25
        line 22: 26
        line 24: 30
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
           12      10     1  test   Ljava/lang/reflect/Method;
           26       4     1     e   Ljava/lang/ReflectiveOperationException;
            0      31     0  args   [Ljava/lang/String;

```



#### ﬁnally



```java
public class Demo3_11_4 {
    public static void main(String[] args) { 
        int i = 0;
        try {
            i = 10;
        } catch (Exception e) { 
            i = 20;
        } finally { 
            i = 30; 
        }
    } 
}
```





**字节码：**

可以看到 ﬁnally 中的代码被复制了 3 份，分别放入 

- try 流程
- catch 流程
- catch 剩余的异常类型流程

当然，finally中的代码只会执行一次



```java
public static void main(java.lang.String[]); 
   descriptor: ([Ljava/lang/String;)V
   flags: ACC_PUBLIC, ACC_STATIC 
   Code:
     stack=1, locals=4, args_size=1 
        0: iconst_0
        1: istore_1            // 0 -> i
        2: bipush        10    // try -------------------------------------- 
        4: istore_1            // 10 -> i                                 | 
        5: bipush        30    // finally                                 | 
        7: istore_1            // 30 -> i                                 | // 复制到try
        8: goto          27    // return ----------------------------------- 
       11: astore_2            // catch Exceptin -> e ---------------------- 
       12: bipush        20    //                                         | 
       14: istore_1            // 20 -> i                                 | 
       15: bipush        30    // finally                                 | 
       17: istore_1            // 30 -> i                                 |  // 复制到catch
       18: goto          27    // return ----------------------------------- 
       21: astore_3            // catch any -> slot 3 ---------------------- 
       22: bipush        30    // finally                                 | 
       24: istore_1            // 30 -> i                                 | // 复制到finally,即catch并没有捕获到异常
       25: aload_3             // <- slot 3                               | 
       26: athrow              // throw ------------------------------------ // finally出现异常也会抛出
       27: return
     Exception table:
        from    to  target type
            2     5    11   Class java/lang/Exception
            2     5    21   any    // 剩余的异常类型，比如 Error 
           11    15    21   any    // 剩余的异常类型，比如 Error 
     LineNumberTable: ...
     LocalVariableTable:
       Start  Length  Slot  Name   Signature
          12       3     2     e   Ljava/lang/Exception; 
           0      28     0  args   [Ljava/lang/String; 
           2      26     1     i   I
     StackMapTable: ... 
   MethodParameters: ...
```







### ﬁnally 面试题



#### finally 中的 return



```java
public class Demo3_12_2 {
    public static void main(String[] args) { 
        int result = test();
        System.out.println(result);  // 20
    }
    public static int test() { 
        try {
            return 10; 
        } finally { 
            return 20; 
        }
    } 
}
```



**字节码：**



- 由于 ﬁnally 中的 ireturn 被插入了所有可能的流程，因此返回结果肯定以 ﬁnally 的为准 
- 至于字节码中第 2 行，似乎没啥用，且留个伏笔，看下个例子
- 跟上例中的 ﬁnally 相比，发现**没有 athrow** 了，这告诉我们：
  - **如果在 ﬁnally 中出现了 return，会吞掉异常**



```java
public static int test(); 
   descriptor: ()I
   flags: ACC_PUBLIC, ACC_STATIC 
   Code:
     stack=1, locals=2, args_size=0
        0: bipush        10    // <- 10 放入栈顶
        2: istore_0            // 10 -> slot 0 (从栈顶移除了) 
        3: bipush        20    // <- 20 放入栈顶
        5: ireturn             // 返回栈顶    int(20)
        6: astore_1            // catch any -> slot 1 
        7: bipush        20    // <- 20 放入栈顶
        9: ireturn             // 返回栈顶    int(20) 
     Exception table:
        from    to  target type 
            0     3     6   any 
     LineNumberTable: ...
     StackMapTable: ...
```





**例如下面这个例子：虽然有除零异常，但并不会抛出异常，而是会正常返回！**



```java
public class Demo3_12_1 {
    public static void main(String[] args) { 
        int result = test();
        System.out.println(result); 
    }
    public static int test() { 
        try { 
            int i = 1/0; 
            return 10; 
        } finally {
            return 20; 
        }
    }
}
```



#### ﬁnally 对返回值影响



```java
public class Demo3_12_2 {
    public static void main(String[] args) { 
        int result = test();
        System.out.println(result); // 10
    }
    public static int test() { 
        int i = 10;
        try {
            return i; 
        } finally { 
            i = 20; 
        }
    } 
}
```



**字节码：**

- 看下方反编译的内容会发现：
- try中的return数据被存储到了slot
- 执行finally，20会被加入操作数栈
- **重点**：会再次将暂存的slot1加入操作数栈（此时栈顶两个元素20和10）
- 返回栈顶
- **即**：**istore_1暂存是为了固定返回值，防止被finally中的改动所影响**

```java
 public static int test(); 
   descriptor: ()I
   flags: ACC_PUBLIC, ACC_STATIC 
   Code:
     stack=1, locals=3, args_size=0
        0: bipush        10    // <- 10 放入栈顶 
        2: istore_0            // 10 -> i
        3: iload_0             // <- i(10)
        4: istore_1            // 10 -> slot 1，暂存至    slot 1，目的是为了固定返回值 
        5: bipush        20    // <- 20 放入栈顶
        7: istore_0            // 20 -> i
        8: iload_1             // <- slot 1(10) 载入    slot 1 暂存的值 
        9: ireturn             // 返回栈顶的    int(10)
       10: astore_2
       11: bipush        20 
       13: istore_0
       14: aload_2 
       15: athrow
     Exception table:
        from    to  target type 
            3     5    10   any 
     LineNumberTable: ...
     LocalVariableTable:
       Start  Length  Slot  Name   Signature 
           3      13     0     i   I2.13 synchronized
```





### synchronized



```java
public class Demo3_13 {
    public static void main(String[] args) { 
        Object lock = new Object();
        synchronized (lock) {
            System.out.println("ok"); 
        }
    }  
}
```





**字节码：**



**注意**：方法级别的 synchronized 不会在字节码指令中有所体现



**异常表机制可以保证加锁解锁成对完成：**

- 正常流程为：11-22加解锁操作
- 发生异常流程为：根据异常表，12-22出现异常会跳到25
  - 存储异常对象引用到slot3，加载slot2即lock到操作数栈进行后续解锁操作
  - 解锁完毕，加载异常对象引用slot3到操作数栈，进行抛异常操作
  - 根据异常表，若25-28发生异常会重新进入25



```java
public static void main(java.lang.String[]); 
   descriptor: ([Ljava/lang/String;)V
   flags: ACC_PUBLIC, ACC_STATIC 
   Code:
     stack=2, locals=4, args_size=1
        0: new           #2        // new Object 
        3: dup					   // 复制一份引用到操作数栈，一份调用构造方法使用然后出栈，一份为了调用成员方法变量
        4: invokespecial #1        // invokespecial <init>:()V 
        7: astore_1                // lock引用    -> lock
        8: aload_1                 // <- lock （synchronized开始） 
        9: dup					   // 复制一份，一份用于monitorenter加锁，一份用于monitorexit解锁操作
       10: astore_2                // lock引用    -> slot 2
       11: monitorenter            // monitorenter(lock引用) 
       12: getstatic     #3        // <- System.out
       15: ldc           #4        // <- "ok"
       17: invokevirtual #5        // invokevirtual println: 
(Ljava/lang/String;)V
       20: aload_2                 // <- slot 2(lock引用) 
       21: monitorexit             // monitorexit(lock引用) 
       22: goto          30
       25: astore_3                // any -> slot 3
       26: aload_2                 // <- slot 2(lock引用) 
       27: monitorexit             // monitorexit(lock引用) 
       28: aload_3
       29: athrow
       30: return
      // 异常表
     Exception table:
        from    to  target type 
           12    22    25   any 
           25    28    25   any 
     LineNumberTable: ...
     LocalVariableTable:
       Start  Length  Slot  Name   Signature
           0      31     0  args   [Ljava/lang/String; 
           8      23     1  lock   Ljava/lang/Object; 
     StackMapTable: ...
   MethodParameters: ...
```













## 3、编译期处理





> 所谓的 **语法糖** ，其实就是指 java 编译器把 **.java 源码编译为 .class 字节码的过程**中，自动生成和转换的一些代码，主要是为了减轻程序员的负担，算是 java 编译器给我们的一个额外福利。
>
> 注意，以下代码的分析，借助了 javap 工具，idea 的反编译功能，idea 插件 jclasslib 等工具。另外， 编译器转换的结果直接就是 class 字节码，只是为了便于阅读，给出了 几乎等价 的 java 源码方式，并不是编译器还会转换出中间的 java 源码，切记。



### 默认构造函数



```java
public class Candy1 {

}
```

经过编译期优化后



```java
public class Candy1 {
    //这个无参构造器是java编译器帮我们加上的
    public Candy1() {
        //即调用父类 Object 的无参构造方法，即调用 java/lang/Object." <init>":()V
        super();
    }
}
```



### 自动拆装箱

基本类型和其包装类型的相互转换过程，称为拆装箱

在JDK 5以后，它们的转换可以在编译期自动完成



```java
public class Demo2 {
    public static void main(String[] args) {
        Integer x = 1;
        int y = x;
    }
}
```

转换过程如下

```java
public class Demo2 {
    public static void main(String[] args) {
        //基本类型赋值给包装类型，称为装箱
        Integer x = Integer.valueOf(1);
        //包装类型赋值给基本类型，称谓拆箱
        int y = x.intValue();
    }
}
```

### 泛型集合取值

- 泛型也是在 JDK 5 开始加入的特性，但 java 在**编译泛型代码后**会执行 **泛型擦除** 的动作
- 即泛型信息在编译为字节码之后就**丢失**了，实际的类型都当做了 **Object** 类型来处理：

```java
public class Demo3 {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(10); // 实际调用的是    List.add(Object e)
        Integer x = list.get(0); // 实际调用的是    Object obj = List.get(int index);
    }
}
```





所以调用get函数取值时，有一个类型转换的操作

```java
Integer x = (Integer) list.get(0);
```

如果要将返回结果赋值给一个int类型的变量，则还有**自动拆箱**的操作

```java
int x = (Integer) list.get(0).intValue();
```



**对应字节码**

- **擦除的是字节码上的泛型信息**，可以看到 **LocalVariableTypeTable** 仍然保留了方法参数泛型的信息



```java
Code:
    stack=2, locals=3, args_size=1
       0: new           #2                  // class java/util/ArrayList
       3: dup
       4: invokespecial #3                  // Method java/util/ArrayList."<init>":()V
       7: astore_1
       8: aload_1
       9: bipush        10
      11: invokestatic  #4                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
      //这里进行了泛型擦除，实际调用的是add(Objcet o)
      14: invokeinterface #5,  2            // InterfaceMethod java/util/List.add:(Ljava/lang/Object;)Z

      19: pop
      20: aload_1
      21: iconst_0
      //这里也进行了泛型擦除，实际调用的是get(Object o)   
      22: invokeinterface #6,  2            // InterfaceMethod java/util/List.get:(I)Ljava/lang/Object;
	  //这里进行了类型转换，将Object转换成了Integer
      27: checkcast     #7                  // class java/lang/Integer
      30: astore_2
      31: return
    LineNumberTable:
       line 8: 0
       line 9: 8
       line 10: 20
       line 11: 31
     LocalVariableTable:
       Start  Length  Slot  Name   Signature
           0      32     0  args   [Ljava/lang/String; 
           8      24     1  list   Ljava/util/List; 
     LocalVariableTypeTable:
       Start  Length  Slot  Name   Signature
           8      24     1  list   Ljava/util/List<Ljava/lang/Integer;>;
```



**使用反射，仍然能够获得这些信息：**

```java
public Set<Integer> test(List<String> list, Map<Integer, Object> map) { 
}
```



```java
Method test = Candy3.class.getMethod("test", List.class, Map.class); 
Type[] types = test.getGenericParameterTypes();
for (Type type : types) {
    if (type instanceof ParameterizedType) {
        ParameterizedType parameterizedType = (ParameterizedType) type; 
        System.out.println("原始类型    - " + parameterizedType.getRawType()); 
        Type[] arguments = parameterizedType.getActualTypeArguments(); 
        for (int i = 0; i < arguments.length; i++) {
            System.out.printf("泛型参数[%d] - %s\n", i, arguments[i]); 
        }
    } 
}
```



**输出：**

```
原始类型    - interface java.util.List 
泛型参数[0] - class java.lang.String 
原始类型    - interface java.util.Map 
泛型参数[0] - class java.lang.Integer 
泛型参数[1] - class java.lang.Object
```



### 可变参数



可变参数也是 JDK5 开始加入的新特性：

```java
public class Demo4 {
   public static void foo(String... args) {
      //将args赋值给arr，可以看出String...实际就是String[] 
      String[] arr = args;
      System.out.println(arr.length);
   }

   public static void main(String[] args) {
      foo("hello", "world");
   }
}
```



可变参数 **String…** args 其实是一个 **String[]** args ，从代码中的赋值语句中就可以看出来。 同 样 java 编译器会在编译期间将上述代码变换为：

```java
public class Demo4 {
   public Demo4 {}

    
   public static void foo(String[] args) {
      String[] arr = args;
      System.out.println(arr.length);
   }

   public static void main(String[] args) {
      foo(new String[]{"hello", "world"});
   }
}
```

注意，如果调用的是foo()，即未传递参数时，等价代码为foo(new String[]{})，**创建了一个空数组**，而不是直接传递的null





### foreach

```java
public class Demo5 {
    public static void main(String[] args) {
        //数组赋初值的简化写法也是一种语法糖。
        int[] arr = {1, 2, 3, 4, 5};
        for(int x : arr) {
            System.out.println(x);
        }
    }
}
```

编译器会帮我们转换为

```java
public class Demo5 {
    public Demo5 {}

    public static void main(String[] args) {
        int[] arr = new int[]{1, 2, 3, 4, 5};
        for(int i=0; i<arr.length; ++i) {
            int x = arr[i];
            System.out.println(x);
        }
    }
}
```

**如果是集合使用foreach**

```java
public class Demo5 {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        for (Integer x : list) {
            System.out.println(x);
        }
    }
}
```

集合要使用foreach，需要该集合类实现了**Iterable接口**，因为集合的遍历需要用到**迭代器Iterator**

```java
public class Demo5 {
    public Demo5 {}

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        //获得该集合的迭代器
        Iterator<Integer> iterator = list.iterator();
        while(iterator.hasNext()) {
            Integer x = iterator.next();
            System.out.println(x);
        }
    }
}
```

### switch字符串

从 JDK 7 开始，switch 可以作用于字符串和枚举类，这个功能其实也是语法糖，例如



```java
public class Demo6 {
    public static void main(String[] args) {
        String str = "hello";
        switch (str) {
            case "hello" :
                System.out.println("h");
                break;
            case "world" :
                System.out.println("w");
                break;
            default:
                break;
        }
    }
}
```

在编译器中执行的操作

```java
public class Demo6 {
    public Demo6() {

    }
    public static void main(String[] args) {
        String str = "hello";
        int x = -1;
        //通过字符串的hashCode+value来判断是否匹配
        switch (str.hashCode()) {
                //hello的hashCode
            case 99162322 :
                //再次比较，因为字符串的hashCode有可能相等
                if(str.equals("hello")) {
                    x = 0;
                }
                break;
                //world的hashCode
            case 11331880 :
                if(str.equals("world")) {
                    x = 1;
                }
                break;
            default:
                break;
        }

        //用第二个switch在进行输出判断
        switch (x) {
            case 0:
                System.out.println("h");
                break;
            case 1:
                System.out.println("w");
                break;
            default:
                break;
        }
    }
}
```

**过程说明：**

- 在编译期间，单个的switch被分为了两个
  - 第一个用来匹配字符串，并给x赋值
    - 字符串的匹配用到了字符串的hashCode，还用到了equals方法
    - 使用hashCode是为了提高比较效率，使用equals是防止有hashCode冲突（如BM和C.）
  - 第二个用来根据x的值来决定输出语句









### switch枚举



```java
public class Demo7 {
   public static void main(String[] args) {
      SEX sex = SEX.MALE;
      switch (sex) {
         case MALE:
            System.out.println("man"); break;
         case FEMALE:
            System.out.println("woman"); break;
         default:
            break;
      }
   }
}

enum SEX {
   MALE, FEMALE;
}
```

编译器中执行的代码如下

```java
public class Demo7 {
   /**     
    * 定义一个合成类（仅 jvm 使用，对我们不可见）     
    * 用来映射枚举的 ordinal 与数组元素的关系     
    * 枚举的 ordinal 表示枚举对象的序号，从 0 开始     
    * 即 MALE 的 ordinal()=0，FEMALE 的 ordinal()=1     
    */ 
   static class $MAP {
      //数组大小即为枚举元素个数，里面存放了case用于比较的数字
      static int[] map = new int[2];
      static {
         //ordinal即枚举元素对应所在的位置，MALE为0，FEMALE为1
         map[SEX.MALE.ordinal()] = 1;
         map[SEX.FEMALE.ordinal()] = 2;
      }
   }

   public static void main(String[] args) {
      SEX sex = SEX.MALE;
      //将对应位置枚举元素的值赋给x，用于case操作
      int x = $MAP.map[sex.ordinal()];
      switch (x) {
         case 1:
            System.out.println("man");
            break;
         case 2:
            System.out.println("woman");
            break;
         default:
            break;
      }
   }
}

enum SEX {
   MALE, FEMALE;
}
```

### 枚举类

```java
enum SEX {
   MALE, FEMALE;
}
```

转换后的代码

```java
public final class Sex extends Enum<Sex> {   
    //对应枚举类中的元素
    public static final Sex MALE;    
    public static final Sex FEMALE;    
    private static final Sex[] $VALUES;

    static {       
        //调用构造函数，传入枚举元素的值及ordinal
        MALE = new Sex("MALE", 0);    
        FEMALE = new Sex("FEMALE", 1);   
        $VALUES = new Sex[]{MALE, FEMALE}; 
    }

    //调用父类中的方法
    private Sex(String name, int ordinal) {     
        super(name, ordinal);    
    }

    public static Sex[] values() {  
        return $VALUES.clone();  
    }
    public static Sex valueOf(String name) { 
        return Enum.valueOf(Sex.class, name);  
    }
}
```





### try-with-resources

JDK 7 开始新增了对需要关闭的资源处理的特殊语法`try-with-resources`：

```java
try(资源变量    = 创建资源对象){ 
} catch( ) {
}
```



其中资源对象需要实现 AutoCloseable接口，例如工InputStream、OutputStream 、Connection、Statement、Resultset等接口都实现了Autocloseable，使用try-with-resources可以不用写finally语句块，编译器会帮助生成关闭资源代码，例如：



```java
public class Candy9 {
    public static void main(String[] args) {
        try(InputStream is = new FileInputStream("d:\\1.txt")) { 
            System.out.println(is);
        } catch (IOException e) { 
            e.printStackTrace(); 
        }
    } 
}
```

会被转换为：

```java
public class Candy9 { 
    public Candy9() { 
    }
    public static void main(String[] args) { 
        try {
            InputStream is = new FileInputStream("d:\\1.txt"); 
            Throwable t = null;
            try {
                System.out.println(is); 
            } catch (Throwable e1) { 
                // t 是我们代码出现的异常 
                t = e1;
                throw e1;
            } finally {
                // 判断了资源不为空
                if (is != null) {
                    // 如果我们代码有异常 
                    if (t != null) { 
                        try {
                            is.close();
                        } catch (Throwable e2) {
                            // 如果    close 出现异常，作为被压制异常添加 
                            t.addSuppressed(e2);
                        } 
                    } else {
                        // 如果我们代码没有异常，close 出现的异常就是最后    catch 块中的    e 
                        is.close();
                    } 
                }
            }
        }
    } catch (IOException e) { 
        e.printStackTrace(); 
    }
}
```



为什么要设计一个 addSuppressed(Throwable e) （添加被压制异常）的方法呢？

是为了**防止异常信息的丢失**（ try-with-resources 生成的 ﬁanlly中如果抛出了异常）：




```java
public class Test6 {
    public static void main(String[] args) {
        try (MyResource resource = new MyResource()) { 
            int i = 1/0;
        } catch (Exception e) { 
            e.printStackTrace(); 
        }
    } 
}
class MyResource implements AutoCloseable { 
    public void close() throws Exception { 
        throw new Exception("close 异常"); 
    }
}
```



**输出：**

如以上代码所示，两个异常信息都不会丢。

```java
java.lang.ArithmeticException: / by zero
	at test.Test6.main(Test6.java:7) 
	Suppressed: java.lang.Exception: close 异常
        at test.MyResource.close(Test6.java:18) 
        at test.Test6.main(Test6.java:6)
```





### 方法重写时的桥接方法



我们都知道，方法重写时对返回值分两种情况：

- 父子类的返回值完全一致
- 子类返回值可以是父类返回值的子类（比较绕口，见下面的例子）



```java
class A {
    public Number m() { 
        return 1;
    } 
}
class B extends A { 
    @Override
    // 子类m 方法的返回值是Integer 是父类m 方法返回值 Number 的子类 
    public Integer m() {
        return 2; 
    }
}
```



对于子类，java 编译器会做如下处理

```java
class B extends A {
    public Integer m() { 
        return 2;
    }
    // 此方法才是真正重写了父类 public Number m() 方法 
    public synthetic bridge Number m() {
        // 调用 public Integer m() 
        return m();
    } 
}
```



其中桥接方法比较特殊，仅对 java 虚拟机可见，并且与原来的 public Integer m() 没有命名冲突，可以用下面反射代码来验证：

```java
for (Method m : B.class.getDeclaredMethods()) { 
    System.out.println(m);
}
```

会输出：

```java
public java.lang.Integer test.candy.B.m() 
public java.lang.Number test.candy.B.m()
```





### 匿名内部类



**源代码：**

```java
public class Demo8 {
    public static void main(String[] args) {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                System.out.println("running...");
            }
        };
    }
}
```

**转换后的代码**

```java
public class Demo8 {
    public static void main(String[] args) {
        //用额外创建的类来创建匿名内部类对象
        Runnable runnable = new Demo8$1();
    }
}

//创建了一个额外的类，实现了Runnable接口
final class Demo8$1 implements Runnable {
    public Demo8$1() {}

    @Override
    public void run() {
        System.out.println("running...");
    }
}
```

如果匿名内部类中引用了**局部变量**



**注意**：内部类引用局部变量，必须是final类型

- **为了避免方法内的变量脱离方法而存在的现象发生**，于是jdk1.8之前java规定局部内部类不能访问一般的局部变量，但能访问被final修饰的变量
- jdk1.8之后不需要手动添加final，jvm底层会帮你添加，被称之为 effectively final



这同时解释了为什么匿名内部类引用局部变量时，局部变量必须是 ﬁnal 的：

因为在创建 `Candy11$1` 对象时，将 x 的值赋值给了   `Candy11$1` 对象的 `val$x` 属性，所以 x 不应该再发生变化了，如果变化，那么 `val$x` 属性没有机会再跟着一起变化！





```java
public class Candy11 {
    public static void test(final int x) { 
        Runnable runnable = new Runnable() { 
            @Override
            public void run() {
                System.out.println("ok:" + x); 
            }
        }; 
    }
}
```

**转化后代码**

```java
// 额外生成的类
final class Candy11$1 implements Runnable { 
    int val$x;
    Candy11$1(int x) { 
        this.val$x = x; 
    }
    public void run() {
        System.out.println("ok:" + this.val$x); 
    }
}

public class Candy11 {
    public static void test(final int x) { 
        Runnable runnable = new Candy11$1(x); 
    }
}
```



## 4、类加载阶段



### 加载



- 将类的字节码载入方法区（1.8后为元空间，在本地内存中）中，内部采用 C++ 的 **instanceKlass** 描述 java 类，它的重要 ﬁeld 有：
  - _java_mirror 即 java 的**类镜像**，例如对 String 来说，它的镜像类就是 String.class，作用是把 klass 暴露给 java 使用
  - _super 即父类
  - _ﬁelds 即成员变量
  - _methods 即方法
  - _constants 即常量池
  - _class_loader 即类加载器
  - _vtable 虚方法表
  - _itable 接口方法
- 如果这个类还有父类没有加载，**先加载父类**
- 加载和链接可能是**交替运行**的



**注意：**

- **instanceKlass** 这样的【**元数据**】是存储在**方法区**（1.8 后的元空间内）

- 但 **_java_mirror** 是存储在**堆中**

- 类的对象在对象头中保存了`*.class`的地址。让对象可以通过其找到方法区中的instanceKlass，从而获取类的各种信息



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/799c41ce1d6bed10e1a0eade4ec4b3a7.png)



### 链接





#### 验证

验证类是否符合 JVM规范，安全性检查



#### 准备

为 static 变量分配空间，设置默认值

- static变量在**JDK 7以前是存储于instanceKlass末尾**。但在**JDK 7以后就存储在_java_mirror末尾了**
- static变量在分配空间和赋值是在**两个阶段**完成的。
  - **分配空间**在准备阶段完成
  - **赋值**在**初始化阶段（类构造方法）**完成（反编译字节码可以看到）
- 如果 static 变量是 ﬁnal 的**基本类型**，以及**字符串常量**，那么编译阶段值就确定了，**赋值在准备阶段完成**
- 如果 static 变量是 ﬁnal 的，但属于**引用类型**，那么赋值也会在**初始化阶段完成**



```java
public class Demo3 {

    // 没有出现在构造方法中(只进行了分配空间操作)
    static int a;
    // 出现在构造方法中（分配空间 + 赋值（发生在构造方法中，即类加载的第三个阶段：初始化阶段））
    static int b = 5;
	// final修饰 基本类型 字符串常量 编译阶段即可确定，赋值在 准备阶段
    static final int c = 10;
    static final String d = "hello";
    // final修饰 引用类型，赋值在初始化阶段完成（类构造方法）
    static final Object o = new Object();
}
```



**字节码反编译结果：**

```java
{
  static int a;
    descriptor: I
    flags: (0x0008) ACC_STATIC

  static int b;
    descriptor: I
    flags: (0x0008) ACC_STATIC

  static final int c;
    descriptor: I
    flags: (0x0018) ACC_STATIC, ACC_FINAL
    ConstantValue: int 10

  static final java.lang.String d;
    descriptor: Ljava/lang/String;
    flags: (0x0018) ACC_STATIC, ACC_FINAL
    ConstantValue: String hello

  static final java.lang.Object o;
    descriptor: Ljava/lang/Object;
    flags: (0x0018) ACC_STATIC, ACC_FINAL

  public com.itnxd.jvm.constant.Demo3();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0 // 指this
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 14: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/itnxd/jvm/constant/Demo3;

  static {}; // 类构造方法信息
    descriptor: ()V
    flags: (0x0008) ACC_STATIC
    Code:
      stack=2, locals=0, args_size=0
         0: iconst_5
         1: putstatic     #2                  // Field b:I 为常量池中的b赋值
         4: new           #3                  // class java/lang/Object
         7: dup
         8: invokespecial #1                  // Method java/lang/Object."<init>":()V
        11: putstatic     #4                  // Field o:Ljava/lang/Object;
        14: return
      LineNumberTable:
        line 17: 0
        line 22: 4
}
SourceFile: "Demo3.java"

```





#### 解析



将常量池中的符号引用解析为直接引用



- **未解析时（即new C()注释）**，常量池中的看到的对象仅是符号，未真正的存在于内存中
- 查看类C的常量池，可以看到类D**未被解析**，只是存在于常量池中的符号
- **解析以后（即new C()取消注释）**，**会将常量池中的符号引用解析为直接引用**
- 可以看到，此时已加载并解析了类C和类D



```java
public class Demo1 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ClassLoader loader = Demo1.class.getClassLoader();
        //只加载不解析
        Class<?> c = loader.loadClass("com.nyima.JVM.day8.C");
        
        // new C();
        
        System.in.read();
    }
}

class C {
    D d = new D();
}

class D {

}
```







### 初始化



`<cinit>()V `方法



初始化阶段就是**执行类构造器clinit()方法的过程**，虚拟机会保证这个类的『构造方法』的线程安全

- clinit()方法是由编译器自动收集类中的所有类变量的**赋值动作和静态语句块**（static{}块）中的语句合并产生的
- **注意**：编译器收集的顺序是由语句在源文件中**出现的顺序决定**的，静态语句块中只能访问到定义在静态语句块之前的变量，定义在它**之后**的变量，在前面的静态语句块**可以赋值，但是不能访问**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/16/044cc27924dce9f85a6176651875b5b3.png)



**发生的时机？**

概括得说，类初始化是【**懒惰的**】

- main 方法所在的类，总会被首先初始化
- 首次访问这个类的静态变量或静态方法时
- 子类初始化，如果父类还没初始化，会引发 
- 子类访问父类的静态变量，只会触发父类的初始化 
- Class.forName
- new 会导致初始化 

**不会导致类初始化的情况？**

- 访问类的 static ﬁnal 静态常量（基本类型和字符串）不会触发初始化 （链接的准备阶段发生）
- 类对象.class 不会触发初始化（加载阶段发生）
- 创建该类的数组不会触发初始化 
- 类加载器的 loadClass 方法 
- Class.forName 的参数 2 为 false 时



**实验验证？**

- 只要能打印出类中静态代码块的内容，则说明发生了初始化！

```java
class A {
    static int a = 0;    
    static {
        System.out.println("a init"); 
    }
}
class B extends A {
    final static double b = 5.0; 
    static boolean c = false; 
    static {
        System.out.println("b init"); 
    }
}
```



验证（实验时请先全部注释，每次只执行其中一个）

```java
public class Load3 { 
    static {
        System.out.println("main init"); 
    }
    public static void main(String[] args) throws ClassNotFoundException { 
        // 1. 静态常量（基本类型和字符串）不会触发初始化
        System.out.println(B.b);
        // 2. 类对象.class 不会触发初始化 
        System.out.println(B.class); 
        // 3. 创建该类的数组不会触发初始化 
        System.out.println(new B[0]); 
        // 4. 不会初始化类    B，但会加载    B、A
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        cl.loadClass("cn.itcast.jvm.t3.B"); 
        // 5. 不会初始化类    B，但会加载    B、A
        ClassLoader c2 = Thread.currentThread().getContextClassLoader(); 
        Class.forName("cn.itcast.jvm.t3.B", false, c2);
        // 1. 首次访问这个类的静态变量或静态方法时 
        System.out.println(A.a);
        // 2. 子类初始化，如果父类还没初始化，会引发 
        System.out.println(B.c);
        // 3. 子类访问父类静态变量，只触发父类初始化 
        System.out.println(B.a);
        // 4. 会初始化类    B，并先初始化类    A
        Class.forName("cn.itcast.jvm.t3.B"); 
    }
}
```



### 小练习



从字节码分析，使用 a，b，c 这三个常量是否会导致 E 初始化

```java
public class Load4 {
    public static void main(String[] args) {
        System.out.println(E.a); // 不会
        System.out.println(E.b); // 不会
        System.out.println(E.c);  // 会
    }
}
class E {
    // 链接的准备阶段就直接编译确定了
    public static final int a = 10;
    public static final String b = "hello";
    
    // 其实是一个自动包装过程，会进入初始化阶段
    public static final Integer c = 20; 
    
    static{
        System.out.println("E init");
    }
}
```



**典型应用 - 完成懒惰初始化单例模式**



以上的实现特点是：

- **懒惰实例化**
  - 只有调用了getInstance方法才会触发初始化
- 初始化时的**线程安全**是有保障的
  - 内部类的静态变量赋值操作和静态代码块是**由类加载器包装线程安全性的**



```java
public final class Singleton { 
    private Singleton() { } 
    // 内部类中保存单例
    private static class LazyHolder {
        static final Singleton INSTANCE = new Singleton(); 
        static{
            System.out.println("LazyHolder init");
        }
    }
    // 第一次调用  getInstance 方法，才会导致内部类加载和初始化其静态成员 
    public static Singleton getInstance() {
        return LazyHolder.INSTANCE; 
    }
}
```





## 5、类加载器





### 类与类加载器





Java虚拟机设计团队有意把类加载阶段中的**“通过一个类的全限定名来获取描述该类的二进制字节流”**这个动作放到Java虚拟机外部去实现，以便让应用程序自己决定如何去获取所需的类。实现这个动作的代码被称为**“类加载器”**（ClassLoader）



类加载器虽然只用于实现类的加载动作，但它在Java程序中起到的作用却远超类加载阶段

对于任意一个类，都必须由加载它的**类加载器**和这个**类本身**一起共同确立其在Java虚拟机中的唯一性，每一个类加载器，都拥有一个独立的类名称空间。这句话可以表达得更通俗一些：**比较两个类是否“相等”，只有在这两个类是由同一个类加载器加载的前提下才有意义**，否则，即使这两个类来源于同一个Class文件，被同一个Java虚拟机加载，只要加载它们的类加载器不同，那这两个类就必定不相等。



以JDK 8为例



| 名称                                      | 加载的类              | 说明                            |
| ----------------------------------------- | --------------------- | ------------------------------- |
| Bootstrap ClassLoader（启动类加载器）     | JAVA_HOME/jre/lib     | 无法直接访问                    |
| Extension ClassLoader(拓展类加载器)       | JAVA_HOME/jre/lib/ext | 上级为Bootstrap，**显示为null** |
| Application ClassLoader(应用程序类加载器) | classpath             | 上级为Extension                 |
| 自定义类加载器                            | 自定义                | 上级为Application               |

- 拓展类加载器上级是启动类加载器，但是启动类加载器是C++/C写的，因此getParent获取不到，为null
- 流程：
  - 由下往上问加载了没，加载了就不加载了
  - 若没加载，则由上往下问谁可以加载





### 启动类加载器



用 Bootstrap 类加载器加载类：



```java
package cn.itcast.jvm.t3.load; 
public class F {
    static {
        System.out.println("bootstrap F init"); 
    }
}
```

执行

```java
package cn.itcast.jvm.t3.load; 
public class Load5_1 {
   public static void main(String[] args) throws ClassNotFoundException { 
       Class<?> aClass = Class.forName("cn.itcast.jvm.t3.load.F");
       // 启动类 null(获取不到位null) 拓展类 ExtClassLoader 应用程序类 AppClassLoader 
       System.out.println(aClass.getClassLoader()); // null
 }
}
```



- `-Xbootclasspath` 表示设置 `bootclasspath`

- 其中 `/a:.` 表示将当前目录追加至 `bootclasspath` 之后 

- 可以用这个办法替换核心类

  - `java -Xbootclasspath:<new bootclasspath>`

  - `java -Xbootclasspath/a:<追加路径>`：后追加

  - `java -Xbootclasspath/p:<追加路径>`：前追加

```java
E:\git\jvm\out\production\jvm>java -Xbootclasspath/a:. 
cn.itcast.jvm.t3.load.Load5
bootstrap F init 
null
```





### 扩展类加载器



如果classpath（应用程序）和JAVA_HOME/jre/lib/ext（拓展类） 下有同名类，加载时会使用**拓展类加载器**加载。

当应用程序类加载器发现拓展类加载器已将该同名类加载过了，则不会再次加载





```java
package cn.itcast.jvm.t3.load; 
public class G {
    static {
        System.out.println("classpath G init"); 
    }
}
```

执行

```java
public class Load5_2 {
    public static void main(String[] args) throws ClassNotFoundException { 
        Class<?> aClass = Class.forName("cn.itcast.jvm.t3.load.G");
        System.out.println(aClass.getClassLoader());  // AppClassLoader
    }
}
```

输出

```java
classpath G init
    sun.misc.Launcher$AppClassLoader@18b4aac2
```

写一个同名的类

```java
package cn.itcast.jvm.t3.load; 
public class G {
    static {
        System.out.println("ext G init"); 
    }
}
```

打个 jar 包

```java
E:\git\jvm\out\production\jvm>jar -cvf my.jar cn/itcast/jvm/t3/load/G.class 
    已添加清单
    正在添加: cn/itcast/jvm/t3/load/G.class(输入    = 481) (输出    = 322)(压缩了    33%)
```



- 将 jar 包拷贝到   JAVA_HOME/jre/lib/ext 
- 重新执行 Load5_2

输出

```java
ext G init
    sun.misc.Launcher$ExtClassLoader@29453f44
```



### 双亲委派模式



所谓的双亲委派，就是指调用类加载器的 loadClass 方法时，查找类的规则



**注意**

这里的双亲，翻译为上级似乎更为合适，因为它们并没有继承关系



```java
protected Class<?> loadClass(String name, boolean resolve) 
    throws ClassNotFoundException {
    synchronized (getClassLoadingLock(name)) { 
        // 1. 检查该类是否已经加载过
        Class<?> c = findLoadedClass(name); 
        // 未加载过
        if (c == null) {
            long t0 = System.nanoTime(); 
            try {
                // 看是否被它的上级加载器加载过了 Extension的上级是Bootstarp，但它显示为null
                if (parent != null) {
                    // 2. 有上级的话，委派上级    loadClass (递归)
                    c = parent.loadClass(name, false); 
                } else {
                    // 3. 如果没有上级了（ExtClassLoader），则委派 
                    BootstrapClassLoader
                        c = findBootstrapClassOrNull(name); 
                }
            } catch (ClassNotFoundException e) { //捕获异常，但不做任何处理
            }
            //如果还是没有找到，先让拓展类加载器调用findClass方法去找到该类，如果还是没找到，就抛出异常
            //然后让应用类加载器去classpath下找该类
            if (c == null) {
                long t1 = System.nanoTime();
                // 4. 每一层找不到，调用    findClass 方法（每个类加载器自己扩展）来加载 
                c = findClass(name);
                // 5. 记录耗时
                sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                sun.misc.PerfCounter.getFindClasses().increment(); 
            }
        }
        if (resolve) {
            resolveClass(c); 
        }
        return c; 
    }
}
```



```java
public class Load5_3 {
    public static void main(String[] args) throws ClassNotFoundException { 
        Class<?> aClass = Load5_3.class.getClassLoader()
            .loadClass("cn.itcast.jvm.t3.load.H"); 
        System.out.println(aClass.getClassLoader()); 
    }
}
```





**执行流程为：**  

递归过程：

```java
1. sun.misc.Launcher$AppClassLoader //1 处，开始查看已加载的类，结果没有
2. sun.misc.Launcher$AppClassLoader // 2 处，委派上级
   sun.misc.Launcher$ExtClassLoader.loadClass()
3. sun.misc.Launcher$ExtClassLoader // 1 处，查看已加载的类，结果没有
4. sun.misc.Launcher$ExtClassLoader // 3 处，没有上级了，则委派 BootstrapClassLoader 查找
5. BootstrapClassLoader 是在 JAVA_HOME/jre/lib 下找 H 这个类，显然没有
6. sun.misc.Launcher$ExtClassLoader // 4 处，调用它自己的 ﬁndClass 方法，在JAVA_HOME/jre/lib/ext 下找 H 这个类，显然没有，回到 sun.misc.Launcher$AppClassLoader //2处                                            
7. 继续执行到 sun.misc.Launcher$AppClassLoader // 4 处，调用它自己的 ﬁndClass 方法，在 classpath 下查找，找到了
```





### 线程上下文类加载器



我们在使用 JDBC 时，都需要加载 Driver 驱动，不知道你注意到没有，不写：



```java
Class.forName("com.mysql.jdbc.Driver")
```



也是可以让 com.mysql.jdbc.Driver 正确加载的，你知道是怎么做的吗？

让我们追踪一下源码：



```java
public class DriverManager {
    // 注册驱动的集合
    private final static CopyOnWriteArrayList<DriverInfo> registeredDrivers
        = new CopyOnWriteArrayList<>();
    // 初始化驱动
    static {
        loadInitialDrivers();
        println("JDBC DriverManager initialized");
    }
```



先不看别的，看看 DriverManager 的类加载器：



```java
System.out.println(DriverManager.class.getClassLoader());
```



**打印 null**，表示它的**类加载器是 Bootstrap ClassLoader**，会到 JAVA_HOME/jre/lib 下搜索类，但 JAVA_HOME/jre/lib 下显然没有 mysql-connector-java-5.1.47.jar 包，这样问题来了，在DriverManager 的静态代码块中，**怎么能正确加载 com.mysql.jdbc.Driver 呢？**



**继续看 loadInitialDrivers() 方法：**



```java
private static void loadInitialDrivers() {
    String drivers;
    try {
        drivers = AccessController.doPrivileged(new PrivilegedAction<String>() {
            public String run() {
                return System.getProperty("jdbc.drivers");
            }
        });
    } catch (Exception ex) {
        drivers = null;
    }
    // 1）使用 ServiceLoader 机制加载驱动，即 SPI
    AccessController.doPrivileged(new PrivilegedAction<Void>() {
        public Void run() {
            ServiceLoader<Driver> loadedDrivers =
                ServiceLoader.load(Driver.class);
            Iterator<Driver> driversIterator = loadedDrivers.iterator();
            try{
                while(driversIterator.hasNext()) {
                    driversIterator.next();
                }
            } catch(Throwable t) {
                // Do nothing
            }
            return null;
        }
    });
    println("DriverManager.initialize: jdbc.drivers = " + drivers);
    // 2）使用 jdbc.drivers 定义的驱动名加载驱动
    if (drivers == null || drivers.equals("")) {
        return;
    }
    String[] driversList = drivers.split(":");
    println("number of Drivers:" + driversList.length);
    for (String aDriver : driversList) {
        try {
            println("DriverManager.Initialize: loading " + aDriver);
            // 这里的 ClassLoader.getSystemClassLoader() 就是应用程序类加载器
            Class.forName(aDriver, true,
                          ClassLoader.getSystemClassLoader());
        } catch (Exception ex) {
            println("DriverManager.Initialize: load failed: " + ex);
        }
    }
}
```



- 先看 2）发现它最后是使用 Class.forName 完成类的加载和初始化，关联的是**应用程序类加载器**，因此可以顺利完成类加载
- 再看 1）它就是大名鼎鼎的 **Service Provider Interface （SPI）**
- 约定如下，在 jar 包的 META-INF/services 包下，以**接口全限定名**名为文件，**文件内容是实现类名称**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/cf8db3ef70987b80290cea67acc51841.png)



这样就可以使用：

```java
ServiceLoader<接口类型> allImpls = ServiceLoader.load(接口类型.class);
Iterator<接口类型> iter = allImpls.iterator();
while(iter.hasNext()) {
    iter.next();
}
```



来得到实现类，体现的是【面向接口编程+解耦】的思想，在下面一些框架中都运用了此思想：

- JDBC
- Servlet 初始化器
- Spring 容器
- Dubbo（对 SPI 进行了扩展）



**接着看 ServiceLoader.load 方法：**

- 获取**线程上下文类加载器**

```java
public static <S> ServiceLoader<S> load(Class<S> service) {
    // 获取线程上下文类加载器
    ClassLoader cl = Thread.currentThread().getContextClassLoader();
    return ServiceLoader.load(service, cl);
}

```



线程上下文类加载器是当前线程使用的类加载器，默认就是应用程序类加载器，它内部又是由Class.forName 调用了线程上下文类加载器完成类加载，具体代码在 ServiceLoader 的内部类LazyIterator 中：



```java
private S nextService() {
    if (!hasNextService())
        throw new NoSuchElementException();
    String cn = nextName;
    nextName = null;
    Class<?> c = null;
    try {
        c = Class.forName(cn, false, loader);
    } catch (ClassNotFoundException x) {
        fail(service,
             "Provider " + cn + " not found");
    }
    if (!service.isAssignableFrom(c)) {
        fail(service,
             "Provider " + cn + " not a subtype");
    }
    try {
        S p = service.cast(c.newInstance());
        providers.put(cn, p);
        return p;
    } catch (Throwable x) {
        fail(service,
             "Provider " + cn + " could not be instantiated",
             x);
    }
    throw new Error(); // This cannot happen
}
```



**小总结？**

- DriverManager本身是使用的启动类加载器
- 但是启动类加载器无法找到数据库驱动
- 因此最终还是使用的应用程序加载器
- 通过 ServiceLoader 利用 Service Provider Interface （**SPI 服务提供接口**）该机制实现
  - jar 包的 META-INF/services 包下，以**接口全限定名**名为文件，**文件内容是实现类名称**
  - 遵循SPI接口的就可以利用ServiceLoader 来找到实现类进行类加载的进行
- ServiceLoader 内部其实就是使用的**线程上下文加载器**（就是**应用程序加载器**）来加载数据库驱动的实现类
- 这就破**坏了双亲委派机制**，不是使用启动类加载器加载的，也不遵循从上到下的关系，直接使用了应用程序加载器加载





### 自定义类加载器



**什么时候需要自定义类加载器？**



- 想加载非 classpath **随意路径**中的类文件
- 都是通过接口来使用实现，希望**解耦**时，常用在**框架设计**
- 这些类希望予以隔离，不同应用的**同名类都可以加载**，不冲突，常见于 **tomcat 容器**



**步骤：**

1. 继承 ClassLoader 父类
2. 要**遵从双亲委派机制**，重写 findClass 方法
  1. 注意不是重写 loadClass 方法，否则不会走双亲委派机制
3. 读取类文件的字节码
4. 调用父类的 defineClass 方法来加载类
5. 使用者调用该类加载器的 loadClass 方法

示例：

准备好两个类文件放入 E:\myclasspath，它实现了 java.util.Map 接口



**判断类是否完全一致？**

- 全限定类名一致
- 类加载器一致
- 不同类加载器相互隔离，不会冲突



```java
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Load7 {
    public static void main(String[] args) throws Exception {
        MyClassLoader classLoader = new MyClassLoader();
        Class<?> c1 = classLoader.loadClass("MapImpl1");
        Class<?> c2 = classLoader.loadClass("MapImpl1");
        System.out.println(c1 == c2); // true

        MyClassLoader classLoader2 = new MyClassLoader();
        Class<?> c3 = classLoader2.loadClass("MapImpl1");
        System.out.println(c1 == c3); // false

        c1.newInstance();
    }
}

class MyClassLoader extends ClassLoader {

    @Override // name 就是类名称
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        String path = "e:\\myclasspath\\" + name + ".class";

        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            Files.copy(Paths.get(path), os);

            // 得到字节数组
            byte[] bytes = os.toByteArray();

            // byte[] -> *.class
            return defineClass(name, bytes, 0, bytes.length);

        } catch (IOException e) {
            e.printStackTrace();
            throw new ClassNotFoundException("类文件未找到", e);
        }
    }
}
```











## 6、运行期优化





### 即时编译器 JIT





#### 分层编译



```java
public class JIT1 {
    public static void main(String[] args) { 
        for (int i = 0; i < 200; i++) {
            long start = System.nanoTime(); 
            for (int j = 0; j < 1000; j++) { 
                new Object();
            }
            long end = System.nanoTime();
            System.out.printf("%d\t%d\n",i,(end - start)); 
        }
    } 
}
```



会发现，时间会越来越短！



**原因如下：**



JVM 将执行状态分成了 5 个层次：

- 0层：解释执行，用解释器将字节码翻译为机器码
- 1层：使用 C1 **即时编译器**编译执行（不带 proﬁling）
- 2层：使用 C1 即时编译器编译执行（带基本的profiling）
- 3层：使用 C1 即时编译器编译执行（带完全的profiling）
- 4层：使用 C2 即时编译器编译执行

**proﬁling** 是指在运行过程中收集一些程序执行状态的数据，例如【方法的调用次数】，【循环的 回边次数】等





##### 即时编译器（JIT）与解释器的区别



- 解释器
  - 将字节码**解释**为机器码，下次即使遇到相同的字节码，仍会执行**重复**的解释
  - 是将字节码解释为针对所有平台都**通用**的机器码
- 即时编译器
  - 将一些字节码**编译**为机器码，**并存入 Code Cache**，下次遇到相同的代码，直接执行，**无需再编译**
  - 根据平台类型，生成平台**特定**的机器码

**策略？**

- 对于大部分的不常用的代码，我们无需耗费时间将其编译成机器码，而是采取解释执行的方式运行；
- 另一方面，对于仅占据小部分的热点代码，我们则可以将其编译成机器码，以达到理想的运行速度。 
- 执行效率上简单比较一下 Interpreter（解释器） < C1（JIT） < C2（JIT），总的目标是发现热点代码（hotspot名称的由来），并优化这些热点代码





刚才的一种优化手段称之为【逃逸分析】，发现新建的对象是否逃逸。可以使用 -XX:-DoEscapeAnalysis 关闭逃逸分析，再运行刚才的示例观察结果



##### 逃逸分析



逃逸分析（Escape Analysis）简单来讲就是，Java Hotspot 虚拟机可以**分析新创建对象的使用范围**，并决定**是否在 Java 堆上**分配内存的一项技术!

- 通过逃逸分析的对象，可将对象直接在栈上分配，而非堆上，极大降低了GC次数，从而提升整体执行效率

逃逸分析的 JVM 参数如下：

- 开启逃逸分析：-XX:+DoEscapeAnalysis
- 关闭逃逸分析：-XX:-DoEscapeAnalysis
- 显示分析结果：-XX:+PrintEscapeAnalysis

逃逸分析技术在 Java SE 6u23+ 开始支持，并默认设置为启用状态，可以不用额外加这个参数



**对象逃逸状态**

- **全局逃逸（GlobalEscape）**
  - 即一个对象的作用范围逃出了**当前方法或者当前线程**，有以下几种场景：
    - 对象是一个静态变量
    - 对象是一个已经发生逃逸的对象
    - 对象作为当前方法的返回值
- **参数逃逸（ArgEscape）**
  - 即一个对象被作为方法参数传递或者被参数引用，但在调用过程中不会发生全局逃逸，这个状态是通过被调方法的字节码确定的
- **没有逃逸**
  - 即方法中的对象没有发生逃逸



**逃逸分析优化**

针对上面第三点，当一个对象**没有逃逸**时，可以得到以下几个虚拟机的优化

**1、锁消除**

我们知道线程同步锁是非常牺牲性能的，当编译器确定当前对象只有当前线程使用，那么就会**移除**该对象的同步锁

例如，StringBuffer 和 Vector 都是用 synchronized 修饰线程安全的，但大部分情况下，它们都只是在当前线程中用到，这样编译器就会优化移除掉这些锁操作

锁消除的 JVM 参数如下：

- 开启锁消除：-XX:+EliminateLocks
- 关闭锁消除：-XX:-EliminateLocks

锁消除在 JDK8 中都是默认开启的，并且锁消除都要建立在逃逸分析的基础上

**2、标量替换**

首先要明白标量和聚合量：

- **基础类型**和**对象的引用**可以理解为**标量**，它们**不能被进一步分解**。

- 而能被进一步分解的量就是**聚合量**，比如：对象，对象是聚合量，它又**可以被进一步分解成标量**
- 将其成员变量分解为分散的变量，这就叫做**标量替换**。

这样，如果一个对象没有发生逃逸，那压根就不用创建它，只会在**栈或者寄存器上**创建它用到的成员标量，节省了内存空间，也提升了应用程序性能

标量替换的 JVM 参数如下：

- 开启标量替换：-XX:+EliminateAllocations
- 关闭标量替换：-XX:-EliminateAllocations
- 显示标量替换详情：-XX:+PrintEliminateAllocations

标量替换同样在 JDK8 中都是默认开启的，并且都要建立在逃逸分析的基础上

**3、栈上分配**

当对象没有发生逃逸时，该**对象**就可以通过标量替换分解成成员标量分配在**栈内存**中，和方法的生命周期一致，**随着栈帧出栈时销毁**，减少了 GC 压力，提高了应用程序性能。





### 方法内联

内联函数就是在程序编译时，编译器将程序中出现的内联函数的调用表达式用内联函数的函数体来直接进行替换



```java
private static int square(final int i) { 
    return i * i;
}
```

```java
System.out.println(square(9));
```

如果发现 square 是热点方法，并且长度不太长时，会进行内联，所谓的内联就是把方法内代码拷贝、粘贴到调用者的位置：

```java
System.out.println(9 * 9);
```

还能够进行**常量折叠**（constant folding）的优化

```java
System.out.println(81);
```

- -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining （解锁隐藏参数）打印inlining 信息
- -XX:CompileCommand=dontinline,`*`JIT2.square：`*`代表任意包，类名.方法名，禁止某个方法 inlining
- -XX:+PrintCompilation 打印编译信息





##### JVM内联函数

C++是否为内联函数由自己决定，Java由**编译器决定**。

Java不支持直接声明为内联函数的，如果想让他内联，你只能够向编译器提出请求: 关键字**final修饰** 用来指明那个函数是希望被JVM内联的，如：



```java
public final void doSomething() {  
    // to do something  
}
```



总的来说，一般的函数都不会被当做内联函数，只有声明了final后，编译器才会考虑是不是要把你的函数变成内联函数

JVM内建有许多运行时优化。首先**短方法**更利于JVM推断。流程更明显，作用域更短，副作用也更明显。如果是长方法JVM可能直接就跪了。

第二个原因则更重要：**方法内联**

如果JVM监测到一些**小方法被频繁的执行**，它会把方法的调用替换成方法体本身，如：

```java
private int add4(int x1, int x2, int x3, int x4) { 
    //这里调用了add2方法
    return add2(x1, x2) + add2(x3, x4);  
}  

private int add2(int x1, int x2) {  
    return x1 + x2;  
}
```

方法调用被替换后

```java
private int add4(int x1, int x2, int x3, int x4) {  
    //被替换为了方法本身
    return x1 + x2 + x3 + x4;  
}
```





### 反射优化



```java
public class Reflect1 {
    public static void foo() {
        System.out.println("foo...");
    }

    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Method foo = Demo3.class.getMethod("foo");
        for(int i = 0; i<=16; i++) {
            foo.invoke(null);
        }
    }
}
```



foo.invoke 前面 0 ~ 15 次调用使用的是 MethodAccessor 的 NativeMethodAccessorImpl 实现

- 内部是调用的native方法，效率偏低

invoke方法源码

```java
@CallerSensitive
public Object invoke(Object obj, Object... args) throws IllegalAccessException, IllegalArgumentException,InvocationTargetException{
    if (!override) {
        if (!Reflection.quickCheckMemberAccess(clazz, modifiers)) {
            Class<?> caller = Reflection.getCallerClass();
            checkAccess(caller, clazz, obj, modifiers);
        }
    }
    //MethodAccessor是一个接口，有3个实现类，其中有一个是抽象类
    MethodAccessor ma = methodAccessor;             // read volatile
    if (ma == null) {
        ma = acquireMethodAccessor();
    }
    return ma.invoke(obj, args);
}
```



会由DelegatingMehodAccessorImpl去调用NativeMethodAccessorImpl

**NativeMethodAccessorImpl源码：**

```java
class NativeMethodAccessorImpl extends MethodAccessorImpl {
    private final Method method;
    private DelegatingMethodAccessorImpl parent;
    private int numInvocations;

    NativeMethodAccessorImpl(Method var1) {
        this.method = var1;
    }

    //每次进行反射调用，会让numInvocation与ReflectionFactory.inflationThreshold的值（15）进行比较，并使使得numInvocation的值加一
    //如果numInvocation>ReflectionFactory.inflationThreshold，则会调用本地方法invoke0方法
    public Object invoke(Object var1, Object[] var2) throws IllegalArgumentException, InvocationTargetException {
        if (++this.numInvocations > ReflectionFactory.inflationThreshold() && !ReflectUtil.isVMAnonymousClass(this.method.getDeclaringClass())) {
             // 使用 ASM 动态生成的新实现代替本地实现，速度较本地实现快    20 倍左右
            MethodAccessorImpl var3 = (MethodAccessorImpl)(new MethodAccessorGenerator()).generateMethod(this.method.getDeclaringClass(), this.method.getName(), this.method.getParameterTypes(), this.method.getReturnType(), this.method.getExceptionTypes(), this.method.getModifiers());
            this.parent.setDelegate(var3);
        }
		// 调用本地实现
        return invoke0(this.method, var1, var2);
    }

    void setParent(DelegatingMethodAccessorImpl var1) {
        this.parent = var1;
    }

    private static native Object invoke0(Method var0, Object var1, Object[] var2);
}

```



```java
//ReflectionFactory.inflationThreshold()方法的返回值
private static int inflationThreshold = 15;
```





- 一开始if条件不满足，就会调用本地方法invoke0
- 随着numInvocation的增大，当它大于ReflectionFactory.inflationThreshold的值16时，就会本地方法访问器替换为一个运行时动态生成的访问器，来提高效率
  - 这时会从反射调用变为**正常调用**，即直接调用 Reflect1.foo()

**注意：通过查看   ReflectionFactory 源码可知**

- sun.reﬂect.noInﬂation 可以用来禁用膨胀（直接生成 GeneratedMethodAccessor1，但首次生成比较耗时，如果仅反射调用一次，不划算）
- sun.reﬂect.inﬂationThreshold 可以修改膨胀阈值





# 五、内存模型



## 1、Java 内存模型



很多人将【java 内存结构】与【java 内存模型】傻傻分不清，【java 内存模型】是 Java Memory Model（JMM）的意思。

简单的说，JMM 定义了一套在多线程读写共享数据时（成员变量、数组）时，对数据的可见性、有序性、和原子性的规则和保障

- 原子性 - 保证指令不会受到线程上下文切换的影响
- 可见性 - 保证指令不会受 cpu 缓存的影响
- 有序性 - 保证指令不会受 cpu 指令并行优化的影响



**内存模型如下：**

- 主内存
- 工作内存

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/69979e1c38516743c6bac5036c4c6a1b.png)





## 2、原子性



### 问题提出



问题提出，两个线程对初始值为 0 的静态变量一个做自增，一个做自减，各做 5000 次，结果是 0 吗？



### 问题分析



**以上的结果可能是正数、负数、零。**为什么呢？因为 Java 中对静态变量的自增，自减并**不是原子操作**。

- 静态变量：将静态变量放到操作数栈运算iadd
- 非静态变量自增：iinc在slot直接自增

例如对于 i++ 而言（i 为静态变量）实际会产生如下的 JVM 字节码指令：

```java
getstatic     i  // 获取静态变量i的值 
iconst_1         // 准备常量1
iadd             // 加法
putstatic     i // 将修改后的值存入静态变量i
```

而对应 i-- 也类似：

```java
getstatic     i  // 获取静态变量i的值 
iconst_1         // 准备常量1
isub             // 减法
putstatic     i // 将修改后的值存入静态变量i
```



而 Java 的内存模型如下，完成静态变量的自增，自减需要在主存和线程内存中进行数据交换：

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/69979e1c38516743c6bac5036c4c6a1b.png)





如果是单线程以上 8 行代码是顺序执行（不会交错）没有问题：



```java
// 假设i的初始值为0
getstatic     i  // 线程1-获取静态变量i的值    线程内i=0 
iconst_1         // 线程1-准备常量1
iadd             // 线程1-自增    线程内i=1
putstatic     i  // 线程1-将修改后的值存入静态变量i 静态变量i=1 
getstatic     i  // 线程1-获取静态变量i的值    线程内i=1
iconst_1         // 线程1-准备常量1 
isub             // 线程1-自减    线程内i=0
putstatic     i // 线程1-将修改后的值存入静态变量i 静态变量i=0
```



**但多线程下这 8 行代码可能交错运行！**



出现负数的情况：

```java
// 假设i的初始值为0
getstatic     i // 线程1-获取静态变量i的值 线程内i=0 
getstatic     i // 线程2-获取静态变量i的值 线程内i=0 
iconst_1         // 线程1-准备常量1
iadd             // 线程1-自增    线程内i=1
putstatic     i  // 线程1-将修改后的值存入静态变量i 静态变量i=1 
iconst_1         // 线程2-准备常量1
isub             // 线程2-自减    线程内i=-1
putstatic     i // 线程2-将修改后的值存入静态变量i 静态变量i=-1
```

出现正数的情况：

```java
// 假设i的初始值为0
getstatic     i // 线程1-获取静态变量i的值 线程内i=0 
getstatic     i // 线程2-获取静态变量i的值 线程内i=0 
iconst_1         // 线程1-准备常量1
iadd             // 线程1-自增    线程内i=1 
iconst_1         // 线程2-准备常量1 
isub             // 线程2-自减    线程内i=-1
putstatic     i  // 线程2-将修改后的值存入静态变量i 静态变量i=-1 
putstatic     i  // 线程1-将修改后的值存入静态变量i 静态变量i=1
```



### 问题解决

**synchronized（同步关键字）**



**注意**：上例中 t1 和 t2 线程必须用 synchronized 锁住同一个 obj 对象，如果 t1 锁住的是 m1 对象，t2 锁住的是 m2 对象，就好比两个人分别进入了两个不同的房间，没法起到同步的效果。

- 可以优化synchronized关键字放到循环外，可以将加解锁monitor操作降低为一次



```java
static int i = 0;
static Object obj = new Object();
public static void main(String[] args) throws InterruptedException { 
    Thread t1 = new Thread(() -> {
        for (int j = 0; j < 5000; j++) { 
            synchronized (obj) {
                i++; 
            }
        } 
    });
    Thread t2 = new Thread(() -> {
        for (int j = 0; j < 5000; j++) { 
            synchronized (obj) {
                i--; 
            }
        }
    });
    t1.start(); 
    t2.start();
    t1.join(); 
    t2.join();
    System.out.println(i); 
}
```



## 3、可见性





### 退不出的循环





先来看一个现象，main 线程对 run 变量的修改对于 t 线程不可见，导致了 t 线程无法停止：



```java
static boolean run = true;
public static void main(String[] args) throws InterruptedException { 
    Thread t = new Thread(()->{
        while(run){ 
            // .... 
        }
    });
    t.start();
    Thread.sleep(1000);
    run = false; // 线程t不会如预想的停下来 
}
```



**为什么呢？分析一下：**

- 初始状态， t 线程刚开始从主内存读取了 run 的值到工作内存。

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/99e92cac4fe9cc2e9b583a4cd14afcdd.png)



- 因为 t 线程要**频繁**从主内存中读取 **run 的值**，JIT 编译器会将 run 的值**缓存**至自己工作内存中的**高速缓存**中，减少对主存中 run 的访问，提高效率

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/6ae835697471041240631d06e8452e1c.png)

- 1 秒之后，main 线程修改了 run 的值，并同步至主存，而 t 是从自己工作内存中的高速缓存中读取这个变量的值，结果永远是**旧值**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/ba6ed6d226ef92d1f9107b146fbd6dfc.png)



### 问题解决

**volatile（易变关键字）**

- 它可以用来修饰**成员变量**和**静态成员变量**
- 他可以**避免**线程从自己的**工作缓存**中查找变量的值，**必须到主存**中获取它的值，线程操作 volatile 变量都是直接操作主存







### 可见性

前面例子体现的实际就是**可见性**，它保证的是在多个线程之间，**一个线程对 volatile 变量的修改对另一个线程可见**

- **不能保证原子性**
- **仅用在一个写线程，多个读线程的情况**
- **不能解决指令交错**

上例从字节码理解是这样的：

```java
getstatic     run   // 线程    t 获取    run true
getstatic     run   // 线程    t 获取    run true
getstatic     run   // 线程    t 获取    run true
getstatic     run   // 线程    t 获取    run true
putstatic     run  //  线程    main 修改    run 为    false，    仅此一次 
getstatic     run   // 线程    t 获取    run false
```



比较一下之前我们将线程安全时举的例子：两个线程一个 i++ 一个 i-- ，只能保证看到最新值，**不能解决指令交错**



```java
// 假设i的初始值为0
getstatic     i // 线程1-获取静态变量i的值 线程内i=0 
getstatic     i // 线程2-获取静态变量i的值 线程内i=0 
iconst_1         // 线程1-准备常量1
iadd             // 线程1-自增    线程内i=1
putstatic     i  // 线程1-将修改后的值存入静态变量i 静态变量i=1 
iconst_1         // 线程2-准备常量1
isub             // 线程2-自减    线程内i=-1
putstatic     i // 线程2-将修改后的值存入静态变量i 静态变量i=-1
```



**注意**

- **synchronized** 语句块既可以保证代码块的**原子性**，也同时保证代码块内变量的**可见性**。但缺点是synchronized是属于重量级操作，**性能相对更低**
- 如果在前面示例的死循环中加入 System.out.println() 会发现即使不加 volatile 修饰符，线程 t 也能正确看到对 run 变量的修改了，想一想为什么？
  - **原因：println添加了synchronized关键字，synchronized会保证可见性，因此会破坏JIT的缓存优化**



```java
public class Demo4_2 {

    static boolean run = true;

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(()->{
            while(run){
                // ....
                System.out.println(1);
            }
        });
        t.start();

        Thread.sleep(1000);
        run = false; // 线程t不会如预想的停下来
    }
}
```

**println方法如下，添加了synchronized：**

```java
public void println(int x) {
    synchronized(this) {
        this.print(x);
        this.newLine();
    }
}
```



## 4、有序性



### 诡异的结果



I_Result 是一个对象，有一个属性 r1 用来保存结果，问，可能的结果有几种？

```java
int num = 0;
boolean ready = false; 
// 线程1 执行此方法
public void actor1(I_Result r) { 
    if(ready) {
        r.r1 = num + num; 
    } else {
        r.r1 = 1; 
    }
}
// 线程2 执行此方法
public void actor2(I_Result r) { 
    num = 2;
    ready = true; 
}
```



- 情况1：线程1 先执行，这时 ready = false，所以进入 else 分支结果为 1
- 情况2：线程2 先执行 num = 2，但没来得及执行 ready = true，线程1 执行，还是进入 else 分支，结果为1
- 情况3：线程2 执行到 ready = true，线程1 执行，这回进入 if 分支，结果为 4（因为 num 已经执行过了）
- **情况4**：这种情况下是：线程2 执行 ready = true，切换到线程1，进入 if 分支，相加为 0，再切回线程2 执行 num = 2
  - actor2执行的顺序是乱的



这种现象叫做**指令重排**，是 JIT 编译器在运行时的一些优化，这个现象需要通过大量测试才能复现： 

借助 java 并发压测工具 jcstress https://wiki.openjdk.java.net/display/CodeTools/jcstress

可以看到，出现结果为 0 的情况有 638 次，虽然次数相对很少，但毕竟是出现了。



### 解决方法



**volatile 修饰的变量，可以禁用指令重排**



```java
int num = 0;
volatile boolean ready = false; 
// 线程1 执行此方法
public void actor1(I_Result r) { 
    if(ready) {
        r.r1 = num + num; 
    } else {
        r.r1 = 1; 
    }
}
// 线程2 执行此方法
public void actor2(I_Result r) { 
    num = 2;
    ready = true; 
}
```



### 有序性理解



JVM 会在不影响正确性的前提下，可以调整语句的执行顺序，思考下面一段代码



```java
static int i; 
static int j;
// 在某个线程内执行如下赋值操作
i = ...; // 较为耗时的操作
j = ...;
```



可以看到，至于是先执行 i  还是  先执行  j ，对最终的结果不会产生影响。所以，上面代码真正执行时会有两种情况：



```java
// 情况一
i = ...; // 较为耗时的操作
j = ...;

// 情况二
j = ...;
i = ...; // 较为耗时的操作
```



这种特性称之为『**指令重排**』！



多线程下『指令重排』会影响正确性，例如著名的 **double-checked locking （双检锁）**模式实现单例：

```java
public final class Singleton { 
    private Singleton() { }
    private static Singleton INSTANCE = null;
    public static Singleton getInstance() {
        // 实例没创建，才会进入内部的 synchronized代码块 
        if (INSTANCE == null) {
            // 为了以防多个线程同时到达此位置进行进行加锁创建对象，可以在锁内再加一层判断
            synchronized (Singleton.class) {
                // 也许有其它线程已经创建实例，所以再判断一次 
                if (INSTANCE == null) {
                    INSTANCE = new Singleton(); 
                }
            } 
        }
        return INSTANCE; 
    }
}
```



**以上的实现特点是：**

- 懒惰实例化
- 首次使用 getInstance() 才使用 synchronized 加锁，后续使用时无需加锁
- 但在**多线程环境下，上面的代码是有问题的**，INSTANCE = new Singleton() 对应的字节码为：

```java
0: new           #2                  // class cn/itcast/jvm/t4/Singleton 
3: dup
4: invokespecial #3                  // Method "<init>":()V 
7: putstatic     #4                  // Field
INSTANCE:Lcn/itcast/jvm/t4/Singleton;
```



其中 4 7 两步的顺序不是固定的，也许 jvm 会优化为：

先将引用地址赋值给 INSTANCE 变量后，再执行构造方法，如果两个线程 t1，t2 按如下时间序列执行：

```java
时间1  t1 线程执行到    INSTANCE = new Singleton();
时间2  t1 线程分配空间，为Singleton对象生成了引用地址（0 处）
时间3  t1 线程将引用地址赋值给    INSTANCE，这时    INSTANCE != null（7 处）
时间4  t2 线程进入getInstance() 方法，发现    INSTANCE != null（synchronized块外），直接 
返回    INSTANCE
时间5  t1 线程执行Singleton的构造方法（4 处）
```



**若 t1 还未完全将构造方法执行完毕**，如果在构造方法中要执行很多初始化操作，那么 **t2 拿到的是将是一个未初始化完毕的单例**



**解决方法：**

- 对 INSTANCE 使用 **volatile** 修饰即可，可以**禁用指令重排**
- 但要注意在 JDK 5 以上的版本的 volatile 才会真正有效



### happens-before



happens-before **规定了哪些写操作对其它线程的读操作可见**，它是**可见性与有序性**的一**套规则**总结。

抛开以下 happens-before 规则，JMM 并不能保证一个线程对共享变量的写，对于其它线程对该共享变量的读可见。







- 线程解锁 m 之前对变量的写，对于接下来对 m 加锁的其它线程对该变量的读可见

```java
static int x;
static Object m = new Object(); 

new Thread(()->{
    synchronized(m) { 
        x = 10;
    }
},"t1").start();
new Thread(()->{
    synchronized(m) {
        System.out.println(x); 
    }
},"t2").start();
```



- 线程对 volatile 变量的写，接下来其它线程对该变量的读可见



```java
volatile static int x; 

new Thread(()->{
    x = 10;
},"t1").start(); 
new Thread(()->{
    System.out.println(x); 
},"t2").start();
```





- 线程 start 前对变量的写，对该线程开始后对该变量的读可见

```java
static int x; 

x = 10;

new Thread(()->{
    System.out.println(x); 
},"t2").start();
```



- 线程结束前对变量的写，对其它线程得知它结束后的读可见（比如其它线程调用 t1.isAlive() 或 t1.join()等待它结束）



```java
static int x;
Thread t1 = new Thread(()->{ 
    x = 10;
},"t1"); 
t1.start();
t1.join();
System.out.println(x);
```



- 线程 t1 打断 t2（interrupt）前对变量的写，对于其他线程得知 t2 被打断后对变量的读可见（通过t2.interrupted 或 t2.isInterrupted）
  - 这里的打断只是做的标记，t2线程还是可以运行的
  - t2被打断后由于t1已经对遍历进行了写，因此t2线程是可以读到的，可见



```java
static int x;
public static void main(String[] args) { 
    Thread t2 = new Thread(()->{
        while(true) {
            if(Thread.currentThread().isInterrupted()) { 
                System.out.println(x);
                break; 
            }
        }
    },"t2");
    t2.start();
    new Thread(()->{ 
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) { 
            e.printStackTrace();
        }
        x = 10;
        t2.interrupt(); 
    },"t1").start();
    while(!t2.isInterrupted()) { 
        Thread.yield();
    }
    System.out.println(x);
}
```



- 对变量默认值（0，false，null）的写，对其它线程对该变量的读可见
- 具有**传递性**，如果 x hb-> y 并且 y hb-> z 那么有 x hb-> z（hb 即 happens-before）
- 变量都是指成员变量或静态成员变量 







## 5、CAS与原子类



### CAS



CAS 即   Compare and Swap，它体现的一种**乐观锁的思想**，也被称之为**无锁并发**！

比如多个线程要对一个共享的整型变量执行 +1 操作：



```java
// 需要不断尝试 
while(true) {
    int 旧值 = 共享变量; // 比如拿到了当前值 0
    int 结果 = 旧值 + 1; // 在旧值 0 的基础上增加 1 ，正确结果是 1 
    /*
   这时候如果别的线程把共享变量改成了 5，本线程的正确结果 1 就作废了，这时候 
   compareAndSwap 返回 false，重新尝试，（重新读取共享变量最新值）直到：
   compareAndSwap 返回 true，表示我本线程做修改的同时，别的线程没有干扰 
 */
    if( compareAndSwap ( 旧值, 结果 )) { 
        // 成功，退出循环
    } 
}
```



获取共享变量时，为了保证该变量的可见性，需要使用 volatile 修饰。**结合 CAS 和 volatile 可以实现无锁并发**，适用于**竞争不激烈、多核 CPU** 的场景下。

- **多核CPU**：
  - 若为单核其他线程抢占到后，本线程的CAS就无法抢占CPU进行自旋
  - 因为没有使用 synchronized，所以线程不会陷入阻塞，这是效率提升的因素之一 
- 但如果竞争激烈，可以想到重试必然频繁发生，反而效率会受影响

**CAS 底层**依赖于一个 **Unsafe 类**来直接调用**操作系统底层的 CAS 指令**。

下面是直接使用 Unsafe 对象进行线程安全保护的一个例子：



```java
import sun.misc.Unsafe; 
import java.lang.reflect.Field; 
public class TestCAS {
    public static void main(String[] args) throws InterruptedException { 
        DataContainer dc = new DataContainer();
        int count = 5;       
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < count; i++) { 
                dc.increase();
            }
        });
        t1.start(); 
        t1.join();
        System.out.println(dc.getData()); 
    }
}
class DataContainer {
    private volatile int data;
    static final Unsafe unsafe;
    static final long DATA_OFFSET;
    static { 
        try {
            // Unsafe 对象不能直接调用，只能通过反射获得
            Field theUnsafe = Unsafe.class.getDeclaredField("theUnsafe"); 
            theUnsafe.setAccessible(true);
            unsafe = (Unsafe) theUnsafe.get(null);
        } catch (NoSuchFieldException | IllegalAccessException e) { 
            throw new Error(e);
        }
        try {
            // data 属性在    DataContainer 对象中的偏移量，用于    Unsafe 直接访问该属性 
            DATA_OFFSET = unsafe.objectFieldOffset(DataContainer.class.getDeclaredField("data")); 
        } catch (NoSuchFieldException e) {
            throw new Error(e); 
        }
    }
    public void increase() { 
        int oldValue;
        while(true) {
            // 获取共享变量旧值，可以在这一行加入断点，修改    data 调试来加深理解 
            oldValue = data;
            // cas 尝试修改    data 为    旧值    + 1，如果期间旧值被别的线程改了，返回    false
            if (unsafe.compareAndSwapInt(this, DATA_OFFSET, oldValue, oldValue + 1)) {
                return; 
            }
        } 
    }
    public void decrease() { 
        int oldValue;
        while(true) {
            oldValue = data;
            if (unsafe.compareAndSwapInt(this, DATA_OFFSET, oldValue, oldValue - 1)) {
                return; 
            }
        } 
    }
    public int getData() { 
        return data;
    }
}
```



### 乐观锁与悲观锁



- **CAS 是基于乐观锁的思想**：最乐观的估计，不怕别的线程来修改共享变量，就算改了也没关系，我吃亏点再重试呗。
- **synchronized 是基于悲观锁的思想**：最悲观的估计，得防着其它线程来修改共享变量，我上了锁你们都别想改，我改完了解开锁，你们才有机会。



### 原子操作类



juc（java.util.concurrent）中提供了原子操作类，可以**提供线程安全的操作**，例如：AtomicInteger、 AtomicBoolean等，它们底层就是采用 CAS 技术 + volatile 来实现的。

可以使用 AtomicInteger 改写之前的例子：



```java
// 创建原子整数对象
private static AtomicInteger i = new AtomicInteger(0);
public static void main(String[] args) throws InterruptedException { 
    Thread t1 = new Thread(() -> {
        for (int j = 0; j < 5000; j++) {
            i.getAndIncrement();  // 获取并且自增         i++
            // i.incrementAndGet();  // 自增并且获取         ++i
        } 
    });
    Thread t2 = new Thread(() -> {
        for (int j = 0; j < 5000; j++) {
            i.getAndDecrement(); // 获取并且自减         i-- 
        }
    });
    t1.start(); 
    t2.start(); 
    t1.join(); 
    t2.join();
    System.out.println(i);
}
```





## 6、synchronized 优化



Java HotSpot 虚拟机中，**每个对象都有对象头**（包括 class 指针和 Mark Word）。

- Mark Word 平时存储这个对象的**哈希码、分代年龄**
- 当加锁时，这些信息就根据情况被替换为 **标记位、线程锁记录指针、重量级锁指针、线程ID** 等内容



### 轻量级锁

如果一个对象虽然有多线程访问，但**多线程访问的时间是错开**的（也就是**没有竞争**），那么可以使用**轻量级锁来优化**。

**这就好比：**

学生（线程 A）用课本占座，上了半节课，出门了（CPU时间到），回来一看，发现课本没变，说明没有竞争，继续上他的课。

如果这期间有其它学生（线程 B）来了，会告知（线程A）有并发访问，线程 A 随即**升级为重量级锁**，进入重量级锁的流程。

而重量级锁就不是那么用课本占座那么简单了，可以想象线程 A 走之前，把座位用一个铁栅栏围起来

假设有两个方法同步块，**利用同一个对象加锁**



```java
static Object obj = new Object(); 
public static void method1() { 
    synchronized( obj ) {
        // 同步块 A 
        method2(); 
    }
}
public static void method2() { 
    synchronized( obj ) {
        // 同步块 B 
    }
}
```





每个线程都的**栈帧**都会包含一个**锁记录的结构**，内部可以存储锁定对象的 **Mark Word**

- 对象头的MarkWord 8个字节，存储的信息时很**金贵**的
- 将对象加锁后，需要将MarkWord的原来旧的信息存储起来，**存到栈帧内**
- 解了锁之后，再将栈帧信息**恢复**到MarkWord



**下图：**

- 指的是**多个线程交错运行**的情况
- 且两个同步块锁的是一个对象
- 因此同一个线程是**可以重入**的





**上面代码过程如下：**

- 线程1、2指的是存储数据的栈
- 对象MarkWord指的是存储数据的堆中的对象头

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/d3790cf0fae5f7938ca3acbc19956d9b.png)







### 锁膨胀

如果在尝试加轻量级锁的过程中，CAS 操作无法成功，这时一种情况就是有其它线程为此对象加上了轻量级锁（有竞争）

这时需要进行**锁膨胀**，**将轻量级锁变为重量级锁**。



```java
static Object obj = new Object(); 
public static void method1() { 
    synchronized( obj ) {
        // 同步块 
    }
}
```



**下图：**

- 指的是**多个线程发生抢占**的情况
- 线程2会抢占失败，会将MarkWord的锁记录地址改为重量级锁标记
- 线程1执行完毕无法通过轻量级锁解锁成功，会唤醒阻塞的线程2
- 线程2继续抢占锁

**两个线程执行过程：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/9690af5ec32239c677e8b56df0ec7e06.png)





### 重量锁



**重量级锁竞争**的时候，还可以使用**自旋**来进行**优化**！

如果当前线程**自旋成功**（即这时候持锁线程已经退出了同步块，释放了锁），这时当前线程就可以避免阻塞。

在 Java 6 之后自旋锁是自适应的，比如对象刚刚的一次自旋操作成功过，那么认为这次自旋成功的可能性会高，就多自旋几次；反之，就少自旋甚至不自旋，总之，比较智能。

- 自旋会占用 CPU 时间，单核 CPU 自旋就是浪费，多核 CPU 自旋才能发挥优势。
- 好比等红灯时汽车是不是熄火，不熄火相当于自旋（等待时间短了划算），熄火了相当于阻塞（等待时间长了划算）
- Java 7 之后不能控制是否开启自旋功能 



**自旋重试成功的情况**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/d9215beea5edd022585d58f9f9ee3cc5.png)



**自旋重试失败的情况**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/d7300eeebf43d7e37f212a5162d3acb0.png)





### 偏向锁



轻量级锁在没有竞争时（就自己这个线程），每次重入仍然需要执行 CAS 操作。

Java 6 中引入了**偏向锁**来做进一步**优化**：只有**第一次**使用 CAS 将**线程 ID（不是锁记录地址）** 设置到对象的 Mark Word 头，之后发现这个线程 ID 是自己的就表示没有竞争，不用重新 CAS。

- **撤销偏向**需要将持锁线程升级为轻量级锁，这个过程中所有线程需要暂停（**STW**） 
  - 有其他锁竞争
- 访问对象的 **hashCode** 也会撤销偏向锁
  - 对象头无锁状态存的是hashCode
  - 偏向锁时存的是线程ID
  - 另一个线程访问hashCode时，由于对象头没有，因此会撤销偏向锁
- 如果对象虽然被多个线程访问，但没有竞争，这时偏向了线程 T1 的对象仍有机会重新偏向 T2，**重偏向**会**重置**对象的 Thread ID
- 撤销偏向和重偏向都是批量进行的，以类为单位
- 如果撤销偏向到达某个阈值，整个类的所有对象都会变为不可偏向的 
- 可以主动使用 -XX:-UseBiasedLocking 禁用偏向锁

可以参考这篇论文：https://www.oracle.com/technetwork/java/biasedlocking-oopsla2006-wp-149958.pdf



**假设有两个方法同步块，利用同一个对象加锁**



```java
static Object obj = new Object(); 
public static void method1() { 
    synchronized( obj ) {
        // 同步块 A 
        method2(); 
    }
}
public static void method2() { 
    synchronized( obj ) {
        // 同步块    B 
    }
}
```



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2022/01/17/0f30e000d10c8b04ab4f29255b38c066.png)





## 7、其他优化





### 减少上锁时间



同步代码块中尽量短

- 防止轻量级锁升级为重量级锁



### 减少锁的粒度



将一个锁拆分为多个锁提高并发度，例如：

- ConcurrentHashMap
- LongAdder 分为 base 和 cells 两部分。没有并发争用的时候或者是 cells 数组正在初始化的时候，会使用 CAS 来累加值到 base，有并发争用，会初始化 cells 数组，数组有多少个 cell，就允许有多少线程并行修改，最后将数组中每个 cell 累加，再加上 base 就是最终的 
- LinkedBlockingQueue 入队和出队使用不同的锁，相对于LinkedBlockingArray只有一个锁效率要高





### 锁粗化



多次循环进入同步块不如同步块内多次循环。

另外 JVM 可能会做如下优化，把多次 append 的加锁操作粗化为一次（因为都是对同一个对象加锁，没必要重入多次）

```java
new StringBuffer().append("a").append("b").append("c");
```

### 锁消除

JVM 会进行代码的逃逸分析，例如某个加锁对象是方法内局部变量，不会被其它线程所访问到，这时候就会被即时编译器忽略掉所有同步操作。



### 读写分离

直接读不用同步，写的话复制一份进行同步

- CopyOnWriteArrayList 
- ConyOnWriteSet

