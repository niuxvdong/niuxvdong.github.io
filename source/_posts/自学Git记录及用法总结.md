---
title: 自学Git记录及用法总结
author: Mr.Niu
toc: true
top: true
abbrlink: 50207
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/banners/1.jpg'
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/banners/1.jpg'
categories:
  - Git
tags:
  - Git
  - Github
date: 2020-02-06 21:02:25
updated:
---

![Git](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/git.jpg)

> Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。



**本文资料参考：** 

> [廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
>
> [菜鸟Git教程](https://www.runoob.com/git/git-tutorial.html)

**相关文章推荐：**

> [Git五分钟教程](https://www.runoob.com/w3cnote/git-five-minutes-tutorial.html)
>
> [Github简明教程](https://www.runoob.com/w3cnote/git-guide.html)

**Git命令文档参考：**

> [Git官方文档参考](https://git-scm.com/docs)
>
> [菜鸟Git文档PDF](https://www.runoob.com/manual/github-git-cheat-sheet.pdf)
>
> [国外友人制作Git文档](https://gitee.com/liaoxuefeng/learn-java/raw/master/teach/git-cheatsheet.pdf)



## 一、 Git的诞生



> 很多人都知道，Linus在1991年创建了开源的Linux，从此，Linux系统不断发展，已经成为最大的服务器系统软件了。
>
> Linus虽然创建了Linux，但Linux的壮大是靠全世界热心的志愿者参与的，这么多人在世界各地为Linux编写代码，那Linux的代码是如何管理的呢？
>
> 事实是，在2002年以前，世界各地的志愿者把源代码文件通过diff的方式发给Linus，然后由Linus本人通过手工方式合并代码！
>
> 你也许会想，为什么Linus不把Linux代码放到版本控制系统里呢？不是有CVS、SVN这些免费的版本控制系统吗？因为Linus坚定地反对CVS和SVN，这些集中式的版本控制系统不但速度慢，而且必须联网才能使用。有一些商用的版本控制系统，虽然比CVS、SVN好用，但那是付费的，和Linux的开源精神不符。
>
> 不过，到了2002年，Linux系统已经发展了十年了，代码库之大让Linus很难继续通过手工方式管理了，社区的弟兄们也对这种方式表达了强烈不满，于是Linus选择了一个商业的版本控制系统BitKeeper，BitKeeper的东家BitMover公司出于人道主义精神，授权Linux社区免费使用这个版本控制系统。
>
> 安定团结的大好局面在2005年就被打破了，原因是Linux社区牛人聚集，不免沾染了一些梁山好汉的江湖习气。开发Samba的Andrew试图破解BitKeeper的协议（这么干的其实也不只他一个），被BitMover公司发现了（监控工作做得不错！），于是BitMover公司怒了，要收回Linux社区的免费使用权。
>
> Linus可以向BitMover公司道个歉，保证以后严格管教弟兄们，嗯，这是不可能的。实际情况是这样的：
>
> Linus花了两周时间自己用C写了一个分布式版本控制系统，这就是Git！一个月之内，Linux系统的源码已经由Git管理了！牛是怎么定义的呢？大家可以体会一下。
>
> Git迅速成为最流行的分布式版本控制系统，尤其是2008年，GitHub网站上线了，它为开源项目免费提供Git存储，无数开源项目开始迁移至GitHub，包括jQuery，PHP，Ruby等等。
>
> 历史就是这么偶然，如果不是当年BitMover公司威胁Linux社区，可能现在我们就没有免费而超级好用的Git了。



## 二、 Git与 Svn 的区别



> - **1、Git 是分布式的，SVN 不是**：这是 Git 和其它非分布式的版本控制系统，例如 SVN，CVS 等，最核心的区别。
> - **2、Git 把内容按元数据方式存储，而 SVN 是按文件：**所有的资源控制系统都是把文件的元信息隐藏在一个类似 .svn、.cvs 等的文件夹里。
> - **3、Git 分支和 SVN 的分支不同：**分支在 SVN 中一点都不特别，其实它就是版本库中的另外一个目录。
> - **4、Git 没有一个全局的版本号，而 SVN 有：**目前为止这是跟 SVN 相比 Git 缺少的最大的一个特征。
> - **5、Git 的内容完整性要优于 SVN：**Git 的内容存储使用的是 SHA-1 哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。



## 三、Git的安装及配置



直接去**[Git官网](https://git-scm.com/downloads)**下载对应的安装程序，安装即可.

安装完成配置一下全局用户名和邮箱！

```bash
$ git config --global user.name "xxxx"
$ git config --global user.email "xxxx"
```

查看用户名：

```bash
$ git config user.name
$ git config user.email
```

效果如下：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208134755.png)

查看配置信息：

````bash
$ git config --list
````

效果如下：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208135129.png)

清空Git Bash的代码记录：输入`reset`回车即可

````bash
$ reset
````

## 四、工作区，暂存区，版本库的区别



> - **工作区：**就是你在电脑里能看到的目录。
> - **暂存区：**英文叫stage, 或index。一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
> - **版本库：**工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。

下图来解释三者的关系：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208141138.png)

> 图中左侧为工作区，右侧为版本库。在版本库中标记为 "index" 的区域是暂存区（stage, index），标记为 "master" 的是 master 分支所代表的目录树。
>
> 图中我们可以看出此时 "HEAD" 实际是指向 master 分支的一个"游标"。所以图示的命令中出现 HEAD 的地方可以用 master 来替换。
>
> 图中的 objects 标识的区域为 Git 的对象库，实际位于 ".git/objects" 目录下，里面包含了创建的各种对象及内容。
>
> 当对工作区修改（或新增）的文件执行 "git add" 命令时，暂存区的目录树被更新，同时工作区修改（或新增）的文件内容被写入到对象库中的一个新的对象中，而该对象的ID被记录在暂存区的文件索引中。
>
> 当执行提交操作（git commit）时，暂存区的目录树写到版本库（对象库）中，master 分支会做相应的更新。即 master 指向的目录树就是提交时暂存区的目录树。

## 五、Git 创建版本库



### git init 命令

首先本地新建一个文件夹名为test，然后cd 进去，打开Git Bash，输入初始化命令：

```bash
$ git init
```

然后你会发现test文件夹多了一个.git目录：

> 这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了

但是你会发现你看不到，因为它为了防止被人改动，自动隐藏了，可以使用如下命令查看：

```bash
$ ls -ah
```

效果如下：



![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208140226.png)



会发现路径后面多了一个master，是说当前库是被git托管的，并且是在master的默认分支上。



接下来在本地目录新建一个`README.md`文档，用文本编辑器打开写上“我的Git自学记录！”

然后用Git命令将其提交到暂存区，再提交到版本库：

```bash
$ git add README.md
$ git commit -m "增加README文件"
```

效果如下：



![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208142040.png)



### git add 与 git commit 命令



- git add 命令：将文件从工作区提交到暂存区
  - 后面可以跟文件名，或者多个文件名以空格分隔
  - 也可以跟 `.`来表示所有文件
- git commit 命令：将文件从暂存区提交到版本库
  - -m 参数：后面写本次提交的备注
  - -a  参数： 可以跳过备注，但会进入编辑备注模式，按shift键+ZZ可以退出。



### git status 命令



> 用来查看状态：可以让我们时刻掌握仓库当前的状态，即工作区有没有提交到暂存区，暂存区有没有提交到版本库

接下来修改文件内容，增加一行“修改文件test1”。

如下：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208142926.png)



然后再git bash 中使用 git status命令查看状态：

如下：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208143038.png)

- 会提示"change not staged for commit"也就是改变还没有提交到版本库
- 会提示"modifiled : README.md"即，提示这个文件被修改了
- 会提示"`git add <file>`"，即使用此命令可以将当前改变提交到暂存区
- 会提示`git restore <file>`，即使用此命令可以将当前改变撤销，即本地文件会恢复到修改之前。

接下来使用`git add .`将文件提交到暂存区，在使用git status 来查看状态：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208143630.png)



会发现红字变为了绿字，即当前修改已经提交成功到了暂存区。

- 会提示`git restore --staged <file>`来撤销暂存区修改，即暂存区还是原来的样子，而本地文件还是修改后的状态
- 想要恢复文件未被修改之前，参考上面提到的撤销命令`git restore <file>`

接下来使用git commit来将修改提交到版本库，然后使用git status查看状态：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208144133.png)

会发现git status 的返回状态为"working tree clean"，即工作区很干净。



### ls 命令

> 可以查看当前目录下的文件
>
> -a ：查看隐藏目录



cd到.git目录可以看到HEAD(版本库)和index(暂存区)文件：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208185725.png)

### cd 命令

- `cd d:` ：即切换到d 盘
- `cd  <目录>`：即进入那个目录
- `cd ..`：即退到上一目录

### touch 命令

> 创建文件命令，后跟文件名。

### mkdir命令

> 创建目录命令，后跟目录名



### pwd 命令

> 用于显示当前路径

### cat 命令

> 查看文件内容，后跟文件名

### vim 或vi 命令

> 编辑文件命令，后跟文件名

进入编辑状态后：

- 按 `i`进入编辑模式
- 按 `Esc`键结束编辑
- 按shift + Z + Z 键退出编辑状态

若没有要打开的文件，则会自动新建一个文件，只有在新建文件中输入了东西，按下shift +Z + Z才能保存，若没有进行修改，文件也不会创建成功，所以也可以用此命令来代替touch命令，效果一样。

### git diff命令

- git diff：查看工作区和暂存区差异，
- git diff -cached：查看暂存区和版本库差异，
- git diff  HEAD/master：查看工作区和版本库差异，

若没有差异，则不会有返回信息。

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208173721.png)



### git rm 命令



> rm  file：删除工作区文件
>
> git rm file：删除暂存区和工作区文件
>
> git rm --cached file：只删除暂存区，保留工作区
>
> git rm -r *：递归删除该目录下所有文件

- 只在工作区的文件，通过rm删除，无法恢复
- 提交到暂存区的文件，在工作区进行rm删除后，可以通过git checkout -- file来撤销删除。新版命令：git restore file
- 提交到版本库的文件，在工作区进行rm删除后，也可以通过 git checkout -- file 来撤销删除。新版命令：git restore file
- 提交到版本库的文件，通过git rm 进行删除后，其实已经将删除提交到了暂存区，所以应该用git reset HEAD file将版本库给了暂存区，再用git checkout -- file将暂存区拉回工作区，即恢复原状。新版命令：git restore --staged file 再使用：git restore file.
- 若想彻底删除版本库文件，先git rm ，再commit 即可，若想恢复就得晋城版本回退操作，后序再讲。

提交到暂存区或版本库，用rm删除后恢复操作：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208183205.png)

提交到版本库文件，用git rm删除恢复操作：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208184333.png)

彻底删除版本库文件：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208184628.png)



#### 新版命令变化

新版：

```bash
$ git restore --staged file
$ git restore file.
```

旧版：

```bash
$ git reset HEAD file
$ git checkout -- file
```



![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208194415.png)

## 六、版本回退



> 版本回退即时空穿梭，只要提交到了版本库，你可以穿梭到任意一次版本库的提交记录。

### git log 命令

> `git log`命令显示从最近到最远的提交日志，会显示提交id,作者，邮箱，日期，以及提交备注。

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208190624.png)



#### 可以使用`git log --oneline`来显示简略版的历史

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208191408.png)

#### 可以使用 `git log --pretty=oneline`来显示在一行

> 只显示commit id ,以及提交备注

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208190759.png)



#### 可以使用`git log --graph`查看拓扑图

具体自己操作查看！



#### 可以使用 `git log --reverse --oneline`逆向显示记录

#### 可以使用`git log --author=niuxvdong --oneline -5`来指定作者名字



#### 更多log 参数命令前往官网查看

[https://git-scm.com/docs/git-log](https://git-scm.com/docs/git-log)

#### git用HEAD表示当前版本



### git reset 命令



> 回退命令！

#### `git reset --hard HEAD^`

> 回退上一个版本，在Git中，用`HEAD`表示当前版本，也就是最新的提交`1094adb...`（注意我的提交ID和你的肯定不一样），上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`



此时再使用git log会发现未来的记录没了，只能查看当前记录。

So...



#### 往上翻找到commitId再使用`git reset --hard HEAD commitId`

#### git reflog 记录你的命令

> 可以找到commitId，然后git reset --hard HEAD commitId即可回到未来



## 七、远程仓库（远程库）

 ### 创建密钥：

```bash
$ ssh-keygen -t rsa -C "youremail@example.com"
```

> 密钥相当于个人电脑的指纹，托管平台通过密钥来识别身份。

> 在C盘用户目录下的.ssh文件夹下的`id_rsa`和`id_rsa.pub`两个文件，一个私钥，一个公钥。

### 链接远程库：

> 将公钥复制到代码托管平台的SSH管理页面，名称随便填即可。

### 创建仓库：



> 名字起的像样点，相当于你的项目名。



### 如图所示，安照提示走：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208195930.png)



- ```bash
  $ git remote add origin git@github.com:niuxvdong/test.git
  ```

- ```bash
  $ git push -u origin master
  ```

以后即可直接git push 了，不需要那么多参数。



### 删除远程库

> 以便于连接另一个托管平台

```bash
$ git remote rm origin
```

### 同时连接多个托管平台

> 因为远程库名字都叫origin，所以只需先删除已绑定的远程库，然后进行关联时候，将名字更改即可！

```bash
$ git remote rm origin
$ git remote add github git@github.com:niuxvdong/test.git
$ git remote add gitee git@gitee.com:niuxvdong/test.git
$ git remote -v
```

so 现在的仓库名字不叫 origin 了，一个叫 github ，一个叫 gitee。用到origin的命令时，就要对应仓库名字进行修改了。

push 命令修改如下：

```bash
$ git push github master
$ git push gitee master
```

### 克隆仓库：

1. git clone + ssh链接
2. git clone + ssh链接 + 路径

### git remote命令

```bash
$ git remote 
$ git remote -v
```

远程库名称和详细信息

有push信息说明你有推送权限：

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208211844.png)



### 推送分支

```bash
$ git push origin master
```

- 推送其他分支即将master改为其他分支名

### 多人协作

参考教程：[https://www.liaoxuefeng.com/wiki/896043488029600/900375748016320](https://www.liaoxuefeng.com/wiki/896043488029600/900375748016320)



### git rabase

参考教程：[https://www.liaoxuefeng.com/wiki/896043488029600/1216289527823648](https://www.liaoxuefeng.com/wiki/896043488029600/1216289527823648)

## 八、分支管理



### 查看分支

```bash
$ git branch
```

### 创建分支

```bash
$ git branch <name>
```

### 切换分支

```bash
$ git switch <name> 或 git checkout <name>
```

### 创建并切换

```bash
$ git switch -c <name> 或 git checkout -b <name>
```

### 合并分支

```bash
$ git merge <name>
```

#### 默认合并方式为`Fast forward`模式

> 此种合并方法看不到合并历史，对于开发来说不太好

#### 尽量使用 --no-ff 参数来合并使用普通合并

> 此方法可以看到合并历史记录，便于开发和操作

#### 可以追加上-m参数

```bash
$ git merge --no-ff -m "merge with --no-ff"
```

### 删除分支

```bash
$ git branch -d <name>
```

**强制删除分支：**

```bash
$ git branch -D <name>
```

### 合并冲突解决



#### 创建dev分支

```bash
$ git branch dev
```

#### 在master分支将文件修改后，add并且commit

```bash
$ vi new.c
$ git add .
$ git commit -m "add hhhhhhhhhh"
```

#### 切换到dev分支

```bash
$ git switch dev
```

#### 在dev分支将文件修改后，add 并 commit

```bash
$ vi new.c
$ git add .
$ git commit -m "add ssssssssss"
```

#### 切换到master分支

```bash
$ git branch dev
```

#### 合并dev分支

```bash
$ git merge dev
```

#### 出现冲突

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200208205333.png)

#### vi 编辑冲突文件

```bash
$ vi new.c
```

#### add 并commit

```bash
$ git add .
git commit -m "merge confilt"
```

#### 删除dev分支

```bash
$ git branch -d dev
```

## 九、存储现场



### git stash 命令

> 用来存储当前工作状态，一遍先去处理遇到的问题或其他bug

```bash
$ git stash
Saved working directory and index state WIP on dev: f52c633 add merge
```

### git stash list

```bash
$ git stash list
stash@{0}: WIP on dev: f52c633 add merge
```

### 恢复现场

#### 一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

#### 另一种方式是用`git stash pop`，恢复的同时把stash内容也删了

#### 在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick `命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

## 十、标签管理

> 如果你达到一个重要的阶段，并希望永远记住那个特别的提交快照，你可以使用 git tag 给它打上标签。
>
> tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。



### 创建标签

```bash
$ git tag v1.0
```

### 查看标签

```bash
$ git tag
```

### 通过commitId打标签

> 默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？
>
> 方法是找到历史提交的commit id，然后打上就可以了

```bash
$ git log --oneline
$ git tag v1.1 f52c633
```

### 查看具体标签信息

> 标签不是按时间顺序列出，而是按字母排序的。可以用`git show `查看标签信息：

```bash
$ git tag
$ git show v1.1
```

### 创建带有说明的标签

> 还可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字：

```bash
$ git tag -a v0.1 -m "version 0.1 released" 1094adb
```

> **注意：** 标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

### 删除本地标签

> 当前本地标签未推送到远程库

```bash
$ git tag -d v0.1
```

### 推送标签

#### 推送指定标签

```bash
$ git push origin v1.0
```

#### 一次性推送全部尚未推送到远程的本地标签

```bash
$ git push origin --tags
```

### 删除已推送到远程库的标签

#### 先删除本地标签

```bash
$ git tag -d v0.9
```

#### 再删除远程库

```bash
$ git push origin :refs/tags/v0.9
```

#### 另一种删除方式

```bash
$ git push origin :<branch>/<tag> 注意冒号 : 必不可少, 后面跟远程库的分支名/标签名
```

## 十一、自定义



### 忽略特殊文件

参考文档：[https://www.liaoxuefeng.com/wiki/896043488029600/900004590234208](https://www.liaoxuefeng.com/wiki/896043488029600/900004590234208)

### 给命令配置简短的别名

参考文档：

[https://www.liaoxuefeng.com/wiki/896043488029600/898732837407424](https://www.liaoxuefeng.com/wiki/896043488029600/898732837407424)

# 完美结束，历时好久终于写完，感谢观看！