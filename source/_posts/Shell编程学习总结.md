---
title: Shell编程学习总结
author: ITNXD
toc: true
abbrlink: 6952
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/05/10/4112099d6b7a54e7dfc84f2fb6c51687.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/05/10/4112099d6b7a54e7dfc84f2fb6c51687.png
categories:
  - Shell
tags:
  - Shell
date: 2021-05-10 11:10:00
updated:
---





# 一、概述



> Shell 是一个命令行解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序！







## 1、第一个Shell脚本



- 脚本以`#!/bin/bash` 开头：指明使用的是Bash Shell
- 脚本需要有可执行权限



**vim hello.sh：**

```sh
#!/bin/bash
echo "hello,world~"
```







## 2、Shell脚本执行



- 方式一：赋予脚本`x`可执行权限`chmod u+x xx.sh`，然后直接`./xxx.sh`执行
- 方式二：直接使用命令：`sh xx.sh`执行







# 二、Shell变量



## 1、概述



Linux Shell 中的变量分为，系统变量和用户自定义变量。

系统变量：`$HOME、$PWD、$SHELL、$USER` 等等，比如： `echo $HOME` 

显示当前 shell 中所有变量：`set`





## 2、shell 变量的定义





**定义变量及撤销变量：**



- 定义变量：`变量名=值`
- 撤销变量：`unset 变量`
- 声明静态变量：`readonly 变量`。注意：不能 unset



**将命令的返回值赋给变量：**



```sh
A=`date` #反引号，运行里面的命令，并把结果返回给变量 A
A=$(date) #等价于反引号
```





**定义变量的规则：**

- 变量名称可以由字母、数字和下划线组成，但是不能以数字开头
- 等号两侧不能有空格
- 变量名称一般习惯为大写， 这是一个规范，我们遵守即可





**注释：**

```sh
# 单行注释
# 多行注释
:<<!
我是注释
!
```



**几个例子：**

```sh
#!/bin/bash
# 案例 1：定义变量 A
A=100
echo $A
echo A=$A
echo "A=$A"
# 案例 2：撤销变量 A
unset A
echo A=$A
# 案例 3：声明静态的变量 B=2，不能 unset
readonly B=2
echo "B=$B"
# unset B

# 将指令返回的结果赋给变量 使用``或$()
C=`date`
echo $C
D=$(date)
echo $D

# 使用环境变量TOMCAT_HOME
echo "tomcat_home=$TOMCAT_HOME"

# 多行注释
:<<!
我是注释
!
echo "test commont!"
```





## 3、设置环境变量



> 这个环境变量的作用域是全局的，谁都可以调用！
>
> 环境变量配置文件地址：`/etc/profile`



1. `export 变量名=变量值`：将 shell 变量输出为环境变量/全局变量
2. `source 配置文件`：让修改后的配置信息立即生效
3. `echo $变量名`：查询环境变量的值



**例子：**



```sh
# 定义一个环境变量 /etc/profile文件
export TOMCAT_HOME=/opt/tomcat
```





## 4、位置参数变量



> 当我们执行一个 shell 脚本时，如果希望获取到命令行的参数信息，就可以使用到位置参数变量！

- `$n`：n 为数字，`$0` 代表命令本身，`$1-$9` 代表第一到第九个参数，十以上的参数，十以上的参数需要用大括号包含，如`${10}`
- `$*`：这个变量代表命令行中所有的参数，`$*`把所有的参数看成一个整体
- `$@`：这个变量也代表命令行中所有的参数，不过`$@`把每个参数区分对待
- `$#`：这个变量代表命令行中所有参数的个数



**sh内容：**

```sh
#!/bin/bash
echo "0=$0 1=$1 2=$2"
echo "所有的参数=$*"
echo "$@"
echo "参数的个数=$#"
```

**运行结果：**

```sh
[root@itnxd100 shell]# ./myshell.sh 1 2 3 4
0=./myshell.sh 1=1 2=2
所有的参数=1 2 3 4
1 2 3 4
参数的个数=4
```









## 5、预定义变量



> shell 设计者事先已经定义好的变量，可以直接在 shell 脚本中使用！





- `$$`：当前进程的进程号（PID）
- `$!`：后台运行的最后一个进程的进程号（PID）
- `$?`：最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一个命令正确执行；如果这个变量的值为非 0，则证明上一个命令执行不正确了。



**sh文件：**

```sh
#!/bin/bash
echo "当前执行的进程的pid=$$"
# 以后台的方式运行一个脚本，并获取他的进程号
# 控制台执行preVal.sh会卡在下方的命令，不在一个shell中，会死循环
/home/shell/myshell.sh &
echo "最后一个后台方式运行的进程pid=$!"
echo "执行的结果是=$?"
```









# 三、运算符





- `"$((运算式))"`或`"$[运算式]"`或者 `expr m + n`，expression 表达式
- 注意 expr 运算符间要有空格, 如果希望将 expr 的结果赋给某个变量，使用反引号
- `expr \*,/, %` ：乘（需要斜杠转义），除，取余





**例子：**

```sh
#!/bin/bash
#案例 1：计算（2+3）X4 的值
RES1=$(((2+3)*4))
echo "res1=$RES1"
#使用[] 推荐
RES2=$[(2+3)*4]
echo "res2=$RES2"
#使用expr 运算符之间要有空格,不加空格就成为了整体，类似于字符串
TEMP=`expr 2 + 3`
RES4=`expr $TEMP \* 4` #乘法需要转义 
echo “temp=$TEMP”
echo "res4=$RES4"
#案例 2：请求出命令行的两个参数[整数]的和 20 50
SUM=$[$1+$2]
echo "sum=$SUM"
```





# 四、条件&流程



## 1、条件判断



**语法：**

- `[ condition ]`（注意 condition 前后要有空格，非空返回 true，可使用`$?`验证）



```sh
[ hspEdu ] #返回 true
[ ] #返回 false
[ condition ] && echo OK || echo notok #条件满足，执行后面的语句
```



**运算符：**

- = 字符串比较
- 两个整数的比较
  - -lt 小于
  - -le 小于等于 little equal 
  - -eq 等于
  - -gt 大于
  - -ge 大于等于
  - -ne 不等于
- 按照文件权限进行判断
  - -r 有读的权限
  - -w 有写的权限
  - -x 有执行的权限
- 按照文件类型进行判断
  - -f 文件存在并且是一个常规的文件
  - -e 文件存在
  - -d 文件存在并是一个目录



**例子：**

```sh
if [ "ok" = "ok" ]
then
	echo "equal"
fi

if [ 23 -ge 22 ]
then
	echo "大于"
fi

if [ -f /home/shell/aaa.txt ]
then
	echo "存在"
fi

# []表示空值为假时，同样需要两个空格
if [ itnxd  ]
then
	echo "为假"
fi
```





## 2、流程控制





#### 2.1、if



**语法：**

```sh
if [ 条件判断式 ]
then
代码
fi
或者 , 多分支
if [ 条件判断式 ]
then
代码
elif [条件判断式]
then
代码
fi
```



**注意**：[ 条件判断式 ]，中括号和条件判断式之间必须有空格



**例子：**

```sh
#!/bin/bash
# 如果输入的参数，大于等于 60，则输出 "及格了"，如果小于 60,则输出 "不及格"
if [ $1 -ge 60 ]
then
	echo "及格了"
elif [ $1 -lt 60]
then
	echo "不及格"
fi
```







#### 2.2、case



**语法：**

```sh
case $变量名 in
"值 1"）
如果变量的值等于值 1，则执行程序 1
;;
"值 2"）
如果变量的值等于值 2，则执行程序 2
;;
…省略其他分支…
*)
如果变量的值都不是以上的值，则执行此程序
;;
esac
```



**例子：**

```sh
#!/bin/bash
# 当命令行参数是 1 时，输出 "周一", 是 2 时，就输出"周二"， 其它情况输出 "other"
case $1 in
"1")
echo "周一"
;;
"2")
echo "周二"
;;
*)
echo "other..."
;;
esac
```









#### 2.3、for





**语法：**

```sh
for 变量 in 值 1 值 2 值 3…
do
程序/代码
done

# 或
for (( 初始值;循环控制条件;变量变化 ))
do
程序/代码
done
```





**例子：**



```sh
#!/bin/bash

# 例子一
# $*将输入的参数当做一个整体，以下只执行一次
for i in "$*"
do
	echo "num is $i"
done

echo "==============================="

# $@获取输入参数，分别对待，执行多次
for i in "$@"
do
	echo "num is $i"
done

# 例子二
SUM=0
for (( i=1; i <= $1; i++ ))
do
	SUM=$[$SUM+$i]
done

echo "总和sum=$SUM"
```







#### 2.4、while



**语法：**



```sh
while [ 条件判断式 ]
do
程序 /代码
done
注意：while 和 [有空格，条件判断式和 [也有空格
```





**例子：**

```sh
#!/bin/bash

SUM=0
i=0
while [ $i -le $1 ]
do
	SUM=$[$SUM+$i]
	i=$[$i+1]
done

echo "sum=$SUM"
```





# 五、read读取输入



> 可以处理控制台输入！



**语法：**

`read(选项)(参数)`
选项：

- -p：指定读取值时的提示符；
- -t：指定读取值时等待的时间（秒），如果没有在指定的时间内输入，就不再等待了

参数：变量，指定读取值的变量名



**例子：**

```sh
#!/bin/bash

read -p "请输入一个数NUM1=" NUM1
echo "输入的NUM1=$NUM1"

read -t 10 -p "请输入一个数NUM2=" NUM2
echo "输入的NUM2=$NUM2"
```





# 六、函数



## 1、系统函数



- `basename [pathname] [suffix]`：返回完整路径最后 / 的部分，常用于获取文件名
  - suffix 为后缀：如果 suffix 被指定了，basename 会将 pathname 或 string 中的 suffix 去掉
- `dirname 文件绝对路径`：从给定的包含绝对路径的文件名中去除文件名（非目录的部分），然后返回剩下的路径（目录的部分），常用于获取路径



**例子：**

```sh
[root@itnxd100 shell]# basename /home/aaa/test.tx
test.tx
[root@itnxd100 shell]# dirname /home/aaa/test.txt
/home/aaa
[root@itnxd100 shell]# 
```





## 2、自定义函数



**语法：**

```sh
[ function ] funname[()]
{
Action;
[return int;]
}
调用直接写函数名：funname [值]
```



**例子：**

```sh
#!/bin/bash

function getSum(){
	
	SUM=$[$n1+$n2]
	echo "和是=$SUM"
}

read -p "请输入一个数n1=" n1
read -p "请输入一个数n2=" n2

getSum $n1 $n2
```







# 七、案例





**一个数据库备份案例：**

1. 每天凌晨 2:30 备份 数据库 itnxd 到 /data/backup/db
2. 备份开始和备份结束能够给出相应的提示信息
3. 备份后的文件要求以备份时间为文件名，并打包成 .tar.gz 的形式，比如：2021-03-12_230201.tar.gz
4. 在备份的同时，检查是否有 10 天前备份的数据库文件，如果有就将其删除。





**/usr/sbin/mysql_db.backup.sh代码：**



```sh
#!/bin/bash

# 备份目录
BACKUP=/data/backup/db
# 当前时间
DATETIME=$(date +%Y-%m-%d_%H%M%S)
echo $DATETIME

# 数据库地址
HOST=localhost
# 数据库用户名
DB_USER=root
# 数据库密码
DB_PW=xxxxx
# 要备份的数据库名
DATABASE=itnxd


# 创建备份目录，如果不存在就创建
[ ! -d "${BACKUP}/${DATETIME}" ] && mkdir -p "${BACKUP}/${DATETIME}"

# 备份数据库
mysqldump -u${DB_USER} -p${DB_PW} --host=${HOST} -q -R --databases ${DATABASE} | gzip > ${BACKUP}/${DATETIME}/$DATETIME.sql.gz

# 将文件处理称成tar.gz
cd ${BACKUP}
tar -zcvf $DATETIME.tar.gz ${DATETIME}
# 删除对应的备份目录
rm -rf ${BACKUP}/${DATETIME}


# 删除十天前的备份文件
find ${BACKUP} -atime +10 -name "*.tar.gz" -exec rm -rf {} \;
echo "备份数据库${DATABASE}成功！"
```



**使用crond添加定时任务：**

```sh
[root@VM-8-2-centos db]# crontab -l
*/5 * * * * flock -xn /tmp/stargate.lock -c '/usr/local/qcloud/stargate/admin/start.sh > /dev/null 2>&1 &'

30 2 * * * /usr/sbin/mysql_db_backup.sh
```













