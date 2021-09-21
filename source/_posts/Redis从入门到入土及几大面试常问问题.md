---
title: Redis从入门到入土及几大面试常问问题
author: ITNXD
toc: true
abbrlink: 64689
date: 2021-08-30 15:12:17
updated:
top_img: https://cdn.jsdelivr.net/gh/niuxvdong/pic@20dfc0d63f6ce6e25647fc6c181f020104d1caea/2021/09/04/0dd8f091bf8546346d08f2c63706c75c.png
cover: https://cdn.jsdelivr.net/gh/niuxvdong/pic@20dfc0d63f6ce6e25647fc6c181f020104d1caea/2021/09/04/0dd8f091bf8546346d08f2c63706c75c.png
categories: 
- 数据库
- 非关系型数据库
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



```shell
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



```shell
redis-server
```





### 4.2、后台启动（推荐）



```shell
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





### 1.1、概述



Redis提供了Bitmaps这个“数据类型”可以实现对位的操作：

- Bitmaps本身不是一种数据类型， 实际上它就是字符串（key-value）， 但是它可以对字符串的位进行操作。
- Bitmaps单独提供了一套命令， 所以在Redis中使用Bitmaps和使用字符串的方法不太相同。 可以把Bitmaps想象成一个以位为单位的数组， 数组的每个单元只能存储0和1， 数组的下标在Bitmaps中叫做偏移量。





### 1.2、常用命令



- `setbit<key><offset><value>`：设置Bitmaps中某个偏移量的值（0或1），offset偏移量从0开始
  - 例子：很多应用的用户id以一个指定数字（例如10000） 开头， 直接将用户id和Bitmaps的偏移量对应势必会造成一定的浪费， 通常的做法是每次做setbit操作时将用户id减去这个指定数字。
  - 独立用户是否访问过网站可以使用Bitmaps统计。在第一次初始化Bitmaps时， 假如偏移量非常大， 那么整个初始化过程执行会比较慢， 可能会造成Redis的阻塞。
- `getbit<key><offset>`：获取Bitmaps中某个偏移量的值
- `bitcount<key>[start end]`：统计字符串从start字节到end字节比特值为1的数量。 **注意：redis的setbit设置或清除的是bit位置，而bitcount计算的是byte位置。**
- `bitop and(or/not/xor) <destkey> [key…]`：复合操作， 它可以做多个Bitmaps的and（交集）、or（并集）、not（非）、xor（异或）操作并将结果保存在destkey中。



### 1.3、Bitmaps与set对比



- Bitmaps适合大量数据且活跃占比大的情况，可以节省空间（会将每个数据都进行位存储）
- Set适合大量数据且活跃占比较低的情况，可以节省空间（只存储活跃数据）





## 2、HyperLogLog







### 2.1、概述



我们经常会遇到与统计相关的功能需求，比如统计网站PV（PageView页面访问量）,可以使用Redis的incr、incrby轻松实现。

但像UV（UniqueVisitor，独立访客）、独立IP数、搜索记录数等需要去重和计数的问题如何解决？这种求集合中不重复元素个数的问题称为**基数问题。**



**解决基数问题有很多种方案：**

（1）数据存储在MySQL表中，使用distinct count计算不重复个数

（2）使用Redis提供的hash、set、bitmaps等数据结构来处理

以上的方案结果精确，但随着数据不断增加，导致占用空间越来越大，对于非常大的数据集是不切实际的。

- **Redis HyperLogLog 是用来做基数统计的算法**，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是**固定的**、并且是很小的。
- 在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。
- 但是，因为 HyperLogLog 只会根据输入元素来计算基数，而**不会储存输入元素本身**，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。





### 2.2、常用命令

- `pfadd <key>< element> [element ...]`：添加指定元素到 HyperLogLog 中，将所有元素添加到指定HyperLogLog数据结构中。如果执行命令后HLL估计的近似基数（**即不同元素个数**）发生变化，则返回1，否则返回0。
- `pfcount<key> [key ...]`：计算HLL的近似基数（不同元素个数，**交集**）
- `pfmerge<destkey><sourcekey> [sourcekey ...]`：将一个或多个HLL合并后的结果存储在另一个HLL中，**并集**









## 3、Geospatial



### 3.1、概述



Redis 3.2 中增加了对GEO类型的支持。GEO，Geographic，地理信息的缩写。该类型，就是元素的2维坐标，在地图上就是经纬度。redis基于该类型，提供了经纬度设置，查询，范围查询，距离查询，经纬度Hash等常见操作。



### 3.2、常用命令



- `geoadd<key>< longitude><latitude><member> [longitude latitude member...]`：添加地理位置（经度，纬度，名称）
  - 两极无法直接添加，一般会下载城市数据，直接通过 Java 程序一次性导入。
  - 有效的经度从 -180 度到 180 度。有效的纬度从 -85.05112878 度到 85.05112878 度。
  - 当坐标位置超出指定范围时，该命令将会返回一个错误。已经添加的数据，是无法再次往里面添加的。
- `geopos <key><member> [member...]`：获得指定地区的坐标值
- `geodist<key><member1><member2> [m|km|ft|mi ]`：获取两个位置之间的直线距离
  - m 表示单位为米，（**默认值**）。
  - km 表示单位为千米。
  - mi 表示单位为英里。
  - ft 表示单位为英尺。
- `georadius<key>< longitude><latitude>radius m|km|ft|mi`：以给定的经纬度为中心，找出某一半径内的元素









# 七、Jedis操作Redis





## 1、导包





```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version>
</dependency>
```





## 2、Redis配置





1. 云服务器厂商防火墙放行端口
2. Linux服务器内防火墙放行端口
3. redis.conf中注释掉 bind 127.0.0.1，然后关闭保护模式 protected-mode no





## 3、Jedis连接测试







```java
public static void main(String[] args) {
    Jedis jedis = new Jedis("82.156.11.189", 6379);
    // 测试，返回pong
    System.out.println(jedis.ping());
    jedis.close();
}
```





## 4、测试相关数据类型



```java
/**
 * String测试！
 */
@Test
public void testString() {
    Jedis jedis = new Jedis("82.156.11.189", 6379);

    // 添加单个key
    jedis.set("name", "lucy");
    // 获取单个value
    String name = jedis.get("name");
    System.out.println(name);
    System.out.println(jedis.ttl("name"));
    System.out.println(jedis.exists("name"));

    // 添加多个key
    jedis.mset("k1", "v1", "k2", "v2", "k3", "v3");
    // 获取多个value
    List<String> values = jedis.mget("k1", "k2", "k3");
    System.out.println(values);

    Set<String> keys = jedis.keys("*");
    for (String key : keys) {
        System.out.println(key);
    }
    jedis.close();
}

/**
 * List测试！
 */
@Test
public void testList(){
    Jedis jedis = new Jedis("82.156.11.189", 6379);

    jedis.lpush("k1", "a", "b", "c");
    List<String> k1 = jedis.lrange("k1", 0, -1);
    System.out.println(k1);
    jedis.close();
}

/**
 * 测试Set!
 */
@Test
public void testSet(){
    Jedis jedis = new Jedis("82.156.11.189", 6379);

    jedis.sadd("k2", "a", "b", "c", "a");
    Set<String> k2 = jedis.smembers("k2");
    System.out.println(k2);
    jedis.close();
}

/**
 * 测试Hash！
 */
@Test
public void testHash(){
    Jedis jedis = new Jedis("82.156.11.189", 6379);

    jedis.hset("users", "age", "20");
    String age = jedis.hget("users", "age");
    System.out.println(age);
    jedis.close();
}

/**
 * 测试Zset！
 */
@Test
public void testZset(){
    Jedis jedis = new Jedis("82.156.11.189", 6379);

    jedis.zadd("china", 100d, "shanghai");
    jedis.zadd("china", 200d, "beijing");
    jedis.zadd("china", 300d, "taiyuan");

    Set<String> china = jedis.zrange("china", 0, -1);
    System.out.println(china);
    jedis.close();
}
```





## 5、手机验证码实例





**功能要求：**

1、输入手机号，点击发送后随机生成6位数字码，2分钟有效

2、输入验证码，点击验证，返回成功或失败

3、每个手机号每天只能输入3次



**代码实现：**

```java
package com.itnxd.jedis;

import redis.clients.jedis.Jedis;

import java.util.Random;

/**
 * @author ITNXD
 * @create 2021-09-01 15:53
 */
public class PhoneCode {

    /**
     * 模拟验证码发送！
     * @param args
     */
    public static void main(String[] args) {
        // 发送验证码
        verifyCode("18888888888");
        // 校验验证码
        getRedisCode("18888888888", "425741");
    }

    /**
     * 1. 生成六位数字验证码
     */
    public static String getCode(){
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    /**
     * 2. 处理每个手机号每天只能发送三次验证码，验证码过期时间120s
     */
    public static void verifyCode(String phone){
        Jedis jedis = new Jedis("82.156.11.189", 6379);

        // 手机发送次数key规则
        String countKey = "verifyCode" + phone + ":count";
        // 验证码key规则
        String codeKey = "verifyCode" + phone + ":code";

        // 每个手机号每天只能发送三次
        String count = jedis.get(countKey);
        if(count == null) {
            // 表示第一次发送，redis中添加过期时间为24小时的key
            jedis.setex(countKey, 24 * 60 * 60, "1");
        }else if(Integer.parseInt(count) <= 2){
            // 发送次数加一
            jedis.incr(countKey);
        }else if(Integer.parseInt(count) > 2){
            // 三次机会已用完
            System.out.println("今天发送次数已经超过三次了！");
            jedis.close();
            return;
        }

        // 发送的验证码放到redis中！
        String vcode = getCode();
        jedis.setex(codeKey, 120, vcode);
        jedis.close();
    }

    /**
     * 3. 验证码校验
     */
    public static void getRedisCode(String phone, String code){
        Jedis jedis = new Jedis("82.156.11.189", 6379);

        // 从redis中获取随机生成的验证码
        String codeKey = "verifyCode" + phone + ":code";
        String redisCode = jedis.get(codeKey);

        // 校验
        if(code.equals(redisCode)){
            System.out.println("成功");
        }else{
            System.out.println("失败");
        }

        jedis.close();
    }
}
```







# 八、Redis的事务操作





## 1、Redis中的事务



Redis事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。

Redis事务的主要作用就是**串联多个命令防止别的命令插队**。





## 2、五大关键字



1. Multi命令：输入的命令都会依次进入命令队列中，但不会执行。

2. Exec命令：Redis会将之前的命令队列中的命令依次执行。

3. Discard命令：组队的过程中可以通过该命令来放弃组队。
4. `watch key1 [key2]`：在执行multi之前，先执行该命令，可以监视一个(或多个) key ，如果在**事务执行之前**这些key被其他命令所**改动**，那么**事务将被打断**。
5. `unwhatch key1 [key2]`：取消 WATCH 命令对所有 key 的监视。如果在执行 WATCH 命令之后，EXEC 命令或DISCARD 命令先被执行了的话，那么就不需要再执行UNWATCH 了。







## 3、事务的错误处理





1. 组队中某个命令出现了报告错误，执行时整个的所有队列都会被取消。
2. 如果执行阶段某个命令报出了错误，则只有报错的命令不会被执行，而其他的命令都会执行，**不会回滚**。





## 4、Redis事务的三大特性



1. 单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。 
2. 没有隔离级别的概念：队列中的命令没有提交之前都不会实际被执行，因为事务提交前任何指令都不会被实际执行
3. 不保证原子性：事务中如果有一条命令执行失败，其后的命令仍然会被执行，没有回滚 







## 5、Redis中的悲观锁和乐观锁





**悲观锁(Pessimistic Lock)**：（Redis不可直接用）顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会**上锁**，这样别人想拿这个数据就会block直到它拿到锁。**传统的关系型数据库里边就用到了很多这种锁机制**，比如**行锁**，**表锁**等，**读锁**，**写锁**等，都是在做操作之前先上锁。



**乐观锁(Optimistic Lock)**：（Redis可以直接用）顾名思义，就是很乐观，每次去拿数据的时候都**认为别人不会修改，所以不会上锁**，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用**版本号等机制**。**乐观锁适用于多读的应用类型，这样可以提高吞吐量**。Redis就是利用这种check-and-set机制实现事务的。





**乐观锁简单图示：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@512e9e0501d1e21aea8e33fb24ad7efd470d9188/2021/09/05/e1fb245177d1148ce397c945124ab97c.png)



## 6、事务-秒杀案例





> 库存减1，秒杀成功者加1！

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@37e2c357df2d4891a47ff1367c63068bd2abd39d/2021/09/05/ca82cc9223b090258d1bef9c846d99b3.png)





### 6.1、并发模拟



> 在Linux中安装httpd-tools来模拟大量请求和并发操作！



```shell
yum install httpd-tools

# 报错的话使用：
yum --disableexcludes=all install httpd
```





**测试：**

- vim postfile 模拟表单提交参数，以&符号结尾，存放当前目录。内容：`prodid=0101&`
- 使用ab命令模拟测试：
  - -n：总请求数
  - -c：并发请求数
  - -k：使用 HTTP KeepAlive 功能，可不加
  - -p：指定请求文件postfile位置
  - -T：如果为POST/PUT请求需要指定提交的数据类型为`application/x-www-form-urlencoded`
  - 最后为请求地址

```shell
ab -n 2000 -c 200 -k -p ~/postfile -T application/x-www-form-urlencoded http://192.168.2.115:8081/Seckill/doseckill
```





### 6.2、事务问题解决



- **第一版：简单版**



**Servlet程序：**

```java
public class SecKillServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public SecKillServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String userid = new Random().nextInt(50000) +"" ;
		String prodid =request.getParameter("prodid");
		
		boolean isSuccess=SecKill_redis.doSecKill(userid,prodid);
		response.getWriter().print(isSuccess);
	}
}
```



**核心秒杀函数：**

```java
//秒杀过程
public static boolean doSecKill(String uid,String prodid) throws IOException {
    //1 uid和prodid非空判断
    if(uid == null || prodid == null) {
        return false;
    }

    //2 连接redis
    Jedis jedis = new Jedis("82.156.11.189",6379);

    //3 拼接key
    // 3.1 库存key(string)
    String kcKey = "sk:"+prodid+":qt";
    // 3.2 秒杀成功用户key(set)
    String userKey = "sk:"+prodid+":user";
    
    //4 获取库存，如果库存null，秒杀还没有开始
    String kc = jedis.get(kcKey);
    if(kc == null) {
        System.out.println("秒杀还没有开始，请等待");
        jedis.close();
        return false;
    }

    // 5 判断用户是否重复秒杀操作
    if(jedis.sismember(userKey, uid)) {
        System.out.println("已经秒杀成功了，不能重复秒杀");
        jedis.close();
        return false;
    }

    //6 判断如果商品数量，库存数量小于1，秒杀结束
    if(Integer.parseInt(kc)<=0) {
        System.out.println("秒杀已经结束了");
        jedis.close();
        return false;
    }

    //7 秒杀过程

    //7.1 库存-1
    jedis.decr(kcKey);
    //7.2 把秒杀成功用户添加清单里面
    jedis.sadd(userKey,uid);

    System.out.println("秒杀成功了..");
    jedis.close();
    return true;
}
```





- **第二版：加事务-乐观锁(解决超卖)，但出现遗留库存和连接超时**



**添加乐观锁解决超卖问题：**



```java
//秒杀过程
public static boolean doSecKill(String uid,String prodid) throws IOException {
    //1 uid和prodid非空判断
    if(uid == null || prodid == null) {
        return false;
    }

    //2 连接redis
    Jedis jedis = new Jedis("82.156.11.189",6666);

    //3 拼接key
    // 3.1 库存key(string)
    String kcKey = "sk:"+prodid+":qt";
    // 3.2 秒杀成功用户key(set)
    String userKey = "sk:"+prodid+":user";

    //监视库存
    jedis.watch(kcKey);

    //4 获取库存，如果库存null，秒杀还没有开始
    String kc = jedis.get(kcKey);
    if(kc == null) {
        System.out.println("秒杀还没有开始，请等待");
        jedis.close();
        return false;
    }

    // 5 判断用户是否重复秒杀操作
    if(jedis.sismember(userKey, uid)) {
        System.out.println("已经秒杀成功了，不能重复秒杀");
        jedis.close();
        return false;
    }

    //6 判断如果商品数量，库存数量小于1，秒杀结束
    if(Integer.parseInt(kc)<=0) {
        System.out.println("秒杀已经结束了");
        jedis.close();
        return false;
    }

    //7 秒杀过程
    //使用事务
    Transaction multi = jedis.multi();

    //组队操作
    multi.decr(kcKey);
    multi.sadd(userKey,uid);

    //执行
    List<Object> results = multi.exec();

    if(results == null || results.size()==0) {
        System.out.println("秒杀失败了....");
        jedis.close();
        return false;
    }

    System.out.println("秒杀成功了..");
    jedis.close();
    return true;
}
```







- **第三版：连接池解决超时问题** 



> 节省每次连接redis服务带来的消耗，把连接好的实例反复利用。通过参数管理连接的行为。



**链接池参数：**

1. MaxTotal：控制一个pool可分配多少个jedis实例，通过pool.getResource()来获取；如果赋值为-1，则表示不限制；如果pool已经分配了MaxTotal个jedis实例，则此时pool的状态为exhausted。
2. maxIdle：控制一个pool最多有多少个状态为idle(空闲)的jedis实例；
3. MaxWaitMillis：表示当borrow一个jedis实例时，最大的等待毫秒数，如果超过等待时间，则直接抛JedisConnectionException；
4. testOnBorrow：获得一个jedis实例的时候是否检查连接可用性（ping()）；如果为true，则得到的jedis实例均是可用的；



**JedisPoolUtil.java：**



```java
package com.itnxd.redis_seckill_demo;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisPoolUtil {
   private static volatile JedisPool jedisPool = null;

   private JedisPoolUtil() {
   }

   public static JedisPool getJedisPoolInstance() {
      if (null == jedisPool) {
         synchronized (JedisPoolUtil.class) {
            if (null == jedisPool) {
               JedisPoolConfig poolConfig = new JedisPoolConfig();
               poolConfig.setMaxTotal(200);
               poolConfig.setMaxIdle(32);
               poolConfig.setMaxWaitMillis(100*1000);
               poolConfig.setBlockWhenExhausted(true);
               poolConfig.setTestOnBorrow(true);  // ping  PONG
             
               jedisPool = new JedisPool(poolConfig, "192.168.44.168", 6379, 60000 );
            }
         }
      }
      return jedisPool;
   }

   public static void release(JedisPool jedisPool, Jedis jedis) {
      if (null != jedis) {
         jedisPool.returnResource(jedis);
      }
   }

}
```





**Servlet程序修改：**



```java
public class SecKillServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public SecKillServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String userid = new Random().nextInt(50000) +"" ;
		String prodid =request.getParameter("prodid");
		
		boolean isSuccess=SecKill_redis.doSecKill(userid,prodid);
//		boolean isSuccess= SecKill_redisByScript.doSecKill(userid,prodid);
		response.getWriter().print(isSuccess);
	}

}
```



**使用连接池的核心函数：**



```java
public static void main(String[] args) {
    Jedis jedis =new Jedis("82.156.11.189",6666);
    System.out.println(jedis.ping());
    jedis.close();
}

//秒杀过程
public static boolean doSecKill(String uid,String prodid) throws IOException {
    //1 uid和prodid非空判断
    if(uid == null || prodid == null) {
        return false;
    }

    //2 连接redis
    //通过连接池得到jedis对象
    JedisPool jedisPoolInstance = JedisPoolUtil.getJedisPoolInstance();
    Jedis jedis = jedisPoolInstance.getResource();

    //3 拼接key
    // 3.1 库存key(string)
    String kcKey = "sk:"+prodid+":qt";
    // 3.2 秒杀成功用户key(set)
    String userKey = "sk:"+prodid+":user";

    //监视库存
    jedis.watch(kcKey);

    //4 获取库存，如果库存null，秒杀还没有开始
    String kc = jedis.get(kcKey);
    if(kc == null) {
        System.out.println("秒杀还没有开始，请等待");
        jedis.close();
        return false;
    }

    // 5 判断用户是否重复秒杀操作
    if(jedis.sismember(userKey, uid)) {
        System.out.println("已经秒杀成功了，不能重复秒杀");
        jedis.close();
        return false;
    }

    //6 判断如果商品数量，库存数量小于1，秒杀结束
    if(Integer.parseInt(kc)<=0) {
        System.out.println("秒杀已经结束了");
        jedis.close();
        return false;
    }

    //7 秒杀过程
    //使用事务
    Transaction multi = jedis.multi();

    //组队操作
    multi.decr(kcKey);
    multi.sadd(userKey,uid);

    //执行
    List<Object> results = multi.exec();

    if(results == null || results.size()==0) {
        System.out.println("秒杀失败了....");
        jedis.close();
        return false;
    }

    System.out.println("秒杀成功了..");
    jedis.close();
    return true;
}
```





- **第四版：解决库存遗留问题，LUA脚本**



> 解决库存遗留问题(乐观锁有一个购买成功版本号发生改变，则后续比较版本号不一致将会导致库存有剩余却不能继续进行下去)。
>
> Lua 是一个小巧的[脚本语言](http://baike.baidu.com/item/脚本语言)，Lua脚本可以很容易的被C/C++ 代码调用，也可以反过来调用C/C++的函数，Lua并没有提供强大的库，一个完整的Lua解释器不过200k，所以Lua不适合作为开发独立应用程序的语言，而是作为**嵌入式脚本语言**。
>
> 很多应用程序、游戏使用LUA作为自己的嵌入式脚本语言，以此来实现可配置性、可扩展性。





1. 将复杂的或者多步的redis操作，写为一个脚本，一次提交给redis执行，减少反复连接redis的次数。提升性能。
2. LUA脚本是类似redis事务，有一定的原子性，不会被其他命令插队，**可以完成一些redis事务性的操作**。
3. 但是注意redis的lua脚本功能，只有在Redis 2.6以上的版本才可以使用。
4. 利用lua脚本淘汰用户，解决超卖问题。
5. redis 2.6版本以后，通过lua脚本解决**争抢问题**，实际上是**redis** **利用其单线程的特性，用任务队列的方式解决多任务并发问题**。





**lua脚本：**

```lua
local userid=KEYS[1]; 
local prodid=KEYS[2];
local qtkey="sk:"..prodid..":qt";
local usersKey="sk:"..prodid.":usr'; 
local userExists=redis.call("sismember",usersKey,userid);
if tonumber(userExists)==1 then 
  return 2;
end
local num= redis.call("get" ,qtkey);
if tonumber(num)<=0 then 
  return 0; 
else 
  redis.call("decr",qtkey);
  redis.call("sadd",usersKey,userid);
end
return 1;
```







**将普通核心函数Seckill_redis类改为带有lua脚本的SecKill_redisByScript类：**

```java
package com.itnxd.redis_seckill_demo;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.LoggerFactory;
import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class SecKill_redisByScript {
	
	private static final  org.slf4j.Logger logger = LoggerFactory.getLogger(SecKill_redisByScript.class) ;

	public static void main(String[] args) {
		JedisPool jedispool =  JedisPoolUtil.getJedisPoolInstance();
 
		Jedis jedis=jedispool.getResource();
		System.out.println(jedis.ping());
		
		Set<HostAndPort> set=new HashSet<HostAndPort>();

		doSecKill("201","sk:0101");
	}
	
	static String secKillScript ="local userid=KEYS[1];\r\n" + 
			"local prodid=KEYS[2];\r\n" + 
			"local qtkey='sk:'..prodid..\":qt\";\r\n" + 
			"local usersKey='sk:'..prodid..\":usr\";\r\n" + 
			"local userExists=redis.call(\"sismember\",usersKey,userid);\r\n" + 
			"if tonumber(userExists)==1 then \r\n" + 
			"   return 2;\r\n" + 
			"end\r\n" + 
			"local num= redis.call(\"get\" ,qtkey);\r\n" + 
			"if tonumber(num)<=0 then \r\n" + 
			"   return 0;\r\n" + 
			"else \r\n" + 
			"   redis.call(\"decr\",qtkey);\r\n" + 
			"   redis.call(\"sadd\",usersKey,userid);\r\n" + 
			"end\r\n" + 
			"return 1" ;
			 
	static String secKillScript2 = 
			"local userExists=redis.call(\"sismember\",\"{sk}:0101:usr\",userid);\r\n" +
			" return 1";

	public static boolean doSecKill(String uid,String prodid) throws IOException {

		JedisPool jedispool =  JedisPoolUtil.getJedisPoolInstance();
		Jedis jedis=jedispool.getResource();

		 //String sha1=  .secKillScript;
		String sha1=  jedis.scriptLoad(secKillScript);
		Object result= jedis.evalsha(sha1, 2, uid,prodid);

		  String reString=String.valueOf(result);
		if ("0".equals( reString )  ) {
			System.err.println("已抢空！！");
		}else if("1".equals( reString )  )  {
			System.out.println("抢购成功！！！！");
		}else if("2".equals( reString )  )  {
			System.err.println("该用户已抢过！！");
		}else{
			System.err.println("抢购异常！！");
		}
		jedis.close();
		return true;
	}
}
```







# 九、Redis持久化之RDB







> 所谓持久化：是指在指定的**时间间隔**内将内存中的数据集快照**写入磁盘**， 也就是行话讲的Snapshot快照，它恢复时是将快照文件直接读到内存里。







## 1、RDB持久化流程



Redis会单独创建（fork）一个**子进程来进行持久化**，会先将数据写入到 一个临时文件中，待持久化过程都结束了，再用这个临时文件替换上次持久化好的文件。 整个过程中，主进程是不进行任何IO操作的，这就确保了**极高的性能** 如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那RDB方式要比AOF方式更加的**高效**。**RDB的缺点是最后一次持久化后的数据可能丢失**。



- Fork的作用是复制一个与当前进程一样的进程。新进程的所有数据（变量、环境变量、程序计数器等） 数值都和原进程一致，但是是一个全新的进程，并作为原进程的子进程
- 在Linux程序中，fork()会产生一个和父进程完全相同的子进程，但子进程在此后多会exec系统调用，出于效率考虑，Linux中引入了“**写时复制技术**”
- **一般情况父进程和子进程会共用同一段物理内存**，只有进程空间的各段的内容要发生变化时，才会将父进程的内容复制一份给子进程。





## 2、RDB配置



> 在redis.conf中进行一些配置！
>
> 修改后需要重启Redis！
>
> 直接kill redis进程不会进行持久化操作，建议redis-cli中进行shutdown操作！



- dbfilename：默认为dump.rdb
- dir：rdb文件保存位置，默认为`./`当前目录（启动redis-cli的目录）
- `save [seconds] [changes]`：表示在多少秒内至少有多少个数据发生改变时进行持久化操作，save时只管保存，其它不管，全部阻塞。手动保存。不建议。也可以直接在redis-cli中直接运行！
  - RDB是整个内存的压缩过的Snapshot，RDB的数据结构，可以配置复合的快照触发条件，
  - 默认是1分钟内改了1万次，或5分钟内改了10次，或15分钟内改了1次。
  - 禁用，不设置save指令，或者给save传入空字符串
- **动态停止RDB：`redis-cli config set save ""` save后给空值，表示禁用保存策略**

- bgsave：Redis会在后台异步进行快照操作， 快照同时还可以响应客户端请求。直接在redis-cli中直接运行。
- lastsave：获取最后一次成功执行快照的时间。
- flushall命令：也会产生dump.rdb文件，但里面是空的，无意义
- stop-writes-on-bgsave-erro：当Redis无法写入磁盘的话，直接关掉Redis的写操作。推荐yes.
- rdbcompression：压缩文件，对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，redis会采用LZF算法进行压缩。如果你不想消耗CPU来进行压缩的话，可以设置为关闭此功能。推荐yes.
- rdbchecksum：检查完整性，在存储快照后，还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。推荐yes.



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@431961407297a06fcb797ed087375932b7d58e0d/2021/09/05/9c61f3f57d7fc5a2078757f7a513880b.png)





## 3、RDB备份与恢复





1. 先通过`config get dir`查询rdb文件的目录 
2. 将`*.rdb`的文件拷贝到别的地方 `cp dump.rdb dump.rdb.bak`
3. rdb的恢复
   1. 关闭Redis，`redis-cli->shutdown`
   2. 先把备份的文件拷贝到工作目录下 `cp dump.rdb.bak dump.rdb`
   3. 启动Redis, 备份数据会直接加载





## 4、优缺点



- **优点：**
  - 适合大规模的数据恢复
  - 对数据完整性和一致性要求不高更适合使用
  - 节省磁盘空间
  - 恢复速度快

- **缺点：**
  - Fork的时候，内存中的数据被克隆了一份，大致2倍的膨胀性需要考虑
  - 虽然Redis在fork时使用了**写时拷贝技术**,但是如果数据庞大时还是比较消耗性能。
  - 在备份周期在一定间隔时间做一次备份，所以如果Redis意外down掉的话，就会丢失最后一次快照后的所有修改。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a0bc6d49f0e3725dcaadeff6664c0b4f56c6dd50/2021/09/05/b7bea5a29f14643f03444c5508d4f86e.png)









# 十、Redis持久化之AOF



> 以**日志**的形式来记录每个写操作（增量保存），将Redis执行过的所有写指令记录下来(**读操作不记录**)， **只许追加文件但不可以改写文件**，redis启动之初会读取该文件重新构建数据，换言之，redis 重启的话就根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作。





## 1、AOF持久化流程



1. 客户端的请求写命令会被append追加到AOF缓冲区内；
2. AOF缓冲区根据AOF持久化策略[always,everysec,no]将操作sync同步到磁盘的AOF文件中；
3. AOF文件大小超过重写策略或手动重写时，会对AOF文件**rewrite重写**，压缩AOF文件容量；
4. Redis服务重启时，会重新load加载AOF文件中的写操作达到数据恢复的目的；





**Rewrite重写：**

当AOF文件的大小超过所设定的阈值时，Redis就会启动AOF文件的内容压缩， 只保留可以恢复数据的最小指令集.可以使用命令bgrewriteaof。

**重写原理：**

AOF文件持续增长而过大时，会fork出一条新进程来将文件重写(也是先写临时文件最后再rename)，redis4.0版本后的重写，是指把rdb 的快照，以二级制的形式附在新的aof头部，作为已有的历史数据，替换掉原来的流水账操作。

no-appendfsync-on-rewrite：

- yes ,不写入aof文件只写入缓存，用户请求不会阻塞，但是在这段时间如果宕机会丢失这段时间的缓存数据。（**降低数据安全性，提高性能**）
- no, 还是会把数据往磁盘里刷，但是遇到重写操作，可能会发生阻塞。（**数据安全，但是性能降低**）

**触发机制：**

Redis会记录上次重写时的AOF大小，默认配置是当AOF文件大小是上次rewrite后大小的一倍且文件大于64M时触发。

重写虽然可以节约大量磁盘空间，减少恢复时间。但是每次重写还是有一定的负担的，因此设定Redis要满足一定条件才会进行重写。 

- auto-aof-rewrite-percentage：设置重写的基准值，文件达到100%时开始重写（文件是原来重写后文件的2倍时触发）
- auto-aof-rewrite-min-size：设置重写的基准值，最小文件64MB。达到这个值开始重写。

**重写流程：**

1. **bgrewriteaof触发重写**，判断是否当前有bgsave或bgrewriteaof在运行，如果有，则等待该命令结束后再继续执行。
2. 主进程fork出子进程执行重写操作，保证主进程不会阻塞。
3. 子进程遍历redis内存中数据到临时文件，客户端的写请求同时写入aof_buf缓冲区和aof_rewrite_buf重写缓冲区保证原AOF文件完整以及新AOF文件生成期间的新的数据修改动作不会丢失。
4. 子进程写完新的AOF文件后，向主进程发信号，父进程更新统计信息。主进程把aof_rewrite_buf中的数据写入到新的AOF文件。
5. 使用新的AOF文件覆盖旧的AOF文件，完成AOF重写。





## 2、AOF配置



> 在redis.conf配置AOF开启！



- appendonly：默认没有开启，改为yes开启
- appendfilename：AOF文件名，默认为 appendonly.aof
- AOF文件的保存路径，同RDB的路径一致。
- appendfsync：同步频率
  -  always：始终同步，每次Redis的写入都会立刻记入日志；性能较差但数据完整性比较好
  - everysec：每秒同步，每秒记入日志一次，如果宕机，本秒的数据可能丢失。
  - no：redis不主动进行同步，把同步时机交给操作系统。



**注意：AOF和RDB同时开启，系统默认取AOF的数据（数据不会存在丢失）**



## 3、AOF备份与恢复





> AOF的备份机制和性能虽然和RDB不同, 但是备份和恢复的操作同RDB一样，都是拷贝备份文件，需要恢复时再拷贝到Redis工作目录下，启动系统即加载。



**正常恢复：**

- 修改默认的appendonly no，改为yes （重启redis生效）
- 将有数据的aof文件复制一份保存到对应目录(查看目录：config get dir)
- 恢复：重启redis重新加载

**异常恢复：**

- 修改默认的appendonly no，改为yes
- 如遇到AOF文件损坏，通过`/usr/local/bin/redis-check-aof--fix appendonly.aof`进行恢复
- 备份被写坏的AOF文件
- 恢复：重启redis重新加载











## 4、优缺点



- **优点：**
  - 备份机制更稳健，丢失数据概率更低。
  - 可读的日志文本，通过操作AOF稳健，可以处理误操作。
- **缺点：**
  - 比起RDB占用更多的磁盘空间。
  - 恢复备份速度要慢。
  - 每次读写都同步的话，有一定的性能压力。
  - 存在个别Bug，造成恢复不能。







![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f034498f54195666321f1190083bc377c31ebbc4/2021/09/05/68860408cafe97f7874e66d6af85c576.png)





## 5、两种持久化使用建议



1. 官方推荐两个都启用。
2. 如果对数据不敏感，可以选单独用RDB。
3. 不建议单独用 AOF，因为可能会出现Bug。
4. 如果只是做纯内存缓存，可以都不用。



**性能建议：**

1. 因为RDB文件只用作后备用途，建议只在Slave上持久化RDB文件，而且只要**15分钟备份一次**就够了，只保留save 900 1这条规则。
2. 如果使用AOF，好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只load自己的AOF文件就可以了。
3. 代价,一是带来了持续的IO，二是AOF rewrite的最后将rewrite过程中产生的新数据写到新文件造成的**阻塞**几乎是不可避免的。
4. 只要硬盘许可，应该尽量减少AOF rewrite的频率，AOF重写的基础大小默认值64M太小了，可以设到**5G**以上。
5. 默认超过原大小100%大小时重写可以改到适当的数值。







# 十一、Redis的主从复制





> 主机数据更新后根据配置和策略， 自动同步到备机的master/slaver机制，**Master以写为主，Slave以读为主**。
>
> - 读写分离，性能扩展
> - 容灾快速恢复



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4a184575b198a1fdb69281ab34bcc7b51476ca29/2021/09/06/9c74cbbdba763470a40025f116ea5285.png)







## 1、主从复制配置



> 以一主两从为例！



1. 拷贝三份redis.conf文件，分别重命名为`redis+port.conf`
2. 文件内容如下：
   1. 使用include引入公共配置文件
   2. 指定pidfile文件名
   3. 指定端口
   4. 指定rdb文件名
   5. 开启daemonize后台自启
   6. Log文件名字（可选）
   7. 关掉aof，Appendonly1/
   8. slave-priority：设置从机的优先级，值越小，优先级越高，用于选举主机时使用。默认100
3. 启动三台Redis，`redis-server redis6370.conf`，其他两台类似
4. 可使用`ps -ef | grep reids`查看进程
5. 进入cli后执行`info replication`查看主从关系





**三个配置文件内容如下，修改相应的端口即可！**

```shell
include /myredis/redis.conf
pidfile /var/run/redis_6379.pid
port 6379
dbfilename dump6379.rdb
```





**主从配置：**

- 在两台从机上执行`slaveof 127.0.0.1 6379`指定他们的主机为6379端口的Redis.
- 可使用`info replication`查看主从关系
- 主机可以进行写操作，从机不可以，只可以进行读操作



## 2、三种情况





### 2.1、一主二仆





- 主机挂掉重启即可，会恢复正常
- 从机挂掉需要使用命令`slaveof 127.0.0.1 6379`重新建立主从关系，只有从机还是只能读不能写



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8636121d15dbc653dfde534d71e1b02f25fe330a/2021/09/06/cc60c04c716d1894a6dd1f614200fd62.png)

### 2.2、薪火相传



- 上一个Slave可以是下一个slave的Master，Slave同样可以接收其他 slaves的连接和同步请求，那么该slave作为了链条中下一个的master, 可以有效减轻master的写压力,去中心化降低风险。
- 用 `slaveof <ip><port>`中途变更转向，会清除之前的数据，重新建立拷贝最新的
- 风险是一旦某个slave宕机，后面的slave都没法备份，主机挂了，从机还是从机，无法写数据了



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8dd10bd27de6932c8966530af0403329ff5d7a5e/2021/09/06/2c706ccd5ed258a890f1b57e6da2f69c.png)





### 2.3、反客为主





- 当一个master宕机后，后面的slave可以立刻升为master，其后面的slave不用做任何修改。
- 用 `slaveof no one`  将从机变为主机。（**手动模式**）





## 3、哨兵模式



> **反客为主的自动版**，能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a5327fe7dbd3b63c5530405c5f9a26f56c3f4e66/2021/09/06/79c2756da4cc577417728be8fb4aa15e.png)





1. 调整为一主二仆模式，6379带着6380、6381
2. 自定义的/myredis目录下新建sentinel.conf文件，名字绝不能错
3. 配置哨兵配置文件，填写内容`sentinel monitor mymaster 127.0.0.1 6379 1`
   1. 其中mymaster为监控对象起的服务器名称， 1 为至少有多少个哨兵同意迁移的数量。 
   2. 可以以多搞几个哨兵，当哨兵都认为主机死了，再进行主从转换！
4. 启动哨兵：`cd /usr/local/bin`下，执行`redis-sentinel /myredis/sentinel.conf`（哨兵默认端口26379，前台启动）
5. 当主机挂掉，从机会根据优先级slave-priority选择一个从机作为主机（前台大概10秒左右可以看到哨兵窗口日志，切换了新的主机）
6. 原主机重启后会变为从机。











## 4、故障恢复



> 哨兵模式就是用来做故障恢复的！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c3c7eeb652b3dcef43283c4fb2228d6aad84c435/2021/09/06/e915fa2a6596aef487307c5826cf8a40.png)







1. 优先级在redis.conf中默认：slave-priority 100（新版为replica-priority），值越小优先级越高
2. 偏移量是指获得原主机数据最全的
3. 每个redis实例启动后都会随机生成一个40位的runid





## 5、主从复制代码实现





```java
private static JedisSentinelPool jedisSentinelPool=null;

public static  Jedis getJedisFromSentinel(){
    if(jedisSentinelPool==null){
        Set<String> sentinelSet=new HashSet<>();
        sentinelSet.add("192.168.11.103:26379");

        JedisPoolConfig jedisPoolConfig =new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(10); //最大可用连接数
        jedisPoolConfig.setMaxIdle(5); //最大闲置连接数
        jedisPoolConfig.setMinIdle(5); //最小闲置连接数
        jedisPoolConfig.setBlockWhenExhausted(true); //连接耗尽是否等待
        jedisPoolConfig.setMaxWaitMillis(2000); //等待时间
        jedisPoolConfig.setTestOnBorrow(true); //取连接的时候进行一下测试 ping pong

		jedisSentinelPool=new JedisSentinelPool("mymaster",sentinelSet,jedisPoolConfig);
		return jedisSentinelPool.getResource();
    }else{
		return jedisSentinelPool.getResource();
    }
}
```





## 6、复制原理



> 一次完全同步，多次增量同步！



1. Slave启动成功连接到master后会发送一个sync命令
2. Master接到命令启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令， 在后台进程执行完毕之后，master将传送整个数据文件到slave,以完成一次完全同步
3. 全量复制：而slave服务在接收到数据库文件数据后，将其存盘并加载到内存中。
4. 增量复制：Master继续将新的所有收集到的修改命令依次传给slave,完成同步
5. 但是只要是重新连接master,一次完全同步（全量复制)将被自动执行





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@3b15563c457010ee9b2daee131a138c462d60423/2021/09/06/6e2107d1597953eda3fc6228cf452086.png)





**当然，一主多从的复制操作会导致大量的延时：**



由于所有的写操作都是先在Master上操作，然后同步更新到Slave上，所以从Master同步到Slave机器有一定的延迟，当系统很繁忙的时候，延迟问题会更加严重，Slave机器数量的增加也会使这个问题更加严重。





# 十二、Redis的集群管理



## 1、集群的引入



**问题？**

容量不够，redis如何进行扩容？

并发写操作， redis如何分摊？

另外，主从模式，薪火相传模式，主机宕机，导致ip地址发生变化，应用程序中配置需要修改对应的主机地址、端口等信息。

之前通过代理主机来解决，但是redis3.0中提供了解决方案。就是无中心化集群配置。



**代理主机：三组主从，加代理服务器的主从，一共需要八台服务器！**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@95dce45644c93a189b1e80b21b16a3feee7d950c/2021/09/06/86448fe15e052511b99c1133f5bf1d12.png)



**无中心化集群：只需要六台服务器**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8c73c23de9890b91f977f7113a486c00260af3a2/2021/09/06/2757d15550b4abb431ebeb635a35877d.png)





**什么是集群？**



Redis 集群实现了对Redis的水平扩容，即启动N个redis节点，将整个数据库分布存储在这N个节点中，每个节点存储总数据的1/N。

Redis 集群通过分区（partition）来提供一定程度的可用性（availability）： 即使集群中有一部分节点失效或者无法进行通讯， 集群也可以继续处理命令请求。









## 2、集群的配置



> 以三组主从为例！
>
> **一个集群至少要有三个主节点。** 每个主节点至少一台从节点，即集群至少需要六台服务器！
>
> 选项 `--cluster-replicas 1` 表示我们希望为集群中的每个主节点创建一个从节点。
>
> **分配原则**尽量保证每个主数据库运行在不同的IP地址，每个从库和主库不在一个IP地址上。



1. 将持久化文件rdb,aof文件都删除掉。
2. 在主从配置文件里增加如下：
   1. `cluster-enabled yes`：打开集群模式
   2. `cluster-config-file nodes-6379.conf`：设定节点配置文件名
   3. `cluster-node-timeout 15000`：设定节点失联时间，超过该时间（毫秒），集群自动进行主从切换。
3. 再复制五份文件，将带有端口的全部修改，可使用vim全局替换命令`:%s/6379/6380 `
4. 启动六台redis-server
5. 将六个节点合成一个集群，组合之前，请确保所有redis实例启动后，nodes-xxxx.conf文件都生成正常。
6. `cd /opt/redis-6.2.5/src`，执行`redis-cli --cluster create --cluster-replicas 1 192.168.11.101:6379 192.168.11.101:6380 192.168.11.101:6381 192.168.11.101:6389 192.168.11.101:6390 192.168.11.101:6391`
   1. 前三台为主机，后三台为从机
   2. 注意：使用云服务器需要开启各个端口，[https://www.jianshu.com/p/250f5da36b49/](https://www.jianshu.com/p/250f5da36b49/)
   3. 此处不要用127.0.0.1， 请用真实IP地址
   4. `--cluster-replicas 1`， 采用最简单的方式配置集群，一台主机，一台从机，正好三组。(1表示从机数量)







**在主从基础上添加如下配置：**

```shell
include /myredis/redis.conf
pidfile "/var/run/redis6379.pid"
port 6379
dbfilename "dump6379.rdb"

# 增加配置
cluster-enabled yes
cluster-config-file "nodes-6379.conf"
cluster-node-timeout 15000
# Generated by CONFIG REWRITE
daemonize yes
protected-mode no
save 3600 1
save 300 100
save 60 10000
user default on nopass ~* &* +@all
dir "/myredis"
```





**示例图：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@31f098a1664b396ac0b9619098c8037056ab841b/2021/09/06/753ce0af08c1c5f4e8c7f073a3f02152.png)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4ca2ca8c32be663cfec5ba1b0e60c5405bab3952/2021/09/06/cfe4456ed0c83725243c5fee080324ca.png)





## 3、集群操作



**注意：**普通方式登录，可能直接进入读主机，存储数据时，会出现MOVED重定向操作。所以，应该以集群方式登录。

采用集群策略连接，设置数据会自动切换到相应的写主机。

cluster nodes 命令查看集群信息，可看到主从关系！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9e1b1d2a5041727841602a64061fae6e239a0d5e/2021/09/06/bcaf5bbd4c8a314a4f053fd97ba4427f.png)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4426bbe0b3034e9dbae19634324dfdff0ed2c5a8/2021/09/06/9946642104f6ae05fb4c7571536bf9bf.png)











**什么是slots？**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@06db789bd90f4469f01215a7d529b30f14971152/2021/09/06/90108bea4f4dc311f482e1a37726faca.png)



- 一个 Redis 集群包含 16384 个插槽（hash slot）， 数据库中的每个键都属于这 16384 个插槽的其中一个， 
- 集群使用公式 CRC16(key) % 16384 来计算键 key 属于哪个槽， 其中 CRC16(key) 语句用于计算键 key 的 CRC16 校验和 。
- 集群中的每个节点负责处理一部分插槽。 举个例子， 如果一个集群可以有主节点， 其中：
  - 节点 A 负责处理 0 号至 5460 号插槽。
  - 节点 B 负责处理 5461 号至 10922 号插槽。
  - 节点 C 负责处理 10923 号至 16383 号插槽。



**在集群中录入值：**



- 在redis-cli每次录入、查询键值，redis都会计算出该key应该送往的插槽，如果不是该客户端对应服务器的插槽，redis会报错，并告知应前往的redis实例地址和端口。
- redis-cli客户端提供了 –c 参数实现自动重定向。
- 如 redis-cli -c –p 6379 登入后，再录入、查询键值对可以**自动重定向**。
- 不在一个slot下的键值，是不能使用mget,mset等多键操作。
- 可以通过`{}`来定义组的概念（组名作为关键字计算哈希值），从而使key中`{}`内相同内容的键值对放到一个slot中去。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@26f85aa40b3259e6e9d105d43af02df38a037b30/2021/09/06/a5dbd563bcfd48396f512e54466cdb8f.png)





**查询集群中的值：**



- `cluster keysinslot <key>`：计算key对应的插槽值

- `cluster countkeysinslot <slot>`：计算插槽值里有多少个key (只能看到自己主机插槽范围内内的数据)
- `cluster getkeysinslot <slot> <count>`：获取该插槽的n个key







## 4、故障恢复







**主节点下线，附属的从节点变为主节点，当原主节点再次上线，他将作为现在主节点的从节点！（类似哨兵模式）**

 

**如果所有某一段插槽的主从节点都宕掉，redis服务是否还能继续?**

- cluster-require-full-coverage 为yes ，那么 ，整个集群都挂掉
- cluster-require-full-coverage 为no ，那么，该插槽数据全都不能使用，也无法存储。



## 5、集群代码实现



> 即使连接的不是主机，集群会自动切换主机存储。主机写，从机读。
>
> 无中心化主从集群。无论从哪台主机写的数据，其他主机上都能读到数据。



```java
public class JedisClusterTest {
    public static void main(String[] args) { 
        Set<HostAndPort>set =new HashSet<HostAndPort>();
        set.add(new HostAndPort("192.168.31.211",6379));
        JedisCluster jedisCluster=new JedisCluster(set);
    	// 或者
    	HostAndPort  hostAndPort  = new HostAndPort(“ip”, “port”);
    	JedisCluster jedisCluster=new JedisCluster(hostAndPort);
     	jedisCluster.set("k1", "v1");
     	System.out.println(jedisCluster.get("k1"));
		jedisCluster.close();
	}
}
```









## 6、集群优缺点



**优点：**

- 实现扩容
- 分摊压力
- 无中心配置相对简单



**缺点：**

- 多键操作是不被支持的 。
- 多键的Redis事务是不被支持的。lua脚本不被支持。
- 由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至redis cluster，需要整体迁移而不是逐步过渡，复杂度较大。













# 十三、Redis的四大应用问题及解决







## 1、缓存穿透







### 1.1、问题描述



> **key对应的数据在数据源并不存在**，每次针对此key的请求从缓存获取不到，请求都会压到数据库，从而可能压垮数据库。比如用一个不存在的用户id获取用户信息，不论缓存还是数据库都没有，若黑客利用此漏洞进行攻击可能压垮数据库。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9295eb026dc1103cad1b9fb90e31f020c5546d92/2021/09/06/44d51bbbc82039710ed1d5175db07a39.png)









### 1.2、问题解决



> 一个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。







1. **对空值缓存：**如果一个查询返回的数据为空（不管是数据是否不存在），我们仍然把这个空结果（null）进行缓存，设置空结果的过期时间会很短，最长不超过五分钟
2. **设置可访问的名单（白名单）：**使用bitmaps类型定义一个可以访问的名单，名单id作为bitmaps的偏移量，每次访问和bitmap里面的id进行比较，如果访问id不在bitmaps里面，进行拦截，不允许访问。
3. **采用布隆过滤器**：布隆过滤器（Bloom Filter）是1970年由布隆提出的。它实际上是一个很长的二进制向量(位图)和一系列随机映射函数（哈希函数）。布隆过滤器可以用于检索一个元素是否在一个集合中。它的优点是空间效率和查询时间都远远超过一般的算法，缺点是有一定的误识别率和删除困难。将所有可能存在的数据哈希到一个足够大的bitmaps中，一个一定不存在的数据会被 这个bitmaps拦截掉，从而避免了对底层存储系统的查询压力。
4. **进行实时监控：**当发现Redis的命中率开始急速降低，需要排查访问对象和访问的数据，和运维人员配合，可以设置黑名单限制服务







## 2、缓存击穿







### 2.1、问题描述



> **key对应的数据存在，但在redis中过期**，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。**（一个key过期）**





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@57cb00ae4ab0b9d1cf9c38a8ea44d50ebdeb065d/2021/09/06/05e657bee74d4932c365c03f549e9f7f.png)





### 2.2、问题解决





> key可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这个时候，需要考虑一个问题：缓存被“击穿”的问题。



1. **预先设置热门数据：**在redis高峰访问之前，把一些热门数据提前存入到redis里面，加大这些热门数据key的时长
2. **实时调整：**现场监控哪些数据热门，实时调整key的过期时长
3. **使用锁：**
   1. 就是在缓存失效的时候（判断拿出来的值为空），不是立即去load db。
   2. 先使用缓存工具的某些带成功操作返回值的操作（比如Redis的SETNX）去set一个mutex key
   3. 当操作返回成功时，再进行load db的操作，并回设缓存,最后删除mutex key；
   4. 当操作返回失败，证明有线程在load db，当前线程睡眠一段时间再重试整个get缓存的方法。

 





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@65cf059b3f49238ee712b7bb10ada57683ceedaa/2021/09/06/abf22698d8523bea60f0b136cb2c8073.png)













## 3、缓存雪崩





### 3.1、问题描述

**key对应的数据存在，但在redis中过期**，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。（很多key过期）



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c373a5c996fe03ac6ac12bbe2d2999c90a1f8ed7/2021/09/06/41bc90ce43b39d6b12bc99bdde94b5e9.png)







### 3.2、问题解决





> 缓存失效时的雪崩效应对底层系统的冲击非常可怕！





1. **构建多级缓存架构：**nginx缓存 + redis缓存 +其他缓存（ehcache等）
2. **使用锁或队列：**用加锁或者队列的方式保证来保证不会有大量的线程对数据库一次性进行读写，从而避免失效时大量的并发请求落到底层存储系统上。不适用高并发情况
3. **设置过期标志更新缓存：**记录缓存数据是否过期（设置提前量），如果过期会触发通知另外的线程在后台去更新实际key的缓存。
4. **将缓存失效时间分散开：**比如我们可以在原有的失效时间基础上增加一个随机值，比如1-5分钟随机，这样每一个缓存的过期时间的重复率就会降低，就很难引发集体失效的事件。











## 4、分布式锁







### 4.1、问题描述

> 随着业务发展的需要，原单体单机部署的系统被演化成分布式集群系统后，由于分布式系统多线程、多进程并且分布在不同机器上，这将使原单机部署情况下的并发控制锁策略失效，单纯的Java API并不能提供分布式锁的能力。为了解决这个问题就需要一种**跨JVM的互斥机制来控制共享资源的访问**，这就是分布式锁要解决的问题！





**分布式锁主流的实现方案：**

1. 基于数据库实现分布式锁
2. 基于缓存（Redis等）
3. 基于Zookeeper



**redis性能最高，zookeeper可靠性最高！**





### 4.2、使用redis实现分布式锁



**Redis命令：**

`set key value NX|XX PX|EX ..`

- EX second ：设置键的过期时间为 second 秒。 SET key value EX second 效果等同于 SETEX key second value 。
- PX millisecond ：设置键的过期时间为 millisecond 毫秒。 SET key value PX millisecond 效果等同于 PSETEX key millisecond value 。
- NX ：只在键不存在时，才对键进行设置操作。 SET key value NX 效果等同于 SETNX key value 。
- XX ：只在键已经存在时，才对键进行设置操作。







**分布式锁实现及其几大优化：** 

- 使用setnx设置锁，del释放锁
- 优化之设置锁的过期时间，自动释放锁，为了防止上锁后出现问题无法设置锁过期时间，建议使用`set lock nx ex ...`
- 优化之UUID防误删，删除前判断本次UUID是否发生改变，以防释放其他人的锁
- 优化之LUA脚本保证删除的原子性，以防由于不具备原子性，比较了UUID正要删除时，出现问题，将会再次出现释放其他人的锁







**不设置UUID可能误释放其他人：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@3d36f94d891528225886e4240b8d576582335e32/2021/09/06/411ebc83e32407b96bcdd01025f408de.png)







**删除操作不是原子性也会误释放其人人：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a94f3b98175b485c0cf52edad8a96c2b3e8a6463/2021/09/06/137d0c0129adc029807c5882f13753cb.png)



### 4.3、代码实现





**使用了UUID和设置了锁过期时间的代码：**



```java
@GetMapping("testLock")
public void testLock(){
    String uuid = UUID.randomUUID().toString();
    //1获取锁，setnx
    Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", uuid,3, TimeUnit.SECONDS);
    //2获取锁成功、查询num的值
    if(lock){
        Object value = redisTemplate.opsForValue().get("num");
        //2.1判断num为空return
        if(StringUtils.isEmpty(value)){
            return;
        }
        //2.2有值就转成成int
        int num = Integer.parseInt(value+"");
        //2.3把redis的num加1
        redisTemplate.opsForValue().set("num", ++num);
        //2.4释放锁，del
        //判断比较uuid值是否一样
        String lockUuid = (String)redisTemplate.opsForValue().get("lock");
        if(lockUuid.equals(uuid)) {
            redisTemplate.delete("lock");
        }
    }else{
        //3获取锁失败、每隔0.1秒再获取
        try {
            Thread.sleep(100);
            testLock();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```





**在上面基础上，使用了LUA脚本保证了原子性的最终版本：**

锁过期同样释放不了锁，并不影响！

**注意：**

- 真正落地不采用此方案，过期时间无法合理设置，集群不支持LUA脚本，常规考虑使用redssion和zookeeper解决，通常使用前者，后者还需要引入，成本过高！



```java
// 测试redis的分布式锁！
@GetMapping("testLockLua")
public void testLockLua() {
    //1 声明一个uuid ,将做为一个value 放入我们的key所对应的值中
    String uuid = UUID.randomUUID().toString();
    //2 定义一个锁：lua 脚本可以使用同一把锁，来实现删除！
    String skuId = "25"; // 访问skuId 为25号的商品 100008348542
    String locKey = "lock:" + skuId; // 锁住的是每个商品的数据

    // 3 获取锁
    Boolean lock = redisTemplate.opsForValue().setIfAbsent(locKey, uuid, 3, TimeUnit.SECONDS);

    // 第一种： lock 与过期时间中间不写任何的代码。
    // redisTemplate.expire("lock",10, TimeUnit.SECONDS);//设置过期时间
    // 如果true
    if (lock) {
        // 执行的业务逻辑开始
        // 获取缓存中的num 数据
        Object value = redisTemplate.opsForValue().get("num");
        // 如果是空直接返回
        if (StringUtils.isEmpty(value)) {
            return;
        }
        // 不是空 如果说在这出现了异常！ 那么delete 就删除失败！ 也就是说锁永远存在！
        int num = Integer.parseInt(value + "");
        // 使num 每次+1 放入缓存
        redisTemplate.opsForValue().set("num", String.valueOf(++num));
        /*使用lua脚本来锁*/
        // 定义lua 脚本
        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
        // 使用redis执行lua执行
        DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
        redisScript.setScriptText(script);
        // 设置一下返回值类型 为Long
        // 因为删除判断的时候，返回的0,给其封装为数据类型。如果不封装那么默认返回String 类型，
        // 那么返回字符串与0 会有发生错误。
        redisScript.setResultType(Long.class);
        // 第一个要是script 脚本 ，第二个需要判断的key，第三个就是key所对应的值。
        redisTemplate.execute(redisScript, Arrays.asList(locKey), uuid);
    } else {
        // 其他线程等待
        try {
            // 睡眠
            Thread.sleep(1000);
            // 睡醒了之后，调用方法。
            testLockLua();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```



**LUA脚本介绍：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5b7dd1142a3596e1be36b16edbaedddc11dab25c/2021/09/06/f5cf4edcb96dac010960f2344d8dabe0.png)



### 4.4、分布式锁四条件





为了确保分布式锁可用，我们至少要确保锁的实现同时**满足以下四个条件**：

- 互斥性。在任意时刻，只有一个客户端能持有锁。
- 不会发生死锁。即使有一个客户端在持有锁的期间崩溃而没有主动解锁，也能保证后续其他客户端能加锁。
- 解铃还须系铃人。加锁和解锁必须是同一个客户端，客户端自己不能把别人加的锁给解了。
- 加锁和解锁必须具有原子性。













# 十四、Redis6新功能







## 1、ACL





### 1.1、概述





Redis ACL是Access Control List（访问控制列表）的缩写，该功能允许根据可以执行的命令和可以访问的键来限制某些连接。

在Redis 5版本之前，Redis 安全规则只有密码控制 还有通过rename 来调整高危命令比如 flushdb ， KEYS* ， shutdown 等。Redis 6 则提供ACL的功能对用户进行更细粒度的权限控制 ：

- 接入权限:用户名和密码 
- 可以执行的命令 
- 可以操作的 KEY





### 1.2、常用命令



- acl list：命令展现用户权限列表
- acl cat：命令查看添加权限指令类别
  - 加参数类型名可以查看类型下具体命令，eg：`acl cat string`
- acl whoami：命令查看当前用户
- auth 用户 密码 ：切换用户，验证权限。切换回默认default用户：`auth default ""`



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4690996b8d3a99a624d48a930d0445bc974259b8/2021/09/06/ead9e47831c80dc2a07a1533736f949c.png)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@28551d2f9ff54d84f6d0c3faecaabf5999fe5b70/2021/09/06/a1055761690dbf6385e3983be8bc80cf.png)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@044756d66c13803774058203c6a0d882b683a909/2021/09/06/04cd915f6afe4634c26c7462bc415637.png)









### 1.3、ACL规则



**使用acl setuser命令创建和编辑用户ACL！**

- acl setuser user
  - 不指定任何规则。如果用户不存在，这将使用just created的默认属性来创建用户。如果用户已经存在，则上面的命令将不执行任何操作。
  - `acl setuser user2 on >password ~cached:* +get`：设置有用户名、密码、ACL权限、并启用的用户

下面是有效ACL规则的列表。某些规则只是用于激活或删除标志，或对用户ACL执行给定更改的单个单词。其他规则是字符前缀，它们与命令或类别名称、键模式等连接在一起。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@edd09b93b258ca585634554d8915e93d2df42b3d/2021/09/06/3b3121b4c9cfdc01dff8f5a0dcd0e33d.png)







## 2、IO多线程







### 2.1、概述



**Redis6终于支撑多线程了，告别单线程了吗？**

IO多线程其实指**客户端交互部分**的**网络IO**交互处理模块**多线程**，而非**执行命令多线程**。Redis6执行命令依然是单线程。





### 2.2、实现原理



Redis 6 加入多线程,但跟 Memcached 这种从 IO处理到数据访问多线程的实现模式有些差异。**Redis 的多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程。**之所以这么设计是不想因为多线程而变得复杂，需要去控制 key、lua、事务，LPUSH/LPOP 等等的并发问题。





**多线程IO默认也是不开启的，需要再配置文件中配置：**

- io-threads-do-reads yes 
- io-threads 4







![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@b11fcfa30a139a5d855cf9aad05aa82ac3c27796/2021/09/06/f7d5a128cd3b96c6505817c0c3560415.png)



## 3、工具支持Cluster



之前老版Redis想要搭集群需要单独安装ruby环境，Redis 5 将 redis-trib.rb 的功能集成到 redis-cli 。另外官方 redis-benchmark 工具开始支持 cluster 模式了，通过多线程的方式对多个分片进行压测。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@86190f2fd011ed006e3735b4c06f89fd091fac1e/2021/09/06/de14547d0b1c3d3536139a9803ec43b7.png)





## 4、其他新功能







1. RESP3新的 Redis 通信协议：优化服务端与客户端之间通信
2. Client side caching客户端缓存：基于 RESP3 协议实现的客户端缓存功能。为了进一步提升缓存的性能，将客户端经常访问的数据cache到客户端。减少TCP网络交互。
3. Proxy集群代理模式：Proxy 功能，让 Cluster 拥有像单实例一样的接入方式，降低大家使用cluster的门槛。不过需要注意的是代理不改变 Cluster 的功能限制，不支持的命令还是不会支持，比如跨 slot 的多Key操作。
4. Modules API：Redis 6中模块API开发进展非常大，因为Redis Labs为了开发复杂的功能，从一开始就用上Redis模块。Redis可以变成一个框架，利用Modules来构建不同系统，而不需要从头开始写然后还要BSD许可。Redis一开始就是一个向编写各种系统开放的平台。

