---
title: 互联网分布式注册中心Zookeeper介绍
author: ITNXD
toc: true
abbrlink: 34316
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/5efed5f7a5d8a6e858152e7c78b31007.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/5efed5f7a5d8a6e858152e7c78b31007.png
categories:
  - 分布式微服务
tags:
  - Zookeeper
  - 注册中心
  - 分布式锁
date: 2021-09-28 08:59:38
updated:
---



# 一、简介





## 1、概述



Zookeeper 是一个开源的分布式的，为分布式框架提供协调服务的 Apache 项目。

ZooKeeper是一个[分布式](https://baike.baidu.com/item/分布式/19276232)的，开放源码的[分布式应用程序](https://baike.baidu.com/item/分布式应用程序/9854429)协调服务，是[Google](https://baike.baidu.com/item/Google)的Chubby一个[开源](https://baike.baidu.com/item/开源/246339)的实现，是Hadoop和[Hbase](https://baike.baidu.com/item/Hbase/7670213)的重要组件。它是一个为分布式应用提供一致性服务的软件，提供的功能包括：配置维护、域名服务、分布式同步、组服务等。





## 2、工作机制



Zookeeper从设计模式角度来理解：是一个基于观察者模式设计的分布式服务管理框架，它负责**存储和管理大家都关心的数据**，然后**接受观察者的注册**，一旦这些数据的状态发生变化，Zookeeper就将负责**通知已经在Zookeeper上注册的那些观察者**做出相应的反应。







![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/61af91ab79f77f80bfc0366d646efb8c.png)







## 3、特点





1. Zookeeper：**一个领导者**（Leader），多个跟随者（Follower）组成的集群。
2. 集群中只要有**半数以上**节点存活，Zookeeper集群就能正常服务。所 以Zookeeper适合安装**奇数台**服务器。
3. **全局数据一致**：每个Server保存一份相同的数据副本，Client无论连接到哪个Server，数据都是一致的。
4. **更新请求顺序执行**，来自同一个Client的更新请求按其发送顺序依次执行。
5. **数据更新原子性**，一次数据更新要么成功，要么失败。
6. **实时性**，在一定时间范围内，Client能读到最新数据。





## 4、数据结构





ZooKeeper 数据模型的结构与 Unix 文件系统很类似，整体上可以看作是一棵树，每个节点称做一个 ZNode。每一个 ZNode 默认能够存储 1MB 的数据，每个 ZNode 都可以通过其路径唯一标识。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/d5e42c40a0d741e973660d2483ec7bd1.png)









## 5、应用场景



提供的服务包括：统一命名服务、统一配置管理、统一集群管理、服务器节点动态上下线、软负载均衡等。



**统一命名服务：**

- 在分布式环境下，经常需要对应用/服务进行统一命名，便于识别。例如：IP不容易记住，而域名容易记住。



**统一配置管理：**

- 分布式环境下，配置文件同步非常常见。一般要求一个集群中，所有节点的配置信息是一致的，比如 Kafka 集群。对配置文件修改后，希望能够快速同步到各个节点上。

- 配置管理可交由ZooKeeper实现。可将配置信息写入ZooKeeper上的一个Znode。各个客户端服务器**监听**这个Znode。一旦Znode中的数据被修改ZooKeeper将通知各个客户端服务器。



**统一集群管理：**

- 分布式环境中，实时掌握每个节点的状态是必要的。可根据节点实时状态做出一些调整。
- ZooKeeper可以实现实时监控节点状态变化。可将节点信息写入ZooKeeper上的一个ZNode。监听这个ZNode可获取它的实时状态变化。



**服务器动态上下线：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/3a29034d6383f50e9b66a08b43a9ef6d.png)



**软负载均衡：**

在Zookeeper中记录每台服务器的访问数，让访问数最少的服务器去处理最新的客户端请求！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/d9bcc4db25c42b2cf79243825bceb96a.png)





# 二、安装



> 官网地址：[https://zookeeper.apache.org/](https://zookeeper.apache.org/)





## 1、下载安装



**前提：得有jdk环境！**



```shell
# 下载
wget https://archive.apache.org/dist/zookeeper/zookeeper-3.5.7/apache-zookeeper-3.5.7-bin.tar.gz
# 解压
tar -zxvf apache-zookeeper-3.5.7-bin.tar.gz
# 改名
mv apache-zookeeper-3.5.7-bin/ zookeeper-3.5.7
# 拷贝一份配置文件
mv zoo_sample.cfg zoo.cfg
# 修改 dataDir 路径，改为 dataDir=/opt/zookeeper-3.5.7/zkData
vim zoo.cfg
```







## 2、常用命令









```shell
# 启动服务端
./zkServer.sh start
# 停止服务端
./zkServer.sh stop
# 查看服务端状态
./zkServer.sh status
# 启动客户端
./zkCli.sh
# 退出客户端
quit

# 查看进程是否启动
jps
```





## 3、配置文件介绍



**zoo.cfg：**

- tickTime = 2000：通信心跳时间，Zookeeper服务器与客户端心跳时间，单位毫秒。
- initLimit = 10：LF**初始**通信时限。Leader和Follower初始连接时能容忍的最多心跳数（tickTime的数量）。
- syncLimit = 5：LF同步通信时限。Leader和Follower之间通信时间如果超过syncLimit * tickTime，Leader认为Follwer死掉，从服务器列表中删除Follwer。
- dataDir：保存Zookeeper中的数据。注意：默认的tmp目录，容易被Linux系统定期删除，所以一般不用默认的tmp目录。
- clientPort = 2181：客户端连接端口，通常不做修改。











# 三、集群操作







## 1、准备



准备三台服务器，三台服务器同步操作！

在三台服务器上都安装jdk环境以及ZK！



或者在一台服务器上使用三个不同端口区分即可！只需要保证配置文件的`clientPort=2181`端口不冲突即可！(**我们使用这种方法**！)





## 2、集群配置





### 配置服务器编号



**三台机器同步操作：**

1. 在/opt/zookeeper-3.5.7/这个目录下创建 zkData 目录
2. 在/opt/zookeeper-3.5.7/zkData 目录下创建一个 myid 的文件
3. 在文件中添加与 server 对应的编号（唯一id）（注意：上下不要有空行，左右不要有空格）
4. 三台服务器分别为1,2,3即可！



### 配置zoo.cfg文件



```shell
#修改数据存储路径配置
dataDir=/opt/zookeeper-3.5.7/zkData
#最后增加如下配置
#######################cluster##########################
server.1=localhost:2881:3881
server.2=localhost:2882:3882
server.3=localhost:2883:3883
```



`server.A=B:C:D`：

- A 是一个数字，表示这个是第几号服务器；集群模式下配置一个文件 myid，这个文件在 dataDir 目录下，这个文件里面有一个数据就是 A 的值，Zookeeper 启动时读取此文件，拿到里面的数据与 zoo.cfg 里面的配置信息比较从而判断到底是哪个 server。
- B 是这个服务器的地址；
- C 是这个服务器 Follower 与集群中的 Leader 服务器交换信息的端口；
- D 是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的Leader，而这个端口就是用来执行选举时服务器相互通信的端口。





## 3、集群操作



```shell
# 同步启动三台
./zkServer.sh start
# 查看是leader还是follower，详细状态
./zkServer.sh status
```







## 4、选举机制



**前提：以五台ZK，一个leader四个follower为例！**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/1d8ff2069539acb2008ba9074d1d2295.png)





**第一次启动：**



1. 服务器1启动，发起一次选举。服务器1投自己一票。此时服务器1票数一票，不够半数以上（3票），选举无法完成，服务器1状态保持为LOOKING；
2. 服务器2启动，再发起一次选举。服务器1和2分别投自己一票并交换选票信息：此时服务器1发现服务器2的myid比自己目前投票推举的（服务器1）大，更改选票为推举服务器2。此时服务器1票数0票，服务器2票数2票，没有半数以上结果，选举无法完成，服务器1，2状态保持LOOKING
3. 服务器3启动，发起一次选举。此时服务器1和2都会更改选票为服务器3。此次投票结果：服务器1为0票，服务器2为0票，服务器3为3票。此时服务器3的票数已经超过半数，服务器3当选Leader。服务器1，2更改状态为FOLLOWING，服务器3更改状态为LEADING；
4. 服务器4启动，发起一次选举。此时服务器1，2，3已经不是LOOKING状态，不会更改选票信息。交换选票信息结果：服务器3为3票，服务器4为1票。此时服务器4服从多数，更改选票信息为服务器3，并更改状态为FOLLOWING；
5. 服务器5启动，同4一样当小弟。



**非第一次启动：**



1. 当ZooKeeper集群中的一台服务器出现以下两种情况之一时，就会开始进入Leader选举：
   1. 服务器初始化启动。
   2. 服务器运行期间无法和Leader保持连接。
2. 而当一台机器进入Leader选举流程时，当前集群也可能会处于以下两种状态：
   1. 集群中本来就已经存在一个Leader。对于第一种已经存在Leader的情况，机器试图去选举Leader时，会被告知当前服务器的Leader信息，对于该机器来说，仅仅需要和Leader机器建立连接，并进行状态同步即可。
   2. 集群中确实不存在Leader。
      1. 假设ZooKeeper由5台服务器组成，SID分别为1、2、3、4、5，ZXID分别为8、8、8、7、7，并且此时SID为3的服务器是Leader。某一时刻，3和5服务器出现故障，因此开始进行Leader选举。



**选举情况：**

（EPOCH，ZXID，SID ）
SID为1、2、4的机器投票情况： （1，8，1） （1，8，2） （1，7，4）

**选举Leader规则：**

1. EPOCH大的直接胜出 
2. EPOCH相同，事务id大的胜出 
3. 事务id相同，服务器id大的胜出



**三个id：**

- SID：**服务器ID**。用来唯一标识一台ZooKeeper集群中的机器，每台机器不能重复，和myid一致。
- ZXID：**事务ID**。ZXID是一个事务ID，用来标识一次服务器状态的变更。在某一时刻，集群中的每台机器的ZXID值不一定完全一致，这和ZooKeeper服务器对于客户端“更新请求”的处理逻辑有关。
- Epoch：**每个Leader任期的代号**。没有Leader时同一轮投票过程中的逻辑时钟值是相同的。每投完一次票这个数据就会增加







## 5、集群命令



help：显示所有操作命令

ls path：使用 ls 命令来查看当前 znode 的子节点 [可监听]

- -w 监听子节点变化
- -s 附加次级信息

create：普通创建

- -s 含有序列
- -e 临时（重启或者超时消失）

get path：获得节点的值 [可监听]

- -w 监听节点内容变化

- -s 附加次级信息

set：设置节点的具体值

stat：查看节点状态

delete：删除节点

deleteall：递归删除节点



**节点删除和查看状态：**

```shell
# 1）删除节点
[zk: localhost:2181(CONNECTED) 4] delete /sanguo/jin
# 2）递归删除节点
[zk: localhost:2181(CONNECTED) 15] deleteall /sanguo/shuguo
# 3）查看节点状态
[zk: localhost:2181(CONNECTED) 17] stat /sanguo
cZxid = 0x100000003
ctime = Wed Aug 29 00:03:23 CST 2018
mZxid = 0x100000011
mtime = Wed Aug 29 00:21:23 CST 2018
pZxid = 0x100000014
cversion = 9
dataVersion = 1
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 4
numChildren = 1
```







**ls -s介绍：**

```shell
[zk: localhost:2181(CONNECTED) 5] ls -s /
[zookeeper]cZxid = 0x0
ctime = Thu Jan 01 08:00:00 CST 1970
mZxid = 0x0
mtime = Thu Jan 01 08:00:00 CST 1970
pZxid = 0x0
cversion = -1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 1
```



- **czxid**：创建节点的事务 zxid。
  - 每次修改 ZooKeeper 状态都会产生一个 ZooKeeper 事务 ID。事务 ID 是 ZooKeeper 中所有修改总的次序。每次修改都有唯一的 zxid，如果 zxid1 小于 zxid2，那么 zxid1 在 zxid2 之前发生。
- ctime：znode 被创建的毫秒数（从 1970 年开始）
- mzxid：znode 最后更新的事务 zxid
- mtime：znode 最后修改的毫秒数（从 1970 年开始）
- pZxid：znode 最后更新的子节点 zxid
- cversion：znode 子节点变化号，znode 子节点修改次数
- dataversion：znode 数据变化号
- aclVersion：znode 访问控制列表的变化号
- ephemeralOwner：如果是临时节点，这个是 znode 拥有者的 session id。如果不是临时节点则是 0。
- dataLength：znode 的数据长度
- numChildren：znode 子节点数量



## 6、节点类型



持久（Persistent）：客户端和服务器端断开连接后，创建的节点不删除

短暂（Ephemeral）：客户端和服务器端断开连接后，创建的节点自己删除



1. 持久化目录节点：客户端与Zookeeper断开连接后，该节点依旧存在。
2. 持久化顺序编号目录节点：客户端与Zookeeper断开连接后，该节点依旧存在，只是Zookeeper给该节点名称进行顺序编号。
3. 临时目录节点：客户端与Zookeeper断开连接后，该节点被删除。
4. 临时顺序编号目录节点：客户端与 Zookeeper 断开连接后，该 节 点 被 删 除，只是Zookeeper给该节点名称进行顺序编号。



**说明**：创建znode时设置顺序标识，znode名称后会附加一个值，顺序号是一个单调递增的计数器，由父节点维护！

**注意**：在分布式系统中，顺序号可以被用于为所有的事件进行全局排序，这样客户端可以通过顺序号推断事件的顺序！



**示例：**

```shell
# 持久无序号节点
create /sanguo "diaochan"
create /sanguo/shuguo "liubei"

# 获取节点信息
get -s /sanguo

# 持久带序号节点 如果原来没有序号节点，序号从 0 开始依次递增。如果原节点下已有 2 个节点，则再排序时从 2 开始，以此类推。
[zk: localhost:2181(CONNECTED) 2] create -s /sanguo/weiguo/zhangliao "zhangliao"
Created /sanguo/weiguo/zhangliao0000000000
[zk: localhost:2181(CONNECTED) 3] create -s /sanguo/weiguo/zhangliao "zhangliao"
Created /sanguo/weiguo/zhangliao0000000001
[zk: localhost:2181(CONNECTED) 4] create -s /sanguo/weiguo/xuchu "xuchu"
Created /sanguo/weiguo/xuchu0000000002

# 短暂无序号节点
create -e /sanguo/wuguo "zhouyu"

# 短暂带序号节点
create -e -s /sanguo/wuguo "zhouyu"

# 退出客户端
quit

# 修改节点值
set /sanguo/weiguo "simayi"
```



## 7、监听器



### 简介



客户端注册监听它关心的目录节点，当目录节点发生变化（数据改变、节点删除、子目录节点增加删除）时，ZooKeeper 会通知客户端。监听机制保证 ZooKeeper 保存的任何的数据的任何改变都能快速的响应到监听了该节点的应用程序。





### 监听器原理





**流程：**

1. 首先要有一个main()线程
2. 在main线程中创建Zookeeper客户端，这时就会创建两个线程，一个负责网络连接通信（connet），一个负责监听（listener）。
3. 通过connect线程将注册的监听事件发送给Zookeeper。
4. 在Zookeeper的注册监听器列表中将注册的监听事件添加到列表中。
5. Zookeeper监听到有数据或路径变化，就会将这个消息发送给listener线程。
6. listener线程内部调用了process()方法。



**常见监听：**

- 监听节点数据的变化：get path [watch]
- 监听子节点增减的变化：ls path [watch]





**图示：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/9d19f5d452c962f893c0f3cebc50fcf7.png)







### 监听案例



```shell
#------------------ 节点值变化监听----------------------
#（1）在 104 主机上注册监听/sanguo 节点数据变化
[zk: localhost:2181(CONNECTED) 26] get -w /sanguo 
#（2）在 103 主机上修改/sanguo 节点的数据
[zk: localhost:2181(CONNECTED) 1] set /sanguo "xisi"
#（3）观察 104 主机收到数据变化的监听
WATCHER::
WatchedEvent state:SyncConnected type:NodeDataChanged 
path:/sanguo
# 注意：在103再多次修改/sanguo的值，104上不会再收到监听。因为注册一次，只能监听一次。想再次监听，需要再次注册。

#------------------ 节点的子节点变化监听（路径变化）----------
#（1）在 104 主机上注册监听/sanguo 节点的子节点变化
[zk: localhost:2181(CONNECTED) 1] ls -w /sanguo
[shuguo, weiguo]
#（2）在 103 主机/sanguo 节点上创建子节点
[zk: localhost:2181(CONNECTED) 2] create /sanguo/jin "simayi"
Created /sanguo/jin
#（3）观察 104 主机收到子节点变化的监听
WATCHER::
WatchedEvent state:SyncConnected type:NodeChildrenChanged 
path:/sanguo
# 注意：节点的路径变化，也是注册一次，生效一次。想多次生效，就需要多次注册。
```







# 四、客户端API操作





## 1、IDEA环境搭建



### pom.xml



```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>RELEASE</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.8.2</version>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.7</version>
</dependency>
```





### log4j.properties



```properties
log4j.rootLogger=INFO, stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d %p [%c] - %m%n
log4j.appender.logfile=org.apache.log4j.FileAppender
log4j.appender.logfile.File=target/spring.log
log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
log4j.appender.logfile.layout.ConversionPattern=%d %p [%c] - %m%n
```







## 2、API操作



**zkClient.java：**

```java
package com.itnxd.zk;

import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

/**
 * @author ITNXD
 * @create 2021-09-27 16:07
 */
public class ZkClient {

    private ZooKeeper zkClient = null;
    private static int sessionTimeout = 2000;
    // zk集群多台时逗号分隔，且不能有空格！
    private static String connectString = "82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183";

    @Before
    public void init() throws IOException {
        zkClient = new ZooKeeper(connectString, sessionTimeout, new Watcher() {

            // 收到事件通知的回调函数，有变化就会执行一次！
            @Override
            public void process(WatchedEvent watchedEvent) {

                System.out.println("**************************************");
                List<String> children = null;
                try {
                    children = zkClient.getChildren("/", true);
                    for (String child : children) {
                        System.out.println(child);
                    }
                } catch (Exception e){
                    e.printStackTrace();
                }
            }
        });
    }

    @Test()
    public void create() throws InterruptedException, KeeperException {

        /* OPEN_ACL_UNSAFE表示任何人都可访问，权限控制
            CreateMode.PERSISTENT：为四大类型之一，临时/永久/带序号/不带序号
         */
        String node = zkClient.create("/atguigu", "ss.avi".getBytes(),
                ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);

    }

    // 获取子节点，动态监听
    @Test
    public void getChildren() throws Exception {
        // 监听路径  true表示走初始化的watcher
        List<String> children = zkClient.getChildren("/", true);
        for (String child : children) {
            System.out.println(child);
        }
        // 延时阻塞
        Thread.sleep(Long.MAX_VALUE);
    }

    @Test
    public void exist() throws Exception {
        Stat stat = zkClient.exists("/atguigu", false);
        System.out.println(stat == null ? "not exist" : "exist");
    }
}
```





## 3、客户端写数据流程





**写流程之写入请求直接发送给Leader节点：**





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/25022a9ebba91591add21ae15e402f4a.png)







**写流程之写入请求发送给follower节点：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/da6d6675b57534e34e8920831cf1aedb.png)





# 五、服务器动态上下线监听案例







## 1、需求分析



某分布式系统中，主节点可以有多台，可以动态上下线，任意一台客户端都能实时感知到主节点服务器的上下线。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/9bf5fadbbc764b2c0bb54a6bbe62e932.png)



## 2、具体实现





- 先在集群上创建/servers 节点 `create /servers "servers"`



**服务器代码：**



```java
package com.itnxd.case1;

import org.apache.zookeeper.*;

import java.io.IOException;

/**
 * @author ITNXD
 * @create 2021-09-27 17:11
 */
public class DistributeServer {

    private static String connectString = "82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183";
    private static int sessionTimeout = 2000;
    private ZooKeeper zk = null;

    // 创建到 zk 的客户端连接
    public void getConnect() throws IOException {
        zk = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
                    @Override
                    public void process(WatchedEvent event) {
                    }
                });
    }

    // 注册服务器
    public void registServer(String hostname) throws Exception{
        // 节点类型：临时的有序的
        String create = zk.create("/servers/" + hostname,
                hostname.getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE,
                CreateMode.EPHEMERAL_SEQUENTIAL);
        // 控制台打印上线通知
        System.out.println(hostname +" is online "+ create);
    }

    // 业务功能
    public void business(String hostname) throws Exception{
        // 睡眠！
        System.out.println(hostname + " is working ...");
        Thread.sleep(Long.MAX_VALUE);
    }

    public static void main(String[] args) throws Exception {
        // 1 获取 zk 连接
        DistributeServer server = new DistributeServer();
        server.getConnect();
        // 2 利用 zk 连接注册服务器信息
        server.registServer(args[0]);
        // 3 启动业务功能
        server.business(args[0]);
    }
}
```



**客户端代码：**



```java
package com.itnxd.case1;

import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author ITNXD
 * @create 2021-09-27 17:27
 */
public class DistributeClient {

    private static String connectString = "82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183";
    private static int sessionTimeout = 2000;
    private ZooKeeper zk = null;
    private String parentNode = "/servers";

    // 创建到 zk 的客户端连接
    public void getConnect() throws IOException {
        zk = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
            @Override
            public void process(WatchedEvent watchedEvent) {
                // 再次启动监听
                try {
                    getServerList();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    // 获取服务器列表信息
    public void getServerList() throws Exception {
        // 1 获取服务器子节点信息，并且对父节点进行监听
        List<String> children = zk.getChildren(parentNode, true);
        // 2 存储服务器信息列表
        ArrayList<String> servers = new ArrayList<>();
        // 3 遍历所有节点，获取节点中的主机名称信息
        for (String child : children) {
            byte[] data = zk.getData(parentNode + "/servers/" + child, false, null);
            servers.add(new String(data));
        }
        // 4 打印服务器列表信息
        System.out.println(servers);
    }

    // 业务功能
    public void business() throws Exception{
        System.out.println("client is working ...");
        Thread.sleep(Long.MAX_VALUE);
    }

    public static void main(String[] args) throws Exception {
        // 1 获取 zk 连接
        DistributeClient client = new DistributeClient();
        client.getConnect();
        // 2 获取 servers 的子节点信息，从中获取服务器信息列表
        client.getServerList();
        // 3 业务进程启动
        client.business();
    }
}
```



## 3、测试



**1、在 Linux 命令行上操作增加减少服务器**





- 启动 DistributeClient 客户端

- 在 hadoop102 上 zk 的客户端/servers 目录上创建临时带序号节点

```shell
[zk: localhost:2181(CONNECTED) 1] create -e -s /servers/hadoop102 "hadoop102"
[zk: localhost:2181(CONNECTED) 2] create -e -s /servers/hadoop103 "hadoop103"
```



- 观察 Idea 控制台变化

```shell
[hadoop102, hadoop103]
```

- 执行删除操作

```shell
[zk: localhost:2181(CONNECTED) 8] delete /servers/hadoop1020000000000
```



- 观察 Idea 控制台变化

```shell
[hadoop103]
```





**2、在 Idea 上操作增加减少服务器**



- 启动 DistributeClient 客户端（如果已经启动过，不需要重启）
- 启动 DistributeServer 服务端
- 点击 Edit Configurations…，在弹出的窗口中（Program arguments）输入想启动的主机，例如，82.156.11.189:2182

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/e800f92a3319b669f3800c4a87c97d20.png)



- 回到 DistributeServer 的 main 方 法，右键运行
- 观察 DistributeServer 控制台，提示82.156.11.189:2182 is working
- 观察 DistributeClient 控制台，提示82.82.156.11.189:2182 已经上线





# 六、分布式锁案例



## 1、需求分析



**什么叫做分布式锁呢？**

比如说"进程 1"在使用该资源的时候，会先去获得锁，"进程 1"获得锁以后会对该资源保持独占，这样其他进程就无法访问该资源，"进程 1"用完该资源以后就将锁释放掉，让其他进程来获得锁，那么通过这个锁机制，我们就能保证了分布式系统中多个进程能够有序的访问该临界资源。那么我们把这个分布式环境下的这个锁叫作分布式锁。



**分布式锁分析：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/4406c85d0d47d70cea7a07f4347253d0.png)





## 2、具体实现





```java
package com.itnxd.case2;

import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * @author ITNXD
 * @create 2021-09-27 17:51
 */
public class DistributedLock {

    // zookeeper server 列表
    private String connectString = "82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183";
    // 超时时间
    private int sessionTimeout = 2000;
    private ZooKeeper zk;
    private String rootNode = "locks";
    private String subNode = "seq-";
    // 当前 client 等待的子节点
    private String waitPath;
    //ZooKeeper 连接
    private CountDownLatch connectLatch = new CountDownLatch(1);
    //ZooKeeper 节点等待
    private CountDownLatch waitLatch = new CountDownLatch(1);
    // 当前 client 创建的子节点
    private String currentNode;
    // 和 zk 服务建立连接，并创建根节点


    public DistributedLock() throws IOException, InterruptedException, KeeperException {

        zk = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
                    @Override
                    public void process(WatchedEvent event) {
                        // 连接建立时, 打开 latch, 唤醒 wait 在该 latch 上的线程
                        if (event.getState() == Event.KeeperState.SyncConnected) {
                            connectLatch.countDown();
                        }
                        // 发生了 waitPath 的删除事件
                        if (event.getType() ==
                                Event.EventType.NodeDeleted && event.getPath().equals(waitPath))
                        {
                            waitLatch.countDown();
                        }
                    }
                });
        // 等待连接建立
        connectLatch.await();
        //获取根节点状态
        Stat stat = zk.exists("/" + rootNode, false);
        //如果根节点不存在，则创建根节点，根节点类型为永久节点
        if (stat == null) {
            System.out.println("根节点不存在");
            zk.create("/" + rootNode, new byte[0],
                    ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        }
    }
    // 加锁方法
    public void zkLock() {
        try {
            //在根节点下创建临时顺序节点，返回值为创建的节点路径
            currentNode = zk.create("/" + rootNode + "/" + subNode,
                    null, ZooDefs.Ids.OPEN_ACL_UNSAFE,
                    CreateMode.EPHEMERAL_SEQUENTIAL);
            // wait 一小会, 让结果更清晰一些
            Thread.sleep(10);
            // 注意, 没有必要监听"/locks"的子节点的变化情况
            List<String> childrenNodes = zk.getChildren("/" +
                    rootNode, false);
            // 列表中只有一个子节点, 那肯定就是 currentNode , 说明client 获得锁
            if (childrenNodes.size() == 1) {
                return;
            } else {
                //对根节点下的所有临时顺序节点进行从小到大排序
                Collections.sort(childrenNodes);
                //当前节点名称
                String thisNode = currentNode.substring(("/" +
                        rootNode + "/").length());
                //获取当前节点的位置
                int index = childrenNodes.indexOf(thisNode);
                if (index == -1) {
                    System.out.println("数据异常");
                } else if (index == 0) {
                    // index == 0, 说明 thisNode 在列表中最小, 当前client 获得锁
                    return;
                } else {
                    // 获得排名比 currentNode 前 1 位的节点
                    this.waitPath = "/" + rootNode + "/" +
                            childrenNodes.get(index - 1);
                    // 在 waitPath 上注册监听器, 当 waitPath 被删除时,zookeeper 会回调监听器的 process 方法
                    zk.getData(waitPath, true, new Stat());
                    //进入等待锁状态
                    waitLatch.await();
                    return;
                }
            }
        } catch (KeeperException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    // 解锁方法
    public void zkUnlock() {
        try {
            zk.delete(this.currentNode, -1);
        } catch (InterruptedException | KeeperException e) {
            e.printStackTrace();
        }
    }

}
```









## 3、测试



**两个线程测试：**



```java
package com.itnxd.case2;

import org.apache.zookeeper.KeeperException;

import java.io.IOException;

/**
 * @author ITNXD
 * @create 2021-09-27 20:04
 */
public class DistributeLockTest {

    public static void main(String[] args) throws InterruptedException, IOException, KeeperException {

        // 创建分布式锁 1
        final DistributedLock lock1 = new DistributedLock();
        // 创建分布式锁 2
        final DistributedLock lock2 = new DistributedLock();

        new Thread(new Runnable() {
            @Override
            public void run() {
                // 获取锁对象
                try {
                    lock1.zkLock();
                    System.out.println("线程 1 获取锁");
                    Thread.sleep(5 * 1000);
                    lock1.zkUnlock();
                    System.out.println("线程 1 释放锁");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                // 获取锁对象
                try {
                    lock2.zkLock();
                    System.out.println("线程 2 获取锁");
                    Thread.sleep(5 * 1000);
                    lock2.zkUnlock();
                    System.out.println("线程 2 释放锁");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
```



**观察控制台变化：**

```
线程 1 获取锁
线程 1 释放锁
线程 2 获取锁
线程 2 释放锁
```







# 七、Curator 框架



## 1、简介



**原生的 Java API 开发存在的问题？**

- 会话连接是异步的，需要自己去处理。比如使用 CountDownLatch

- Watch 需要重复注册，不然就不能生效
- 开发的复杂性还是比较高的
- 不支持多节点删除和创建。需要自己去递归



Curator 是一个专门解决分布式锁的框架，解决了原生 JavaAPI 开发分布式遇到的问题。

详情请查看官方文档：[https://curator.apache.org/index.html](https://curator.apache.org/index.html)







## 2、依赖





```xml
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
    <version>5.0.0</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.0.0</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-client</artifactId>
    <version>5.0.0</version>
</dependency>
```







## 3、创建连接



**创建连接的两种方式：**

```java
public void test1(){
    //1. 定义重试策略
    // 重试时间 重试次数
    RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000,3);

    //2. 创建CuratorFramework接口的对象
    /**
     * @param connectString       String类型的ZK服务器的地址:端口，多个使用逗号隔开
     * @param sessionTimeoutMs    int类型会话超时时间，单位ms，默认60 * 1000，可省略
     * @param connectionTimeoutMs int类型的连接超时时间，单位ms，默认15 * 1000，可省略
     * @param retryPolicy         重试策略的对象
     */
    CuratorFramework client = CuratorFrameworkFactory.newClient("82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183",retryPolicy);

    //3. 开启连接
    client.start();
    //client.close()关闭连接
}

public void test2(){
    //1. 定义重试策略
    RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000,10);

    //2. 创建CuratorFramework接口的对象
    CuratorFramework client = CuratorFrameworkFactory.builder()
        .connectString("82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183")
        .sessionTimeoutMs(60 * 1000)
        .connectionTimeoutMs(15 * 1000)
        .retryPolicy(retryPolicy)
        .namespace("test") //名称空间，所有节点的路径之前都包含/test，简化开发，可以不使用
        .build();

    //3. 开启连接
    client.start();
}
```





## 4、增删改查



```java
public void test2() throws Exception {
    
    RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000,10);
    CuratorFramework client = CuratorFrameworkFactory.builder()
            .connectString("82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183")
            .sessionTimeoutMs(60 * 1000)
            .connectionTimeoutMs(15 * 1000)
            .retryPolicy(retryPolicy)
            .build();
    client.start();

    //=========================创建============================
    
    // 1. 基本创建
    /**
     * 1. 创建节点如果没有指定数据，则默认将当前主机的ip地址作为值存储
     * 2. 创建的节点的父节点默认必须存在
     * 3. 返回值是String类型的创建的节点的路径
     */
    // 创建出/k1节点，值为v1!
    String path = client.create().forPath("/k1", "v1".getBytes());

    // 2. 创建不同类型的节点
    /**
     * 1. 默认是持久化节点
     * 2. 使用withMode方法创建不同类型(节点的四种类型)
     */
    //创建临时节点，会话关闭自动消失(非命令行会话)
    client.create().withMode(CreateMode.EPHEMERAL).forPath("/k2");

    // 3. 创建多级节点 如果父节点不存在则创建父节点
    client.create().creatingParentsIfNeeded().forPath("/k2/k2_1", "v2_1".getBytes());
    
    //==========================查询==================================
    // 1. 查询某一结点的值
    byte[] data = client.getData().forPath("/k1");
    System.out.println(new String(data));

    // 2. 查询子节点
    List<String> strings = client.getChildren().forPath("/");
    System.out.println(strings);

    // 3. 查询某一节点详细信息
    // Stat是一个 JavaBean，其中的属性就是之前所述详细信息的参数
    Stat stat = new Stat();
    //将获取到的信息存储在Stat对象的属性中
    client.getData().storingStatIn(stat).forPath("/k1");
    
    //==============================修改====================================
    
    // 1. 修改某一结点的值
    client.setData().forPath("/k1", "new_v1".getBytes());
    // 2. 根据某一结点的版本修改值
    // 每次修改值都会更新版本，使用此是为了防止多人修改一个节点时出错
    int version = new Stat().getVersion(); //获取当前版本
    client.setData().withVersion(version).forPath("/k2", "new_k2".getBytes());
    
    
    // =================================删除=========================================
    
    // 1. 删除单个节点
    client.delete().forPath("/k2");
    // 2. 删除带有子节点的节点
    client.delete().deletingChildrenIfNeeded().forPath("/k2");
    // 3. 必须成功的删除
    //可能会由于网络抖动等原因导致删除失败，本质就是重试删除，直至成功
    client.delete().guaranteed().forPath("/k2");
    // 4. 回调删除
    // 删除操作结束之后自动执行的回调函数
    client.delete().guaranteed().inBackground(new BackgroundCallback() {
        @Override
        public void processResult(CuratorFramework client, CuratorEvent event) throws Exception {
            System.out.println("执行了回调函数!");
        }
    }).forPath("/k2");

    // 关闭连接
    client.close();
}
```



## 5、Watch事件监听





1. ZK允许用户在指定节点上注册一些Watcher，并且在一些特定事件触发的时候，ZK服务端会将事件通知到感兴趣的客户端中，该机制是ZK实现分布式协调服务的重要特性
2. ZK中引入了Watcher机制实现发布/订阅功能，能够让多个订阅者同时监听某一个对象，当此对象状态发生变化的时候，会通知所有订阅者
3. ZK提供了三种Watcher：
   1. NodeCache：监听某一特定的节点
   2. PathChildrenCache：监听某一结点的所有子节点 (并不监听此节点本身)
   3. TreeCache：监听某一(子)树的所有结点 (NodeCache + PathChildrenCache)



**三种Watcher演示：**



```java
public void test3() throws Exception {

    RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000,10);
    CuratorFramework client = CuratorFrameworkFactory.builder()
        .connectString("82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183")
        .sessionTimeoutMs(60 * 1000)
        .connectionTimeoutMs(15 * 1000)
        .retryPolicy(retryPolicy)
        .build();
    client.start();

    //=========================演示一：NodeCache==========================

    //1. 创建NodeCache对象
    NodeCache nodeCache = new NodeCache(client, "/k1");
    //2. 注册监听 (无法监听特定的添加或者删除等事件，除了get操作其余均会触发此事件)
    nodeCache.getListenable().addListener(new NodeCacheListener() {
        @Override
        public void nodeChanged() throws Exception {
            System.out.println("数据变化了");
            //获取节点修改过后的值
            byte[] data = nodeCache.getCurrentData().getData();
            System.out.println("新值是：" + new String(data));
        }
    });
    // 3. 开启监听，如果设置为true，则开启监听时，如果之前的缓存记录中有满足监听条件的会显示出来
    nodeCache.start(true);

    Thread.sleep(Long.MAX_VALUE);

    //==================演示二：PathChildrenCache============================

    // 1. 创建PathChildrenCache对象，设置为true，监听开启时加载之前的缓存数据
    PathChildrenCache pathChildrenCache = new PathChildrenCache(client, "/", true);

    // 2. 注册监听
    pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
        @Override
        public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) throws Exception {

            System.out.println("节点发生变更！");
            System.out.println("event对象的值：" + event);

            //获取节点变更的类型，Type是内部枚举类
            PathChildrenCacheEvent.Type type = event.getType();
            System.out.println("获取到的变更类型：" + type);

            //判断变更类型是否为UPDATED，还有ADDED、REMOVED等类型
            if (type.equals(PathChildrenCacheEvent.Type.CHILD_UPDATED)) {
                //获取修改后的值，连续使用两个getData()
                System.out.println("节点的值被修改成为：" + new String(event.getData().getData()));
            }
        }
    });

    // 3. 开启监听
    pathChildrenCache.start();

    Thread.sleep(Long.MAX_VALUE);



    //===============================演示三：TreeCache===========================
    // 1. 创建TreeCache对象
    TreeCache treeCache = new TreeCache(client, "/k1");
    // 2. 注册监听
    treeCache.getListenable().addListener(new TreeCacheListener() {
        @Override
        public void childEvent(CuratorFramework client, TreeCacheEvent event) throws Exception {
            System.out.println("变更后的具体数组都在event对象中：" + event);
        }
    });
    // 3. 开启监听
    treeCache.start();

    Thread.sleep(Long.MAX_VALUE);
}
```











## 6、分布式锁实现及测试



**Curator实现分布式锁有五种方案：**

- InterProcessSemaphoreMutex：分布式排它锁
- InterProcessMutex：**分布式可重入排它锁 (使用较多)**
- InterProcessReadWriteLock：分布式读写锁
- InterProcessMultiLock：将多个锁作为单个实体管理的容器
- InterProcessSemaphoreV2：共享信号量
  

**分布式锁代码实现：**

```java
package com.itnxd.case3;

import org.apache.curator.RetryPolicy;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.recipes.locks.InterProcessLock;
import org.apache.curator.framework.recipes.locks.InterProcessMutex;
import org.apache.curator.retry.ExponentialBackoffRetry;

/**
 * @author ITNXD
 * @create 2021-09-27 20:32
 */
public class CuratorLockTest {

    private String rootNode = "/locks";
    // zookeeper server 列表
    private String connectString = "82.156.11.189:2181,82.156.11.189:2182,82.156.11.189:2183";
    // connection 超时时间
    private int connectionTimeout = 2000;
    // session 超时时间
    private int sessionTimeout = 2000;

    public static void main(String[] args) {
        new CuratorLockTest().test();
    }

    // 测试
    private void test() {
        // 创建分布式锁 1
        final InterProcessLock lock1 = new
                InterProcessMutex(getCuratorFramework(), rootNode);
        // 创建分布式锁 2
        final InterProcessLock lock2 = new
                InterProcessMutex(getCuratorFramework(), rootNode);
        new Thread(new Runnable() {
            @Override
            public void run() {
                // 获取锁对象
                try {
                    lock1.acquire();
                    System.out.println("线程 1 获取锁");
                    // 测试锁重入
                    lock1.acquire();
                    System.out.println("线程 1 再次获取锁");
                    Thread.sleep(5 * 1000);
                    lock1.release();
                    System.out.println("线程 1 释放锁");
                    lock1.release();
                    System.out.println("线程 1 再次释放锁");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
        new Thread(new Runnable() {
            @Override
            public void run() {
                // 获取锁对象
                try {
                    lock2.acquire();
                    System.out.println("线程 2 获取锁");
                    // 测试锁重入
                    lock2.acquire();
                    System.out.println("线程 2 再次获取锁");
                    Thread.sleep(5 * 1000);
                    lock2.release();
                    System.out.println("线程 2 释放锁");
                    lock2.release();
                    System.out.println("线程 2 再次释放锁");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    // 分布式锁初始化
    public CuratorFramework getCuratorFramework (){
        //重试策略，重试时间 3 秒，重试 3 次
        RetryPolicy policy = new ExponentialBackoffRetry(3000, 3);
        //通过工厂创建 Curator
        CuratorFramework client =
                CuratorFrameworkFactory.builder()
                        .connectString(connectString)
                        .connectionTimeoutMs(connectionTimeout)
                        .sessionTimeoutMs(sessionTimeout)
                        .retryPolicy(policy).build();
        //开启连接
        client.start();
        System.out.println("zookeeper 初始化完成...");
        return client;
    }
}
```







**结果：**

观察控制台变化：

```
线程 1 获取锁
线程 1 再次获取锁
线程 1 释放锁
线程 1 再次释放锁
线程 2 获取锁
线程 2 再次获取锁
线程 2 释放锁
线程 2 再次释放锁
```











# 七、面试真题

## 1、选举机制



半数机制，超过半数的投票通过，即通过！

1. 第一次启动选举规则：投票过半数时，服务器 id 大的胜出
2. 第二次启动选举规则：
   1. EPOCH 大的直接胜出
   2. EPOCH 相同，事务 id 大的胜出
   3. 事务 id 相同，服务器 id 大的胜出





**注意：**

- 可运行的机器要超过集群总数量的半数
- 主服务器挂掉，其余服务器会重新进行选举出Leader
- 产生了Leader之后，当有新的服务器加入，不会影响到现有Leader地位





## 2、生产集群安装多少 zk 合适？



安装奇数台！

生产经验：

10 台服务器：3 台 zk；

20 台服务器：5 台 zk；

100 台服务器：11 台 zk；

200 台服务器：11 台 zk

服务器台数多：好处，提高可靠性；坏处：提高通信延时！



## 3、常用命令



ls、get、create、delete ....





# 八、算法基础





## 1、拜占庭将军问题





拜占庭将军问题是一个协议问题，拜占庭帝国军队的将军们必须全体一致的决定是否攻击某一支敌军。

问题是这些将军在地理上是分隔开来的，并且将军中存在叛徒。

叛徒可以任意行动以达到以下目标：欺骗某些将军采取进攻行动；促成一个不是所有将军都同意的决定，如当将军们不希望进攻时促成进攻行动；或者迷惑某些将军，使他们无法做出决定。

如果叛徒达到了这些目的之一，则任何攻击行动的结果都是注定要失败的，**只有完全达成一致的努力才能获得胜利**。





## 2、Paxos算法



**Paxos算法**：一种基于消息传递且具有**高度容错特性的一致性算法**。

**Paxos算法解决的问题**：就是如何快速正确的在一个分布式系统中对某个数据值达成一致，并且保证不论发生任何异常，都不会破坏整个系统的一致性。



### Paxos算法描述



在一个Paxos系统中，首先将所有节点划分为Proposer（提议者），Acceptor（接受者），和Learner（学习者）。（注意：每个节点都可以身兼数职）。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/ba6ad0e4603b98c60d76c3b34569b977.png)



-  一个完整的Paxos算法流程分为三个阶段：
- Prepare准备阶段
  - Proposer向多个Acceptor发出Propose请求Promise（承诺）
  - Acceptor针对收到的Propose请求进行Promise（承诺）
- Accept接受阶段
  - Proposer收到多数Acceptor承诺的Promise后，向Acceptor发出Propose请求
  - Acceptor针对收到的Propose请求进行Accept处理
- Learn学习阶段：Proposer将形成的决议发送给所有Learners





### Paxos算法流程



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/284c1d3724df6ec49cca813971b0a462.png)



1. Prepare: Proposer生成全局唯一且递增的Proposal ID，向所有Acceptor发送Propose请求，这里无需携带提案内容，只携带Proposal ID即可。
2. Promise: Acceptor收到Propose请求后，做出“两个承诺，一个应答”。
   1. 不再接受Proposal ID小于等于（注意：这里是<= ）当前请求的Propose请求。
   2. 不再接受Proposal ID小于（注意：这里是< ）当前请求的Accept请求。
   3. 不违背以前做出的承诺下，回复已经Accept过的提案中Proposal ID最大的那个提案的Value和Proposal ID，没有则返回空值。
3. Propose: Proposer收到多数Acceptor的Promise应答后，从应答中选择Proposal ID最大的提案的Value，作为本次要发起的提案。如果所有应答的提案Value均为空值，则可以自己随意决定提案Value。然后携带当前Proposal ID，向所有Acceptor发 送Propose请求。
4. Accept: Acceptor收到Propose请求后，在不违背自己之前做出的承诺下，接受并持久化当前Proposal ID和提案Value。
5. Learn: Proposer收到多数Acceptor的Accept后，决议形成，将形成的决议发送给所有Learner。





### 情况一



**有A1, A2, A3, A4, A5 5位议员，就税率问题进行决议：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/fd44d7220ba3590ee5226adce3eedf4d.png)



- A1发起1号Proposal的Propose，等待Promise承诺；
- A2-A5回应Promise；
- A1在收到两份回复时就会发起税率10%的Proposal；
- A2-A5回应Accept；
- 通过Proposal，税率10%。



### 情况二



**现在我们假设在A1提出提案的同时, A5决定将税率定为20%：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/8ef0a99d411020479828223a52d58008.png)



- A1，A5同时发起Propose（序号分别为1，2）
- A2承诺A1，A4承诺A5，A3行为成为关键
- 情况1：A3先收到A1消息，承诺A1。
- A1发起Proposal（1，10%），A2，A3接受。
- 之后A3又收到A5消息，回复A1：（1，10%），并承诺A5。
- A5发起Proposal（2，20%），A3，A4接受。之后A1，A5同时广播决议。



**Paxos 算法缺陷**：在网络复杂的情况下，一个应用 Paxos 算法的分布式系统，可能很久无法收敛，甚至陷入**活锁**的情况。



### 情况三



**现在我们假设在A1提出提案的同时, A5决定将税率定为20%：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/40b674519bae5b7c41d559930cd72e99.png)



- A1，A5同时发起Propose（序号分别为1，2）
- A2承诺A1，A4承诺A5，A3行为成为关键
- 情况2：A3先收到A1消息，承诺A1。之后立刻收到A5消息，承诺A5。
- A1发起Proposal（1，10%），无足够响应，A1重新Propose （序号3），A3再次承诺A1。
- A5发起Proposal（2，20%），无足够相应。A5重新Propose （序号4），A3再次承诺A5。
- ……





造成这种情况的原因是系统中有一个以上的 Proposer，多个 Proposers 相互争夺 Acceptor，造成迟迟无法达成一致的情况。针对这种情况，一种改进的 Paxos 算法被提出：从系统中选出一个节点作为 Leader，只有 Leader 能够发起提案。这样，一次 Paxos 流程中只有一个Proposer，不会出现活锁的情况，此时只会出现例子中第一种情况。







## 3、Zab协议



### 什么是ZAB算法



Zab 借鉴了 Paxos 算法，是特别为 Zookeeper 设计的支持崩溃恢复的原子广播协议。基于该协议，Zookeeper 设计为只有一台客户端（Leader）负责处理外部的写事务请求，然后Leader 客户端将数据同步到其他 Follower 节点。即 Zookeeper 只有一个 Leader 可以发起提案。





### Zab协议内容



Zab 协议包括两种基本的模式：消息广播、崩溃恢复。





### 消息广播



**示意图：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/5a257bbf67b5d6899ce410e0c12a3e8c.png)





**消息广播过程：**

1. 客户端发起一个写操作请求。
2. Leader服务器将客户端的请求转化为事务Proposal 提案，同时为每个Proposal 分配一个全局的ID，即zxid。
3. Leader服务器为每个Follower服务器分配一个单独的队列，然后将需要广播的 Proposal依次放到队列中去，并且根据FIFO策略进行消息发送。
4. Follower接收到Proposal后，会首先将其以事务日志的方式写入本地磁盘中，写入成功后向Leader反馈一个Ack响应消息。
5. Leader接收到超过半数以上Follower的Ack响应消息后，即认为消息发送成功，可以发送commit消息。
6. Leader向所有Follower广播commit消息，同时自身也会完成事务提交。Follower 接收到commit消息后，会将上一条事务提交。
7. Zookeeper采用Zab协议的核心，就是只要有一台服务器提交了Proposal，就要确保所有的服务器最终都能正确提交Proposal。



**ZAB协议针对事务请求的处理过程类似于一个两阶段提交过程：**

- 广播事务阶段

- 广播提交操作

这两阶段提交模型，有可能因为Leader宕机带来数据不一致，比如

- Leader 发起一个事务Proposal1 后就宕机 ，Follower 都没有Proposal1
- Leader收到半数ACK宕机，没来得及向Follower发送Commit怎么解决呢？ZAB引入了崩溃恢复模式。









### 崩溃恢复



**崩溃恢复——异常假设**



一旦Leader服务器出现崩溃或者由于网络原因导致Leader服务器失去了与过半 Follower的联系，那么就会进入**崩溃恢复模式。**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/b4fd798df80c27b528ace22f6192ec71.png)



1. **假设两种服务器异常情况：**
   1. 假设一个事务在Leader提出之后，Leader挂了。
   2. 一个事务在Leader上提交了，并且过半的Follower都响应Ack了，但是Leader在Commit消息发出之前挂了。
2. **Zab协议崩溃恢复要求满足以下两个要求：**
   1. 确保已经被Leader提交的提案Proposal，必须最终被所有的Follower服务器提交。 （**已经产生的提案，Follower必须执行**）
   2. 确保**丢弃**已经被Leader提出的，但是没有被提交的Proposal。（**丢弃胎死腹中的提案**）







**崩溃恢复——Leader选举**



崩溃恢复主要包括两部分：**Leader选举和数据恢复。**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/dc642a53a02928fdd10aa674ebc3d6db.png)



**Leader选举**：根据上述要求，Zab协议需要保证选举出来的Leader需要满足以下条件：

1. 新选举出来的Leader不能包含未提交的Proposal。**即新Leader必须都是已经提交了Proposal的Follower服务器节点。**
2. **新选举的Leader节点中含有最大的zxid**。这样做的好处是可以避免Leader服务器检查Proposal的提交和丢弃工作。



**崩溃恢复——数据恢复**



崩溃恢复主要包括两部分：**Leader选举和数据恢复。**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/28/e2f5b93c465b11fe6ec1749efc58abe9.png)

**Zab如何数据同步：**

1. 完成Leader选举后，在正式开始工作之前（接收事务请求，然后提出新的Proposal），**Leader服务器会首先确认事务日志中的所有的Proposal 是否已经被集群中过半的服务器Commit。**
2. Leader服务器需要确保所有的Follower服务器能够接收到每一条事务的Proposal，并且能将所有已经提交的事务Proposal应用到内存数据中。**等Follower将所有尚未同步的事务Proposal都从Leader服务器上同步过，并且应用到内存数据中以后，Leader才会把该Follower加入到真正可用的Follower列表中。**







## 4、CAP理论



**CAP理论告诉我们，一个分布式系统不可能同时满足以下三种：**

1. 一致性（C：Consistency）
2. 可用性（A：Available）
3. 分区容错性（P：Partition Tolerance）



**这三个基本需求，最多只能同时满足其中的两项，因为P是必须的，因此往往选择就在CP或者AP中。**



- 一致性：在分布式环境中，一致性是指数据在多个副本之间是否能够保持数据一致的特性。在一致性的需求下，当一个系统在数据一致的状态下执行更新操作后，应该保证系统的数据仍然处于一致的状态。
- 可用性：可用性是指系统提供的服务必须一直处于可用的状态，对于用户的每一个操作请求总是能够在有限的时间内返回结果。

- 分区容错性：分布式系统在遇到任何网络分区故障的时候，仍然需要能够保证对外提供满足一致性和可用性的服务，除非是整个网络环境都发生了故障。



**ZooKeeper保证的是CP：**

- ZooKeeper不能保证每次服务请求的可用性。（注：在极端环境下，ZooKeeper可能会丢弃一些请求，消费者程序需要重新请求才能获得结果）。所以说，ZooKeeper不能保证服务可用性。

- 进行Leader选举时集群都是不可用。

