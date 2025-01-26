---
title: 处理线程的工具包、JUC并发编程
author: ITNXD
toc: true
abbrlink: 63819
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/1d57ced3775c11d0e1c2f25bcd3b1f33.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/1d57ced3775c11d0e1c2f25bcd3b1f33.png
categories:
  - 并发编程
tags:
  - JUC
date: 2021-10-24 16:40:49
updated:
---





# 一、JUC概述



> **推荐博客：[https://blog.csdn.net/TZ845195485/article/details/109210095**](https://blog.csdn.net/TZ845195485/article/details/109210095)



## 1、JUC简介





在 Java 中，线程部分是一个重点，本篇文章说的 JUC 也是关于线程的。JUC就是 java.util .concurrent 工具包的简称。这是一个处理线程的工具包，JDK 
1.5 开始出现的。





## 2、进程和线程



**进程（Process）** 是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。 在当代面向线程设计的计算机结构中，进程是线程的容器。程序是指令、数据及其组织形式的描述，进程是程序的实体。



**线程（thread）** 是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程并行执行不同的任务。





**总结来说：**

- 进程：指在系统中正在运行的一个应用程序；程序一旦运行就是进程；**进程——资源分配的最小单位**。
- 线程：系统分配处理器时间资源的基本单元，或者说进程之内独立执行的一个单元执行流。**线程——程序执行的最小单位**。



## 3、线程的状态



**Thread.State**



```java
public enum State {
    	/**
        * Thread state for a thread which has not yet started.
        */
    	NEW,(新建)
        /**
        * Thread state for a runnable thread. A thread in the runnable
        * state is executing in the Java virtual machine but it may
        * be waiting for other resources from the operating system
        * such as processor.
        */
        RUNNABLE,（准备就绪）
        /**
        * Thread state for a thread blocked waiting for a monitor lock.
        * A thread in the blocked state is waiting for a monitor lock
        * to enter a synchronized block/method or
        * reenter a synchronized block/method after calling
        * {@link Object#wait() Object.wait}.
        */
        BLOCKED,（阻塞）
        /**
        * Thread state for a waiting thread.
        * A thread is in the waiting state due to calling one of the
        * following methods:
        * <ul>
        * <li>{@link Object#wait() Object.wait} with no timeout</li>
        * <li>{@link #join() Thread.join} with no timeout</li>
        * <li>{@link LockSupport#park() LockSupport.park}</li>
        * </ul>
        *
        * <p>A thread in the waiting state is waiting for another thread to
        * perform a particular action.
        *
        * For example, a thread that has called <tt>Object.wait()</tt>
        * on an object is waiting for another thread to call
        * <tt>Object.notify()</tt> or <tt>Object.notifyAll()</tt> on
        * that object. A thread that has called <tt>Thread.join()</tt>
        * is waiting for a specified thread to terminate.
        */
        WAITING,（不见不散）
        /**
        * Thread state for a waiting thread with a specified waiting time.
        * A thread is in the timed waiting state due to calling one of
        * the following methods with a specified positive waiting time:
        * <ul>
        * <li>{@link #sleep Thread.sleep}</li>* <li>{@link Object#wait(long) Object.wait} with timeout</li>
        * <li>{@link #join(long) Thread.join} with timeout</li>
        * <li>{@link LockSupport#parkNanos LockSupport.parkNanos}</li>
        * <li>{@link LockSupport#parkUntil LockSupport.parkUntil}</li>
        * </ul>
        */
        TIMED_WAITING,（过时不候）
        /**
        * Thread state for a terminated thread.
        * The thread has completed execution.
        */
        TERMINATED;(终结)
}
```





## 4、wait与sleep





- sleep 是 Thread 的静态方法，wait 是 Object 的方法，任何对象实例都能调用。
- sleep 不会释放锁，它也不需要占用锁。wait 会释放锁，但调用它的前提是当前线程占有锁(即代码要在 synchronized 中)。
- 它们都可以被 interrupted 方法中断。





## 5、并发与并行 



### 串行模式

串行表示所有任务都一一按先后顺序进行。串行意味着必须先装完一车柴才能运送这车柴，只有运送到了，才能卸下这车柴，并且只有完成了这整个三个步
骤，才能进行下一个步骤。串行是一次只能取得一个任务，并执行这个任务。



### 并行模式 

并行意味着可以同时取得多个任务，并同时去执行所取得的这些任务。并行模式相当于将长长的一条队列，划分成了多条短队列，所以并行缩短了任务队列的长度。并行的效率从代码层次上强依赖于多进程/多线程代码，从硬件角度上则依赖于**多核 CPU**。



### 并发模式



并发(concurrent)指的是多个程序可以同时运行的现象，更细化的是多进程可以同时运行或者多指令可以同时运行。



对于单核心 CPU 来说，同一时刻只能运行一个线程。所以，这里的"同时运行"表示的不是真的同一时刻有多个线程运行的现象，这是并行的概念，而是提供一种功能让用户看来多个程序同时运行起来了，但实际上这些程序中的进程不是一直霸占 CPU 的，而是执行一会停一会。







### 并发并行区别



- 并发是指**一个处理器同时处理多个任务**。
- 并行是指**多个处理器或者是多核的处理器同时处理多个不同的任务**。
- 并发是逻辑上的同时发生（simultaneous），而并行是物理上的同时发生。
- 来个比喻：并发是一个人同时吃三个馒头，而并行是三个人同时吃三个馒头。





并行在多处理器系统中存在，而并发可以在单处理器和多处理器系统中都存在，并发能够在单处理器系统中存在是因为并发是并行的假象，并行要求程序能够同时执行多个操作，而并发只是要求程序假装同时执行多个操作（每个小时间片执行一个操作，多个操作快速切换执行）。





## 6、管程





**管程(monitor)是保证了同一时刻只有一个进程在管程内活动**

即管程内定义的操作在同一时刻只被一个进程调用(由编译器实现)，但是这样并不能保证进程以设计的顺序执行，JVM中同步是基于进入和退出管程(monitor)对象实现的，每个对象都会有一个管程(monitor)对象，管程(monitor)会随着 java 对象一同创建和销毁执行线程首先要持有管程对象，然后才能执行方法，当方法完成之后会释放管程，方法在执行时候会持有管程，其他线程无法再获取同一个管程





## 7、用户线程和守护线程 





- **用户线程**：平时用到的普通线程，自定义线程
- **守护线程**：运行在后台,是一种特殊的线程，比如垃圾回收
- 当主线程结束后，用户线程还在运行，JVM 存活
- 如果没有用户线程，都是守护线程，JVM 结束



```java
public class Main {

    /**
     * 当主线程结束后,用户线程还在运行,JVM 存活
     * 如果没有用户线程,都是守护线程,JVM 结束
     *
     * 由于线程执行顺序不一定，因此可能会发生设置为守护线程后没有打印aa的信息，
     * 也可能打印aa的信息！
     * @param args
     */
    public static void main(String[] args) {
        Thread aa = new Thread(() -> {
            // 用户线程
            System.out.println(Thread.currentThread().getName() + "*****"
                    + Thread.currentThread().isDaemon());
            while (true) ;
        }, "aa");

        // 设置为守护线程 jvm结束（因为没有用户线程）
        aa.setDaemon(true);
        // 创建线程
        aa.start();

        // 主线程（守护线程）
        System.out.println(Thread.currentThread().getName() + "========over");
    }
}
```









# 二、Lock接口







## 0、Synchronized



**synchronized 是 Java 中的关键字，是一种同步锁。它修饰的对象有以下几种：**



1. 修饰一个代码块，被修饰的代码块称为同步语句块，其作用的范围是大括号{}括起来的代码，作用的对象是调用这个代码块的对象；

2. 修饰一个方法，被修饰的方法称为同步方法，其作用的范围是整个方法，作用的对象是调用这个方法的对象；
  1. 虽然可以使用 synchronized 来定义方法，但 synchronized 并不属于方法定义的一部分，因此，synchronized 关键字不能被继承。
  2. 如果在父类中的某个方法使用了 synchronized 关键字，而在子类中覆盖了这个方法，在子类中的这个方法默认情况下并不是同步的，而必须显式地在子类的这个方法中加上synchronized 关键字才可以。
  3. 当然，还可以在子类方法中调用父类中相应的方法，这样虽然子类中的方法不是同步的，但子类调用了父类的同步方法，因此，子类的方法也就相当于同步了。
3. 修改一个静态的方法，其作用的范围是整个静态方法，作用的对象是这个类的所有对象；
4. 修改一个类，其作用的范围是 synchronized 后面括号括起来的部分，作用主的对象是这个类的所有对象。





**synchronized实现同步的基础:**

- Java中的每一个对象都可以作为锁。具体表现为以下3种形式。
- 对于普通同步方法，锁是当前实例对象。
- 对于静态同步方法，锁是当前类的class对象。
- 对于同步方法块，锁是synchronized括号里配置的对象



**synchronized实现卖票：**



```java
class Ticket{
    private int num = 30;

    public synchronized void sale(){
        if(num > 0){
            System.out.println(Thread.currentThread().getName()+"：当前票数"+num--
                    + "：剩余"+num);
        }
    }
}

public class SaleTicket {

    public static void main(String[] args) {
        Ticket ticket = new Ticket();
        // 三个线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 40; i++) {
                    ticket.sale();
                }
            }
        }, "AA").start();
        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 40; i++) {
                    ticket.sale();
                }
            }
        }, "BB").start();
        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 40; i++) {
                    ticket.sale();
                }
            }
        }, "CC").start();
    }
}
```













## 1、Lock接口介绍



Lock 锁实现提供了比使用同步方法和语句可以获得的更广泛的锁操作。它们允许更灵活的结构，可能具有非常不同的属性，并且可能支持多个关联的条件对
象。Lock 提供了比 synchronized 更多的功能。



为锁和等待条件提供一个框架的接口和类，不同于内置同步和监视器， LOCK是类，可通过类实现同步访问，多个接口实现类：可重入锁等!

**lock的编程步骤同synchronized**

1. 创建资源类，在资源类中船舰属性和操作方法
2. 创建多个线程，调用资源类的操作方法



**Lock 与 Synchronized 区别：**

- Lock 不是 Java 语言内置的，synchronized 是 Java 语言的关键字，因此是内置特性。Lock 是一个类，通过这个类可以实现同步访问；
- Lock 和 synchronized 有一点非常大的不同，采用 synchronized 不需要用户去手动释放锁，当 synchronized 方法或者 synchronized 代码块执行完之后，系统会自动让线程释放对锁的占用；而 Lock 则必须要用户去手动释放锁，如果没有主动释放锁，就有可能导致出现死锁现象。





**可重入锁的代码定义private final ReentrantLock lock = new ReentrantLock(true);**

- 上锁lock.lock()
- 解锁lock.unlock()

上锁与解锁中的代码如果出现异常，解锁会执行不了，所以最好加`try..finally`



## 2、Lock方法



**Lock接口中的方法：**



```java
public interface Lock {
	void lock();
	void lockInterruptibly() throws InterruptedException;
	boolean tryLock();
	boolean tryLock(long time, TimeUnit unit) throws InterruptedException;
	void unlock();
	Condition newCondition();
}
```



**`lock()`方法用来获取锁**

- 如果锁已被其他线程获取，则进行等待
- 发生异常不会自动解锁，需用在 try{}catch{}块中进行

**Condition 类也可以实现等待/通知模式**

关键字 synchronized 与 wait()/notify()这两个方法一起使用可以实现等待/通知模式，Lock 锁的 newContition()方法返回 Condition 对象，Condition 类也可以实现等待/通知模式。

用 notify()通知时，JVM 会随机唤醒某个等待的线程， 使用 Condition 类可以进行选择性通知， Condition 比较常用的两个方法：

- await()会使当前线程等待,同时会释放锁,当其他线程调用 signal()时,线程会重新获得锁并继续执行
- signal()用于唤醒一个等待的线程



**ReentrantLock 是唯一实现了 Lock 接口的类，并且 ReentrantLock 提供了更多的方法**

**ReentrantLock可重入锁**

**ReentrantReadWriteLock** 里面提供了很多丰富的方法，不过最主要的有两个方法：

- writeLock();来获取读锁
- readLock();获取写锁

**假设有一个线程已经占用了读锁，则此时其他线程如果要申请写锁，则申请写锁的线程会一直等待释放读锁，反之同理**



**Lock实现卖票：**

```java
class LTicket{
    private int num = 30;
    // 创建可重入锁
    private final ReentrantLock lock = new ReentrantLock();

    public synchronized void sale(){
        try {
            // 上锁
            lock.lock();
            if(num > 0){
                System.out.println(Thread.currentThread().getName()+"：当前票数"+num--
                        + "：剩余"+num);
            }
        } finally {
            // 解锁
            lock.unlock();
        }
    }
}

public class LSaleTicket {

    public static void main(String[] args) {
        LTicket ticket = new LTicket();
        new Thread(()->{
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "AA").start();
        new Thread(()->{
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "BB").start();
        new Thread(()->{
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "CC").start();
    }
}
```



## 3、Lock与Synchronized



**synchronized与lock的异同：**

- synchronized是java关键字，内置，而lock不是内置，是一个类，可以实现同步访问且比synchronized中的方法更加丰富
- synchronized不会手动释放锁，而lock需手动释放锁（不解锁会出现死锁，需要在 finally 块中释放锁）
- lock等待锁的线程会相应中断，而synchronized不会相应，只会一直等待
- 通过 Lock 可以知道有没有成功获取锁，而 synchronized 却无法办到
- Lock 可以提高多个线程进行读操作的效率（当多个线程竞争的时候）







‘

# 三、线程间通信



线程间通信的模型有两种：共享内存和消息传递

**线程间的通信具体步骤：**

1. 创建资源类，在资源类中创建属性和操作方法
2. 在资源类操作方法：判断、操作、通知
3. 创建多个线程，调用资源类的操作方法
4. 防止虚拟唤醒问题





## 1、synchronized案例



操作线程的时候，等待线程使用wait()

通知另外的线程操作用notify()、notifyAll()

假设有两个线程，该线程在执行过程中，判断值（不是该值等待，让其他线程抢），操作值，通知另外一个线程的调度

通过使用两个线程对0这个值操作，一个线程加1，一个线程减1，交替实现多次。



```java
// 1. 创建资源类，定义属性和方法
class Share{
    private int num = 0;
    // +1方法
    public synchronized void incr() throws InterruptedException {
        // 2. 判断 干活 通知
        if(num != 0){
            // 为1不加1，等待
            this.wait();
        }
        // 为0则+1
        num ++;
        System.out.println(Thread.currentThread().getName()+"：" + num);
        // 通知其他所有等待线程
        this.notifyAll();
    }
    // -1方法
    public synchronized void decr() throws InterruptedException {
        // 2. 判断 干活 通知
        if(num != 1){
            // 为0不减1，等待
            this.wait();
        }
        // 为1则-1
        num --;
        System.out.println(Thread.currentThread().getName()+"：" + num);
        // 通知其他所有等待线程
        this.notifyAll();
    }
}

public class ThreadDemo1 {

    // 3. 创建多线程调用资源类方法
    public static void main(String[] args) {
        Share share = new Share();

        new Thread(()->{
            for(int i = 0; i < 10; i ++){
                try {
                    // +1
                    share.incr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "AA").start();
        new Thread(()->{
            for(int i = 0; i < 10; i ++){
                try {
                    // -1
                    share.decr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "BB").start();
    }
}
```







**如果再增加使用两个线程，就会出现问题不会0101变化：**



```java
new Thread(()->{
    for(int i = 0; i < 10; i ++){
        try {
            // +1
            share.incr();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}, "CC").start();
new Thread(()->{
    for(int i = 0; i < 10; i ++){
        try {
            // -1
            share.decr();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}, "DD").start();
```





**这就是虚假唤醒问题：**



A加1、若C抢C等、若A又抢则A等、若C又抢则由于不是while判断是if判断，将会在wait方法处唤醒C线程，导致if失效！

而while不一样，只要线程执行过去就会进行一次判断，所以不会导致虚假唤醒问题！

**wait在哪里睡眠就在哪里被唤醒**



**解决方案：if改为while即可**



```java
while (num != 0){
    this.wait();
}
```



**wait和notify介绍：[https://blog.csdn.net/qq_32907195/article/details/110670275](https://blog.csdn.net/qq_32907195/article/details/110670275)**





## 2、Lock案例



**使用lock先要创建锁的对象以及通知的对象**

```java
//创建Lock
private Lock lock = new ReentrantLock();
private Condition condition = lock.newCondition();
```



- 上锁lock.lock();
- 解锁lock.unlock();
- 唤醒所有等待的线程signalAll()，condition.signalAll();
- 唤醒一个等待线程signal()，condition.signal();
- 处于等待状态await()，condition.await();





```java
// 1. 创建资源类，定义属性和方法
class Share{
    private int num = 0;
    // 创建Lock对象
    private ReentrantLock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();

    // +1方法
    public void incr() throws InterruptedException {
        lock.lock();
        try {
            // 2. 判断 干活 通知
            while(num != 0){
                condition.await();
            }
            num ++;
            System.out.println(Thread.currentThread().getName()+"：" + num);
            // 通知其他所有等待线程
            condition.signalAll();
        }finally {
            lock.unlock();
        }
    }
    // -1方法
    public void decr() throws InterruptedException {
        lock.lock();
        try {
            // 2. 判断 干活 通知
            while(num != 1){
                condition.await();
            }
            num --;
            System.out.println(Thread.currentThread().getName()+"：" + num);
            // 通知其他所有等待线程
            condition.signalAll();
        }finally {
            lock.unlock();
        }
    }
}

public class ThreadDemo2 {

    public static void main(String[] args) {
        Share share = new Share();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    share.decr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "AA").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    share.incr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "BB").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    share.decr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "CC").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                try {
                    share.incr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "DD").start();
    }
}
```







## 3、线程间定制化通信





**所谓定制化通信，需要让线程进行一定的顺序操作**



**案例**：启动三个线程，按照如下要求：

AA打印5此，BB打印10次，CC打印15次，一共进行10轮



**具体思路：**

每个线程添加一个标志位，是该标志位则执行操作，并且修改为下一个标志位，通知下一个标志位的线程

- 创建一个可重入锁`private Lock lock = new ReentrantLock();`
- 分别创建三个开锁通知`private Condition c1 = lock.newCondition();`



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/24/0839615375a97296a569185d2a50903e.png)





```java
class ShareResource{
    private int flag = 1;
    // 创建lock锁
    private Lock lock = new ReentrantLock();
    // 创建三个Condition
    private Condition c1 = lock.newCondition();
    private Condition c2 = lock.newCondition();
    private Condition c3 = lock.newCondition();

    // 打印5次
    public void print5(int loop){
        lock.lock();
        try {
            while (flag != 1){
                c1.await();
            }
            for (int i = 0; i < 5; i++) {
                System.out.println(Thread.currentThread().getName()+"："+i+" 轮数："+loop);
            }
            // 修改标志位并进行通信
            flag = 2;
            c2.signal();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
    // 打印10次
    public void print10(int loop){
        lock.lock();
        try {
            while (flag != 2){
                c2.await();
            }
            for (int i = 0; i < 10; i++) {
                System.out.println(Thread.currentThread().getName()+"："+i+" 轮数："+loop);
            }
            flag = 3;
            c3.signal();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
    // 打印15次
    public void print15(int loop){
        lock.lock();
        try {
            while (flag != 3){
                c3.await();
            }
            for (int i = 0; i < 15; i++) {
                System.out.println(Thread.currentThread().getName()+"："+i+" 轮数："+loop);
            }
            flag = 1;
            c1.signal();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}
public class TheadDemo3 {

    public static void main(String[] args) {
        ShareResource share = new ShareResource();

        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                share.print5(i);
            }
        }, "AA").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                share.print10(i);
            }
        }, "BB").start();
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                share.print15(i);
            }
        }, "CC").start();
    }
}
```





# 四、集合的线程安全



## 1、ArrayList线程不安全



### 线程不安全演示



**ArrayList类的方法没有添加Synchronized关键字**



```java
public class ThreadDemo4 {

    //  java.util.ConcurrentModificationException 并发修改异常
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            new Thread(()->{
                // 从集合中添加内容
                list.add(UUID.randomUUID().toString().substring(0, 8));
                // 从集合中获取内容
                System.out.println(list);
            }, String.valueOf(i)).start();
        }
    }
}
```



### 解决方案-Vector



**Vector类的方法添加了Synchronized关键字**



```java
public class ThreadDemo4 {

    //  java.util.ConcurrentModificationException 并发修改异常
    public static void main(String[] args) {
        // List<String> list = new ArrayList<>();

        Vector<String> list = new Vector<>();

        for (int i = 0; i < 100; i++) {
            new Thread(()->{
                // 从集合中添加内容
                list.add(UUID.randomUUID().toString().substring(0, 8));
                // 从集合中获取内容
                System.out.println(list);
            }, String.valueOf(i)).start();
        }
    }
}
```



### 解决方案-Collections



```java
public class ThreadDemo4 {

    //  java.util.ConcurrentModificationException 并发修改异常
    public static void main(String[] args) {
        // List<String> list = new ArrayList<>();

        //Vector<String> list = new Vector<>();

        List<String> list = Collections.synchronizedList(new ArrayList<>());

        for (int i = 0; i < 100; i++) {
            new Thread(()->{
                // 从集合中添加内容
                list.add(UUID.randomUUID().toString().substring(0, 8));
                // 从集合中获取内容
                System.out.println(list);
            }, String.valueOf(i)).start();
        }
    }
}
```









### 解决方案-CopyOnWriteArrayList（推荐）



**CopyOnWriteArrayList：写时复制技术**



- 并发读没问题
- 写的时候复制一份新的，在新的上面修改
- 修改完进行覆盖
- 照顾了并发读兼顾了独立写操作



**CopyOnWriteArrayList的Add方法：**

```java
public boolean add(E e) {
    synchronized (lock) {
        Object[] es = getArray();
        int len = es.length;
        es = Arrays.copyOf(es, len + 1);
        es[len] = e;
        setArray(es);
        return true;
    }
}
```



**图示：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/24/bc4b830653e2d0fb37ad3ab2b42c63e3.png)



**代码：**

```java
public class ThreadDemo4 {

    //  java.util.ConcurrentModificationException 并发修改异常
    public static void main(String[] args) {
        // List<String> list = new ArrayList<>();

        // Vector<String> list = new Vector<>();

        // List<String> list = Collections.synchronizedList(new ArrayList<>());

        List<String> list = new CopyOnWriteArrayList<>();
        
        for (int i = 0; i < 100; i++) {
            new Thread(()->{
                // 从集合中添加内容
                list.add(UUID.randomUUID().toString().substring(0, 8));
                // 从集合中获取内容
                System.out.println(list);
            }, String.valueOf(i)).start();
        }
    }
}
```







## 2、HashSet线程不安全





### 线程不安全演示



**HashSet类的方法没有添加Synchronized关键字**



```java
public class ThreadDemo4 {

    //  java.util.ConcurrentModificationException 并发修改异常
    public static void main(String[] args) {

        Set<String> set = new HashSet<>();

        for (int i = 0; i < 100; i++) {
            new Thread(()->{
                // 从集合中添加内容
                set.add(UUID.randomUUID().toString().substring(0, 8));
                // 从集合中获取内容
                System.out.println(set);
            }, String.valueOf(i)).start();
        }
    }
}
```



### 解决方案 CopyOnWriteArraySet



```java
public static void main(String[] args) {
    // Set<String> set = new HashSet<>();
    Set<String> set = new CopyOnWriteArraySet<>();

    for (int i = 0; i < 100; i++) {
        new Thread(()->{
            // 从集合中添加内容
            set.add(UUID.randomUUID().toString().substring(0, 8));
            // 从集合中获取内容
            System.out.println(set);
        }, String.valueOf(i)).start();
    }
}
```









## 3、HashMap线程不安全





### 线程不安全演示





```java
public class ThreadDemo4 {

    //  java.util.ConcurrentModificationException 并发修改异常
    public static void main(String[] args) {

        Map<String, String> map = new HashMap<>();

        for (int i = 0; i < 100; i++) {
            String key = String.valueOf(i);
            new Thread(()->{
                // 从集合中添加内容
                map.put(key, UUID.randomUUID().toString().substring(0, 8));
                // 从集合中获取内容
                System.out.println(map);
            }, String.valueOf(i)).start();
        }
    }
}
```





### 解决方案 ConcurrentHashMap



```java
public class ThreadDemo4 {

    //  java.util.ConcurrentModificationException 并发修改异常
    public static void main(String[] args) {
        Map<String, String> map = new ConcurrentHashMap<>();

        for (int i = 0; i < 100; i++) {
            String key = String.valueOf(i);
            new Thread(()->{
                // 从集合中添加内容
                map.put(key, UUID.randomUUID().toString().substring(0, 8));
                // 从集合中获取内容
                System.out.println(map);
            }, String.valueOf(i)).start();
        }
    }
}
```









# 五、多线程锁



## 1、八锁



**总结：**



1. 同样的对象访问不同的同步锁，是按照顺序执行
   1. 同样的对象访问同步锁与不同步锁，是先不同步锁执行
   2. 不同对象访问不同同步锁，按照顺序执行
2. 同一对象访问不同静态同步锁，按照顺序执行
   1. 不同对象访问不同静态同步锁，按照顺序执行
3. 同一对象访问一个静态同步锁，一个同步锁，先执行同步锁
   1. 不同对象访问一个静态同步锁，一个同步锁，先执行同步锁
4. 即先出同步锁在出静态同步锁





**synchronized实现同步的基础:**

- Java中的每一个对象都可以作为锁。具体表现为以下3种形式。
- 对于普通同步方法，锁是当前实例对象。
- 对于静态同步方法，锁是当前类的class对象。
- 对于同步方法块，锁是synchronized括号里配置的对象



**八锁代码演示：**



```java
/**
 * 1 标准访问，先打印短信还是邮件
 * ------sendSMS
 * ------sendEmail
 * 2 停4秒在短信方法内，先打印短信还是邮件
 * ------sendSMS
 * ------sendEmail
 * 3 新增普通的hello方法，是先打短信还是hello
 * ------getHello
 * ------sendSMS
 * 4 现在有两部手机，先打印短信还是邮件
 * ------sendEmail
 * ------sendSMS
 * 5 两个静态同步方法，1部手机，先打印短信还是邮件
 * ------sendSMS
 * ------sendEmail
 * 6 两个静态同步方法，2部手机，先打印短信还是邮件
 * ------sendSMS
 * ------sendEmail
 * 7 1个静态同步方法,1个普通同步方法，1部手机，先打印短信还是邮件
 * ------sendEmail
 * ------sendSMS
 * 8 1个静态同步方法,1个普通同步方法，2部手机，先打印短信还是邮件
 * ------sendEmail
 * ------sendSMS
 *
 * @author ITNXD
 * @create 2021-10-24 18:53
 */

class Phone {

    /*public synchronized void sendSMS() throws Exception {
        //停留4秒
        TimeUnit.SECONDS.sleep(4);
        System.out.println("------sendSMS");
    }*/
    public static synchronized void sendSMS() throws Exception {
        //停留4秒
        TimeUnit.SECONDS.sleep(4);
        System.out.println("------sendSMS");
    }

    /*public synchronized void sendEmail() throws Exception {
        System.out.println("------sendEmail");
    }*/
    public static synchronized void sendEmail() throws Exception {
        System.out.println("------sendEmail");
    }

    public void getHello() {
        System.out.println("------getHello");
    }
}

public class Lock8 {
    public static void main(String[] args) throws Exception {

        Phone phone = new Phone();
        //Phone phone2 = new Phone();

        new Thread(() -> {
            try {
                phone.sendSMS();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, "AA").start();

        Thread.sleep(100);

        new Thread(() -> {
            try {
                phone.sendEmail();
                // phone.getHello();
                // phone2.sendEmail();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, "BB").start();
    }
}
```





## 2、公平锁与非公平锁





- **公平锁**：效率相对低（相对会公平，其他线程拿到锁的概率会加大）
- **非公平锁**：效率高，但是线程容易饿死（对买票来说可能多个线程只有一个再卖票）



通过查看源码：

带有参数的`ReentrantLock(true)`为**公平锁**

`ReentrantLock(false)`为**非公平锁**

主要是调用`NonfairSync()`与`FairSync()`



**公平锁源码：**

```java
static final class FairSync extends Sync {
    private static final long serialVersionUID = -3000897897090466540L;

    /**
     * Acquires only if reentrant or queue is empty.
     */
    final boolean initialTryLock() {
        Thread current = Thread.currentThread();
        int c = getState();
        if (c == 0) {
            if (!hasQueuedThreads() && compareAndSetState(0, 1)) {
                setExclusiveOwnerThread(current);
                return true;
            }
        } else if (getExclusiveOwnerThread() == current) {
            if (++c < 0) // overflow
                throw new Error("Maximum lock count exceeded");
            setState(c);
            return true;
        }
        return false;
    }
```



**原来的卖票改为公平锁：**



```java
class LTicket{
    private int num = 30;
    // 创建可重入锁
    private final ReentrantLock lock = new ReentrantLock(true);

    public synchronized void sale(){
        try {
            // 上锁
            lock.lock();
            if(num > 0){
                System.out.println(Thread.currentThread().getName()+"：当前票数"+num--
                        + "：剩余"+num);
            }
        } finally {
            // 解锁
            lock.unlock();
        }
    }
}

public class LSaleTicket {

    public static void main(String[] args) {
        LTicket ticket = new LTicket();
        new Thread(()->{
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "AA").start();
        new Thread(()->{
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "BB").start();
        new Thread(()->{
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "CC").start();
    }
}
```



## 3、可重入锁



**synchronized和lock都是可重入锁**

- sychronized是隐式锁，不用手工上锁与解锁，而lock为显示锁，需要手工上锁与解锁
- 可重入锁也叫递归锁







**可重入锁：这个锁能进第一层，则在这层之下的其他层也可以进出！**



### synchronized隐式



**同步代码块实现可重入锁：**

而且有了可重入锁之后，破解第一把之后就可以一直进入到内层结构！

当然得保证是同一把锁！

```java
public class SyncLock {
    public static void main(String[] args) {
        Object o = new Object();
        new Thread(()->{
            synchronized(o) {
                System.out.println(Thread.currentThread().getName()+" 外层");

                synchronized (o) {
                    System.out.println(Thread.currentThread().getName()+" 中层");

                    synchronized (o) {
                        System.out.println(Thread.currentThread().getName()+" 内层");
                    }
                }
            }

        },"t1").start();
    }
}
```



**同步方法实现可重入锁：**

会抛出栈溢出异常，本以为加了锁不会递归调用，结果递归调用了，即可重入的提现！

```java
public class SyncLock {

    public synchronized void add(){
        add();
    }

    public static void main(String[] args) {

        new SyncLock().add();
    }
}
```





### Lock显示

**在同一把锁中的嵌套锁，内部嵌套锁没解锁还是可以输出，但是如果跳出该线程，执行另外一个线程就会造成死锁！**
**要把握上锁与解锁的概念，都要写上！**



```java
public static void main(String[] args) {

    //Lock演示可重入锁
    Lock lock = new ReentrantLock();
    //创建线程
    new Thread(()->{
        try {
            //上锁
            lock.lock();
            System.out.println(Thread.currentThread().getName()+" 外层");

            try {
                //上锁
                lock.lock();
                System.out.println(Thread.currentThread().getName()+" 内层");
            }finally {
                //释放锁
                lock.unlock();
            }
        }finally {
            //释放做
            lock.unlock();
        }
    },"t1").start();

    //创建新线程
    new Thread(()->{
        lock.lock();
        System.out.println("aaaa");
        lock.unlock();
    },"aa").start();
}
```









## 4、死锁





**两个或以上的进程因为争夺资源而造成互相等待资源的现象称为死锁**





**产生死锁的原因：**

1. 系统资源不足
2. 系统资源分配不当
3. 进程运行顺序不当





**验证是否是死锁**

1. jps 类似于linux中的`ps -ef`查看进程号
2. jstack jvm自带的堆栈跟踪工具

通过用idea自带的命令行输入 `jps -l`

查看其编译代码的进程号后`jstack 进程号`



**死锁演示：**

```java
public class DeadLock {
    //创建两个对象
    static Object a = new Object();
    static Object b = new Object();

    public static void main(String[] args) {
        new Thread(()->{
            synchronized (a) {
                System.out.println(Thread.currentThread().getName()+" 持有锁a，试图获取锁b");
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (b) {
                    System.out.println(Thread.currentThread().getName()+" 获取锁b");
                }
            }
        },"A").start();

        new Thread(()->{
            synchronized (b) {
                System.out.println(Thread.currentThread().getName()+" 持有锁b，试图获取锁a");
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (a) {
                    System.out.println(Thread.currentThread().getName()+" 获取锁a");
                }
            }
        },"B").start();
    }
}
```



# 六、Callable接口





## 1、Callable接口概述





**创建线程的多种方式：**

1. 继承Thread类
2. 实现Runnable接口
3. Callable接口
4. 线程池



目前学习了有两种创建线程的方法，一种是通过创建 Thread 类，另一种是通过使用 Runnable 创建线程。

但是，Runnable 缺少的一项功能是，当线程终止时（即 run()完成时），我们无法使线程返回结果。为了支持此功能，Java 中提供了 Callable 接口!



**比较Runnable接口和Callable接口**

- Callable中的call()计算结果，如果无法计算结果，会抛出异常
- Runnable中的run()使用实现接口Runnable的对象创建一个线程时，启动该线程将导致在独立执行的线程中调用该对象的run方法
- 总的来说：run()没有返回值，不会抛出异常。而call()有返回值，会抛出异常





## 2、FutureTask



用来联系Runnable接口和Callable接口，实现线程的创建！

它是Runnable接口的实现类，且构造函数可以传入Callable接口！



**FutureTask的构造方法有：**

- FutureTask(Callable<> callable) 创建一个FutureTask，一旦运行就执行给定的Callable
- FutureTask(Runnable runnable,V result)创建一个FutureTask，一旦运行就执行给定的Runnable那边了，并安排成功完成时get返回给定的结果

**其他常用的代码：**

- get()获取结果
- isDone()判断任务是否结束



所谓的FutureTask是在不影响主任务的同时，开启单线程完成某个特别的任务，之后主线程续上单线程的结果即可（该单线程汇总给主线程只需要一次即可）
如果之后主线程在开启该单线程，可以直接获得结果，因为之前已经执行过一次了!



```java
//实现Runnable接口
class MyThread1 implements Runnable {
    @Override
    public void run() {

    }
}

//实现Callable接口
class MyThread2 implements Callable {

    @Override
    public Integer call() throws Exception {
        System.out.println(Thread.currentThread().getName() + " come in");
        return 200;
    }
}

public class Demo1 {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // Runnable接口创建线程
        new Thread(new MyThread1(), "aa").start();

        // 使用FutureTask实现Callable的线程创建
        FutureTask<Integer> futureTask1 = new FutureTask<>(new MyThread2());

        // 简化
        FutureTask<Integer> futureTask2 = new FutureTask<>(()->{
            System.out.println(Thread.currentThread().getName() + " come in");
            return 1024;
        });
        // 再次简化
        FutureTask<Integer> futureTask3 = new FutureTask<>(()->1024);

        // 创建线程
        new Thread(futureTask2, "lucy").start();
        new Thread(futureTask1, "mary").start();

        /*while (!futureTask2.isDone()){
            System.out.println("未完成....");
        }*/
        // 获取最终结果
        System.out.println(futureTask2.get());
        System.out.println(futureTask1.get());
        // 第二次获取就不会进行执行了，直接返回最终结果，即不会打印未完成字样
        //System.out.println(futureTask2.get());
        System.out.println(Thread.currentThread().getName() + " come over");
    }
}
```







# 七、JUC辅助类







## 1、减少计数CountDownLatch



> **做减减操作！**



**该类的构造方法为**

CountDownLatch(int count)构造一个用给定计数初始化的CountDownLatch


**两个常用的主要方法：**

- await() 使当前线程在锁存器倒计数至零之前一直在等待，除非线程被中断
- countDown()递减锁存器的计数，如果计数达到零，将释放所有等待的线程



CountDownLatch 类可以设置一个计数器，然后通过 countDown 方法来进行减 1 的操作，使用 await 方法等待计数器不大于 0，然后继续执行 await 方法之后的语句！

- CountDownLatch 主要有两个方法，当一个或多个线程调用 await 方法时，这些线程会阻塞
- 其它线程调用 countDown 方法会将计数器减 1(调用 countDown 方法的线程不会阻塞)
- 当计数器的值变为 0 时，因 await 方法阻塞的线程会被唤醒，继续执行

**具体步骤可以演化为定义一个类，减1操作，并减到0，为0执行结果**



**场景: 6 个同学陆续离开教室后值班同学才可以关门。**



```java
public class CountDowLatchDemo {
    public static void main(String[] args) throws InterruptedException {
        // 创建CountDownLatch对象，设置初始值
        CountDownLatch countDownLatch = new CountDownLatch(6);
        for (int i = 0; i < 6; i++) {
            new Thread(()->{
                System.out.println(Thread.currentThread().getName() + "离开了教师！");
                // 计数器减1
                countDownLatch.countDown();
            }, String.valueOf(i)).start();
        }
        // 计数器变成0再往后执行
        countDownLatch.await();
        System.out.println(Thread.currentThread().getName() + "班长已锁门");
    }
}
```







## 2、循环栅栏CyclicBarrier



> **做加加操作！**

该类是一个同步辅助类，允许一组县城互相等到，直到到达某个公共屏障点，在设计一组固定大小的线程的程序中，这些线程必须互相等待，这个类很有用，因为barrier在释放等待线程后可以重用，所以称为循环barrier

CyclicBarrier 看英文单词可以看出大概就是循环阻塞的意思，在使用中CyclicBarrier 的构造方法第一个参数是目标障碍数，每次执行 CyclicBarrier 一
次障碍数会加一，如果达到了目标障碍数，才会执行 cyclicBarrier.await()之后的语句。可以将 CyclicBarrier 理解为**加 1 操作**



**常用的构造方法有：**

CyclicBarrier(int parties，Runnable barrierAction)创建一个新的CyclicBarrier，它将在给定数量的参与者（线程）处于等待状态时启动，并在启动barrier时执行给定的屏障操作，该操作由最后一个进入barrier的线程操作

**常用的方法有：**

await()在所有的参与者都已经在此barrier上调用await方法之前一直等待



**案例：集齐7颗龙珠就可以召唤神龙**



await到指定次数后执行指定方法！



```java
public class CyclicBarrierDemo {

    //创建固定值
    private static final int NUMBER = 7;

    public static void main(String[] args) {
        //创建CyclicBarrier
        CyclicBarrier cyclicBarrier =
                new CyclicBarrier(NUMBER,()->{
                    System.out.println("*****集齐7颗龙珠就可以召唤神龙");
                });

        //集齐七颗龙珠过程
        for (int i = 1; i <=7; i++) {
            new Thread(()->{
                try {
                    System.out.println(Thread.currentThread().getName()+" 星龙被收集到了");
                    //等待
                    cyclicBarrier.await();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            },String.valueOf(i)).start();
        }
    }
}
```











## 3、信号灯Semaphore



> **做加减操作！**



一个计数信号量，从概念上将，信号量维护了一个许可集，如有必要，在许可可用前会阻塞每一个acquire()，然后在获取该许可。每个release()添加一个许可，从而可能释放一个正在阻塞的获取者。但是，不使用实际的许可对象，Semaphore只对可用许可的号码进行计数，并采取相应的行动.。





**具体常用的构造方法有：**

Semaphore(int permits)创建具有给定的许可数和非公平的公平设置的Semapore

**具体常用的方法有：**

- acquire()从此信号量获取一个许可，在提供一个许可前一直将线程阻塞，否则线程被中断
- release()释放一个许可，将其返回给信号量



设置许可数量Semaphore semaphore = new Semaphore(3);
一般acquire(）都会抛出异常，release在finally中执行



**案例：6辆汽车，停3个车位**



```java
public class SemaphoreDemo {
    public static void main(String[] args) {
        //创建Semaphore，设置许可数量
        Semaphore semaphore = new Semaphore(3);

        //模拟6辆汽车
        for (int i = 1; i <=6; i++) {
            new Thread(()->{
                try {
                    //抢占
                    semaphore.acquire();

                    System.out.println(Thread.currentThread().getName()+" 抢到了车位");

                    //设置随机停车时间
                    TimeUnit.SECONDS.sleep(new Random().nextInt(5));

                    System.out.println(Thread.currentThread().getName()+" ------离开了车位");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    //释放
                    semaphore.release();
                }
            },String.valueOf(i)).start();
        }
    }
}
```

**结果：**

```
1 抢到了车位
3 抢到了车位
2 抢到了车位
3 ------离开了车位
4 抢到了车位
2 ------离开了车位
5 抢到了车位
1 ------离开了车位
6 抢到了车位
4 ------离开了车位
5 ------离开了车位
6 ------离开了车位

Process finished with exit code 0

```





# 八、ReentrantReadWriteLock读写锁



## 1、读写锁概述





**悲观锁**：单独每个人完成事情的时候，执行上锁解锁。解决并发中的问题，不支持并发操作，只能一个一个操作，效率低
**乐观锁**：每执行一件事情，都会比较数据版本号，谁先提交，谁先提交版本号



[https://itnxd.eu.org/posts/64689.html5、Redis中的悲观锁和乐观锁](https://itnxd.eu.org/posts/64689.html#5%E3%80%81Redis%E4%B8%AD%E7%9A%84%E6%82%B2%E8%A7%82%E9%94%81%E5%92%8C%E4%B9%90%E8%A7%82%E9%94%81)



**表锁**：整个表操作，不会发生死锁
**行锁**：每个表中的单独一行进行加锁，会发生死锁
**读锁**：共享锁（可以有多个人读），会发生死锁
**写锁**：独占锁（只能有一个人写），会发生死锁

读写锁：一个资源可以被多个读线程访问，也可以被一个写线程访问，但不能同时存在读写线程，读写互斥，读读共享



**读写锁ReentrantReadWriteLock**

- 读锁为ReentrantReadWriteLock.ReadLock，readLock()方法
- 写锁为ReentrantReadWriteLock.WriteLock，writeLock()方法

**创建读写锁对象private ReadWriteLock rwLock = new ReentrantReadWriteLock();**

- 写锁 加锁 rwLock.writeLock().lock();，解锁为rwLock.writeLock().unlock();
- 读锁 加锁rwLock.readLock().lock();，解锁为rwLock.readLock().unlock();







## 2、读写锁案例



**模拟多线程在map中取数据和读数据**







```java
//资源类
class MyCache {
    //创建map集合
    /*
    volatile：
    1）保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的。
　　2）禁止进行指令重排序。
     */
    private volatile Map<String,Object> map = new HashMap<>();

    //创建读写锁对象
    private ReadWriteLock rwLock = new ReentrantReadWriteLock();

    //放数据
    public void put(String key,Object value) {
        //添加写锁
        rwLock.writeLock().lock();

        try {
            System.out.println(Thread.currentThread().getName()+" 正在写操作"+key);
            //暂停一会
            TimeUnit.MICROSECONDS.sleep(300);
            //放数据
            map.put(key,value);
            System.out.println(Thread.currentThread().getName()+" 写完了"+key);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            //释放写锁
            rwLock.writeLock().unlock();
        }
    }

    //取数据
    public Object get(String key) {
        //添加读锁
        rwLock.readLock().lock();
        Object result = null;
        try {
            System.out.println(Thread.currentThread().getName()+" 正在读取操作"+key);
            //暂停一会
            TimeUnit.MICROSECONDS.sleep(300);
            result = map.get(key);
            System.out.println(Thread.currentThread().getName()+" 取完了"+key);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            //释放读锁
            rwLock.readLock().unlock();
        }
        return result;
    }
}

public class ReadWriteLockDemo {
    public static void main(String[] args) throws InterruptedException {
        MyCache myCache = new MyCache();
        //创建线程放数据
        for (int i = 1; i <=5; i++) {
            final int num = i;
            new Thread(()->{
                myCache.put(num+"",num+"");
            },String.valueOf(i)).start();
        }

        TimeUnit.MICROSECONDS.sleep(300);

        //创建线程取数据
        for (int i = 1; i <=5; i++) {
            final int num = i;
            new Thread(()->{
                myCache.get(num+"");
            },String.valueOf(i)).start();
        }
    }
}
```



**结果：一个个写，一起读**

```
1 正在写操作1
1 写完了1
2 正在写操作2
2 写完了2
3 正在写操作3
3 写完了3
4 正在写操作4
4 写完了4
5 正在写操作5
5 写完了5
2 正在读取操作2
3 正在读取操作3
1 正在读取操作1
4 正在读取操作4
5 正在读取操作5
1 取完了1
5 取完了5
2 取完了2
4 取完了4
3 取完了3

Process finished with exit code 0

```













## 3、读写锁深入





### 总结锁的演变

- 无锁：多线程抢夺资源
- synchronized和ReentrantLock，都是独占，每次只可以一个操作，不能共享
- ReentrantReadWriteLock，读读可以共享，提升性能，但是不能多人写。缺点：造成死锁（一直读，不能写），读进程不能写，写进程可以读。
- 写锁降级为读锁（一般等级写锁高于读锁）



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/610eb4a01e8a2fc601b61f35620e1e78.png)









### 写锁降级



由于在同一个线程中的写锁也可以进行读操作，因此可以将写锁中的写锁去掉就变成了读锁！



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/7447818f88210cc8640d062448f564bb.png)



**写的时候可以读，前提是一个写线程内：**



```java
public class Demo1 {
    public static void main(String[] args) {
        //可重入读写锁对象
        ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
        ReentrantReadWriteLock.ReadLock readLock = rwLock.readLock();//读锁
        ReentrantReadWriteLock.WriteLock writeLock = rwLock.writeLock();//写锁

        //锁降级
        //1 获取写锁
        writeLock.lock();
        System.out.println("---write");

        //2 获取读锁
        readLock.lock();
        System.out.println("---read");

        //3 释放写锁
        writeLock.unlock();

        //4 释放读锁
        readLock.unlock();
    }
}
```



**读的时候不可以写，写锁要独占：**



```java
public class Demo1 {
    public static void main(String[] args) {
        //可重入读写锁对象
        ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
        ReentrantReadWriteLock.ReadLock readLock = rwLock.readLock();//读锁
        ReentrantReadWriteLock.WriteLock writeLock = rwLock.writeLock();//写锁

        //锁降级
        //2 获取读锁
        readLock.lock();
        System.out.println("---read");

        //1 获取写锁
        writeLock.lock();
        System.out.println("---write");
        
        //3 释放写锁
        writeLock.unlock();

        //4 释放读锁
        readLock.unlock();
    }
}
```





### 总结



- 在线程持有读锁的情况下，该线程不能取得写锁(因为获取写锁的时候，如果发现当前的读锁被占用，就马上获取失败，不管读锁是不是被当前线程持有)。
- 在线程持有写锁的情况下，该线程可以继续获取读锁（获取读锁时如果发现写锁被占用，只有写锁没有被当前线程占用的情况才会获取失败）。

**原因:** 

- 当线程获取读锁的时候，可能有其他线程同时也在持有读锁，因此不能把获取读锁的线程“升级”为写锁；
- 而对于获得写锁的线程，它一定独占了读写锁，因此可以继续让它获取读锁，当它同时获取了写锁和读锁后，还可以先释放写锁继续持有读锁，这样一个写锁就“降级”为了读锁。









# 九、BlockingQueue阻塞队列





## 1、阻塞队列概述









**阻塞队列是共享队列（多线程操作），一端输入，一端输出**

- 当队列是空的，从队列中获取元素的操作将会被阻塞
- 当队列是满的，从队列中添加元素的操作将会被阻塞
- 试图从空的队列中获取元素的线程将会被阻塞，直到其他线程往空的队列插入新的元素
- 试图向已满的队列中添加新元素的线程将会被阻塞，直到其他线程从队列中移除一个或多个元素或者完全清空，使队列变得空闲起来并后续新增



在多线程领域：所谓阻塞，在某些情况下会挂起线程（即阻塞），一旦条件满足，被挂起的线程又会自动被唤起

**为什么需要 BlockingQueue**

好处是我们不需要关心什么时候需要阻塞线程，什么时候需要唤醒线程，因为这一切BlockingQueue 都给你一手包办了







## 2、阻塞队列分类



### ArrayBlockingQueue

基于**数组**的阻塞队列实现，在 ArrayBlockingQueue 内部，维护了一个**定长**数组！

**由数组结构组成的有界阻塞队列**

ArrayBlockingQueue 在生产者放入数据和消费者获取数据，都是共用同一个锁对象，**无法并行**



### LinkedBlockingQueue

基于**链表**的阻塞队列

**由链表结构组成的有界（但大小默认值为integer.MAX_VALUE）阻塞队列**

之所以能够高效的处理并发数据，还因为其对于生产者端和消费者端分别采用了独立的锁来控制数据同步，这也意味着在高并发的情况下生产者和消费者**可以并行**地操作队列中的数据，以此来提高整个队列的并发性能。

### DelayQueue

**使用优先级队列实现的延迟无界阻塞队列**

DelayQueue 中的元素只有当其指定的延迟时间到了，才能够从队列中获取到该元素。DelayQueue 是一个**没有大小限制的队列**，因此往队列中插入数据的操作（生产者）永远不会被阻塞，而只有获取数据的操作（消费者）才会被阻塞。



### PriorityBlockingQueue

**基于优先级的阻塞队列**

**支持优先级排序的无界阻塞队列**

不会阻塞数据生产者，而只会在没有可消费的数据时，阻塞数据的消费者

### SynchronousQueue

**一种无缓冲的等待队列**

相对于有缓冲的 BlockingQueue 来说，**少了**一个中间经销商的环节（**缓冲区**）

**不存储元素的阻塞队列，也即单个元素的队列**

声明一个 SynchronousQueue 有两种不同的方式，它们之间有着不太一样的行为。

**公平模式和非公平模式的区别：**

- 公平模式：SynchronousQueue 会采用公平锁，并配合一个 FIFO 队列来阻塞多余的生产者和消费者，从而体系整体的公平策略；
- 非公平模式（SynchronousQueue 默认）：SynchronousQueue 采用非公平锁，同时配合一个 LIFO 队列来管理多余的生产者和消费者

而后一种模式，如果生产者和消费者的处理速度有差距，则很容易出现饥渴的情况，即可能有某些生产者或者是消费者的数据永远都得不到处理

### LinkedTransferQueue

**由链表结构组成的无界阻塞 TransferQueue 队列**

**由链表组成的无界阻塞队列**

预占模式。意思就是消费者线程取元素时，如果队列不为空，则直接取走数据，若队列为空，生成一个节点（节点元素为 null）入队，消费者线程被等待在这个节点上，生产者线程入队时发现有一个元素为 null 的节点，生产者线程就不入队了，直接就将元素填充到该节点，并唤醒该节点等待的线程，被唤醒的消费者线程取走元素，从调用的方法返回

### LinkedBlockingDeque

**由链表结构组成的双向阻塞队列**

**阻塞有两种情况**

- 插入元素时: 如果当前队列已满将会进入阻塞状态，一直等到队列有空的位置时再该元素插入，该操作可以通过设置超时参数，超时后返回 false 表示操作失败，也可以不设置超时参数一直阻塞，中断后抛出 InterruptedException异常
- 读取元素时: 如果当前队列为空会阻塞住直到队列不为空然后返回元素，同样可以通过设置超时参数





## 3、阻塞队列核心方法



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/f9753e713da552b51915dc6f01ee5660.png)





**简单演示：**



```java
public class BlockQueueDemo {

    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(3);

        System.out.println(blockingQueue.add("a")); //成功为true，失败为false
        System.out.println(blockingQueue.add("b")); //成功为true，失败为false
        System.out.println(blockingQueue.add("c")); //成功为true，失败为false
        System.out.println(blockingQueue.element());

        // 队满异常
        // System.out.println(blockingQueue.add("c"));

        System.out.println(blockingQueue.remove()); // 先进先出
        System.out.println(blockingQueue.remove()); // 先进先出
        System.out.println(blockingQueue.remove()); // 先进先出
        // 队空异常
        // System.out.println(blockingQueue.remove()); // 先进先出

        System.out.println(blockingQueue.offer("a"));
        System.out.println(blockingQueue.offer("b"));
        System.out.println(blockingQueue.offer("c"));
        // 已满 false
        // System.out.println(blockingQueue.offer("d"));

        System.out.println(blockingQueue.poll());
        System.out.println(blockingQueue.poll());
        System.out.println(blockingQueue.poll());
        // 已空 null
        System.out.println(blockingQueue.poll());


        blockingQueue.put("a");
        blockingQueue.put("b");
        blockingQueue.put("c");
        // 已满 阻塞
        // blockingQueue.put("d");

        System.out.println(blockingQueue.take());
        System.out.println(blockingQueue.take());
        System.out.println(blockingQueue.take());
        // 已空 阻塞
        // System.out.println(blockingQueue.take());

        System.out.println(blockingQueue.offer("a"));
        System.out.println(blockingQueue.offer("b"));
        System.out.println(blockingQueue.offer("c"));
        // 指定时间放不进去超时结束
        System.out.println(blockingQueue.offer("d", 3L, TimeUnit.SECONDS));

        
    }
}
```















# 十、ThreadPool线程池





## 1、线程池概述





**连接池**是创建和管理一个连接的缓冲池的技术，这些连接准备好被任何需要它们的线程使用



**线程池**（英语：thread pool）：一种线程使用模式。线程过多会带来调度开销，进而影响缓存局部性和整体性能。而线程池维护着多个线程，等待着监督管理者分配可并发执行的任务。这避免了在处理短时间任务时创建与销毁线程的代价。线程池不仅能够保证内核的充分利用，还能防止过分调度



**特点：**

- 降低资源消耗: 通过重复利用已创建的线程降低线程创建和销毁造成的销耗。
- 提高响应速度: 当任务到达时，任务可以不需要等待线程创建就能立即执行。
- 提高线程的可管理性: 线程是稀缺资源，如果无限制的创建，不仅会销耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。





**具体架构:**

Java 中的线程池是通过 Executor 框架实现的，该框架中用到了 Executor，Executors，ExecutorService，ThreadPoolExecutor 这几个类



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/fec5f239cada65dec1f812dd9e4342e9.png)













## 2、线程池使用方式



- Executors.newFixedThreadPool(int)：**一池N线程**
- Executors.newSingleThreadExecutor()：一个任务一个任务执行，**一池一线程**
- Executors.newCachedThreadPool()：线程池根据需求创建线程，**可扩容**，遇强则强



```java
public class ThreadPoolDemo {

    public static void main(String[] args) {
        // 五个线程
        ExecutorService threadPool1 = Executors.newFixedThreadPool(5);
        // 一个线程
        ExecutorService threadPool2 = Executors.newSingleThreadExecutor();
        // 可扩容线程池
        ExecutorService threadPool3 = Executors.newCachedThreadPool();

        try {
            // 十个消费者
            for (int i = 0; i < 10; i++) {
                threadPool3.execute(()->{
                    System.out.println(Thread.currentThread().getName());
                });
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            // 释放线程
            threadPool3.shutdown();
        }
    }
}
```









## 3、线程池的七个参数





**底层都是通过这个方法创建的：**



```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue) {
    this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
         Executors.defaultThreadFactory(), defaultHandler);
}
```



- int corePoolSize, 常驻线程数量（核心）
- int maximumPoolSize,最大线程数量
- long keepAliveTime,TimeUnit unit,线程存活时间
- `BlockingQueue<Runnable> workQueue`,阻塞队列（排队的线程放入）
- ThreadFactory threadFactory,线程工厂，用于创建线程
- RejectedExecutionHandler handler拒绝策略（线程满了）





## 4、线程池底层工作流程





### 底层工作流程





- 在执行创建对象的时候不会创建线程
- 创建线程的时候execute(）才会创建
- 先到常驻线程，满了之后再到阻塞队列进行等待，阻塞队列满了之后，在往外扩容线程，扩容线程不能大于最大线程数。大于最大线程数和阻塞队列之和后，会执行拒绝策略。

阻塞队列为3，常驻线程数2，最大线程数5



12使用常驻线程，345进入阻塞队列，678开辟新的三个线程，9无法处理执行拒绝策略！

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/990ed469767dd1649ab8153fafd5d6fc.png)



### 四种拒绝策略

1. 抛异常
2. 谁调用找谁
3. 抛弃最久执行当前
4. 不理不问



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/83b667c3f188ec86baea11b9be2314be.png)





## 5、自定义线程池



实际在开发中不允许使用Executors创建，而是通过ThreadPoolExecutor的方式，规避资源耗尽风险



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/25/bb132fc646f4c5e1ea8e3a63ebe04161.png)



```java
public class ThreadPoolDemo2 {

    public static void main(String[] args) {
        // 自定义线程池
        ExecutorService threadPool = new ThreadPoolExecutor(
                2,
                5,
                2L,
                TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(3),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy()
        );

        //10个顾客请求
        try {
            for (int i = 1; i <=10; i++) {
                //执行
                threadPool.execute(()->{
                    System.out.println(Thread.currentThread().getName()+" 办理业务");
                });
            }
        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            //关闭
            threadPool.shutdown();
        }

    }
}
```





# 十一、Fork/Join分支合并框架





## 1、概述



Fork/Join 它可以将一个大的任务拆分成多个子任务进行并行处理，最后将子任务结果合并成最后的计算结果，并进行输出。Fork/Join 框架要完成两件事
情：

- Fork：把一个复杂任务进行分拆，大事化小
- Join：把分拆任务的结果进行合并



1. 任务分割：首先 Fork/Join 框架需要把大的任务分割成足够小的子任务，如果子任务比较大的话还要对子任务进行继续分割
2. 执行任务并合并结果：分割的子任务分别放到双端队列里，然后几个启动线程分别从双端队列里获取任务执行。子任务执行完的结果都放在另外一个队列里，启动一个线程从队列里取数据，然后合并这些数据。



- **ForkJoinTask**：我们要使用 Fork/Join 框架，首先需要创建一个 ForkJoin 任务。该类提供了在任务中执行 fork 和 join 的机制。通常情况下我们不需要直接集成 ForkJoinTask 类，只需要继承它的子类，Fork/Join 框架提供了两个子类：
  - **RecursiveAction**：用于没有返回结果的任务
  - **RecursiveTask**：用于有返回结果的任务
- **ForkJoinPool**：ForkJoinTask 需要通过 ForkJoinPool 来执行
- **RecursiveTask**: 继承后可以实现递归(自己调自己)调用的任务





## 2、案例实现





**具体案例：1加到100，相加两个数值不能大于10**



```java
class MyTask extends RecursiveTask<Integer> {

    //拆分差值不能超过10，计算10以内运算
    private static final Integer VALUE = 10;
    private int begin ;//拆分开始值
    private int end;//拆分结束值
    private int result ; //返回结果

    //创建有参数构造
    public MyTask(int begin,int end) {
        this.begin = begin;
        this.end = end;
    }

    //拆分和合并过程
    @Override
    protected Integer compute() {
        //判断相加两个数值是否大于10
        if((end-begin)<=VALUE) {
            //相加操作
            for (int i = begin; i <=end; i++) {
                result = result+i;
            }
        } else {//进一步拆分
            //获取中间值
            int middle = (begin+end)/2;
            //拆分左边
            MyTask task01 = new MyTask(begin,middle);
            //拆分右边
            MyTask task02 = new MyTask(middle+1,end);
            //调用方法拆分
            task01.fork();
            task02.fork();
            //合并结果
            result = task01.join()+task02.join();
        }
        return result;
    }
}

public class ForkJoinDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        //创建MyTask对象
        MyTask myTask = new MyTask(0,100);
        //创建分支合并池对象
        ForkJoinPool forkJoinPool = new ForkJoinPool();
        ForkJoinTask<Integer> forkJoinTask = forkJoinPool.submit(myTask);
        //获取最终合并之后结果
        Integer result = forkJoinTask.get();
        System.out.println(result);
        //关闭池对象
        forkJoinPool.shutdown();
    }
}
```











# 十二、CompletableFuture异步回调





## 1、概述



CompletableFuture 在 Java 里面被用于异步编程，异步通常意味着非阻塞，可以使得我们的任务单独运行在与主线程分离的其他线程中，并且通过回调可以在主线程中得到异步任务的执行状态，是否完成，和是否异常等信息

CompletableFuture 实现了 Future, CompletionStage 接口，实现了 Future接口就可以兼容现在有线程池框架，而 CompletionStage 接口才是异步编程的接口抽象，里面定义多种异步方法，通过这两者集合，从而打造出了强大的CompletableFuture 类。



## 2、案例



- 异步调用没有返回值方法`runAsync`
- 异步调用有返回值方法`supplyAsync`
- 主线程调用 get 方法会阻塞



```java
public class CompletableFutureDemo {

    public static void main(String[] args) throws Exception {
        //同步调用
        CompletableFuture<Void> completableFuture1 = CompletableFuture.runAsync(()->{
            System.out.println(Thread.currentThread().getName()+" : CompletableFuture1");
        });
        completableFuture1.get();

        //mq消息队列
        //异步调用
        CompletableFuture<Integer> completableFuture2 = CompletableFuture.supplyAsync(()->{
            System.out.println(Thread.currentThread().getName()+" : CompletableFuture2");
            //模拟异常
            int i = 10/0;
            return 1024;
        });
        // t为返回结果，u为异常信息
        completableFuture2.whenComplete((t,u)->{
            System.out.println("------t="+t);
            System.out.println("------u="+u);
        }).get();

    }
}
```







## 3、Future与CompletableFuture



**对比这两种方法，一个为同步一个为异步**

Futrue 在 Java 里面，通常用来表示一个异步任务的引用，比如我们将任务提交到线程池里面，然后我们会得到一个 Futrue，在 Future 里面有 isDone 方法来判断任务是否处理结束，还有 get 方法可以一直阻塞直到任务结束然后获取结果，但整体来说这种方式，还是同步的，因为需要客户端不断阻塞等待或者不断轮询才能知道任务是否完成：

- 不支持手动完成：我提交了一个任务，但是执行太慢了，我通过其他路径已经获取到了任务结果，现在没法把这个任务结果通知到正在执行的线程，所以必须主动取消或者一直等待它执行完成
- 不支持进一步的非阻塞调用：通过 Future 的 get 方法会一直阻塞到任务完成，但是想在获取任务之后执行额外的任务，因为 Future 不支持回调函数，所以无法实现这个功能
- 不支持链式调用：对于 Future 的执行结果，我们想继续传到下一个 Future 处理使用，从而形成一个链式的 pipline 调用，这在 Future 中是没法实现的。
- 不支持多个 Future 合并：比如我们有 10 个 Future 并行执行，我们想在所有的 Future 运行完毕之后，执行某些函数，是没法通过 Future 实现的。
- 不支持异常处理：Future 的 API 没有任何的异常处理的 api，所以在异步运行时，如果出了问题是不好定位的











