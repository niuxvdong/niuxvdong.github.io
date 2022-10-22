---
title: 再学MySql之使用大总结
author: ITNXD
toc: true
abbrlink: 30836
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/22/714da936370bca0654bf82b57fcc1027.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/22/714da936370bca0654bf82b57fcc1027.png
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



> [我之前的教程！点击这里！](https://www.itnxd.cn/posts/16928.html#1%E3%80%81%E6%96%87%E6%9C%AC%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0)



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





#### 2、数学函数



> [我之前的教程！点击这里！](https://www.itnxd.cn/posts/16928.html#3%E3%80%81%E6%95%B0%E5%80%BC%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0)



- `ceil(x)`: 向上取整
- `floor(x)`：向下取整
- `round(x, [d])`：四舍五入，`d`代表保留小数位数
- `mod(n, m)`：取模
- `truncate(x, d)`: 截断，将数值保留int位小数，剩余尾数截断
- `rand()`: 获取随机数，返回0-1之间的小数





#### 3、日期函数



> [我之前的教程！点击这里！](https://www.itnxd.cn/posts/16928.html#2%E3%80%81%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0)



#### 4、其他函数



- `version()`: 当前数据库服务器的版本
- `database()`: 当前打开的数据库
- `user()`: 当前用户
- `password('字符’)`：返回该字符的密码形式，**新版mysql已不支持**`
- `md5(‘字符’)`: 返回该字符的md5加密形式



#### 5、流程控制函数







- `if(条件表达式，表达式1，表达式2)`：类似三元运算符
  - 可以作为表达式放在任何位置
- `case`情况1：类似于`switch case`，`else`省略，若都不匹配，则返回`null`
  - 可以放在任何位置：
    - 如果放在begin end 外面，作为表达式结合着其他语句使用
    - 如果放在begin end 里面，一般作为独立的语句使用

```sql
case 表达式
when 常量1 then 要显示的值1
when 常量2 then 要显示的值2
...
else 要显示的值n（else可省略）
end as 别名
```

- `case`情况2：类似于`if else`

```
case 										
when 条件1 then 要显示的值1
when 条件2 then 要显示的值2
...
else 要显示的值n  
end as 别名
```



**例如：**



```sql
SELECT salary 原始工资,department_id,
CASE department_id
WHEN 30 THEN salary*1.1
WHEN 40 THEN salary*1.2
WHEN 50 THEN salary*1.3
ELSE salary
END AS 新工资
FROM employees;
```







#### 6、分组函数



> 又叫做：聚合函数，统计函数，组函数
>
> 主要有：`sum avg max min count`





**参数类型：**

- `sum, avg`：适用于数值型，字符型也不报错，返回0
- `max, min`：数值型，字符型
- `count`：不为`null`的个数

**注意：**以上分组函数都忽略null值

- 可以和`distinct`搭配实现去重，eg：`SELECT SUM(DISTINCT salary) FROM employees;`
- 和分组函数一同查询的字段要求是`group by`后的字段，其他不行
- `count(*)`：不忽略`null`，即返回总行数！
- 如下写法，相当于加了一列：



```sql
SELECT COUNT(1) FROM employees;
SELECT COUNT('hh') FROM employee;
```



**效率：**

- `myisam`引擎：`count(*)`效率最高
- `innodb`引擎：`count(*)`和`count(1)`差不多，比`count(字段)`高







## 5、分组查询





#### 5.1、语法

> **注意：查询的列表比较特殊，要求是分组函数和group by后出现的字段**



```sql
select 查询列表
from 表
【where 筛选条件】
group by 分组的字段(可为多个)
【having 】
【order by 排序的字段】;
```



**举例：**

```sql
SELECT MAX(salary), job_id
FROM employees
GROUP BY job_id;
```



#### 5.2、having & where



- `where`：对**分组前**结果进行筛选，放在`group by`之前

- `having`：对**分组后**的结果进行筛选，放在`group by`之后，聚集函数一般放在`having`后！











## 6、连接查询



> 又称为多表查询！防止未添加连接条件导致产生笛卡尔积现象！
>
> 为方便操作，一般为表起别名！
>
> **注意：为表起了别名，则查询的字段将不能再使用原表名进行限定，只能使用别名**



#### 6.1、分类



> `mysql`虽然不支持全外连接，但可以使用`UNION`，左连接一次，右连接一次，再使用`UNION`合并来实现全外连接！

- 年代分类
  - `sql92`：仅仅支持内连接（`where`后添加连接条件，已被弃用）
  - `sql99`：全支持，但`mysql`不支持全连接！(`on`后添加连接条件)
- 功能分类
  - 内连接（等值连接（交集）、非等值连接、自连接）
  - 外连接（左外、右外、全外（`mysql`不支持））
  - 交叉连接



#### 6.2、sql99语法





1、内连接



```sql
select 查询列表
from 表1 别名
【inner】 join 表2 别名 on 连接条件
where 筛选条件
group by 分组列表
having 分组后的筛选
order by 排序列表
limit 子句;
```



2、左外&右外连接



> - `left join` 左边的就是主表，`right join `右边的就是主表，`full join` 两边都是主表！



```sql
select 查询列表
from 表1 别名
left|right|full【outer】 join 表2 别名 on 连接条件
where 筛选条件
group by 分组列表
having 分组后的筛选
order by 排序列表
limit 子句;
```



3、交叉连接



> 类似笛卡尔积！



```sql
select 查询列表
from 表1 别名
cross join 表2 别名;
```





#### 6.3、总结



- 内连接和左右外连接





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/22/6e29356e99a2a6c8b9eef981b50d9b3c.png)



- 其他几种



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/22/8fde5413dfbddc98a505bc18feb93f61.png)









## 7、子查询





> 可由后面的视图代替，提高可读性!
>
> 
>
> 嵌套在其他语句内部的`select`语句称为子查询或内查询，外面如果为`select`语句，则此语句称为外查询或主查询！
>
> 外面的语句可以是`insert、update、delete、select`等，一般`select`作为外面语句较多！





#### 7.1、分类



- 按出现位置
  - `select`后面：支持标量子查询
  - `from`后面：支持表子查询（子查询结果为一张虚拟表，要求必须起别名）
  - `where`或`having`后面：支持标量子查询、列子查询 、行子查询
  - `exists`后面（相关子查询）：标量子查询、列子查询、行子查询、表子查询
- 按结果集行列
  - 标量子查询（单行子查询）：结果集为一行一列
  - 列子查询（多行子查询）：结果集为多行一列
  - 行子查询：结果集为多行多列
  - 表子查询：结果集为多行多列



**`exists(完整的查询语句)`**：结果为1或0，可用`in`代替！



举例：



```sql
# 使用in
SELECT department_name
FROM departments d
WHERE d.`department_id` IN(
	SELECT department_id
	FROM employee;
);

# 使用exists
SELECT department_name
FROM departments d
WHERE EXISTS(
	SELECT *
	FROM employees e
	WHERE d.`department_id`=e.`department_id`
);
```







#### 7.2、注意点



- 子查询放在小括号内
- 子查询一般放在条件的右侧
- 子查询的执行优先于主查询，主查询用到了子查询的结果
- 标量子查询，一般搭配单行操作符使用 `< > >= <= - <>`
- 列子查询：一般搭配多行操作符使用 `in \ not in \ any/some \ all`
  - `in` 等于其中一个即可
  - `not in` 不是其中每个
  - `any/some` 比较其中一个即可 （可替换为`max,min`）
  - `all` 比较所有值 （可替换为`max,min`）



**列子查询举例：**

```sql
案例1：返回location_id是1400或1700的部门中的所有员工姓名
SELECT last_name
FROM employees
WHERE department_id IN(
	SELECT DISTINCT department_id
	FROM departments
	WHERE location_id IN(1400,1700)
);

# 或
SELECT last_name
FROM employees
WHERE department_id = ANY(
	SELECT DISTINCT department_id
	FROM departments
	WHERE location_id IN(1400,1700)
);

案例2：返回location_id不是1400或1700的部门中的所有员工姓名
SELECT last_name
FROM employees
WHERE department_id  NOT IN(
	SELECT DISTINCT department_id
	FROM departments
	WHERE location_id IN(1400,1700)
);

# 或
SELECT last_name
FROM employees
WHERE department_id  <> ALL(
	SELECT DISTINCT department_id
	FROM departments
	WHERE location_id IN(1400,1700)
);
```











## 8、分页查询





#### 8.1、语法



- `offset`：起始索引（起始索引从0开始，唯一一个从0开始的，其他都是1开始）

- `size`：显示条数

```sql
select 查询列表
from 表
【join type join 表2
on 连接条件
where 筛选条件
group by 分组字段
having 分组后的筛选
order by 排序的字段】
limit 【offset,】size;
```



#### 8.2、注意点



- `limit`语句放在查询语句的最后

- 要显示的页数 `page`，每页的条目数`size`，`limit (page-1)*size, size;`
- 使用`order by`和`limit`组合，可以找到一个列中最大值、最小值





## 9、联合查询



> 多次查询合并！
>
> 将一条比较复杂的查询语句拆分成多条语句！





#### 9.1、语法



```sql
查询语句1
union 【all】
查询语句2
union 【all】
...
```







#### 9.2、注意点





1. 要求多条查询语句的查询列数必须一致
2. 要求多条查询语句的查询的各列类型、顺序最好一致
3. `union `去重，`union all`包含重复项









## 10、查询总结





> 各大关键字的位置及其执行顺序！



```sql
select 查询列表     ⑦
from 表1 别名       ①
连接类型 join 表2    ②
on 连接条件          ③
where 筛选          ④
group by 分组列表    ⑤
having 筛选         ⑥
order by排序列表     ⑧
limit 起始条目索引，条目数;  ⑨
```













# 二、DML语言



> DML(Data Manipulation Language)：数据操纵语言，负责对数据库对象运行数据访问工作的指令集，以`INSERT、UPDATE、DELETE`三种指令为核心！







## 1、插入



#### 1.1、语法

```sql
两种方式：
insert into 表名(字段名,...) values(值,...);
insert into 表名 set 字段=值,字段=值,...;
```



#### 1.2、区别和注意点



- 方式一只需保证对应一致即可
- 方式一支持插入多行,方式二不支持
- 方式一支持子查询，方式二不支持
- 不可以为`null`的列必须插入值，可以为`null`的列可以写或不写
- 省略列名，默认所有列，值和表列的顺序要一致。



```sql
# 方式一插入多行
insert into 表名 
values(值,...),
values(值,...),
...

# 方式一子查询
INSERT INTO beauty(id,NAME,phone)
SELECT id,boyname,'1234567'
FROM boys WHERE id<3;
```









## 2、修改







#### 1.1、语法



```sql
# 修改单表
update 表名 set 字段=值,字段=值 【where 筛选条件】;

# 修改多表
update 表1 别名 
left|right|inner join 表2 别名 
on 连接条件  
set 字段=值,字段=值 
【where 筛选条件】;
```











## 3、删除



> 可以使用`delete`和`truncate`！



#### 3.1、语法





```sql
# 单表删除
delete from 表名 【where 筛选条件】【limit 条目数】;

# 级联删除(多表删除)
delete 别名1,别名2 
from 表1 别名 
inner|left|right join 表2 别名 
on 连接条件
【where 筛选条件】;
```





```sql
truncate table 表名
```



#### 3.2、delete & truncate



1. `delete` 可以加`where` 条件，`truncate`不能加

2. `truncate`删除，效率高一丢丢
3. 假如要删除的表中有自增长列，如果用`delete`删除后，再插入数据，自增长列的值从断点开始；而`truncate`删除后，再插入数据，自增长列的值从1开始。
4. `truncate`删除没有返回值，`delete`删除有返回值

5. `truncate`删除不能回滚，`delete`删除可以回滚.













# 三、DDL语言





> DDL(Data Definition Language)：数据定义语言，处理库和表的管理及各种约束！以`create、alter、drop`三种指令为核心！





## 1、库的管理





#### 1.1、创建库



```sql
create database 【if not exists】 库名【 character set 字符集名】;
```





#### 1.2、修改库



```sql
# 更改库名
RENAME DATABASE 库名 TO 新库名;

# 更改库的字符集
ALTER DATABASE 库名 CHARACTER SET 字符集名;
```





#### 1.3、删除库



```sql
drop database 【if exists】 库名;
```







## 2、表的管理







#### 2.1、创建表



```sql
create table 表名(
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	...
	列名 列的类型【(长度) 约束】
);
```





#### 2.2、修改表



```sql
# 语法：
alter table 表名 add|drop|modify|change column 列名 【列类型 约束】;

# 修改列名
ALTER TABLE 表名 CHANGE COLUMN 旧列名 新列名 列类型;

# 修改列的类型或约束
alter table 表名 modify column 列名 新类型 【新约束】;

# 添加新列
ALTER TABLE 表名 ADD COLUMN 列名 列类型 约束条件; 

# 删除列
ALTER TABLE 表名 DROP COLUMN  列名;

# 修改表名
ALTER TABLE 表名 RENAME 【TO】 新表名;
```





#### 2.3、删除表



```sql
drop table 【if exists】 表名;
```



#### 2.4、复制表



**1、复制表的结构**



```sql
CREATE TABLE 新表名 LIKE 旧表;
```



**2、复制表的结构以及数据**



```sql
create table 新表名 
select 查询列表 from 旧表【where 筛选】;
```





## 3、数据类型



#### 3.1、分类



- 整型型：`tinyint(1)、smallint(2)、mediumint(3)、int/integer(4)、bigint(8)`
  - 如果不设置无符号还是有符号，默认是有符号，如果想设置无符号，需要添加`unsigned`关键字
  - 如果插入的数值超出了整型的范围,会报`out of range`异常，并且插入临界值
  - 如果不设置长度，会有默认的长度长度代表了显示的**最大宽度**，如果不够会用0在左边填充，但必须搭配`zerofill`使用！
- 小数型：`float(M,D)`浮点型 ：4字节，`double(M,D)`定点型：  8字节
  - `M`代表整数部位+小数部位的字符个数，D代表小数部位
  - 如果超出范围，则报`out or range`异常，并且插入临界值
  - `M`和`D`都可以省略，但对于定点数，`M`默认为10，`D`默认为0
  - 如果精度要求较高，则优先考虑使用**定点数**
- 字符型：`char、varchar、binary(二进制)、varbinary(二进制)、enum(枚举)、set(集合)、text、blob(较大二进制)`
  - `char`：固定长度的字符，写法为`char(M)`，最大长度不能超过`M`，其中`M`可以省略，默认为1
  - `varchar`：可变长度的字符，写法为`varchar(M)`，最大长度不能超过`M`，其中`M`不可以省略
- 日期型：`date、time、year、datetime(8字节，范围：1000—9999)、timestamp(4字节，范围：1970-2038)`
  - `timestamp`：比较容易受时区、语法模式、版本的影响，更能反映当前时区的真实时间
  - `SET time_zone='+9:00'`：可设置时区



**小栗子：**



```sql
CREATE TABLE tab_char(
	c1 ENUM('a','b','c')
);

INSERT INTO tab_char VALUES('a');
INSERT INTO tab_char VALUES('b');
INSERT INTO tab_char VALUES('c');
INSERT INTO tab_char VALUES('A');

SELECT * FROM tab_set;

CREATE TABLE tab_set(

	s1 SET('a','b','c','d')
);

INSERT INTO tab_set VALUES('a');
INSERT INTO tab_set VALUES('A,B');
INSERT INTO tab_set VALUES('a,c,d');
```







## 4、常见约束









#### 4.1、常见约束



- `NOT NULL`：非空，该字段的值必填
- `UNIQUE`：唯一，该字段的值不可重复
- `DEFAULT`：默认，该字段的值不用手动插入有默认值
- `CHECK`：检查，**`mysql`不支持**
- `PRIMARY KEY`：主键，该字段的值不可重复并且非空 ，等同于`unique + not null`
- `FOREIGN KEY`：外键，该字段的值引用了另外的表的字段





#### 4.2、主键 & 唯一键



1. 一个表至多有一个主键，但可以有多个唯一
2. 主键不允许为空，唯一可以为空
3. 注意：新版支持唯一多`null`
4. 联合主键：`PRIMARY KEY(xxx, xxx)` ，索引会显示两个主键（二者为整体来决定）
5. 联合唯一键：` UNIQUE(seat, age)`，类似！



#### 4.2、外键



> 外键写法：`[constraint 约束名] foreign key(从表被约束的列) references 主表(主表被引用列)`





1. 用于限制两个表的关系，从表的字段值引用了主表的某字段值
2. 外键列和主表的被引用列要求类型一致，意义一样，名称无要求
3. 主表的被引用列要求是一个key（一般是主键或唯一键）
4. 插入数据，先插入主表。删除数据，先删除从表





**可以通过以下两种方式来删除主表的记录：**



1、**级联删除**：删除主表该数据的同时将从表该数据也删除



**注意**：接下来使用`delete`删除时，主表删除谁则从表对应数据行也删除



```sql
# 例子：
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE CASCADE;
```





2、**级联置空**：删除主表该数据的同时将从表该数据也置空



**注意**：接下来使用`delete`删除时，主表删除谁则从表对应数据（使用主表外键的列）置空



```sql
# 例子：
ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE SET NULL;
```









#### 4.3、约束使用



**1、创建表时添加约束**



> **列级约束**：不可以设置约束名
>
> - 只支持默认、非空、主键、唯一键
> - 一个字段可写多个，顺序随意，空格隔开即可
>
> **表级约束**：`【constraint 约束名】 约束类型(字段名) `
>
> - 只支持主键、外键、唯一键
>
> - 可选部分不写默认为字段名！
> - 对主键无效！
>
> **注意**：主键、外键、唯一键会自动生成索引。可使用`SHOW INDEX FROM 表名`查看索引！





```sql
# 列级约束
CREATE TABLE stuinfo(
	id INT PRIMARY KEY,#主键
	stuName VARCHAR(20) NOT NULL UNIQUE,#非空
	gender CHAR(1) CHECK(gender='男' OR gender ='女'),#检查
	seat INT UNIQUE,#唯一
	age INT DEFAULT 18,#默认约束
	majorId INT REFERENCES major(id)#外键
);

# 表级约束
CREATE TABLE stuinfo(
	id INT,
	stuname VARCHAR(20),
	gender CHAR(1),
	seat INT,
	age INT,
	majorid INT,
	
	CONSTRAINT pk PRIMARY KEY(id),#主键 主键名改了无效，一定是primary
	CONSTRAINT uq UNIQUE(seat),#唯一键
	CONSTRAINT ck CHECK(gender ='男' OR gender  = '女'),#检查
	CONSTRAINT fk_stuinfo_major FOREIGN KEY(majorid) REFERENCES major(id)#外键
);
```







**2、修改表时添加或删除约束**





2.1、非空

```sql
# 添加非空
alter table 表名 modify column 字段名 字段类型 not null;
# 删除非空
alter table 表名 modify column 字段名 字段类型 ;
```



2.2、默认

```sql
# 添加默认
alter table 表名 modify column 字段名 字段类型 default 值;
# 删除默认
alter table 表名 modify column 字段名 字段类型 ;
```



2.3、主键

```sql
# 添加主键
alter table 表名 add【 constraint 约束名】 primary key(字段名);
# 删除主键
alter table 表名 drop primary key;
```



2.4、唯一

```sql
# 添加唯一
alter table 表名 add【 constraint 约束名】 unique(字段名);
# 删除唯一
alter table 表名 drop index 索引名;
```



2.5、外键

```sql
# 添加外键
alter table 表名 add【 constraint 约束名】 foreign key(字段名) references 主表（被引用列）;
# 删除外键
alter table 表名 drop foreign key 约束名;
```







**3、通用或建议写法**



```sql
# 语法
CREATE TABLE 表名(
	字段名 字段类型 列级约束,
	字段名 字段类型,
	表级约束
);

# 例子
CREATE TABLE IF NOT EXISTS stuinfo(
	id INT PRIMARY KEY,
	stuname VARCHAR(20),
	sex CHAR(1),
	age INT DEFAULT 18,
	seat INT UNIQUE,
	majorid INT,
	CONSTRAINT fk_stuinfo_major FOREIGN KEY(majorid) REFERENCES major(id)
);
```









#### 4.4、自增长列



>  不用手动插入值，可以自动提供序列值，默认从1开始，步长为1！





**1、注意点**



1. 一个表至多有一个自增长列
2. 自增长列只能支持数值型
3. 自增长列必须为一个`key`（主键、唯一键、外键）



**2、更改默认起始值和步长**



> **对于更改起始值**：也可以在第一次插入时指定该值，则之后自增就以该值开始！
>
> **注意**：使用`set`设置变量，影响范围为当前会话，可以添加`global|session`修改为所有会话，永久改变，只能修改配置文件！





```sql
# 更改起始值
SET auto_increment_offset=值;
# 更改步长
set auto_increment_increment=值;
```



**3、创建表时设置自增长列**



> 自增长列赋值可以为`null`，还是自增！也可在插入时不插入该列！



```sql
create table 表(
	字段名 字段类型 约束 auto_increment,
    ...
);
```







**4、修改表时设置自增长列**



```sql
alter table 表 modify column 字段名 字段类型 约束 auto_increment;
```





**5、删除自增长列**



```sql
alter table 表 modify column 字段名 字段类型 约束 ;
```





#### 4.5、索引



> [以前写的教程，点击这里查看！](https://www.itnxd.cn/posts/15411.html#9%E3%80%81%E7%B4%A2%E5%BC%95)







# 四、DCL语言



> DCL(Data Control Language)：数据控制语句，用于控制不同数据段直接的许可和访问级别的语句。这些语句定义了数据库、表、字段、用户的访问权限和安全级别。主要的语句关键字包括`grant、revoke `等。
>
> **总链接**：[数据库教程之字符集.安全管理.维护，之前写的教程，点击这里！](https://www.itnxd.cn/posts/28616.html)
>
> - [字符集和校对顺序，点击这里！](https://www.itnxd.cn/posts/28616.html#%E4%B8%80%E3%80%81%E5%AD%97%E7%AC%A6%E9%9B%86%E5%92%8C%E6%A0%A1%E5%AF%B9%E9%A1%BA%E5%BA%8F)
> - [安全管理，用户管理，访问控制，点击这里！](https://www.itnxd.cn/posts/28616.html#%E4%BA%8C%E3%80%81%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86)
> - [数据库维护，备份，日志，点击这里！](https://www.itnxd.cn/posts/28616.html#%E4%B8%89%E3%80%81%E6%95%B0%E6%8D%AE%E5%BA%93%E7%BB%B4%E6%8A%A4)
> - [改善性能，mysql使用建议，点击这里！](https://www.itnxd.cn/posts/28616.html#%E5%9B%9B%E3%80%81%E6%94%B9%E5%96%84%E6%80%A7%E8%83%BD)













# 五、TCL语言







> TCP(Transaction Control Language)：事务控制语言，处理事务及使用隔离级别解决并发问题！



## 1、事务



> 事务：一条或多条`sql`语句组成一个执行单位，一组`sql`语句要么都执行要么都不执行，把多条语句作为一个整体进行操作的功能，被称为数据库事务！



#### 1.1、事务的ACID四个特性



A：`Atomic`，原子性，将所有`SQL`作为原子工作单元执行，要么全部执行，要么全部不执行；

C：`Consistent`，一致性，事务完成后，所有数据的状态都是一致的，即A账户只要减去了100，B账户则必定加上了100；

I：`Isolation`，隔离性，如果有多个事务并发执行，每个事务作出的修改必须与其他事务隔离；

D：`Duration`，持久性，即事务完成后，对数据库数据的修改被持久化存储。



#### 1.2、事务的创建



- 隐式事务：事务没有明显的开启和结束的标记

- 显示事务：事务具有明显的开启和结束的标记，**前提：必须先设置自动提交功能为禁用**



```sql
set autocommit=0;

# 步骤1：开启事务
set autocommit=0;
【start transaction;】
# 步骤2：编写事务中的sql语句(select insert update delete)
语句1;
语句2;
...

# 步骤3：结束事务
commit;提交事务
rollback;回滚事务
```





#### 1.3、使用保留点savepoint



```sql
SET autocommit=0;
START TRANSACTION;
DELETE FROM account WHERE id=25;
SAVEPOINT a;#设置保存点
DELETE FROM account WHERE id=28;
ROLLBACK TO a;#回滚到保存点

SELECT * FROM account;
```





## 2、隔离级别



> 我之前写的教程更加详细：[隔离级别，点击这里！](https://www.itnxd.cn/posts/61605.html#%E4%BA%8C%E3%80%81%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB)





#### 2.1、注意点

- `serializable`：效率低，类似于`java`多线程的锁，同一时刻只能有一个事务操作

- `oracle`支持两种：`serializable \ read committed`



#### 2.2、默认隔离级别

- `mysql`（如果使用`InnoDB`）中默认 第三个隔离级别 `repeatable read`
- `oracle`中默认第二个隔离级别 `read committed`



#### 2.3、查看隔离级别



```sql
# 旧版使用，新版本无法使用
select @@tx_isolation; 
# 8.0版本改为：
select @@transaction_isolation;
```



#### 2.4、设置隔离级别



```
set session|global transaction isolation level 隔离级别;
```



**在变量章节详细讲解！**



- `session` ：当前事务（可选，不写则不会马上生效）
- `global`：全局，一般设置后需重启`mysql`









# 六、视图



> `mysql5.1`版本出现的新特性，本身是一个虚拟表，它的数据来自于表，通过执行时动态生成。只保存了`sql`逻辑，不保存查询结果！
>
> 1. 简化`sql`语句，提高了`sql`的重用性
> 2. 保护基表的数据，提高了安全性(即封装性，将子查询封装)





## 1、视图和表对比





1. 表保存数据，视图仅保存逻辑语句
2. 视图一般用于查询，表一般用于增删改查







## 2、创建视图



> 使用：可以将视图名称当做表名使用即可！



```sql
# 语法：
create view 视图名
as 查询语句;
```





## 3、修改视图



```sql
# 方式一：存在则修改，不存在则创建
create or replace view  视图名
as 查询语句;

# 方式二
alter view 视图名
as 查询语句;
```





## 4、删除视图





```sql
drop view 视图名,视图名,...;
```





## 5、查看视图



```sql
# 视图结构
DESC myv3;

# 显示视图创建过程
SHOW CREATE VIEW myv3;
```





## 6、更新视图





> 和表的操作一致，`insert, update, delete`！



**以下视图不允许更新：**



1. 包含以下关键字的`sql`语句：`分组函数、distinct、group  by、having、union或者union all`
2. `join`
3. 常量视图
4. `where`后的子查询用到了`from`中的表
5. 用到了不可更新的视图







# 七、变量



> - `global`：所有会话（当前mysql所有连接，重启失效）
>
> - `session`：默认值，当前会话
> - 永久生效：修改配置文件



## 1、系统变量



> 分类：
>
> - 全局变量
> - 会话变量



#### 1.1、查看所有系统变量



```sql
show global|【session】variables;
```



#### 1.2、查看满足条件的部分系统变量



```sql
show global|【session】 variables like '%char%';
```



#### 1.3、查看指定的系统变量的值



```
select @@global|【session】系统变量名;
```



#### 1.4、为某个系统变量赋值



```sql
# 方式一：
set global|【session】系统变量名=值;
# 方式二：
set @@global|【session】系统变量名=值;
```







## 2、自定义变量



> 分类：
>
> - 用户变量
> - 局部变量





#### 2.1、用户变量



> 作用域：针对于当前连接（会话）生效
>
> 位置：`begin end`里面，也可以放在外面
>
> 注意：一般添加`@`



```sql
# 声明并赋值：推荐使用第二种（防止=歧义）
set @变量名=值; #或
set @变量名:=值; #或
select @变量名:=值;

# 更新值
# 方式一：
set @变量名=值; #或
set @变量名:=值; #或
select @变量名:=值;
# 方式二：
select xx into @变量名 from 表;

# 查询
select @变量名;
```





#### 2.2、局部变量



> 作用域：仅仅在定义它的`begin end`中有效
>
> 位置：只能放在`begin end`中，而且只能放在第一句
>
> 注意：一般不添加`@`



```sql
# 声明
declare 变量名 类型 【default 值】;

# 赋值或更新
# 方式一：
set 变量名=值; #或
set 变量名:=值; #或
select @变量名:=值;
# 方式二：
select xx into 变量名 from 表;

# 查询
select 变量名;
```

















# 八、存储过程和函数



> 类似于方法！



## 1、存储过程





> 视图是逻辑语句，存储过程是执行完的集合！一组预先编译好的SQL语句的集合，理解成批处理语句！
>
> 存储过程无法被修改，只可以删除之后重建！







#### 1.1、创建

> - 如果存储过程体仅仅只有一句话，`begin end`可以省略。
> - 存储过程体中的每条`sql`语句的结尾要求必须加分号。
> - **需要使用分隔符结束！**



```sql
DELIMITER $
CREATE PROCEDURE 存储过程名(参数模式 参数名 参数类型, ...)
BEGIN
	存储过程体（一组合法的SQL语句）;
	...
END$
```



**参数模式：**



- `in`：该参数需要调用方传入值（默认，可省略，但不建议）
- `out`：该参数可以作为返回值
- `inout`：该参数既需要传入值，又可以返回值



**几个例子：**



```sql
#1.空参列表
#案例：插入到admin表中五条记录

DELIMITER $
CREATE PROCEDURE myp1()
BEGIN
	INSERT INTO admin(username,`password`) 
	VALUES('john1','0000'),('lily','0000'),('rose','0000'),('jack','0000'),('tom','0000');
END $

#调用：
CALL myp1()$

#2.创建带in模式参数的存储过程
#案例：创建存储过程实现 根据女神名，查询对应的男神信息

CREATE PROCEDURE myp2(IN beautyName VARCHAR(20))
BEGIN
	SELECT bo.*
	FROM boys bo
	RIGHT JOIN beauty b ON bo.id = b.boyfriend_id
	WHERE b.name=beautyName;
END $

#调用
CALL myp2('柳岩')$

#3.创建out 模式参数的存储过程
#案例：根据输入的女神名，返回对应的男神名和魅力值

CREATE PROCEDURE myp7(IN beautyName VARCHAR(20),OUT boyName VARCHAR(20),OUT usercp INT) 
BEGIN
	SELECT boys.boyname ,boys.usercp INTO boyname,usercp
	FROM boys 
	RIGHT JOIN
	beauty b ON b.boyfriend_id = boys.id
	WHERE b.name=beautyName ;
END $

#调用
CALL myp7('小昭',@name,@cp)$
SELECT @name,@cp$

#4.创建带inout模式参数的存储过程
#案例1：传入a和b两个值，最终a和b都翻倍并返回

CREATE PROCEDURE myp8(INOUT a INT ,INOUT b INT)
BEGIN
	SET a=a*2;
	SET b=b*2;
END $

#调用
SET @m=10$
SET @n=20$
CALL myp8(@m,@n)$
SELECT @m,@n$
```







#### 1.2、分隔符



>  防止遇到分号提前结束语句！
>
> 结束标记一旦指定，则当前会话结束标记都应为该符号！
>
> `sqlyog`有点`bug`，每次运行都必须得指定该分隔符，控制台没问题！



```sql
delimiter 结束标记

delimiter $
```





#### 1.3、调用



```sql
call 存储过程名(实参列表)

# 调用in模式的参数：
call sp1（‘值’）;

# 调用out模式的参数：
set @name; 
call sp1(@name);
select @name;

# 调用inout模式的参数：
set @name=值; 
call sp1(@name); 
select @name;
```



#### 1.4、查看



```sql
show create procedure 存储过程名;
```



#### 1.5、删除



```sql
# 只能一个个删除
drop procedure 存储过程名;
```







## 2、函数





#### 2.1、函数与存储过程区别



- 存储过程：可以有0个返回，也可以有多个返回，适合做批量插入、批量更新
- 函数：有且仅有1个返回，适合做处理数据后返回一个结果



#### 2.2、创建



> - 函数体中仅有一句话，则可以省略`begin end`
> - 使用 `delimiter`语句设置结束标记





```sql
delimiter $
CREATE FUNCTION 函数名(参数名 参数类型, ...) RETURNS 返回类型
BEGIN
	函数体
END$
```





**几个例子：**



```sql
#1.无参有返回
#案例：返回公司的员工个数
CREATE FUNCTION myf1() RETURNS INT
BEGIN
	DECLARE c INT DEFAULT 0;#定义局部变量
	SELECT COUNT(*) INTO c#赋值
	FROM employees;
	RETURN c;
END $

SELECT myf1()$

#2.有参有返回
#案例1：根据员工名，返回它的工资

CREATE FUNCTION myf2(empName VARCHAR(20)) RETURNS DOUBLE
BEGIN
	SET @sal=0;#定义用户变量 
	SELECT salary INTO @sal   #赋值
	FROM employees
	WHERE last_name = empName;
	RETURN @sal;
END $

SELECT myf2('k_ing') $
```





#### 2.3、调用



```sql
SELECT 函数名(参数列表);
```



#### 2.4、查看



```sql
show create function 函数名;
```



#### 2.5、删除



```sql
drop function 函数名；
```





















# 九、流程控制结构





## 1、分支结构







> `if`函数和`case`结构看第一章的第四节的第五小结的流程控制函数！



#### 1.1、if结构



> 只能放在`begin end`中！



```sql
# 语法：
if 条件1 then 语句1;
elseif 条件2 then 语句2;
...
else 语句n;
end if;
```



**例子：**



```sql
#案例：创建函数，实现传入成绩，如果成绩>90,返回A，如果成绩>80,返回B，如果成绩>60,返回C，否则返回D
CREATE FUNCTION test_if(score FLOAT) RETURNS CHAR
BEGIN
	DECLARE ch CHAR DEFAULT 'A';
	IF score>90 THEN SET ch='A';
	ELSEIF score>80 THEN SET ch='B';
	ELSEIF score>60 THEN SET ch='C';
	ELSE SET ch='D';
	END IF;
	RETURN ch;
END $

SELECT test_if(87)$
```











## 2、循环结构



> **位置**：都只能放在`begin end`中

#### 2.1、while



```sql
【名称:】while 循环条件 do
		循环体
end while 【名称】;
```



#### 2.2、loop

> 类似死循环！

```sql
【名称：】loop
		循环体
end loop 【名称】;
```



#### 2.3、repeat

> 类似`do while`！

```sql
【名称:】repeat
		循环体
until 结束条件 
end repeat 【名称】;
```





#### 2.4、循环控制语句



- `leave`：类似于`break`，用于跳出所在的循环
- `iterate`：类似于`continue`，用于结束本次循环，继续下一次



**几个例子：**



```sql
#1.添加leave语句
#案例：批量插入，根据次数插入到admin表中多条记录，如果次数>20则停止
CREATE PROCEDURE test_while1(IN insertCount INT)
BEGIN
	DECLARE i INT DEFAULT 1;
	a:WHILE i<=insertCount DO
		INSERT INTO admin(username,`password`) VALUES(CONCAT('xiaohua',i),'0000');
		IF i>=20 THEN LEAVE a;
		END IF;
		SET i=i+1;
	END WHILE a;
END $

CALL test_while1(100)$

#2.添加iterate语句
#案例：批量插入，根据次数插入到admin表中多条记录，只插入偶数次
CREATE PROCEDURE test_while2(IN insertCount INT)
BEGIN
	DECLARE i INT DEFAULT 0;
	a:WHILE i<=insertCount DO
		SET i=i+1;
		IF MOD(i,2)!=0 THEN ITERATE a;
		END IF;
		
		INSERT INTO admin(username,`password`) VALUES(CONCAT('xiaohua',i),'0000');
		
	END WHILE a;
END $

CALL test_while2(100)$
```







# 十、游标和触发器



> 总链接：[数据库教程之游标及触发器，之前写的教程，点击这里!](https://www.itnxd.cn/posts/43244.html)
>
> - [游标](https://www.itnxd.cn/posts/43244.html#%E4%B8%80%E3%80%81%E6%B8%B8%E6%A0%87)
> - [触发器](https://www.itnxd.cn/posts/43244.html#%E4%BA%8C%E3%80%81%E8%A7%A6%E5%8F%91%E5%99%A8)

