---
title: MySQL数据库高级-MySQL数据库优化
author: ITNXD
toc: true
abbrlink: 37817
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/13/023c60267caad6a4c7dd0a87e754c56b.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/13/023c60267caad6a4c7dd0a87e754c56b.png
categories:
  - 数据库
  - 关系型数据库
tags:
  - MySQL
  - 索引优化
  - 性能分析
date: 2021-09-07 08:26:52
updated:
---





> 基于centos7及mysql-5.7.35，5.7.35为目前最新5.x版本！



# 一、Linux安装MySQL及相关配置





## 1、安装





> 安装步骤参考我之前的博客，[Linux安装MySQL5.7！](https://www.itnxd.cn/posts/58036.html#3%E3%80%81%E5%AE%89%E8%A3%85Mysql)



**关于Linux下的三种安装包介绍：**

1. rpm package：是某个特定的包，比如server,client,shared lib等。（可以单独安装 ）
2. rpm bundle：是该版本所有包的集合。（一般是把服务器端要用的都安装上，其他的不带，尤其是开发包 ）
3. Compressed TAR Archive：是源码，必须用源码方式安装。（这个是源码，需要自己编译的，也有编译好，但不是安装包的）



**下载地址：**

```shell
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.35-1.el7.x86_64.rpm-bundle.tar
```





**查看MySQL用户和组信息：**

- /etc/passwd 文件：记录用户的各种信息。每行含义：用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录 Shell
- /etc/group 文件：组(group)的配置文件，记录 Linux 包含的组的信息。每行含义：组名:口令:组标识号:组内用户列表





## 2、配置文件修改





> 5.7版本MySQL配置文件默认位置为`/etc/my.cnf`！
>
> **注意**：已经创建的数据库的设定不会发生变化，参数修改只对新建的数据库有效。







**修改已创建库、表字符集：**

```shell
mysql> alter database mydb character set 'utf8';
mysql> alter table mytbl convert to character set 'utf8';
# 查看数据库的字符集
mysql> show create database 库名
# 创建数据库，顺便执行字符集为utf-8
create database 库名 character set utf8
```

**修改已经乱码数据：**
无论是修改 mysql 配置文件或是修改库、表字符集，都无法改变已经变成乱码的数据。
只能删除数据重新插入或更新数据才可以完全解决

**设置默认编码为utf8：修改配置文件字符集使得永久生效**

修改配置文件后需要重启MySQL，`systemctl restart mysqld.service`

`vim /etc/my.cnf`

```shell
[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

# 新增如下内容
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```





**使用`show variables like ‘%char%‘`查看编码格式：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/07/7923eb0cadd206f4f3ec1b3992c21d7b.png)





## 3、默认配置文件路径



- 配置文件：/etc/my.cnf
- 日志文件：/var/log/mysqld.log
- 服务启动脚本：/usr/lib/systemd/system/mysqld.service
- socket文件：/var/run/mysqld/mysqld.pid
- 库文件：/var/lib/mysql











# 二、Mysql 逻辑架构简介





## 1、整体架构图



> 和其它数据库相比，MySQL 有点与众不同，它的架构可以在多种不同场景中应用并发挥良好作用。主要体现在存储引擎的架构上，**插件式的存储引擎架构将查询处理和其它的系统任务以及数据的存储提取相分离。**这种架构可以根据业务的需求和实际需要选择合适的存储引擎。

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/4854018f0c945e58642b5366f34499cb.png)











### 1.1、连接层



最上层是一些客户端和连接服务，包含本地 sock 通信和大多数基于客户端/服务端工具实现的类似于 tcp/ip 的通信。主要完成一些类似于连接处理、授权认证、及相关的安全方案。在该层上引入了**线程池**的概念，为通过认证**安全**接入的客户端提供线程。同样在该层上可以实现基于 SSL 的安全链接。服务器也会为安全接入的每个客户端验证它所具有的操作权限。





### 1.2、服务层





|            服务层组件            |                             功能                             |
| :------------------------------: | :----------------------------------------------------------: |
| Management Serveices & Utilities |                      系统管理和控制工具                      |
|          SQL Interface           | SQL 接口。接受用户的 SQL 命令，并且返回用户需要查询的结果。比如 select from 就是调用 SQL Interface |
|              Parser              |  解析器。 SQL 命令传递到解析器的时候会被解析器验证和解析。   |
|            Optimizer             | 查询优化器。 SQL 语句在查询之前会使用查询优化器对查询进行优化，比如有where 条件时，优化器来决定先投影还是先过滤。 |
|         Cache 和 Buffer          | 查询缓存。如果查询缓存有命中的查询结果，查询语句就可以直接去查询缓存中取数据。这个缓存机制是由一系列小缓存组成的。比如表缓存，记录缓存，key 缓存，权限缓存等 |





### 1.3、引擎层



存储引擎层，存储引擎真正的负责了 MySQL 中数据的存储和提取，服务器通过 API 与存储引擎进行通信。不同的存储引擎具有的功能不同，这样我们可以根据自己的实际需要进行选取。







### 1.4、存储层

数据存储层，主要是将数据存储在运行于裸设备的文件系统之上，并完成与存储引擎的交互！





## 2、两大常用引擎



> 即MyISAM 和 InnoDB！

### 2.1、查看MySQL使用引擎



```mysql
# 查看所有的数据库引擎
show engines
# 查看默认的数据库引擎
show variables like '%storage_engine%' 
```



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/0f529d81c3b8a27e8841528ae62f19bd.png)







### 2.2、二者对比



|     对比项     |                            MyISAM                            |                            InnoDB                            |
| :------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|      事务      |                            不支持                            |                             支持                             |
|      外键      |                            不支持                            |                             支持                             |
|     行表锁     | 表锁，即使操作一条记录也会锁住整个表，**不适合高并发**的操作 | 行锁,操作时只锁某一行，不对其它行有影响，**适合高并发**的操作 |
|      缓存      |                  只缓存索引，不缓存真实数据                  | 不仅缓存索引还要缓存真实数据，对内存要求较高，而且内存大小对性能有决定性的影响 |
|     关注点     |                          读**性能**                          |                    并发写、**事务**、资源                    |
|     表空间     |                              小                              |                              大                              |
|    默认安装    |                              Y                               |                              Y                               |
|    默认使用    |                              N                               |                              Y                               |
| 自带系统表使用 |                              Y                               |                              N                               |







### 2.3、拓展了解







![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/1bfd0d22949c894d7e6c883eeca7534f.png)





- Percona为MySQL数据库服务器进行了改进，在功能和性能上较MySQL有着很显著的提升。该版本提升了在高负载情况下的InnoDB的性能、为DBA提供一些非常有用的性能诊断工具;另外有更多的参数和命令来控制服务器行为。
- 该公司新建了一款存储引擎叫**xtradb完全可以替代innodb,并且在性能和并发上做得更好，**
- 阿里巴巴大部分mysql数据库其实使用的percona的原型加以修改。**AliSql+AliRedis**







# 三、索引优化分析



## 1、SQL性能下降的原因





1. 查询语句写的烂（各种子查询，没建索引）
2. 索引失效（单值，多值索引）
3. 关联太多的Join（设计缺陷或不得已需求）
4. 服务器调优及各个参数设置（缓冲，线程数）







## 2、SQL执行加载顺序







**人写：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/fc298f9e49358faa7f4ea026e806e7ef.png)







**机读：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/4b833060abad46f7c83725063cfd3dab.png)









**MySQL执行顺序鱼刺图：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/35ceab73ec100972533feea050cb4b65.png)







## 3、七种Join



> 



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/47467787a1aa24843ea0ad469b94b3ca.png)







**注意：MySQL不支持全外连接，需要使用union进行合并去重得到，最后两种情况如下图：**





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/cffc6e7c7181f27e97effa18537e4b14.png)







![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/79b38eb77814626670b4698b8f0667f9.png)









## 4、什么是索引





> Index在数组中叫下标，在Git中叫暂存区，在数据库中叫索引！



MySQL 官方对索引的定义为：索引（Index）是帮助 MySQL 高效获取数据的数据结构。

可以得到**索引的本质：索引是数据结构。**可以简单理解为**排好序的快速查找数据结构**。

- 排序：order by
- 查找：where条件

**索引的目的：在于提高查找效率**，可以类比字典！





为了加快查找，可以维护一个图中右边所示的**二叉查找树**，类似指针指向真实的物理地址！

一般来说索引本身也很大，不可能全部存储在内存中，因此索引往往以**索引文件的形式存储的磁盘上**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/3b2a9e7979c2b51236c0642dd24d653b.png)





**我们平常所说的索引，如果没有特别指明，都是指B树**(多叉搜索树，并不一定是二叉的)结构组织的索引。其中聚集索引，次要索引，覆盖索引，复合索引，前缀索引，唯一索引默认都是使用B+树公引，统称索引。当然，除了B+树这种类型的索引之外，还有哈希索引等。





**关于无效数据的删除：**

并不会真的删除，底层只是做了update操作，只会将该数据的一个标志为置为非激活状态即可！

- 留下来的该数据对于其他部门等数据分析还会有用
- 需要**重建索引**，以防查询到的数据因为索引没有及时更新造成数据不准确发生





## 5、索引优缺点



**优点：**

1. 提高数据检索的效率，降低数据库的IO成本。
2. 通过索引列对数据进行排序，降低数据排序的成本，降低了CPU的消耗。

**缺点：**

1. 虽然索引大大**提高了查询速度**，同时却会**降低更新表的速度**，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件每次更新添加了索引列的字段，都会调整因为更新所带来的键值变化后的索引信息。
2. 实际上**索引也是一张表**，该表保存了主键与索引字段，并指向实体表的记录，所以**索引列也是要占用空间**的。
3. 索引只是提高效率的一个因素，如果你的MySQL有大数据量的表，就需要花时间研究建立最优秀的索引，或优化查询。







## 6、MySQL索引分类





### 6.0、基本语法



```mysql
# 使用Create单独创建索引
CREATE [UNIQUE] INDEX 索引名 ON 表名(列名[(长度)]);
# 使用Alter单独创建索引
ALTER 表名 ADD [UNIQUE] INDEX 索引名 ON 表名(列名[(长度)]);
# 删除索引
DROP INDEX 索引名 ON 表名;
# 查看某表全部索引
SHOW INDEX FROM 表名;


# ALTER添加主键(主键也是一种索引，意味着该索引值必须唯一，且不能为null)
ALTER 表名 ADD PRIMARY KEY(列名);
# ALTER添加唯一索引(该索引值必须唯一，允许有NULL)
ALTER 表名 ADD UNIQUE 索引名(列名);
# ALTER添加普通单值索引(该索引值不一定唯一)
ALTER 表名 ADD 索引名(列名);
# ALTER添加全文索引(用于全文索引)
ALTER 表名 ADD FULLTEXT 索引名(列名);
```









### 6.1、主键索引



**是什么？**

设定为主键后数据库会自动建立索引，innodb为聚簇索引！

**例子？**

```mysql
# 和表一起创建：
CREATE TABLE customer (
    id INT(10) UNSIGNED AUTO_INCREMENT,
    customer_no VARCHAR(200),
    customer_name VARCHAR(200), 
    PRIMARY KEY(id), # 主键索引
);
# 单独建：
ALTER TABLE customer ADD PRIMARY KEY customer(customer_no);
# 删除建主键索引：
ALTER TABLE customer drop PRIMARY KEY ;
# 修改建主键索引：必须先删除掉(drop)原索引，再新建(add)索引
```





### 6.2、单值索引



**是什么？**

即一个索引只包含单个列，一个表可以有多个单列索引！

**建议**：一张表建的索引最多不要超过五个！

**例子？**

```mysql
# 和表一起创建：
CREATE TABLE customer (
    id INT(10) UNSIGNED AUTO_INCREMENT,
    customer_no VARCHAR(200),
    customer_name VARCHAR(200), 
    KEY (customer_name) # 单值索引
);
# 单独建：
CREATE INDEX idx_customer_name ON customer(customer_name);
```



**查看表的索引：** `show index from table;`



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/08/125120d8c06726964383ce9e2e8b8b1e.png)



### 6.3、复合索引

**是什么？**

即一个索引包含多个列！

**语法？**

````mysql
# 和表一起创建：
CREATE TABLE customer (
    id INT(10) UNSIGNED AUTO_INCREMENT,
    customer_no VARCHAR(200),
    customer_name VARCHAR(200), 
    KEY (customer_no,customer_name) # 符合索引
);
# 单独建：
CREATE INDEX idx_no_name ON customer(customer_no,customer_name);
````





### 6.4、唯一索引

**是什么？**

索引列的值必须唯一，但允许有空值！

**例子？**



```mysql
# 和表一起创建：
CREATE TABLE customer (
    id INT(10) UNSIGNED AUTO_INCREMENT,
    customer_no VARCHAR(200),
    customer_name VARCHAR(200), 
    UNIQUE (customer_no) # 唯一索引
);
# 单独建：
CREATE UNIQUE INDEX idx_customer_name ON customer(customer_no);
```







## 7、MySQL索引结构



> **MySQL 使用的是 Btree 索引！**



### 7.1、Btree结构



**结构如下图所示：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/aa9fa51daadd1cd07e878df4607b24f4.png)



一颗 b 树，浅蓝色的块我们称之为一个磁盘块，可以看到每个磁盘块包含几个数据项（深蓝色所示）和指针（黄色所示）：

如磁盘块 1 包含数据项 17 和 35，包含指针 P1、P2、P3，P1 表示小于 17 的磁盘块，P2 表示在 17 和 35 之间的磁盘块，P3 表示大于 35 的磁盘块。
**真实的数据存在于叶子节点。非叶子节点只不存储真实的数据，只存储指引搜索方向的数据项**，如 17、35 并不真实存在于数据表中。



### 7.2、B+Tree结构



**结构如下图所示：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/bf301c7cc5cfcb919388d9334e3c2a8a.png)



**B+树和B树（B-树）区别：**

- B树的关键字和记录是放在一起的，叶子节点可以看作外部节点，不包含任何信息；B+树的非叶子节点中只有关键字和指向下一个节点的索引，记录只放在叶子节点中。
- 在 B-树中，越靠近根节点的记录查找时间越快，只要找到关键字即可确定记录的存在；而 B+树中每个记录的查找时间基本是一样的，都需要从根节点走到叶子节点，而且在叶子节点中还要再比较关键字。
- 从这个角度看 B- 树的性能好像要比 B+树好，而在**实际应用中却是 B+树的性能要好些**。因为 B+树的非叶子节点不存放实际的数据，这样每个节点可容纳的元素个数比 B-树多，树高比 B-树小，这样带来的好处是减少磁盘访问次数。尽管 B+树找到一个记录所需的比较次数要比 B-树多，但是一次磁盘访问的时间相当于成百上千次内存比较的时间，因此实际中B+树的性能可能还会好些，而且 B+树的叶子节点使用指针连接在一起，方便顺序遍历（例如查看一个目录下的所有文件，一个表中的所有记录等），这也是很多数据库和文件系统使用 B+树的缘故。





**为什么说 B+树比 B-树更适合实际应用中操作系统的文件索引和数据库索引？**

1) B+树的磁盘读写代价更低：B+树的内部结点并没有指向关键字具体信息的指针。因此其内部结点相对 B 树更小。如果把所有同一内部结点的关键字存放在同一盘块中，那么盘块所能容纳的关键字数量也越多。一次性读入内存中的需要查找的关键字也就越多。相对来说 IO 读写次数也就降低了。
2) B+树的查询效率更加稳定：由于非终结点并不是最终指向文件内容的结点，而只是叶子结点中关键字的索引。所以任何关键字的查找必须走一条从根结点到叶子结点的路。所有关键字查询的路径长度相同，导致每一个数据的查询效率相当。









### 7.3、聚簇索引和非聚簇索引



**聚簇索引**并不是一种单独的索引类型，而是一种数据存储方式。术语‘聚簇’表示数据行和相邻的键值聚簇的存储在一起。如下图，左侧的索引就是聚簇索引，因为数据行在磁盘的排列和索引排序保持一致。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/bf0cf71fe1bc2eafbfe7b0080a16c7e3.png)







**聚簇索引的好处：**

按照聚簇索引排列顺序，查询显示一定范围数据的时候，由于数据都是紧密相连，数据库不不用从多个数据块中提取数据，所以节省了大量的 io 操作。
**聚簇索引的限制：** 

对于 mysql 数据库目前只有 innodb 数据引擎支持聚簇索引，而 Myisam 并不支持聚簇索引。由于数据物理存储排序方式只能有一种，所以每个 Mysql 的表只能有一个聚簇索引。一般情况下就是该表的主键。为了充分利用聚簇索引的聚簇的特性，所以 innodb 表的主键列尽量选用有序的顺序 id，而不建议用无序的 id，比如 uuid 这种。





## 8、适合建索引的情况



1. 主键自动建立唯一索引
2. 频繁作为查询条件的字段应该创建索引
3. 查询中与其它表关联的字段外键关系建立索引
4. 单键/组合索引的选择问题，组合索引性价比更高（高并发更合适）
5. 查询中排序的字段，排序字段若通过索引去访问将大大提高排序速度
6. 查询中统计或者分组字段（分组前提必排序）





## 9、不适合建索引的情况





1. 表记录太少（300w条记录数据库性能将会下降）
2. 经常增删改的表或者字段
3. Where 条件里用不到的字段不创建索引
4. 过滤性不好的不适合建索引
5. 数据重复且分布平均的表字段，因此应该只为最经常查询和最经常排序的数据列建立索引。注意，如果某个数据列包含许多重复的内容，为它建立索引就没有太大的实际效果。







# 四、Explain性能分析



## 1、MySQ常见瓶颈



CPU：CPU在饱和的时候一般发生在数据装入内存或从磁盘上读取数据时候

IO：磁盘I/O瓶颈发生在装入数据远大于内存容量的时候

服务器硬件的性能瓶颈：top, free, iostat和vmstat来查看系统的性能状态





## 2、概述



使用 EXPLAIN 关键字可以模拟优化器执行 SQL 查询语句，从而知道 MySQL 是如何处理你的 SQL 语句的。分析你的查询语句或是表结构的性能瓶颈。

- 表的读取顺序
- 数据读取操作的操作类型哪些索引可以使用
- 哪些索引被实际使用
- 表之间的引用
- 每张表有多少行被优化器查询



**用法：** Explain+SQL 语句。



**Explain 执行后返回的信息：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/bae9ff6f9832f42e6fca8bb87251d032.png)





## 3、id



select 查询的序列号,包含一组数字，表示查询中执行 select 子句或操作表的顺序。



- id 相同，执行顺序由上至下

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/3036fe4cdc0cba6689b5af113fd1c8df.png)



- id 不同，id 不同，如果是子查询，id 的序号会递增，id 值越大优先级越高，越先被执行



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/1a48c9eb64f7d802f5bb4bb8bf07bc9f.png)



- 有相同也有不同：id 如果相同，可以认为是一组，从上往下顺序执行；在所有组中，id 值越大，优先级越高，越先执行



衍生 = DERIVED

derived2中的2是id=2的那个2，表示s3是由t3衍生出来的表，因此执行顺序为t3、s3、t2。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/9c7c37cf014a3f8e653e83f1930ab2f4.png)







**关注点：id 号每个号码，表示一趟独立的查询。一个 sql 的查询趟数越少越好。**





## 4、select_type



select_type 代表查询的类型，主要是用于区别普通查询、联合查询、子查询等的复杂查询。





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/dc16eb0bddee71c7eb714803233499a9.png)



**关于subquery和dependent subquery区别：**

都是 where 后面的条件，subquery 是单个值，dependent subquery 是一组值。



**UNCACHEABLE SUBQUREY：**

当使用了@@来引用系统变量的时候，不会使用缓存。

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/d2b59495502d7ec85d8bcb1c6eeabbdb.png)



## 5、table


表示这个数据是基于哪张表的。



## 6、type





type 是查询的访问类型。是较为重要的一个指标。



**结果值从最好到最坏依次是：**

**system** > **const** > **eq_ref** > **ref** > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > **range** > **index** > **ALL** 

**一般来说，得保证查询至少达到 range 级别，最好能达到 ref。**







**system：**

表只有一行记录（等于**系统表**），这是 const 类型的特列，平时不会出现，这个也可以**忽略不计**。



**const：**

表示通过索引一次就找到了,const 用于比较 **primary key 或者 unique 索引**。因为只匹配一行数据，所以很快如将主键置于 where 列表中，MySQL 就能将该查询转换为一个常量。

**简单理解**：**单表**（只索引一次），找到**一条记录**。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/c79ceb456484b97825f80bf039c01c07.png)



**eq_ref：**

**唯一性索引**扫描，对于每个索引键，表中只有一条记录与之匹配。常见于**主键或唯一索引**扫描。

**简单理解**：**多表**（只索引一次），前一个表的唯一索引只能在后表中唯一匹配**一条记录**。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/2066695c4ae03f4b10931f95b64617ea.png)



**ref：**

**非唯一性索引**扫描，返回匹配某个单独值的所有行.本质上也是一种索引访问，它返回所有匹配某个单独值的行，然而，它可能会找到多个符合条件的行，所以他应该属于查找和扫描的混合体。

**简单理解**：**非唯一索引**，一条可能匹配**多条**记录。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/5018c711aa1e091c0be94a0ce941b417.png)



**range：**

**只检索给定范围的行,使用一个索引来选择行**。key 列显示使用了哪个索引一般就是在你的 where 语句中出现了 between、<、>、in 等的查询这种范围扫描索引扫描比全表扫描要好，因为它只需要开始于索引的某一点，而结束语另一点，**不用扫描全部索引**。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/157571885743ccabaee8f10f0e1590f8.png)



**index：**

出现index是sql**使用了索引但是没通过索引进行过滤**，一般是使用了覆盖索引或者是利用索引进行了排序分组。

Full Index Scan，index与ALL区别为index类型只遍历索引树。这通常比ALL快，因为**索引文件通常比数据文件小**。（也就是说虽然all和Index都是读全表，但index是从索引中读取的，而ALL是从硬盘中读的)。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/0d1e3c3589b71c236ac0891e87fc0e5a.png)



**all：**

Full Table Scan，将遍历全表以找到匹配的行。

**简单理解：**不建索引，不使用索引就是ALL。





## 7、possible_keys





显示**可能**应用在这张表中的索引，一个或多个。查询涉及到的字段上若存在索引，则该索引将被列出，**但不一定被查询实际使用。**（为MySQL估计值）









## 8、key



**实际**使用的索引。如果为NULL，则没有使用索引。（真实值）

**查询中若使用了覆盖索引，则该索引仅出现在key列表中：**

即符合索引用到的列和查询查的列完美匹配时，将不会进行全盘扫描，直接扫描符合索引即可！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/bd241acd1cc3bf0cf2e52bf17010f4b0.png)



## 9、key_len



表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度。 key_len 字段能够帮你检查是否充分的利用上了索引。**ken_len 越长，说明索引使用的越充分。**

key_len显示的值为索引字段的**最大可能长度**，**并非实际使用长度**，即key_len是根据表定义计算而得，不是通过表内检索出的。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/9956ae055c43ca11adb167f302026f6f.png)



**如何计算？**

1. 先看索引上字段的类型+长度比如 int=4 ; varchar(20) =20 ; char(20) =20
2. 如果是 varchar 或者 char 这种字符串字段，视字符集要乘不同的值，比如 utf-8 要乘 3,GBK 要乘 2，
3. varchar 这种动态字符串要加 2 个字节
4. 允许为空的字段要加 1 个字节
   1. 第一组：key_len=age 的字节长度+name 的字节长度=4+1 + ( 20*3+2)=5+62=67
   2. 第二组：key_len=age 的字节长度=4+1=5



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/f8856e0a599c6fabf3b51b167f7db0aa.png)





## 10、ref



显示索引的哪一列被使用了，如果可能的话，是一个常数。哪些列或常量被用于查找索引列上的值。



如果是使用的常数等值查询，这里会显示const。如果是连接查询，被驱动表的执行计划这里会显示驱动表的关联字段，如果是条件使用了表达式或者函数，或者条件列发生了内部隐式转换，这里可能显示为func。





**下图解释**：由key_len可知t1表的idx_col1_col2被充分使用，col1匹配t2表的col1，col2匹配了一个常量，即 'ac'

**其实就是where右边对应的条件，只是限定了左边必须是有索引的列！**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/712456fef1d0e2934abf7e59f5edaf8f.png)





## 11、rows



rows 列显示 MySQL 认为它执行查询时必须检查的行数。越少越好！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/eb25f727ac6bc16bb5e96568d3394a5f.png)





## 12、extra



> 包含不适合在其他列中显示但十分重要的额外信息！
>
> 前三个比较重要，其他了解即可！





**Using filesort：** 九死一生，需要尽快解决！

说明 mysql 会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取。MySQL 中无法利用索引完成的排序操作称为“文件排序”。



**简单来说**：MySQL内部认为该语句使用索引排序不如直接内部进行文件排序要好！



**原因**：如下图，上面情况用到了col1和col3没有用到col2，出现断层，内部将会使用文件排序，多了一层，性能会下降，下面的全部用到了，性能会更好！



**查询中排序的字段，排序字段若通过索引去访问将大大提高排序速度！**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/35483fb3721a9752014f06b78cb5cf1d.png)







**Using temporary：** 也需要尽快解决！

使了用**临时表**保存中间结果,MySQL 在对查询结果排序时使用临时表。常见于排序 order by 和分组查询 group by。

自建了表索引index_a_b_c测试排序时使用到a，a b, a b c, 三种情况不会出现 filesort，所以建的组合索引index_a_b_c相当于建了三个索引a; a b; a b c。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/dbbcea25dd3379eef9ba8d4176f0c189.png)









**Using index：** 提高效率！

Using index 代表表示相应的 select 操作中使用了覆盖索引(Covering Index)，避免访问了表的数据行，效率不错！

- 如果同时出现 **using where**，表明索引被用来执行索引键值的查找;
- 如果没有同时出现 using where，表明索引只是用来读取数据而非利用索引执行查找。

利用索引进行了排序或分组。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/f3a60899d7498d107bfc72397ae7c8c8.png)







---





**覆盖索引补充：**

> 就是select的数据列只用从索引中就能够取得，不必读取数据行，MySQL可以利用索引返回select列表中的字段，而不必根据索引再次读取数据文件,换句话说**查询列要被所建的索引覆盖**。

**注意：**

- 如果要使用覆盖索引，一定要注意select列表中只取出需要的列，不可select *
- 因为如果将所有字段一起做索引会导致索引文件过大，查询性能下降。



-----



**Using join buffer：**

使用了连接缓存。表明配中的buffer需要调大一点！







**impossible where：**

where 子句的值总是 false，不能用来获取任何元组。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/25a4c0bda5a115199d99a4cd4fedc3ef.png)





**select tables optimized away：**了解



> 在没有 GROUPBY 子句的情况下，基于索引优化 MIN/MAX 操作或者对于 MyISAM 存储引擎**优化 COUNT(*)操作**，不必等到执行阶段再进行计算，查询执行计划生成的阶段即完成优化。
>
> 在 innodb 中不会显示，在 Myisam 中会显示！



**distinct：**

> **优化distinct操作**，在找到第一匹配的元组后即停止找同样值的动作！



## 13、一个例子





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/a816115134dd06104b5e30cfbb803303.png)



**执行顺序分析如下：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/09/453477dd9d8642c565734d4d6a3a5bb3.png)







# 五、索引优化





## 1、索引分析





### 1.1、单表



**建表SQL：**

```mysql
CREATE TABLE IF NOT EXISTS `article`(
`id` INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
`author_id` INT (10) UNSIGNED NOT NULL,
`category_id` INT(10) UNSIGNED NOT NULL , 
`views` INT(10) UNSIGNED NOT NULL , 
`comments` INT(10) UNSIGNED NOT NULL,
`title` VARBINARY(255) NOT NULL,
`content` TEXT NOT NULL
);
INSERT INTO `article`(`author_id`,`category_id` ,`views` ,`comments` ,`title` ,`content` )VALUES
(1,1,1,1,'1','1'),
(2,2,2,2,'2','2'),
(3,3,3,3,'3','3');
 
SELECT * FROM ARTICLE;

EXPLAIN SELECT id,author_id FROM article WHERE category_id = 1 AND comments > 1 ORDER BY views DESC LIMIT 1;
```



**案例：** 查询category_id为1且comments大于1的情况下, views最多的 article_id。



**简单实现：**

```mysql
mysql> EXPLAIN SELECT id,author_id FROM article WHERE category_id = 1 AND comments > 1 ORDER BY views DESC LIMIT 1;
+----+-------------+---------+------------+------+---------------+------+---------+------+------+----------+-----------------------------+
| id | select_type | table   | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra                       |
+----+-------------+---------+------------+------+---------------+------+---------+------+------+----------+-----------------------------+
|  1 | SIMPLE      | article | NULL       | ALL  | NULL          | NULL | NULL    | NULL |    3 |    33.33 | Using where; Using filesort |
+----+-------------+---------+------------+------+---------------+------+---------+------+------+----------+-----------------------------+
1 row in set, 1 warning (0.00 sec)

```



**结论：很显然,type是ALL,即最坏的情况。Extra里还出现了Using filesort,也是最坏的情况。优化是必须的。**





**开始优化：**

```mysql
mysql> show index from article\G
*************************** 1. row ***************************
        Table: article
   Non_unique: 0
     Key_name: PRIMARY
 Seq_in_index: 1
  Column_name: id
    Collation: A
  Cardinality: 3
     Sub_part: NULL
       Packed: NULL
         Null: 
   Index_type: BTREE
      Comment: 
Index_comment: 
1 row in set (0.00 sec)
```



---



**优化：建立索引、删除索引**



```mysql
create index idx_article_ccv on article(category_id,comments,views);

# 索引结构
mysql> show index from article;
+---------+------------+-----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table   | Non_unique | Key_name        | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+---------+------------+-----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| article |          0 | PRIMARY         |            1 | id          | A         |           3 |     NULL | NULL   |      | BTREE      |         |               |
| article |          1 | idx_article_ccv |            1 | category_id | A         |           3 |     NULL | NULL   |      | BTREE      |         |               |
| article |          1 | idx_article_ccv |            2 | comments    | A         |           3 |     NULL | NULL   |      | BTREE      |         |               |
| article |          1 | idx_article_ccv |            3 | views       | A         |           3 |     NULL | NULL   |      | BTREE      |         |               |
+---------+------------+-----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
4 rows in set (0.00 sec)

# 性能分析
mysql> EXPLAIN SELECT id,author_id FROM article WHERE category_id = 1 AND comments > 1 ORDER BY views DESC LIMIT 1;
+----+-------------+---------+------------+-------+-----------------+-----------------+---------+------+------+----------+---------------------------------------+
| id | select_type | table   | partitions | type  | possible_keys   | key             | key_len | ref  | rows | filtered | Extra                                 |
+----+-------------+---------+------------+-------+-----------------+-----------------+---------+------+------+----------+---------------------------------------+
|  1 | SIMPLE      | article | NULL       | range | idx_article_ccv | idx_article_ccv | 8       | NULL |    1 |   100.00 | Using index condition; Using filesort |
+----+-------------+---------+------------+-------+-----------------+-----------------+---------+------+------+----------+---------------------------------------+
1 row in set, 1 warning (0.00 sec)

```





**结果：type变为了range，且使用上了index，但extra里仍然有filesort ？**

- 索引为三者复合索引ccv，但是在范围 comments > 1后就有范围了，导致后面的索引用不上，发生了断层，结果导致内部进行了文件排序！

type变成了range，这是可以忍受的。但是extra里使用Using filesort仍是无法接受的。但是我们已经建立了索引，为啥没用呢?

这是因为按照BTree 索引的工作原理，先排序category_id, 如果遇到相同的category_id则再排序comments, 如果遇到相同的comments 则再排序views。

当comments字段在联合索引里处于中间位置时，因comments >1条件是一个范围值(所谓range), MySQL无法利用索引再对后面的views部分进行检索,**即range类型查询字段后面的索引无效。**



---



**说明索引建的不合适，删掉重建！**



既然范围range类型查询字段后面索引失效，那我们可以直接跳过范围字段！



```mysql
mysql> drop index idx_article_ccv on article;
Query OK, 0 rows affected (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 0

# 重建索引
mysql> create index idx_article_cv on article(category_id,views);
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> EXPLAIN SELECT id,author_id FROM article WHERE category_id = 1 AND comments > 1 ORDER BY views DESC LIMIT 1;
+----+-------------+---------+------------+------+----------------+----------------+---------+-------+------+----------+-------------+
| id | select_type | table   | partitions | type | possible_keys  | key            | key_len | ref   | rows | filtered | Extra       |
+----+-------------+---------+------------+------+----------------+----------------+---------+-------+------+----------+-------------+
|  1 | SIMPLE      | article | NULL       | ref  | idx_article_cv | idx_article_cv | 4       | const |    1 |    33.33 | Using where |
+----+-------------+---------+------------+------+----------------+----------------+---------+-------+------+----------+-------------+
1 row in set, 1 warning (0.00 sec)

```



**结果：可以看到, type变为了ref, Extra中的Using filesort也消失了, 结果非常理想。**





### 1.2、两表



**建表SQL：**



```mysql
CREATE TABLE IF NOT EXISTS `class`(
`id` INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
`card` INT (10) UNSIGNED NOT NULL
);
CREATE TABLE IF NOT EXISTS `book`(
`bookid` INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
`card` INT (10) UNSIGNED NOT NULL
);
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO class(card)VALUES(FLOOR(1+(RAND()*20)));
 
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO book(card)VALUES(FLOOR(1+(RAND()*20)));
```





**性能分析：**

```mysql
mysql> EXPLAIN SELECT * FROM class LEFT JOIN book ON class.card = book.card;
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+----------------------------------------------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra                                              |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+----------------------------------------------------+
|  1 | SIMPLE      | class | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   20 |   100.00 | NULL                                               |
|  1 | SIMPLE      | book  | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   20 |   100.00 | Using where; Using join buffer (Block Nested Loop) |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+----------------------------------------------------+
2 rows in set, 1 warning (0.00 sec)

```



**结果：type 为 all**



---



**优化：添加索引**



**左连接将索引添加到右表上，type会扫一个ALL！**



```mysql
mysql> create index idx_card on book(card);
Query OK, 0 rows affected (0.10 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> EXPLAIN SELECT * FROM class LEFT JOIN book ON class.card = book.card;
+----+-------------+-------+------------+------+---------------+----------+---------+-----------------+------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key      | key_len | ref             | rows | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+----------+---------+-----------------+------+----------+-------------+
|  1 | SIMPLE      | class | NULL       | ALL  | NULL          | NULL     | NULL    | NULL            |   20 |   100.00 | NULL        |
|  1 | SIMPLE      | book  | NULL       | ref  | idx_card      | idx_card | 4       | db02.class.card |    1 |   100.00 | Using index |
+----+-------------+-------+------------+------+---------------+----------+---------+-----------------+------+----------+-------------+
2 rows in set, 1 warning (0.01 sec)
```



**左连接将索引添加到右表上，type会扫一个ALL！**



```mysql
mysql> drop index idx_card on book;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> create index idx_card on class(card);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> EXPLAIN SELECT * FROM class LEFT JOIN book ON class.card = book.card;
+----+-------------+-------+------------+-------+---------------+----------+---------+------+------+----------+----------------------------------------------------+
| id | select_type | table | partitions | type  | possible_keys | key      | key_len | ref  | rows | filtered | Extra                                              |
+----+-------------+-------+------------+-------+---------------+----------+---------+------+------+----------+----------------------------------------------------+
|  1 | SIMPLE      | class | NULL       | index | NULL          | idx_card | 4       | NULL |   20 |   100.00 | Using index                                        |
|  1 | SIMPLE      | book  | NULL       | ALL   | NULL          | NULL     | NULL    | NULL |   20 |   100.00 | Using where; Using join buffer (Block Nested Loop) |
+----+-------------+-------+------------+-------+---------------+----------+---------+------+------+----------+----------------------------------------------------+
2 rows in set, 1 warning (0.00 sec)
```



----



**结论：** 可以看到第二行的type变为了index, rows也变成了原来的20。

这是由左连接特性决定的。

**LEFT JOIN 条件用于确定如何从右表搜索行, 左边一定都有，所以右边是我们的关键点,一定需要建立索引。**

**RIGHT JOIN 条件用于确定如何从左表搜索行, 右边一定都有, 所以左边是我们的关键点,一定需要建立索引。**





### 1.3、三表



**建表SQL：**



```mysql
CREATE TABLE IF NOT EXISTS `phone`(
`phoneid` INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
`card` INT (10) UNSIGNED NOT NULL
)ENGINE = INNODB;

INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
INSERT INTO phone(card)VALUES(FLOOR(1+(RAND()*20)));
```





**性能分析：**

```mysql
mysql> explain SELECT * FROM class LEFT JOIN book ON class.card=book.card inner JOIN phone ON book.card = phone.card;
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+----------------------------------------------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra                                              |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+----------------------------------------------------+
|  1 | SIMPLE      | class | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   20 |   100.00 | NULL                                               |
|  1 | SIMPLE      | book  | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   20 |    10.00 | Using where; Using join buffer (Block Nested Loop) |
|  1 | SIMPLE      | phone | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   20 |    10.00 | Using where; Using join buffer (Block Nested Loop) |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+----------------------------------------------------+
3 rows in set, 1 warning (0.00 sec)
```





**结果：type都为ALL，全表扫描**



----



**优化：添加索引**



```mysql
mysql> create index idx_book on book(card);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> create index idx_phone on phone(card);
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> explain SELECT * FROM class LEFT JOIN book ON class.card=book.card inner JOIN phone ON book.card = phone.card;
+----+-------------+-------+------------+------+---------------+-----------+---------+-----------------+------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key       | key_len | ref             | rows | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+-----------+---------+-----------------+------+----------+-------------+
|  1 | SIMPLE      | class | NULL       | ALL  | NULL          | NULL      | NULL    | NULL            |   20 |   100.00 | Using where |
|  1 | SIMPLE      | book  | NULL       | ref  | idx_book      | idx_book  | 4       | db02.class.card |    1 |   100.00 | Using index |
|  1 | SIMPLE      | phone | NULL       | ref  | idx_phone     | idx_phone | 4       | db02.class.card |    1 |   100.00 | Using index |
+----+-------------+-------+------------+------+---------------+-----------+---------+-----------------+------+----------+-------------+
3 rows in set, 1 warning (0.00 sec)
```



**结论：**

后⒉行的 type 都是ref且总rows优化很好,效果不错。因此索引最好设置在需要经常查询的字段中。





### 1.4、JOIN优化总结



- 尽可能减少Join语句中的NestedLoop（嵌套）的循环总次数;“永远用小结果集驱动大的结果集”。（小表驱动大表）
- 优先优化NestedLoop的内层循环
- 保证Join语句中被驱动表上Join条件字段已经被索引
- 当无法保证被驱动表的Join条件字段被索引且内存资源充足的前提下，不要太吝惜JoinBuffer的设置







## 2、索引失效避免





**建表SQL：**



```mysql
# 建表
CREATE TABLE staffs(
id INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(24)NOT NULL DEFAULT'' COMMENT'姓名',
`age` INT NOT NULL DEFAULT 0 COMMENT'年龄',
`pos` VARCHAR(20) NOT NULL DEFAULT'' COMMENT'职位',
`add_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT'入职时间'
)CHARSET utf8 COMMENT'员工记录表';

# 插入值
insert into staffs(NAME,age,pos,add_time) values('z3',22,'manager',NOW());
insert into staffs(NAME,age,pos,add_time) values('July',23,'dev',NOW());
insert into staffs(NAME,age,pos,add_time) values('2000',23,'dev',NOW());

# 建索引
create index idx_staffs_nameAgePos on staffs(name,age,pos);
```





### 2.1、全值匹配我最爱



**性能分析：**

```mysql
EXPLAIN SELECT * FROM staffs WHERE NAME = 'July';
EXPLAIN SELECT * FROM staffs WHERE NAME = 'July' AND age = 25;
EXPLAIN SELECT * FROM staffs WHERE NAME = 'July' AND age = 25 AND pos = 'dev';
```

**type都是ref，ref都是const，精度逐渐增加！**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/445668969f0a823486f571d5b8511539.png)



---



**性能分析：**



```mysql
explain SELECT * FROM staffs WHERE age = 23 AND pos = 'dev';
explain SELECT * FROM staffs WHERE pos = 'dev';
```



**type都变为了ALL！**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/9e5cdd60f8262236b0fdac5a25579bff.png)







**结论：符合索引顺序和用到的个数顺序一致，为最优，全值匹配我最爱！**





### 2.2、最佳左前缀法则



**如果索引了多例，要遵守最左前缀法则。指的是查询从索引的最左前列开始并且不跳过索引中的列。**



**带头大哥不能死！**





**性能分析：**

```mysql
explain SELECT * FROM staffs WHERE NAME = 'July' AND pos = 'dev';
```



很明显，使用到了索引，但是ref只有一个const，即中间出现了断层，索引部分失效！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/8b4898b4619b06ce4b135a0c97ddc12f.png)





**带头大哥不能死！中间兄弟不能断！**





### 2.3、索引列上少计算



不在索引列上做任何操作（计算、函数、（自动or手动）类型转换），会导致索引失效而转向全表扫描！



**性能分析：**

```mysql
explain SELECT * FROM staffs WHERE NAME = 'July';

# 函数引入
explain SELECT * FROM staffs WHERE left(name,4);
```



索引列增加函数后，type变为了ALL，性能下降！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/c9d1e92e1b7e9f18e0d40860391d98f8.png)











### 2.4、范围之后全失效



存储引擎不能使用索引中范围条件右边的列！



**性能分析：**



```mysql
explain SELECT * FROM staffs WHERE name = 'July' AND age > 25 AND pos = 'dev';
```



type变为了range，右边的pos将会失效！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/4ddc54ac2fa614924f606040d4c9f0f7.png)



### 2.5、覆盖索引不写星



**尽量使用覆盖索引**（只访问索引的查询（索引列和查询列一致）），减少select*操作！



**性能分析：**

```mysql
explain SELECT * FROM staffs WHERE name = 'July' AND age = 25 AND pos = 'dev';

explain SELECT name,age,pos FROM staffs WHERE name = 'July' AND age = 25 AND pos = 'dev';
explain SELECT name,age,pos FROM staffs WHERE name = 'July' AND age > 25 AND pos = 'dev';
explain SELECT name FROM staffs WHERE name = 'July' AND age = 25;
```



很明显多了一个using index，即使用了覆盖索引，比*更好！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/28e1a653048f47f485fa0db2a1bf49e9.png)



### 2.6、不等空值还有or



- mysql在使用不等于（!=或者<>）的时候无法使用索引会导致全表扫描
- is null,is not null 也无法使用索引
- 少用or,用它连接时会索引失效



**性能优化：**



```mysql
explain SELECT * FROM staffs WHERE name != 'July' ;
explain SELECT * FROM staffs WHERE name is null;
explain SELECT * FROM staffs WHERE name is not null;
explain SELECT * FROM staffs WHERE name = 'July' or name = 'z3';
```





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/5ff2d92ba62ba552c0d433585747f4db.png)





### 2.7、Like百分写最右



**like以通配符开头（'$abc...'）mysql索引失效会变成全表扫描操作！**





**性能优化：**



```mysql
explain SELECT * FROM staffs WHERE name like '%July%';
explain SELECT * FROM staffs WHERE name like '%July';
explain SELECT * FROM staffs WHERE name like 'July%';
```



like百分号加右边type会变为range，且使用上索引！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/a99d4908defc69c338aa7ab73d1cac7e.png)





----

**问题：解决like'%字符串%'索引不被使用的方法？？**

1. 可以使用主键索引
2. 使用覆盖索引，查询字段必须是建立覆盖索引字段
3. 当覆盖索引指向的字段是varchar(380)及380以上的字段时，覆盖索引会失效！





### 2.8、VAR引号不可丢



字符串不加单引号索引失效！



**性能分析：**





```mysql
explain SELECT * FROM staffs WHERE name = '2000';
explain SELECT * FROM staffs WHERE name = 2000;
```

发生了隐式类型转换，会导致索引失效！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/be4ded5e37da50f2106e981769f9269a.png)









## 3、一些案例





> 索引为c1，c2，c3，c4四个字段的复合索引！



- 对于全部是常量索引（const），顺序无影响，因为逻辑架构中MySQL底层优化器会进行优化顺序！但建议还是按照查询顺序去写，让优化器少做一些操作！
- 对于如下两种情况，第一种会用到三个索引，范围之后全失效，c4会用不到；但第二种会用到四个索引，因为MySQL底层优化器会对顺序进行调整优化，优化为和建索引顺序一致，因此会用到四个！





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/9b508cc387a5dd9398498faf116fad4a.png)





- 这种情况显示用到了两个索引，但其实用到了三个索引，第三个索引c3没有用于查找而是用于了排序！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/b7512c812aad3a865f2e480bd6b71ebb.png)



- 与上一个相似，会发现和c4没啥关系，因为c3用于了排序，走不到c4！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/a06eaf6065b061b81131987cb966dc57.png)





- 用到了两个索引，中间兄弟c3已断，还要使用c4排序，将会导致使用文件排序！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/1bf02bdc80c04e7c5428ad2906203f7d.png)





- 第一个用到了一个索引，c2,c3用于排序，无文件排序
- 第二个用到了一个索引，由于order by的顺序不会被MySQL优化顺序，因此会发生断层，MySQL底层使用文件排序！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/5bdb099e3b731cee074a553b15ef961b.png)





- 第一个用到了两个索引，无filesort，原因是c2 = a2，其实就是常量const，对常量排序毫无意义，因此最后的排序相当于order by c3，并没有断层出现
- 第二个用到了一个索引，产生了filesort，原因是order by顺序出现了断层

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/91154d481794d64dd28fad048e36f133.png)





- 都是只用了一个索引，由于断层会导致第二种情况会发生文件排序和临时表问题！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/ed345a44ef4696119ab5ebcec05b7869.png)







**总结：**

- 定值为常量、范围后失效还是排序，一般order by是给个范围
- group by 基本上都需要进行排序，顺序不当会有临时表产生（分组之前必排序）







![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/5a47a1ab257242b26b1f9c0971f16e5c.png)





## 4、一般性建议





1. 对于单键索引，尽量选择针对当前query过滤性更好的索引
2. 在选择组合索引的时候，当前Query中过滤性最好的字段在索引字段顺序中，位置越靠前越好。
3. 在选择组合索引的时候，尽量选择可以能包含当前query中的where子句中更多字段的索引
4. 尽可能通过分析统计信息和调整query的写法来达到选择合适索引的目的







## 5、索引优化口诀







1. 全值匹配我最爱，最左前缀要遵守
2. 带头大哥不能死，中间兄弟不能断
3. 索引列上少计算，范围之后全失效
4. Like百分写最右，覆盖索引不写星
5. 不等空值还有or，索引失效要少用
6. 哇擦引号不可丢，SQL高级也不难！



注：哇擦表示varchar！







# 六、查询截取分析



**一般步骤如下：**

1. order by和group by的查询优化
2. 慢查询的开启并捕获
3. explain+慢SQL分析
4. show profile查询SQL在Mysql服务器里面的执行细节和生命周期情况
5. SQL数据库服务器的参数调优。



## 1、查询优化





### 1.1、小表驱动大表





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/8de33809473bc2325389dc1066c78342.png)





**其实就是sql的机读顺序问题。in的时候先执行扩号里的查询，所以括号里的表要小；exists的时候先执行外查询，所以括号外的表要小。**





1. EXISTS (subquey)**只返回TRUE或FALSE**，因此子查询中的SELECT * 也可以是SELECT 1 或select X，官方说法是实际执行时会忽略SELECT清单，因此没有区别
2. EXISTS子查询的实际执行过程可能经过了优化而不是我们理解上的逐条对比，如果担忧效率问题，可进行实际检验以确定是否有效率问题。
3. EXISTS子查询往往也可以用条件表达式、其他子查询或者JOIN来替代，何种最优需要具体问题具体分析





### 1.2、order by优化



**建表SQL：**

```mysql
create table tblA(
age int,
birth timestamp not null
);
 
insert into tblA(age,birth) values(22,now());
insert into tblA(age,birth)values(23,now());
insert into tblA(age,birth)values(24,now());

create index idx_A_ageBirth ON tblA(age,birth);
 
select * from tblA;
```





**性能分析：**



```mysql
EXPLAIN SELECT * FROM tblA WHERE age > 20 ORDER BY age;
EXPLAIN SELECT * FROM tblA WHERE age > 20 ORDER BY age,birth;

EXPLAIN SELECT * FROM tblA WHERE age > 20 ORDER BY birth;
EXPLAIN SELECT * FROM tblA WHERE age > 20 ORDER BY birth,age;
```



后两种出现了filesort文件排序！没有使用到age来排序或者排序字段顺序和索引顺序不一致导致！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/f0decb4eef607c38cc819e1e8fc84db1.png)



**其他情况：**

最后一种情况一个升序一个降序也会导致使用filesort文件索引！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/64dd06f64cc56641caa96366137251fd.png)







**总结：**



1. ORDER BY子句，尽量使用Index方式排序，避免使用FileSort方式排序
2. MySQL支持二种方式的排序，FileSort和Index, Index效率高。
3. ORDER BY满足两情况，会使用Index方式排序
   1. ORDER BY语句使用**索引最左前列**
   2. 使用where子句与Order By子句条件列组合满足**索引最左前列**
4. 尽可能在索引列上完成排序操作，遵照索引建的最佳左前缀





**如果不在索引列上，filesort有两种算法：**

**双路排序**：MySQL4.1之前是使用双路排序，字面意思是两次扫描磁盘，最终得到数据。**读取行指针和orderby列**，对他们进行排序，然后扫描已经排序好的列表，按照列表中的值重新从列表中读取对应的数据传输。从磁盘取排序字段，在buffer进行排序，再从磁盘取其他字段。

取一批数据，要对磁盘进行两次扫描，众所周知，I\O是很耗时的，所以在mysql4.1之后，出现了第二张改进的算法，就是单路排序。

**单路排序**：从磁盘读取查询需要的**所有列**，按照orderby列在buffer对它们进行排序，然后扫描排序后的列表进行输出，它的效率更快一些，避免了第二次读取数据，并且把随机IO变成顺序IO，但是它会**使用更多的空间**，因为它把每一行都保存在内存中了。

**结论及引申出的问题：**

- 由于单路是后出来的，总体而言好过双路
- 但是用单路有问题
  - 在sort_buffer中，单路比双路要多占用很多空间，因为单路是把所有字段都取出, 所以有可能取出的数据的总大小超出了sort_buffer的容量，导致每次只能取sort_buffer容量大小的数据，进行排序（创建tmp文件，多路合并），排完再取
  - sort_buffer容量大小，再排……从而多次I/O。本来想省一次I/O操作，反而导致了大量的I/O操作，反而得不偿失。





**提高Order By的速度：**

1. **Order by 时 select * 是一个大忌**，只Query需要的字段，这点非常重要。在这里的影响是:
   1. 当Query的字段大小总和小于 max_length_for_sort_data 而且排序字段不是 TEXTIBLOB 类型时，会用改进后的算法——单路排序，否则用老算法——多路排序。
   2. 两种算法的数据都有可能超出 sort_buffer 的容量，超出之后，会创建tmp文件进行合并排序，导致多次IO，但是用单路排序算法的风险会更大一些, 所以要提高 sort_buffer_size。
2. **尝试提高sort_buffer_size**不管用哪种算法，提高这个参数都会提高效率，当然，要根据系统的能力去提高，因为这个参数是针对每个进程的。
3. **尝试提高max_length_for_sort_data**提高这个参数，会增加用改进算法的概率。但是如果设的太高，数据总容量超出sort_buffer_size的概率就增大，明显症状是高的磁盘I/O活动和低的处理器使用率.



**为排序使用索引：**

1. MySql两种排序方式∶文件排序或扫描有序索引排序
2. MySql能为排序与查询使用相同的索引





**一个案例：**



简单解释一下第八个，b是范围，但是排序使用到了bc，对于bc来说，因为a为常量在，因此范围b不会影响！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/4aef9ff5159764a69211b5be6fa83bba.png)





### 1.3、group by优化



> 和order by类似，适用于order by的都适用于group by，但也有一些新的！



1. group by实质是先排序后进行分组，遵照索引建的最佳左前缀
2. 当无法使用索引列，增大max_length_for_sort_data参数的设置+增大sort_buffer_size参数的设置
3. where高于having, 能写在where限定的条件就不要去having限定了。



## 2、慢查询日志





### 2.1、是什么



1. MySQL的慢查询日志是MySQL提供的一种日志记录，它用来记录在MySQL中响应时间超过阀值的语句，具体指运行时间超过long_query_time值的SQL，则会被记录到慢查询日志中。
2. 具体指运行时间超过long_query_time值的SQL，则会被记录到慢查询日志中。long_query_time的默认值为10，意思是运行10秒以上的语句。
3. 由他来查看哪些SQL超出了我们的最大忍耐时间值，比如一条sql执行超过5秒钟，我们就算慢SQL，希望能收集超过5秒的sql，结合之前explain进行全面分析。



### 2.2、怎么用



**默认情况下，MySQL 数据库没有开启慢查询日志**，需要我们手动来设置这个参数。

当然，**如果不是调优需要的话，一般不建议启动该参数，因为开启慢查询日志会或多或少带来一定的性能影响。**

慢查询日志支持将日志记录写入文件。



**开启设置：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/caea6f0b3eaea02a0dee7cdc7ed13c22.png)



**永久生效修改配置文件：**

如永久生效需要修改配置文件 my.cnf 中[mysqld]下配置！

关于慢查询的参数slow_query_log_file，它指定慢查询日志文件的存放路径，系统默认会给一个缺省的文件host_name-slow.log (如果没有指定参数slow_query_log_file的话)

```shell
[mysqld]
slow_query_log=1
slow_query_log_file=/var/lib/mysql/xxxxx-slow.log
long_query_time=3
log_output=FILE
```



**那么开启慢查询日志后，什么样的SQL参会记录到慢查询里面？**

由参数 long_query_time控制，**大于**该值才会记录！

若使用set命令设置后查询发现没有生效，可以断开连接，重新连接即可！





**模拟线程睡眠达到设置的阈值：**

```mysql
select sleep(4);
```

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/dffd32ebda0f6bd7f531b305e3cfc92b.png)







**使用命令`show global status like '%Slow_queries%‘;`查询慢SQL条数！**





### 2.3、日志分析工具 mysqldumpslow





**查看mysqldumpslow的帮助信息：**

```shell
mysqldumpslow --help
```



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/df3d089baddab9513fc14799711c5476.png)





**参数介绍：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/10/eb69e7c669d97ae58e8204256dba45f3.png)



**常用命令：**

```shell
# 得到返回记录集最多的 10 个 SQL
mysqldumpslow -s r -t 10 /var/lib/mysql/atguigu-slow.log
# 得到访问次数最多的 10 个 SQL
mysqldumpslow -s c -t 10 /var/lib/mysql/atguigu-slow.log
# 得到按照时间排序的前 10 条里面含有左连接的查询语句
mysqldumpslow -s t -t 10 -g "left join" /var/lib/mysql/atguigu-slow.log
# 另外建议在使用这些命令时结合 | 和 more 使用 ，否则有可能出现爆屏情况
mysqldumpslow -s r -t 10 /var/lib/mysql/atguigu-slow.log | more
```













## 3、批量数据脚本





### 3.1、建表SQL

```mysql
create table dept(
id int unsigned primary key auto_increment,
deptno mediumint unsigned not null default 0,
dname varchar(20) not null default "",
loc varchar(13) not null default ""
)engine=innodb default charset=GBK;

CREATE TABLE emp(
id int unsigned primary key auto_increment,
empno mediumint unsigned not null default 0,
ename varchar(20) not null default "",
job varchar(9) not null default "",
mgr mediumint unsigned not null default 0,
hiredate date not null,
sal decimal(7,2) not null,
comm decimal(7,2) not null,
deptno mediumint unsigned not null default 0
)ENGINE=INNODB DEFAULT CHARSET=GBK;
```





### 3.2、设置参数



在执行创建函数之前，首先请保证 log_bin_trust_function_creators 参数为 1，即 on 开启状态。否则会报错：



- 查询：`show variables like 'log_bin_trust_function_creators';`
- 设置：`set global log_bin_trust_function_creators=1;`

当然，如上设置只存在于当前操作，想要永久生效，需要写入到配置文件中：在[mysqld]中加上 `log_bin_trust_function_creators=1`



### 3.3、编写随机函数



> 要求：随机产生字符串和部门编号！



**删除函数：`drop function 函数名;`**

```mysql
//函数
delimiter $$
create function ran_string(n int) returns varchar(255)
begin
declare chars_str varchar(100) default 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
declare return_str varchar(255) default '';
declare i int default 0;
while i < n do
set return_str = concat(return_str,substring(chars_str,floor(1+rand()*52),1));
set i=i+1;
end while;
return return_str;
end $$
//函数
delimiter $$
create function rand_num() returns int(5)
begin
declare i int default 0;
set i=floor(100+rand()*10);
return i;
end $$
```





### 3.4、创建存储过程



> 往两张表中插入随机数据！



**删除存储过程：`drop procedure rand_string;`**



```mysql
//存储过程
delimiter $$ 
create procedure insert_emp(in start int(10),in max_num int(10))
begin
declare i int default 0;
set autocommit = 0;
repeat
set i = i+1;
insert into emp(empno,ename,job,mgr,hiredate,sal,comm,deptno) values((start+i),ran_string(6),'salesman',0001,curdate(),2000,400,rand_num());
until i=max_num
end repeat;
commit;
end $$
//存储过程
delimiter $$ 
create procedure insert_dept(in start int(10),in max_num int(10))
begin
declare i int default 0;
set autocommit = 0;
repeat
set i = i+1;
insert into dept(deptno,dname,loc) values((start+i),ran_string(10),ran_string(8));
until i=max_num
end repeat;
commit;
end $$
```



### 3.5、调用存储过程



> 调用存储过程执行批量插入！



```mysql
delimiter ;
call insert_dept(100, 10);

# 添加50w条数据试试！
delimiter ;
call insert_emp(100001, 500000);

# Query OK, 0 rows affected (1 min 6.83 sec)
# 查询测试
select * from emp;
# 500000 rows in set (1.29 sec)
```





## 4、show profiles





### 4.1、是什么



是mysql提供可以用来分析当前会话中语句执行的资源消耗情况。



默认情况下，参数处于关闭状态，并保存最近15次的运行结果







### 4.2、分析步骤



**查看是否开启：**

```mysql
mysql> show variables like '%profiling%';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| have_profiling         | YES   |
| profiling              | OFF   |
| profiling_history_size | 15    |
+------------------------+-------+
3 rows in set (0.00 sec)
```



**开启功能，默认是关闭：**



```mysql
mysql> set profiling=1;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```



**运行SQL：**



```mysql
select * from t_emp;
select * from t_emp e inner join t_dept d where e.id = d.id;

# 如下两句会报错，如果在 SELECT 中的列，没有在 GROUP BY 中出现，那么这个 SQL 是不合法的，因为列不在 GROUP BY 从句中
# 需要开启sql_mode语法规则校验的一些设置 ONLY_FULL_GROUP_BY
select * from emp group by id%10 limit 150000;
# order by 5是按照第五列字段排序
select * from emp group by id%20 order by 5;
....
```



---



**sql_mode补充：**



> **sql_mode 定义了对 Mysql 中 sql 语句语法的校验规则！**
> sql_mode 是个很容易被忽视的变量，默认值是空值，在这种设置下是可以允许一些非法操作的，比如允许一些非法数据的插入。在生产环境必须将这个值设置为严格模式，所以开发、测试环境的数据库也必须要设置，这样在开发测试阶段就可以发现问题。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/8bc75ef1a0d61ac524ac0644af041b4b.png)





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/80c85bc4c15979c66145cbd93c1f2734.png)



```mysql
mysql> select @@sql_mode\G
*************************** 1. row ***************************
@@sql_mode: ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
1 row in set (0.00 sec)
```



- 查看当前的 sql_mode: `select @@sql_mode;`
- 临时修改 sql_mode: `set @@sql_mode=’’;`
- 永久修改，需要在配置文件 my.cnf 中修改：`[mysqld] 下添加 sql_mode='' 然后重启 mysql 即可`



---

**查看结果：**



```mysql
mysql> show profiles;
+----------+------------+-----------------------------------------------------------------+
| Query_ID | Duration   | Query                                                           |
+----------+------------+-----------------------------------------------------------------+
|        3 | 0.00016450 | select * from tbl_emp e inner join tbl_dept d where e.id = d.id |
|        4 | 0.00442350 | show databases                                                  |
|        5 | 0.00285875 | SELECT DATABASE()                                               |
|        6 | 0.00025075 | show tables                                                     |
|        7 | 0.00019325 | select * from t_emp                                             |
|        8 | 0.00025050 | select * from t_emp e inner join t_dept d where e.id = d.id     |
|        9 | 0.00019025 | select * from book                                              |
|       10 | 0.00016150 | select * from emp group by id%10 limit 150000                   |
|       11 | 0.00014275 | select * from emp group by id%20 order by 5                     |
|       12 | 0.00012525 | select @@sql_mode                                               |
|       13 | 0.00011350 | select @@sql_mode                                               |
|       14 | 0.00542925 | set sql_mode = ''                                               |
|       15 | 0.00012400 | select @@sql_mode                                               |
|       16 | 1.23153325 | select * from emp group by id%10 limit 150000                   |
|       17 | 1.17108425 | select * from emp group by id%20 order by 5                     |
+----------+------------+-----------------------------------------------------------------+
15 rows in set, 1 warning (0.00 sec)
```





**诊断SQL，`show profile cpu,block io for query query_id;`**



```mysql
mysql> show profile cpu,block io for query 16;
+----------------------+----------+----------+------------+--------------+---------------+
| Status               | Duration | CPU_user | CPU_system | Block_ops_in | Block_ops_out |
+----------------------+----------+----------+------------+--------------+---------------+
| starting             | 0.000081 | 0.000000 |   0.000076 |            0 |             0 |
| checking permissions | 0.000006 | 0.000000 |   0.000006 |            0 |             0 |
| Opening tables       | 0.000016 | 0.000000 |   0.000016 |            0 |             0 |
| init                 | 0.000023 | 0.000000 |   0.000023 |            0 |             0 |
| System lock          | 0.000005 | 0.000000 |   0.000006 |            0 |             0 |
| optimizing           | 0.000003 | 0.000000 |   0.000002 |            0 |             0 |
| statistics           | 0.000027 | 0.000000 |   0.000027 |            0 |             0 |
| preparing            | 0.000011 | 0.000000 |   0.000011 |            0 |             0 |
| Creating tmp table   | 0.003520 | 0.000000 |   0.000576 |         6568 |             0 |
| Sorting result       | 0.000009 | 0.000000 |   0.000006 |            0 |             0 |
| executing            | 0.000002 | 0.000000 |   0.000002 |            0 |             0 |
| Sending data         | 1.227710 | 0.819174 |   0.142815 |         7032 |             0 |
| Creating sort index  | 0.000069 | 0.000057 |   0.000003 |            0 |             0 |
| end                  | 0.000004 | 0.000003 |   0.000000 |            0 |             0 |
| query end            | 0.000007 | 0.000006 |   0.000001 |            0 |             0 |
| removing tmp table   | 0.000005 | 0.000004 |   0.000000 |            0 |             0 |
| query end            | 0.000003 | 0.000003 |   0.000000 |            0 |             0 |
| closing tables       | 0.000005 | 0.000005 |   0.000000 |            0 |             0 |
| freeing items        | 0.000016 | 0.000016 |   0.000001 |            0 |             0 |
| cleaning up          | 0.000013 | 0.000012 |   0.000001 |            0 |             0 |
+----------------------+----------+----------+------------+--------------+---------------+
20 rows in set, 1 warning (0.00 sec)
```





**可以查看的选项：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/0c069fe0782c787b6a0a89bb07910dc0.png)







### 4.3、结论分析

> 入下几种情况必须要优化！

- converting HEAP to MyISAM：查询结果太大，内存都不够用了往磁盘上搬了。
- Creating tmp table：创建临时表，拷贝数据到临时表，用完再删除。
- Copying to tmp table on disk：把内存中临时表复制到磁盘，危险！！！
- locked



**下面的例子，就发生了创建临时表问题：**

```mysql
mysql> show profile cpu,block io for query 16;
+----------------------+----------+----------+------------+--------------+---------------+
| Status               | Duration | CPU_user | CPU_system | Block_ops_in | Block_ops_out |
+----------------------+----------+----------+------------+--------------+---------------+
| starting             | 0.000081 | 0.000000 |   0.000076 |            0 |             0 |
| checking permissions | 0.000006 | 0.000000 |   0.000006 |            0 |             0 |
| Opening tables       | 0.000016 | 0.000000 |   0.000016 |            0 |             0 |
| init                 | 0.000023 | 0.000000 |   0.000023 |            0 |             0 |
| System lock          | 0.000005 | 0.000000 |   0.000006 |            0 |             0 |
| optimizing           | 0.000003 | 0.000000 |   0.000002 |            0 |             0 |
| statistics           | 0.000027 | 0.000000 |   0.000027 |            0 |             0 |
| preparing            | 0.000011 | 0.000000 |   0.000011 |            0 |             0 |
| Creating tmp table   | 0.003520 | 0.000000 |   0.000576 |         6568 |             0 |
| Sorting result       | 0.000009 | 0.000000 |   0.000006 |            0 |             0 |
| executing            | 0.000002 | 0.000000 |   0.000002 |            0 |             0 |
| Sending data         | 1.227710 | 0.819174 |   0.142815 |         7032 |             0 |
| Creating sort index  | 0.000069 | 0.000057 |   0.000003 |            0 |             0 |
| end                  | 0.000004 | 0.000003 |   0.000000 |            0 |             0 |
| query end            | 0.000007 | 0.000006 |   0.000001 |            0 |             0 |
| removing tmp table   | 0.000005 | 0.000004 |   0.000000 |            0 |             0 |
| query end            | 0.000003 | 0.000003 |   0.000000 |            0 |             0 |
| closing tables       | 0.000005 | 0.000005 |   0.000000 |            0 |             0 |
| freeing items        | 0.000016 | 0.000016 |   0.000001 |            0 |             0 |
| cleaning up          | 0.000013 | 0.000012 |   0.000001 |            0 |             0 |
+----------------------+----------+----------+------------+--------------+---------------+
20 rows in set, 1 warning (0.00 sec)
```







## 5、全局查询日志



> 永远不要在生产环境开启这个功能！



**配置开启：**



配置文件中永久开启：

```shell
# 在mysql的my.cnf中，设置如下:#开启
general_log=1
# 记录日志文件的路径
eral_log _file=/path/logfile #输出格式
log_output=FILE
```



临时开启：

```mysql
set global general_log=1;
set global log_output='TABLE';
# 此后，你所编写的sql语句，将会记录到mysql库里的general_log表，可以用下面的命令查看：
select * from mysql.general_log;
```





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/610673f29339c9d71688d248b661e450.png)





# 七、MySQL锁机制







## 1、锁的定义





锁是计算机协调多个进程或线程并发访问某一资源的机制！

在数据库中，除传统的计算资源（如CPU、RAM、IO等）的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。











## 2、锁的分类





**从数据操作的类型（读、写）分：**

- 读锁（**共享锁**）：针对同一份数据，多个读操作可以同时进行而不会互相影响
- 写锁（**排它锁**）：当前写操作没有完成前，它会阻断其他写锁和读锁。

**从对数据操作的颗粒度**

- 表锁
- 行锁



## 3、表锁（偏读）



### 3.1、特点



**偏向MyISAM存储引擎**，开销小，加锁快，无死锁，锁定粒度大，发生锁冲突的概率最高，并发最低！



### 3.2、案例分析



**建表SQL：**

以MyISAM引擎为例！

```mysql
create table mylock (
id int not null primary key auto_increment,
name varchar(20) default ''
) engine myisam;

insert into mylock(name) values('a');
insert into mylock(name) values('b');
insert into mylock(name) values('c');
insert into mylock(name) values('d');
insert into mylock(name) values('e');
```



**常用命令：**

```mysql
# 查看表上加过的锁:
show open tables;

# 手动增加表锁：
lock table表名字read(write), 表名字2 read(write), 其它;

# 释放全部表锁:
unlock tables;

# 分析表锁定：
# 可以通过检查table_locks_waited和table_locks_immediate状态变量来分析系统上的表锁定:
show status like 'table%';

mysql> show status like 'table%';
+----------------------------+-------+
| Variable_name              | Value |
+----------------------------+-------+
| Table_locks_immediate      | 110   |
| Table_locks_waited         | 0     |
| Table_open_cache_hits      | 11    |
| Table_open_cache_misses    | 13    |
| Table_open_cache_overflows | 0     |
+----------------------------+-------+
5 rows in set (0.01 sec)
```



- Table_locks_immediate：产生表级锁定的次数，表示可以立即获取锁的查询次数，每立即获取锁值加1 
- Table_locks_waited：出现表级锁定争用而发生等待的次数(不能立即获取锁的次数，每等待一次锁值加1，此值高则说明存在着较，严重的表级锁争用情况



此外，**Myisam的读写锁调度是写优先**，这也是**myisam不适合做写为主表的引擎**。因为写锁后，其他线程不能做任何操作，大量的更新会使查询很难得到锁，从而造成**永远阻塞**。







**读锁共享：**



unlock后才会结束阻塞！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/247fb061482690de76973ceca0d09a1d.png)





**结果：**

- 当前session可以查询该表记录，但不能查询其他没有加锁表记录，不能对该表进行写操作！
- 其他session可以查询该表记录，也可查询其他表记录，如果对该表进行写操作会发生阻塞，直到原来表释放锁解除，写操作完成！



**写锁排他：**

unlock后才会结束阻塞！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/ecb38d4b5b17c910143e2f178dd4f98a.png)







**结果：**

- 当前session可以进行读写操作，但是不能查询其他没加锁表记录
- 其他session可以对其他表进行读写，但不能对该表进行读写操作









**总结：**

- MyISAM在执行查询语句(SELECT）前，会自动给涉及的所有表加读锁，在执行增删改操作前，会自动给涉及的表加写锁。
- **简而言之，就是读锁会阻塞写，但是不会堵塞读。而写锁则会把读和写都堵塞。**





## 4、行锁（偏写）





### 4.1、特点



- 偏向**InnoDB存储引擎**，开销大，加锁慢；会出现死锁；锁定粒度最小，发生锁冲突的概率最低，并发度也最高。
- InnoDB与MyISAM的最大不同有两点：一是支持事务（TRANSACTION），二是采用了行级锁



### 4.2、案例分析



> 为了使得行锁生效，得保证条件中的列为建了索引的列！



**建表SQL：**

```mysql
CREATE TABLE test_innodb_lock (a INT(11),b VARCHAR(16))ENGINE=INNODB;

# 插入数据
INSERT INTO test_innodb_lock VALUES(1,'b2');
INSERT INTO test_innodb_lock VALUES(3,'3');
INSERT INTO test_innodb_lock VALUES(4, '4000');
INSERT INTO test_innodb_lock VALUES(5,'5000');
INSERT INTO test_innodb_lock VALUES(6, '6000');
INSERT INTO test_innodb_lock VALUES(7,'7000');
INSERT INTO test_innodb_lock VALUES(8, '8000');
INSERT INTO test_innodb_lock VALUES(9,'9000');
INSERT INTO test_innodb_lock VALUES(1,'b1');

# 创建索引
CREATE INDEX test_innodb_a_ind ON test_innodb_lock(a);
CREATE INDEX test_innodb_lock_b_ind ON test_innodb_lock(b);

------------------------------------------------------------
# 关闭自动提交，不进行自动提交，相当于默认加了行锁！
SET autocommit=0;
------------------------------------------------------------
```



**行锁同一行阻塞，不同行无影响：**



commit后阻塞才会结束！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/a3dee9fe2d67077587c5518a8681812c.png)



---



**索引失效行锁升级为表锁：**



本来锁的是同一行，现在不同行也锁了，成为了表锁！

原因就是b为varchar类型，前面讲到过这个类型**必须**加单引号，不加就会造成**索引失效**，索引失效就会导致行锁失效，成为表锁！



这就是最危险的，还是不知情情况下发生的，会导致其他操作长时间阻塞等待，直到当前commit才可！

**拓展**：一旦对表进行全表扫描（索引失效），innodb的行锁就会自动变为表锁，保护表的记录，直到写操作完成并提交！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/c1935c50a6984fd9acd07a869cdde942.png)





---



**间隙锁：**



> 当我们用范围条件而不是相等条件检索数据，并请求共享或排他锁时，InnoDB会给符合条件的已有数据记录的索引项加锁，对于键值在条件范围内但并不存在的记录，叫做“间隙（GAP)”，InnoDB也会对这个“间隙”加锁，这种锁机制就是所谓的间隙锁（Next-Key锁）。



**会造成的问题：**

- 因为Query执行过程中通过过范围查找的话，他会锁定整个范围内所有的索引键值，即使这个键值并不存在。间隙锁有一个比较致命的弱点，就是当锁定一个范围键值之后，即使某些不存在的键值也会被无辜的锁定。
- 而造成在锁定的时候无法插入锁定键值范围内的任何数据。在某些场景下这可能会对性能造成很大的危害。



**但是间隙锁会完全解决幻读问题！**



本来没有a=2的行，但是在左边修改后，右边插入a=2的数据竟然可以发生阻塞！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/0747ad598a2279882c35a5a2eedbb674.png)



---

**面试中常考如何锁定一行：**

for update等于加了锁，直到当前会话提交后才会释放锁！

```mysql
select * from test_innodb_lock where a=8 for update;
```



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/55b0d3571ad776bf9d4c36c2655a8fa2.png)



---

**查看系统变量分析行锁：**

```mysql
mysql> show status like 'innodb_row_lock%';
+-------------------------------+--------+
| Variable_name                 | Value  |
+-------------------------------+--------+
| Innodb_row_lock_current_waits | 0      |
| Innodb_row_lock_time          | 204071 |
| Innodb_row_lock_time_avg      | 51017  |
| Innodb_row_lock_time_max      | 51029  |
| Innodb_row_lock_waits         | 4      |
+-------------------------------+--------+
5 rows in set (0.01 sec)
```



**对各个状态量的说明如下:**

Innodb_row_lock_current_waits：**当前正在等待锁定的数量**（等待总次数）

Innodb_row_lock_time：从系统启动到现在锁定总时间长度（等待总时长）

Innodb_row_lock_time_avg：每次等待所花平均时间（等待平均时长）

Innodb_row_lock_time_max：从系统启动到现在等待最常的一次所花的时间;Innodb_row_lock_waits:系统启动后到现在总共等待的次数



尤其是当等待次数很高，而且每次等待时长也不小的时候，我们就需要分析（`show profiles;`）系统中为什么会有如此多的等待，然后根据分析结果着手指定优化计划。



---



**优化建议：**

1. 尽可能让所有数据检索都通过索引来完成，避免无索引行锁升级为表锁
2. 合理设计索引，尽量缩小锁的范围
3. 尽可能较少检索条件，避免间隙锁
4. 尽量控制事务大小，减少锁定资源量和时间长度
5. 尽可能低级别事务隔离



## 5、页锁（了解）



> 开销和加锁时间界于表锁和行锁之间：会出现死锁！
>
> 锁定粒度界于表锁和行锁之间，并发度一般！





# 八、主从复制







## 1、复制的基本原理



> 类似redis的主从复制！



slave会从master读取binlog来进行数据同步：

1. master将改变记录到二进制日志（binary log）。这些记录过程叫做二进制日志时间，binary log events
2. slave将master的binary log ebents拷贝到它的中继日志（relay log）
3. slave重做中继日志中的时间，将改变应用到自己的数据库中。**MySQL复制是异步的且串行化的**





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/12/c1af741f6b1922fdf0a7920c9e2468c0.png)





## 2、复制的基本原则


​	

1. 每个slave只有一个master
2. 每个slave只能有一个唯一的服务器ID
3. 每个master可以有多个salve







## 3、一主一从配置



> window为主机，linux为从机！
>
> 由于我使用云服务器且本地windows的MySQL版本不一致，因此，配置过程仅用于记录！



1. mysql 版本一致且后台以服务运行
2. 主从都配置在[mysqld]结点下，都是小写





**1、主机配置项：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/13/f8dae72f10efef10fdca5f5f19595943.png)



**my.ini文件：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/13/b17d3b3819938b3c69c1eb2cfaf69b57.png)





```mysql
主服务器唯一 ID
server-id=1
启用二进制日志
log-bin=自己本地的路径/data/mysqlbin
log-bin=D:/devSoft/MySQLServer5.5/data/mysqlbin
设置不要复制的数据库
binlog-ignore-db=mysql
设置需要复制的数据库
binlog-do-db=需要复制的主数据库名字
设置 logbin 格式
binlog_format=STATEMENT（默认）
```







**2、从机修改my.cnf配置文件：**

- 从服务器唯一ID（必须）
- 启用二进制文件（可选）



```mysql
#从机服务 id
server-id = 2
#注意 my.cnf 中有 server-id = 1
#设置中继日志
relay-log=mysql-relay
```





**3、因修改过配置文件，请主机+从机都启动后台mysql服务！**



**4、主机从机都关闭防火墙**

- windows手动关闭
- 关闭虚拟机linux防火墙`systemctl stop firewalld.service`



**5、在Windows主机上简历账户并授权slave**

记录下File（日志文件）和Position（位置，从哪开始复制）的值，下一步使用！

执行完此步骤后不要再操作主服务器 MYSQL，防止主服务器状态值变化！

若报错，可运行stop slave停止原来的从机复制，注意查看状态后状态值将会发生变化，记得用新的值grant！

```mysql
GRANT REPLICATION SLAVE  ON *.* TO 'zhangsan'@'从机器数据库IP‘ IDENTIFIED BY '123456';
flush privileges;
# 查询master的状态
show master status；
```



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/13/4a8cb3cbd30c7f82b4118e4a0f0a8d34.png)





**6、在 Linux 从机上配置需要复制的主机**





```mysql
#查询 master 的状态
CHANGE MASTER TO MASTER_HOST='主机 IP',MASTER_USER='创建用户名',MASTER_PASSWORD='创建的密码', MASTER_LOG_FILE='File 名字',MASTER_LOG_POS=Position 数字;
```



**7、启动从服务器复制功能**



```mysql
start slave;
show slave status\G
```





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/09/13/9da738dd5edcea88ad866fc9d9bbd444.png)



下面两个参数都是 Yes，则说明主从配置成功！

```mysql
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```



**8、主机新建库、新建表、insert 记录，从机复制**



**9、如何停止从服务复制功能**



```mysql
stop slave;
```
