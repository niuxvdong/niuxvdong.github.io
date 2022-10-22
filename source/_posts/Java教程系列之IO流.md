---
title: Java教程系列之IO流
author: Mr.Niu
toc: true
abbrlink: 61053
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/8c45a4ecb931635b21bb72595f059933.png'
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/8c45a4ecb931635b21bb72595f059933.png'
categories:
  - Java教程
tags:
  - IO
  - File
date: 2020-04-10 22:12:52
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "30612793" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



## 一、IO介绍



IO是指Input/Output，即输入和输出。以内存为中心：

- Input指从外部读入数据到内存，例如，把文件从磁盘读取到内存，从网络读取数据到内存等等。
- Output指把数据从内存输出到外部，例如，把数据从内存写入到文件，把数据从内存输出到网络等等。

IO流是一种流式的数据输入/输出模型：

- 二进制数据以`byte`为最小单位在`InputStream`/`OutputStream`中单向流动；
- 字符数据以`char`为最小单位在`Reader`/`Writer`中单向流动。

Java标准库的`java.io`包提供了同步IO功能：

- 字节流接口：`InputStream`/`OutputStream`；
- 字符流接口：`Reader`/`Writer`。



注意：UTF-8编码下，英文字符占一个字节，中文字符占三个字节！

Java的读写数据在传输时都是`byte[]`，`String`这两种方式！





### 1、Reader 和 Writer



> 如果我们需要读写的是字符，并且字符不全是单字节表示的ASCII字符，那么，按照`char`来读写显然更方便，这种流称为*字符流*。
>
> `Reader`和`Writer`本质上是一个能自动编解码的`InputStream`和`OutputStream`。
>
> 使用`Reader`，数据源虽然是字节，但我们读入的数据都是`char`类型的字符，原因是`Reader`内部把读入的`byte`做了解码，转换成了`char`。使用`InputStream`，我们读入的数据和原始二进制数据一模一样，是`byte[]`数组，但是我们可以自己把二进制`byte[]`数组按照某种编码转换为字符串。究竟使用`Reader`还是`InputStream`，要取决于具体的使用场景。如果数据源不是文本，就只能使用`InputStream`，如果数据源是文本，使用Reader更方便一些。`Writer`和`OutputStream`是类似的。



### 2、同步和异步



>同步IO是指，读写IO时代码必须等待数据返回后才继续执行后续代码，它的优点是代码编写简单，缺点是CPU执行效率低。
>
>而异步IO是指，读写IO时仅发出请求，然后立刻执行后续代码，它的优点是CPU执行效率高，缺点是代码编写复杂。
>
>Java标准库的包`java.io`提供了同步IO，而`java.nio`则是异步IO。上面我们讨论的`InputStream`、`OutputStream`、`Reader`和`Writer`都是同步IO的抽象类，对应的具体实现类，以文件为例，有`FileInputStream`、`FileOutputStream`、`FileReader`和`FileWriter`。





## 二、File对象





### 1、创建File对象



> `File file = new File("路径");`



#### 1.1 路径的写法



> 注意Windows平台使用`\`作为路径分隔符，在Java字符串中需要用`\\`表示一个`\`。Linux平台使用`/`作为路径分隔符：
>
> 用`.`表示当前目录，`..`表示上级目录。



```java
package com.learn.file;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;

public class FileTest {
    public static void main(String[] args) throws IOException {
        File file = new File(".");
        File file01 = new File(".\\");
        File file02 = new File("..\\");
        File file1 = new File("..");
        File file2 = new File("Settings\\setting.properties");
        File file3 = new File("E:\\MyJavaProgram\\Settings\\setting.properties");
        
        // 打印系统当前分隔符：
        System.out.println(File.separator); // /
        
        // Linux 下路径写法，斜杠换一下即可！
        File f = new File("/usr/bin/javac");
    }
}
```



#### 1.2 获取路径





- `getPath()`：返回构造方法传入的路径，直接输出File对象名效果一样！
- `getAbsolutePath()`：返回绝对路径，若传入参数有`.`，则该方法也会出现`.`;
- `getCanonicalPath()`：返回的是规范路径，若传入参数有`.`，则该方法会将点翻译为正确路径;



路径如下：



```java
package com.learn.file;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;

public class FileTest {
    public static void main(String[] args) throws IOException {
        File file = new File(".");
        System.out.println(file); // .
        System.out.println(file.getPath()); // .
        System.out.println(file.getAbsolutePath()); // E:\MyJavaProgram\.
        System.out.println(file.getCanonicalPath()); // E:\MyJavaProgram\

        System.out.println("---------------------------------------------");
        File file01 = new File(".\\");
        System.out.println(file01.getCanonicalPath()); // E:\MyJavaProgram

        System.out.println("---------------------------------------------");
        File file02 = new File("..\\");
        System.out.println(file02.getCanonicalPath()); // E:\

        System.out.println("---------------------------------------------");
        File file1 = new File("..");
        System.out.println(file1.getPath()); // ..
        System.out.println(file1.getAbsolutePath()); // E:\MyJavaProgram\..
        System.out.println(file1.getCanonicalPath()); // E:\

        System.out.println("---------------------------------------------");
        File file2 = new File("Settings\\setting.properties");
        System.out.println(file2.getPath()); // Settings\setting.properties
        System.out.println(file2.getAbsolutePath()); // E:\MyJavaProgram\Settings\setting.properties
        System.out.println(file2.getCanonicalPath()); // E:\MyJavaProgram\Settings\setting.properties

        System.out.println("---------------------------------------------");
        File file3 = new File("E:\\MyJavaProgram\\Settings\\setting.properties");
        System.out.println(file3.getPath()); // E:\MyJavaProgram\Settings\setting.properties
        System.out.println(file3.getAbsolutePath()); // E:\MyJavaProgram\Settings\setting.properties
        System.out.println(file3.getCanonicalPath()); // E:\MyJavaProgram\Settings\setting.properties     
}
```





### 2、文件目录判断



> `File`对象既可以表示文件，也可以表示目录。
>
> 特别要注意的是，构造一个`File`对象，即使传入的文件或目录不存在，代码也不会出错，因为构造一个`File`对象，并不会导致任何磁盘操作。只有当我们调用`File`对象的某些方法的时候，才真正进行磁盘操作。



- `isFile()`：判断是否是已存在文件

- `isDirectory()`：判断是否是已存在目录
- `isAbsolute()`：判断是否是完整路径
- `isHidden()`：判断是否是隐藏文件



```java
File file1 = new File("..");
File file2 = new File("Settings\\setting.properties");
File file3 = new File("E:\\MyJavaProgram\\Settings\\setting.properties");

System.out.println(file3.isAbsolute()); // true
System.out.println(file3.isDirectory()); // false
System.out.println(file3.isFile()); // true
System.out.println(file3.isHidden()); // false

System.out.println("---------------------------------------------");
System.out.println(file2.isAbsolute()); // false
System.out.println(file1.isAbsolute()); // false
System.out.println(file1.isFile()); // false
System.out.println(file1.isDirectory()); // true
```



### 3、File权限判断



用`File`对象获取到一个文件时，还可以进一步判断文件的权限和大小：

- `boolean canRead()`：是否可读；
- `boolean canWrite()`：是否可写；
- `boolean canExecute()`：是否可执行；
- `long length()`：文件字节大小。

对目录而言，是否可执行表示能否列出它包含的文件和子目录。



```java

System.out.println("---------------------------------------------");
File fileExe = new File("E:\\MyJavaProgram\\Settings\\test.exe");
System.out.println(fileExe.canRead()); // true
System.out.println(fileExe.canWrite()); // true
System.out.println(fileExe.canExecute()); // true
```



### 4、创建和删除文件



> 先将需要创建的文件`test.txt`传入File对象，再调用creatNewFile()方法来创建！
>
> 可通过`createTempFile()`创建临时文件，以及`deleteOnExit()`在JVM退出时自动删除该文件。



- `createNewFile()`：返回boolean值，若文件已存在返回false！
- `delete()`：返回boolean值，若文件已不存在返回false！
- `createTempFile()`：创建临时文件，创建位置为C盘某个位置，需要传入两个参数，一个前缀，一个后缀！
- `deleteOnExit()`：JVM退出时自动删除，删除后仍然可获得File对象路径！



```java
// 创建文件：
File file4 = new File("Settings\\test.txt");
if(file4.createNewFile()){
    System.out.println("test.txt创建成功！");
}
// 删除文件：
if(file4.delete()){
    System.out.println("test.txt删除成功！");
}

// 创建临时文件，使用后删除
File file5 = File.createTempFile("temp",".cpp");
System.out.println(file5.getCanonicalPath()); // C:\Users\15890\AppData\Local\Temp\temp10279290225517315464.cpp
file5.deleteOnExit();
// 删除后仍然可以获得路径：
System.out.println(file5.getCanonicalPath()); // C:\Users\15890\AppData\Local\Temp\temp10279290225517315464.cpp
```





### 5、创建和删除目录



- `boolean mkdir()`：创建当前File对象表示的目录；
- `boolean mkdirs()`：创建当前File对象表示的目录，并在必要时将不存在的父目录也创建出来；
- `boolean delete()`：删除当前File对象表示的目录，当前目录必须为空才能删除成功，是能删除最内部的目录，并且只有目录为空才可删除！



> 创建目录使用`mkdirs()`即可，`mkdir()`可以做到的，`mkdirs()`都可以做到！



```java
File file7 = new File(".\\test");
//File file8 = new File(".");
if(file7.mkdir()){
    System.out.println("test目录创建成功！");
}
if(file7.delete()){
    System.out.println("test目录删除成功！");
}

File file8 = new File(".\\test\\test02\\test03");
if(file8.mkdirs()){
    System.out.println("嵌套目录创建成功！");
    if(file8.delete()){
        System.out.println("test03目录删除成功！");
    }
}
```



### 6、遍历文件和目录



> 使用`listFiles()`获取当前目录层次关系，用File对象数组接收，可以传入`FilenameFilter()`方法来过滤不需要的文件或目录！

```java
package com.learn.file;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;

public class FileTest {
    public static void main(String[] args) throws IOException {
        System.out.println("-----------------------------------------------");
        File file6 = new File(".");
        File[] files = file6.listFiles();
        printFiles(files);

        File[] files1 = file6.listFiles(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.endsWith(".idea");
            }
        });
        printFiles(files1);

    }

    static void printFiles(File[] files){
        System.out.println("-----------------------------------------------");
        if(files != null){
            for(var file : files){
                System.out.println(file);
            }
        }
    }
}
```



### 7、Path对象





> Java标准库还提供了一个`Path`对象，它位于`java.nio.file`包。`Path`对象和`File`对象类似，但操作更加简单：



- `Paths.get()`：参数可以有多个，表示路径，后面的一定得是前面路径的子路径！
- `toAbsolutePath()`：转化为带`.`的绝对路径
- `normalize()`：将构造路径的点去掉
- `toAbsolutePath().normalize()`：将带点的绝对路径去掉点，转化为完整的路径！
- `toFile()`：转化为File对象！



```java
package com.learn.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class PathTest {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get(".\\Path","PathTest\\test01", "test02");
        System.out.println(path); // .\Path\PathTest\test01\test02
        System.out.println(path.toAbsolutePath()); // E:\MyJavaProgram\.\Path\PathTest\test01\test02
        System.out.println(path.normalize()); // Path\PathTest\test01\test02
        System.out.println(path.toAbsolutePath().normalize()); // E:\MyJavaProgram\Path\PathTest\test01\test02

        File file = path.toFile();
        System.out.println(file);

        // 嵌套目录遍历：
        for(var p : path){
            System.out.println(p);
        }
        System.out.println();
        for(var p : path.toAbsolutePath()){
            System.out.println(p);
        }
    }
}

```



### 8、遍历目录例子



> 为了有层次关系，可进行空格的控制输出，使用`getName()`方法获取目录或文件名！
>
> 使用递归去进行层次遍历！



```java
package com.learn.file;

import java.io.File;
import java.io.IOException;

/*
* @:实现打印当前目录的层次关系！
* */

public class FileWork {
    public static void main(String[] args) throws IOException {
        File file = new File(".");
        ListDir(file, 0);
    }

    static void ListDir(File file, int level) {

        File[] files = file.listFiles();

        if (files != null) {
            for (var ls : files) {
                for(int i = 0; i < level; i++){
                    System.out.print("  ");
                }
                if (ls.isFile()) {
                    System.out.println(ls.getName());
                } else {
                    System.out.println(ls.getName() + "\\");
                }
                ListDir(ls, level + 1);
            }
        }
    }
}
```



## 三、InputStream



>`InputStream`就是Java标准库提供的最基本的输入流。它位于`java.io`这个包里。`java.io`包提供了所有同步IO的功能。
>
>要特别注意的一点是，`InputStream`并不是一个接口，而是一个抽象类，它是所有输入流的超类。这个抽象类定义的一个最重要的方法就是`int read()`。
>
>这个方法会读取输入流的下一个字节，并返回字节表示的`int`值（0~255）。如果已读到末尾，返回`-1`表示不能继续读取了。
>
>`FileInputStream`是`InputStream`的一个子类





### 1、读取和关闭FileInputStream





> 在计算机中，类似文件、网络端口这些资源，都是由操作系统统一管理的。应用程序在运行的过程中，如果打开了一个文件进行读写，完成后要及时地关闭，以便让操作系统把资源释放掉，否则，应用程序占用的资源会越来越多，不但白白占用内存，还会影响其他应用程序的运行。
>
> `InputStream`和`OutputStream`都是通过`close()`方法来关闭流。关闭流就会释放对应的底层资源。
>
> 我们还要注意到在读取或写入IO流的过程中，可能会发生错误，例如，文件不存在导致无法读取，没有写权限导致写入失败，等等，这些底层错误由Java虚拟机自动封装成`IOException`异常并抛出。因此，所有与IO操作相关的代码都必须正确处理`IOException`。





#### 1.1 手动关闭 + 未处理异常



> 如果读取过程中发生了IO错误，`InputStream`就没法正确地关闭，资源也就没法及时释放。



```java
package com.learn.file;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class InputStreamTest {
    public static void main(String[] args) throws IOException {
        /* 文件内容：
        * 测试输入流！
        * hello world!
        * */
        InputStream input = new FileInputStream("Settings\\readme.txt");
        int n;
        while((n = input.read()) != -1){
            System.out.print(n + " ");
        }
        input.close();
    }
}
```



#### 1.2 使用 try finally 来处理异常



>无论是否异常，总会执行finally来关闭文件！
>
>注意：关闭流时要保证流不为null，否则会抛出`NullPointerException`



```java
package com.learn.file;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class InputStreamTest {
    public static void main(String[] args) throws IOException {
        /* 文件内容：
        * 测试输入流！
        * hello world!
        * */
        System.out.println();
        InputStream input1 = null;
        //input1.close(); // throws NullPointerException
        try{
            input1 = new FileInputStream("Settings\\readme.txt");
            int n1;
            while((n1 = input1.read()) != -1){
                System.out.print(n1 + " ");
            }
        }finally {
            if(input1 != null){
                input1.close();
            }
        }
    }
}
```



#### 1.3 使用 try(resource) 实现自动关闭流（推荐）



> 编译器自动为我们关闭资源
>
> 实际上，编译器并不会特别地为`InputStream`加上自动关闭。编译器只看`try(resource = ...)`中的对象是否实现了`java.lang.AutoCloseable`接口，如果实现了，就自动加上`finally`语句并调用`close()`方法。`InputStream`和`OutputStream`都实现了这个接口，因此，都可以用在`try(resource)`中。
>
> 只有实现了上述接口使用该语法才会进行自动关闭！

```java
package com.learn.file;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class InputStreamTest {
    public static void main(String[] args) throws IOException {
        /* 文件内容：
        * 测试输入流！
        * hello world!
        * */
        System.out.println();
        try(InputStream input2 = new FileInputStream("Settings\\readme.txt")) {
            int n2;
            while((n2 = input2.read()) != -1){
                System.out.print(n2 + " ");
            }
        }
    }
}
```



### 2、读到缓存中



> 在读取流的时候，一次读取一个字节并不是最高效的方法。很多流支持一次性读取多个字节到缓冲区，对于文件和网络流来说，利用缓冲区一次性读取多个字节效率往往要高很多。
>
> 一次读取多个字节时，需要先定义一个`byte[]`数组作为缓冲区，`read()`方法会尽可能多地读取字节到缓冲区， 但不会超过缓冲区的大小。
>
> `read()`方法的返回值不再是字节的`int`值，而是返回实际读取了多少个字节。如果返回`-1`，表示没有更多的数据了。



`InputStream`提供了两个重载方法来支持读取多个字节：

- `int read(byte[] b)`：读取若干字节并填充到`byte[]`数组，返回读取的字节数
- `int read(byte[] b, int off, int len)`：指定`byte[]`数组的偏移量和最大填充数



```java
package com.learn.file;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class InputStreamTest {
    public static void main(String[] args) throws IOException {
        /* 文件内容：
        * 测试输入流！
        * hello world!
        * */
        System.out.println();
        try(InputStream input3 = new FileInputStream("Settings\\readme.txt")) {
            int n2;
            byte[] buffer = new byte[10];
            while((n2 = input3.read(buffer)) != -1){
                System.out.println("读取了" + n2 + "个字节");
            }
        }
    }
}
```

如下：

```
读取了10个字节
读取了10个字节
读取了10个字节
读取了2个字节
```



### 3、阻塞



> 在调用`InputStream`的`read()`方法读取数据时，我们说`read()`方法是阻塞（Blocking）的！
>
> 执行到第二行代码时，必须等`read()`方法返回后才能继续。因为读取IO流相比执行普通代码，速度会慢很多，因此，无法确定`read()`方法调用到底要花费多长时间。

```java
int n;
n = input.read(); // 必须等待read()方法返回才能执行下一行代码
int m = n;
```



### 4、InputStream实现类



> 除了`FileInputStream`可以从文件获取输入流，还有`ByteArrayInputStream`可以在内存中模拟一个`InputStream`：
>
> `ByteArrayInputStream`实际上是把一个`byte[]`数组在内存中变成一个`InputStream`，虽然实际应用不多，但测试的时候，可以用它来构造一个`InputStream`。



#### 4.1 使用ByteArrayInputStream模拟InputStream



```java
package com.learn.file;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class InputStreamTest {
    public static void main(String[] args) throws IOException {
        byte[] data = { 72, 101, 108, 108, 111, 33 };
        try(InputStream input4 = new ByteArrayInputStream(data)){
            int n3;
            while((n3 = input4.read()) != -1){
                System.out.print((char)n3 + " "); // H e l l o ! 
            }
        }

    }
}
```



#### 4.2 封装为函数进行测试





```java
package com.learn.file;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class InputStreamTest {
    public static void main(String[] args) throws IOException {
        /* 文件内容：
        * 测试输入流！
        * hello world!
        * */

        byte[] data = { 72, 101, 108, 108, 111, 33 };
        try(InputStream input4 = new ByteArrayInputStream(data)){
            int n3;
            while((n3 = input4.read()) != -1){
                System.out.print((char)n3 + " "); // H e l l o !
            }
        }

        System.out.println();
        String s;
        try(InputStream input5 = new FileInputStream("Settings\\readme.txt")) {
            int n5;
            StringBuilder sb = new StringBuilder();
            while((n5 = input5.read()) != -1){
                sb.append((char)n5);
            }
            s = sb.toString();
        }
        System.out.println(s);
        // 输出结果：
        /*
        æµè¯è¾å¥æµï¼
        hello world!
        */
        
        // 使用封装函数来输出：
        String s1;
        try (InputStream input6 = new FileInputStream("Settings\\readme.txt")) {
            s1 = readAsString(input6);
        }
        System.out.println(s1);

        // 直接通过ByteArrayInputStream的模拟来输出：
        try(InputStream input7 = new ByteArrayInputStream(data)){
            String s2 = readAsString(input7);
            System.out.println(s2); // Hello!
        }
    }
	
    // 封装一个函数：
    public static String readAsString(InputStream input) throws IOException {
        int n;
        StringBuilder sb = new StringBuilder();
        while ((n = input.read()) != -1) {
            sb.append((char) n);
        }
        return sb.toString();
    }
}
```



## 四、OutputStream





> 和`InputStream`相反，`OutputStream`是Java标准库提供的最基本的输出流。
>
> 和`InputStream`类似，`OutputStream`也是抽象类，它是所有输出流的超类。这个抽象类定义的一个最重要的方法就是`void write(int b)`
>
> 这个方法会写入一个字节到输出流。要注意的是，虽然传入的是`int`参数，但只会写入一个字节，即只写入`int`最低8位表示字节的部分：
>
> `OutputStream`也提供了`close()`方法关闭输出流，以便释放系统资源！



```java
public abstract void write(int b) throws IOException;
```



### 1、flush方法



> 它的目的是将缓冲区的内容强制输出到目的地。
>
> 向磁盘、网络写入数据的时候，出于效率的考虑，操作系统并不是输出一个字节就立刻写入到文件或者发送到网络，而是把输出的字节先放到内存的一个缓冲区里（本质上就是一个`byte[]`数组），等到缓冲区写满了，再一次性写入文件或者网络。对于很多IO设备来说，一次写一个字节和一次写1000个字节，花费的时间几乎是完全一样的，所以`OutputStream`有个`flush()`方法，能强制把缓冲区内容输出。
>
> 通常情况下，我们不需要调用这个`flush()`方法，因为缓冲区写满了`OutputStream`会自动调用它，并且，在调用`close()`方法关闭`OutputStream`之前，也会自动调用`flush()`方法。
>
> 需要手动调用该方法的例子：实时聊天软件，不能等缓冲区满了在进行输出吧！



### 2、写入和关闭FileOutStream



> 如下方，只有当append参数为true时才不会进行覆盖，默认为false！

```java
new FileOutputStream(File file, boolean append); //append = false

new FileWriter(File file, boolean append); //append = false
```

#### 2.1 一个字节的去读

```java
package com.learn.file;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class OutputStreamTest {
    public static void main(String[] args) throws IOException {
        File file = new File("Settings\\input.txt");
        if(file.createNewFile()){
            System.out.println("input.txt创建成功！");
        }
        OutputStream output = new FileOutputStream("Settings\\input.txt");
        output.write(72); // H
        output.write(101); // e
        output.write(108); // l
        output.write(108); // l
        output.write(111); // o
        output.close();
    }
}
```

#### 2.2 一次性读入若干字节



```java
package com.learn.file;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class OutputStreamTest {
    public static void main(String[] args) throws IOException {
        File file = new File("Settings\\input.txt");
        if(file.createNewFile()){
            System.out.println("input.txt创建成功！");
        }
        OutputStream output = new 		FileOutputStream("Settings\\input.txt"); 
        output.write("world".getBytes(StandardCharsets.UTF_8));
        output.close();
    }
}
```



#### 2.3 使用try(resourse)自动关闭（推荐）



```java
package com.learn.file;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class OutputStreamTest {
    public static void main(String[] args) throws IOException {
        File file = new File("Settings\\input.txt");
        if(file.createNewFile()){
            System.out.println("input.txt创建成功！");
        }
        
       try(OutputStream output1 = new FileOutputStream("Settings\\input.txt")){
            output1.write("hello world!".getBytes(StandardCharsets.UTF_8));
        }// 编译器在此自动为我们写入finally并调用close()

        try(InputStream input = new FileInputStream("Settings\\input.txt")){
            int n;
            while((n = input.read()) != -1){
                System.out.print((char) n);
            }
        }
    }
}
```







### 3、阻塞



> 同样，只有等write方法执行完毕才能执行下一行！
>
> 所以write方法也是阻塞的！



```java
int n;
n = output.write(); // 必须等待write()方法返回才能执行下一行代码
int m = n;
```



### 4、OutputStream实现类



> 用`FileOutputStream`可以从文件获取输出流，这是`OutputStream`常用的一个实现类。此外，`ByteArrayOutputStream`可以在内存中模拟一个`OutputStream`
>
> `ByteArrayOutputStream`实际上是把一个`byte[]`数组在内存中变成一个`OutputStream`，虽然实际应用不多，但测试的时候，可以用它来构造一个`OutputStream`。



- 使用ByteArrayOutputStream模拟OutputStream



```java
package com.learn.file;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class OutputStreamTest {
    public static void main(String[] args) throws IOException {
        byte[] data;
        try(ByteArrayOutputStream output1 = new ByteArrayOutputStream()){
            output1.write("Hello world!".getBytes(StandardCharsets.UTF_8));
            data = output1.toByteArray();
        }
        System.out.println(new String(data));//Hello world!
    }
}
```



### 5、一个小例子



> 实现文件的复制！
>
> 在命令行进行运行带有参数的运行，即将source.txt 复制到copy.txt；
>
> 当然要在源文件下，或者使用相对路径绝对路径都可以！
>
> 前提是两个文件都已经存在了！



```bash
$ java CopyTest.java source.txt copy.txt
```



> main函数的args参数就是用来接收命令行参数的，直接将第一个参数给了输入流，第二个参数给了输出流，即可实现将输入流复制到输出流的copy文件里！

```java
package com.learn.file;

import java.io.*;

public class CopyTest {
    public static void main(String[] args) throws IOException {
        try(InputStream source = new FileInputStream(args[0]);
        OutputStream copyfile = new FileOutputStream(args[1])){
            int n;
            while((n = source.read()) != -1){
                copyfile.write(n);
            }
        }
    }
}
```

效果：

之前：

```
source.txt：
I am a source file!
copy.txt：
（空）
```

之后：



```
source.txt：
I am a source file!
copy.txt：
I am a source file!
```



## 五、Filter模式



> `InputStream`，`OutputStream`都是以这种Filter模式来提供各种功能：
>
> 下面仅以`InputStream`举例！

### 1、InputStream来源



- `FileInputStream`：从文件读取数据，是最终数据源；
- `ServletInputStream`：从HTTP请求读取数据，是最终数据源；
- `Socket.getInputStream()`：从TCP连接读取数据，是最终数据源；
- ...



### 2、引入FilterInputStream原因



> 如果要给`FileInputStream`添加各种功能：



```java
// 添加缓冲功能：
BufferedFileInputStream extends FileInputStream
// 添加计算签名功能：
DigestFileInputStream extends FileInputStream
// 添加加密解密功能：
CipherFileInputStream extends FileInputStream
// 以及其他类之间的相互组合.....等等
```



> 这还只是针对`FileInputStream`设计，如果针对另一种`InputStream`设计，很快会出现子类爆炸的情况。
>
> 因此，直接使用继承，为各种`InputStream`附加更多的功能，根本无法控制代码的复杂度，很快就会失控。



### 3、FilterInputStream简介



> 为了解决依赖继承会导致子类数量失控的问题，JDK首先将`InputStream`分为两大类：
>
> 无论我们包装多少次，得到的对象始终是`InputStream`，我们直接用`InputStream`来引用它！
>
> 通过一个“基础”组件再叠加各种“附加”功能组件的模式，称之为Filter模式（或者装饰器模式：Decorator）。它可以让我们通过少量的类来实现各种功能的组合！
>
> FilterInputStream是其他各钟功能的父类！





一类是直接提供数据的基础`InputStream`，例如：

- FileInputStream
- ByteArrayInputStream
- ServletInputStream
- ...

一类是提供额外附加功能的`InputStream`，例如：

- BufferedInputStream
- DigestInputStream
- CipherInputStream
- ...



```java
InputStream file = new FileInputStream("test.gz");

// 使用BufferedInputStream包装InputStream,添加缓冲功能：
InputStream buffered = new BufferedInputStream(file);
// 使用GZIPInputStream包装InputStream,添加解压功能：
InputStream gzip = new GZIPInputStream(buffered);
```





#### 结构图像这样：

> `OutputStream`也一样！

```ascii
                 ┌─────────────┐
                 │ InputStream │
                 └─────────────┘
                       ▲ ▲
┌────────────────────┐ │ │ ┌─────────────────┐
│  FileInputStream   │─┤ └─│FilterInputStream│
└────────────────────┘ │   └─────────────────┘
┌────────────────────┐ │     ▲ ┌───────────────────┐
│ByteArrayInputStream│─┤     ├─│BufferedInputStream│
└────────────────────┘ │     │ └───────────────────┘
┌────────────────────┐ │     │ ┌───────────────────┐
│ ServletInputStream │─┘     ├─│  DataInputStream  │
└────────────────────┘       │ └───────────────────┘
                             │ ┌───────────────────┐
                             └─│CheckedInputStream │
                               └───────────────────┘
```



### 4、编写FilterInputStream



> 下面编写一个自定义的FilterInputStream来实现需要实现的功能，同时还可以使得所有InputStream都可以使用该功能：
>
> CountInputStream实现了计数功能；



所有的功能都必须得继承自FilterInputStream！



```java
package com.learn.file;

import java.io.ByteArrayInputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class FilterWork {
    public static void main(String[] args) throws IOException{
        byte[] data = "hello world!".getBytes(StandardCharsets.UTF_8);
        // 使用ByteArrayInputStream将byte数组封装为InputStream;
        try(CountInputStream inputStream = new CountInputStream(new ByteArrayInputStream(data))){
            int n;
            while ((n = inputStream.read()) != -1){
                System.out.print((char)n); // hello world!
            }
            System.out.println("\nTotal read " + inputStream.getBytesRead() + " bytes!"); // Total read 12 bytes!
        }
    }
}

class CountInputStream extends FilterInputStream{

    private int count;

    // Idea自动生成的注释：
    /**
     * Creates a {@code FilterInputStream}
     * by assigning the  argument {@code in}
     * to the field {@code this.in} so as
     * to remember it for later use.
     *
     * @param in the underlying input stream, or {@code null} if
     *           this instance is to be created without an underlying stream.
     */
    protected CountInputStream(InputStream in) {
        super(in);
    }

    public int getBytesRead() {
        return this.count;
    }

    public int read() throws IOException {
        int n = in.read();
        if (n != -1) {
            this.count ++;
        }
        return n;
    }

    public int read(byte[] b, int off, int len) throws IOException {
        int n = in.read(b, off, len);
        this.count += n;
        return n;
    }
}
```





## 六、操作Zip



### 1、ZipInputStream



> `ZipInputStream`是一种`FilterInputStream`，它可以直接读取zip包的内容：
>
> 另一个`JarInputStream`是从`ZipInputStream`派生，它增加的主要功能是直接读取jar文件里面的`MANIFEST.MF`文件。因为本质上jar包就是zip包，只是额外附加了一些固定的描述文件。



继承的结构关系：

```ascii
┌───────────────────┐
│    InputStream    │
└───────────────────┘
          ▲
          │
┌───────────────────┐
│ FilterInputStream │
└───────────────────┘
          ▲
          │
┌───────────────────┐
│InflaterInputStream│
└───────────────────┘
          ▲
          │
┌───────────────────┐
│  ZipInputStream   │
└───────────────────┘
          ▲
          │
┌───────────────────┐
│  JarInputStream   │
└───────────────────┘
```





### 2、读取Zip包



>创建一个`ZipInputStream`，通常是传入一个`FileInputStream`作为数据源，然后，循环调用`getNextEntry()`，直到返回`null`，表示zip流结束。
>
>一个`ZipEntry`表示一个压缩文件或目录，如果是压缩文件，我们就用`read()`方法不断读取，直到返回`-1`：



```java
package com.learn.file;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ZipTest {
    public static void main(String[] args) throws IOException {

        try (ZipInputStream zip = new ZipInputStream(new FileInputStream(".\\zip.zip"))) {
            ZipEntry entry = null;
            while ((entry = zip.getNextEntry()) != null) {
                System.out.println("文件或目录名：" + entry.getName());
                if (!entry.isDirectory()) {
                    int n;
                    System.out.print("内容：");
                    while ((n = zip.read()) != -1) {
                        System.out.print((char) n);
                    }
                    System.out.println();
                }
            }
        }
    }
}
```



结果如下：

```
文件或目录名：niub/
文件或目录名：test.txt
内容：I am a Test file!
文件或目录名：zip.txt
内容：hello world!
```



### 3、写入Zip包



> `ZipOutputStream`是一种`FilterOutputStream`，它可以直接写入内容到zip包。我们要先创建一个`ZipOutputStream`，通常是包装一个`FileOutputStream`，然后，每写入一个文件前，先调用`putNextEntry()`，然后用`write()`写入`byte[]`数据，写入完毕后调用`closeEntry()`结束这个文件的打包。





```java
package com.learn.file;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class ZipTest {
    public static void main(String[] args) throws IOException {

        try (ZipInputStream zip = new ZipInputStream(new FileInputStream(".\\zip.zip"))) {
            ZipEntry entry = null;
            while ((entry = zip.getNextEntry()) != null) {
                System.out.println("文件或目录名：" + entry.getName());
                if (!entry.isDirectory()) {
                    int n;
                    System.out.print("内容：");
                    while ((n = zip.read()) != -1) {
                        System.out.print((char) n);
                    }
                    System.out.println();
                }
            }
        }


        File file1 = new File(".\\Settings");
        try (ZipOutputStream zip = new ZipOutputStream(new FileOutputStream(".\\zip.zip"))) {
            File[] files = file1.listFiles();
            if(files != null){
                for (File file : files) {
                    // 在Zip中创建文件
                    zip.putNextEntry(new ZipEntry(file.getName()));
                    // 将内容写入
                    zip.write(getFileDataAsBytes(file));
                    // 关闭外部文件
                    zip.closeEntry();
                }
            }
        }
    }

    private static byte[] getFileDataAsBytes(File file) throws IOException{
        byte[] data = new byte[1024];
        try(InputStream file1 = new FileInputStream(file)){
            int n;
            while((n = file1.read(data)) != -1){
                System.out.println("read " + n + " byte");
            }
        }
        return data;
    }
}
```



## 七、读取classpath资源



> 是一种与路径无关的读取文件的方式：
>
> 从classpath读取文件就可以避免不同环境下文件路径不一致的问题：如果我们把`default.properties`文件放到classpath中，就不用关心它的实际存放路径。
>
> 在classpath中的资源文件，路径总是以`／`开头，我们先获取当前的`Class`对象，然后调用`getResourceAsStream()`就可以直接从classpath读取任意的资源文件！
>
> 关于classpath目前还不太清楚，后续再进行学习！

Java存放`.class`的目录或jar包也可以包含任意其他类型的文件，例如：

- 配置文件，例如`.properties`；
- 图片文件，例如`.jpg`；
- 文本文件，例如`.txt`，`.csv`；
- ……

```java
package com.learn.file;

import java.io.IOException;
import java.io.InputStream;

public class ClassPathTest {
    public static void main(String[] args) throws IOException {
        try (InputStream input = ClassPathTest.class.getResourceAsStream("/default.properties")) {
            if (input != null) {
                int n;
                while((n = input.read()) != -1){
                    System.out.print((char) n);
                }
            }
        }
    }
}
```





如果我们把默认的配置放到jar包中，再从外部文件系统读取一个可选的配置文件，就可以做到既有默认的配置文件，又可以让用户自己修改配置：





```java
Properties props = new Properties();
props.load(inputStreamFromClassPath("/default.properties"));
props.load(inputStreamFromFile("./conf.properties"));
```



## 八、序列化



>序列化是指把一个Java对象变成二进制内容，本质上就是一个`byte[]`数组。
>
>为什么要把Java对象序列化呢？因为序列化后可以把`byte[]`保存到文件中，或者把`byte[]`通过网络传输到远程，这样，就相当于把Java对象存储到文件或者通过网络传输出去了。
>
>有序列化，就有反序列化，即把一个二进制内容（也就是`byte[]`数组）变回Java对象。有了反序列化，保存到文件中的`byte[]`数组又可以“变回”Java对象，或者从网络上读取`byte[]`并把它“变回”Java对象。
>
>一个Java对象要能序列化，必须实现一个特殊的`java.io.Serializable`接口：
>
>`Serializable`接口没有定义任何方法，它是一个空接口。我们把这样的空接口称为“标记接口”（Marker Interface），实现了标记接口的类仅仅是给自身贴了个“标记”，并没有增加任何方法。
>
>这节有点云里雾里，后续再看！



### 1、序列化



> 把一个Java对象变为`byte[]`数组，需要使用`ObjectOutputStream`。它负责把一个Java对象写入一个字节流。
>
> `ObjectOutputStream`既可以写入基本类型，如`int`，`boolean`，也可以写入`String`（以UTF-8编码），还可以写入实现了`Serializable`接口的`Object`。
>
> 因为写入`Object`时需要大量的类型信息，所以写入的内容很大。



```java
package com.learn.file;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Arrays;

public class SerializableTest {
    public static void main(String[] args) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        try (ObjectOutputStream output = new ObjectOutputStream(buffer)) {
            // 写入int:
            output.writeInt(12345);
            // 写入String:
            output.writeUTF("Hello");
            // 写入Object:
            output.writeObject(123.456);
        }
        System.out.println(Arrays.toString(buffer.toByteArray()));
    }
}
```







### 2、反序列化



> 和`ObjectOutputStream`相反，`ObjectInputStream`负责从一个字节流读取Java对象
>
> 除了能读取基本类型和`String`类型外，调用`readObject()`可以直接返回一个`Object`对象。要把它变成一个特定类型，必须强制转型。
>
> 要特别注意反序列化的几个重要特点：
>
> 反序列化时，由JVM直接构造出Java对象，不调用构造方法，构造方法内部的代码，在反序列化时根本不可能执行。

`readObject()`可能抛出的异常有：

- `ClassNotFoundException`：没有找到对应的Class；
- `InvalidClassException`：Class不匹配。

>对于`ClassNotFoundException`，这种情况常见于一台电脑上的Java程序把一个Java对象，例如，`Person`对象序列化以后，通过网络传给另一台电脑上的另一个Java程序，但是这台电脑的Java程序并没有定义`Person`类，所以无法反序列化。
>
>对于`InvalidClassException`，这种情况常见于序列化的`Person`对象定义了一个`int`类型的`age`字段，但是反序列化时，`Person`类定义的`age`字段被改成了`long`类型，所以导致class不兼容。



```java
package com.learn.file;

import java.io.*;
import java.util.Arrays;

public class SerializableTest {
    public static void main(String[] args) throws Exception {
        ByteArrayInputStream bufferin = new ByteArrayInputStream(buffer.toByteArray());
        try (ObjectInputStream input = new ObjectInputStream(bufferin)) {
            int n = input.readInt();
            String s = input.readUTF();
            Double d = (Double) input.readObject();
            System.out.println(n);
            System.out.println(s);
            System.out.println(d);
        }
    }
}
```



> 为了避免这种class定义变动导致的不兼容，Java的序列化允许class定义一个特殊的`serialVersionUID`静态变量，用于标识Java类的序列化“版本”，通常可以由IDE自动生成。如果增加或修改了字段，可以改变`serialVersionUID`的值，这样就能自动阻止不匹配的class版本：



```java
public class Person implements Serializable {
    private static final long serialVersionUID = 2709425275741743919L;
}
```







### 3、安全性



>因为Java的序列化机制可以导致一个实例能直接从`byte[]`数组创建，而不经过构造方法，因此，它存在一定的安全隐患。一个精心构造的`byte[]`数组被反序列化后可以执行特定的Java代码，从而导致严重的安全漏洞。
>
>实际上，Java本身提供的基于对象的序列化和反序列化机制既存在安全性问题，也存在兼容性问题。更好的序列化方法是通过JSON这样的通用数据结构来实现，只输出基本类型（包括String）的内容，而不存储任何与代码相关的信息。



## 九、Reader



> `Reader`是Java的IO库提供的另一个输入流接口。和`InputStream`的区别是，`InputStream`是一个字节流，即以`byte`为单位读取，而`Reader`是一个字符流，即以`char`为单位读取：
>
> `java.io.Reader`是所有字符输入流的超类！
>
> `read()`方法读取字符流的下一个字符，并返回字符表示的`int`，范围是`0`~`65535`。如果已读到末尾，返回`-1`。





### 1、Reader和InputStream对比



| InputStream                         | Reader                                |
| :---------------------------------- | :------------------------------------ |
| 字节流，以`byte`为单位              | 字符流，以`char`为单位                |
| 读取字节（-1，0~255）：`int read()` | 读取字符（-1，0~65535）：`int read()` |
| 读到字节数组：`int read(byte[] b)`  | 读到字符数组：`int read(char[] c)`    |





### 2、FileReader



> `FileReader`是`Reader`的一个子类，它可以打开文件并获取`Reader：
>
> `FileReader()`可以接收一个编码参数！



#### 2.1 直接创建FileReader



```java
package com.learn.file;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

public class ReaderTest {
    public static void main(String[] args) throws IOException {
        Reader reader = new FileReader("Settings\\readme.txt");
        int n;
        while((n = reader.read()) != -1){
            System.out.print((char) n);
        }
        reader.close();
    }
}
```



#### 2.2 使用try(resourse)实现自动关闭资源



```java
package com.learn.file;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

public class ReaderTest {
    public static void main(String[] args) throws IOException {

        try(Reader reader = new FileReader("Settings\\readme.txt")){
            int n;
            while((n = reader.read()) != -1){
                System.out.print((char) n);
            }
        }
    }
}
```



#### 2.3 填充字符到char数组



> `read(char[] c)`返回实际读入的字符个数，最大不超过`char[]`数组的长度。返回`-1`表示流结束。





```java
package com.learn.file;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

public class ReaderTest {
    public static void main(String[] args) throws IOException {

        try(Reader reader = new FileReader("Settings\\readme.txt")){
            int n;
            char[] buffer = new char[100];
            while((n = reader.read(buffer)) != -1){
                System.out.println("read " + n + "chars");
            }
        }
    }
}
```







### 3、CharArrayReader



> `CharArrayReader`可以在内存中模拟一个`Reader`，它的作用实际上是把一个`char[]`数组变成一个`Reader`：





```java
try (Reader reader = new CharArrayReader("Hello".toCharArray())) {
	int n;
	while((n = reader.read()) != -1){
System.out.print((char) n);
	}
}
```



### 4、StringReader



> `StringReader`可以直接把`String`作为数据源，它和`CharArrayReader`几乎一样：



```java
try (Reader reader = new StringReader("Hello")) {
    int n;
    while((n = reader.read()) != -1){
    	System.out.print((char) n);
    }
}
```



### 5、InputStreamReader



> 除了特殊的`CharArrayReader`和`StringReader`，普通的`Reader`实际上是基于`InputStream`构造的。
>
> 因为`Reader`需要从`InputStream`中读入字节流（`byte`），然后，根据编码设置，再转换为`char`就可以实现字符流。
>
> `InputStreamReader`就是一个转换器，它可以把任何`InputStream`转换为`Reader`：
>
> 两个参数，一个InputStream，一个可选的编码方式参数！
>
> 使用`try (resource)`结构时，当我们关闭`Reader`时，它会在内部自动调用`InputStream`的`close()`方法，所以，只需要关闭最外层的`Reader`对象即可



```java
// 持有InputStream:
InputStream input = new FileInputStream("src/readme.txt");
// 变换为Reader:
Reader reader = new InputStreamReader(input, StandardCharsets.UTF_8);

// 使用try(resourse)：
try (Reader reader1 = new InputStreamReader(new FileInputStream("src/readme.txt"),StandardCharsets.UTF_8)) {
     // TODO:
     System.out.println(reader1);
}
```





## 十、Writer



> `Reader`是带编码转换器的`InputStream`，它把`byte`转换为`char`，而`Writer`就是带编码转换器的`OutputStream`，它把`char`转换为`byte`并输出：







### 1、Reader和InputStream对比



| OutputStream                           | Writer                                   |
| :------------------------------------- | :--------------------------------------- |
| 字节流，以`byte`为单位                 | 字符流，以`char`为单位                   |
| 写入字节（0~255）：`void write(int b)` | 写入字符（0~65535）：`void write(int c)` |
| 写入字节数组：`void write(byte[] b)`   | 写入字符数组：`void write(char[] c)`     |
| 无对应方法                             | 写入String：`void write(String s)`       |



`Writer`是所有字符输出流的超类，它提供的方法主要有：

- 写入一个字符（0~65535）：`void write(int c)`；
- 写入字符数组的所有字符：`void write(char[] c)`；
- 写入String表示的所有字符：`void write(String s)`。



### 2、FileWriter



> 同样可以设置第三个参数，使其不进行覆盖写入：

```java
package com.learn.file;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class WriterTest {
    public static void main(String[] args) throws IOException {
        try (Writer writer = new FileWriter("readme.txt", StandardCharsets.UTF_8, true)) {
            writer.write('H'); // 写入单个字符
            writer.write("Hello".toCharArray()); // 写入char[]
            writer.write("Hello"); // 写入String
        }

        try (Reader reader = new FileReader("readme.txt")){
            int n;
            while((n = reader.read()) != -1){
                System.out.print((char) n);
            }
        }
    }
}
```



### 3、CharArrayWriter



> `CharArrayWriter`可以在内存中创建一个`Writer`，它的作用实际上是构造一个缓冲区，可以写入`char`，最后得到写入的`char[]`数组：



```java
package com.learn.file;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class WriterTest {
    public static void main(String[] args) throws IOException {
        try (CharArrayWriter writer = new CharArrayWriter()) {
            writer.write(65);
            writer.write(66);
            writer.write(67);
            char[] data = writer.toCharArray();
            System.out.print(data); // ABC
        }
    }
}
```



### 4、StringWriter



> `StringWriter`也是一个基于内存的`Writer`，它和`CharArrayWriter`类似。实际上，`StringWriter`在内部维护了一个`StringBuffer`，并对外提供了`Writer`接口：
>
> 可以使用`StringBuffer`的所有方法，只是实现了一个writer接口：



```java
package com.learn.file;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class WriterTest {
    public static void main(String[] args) throws IOException {
        try (StringWriter writer = new StringWriter()) {
            writer.write("hello world nxd");
            writer.append(" last!");
            System.out.print(writer);
        }
    }
}
```



### 5、OutputStreamWriter





> 除了`CharArrayWriter`和`StringWriter`外，普通的Writer实际上是基于`OutputStream`构造的，它接收`char`，然后在内部自动转换成一个或多个`byte`，并写入`OutputStream`。因此，`OutputStreamWriter`就是一个将任意的`OutputStream`转换为`Writer`的转换器：



```java
try (Writer writer = new OutputStreamWriter(new FileOutputStream("readme.txt"), StandardCharsets.UTF_8)) {
    // TODO:
    int n;
    writer.write("hello");
}
```





## 十一、PrintStream和PrintWriter





### 1、PrintStream



> `PrintStream`和`OutputStream`相比，除了添加了一组`print()`/`println()`方法，可以打印各种数据类型，比较方便外，它还有一个额外的优点，就是不会抛出`IOException`，这样我们在编写代码的时候，就不必捕获`IOException`。
>
> 以及对应的一组`println()`方法，它会自动加上换行符。
>
> 我们经常使用的`System.out.println()`实际上就是使用`PrintStream`打印各种数据。其中，`System.out`是系统默认提供的`PrintStream`，表示标准输出.
>
> `System.err`是系统默认提供的标准错误输出。
>
> `PrintStream`是一种`FilterOutputStream`，它在`OutputStream`的接口上，额外提供了一些写入各种数据类型的方法：



- 写入`int`：`print(int)`
- 写入`boolean`：`print(boolean)`
- 写入`String`：`print(String)`
- 写入`Object`：`print(Object)`，实际上相当于`print(object.toString())`
- ...





```java
package com.learn.file;

public class PrintStreamTest {
    public static void main(String[] args) {
        System.out.print(12345); // 输出12345
        System.out.print(new Object()); // 输出类似java.lang.Object@3c7a835a
        System.out.println("Hello"); // 输出Hello并换行
        
        System.err.println("hhh");
    }
}
```



### 2、PrintWriter



> `PrintStream`最终输出的总是byte数据，而`PrintWriter`则是扩展了`Writer`接口，它的`print()`/`println()`方法最终输出的是`char`数据。两者的使用方法几乎是一模一样的：





```java
package com.learn.file;

import java.io.PrintWriter;
import java.io.StringWriter;

public class PrintWriterTest {
    public static void main(String[] args) {
        StringWriter buffer = new StringWriter();
        try (PrintWriter pw = new PrintWriter(buffer)) {
            pw.println("Hello");
            pw.println(12345);
            pw.println(true);
        }
        System.out.println(buffer.toString());
    }
}
```







<center style="color:red; font-size:25px">本章终于完结，敬请期待后续内容！</center>











