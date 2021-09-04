---
title: Linux使用及JavaEE环境搭建
author: ITNXD
toc: true
abbrlink: 58036
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@7e943c035e541c245d0fc9137365bb7debae5e98/2021/05/07/a32f2e71c7e5097a257c9d860015d9a3.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@7e943c035e541c245d0fc9137365bb7debae5e98/2021/05/07/a32f2e71c7e5097a257c9d860015d9a3.png
categories:
  - Linux
tags:
  - Linux
date: 2021-05-07 09:35:41
updated:
---





> 以Centos7.6为主讲解，后面会有Ubuntu不同之处的单独讲解！



# 一、Linux目录结构



> linux 的文件系统是采用层级式的树状目录结构，在此结构中的最上层是根目录“/”，然后在此目录下再创建其他的目录。
>
> **记住一句经典的话：在 Linux 世界里，一切皆文件!**



1. /bin [常用] (/usr/bin 、 /usr/local/bin)：是 Binary 的缩写, 这个目录存放着最经常使用的**命令**
2. /sbin (/usr/sbin 、 /usr/local/sbin)：s 就是 Super User 的意思，这里存放的是系统管理员使用的系**统管理程序**。
3. /home [常用]：**存放普通用户的**，在 Linux 中每个用户都有一个自己的目录，一般该目录名是以用户的账号命名
4. /root [常用]：该目录为**系统管理员**，也称作超级权限者的用户主目录
5. /lib：系统开机所需要最基本的**动态连接共享库**，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库
6. /lost+found：这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件
7. /etc [常用]：所有的系统管理所需要的**配置文件**和子目录, 比如安装 mysql 数据库 my.conf
8. /usr [常用]：这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与 windows 下的 program files 目录。
9. /boot [常用]：存放的是**启动 Linux** 时使用的一些核心文件，包括一些连接文件以及镜像文件
10. /proc [**不能动**]：这个目录是一个**虚拟**的目录，它是**系统内存的映射**，访问这个目录来获取系统信息
11. /srv [**不能动**]：service 缩写，该目录存放一些服务启动之后需要提取的数据
12. /sys [**不能动**]：这是 linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs
13. /tmp：这个目录是用来存放一些**临时文件**的
14. /dev：类似于 windows 的设备管理器，把**所有的硬件用文件的形式存储**
15. /media [常用]：linux 系统会自动识别一些设备，例如 U 盘、光驱等等，当识别后，linux 会把识别的设备**挂载**到这个目录下
16. /mnt [常用]：系统提供该目录是为了让用户**临时挂载别的文件系统**的，我们可以将外部的存储挂载在/mnt/上，然后进入该目录就可以查看里的内容了
17. /opt：这是给主机额外**安装软件所存放的目录**。如安装 ORACLE 数据库就可放到该目录下。默认为空
18. /usr/local [常用]：这是另一个给主机额外**安装软件所安装的目录**。一般是通过编译源码方式安装的程序
19. /var [常用]：这个目录中存放着在不断扩充着的东西，习惯将经常被修改的目录放在这个目录下。包括各种**日志**文件
20. /selinux [security-enhanced linux]：SELinux 是一种**安全子系统**,它能控制程序只能访问特定文件, 有三种工作模式，可以自行设置.









# 二、Vi和Vim编辑器



> Linux 系统会内置 Vi 文本编辑器！
>
> Vim 具有程序编辑的能力，可以看做是 Vi 的增强版本，可以主动的以字体颜色辨别语法的正确性，方便程序设计。代码补全、编译及错误跳转等功能！





## 1、三种模式



- 一般模式：默认模式，可使用上下左右键，可使用复制粘贴，删除整行，删除字符快捷键进行操作！
  - yy：拷贝当前行，拷贝当前行向下的 5 行 5yy
  - p：粘贴
  - dd：删除当前行，删除当前行向下的 5 行 5dd
  - G：最末行
  - gg：最首行
  - u：撤销插入模式的操作
  - `Shift+g`：跳转到指定行，输入行号，再输入 Shift+g
- 插入模式：按下 `i, I, o, O, a, A, r, R` 等任何一个字母之后才会进入编辑模式, 一般来说按 i 即可！
- 命令行模式：输入 `esc` 再输入`:`在这个模式当中， 可以提供你相关指令，完成读取、存盘、替换、离开 vim 、显示行号等的动作则是在此模式中达成的！
  - wq：保存退出
  - q：退出（打开但并未编辑时可用）
  - q!：强制退出，不保存（打开进行了编辑时可用）
  - `/关键字`：回车查找 , 输入 n 就是查找下一个
  - `:set nu` 和 `:set nonu`：设置和取消行号



## 2、三种模式转换图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4de251c608beed6b585c4f2acb8f7a79d33ec445/2021/05/07/78ad5b72d5de9d19400611cd4f505de3.png)









# 三、开关机&重启&登录&注销



## 1、关机 & 重启



> 不管是重启系统还是关闭系统，首先要运行 sync 命令，把内存中的数据写到磁盘中！
>
> 目前的 shutdown/reboot/halt 等命令均已经在关机前进行了 sync！但建议手动运行一次！





1. shutdown –h now 立该关机
2. shudown -h 1 "hello, 1 分钟后会关机了" 
3. shutdown –r now 立刻重启！
4. halt 关机
5. reboot 重启
6. sync 把内存的数据同步到磁盘





## 2、用户登录注销





> 登录时尽量少用 root 帐号登录，因为它是系统管理员，最大的权限，避免操作失误。可以利用普通用户登录，登录后再用 `su - 用户名` 命令来切换成系统管理员身份！
>
> 在提示符下输入 logout 即可注销用户！
>
> logout 注销指令在图形运行级别无效，在**运行级别 3** 下有效！





# 四、用户管理



## 1、添加用户



> 该用户家目录默认位于`/home/xxx`

- `useradd 用户名`：创建用户
- `useradd -d 目录 用户名`：指定家目录
- `useradd –g 用户组 用户名`：指定组

- 为添加用户设置密码：`passwd 用户名`





## 2、删除用户



- `userdel 用户名`：删除用户，但保留家目录
- `userdel -r 用户名`：删除用户，且不保留家目录





## 3、查询用户



> 返回用户id，组id，组名（默认组名为用户名）

- `id 用户名`



```bash
[root@VM-8-2-centos ~]# id itnxd
uid=1001(itnxd) gid=1001(itnxd) groups=1001(itnxd)
```



## 4、切换用户



> 从权限高的用户切换到权限低的用户，不需要输入密码，反之需要！
>
> 当需要返回到原来用户时，使用 exit/logout 指令！



- `su - 用户名`



## 5、查看当前登录用户



- `whoami 或 who am i`



## 6、用户组



> 系统可以对有共性/权限的多个用户进行统一的管理！



1. `groupadd 组名`：创建组
2. `groupdel 组名`：删除组
3. `useradd –g 用户组 用户名`：为创建用户指定组
4. `usermod –g 用户组 用户名`：为指定用户修改组
5. `usermod –d 目录 用户名`：为指定用户修改家目录





## 7、用户和组相关配置文件



- /etc/passwd 文件：记录用户的各种信息。
  - 每行的含义：用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录 Shell
- /etc/shadow 文件：口令的配置文件。
  - 每行的含义：登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志
- /etc/group 文件：组(group)的配置文件，记录 Linux 包含的组的信息
  - 每行含义：组名:口令:组标识号:组内用户列表







# 五、实用指令





## 1、运行级别



> 常用运行级别是 3 和 5 ，也可以指定默认运行级别！
>
> 通过 init 命令来切换不同的运行级别。例如：init 0：关机。

- 0 ：关机
- 1 ：单用户【找回丢失密码】
- 2：多用户状态没有网络服务
- **3：多用户状态有网络服务**
- 4：系统未使用保留给用户
- **5：图形界面**
- 6：系统重启





**centos7 之后的区别：**

> 在 centos7 以前，在`/etc/inittab` 文件中！
>
> 在 centos7 之后，简化为如下：



```bash
multi-user.target: analogous to runlevel 3
graphical.target: analogous to runlevel 5
# To view current default target, run:
systemctl get-default
# To set a default target, run:
systemctl set-default TARGET.target
```





## 2、帮助指令



- man 命令：获得帮助信息
- help 命令：获得 shell 内置命令的帮助信息



## 3、文件目录指令



- `pwd`：获取当前目录绝对路径
- `ls [选项] [目录]`：查看指定目录下详细信息（默认为当前目录）
  - -a ：显示当前目录所有的文件和目录，包括隐藏的
  - -l ：以列表的方式显示信息
  - -h：显示文件大小
- `cd`
  - `cd ~ 或 cd`：回到家目录
  - `cd ..`：回到上一层
- `mkdir [选项] 目录`：创建目录
  - -p ：创建多级目录
- `rmdir [选项] 空目录`：只能删除空目录
- `rm [选项] 目录或文件`：删除目录或文件
  - -r：递归
  - -f：强制删除不提示
- `touch 文件名称`：创建文件
- `cp [选项] source dest`：拷贝文件到指定目录
  - -r ：递归
- `\cp [选项] source dest`：强制覆盖不提示
- `mv oldNameFile newNameFile`：重命名
- `mv /temp/movefile /targetFolder`：剪切
- `cat [选项] 文件名`：查看文件内容
  - -n：显示行号
- `more 文件`：是一个基于 VI 编辑器的文本过滤器，它以全屏幕的方式按页显示文本文件的内容，一些交互指令：
  - 空白键：翻页
  - Enter：下一行
  - q：退出more
  - Ctrl + F：向下滚一屏
  - Ctrl + B：返回上一屏
  - =：显示当前行行号
  - `:f`：输出文件名和行号
- `less 文件`：用来分屏查看文件内容，与 more 类似，但比 more 更加强大，支持各种显示终端。less指令在显示文件内容时，并不是一次将整个文件加载之后才显示，而是根据显示需要加载内容，对于显示大型文件具有较高的效率。
  - 空白键：下翻一页
  - pageDown，pageUp：向下或向上翻一页
  - /字串：向下查找字串，n：向下，N：向上
  - ?字串：向上查找字串，n：向上，N：向下
  - q：退出less
- `echo [选项] [输出内容]`：输出内容到控制台
  - 可以用来输出环境变量，`$PATH $HOSTNAME` 等
  - 也可以用来输出字符串
- `head [选项] 文件`：查看文件头 10 行内容（默认）
  - `-n x`：查看文件头 x 行内容
- `tail [选项] 文件`：查看文件尾 10 行内容（默认）
  - `-n x`：查看文件尾 x 行内容
  - -f：实时追踪该文档的所有更新，Ctrl + z 退出！
- `指令 > 文件`：输出重定向
- `指令 >> 文件`：追加
- `ln -s [原文件或目录] [软链接名]`：创建软连接，类似快捷键，删除软链接后面不需要加斜杠
- `history`：查看已经执行过历史命令,也可以执行历史指令，默认显示所有，后面添加数字指定显示最近条数！





## 4、时间日期类



- `cal [选项]`：查看当前日历（默认本月）可加年份，显示整年
- `date`：显示当前时间
  - `date +%Y`：显示当前年份
  - `date +%m`：显示当前月份
  - `date +%d`：显示当前是哪一天
  - `date "+%Y-%m-%d %H:%M:%S"`：显示年月日时分秒
  - `date -s “年-月-日 时:分:秒”`：设置日期时间





## 5、搜索查找类



- `find [搜索范围] [选项]`：从指定目录向下递归遍历查找
  - -name：指定文件名
  - -user：指定拥有者
  - -size：指定文件大小，+n 大于 -n 小于 n 等于, 单位有 k,M,G。eg：find / -size +200M
- `locate 文件`：可以快速定位文件路径。locate 指令利用事先建立的系统中所有文件名称及路径的 locate 数据库实现快速定位给定的文件。locate 指令无需遍历整个文件系统，查询速度较快
  - 由于 locate 指令基于数据库进行查询，所以第一次运行前，必须使用 updatedb 指令创建 locate 数据库。
- `which 指令`：查询某个指令在哪个目录下，eg：which ls
- `grep [选项] 查找内容 源文件`：
  - -n：显示匹配行及行号
  - -i：忽略字母大小写
  - 可直接使用：eg：grep -n "yes" /home/hello.txt
  - 也可结合**管道符`|`**使用：eg：cat /home/hello.txt | grep "yes"



**管道符`|`**：前面得到的结果交给后面进一步处理！





## 6、压缩解压类



- `gzip 文件`：压缩，只能压缩文件
- `gunzip 文件.gz`：解压
  - 源文件不保留，可操作多个文件，空格隔开！
- `zip [选项] XXX.zip 压缩文件或目录`：压缩，可以压缩文件和目录
  - -r：递归压缩
- `unzip [选项] XXX.zip`：解压
  - -d：指定解压目录
  - 源文件保留，可操作多个文件或目录，空格隔开
- `tar [选项] XXX.tar.gz 打包的内容`：压缩文件或目录
  - -c：产生.tar文件
  - -v：显示详细信息
  - -f：指定压缩后文件名
  - -z：打包同时压缩
  - -x：解压.tar文件
  - 一般：压缩为`-zcvf`，解压为`-zxvf`



**几个案例：**

```bash
案例 1: 压缩多个文件，将 /home/pig.txt 和 /home/cat.txt 压缩成 pc.tar.gz
tar -zcvf pc.tar.gz /home/pig.txt /home/cat.txt
案例 2: 将/home 的文件夹 压缩成 myhome.tar.gz
tar -zcvf myhome.tar.gz /home/
案例 3: 将 pc.tar.gz 解压到当前目录
tar -zxvf pc.tar.gz
案例4: 将myhome.tar.gz 解压到 /opt/tmp2目录下 (1) mkdir /opt/tmp2 (2) tar -zxvf /home/myhome.tar.gz -C /opt/tmp2
```





















# 六、组管理&权限管理





> 在 linux 中的每个用户必须属于一个组，不能独立于组外！
>
> 有所有者、所在组、其它组的概念！





## 1、所有者



- 查看：`ls -alh`
- 修改：`chown [选项] 用户名 文件名`
  - -R：递归生效



## 2、所在组



- 创建组：`groupadd 组名`
- 查看组：`ls -alh`
- 修改组：`chgrp [选项] 组名 文件名`
  - -R：递归生效





## 3、其他组



> 除文件的所有者和所在组的用户外，系统的其它用户都是文件的其它组！





## 4、改变用户所在组



- `usermod –g 新组名 用户名`：改变用户所在组
- `usermod –d 目录名 用户名`： 改变该用户登陆的初始目录。**特别说明：用户需要有进入到新目录的权限**







## 5、权限



```bash
ls -l 中显示的内容如下：
-rwxrw-r-- 1 root root 1213 Feb 2 09:39 abc
```



### 5.1、权限的基本介绍



- 第 0 位确定文件类型(d, - , l , c , b)
  - l 链接，软链接
  - d 目录
  - \- 普通文件
  - c 字符设备文件，鼠标，键盘
  - b 块设备，比如硬盘
- 第 1-3 位确定所有者权限（User）
- 第 4-6 位确定所属组权限（Group）
- 第 7-9 位确定其他用户权限（Other）



### 5.2、rwx权限详讲



**作用到文件：**

- r：代表可读(read): 可以读取,查看
- w：代表可写(write): 可以修改。但是不代表可以删除该文件，**删除一个文件的前提条件是对该文件所在的目录有写权限**
- x：代表可执行(execute):可以被执行



**作用到目录：**

- r：代表可读(read): 可以读取，ls 查看目录内容
- w：代表可写(write): 可以修改, 对目录内创建+删除+重命名目录
- x：代表可执行(execute):可以进入该目录



**可用数字表示**：r=4,w=2,x=1 因此 rwx=4+2+1=7 , 数字可以进行组合！



### 5.3、修改权限



**chmod：**

- 方式一：`+、-、= `变更权限（u:所有者 g:所有组 o:其他人 a:所有人(u、g、o 的总和)）
- 方式二：通过数字变更权限，r=4 w=2 x=1



**几个例子：**

```
chmod u=rwx,g=rx,o=x 文件/目录名
chmod o+w 文件/目录名
chmod a-x 文件/目录名
chmod 751 文件/目录名
```



**chown：**

- `chown newowner 文件/目录`：改变所有者
- `chown newowner:newgroup 文件/目录`：改变所有者和所在组
  - -R 如果是目录 则使其下所有子文件或目录递归生效



**chgrp：**

- `chgrp newgroup 文件/目录`：改变所在组
  - -R 如果是目录 则使其下所有子文件或目录递归生效





# 七、定时任务调度



## 1、cron任务调度



> 使用 crontab 指令进行定时任务的设置！



**crontab [选项]：**

- -e：编辑定时任务
- -l：查询定时任务
- -r：删除当前用户所有定时任务



**五个*含义：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@17e293f77c20e7d662ea263c02741c5987419d2f/2021/05/09/f5a1d5378a76f9d4d1371680afdab504.png)





**特殊符号：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@22cebcfa59b7fdd435c39a640bd1ddea0355226f/2021/05/09/817e3dc69853129bf7d0c967745a0f75.png)





**crond 相关指令：**

- conrtab –r：终止任务调度
- crontab –l：列出当前所有任务调度
- service crond restart：重启任务调度



## 2、at任务调度





> at 命令是**一次性定时计划任务**，at 的守护进程 atd 会以后台模式运行，检查作业队列来运行。
>
> 默认情况下，atd 守护进程每 60 秒检查作业队列，有作业时，会检查作业运行时间，如果时间与当前时间匹配，则运行此作业。
>
> 在使用 at 命令的时候，一定要保证 atd 进程的启动 , 可以使用相关指令来查看`ps -ef | grep atd`！



- `at [选项] [时间]`：Ctrl + D 结束 at 命令的输入， 输出两次
- `atq`：查看系统中没有执行的工作任务
- `atrm 编号`：删除已设置任务

**at 命令选项：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@50c712db65a473994d8aa8a5fea308f18c0beb44/2021/05/09/aa083a24bf23c5be183716d6c4c4f668.png)







**at 指定时间的方法：**

1. 接受在当天的 hh:mm（小时:分钟）式的时间指定。假如该时间已过去，那么就放在第二天执行。 例如：04:00
2. 使用 midnight（深夜），noon（中午），teatime（饮茶时间，一般是下午 4 点）等比较模糊的词语来指定时间。
3. 采用 12 小时计时制，即在时间后面加上 AM（上午）或 PM（下午）来说明是上午还是下午。 例如：12pm
4. 指定命令执行的具体日期，指定格式为 month day（月 日）或 mm/dd/yy（月/日/年）或 dd.mm.yy（日.月.年），指定的日期必须跟在指定时间的后面。 例如：04:00 2021-03-1
5. 使用相对计时法。指定格式为：now + count time-units ，now 就是当前时间，time-units 是时间单位，这里能够是 minutes（分钟）、hours（小时）、days（天）、weeks（星期）。count 是时间的数量，几天，几小时。 例如：now + 5 minutes
6. 直接使用 today（今天）、tomorrow（明天）来指定完成命令的时间。



**举例：**

```bash
[root@VM-8-2-centos ~]# at 5pm + 2days
at> ls -alh > /var/ls.log     
at> <EOT>
job 1 at Tue May 11 17:00:00 2021
```













# 八、分区&挂载



## 1、分区



> Linux 采用了一种叫“载入”的处理方法，它的整个文件系统中包含了一整套的文件和目录，且**将一个分区和一个目录联系起来**。这时要载入的一个分区将使它的存储空间在一个目录下获得。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@33c8984e837657d3c95588298c0e2f75f17fac69/2021/05/09/47bf7cd46e7c31635cb39afd2157aaf1.png)



**Linux 硬盘介绍：**

1. Linux 硬盘分 IDE 硬盘和 SCSI 硬盘，目前基本上是 SCSI 硬盘
2. 对于 IDE 硬盘，驱动器标识符为“hdx~”,其中“hd”表明分区所在设备的类型，这里是指 IDE 硬盘了。“x”为盘号（a 为基本盘，b 为基本从属盘，c 为辅助主盘，d 为辅助从属盘）,“~”代表分区，前四个分区用数字 1 到 4 表示，它们是主分区或扩展分区，从 5 开始就是逻辑分区。例，hda3 表示为第一个 IDE 硬盘上的第三个主分区或扩展分区,hdb2 表示为第二个 IDE 硬盘上的第二个主分区或扩展分区。
3. 对于 SCSI 硬盘则标识为“sdx~”，SCSI 硬盘是用“sd”来表示分区所在设备的类型的，其余则和 IDE 硬盘的表示方法一样



**查看所有设备挂载情况：**`lsblk/lsblk -f`



```bash
[root@itnxd100 ~]# lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk 
├─sda1   8:1    0    1G  0 part /boot
├─sda2   8:2    0    2G  0 part [SWAP]
└─sda3   8:3    0   17G  0 part /
sdb      8:16   0   20G  0 disk 
├─sdb1   8:17   0  500M  0 part 
└─sdb2   8:18   0 19.5G  0 part 
sr0     11:0    1 1024M  0 rom  

[root@itnxd100 ~]# lsblk -f
NAME   FSTYPE LABEL UUID                                 MOUNTPOINT
sda                                                      
├─sda1 ext4         a94968fa-d434-4907-a724-f32d4168262f /boot
├─sda2 swap         39420955-4d5f-4a55-b923-023ce46e3d33 [SWAP]
└─sda3 ext4         d3673e81-472b-49fe-a4ea-0fa00fc5ca05 /
sdb                                                      
├─sdb1 ext4         18da3c5d-3712-4197-a559-21934d2444ca 
└─sdb2 ext4         a1a5af2e-9111-4a82-b399-w 
sr0  
```





## 2、挂载





> 以VM虚拟机增加一块硬盘熟悉磁盘分区、挂载、卸载！



**虚拟机添加硬盘：**



- 【虚拟机】菜单中，选择【设置】，然后设备列表里添加硬盘，然后一路【下一步】，中间只有选择磁盘大小的地方需要修改，至到完成。然后重启系统（才能识别）
- 第一块硬盘为sda，第二块硬盘为sdb，依次类推…



**分区：**

- `fdisk /dev/sdb`：将新添加的硬盘sdb进行分区
- 开始分区后输入 n，新增分区，然后选择 p ，分区类型为主分区。两次回车默认剩余全部空间。最后输入 w写入分区并退出，若不保存退出输入 q。
  - m 显示命令列表
  - p 显示磁盘分区 同 fdisk –l
  - n 新增分区
  - d 删除分区
  - w 写入并退出



**格式化：**



- `mkfs -t ext4 /dev/sdb1`，ext4 是分区类型

**挂载：**将一个分区与一个目录联系起来

- `mount 设备名称 挂载目录`：挂载，eg：`mount /dev/sdb1 /newdisk`
- `umount 设备名称 或者 挂载目录`：卸载，eg：`umount /dev/sdb1 或者 umount /newdisk`



**注意**：用命令行挂载,重启后会失效



**设置可以自动挂载：**



- 永久挂载：通过修改 `/etc/fstab` 实现挂载。添加一行映射如下：

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@609f877175aaaca8b21cbfc206c1122d5205f61d/2021/05/09/aa8274a2bfa47c416ca9296ed5aa8ab2.png)

- 添加完成后 执行 `mount –a` 即刻生效

















## 3、磁盘情况查询



- `df -h`：查询系统整体磁盘使用情况
- `du [选项] [目录]`：查询指定目录的磁盘占用情况，默认为当前目录
  - -s 指定目录占用大小汇总
  - -h 带计量单位
  - -a 含文件
  - --max-depth=1 子目录深度
  - -c 列出明细的同时，增加汇总值





## 4、其他实用指令



- `wc -l`：统计目录或文件数量，常用在管道`|`后面
- `tree [目录]`：树状显示目录，需要`yum install tree`安装



**几个例子：**

```bash
1) 统计/opt 文件夹下文件的个数
ls -l /opt | grep "^-" | wc -l
2) 统计/opt 文件夹下目录的个数
ls -l /opt | grep "^d" | wc -l
3) 统计/opt 文件夹下文件的个数，包括子文件夹里的
ls -lR /opt | grep "^-" | wc -l
4) 统计/opt 文件夹下目录的个数，包括子文件夹里的
ls -lR /opt | grep "^d" | wc 
```







# 九、网络配置





## 1、NAT网络配置原理图示



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6a5887ed334fa98d0f24d9485ccc2f33494e43f3/2021/05/09/f8582a07890c54439e02858d7044e44d.png)



## 2、配置固定 IP 地址



> DHCP模式自动获取可能产生冲突，且工作中一定是一个固定地址！



1. 查看虚拟网络编辑器和修改子网 IP 地址`192.168.x.0`



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@50bfe76013007c911af163a08df74cfa33776cb8/2021/05/09/ac985e7b483eb552ece31fb70e929a8f.png)





2. 修改网关IP地址`192.168.x.2`



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@b058a55dcbdc39c7c0604f1c628f600504381bfa/2021/05/09/656b59a3609aebe8624923c866e4f82b.png)







3. 查看 windows 环境的中 VMnet8 网络配置(ipconfig 指令)，为`192.168.x.1`



4. 直接修改配置文件来指定 IP，指定IP为`192.168.x.y`，x与上面相同，y自己设定！



```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33

ifcfg-ens33 文件说明

DEVICE=eth0 #接口名（设备,网卡）
HWADDR=00:0C:2x:6x:0x:xx #MAC 地址
TYPE=Ethernet #网络类型（通常是 Ethemet）
UUID=926a57ba-92c6-4231-bacb-f27e5e6a9f44 #随机 id

# 修改下面两行，增加最后三行！

#系统启动的时候网络接口是否有效（yes/no）
ONBOOT=yes
# IP 的配置方法[none|static|bootp|dhcp]（引导时不使用协议|静态分配 IP|BOOTP 协议|DHCP 协议）
BOOTPROTO=static
#IP 地址
IPADDR=192.168.200.130
#网关
GATEWAY=192.168.200.2
#域名解析器
DNS1=192.168.200.2
```



5. 重启网络服务或者重启系统生效，`service network restart 、reboot`
6. 可使用`ifconfig`查看 IP 地址
7. Windows和Linux互ping检查连通性！





## 3、主机名与Hosts映射



**主机名：**

- 查看主机名：`hostname`
- 修改主机名：`vim /etc/hostname` 指定，修改后，重启生效



**Hosts映射：**

- windows hosts 位置：`C:\Windows\System32\drivers\etc\hosts`，eg：`: 192.168.200.130 centos`

- linux hosts 位置：`/etc/hosts`，eg：`: 192.168.200.1 windows`







# 十、进程管理







> - 在 LINUX 中，每个执行的程序都称为一个进程。每一个进程都分配一个 ID 号(pid,进程号)。
>
> - 每个进程都可能以两种方式存在的。**前台与后台**，所谓前台进程就是用户目前的屏幕上可以进行操作的。后台进程则是实际在操作，但由于屏幕上无法看到的进程，通常使用后台方式执行。
> - 一般系统的服务都是以后台进程的方式存在，而且都会常驻在系统中。直到关机才才结束





## 1、ps指令



- `ps`：命令是用来查看目前系统中，有哪些正在执行，以及它们执行的状况。可以不加任何参数。一般为`ps -aux`
  - -a：显示当前终端的所有进程信息
  - -u：以用户的格式显示进程信息
  - -x：显示后台进程运行的参数
  - -e：显示所有进程
  - -f：全格式
- `ps –aux | grep xxx`：使用管道符查看某个进程是否在服务
- `ps -ef`：是以全格式显示当前所有的进程，可以查看进程的**父进程PPID**。
  - PPID：父进程 ID
  - C：CPU 用于计算执行优先级的因子。数值越大，表明进程是 CPU 密集型运算，执行优先级会降低；数值越小，表明进程是 I/O 密集型运算，执行优先级会提高
  - STIME：进程启动的时间
  - TTY：完整的终端名称
  - TIME：CPU 时间
  - CMD：启动进程所用的命令和参数

**ps指令详解：**

- System V 展示风格
- USER：用户名称
- PID：进程号
- %CPU：进程占用 CPU 的百分比
- %MEM：进程占用物理内存的百分比
- VSZ：进程占用的虚拟内存大小（单位：KB）
- RSS：进程占用的物理内存大小（单位：KB）
- TTY：终端名称缩写
- STAT：进程状态，其中 S-睡眠，s-表示该进程是会话的先导进程，N-表示进程拥有比普通优先级更低的优先级，R- 正在运行，D-短期等待，Z-僵死进程，T-被跟踪或者被停止等等
- STARTED：进程的启动时间
- TIME：CPU 时间，即进程使用 CPU 的总时间
- COMMAND：启动进程所用的命令和参数，如果过长会被截断显示







## 2、kill指令



- `kill [选项] 进程号`：通过进程号杀死/终止进程
  - -9：表示强迫进程立即停止
- `killall 进程名称`：通过进程名称杀死进程，也支持通配符，这在系统因负载过大而变得很慢时很有用



## 3、pstree指令



- pstree [选项]：查看进程树！
  - -p :显示进程的 PID
  - -u :显示进程的所属用户







## 4、服务service管理



> 服务(service) 本质就是进程，但是是**运行在后台**的，通常都会监听某个端口，等待其它程序的请求，比如(mysqld , sshd防火墙等)，因此我们又称为守护进程！
>
> 在 CentOS7.0 后 很多服务不再使用 `service` ,而是 `systemct`！





- `service 服务名 [start | stop | restart | reload | status]`
  - service 指令管理的服务在 /etc/init.d 查看：`ls -l /etc/init.d`
- `setup`：`setup -> 系统服务` 就可以看到全部
  - tab键切换选择区域
  - 空格键设置是否自启
  - 回车键确认
- `chkconfig`：给服务的各个运行级别设置自 启动/关闭，chkconfig 指令管理的服务在 /etc/init.d 查看。注意: Centos7.0 后，很多服务使用 systemctl 管理。**（不重要）**
  - `chkconfig --list [| grep xxx]`：查看服务 
  - `chkconfig 服务名 --list`
  - `chkconfig --level 5 服务名 on/off`
  - chkconfig 重新设置服务后自启动或关闭，需要重启机器 reboot 生效
- `systemctl [start | stop | restart | status] 服务名`
  - systemctl 指令管理的服务在 `/usr/lib/systemd/system` 查看
  - `systemctl list-unit-files [ | grep 服务名]`：查看服务开机启动状态, grep 可以进行过滤
  - `systemctl enable 服务名`：设置服务开机启动
  - `systemctl disable 服务名`：关闭服务开机启动
  - `systemctl is-enabled 服务名`：查询某个服务是否是自启动的



## 5、防火墙



> 可以在windows中使用`telnet`命令测试某端口是否通畅！



1. 打开端口: `firewall-cmd --permanent --add-port=端口号/协议`
2. 关闭端口: `firewall-cmd --permanent --remove-port=端口号/协议`
3. 重新载入,才能生效 : `firewall-cmd --reload`
4. 查询端口是否开放: `firewall-cmd --query-port=端口/协议`





`netstat -anp`：显示详细端口及协议！







## 6、动态监控进程



> top 与 ps 命令很相似。它们都用来显示正在执行的进程。top 与 ps 最大的不同之处在于 top 在执行一段时间可以更新正在运行的的进程！



- `top [选项]`：
  - -d：指定秒数，默认3秒
  - -i：指定不显示闲置和僵尸进程
  - -p：指定进程id单独监控某个进程
- top交互命令：
  - P：按CPU使用率排序，默认
  - M：按内存使用率排序
  - N：按PID排序
  - u：输入用户名，监控特定用户
  - k：输入进程PID，杀掉特定进程
  - q：退出top



## 7、网络状态监控



> 可以用来查看防火墙端口及协议，也可查看详细的网络端口配置！

- `netstat [选项]`
  - -an：按一定顺序排列输出
  - -p：显示哪个进程在调用
  - eg：`netstat -anp | grep sshd`，查看sshd服务











# 十一、RPM & YUM





## 1、RPM



> RPM是 RedHat Package Manager（RedHat 软件包管理工具）的缩写！
>
> 就是一个`rpm`后缀的安装包，可以使用rpm相关命令来安装和卸载！





- `rpm –qa | grep xx`：查看是否安装xx
- `rpm -qi 软件包名`：查询软件包信息
- `rpm -ql 软件包名`：查询软件包中的文件
- `rpm -qf 文件全路径名`：查询文件所属的软件包
- `rpm -e 包名`：卸载包
- `rpm -e --nodeps 包名`：强制卸载，即使有依赖关系
- `rpm -ivh 包名`：安装，一般将.rpm安装包移动到/opt目录下！
  - i=install：安装
  - v=verbo：提示
  - h=hash：进度条



**rpm 包名基本格式：**

```
一个 rpm 包名：firefox-60.2.2-1.el7.centos.x86_64
名称:firefox
版本号：60.2.2-1
适用操作系统: el7.centos.x86_64
表示 centos7.x 的 64 位系统
如果是 i686、i386 表示 32 位系统，noarch 表示通用
```





## 2、YUM



> Yum 是一个 Shell 前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包。



- `yum list | grep xx`：查询xx软件
- `yum install xxx`：下载安装xx







# 十二、Linux配置JavaEE环境









## 1、安装JDK



1. `mkdir /opt/jdk`
2. 通过 xftp 上传到 /opt/jdk 下
3. `cd /opt/jdk`
4. 解压 `tar -zxvf jdk-8u261-linux-x64.tar.gz`
5. `mkdir /usr/local/java`
6. `mv /opt/jdk/jdk1.8.0_261 /usr/local/java`
7. 配置环境变量的配置文件 `vim /etc/profile`
8. `export JAVA_HOME=/usr/local/java/jdk1.8.0_261`
9. `export PATH=$JAVA_HOME/bin:$PATH`
10. `source /etc/profile [让新的环境变量生效]`



**测试：java -version**



## 2、安装Tomcat



> 以Tomcat8.5.65为例！



1. 上传安装文件，并解压缩到/opt/tomcat
2. 进入解压目录/bin , 启动 tomcat `./startup.sh`
3. 开放端口 8080 
   1. firewall-cmd --permanent --add-port=8080/tcp：开放8080
   2. firewall-cmd --reload：重载配置生效
   3. firewall-cmd --query-port=8080/tcp：检测是否开放成功





**测试：ip地址:8080**













## 3、安装Mysql





1. 新建文件夹/opt/mysql，并cd进去
2. 运行`wget http://dev.mysql.com/get/mysql-5.7.26-1.el7.x86_64.rpm-bundle.tar`，下载mysql安装包
3. 运行`tar -xvf mysql-5.7.26-1.el7.x86_64.rpm-bundle.tar`
4. 运行`rpm -qa | grep mari`，查询mariadb相关安装包（centos7.6自带的类mysql数据库是mariadb，会跟mysql冲突，要先删除。）
5. 运行`rpm -e --nodeps mariadb-libs`，卸载
6. 然后开始真正安装mysql，依次运行以下几条

```bash
rpm -ivh mysql-community-common-5.7.26-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-5.7.26-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-5.7.26-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-5.7.26-1.el7.x86_64.rpm
```

7. 运行`systemctl start mysqld.service`，启动mysql
8. 然后开始设置root用户密码，Mysql自动给root用户设置随机密码，运行`grep "password" /var/log/mysqld.log`可看到当前密码
9. 运行`mysql -u root -p`，用root用户登录，提示输入密码可用上述的
10. 设置root密码，对于个人开发环境，如果要设比较简单的密码（**生产环境服务器要设复杂密码**），可以运行`set global validate_password_policy=0;` 提示密码设置策略（validate_password_policy默认值1）
    1. 0：只要求长度 (默认8位)
    2. 1：要求数字、大小写、特殊字符组合
    3. 2：要求数字、大小写、特殊字符组合、字典文件组合
11. `set password for 'root'@'localhost' =password('xxx');`
12. 运行`flush privileges;`使密码设置生效





**使第三方软件SQLyog可以连接：**

1. 登录数据库
2. `GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "root用户的密码";` 添加远程登陆功能
3. `set names utf8;` 设置数据库编码为UTF-8
4. 输入quit指令退出数据库，输入 `service mysqld restart; `重启mysql服务
5. 开放3306端口：

```sh
firewall-cmd --permanent --add-port=3306/tcp 开放端口
firewall-cmd --reload 重载配置
firewall-cmd --query-port=3306/tcp 查询是否开放成功
```



# 十三、Linux日志管理





> 日志文件是重要的系统信息文件，其中记录了许多重要的系统事件，包括用户的登录信息、系统的启动信息、系统的安全信息、邮件相关信息、各种服务相关信息等。
>
> 日志对于安全来说也很重要，它记录了系统每天发生的各种事情，通过日志来检查错误发生的原因，或者受到攻击时攻击者留下的痕迹！
>
> 可以这样理解 日志是用来记录重大事件的工具！





## 1、系统常用日志



- /var/log/ 目录就是系统日志文件的保存位置



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@dc965ab703f498f5a01cbf660080ce657dc258f1/2021/05/09/31457fa3964b417e9dc426de5ecd4841.png)







## 2、日志管理服务rsyslogd





> CentOS7.6 日志服务是 rsyslogd ， CentOS6.x 日志服务是 syslogd 。rsyslogd 功能更强大。rsyslogd 的使用、日志文件的格式，和 syslogd 服务兼容的。





- 查询 Linux 中的 rsyslogd 服务是否启动`ps aux | grep "rsyslog" | grep -v "grep"`
- 查询 rsyslogd 服务的自启动状态 `systemctl list-unit-files | grep rsyslog`
- 配置文件：/etc/rsyslog.conf
- 编辑文件时的格式为：`*.*` 存放日志文件
  - 其中第一个`*`代表日志类型
  - 第二个`*`代表日志级别





**日志类型：**

```sh
auth ##pam 产生的日志
authpriv ##ssh、ftp 等登录信息的验证信息
corn ##时间任务相关
kern ##内核
lpr ##打印
mail ##邮件
mark(syslog)-rsyslog ##服务内部的信息，时间标识
news ##新闻组
user ##用户程序产生的相关信息
uucp ##unix to nuix copy 主机之间相关的通信
local 1-7 ##自定义的日志设备
```



**日志级别：**



```sh
debug ##有调试信息的，日志通信最多
info ##一般信息日志，最常用
notice ##最具有重要性的普通条件的信息
warning ##警告级别
err ##错误级别，阻止某个功能或者模块不能正常工作的信息
crit ##严重级别，阻止整个系统或者整个软件不能正常工作的信息
alert ##需要立刻修改的信息
emerg ##内核崩溃等重要信息
none ##什么都不记录
注意：从上到下，级别从低到高，记录信息越来越少
```



**由日志服务 rsyslogd 记录的日志文件，日志文件的格式包含以下 4 列：**

1. 事件产生的时间
2. 产生事件的服务器的主机名
3. 产生事件的服务名或程序名
4. 事件的具体信息



**一个例子：** 

在/etc/rsyslog.conf 中添加一个日志文件/var/log/itnxd.log,当有事件发送时(比如 sshd 服务相关事件)，该文件会接收到信息并保存!

```sh
# 增加自定义日志
*.*                                                     /var/log/itnxd.log
```





## 3、日志轮替



> 日志轮替就是把旧的日志文件移动并改名，同时建立新的空日志文件，当旧日志文件超出保存的范围之后，就会进行删除！





1. centos7 使用 logrotate 进行日志轮替管理，要想改变日志轮替文件名字，通过 `/etc/logrotate.conf` 配置文件中“dateext”参数
2. 如果配置文件中有“dateext”参数，那么日志会用日期来作为日志文件的后缀，例如 “secure-20201010”。这样日志文件名不会重叠，也就不需要日志文件的改名， 只需要指定保存日志个数，删除多余的日志文件即可。
3. 如果配置文件中没有“dateext”参数，日志文件就需要进行改名了。当第一次进行日志轮替时，当前的“secure”日志会自动改为“secure.1”，然后新建“secure”日志， 用来保存新的日志。当第二次进行日志轮替时，“secure.1”会自动改名为“secure.2”， 当前的“secure”日志会自动改名为“secure.1”，然后也会新建“secure”日志，用来保存新的日志，以此类推。





## 4、logrotate 配置文件



**/etc/logrotate.conf文件：**

```sh
/etc/logrotate.conf 为 logrotate 的全局配置文件
# rotate log files weekly, 每周对日志文件进行一次轮替
weekly
# keep 4 weeks worth of backlogs, 共保存 4 份日志文件，当建立新的日志文件时，旧的将会被删除
rotate 4
# create new (empty) log files after rotating old ones, 创建新的空的日志文件，在日志轮替后
create
# use date as a suffix of the rotated file, 使用日期作为日志轮替文件的后缀
dateext
# uncomment this if you want your log files compressed, 日志文件是否压缩。如果取消注释，则日志会在转储的同时进行压缩
#compress
#RPM packages drop log rotation information into this directory
include /etc/logrotate.d
# 包含 /etc/logrotate.d/ 目录中所有的子配置文件。也就 是说会把这个目录中所有子配置文件读取进来，
#下面是单独设置，优先级更高。
# no packages own wtmp and btmp -- we'll rotate them here
/var/log/wtmp {
    monthly # 每月对日志文件进行一次轮替
    create 0664 root utmp # 建立的新日志文件，权限是 0664 ，所有者是 root ，所属组是 utmp 组
    minsize 1M # 日志文件最小轮替大小是 1MB 。也就是日志一定要超过 1MB 才会轮替，否则就算时间达到一个月，也不进行日志转储
    rotate 1 # 仅保留一个日志备份。也就是只有 wtmp 和 wtmp.1 日志保留而已
}
/var/log/btmp {
    missingok # 如果日志不存在，则忽略该日志的警告信息
    monthly
    create 0600 root utmp
    rotate 1
}
```





**参数说明：**

1. daily：日志的轮替周期是每天
2. weekly：日志的轮替周期是每周
3. monthly：日志的轮替周期是每月
4. rotate 数字：保留的日志文件的个数。0 指没有备份
5. compress：日志轮替时，旧的日志进行压缩
6. create mode owner group：建立新日志，同时指定新日志的权限与所有者和所属组。
7. mail address：当日志轮替时，输出内容通过邮件发送到指定的邮件地址。
8. missingok：如果日志不存在，则忽略该日志的警告信息
9. notifempty：如果日志为空文件，则不进行日志轮替
10. minsize 大小：日志轮替的最小值。也就是日志一定要达到这个最小值才会轮替，否则就算时间达到也不轮替
11. size 大小：日志只有大于指定大小才进行日志轮替，而不是按照时间轮替。
12. dateext：使用日期作为日志轮替文件的后缀。
13. sharedscripts：在此关键字之后的脚本只执行一次。
14. prerotate/endscript：在日志轮替之前执行脚本命令。
15. postrotate/endscript：在日志轮替之后执行脚本命令。





## 5、把自己的日志加入日志轮替



> 第一种方法是直接在/etc/logrotate.conf 配置文件中写入该日志的轮替策略
>
> 第二种方法是在/etc/logrotate.d/目录中新建立该日志的轮替文件，在该轮替文件中写入正确的轮替策略，因为该目录中的文件都会被“include”到主配置文件中，所以也可以把日志加入轮替。
>
> 推荐使用第二种方法，因为系统中需要轮替的日志非常多，如果全都直接写 入/etc/logrotate.conf 配置文件，那么这个文件的可管理性就会非常差，不利于此文件的维护。



**/etc/logrotate.d文件的下面的日志轮替策略：**

```bash
[root@itnxd100 ~]# ls /etc/logrotate.d
bootlog  firewalld    itnxd.log      numad   samba   wpa_supplicant
chrony   glusterfs    libvirtd       ppp     sssd    yum
cups     iscsiuiolog  libvirtd.qemu  psacct  syslog
```



 **日志轮替机制原理：**



> 日志轮替之所以可以在指定的时间备份日志，是依赖系统定时任务。在 /etc/cron.daily/目录，就会发现这个目录中是有 logrotate 文件(可执行)，logrotate 通过这个文件依赖定时任务执行的。



```bash
[root@itnxd100 ~]# ls -l /etc/cron.daily/
总用量 12
-rwx------. 1 root root 219 4月   1 2020 logrotate
-rwxr-xr-x. 1 root root 618 10月 30 2018 man-db.cron
-rwx------. 1 root root 208 4月  11 2018 mlocate
```







## 6、查看内存日志



> **注意: journalctl 查看的是内存日志, 重启清空**



```sh
journalctl 可以查看内存日志, 这里我们看看常用的指令

journalctl ##查看全部
journalctl -n 3 ##查看最新 3 条
journalctl --since 19:00 --until 19:10:10 #查看起始时间到结束时间的日志可加日期
journalctl -p err ##报错日志
journalctl -o verbose ##日志详细内容
journalctl _PID=1245 _COMM=sshd ##查看包含这些参数的日志（在详细日志查看）
或者 journalctl | grep sshd
```



# 十四、内核升级





> 内核地址：[https://www.kernel.org/ ](https://www.kernel.org/ )



**步骤：**

```sh
uname -a // 查看当前的内核版本
yum info kernel -q //检测内核版本，显示可以升级的内核
yum update kernel //升级内核
yum list kernel -q //查看已经安装的内核
```







# 十五、备份 & 恢复





## 1、备份



- 方式一：把需要的文件(或者分区)用 TAR 打包就行，下次需要恢复的时候，再解压开覆盖即可
- **方式二：使用 dump 和 restore 命令（推荐）**



**使用 dump 完成备份：**

> dump 支持分卷和增量备份（所谓增量备份是指备份上次备份后 修改/增加过的文件，也称差异备份）
>
> **注意：在备份分区时，是可以支持增量备份的，如果备份文件或者目录，不再支持增量备份, 即只能使用 0 级别备份！**







下载并安装：

```sh
yum -y install dump

yum -y install restore
```



**命令：**`dump [ -cu] [-123456789] [ -f <备份后文件名>] [-T <日期>] [ 目录或文件系统]`

- -c ： 创建新的归档文件，并将由一个或多个文件参数所指定的内容写入归档文件的开头。
- -0123456789： 备份的层级。0 为最完整备份，会备份所有文件。若指定 0 以上的层级，则备份至上一次备份以来修改或新增的文件, 到 9 后，可以再次轮替. 
- -f <备份后文件名>： 指定备份后文件名
- -j : 调用 bzlib 库**压缩备份文件**，也就是将备份后的文件压缩成 bz2 格式，让文件更小
- -T <日期>： 指定开始备份的时间与日期
- -u ： 备份完毕后，在/etc/dumpdares 中记录备份的文件系统，层级，日期与时间等。
- -t ： 指定文件名，若该文件已存在备份文件中，则列出名称
- -W ：显示需要备份的文件及其最后一次备份的层级，时间 ，日期。
- -w ：与-W 类似，但仅显示需要备份的文件。



**几个例子：**

```sh
将/boot 分区所有内容备份到/opt/boot.bak0.bz2 文件中，备份层级为“0”
dump -0uj -f /opt/boot.bak0.bz2 /boot
在/boot 目录下增加新文件，备份层级为“1”(只备份上次使用层次“0”备份后发生过改变的数据), 注意比较看看这次生成的备份文件 boot1.bak 有多大
dump -1uj -f /opt/boot.bak1.bz2 /boot
注意: 通过 dump 命令在配合 crontab 可以实现无人值守备份
```



**其他命令：**

- `cat /etc/dumpdates`：查看备份时间文件
- `dump -W`：显示需要备份的文件及其最后一次备份的层级，时间 ，日期







## 2、恢复





> restore 命令用来恢复已备份的文件，可以从 dump 生成的备份文件中恢复原文件！



`restore [模式选项] [选项]`：四个模式， 不能混用，在一次命令中， 只能指定一种

- -C ：使用对比模式，将备份的文件与已存在的文件相互对比。
- -i：使用交互模式，在进行还原操作时，restors 指令将依序询问用户
- **-r：进行还原模式**
- -t : 查看模式，看备份文件有哪些文件

**选项：**-f <备份设备>：从指定的文件中读取备份数据，进行还原操作





**几个例子：**

```sh
restore 命令比较模式，比较备份文件和原文件的区别
测试
mv /boot/hello.java /boot/hello100.java
restore -C -f boot.bak1.bz2 //注意和 最新的文件比较
mv /boot/hello100.java /boot/hello.java
restore -C -f boot.bak1.bz2

restore 命令查看模式，看备份文件有哪些数据/文件
测试
restore -t -f boot.bak0.bz2

restore 命令还原模式, 注意细节： 如果你有增量备份，需要把增量备份文件也进行恢复， 有几个增量备份文件，就要恢复几个，按顺序来恢复即可。
测试
mkdir /opt/boottmp
cd /opt/boottmp
restore -r -f /opt/boot.bak0.bz2 //恢复到第 1 次完全备份状态
restore -r -f /opt/boot.bak1.bz2 //恢复到第 2 次增量备份状态
```





# 十六、Ubuntu介绍





## 1、Ubuntu 的 root 用户





> 安装 ubuntu 成功后，都是普通用户权限，并没有最高 root 权限，如果需要使用 root 权限的时候，通常都会在命令前面加上 sudo 。有的时候感觉很麻烦。
>
> 我们一般使用 su 命令来直接切换到 root 用户的，但是如果没有给 root 设置初始密码，就会抛出 su : Authentication failure 这样的问题。所以，我们只要给 root 用户设置一个初始密码就好了!





**给 root 用户设置密码并使用：**



1. 输入 sudo passwd 命令，设定 root 用户密码。
2. 设定 root 密码成功后，输入 su 命令，并输入刚才设定的 root 密码，就可以切换成 root 了。提示符$代表一般用户，提示符#代表 root 用户。
3. 以后就可以使用 root 用户了
4. 输入 exit 命令，退出 root 并返回一般用户







## 2、Ununtu的APT包管理器



> apt 是 Advanced Packaging Tool 的简称，是一款安装包管理工具。在 Ubuntu 下，我们可以使用 apt 命令进行软件包的安装、删除、清理等，类似于 Windows 中的软件管理工具！







**APT操作相关命令：**

1. **sudo apt-get update更新源**
2. **sudo apt-get install package安装包**
3. **sudo apt-get remove package删除包**
4. sudo apt-cache show package获取包的相关信息，如说明、大小、版本等
5. sudo apt-cache search package 搜索软件包
6. sudo apt-get install package --reinstall 重新安装包
7. sudo apt-get -f install 修复安装
8. sudo apt-get remove package --purge 删除包，包括配置文件等
9. sudo apt-get build-dep package 安装相关的编译环境
10. sudo apt-get upgrade 更新已安装的包
11. sudo apt-get dist-upgrade 升级系统
12. sudo apt-cache depends package 了解使用该包依赖那些包
13. sudo apt-cache rdepends package 查看该包被哪些包依赖
14. sudo apt-get source package下载该包的源代码





## 3、设置APT为中国镜像源





1. `sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup`：先备份一下
2. `echo '' > source.list`：清空该配置文件

3. 版本号（或者官方一点的说：系统代号），所以我们先了解下新版本的系统代号：`lsb_release -c`，我的是focal
4. 将下方内容的focal修改为你对应的版本号即可！

```sh
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
```

5. sudo apt-get update：更新源地址，使配置生效





## 4、安装sshd服务



> Ubuntu默认没有sshd服务，我们来安装一下！



netstat查看一下：（默认也没有该命令，使用`apt install net-tools`安装）

1. `sudo apt-get install openssh-server`：安装
2. `service sshd restart`：重启
3. `ssh 用户名@IP`：远程登录其他服务器

