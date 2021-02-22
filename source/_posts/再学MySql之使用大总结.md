---
title: 再学MySql之使用大总结
author: ITNXD
toc: true
abbrlink: 30836
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@224c1996b8b0251b7a9a90aafc59ad2f92a201b9/2021/02/22/714da936370bca0654bf82b57fcc1027.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@224c1996b8b0251b7a9a90aafc59ad2f92a201b9/2021/02/22/714da936370bca0654bf82b57fcc1027.png
categories:
  - MySQL
tags:
  - MySQL
date: 2021-02-22 11:58:51
updated:
---



# 一、DQL语言



> DQL(Data Query Language)：数据查询语言，用于查询！





## 1、基础查询



#### 1.1、语法



> 1. 查询列表可以是：表中的**字段、常量值、表达式、函数**
> 2. 查询的结果是一个虚拟的表格
> 3. `SELECT *`代表查询该表全部字段
> 4. 查询字符型和日期型的常量值必须用单引号引起来，数值型不需要



```sql
SELECT 查询列表 FROM 表名;
```



#### 1.2、别名





```sql
SELECT xxx 别名 FROM 表名;
SELECT xxx AS 别名 FROM 表名;
```





#### 1.3、去重





```sql
SELECT DISTINCT xxx FROM 表名;
```





#### 1.4、关于+号



> 仅有运算符的功能！



1. `select 数值+数值`：直接运算
2. `select 字符+数值`：先试图将字符转换成数值，如果转换成功，则继续运算；否则转换成0，再做运算
3. `select null+值`：结果都为null



#### 1.5、几个函数



1. `contact(xxx,xxx,xxx ...)`：字符串拼接
2. `ifnull(expr1, expr2)`：判断`expr1`是否为`null`，如果为`null`返回`expr2`，否则返回`expr1`
3. `isnull(xxx)`：判断该字段值是否为`null`，是返回1，否则返回0







## 2、条件查询



#### 2.1、语法

```sql
select 查询列表
from 表名
where 筛选条件;
```



#### 2.2、运算符



1. 条件运算符：`>、<、=、!=、<>、>=、<=`
2. 逻辑运算符：`and or not`
3. 模糊查询关键字：
   1. `like`：一般搭配通配符使用，可以判断字符型或数值型。
      1. **通配符**：`%`任意多个字符，`_`任意单个字符
      2. 若匹配`_ 或 %`则需要使用转移字符`\`，或使用`escape`自定义转义字符
   2. `between xxx and xxx`：在两范围之间，包含临界值
   3. `in(xxx, xxx ...)`：
      1. `in`列表的值类型必须一致或兼容
      2. `in`列表中不支持通配符
   4. `is null`：`=`或`<>`不能用于判断`null`值，`is null`或`is not null`可以判断`null`值
   5. `is not null`：略
4. 安全等于`<=>`：可以判断可判断`null`和普通数值型，由于长得模棱两可，可读性低，一般不用



```sql
SELECT last_name
FROM employees
WHERE last_name LIKE '_$_%' ESCAPE '$';
```





## 3、排序查询





#### 3.1、语法



```sql
select 查询列表
from 表名
【where  筛选条件】
order by 排序的字段或表达式;
```



#### 3.2、注意点



1. `asc`代表的是升序，可以省略。`desc`代表的是降序

2. `order by`子句可以支持 单个字段、别名、表达式、函数、多个字段

3. `order by`子句在一般放在查询语句的最后面，除了`limit`子句



## 4、常见函数



> **sql语言中索引从1开始！**



#### 1、字符函数



- `concat(exp1, exp2, exp3 …)`: 字符串连接
- `substr(str1, int)`: 截取从int位置开始之后str1剩余的所有字符（索引从1开始）
- `substr(str1, int1, int2)`: 截取str1中从int1开始的int2个字符
- `upper(str)`：变大写
- `lower(str)`：变小写
- `replace(str1, str2, str3)`：str1中的所有str2被替换成了str3
- `length(str)`：获取字节长度（一个汉字是三个字节）
- `trim(str)`: 去前后空格 (不光去空格 )
  - `SELECT TRIM('aa' FROM 'aaa哈哈哈aaa')`：返回`a哈哈哈a`
- `lpad(str1, int, str2)`：左填充，结果的长度为int，str1长度若不够int，将str2填充到str1左侧，直到长度为 int，如果str1长度大于int，则从左往右取int个输出，int不是指字节，指字符
- `rpad(str1, int, str2)`：右填充
- `instr(str1, str2)`: 获取str1中第一次出现str2的索引值，如果找不到返回0



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/29/1081b217e36291d71ae0278c9e1b9631.png)



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/29/d3eb81f9a55369963144fcb2e5ded164.png)



#### 2、数学函数





- `ceil(x)`: 向上取整
- `floor(x)`：向下取整
- `round(x, [d])`：四舍五入，`d`代表保留小数位数
- `mod(n, m)`：取模
- `truncate(x, d)`: 截断，将数值保留int位小数，剩余尾数截断
- `rand()`: 获取随机数，返回0-1之间的小数



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/29/53f96173db9f1881175d8f021d504f8d.png)



#### 3、日期函数



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/29/5afb913f2d226283a03e6489dd2c14c9.png)



#### 4、其他函数



version(): 当前数据库服务器的版本

database(): 当前打开的数据库

user(): 当前用户

password(‘字符’)：返回该字符的密码形式

md5(‘字符’): 返回该字符的md5加密形式







## 5、分组查询













## 6、连接查询

















## 7、子查询















## 8、分页查询













## 9、联合查询















## 10、查询总结





















# 二、DML语言



> DML(Data Manipulation Language)：数据操纵语言，负责对数据库对象运行数据访问工作的指令集，以INSERT、UPDATE、DELETE三种指令为核心！







## 1、插入



## 2、修改



## 3、删除







# 三、DDL语言





> DDL(Data Definition Language)：数据定义语言，处理库和表的管理及各种约束！





## 1、库的管理





## 2、表的管理





## 3、数据类型





## 4、常见约束











# 四、DCL语言



> DCL(Data Control Language)：数据控制语句，用于控制不同数据段直接的许可和访问级别的语句。这些语句定义了数据库、表、字段、用户的访问权限和安全级别。主要的语句关键字包括grant、revoke 等。



# 五、TCL语言







> TCP(Transaction Control Language)：事务控制语言，处理事务及使用隔离级别解决并发问题！











# 六、视图





# 七、变量





# 八、存储过程和函数



## 1、存储过程





## 2、函数





# 九、流程控制结构





## 1、分支结构



## 2、循环结构







# 十、其他





## 1、字符集&数据库维护&改善性能









## 2、游标和触发器