---
title: 基于异步的、事件驱动的网络应用程序框架、快速开发高性能、高可靠性的网络服务器和客户端程序Netty介绍
author: ITNXD
toc: true
abbrlink: 44402
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@e915ec1da8f4fd93824ca93a53c42d6c2371d03d/2021/11/02/5a36755da549fd44dd641d57680b154c.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@e915ec1da8f4fd93824ca93a53c42d6c2371d03d/2021/11/02/5a36755da549fd44dd641d57680b154c.png
categories: 网络编程
tags:
  - Netty
  - NIO
date: 2021-11-01 14:38:06
updated:
---







# 一、BIO编程



## 1、I/O 模型





- I/O 模型简单的理解：就是用什么样的通道进行数据的发送和接收，很大程度上决定了程序通信的性能
- Java 共支持 3 种网络编程模型 IO 模式：**BIO、NIO、AIO**
- **Java BIO ： 同步并阻塞(传统阻塞型)**，服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的线程开销
- **Java NIO ： 同步非阻塞**，服务器实现模式为一个线程处理多个请求(连接)，即客户端发送的连接请求都会注册到多路复用器上，多路复用器轮询到连接有 I/O 请求就进行处理





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@29defda3efef0e650883e4397cf8c65b92d65ede/2021/11/01/3732838213a7ba45f5480b218471bed6.png)



- **Java AIO(NIO.2) ： 异步非阻塞**，AIO 引入异步通道的概念，采用了 Proactor 模式，简化了程序编写，有效的请求才启动线程，它的特点是先由操作系统完成后才通知服务端程序启动线程去处理，一般适用于**连接数较多且连接时间较长**的应用





## 2、适用场景分析







- BIO 方式适用于**连接数目比较小且固定**的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4以前的唯一选择，但程序简单易理解。
- NIO 方式适用于**连接数目多且连接比较短**（轻操作）的架构，比如聊天服务器，弹幕系统，服务器间通讯等。编程比较复杂，JDK1.4 开始支持。
- AIO 方式使用于**连接数目多且连接比较长**（重操作）的架构，比如相册服务器，充分调用 OS 参与并发操作，编程比较复杂，JDK7 开始支持。







## 3、BIO 基本介绍



- Java BIO 就是传统的 Java IO 编程，其相关的类和接口在 java.io
- BIO(blocking I/O) ： 同步阻塞，服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的线程开销，可以通过线程池机制改善(实现多个客户连接服务器)。 
- BIO 方式适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4以前的唯一选择，程序简单易理解





## 4、BIO 编程流程



1. 服务器端启动一个 ServerSocket
2. 客户端启动 Socket 对服务器进行通信，默认情况下服务器端需要对每个客户建立一个线程与之通讯
3. 客户端发出请求后, 先咨询服务器是否有线程响应，如果没有则会等待，或者被拒绝
4. 如果有响应，客户端线程会等待请求结束后，在继续执行





## 5、BIO 应用实例





### 实例说明



1) 使用 BIO 模型编写一个服务器端，监听 6666 端口，当有客户端连接时，就启动一个线程与之通讯。
2) 要求使用线程池机制改善，可以连接多个客户端. 
3) 服务器端可以接收客户端发送的数据(telnet 方式即可)。



### 代码实现





```java
/**
 * BIO测试，使用telnet 127.0.0.1 6666 进行测试，连接成功ctrl + ]进入控制！
 *
 * @author ITNXD
 * @create 2021-10-25 20:41
 */
public class BIOServer {

    public static void main(String[] args) throws IOException {
        // 1. 创建线程池
        ExecutorService threadPool = Executors.newCachedThreadPool();
        // 2. 有客户端连接连接，就创建一个线程
        ServerSocket serverSocket = new ServerSocket(6666);
        System.out.println("服务器启动了...");

        while(true){
            // 监听客户端连接
            System.out.println("等待连接...."); // accept会阻塞
            final Socket socket = serverSocket.accept();
            System.out.println("已经连接到一个客户端！");
            // 为客户端创建线程
            threadPool.execute(()->{
                Handler(socket);
            });
        }
    }

    // 用于处理客户端通信
    public static void Handler(Socket socket){
        try {
            System.out.println("线程信息：" + Thread.currentThread().getName());
            byte[] bytes = new byte[1024];
            // 通过socket获取输入流
            InputStream inputStream = socket.getInputStream();
            while(true){
                System.out.println("线程信息：" + Thread.currentThread().getName());

                System.out.println("等待读 read ...");
                int len = inputStream.read(bytes); // read也会阻塞
                if(len != -1){
                    System.out.println(new String(bytes, 0, len));
                }else{
                    break;
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            // 关闭与客户端的连接
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



## 6、BIO 问题分析







1. 每个请求都需要创建独立的线程，与对应的客户端进行数据 Read，业务处理，数据 Write 。
2. 当并发数较大时，需要创建大量线程来处理连接，系统资源占用较大。
3. 连接建立后，如果当前线程暂时没有数据可读，则线程就阻塞在 Read 操作上，造成线程资源浪费





# 二、NIO编程



## 1、NIO 基本介绍



### 基本介绍



1) Java NIO 全称 java non-blocking IO，是指 JDK 提供的新 API。从 JDK1.4 开始，Java 提供了一系列改进的输入/输出的新特性，被统称为 NIO(即 New IO)，是**同步非阻塞**的
2) NIO 相关类都被放在 java.nio 包及子包下，并且对原 java.io 包中的很多类进行改写。
3) **NIO 有三大核心部分：Channel(通道)，Buffer(缓冲区), Selector(选择器)**
4) NIO 是 **面向缓冲区 ，或者面向 块 编程**的。数据读取到一个它稍后处理的缓冲区，需要时可在缓冲区中前后移动，这就增加了处理过程中的灵活性，使用它可以提供非阻塞式的高伸缩性网络
5) Java NIO 的非阻塞模式，使一个线程从某通道发送请求或者读取数据，但是它仅能得到目前可用的数据，如果目前没有数据可用时，就什么都不会获取，而不是保持线程阻塞，所以直至数据变的可以读取之前，该线程可以继续做其他的事情。 非阻塞写也是如此，一个线程请求写入一些数据到某通道，但不需要等待它完全写入，这个线程同时可以去做别的事情。
6) 通俗理解：NIO 是可以做到用一个线程来处理多个操作的。假设有 10000 个请求过来,根据实际情况，可以分配50 或者 100 个线程来处理。不像之前的阻塞 IO 那样，非得分配 10000 个。
7) HTTP2.0 使用了**多路复用**的技术，做到同一个连接并发处理多个请求，而且并发请求的数量比 HTTP1.1 大了好几个数量级







### 小案例



**NIO buffer的简单使用：**



```java
public class BasicBuffer {

    // Buffer使用
    public static void main(String[] args) {
        // 创建一个Buffer 可存放5个int
        IntBuffer intBuffer = IntBuffer.allocate(5);
        // 放入数据
        //intBuffer.put(10);
        for (int i = 0; i < intBuffer.capacity(); i++) {
            intBuffer.put(i);
        }
        /*
         将buffer读写转换 小标初始化为0
         public Buffer flip() {
            limit = position; // 当前上限就是插入的数据量
            position = 0;
            mark = -1;
            return this;
        }
         */
        intBuffer.flip();
        // 设置从索引为1开始读取
        intBuffer.position(1);
        // 设置上限下标为3，即小标 < 3
        intBuffer.limit(3);
        while(intBuffer.hasRemaining()){
            System.out.println(intBuffer.get());
        }

    }
}
```





## 2、NIO 和 BIO 的比较



1. BIO 以**流的方式**处理数据,而 NIO 以**块的方式**处理数据,块 I/O 的效率比流 I/O 高很多

2) BIO 是阻塞的，NIO 则是**非阻塞**的
3) BIO 基于**字节流和字符流**进行操作，而 NIO 基于 **Channel(通道)和 Buffer(缓冲区)**进行操作，数据总是从通道读取到缓冲区中，或者从缓冲区写入到通道中。Selector(选择器)用于监听多个通道的事件（比如：连接请求，数据到达等），因此使用单个线程就可以监听多个客户端通道







## 3、NIO 三大核心原理示意图



**一张图描述 NIO 的 Selector 、 Channel 和 Buffer 的关系：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9a4bcaa7c7fe8b62b809b7de645919e7b2c675c0/2021/11/01/1442e1a9271b1394f089af8aae0e881b.png)





**简单说明：**

1. 每个 channel 都会对应一个 Buffer
2. Selector 对应一个线程， 一个线程对应多个 channel(连接)
3. 该图反应了有三个 channel 注册到 该 selector
4. 程序切换到哪个 channel 是有事件决定的, Event 就是一个重要的概念
5. Selector 会根据不同的事件，在各个通道上切换
6. Buffer 就是一个内存块 ， 底层是有一个数组
7. 数据的读取写入是通过 Buffer, 这个和 BIO , BIO 中要么是输入流，或者是输出流, 不能双向，但是 NIO 的 Buffer 是可以读也可以写, 需要 flip 方法切换channel 是双向的, 可以返回底层操作系统的情况, 比如 Linux ， 底层的操作系统通道就是双向的.





## 4、缓冲区 Buffer



### 基本介绍



**缓冲区（Buffer）**：缓冲区本质上是一个可以读写数据的内存块，可以理解成是一个容器对象(含数组)，该对象提供了一组方法，可以更轻松地使用内存块，缓冲区对象内置了一些机制，能够跟踪和记录缓冲区的状态变化情况。Channel 提供从文件、网络读取数据的渠道，但是读取或写入的数据都必须经由 Buffer，





### Buffer 类及其子类



- 在 NIO 中，Buffer 是一个顶层父类，它是一个抽象类, 类的层级关系图：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d8e47f71bf278f388adad6b2e46918c90e2acebc/2021/11/01/b3518ccd029e026d73efabc5f43c5e8b.png)



- Buffer 类定义了所有的缓冲区都具有的四个属性来提供关于其所包含的数据元素的信息：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8750f2792bc0274d5f73ae58e0cac9164ff8d8ac/2021/11/01/d5ac82aa972b1b9267aa90c592a88e8d.png)



- Buffer 类相关方法一览：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9fe5fe87d873c89a955b58fa32d350d926115b14/2021/11/01/44078b911e56e29466e13abd52e7a067.png)







### ByteBuffer



从前面可以看出对于 Java 中的基本数据类型(boolean 除外)，都有一个 Buffer 类型与之相对应，最常用的自然是 ByteBuffer 类（二进制数据），该类的主要方法如下：





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4bb5caa313e68196093899e017b07fbd19210597/2021/11/01/38fa516dbe45924b5b41e12decfd0c44.png)





## 5、通道 Channel





### 基本介绍



1) NIO 的通道类似于流，但有些区别如下：
  1) 通道可以**同时进行读写**，而流只能读或者只能写
  2) 通道可以实现**异步读写**数据
  3) 通道可以从缓冲读数据，也可以写数据到缓冲:
2) BIO 中的 stream 是单向的，例如 FileInputStream 对象只能进行读取数据的操作，而 NIO 中的通道(Channel)是双向的，可以读操作，也可以写操作。
3) Channel 在 NIO 中是一个接口 `public interface Channel extends Closeable{}`
4) 常 用 的 Channel 类 有 ： FileChannel 、 DatagramChannel 、 ServerSocketChannel 和 SocketChannel 。【ServerSocketChanne 类似 ServerSocket , SocketChannel 类似 Socket】
5) **FileChannel 用于文件的数据读写，DatagramChannel 用于 UDP 的数据读写，ServerSocketChannel 和 SocketChannel 用于 TCP 的数据读写。**





### FileChannel 类



FileChannel 主要用来对本地文件进行 IO 操作，常见的方法有：



1. public int read(ByteBuffer dst) ，从通道读取数据并放到缓冲区中
2. public int write(ByteBuffer src) ，把缓冲区的数据写到通道中
3. public long transferFrom(ReadableByteChannel src, long position, long count)，从目标通道中复制数据到当前通道
4. public long transferTo(long position, long count, WritableByteChannel target)，把数据从当前通道复制给目标通道





### 本地文件写数据



使用 ByteBuffer(缓冲) 和 FileChannel(通道)， 将 "hello, 你好！" 写入到 file.txt 中：





```java
public class NIOFileChannel01 {

    /**
     * byteBuffer -> fileChannel -> fileOutputStream -> 文件
     * @param args
     * @throws FileNotFoundException
     */
    public static void main(String[] args) throws IOException {
        String str = "hello, 你好！";
        // 创建输出流
        FileOutputStream fos = new FileOutputStream(new File("E:\\file.txt"));
        // 通过输出流获取对应的FileChannel，真正实现是FileChannelImpl
        FileChannel fileChannel = fos.getChannel();
        // 创建缓冲区
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
        // 将字符串放入buffer
        byteBuffer.put(str.getBytes());

        // 将byteBuffer反转初始化position为读
        byteBuffer.flip();
        // 将buffer写入到Channel
        fileChannel.write(byteBuffer);

        // 关闭流
        fos.close();
    }
}
```











### 本地文件读数据



使用 ByteBuffer(缓冲) 和 FileChannel(通道)， 将 file.txt 中的数据读入到程序，并显示在控制台屏幕：





```java
public class NIOFileChannel02 {

    public static void main(String[] args) throws IOException {
        // 创建文件输入流
        File file = new File("E:\\file.txt");
        FileInputStream fis = new FileInputStream(file);
        // 通过输入流获取对应的FileChannel，真正实现是FileChannelImpl
        FileChannel fileChannel = fis.getChannel();
        // 创建缓冲区
        ByteBuffer byteBuffer = ByteBuffer.allocate((int) file.length());
        // 将channel读取到buffer
        fileChannel.read(byteBuffer);

        // 将字节转换成字符串
        System.out.println(new String(byteBuffer.array()));
        // 关闭流
        fis.close();
    }
}
```





### 本地文件读写数据



使用 FileChannel(通道) 和 方法 read , write，完成文件的拷贝！

拷贝一个文本文件 1.txt , 放在项目下即可：



```java
public class NIOFileChannel03 {

    public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("1.txt");
        FileChannel fileChannel01 = fis.getChannel();

        FileOutputStream fos = new FileOutputStream("2.txt");
        FileChannel fileChannel02 = fos.getChannel();

        ByteBuffer byteBuffer = ByteBuffer.allocate(512);

        // 循环读取
        while(true){
            /*
            每次循环进行重置复位
            public Buffer clear() {
                position = 0;
                limit = capacity;
                mark = -1;
                return this;
            }
            若不复位，则position=limit=文件的字节数，下次再进行读的话下标已经到达limit
            的可读的最大值，因此读不到东西返回read=0，后面再次flip将会再次将两个变量
            赋值为文件字节数，因此变成了死循环！
             */
            byteBuffer.clear();
            // 读到buffer
            int read = fileChannel01.read(byteBuffer);
            if(read == -1){
                break;
            }
            // 写到channel02 继而写到2.txt
            byteBuffer.flip();
            fileChannel02.write(byteBuffer);
        }

        // 关闭流
        fis.close();
        fos.close();
    }
}
```





### 拷贝文件 transferFrom 方法

使用 FileChannel(通道) 和 方法 transferFrom ，完成文件的拷贝：

```java
public class NIOFileChannel04 {

    public static void main(String[] args) throws IOException {
        // 创建流
        FileInputStream fis = new FileInputStream("E:\\a.jpg");
        FileOutputStream fos = new FileOutputStream("E:\\b.jpg");
        // 创建Channel
        FileChannel source = fis.getChannel();
        FileChannel dest = fos.getChannel();

        // 直接使用：将source复制到dest
        dest.transferFrom(source, 0, source.size());

        // 关闭相关流和Channel
        fis.close();
        fos.close();
        source.close();
        dest.close();
    }
}
```





## 6、Buffer 和 Channel 细节





- ByteBuffer 支持类型化的 put 和 get, put 放入的是什么数据类型，get 就应该使用相应的数据类型来取出，否则可能有 `BufferUnderflowException` 异常



```java
public class NIOByteBufferPutGet {

    public static void main(String[] args) {
        ByteBuffer byteBuffer = ByteBuffer.allocate(255);

        byteBuffer.putInt(33);
        byteBuffer.putLong(22);
        byteBuffer.putChar('牛');
        byteBuffer.putShort((short) 4);

        byteBuffer.flip();

        System.out.println(byteBuffer.getInt());
        System.out.println(byteBuffer.getLong());
        System.out.println(byteBuffer.getChar());
        //System.out.println(byteBuffer.getShort());
        // 抛出异常：short 2个字节要4个字节读，无法读取
        System.out.println(byteBuffer.getInt());
    }
}
```





- 可以将一个普通 Buffer 转成只读 Buffer



```java
public class ReadOnlyBuffer {

    public static void main(String[] args) {
        ByteBuffer byteBuffer = ByteBuffer.allocate(64);
        for (int i = 0; i < 64; i++) {
            byteBuffer.put((byte) i);
        }
        byteBuffer.flip();
        // 创建只读的buffer
        ByteBuffer readOnlyBuffer = byteBuffer.asReadOnlyBuffer();
        // class java.nio.HeapByteBufferR
        System.out.println(readOnlyBuffer.getClass());
        // 读取
        while(readOnlyBuffer.hasRemaining()){
            System.out.println(readOnlyBuffer.get());
        }
        // 只读buffer，无法写入数据了 抛出 ReadOnlyBufferException
        readOnlyBuffer.put((byte) 100);
    }
}
```





- NIO 还提供了 `MappedByteBuffer`， 可以让文件直接在内存（**堆外的内存**）中进行修改， 而如何同步到文件由 NIO 来完成



```java
public class MappedByteBufferTest {

    /**
     * MappedByteBuffer 可让文件直接在内存(堆外内存)修改, 操作系统不需要拷贝一次
     * @param args
     */
    public static void main(String[] args) throws IOException {
        RandomAccessFile randomAccessFile = new RandomAccessFile("1.txt", "rw");
        FileChannel fileChannel = randomAccessFile.getChannel();
        /**
         * 参数 1: FileChannel.MapMode.READ_WRITE 使用的读写模式
         * 参数 2： 0 ： 可以直接修改的起始位置
         * 参数 3: 5: 是映射到内存的大小(不是索引位置) ,即将 1.txt 的多少个字节映射到内存
         * 可以直接修改的范围就是 0-5
         * 实际类型 DirectByteBuffer
         */
        MappedByteBuffer mappedByteBuffer = fileChannel.map(FileChannel.MapMode.READ_WRITE, 0, 5);
        mappedByteBuffer.put(0, (byte) 'H');
        mappedByteBuffer.put(3, (byte) '9');
        // 抛出 IndexOutOfBoundsException
        mappedByteBuffer.put(5, (byte) 'Y');

        randomAccessFile.close();
        fileChannel.close();
        // 在文件管理器打开查看，IDEA没有刷新
        System.out.println("修改成功！");
    }
}
```





- 前面的读写操作，都是通过一个 Buffer 完成的，NIO 还支持 通过多个 Buffer (即 Buffer 数组) 完成读写操作，即 `Scattering` 和 `Gathering`



```java
public class ScatteringAndGatheringTest {

    /**
     * Scattering：将数据写入到 buffer 时，可以采用 buffer 数组，依次写入 [分散]
     * Gathering: 从 buffer 读取数据时，可以采用 buffer 数组，依次读
     * @param args
     */
    public static void main(String[] args) throws IOException {
        // 使用 ServerSocketChannel SocketChannel
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        InetSocketAddress inetSocketAddress = new InetSocketAddress(7000);
        // socket绑定端口7000
        serverSocketChannel.socket().bind(inetSocketAddress);

        // 创建buffer数组
        ByteBuffer[] byteBuffers = new ByteBuffer[2];
        byteBuffers[0] = ByteBuffer.allocate(5);
        byteBuffers[1] = ByteBuffer.allocate(3);

        // 等待客户端连接
        SocketChannel socketChannel = serverSocketChannel.accept();
        int msgLen = 8;
        // 循环读取
        while(true){
            int byteRead = 0;
            while(byteRead < msgLen){
                // 读到buffer
                long i = socketChannel.read(byteBuffers);
                // 统计累积读取字节数
                byteRead += i;
                System.out.println("byteRead = " + byteRead);
                // 使用流打印 buffer的position和limit
                Arrays.stream(byteBuffers).map(buffer->
                        "position="+buffer.position()+" limit="+buffer.limit())
                        .forEach(System.out::println);
            }
            // 将buffer数据进行flip
            Arrays.asList(byteBuffers).forEach(ByteBuffer::flip);

            // 将数据回显到客户端
            long byteWrite = 0;
            while(byteWrite < msgLen){
                long i = socketChannel.write(byteBuffers);
                byteWrite += i;
            }

            // 将所有buffer clear
            Arrays.asList(byteBuffers).forEach(ByteBuffer::clear);

            System.out.println("byteRead = " + byteRead + " byteWrite = " +
                    byteWrite + " msgLen = " + msgLen);
        }
    }
}
```





## 7、选择器 Selector





### 基本介绍

1) Java 的 NIO，用非阻塞的 IO 方式。可以用一个线程，处理多个的客户端连接，就会使用到 Selector(选择器)
2) Selector 能够检测多个注册的通道上是否有事件发生(注意：多个 Channel 以事件的方式可以注册到同一个Selector)，如果有事件发生，便获取事件然后针对每个事件进行相应的处理。这样就可以只用一个单线程去管理多个通道，也就是管理多个连接和请求。
3) 只有在 连接/通道 真正有读写事件发生时，才会进行读写，就大大地减少了系统开销，并且不必为每个连接都创建一个线程，不用去维护多个线程
4) 避免了多线程之间的上下文切换导致的开销





### Selector示意图



1) Netty 的 IO 线程 NioEventLoop 聚合了 Selector(选择器，也叫多路复用器)，可以同时并发处理成百上千个客户端连接。
2) 当线程从某客户端 Socket 通道进行读写数据时，若没有数据可用时，该线程可以进行其他任务。
3) 线程通常将非阻塞 IO 的空闲时间用于在其他通道上执行 IO 操作，所以单独的线程可以管理多个输入和输出通道。
4) 由于读写操作都是非阻塞的，这就可以充分提升 IO 线程的运行效率，避免由于频繁 I/O 阻塞导致的线程挂起。
5) 一个 I/O 线程可以并发处理 N 个客户端连接和读写操作，这从根本上解决了传统同步阻塞 I/O 一连接一线程模型，架构的性能、弹性伸缩能力和可靠性都得到了极大的提升。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@09ea3d095ce85cf7ac8a0d83f5611cba99684b1e/2021/11/01/7c1525a53f949603587d8ccd436b2be4.png)







### Selector 类相关方法



**Selector 类是一个抽象类, 常用方法和说明如下：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a4e2e15295d408b6a62408414d3eeb7a815eb7b4/2021/11/01/4c5673686ee98194df35b78897759d05.png)





### 注意事项





- NIO 中的 ServerSocketChannel 功能类似 ServerSocket，SocketChannel 功能类似 Socket
- selector 相关方法说明
  - selector.select()：阻塞
  - selector.select(1000)：阻塞 1000 毫秒，在 1000 毫秒后返回
  - selector.wakeup()：唤醒 selector
  - selector.selectNow()：不阻塞，立马返还







## 8、NIO 非阻塞网络编程





### 原理分析图



NIO 非阻塞 网络编程相关的(Selector、SelectionKey、ServerScoketChannel 和 SocketChannel) 关系梳理图：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5f7087c33cffaf9693fc9a1ce1fa045f38731858/2021/11/01/5ab85f05ff675f6cb1f771aebf818483.png)







**简单说明：**

1) 当客户端连接时，会通过 ServerSocketChannel 得到 SocketChannel

2) Selector 进行监听 select 方法, 返回有事件发生的通道的个数.

3) 将 socketChannel 注册到 Selector 上, register(Selector sel, int ops), 一个 selector 上可以注册多个 SocketChannel
4) 注册后返回一个 SelectionKey, 会和该 Selector 关联(集合)
5) 进一步得到各个 SelectionKey (有事件发生)
6) 在通过 SelectionKey 反向获取 SocketChannel , 方法 channel()
7) 可以通过得到的 channel , 完成业务处理





### 案例实现



编写一个 NIO 入门案例，实现服务器端和客户端之间的数据简单通讯（非阻塞）



注释属实详细，可以参考！



**Server端：**



**注意：ServerSocketChannel和SocketChannel都要设置为非阻塞模式！**



```java
/**
 * SelectionKey.OP_READ：读就绪事件。表示通道中已经有了可读的数据:可以执行读操作了(通道目前有数据。可以进行读操作了）
 * SelectionKey.OP_WRITE：写就绪事件。表示已经可以向通道写数据了(通道目前可以用于写操作)
 *
 * 注册两次Channel:
 *  1. ServerSocketChannel：服务器端与Selector的关联，用于监听客户端的连接请求accept()
 *  2. SocketChannel：客户端与Selector的关联，Selector用于监听客户端的accept、read、write等请求
 *
 *  selector.keys(): 返回此选择器的键集。（所有key）
 *  selector.selectedKeys: 返回此选择器的选定键集。（有事件发生的key）
 *
 * @author ITNXD
 * @create 2021-10-26 19:12
 */
public class NIOServer {

    // 一个selector多个channel
    public static void main(String[] args) throws IOException {

        // 创建ServerSocketChannel
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        // 创建Selector
        Selector selector = Selector.open();

        // 绑定端口6666,在服务器端监听
        serverSocketChannel.socket().bind(new InetSocketAddress(6666));
        // 1. 设置为非阻塞
        serverSocketChannel.configureBlocking(false);

        // 服务端与Selector之间的ServerSocketChannel也要注册到Selector（类似Socket的accept进行监听）
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

        // 得到selector上注册的key数量（所有key）
        System.out.println("注册后selectionKey的数量：" + selector.keys().size());

        // 循环等待客户端连接
        while(true){
            // 为0说明当前没有任何事件在serverSocketChannel上发生
            if(selector.select(1000) == 0){
                System.out.println("服务器等待了一秒，无连接....");
                continue;
            }
            // 否则说明有事件监听，获取到有事件发生的集合 通过SelectionKey关联 channel 和 selector
            Set<SelectionKey> selectionKeys = selector.selectedKeys();

            // 获取所有有事件发生的selectionKey
            System.out.println("有事件发生的selectionKey数量为：" + selectionKeys.size());

            // 遍历selectionKeys
            // selectionKeys.forEach(System.out::println);
            for (SelectionKey selectionKey : selectionKeys) {
                // 根据key的不同事件类型进行分别操作
                // accept事件：有客户端连接，获取到连接的socketChannel注册到Selector等待操作
                if(selectionKey.isAcceptable()){
                    // 生成一个客户端的socketChannel，连接事件与其他事件不同，直接通过serverSocketChannel获取socketChannel
                    // accept方法是阻塞的，但是这里是确定了有客户端连接才accept，因此是非阻塞的
                    SocketChannel socketChannel = serverSocketChannel.accept();

                    System.out.println("客户端连接成功，生成了一个socketChannel "
                            + socketChannel.hashCode());

                    // 2. 将SocketChannel设置为非阻塞模式
                    socketChannel.configureBlocking(false);

                    // 将SocketChannel注册到selector上，同时关联一个Buffer（用于记录连接信息）
                    socketChannel.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));

                    // 客户端连接一个，总数量key +1
                    System.out.println("客户端连接后，注册的selectionKey的数量：" + selector.keys().size());
                }
                if(selectionKey.isReadable()){ // read事件：客户端的read事件
                    // 通过selectionKey反向获取到对应的客户端Channel，向下转型为SocketChannel
                    SocketChannel socketChannel = (SocketChannel) selectionKey.channel();

                    // 可以通过interestOps设置为写事件
                    // selectionKey.interestOps(SelectionKey.OP_WRITE);

                    // 获取到 channel关联的buffer
                    ByteBuffer byteBuffer = (ByteBuffer) selectionKey.attachment();
                    // 通过 channel 将数据读到 buffer
                    socketChannel.read(byteBuffer);
                    System.out.println("from 客户端 " + new String(byteBuffer.array()));
                }
                // 手动从集合中移动当前的 selectionKey, 防止重复操作
                selectionKeys.remove(selectionKey);
            }
        }

    }
}
```



**Client端：**



```java
public class NIOClient {

    public static void main(String[] args) throws IOException {

        // 获取客户端与Selector之间的SocketChannel
        SocketChannel socketChannel = SocketChannel.open();
        // 设置非阻塞
        socketChannel.configureBlocking(false);
        // 提供服务器端ip和端口
        InetSocketAddress inetSocketAddress = new InetSocketAddress("127.0.0.1", 6666);

        /*
         连接服务器 不会发生阻塞

         如果此通道处于非阻塞模式，则调用此方法将启动非阻塞连接操作。
         如果立即建立连接（本地连接可能发生这种情况），则此方法返回 true。
         否则，此方法返回 false，并且稍后必须通过调用 finishConnect 方法来完成连接操作。
         如果此通道处于阻塞模式，则此方法的调用将阻塞，直到建立连接或发生 I/O 错误。

         简而言之：立即连接成功返回true，否则返回false，直到finishConnect返回true!

         */
        if(!socketChannel.connect(inetSocketAddress)){
            // 未完成连接
            while(!socketChannel.finishConnect()){
                System.out.println("因连接需要时间，客户端不会阻塞，可以做其他工作...");
            }
        }

        // 连接成功，发送数据
        String str = "hello, 世界！";
        // 通过字符串大小自动指定buffer，自动完成创建buffer
        ByteBuffer byteBuffer = ByteBuffer.wrap(str.getBytes());
        // 发送数据，将buffer数据写到channel
        socketChannel.write(byteBuffer);

        // 阻塞
        System.in.read();
    }
}
```





## 9、几大组件介绍





### SelectionKey





**SelectionKey，表示 Selector 和网络通道的注册关系, 共四种：**



- int OP_ACCEPT：有新的网络连接可以 accept，值为 16
- int OP_CONNECT：代表连接已经建立，值为 8
- int OP_READ：代表读操作，值为 1
- int OP_WRITE：代表写操作，值为 4



```java
public static final int OP_READ = 1 << 0;
public static final int OP_WRITE = 1 << 2;
public static final int OP_CONNECT = 1 << 3;
public static final int OP_ACCEPT = 1 << 4;
```



**SelectionKey 相关方法：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2aa3f948c99353084ef01cf8fef028907514772e/2021/11/01/6472933473279fa62e491cbb7a6c3ab6.png)



### ServerSocketChannel



ServerSocketChannel 在服务器端监听新的客户端 Socket 连接：

**相关方法如下：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@0ae8ff7f6eaf01e2e9a90aa52ac8844e5b047626/2021/11/01/37709676e8cc96a27db47b04c8315836.png)











### SocketChannel



SocketChannel，网络 IO 通道，具体负责进行读写操作。NIO 把缓冲区的数据写入通道，或者把通道里的数据读到缓冲区。



**相关方法如下：**





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4cc989510bbf8a7886111db008dd150a2fc1c155/2021/11/01/2fef4113ca684419fc1e24d2c709cf0d.png)





## 10、NIO实现群聊系统





### 实例要求



1) 编写一个 NIO 群聊系统，实现服务器端和客户端之间的数据简单通讯（非阻塞）
2) 实现多人群聊
3) 服务器端：可以监测用户上线，离线，并实现消息转发功能
4) 客户端：通过 channel 可以无阻塞发送消息给其它所有用户，同时可以接受其它用户发送的消息(有服务器转发得到)
6) 示意图分析和代码



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@95d954cd364b6a0e9d5d865432c51c5c81351805/2021/11/01/0354086eb4eaebfa8df32c11ccba6549.png)







### 服务器端



```java
/**
 * 群聊系统服务器端！
 *
 * 处理是单线程的，只有一个main线程！
 * @author ITNXD
 * @create 2021-10-27 14:31
 */
public class GroupChatServer {

    private Selector selector;
    private ServerSocketChannel listenChannel;
    private static final int PORT = 6667;

    /**
     * 构造器初始化工作！
     */
    public GroupChatServer() {
        try {
            // 1. 得到selector
            selector = Selector.open();
            // 2. 得到ServerSocketChannel
            listenChannel = ServerSocketChannel.open();
            // 3. 绑定端口
            listenChannel.socket().bind(new InetSocketAddress(PORT));
            // 4. 设置为非阻塞模式
            listenChannel.configureBlocking(false);
            // 5. 将ServerSocketChannel注册到Selector
            listenChannel.register(selector, SelectionKey.OP_ACCEPT);
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    /**
     * 服务器监听方法！
     */
    public void listen(){
        System.out.println("监听线程：" + Thread.currentThread().getName());

        try {
            // 循环处理
            while(true){
                // int count = selector.select(2000);
                // 直接取消超时属性，没有连接阻塞即可
                System.out.println("服务器端等待客户端连接...");
                // select方法不添加超时属性，则会在读不到通道事件发生时一致阻塞！
                selector.select();
                // 遍历selectionKeys
                Set<SelectionKey> selectionKeys = selector.selectedKeys();
                for (SelectionKey selectionKey : selectionKeys) {
                    // 处理连接事件
                    if(selectionKey.isAcceptable()){
                        // 获取到socketChannel
                        SocketChannel socketChannel = listenChannel.accept();
                        // 设置为非阻塞模式
                        socketChannel.configureBlocking(false);
                        // 注册到selector
                        socketChannel.register(selector, SelectionKey.OP_READ);

                        // 给出提示，xxx上线了！substring(1)去掉地址前的斜杠
                        System.out.println(socketChannel.getRemoteAddress().toString().substring(1) + "上线了...");
                    }
                    // 处理可读事件
                    if(selectionKey.isReadable()){
                        readData(selectionKey);
                    }
                    // 移除当前key，防止重复处理
                    selectionKeys.remove(selectionKey);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 服务端读取客户端消息
     * @param key 传入有事件发生的SelectionKey
     */
    private void readData(SelectionKey key){
        SocketChannel socketChannel = null;
        try {
            // 得到SocketChannel和buffer
            socketChannel = (SocketChannel) key.channel();
            ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
            // 读取客户端消息到buffer
            int count = socketChannel.read(byteBuffer);
            if(count > 0){
                String msg = new String(byteBuffer.array());
                System.out.println("from 客户端：" + msg);

                // 向其他客户端(不包括自己)转发消息
                sendInfoToOtherClients(msg, socketChannel);
            }
        } catch (IOException e) {
            // 有异常，说明当前客户端已经离线
            try {
                System.out.println(socketChannel.getRemoteAddress().toString().substring(1) + "离线了...");
                // 离线则取消注册并关闭通道
                key.channel();
                socketChannel.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    /**
     * 转发消息给其他客户端
     * @param msg 转发的消息
     * @param selfChannel 需要排除的自己本身
     */
    private void sendInfoToOtherClients(String msg, SocketChannel selfChannel) throws IOException {
        System.out.println("服务器转发消息中...");
        System.out.println("转发线程：" + Thread.currentThread().getName());

        // 遍历所有注册到Selector的key并排除自己
        for (SelectionKey selectionKey : selector.keys()) {
            Channel channel = selectionKey.channel();
            // 排除自己
            if(channel instanceof SocketChannel && channel != selfChannel){
                SocketChannel socketChannel = (SocketChannel) channel;
                // 将消息存到buffer
                ByteBuffer byteBuffer = ByteBuffer.wrap(msg.getBytes());
                // 将buffer数据写到channel
                socketChannel.write(byteBuffer);
            }
        }
    }

    // 服务器端逻辑
    public static void main(String[] args) {

        GroupChatServer chatServer = new GroupChatServer();
        // 监听
        chatServer.listen();
    }
}
```





### 客户端



```java
/**
 * 群聊系统客户端！
 *
 * 客户端也需要一个selector 用来处理服务器端转发来的消息！
 *
 * @author ITNXD
 * @create 2021-10-27 15:35
 */
public class GroupChatClient {

    private final String HOST = "127.0.0.1";
    private final int PORT = 6667;
    private Selector selector;
    private SocketChannel socketChannel;
    private String username;

    /**
     * 构造器中进行初始化！
     */
    public GroupChatClient() {
        try {
            selector = Selector.open();
            // 连接服务器
            socketChannel = SocketChannel.open(new InetSocketAddress(HOST, PORT));
            // 设置为非阻塞模式
            socketChannel.configureBlocking(false);
            // 注册到selector
            socketChannel.register(selector, SelectionKey.OP_READ);
            // /127.0.0.1:4082 去掉第一个斜杠
            username = socketChannel.getLocalAddress().toString().substring(1);
            System.out.println(username + " 客户端准备好了....");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送消息到服务器端！
     *
     * @param info 发送的消息
     */
    public void sendInfo(String info) {
        info = username + " 说：" + info;

        try {
            socketChannel.write(ByteBuffer.wrap(info.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 读取从服务器端发出的消息！
     */
    public void readInfo() {
        try {
            // select方法不添加超时属性，则会在读不到通道事件发生时一致阻塞！
            selector.select();
            Set<SelectionKey> selectionKeys = selector.selectedKeys();
            for (SelectionKey selectionKey : selectionKeys) {
                if (selectionKey.isReadable()) {
                    SocketChannel channel = (SocketChannel) selectionKey.channel();
                    ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
                    // 获取到服务器发来消息
                    channel.read(byteBuffer);
                    String msg = new String(byteBuffer.array());
                    // 去掉消息首尾空格
                    System.out.println(msg.trim());
                }
                // 溢出当前selectionKey，防止重复操作
                selectionKeys.remove(selectionKey);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 两个线程，一个读的线程（new Thread），一个写的线程（main主线程）
     * 注意：一定得是两个线程，读的线程在读不到的时候会阻塞，写的操作就无法完成！
     *
     * @param args
     */
    public static void main(String[] args) {

        // 启动客户端
        GroupChatClient chatClient = new GroupChatClient();

        // 客户端读取服务器端发送的消息，若读取数据不启动新的线程
        new Thread(() -> {
            while (true) {
                chatClient.readInfo();
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        // 客户端发送消息给客户端
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String msg = scanner.nextLine();
            chatClient.sendInfo(msg);
        }
    }
}
```



## 11、NIO 与零拷贝



###  零拷贝基本介绍



1) 零拷贝是网络编程的关键，很多性能优化都离不开。
2) 在 Java 程序中，常用的零拷贝有 **mmap(内存映射) 和 sendFile**。那么，他们在 OS 里，到底是怎么样的一个的设计？我们分析 mmap 和 sendFile 这两个零拷贝
3) 另外我们看下 NIO 中如何使用零拷贝



### 传统 IO 模型



**DMA: direct memory access 直接内存拷贝(不使用 CPU)**

**传统io：四次拷贝，三次切换（用户态和内核态）**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@633168d7e88310efab160398cff0b1826eeeb9a6/2021/11/01/d7309b13e0381891ae723363c75eb2f6.png)





### mmap 优化





mmap 通过内存映射，将文件映射到内核缓冲区，同时，用户空间可以共享内核空间的数据。这样，在进行网络传输时，就可以减少内核空间到用户空间的拷贝次数。



**mmap：三次拷贝，四次切换**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2ba096b799bada5ac3f062e6b26cabd55abe8dbf/2021/11/01/b942f876a7a9fc388ee966350ed7f10a.png)





### sendFile 优化



Linux 2.1 版本 提供了 sendFile 函数，其基本原理如下：数据根本不经过用户态，直接从内核缓冲区进入到Socket Buffer，同时，由于和用户态完全无关，就减少了一次上下文切换。

**sendfile linux2.1：三次拷贝，两次切换**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@831bdff8cabf0c3bbabde49cd7a48a8ebb6c5677/2021/11/01/b1eca553a2c7639b4befcd02ac29ee64.png)



**提示：零拷贝从操作系统角度，是没有 cpu 拷贝**



Linux 在 2.4 版本中，做了一些修改，避免了从内核缓冲区拷贝到 Socket buffer 的操作，直接拷贝到协议栈，从而再一次减少了数据拷贝。

这里其实有 一次 cpu 拷贝 kernel buffer -> socket buffer ，但是，拷贝的信息很少，比如 lenght , offset , 消耗低，可以忽略！

**sendfile linux2.4：两次拷贝，两次切换**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@00280216cf5d9fd525821c0e37016414b5a57cac/2021/11/01/a447e15e78bd38f77a1acce122c7349a.png)



### 零拷贝的再次理解



1) 我们说零拷贝，是从操作系统的角度来说的。因为内核缓冲区之间，没有数据是重复的（只有 kernel buffer 有一份数据）。
2) 零拷贝不仅仅带来更少的数据复制，还能带来其他的性能优势，例如更少的上下文切换，更少的 CPU 缓存伪共享以及无 CPU 校验和计算。



### mmap 和 sendFile 的区别

1) **mmap 适合小数据量读写，sendFile 适合大文件传输。**
2) mmap 需要 4 次上下文切换，3 次数据拷贝；sendFile 需要 2 次上下文切换，最少 2 次数据拷贝。
3) sendFile 可以利用 DMA 方式，减少 CPU 拷贝，mmap 则不能（必须从内核拷贝到 Socket 缓冲区）。





### NIO 零拷贝案例



1. 使用传统的 IO 方法传递一个大文件
2. 使用 NIO 零拷贝方式传递(transferTo)一个大文件
3. 看看两种传递方式耗时时间分别是多少



#### Old



**OldIOServer**



```java
public class OldIOServer {

    public static void main(String[] args) throws Exception {
        ServerSocket serverSocket = new ServerSocket(7001);

        while (true) {
            Socket socket = serverSocket.accept();
            DataInputStream dataInputStream = new DataInputStream(socket.getInputStream());

            try {
                byte[] byteArray = new byte[4096];

                while (true) {
                    int readCount = dataInputStream.read(byteArray, 0, byteArray.length);

                    if (-1 == readCount) {
                        break;
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}
```



**OldIOClient**



```java
// 发送总字节数： 1007473, 耗时： 21
public class OldIOClient {

    public static void main(String[] args) throws Exception {
        Socket socket = new Socket("localhost", 7001);

        String fileName = "E:\\test.zip";
        InputStream inputStream = new FileInputStream(fileName);

        DataOutputStream dataOutputStream = new DataOutputStream(socket.getOutputStream());

        byte[] buffer = new byte[4096];
        long readCount;
        long total = 0;

        long startTime = System.currentTimeMillis();

        while ((readCount = inputStream.read(buffer)) >= 0) {
            total += readCount;
            dataOutputStream.write(buffer);
        }

        System.out.println("发送总字节数： " + total + ", 耗时： " + (System.currentTimeMillis() - startTime));

        dataOutputStream.close();
        socket.close();
        inputStream.close();
    }
}
```



#### New

**NewIOServer**



```java
public class NewIOServer {

    public static void main(String[] args) throws IOException {

        InetSocketAddress address = new InetSocketAddress(7001);

        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();

        ServerSocket socket = serverSocketChannel.socket();
        socket.bind(address);

        ByteBuffer byteBuffer = ByteBuffer.allocate(4096);

        while(true){
            // accept阻塞
            SocketChannel socketChannel = serverSocketChannel.accept();

            int count = 0;
            while(count != -1){
                try {
                    count = socketChannel.read(byteBuffer);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                /*
                倒带
                public Buffer rewind() {
                    position = 0;
                    mark = -1;
                    return this;
                }
                 */
                byteBuffer.rewind();
            }
        }
    }
}
```



**NewIOClient**

```java
public class NewIOClient {

    //  发 送 的 总 的 字 节 数 =1007473 耗 时 :5
    public static void main(String[] args) throws IOException {
        SocketChannel socketChannel = SocketChannel.open();

        socketChannel.connect(new InetSocketAddress("localhost", 7001));

        String fileName = "E:\\test.zip";

        FileChannel fileChannel = new FileInputStream(fileName).getChannel();

        // 记录时间
        long start = System.currentTimeMillis();

        // 在 linux 下一个 transferTo 方法就可以完成传输
        // 在 windows 下 一次调用 transferTo 只能发送 8m , 就需要分段传输文件, 而且要主要
        // 传输时的位置 =》 课后思考...
        // transferTo 底层使用到零拷贝
        long transferCount = fileChannel.transferTo(0, fileChannel.size(), socketChannel);

        System.out.println(" 发 送 的 总 的 字 节 数 =" + transferCount + " 耗 时 :" + (System.currentTimeMillis() - start));
        //关闭
        fileChannel.close();
    }
}
```





#### 结果



- old：21ms
- new：5ms





## 12、AIO 基本介绍





1) JDK 7 引入了 Asynchronous I/O，即 AIO。在进行 I/O 编程中，常用到两种模式：Reactor 和 Proactor。Java 的NIO 就是 Reactor，当有事件触发时，服务器端得到通知，进行相应的处理
2) AIO 即 NIO2.0，叫做异步不阻塞的 IO。AIO 引入异步通道的概念，采用了 Proactor 模式，简化了程序编写，有效的请求才启动线程，它的特点是先由操作系统完成后才通知服务端程序启动线程去处理，一般适用于连接数较多且连接时间较长的应用
3) 目前 AIO 还没有广泛应用，Netty 也是基于 NIO, 而不是 AIO， 因此我们就不详解 AIO 了，可以参考 [Java 新 一 代 网 络 编 程 模 型 AIO 原 理 及 Linux 系 统 AIO 介绍](http://www.52im.net/thread-306-1-1.html)





## 13、BIO、NIO、AIO 对比表



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f74d4d34d3ffb0eb10516e7984647beeefbfb869/2021/11/01/388c7b3ded2b5cf3c558468d93418c4f.png)









# 三、Netty概述



## 1、Netty 介绍



1) Netty 是由 JBOSS 提供的一个 Java 开源框架，现为 Github 上的独立项目。
2) Netty 是一个**异步的、基于事件驱动**的网络应用框架，用以快速开发高性能、高可靠性的网络 IO 程序。
3) Netty 主要针对在 TCP 协议下，面向 Clients 端的高并发应用，或者 Peer-to-Peer 场景下的大量数据持续传输的应用。
4) Netty 本质是一个 NIO 框架，适用于服务器通讯相关的多种应用场景



## 2、Netty 应用场景



### 互联网行业

1) 互联网行业：在分布式系统中，各个节点之间需要远程服务调用，高性能的 RPC 框架必不可少，Netty 作为异步高性能的通信框架，往往作为基础通信组件被这些 RPC 框架使用。
2) 典型的应用有：阿里分布式服务框架 Dubbo 的 RPC 框架使用 Dubbo 协议进行节点间通信，Dubbo 协议默认使用 Netty 作为基础通信组件，用于实现各进程节点之间的内部通信

### 游戏行业

1) 无论是手游服务端还是大型的网络游戏，Java 语言得到了越来越广泛的应用
2) Netty 作为高性能的基础通信组件，提供了 TCP/UDP 和 HTTP 协议栈，方便定制和开发私有协议栈，账号登录服务器
3) 地图服务器之间可以方便的通过 Netty 进行高性能的通信



### 大数据领域

1) 经典的 Hadoop 的高性能通信和序列化组件 Avro 的 RPC 框架，默认采用 Netty 进行跨界点通信
2) 它的 Netty Service 基于 Netty 框架二次封装实现。



## 3、原生 NIO 存在的问题



1) NIO 的类库和 API 繁杂，使用麻烦：需要熟练掌握 Selector、ServerSocketChannel、SocketChannel、ByteBuffer等。
2) 需要具备其他的额外技能：要熟悉 Java 多线程编程，因为 NIO 编程涉及到 Reactor 模式，你必须对多线程和网络编程非常熟悉，才能编写出高质量的 NIO 程序。
3) 开发工作量和难度都非常大：例如客户端面临断连重连、网络闪断、半包读写、失败缓存、网络拥塞和异常流的处理等等。
4) JDK NIO 的 Bug：例如臭名昭著的 **Epoll Bug**，它会导致 Selector 空轮询，最终导致 CPU 100%。直到 JDK 1.7版本该问题仍旧存在，没有被根本解决。



## 4、Netty 的优点



Netty 对 JDK 自带的 NIO 的 API 进行了封装，解决了上述问题。

1) 设计优雅：适用于各种传输类型的统一 API 阻塞和非阻塞 Socket；基于灵活且可扩展的事件模型，可以清晰地分离关注点；高度可定制的线程模型 - 单线程，一个或多个线程池. 2) 使用方便：详细记录的 Javadoc，用户指南和示例；没有其他依赖项，JDK 5（Netty 3.x）或 6（Netty 4.x）就足够了。
3) 高性能、吞吐量更高：延迟更低；减少资源消耗；最小化不必要的内存复制。
4) 安全：完整的 SSL/TLS 和 StartTLS 支持。
4) 社区活跃、不断更新：社区活跃，版本迭代周期短，发现的 Bug 可以被及时修复，同时，更多的新功能会被加入







## 5、Netty 版本说明





1) netty 版本分为 netty3.x 和 netty4.x、netty5.x
2) 因为 Netty5 出现重大 bug，已经被官网废弃了，目前推荐使用的是 Netty4.x 的稳定版本
3) 目前在官网可下载的版本 netty3.x netty4.0.x 和 netty4.1.x
4) 我们使用 Netty4.1.x 版本
5) netty 下载地址： [https://bintray.com/netty/downloads/netty/](https://bintray.com/netty/downloads/netty/)









# 四、Netty 高性能架构设计





## 1、线程模型基本介绍



1) 不同的线程模式，对程序的性能有很大影响，为了搞清 Netty 线程模式，我们来系统的讲解下 各个线程模式，最后看看 Netty 线程模型有什么优越性. 
2) 目前存在的线程模型有：
  1) 传统阻塞 I/O 服务模型
  2) Reactor 模式
3) 根据 Reactor 的数量和处理资源池线程的数量不同，有 3 种典型的实现：
  1) 单 Reactor 单线程；
  2) 单 Reactor 多线程；
  3) **主从 Reactor 多线程**
4) Netty 线程模式(Netty 主要基于主从 Reactor 多线程模型做了一定的改进，其中主从 Reactor 多线程模型有多个 Reactor)





## 2、传统阻塞 I/O 服务模型



### 工作原理图

1) 黄色的框表示对象， 蓝色的框表示线程
2) 白色的框表示方法(API)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@65329d57f408696f94eaabd3bbdd13b60a98820f/2021/11/01/b555657d6182d01a24c72d485706eaee.png)





### 模型特点

1) 采用阻塞 IO 模式获取输入的数据
2) 每个连接都需要独立的线程完成数据的输入，业务处理, 数据返回





### 问题分析

1) 当并发数很大，就会创建大量的线程，占用很大系统资源
2) 连接创建后，如果当前线程暂时没有数据可读，该线程会阻塞在 read 操作，造成线程资源浪费





## 3、Reactor 模式







**针对传统阻塞 I/O 服务模型的 2 个缺点，解决方案：**



1) **基于 I/O 复用模型**：多个连接共用一个阻塞对象，应用程序只需要在一个阻塞对象等待，无需阻塞等待所有连接。当某个连接有新的数据可以处理时，操作系统通知应用程序，线程从阻塞状态返回，开始进行业务处理。Reactor 对应的叫法: 1. 反应器模式 2. 分发者模式(Dispatcher) 3. 通知者模式(notifier)
2) **基于线程池复用线程资源**：不必再为每个连接创建线程，将连接完成后的业务处理任务分配给线程进行处理，一个线程可以处理多个连接的业务。





**I/O 复用结合线程池，就是 Reactor 模式基本设计思想：**



1) Reactor 模式，通过一个或多个输入同时传递给服务处理器的模式(**基于事件驱动**)
2) 服务器端程序处理传入的多个请求,并将它们同步分派到相应的处理线程， 因此 Reactor 模式也叫 Dispatcher模式
3) Reactor 模式使用 IO 复用监听事件, 收到事件后，分发给某个线程(进程), 这点就是网络服务器高并发处理关键



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4f9372fda6f1da899af2f8d1e921fa48950c6bba/2021/11/01/5af093743efec5b2a030e28f6013354d.png)





**Reactor 模式核心组成：**

1) **Reactor**：Reactor 在一个单独的线程中运行，**负责监听和分发事件**，分发给适当的处理程序来对 IO 事件做出反应。 它就像公司的电话接线员，它接听来自客户的电话并将线路转移到适当的联系人；
2) **Handlers**：处理程序执行 I/O 事件要完成的实际事件，类似于客户想要与之交谈的公司中的实际官员。Reactor通过调度适当的处理程序来响应 I/O 事件，处理程序执行非阻塞操作。



**Reactor 模式分类：**

根据 Reactor 的数量和处理资源池线程的数量不同，有 3 种典型的实现：

1) 单 Reactor 单线程
2) 单 Reactor 多线程
3) **主从 Reactor 多线程**







## 4、单 Reactor 单线程



### 工作原理图

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@3209f181c320fbe2bc4e52d7291af19aa252c2a3/2021/11/01/282c3b2196244bb4478f7fdb132dac75.png)





### 简单说明

1) Select 是前面 I/O 复用模型介绍的标准网络编程 API，可以实现应用程序通过一个阻塞对象监听多路连接请求
2) Reactor 对象通过 Select 监控客户端请求事件，收到事件后通过 Dispatch 进行分发
3) 如果是建立连接请求事件，则由 Acceptor 通过 Accept 处理连接请求，然后创建一个 Handler 对象处理连接完成后的后续业务处理
4) 如果不是建立连接事件，则 Reactor 会分发调用连接对应的 Handler 来响应
5) Handler 会完成 Read→业务处理→Send 的完整业务流程



### 方案优缺点分析

1) **优点**：模型简单，没有多线程、进程通信、竞争的问题，全部都在一个线程中完成
2) **缺点**：性能问题，只有一个线程，无法完全发挥多核 CPU 的性能。Handler 在处理某个连接上的业务时，整个进程无法处理其他连接事件，很容易导致性能瓶颈
3) **缺点**：可靠性问题，线程意外终止，或者进入死循环，会导致整个系统通信模块不可用，不能接收和处理外部消息，造成节点故障
4) 使用场景：客户端的数量有限，业务处理非常快速，比如 **Redis** 在业务处理的时间复杂度 O(1) 的情况







## 5、单 Reactor 多线程







### 工作原理图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@bf43e13f2f3042df6864500c145cd8650c2bdde3/2021/11/01/a35c5f36aa50f14ef83487043737448f.png)



### 简单说明



1. Reactor 对象通过 select 监控客户端请求事件, 收到事件后，通过 dispatch 进行分发
2. 如果建立连接请求, 则右 Acceptor 通过accept 处理连接请求, 然后创建一个 Handler 对象处理完成连接后的各种事件
3. 如果不是连接请求，则由 reactor 分发调用连接对应的 handler 来处理
4. handler 只负责响应事件，不做具体的业务处理, 通过 read 读取数据后，会分发给后面的 worker 线程池的某个线程处理业务
5. worker 线程池会分配独立线程完成真正的业务，并将结果返回给 handler
6. handler 收到响应后，通过 send 将结果返回给 client





### 方案优缺点分析



1) **优点**：可以充分的利用多核 cpu 的处理能力
2) **缺点**：多线程数据共享和访问比较复杂， reactor 处理所有的事件的监听和响应，在单线程运行， 在高并发场景容易出现性能瓶颈.





## 6、主从 Reactor 多线程



### 工作原理图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c4eed51c6d7c1143c5988159e9171a3957d04686/2021/11/01/423584d652205c806af1512d1db8fb8a.png)





### 简单说明



1) Reactor 主线程 MainReactor 对象通过 select 监听连接事件, 收到事件后，通过 Acceptor 处理连接事件
2) 当 Acceptor 处理连接事件后，MainReactor 将连接分配给 SubReactor
3) subreactor 将连接加入到连接队列进行监听,并创建 handler 进行各种事件处理
4) 当有新事件发生时， subreactor 就会调用对应的 handler 处理
5) handler 通过 read 读取数据，分发给后面的 worker 线程处理
6) worker 线程池分配独立的 worker 线程进行业务处理，并返回结果
7) handler 收到响应的结果后，再通过 send 将结果返回给 client
8) Reactor 主线程可以对应多个 Reactor 子线程, 即 MainRecator 可以关联多个 SubReactor



### 方案优缺点分析

1) **优点**：父线程与子线程的数据交互简单职责明确，父线程只需要接收新连接，子线程完成后续的业务处理。
2) **优点**：父线程与子线程的数据交互简单，Reactor 主线程只需要把新连接传给子线程，子线程无需返回数据。
3) **缺点**：编程复杂度较高
4) 结合实例：这种模型在许多项目中广泛使用，包括 Nginx 主从 Reactor 多进程模型，Memcached 主从多线程，Netty 主从多线程模型的支持



### Reactor 模式小结



**用生活案例来理解：**

1) 单 Reactor 单线程，前台接待员和服务员是同一个人，全程为顾客服
2) 单 Reactor 多线程，1 个前台接待员，多个服务员，接待员只负责接待
3) 主从 Reactor 多线程，多个前台接待员，多个服务生



**Reactor 模式具有如下的优点：**

1) 响应快，不必为单个同步时间所阻塞，虽然 **Reactor 本身依然是同步的**
2) 可以最大程度的避免复杂的多线程及同步问题，并且避免了多线程/进程的**切换开销**
3) **扩展性好**，可以方便的通过增加 Reactor 实例个数来充分利用 CPU 资源
4) 复用性好，Reactor 模型本身与具体事件处理逻辑无关，具有很高的复用性





## 7、Netty 模型





### 简单版

Netty 主要基于主从 Reactors 多线程模型（如图）做了一定的改进，其中主从 Reactor 多线程模型有多个 Reactor！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@957016a95afd88b5f0885bf868a0c06f1824c4f4/2021/11/01/e65c0e66c4f66b80a438575678e9af0a.png)







**简单说明：**



1) BossGroup 线程维护 Selector , 只关注 Accecpt
2) 当接收到 Accept 事件，获取到对应的 SocketChannel, 封装成 NIOScoketChannel 并注册到 Worker 线程(事件循环), 并进行维护
3) 当 Worker 线程监听到 selector 中通道发生自己感兴趣的事件后，就进行处理(就由 handler)， 注意 handler 已经加入到通道





### 进阶版



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e396a1f8540672ee9a932c0eb79faccff4558b30/2021/11/01/f1dca1ed6258f5c80ac9c3e7fa7ff4be.png)







### 详细版





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@835064609a79d598acfd1354c69eb890ca19b53e/2021/11/01/65fc294793dbb494213b18bf361d9628.png)









**简单说明：**



1) Netty 抽象出两组线程池 BossGroup 专门负责接收客户端的连接, WorkerGroup 专门负责网络的读写
2) BossGroup 和 WorkerGroup 类型都是 NioEventLoopGroup
3) NioEventLoopGroup 相当于一个事件循环组, 这个组中含有多个事件循环 ，每一个事件循环是 NioEventLoop
4) NioEventLoop 表示一个不断循环的执行处理任务的线程， 每个 NioEventLoop 都有一个 selector , 用于监听绑定在其上的 socket 的网络通讯
5) NioEventLoopGroup 可以有多个线程, 即可以含有多个 NioEventLoop
6) 每个 Boss NioEventLoop 循环执行的步骤有 3 步
   1) 轮询 accept 事件
   2) 处理 accept 事件 , 与 client 建立连接 , 生成 NioScocketChannel , 并将其注册到某个 worker NIOEventLoop 上的 selector
   3) 处理任务队列的任务 ， 即 runAllTasks

7) 每个 Worker NIOEventLoop 循环执行的步骤
  1) 轮询 read, write 事件
  2) 处理 i/o 事件， 即 read , write 事件，在对应 NioScocketChannel 处理
  3) 处理任务队列的任务 ， 即 runAllTasks
8) 每个Worker NIOEventLoop 处理业务时，会使用pipeline(管道), pipeline 中包含了 channel , 即通过pipeline可以获取到对应通道, 管道中维护了很多的 处理器







### TCP服务案例



**实例要求：**

- Netty 服务器在 6668 端口监听，客户端能发送消息给服务器 "hello, 服务器~" 
- 服务器可以回复消息给客户端 "hello, 客户端~"





**导入netty的包：**



```xml
<!-- https://mvnrepository.com/artifact/io.netty/netty-all -->
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.1.20.Final</version>
</dependency>
```





#### NettyServer



```java
public class NettyServer {

    public static void main(String[] args) throws InterruptedException {

        /*
         1. 创建bossGroup workerGroup

         说明：
            - 创建两个线程组 bossGroup 和 workerGroup
            - bossGroup 只是处理连接请求 , 真正的和客户端业务处理，会交给 workerGroup 完成
            - 两个都是无限循环
            - bossGroup 和 workerGroup 含有的子线程(NioEventLoop)的个数
         默认实际 线程数 * 2
         */
        EventLoopGroup bossGroup = new NioEventLoopGroup(1); // Boss分配一个线程即可
        EventLoopGroup workerGroup = new NioEventLoopGroup(4);

        try {
            /*
             2. 创建服务端启动对象 ServerBootstrap 并使用链式编程设置参数
                 - 设置两个线程组
                 - 使用NioServerSocketChannel作为服务器Channel实现
                 - 设置线程队列的链接个数
                 - 设置保持活动连接状态
                 - 给我们的 workerGroup 的 EventLoop 对应的管道设置处理器
             */
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    // .handler 给boss设置的handler
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        // 给 pipeline 设置处理器
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            // 打印所有的客户端SocketChannel，可以使用集合管理所有channel,推送消息时将业
                            // 务加入对应的NIOEventLoop的taskQueue中或scheduleTaskQueue中！
                            System.out.println("客户socketChannel的hashCode：" + ch.hashCode());
                            // 添加自定义处理器
                            ch.pipeline().addLast(new NettyServerHandler());
                        }
                    });

            System.out.println(".....服务器已经准备好了.....");

            /*
             绑定一个端口并且同步, 生成了一个 ChannelFuture 对象
             3. 绑定端口并启动！
             */
            ChannelFuture cf = bootstrap.bind(6668).sync();

            // 为ChannelFuture注册一个监听器！
            cf.addListener( future -> {
                if(future.isSuccess()){
                    System.out.println("监听端口 6668 成功！");
                }else{
                    System.out.println("监听端口 6668 失败！");
                }
            });

            // 4. closeFuture 不是立马关闭通道（有关闭Channel事件才会去关闭）
            // sync：该核心操作在另一个线程异步执行，本线程同步阻塞等待future结果（main线程）
            cf.channel().closeFuture().sync();
        } finally {
            // 最终优雅关闭
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```





#### NettyServerHandler

```java
/**
 * 自定义的pipeline的处理器！
 * @author ITNXD
 * @create 2021-10-28 10:11
 */
public class NettyServerHandler extends ChannelInboundHandlerAdapter {

    /**
     * 服务器读取客户端数据！ (这里我们可以读取客户端发送的消息)
     * @param ctx 上下文对象, 含有管道 pipeline、通道 channel、地址
     * @param msg 就是客户端发送的数据 默认 Object
     * @throws Exception
     * 管道是真正处理业务的，通道是运送数据的！
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("服务器读取线程：" + Thread.currentThread().getName());
        System.out.println("server ctx：" + ctx);

        System.out.println("channel 和 pipeline 的关系：");
        Channel channel = ctx.channel();
        // pipeline 本质是一个双向链表
        ChannelPipeline pipeline = ctx.pipeline();


        // 将msg转成byteBuf（netty提供的，不是ByteBuffer）
        ByteBuf byteBuf = (ByteBuf) msg;
        System.out.println("客户端发送的信息是：" + byteBuf.toString(CharsetUtil.UTF_8));
        System.out.println("客户端地址：" + ctx.channel().remoteAddress());
    }

    /**
     * 服务器端读完消息后的业务处理！
     * 可以回传数据给客户端！
     * @param ctx 上下文对象，含有许多内容！
     * @throws Exception
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {

        // 将数据写到缓存并刷新（缓存再写到Channel）！
        ctx.writeAndFlush(Unpooled.copiedBuffer("hello，客户端！", CharsetUtil.UTF_8));
    }

    /**
     * 服务器端出现异常的处理！
     *
     * @param ctx 上下文对象
     * @param cause 异常信息
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // 出现异常则关闭通道！
        ctx.close();
    }
}
```





#### NettyClient





```java
public class NettyClient {

    public static void main(String[] args) throws InterruptedException {

        // 1. 客户端需要一个事件循环组
        EventLoopGroup group = new NioEventLoopGroup();

        try {
        /*
         2. 客户端创建启动对象Bootstrap并设置先关参数！
            设置线程组
            设置客户端通道的实现类(反射)
         */
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(group)
                    .channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            // 添加自定义处理器
                            ch.pipeline().addLast(new NettyClientHandler());
                        }
                    });

            System.out.println(".....客户端已经准备好了.....");

            // 3. 绑定服务器端
            ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 6668).sync();

            // 4. 为关闭通道进行监听
            channelFuture.channel().closeFuture().sync();
        } finally {
            // 5. 关闭线程池
            group.shutdownGracefully();
        }
    }
}
```







#### NettyClientHandler



```java
public class NettyClientHandler extends ChannelInboundHandlerAdapter {

    /**
     * 当通道就绪时触发！
     * @param ctx 上下文对象
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("client ctx：" + ctx);
        ctx.writeAndFlush(Unpooled.copiedBuffer("hello，服务器！", CharsetUtil.UTF_8));
    }

    /**
     * 读取客户端发来的消息！有读取事件时触发！
     * @param ctx 上下文对象
     * @param msg 发来的消息
     * @throws Exception
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        ByteBuf byteBuf = (ByteBuf) msg;
        System.out.println("服务器发来的消息：" + byteBuf.toString(CharsetUtil.UTF_8));
        System.out.println("服务器地址：" + ctx.channel().remoteAddress());
    }

    /**
     * 发生异常回调！
     * @param ctx
     * @param cause
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        // 关闭通道
        ctx.channel().close();
    }
}
```







### 任务队列中的三种任务



1) 用户程序自定义的普通任务
2) 用户自定义定时任务
3) 非当前 Reactor 线程调用 Channel 的各种方法：例如在推送系统的业务线程里面，根据用户的标识，找到对应的 Channel 引用，然后调用 Write 类方法向该用户推送消息，就会进入到这种场景。最终的 Write 会提交到任务队列中后被异步消费





```java
package com.itnxd.netty.simple;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelPipeline;
import io.netty.util.CharsetUtil;

import java.util.concurrent.TimeUnit;

/**
 * 自定义的pipeline的处理器！
 * @author ITNXD
 * @create 2021-10-28 10:11
 */
public class NettyServerHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        /*
        比如这里我们有一个非常耗时长的业务-> 异步执行 -> 提交该 channel 对应的
        NIOEventLoop 的 taskQueue 中。
         */
        // TimeUnit.SECONDS.sleep(10);
        // ctx.writeAndFlush(Unpooled.copiedBuffer("sleep了十秒，hello，客户端！", CharsetUtil.UTF_8));

        System.out.println("channelRead .....");

        /*
         解决方案 1 用户程序自定义的普通任务

         向taskQueue里放入两个任务，由于该队列只是一个线程处理，因此是先后处理的！
         */
        // runnable接口
        ctx.channel().eventLoop().execute(()->{
            try {
                TimeUnit.SECONDS.sleep(10);
            } catch (InterruptedException e) {
                System.out.println("发生异常：");
                e.printStackTrace();
            }
            ctx.writeAndFlush(Unpooled.copiedBuffer("sleep了 10 秒，hello，客户端！\n", CharsetUtil.UTF_8));
        });
        /*ctx.channel().eventLoop().execute(()->{
            try {
                TimeUnit.SECONDS.sleep(20);
            } catch (InterruptedException e) {
                System.out.println("发生异常：");
                e.printStackTrace();
            }
            ctx.writeAndFlush(Unpooled.copiedBuffer("sleep了 20 秒，hello，客户端！\n", CharsetUtil.UTF_8));
        });*/

        /*
         解决方案 2 : 用户自定义定时任务 -》 该任务是提交到 scheduledTaskQueue 中！

         延迟指定时间的任务！

         普通任务执行完毕之后执行定时任务！
         定时任务的延迟时间从普通任务开始执行算起！
         */
        ctx.channel().eventLoop().schedule(()->{
            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException e) {
                System.out.println("发生异常：");
                e.printStackTrace();
            }
            ctx.writeAndFlush(Unpooled.copiedBuffer("schedule sleep了 5 秒，hello，客户端！\n", CharsetUtil.UTF_8));
        }, 5, TimeUnit.SECONDS);


    }

    /**
     * 服务器端读完消息后的业务处理！
     * 可以回传数据给客户端！
     * @param ctx 上下文对象，含有许多内容！
     * @throws Exception
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {

        // 将数据写到缓存并刷新（缓存再写到Channel）！
        ctx.writeAndFlush(Unpooled.copiedBuffer("hello，客户端！", CharsetUtil.UTF_8));
    }

    /**
     * 服务器端出现异常的处理！
     *
     * @param ctx 上下文对象
     * @param cause 异常信息
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // 出现异常则关闭通道！
        ctx.close();
    }
}
```





### Netty模型再说明



1) Netty 抽象出两组线程池，BossGroup 专门负责接收客户端连接，WorkerGroup 专门负责网络读写操作。
2) NioEventLoop 表示一个不断循环执行处理任务的线程，每个 NioEventLoop 都有一个 selector，用于监听绑定在其上的 socket 网络通道。
3) NioEventLoop 内部采用串行化设计，从消息的读取->解码->处理->编码->发送，始终由 IO 线程 NioEventLoop负责
4) NioEventLoopGroup 下包含多个 NioEventLoop
5) 每个 NioEventLoop 中包含有一个 Selector，一个 taskQueue
6) 每个 NioEventLoop 的 Selector 上可以注册监听多个 NioChannel
7) 每个 NioChannel 只会绑定在唯一的 NioEventLoop 上
8) 每个 NioChannel 都绑定有一个自己的 ChannelPipeline







## 8、异步模型



### 基本介绍

1) 异步的概念和同步相对。当一个异步过程调用发出后，调用者不能立刻得到结果。实际处理这个调用的组件在完成后，通过状态、通知和回调来通知调用者。
2) Netty 中的 I/O 操作是异步的，包括 Bind、Write、Connect 等操作会简单的返回一个 ChannelFuture。
3) 调用者并不能立刻获得结果，而是通过 Future-Listener 机制，用户可以方便的主动获取或者通过通知机制获得IO 操作结果
4) Netty 的异步模型是建立在 future 和 callback 的之上的。callback 就是回调。
5) 重点说 **Future**，它的核心思想是：假设一个方法 fun，计算过程可能非常耗时，等待 fun 返回显然不合适。那么可以在调用 fun 的时候，立马返回一个 Future，后续可以通过 Future 去监控方法 fun 的处理过程 (即 ： **Future-Listener 机制**)



### Future 说明



- 表示异步的执行结果, 可以通过它提供的方法来检测执行是否完成，比如检索计算等等
- ChannelFuture 是一个接口 ： `public interface ChannelFuture extends Future<Void>`
- 我们可以添加监听器，当监听的事件发生时，就会通知到监听器.





### 工作原理示意图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@87e38aa5f5e8e570067efcc9688b51446d0c2309/2021/11/01/6122e7d1e6dca277fbd6f2fd8836a09c.png)



**简单说明：**

1) 在使用 Netty 进行编程时，拦截操作和转换出入站数据只需要您提供 callback 或利用 future 即可。这使得链式操作简单、高效, 并有利于编写可重用的、通用的代码。
2) Netty 框架的目标就是让你的业务逻辑从网络基础应用编码中分离出来、解脱出来



### Future-Listener 机制



1. 当 Future 对象刚刚创建时，处于非完成状态，调用者可以通过返回的 ChannelFuture 来获取操作执行的状态，注册监听函数来执行完成后的操作。

2. 常见有如下操作：

   1) 通过 isDone 方法来判断当前操作是否完成；
   2) 通过 isSuccess 方法来判断已完成的当前操作是否成功；
   3) 通过 getCause 方法来获取已完成的当前操作失败的原因；
   4) 通过 isCancelled 方法来判断已完成的当前操作是否被取消；
   5) 通过 addListener 方法来注册监听器，当操作已完成(isDone 方法返回完成)，将会通知指定的监听器；如果Future 对象已完成，则通知指定的监听器

   

```java
ChannelFuture cf = bootstrap.bind(6668).sync();

// 为ChannelFuture注册一个监听器！
cf.addListener( future -> {
    if(future.isSuccess()){
        System.out.println("监听端口 6668 成功！");
    }else{
        System.out.println("监听端口 6668 失败！");
    }
});

cf.channel().closeFuture().sync();
```





## 9、Http 服务案例





**实例要求：**

- Netty 服务器在 6668 端口监听，浏览器发出请求 "http://localhost:6668/ " 
- 服务器可以回复消息给客户端 "Hello! 我是服务器 " , 并对特定请求资源进行过滤



### TestServer



```java
public class TestServer {

    public static void main(String[] args) throws Exception{

        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class)
                    .childHandler(new TestServerInitializer());
            /*
            6668无法访问！
            关于谷歌浏览器限制端口！
             https://blog.csdn.net/u010037020/article/details/83183690
             https://blog.csdn.net/weixin_33738982/article/details/85868513
             */
            ChannelFuture channelFuture = serverBootstrap.bind(8888).sync();
            System.out.println("服务器已启动....");

            channelFuture.channel().closeFuture().sync();
        }finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```



### TestServerInitializer

```java
public class TestServerInitializer extends ChannelInitializer<SocketChannel> {

    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        /*
         向管道pipeline添加handler处理器
         （netty提供的HttpServerCodec codec -> code + decode）
         netty提供的编解码器！
         */
        // 1. 给pipeline添加编解码器！
        ChannelPipeline pipeline = ch.pipeline();
        pipeline.addLast("MyHttpServerCodec", new HttpServerCodec());

        // 2. 给pipeline增加自定义的handler处理器
        pipeline.addLast("MyTestHttpServerHandler", new TestHttpServerHandler());
    }
}
```



### TestHttpServerHandler



```java
/**
 * 1. SimpleChannelInboundHandler继承自ChannelInboundHandlerAdapter
 * 2. HttpObject 客户端和服务器端相互通讯的数据被封装成 HttpObject
 * @author ITNXD
 * @create 2021-10-28 22:06
 */
public class TestHttpServerHandler extends SimpleChannelInboundHandler<HttpObject> {


    /**
     * 读取客户端数据！
     * @param ctx 上下文对象！
     * @param msg 来自客户端的消息！
     * @throws Exception
     */
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, HttpObject msg) throws Exception {
        // 是HttpRequest请求！
        if(msg instanceof HttpRequest){

            // DefaultChannelHandlerContext
            System.out.println("ctx 的真实类型：" + ctx.getClass());

            /*
             每个客户端都有不同的handler，不同的pipeline（可以使用谷歌无痕模式测试）
             每次刷新都会返回不同的值，每个handler都是独享的！
             */
            System.out.println("pipeline 的 hashcode：" + ctx.pipeline().hashCode());
            System.out.println("TestHttpServerHandler 的 hashcode：" + this.hashCode());

            System.out.println("msg类型：" + msg.getClass());
            System.out.println("客户端地址：" + ctx.channel().remoteAddress());

            // 获取uri过滤资源！
            HttpRequest request = (HttpRequest) msg;
            URI uri = new URI(request.uri());
            if("/favicon.ico".equals(uri.getPath())){
                System.out.println("favicon.ico 不做响应！");
                return;
            }

            // 回复信息给浏览器（客户端），使用的是http协议
            ByteBuf content = Unpooled.copiedBuffer("hello, 我是服务器！", CharsetUtil.UTF_8);

            // 构造一个http的响应，即httpResponse
            FullHttpResponse httpResponse = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,
                    HttpResponseStatus.OK, content);
            httpResponse.headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain;charset=utf-8");
            httpResponse.headers().set(HttpHeaderNames.CONTENT_LENGTH, content.readableBytes());

            // 将构造好的response返回！
            ctx.writeAndFlush(httpResponse);
        }
    }
}
```





# 五、Netty 核心模块组件



## 1、Bootstrap、ServerBootstrap







1) Bootstrap 意思是引导，一个 Netty 应用通常由一个 Bootstrap 开始，主要作用是配置整个 Netty 程序，串联各个组件，Netty 中 Bootstrap 类是客户端程序的启动引导类，ServerBootstrap 是服务端启动引导类
2) 常见的方法有：



```java
public ServerBootstrap group(EventLoopGroup parentGroup, EventLoopGroup childGroup) 该方法用于服务器端，用来设置两个 EventLoop
public B group(EventLoopGroup group) 该方法用于客户端，用来设置一个 EventLoop
public B channel(Class<? extends C> channelClass) 该方法用来设置一个服务器端的通道实现
public <T> B option(ChannelOption<T> option, T value) 用来给 ServerChannel 添加配置
public <T> ServerBootstrap childOption(ChannelOption<T> childOption, T value) 用来给接收到的通道添加配置
public ServerBootstrap childHandler(ChannelHandler childHandler) 该方法用来设置业务处理类（自定义的
handler）
public ChannelFuture bind(int inetPort)  该方法用于服务器端，用来设置占用的端口号
public ChannelFuture connect(String inetHost, int inetPort)  该方法用于客户端，用来连接服务器端
```







## 2、Future、ChannelFuture



> Netty 中所有的 IO 操作都是异步的，不能立刻得知消息是否被正确处理。但是可以过一会等它执行完成或者直接注册一个监听，具体的实现就是通过 Future 和 ChannelFutures，他们可以注册一个监听，当操作执行成功或失败时监听会自动触发注册的监听事件



**常见的方法有：**

- Channel channel()，返回当前正在进行 IO 操作的通道
- ChannelFuture sync()，等待异步操作执行完毕





## 3、Channel



1) Netty 网络通信的组件，能够用于执行网络 I/O 操作。
2) 通过 Channel 可获得当前网络连接的通道的状态
3) 通过 Channel 可获得 网络连接的配置参数 （例如接收缓冲区大小）
4) Channel 提供异步的网络 I/O 操作(如建立连接，读写，绑定端口)，异步调用意味着任何 I/O 调用都将立即返回，并且不保证在调用结束时所请求的 I/O 操作已完成
5) 调用立即返回一个 ChannelFuture 实例，通过注册监听器到 ChannelFuture 上，可以 I/O 操作成功、失败或取消时回调通知调用方
6) 支持关联 I/O 操作与对应的处理程序
7) 不同协议、不同的阻塞类型的连接都有不同的 Channel 类型与之对应，**常用的 Channel 类型:**
  1) NioSocketChannel，异步的客户端 TCP Socket 连接。
  2) NioServerSocketChannel，异步的服务器端 TCP Socket 连接。
  3) NioDatagramChannel，异步的 **UDP** 连接。
  4) NioSctpChannel，异步的客户端 Sctp 连接。
  5) NioSctpServerChannel，异步的 Sctp 服务器端连接，这些通道涵盖了 UDP 和 TCP 网络 IO 以及文件 IO。





## 4、Selector





1) Netty 基于 Selector 对象实现 I/O 多路复用，通过 Selector 一个线程可以监听多个连接的 Channel 事件。
2) 当向一个 Selector 中注册 Channel 后，Selector 内部的机制就可以自动不断地查询(Select) 这些注册的Channel 是否有已就绪的 I/O 事件（例如可读，可写，网络连接完成等），这样程序就可以很简单地使用一个线程高效地管理多个 Channel





## 5、ChannelHandler





1) ChannelHandler 是一个接口，处理 I/O 事件或拦截 I/O 操作，并将其转发到其 ChannelPipeline(业务处理链)中的下一个处理程序。
2) ChannelHandler 本身并没有提供很多方法，因为这个接口有许多的方法需要实现，方便使用期间，可以继承它的子类
3) ChannelHandler 及其实现类一览图：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@56aa8c1d0f9d824c82f6ecd6e3491ff90ea37918/2021/11/01/caae81dd5fe2a773860bfed5a174e882.png)





4) 我们经常需要自定义一个 Handler 类去继承 ChannelInboundHandlerAdapter，然后通过重写相应方法实现业务逻辑，我们接下来看看一般都需要重写哪些方法：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9b5c45332df685db47b12a9eaa9a60bc366ff4f8/2021/11/01/99b3615a5c166a13c45eb985f41db035.png)







## 6、Pipeline、ChannelPipeline



**ChannelPipeline 是一个重点：**

1) ChannelPipeline 是一个 Handler 的集合，它负责处理和拦截 inbound 或者 outbound 的事件和操作，相当于一个贯穿 Netty 的链。(也可以这样理解：ChannelPipeline 是 保存 ChannelHandler 的 List，用于处理或拦截Channel 的入站事件和出站操作)
2) ChannelPipeline 实现了一种高级形式的拦截过滤器模式，使用户可以完全控制事件的处理方式，以及 Channel中各个的 ChannelHandler 如何相互交互
3) 在 Netty 中每个 Channel 都有且仅有一个 ChannelPipeline 与之对应，它们的组成关系如下：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f196b01211998238972f4274b1edf8fc6f1ffc9f/2021/11/01/37e494f98a2357ae942d01e999b6ef44.png)



4. 常用方法
   1. ChannelPipeline addFirst(ChannelHandler... handlers)，把一个业务处理类（handler）添加到链中的第一个位置
   2. ChannelPipeline addLast(ChannelHandler... handlers)，把一个业务处理类（handler）添加到链中的最后一个位置





## 7、ChannelHandlerContext



1) 保存 Channel 相关的所有上下文信息，同时关联一个 ChannelHandler 对象
2) 即 ChannelHandlerContext 中 包 含 一 个 具 体 的 事 件 处 理 器 ChannelHandler ， 同时 ChannelHandlerContext 中也绑定了对应的 pipeline 和 Channel 的信息，方便对 ChannelHandler 进行调用. 
3) 常用方法：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e904278d6098950efc4af78c5e27075662180670/2021/11/01/9391bb54c078ee9dde83cc044d8bc688.png)





## 8、ChannelOption



1) Netty 在创建 Channel 实例后,一般都需要设置 ChannelOption 参数。
2) ChannelOption 参数如下:



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f7caeca8c4d0875e3f7979be7e5535de27023ee1/2021/11/01/595fbd2e8cffcb7534e659555a26f680.png)



## 9、EventLoopGroup、NioEventLoopGroup





1) EventLoopGroup 是一组 EventLoop 的抽象，Netty 为了更好的利用多核 CPU 资源，一般会有多个 EventLoop同时工作，每个 EventLoop 维护着一个 Selector 实例。
2) EventLoopGroup 提供 next 接口，可以从组里面按照一定规则获取其中一个 EventLoop 来处理任务。在 Netty服 务 器 端编程中 ， 我们一般都需 要提供两个 EventLoopGroup ，例如 ： BossEventLoopGroup 和WorkerEventLoopGroup。
3) 通常一个服务端口即一个 ServerSocketChannel 对应一个 Selector 和一个 EventLoop 线程。BossEventLoop 负责接收客户端的连接并将SocketChannel 交给 WorkerEventLoopGroup 来进行 IO 处理
4) 常用方法
  1) public NioEventLoopGroup()，构造方法
  2) public Future<?> shutdownGracefully()，断开连接，关闭线程



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@59ec8223a6bf9e9366d8737c30ab06167e4cd7c3/2021/11/01/b9d6753e2d7d140232f9792f57ff5b92.png)











## 10、Unpooled



1. Netty 提供一个专门用来操作缓冲区(即 Netty 的数据容器)的工具类
2. 常用方法如下所示



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a3938038af3633f107cedd4c2deebb5fae996875/2021/11/01/5158af6e9869485c39526355013f8310.png)





```java
public class NettyByteBuf01 {

    public static void main(String[] args) {

        /*
        1. 创建一个ByteBuf，该对象包含一个数组 byte[10]
        2. netty中的buffer不需要像nio一样的flip操作，因为维护了两个变量readerIndex writerIndex
        3. 通过 readerIndex 和 writerIndex 和 capacity， 将 buffer 分成三部分
         */
        ByteBuf buffer = Unpooled.buffer(10);

        for (int i = 0; i < buffer.capacity(); i++) {
            buffer.writeByte(i);
        }

        /*for (int i = 0; i < buffer.capacity(); i++) {
            System.out.println(buffer.getByte(i));
        }*/
        // 返回设置的buffer大小
        System.out.println(buffer.capacity());

        for (int i = 0; i < buffer.capacity(); i++) {
            System.out.println(buffer.readByte());
        }
    }
}

public class NettyByteBuf02 {

    public static void main(String[] args) {

        ByteBuf byteBuf = Unpooled.copiedBuffer("hello, world", CharsetUtil.UTF_8);

        if(byteBuf.hasArray()){
            byte[] array = byteBuf.array();
            String msg = new String(array, CharsetUtil.UTF_8);
            System.out.println(msg);

            // byteBuf：UnpooledByteBufAllocator$InstrumentedUnpooledUnsafeHeapByteBuf(ridx: 0, widx: 12, cap: 36)
            System.out.println("byteBuf：" + byteBuf);

            System.out.println(byteBuf.arrayOffset()); // 0
            System.out.println(byteBuf.readerIndex()); // 0
            System.out.println(byteBuf.writerIndex()); // 12
            System.out.println(byteBuf.capacity()); // 36
            // 可读取数量：writerIndex - readerIndex
            System.out.println(byteBuf.readByte()); // 会导致readerIndex后移
            System.out.println(byteBuf.getByte(0)); // 不会导致readerIndex后移
            System.out.println(byteBuf.readableBytes()); // 11

            for (int i = byteBuf.readerIndex(); i <= byteBuf.readableBytes(); i++) {
                System.out.println((char) byteBuf.getByte(i));
            }

            System.out.println(byteBuf.getCharSequence(0, 5, CharsetUtil.UTF_8));
        }
    }
}
```





## 11、Netty 应用实例-群聊系统







**实例要求:**

1) 编写一个 Netty 群聊系统，实现服务器端和客户端之间的数据简单通讯（非阻塞）
2) 实现多人群聊
3) 服务器端：可以监测用户上线，离线，并实现消息转发功能
4) 客户端：通过 channel 可以无阻塞发送消息给其它所有用户，同时可以接受其它用户发送的消息(有服务器转发得到)





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6653ed676d045ab2e04d121f0b4d407f00e76da1/2021/11/01/a24d2105be9922f51571a9899b4a003a.png)



### GroupChatServer



```java
public class GroupChatServer {

    private int port;

    public GroupChatServer(int port){
        this.port = port;
    }

    /**
     * 处理客户端请求！
     */
    public void run() throws InterruptedException {
        // 创建两个线程组
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();

            serverBootstrap.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {

                            ChannelPipeline pipeline = ch.pipeline();
                            // 添加解码器和编码器
                            pipeline.addLast("decoder", new StringDecoder());
                            pipeline.addLast("encoder", new StringEncoder());
                            // 添加自定义handler
                            pipeline.addLast(new GroupChatServerHandler());
                        }
                    });
            System.out.println("netty 服务器已经启动！");
            ChannelFuture channelFuture = serverBootstrap.bind(port).sync();

            // 监听channel关闭时间
            channelFuture.channel().closeFuture().sync();
        } finally {
            // 关闭两个线程组
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        // 启动服务器
        new GroupChatServer(7000).run();
    }
}
```



### GroupChatServerHandler



```java
public class GroupChatServerHandler extends SimpleChannelInboundHandler<String> {

    /*
     定义一个channel组 每个客户端都会独享一个handler
     GlobalEventExecutor.INSTANCE 是全局的事件执行器，是一个单例
     */
    private static ChannelGroup channelGroup = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    // 用于处理私聊（暂未实现）
    private static Map<String, Channel> channels = new HashMap<>();

    /**
     * 建立连接后第一个被执行！
     *
     * @param ctx 上下文对象！
     * @throws Exception
     */
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        Channel channel = ctx.channel();
        /*
         将客户端加入聊天的信息推送到其他所有客户端！
         该方法会将 channelGroup 中所有的 channel 遍历，并发送 消息，
         我们不需要自己遍历
         */
        channelGroup.writeAndFlush(sdf.format(new Date()) + "：[客户端]" + channel.remoteAddress() + "加入聊天\n");
        channelGroup.add(channel);
    }

    /**
     * 断开连接后执行！
     *
     * @param ctx 上下文对象！
     * @throws Exception
     */
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        Channel channel = ctx.channel();
        channelGroup.writeAndFlush(sdf.format(new Date()) + "：[客户端]" + channel.remoteAddress() + "离开了\n");
        // 自动触发，无需手动remove
        // channelGroup.remove(channel);
        System.out.println("当前channelGroup的channel数量：" + channelGroup.size());
    }

    /**
     * channel处于活动状态（上线）时执行！
     *
     * @param ctx 上下文对象！
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println(ctx.channel().remoteAddress() + "上线了！");
    }

    /**
     * channel处于非活动状态（离线）时调用！
     * @param ctx 上下文对象！
     * @throws Exception
     */
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        System.out.println(ctx.channel().remoteAddress() + "离线了！");
    }

    /**
     * 服务器等待接收客户端消息！
     *
     * @param ctx 上下文对象！
     * @param msg 客户端发来的消息！
     * @throws Exception
     */
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        Channel channel = ctx.channel();

        channelGroup.forEach(ch -> {
            // 排除自己
            if(ch != channel){
                ch.writeAndFlush(sdf.format(new Date()) + "：[客户]" + channel.remoteAddress() + "发送了消息："
                        + msg + "\n");
            }else{
                ch.writeAndFlush(sdf.format(new Date()) + "：[自己]发送了消息：" + msg + "\n");
            }
        });
    }

    /**
     * 发生异常的处理！
     *
     * @param ctx 上下文对象！
     * @param cause 异常原因！
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // 关闭通道
        ctx.close();
    }
}
```



### GroupChatClient

```java
public class GroupChatClient {

    private final String host;
    private final int port;

    public GroupChatClient(String host, int port){
        this.host = host;
        this.port = port;
    }

    public void run() throws InterruptedException {
        NioEventLoopGroup eventExecutors = new NioEventLoopGroup();

        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(eventExecutors).channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            // 添加编码解码器
                            pipeline.addLast("decoder", new StringDecoder());
                            pipeline.addLast("encoder", new StringEncoder());
                            // 加入自定义处理器
                            pipeline.addLast(new GroupChatClientHandler());
                        }
                    });

            ChannelFuture channelFuture = bootstrap.connect(host, port).sync();
            Channel channel = channelFuture.channel();

            System.out.println("-------" + channel.localAddress() + "----------");

            Scanner scanner = new Scanner(System.in);
            while(scanner.hasNextLine()){
                String msg = scanner.nextLine();
                // 客户端发送消息给服务器端！
                channel.writeAndFlush(msg);
            }
            // 关闭通道
            channelFuture.channel().closeFuture().sync();
        } finally {
            eventExecutors.shutdownGracefully();
        }
    }

    public static void main(String[] args) throws InterruptedException {

        // 启动客户端
        new GroupChatClient("127.0.0.1", 7000).run();

    }
}
```



### GroupChatClientHandler

```java
public class GroupChatClientHandler extends SimpleChannelInboundHandler<String> {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        System.out.println(msg.trim());
    }
}
```





## 12、Netty 心跳检测机制案例





**实例要求：**

1) 编写一个 Netty 心跳检测机制案例, 当服务器超过 3 秒没有读时，就提示读空闲
2) 当服务器超过 5 秒没有写操作时，就提示写空闲
3) 实现当服务器超过 7 秒没有读或者写操作时，就提示读写空闲









### MyServer



```java
public class MyServer {

    public static void main(String[] args) throws InterruptedException {

        // 创建两个线程组
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class)
                    // 为boss添加日志处理器
                    .handler(new LoggingHandler(LogLevel.INFO))
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            /*
                            说明
                            1. IdleStateHandler 是 netty 提供的处理空闲状态的处理器
                            2. long readerIdleTime : 表示多长时间没有读, 就会发送一个心跳检测包检测是否连接
                            3. long writerIdleTime : 表示多长时间没有写, 就会发送一个心跳检测包检测是否连接
                            4. long allIdleTime : 表示多长时间没有读写, 就会发送一个心跳检测包检测是否连接
                            5. 文档说明
                            triggers an {@link IdleStateEvent} when a {@link Channel} has not performed
                            read, write, or both operation for a while.

                             6. 当 IdleStateEvent 触发后 , 就会传递给管道 的下一个 handler 去处理
                            通过调用(触发)下一个 handler 的 userEventTriggered , 在该方法中去处理 IdleStateEvent(读
                            空闲，写空闲，读写空闲)
                            */
                            pipeline.addLast(new IdleStateHandler(3, 5, 7, TimeUnit.SECONDS));
                            // 加入一个对空闲检测进一步处理的 handler(自定义)
                            pipeline.addLast(new MyServerHandler());
                        }
                    });

            ChannelFuture channelFuture = serverBootstrap.bind(7000).sync();
            channelFuture.channel().closeFuture().sync();
        }finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```





### MyServerHandler

```java
public class MyServerHandler extends ChannelInboundHandlerAdapter {

    /**
     *
     * @param ctx 上下文
     * @param evt 事件
     * @throws Exception
     */
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if(evt instanceof IdleStateEvent){
            IdleStateEvent event = (IdleStateEvent) evt;
            String eventType = null;
            switch (event.state()){
                case READER_IDLE:
                    eventType = "读空闲";
                    break;
                case WRITER_IDLE:
                    eventType = "写空闲";
                    break;
                case ALL_IDLE:
                    eventType = "读写空闲";
                    break;
            }
            System.out.println(ctx.channel().remoteAddress() + "-----发生了" + eventType);
            System.out.println("服务器做相应处理！");

            // 发生空闲则关闭通道！
            // ctx.close();
        }
    }
}
```







## 13、Netty 通过 WebSocket 实现长连接





**实例要求:**

1) **Http 协议是无状态的**, 浏览器和服务器间的请求响应一次，下一次会重新创建连接. 
2) 要求：实现基于 webSocket 的长连接的**全双工**的交互
3) 改变 Http 协议多次请求的约束，实现长连接了， 服务器可以发送消息给浏览器
4) 客户端浏览器和服务器端会相互感知，比如服务器关闭了，浏览器会感知，同样浏览器关闭了，服务器会感知
5) 运行界面



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@323561ad8b599e2f5f1169495763f89d11a577ad/2021/11/01/c28177e26be7cc9da211d1d0dbab002c.png)





### MyServer



```java
public class MyServer {

    public static void main(String[] args) throws Exception{

        // 创建两个线程组
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class)
                    // 为boss添加日志处理器
                    .handler(new LoggingHandler(LogLevel.INFO))
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            //因为基于 http 协议，使用 http 的编码和解码器
                            pipeline.addLast(new HttpServerCodec());
                            // 是以块方式写，添加 ChunkedWriteHandler 处理器(处理大数据传输)
                            pipeline.addLast(new ChunkedWriteHandler());
                            /*
                            1. http 数据在传输过程中是分段, HttpObjectAggregator ，就是可以将多个段聚合
                            2. 这就就是为什么，当浏览器发送大量数据时，就会发出多次 http 请求
                             */
                            pipeline.addLast(new HttpObjectAggregator(8192));
                            /*
                            1. 对应 websocket ，它的数据是以 帧(frame) 形式传递
                            2. 可以看到 WebSocketFrame 下面有六个子类
                            3. 浏览器请求时 ws://localhost:7000/hello 表示请求的 uri
                            4. WebSocketServerProtocolHandler 核心功能是将 http 协议升级为 ws 协议 , 保持长连接
                            5. 是通过一个 状态码 101
                             */
                            pipeline.addLast(new WebSocketServerProtocolHandler("/hello"));
                            // 添加自定义处理器
                            pipeline.addLast(new MyTextWebSocketFrameHandler());

                        }
                    });

            ChannelFuture channelFuture = serverBootstrap.bind(7000).sync();
            channelFuture.channel().closeFuture().sync();
        }finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```





### Handler



```java
/**
 * 这里 TextWebSocketFrame 类型，表示一个文本帧(frame)
 * @author ITNXD
 * @create 2021-10-29 21:00
 */
public class MyTextWebSocketFrameHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {

    /**
     * 服务器处理客户端消息！
     * @param ctx 上下文
     * @param msg 客户端发来的消息
     * @throws Exception
     */
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {
        System.out.println("服务器收到消息：" + msg.text());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // 回复浏览器消息(注意一定要用TextWebSocketFrame来封装)
        ctx.channel().writeAndFlush(new TextWebSocketFrame("服务器时间：" + LocalDateTime.now()
                + " " + msg.text()));
    }

    /**
     * 客户端建立连接时执行！
     * @param ctx 上下文
     * @throws Exception
     */
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        //id 表示唯一的值，LongText 是唯一的 ShortText
        System.out.println("handlerAdded 被调用：" + ctx.channel().id().asLongText());
        System.out.println("handlerAdded 被调用：" + ctx.channel().id().asShortText());
    }

    /**
     * 断开连接时执行！
     * @param ctx 上下文对象
     * @throws Exception
     */
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        System.out.println("handlerRemoved 被调用：" + ctx.channel().id().asLongText());
        System.out.println("handlerRemoved 被调用：" + ctx.channel().id().asShortText());
    }

    /**
     * 发生异常时调用！
     * @param ctx 上下文对象
     * @param cause 异常原因
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        System.out.println("异常发生：" + cause.getMessage());
        ctx.close();
    }
}
```



### html



右键 run html 即可！

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hello</title>
</head>
<body>

    <script>
        var socket;
        // 判断浏览器是否支持websocket
        if(window.WebSocket){
            socket = new WebSocket("ws://localhost:7000/hello");
            // ws的监听函数 ev参数为服务器发来的消息！
            socket.onmessage = function (ev){
                var rt = document.getElementById("responseText");
                rt.value = rt.value + "\n" + ev.data;
            };
            // ws的连接建立时执行
            socket.onopen = function (ev){
                var rt = document.getElementById("responseText");
                rt.value = "连接已经建立！";
            };
            // ws的连接关闭时执行
            socket.onclose = function (ev){
                var rt = document.getElementById("responseText");
                rt.value = rt.value + "\n连接已经关闭！";
            };
        }else{
            alert("您的浏览器不支持websocket！");
        }
        // 处理发送消息的服务器逻辑
        function send(message) {
            // 先判断ws是否创建成功
            if(!window.socket){
                return;
            }
            if(socket.readyState == WebSocket.OPEN){
                // 通过socket发送消息
                socket.send(message);
            }else{
                alert("连接还没有开启！");
            }
        }
    </script>

    <form action="" onsubmit="return false;">
        <textarea name="message" style="height: 300px; width: 500px"></textarea>
        <input type="button" value="发送消息" onclick="send(this.form.message.value)"/>
        <textarea id="responseText" style="height: 300px; width: 500px"></textarea>
        <input type="button" value="清空内容" onclick="document.getElementById('responseText').value=''">
    </form>
</body>
</html>
```







# 六、Google Protobuf



## 1、编码和解码的基本介绍



1) 编写网络应用程序时，因为数据在网络中传输的都是二进制字节码数据，在发送数据时就需要编码，接收数据时就需要解码
2) codec(编解码器) 的组成部分有两个：decoder(解码器)和 encoder(编码器)。encoder 负责把业务数据转换成字节码数据，decoder 负责把字节码数据转换成业务数据



## 2、Netty 本身编解码机制问题分析



1) Netty 自身提供了一些 codec(编解码器)
2) Netty 提供的编码器
  1) StringEncoder，对字符串数据进行编码
  2) ObjectEncoder，对 Java 对象进行编码
3) Netty 提供的解码器
  1) StringDecoder, 对字符串数据进行解码
  2) ObjectDecoder，对 Java 对象进行解码
4) Netty 本身自带的 ObjectDecoder 和 ObjectEncoder 可以用来实现 POJO 对象或各种业务对象的编码和解码
5) 底层使用的仍是 Java 序列化技术 , 而 Java 序列化技术本身效率就不高，**存在如下问题**：
  1) 无法跨语言
  2) 序列化后的体积太大，是二进制编码的 5 倍多。
  3) 序列化性能太低
6) **引出新的解决方案 [Google 的 Protobuf]**
7) ，



## 3、Protobuf





1) Protobuf 基本介绍和使用示意图
2) Protobuf 是 Google 发布的开源项目，全称 Google Protocol Buffers，是一种轻便高效的结构化数据存储格式，可以用于结构化数据串行化，或者说序列化。它很适合做数据存储或 RPC[远程过程调用 remote procedure call ] 数据交换格式 。目前很多公司 **http+json tcp+protobuf**
3) 参考文档 : https://developers.google.com/protocol-buffers/docs/proto 语言指南
4) Protobuf 是以 message 的方式来管理数据的.
5) 支持跨平台、跨语言，即[客户端和服务器端可以是不同的语言编写的] （支持目前绝大多数语言，例如 C++、C#、Java、python 等）
6) 高性能，高可靠性
7) 使用 protobuf 编译器能自动生成代码，Protobuf 是将类的定义使用.proto 文件进行描述。说明，在 idea 中编写 .proto 文件时，会自动提示是否下载 .ptotot 编写插件. 可以让语法高亮。
8) 然后通过 protoc.exe 编译器根据.proto 自动生成.java 文件
9) protobuf 使用示意图





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@0e4ccb6a1b12fd12db3070b856325e98c3f67b81/2021/11/01/d7294297e57fbcc9fd317c19ec4a6767.png)







## 4、Protobuf 案例一



编写程序，使用 Protobuf 完成如下功能：
1) 客户端可以发送一个 Student PoJo 对象到服务器 (通过 Protobuf 编码)
2) 服务端能接收 Student PoJo 对象，并显示信息(通过 Protobuf 解码)



### Student.proto

使用`protoc.exe --java_out=. Student.proto` 编译为 StudentPOJO.java 放入项目使用！

```protobuf
syntax = "proto3"; // 版本
option java_outer_classname = "StudentPojo"; // 生成的外部类名，同时也是文件名
// protobuf使用message管理数据 会在StudentPojo外部类里生成一个内部类，是真正发送的pojo对象
message student{
  // 属性=序号（不是值）
  int32 id = 1;
  string name = 2;
}
```



### NettyServer



```java
public class NettyServer {

    public static void main(String[] args) throws InterruptedException {

        EventLoopGroup bossGroup = new NioEventLoopGroup(1); // Boss分配一个线程即可
        EventLoopGroup workerGroup = new NioEventLoopGroup(4);

        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        // 给 pipeline 设置处理器
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            System.out.println("客户socketChannel的hashCode：" + ch.hashCode());
                            // 需要指定对谁解码
                            ch.pipeline().addLast("decoder", new ProtobufDecoder(StudentPojo.student.getDefaultInstance()));
                            // 添加自定义处理器
                            ch.pipeline().addLast(new NettyServerHandler());
                        }
                    });

            System.out.println(".....服务器已经准备好了.....");

            ChannelFuture cf = bootstrap.bind(6668).sync();

            // 为ChannelFuture注册一个监听器！
            cf.addListener( future -> {
                if(future.isSuccess()){
                    System.out.println("监听端口 6668 成功！");
                }else{
                    System.out.println("监听端口 6668 失败！");
                }
            });
            cf.channel().closeFuture().sync();
        } finally {
            // 最终优雅关闭
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```



### NettyServerHandler

```java
public class NettyServerHandler extends SimpleChannelInboundHandler<StudentPojo.student> {

    /*@Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {

        // 读取客户端发送的StudentPojo.student
        StudentPojo.student student = (StudentPojo.student) msg;
        System.out.println("客户端发送的数据 id = " + student.getId());
        System.out.println("客户端发送的数据 name = " + student.getName());
    }*/

    @Override
    public void channelRead0(ChannelHandlerContext ctx, StudentPojo.student msg) throws Exception {

        // 读取客户端发送的StudentPojo.student
        System.out.println("客户端发送的数据 id = " + msg.getId());
        System.out.println("客户端发送的数据 name = " + msg.getName());
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {

        // 将数据写到缓存并刷新（缓存再写到Channel）！
        ctx.writeAndFlush(Unpooled.copiedBuffer("hello，客户端！", CharsetUtil.UTF_8));
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // 出现异常则关闭通道！
        ctx.close();
    }
}
```



### NettyClient



```java
public class NettyClient {

    public static void main(String[] args) throws InterruptedException {

        EventLoopGroup group = new NioEventLoopGroup();

        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(group)
                    .channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            // 添加protobuf处理器（最好放在前面）
                            ch.pipeline().addLast("encoder", new ProtobufEncoder());
                            // 添加自定义处理器
                            ch.pipeline().addLast(new NettyClientHandler());
                        }
                    });

            System.out.println(".....客户端已经准备好了.....");

            ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 6668).sync();

            channelFuture.channel().closeFuture().sync();
        } finally {
            group.shutdownGracefully();
        }
    }
}
```



### NettyClientHandler



```java
public class NettyClientHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        // 发送student对象到服务器
        StudentPojo.student tom = StudentPojo.student.newBuilder().setId(1).setName("tom").build();
        ctx.writeAndFlush(tom);
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        ByteBuf byteBuf = (ByteBuf) msg;
        System.out.println("服务器发来的消息：" + byteBuf.toString(CharsetUtil.UTF_8));
        System.out.println("服务器地址：" + ctx.channel().remoteAddress());
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        // 关闭通道
        ctx.channel().close();
    }
}
```



## 5、Protobuf 案例二



**编写程序，使用 Protobuf 完成如下功能**

- 客户端可以随机发送 Student PoJo/ Worker PoJo 对象到服务器 (通过 Protobuf 编码)
- 服务端能接收 Student PoJo/ Worker PoJo 对象(需要判断是哪种类型)，并显示信息(通过 Protobuf 解码)



### Student.proto

使用`protoc.exe --java_out=. Student.proto` 编译为 StudentPOJO.java 放入项目使用！

```protobuf
syntax = "proto3"; // 版本
option optimize_for = SPEED; // 加快解析
option java_package = "com.itnxd.netty.codec2"; // 指定生成到哪个包下
option java_outer_classname = "MyDataInfo"; // 生成的外部类名，同时也是文件名

// protoc.exe --java_out=. student.proto
// protobuf 可以使用 message 管理其他的 message
message MyMessage{
  // 定义枚举类型
  enum DataType{
    // 枚举里面编号从0开始
    StudentType = 0;
    WorkerType = 1;
  }

  // 用data_type标识传递的类型（属性=编号）
  DataType data_type = 1;
  // 表示每次枚举类型最多只能出现其中的一个, 节省空间
  oneof dataBody {
    Student student = 2;
    Worker worker = 3;
  }
  // 三个属性，后两个同时只能传递一个！
}

message Student{
  // 属性=序号（不是值）
  int32 id = 1;
  string name = 2;
}

message Worker{
  string name = 1;
  int32 age = 2;
}
```



### NettyServer

```java
public class NettyServer {

    public static void main(String[] args) throws InterruptedException {

        EventLoopGroup bossGroup = new NioEventLoopGroup(1); // Boss分配一个线程即可
        EventLoopGroup workerGroup = new NioEventLoopGroup(4);

        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        // 给 pipeline 设置处理器
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            System.out.println("客户socketChannel的hashCode：" + ch.hashCode());
                            // 需要指定对谁解码
                            ch.pipeline().addLast("decoder", new ProtobufDecoder(MyDataInfo.MyMessage.getDefaultInstance()));
                            // 添加自定义处理器
                            ch.pipeline().addLast(new NettyServerHandler());
                        }
                    });

            System.out.println(".....服务器已经准备好了.....");

            ChannelFuture cf = bootstrap.bind(6668).sync();

            // 为ChannelFuture注册一个监听器！
            cf.addListener( future -> {
                if(future.isSuccess()){
                    System.out.println("监听端口 6668 成功！");
                }else{
                    System.out.println("监听端口 6668 失败！");
                }
            });
            cf.channel().closeFuture().sync();
        } finally {
            // 最终优雅关闭
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```



### NettyServerHandler



```java
public class NettyServerHandler extends SimpleChannelInboundHandler<MyDataInfo.MyMessage> {

    @Override
    public void channelRead0(ChannelHandlerContext ctx, MyDataInfo.MyMessage msg) throws Exception {

        // 读取客户端发送的msg，根据dataType判断显示
        MyDataInfo.MyMessage.DataType dataType = msg.getDataType();
        if(dataType == MyDataInfo.MyMessage.DataType.StudentType){
            MyDataInfo.Student student = msg.getStudent();
            System.out.println("学生 id = " + student.getId());
            System.out.println("学生 name = " + student.getName());
        }else if(dataType == MyDataInfo.MyMessage.DataType.WorkerType){
            MyDataInfo.Worker worker = msg.getWorker();
            System.out.println("工人 age = " + worker.getAge());
            System.out.println("工人 name = " + worker.getName());
        }else{
            System.out.println("传输的类型不正确！");
        }

    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {

        // 将数据写到缓存并刷新（缓存再写到Channel）！
        ctx.writeAndFlush(Unpooled.copiedBuffer("hello，客户端！", CharsetUtil.UTF_8));
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // 出现异常则关闭通道！
        ctx.close();
    }
}
```





### NettyClient



```java
public class NettyClient {

    public static void main(String[] args) throws InterruptedException {

        EventLoopGroup group = new NioEventLoopGroup();

        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(group)
                    .channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            // 添加protobuf处理器（最好放在前面）
                            ch.pipeline().addLast("encoder", new ProtobufEncoder());
                            // 添加自定义处理器
                            ch.pipeline().addLast(new NettyClientHandler());
                        }
                    });

            System.out.println(".....客户端已经准备好了.....");

            ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 6668).sync();

            channelFuture.channel().closeFuture().sync();
        } finally {
            group.shutdownGracefully();
        }
    }
}
```





### NettyClientHandler



```java
public class NettyClientHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {

        // 随机发送student和worker给服务器
        int random = new Random().nextInt(3);
        MyDataInfo.MyMessage message = null;
        if(random == 0){
             message = MyDataInfo.MyMessage.newBuilder().setDataType(MyDataInfo.MyMessage.DataType.StudentType)
                    .setStudent(MyDataInfo.Student.newBuilder().setId(1).setName("itnxd").build()).build();
        }else {
            message = MyDataInfo.MyMessage.newBuilder().setDataType(MyDataInfo.MyMessage.DataType.WorkerType)
                    .setWorker(MyDataInfo.Worker.newBuilder().setAge(20).setName("nbnb").build()).build();
        }

        ctx.writeAndFlush(message);
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        ByteBuf byteBuf = (ByteBuf) msg;
        System.out.println("服务器发来的消息：" + byteBuf.toString(CharsetUtil.UTF_8));
        System.out.println("服务器地址：" + ctx.channel().remoteAddress());
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        // 关闭通道
        ctx.channel().close();
    }
}
```







# 七、Netty 编解码器







## 1、基本说明





1) netty 的组件设计：Netty 的主要组件有 Channel、EventLoop、ChannelFuture、ChannelHandler、ChannelPipe 等
2) ChannelHandler 充当了处理入站和出站数据的应用程序逻辑的容器。例如，实现 ChannelInboundHandler 接口，你就可以接收入站事件和数据，这些数据会被业务逻辑处理。当要给客户端发送响应时 ， 也可以从 ChannelInboundHandler 冲刷数据 。 业务逻辑通常写在一个或者多个ChannelInboundHandler 中。ChannelOutboundHandler 原理一样，只不过它是用来处理出站数据的
3) ChannelPipeline 提供了 ChannelHandler 链的容器。以客户端应用程序为例，如果事件的运动方向是从客户端到服务端的，那么我们称这些事件为出站的，即客户端发送给服务端的数据会通过 pipeline 中的一系列ChannelOutboundHandler，并被这些 Handler 处理，反之则称为入站的



## 2、编码解码器



1) 当 Netty 发送或者接受一个消息的时候，就将会发生一次数据转换。入站消息会被解码：从字节转换为另一种格式（比如 java 对象）；如果是出站消息，它会被编码成字节。
2) Netty 提供一系列实用的编解码器，他们都实现了 ChannelInboundHadnler 或者 ChannelOutboundHandler 接口。在这些类中，channelRead 方法已经被重写了。以入站为例，对于每个从入站 Channel 读取的消息，这个方法会被调用。随后，它将调用由解码器所提供的 decode()方法进行解码，并将已经解码的字节转发给 ChannelPipeline中的下一个 ChannelInboundHandler。





## 3、解码器-ByteToMessageDecoder



### 关系继承图

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@dbce4c7739638bc24cc06ffe4e3f846fcb82080d/2021/11/02/01ea6a9f4251a467bebb91730c623440.png)



1. 由于不可能知道远程节点是否会一次性发送一个完整的信息，tcp 有可能出现**粘包拆包**的问题，这个类会对入站数据进行缓冲，直到它准备好被处理. 
2. 一个关于 ByteToMessageDecoder 实例分析





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@854e2aff88a08eaf96da5b6c21e48a4eec4683d6/2021/11/02/bd2e3d89a2a5c9ac0febeade256dd1e8.png)





## 4、Netty 的 handler 链的调用机制



**调用链示意图：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@7230612cd36d9d905b969fe7407c64c1459cb73e/2021/11/02/da1599a4ded7cae000bbadda6d1358af.png)



**实例要求**：使用自定义的编码器和解码器来说明 Netty 的 handler 调用机制

- 客户端发送 long -> 服务器
- 服务端发送 long -> 客户端



**小结论：**

- 不论解码器 handler 还是 编码器 handler 即接收的消息类型必须与待处理的消息类型一致，否则该 handler 不会被执行
- 在解码器 进行数据解码时，需要判断 缓存区(ByteBuf)的数据是否足够 ，否则接收到的结果会期望结果可能不一致



### MyLongToByteEncoder



```java
public class MyLongToByteEncoder extends MessageToByteEncoder<Long> {

    /**
     * 重写编码方法！
     *
     * @param ctx 上下文
     * @param msg 待编码的消息
     * @param out 出站的buf
     * @throws Exception
     */
    @Override
    protected void encode(ChannelHandlerContext ctx, Long msg, ByteBuf out) throws Exception {

        System.out.println("MyLongToByteEncoder encode 方法被调用！");
        System.out.println("msg = " + msg);
        out.writeLong(msg);
    }
}
```



### MyByteToLongDecoder



```java
public class MyByteToLongDecoder extends ByteToMessageDecoder {
    /**
     * 重写解码器！
     *
     * 该解码方法会根据传入的数据多次动态的调用！直到没有新的元素传入过来！
     * 若list out不为空，则将处理后的结果再次传递给下一个inboundHandler处理，
     * 该处理器也会根据数据量来判断动态的调用多次！
     *
     * @param ctx 上下文
     * @param in 入站的buf
     * @param out List集合，将解码后的数据传递给下一个inboundHandler处理
     * @throws Exception
     */
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {

        System.out.println("MyByteToLongDecoder decode被调用！");
        // 大于八个字节再进行处理
        if(in.readableBytes() >= 8){
            out.add(in.readLong());
        }
    }
}
```





### MyServerHandler



```java
public class MyServerHandler extends SimpleChannelInboundHandler<Long> {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Long msg) throws Exception {
        System.out.println("从客户端 " + ctx.channel().remoteAddress() + " 读取到Long：" + msg);

        // 服务端给客户端发送消息
        ctx.writeAndFlush(98765L);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        ctx.close();
    }
}
```



### MyClientHandler



```java
/**
 * 客户端和服务器端都是使用的InboundHandler：
 * 原因：为了监听对方发来的数据因此使用inbound。
 *      使用ctx.writeAndFlush写数据时其实底层就是一个outbound操作！
 *
 *      writeAndFlush：write(Object) and flush().
 *      ChannelOutboundInvoker flush(); flush方法就是outbound的！
 *
 *
 * @author ITNXD
 * @create 2021-10-30 10:59
 */
public class MyClientHandler extends SimpleChannelInboundHandler<Long> {


    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Long msg) throws Exception {

        // 接收服务器发来的消息
        System.out.println("服务器的地址：" + ctx.channel().remoteAddress());
        System.out.println("服务器的消息：" + msg);
    }

    /*
    MyLongToByteEncoder类的父类MessageToByteEncoder的write方法：
    @Override
    public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
        ByteBuf buf = null;
        try {
            if (acceptOutboundMessage(msg)) { // 判断msg是否是应该处理的类型
                @SuppressWarnings("unchecked")
                I cast = (I) msg;
                buf = allocateBuffer(ctx, cast, preferDirect);
                try {
                    encode(ctx, cast, buf); // 是就进行encode
                } finally {
                    ReferenceCountUtil.release(cast);
                }

                if (buf.isReadable()) {
                    ctx.write(buf, promise);
                } else {
                    buf.release();
                    ctx.write(Unpooled.EMPTY_BUFFER, promise);
                }
                buf = null;
            } else {
                ctx.write(msg, promise); // 不是就直接写回去
            }
        } catch (EncoderException e) {
            throw e;
        } catch (Throwable e) {
            throw new EncoderException(e);
        } finally {
            if (buf != null) {
                buf.release();
            }
        }
    }

    因此：编写的Encoder要注意传入的数据类型和处理的数据类型一致
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("MyClientHandler 发送数据...");
        ctx.writeAndFlush(123456L);
        // ctx.writeAndFlush(Unpooled.copiedBuffer("abcdabcdabcdabcd", CharsetUtil.UTF_8));
    }
}
```





## 5、解码器-ReplayingDecoder





1) `public abstract class ReplayingDecoder<S> extends ByteToMessageDecoder`
2) ReplayingDecoder 扩展了 ByteToMessageDecoder 类，使用这个类，我们不必调用 readableBytes()方法。参数 S 指定了用户状态管理的类型，其中 Void 代表不需要状态管理
3) ReplayingDecoder 使用方便，但它也有一些局限性：
  1) 并不是所有的 ByteBuf 操作都被支持，如果调用了一个不被支持的方法，将会抛出一个`UnsupportedOperationException`。
  2) ReplayingDecoder 在某些情况下可能稍慢于 ByteToMessageDecoder，例如网络缓慢并且消息格式复杂时，消息会被拆成了多个碎片，速度变慢



**应用实例：使用 ReplayingDecoder 编写解码器，对前面的案例进行简化**





```java
/**
 * ReplayingDecoder使用此父类可以自动完成数据字节判断！无需手动调用 readableBytes()方法
 *
 * @author ITNXD
 * @create 2021-10-30 13:46
 */
public class MyByteToLongDecoder2 extends ReplayingDecoder<Void> { // Void 代表不需要状态管理

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        System.out.println("MyByteToLongDecoder2 被调用");
        //在 ReplayingDecoder 不需要判断数据是否足够读取，内部会进行处理判断
        out.add(in.readLong());
    }
}
```





## 6、其它编解码器



### 解码器



1) LineBasedFrameDecoder：这个类在 Netty 内部也有使用，它使用行尾控制字符（\n 或者\r\n）作为分隔符来解析数据。
2) DelimiterBasedFrameDecoder：使用自定义的特殊字符作为消息的分隔符。
3) HttpObjectDecoder：一个 HTTP 数据的解码器
4) LengthFieldBasedFrameDecoder：通过指定长度来标识整包消息，这样就可以自动的处理黏包和半包消息。



### 编码器



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@376ac81b4e859790c4ec5a2ae3c4988c4fe84435/2021/11/02/e4cd29c6c3b5c31b1fdfcfd288e5c12f.png)





## 7、Netty 整合 Log4j





### pom.xml





```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.25</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.25</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>1.7.25</version>
    <scope>test</scope>
</dependency>
```



### properties



```properties
log4j.rootLogger=DEBUG, stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=[%p] %C{1} - %m%n
```







# 八、TCP 粘包和拆包及解决方案







## 1、TCP 粘包和拆包基本介绍



1) TCP 是面向连接的，面向流的，提供高可靠性服务。收发两端（客户端和服务器端）都要有一一成对的 socket，因此，发送端为了将多个发给接收端的包，更有效的发给对方，使用了优化方法（Nagle 算法），**将多次间隔较小且数据量小的数据，合并成一个大的数据块，然后进行封包**。这样做虽然提高了效率，但是接收端就难于分辨出完整的数据包了，因为面向流的通信是**无消息保护边界**的
2) 由于 TCP 无消息保护边界, 需要在接收端处理消息边界问题，也就是我们所说的粘包、拆包问题, 看一张图
3) 示意图 TCP 粘包、拆包图解



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@bcbde0a8fdc7dd88aacf4a5c5c61c69f4b9144b3/2021/11/02/b1ae04cfd60c4173f5cbfa607168a406.png)





**简单说明：**

假设客户端分别发送了两个数据包 D1 和 D2 给服务端，由于服务端一次读取到字节数是不确定的，故可能存在以下四种情况：
1) 服务端分两次读取到了两个独立的数据包，分别是 D1 和 D2，没有粘包和拆包
2) 服务端一次接受到了两个数据包，D1 和 D2 粘合在一起，称之为 TCP 粘包
3) 服务端分两次读取到了数据包，第一次读取到了完整的 D1 包和 D2 包的部分内容，第二次读取到了 D2 包的剩余内容，这称之为 TCP 拆包
4) 服务端分两次读取到了数据包，第一次读取到了 D1 包的部分内容 D1_1，第二次读取到了 D1 包的剩余部分内容 D1_2 和完整的 D2 包。



## 2、TCP 粘包和拆包现象实例



### MyServerHandler



```java
public class MyServerHandler extends SimpleChannelInboundHandler<ByteBuf> {

    private int count;

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ByteBuf msg) throws Exception {
        byte[] buffer = new byte[msg.readableBytes()];
        msg.readBytes(buffer);
        String s = new String(buffer, CharsetUtil.UTF_8);
        System.out.println("服务器端接收数据：" + s);
        System.out.println("服务器收到消息量：" + (++ count));

        // 服务器回复消息给客户端
        ByteBuf byteBuf = Unpooled.copiedBuffer(UUID.randomUUID().toString() + " ", CharsetUtil.UTF_8);
        ctx.writeAndFlush(byteBuf);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
```



### MyClientHandler

```java
public class MyClientHandler extends SimpleChannelInboundHandler<ByteBuf> {

    private int count;

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        // 客户端发送十条数据
        for (int i = 0; i < 10; i++) {
            ByteBuf byteBuf = Unpooled.copiedBuffer("hello,Server" + i + " ", CharsetUtil.UTF_8);
            ctx.writeAndFlush(byteBuf);
        }
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ByteBuf msg) throws Exception {
        // 处理服务器发来的消息
        byte[] buffer = new byte[msg.readableBytes()];
        ByteBuf byteBuf = msg.readBytes(buffer);
        String s = new String(buffer, CharsetUtil.UTF_8);
        System.out.println("客户端接收到消息：" + s);
        System.out.println("客户端接收消息数量：" + (++ count));
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
```







### 结果

客户端发送十条消息，服务器端的接收不是十次，而小于十次，且每次接收的数据量不一定！







## 3、TCP 粘包和拆包解决方案





**使用自定义协议 + 编解码器 来解决**

关键就是要解决服务器端每次读取数据长度的问题, 这个问题解决，就不会出现服务器多读或少读数据的问题，从而避免的 TCP 粘包、拆包 。





**实例要求：**

1) 要求客户端发送 5 个 Message 对象, 客户端每次发送一个 Message 对象
2) 服务器端每次接收一个 Message, 分 5 次进行解码， 每读取到 一个 Message , 会回复一个 Message 对象 给客户端



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@44cab141a7622b1491a6a7d6a2261f9f9de39cb5/2021/11/02/132713db68bc065c207912e0c855db16.png)







### MessageProtocol



自定义协议包！



```java
/**
 * 自定义协议包！
 *
 * @author ITNXD
 * @create 2021-10-30 15:00
 */
public class MessageProtocol {

    private int len;
    private byte[] content;

    public int getLen() {
        return len;
    }

    public void setLen(int len) {
        this.len = len;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }
}
```



### MyMessageDecoder



```java
public class MyMessageDecoder extends ReplayingDecoder<Void> {
    // 重写解码方法
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        System.out.println("MyMessageDecoder decode 被调用！");
        // 将 字节 转成 MessageProtocol
        int length = in.readInt();
        byte[] content = new byte[length];
        in.readBytes(content);

        // 交给下一个handler
        MessageProtocol messageProtocol = new MessageProtocol();
        messageProtocol.setLen(length);
        messageProtocol.setContent(content);

        out.add(messageProtocol);
    }
}
```



### MyMessageEncoder



```java
public class MyMessageEncoder extends MessageToByteEncoder<MessageProtocol> {
    @Override
    protected void encode(ChannelHandlerContext ctx, MessageProtocol msg, ByteBuf out) throws Exception {
        System.out.println("MyMessageEncoder encode 方法被调用！");
        out.writeInt(msg.getLen());
        out.writeBytes(msg.getContent());
    }
}
```



### MyServerHandler



```java
public class MyServerHandler extends SimpleChannelInboundHandler<MessageProtocol> {

    private int count;

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, MessageProtocol msg) throws Exception {

        // 接收客户端消息处理
        int len = msg.getLen();
        byte[] content = msg.getContent();

        System.out.println("服务器接受的信息：" + "长度 = " + len + " 内容 = "
                + new String(content, CharsetUtil.UTF_8));
        System.out.println("服务器接收到消息包数量：" + (++ count));

        // 服务器回复客户端消息
        String response = UUID.randomUUID().toString();
        byte[] responseContent = response.getBytes(CharsetUtil.UTF_8);
        int responseLen = responseContent.length;
        // 构建 协议包
        MessageProtocol messageProtocol = new MessageProtocol();
        messageProtocol.setLen(responseLen);
        messageProtocol.setContent(responseContent);

        ctx.writeAndFlush(messageProtocol);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
```



### MyClientHandler



```java
public class MyClientHandler extends SimpleChannelInboundHandler<MessageProtocol> {

    private int count;

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        // 客户端发送十条数据 "今天天气冷，吃火锅"

        for (int i = 0; i < 5; i++) {
            String msg = "今天天气冷，吃火锅";
            byte[] content = msg.getBytes(CharsetUtil.UTF_8);
            int length = content.length;

            // 创建协议包
            MessageProtocol messageProtocol = new MessageProtocol();
            messageProtocol.setLen(length);
            messageProtocol.setContent(content);
            ctx.writeAndFlush(messageProtocol);
        }
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, MessageProtocol msg) throws Exception {
        // 处理服务器发来的消息
        int len = msg.getLen();
        byte[] content = msg.getContent();
        System.out.println("客户端接收到消息：" + "长度 = " + len + " 内容 = "
                + new String(content, CharsetUtil.UTF_8));
        System.out.println("客户单收到的消息包数量：" + (++ count));
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
```





# 九、Netty 核心源码剖析



## 1、Netty 启动过程



1) 创建 2 个 EventLoopGroup 线程池数组。数组默认大小 CPU*2，方便 chooser 选择线程池时提高性能
2) BootStrap 将 boss 设置为 group 属性，将 worker 设置为 childer 属性
3) 通过 bind 方法启动，内部重要方法为 initAndRegister 和 dobind 方法
4) initAndRegister 方法会反射创建 NioServerSocketChannel 及其相关的 NIO 的对象， pipeline ， unsafe，同时也为 pipeline 初始了 head 节点和 tail 节点。
5) 在 register0 方法成功以后调用在 dobind 方法中调用 doBind0 方法，该方法会 调用 NioServerSocketChannel的 doBind 方法对 JDK 的 channel 和端口进行绑定，完成 Netty 服务器的所有启动，并开始监听连接事件



## 2、Netty 接受请求过程







**EventLoop 的作用是一个死循环，而这个循环中做 3 件事情：**

1) 有条件的等待 Nio 事件。
2) 处理 Nio 事件。
3) 处理消息队列中的任务。
4) 仍用前面的项目来分析：进入到 NioEventLoop 源码中后，在 private void processSelectedKey(SelectionKey k, AbstractNioChannel ch) 方法开始调试最终我们要分析到 AbstractNioChannel 的 doBeginRead 方法， 当到这个方法时，针对于这个客户端的连接就完成了，接下来就可以监听读事件了



**总体流程：接受连接----->创建一个新的 NioSocketChannel----------->注册到一个 worker EventLoop 上--------> 注册 selecot Read 事件：**

1) 服务器轮询 Accept 事件，获取事件后调用 unsafe 的 read 方法，这个 unsafe 是 ServerSocket 的内部类，该方法内部由 2 部分组成
2) doReadMessages 用于创建 NioSocketChannel 对象，该对象包装 JDK 的 Nio Channel 客户端。该方法会像创建 ServerSocketChanel 类似创建相关的 pipeline ， unsafe，config
3) 随后执行 执行 pipeline.fireChannelRead 方法，并将自己绑定到一个 chooser 选择器选择的 workerGroup 中的一个 EventLoop。并且注册一个 0，表示注册成功，但并没有注册读（1）事件







## 3、Pipeline Handler HandlerContext 创建



**ChannelPipeline | ChannelHandler | ChannelHandlerContext 介绍**



**三者关系**

1) 每当 ServerSocket 创建一个新的连接，就会创建一个 Socket，对应的就是目标客户端。
2) 每一个新创建的 Socket 都将会分配一个全新的 ChannelPipeline（以下简称 pipeline）
3) 每一个 ChannelPipeline 内部都含有多个 ChannelHandlerContext（以下简称 Context）
4) 他们一起组成了双向链表，这些 Context 用于包装我们调用 addLast 方法时添加的 ChannelHandler（以下简称handler）



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@15a7f7a4872d52f12b8d7c1c55032a9434282218/2021/11/02/f2ec3adf77275539ca1b81bab951f2da.png)



1) 上图中：ChannelSocket 和 ChannelPipeline 是一对一的关联关系，而 pipeline 内部的多个 Context 形成了链表，Context 只是对 Handler 的封装。
2) 当一个请求进来的时候，会进入 Socket 对应的 pipeline，并经过 pipeline 所有的 handler，对，就是设计模式中的过滤器模式。





**pipeline 的接口设计**



该接口继承了 inBound，outBound，Iterable 接口，表示他可以调用**数据出站的方法和入站的方法**，同时也能遍历内部的链表， 看看他的几个代表性的方法，基本上都是针对 handler 链表的插入，追加，删除，替换操作，类似是一个 LinkedList。同时，也能返回 channel（也就是 socket）





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@fbd55b2d7a0025b626168d7f79475fa2cf103f45/2021/11/02/606381a96a916fd83c796f0905c1002d.png)





**对上图说明：**



* 这是一个 handler 的 list，handler 用于处理或拦截入站事件和出站事件，pipeline 实现了过滤器的高级形式，以便用户控制事件如何处理以及 handler 在 pipeline 中如何交互。
* 上图描述了一个典型的 handler 在 pipeline 中处理 I/O 事件的方式，IO 事件由 inboundHandler 或者outBoundHandler 处理，并通过调用 ChannelHandlerContext.fireChannelRead 方法转发给其最近的处理程序 。

* 入站事件由入站处理程序以自下而上的方向处理，如图所示。入站处理程序通常处理由图底部的 I / O 线程生成入站数据。入站数据通常从如 SocketChannel.read(ByteBuffer) 获取。
* **通常一个 pipeline 有多个 handler**，例如，一个典型的服务器在每个通道的管道中都会有以下处理程序
  * 协议解码器 - 将二进制数据转换为 Java 对象。
  * 协议编码器 - 将 Java 对象转换为二进制数据。
  * 业务逻辑处理程序 - **执行实际业务逻辑**（例如数据库访问）
* 你的业务程序不能将线程阻塞，会影响 IO 的速度，进而影响整个 Netty 程序的性能。如果你的业务程序很快，就可以放在 IO 线程中，反之，你需要异步执行。或者在添加 handler 的时候添加一个线程池，例如：

```java
// 下面这个任务执行的时候，将不会阻塞 IO 线程，执行的线程来自 group 线程池
pipeline.addLast(group，“handler”，new MyBusinessLogicHandler());
```





**ChannelHandler设计：**



ChannelHandler 的作用就是处理 IO 事件或拦截 IO 事件，并将其**转发给下一个**处理程序 ChannelHandler。Handler 处理事件时分入站和出站的，两个方向的操作都是不同的，因此，Netty 定义了两个子接口继承 ChannelHandler

- ChannelInboundHandler 入站事件接口
- ChannelDuplexHandler 处理出站和入站事件
- ChannelOutboundHandler 出站事件接口



**ChannelHandlerContext 设计：**



继承了 ChannelOutboundInvoker 和 ChannelInboundInvoker ，这两个 invoker 就是针对入站或出站方法来的，就是在 入站或出站 handler 的外层再包装一层，达到在方法前后拦截并做一些特定操作的目的。



* ChannelHandlerContext 不仅仅时继承了他们两个的方法，同时也定义了一些自己的方法
* 这些方法能够获取 Context 上下文环境中对应的比如 channel，executor，handler ，pipeline，内存分配器，关联的 handler 是否被删除。
* Context 就是包装了 handler 相关的一切，以方便 Context 可以在 pipeline 方便的操作 handler



**创建过程：**

* 任何一个 ChannelSocket 创建的同时都会创建 一个 pipeline。
* 当用户或系统内部调用 pipeline 的 add*** 方法添加 handler 时，都会创建一个包装这 handler 的 Context。
* 这些 Context 在 pipeline 中组成了**双向链表**。



**小总结：**

1) 每当创建 ChannelSocket 的时候都会创建一个绑定的 pipeline，一对一的关系，创建 pipeline 的时候也会创建tail 节点和 head 节点，形成最初的链表。
2) 在调用 pipeline 的 addLast 方法的时候，会根据给定的 handler 创建一个 Context，然后，将这个 Context 插入到链表的尾端（**tail 前面**）。
3) Context 包装 handler，多个 Context 在 pipeline 中形成了双向链表
4) 入站方向叫 inbound，由 head 节点开始，出站方法叫 outbound ，由 tail 节点开始







## 4、ChannelPipeline 调度 handler



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5b738e0afaebb59cf6e1dfa6f16e105896184b16/2021/11/02/1050ce24498ae2acddaa96d7b5a3d14d.png)



**简单说明：**

1) pipeline 首先会调用 Context 的静态方法 fireXXX，并传入 Context
2) 然后，静态方法调用 Context 的 invoker 方法，而 invoker 方法内部会调用该 Context 所包含的Handler 的真正的 XXX 方法，调用结束后，如果还需要继续向后传递，就调用 Context 的 fireXXX2 方法，循环往复。



**小总结：**



1) Context 包装 handler，多个 Context 在 pipeline 中形成了**双向链表**，入站方向叫 inbound，由 head 节点开始，出站方法叫 outbound ，由 tail 节点开始。
2) 而节点中间的传递通过 AbstractChannelHandlerContext 类内部的 fire 系列方法，找到当前节点的下一个节点不断的循环传播。是一个过滤器形式完成对 handler 的调度





## 5、Netty 心跳(heartbeat)服务



> Netty 作为一个网络框架，提供了诸多功能，比如编码解码等，Netty 还提供了非常重要的一个服务-----心跳机制 heartbeat。通过心跳检查对方是否有效，这是 RPC 框架中是必不可少的功能。



Netty 提供了 IdleStateHandler ，ReadTimeoutHandler，WriteTimeoutHandler 三个 Handler 检测连接的有效性：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d84049983dae5d1594177a008d268d49069790bc/2021/11/02/6955953b1322d137a874992f6fa99a44.png)





**小总结：**

1) IdleStateHandler 可以实现心跳功能，当服务器和客户端没有任何读写交互时，并超过了给定的时间，则会触发用户 handler 的 userEventTriggered 方法。用户可以在这个方法中尝试向对方发送信息，如果发送失败，则关闭连接。
2) IdleStateHandler 的实现基于 EventLoop 的**定时任务**，每次读写都会记录一个值，在定时任务运行的时候，通过计算当前时间和设置时间和上次事件发生时间的结果，来判断是否空闲。
3) 内部有 3 个定时任务，分别对应**读事件，写事件，读写事件**。通常用户监听读写事件就足够了。
4) 同时，IdleStateHandler 内部也考虑了一些极端情况：客户端接收缓慢，一次接收数据的速度超过了设置的空闲时间。Netty 通过构造方法中的 observeOutput 属性来决定是否对出站缓冲区的情况进行判断。
5) 如果出站缓慢，Netty 不认为这是空闲，也就不触发空闲事件。但第一次无论如何也是要触发的。因为第一次无法判断是出站缓慢还是空闲。当然，出站缓慢的话，可能造成 OOM , OOM 比空闲的问题更大。
6) 所以，当你的应用出现了内存溢出，OOM 之类，并且写空闲极少发生（使用了 observeOutput 为 true），那么就需要注意是不是数据出站速度过慢。
7) 还有一个注意的地方：就是 ReadTimeoutHandler ，它继承自 IdleStateHandler，当触发读空闲事件的时候，就触发 ctx.fireExceptionCaught 方法，并传入一个 ReadTimeoutException，然后关闭 Socket。
8) 而 WriteTimeoutHandler 的实现不是基于 IdleStateHandler 的，他的原理是，当调用 write 方法的时候，会创建一个定时任务，任务内容是根据传入的 promise 的完成情况来判断是否超出了写的时间。当定时任务根据指定时间开始运行，发现 promise 的 isDone 方法返回 false，表明还没有写完，说明超时了，则抛出异常。当 write方法完成后，会打断定时任务。





## 6、Netty 核心组件 EventLoop





### 示意图

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@74c274f46b86a3a47cf5b6282c1d61709ffefd7a/2021/11/02/bf96f8d22eb8d6ad8580fa1aaf30b524.png)





**简单说明：**

1) ScheduledExecutorService 接口表示是一个定时任务接口，**EventLoop 可以接受定时任务**。
2) EventLoop 接口：Netty 接口文档说明该接口作用：一旦 Channel 注册了，就处理该 Channel 对应的所有I/O 操作。
3) SingleThreadEventExecutor 表示这是一个单个线程的线程池
4) EventLoop 是一个单例的线程池，里面含有一个死循环的线程不断的做着 3 件事情：**监听端口，处理端口事件，处理队列事件**。每个 EventLoop 都可以绑定多个 Channel，而每个 Channel 始终只能由一个 EventLoop 来处理



**小总结：**

1) 每次执行 ececute 方法都是向队列中添加任务。当第一次添加时就启动线程，执行 run 方法，而 run 方法是整个 EventLoop 的核心，就像 EventLoop 的名字一样，Loop Loop ，不停的 Loop ，Loop 做什么呢？做 3 件事情。
  1) 调用 selector 的 select 方法，默认阻塞一秒钟，如果有定时任务，则在定时任务剩余时间的基础上在加上 0.5秒进行阻塞。当执行 execute 方法的时候，也就是添加任务的时候，唤醒 selecor，防止 selecotr 阻塞时间过长。
  2) 当 selector 返回的时候，回调用 processSelectedKeys 方法对 selectKey 进行处理。
  3) 当 processSelectedKeys 方法执行结束后，则按照 ioRatio 的比例执行 runAllTasks 方法，默认是 IO 任务时间和非 IO 任务时间是相同的，你也可以根据你的应用特点进行**调优** 。比如 非 IO 任务比较多，那么你就将ioRatio 调小一点，这样非 IO 任务就能执行的长一点。防止队列积攒过多的任务。





## 7、handler 中加入线程池和 Context 中添加线程池



1) 在 Netty 中做耗时的，不可预料的操作，比如数据库，网络请求，会严重影响 Netty 对 Socket 的处理速度。
2) 而解决方法就是将耗时任务添加到异步线程池中。但就添加线程池这步操作来讲，可以有 2 种方式，而且这 2 种方式实现的区别也蛮大的。
  3) 处理耗时业务的第一种方式---handler 中加入线程池
  2) 处理耗时业务的第二种方式---Context 中添加线程池



**handler 中加入线程池：**

1) 当 IO 线程轮询到一个 socket 事件，然后，IO 线程开始处理，当走到耗时 handler 的时候，将耗时任务交给业务线程池。
2) 当耗时任务执行完毕再执行 pipeline write 方法的时候 ，会将任务这个任务交给 IO 线程

```java
@Sharable
public class EchoServerHandler extends ChannelInboundHandlerAdapter {

    static final EventExecutorGroup group = new DefaultEventExecutorGroup(16);
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws UnsupportedEncodingException, InterruptedException {
        final Object msgCop = msg;
        final ChannelHandlerContext cxtCop = ctx;
        group.submit(new Callable<Object>() {
            @Override
            public Object call() throws Exception {
                ByteBuf buf = (ByteBuf) msgCop;
                byte[] req = new byte[buf.readableBytes()];
                buf.readBytes(req);
                String body = new String(req, "UTF-8");
                Thread.sleep(10*1000);
                System.err.println(body + " " + Thread.currentThread().getName());
                String reqString = "Hello i am server~~~";
                ByteBuf resp = Unpooled.copiedBuffer(reqString.getBytes());
                cxtCop.writeAndFlush(resp);
                return null;
            }
        });
        System.out.println("go on ..");
    }
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        ctx.flush();
    }
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised. cause.printStackTrace();
        ctx.close();
    }
}
```



**Context 中添加线程池：**

1) handler 中的代码就使用普通的方式来处理耗时业务。
2) 当我们在调用 addLast 方法添加线程池后，handler 将优先使用这个线程池，如果不添加，将使用 IO 线程
3) 当走到 AbstractChannelHandlerContext 的 invokeChannelRead 方法的时候，executor.inEventLoop() 是不会通过的，因为当前线程是 IO 线程， Context（也就是 Handler）的 executor 是业务线程，所以会异步执行





```java
static final EventExecutorGroup group = new DefaultEventExecutorGroup(16);
ServerBootstrap b = new ServerBootstrap();
b.group(bossGroup, workerGroup)
    .channel(NioServerSocketChannel.class)
    .option(ChannelOption.SO_BACKLOG, 100)
    .handler(new LoggingHandler(LogLevel.INFO))
    .childHandler(new ChannelInitializer<SocketChannel>() {
        @Override
        public void initChannel(SocketChannel ch) throws Exception {
            ChannelPipeline p = ch.pipeline();
            if (sslCtx != null) {
                p.addLast(sslCtx.newHandler(ch.alloc()));
            }
            //p.addLast(new LoggingHandler(LogLevel.INFO));
            //p.addLast(new EchoServerHandler());
            p.addLast(group,new EchoServerHandler() );
        }
    });
```





**小总结：**

1) 第一种方式在 handler 中添加异步，可能更加的自由，比如如果需要访问数据库，那我就异步，如果不需要，就不异步，异步会拖长接口响应时间。因为需要将任务放进 mpscTask 中。如果 IO 时间很短，task 很多，可能一个循环下来，都没时间执行整个 task，导致响应时间达不到指标。
2) 第二种方式是 Netty 标准方式(即加入到队列)，但是，这么做会将整个 handler 都交给业务线程池。不论耗时不耗时，都加入到队列里，不够灵活。
3) 各有优劣，从灵活性考虑，第一种较好





# 十、用 Netty 实现 dubbo RPC



## 1、RPC 基本介绍





1) RPC（Remote Procedure Call）— 远程过程调用，是一个计算机通信协议。该协议允许运行于一台计算机的程序调用另一台计算机的子程序，而程序员无需额外地为这个交互作用编程
2) 两个或多个应用程序都分布在不同的服务器上，它们之间的调用都像是本地方法调用一样
3) 常见的 RPC 框架有: 比较知名的如阿里的Dubbo、google的gRPC、Go语言的rpcx、Apache的thrift，Spring 旗下的 Spring Cloud。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@06497d709d8ffd1f2320a97fbee37b4ce57b5049/2021/11/02/876c4573ae04b62337d097e492293bf0.png)





## 2、RPC 调用流程图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@410464c89b196822d87d301b1dcde2f59fad79e9/2021/11/02/61d239ad2734fcc7db36472446dc2749.png)





## 3、PRC 调用流程说明



RPC 的目标就是将 2-8 这些步骤都封装起来，用户无需关心这些细节，可以像调用本地方法一样即可完成远程服务调用：



1) **服务消费方(client)以本地调用方式调用服务**
2) client stub 接收到调用后负责将方法、参数等封装成能够进行网络传输的消息体
3) client stub 将消息进行编码并发送到服务端
4) server stub 收到消息后进行解码
5) server stub 根据解码结果调用本地的服务
6) 本地服务执行并将结果返回给 server stub
7) server stub 将返回导入结果进行编码并发送至消费方
8) client stub 接收到消息并进行解码
9) **服务消费方(client)得到结果**



## 4、基于 Netty 实现 dubbo RPC



### 需求说明

1) dubbo 底层使用了 Netty 作为网络通讯框架，要求用 Netty 实现一个简单的 RPC 框架
2) 模仿 dubbo，消费者和提供者约定接口和协议，消费者远程调用提供者的服务，提供者返回一个字符串，消费者打印提供者返回的数据。底层网络通信使用 Netty 4.1.20



### 设计说明

1) 创建一个接口，定义抽象方法。用于消费者和提供者之间的约定。
2) 创建一个提供者，该类需要监听消费者的请求，并按照约定返回数据。
3) 创建一个消费者，该类需要透明的调用自己不存在的方法，内部需要使用 Netty 请求提供者返回数据
4) 开发的分析图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2285b1db006dc7f95e873b9c16e5edeeea0d56a1/2021/11/02/b12f41f724594ce202cdcab7f8fa3c70.png)



### 代码实现



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@204b4ecad617e90f6c323d9ffd183de35d786b80/2021/11/02/c40f83aea610be4b96a3cd70d459ee35.png)



#### HelloService

```java
public interface HelloService {

    String hello(String msg);
}
```



#### HelloServiceImpl

```java
public class HelloServiceImpl implements HelloService {

    private static int count = 0;

    // 当消费方调用该方法时就返回一个结果
    @Override
    public String hello(String msg) {
        System.out.println("收到客户端消息：" + msg);
        // 根据msg返回不同结果
        if(msg != null){
            return "你好，客户端，我已经收到你的消息：" + msg + " 第 " + (++count) + "次";
        }else{
            return "你好，客户端，我已经收到你的消息：";
        }
    }
}
```



#### ServerBootstrap

```java
/**
 * 用来启动服务提供者，即nettyServer
 *
 * @author ITNXD
 * @create 2021-11-01 9:29
 */
public class ServerBootstrap {

    public static void main(String[] args) {
        NettyServer.startServer("127.0.0.1", 6666);
    }
}
```



#### NettyServer

```java
public class NettyServer {

    // 包一层
    public static void startServer(String hostname, int port){
        startServer0(hostname, port);
    }

    // 完成对nettyServer的启动！
    private static void startServer0(String hostname, int port){
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {

            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            // 编解码器
                            pipeline.addLast(new StringDecoder());
                            pipeline.addLast(new StringEncoder());
                            // 自定义处理器
                            pipeline.addLast(new NettyServerHandler());
                        }
                    });
            ChannelFuture channelFuture = serverBootstrap.bind(hostname, port).sync();
            System.out.println("服务提供方开始提供服务....");
            channelFuture.channel().closeFuture().sync();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```



#### NettyServerHandler



```java
public class NettyServerHandler extends ChannelInboundHandlerAdapter {

    // 获取客户端发送消息，并调用服务
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("msg = " + msg);
        // 客户端在调用服务器api时，需要满足我们的规范（协议）
        // 比如每次发送消息都要以：HelloService#hello# 开头 HelloService#hello#你好
        if(msg.toString().startsWith("HelloService#hello#")){
            String res = new HelloServiceImpl().hello(msg.toString().substring(msg.toString().lastIndexOf("#") + 1));
            ctx.writeAndFlush(res);
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
```



#### NettyClient



**基于动态代理实现！**



```java
public class NettyClient {

    // 创建线程池
    private static ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
    private static NettyClientHandler client;
    private int count = 0;

    /**
     * 编写代理方法获取代理对象!
     *
     * @param serviceClass
     * @param providerName
     * @return
     */
    public Object getBean(final Class<?> serviceClass, final String providerName){
        return Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(),
                new Class[] {serviceClass}, (proxy, method, args) -> {

            System.out.println("(proxy, method, args) 被调用 " + (++count));


            // 客户单每调用一次hello，就会进入该代码
            if(client == null){
                initClient();
            }
            /*
             设置要发给服务器端的消息
             providerName：约定好的协议头
             args[0]：客户端调用的 hello(???)的参数
             */
            client.setParam(providerName + args[0]);

            // 提交client处理器到线程池执行，执行完毕get方法（阻塞的）返回服务器端处理的结果result
            return executor.submit(client).get();
        });
    }

    // 初始化客户端
    private static void initClient(){
        client = new NettyClientHandler();

        NioEventLoopGroup group = new NioEventLoopGroup();
        Bootstrap bootstrap = new Bootstrap();
        bootstrap.group(group).channel(NioSocketChannel.class)
                .option(ChannelOption.TCP_NODELAY, true)
                .handler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    protected void initChannel(SocketChannel ch) throws Exception {
                        ChannelPipeline pipeline = ch.pipeline();
                        // 添加编解码器
                        pipeline.addLast(new StringDecoder());
                        pipeline.addLast(new StringEncoder());
                        // 添加自定义处理器
                        pipeline.addLast(client);
                    }
                });
        try {
            bootstrap.connect("127.0.0.1", 6666).sync();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```



#### NettyClientHandler



使用synchronized进行线程间通信，得到返回结果时候唤醒线程返回服务器结果！



```java
public class NettyClientHandler extends ChannelInboundHandlerAdapter implements Callable {

    private ChannelHandlerContext context; // 上下文
    private String result; // 客户端调用方法时返回的结果
    private String param; // 客户端调用方法时的参数

    // 1
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("channelActive 被调用");

        // 其他方法会使用到当前handler的ctx
        context = ctx;
    }

    // 4 同步方法：最主要的作用是用于线程间的通信（channelRead 和 call）
    @Override
    public synchronized void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("channelRead 被调用");

        result = msg.toString();
        // 唤醒等待的线程
        notify();
    }

    // 3 5 被代理对象调用，发送数据给服务器，wait 等待被channelRead唤醒 返回结果
    @Override
    public synchronized Object call() throws Exception {
        System.out.println("call-1 被调用");

        // 将客户端远程调用的东西发给服务器端处理
        context.writeAndFlush(param);
        // wait阻塞等待服务器返回结果
        wait();
        // 服务器返回结果被channelRead唤醒后，返回服务器端返回的结果

        System.out.println("call-2 被调用");
        return result;
    }

    // 6
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }

    // 2 客户单代理对象用于设置发送服务器的数据
    public void setParam(String param){
        System.out.println("setParam 被调用");

        this.param = param;
    }
}
```



#### ClientBootstrap

```java
public class ClientBootstrap {

    // 定义协议头
    private static final String providerName = "HelloService#hello#";

    public static void main(String[] args) throws InterruptedException {
        // 创建消费者
        NettyClient consumer = new NettyClient();
        // 创建代理对象
        HelloService helloService = (HelloService) consumer.getBean(HelloService.class, providerName);

        while(true) {
            TimeUnit.SECONDS.sleep(10);
            // 通过代理对象调用服务提供者的服务
            String res = helloService.hello("你好，dubbo！");
            System.out.println("调用的结果 res = " + res);
        }
    }
}
```
