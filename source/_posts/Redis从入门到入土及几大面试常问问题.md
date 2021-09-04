---
title: Redis从入门到入土及几大面试常问问题
author: ITNXD
toc: true
abbrlink: 64689
date: 2021-08-30 15:12:17
updated:
top_img: https://cdn.jsdelivr.net/gh/niuxvdong/pic@20dfc0d63f6ce6e25647fc6c181f020104d1caea/2021/09/04/0dd8f091bf8546346d08f2c63706c75c.png
cover: https://cdn.jsdelivr.net/gh/niuxvdong/pic@20dfc0d63f6ce6e25647fc6c181f020104d1caea/2021/09/04/0dd8f091bf8546346d08f2c63706c75c.png
categories: Redis
tags:
  - Redis
  - RDB
  - AOF
  - 集群
---





# 一、NoSQL数据库简介



## 1、引入



> 随着Web2.0的时代的到来，用户访问量大幅度提升，同时产生了大量的用户数据。加上后来的智能移动设备的普及，所有的互联网平台都面临了巨大的性能挑战。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@b92faa3dabf9055d816aac7e04d83f46db65c6e2/2021/09/04/7df712822e85c391dadc049889ce9b08.png)





**解决CPU及内存压力？ --- 增加多台服务器，复制进行分散！**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e9706afe58ad5e0e3580236f17184ee72dfeb9d0/2021/09/04/47850f866e568e61205ca20d502803d4.png)







**解决IO压力？ --- 增加缓存数据库！**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2cba6b22f3eee43e804401c74677804f0783e73c/2021/09/04/5d79ed1da88f8048d3fb58749024877e.png)









## 2、NoSQL概述



NoSQL(NoSQL = **Not Only SQL** )，意即“不仅仅是SQL”，泛指**非关系型的数据库**。

NoSQL 不依赖业务逻辑方式存储，而以简单的key-value模式存储。因此大大的增加了数据库的扩展能力。 



1. 不遵循SQL标准。
2. 不支持ACID。**（并不是不支持事务）**
3. 远超于SQL的性能。



## 3、NoSQL使用场景



1. 适用场景：
   1. 对数据**高并发的读写**
   2. 海量数据的读写
   3. 对数据高可扩展性的
2. 不适用场景
   1. 需要事务支持
   2. 基于sql的结构化查询存储，处理复杂的关系，需要即席查询。
   3. **（用不着sql****的和用了sql也不行的情况，请考虑用NoSql）**







# 二、Redis安装及其启动



## 1、Redis概述





1. Redis是一个**开源的key-value存储系统**。
2. 和Memcached类似，它支持存储的value类型相对更多，包括`string、list、set、zset(sorted set --有序集合)和hash`。
3. 这些数据类型都支持`push/pop、add/remove`及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。
4. 在此基础上，Redis支持各种不同方式的排序。
5. 与memcached一样，为了保证效率，数据都是缓存在内存中。
6. 区别的是Redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件。
7. 并且在此基础上实现了master-slave**(主从)同步**。







## 2、应用场景



- **配合关系型数据库做高速缓存：**
  - **高频次**，**热门**访问的数据，降低数据库IO
  - 分布式架构，**做session共享**
- **多样的数据结构存储持久化数据（如下图）：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e79689aef911afde9dec7dff8e78d4e1e0a37bd6/2021/09/04/fca29f36ee14825bf6306c5dc9e1b5a9.png)





## 3、Redis安装



> 访问[Redis官网](http://redis.io)进行下载！
>
> Redis只能在Linux下使用，没有Windows版本！



```bash
# 压缩文件位置
cd /opt
# 下载Redis压缩包 地址直接去官网下载处右键复制链接地址即可！
wget https://download.redis.io/releases/redis-6.2.5.tar.gz
# 解压
tar -zxvf redis-6.2.5.tar.gz

# Redis安装需要使用草C语言环境，先安装gcc
yum install gcc
# 测试gcc版本
gcc -v

# 进入Redis解压目录进行编译及安装
cd redis-6.2.5
make && make install
```





**可执行文件位置：`/usr/local/bin`**

- redis-benchmark：性能测试工具，可以在自己本机运行，看看自己本子性能如何
- redis-check-aof：修复有问题的AOF文件
- redis-check-dump：修复有问题的dump.rdb文件
- redis-sentinel：Redis集群使用
- **redis-server：Redis服务器启动命令**
- **redis-cli：客户端，操作入口**





## 4、Redis启动



> 默认端口6379，建议进行修改！



### 4.1、前台启动



> 前台启动，命令行窗口关闭，则Redis服务停止！



```bash
redis-server
```





### 4.2、后台启动（推荐）



```bash
# 备份redis配置文件
cd /opt/redis-6.2.5
cp redis.conf /etc/redis.conf

# 修改配置信息
vim /etc/redis.conf
# 将 daemonize no改成yes -->打开后台启动开关

# 后台启动
redis-server /etc/redis.conf
# 查看redis进程
ps -ef | grep redis
# 前台访问
redis-cli
# 指定端口访问
redis-cli -p port

# 测试 输入ping返回pong
ping
```





## 5、Redis关闭



- 在redis-cli中直接使用命令`shutdown`关闭，后台服务redis-server将终止。
  - 或直接输入linux命令`redis-cli -p port shutdown`进行关闭
- 或者直接查看进程号通过linux命令`kill -9`关闭。（不建议，可能丢失数据等等）
- 退出客户端直接输入exit即可！



## 6、Redis实现原理





> **原理：Redis是单线程+多路IO复用技术，memcached是多线程+锁！**



**单线程 + 多路IO复用技术简单图示：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@bdf63605c273cd97ae59e3ab4d49d103222499e0/2021/09/04/a4ea491fa6826d2b567bf1e7e39ea61d.png)









# 三、五大常用数据类型



> 在[官网](http://www.redis.cn/commands.html)可以获得常用数据类型的各种命令！





## 1、Redis中的key





**操作key常用命令：**

1. keys *：查看当前库所有key  (匹配：keys *1)
2. exists key：判断某个key是否存在
3. type key：查看你的key是什么类型
4. del key：删除指定的key数据
5. unlink key：根据value选择**非阻塞删除**（仅将keys从keyspace元数据中删除，真正的删除会在后续**异步**操作。）
6. expire key x：x秒钟：为给定的key设置过期时间
7. ttl key：查看还有多少秒过期，-1表示永不过期，-2表示已过期 

**操作库常用命令：**

1. `select <dbid>`：命令切换数据库（默认16个数据库，类似数组下标从0开始，初始默认使用0号库）
2. dbsize：查看当前数据库的key的数量
3. flushdb：清空当前库
4. flushall：通杀全部库





## 2、字符串String



> - String类型是二进制安全的。意味着Redis的String可以包含任何数据。比如jpg图片或者序列化的对象。
>
> - String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是512M。





### 2.1、常用命令



- `set key value [EX seconds | PX milliseconds | KEEPTTL][NX |XX]`

  - NX：当数据库中key不存在时，可以将key-value添加数据库
  - XX：当数据库中key存在时，可以将key-value添加数据库，与NX参数互斥
  - EX：key的超时秒数
  - PX：key的超时毫秒数，与EX互斥

- `get <key>`：查询对应键值

- `append <key><value>`：将给定的`<value>`追加到原值的末尾并返回总长度

- `strlen <key>`：获得值的长度

- `setnx <key><value>`：只有在 key 不存在时  设置 key 的值

- `incr <key>`：将 key 中储存的数字值增1，只能对数字值操作，如果为空，新增值为1

- `decr <key>`：将 key 中储存的数字值减1，只能对数字值操作，如果为空，新增值为-1

- `incrby / decrby <key><步长>`：将 key 中储存的数字值增减。自定义步长。

- `mset <key1><value1><key2><value2> .....` ：同时设置一个或多个 key-value对 

- `mget <key1><key2><key3> .....`：同时获取一个或多个 value 

- `msetnx <key1><value1><key2><value2> ..... `：同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。**原子性，有一个失败则都失败。**

- `getrange <key><起始位置><结束位置>`：（闭区间）获得值的范围，类似java中的substring。

- `setrange <key><起始位置><value>`：用 `<value>` 覆写`<key>`所储存的字符串值，从`<起始位置>`开始(索引从0开始)。

  （从起始位置覆盖，原字符串剩下的没有被覆盖的追加到后面）

- `setex <key><过期时间><value>`：设置键值的同时，设置过期时间，单位秒。

- `getset <key><value>`：以新换旧，设置了新值同时获得旧值。





**补充：所谓原子操作是指不会被线程调度机制打断的操作：**

这种操作一旦开始，就一直运行到结束，中间不会有任何 context switch （切换到另一个线程）。

（1）在单线程中， 能够在单条指令中完成的操作都可以认为是"原子操作"，因为中断只能发生于指令之间。

（2）在多线程中，不能被其它进程（线程）打断的操作就叫原子操作。

Redis单命令的原子性主要得益于Redis的单线程。



### 2.2、数据结构



> String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配。
>
> 当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。





## 3、列表List



> 单键多值。Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。
>
> 它的底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。



### 3.1、常用命令



- `lpush/rpush <key><value1><value2><value3> .... `：从左边/右边插入一个或多个值。

- `lpop/rpop <key>`：从左边/右边吐出一个值。值在键在，值光键亡。(每次删一个，删完则键值对就没了)
- `rpoplpush <key1><key2>`：从`<key1>`列表右边吐出一个值，插到`<key2>`列表左边。
- `lrange <key><start><stop>`：按照索引下标获得元素(从左到右)
  - `lrange mylist 0 -1`：0左边第一个，-1右边第一个，（0-1表示获取所有）
- `lindex <key><index>`：按照索引下标获得元素(从左到右)
- `llen <key>`：获得列表长度 
- `linsert <key> before <value><newvalue>`：在`<value>`的前面插入`<newvalue>`插入值
- `lrem <key><n><value>`：从左边删除n个value(从左到右)
- `lset<key><index><value>`：将列表key下标为index的值替换成value



### 3.2、数据结构



**List的数据结构为快速链表quickList。**

- 首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。它将所有的元素紧挨着一起存储，分配的是一块连续的内存。当数据量比较多的时候才会改成quicklist。
- 因为普通的链表需要的附加指针空间太大，会比较浪费空间。
- Redis将链表和ziplist结合起来组成了quicklist。也就是将多个ziplist使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@7edd2800d383816e2bde26cff56b0d177ad52c7c/2021/09/04/bd1935f0ddb02ba95eeb66a09b3624f6.png)





## 4、集合Set



> Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以**自动排重**的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。
>
> Redis的Set是string类型的无序集合。它底层其实是一个value为null的hash表，所以添加，删除，查找的**复杂度都是O(1)**。

### 4.1、常用命令



- `sadd <key><value1><value2> ..... `：将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略
- `smembers <key>`：取出该集合的所有值。
- `sismember <key><value>`：判断集合`<key>`是否为含有该`<value>`值，有1，没有0
- `scard<key>`返回该集合的元素个数。
- `srem <key><value1><value2> .... `：删除集合中的某个元素。
- `spop <key>`：**随机从该集合中吐出一个值。**
- `srandmember <key><n>`：随机从该集合中取出n个值。不会从集合中删除 。
- `smove <source><destination>value`：把集合中一个值从一个集合移动到另一个集合
- `sinter <key1><key2>`：返回两个集合的交集元素。
- `sunion <key1><key2>`：返回两个集合的并集元素。
- `sdiff <key1><key2>`：返回两个集合的**差集**元素(key1中的，不包含key2中的)

 



### 4.2、数据结构



**Set数据结构是dict字典，字典是用哈希表实现的。**

Java中HashSet的内部实现使用的是HashMap，只不过所有的value都指向同一个对象。Redis的set结构也是一样，它的内部也使用hash结构，所有的value都指向同一个内部值。







## 5、哈希Hash



> Redis hash 是一个键值对集合。
>
> Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象。
>
> 类似Java里面的`Map<String,Object>`。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@cbbe53fd884a4433daede94d9715637d059a1e28/2021/09/04/55e595933da95aae1236ed2bf15df6af.png)

### 5.1、常用命令



- `hset <key><field><value>`：给`<key>`集合中的 `<field>`键赋值`<value>`（可以批量插入，类似hmset，可以插入和修改）
- `hget <key1><field>从<key1>`：集合`<field>`取出 value 
- `hmset <key1><field1><value1><field2><value2>... `：批量设置hash的值
- `hexists<key1><field>`：查看哈希表 key 中，给定域 field 是否存在。 
- `hkeys <key>`：列出该hash集合的所有field
- `hvals <key>`：列出该hash集合的所有value
- `hincrby <key><field><increment>`：为哈希表 key 中的域 field 的值加上增量 1  -1
- `hsetnx <key><field><value>`：将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 .



### 5.2、数据结构



Hash类型对应的数据结构是两种：**ziplist（压缩列表），hashtable（哈希表）**。当field-value长度较短且个数较少时，使用ziplist，否则使用hashtable。





## 6、有序集合Zset



> Redis有序集合zset与普通集合set非常相似，是一个没有重复元素的字符串集合。
>
> 不同之处是有序集合的每个成员都关联了一个**评分（score）**,这个评分（score）被用来按照从最低分到最高分的方式排序集合中的成员。**集合的成员是唯一的，但是评分可以是重复了 。**
>
> 因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。
>
> 访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。





### 6.1、常用命令



- `zadd <key><score1><value1><score2><value2>…`：将一个或多个 member 元素及其 score 值加入到有序集 key 当中。
- `zrange <key><start><stop> [WITHSCORES]`：返回有序集 key 中，下标在`<start><stop>`之间的元素。**带WITHSCORES，可以让分数一起和值返回到结果集。**
- `zrangebyscore key min max [withscores] [limit offset count]`：返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。有序集成员按 score 值递增(从小到大)次序排列。 
- `zrevrangebyscore key max min [withscores] [limit offset count]` ：同上，改为从大到小排列。 
- `zincrby <key><increment><value>`：为元素的score加上增量
- `zrem <key><value>`：删除该集合下，指定值的元素
- `zcount <key><min><max>`：统计该集合，分数区间内的元素个数 
- `zrank <key><value>`：返回该值在集合中的排名，从0开始。





### 6.2、数据结构



> SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构`Map<String, Double>`，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。

**zset底层使用了两个数据结构：**

1. hash，hash的作用就是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值。
2. 跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。







# 四、Redis配置文件介绍



> 配置文件位置：opt下的解压目录或者我们使用的备份文件位置，`/etc/redis.conf`
>
> 配置文件修改后，都需要重启Redis进程！



## 1、Units单位



> 配置大小单位,开头定义了一些基本的度量单位，只支持bytes，不支持bit。
>
> 大小写不敏感！





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@fe79ce27ddeb69d068804e28a1acfb88a8b49f8d/2021/09/04/db028641e8d1f371bcdeb127a3b4b52a.png)



## 2、INCLUDES包含



> 类似jsp中的include，多实例的情况可以把**公用的配置文件**提取出来





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@b88b4e9acf4d1f899eb5a6e216ed42dc9cd3e897/2021/09/04/97b23627a5921efa165a079742fc0a09.png)



## 3、网络相关配置



- bind + ip：表示谁可以访问Redis服务器，默认情况bind=127.0.0.1只能接受本机的访问请求，不写的情况下，无限制接受任何ip地址的访问
  - 生产环境肯定要写你应用服务器的地址；服务器是需要远程访问的，所以需要将其注释掉
- protected-mode：保护模式，如果开启了protected-mode，那么在没有设定bind ip且没有设密码的情况下，Redis只允许接受本机的响应
- port：端口，默认6379，建议修改，防止攻击。修改端口启动需要使用`-p`参数指定端口
- tcp-backlog：backlog其实是一个连接队列，backlog队列总和=未完成三次握手队列 + 已经完成三次握手队列。在高并发环境下你需要一个高backlog值来避免慢客户端连接问题。
  - 注意Linux内核会将这个值减小到`/proc/sys/net/core/somaxconn`的值（128），所以需要确认增大`/proc/sys/net/core/somaxconn`和`/proc/sys/net/ipv4/tcp_max_syn_backlog`（128）两个值来达到想要的效果
- timeout：一个空闲的客户端维持多少秒会关闭，0表示关闭该功能。即永不关闭。
- tcp-keepalive：对访问客户端的一种心跳检测，每个n秒检测一次。单位为秒，如果设置为0，则不会进行Keepalive检测，建议设置成60 





## 4、GENERAL通用



- daemonize：是否为后台进程，设置为yes。守护进程，后台启动
- pidfile：进程id文件，存放pid文件的位置，每个实例会产生一个不同的pid文件
- loglevel：指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为**notice**。四个级别根据使用阶段来选择，生产环境选择notice 或者warning
- logfile：日志文件名称
- databases 16：设定库的数量 默认16，默认数据库为0，可以使用`SELECT <dbid>`命令在连接上指定数据库id



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a9dc78a874d09d1e25cb48ed7f6d17147859810c/2021/09/04/76e2d445c94909a95e5172e724485b79.png)





## 5、SECURITY安全





requirepass：密码设置，在命令中设置密码，只是临时的。重启redis服务器，密码就还原了。永久设置，需要再配置文件中进行设置。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2847bf716f02bfcbbdd922676107fb7e6e835293/2021/09/04/e5310d54e7e3e145759ed890b64f3fee.png)



**命令行设置密码：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@018d332e6b30a71461f54b370b7cae603a0aae95/2021/09/04/c463b541bc23741d752456a45cd2c220.png)





## 6、CLIENTS限制





- maxclients：设置redis同时可以与多少个客户端进行连接。默认情况下为10000个客户端。如果达到了此限制，redis则会拒绝新的连接请求，并且向这些连接请求方发出“max number of clients reached”以作回应。
- maxmemory：设置redis可以使用的内存量。一旦到达内存使用上限，redis将会试图移除内部数据，移除规则可以通过maxmemory-policy来指定。
  - 建议**必须设置**，否则，将内存占满，造成服务器宕机
  - 如果redis无法根据移除规则来移除内存中的数据，或者设置了“不允许移除”，那么redis则会针对那些需要申请内存的指令返回错误信息，比如SET、LPUSH等。
  - 但是对于无内存申请的指令，仍然会正常响应，比如GET等。如果你的redis是主redis（说明你的redis有从redis），那么在设置内存使用上限时，需要在系统中留出一些内存空间给同步队列缓存，只有在你设置的是“不移除”的情况下，才不用考虑这个因素。
- maxmemory-policy：移除规则
  - volatile-lru：使用LRU算法移除key，只对设置了过期时间的键；（最近最少使用）
  - allkeys-lru：在所有集合key中，使用LRU算法移除key
  - volatile-random：在过期集合中移除随机的key，只对设置了过期时间的键
  - allkeys-random：在所有集合key中，移除随机的key
  - volatile-ttl：移除那些TTL值最小的key，即那些最近要过期的key
  - noeviction：不进行移除。针对写操作，只是返回错误信息
- maxmemory-samples：设置样本数量，LRU算法和最小TTL算法都并非是精确的算法，而是估算值，所以你可以设置样本的大小，redis默认会检查这么多个key并选择其中LRU的那个。一般设置3到7的数字，数值越小样本越不准确，但性能消耗越小。













# 五、Redis的发布和订阅



## 1、Redis的发布和订阅



> Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。
>
> Redis 客户端可以订阅任意数量的频道。





**订阅及发送消息如下图：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@38327d24a15ac2806dc0770dd3886b22625bb687/2021/09/04/59b6a13874f9cb7622e697c95b59c521.png)





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e61fe4b20a5fe3bab8096c58809a87d1241f6f4d/2021/09/04/b4e991cdffd74af01442ff964987ad5e.png)







## 2、命令行实现



> **发布的消息没有持久化**，如果在订阅的客户端收不到hello，只能收到订阅后发布的消息。



```bash
# 打开一个客户端订阅channel1频道，返回值为动态监控频道的消息
127.0.0.1:6666> SUBSCRIBE channel1
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "channel1"
3) (integer) 1


# 打开另一个客户端，给channel1发布消息hello（返回值为订阅者数量）
127.0.0.1:6666> publish channel1 hello

# 此时该客户端将收到消息
127.0.0.1:6666> SUBSCRIBE channel1
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "channel1"
3) (integer) 1
1) "subscribe"
2) "channel1"
3) "hello"
```







# 六、Redis6新增数据类型





## 1、Bitmaps



Redis提供了Bitmaps这个“数据类型”可以实现对位的操作：

- Bitmaps本身不是一种数据类型， 实际上它就是字符串（key-value）， 但是它可以对字符串的位进行操作。
- Bitmaps单独提供了一套命令， 所以在Redis中使用Bitmaps和使用字符串的方法不太相同。 可以把Bitmaps想象成一个以位为单位的数组， 数组的每个单元只能存储0和1， 数组的下标在Bitmaps中叫做偏移量。







## 2、HyperLogLog









## 3、Geospatial













# 七、Jedis操作Redis





# 八、Redis的事务操作



# 九、Redis持久化之RDB





# 十、Redis持久化之AOF



# 十一、Redis的主从复制





# 十二、Redis的集群管理



# 十三、Redis的四大应用问题及解决



