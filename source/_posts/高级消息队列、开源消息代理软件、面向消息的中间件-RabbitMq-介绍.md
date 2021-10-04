---
title: 高级消息队列、开源消息代理软件、面向消息的中间件 RabbitMQ 介绍
author: ITNXD
toc: true
date: 2021-10-04 11:27:51
updated:
abbrlink: https://cdn.jsdelivr.net/gh/niuxvdong/pic@67e33f6da51d3b664b04a1cf6e6768fd96b810fa/2021/10/04/bad5b13b191abdc4a6020f51449722c3.png
top_img: https://cdn.jsdelivr.net/gh/niuxvdong/pic@67e33f6da51d3b664b04a1cf6e6768fd96b810fa/2021/10/04/bad5b13b191abdc4a6020f51449722c3.png
cover:
categories:
  - 中间件
tags:
  - RabbitMQ
  - 消息队列
---







# 一、MQ相关概念





## 1、什么是 MQ 



MQ(message queue)，从字面意思上看，本质是个队列，FIFO 先入先出，只不过队列中存放的内容是message 而已，还是一种跨进程的通信机制，用于上下游传递消息。在互联网架构中，MQ 是一种非常常见的上下游“逻辑解耦+物理解耦”的消息通信服务。使用了 MQ 之后，消息发送上游只需要依赖 MQ，不用依赖其他服务。





## 2、为什么要用 MQ 



### 流量消峰

举个例子，如果订单系统最多能处理一万次订单，这个处理能力应付正常时段的下单时绰绰有余，正常时段我们下单一秒后就能返回结果。但是在高峰期，如果有两万次下单操作系统是处理不了的，只能限制订单超过一万后不允许用户下单。使用消息队列做缓冲，我们可以取消这个限制，把一秒内下的订单分散成一段时间来处理，这时有些用户可能在下单十几秒后才能收到下单成功的操作，但是比不能下单的体验要好。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c03847cbb79dbb2478b427e486173306544016e9/2021/10/04/656776657c1cd707e4384e2aa2ee0dbe.png)

### 应用解耦



以电商应用为例，应用中有订单系统、库存系统、物流系统、支付系统。用户创建订单后，如果耦合调用库存系统、物流系统、支付系统，任何一个子系统出了故障，都会造成下单操作异常。当转变成基于消息队列的方式后，系统间调用的问题会减少很多，比如物流系统因为发生故障，需要几分钟来修复。在这几分钟的时间里，物流系统要处理的内存被缓存在消息队列中，用户的下单操作可以正常完成。当物流系统恢复后，继续处理订单信息即可，中单用户感受不到物流系统的故障，提升系统的可用性。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@3f6f1caf6239eca057468d9b9035ebd661c23065/2021/10/04/7fa61fe00211121e2b256e9d9e65fde3.png)



### 异步处理



有些服务间调用是异步的，例如 A 调用 B，B 需要花费很长时间执行，但是 A 需要知道 B 什么时候可以执行完，以前一般有两种方式，A 过一段时间去调用 B 的查询 api 查询。或者 A 提供一个 callback api，B 执行完之后调用 api 通知 A 服务。这两种方式都不是很优雅，使用消息总线，可以很方便解决这个问题，A 调用 B 服务后，只需要监听 B 处理完成的消息，当 B 处理完成后，会发送一条消息给 MQ，MQ 会将此消息转发给 A 服务。这样 A 服务既不用循环调用 B 的查询 api，也不用提供 callback api。同样 B 服务也不用做这些操作。A 服务还能及时的得到异步处理成功的消息。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2e551f08c70f41c1a9e8d02d242874af20cc5e10/2021/10/04/41c600ba04bb6070e6e53c69584a85f6.png)



## 3、MQ 的分类





### ActiveMQ



**优点：**

单机吞吐量万级，时效性 ms 级，可用性高，基于主从架构实现高可用性，消息可靠性较低的概率丢失数据

**缺点：**

官方社区现在对 ActiveMQ 5.x **维护越来越少，高吞吐量场景较少使用。**





### Kafka



大数据的杀手锏，谈到大数据领域内的消息传输，则绕不开 Kafka，这款为**大数据而生**的消息中间件，以其**百万级 TPS** 的吞吐量名声大噪，迅速成为大数据领域的宠儿，在数据采集、传输、存储的过程中发挥着举足轻重的作用。目前已经被 LinkedIn，Uber, Twitter, Netflix 等大公司所采纳。

**优点：** 

1. 性能卓越，单机写入 TPS 约在百万条/秒，**最大的优点，就是吞吐量高**。时效性 ms 级可用性非常高，
2. kafka 是分布式的，一个数据多个副本，少数机器宕机，不会丢失数据，不会导致不可用,消费者采用 Pull 方式获取消息, 消息有序, 通过控制能够保证所有消息被消费且仅被消费一次;
3. 有优秀的第三方Kafka Web 管理界面 Kafka-Manager；
4. 在日志领域比较成熟，被多家公司和多个开源项目使用；
5. 功能支持：功能较为简单，主要支持简单的 MQ 功能，在大数据领域的实时计算以及**日志采集**被大规模使用！

**缺点：**

1. Kafka 单机超过 64 个队列/分区，Load 会发生明显的飙高现象，队列越多，load 越高，发送消息响应时间变长
2. 使用短轮询方式，实时性取决于轮询间隔时间，消费失败不支持重试；
3. 支持消息顺序，但是一台代理宕机后，就会产生消息乱序，**社区更新较慢**；



### RocketMQ



RocketMQ 出自**阿里巴巴的开源产品**，用 Java 语言实现，在设计时参考了 Kafka，并做出了自己的一些改进。被阿里巴巴广泛应用在订单，交易，充值，流计算，消息推送，日志流式处理，binglog 分发等场景。

**优点：**

1. 单机吞吐量十万级,可用性非常高，分布式架构,**消息可以做到 0 丢失**
2. MQ 功能较为完善，还是分布式的，扩展性好,**支持 10 亿级别的消息堆积**，不会因为堆积导致性能下降
3. 源码是 java 我们可以自己阅读源码，定制自己公司的 MQ



**缺点：**

1. **支持的客户端语言不多**，目前是 java 及 c++，其中 c++不成熟；
2. 社区活跃度一般,没有在 MQ核心中去实现 JMS 等接口,有些系统要迁移需要修改大量代码



### RabbitMQ

2007 年发布，是一个在 AMQP(高级消息队列协议)基础上完成的，可复用的企业消息系统，**是当前最主流的消息中间件之一**。

**优点：**

1. 由于 erlang 语言的**高并发特性**，性能较好
2. **吞吐量到万级**，MQ 功能比较完备,健壮、稳定、易用、跨平台、**支持多种语言** 如：Python、Ruby、.NET、Java、JMS、C、PHP、ActionScript、XMPP、STOMP等，支持 AJAX 文档齐全
3. 开源提供的管理界面非常棒，用起来很好用
4. **社区活跃度高**；更新频率相当高

**缺点：**

- 商业版需要收费，学习成本较高





## 4、MQ 的选择 



### Kafka

Kafka 主要特点是基于 Pull 的模式来处理消息消费，追求高吞吐量，一开始的目的就是用于日志收集和传输，适合产生**大量数据**的互联网服务的数据收集业务。**大型公司**建议可以选用，如果有**日志采集**功能，肯定是首选 kafka 了。尚硅谷官网 kafka 视频连接 http://www.gulixueyuan.com/course/330/tasks

### RocketMQ

天生为**金融互联网领域**而生，对于可靠性要求很高的场景，尤其是电商里面的订单扣款，以及业务削峰，在大量交易涌入时，后端可能无法及时处理的情况。RoketMQ 在稳定性上可能更值得信赖，这些业务场景在阿里双 11 已经经历了多次考验，如果你的业务有上述并发场景，建议可以选择 RocketMQ。

### RabbitMQ

结合 erlang 语言本身的并发优势，性能好**时效性微秒级，社区活跃度也比较高**，管理界面用起来十分方便，如果你的**数据量没有那么大**，**中小型公司**优先选择功能比较完备的 RabbitMQ。









# 二、RabbitMQ



## 1、RabbitMQ 的概念 



RabbitMQ 是一个消息中间件：它接受并转发消息。你可以把它当做一个快递站点，当你要发送一个包裹时，你把你的包裹放到快递站，快递员最终会把你的快递送到收件人那里，按照这种逻辑 RabbitMQ 是一个快递站，一个快递员帮你传递快件。RabbitMQ 与快递站的主要区别在于，它不处理快件而是接收，存储和转发消息数据。

## 2、四大核心概念 



### 生产者

产生数据发送消息的程序是生产者！

### 交换机

交换机是 RabbitMQ 非常重要的一个部件，**一方面它接收来自生产者的消息，另一方面它将消息推送到队列中**。交换机必须确切知道如何处理它接收到的消息，是将这些消息推送到特定队列还是推送到多个队列，亦或者是把消息丢弃，这个得有交换机类型决定

### 队列

队列是 RabbitMQ 内部使用的一种数据结构，尽管消息流经 RabbitMQ 和应用程序，但它们只能存储在队列中。队列仅受主机的内存和磁盘限制的约束，本质上是一个大的**消息缓冲区**。许多生产者可以将消息发送到一个队列，许多消费者可以尝试从一个队列接收数据。这就是我们使用队列的方式

### 消费者

消费与接收具有相似的含义。消费者大多时候是一个等待接收消息的程序。请注意生产者，消费者和消息中间件很多时候并不在同一机器上。同一个应用程序既可以是生产者又是可以是消费者。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@95586c9c170b9a87e58ac49fccc887da98e0cc98/2021/10/04/1acf4a1111da7c55530d84c0ab7b43c5.png)





## 3、名词介绍





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@fd6d47103d4637fa575eb6414400669f08558f6c/2021/10/04/d4aa4aca082ab0db7c30fbe502247ce7.png)



**Broker：**接收和分发消息的应用，RabbitMQ Server 就是 Message Broker

**Virtual host**：出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似于网络中的 namespace 概念。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出多个 vhost，每个用户在自己的 vhost 创建 exchange／queue 等

**Connection：**publisher／consumer 和 broker 之间的 TCP 连接

**Channel：**如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP 

- Connection 的开销将是巨大的，效率也较低。Channel 是在 connection 内部建立的逻辑连接，如果应用程序支持多线程，通常每个 thread 创建单独的 channel 进行通讯，AMQP method 包含了 channel id 帮助客户端和 message broker 识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的Connection 极大减少了操作系统建立 TCP connection 的开销 

**Exchange：**message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发消息到 queue 中去。常用的类型有：direct (point-to-point), topic (publish-subscribe) and fanout (multicast)

**Queue：**消息最终被送到这里等待 consumer 取走

**Binding：**exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key，Binding 信息被保存到 exchange 中的查询表中，用于 message 的分发依据







## 4、RabbitMQ 安装





### 安装

> RabbitMq-Server默认端口5672
>
> **RabbitMQ使用erlang语言编写，因此需要安装erlang环境！**







**RabbitMQ 与 Erlang 版本选择：**

[https://www.rabbitmq.com/which-erlang.html](https://www.rabbitmq.com/which-erlang.html)



**erlang报错解决：**

[https://www.cnblogs.com/lantuanqing/p/11288531.html](https://www.cnblogs.com/lantuanqing/p/11288531.html)

```shell
yum install epel-release        
yum install unixODBC unixODBC-devel wxBase wxGTK SDL wxGTK-gl
```



**完整安装步骤：**

```shell
# 下载RabbitMQ
wget https://ghproxy.com/https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.9.7/rabbitmq-server-3.9.7-1.el7.noarch.rpm

# 下载erlang 去 erlang-solutions.com 镜像站下载即可！
wget https://packages.erlang-solutions.com/erlang/rpm/centos/7/x86_64/esl-erlang_24.0-1~centos~7_amd64.rpm

# rpm安装erlang 需要依赖下面两个
yum install epel-release        
yum install unixODBC unixODBC-devel wxBase wxGTK SDL wxGTK-gl
rpm -ivh erlang-21.3-1.el7.x86_64.rpm

# rpm安装RabbitMQ，需要依赖socat
yum install socat -y
rpm -ivh rabbitmq-server-3.8.8-1.el7.noarch.rpm
```



### 常用命令



rabbitmq可执行命令在`/sbin/service`下！

 

```shell
# 添加开机启动 RabbitMQ 服务
chkconfig rabbitmq-server on
# 启动服务
rabbitmq-server start 
# 查看服务状态
rabbitmq-server status 
# 停止服务
rabbitmq-server stop 
```





### web管理开启



> web管理默认端口15672



```shell
# 开启 web 管理插件
rabbitmq-plugins enable rabbitmq_management

# 创建账号密码
rabbitmqctl add_user admin 123
# 设置用户角色
rabbitmqctl set_user_tags admin administrator
# 设置用户权限
rabbitmqctl set_permissions [-p <vhostpath>] <user> <conf> <write> <read>
# 用户 user_admin 具有/vhost1 这个 virtual host 中所有资源的配置、写、读权限当前用户和角色
rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
# 查看用户列表
rabbitmqctl list_users

# 关闭web管理
rabbitmqctl stop_app
# 清除web管理
rabbitmqctl reset
# 重启web管理
rabbitmqctl start_app
```







# 三、HelloWorld



## 1、依赖引入





```xml
<dependencies>
    <!--rabbitmq 依赖客户端-->
    <dependency>
        <groupId>com.rabbitmq</groupId>
        <artifactId>amqp-client</artifactId>
        <version>5.8.0</version>
    </dependency>
    <!--操作文件流的一个依赖-->
    <dependency>
        <groupId>commons-io</groupId>
        <artifactId>commons-io</artifactId>
        <version>2.6</version>
    </dependency>
</dependencies>
```



## 2、生产者



```java
public class Producer {

    // 队列名称
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("82.156.11.189");
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("admin");
        // 默认端口5672
        //connectionFactory.setPort(5672);
        // 创建连接
        Connection connection = connectionFactory.newConnection();

        // 创建信道
        Channel channel = connection.createChannel();

        /**
         * 创建队列
         * 1. 队列名称
         * 2. 队列中消息是否持久化（默认存储在内存，不持久化，持久化存在硬盘）
         * 3. exclusive：true：只能本次Connection独占，false：消费者共享
         * 4. 是否自动删除队列
         * 5. 其他参数
         */
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);

        // 发消息
        String msg = "hello world!";
        /**
         * 1. 交换机
         * 2. 路由Key
         * 3. 其他参数
         * 4. 发送的消息
         */
        channel.basicPublish("", QUEUE_NAME, null, msg.getBytes());
        System.out.println("消息发送完毕！");
    }
}
```



## 3、消费者







```java
public class Consumer {

    // 队列名称
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {

        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("82.156.11.189");
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("admin");
        Connection connection = connectionFactory.newConnection();

        Channel channel = connection.createChannel();

        // 声明成功消费回调，函数式接口
        DeliverCallback deliverCallback = (String consumerTag, Delivery message) ->{
            System.out.println(message);
            // 获取消息体
            System.out.println(new String(message.getBody()));
        };
        // 声明未成功消费回调，函数式接口
        CancelCallback cancelCallback = (String consumerTag) -> {
            System.out.println("消费者消费消息被中断！");
        };
        /**
         * 消费者接收消息！
         * 1. 消费哪个队列
         * 2. 消费成功之后是否要自动应答 true 代表自动应答 false 手动应答
         * 3. 消费者成功消费的回调
         * 4. 消费者未成功消费的回调
         */
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, cancelCallback);
    }
}
```







# 四、Work Queues



> 工作队列(又称任务队列)的主要思想是避免立即执行资源密集型任务，而不得不等待它完成。相反我们安排任务在之后执行。我们把任务封装为消息并将其发送到队列。在后台运行的工作进程将弹出任务并最终执行作业。当有多个工作线程时，这些工作线程将一起处理这些任务。





## 1、轮询分发消息





### 抽取工具类



```java
package com.itnxd.rabbitmq.utils;


import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

/**
 * @author ITNXD
 * @create 2021-10-02 12:51
 */
public class RabbitMqUtils {

    public static Channel getChannel() throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("82.156.11.189");
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("admin");
        // 默认端口5672
        //connectionFactory.setPort(5672);
        // 创建连接
        Connection connection = connectionFactory.newConnection();

        // 创建信道
        Channel channel = connection.createChannel();

        return channel;
    }
}
```



### 启动两个消费者线程



**新版IDEA设置一个方法多启动：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@ba56e9029f33e3af1c11a3d8b9721bb3fcd272ea/2021/10/04/427ced52eb04544b3603f53edc987656.png)



**两次启动main方法，启动完一次修改打印为工作线程二即可：**



```java
public class Worker01 {

    // 队列名称
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel();

        // 声明成功消费回调，函数式接口
        DeliverCallback deliverCallback = (String consumerTag, Delivery message) ->{
            System.out.println(message);
            // 获取消息体
            System.out.println(new String(message.getBody()));
        };
        // 声明未成功消费回调，函数式借口
        CancelCallback cancelCallback = (String consumerTag) -> {
            System.out.println(consumerTag + "消费者消费消息被中断回调逻辑！");
        };

        System.out.println("工作线程二.............");
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, cancelCallback);
    }
}
```



### 启动生产者



```java
public class Task01 {
    // 队列名称
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel();

        // 队列声明
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);

        // 从控制台输入消息
        Scanner scanner = new Scanner(System.in);
        while(scanner.hasNext()){
            String msg = scanner.next();
            channel.basicPublish("", QUEUE_NAME, null, msg.getBytes());
            System.out.println("发送消息完成：" + msg);
        }
    }
}
```





### 结果



轮询分发消息，线程一二交替收到消息！





## 2、消息应答



> 为了保证消息在发送过程中不丢失，rabbitmq 引入消息应答机制，消息应答就是:消费者在接收到消息并且处理该消息之后，告诉 rabbitmq 它已经处理了，rabbitmq 可以把该消息删除了。





### 自动应答



消费者收到消息立马向队列应答可以删除消息！



- 这种模式需要在**高吞吐量和数据传输安全性方面做权衡**，因为这种模式如果消息在接收到之前，消费者那边出现连接或者 channel 关闭，那么消息就丢失了
- 当然另一方面这种模式消费者那边可以传递过载的消息，**没有对传递的消息数量进行限制**，有可能使得消费者这边由于接收太多还来不及处理的消息，导致这些消息的积压，最终使得内存耗尽，最终这些消费者线程被操作系统杀死
- 所以这种模式**仅适用在消费者可以高效并以某种速率能够处理这些消息**的情况下使用





### 手动应答



消费者收到消息处理完毕后我们可以手动进行应答！**消费者应答失败还会自动进行重新入队**！



**三种消息应答方法：**



```java
// 用于肯定确认
Channel.basicAck()
// 用于否定确认
B.Channel.basicNack()
// 用于否定确认
C.Channel.basicReject()
```





**Multiple参数：**



是否批量应答！

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e99eed1051e68d16863c56ebcdebe861c20aee56/2021/10/04/a82cd91fb95d09216aefa08e0ca19459.png)



```java
// 声明成功消费回调，函数式接口
DeliverCallback deliverCallback = (String consumerTag, Delivery message) ->{
    // 获取消息体
    System.out.println(new String(message.getBody()));
    // 手动应答
    /**
     * 1. 消息的标记
     * 2. 是否批量应答（不建议）
     */
    channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
};
```





**手动应答代码：**



> 默认消息采用的是自动应答，所以我们要想实现消息消费过程中不丢失，需要把自动应答改为手动应答。



```java
public class Worker02 {

    public static final String QUEUE_NAME = "ack_queue";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel();

        // 声明成功消费回调，函数式接口
        DeliverCallback deliverCallback = (String consumerTag, Delivery message) ->{
            // 获取消息体
            System.out.println(new String(message.getBody()));
            // 手动应答
            /**
             * 1. 消息的标记
             * 2. 是否批量应答（不建议）
             */
            channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
        };
        // 声明未成功消费回调，函数式借口
        CancelCallback cancelCallback = (String consumerTag) -> {
            System.out.println(consumerTag + "消费者消费消息被中断回调逻辑！");
        };

        // 消费消息 自动应答关闭，开启手动应答
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, cancelCallback);
    }
}
```





## 3、RabbitMQ 持久化





> 刚刚我们已经看到了如何处理任务不丢失的情况，但是如何保障当 **RabbitMQ 服务停掉**以后消息生产者发送过来的消息不丢失。
>
> 默认情况下 RabbitMQ 退出或由于某种原因崩溃时，它忽视队列和消息，除非告知它不要这样做。
>
> 确保消息不会丢失需要做两件事：我们需要将**队列和消息都标记为持久化**。





### 队列持久化



之前我们创建的队列都是非持久化的，rabbitmq 如果重启的化，该队列就会被删除掉，如果要队列实现持久化，需要在声明队列的时候把 durable 参数设置为持久化！

**注意：** 如果之前声明的队列不是持久化的，需要把原先队列先删除，或者重新创建一个持久化的队列，不然就会出现错误



```java
// 第二个参数durable设置为true即可
channel.queueDeclare(QUEUE_NAME, true, false, false, null);
```















### 消息持久化


要想让消息实现持久化需要在消息生产者修改代码，`MessageProperties.PERSISTENT_TEXT_PLAIN` 添加这个属性。



```java
// 第三个参数
channel.basicPublish("", QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN, msg.getBytes("UTF-8"));
```



### 小总结



将消息标记为持久化并不能完全保证不会丢失消息。尽管它告诉 RabbitMQ 将消息保存到磁盘，但是这里依然存在当消息刚准备存储在磁盘的时候 但是还没有存储完，消息还在缓存的一个间隔点。此时并没有真正写入磁盘。持久性保证并不强，但是对于我们的简单任务队列而言，这已经绰绰有余了。如果需要更强有力的持久化策略，参考后边课件发布确认章节。



## 4、不公平分发 





> 我们之前采用的轮训分发，但是在某种场景下这种策略并不是很好，比方说有两个消费者在处理任务，其中有个消费者 1 处理任务的速度非常快，而另外一个消费者 2处理速度却很慢，这个时候我们还是采用轮训分发的化就会到这处理速度快的这个消费者很大一部分时间处于空闲状态，而处理慢的那个消费者一直在干活，这种分配方式在这种情况下其实就不太好，但是RabbitMQ 并不知道这种情况它依然很公平的进行分发。







**为了避免这种情况，我们可以设置参数 `channel.basicQos(1);`**



**方法参数为prefetch预期值：** 类似设置了消费者的一个等待队列容量，放满了就不放了，但是消费后有了剩余空间还是会继续放！

- 默认0公平分发
- 改为1表示不公平分发，优先分配给空闲消费者
- 其他值则会在第一次遵循设置的预取值比例进行分发，后续则按照队列容量有了空闲后再发



消费者方设置即可！

```java
// 不公平分发（默认0公平分发）
// 预取值2（前七条消息一定是2:5分配，之后的不一定！）
channel.basicQos(2);

// 另一个消费者
channel.basicQos(5);
```













# 五、发布确认







## 1、发布确认原理



生产者将信道设置成 confirm 模式，一旦信道进入 confirm 模式，所有在该信道上面发布的消息都将会被指派一个唯一的 ID(从 1 开始)，一旦消息被投递到所有匹配的队列之后，broker就会发送一个确认给生产者(包含消息的唯一 ID)，这就使得生产者知道消息已经正确到达目的队列了

如果消息和队列是**可持久化**的，那么确认消息会在将消息**写入磁盘**之后发出，broker 回传给生产者的确认消息中 delivery-tag 域包含了确认消息的序列号，此外 broker 也可以设置basic.ack 的 multiple 域，表示到这个序列号之前的所有消息都已经得到了处理。





confirm 模式最大的好处在于他是**异步**的，一旦发布一条消息，生产者应用程序就可以在等信道返回确认的同时继续发送下一条消息，当消息最终得到确认之后，生产者应用便可以通过回调方法来处理该确认消息，如果 RabbitMQ 因为自身内部错误导致消息丢失，就会发送一条 nack 消息，生产者应用程序同样可以在回调方法中处理该 nack 消息。





## 2、发布确认策略







### 开启发布确认

发布确认默认是没有开启的，如果要开启需要调用方法 confirmSelect，每当你要想使用发布确认，都需要在 channel 上调用该方法！



生产者方开启：

```java
// 开启发布确认
channel.confirmSelect();
```





### 单个确认

这是一种简单的确认方式，它是一种**同步确认发布**的方式，也就是发布一个消息之后只有它被确认发布，后续的消息才能继续发布, `waitForConfirmsOrDie(long)`这个方法只有在消息被确认的时候才返回，如果在指定时间范围内这个消息没有被确认那么它将抛出异常。

这种确认方式有一个最大的缺点就是:**发布速度特别的慢**，因为如果没有确认发布的消息就会阻塞所有后续消息的发布，这种方式最多提供每秒不超过数百条发布消息的吞吐量。当然对于某些应用程序来说这可能已经足够了。





```java
public static void publishMessageSingle() throws IOException, TimeoutException, InterruptedException {
    Channel channel = RabbitMqUtils.getChannel();
    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName, false, false, false, null);

    // 开启发布确认
    channel.confirmSelect();

    long begin = System.currentTimeMillis();

    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String msg = i + "";
        channel.basicPublish("", queueName, null, msg.getBytes());
        // 服务端返回 false 或超时时间内未返回，生产者可以消息重发
        channel.waitForConfirms();
    }

    long end = System.currentTimeMillis();

    System.out.println(end - begin);
}
```







### 批量确认

先发布**一批**消息然后一起确认可以极大地提高吞吐量！

当然这种方式的缺点就是：当发生故障导致发布出现问题时，不知道是哪个消息出现问题了，我们必须将整个批处理保存在内存中，以记录重要的信息而后重新发布消息。

当然这种方案仍然是**同步**的，也一样**阻塞**消息的发布。



```java
public static void publishMessageBatch() throws IOException, TimeoutException, InterruptedException {
    Channel channel = RabbitMqUtils.getChannel();
    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName, false, false, false, null);

    // 开启发布确认
    channel.confirmSelect();
    // 批量确认长度
    int batchSize = 100;

    long begin = System.currentTimeMillis();

    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String msg = i + "";
        channel.basicPublish("", queueName, null, msg.getBytes());
        if(i % batchSize == 0){
            channel.waitForConfirms();
        }
    }

    long end = System.currentTimeMillis();

    System.out.println(end - begin);
}
```





### 异步确认



异步确认虽然编程逻辑比上两个要复杂，但是性价比最高，无论是可靠性还是效率都没得说，他是利用回调函数来达到消息可靠性传递的，这个中间件也是通过函数回调来保证是否投递成功。





```java
public static void publishMessageAsync() throws IOException, TimeoutException, InterruptedException {
    Channel channel = RabbitMqUtils.getChannel();
    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName, false, false, false, null);

    // 开启发布确认
    channel.confirmSelect();

    // 消息确认成功回调！
    ConfirmCallback ackCallback = (long deliveryTag, boolean multiple) -> {
        System.out.println("确认的消息：" + deliveryTag);
    };
    // 消息确认失败回调！
    // 消息的标记 是否为批量确认
    ConfirmCallback nackCallback = (long deliveryTag, boolean multiple) -> {
        System.out.println("未确认的消息：" + deliveryTag);
    };

    // 准备消息监听器（异步）监听消息的成功与失败！
    channel.addConfirmListener(ackCallback, nackCallback);

    long begin = System.currentTimeMillis();

    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String msg = i + "";
        channel.basicPublish("", queueName, null, msg.getBytes());
    }

    long end = System.currentTimeMillis();

    System.out.println(end - begin);
}
```





### 异步未确认消息处理

最好的解决的解决方案就是把未确认的消息放到一个基于内存的能被发布线程访问的队列，比如说用 ConcurrentLinkedQueue 这个队列在 confirm callbacks 与发布线程之间进行消息的传递。



```java
public static void publishMessageAsync() throws IOException, TimeoutException, InterruptedException {
    Channel channel = RabbitMqUtils.getChannel();
    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName, false, false, false, null);

    // 开启发布确认
    channel.confirmSelect();

    /**
     * 线程安全有序的一个哈希表，适用于高并发！可以处理异步未确认消息 ！
     * 1. 将序号和消息关联
     * 2. 批量删除条目
     * 3. 支持高并发
     */
    ConcurrentSkipListMap<Long, String> outstandingConfirms = new ConcurrentSkipListMap<>();

    // 消息确认成功回调！
    ConfirmCallback ackCallback = (long deliveryTag, boolean multiple) -> {
        if(multiple){
            // 2. 删除已确认消息，剩下就是未确认
            ConcurrentNavigableMap<Long, String> confirmed =
                    outstandingConfirms.headMap(deliveryTag);
            //  删除
            confirmed.clear();
        }else{
            //  删除
            outstandingConfirms.remove(deliveryTag);
        }


        System.out.println("确认的消息：" + deliveryTag);
    };
    // 消息确认失败回调！
    // 消息的标记 是否为批量确认
    ConfirmCallback nackCallback = (long deliveryTag, boolean multiple) -> {
        // 3. 打印未确认消息
        String msg = outstandingConfirms.get(deliveryTag);
        System.out.println("未确认的消息：" + deliveryTag + "  " + msg);
    };

    // 准备消息监听器（异步）监听消息的成功与失败！
    channel.addConfirmListener(ackCallback, nackCallback);

    long begin = System.currentTimeMillis();

    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String msg = i + "";
        // 1. 记录要发送的消息
        outstandingConfirms.put(channel.getNextPublishSeqNo(), msg);

        channel.basicPublish("", queueName, null, msg.getBytes());
    }

    long end = System.currentTimeMillis();

    System.out.println(end - begin);
}
```









### 总结

- 单独发布消息：同步等待确认，简单，但吞吐量非常有限。处理速度慢！
- 批量发布消息：批量同步等待确认，简单，合理的吞吐量，一旦出现问题但很难推断出是那条消息出现了问题。
- **异步处理：最佳性能和资源使用，在出现错误的情况下可以很好地控制，但是实现起来稍微难些，速度同样最快**









# 六、交换机Exchange





## 1、Exchange



### 概念 



生产者只能将消息发送到交换机(exchange)。

交换机工作的内容非常简单，一方面它接收来自生产者的消息，另一方面将它们推入队列。

交换机必须确切知道如何处理收到的消息，把这些消息放到特定队列还是说把他们到许多队列中还是说应该丢弃它们。这就的由交换机的类型来决定。



### 类型 


直接(direct), 主题(topic) ,标题(headers) , 扇出(fanout)！



我们之前没有添加的交换机就是默认交换机，第一个参数是交换机的名称。空字符串表示默认或无名称交换机，消息能路由发送到队列中其实是由routingKey指定的。



```java
channel.basicPublish("", queueName, null, msg.getBytes());
```





### 临时队列



每当我们连接到 Rabbit 时，我们都需要一个全新的空队列，为此我们可以创建一个具有**随机名称的队列**，或者能让服务器为我们选择一个随机队列名称那就更好了。其次一旦我们**断开了消费者的连接，队列将被自动删除**。



创建临时队列的方式如下：

```java
String queueName = channel.queueDeclare().getQueue();
```



创建出来之后长成这样：

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2968dcdc0197e1facd09b2b948e73f934560f3c4/2021/10/04/99634aeaae8a1898b7820920717dbd28.png)



## 2、Fanout Exchange



Fanout 这种类型非常简单。正如从名称中猜到的那样，它是将接收到的所有消息**广播**到它知道的所有队列中。



### 代码架构图

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@ccbc65036cc91ff222e0396d578fa9b9caf8bb20/2021/10/04/51fbc9fce1642ac4e5c0810428734ba2.png)

### 生产者



```java
public class EmitLog {

    // 交换机名字
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        Scanner scanner = new Scanner(System.in);
        while(scanner.hasNext()){
            String msg = scanner.next();
            // routingkey无论是啥，都是广播，消费者都可以接收到！
            channel.basicPublish(EXCHANGE_NAME, "", null, msg.getBytes());
        }
    }
}
```





### 消费者一



```java
public class ReceiveLogs01 {

    // 交换机名字
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        /**
         * 创建临时队列！
         * 队列名称随机！
         * 消费者断开连接将自动删除！
         */
        String queue = channel.queueDeclare().getQueue();

        // 交换机绑定队列
        channel.queueBind(queue, EXCHANGE_NAME, "");
        System.out.println("等待接收消息........");

        // 消费者消费消息
        DeliverCallback deliverCallback = (String consumerTag, Delivery message) -> {
            System.out.println("接收消息C1：" + new String(message.getBody()));
        };
        channel.basicConsume(queue, true, deliverCallback, consumerTag -> {});
    }
}
```



### 消费者二



```java
public class ReceiveLogs02 {
    // 交换机名字
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        /**
         * 创建临时队列！
         * 队列名称随机！
         * 消费者断开连接将自动删除！
         */
        String queue = channel.queueDeclare().getQueue();

        // 交换机绑定队列
        channel.queueBind(queue, EXCHANGE_NAME, "");
        System.out.println("等待接收消息........");

        // 消费者消费消息
        DeliverCallback deliverCallback = (String consumerTag, Delivery message) -> {
            System.out.println("接收消息C2：" + new String(message.getBody()));
        };
        channel.basicConsume(queue, true, deliverCallback, consumerTag -> {});
    }
}
```







## 3、Direct Exchange



通过RoutingKey指定到达的队列！

当然如果 exchange 的绑定类型是 direct，但是它绑定的多个队列的 key 如果都相同，在这种情况下虽然绑定类型是 direct 但是它表现的就和 fanout 有点类似了，就跟广播差不多！





### 代码架构图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@35667ce11b856b45e3cc33e9988dd16876ca8791/2021/10/04/d340cc001c730dccc67f3da9673c4a7b.png)



### 生产者



```java
public class EmitLogDirect {

    private static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] argv) throws Exception {

        try (Channel channel = RabbitMqUtils.getChannel()) {
            channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
            //创建多个 bindingKey
            Map<String, String> bindingKeyMap = new HashMap<>();
            bindingKeyMap.put("info","普通 info 信息");
            bindingKeyMap.put("warning","警告 warning 信息");
            bindingKeyMap.put("error","错误 error 信息");
            //debug 没有消费这接收这个消息 所有就丢失了
            bindingKeyMap.put("debug","调试 debug 信息");

            for (Map.Entry<String, String> bindingKeyEntry: bindingKeyMap.entrySet()){
                String bindingKey = bindingKeyEntry.getKey();
                String message = bindingKeyEntry.getValue();
                channel.basicPublish(EXCHANGE_NAME,bindingKey, null, message.getBytes());
                System.out.println("生产者发出消息:" + message);
            }
        }
    }
}
```





### 消费者一



```java
public class ReceiveLogsDirect01 {

    private static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        String queueName = "disk";
        channel.queueDeclare(queueName, false, false, false, null);
        channel.queueBind(queueName, EXCHANGE_NAME, "error");

        System.out.println("等待接收消息.....");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("接收绑定键:"+delivery.getEnvelope().getRoutingKey()+",消息:"+message);
            System.out.println("错误日志已经接收");
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```





### 消费者二



```java
public class ReceiveLogDirect02 {
    private static final String EXCHANGE_NAME = "direct_logs";
    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        String queueName = "console";
        channel.queueDeclare(queueName, false, false, false, null);

        // 多重绑定
        channel.queueBind(queueName, EXCHANGE_NAME, "info");
        channel.queueBind(queueName, EXCHANGE_NAME, "warning");
        System.out.println("等待接收消息.....");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" 接收绑定键 :"+delivery.getEnvelope().getRoutingKey()+", 消息:"+message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```



## 4、Topic Exchange



更加灵活的RoutingKey匹配！





### Topic要求



发送到类型是 topic 交换机的消息的 routingkey 不能随意写，必须满足一定的要求，它必须是一个单词列表，以点号分隔开。

这些单词可以是任意单词，比如说："stock.usd.nyse", "nyse.vmw", "quick.orange.rabbit"这种类型的。当然这个单词列表最多不能超过 255 个字节。

在这个规则列表中，其中有两个替换符是大家需要注意的

- `*`：可以代替一个单词
- `#`：可以替代零个或多个单词





**当队列绑定关系是下列这种情况时需要引起注意：**

- 当一个队列绑定键是`#`,那么这个队列将接收所有数据，就有点像 fanout 了
- 如果队列绑定键当中没有`#`和`*`出现，那么该队列绑定类型就是 direct 了





### 代码架构图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6e9746fa92ef507656f8141667c8f8f70f820045/2021/10/04/53bd973371240faa0a20ac29108532aa.png)





### 生产者



```java
public class EmitLogTopic {

    private static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] argv) throws Exception {
        try (Channel channel = RabbitMqUtils.getChannel()) {
            channel.exchangeDeclare(EXCHANGE_NAME, "topic");
            /**
             * Q1-->绑定的是
             * 中间带 orange 带 3 个单词的字符串(*.orange.*)
             * Q2-->绑定的是
             * 最后一个单词是 rabbit 的 3 个单词(*.*.rabbit)
             * 第一个单词是 lazy 的多个单词(lazy.#)
             *
             */
            Map<String, String> bindingKeyMap = new HashMap<>();
            bindingKeyMap.put("quick.orange.rabbit","被队列 Q1Q2 接收到");
            bindingKeyMap.put("lazy.orange.elephant","被队列 Q1Q2 接收到");
            bindingKeyMap.put("quick.orange.fox","被队列 Q1 接收到");
            bindingKeyMap.put("lazy.brown.fox","被队列 Q2 接收到"); bindingKeyMap.put("lazy.pink.rabbit","虽然满足两个绑定但只被队列 Q2 接收一次");
            bindingKeyMap.put("quick.brown.fox","不匹配任何绑定不会被任何队列接收到会被丢弃");
            bindingKeyMap.put("quick.orange.male.rabbit","是四个单词不匹配任何绑定会被丢弃");
            bindingKeyMap.put("lazy.orange.male.rabbit","是四个单词但匹配 Q2");

            for (Map.Entry<String, String> bindingKeyEntry: bindingKeyMap.entrySet()){
                String bindingKey = bindingKeyEntry.getKey();
                String message = bindingKeyEntry.getValue();
                channel.basicPublish(EXCHANGE_NAME,bindingKey, null, message.getBytes("UTF-8"));
                System.out.println("生产者发出消息" + message);
            }
        }
    }
}
```



### 消费者一



```java
public class ReceiveLogsTopic01 {

    private static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "topic");

        //声明 Q1 队列与绑定关系
        String queueName = "Q1";
        channel.queueDeclare(queueName, false, false, false, null);

        channel.queueBind(queueName, EXCHANGE_NAME, "*.orange.*");
        System.out.println("等待接收消息.....");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" 接收队列 :" + queueName + " 绑 定 键:"+delivery.getEnvelope().getRoutingKey()+", 消息:"+message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```



### 消费者二



```java
public class ReceiveLogsTopic02 {

    private static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "topic");

        //声明 Q2 队列与绑定关系
        String queueName = "Q2";
        channel.queueDeclare(queueName, false, false, false, null);
        channel.queueBind(queueName, EXCHANGE_NAME, "*.*.rabbit");
        channel.queueBind(queueName, EXCHANGE_NAME, "lazy.#");

        System.out.println("等待接收消息.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" 接收队列 :" + queueName + " 绑 定 键:"+delivery.getEnvelope().getRoutingKey()+", 消息:"+message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```











# 七、死信队列





## 1、死信的概念



死信，顾名思义就是无法被消费的消息，字面意思可以这样理解，一般来说，producer 将消息投递到 broker 或者直接到 queue 里了，consumer 从queue 取出消息进行消费，但某些时候由于特定的原因**导致 queue 中的某些消息无法被消费**，这样的消息如果没有后续的处理，就变成了死信，有死信自然就有了死信队列。



**应用场景：**

为了保证订单业务的消息数据不丢失，需要使用到 RabbitMQ 的死信队列机制，当消息消费发生异常时，将消息投入死信队列中。比如说: 用户在商城下单成功并点击去支付后在指定时间未支付时自动失效。





## 2、死信的来源





1. 消息 TTL 过期
2. 队列达到最大长度(队列满了，无法再添加数据到 mq 中)
3. 消息被拒绝(basic.reject 或 basic.nack)并且 requeue=false





## 3、死信案例





### 代码架构图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@ee18116a007a7916dfad9fc219685784abea0a7c/2021/10/04/8860b616c3ded7952a52a61ac73268a6.png)



### 生产者



```java
public class Producer {

    private static final String NORMAL_EXCHANGE = "normal_exchange";

    public static void main(String[] argv) throws Exception {
        try (Channel channel = RabbitMqUtils.getChannel()) {
            channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT);
            //设置消息的 TTL 时间
            AMQP.BasicProperties properties = new AMQP.BasicProperties()
                    .builder().expiration("10000").build();
            //该信息是用作演示队列个数限制
            for (int i = 1; i < 11; i++) {
                String message = "info" + i;
                channel.basicPublish(NORMAL_EXCHANGE, "zhangsan", properties,
                        message.getBytes());
                System.out.println("生产者发送消息:" + message);
            }
        }
    }
}
```















### 消费者一



模拟三种发生死信情况！发生死信立即转发到死信队列！等待消费者消费！



**启动穿件完队列之后关闭该消费者 模拟其接收不到消息！**



1. 消息 TTL 过期（生产者中设置）
2. 队列达到最大长度（消息生产者代码去掉 TTL 属性）
3. 消息被拒绝（消息生产者代码去掉 TTL 属性）



```java
public class Consumer01 {
    //普通交换机名称
    private static final String NORMAL_EXCHANGE = "normal_exchange";
    //死信交换机名称
    private static final String DEAD_EXCHANGE = "dead_exchange";

    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        //声明死信和普通交换机 类型为 direct
        channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT);
        channel.exchangeDeclare(DEAD_EXCHANGE, BuiltinExchangeType.DIRECT);

        //声明死信队列
        String deadQueue = "dead-queue";
        channel.queueDeclare(deadQueue, false, false, false, null);
        //死信队列绑定死信交换机与 routingkey
        channel.queueBind(deadQueue, DEAD_EXCHANGE, "lisi");

        //正常队列绑定死信队列信息
        Map<String, Object> params = new HashMap<>();
        //正常队列设置死信交换机 参数 key 是固定值
        params.put("x-dead-letter-exchange", DEAD_EXCHANGE);
        //正常队列设置死信 routing-key 参数 key 是固定值
        params.put("x-dead-letter-routing-key", "lisi");

        // 队列达到最大长度模拟，注意队列一旦创建参数不可修改，这里要想生效可以从web页面中删掉
        // 该队列！重新创建！
        params.put("x-max-length", "6");

        String normalQueue = "normal-queue";
        channel.queueDeclare(normalQueue, false, false, false, params);
        channel.queueBind(normalQueue, NORMAL_EXCHANGE, "zhangsan");
        System.out.println("等待接收消息.....");

        DeliverCallback deliverCallback = (String consumerTag, Delivery message) -> {
            String msg = new String(message.getBody(), "UTF-8");
            // 模拟消息被拒！
            if(msg.equals("info5")){
                System.out.println("Consumer01 接收到消息"+msg + "：是被拒绝的！");
                // 拒绝该条消息，requeue为false则不放回原队列，自动进入死信队列
                channel.basicReject(message.getEnvelope().getDeliveryTag(), false);
            }else{
                System.out.println("Consumer01 接收到消息"+msg);
                // 不拒绝则返回ack确认！
                channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
            }
        };
        // 模拟消息被拒，要改变为手动应答！自动应答无法实现拒绝！
        channel.basicConsume(normalQueue, false, deliverCallback, consumerTag -> {});
    }
}
```



### 消费者二

消费私信队列消息！

```java
package com.itnxd.rabbitmq.eight;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.itnxd.rabbitmq.utils.RabbitMqUtils;

public class Consumer02 {
    private static final String DEAD_EXCHANGE = "dead_exchange";

    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        String deadQueue = "dead-queue";
        System.out.println("等待接收死信队列消息.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("Consumer02 接收死信队列的消息" + message);
        };
        channel.basicConsume(deadQueue, true, deliverCallback, consumerTag -> {});
    }
}
```



### 结果



**TTL超时：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@cf5f4d2ef2e018f3bae6f2357256dd74e7940a76/2021/10/04/1695f6e16eda5e6635df1278aa139b30.png)



**队列已满：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@7d301f0d68c8d35546d4c649bc1f0d9f1999ab80/2021/10/04/4ec2df2ea10647d257da46d37cdce38c.png)





**消息被拒：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8831fa340b18924206668e38cc36a5bb85a3ceee/2021/10/04/cac4782d836785db3e977c5f968d8479.png)







# 八、延迟队列







## 1、延迟队列概念



延时队列：队列内部是有序的，最重要的特性就体现在它的延时属性上，延时队列中的元素是希望在指定时间到了以后或之前取出和处理，简单来说，延时队列就是用来存放需要在指定时间被处理的元素的队列。







## 2、延迟队列使用场景



1. 订单在十分钟之内未支付则自动取消
2. 新创建的店铺，如果在十天内都没有上传过商品，则自动发送消息提醒。
3. 用户注册成功后，如果三天内没有登陆则进行短信提醒。
4. 用户发起退款，如果三天内没有得到处理则通知相关运营人员。
5. 预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议





这些场景都有一个特点，需要在某个事件发生之后或者之前的指定时间点完成某一项任务！

看起来似乎使用定时任务，一直轮询数据，每秒查一次，取出需要被处理的数据，然后处理不就完事了吗？

如果数据量比较少，确实可以这样做，但对于数据量比较大，并且时效性较强的场景对这么庞大的数据量仍旧使用轮询的方式显然是不可取的，无法满足业务要求而且性能低下。







## 3、整合SpringBoot





### pom依赖





```xml
<!--RabbitMQ 依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
<!--swagger-->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
<!--RabbitMQ 测试依赖-->
<dependency>
    <groupId>org.springframework.amqp</groupId>
    <artifactId>spring-rabbit-test</artifactId>
    <scope>test</scope>
</dependency>
```





### properties



```properties
spring.com.itnxd.rabbitmq.host=82.156.11.189
spring.com.itnxd.rabbitmq.port=5672
spring.com.itnxd.rabbitmq.username=admin
spring.com.itnxd.rabbitmq.password=admin
```



### Swagger 配置类



```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket webApiConfig() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("webApi")
                .apiInfo(webApiInfo())
                .select().build();
    }

    private ApiInfo webApiInfo() {
        return new ApiInfoBuilder()
                .title("com.itnxd.rabbitmq 接口文档")
                .description("本文档描述了 com.itnxd.rabbitmq 微服务接口定义")
                .version("1.0")
                .contact(new Contact("xxxx", "http://xxx.com",
                        "xxx@qq.com"))
                .build();
    }
}
```





## 4、队列TTL











### 代码架构图

创建两个队列 QA 和 QB，两者队列 TTL 分别设置为 10S 和 40S，然后在创建一个交换机 X 和死信交换机 Y，它们的类型都是 direct，创建一个死信队列 QD，它们的绑定关系如下：

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6556b6bc672f14394bb7f390758b930fcd0debb2/2021/10/04/79d592a699655dfc9ac8f7371b385d09.png)







### 配置类



```java
@Configuration
public class TtlQueueConfig {

    public static final String X_EXCHANGE = "X";
    public static final String QUEUE_A = "QA";
    public static final String QUEUE_B = "QB";
    public static final String Y_DEAD_LETTER_EXCHANGE = "Y";
    public static final String DEAD_LETTER_QUEUE = "QD";

    // 声明 xExchange
    @Bean("xExchange")
    public DirectExchange xExchange(){
        return new DirectExchange(X_EXCHANGE);
    }

    // 声明 xExchange
    @Bean("yExchange")
    public DirectExchange yExchange(){
        return new DirectExchange(Y_DEAD_LETTER_EXCHANGE);
    }

    //声明队列 A ttl 为 10s 并绑定到对应的死信交换机
    @Bean("queueA")
    public Queue queueA(){
        Map<String, Object> args = new HashMap<>(3);
        //声明当前队列绑定的死信交换机
        args.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        //声明当前队列的死信路由 key
        args.put("x-dead-letter-routing-key", "YD");
        //声明队列的 TTL
        args.put("x-message-ttl", 10000);
        return QueueBuilder.durable(QUEUE_A).withArguments(args).build();
    }

    // 声明队列 A 绑定 X 交换机
    @Bean
    public Binding queueaBindingX(@Qualifier("queueA") Queue queueA,
                                  @Qualifier("xExchange") DirectExchange xExchange){
        return BindingBuilder.bind(queueA).to(xExchange).with("XA");
    }

    //声明队列 B ttl 为 40s 并绑定到对应的死信交换机
    @Bean("queueB")
    public Queue queueB(){
        Map<String, Object> args = new HashMap<>(3);
        //声明当前队列绑定的死信交换机
        args.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        //声明当前队列的死信路由 key
        args.put("x-dead-letter-routing-key", "YD");
        //声明队列的 TTL
        args.put("x-message-ttl", 40000);
        return QueueBuilder.durable(QUEUE_B).withArguments(args).build();
    }

    //声明队列 B 绑定 X 交换机
    @Bean
    public Binding queuebBindingX(@Qualifier("queueB") Queue queue1B,
                                  @Qualifier("xExchange") DirectExchange xExchange){
        return BindingBuilder.bind(queue1B).to(xExchange).with("XB");
    }

    //声明死信队列 QD
    @Bean("queueD")
    public Queue queueD(){
        return new Queue(DEAD_LETTER_QUEUE);
    }
    //声明死信队列 QD 绑定关系
    @Bean
    public Binding deadLetterBindingQAD(@Qualifier("queueD") Queue queueD,
                                        @Qualifier("yExchange") DirectExchange yExchange){
        return BindingBuilder.bind(queueD).to(yExchange).with("YD");
    }
}
```





### 生产者



```java
/**
 * @author ITNXD
 * @create 2021-10-02 22:12
 *
 * 发起一个请求 http://localhost:8080/ttl/sendMsg/嘻嘻嘻
 */
// @RestController是@Controller和@ResponseBody的结合体，两个标注合并起来的作用。
@Slf4j
@RestController
@RequestMapping("/ttl")
public class SendMsgController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    // 发消息
    @GetMapping("/sendMsg/{message}")
    public void sendMsg(@PathVariable String message){
        log.info("当 前 时 间：{},发送一条信息给两个 TTL 队列:{}", new Date(), message);

        rabbitTemplate.convertAndSend("X", "XA", "消息来自 ttl 为 10S 的队列: "+message);
        rabbitTemplate.convertAndSend("X", "XB", "消息来自 ttl 为 40S 的队列: "+message);
    }
}
```



### 消费者



```java
@Slf4j
@Component
public class DelayedQueueConsumer {

    public static final String DELAYED_QUEUE_NAME = "delayed.queue";

    // 接收消息
    @RabbitListener(queues = DELAYED_QUEUE_NAME)
    public void receiveDelayedQueue(Message message){
        String msg = new String(message.getBody());
        log.info("当 前 时 间：{},收到延时队列的消息：{}", new Date().toString(), msg);
    }
}
```





### 测试



发起 `http://localhost:8080/ttl/sendMsg/嘻嘻嘻` 请求：

第一条消息在 10S 后变成了死信消息，然后被消费者消费掉，第二条消息在 40S 之后变成了死信消息，然后被消费掉，这样一个延时队列就打造完成了。



**产生的问题？**

不过，如果这样使用的话，岂不是每增加一个新的时间需求，就要新增一个队列，这里只有 10S 和 40S两个时间选项，如果需要一个小时后处理，那么就需要增加 TTL 为一个小时的队列，如果是预定会议室然后提前通知这样的场景，岂不是要增加无数个队列才能满足需求？











## 5、延迟队列优化







### 代码架构图



新增了一个队列 QC,绑定关系如下,该队列不设置 TTL 时间：

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@bb4f16c0825b55d1cad140a5b8d650889b256458/2021/10/04/31ea7c80db0244ead6a22fc35678d52e.png)





### 配置类新增



```java
public static final String QUEUE_C = "QC";

//声明队列 C 死信交换机
@Bean("queueC")
public Queue queueC(){
    Map<String, Object> args = new HashMap<>(3);
    //声明当前队列绑定的死信交换机
    args.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
    //声明当前队列的死信路由 key
    args.put("x-dead-letter-routing-key", "YD");
    //没有声明 TTL 属性
    return QueueBuilder.durable(QUEUE_C).withArguments(args).build();
}
//声明队列 B 绑定 X 交换机
@Bean
public Binding queuecBindingX(@Qualifier("queueC") Queue queueC,
                              @Qualifier("xExchange") DirectExchange xExchange){
    return BindingBuilder.bind(queueC).to(xExchange).with("XC");
}
```



### 生产者

延迟时间从请求参数中获取，动态指定！



```java
@GetMapping("/sendExpirationMsg/{message}/{ttlTime}")
public void sendMsg(@PathVariable String message,@PathVariable String ttlTime) {
    rabbitTemplate.convertAndSend("X", "XC", message, correlationData ->{
        correlationData.getMessageProperties().setExpiration(ttlTime);
        return correlationData;
    });
    log.info("当 前 时 间：{},发送一条时长{}毫秒 TTL 信息给队列 C:{}", new Date(),ttlTime, message);
}
```





### 测试



**发起请求：**

- `http://localhost:8080/ttl/sendExpirationMsg/你好 1/20000`
- `http://localhost:8080/ttl/sendExpirationMsg/你好 2/2000`



**效果：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@596b69e17ffb8d23b2ce533db8c4f5fe5df231f8/2021/10/04/dac29001c52f10800a1f495a54822b20.png)





**问题？**



看起来似乎没什么问题，但是在最开始的时候，就介绍过如果使用在消息属性上设置 TTL 的方式，消息可能并不会按时“死亡“，因为 **RabbitMQ 只会检查第一个消息是否过期**，如果过期则丢到死信队列，**如果第一个消息的延时时长很长，而第二个消息的延时时长很短，第二个消息并不会优先得到执行。**











## 6、RabbitMQ插件实现延迟队列





通过官方提供的插件可以解决这个延时不准确问题！





### 安装延时插件



```shell
# 下载，添加了一层github代理镜像
wget https://ghproxy.com/https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.9.0/rabbitmq_delayed_message_exchange-3.9.0.ez

# copy到rabbitmq的安装位置下的plugins目录
cp /opt/rabbitmq_delayed_message_exchange-3.9.0.ez /usr/lib/rabbitmq/lib/rabbitmq_server-3.9.7/plugins/

# 开启插件
rabbitmq-plugins enable rabbitmq_delayed_message_exchange

# 重启RabbitMQ
systemctl restart rabbitmq-server
```





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6164e6c332f5c85e6f3b9e848cfa55d51ac1a1c5/2021/10/04/2440f233f67ab0a42234d462874a0202.png)



### 代码架构图



新增了一个队列 delayed.queue,一个自定义交换机 delayed.exchange，绑定关系如下：

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5474b84d9f379d7e76bc67f69ac47585e1417cfe/2021/10/04/82380d647c6839296c4a9164853ce9bc.png)



### 配置类



在我们自定义的交换机中，这是一种新的交换类型，该类型消息支持延迟投递机制 消息传递后并不会立即投递到目标队列中，而是存储在 mnesia(一个分布式数据系统)表中，当达到投递时间时，才投递到目标队列中。



```java
@Configuration
public class DelayedQueueConfig {

    public static final String DELAYED_QUEUE_NAME = "delayed.queue";
    public static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";
    public static final String DELAYED_ROUTING_KEY = "delayed.routingkey";

    @Bean
    public Queue delayedQueue() {
        return new Queue(DELAYED_QUEUE_NAME);
    }

    //自定义交换机 我们在这里定义的是一个延迟交换机
    @Bean
    public CustomExchange delayedExchange() {
        Map<String, Object> args = new HashMap<>();
        //自定义交换机的类型（这里的direct表示routingKey的匹配模式！）
        args.put("x-delayed-type", "direct");
        return new CustomExchange(DELAYED_EXCHANGE_NAME, "x-delayed-message", true, false, args);
    }

    @Bean
    public Binding bindingDelayedQueue(@Qualifier("delayedQueue") Queue queue,
                                       @Qualifier("delayedExchange") CustomExchange
                                               delayedExchange) {
        return
                BindingBuilder.bind(queue).to(delayedExchange).with(DELAYED_ROUTING_KEY).noargs();
    }
}
```





### 生产者

```java
public static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";
public static final String DELAYED_ROUTING_KEY = "delayed.routingkey";

/**
 * http://localhost:8080/ttl/sendDelayMsg/come on baby1/20000
 * http://localhost:8080/ttl/sendDelayMsg/come on baby2/2000
 * @param message
 * @param delayTime
 */
@GetMapping("sendDelayMsg/{message}/{delayTime}")
public void sendMsg(@PathVariable String message,@PathVariable Integer delayTime) {
    rabbitTemplate.convertAndSend(DELAYED_EXCHANGE_NAME, DELAYED_ROUTING_KEY, message, correlationData ->{
        correlationData.getMessageProperties().setDelay(delayTime);
        return correlationData;
    });
    log.info("当 前 时 间 ： {}, 发送一条延迟 {} 毫秒的信息给队列 delayed.queue:{}", new Date(),delayTime, message);
}
```



### 消费者



```java
@Slf4j
@Component
public class DelayedQueueConsumer {

    public static final String DELAYED_QUEUE_NAME = "delayed.queue";

    // 接收消息
    @RabbitListener(queues = DELAYED_QUEUE_NAME)
    public void receiveDelayedQueue(Message message){
        String msg = new String(message.getBody());
        log.info("当 前 时 间：{},收到延时队列的消息：{}", new Date().toString(), msg);
    }
}
```





### 测试



**发起请求：**

- `http://localhost:8080/ttl/sendDelayMsg/come on baby1/20000`
- `http://localhost:8080/ttl/sendDelayMsg/come on baby2/2000`



**结果：** 符合预期！

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8a7105e420b0ab388e4582f69cffe41ab5dab18e/2021/10/04/125e32f30a49be2d6da25d0fc19b50c4.png)







# 九、发布确认高级







> SpringBoot版本，以及进一步处理，考虑各种情况的宕机，投递消息失败，消息丢失解决，可靠投递！







## 1、发布确认SpringBoot版本





### 代码架构图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@fd67327a455005229eec6807479b633a46e3be08/2021/10/04/fc1a404afd0a31dbef1b16304b8b6df5.png)





### properties

```properties
spring.com.itnxd.rabbitmq.host=82.156.11.189
spring.com.itnxd.rabbitmq.port=5672
spring.com.itnxd.rabbitmq.username=admin
spring.com.itnxd.rabbitmq.password=admin
# 发布确认开启
spring.com.itnxd.rabbitmq.publisher-confirm-type=correlated
```



- NONE：禁用发布确认模式，是默认值

- CORRELATED：发布消息成功到交换器后会触发回调方法
- SIMPLE：经测试有两种效果
  - 其一效果和 CORRELATED 值一样会触发回调方法
  - 其二在发布消息成功后使用 rabbitTemplate 调用 waitForConfirms 或 waitForConfirmsOrDie 方法等待 broker 节点返回发送结果，根据返回结果来判定下一步的逻辑
  - 要注意的点是`waitForConfirmsOrDie` 方法如果返回 false 则会关闭 channel，则接下来无法发送消息到 broker



### 配置类



```java
@Configuration
public class ConfirmConfig {

    public static final String CONFIRM_EXCHANGE_NAME = "confirm.exchange";
    public static final String CONFIRM_QUEUE_NAME = "confirm.queue";

    //声明业务 Exchange
    @Bean("confirmExchange")
    public DirectExchange confirmExchange() {
        return new DirectExchange(CONFIRM_EXCHANGE_NAME);
    }

    // 声明确认队列
    @Bean("confirmQueue")
    public Queue confirmQueue() {
        return QueueBuilder.durable(CONFIRM_QUEUE_NAME).build();
    }

    // 声明确认队列绑定关系
    @Bean
    public Binding queueBinding(@Qualifier("confirmQueue") Queue queue,
                                @Qualifier("confirmExchange") DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("key1");
    }
}
```



### 生产者



```java
@RestController
@RequestMapping("/confirm")
@Slf4j
public class ProducerController {

    public static final String CONFIRM_EXCHANGE_NAME = "confirm.exchange";
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private MyCallBack myCallBack;

    // 依赖注入 rabbitTemplate 之后再设置它的回调对象
    @PostConstruct
    public void init(){
        // 注入交换机回调函数！
        rabbitTemplate.setConfirmCallback(myCallBack);
    }

    @GetMapping("/sendMessage/{message}")
    public void sendMessage(@PathVariable String message){
        // 交换机回调方法需要的参数！CorrelationData
        //指定消息 id 为 1
        CorrelationData correlationData1=new CorrelationData("1");
        String routingKey="key1";
        // rabbitTemplate.convertAndSend(CONFIRM_EXCHANGE_NAME,routingKey,message,correlationData1);
        rabbitTemplate.convertAndSend(CONFIRM_EXCHANGE_NAME,routingKey,message,correlationData1);
        log.info("发送消息内容:{}",message+"key1");
    }
}
```



### 回调接口

```java
@Slf4j
@Component
public class MyCallBack implements RabbitTemplate.ConfirmCallback{

    // 注入

    /**
     * 交换机确认回调方法！
     *  1. 发消息，交换机接收到了，回调
     *  2. 发消息，交换机未接收到，回调
     *
     *  参数：
     *      correlationData：保存回调消息的id及相关信息
     *      ack：交换机是否成功接收
     *      cause：未成功接收的原因
     *
     * @param correlationData
     * @param ack
     * @param cause
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {

        String id = correlationData != null ? correlationData.getId() : "";
        if(ack){
            log.info("交换机已经收到 id 为:{}的消息",id);
        }else{
            log.info("交换机还未收到 id 为:{}消息,由于原因:{}",id,cause);
        }
    }
}
```



### 消费者

```java
@Slf4j
@Component
public class ConfirmConsumer {

    public static final String CONFIRM_QUEUE_NAME = "confirm.queue";

    @RabbitListener(queues = CONFIRM_QUEUE_NAME)
    public void receiveMsg(Message message) {
        String msg = new String(message.getBody());
        log.info("接受到队列 confirm.queue 消息:{}", msg);
    }
}
```







## 2、消息回退





### Mandatory 参数 





**在仅开启了生产者确认机制的情况下，交换机接收到消息后，会直接给消息生产者发送确认消息，如果发现该消息不可路由，那么消息会被直接丢弃**，此时生产者是不知道消息被丢弃这个事件的。那么如何让无法被路由的消息帮我想办法处理一下？

**通过设置 mandatory 参数可以在当消息传递过程中不可达目的地时将消息返回给生产者。**



### 生产者

```java
@RestController
@RequestMapping("/confirm")
@Slf4j
public class ProducerController {

    public static final String CONFIRM_EXCHANGE_NAME = "confirm.exchange";
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private MyCallBack myCallBack;

    // 依赖注入 rabbitTemplate 之后再设置它的回调对象
    @PostConstruct
    public void init(){
        // 注入交换机回调函数！
        rabbitTemplate.setConfirmCallback(myCallBack);
        /**
         * 注入路由失败回调函数！
         * true：
         * 交换机无法将消息进行路由时，会将该消息返回给生产者
         * false：
         * 如果发现消息无法进行路由，则直接丢弃
         */
        rabbitTemplate.setMandatory(true);
        //设置回退消息交给谁处理
        rabbitTemplate.setReturnsCallback(myCallBack);

    }

    @GetMapping("/sendMessage/{message}")
    public void sendMessage(@PathVariable String message){
        // 1. 模拟交换机挂了（交换机名字做点手脚即可）
        // 交换机回调方法需要的参数！CorrelationData
        //指定消息 id 为 1
        CorrelationData correlationData1=new CorrelationData("1");
        String routingKey="key1";
        // rabbitTemplate.convertAndSend(CONFIRM_EXCHANGE_NAME,routingKey,message,correlationData1);
        rabbitTemplate.convertAndSend(CONFIRM_EXCHANGE_NAME+"123",routingKey,message,correlationData1);
        log.info("发送消息内容:{}",message+"key1");

        // 2. 模拟队列挂了（修改错误routingkey即可）
        CorrelationData correlationData2=new CorrelationData("2");
        routingKey="key2";
        rabbitTemplate.convertAndSend(CONFIRM_EXCHANGE_NAME,routingKey,message,correlationData2);
        log.info("发送消息内容:{}",message+"key2");
    }
}
```





### 回调接口



```java
@Slf4j
@Component
public class MyCallBack implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnsCallback{

    // 注入

    /**
     * 交换机确认回调方法！
     *  1. 发消息，交换机接收到了，回调
     *  2. 发消息，交换机未接收到，回调
     *
     *  参数：
     *      correlationData：保存回调消息的id及相关信息
     *      ack：交换机是否成功接收
     *      cause：未成功接收的原因
     *
     * @param correlationData
     * @param ack
     * @param cause
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {

        String id = correlationData != null ? correlationData.getId() : "";
        if(ack){
            log.info("交换机已经收到 id 为:{}的消息",id);
        }else{
            log.info("交换机还未收到 id 为:{}消息,由于原因:{}",id,cause);
        }
    }

    /**
     * 交换机路由失败回退消息回调函数！
     *
     * @param returned
     */
    @Override
    public void returnedMessage(ReturnedMessage returned) {
        log.info("消息:{}被服务器退回，退回原因:{}, 交换机是:{}, 路由 key:{}",
                new String(returned.getMessage().getBody()),returned.getReplyText(),
                returned.getExchange(), returned.getRoutingKey());
    }
}
```









## 3、备份交换机



有了 mandatory 参数和回退消息，我们获得了对无法投递消息的感知能力，有机会在生产者的消息无法被投递时发现并处理。但有时候，我们并不知道该**如何处理这些无法路由的消息**，最多打个日志，然后触发报警，再来**手动处理**。而通过日志来处理这些无法路由的消息是很不优雅的做法！



而且设置 **mandatory 参数会增加生产者的复杂性**，需要添加处理这些被退回的消息的逻辑。如果既不想丢失消息，又不想增加生产者的
复杂性，该怎么做呢？



前面在设置死信队列的文章中，我们提到，可以为队列设置死信交换机来存储那些处理失败的消息，可是这些**不可路由消息根本没有机会进入到队列，因此无法使用死信队列来保存消息。**



**备份交换机的机制存在**，可以很好的应对这个问题。什么是备份交换机呢？

备份交换机可以理解为 RabbitMQ 中交换机的“备胎”，当我们为某一个交换机声明一个对应的备份交换机时，就是为它创建一个备胎，当交换机接收到一条不可路由消息时，将会把这条消息**转发到备份交换机**中，**由备份交换机来进行转发和处理，通常备份交换机的类型为 Fanout** ，这样就能把所有消息都投递到与其绑定的队列中，然后我们在备份交换机下绑定一个队列，这样所有那些原交换机无法被路由的消息，就会都进入这个队列了。当然，我们还可以建立一个报警队列，用独立的消费者来进行监测和报警。





### 代码架构图





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f09e0265185b039b3eb4c8268333c331833fd269/2021/10/04/c7f62c71cab9080b9c96e5ea927fabba.png)







### 配置类

注意：重新启动项目的时候需要把原来的 confirm.exchange 删除因为我们修改了其绑定属性！

```java
@Configuration
public class ConfirmConfig {

    public static final String CONFIRM_EXCHANGE_NAME = "confirm.exchange";
    public static final String CONFIRM_QUEUE_NAME = "confirm.queue";

    // 备份交换机
    public static final String BACKUP_EXCHANGE_NAME = "backup.exchange";
    public static final String BACKUP_QUEUE_NAME = "backup.queue";
    public static final String WARNING_QUEUE_NAME = "warning.queue";


    //声明业务 Exchange
//    @Bean("confirmExchange")
//    public DirectExchange confirmExchange() {
//        return new DirectExchange(CONFIRM_EXCHANGE_NAME);
//    }

    // 声明确认 Exchange 交换机的备份交换机
    @Bean("confirmExchange")
    public DirectExchange confirmExchange(){
        ExchangeBuilder exchangeBuilder =
                ExchangeBuilder.directExchange(CONFIRM_EXCHANGE_NAME)
                        .durable(true)
                        //设置该交换机的备份交换机
                        .withArgument("alternate-exchange", BACKUP_EXCHANGE_NAME);
        return (DirectExchange)exchangeBuilder.build();
    }

    // 声明确认队列
    @Bean("confirmQueue")
    public Queue confirmQueue() {
        return QueueBuilder.durable(CONFIRM_QUEUE_NAME).build();
    }

    // 声明确认队列绑定关系
    @Bean
    public Binding queueBinding(@Qualifier("confirmQueue") Queue queue,
                                @Qualifier("confirmExchange") DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("key1");
    }

    //声明备份 Exchange
    @Bean("backupExchange")
    public FanoutExchange backupExchange(){
        return new FanoutExchange(BACKUP_EXCHANGE_NAME);
    }

    // 声明警告队列
    @Bean("warningQueue")
    public Queue warningQueue(){
        return QueueBuilder.durable(WARNING_QUEUE_NAME).build();
    }
    // 声明报警队列绑定关系
    @Bean
    public Binding warningBinding(@Qualifier("warningQueue") Queue queue,
                                  @Qualifier("backupExchange") FanoutExchange
                                          backupExchange){
        return BindingBuilder.bind(queue).to(backupExchange);
    }
    // 声明备份队列
    @Bean("backQueue")
    public Queue backQueue(){
        return QueueBuilder.durable(BACKUP_QUEUE_NAME).build();
    }
    // 声明备份队列绑定关系
    @Bean
    public Binding backupBinding(@Qualifier("backQueue") Queue queue,
                                 @Qualifier("backupExchange") FanoutExchange backupExchange){
        return BindingBuilder.bind(queue).to(backupExchange);
    }
}
```





### 消费者



```java
@Component
@Slf4j
public class WarningConsumer {

    public static final String WARNING_QUEUE_NAME = "warning.queue";

    @RabbitListener(queues = WARNING_QUEUE_NAME)
    public void receiveWarningMsg(Message message) {
        String msg = new String(message.getBody());
        log.error("报警发现不可路由消息：{}", msg);
    }
}
```







### 测试



**mandatory 参数与备份交换机可以一起使用的时候，如果两者同时开启，消息究竟何去何从？**

谁优先级高，经过上面结果显示答案是**备份交换机优先级高**。







# 十、其他知识



## 1、幂等性



**概念：**

**用户对于同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生了副作用。**



**消息重复消费：**

消费者在消费 MQ 中的消息时，MQ 已把消息发送给消费者，消费者在给 MQ 返回 ack 时网络中断，故 MQ 未收到确认信息，该条消息会重新发给其他的消费者，或者在网络重连后再次发送给该消费者，但实际上该消费者已成功消费了该条消息，造成消费者消费了重复的消息。



**解决思路：**

MQ 消费者的幂等性的解决一般使用全局 ID 或者写个唯一标识比如时间戳 或者 UUID 或者订单消费者消费 MQ 中的消息也可利用 MQ 的该 id 来判断，或者可按自己的规则生成一个全局唯一 id，每次消费消息时用该 id 先判断该消息是否已消费过。

**消费端的幂等性保障：**

在海量订单生成的业务高峰期，生产端有可能就会重复发生了消息，这时候消费端就要实现幂等性，这就意味着我们的消息永远不会被消费多次，即使我们收到了一样的消息。业界主流的幂等性有两种操作

- 唯一 ID+指纹码机制,利用数据库主键去重,
- 利用 redis 的原子性去实现



**唯一 ID+指纹码机制：**

指纹码:我们的一些规则或者时间戳加别的服务给到的唯一信息码,它并不一定是我们系统生成的，基本都是由我们的业务规则拼接而来，但是一定要保证唯一性，然后就利用查询语句进行判断这个 id 是否存在数据库中,优势就是实现简单就一个拼接，然后查询判断是否重复；劣势就是在高并发时，如果是单个数
据库就会有写入性能瓶颈当然也可以采用分库分表提升性能，但也**不是我们最推荐的方式**。

**Redis 原子性：** 

利用 redis 执行 setnx 命令，天然具有幂等性。从而实现不重复消费！









## 2、优先级队列



### 使用场景

在我们系统中有一个**订单催付**的场景，我们的客户在天猫下的订单,淘宝会及时将订单推送给我们，如果在用户设定的时间内未付款那么就会给用户推送一条短信提醒，很简单的一个功能对吧。

但是，tmall商家对我们来说，肯定是要分大客户和小客户的对吧，比如像苹果，小米这样大商家一年起码能给我们创造很大的利润，所以理应当然，他们的订单必须得到优先处理，而曾经我们的后端系统是使用 redis 来存放的定时轮询，大家都知道 redis 只能用 List 做一个简简单单的消息队列，并不能实现一个优先级的场景，所以订单量大了后采用 RabbitMQ 进行改造和优化,如果发现是大客户的订单给一个相对比较高的优先级，否则就是默认优先级。



### 注意事项

要让队列实现优先级需要做的事情有如下事情：

- 队列需要设置为优先级队列，消息需要设置消息的优先级
- 消费者需要等待消息已经发送到队列中才去消费因为，这样才有机会对消息进行排序！



### 生产者



```java
public class Producer {

    private static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws Exception {

        Channel channel = RabbitMqUtils.getChannel();

        //设置队列的最大优先级 最大可以设置到 255 官网推荐 1-10 如果设置太高比较吃内存和 CPU
        Map<String, Object> params = new HashMap<>();
        params.put("x-max-priority", 10);
        channel.queueDeclare(QUEUE_NAME, true, false, false, params);

        //给消息赋予一个 priority 属性
        AMQP.BasicProperties properties = new
                AMQP.BasicProperties().builder().priority(5).build();

        for (int i = 1; i < 11; i++) {
            String message = "info" + i;
            if (i == 5) {
                channel.basicPublish("", QUEUE_NAME, properties, message.getBytes());
            } else {
                channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            }
            System.out.println("发送消息完成:" + message);
        }
    }
}
```



### 消费者



```java
public class Consumer {
    private static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();



        System.out.println("消费者启动等待消费......");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String receivedMessage = new String(delivery.getBody());
            System.out.println("接收到消息:" + receivedMessage);
        };

        channel.basicConsume(QUEUE_NAME, true, deliverCallback, (consumerTag) -> {
            System.out.println("消费者无法消费消息时调用，如队列被删除");
        });
    }
}
```





## 3、惰性队列



### 使用场景

RabbitMQ 从 3.6.0 版本开始引入了惰性队列的概念。惰性队列会尽可能的**将消息存入磁盘**中，而在消费者**消费到相应的消息时才会被加载到内存中**，它的一个重要的设计目标是能够支持更长的队列，即支持更多的消息存储。当消费者由于各种各样的原因(比如消费者下线、宕机亦或者是由于维护而关闭等)而致
使长时间内不能消费消息造成堆积时，惰性队列就很有必要了。





**默认情况**下，当生产者将消息发送到 RabbitMQ 的时候，队列中的消息会尽可能的存储在内存之中，这样可以更加快速的将消息发送给消费者。**即使是持久化的消息，在被写入磁盘的同时也会在内存中驻留一份备份**。当 RabbitMQ 需要释放内存的时候，会将内存中的消息换页至磁盘中，这个操作会耗费较长的时间，也会阻塞队列的操作，进而无法接收新的消息。虽然 RabbitMQ 的开发者们一直在升级相关的算法，但是效果始终不太理想，尤其是在消息量特别大的时候。



### 两种模式 



**队列具备两种模式：default 和 lazy。**

默认的为 default 模式，在 3.6.0 之前的版本无需做任何变更。

lazy模式即为惰性队列的模式，可以通过调用 channel.queueDeclare 方法的时候在参数中设置，也可以通过Policy 的方式设置，如果一个队列同时使用这两种方式设置的话，那么 Policy 的方式具备更高的优先级。

**如果要通过声明的方式改变已有队列的模式的话，那么只能先删除队列，然后再重新声明一个新的。**

在队列声明的时候可以通过“x-queue-mode”参数来设置队列的模式，取值为“default”和“lazy”。



```java
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-queue-mode", "lazy");
channel.queueDeclare("myqueue", false, false, false, args);
```





### 内存开销对比



在发送 1 百万条消息，每条消息大概占 1KB 的情况下，普通队列占用内存是 1.2GB，而惰性队列仅仅占用 1.5MB!



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@7a2dc121490be5997e65371cd992e1e0a0e738eb/2021/10/04/ca55022f5c5e05059bf508d5dc9759b5.png)







# 十一、RabbitMQ集群







## 1、集群搭建



```shell
# 1.修改 3 台机器的主机名称 node1 node2 node3
vim /etc/hostname
# 2.配置各个节点的 hosts 文件，让各个节点都能互相识别对方
vim /etc/hosts
ip node1
ip node2
ip node3
# 3.以确保各个节点的 cookie 文件使用的是同一个值
# 在 node1 上执行远程操作命令
scp /var/lib/rabbitmq/.erlang.cookie root@node2:/var/lib/rabbitmq/.erlang.cookie
scp /var/lib/rabbitmq/.erlang.cookie root@node3:/var/lib/rabbitmq/.erlang.cookie
# 4.启动 RabbitMQ 服务,顺带启动 Erlang 虚拟机和 RbbitMQ 应用服务(在三台节点上分别执行以下命令)
rabbitmq-server -detached
# 5.在节点 2 执行
rabbitmqctl stop_app
# (rabbitmqctl stop 会将 Erlang 虚拟机关闭，rabbitmqctl stop_app 只关闭 RabbitMQ 服务)
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@node1
rabbitmqctl start_app #(只启动应用服务)
# 6.在节点 3 执行
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@node2
rabbitmqctl start_app
# 7.集群状态
rabbitmqctl cluster_status
# 8.需要重新设置用户
# 创建账号
rabbitmqctl add_user admin 123
# 设置用户角色
rabbitmqctl set_user_tags admin administrator
# 设置用户权限
rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
# 9.解除集群节点(node2 和 node3 机器分别执行)
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
rabbitmqctl cluster_status
rabbitmqctl forget_cluster_node rabbit@node2#(node1 机器上执行)
```



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@cafebb9ab33e1c69e696ccbb5522d68d24073523/2021/10/04/8a66eb3eee9fef6271ed919fbab521ce.png)





## 2、镜像队列



### 使用镜像的原因 

如果 RabbitMQ 集群中只有一个 Broker 节点，那么该节点的失效将导致整体服务的临时性不可用，并且也可能会导致消息的丢失。可以将所有消息都设置为持久化，并且对应队列的durable属性也设置为true，但是这样仍然无法避免由于缓存导致的问题：因为消息在发送之后和被写入磁盘井执行刷盘动作之间存在一个短暂却会产生问题的时间窗。通过 publisherconfirm 机制能够确保客户端知道哪些消息己经存入磁盘，尽管如此，一般不希望遇到因单点故障导致的服务不可用。

引入镜像队列(Mirror Queue)的机制，可以将队列镜像到集群中的其他 Broker 节点之上，**如果集群中的一个节点失效了，队列能自动地切换到镜像中的另一个节点上以保证服务的可用性。**



### 搭建步骤



**1、启动三台集群节点**

**2、随便找一个节点添加 policy**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2003c390effbe9ddb211d36a78b518c309e70557/2021/10/04/9863d8278d9811dbf6319033c2d4d00e.png)



**3、在 node1 上创建一个队列发送一条消息，队列存在镜像队列**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@0db2019b8ae7710f700ae557d3e54ecce3deaf70/2021/10/04/722fdc04361d39166e0dfb82375ef410.png)





**4、停掉 node1 之后发现 node2 成为镜像队列**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@04ec08d6026deb5c14cf84f85c4db71954e9b1c7/2021/10/04/86e18d3ddb37e5d99e494ac9cc970378.png)





**5、就算整个集群只剩下一台机器了 依然能消费队列里面的消息**



说明队列里面的消息被镜像队列传递到相应机器里面了



由于我们设置的Policy的参数为`ha-params=2`，因此集群一定会保证队列有两台机器会正常存在！







## 3、Haproxy+Keepalive 实现高可用负载均衡





### 整体架构图 



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9fc83e9dbe2c2eb4eb35cc13d1e28245edd112d2/2021/10/04/d8f37b23f9ce611b232bd5cf52209a17.png)





### Haproxy 实现负载均衡 



HAProxy 提供高可用性、负载均衡及基于 TCPHTTP 应用的代理，支持虚拟主机，它是免费、快速并且可靠的一种解决方案，包括 Twitter,Reddit,StackOverflow,GitHub 在内的多家知名互联网公司在使用。HAProxy 实现了一种事件驱动、单一进程模型，此模型支持非常大的井发连接数。

扩展 nginx,lvs,haproxy 之间的区别: http://www.ha97.com/5646.html



### 搭建步骤



1、下载 haproxy(在 node1 和 node2) 

`yum -y install haproxy`

2、修改 node1 和 node2 的 haproxy.cfg 

`vim /etc/haproxy/haproxy.cfg`

需要修改红色 IP 为当前机器 IP



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@83b58427d234a1fb47794f8ea64db2242992f9f2/2021/10/04/39f243a56d67072c7255f9f22df74a44.png)

3、在两台节点启动 haproxy

```shell
haproxy -f /etc/haproxy/haproxy.cfg
ps -ef | grep haproxy
```



4、访问地址

http://ip:8888/stats 



### Keepalived 实现双机(主备)热备 



试想如果前面配置的 HAProxy 主机突然宕机或者网卡失效，那么虽然 RbbitMQ 集群没有任何故障但是对于外界的客户端来说所有的连接都会被断开结果将是灾难性的为了确保负载均衡服务的可靠性同样显得十分重要，这里就要引入 Keepalived 它能够通过自身健康检查、资源接管功能做高可用(双机热备)，实现故障转移.





### 搭建步骤

不全！目前用不到，用到再进行整理！

```shell
# 1.下载 keepalived
yum -y install keepalived
# 2.节点 node1 配置文件
vim /etc/keepalived/keepalived.conf
# 把资料里面的 keepalived.conf 修改之后替换
# 3.节点 node2 配置文件
# 需要修改 global_defs 的 router_id,如:nodeB
# 其次要修改 vrrp_instance_VI 中 state 为"BACKUP"；
# 最后要将 priority 设置为小于 100 的值
# 4.添加 haproxy_chk.sh
# (为了防止 HAProxy 服务挂掉之后 Keepalived 还在正常工作而没有切换到 Backup 上，所以这里需要编写一个脚本来检测 HAProxy 务的状态,当 HAProxy 服务挂掉之后该脚本会自动重启
# HAProxy 的服务，如果不成功则关闭 Keepalived 服务，这样便可以切换到 Backup 继续工作)
vim /etc/keepalived/haproxy_chk.sh(可以直接上传文件)
# 修改权限 chmod 777 /etc/keepalived/haproxy_chk.sh
# 5.启动 keepalive 命令(node1 和 node2 启动)
systemctl start keepalived
# 6.观察 Keepalived 的日志
tail -f /var/log/messages -n 200
# 7.观察最新添加的 vip
ip add show
# 8.node1 模拟 keepalived 关闭状态
systemctl stop keepalived 
# 9.使用 vip 地址来访问 rabbitmq 集群
```









## 4、Federation Exchange





> 联邦交换机！



### 使用它的原因 

(broker 北京)，(broker 深圳)彼此之间相距甚远，网络延迟是一个不得不面对的问题。有一个在北京的业务(Client 北京) 需要连接(broker 北京)，向其中的交换器 exchangeA 发送消息，此时的网络延迟很小，(Client 北京)可以迅速将消息发送至 exchangeA 中，就算在开启了 publisherconfirm 机制或者事务机制的情况下，也可以迅速收到确认信息。此时又有个在深圳的业务(Client 深圳)需要向 exchangeA 发送消息，那么(Client 深圳) (broker 北京)之间有很大的网络延迟，(Client 深圳) 将发送消息至 exchangeA 会经历一定的延迟，尤其是在开启了 publisherconfirm 机制或者事务机制的情况下，(Client 深圳) 会等待很长的延迟时间来接收(broker 北京)的确认信息，进而必然造成这条发送线程的性能降低，甚至造成一定程度上的阻塞。

将业务(Client 深圳)部署到北京的机房可以解决这个问题，但是如果(Client 深圳)调用的另些服务都部署在深圳，那么又会引发新的时延问题，总不见得将所有业务全部部署在一个机房，那么容灾又何以实现？

这里使用 Federation 插件就可以很好地解决这个问题！



### 搭建步骤



1、需要保证每台节点单独运行

2、在每台机器上开启 federation 相关插件

```shell
rabbitmq-plugins enable rabbitmq_federation
rabbitmq-plugins enable rabbitmq_federation_management

# 重启生效
systemctl restart rabbitmq-server
```



3、原理图(先运行 consumer 在 node2 创建 fed_exchange)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@b062f5e340c4b534d9c35be08f2ea46e95bba74f/2021/10/04/6bb68590d0c9f6def34caf2bf45645c7.png)



4、在 downstream(node2)配置 upstream(node1)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c9e9004deba589aa86862b6960e215d341dc7241/2021/10/04/69279975c70b3a571c4afc3189af485d.png)



4、添加 policy

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f0d70fbab0da9b96ee6a8dcd87fdad024aca8fcf/2021/10/04/0d7e100f8e07cdbbf21e516f1b8ea7cb.png)



5、成功

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f1a2e174fdb6b8d2edb202adce1fde6176198419/2021/10/04/e81ce5ab6efd93fd15c3bb080e4caa37.png)



## 5、Federation Queue



> 联邦队列！



### 使用它的原因



**联邦队列**可以在多个 Broker 节点(或者集群)之间为单个队列提供均衡负载的功能。一个联邦队列可以连接一个或者多个上游队列(upstream queue)，并从这些上游队列中获取消息以满足本地消费者消费消息的需求。



### 原理图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5bbad69779dca17532e3ae8c0449f893f835bb7a/2021/10/04/b797f0f55417c8ece3cebee4e058c49b.png)





### 搭建步骤





1、添加 upstream(同上)

2、添加 policy





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f2b358cd4f36312f92505f1ab92200342ac32ec4/2021/10/04/edc72fd35a2422f06288d747b5c997d2.png)





## 6、Shovel





### 使用它的原因



Federation 具备的数据转发功能类似，Shovel 够可靠、持续地从一个 Broker 中的队列(作为源端，即source)拉取数据并转发至另一个 Broker 中的交换器(作为目的端，即 destination)。作为源端的队列和作为目的端的交换器可以同时位于同一个 Broker，也可以位于不同的 Broker 上。Shovel 可以翻译为"铲子"，是一种比较形象的比喻，这个"铲子"可以将消息从一方"铲子"另一方。**Shovel 行为就像优秀的客户端应用程序能够负责连接源和目的地、负责消息的读写及负责连接失败问题的处理。**



### 搭建步骤



1、开启插件(需要的机器都开启)

```shell
rabbitmq-plugins enable rabbitmq_shovel
rabbitmq-plugins enable rabbitmq_shovel_management

# 重启生效
systemctl restart rabbitmq-server
```



2、原理图(在源头发送的消息直接回进入到目的地队列)





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@de25258b04a113bc066e09ddf81d5cc891adcb8c/2021/10/04/0fb2761335bfed9098b25ce25a44cc52.png)



3、添加 shovel 源和目的地



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@7ebd3c23727ee960a81ec66497e9f4f6762dd4cf/2021/10/04/6180316d284a3e56b37e604676750b32.png)
