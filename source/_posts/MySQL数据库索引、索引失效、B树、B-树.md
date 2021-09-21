---
title: MySQL数据库索引、索引失效、B树、B+树、聚簇索引、非聚簇索引
author: ITNXD
toc: true
abbrlink: 6406
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@487db38b807cb664754f8da6f5278b50bbe5d9f3/2021/09/13/6f9a05265d5267b2a5cfcc173404af27.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@487db38b807cb664754f8da6f5278b50bbe5d9f3/2021/09/13/6f9a05265d5267b2a5cfcc173404af27.png
categories:
  - 数据库
  - 索引
tags:
  - B树
  - B+树
  - 索引
date: 2021-09-13 16:28:30
updated:
---







# 一、索引数据结构介绍







> tips：[旧金山大学官网有可视化数据结构供我们使用！](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
>
> 都以插入1-10这10个数字为例！



## 1、哈希索引



> 可视化哈希索引，[https://www.cs.usfca.edu/~galles/visualization/ClosedHash.html](https://www.cs.usfca.edu/~galles/visualization/ClosedHash.html)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@1a8fe7dec32f13598127d5eef983419d9c3230da/2021/09/13/74d905cbddf326015d438798fa501466.png)



可以发现查找可以直接找到，因为是计算了哈希值，可以直接找到！效率非常高！

**但是，为什么MySQL没有使用这种数据结构了？**

- 哈希值是无序的，不能进行范围查找
- 不能进行排序
- 哈希冲突，比对，可能发生全表扫描





## 2、平衡二叉树



>可视化平衡二叉树，[https://www.cs.usfca.edu/~galles/visualization/AVLtree.html](https://www.cs.usfca.edu/~galles/visualization/AVLtree.html)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8f2d11249521c6d56542260a90c22942abfc9c2a/2021/09/13/a97e98371841d1114faac40f04edd0dd.png)

**查找10的过程：** 也仅仅比了四次！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6760c045cafa9b4c97e4e3d319e321b818cf42b2/2021/09/13/d8bdb527e626d03f73aba03971057a8e.png)



**缺点：**

- 随着数据量的增大，树的高度也会增加，查找速度会越来越慢
- 还有一个致命缺点，若查找大于5的范围，他将会先找到5再进行回旋查找大于5的数，若大于5的数非常多，将会导致非常的慢





## 3、B树



> 可视化B树，[https://www.cs.usfca.edu/~galles/visualization/BTree.html](https://www.cs.usfca.edu/~galles/visualization/BTree.html)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@0ae921ec5192486d179f15d82e349edfe6812492/2021/09/13/e231111d9753c9f163a1955d7ba46978.png)



**优点**：由于一个节点存储的大于一个值，因此树高会变矮，变矮就表示查询次数会少很多！



**缺点：**

同样存在回旋查找的问题，查找大于5仍然会进行回旋查找浪费时间！





## 4、B+树



> 可视化B+树，[https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a90843641c49cff2564b840ed452bbdd7504c0b4/2021/09/13/03cb14f93a39d9651e497010d8f714bc.png)





**与B树不同**，他的非叶子节点只存储key，不存储value。叶子节点存储key和value！

这里的value指的是内存地址！

**注意**：这里的1和10兼具叶子节点和非叶子节点特点，成为了二者共用，

且叶子节点都以**链表**形式相连！**且有序！**

**优点：解决了上面的回旋查找的问题！**







# 二、索引失效分析





**联合索引B+树结构！**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9e79a51cb388d021ec3a41cfa56e5bfda596fb53/2021/09/13/e05faa617ea161b29111391539dcbba3.png)







## 1、联合索引



**从上图来看，会发现该数据结构的特点：**

- 联合索引是按照顺序一个个排序的，即a有序，在a有序的情况下b有序





## 2、索引失效分析





1. 最佳左前缀原因：因为它是索引顺序一个个排序的，若前面某个索引列没有使用到，那么对于B+数的叶子节点来说，叶子节点就完全是无序的，因此索引就完全失效了，只能进行全表扫描！
2. 范围之后全失效：例如找a>1的数据，会发现a>1的数据中b是无序的，因此索引失效，只能进行全表扫描。因为只有a相同的情况下b才是有序的！否则无序！
3. like的%号左边、两边索引失效：和最佳左前缀法则一样，也是从左到右进行排序的，放左边和两边会导致之前的无法先排序之前的，导致后面的数据全部无序，只能进行全表扫描！



**注意**：这里的无序不仅仅指B+树的叶子节点无序，非叶子节点同样是无序的！













# 三、MyIsam和InnoDB常见区别



## 事务方面

InnoDB 支持事务，MyISAM 不支持事务。这是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重要原因之一。



## 外键方面

InnoDB 支持外键，而 MyISAM 不支持。对一个包含外键的 InnoDB 表转为 MYISAM 会失败。



## 索引层面

**InnoDB 是聚集（聚簇）索引，MyISAM 是非聚集（非聚簇）索引。**

MyISAM支持 FULLTEXT类型的全文索引， InnoDB不支持FULLTEXT类型的全文索引，但是InnoDB可以使用sphinx插件支持全文索引，并且效果更好。



## 锁粒度方面

**InnoDB 最小的锁粒度是行锁，MyISAM 最小的锁粒度是表锁。**

一个更新语句会锁住整张表，导致其他查询和更新都会被阻塞，因此并发访问受限。

这也是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重要原因之一。



## 硬盘存储结构

`MyISAM`在磁盘上存储成三个文件。第一个文件的名字以表的名字开始，扩展名指出文件类型。

- `.frm`文件存储`表的定义`。
- `数据文件`的扩 展名为`.MYD` (MYData)。
- `索引文件`的扩 展名是`.MYI` (MYIndex)。

`Innodb`存储引擎存储数据库数据，一共有两个文件(没有专门保存数据的文件)：

- `Frm文件`：表的定义文件。
- `Ibd文件`：数据和索引存储文件。数据以主键进行聚集存储，把真正的数据保存在叶子节点中。









# 四、聚簇索引和非聚簇索引







## 聚簇索引（InnoDB）



将`数据`存储与`索引`放到了一块，索引结构的`叶子节点`保存了`行数据`。

表数据按照索引的顺序来存储的，也就是说索引项的顺序与表中记录的物理顺序一致。

**InnoDB中，在聚簇索引之上创建的索引称之为辅助索引，像复合索引、前缀索引、唯一索引等等。**

- **聚簇索引默认是主键**
- 如果表中没有定义主键，InnoDB 会选择一个`唯一的非空索引`代替。
- 如果没有这样的索引，InnoDB 会在内部生成一个名为 `GEN_CLUST_INDEX` 的隐式的聚簇索引。





## 非聚簇索引（MyISAM）



将`数据`与`索引`分开存储，表数据存储顺序与索引顺序无关。







## 图解两大索引



**非聚簇索引存储结构：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d98a29b4b700065cf29b6412fb01645e3b2b1f3c/2021/09/13/64b50f96b0d97e4f3359b62fc0842019.png)





MyISAM的 B+树 的叶子节点上，记录的是真实数据的**存储地址**。

**比如通过主键id查询，MyISAM查询流程如下：**

- 根据id值在B+树上找到相应的叶子节点
- 取出叶子节点上的数据存储地址
- 根据数据存储地址，去找到相应的真实数据





**聚簇索引存储结构：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@487db38b807cb664754f8da6f5278b50bbe5d9f3/2021/09/13/6f9a05265d5267b2a5cfcc173404af27.png)





InnoDB的 B+树 的叶子节点上，记录的是**真实行数据**。

**比如通过主键id查询，InnoDB查询流程如下：**

**聚簇索引（主键索引）：**

- 根据id值在B+树上找到相应的叶子节点
- 取出叶子节点上的行数据，返回即可

**辅助索引（聚簇索引以外的）：**

- 在相应索引的B+树上找到相应的叶子节点
- 取出叶子节点上的数据，该数据是主键id
- 拿到主键id后，去主键索引的B+树上找到相应的叶子节点
- 取出叶子节点上的行数据，返回





## 思考？



**为什么少用`select *`，为什么尽量使用覆盖索引？**



- 对innodb的聚簇索引来说，如果查的是id，where条件是索引，那么可以查找一次B+树即可找到（辅助索引树）！
- 如果查找的是age字段，这个不是索引，那么我们得通过辅助索引树和主索引树才能找到！
- 这就是为什么尽量走覆盖索引和少用`select *`的原因所在！
- 当然真实场景不可能都走覆盖索引！







## 总结







- 通过**主键id**查询的时候，InnoDB比MyIsam快一些，因为InnoDB只需要**一次**B+树查找就能取出数据。MyIsam通过B+树查找到地址后，还需要根据地址去查询真正的数据。
- 但是InnoDB**普通索引**查询会比MyIsam慢些，因为InnoDB要进行**2次**B+树的查找。
- 在数据重构的时候，MyIsam记录的是数据地址，那么重构数据的时候地址就要重新生成一遍，这也是有问题的。
- InnoDB重构数据的时候就不会这样，因为他记录的是主键id，地址会变化，主键id是不会变的。







