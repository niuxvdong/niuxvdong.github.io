---
title: 常用Git命令及IDEA整合Git、GitHub
author: ITNXD
toc: true
abbrlink: 23616
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@8d738a35f9090e009141f4b36235ce9db0d07707/2021/05/01/38d2edc6d16f03ace563a5f350c6cd10.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@8d738a35f9090e009141f4b36235ce9db0d07707/2021/05/01/38d2edc6d16f03ace563a5f350c6cd10.png
categories:
  - Git
tags:
  - Git
  - GitHub
date: 2021-05-01 10:03:15
updated:
---





> **[好久前学习的Git内容记录，点击这里！](https://www.itnxd.cn/posts/50207.html)**
>
> 本篇只记录最常用的命令及整合IDEA的步骤！





# 一、常用命令





| 命令名称                              | 作用                         |
| ------------------------------------- | ---------------------------- |
| git config --global user.name 用户名  | 设置用户签名                 |
| git config --global user.email 邮箱   | 设置用户签名                 |
| git init                              | git init 初始化本地库        |
| git status                            | 查看本地库状态               |
| git add                               | 文件名 添加到暂存区          |
| git commit -m "日志信息" 文件名       | 提交到本地库                 |
| git reflog                            | 查看版本信息                 |
| git log                               | 查看版本详细信息             |
| git reset --hard 版本号（前七位即可） | 版本穿梭                     |
| git branch 分支名                     | 创建分支                     |
| git branch -v （*代表当前所在的分区） | 查看分支                     |
| git checkout 分支名                   | 切换分支                     |
| git merge 分支名                      | 把指定的分支合并到当前分支上 |






## 1、设置用户签名



设置完成可以在家目录下的`.gitconfig`中看到：`cat ~/.gitconfig`



- 签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看到，以此确认本次提交是谁做的。Git 首次安装必须设置一下用户签名，否则无法提交代码。
- 注意：这里设置用户签名和将来登录 GitHub 的账号没有任何关系。



## 2、合并冲突



> 当两个分支都发生了改变，合并时由于无法知道保留谁，舍弃谁，会冲突，这时需要手动合并冲突！
>
> 冲突产生的表现：后面状态为 MERGING，例如：`(master|MERGING)`



```bash
$ git merge hot-fix
Auto-merging hello.txt
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```



查看会发现，已经将两个分支的不同之处标记了出来：`特殊符号：<<<<<<< HEAD 当前分支的代码 ======= 合并过来的代码 >>>>>>> hot-fix`

因此我们vim进入编辑，将要保留的内容留下，舍弃的内容舍弃后保存即可！

在`git add, git commit`之后，后面的`MERGING`消失！

**注意：此时使用 `git commit` 命令时不能带文件名**



```bash
$ cat hello.txt
hello git! hello atguigu! 2222222222222
hello git! hello atguigu! 3333333333333
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
<<<<<<< HEAD
hello git! hello atguigu! master test
hello git! hello atguigu!
=======
hello git! hello atguigu!
hello git! hello atguigu! hot-fix test
>>>>>>> hot-fix
```



# 二、远程库常用命令



| 命令名称                           | 作用                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| git remote -v                      | 查看当前所有远程地址别名（后面括号的fetch表示有pull权限，push表示有push权限！） |
| git remote add 别名 远程地址       | 起别名                                                       |
| git push 别名 分支                 | 推送本地分支上的内容到远程仓库                               |
| git clone 远程地址                 | 将远程仓库的内容克隆到本地（1、拉取代码。2、初始化本地仓库。3、创建别名origin） |
| git pull 远程库地址别名 远程分支名 | 将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并     |
| ssh-keygen -t rsa -C 邮箱          | 生成ssh密钥，配置免密登录以及支持ssh协议传输！               |





## 1、邀人进行团队协作



> 路径：github 仓库Settings -> Manage access -> Invite a collaborator ，输入邮箱找到该伙伴后将生成的链接通过社交软件发送给伙伴，他同意后就拥有了操作本库的权限！





## 2、跨团队协作



> 就是常见的fork和PR操作！
>
> github的聊天室无需刷新，动态展示所有聊天信息！















# 三、IDEA整合Git





## 1、配置.ignore文件



> 用来配置git的忽略文件，即无需使用git跟踪的内容！
>
> 与项目的实际功能无关，不参与服务器上部署运行。把它们忽略掉能够屏蔽 IDE 工具间的差异。
>
> 文件名建议设置为`git.ignore`即可！
>
> 建议放到用户家目录下，方便在git配置中引用！





**git.ignore文件内容如下即可：**

```
# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*

.classpath
.project
.settings
target
.idea
*.iml
```



**在.gitconfig 文件中引用忽略配置文件：**



注意：这里要使用“正斜线（/）”，不要使用“反斜线（\）”



```
[user]
	name = niuxvdong
	email = 158903258@qq.com
	emali = 158903258@qq.com
[color]
	ui = true
[core]
	autocrlf = true
	excludesfile = C:/Users/15890/git.ignore
[gui]
# [http "https://github.com"]
# 	proxy = socks5://127.0.0.1:1080
# [https "https://github.com"]
# 	proxy = socks5://127.0.0.1:1080
```





## 2、配置Git位置



> 路径：File | Settings | Version Control | Git
>
> 手动选择git.exe的位置，或者直接自动选择即可！





## 3、初始化本地库



> 初始化完成就可以在Module或项目根目录上直接右键有了Git选项卡！并且上方工具栏下面点的快捷栏目也有了Git的两大命令，`push`和`commit`
>
> 注意：若使用方法一没有右键没有出现Git选项卡，重启一下Idea即可！

- 方法一：直接点击下方工具栏的terminal，进入对应的Module目录或直接在项目根目录，执行命令`git init`即可！
- 方法二：点击最上方的工具栏 `Git`（最新版Idea，旧版本为vcs），找到`Create Git Repository...`点击即可！





## 4、添加&提交





- 方法一：右键的Git选项卡找
- 方法二：最上方工具栏`Git`或下方的快捷栏目都有！



**文件颜色：**

- 红色：表示未被git跟踪
- 绿色：表示已被跟踪，但未提交本地库
- 正常原色：表示已提交本地库



## 5、切换版本



打开下方工具栏的Git栏目，点击log选项卡，即可看到全部的详细版本信息，直接右键需要回退的版本`Checkout Revision`即可回退到对应版本！



## 6、新建及切换分支



> 鼠标移到对应分支，选择Checkout即可快速切换分支！



- 方法一：右键Git选项卡找
- 方法二：最上方工具栏的Git找
- 方法三：右下角的带有分支图标的位置





## 7、合并分支



> 在主分支下，选择对应分支后，点击`Merge into Current`即可！



若出现合并冲突，由于Idea太过智能，会出现比对功能，帮助你合并冲突！会有三个界面：

- 左边：主分支代码
- 右边：待合并分支代码
- 中间：没有发生冲突的代码



会有常见的合并箭头，简单的点击即可将冲突问题解决！冲突合并完成会自动提交本地库！







# 四、IDEA整合GitHub



## 1、配置Github信息



> 在路径：`File | Settings | Version Control | GitHub`里点击加号添加GitHub账户即可！
>
> 若使用了SSH免密，建议勾选`Clone git repositories using ssh`









## 2、本地库推到GitHub上



> 选择最上方工具栏的Git选项，选择Github，选择`Share Project on GitHub`，弹出的框内填写远程库名（一般与项目同名）和别名以及描述信息即可！
>
> Idea会帮你自动创建远程库并进行推送的！









## 3、推送 & 拉取



> 推送弹出的界面可以自定义其他别名！



- 方法一：右键Git选项卡里找
- 方法二：最上面工具栏Git选项卡或下方一点的快捷操作中找





## 4、克隆远程库



> 选择最上方工具栏的Git选项卡的`clone`，在弹出的界面选择克隆方式及远程库信息等等即可！







# 五、IDEA整合码云Gitee



> 操作同上，若`File | Settings | Version Control | Gitee`没有`Gitee`选项，需要在插件商店安装后重启即可！





















