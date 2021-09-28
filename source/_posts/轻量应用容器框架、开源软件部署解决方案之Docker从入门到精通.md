---
title: 轻量应用容器框架、开源软件部署解决方案之Docker从入门到精通
author: ITNXD
toc: true
abbrlink: 8790
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@f40038c439ba561a382d434777da7ac61833a01c/2021/09/23/54de8d8441dfdce96e726f7fb173c689.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@f40038c439ba561a382d434777da7ac61833a01c/2021/09/23/54de8d8441dfdce96e726f7fb173c689.png
categories:
  - 容器
tags:
  - Docker
date: 2021-09-22 09:43:29
updated:
---





# 一、Docker概述



## 1、Docker是什么



- Docker 是一个**开源的应用容器引擎**，基于 **Go 语言**并遵从 Apache2.0 协议开源；
- Docker 可以让开发者打包他们的应用以及依赖包到一个**轻量级**、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现**虚拟化**；
- 容器是完全使用**沙箱机制**，相互之间不会有任何接口，更重要的是容器性能开销极低；
- Docker 从 17.03 版本之后分为 CE（Community Edition-社区版）和 EE（Enterprise Edition-企业版）。
- Docker是一个**Client-Server结构**的系统，以守护进程运行在主机上。通过**Socket**从客户端进行访问。
- Docker 是 [PaaS](https://baike.baidu.com/item/PaaS) 提供商 dotCloud 开源的一个基于 [LXC](https://baike.baidu.com/item/LXC) 的高级容器引擎，源代码托管在 [Github](https://baike.baidu.com/item/Github) 上



## 2、Docker应用场景





- Web应用的自动化打包和发布，自动化测试和持续集成、发布；
- 在服务型环境中部署和调整数据库或其他的后台应用；
- 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境。







## 3、Docker资源



- [Docker官网](https://www.docker.com/)
- [Docker中文社区](https://www.docker.org.cn/)
- [Docker Hub](https://hub.docker.com/)





## 4、Docker的优点



**传统虚拟机与Docker对比：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@13ed2f08b66b2b09da8b4c3fac3125db2172d81a/2021/09/22/44f59a8258278d09a703b8278153ac75.png)



**虚拟机的缺点：**

- 资源占用多
- 冗余步骤多
- 启动慢



**Docker的特点：**



- 不模拟完整的操作系统，系统内核（kernel）非常小，更少的抽象层（GuestOS：如Centos）
- 容器内的应用直接运行在宿主机的内核，容器本身**没有自己的内核**，也**没有虚拟硬件**。
- 每个容器**相互隔离**，内部都有属于自己的文件系统，互不影响。





## 5、Docker实现DevOps(开发、运维)



- 应用更快速的交付和部署
  打包镜像发布测试，一键运行；不再需要写大量帮助文档，安装程序
- 更便捷的升级和扩缩容？
  部署应用就和搭积木一样
- 更简单的系统运维
  开发和测试的环境高度一致
- 更高效的计算资源利用
  内核级别的虚拟化，可以在一个物理机上运行很多的容器实例，服务器性能可以被压榨到极致。





## 6、Docker基本组成



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e3915bb62d6260b9bf340421f168eb9bd4407a62/2021/09/22/11d091da83f646a80e918a3636bd487f.png)





- 镜像（image）：镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件。它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。相当于一个模板，通过这个模板来创建容器服务，可以通过一个镜像创建多个容器。
- 容器（container）：独立运行一个或一组应用。基本命令有：启动，停止，删除等。可理解为一个简单的linux系统。
- 仓库（repository）：存放镜像的地方（公有/私有）





## 7、Docker为什么比VM快



- docker有着比虚拟机更少的抽象层。由于docker不需要Hypervisor实现硬件资源虚拟化,运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有明显优势。
- docker利用的是宿主机的内核,而不需要Guest OS。
- GuestOS： VM（虚拟机）里的的系统（OS）
- HostOS：物理机里的系统（OS）



因此，当新建一个 容器时，docker不需要和虚拟机一样重新加载一个操作系统内核。然而避免引导、加载操作系统内核是个比较费时费资源的过程，当新建一个虚拟机时，虚拟机软件需要加载GuestOS，返个新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统，则省略了这个复杂的过程，因此新建一个docker容器只需要几秒钟。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@39ffcf7de4116084302e0f149e7ceebba00d1d09/2021/09/22/bd00cef27bd2f07fd2bbf5a20a030fcc.png)









# 二、Docker安装







## 1、安装



> Docker官方安装文档：[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)



```shell
uname -r    # 内核要求3.0以上

#1.卸载旧版本
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
#2.需要的安装包
yum install -y yum-utils
#3.设置镜像的仓库
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
#默认是从国外的，不推荐
#推荐使用国内的
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
#更新yum软件包索引
yum makecache fast
#4.安装docker相关的 docker-ce 社区版 而ee是企业版
yum install docker-ce docker-ce-cli containerd.io
#5、启动docker
systemctl start docker
#6. 使用docker version查看是否安装成功
docker version
#7. 测试
docker run hello-world
```





## 2、卸载



```shell
#1. 卸载依赖
yum remove docker-ce docker-ce-cli containerd.io
#2. 删除资源
rm -rf /var/lib/docker
# /var/lib/docker 是docker的默认工作路径！
```





## 3、镜像加速配置



> 参考：[https://www.runoob.com/docker/docker-mirror-acceleration.html](https://www.runoob.com/docker/docker-mirror-acceleration.html)







# 三、Docker命令



> Docker命令的详细使用方法请参考 [官网](https://docs.docker.com/engine/reference/run/)或者 **docker --help** 进行查询，这里只记录部分常用命令。





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9d6dbb8a56aa75bef0235276d7c0e1221351d7ce/2021/09/22/9edb8f1f5e7e656977ffaa6819155885.png)











## pull

从镜像仓库中拉取或者更新指定镜像，在未声明镜像标签时，默认标签为latest。

```js
Usage: docker pull [OPTIONS] NAME[:TAG|@DIGEST] 
Options: 
    -a 拉取某个镜像的所有版本
    --disable-content-trust 跳过校验，默认开启
```

## run

创建并启动一个容器



常见的坑，docker容器使用后台运行，就必须要有要一个前台进程，docker发现没有应用，就会自动停止！

容器运行的命令如果不是那些**一直挂起的命令** (比如运行top，tail) ，就是会自动退出的。



```js
Usage: docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
Options:
  -d, --detach 后台运行容器，并输出容器ID
  -e, --env list 设置环境变量，该变量可以在容器内使用
  -h, --hostname string 指定容器的hostname
  -i, --interactive 以交互模式运行容器，通常与-t同时使用
  -l, --label list 给容器添加标签
  --name string 设置容器名称，否则会自动命名
  --network string 将容器加入指定网络
  -p, --publish list 设置容器映射端口
  		-p ip:主机端口:容器端口
        -p 主机端口:容器端口(常用)
        -p 容器端口

  -P,--publish-all 将容器设置的所有exposed端口进行随机映射
  --restart string 容器重启策略，默认为不重启
    on-failure[:max-retries]：在容器非正常退出时重启，可以设置重启次数。
    unless-stopped：总是重启，除非使用stop停止容器
    always：总是重启
  --rm 容器退出时则自动删除容器
  -t, --tty 分配一个伪终端
  -u, --user string 运行用户或者UID
  -v, --volume list 数据挂载
  -w, --workdir string 容器的工作目录
  --privileged 给容器特权
```

## build

通过 **Dockerfile** 构建镜像

```js
Usage: docker build [OPTIONS] PATH | URL | -
Options:
    -f, --file string 指定Dockerfile，默认为当前路径的Dockerfile
    -q, --quiet 安静模式，构建成功后输出镜像ID
    -t, --tag list 给镜像设置tag，name:tag
```

## commit

通过容器创建一个新镜像，提交当前容器为新的镜像

```js
Usage: docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
Options:
    -a, --author string 作者
    -m, --message string 提交信息
```

## cp

在容器和宿主机之间拷贝文件

```js
Usage:
    docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH
    docker cp [OPTIONS] SRC_PATH CONTAINER:DEST_PATH
Options:
    -a, --archive 保留文件权限
```

## exec

向正在运行的容器下发命令

```js
Usage: docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
Options:
    -d, --detach 在后台运行命令
    -e, --env list 设置环境变量
    -i, --interactive 以交互模式运行
    -t, --tty 分配一个伪终端
    -u, --user string 执行命令的用户
    -w, --workdir string 工作目录
```

## export

将容器导出为一个tar包

```js
Usage: docker export [OPTIONS] CONTAINER
Options:
    -o, --output string tar包名称
```

## images

列出镜像

```js
Usage: docker images [OPTIONS] [REPOSITORY[:TAG]]
Options:
  -a, --all 显示所有镜像
  -f, --filter filter 使用过滤器过滤镜像
    dangling true or false, true列出没有标签的，false相反
    label (label=<key> or label=<key>=<value>)，如果镜像设置有label，则可以通过label过 滤
    before (<image-name>[:<tag>], <image id> or <image@digest>) - 某个镜像前的镜像
    since (<image-name>[:<tag>], <image id> or <image@digest>) - 某个镜像后的镜像
    reference (pattern of an image reference) - 模糊查询,例：-- 
    filter=reference='busy*:*libc' 
  --format string 格式化输出
    .ID 镜像ID
    .Repository 镜像仓库
    .Tag 镜像tag
    .Digest Image digest
    .CreatedSince 创建了多久
    .CreatedAt 镜像创建时间
    .Size 镜像大小
-q, --quiet 只显示镜像ID
--digests 显示镜像的摘要信息
--no-trunc 显示完整的镜像信息
```

## import

通过导入tar包的方式创建镜像

```js
Usage: docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
Options:
   -m, --message string 设置提交信息
```

## kill

杀死一个或多个容器

```js
Usage: docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

## load

从tar包加载一个镜像

```js
Usage: docker load [OPTIONS]
Options:
   -i, --input string 指定tar包
   -q, --quiet 只显示ID
```

## login

登录Docker镜像仓库

```js
Usage: docker login [OPTIONS] [SERVER]
Options:
  -p, --password string 密码
  -u, --username string 账户
```

## logout

退出Docker镜像仓库

```js
Usage: docker logout [SERVER]
```

## logs

显示容器日志

```js
Usage: docker logs [OPTIONS] CONTAINER
Options:
  --details 显示详细日志
  -f, --follow 跟随日志输出
  --tail string 显示行数
  -t, --timestamps 显示时间戳
  
显示日志
-tf 显示日志信息（一直更新）
--tail number 需要显示日志条数
docker logs -t --tail n 容器id 查看n行日志
docker logs -ft 容器id 动态更新日志
```

## ps

列出容器 

```js
Usage: docker ps [OPTIONS]
Options:
  -a, --all 列出所有容器
  -f, --filter filter 使用过滤器过滤
  --format string 格式化输出
  -n, --last int 显示最后创建的n个容器
  -l, --latest 显示最后一个创建的容器
  -q, --quiet 只显示容器ID
  -s, --size 显示大小
  --no-trunc :不截断输出。
  
docker ps -aq 列出全部镜像id
```

## push

将容器推送到镜像仓库

```js
Usage: docker push [OPTIONS] NAME[:TAG]
```

## rename

给容器重命名

```js
Usage: docker rename CONTAINER NEW_NAME
```

## restart

重启一个或多个容器

```js
Usage: docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

## rm

删除一个或多个容器

```js
Usage: docker rm [OPTIONS] CONTAINER [CONTAINER...]
Options:
  -f, --force 强制删除
  -v, --volumes 同时删除数据卷

docker rm 容器名/id           删除指定容器
docker rm &(docker ps -aq)   删除全部容器

docker rm -f $(docker ps -aq) 强制删除全部容器
docker ps -a -q|xargs docker rm 删除所有的容器
```

## rmi

删除一个或多个镜像

```js
Usage: docker rmi [OPTIONS] IMAGE [IMAGE...]
Options:
  -f, --force 强制删除
  
docker rmi -f 镜像id 删除指定的镜像
docker rmi -f 镜像id 镜像id 镜像id 镜像id 删除指定的镜像
docker rmi -f $(docker images -aq)  删除全部的镜像
```

## save

将一个或多个镜像保存为tar包

```js
Usage: docker save [OPTIONS] IMAGE [IMAGE...]
Options:
  -o, --output string tar包名称
```

## search

查找镜像

```js
Usage: docker search [OPTIONS] TERM
--no-trun 显示完整的镜像描述
-s 列出收藏数不小于指定值的镜像
--automated 只列出 automated build类型的镜像
```

## start

启动一个或多个容器

```js
Usage: docker start [OPTIONS] CONTAINER [CONTAINER...]
```

## stats

显示容器资源使用情况

```js
Usage: docker stats [OPTIONS] [CONTAINER...]
Options:
  -a, --all 显示所有容器，默认只显示正在运行的容器
```

## stop

停止一个或多个容器

```js
Usage: docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

## tag

给镜像设置新的tag

```js
Usage: docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

## inspect

获取容器或镜像的元数据

```js
Usage: docker inspect [OPTIONS] NAME|ID [NAME|ID...]

docker inspect 55321bcae33d
[
    {
    "Id":
    "55321bcae33d15da8280bcac1d2bc1141d213bcc8f8e792edfd832ff61ae5066",
    "Created": "2020-05-15T05:22:05.515909071Z",
    "Path": "/bin/sh",
    ...
    }
]
```



## 其他命令



```shell
docker version 		#显示docker的版本信息。
docker info 		#显示docker的系统信息，包括镜像和容器的数量
docker 命令 --help   #帮助命令
					#帮助文档的地址：https://docs.docker.com/engine/reference/commandline/build/


Exit                         # 从容器中退回主机 
CTRL+Q+P                     # 容器不停止退出
docker ps                    # 显示当前运行的容器 
          -a                 # 带出历史运行过的容器

docker exec 容器名/id    #进入当前容器后开启一个新的终端，可以在里面操作。（常用）
docker attach 容器名/id  # 进入容器正在执行的终端

docker top 容器id  	   # 查看容器中进程信息

docker history 镜像名	  # 查看镜像变更历史
```





## 命令总结





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9f9d2e79f216d4ee25feb9a3eed1ed815a541bdf/2021/09/23/8255286c30fda0d557c630d14eecfe78.png)









# 四、Docker可视化



**Portainer：**



Docker图形化界面管理工具！提供一个后台面板供我们操作！

```shell
docker run -d -p 8080:9000 \
--restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
```





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@eaf07b02ad19ac2a0ad124c4acdad9b96fbe5566/2021/09/22/e54b9b9c777df0a4abac5cede813d807.png)



**Rancher：**后面再用！





# 五、Docker镜像详解







## 1、UnionFS（联合文件系统）



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c967ff9cabb0b14c6a32b5da725c692dd2c5f607/2021/09/22/a5642a5dd9da531a9f484a45f110398a.png)





- 联合文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下。联合文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。
- 特性：一次同时加载多个文件系统，但从外面看起来只能看到一个文件系统。联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。



## 2、镜像加载原理



**Docker的镜像实际由一层一层的文件系统组成：**

- bootfs（boot file system）主要包含bootloader和kernel。bootloader主要是引导加载kernel，完成后整个内核就都在内存中了。此时内存的使用权已由bootfs转交给内核，系统卸载bootfs。可以被不同的Linux发行版公用。
- rootfs（root file system）包含典型Linux系统中的/dev，/proc，/bin，/etc等标准目录和文件。rootfs就是各种不同操作系统发行版（Ubuntu，Centos等）。因为底层直接用Host的kernel，rootfs只包含最基本的命令，工具和程序就可以了。
- 分层理解：所有的Docker镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之上，创建新的容器层。容器在启动时会在镜像最外层上建立一层可读写的容器层（R/W），而镜像层是只读的（R/O）。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4413b645e5cdc6465384055f2552d616ae1246ee/2021/09/22/23bb6a1b5a70d5db8a0f3397c251d2da.png)



**创建新的分层提交为新镜像：**

```shell
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[tag]  # 编辑容器后提交容器成为一个新镜像
```



**为什么Docker镜像要采用这种分层的结构呢？**

最大的好处，我觉得莫过于**资源共享**了！比如有多个镜像都从相同的Base镜像构建而来，那么宿主机只需在磁盘上保留一份base镜像，同时内存中也只需要加载一份base镜像，这样就可以为所有的容器服务了，而且镜像的每一层都可以被共享。



**查看镜像分层的方式可以通过`docker image inspect 镜像名`命令：**



```shell
"RootFS": {
    "Type": "layers",
    "Layers": [
        "sha256:c2adabaecedbda0af72b153c6499a0555f3a769d52370469d8f6bd6328af9b13",
        "sha256:744315296a49be711c312dfa1b3a80516116f78c437367ff0bc678da1123e990",
        "sha256:379ef5d5cb402a5538413d7285b21aa58a560882d15f1f553f7868dc4b66afa8",
        "sha256:d00fd460effb7b066760f97447c071492d471c5176d05b8af1751806a1f905f8",
        "sha256:4d0c196331523cfed7bf5bafd616ecb3855256838d850b6f3d5fba911f6c4123",
        "sha256:98b4a6242af2536383425ba2d6de033a510e049d9ca07ff501b95052da76e894"
    ]
},
```





Docker通过存储引擎（新版本采用快照机制）的方式来实现镜像层堆栈，并保证多镜像层对外展示为统一的文件系统。

Linux上可用的**存储引撃**有AUFS、 Overlay2、 Device Mapper、Btrfs以及ZFS。顾名思义，每种存储引擎都基于 Linux中对应的件系统或者块设备技术，井且每种存储引擎都有其独有的性能特点。

Docker在 Windows上仅支持 windowsfilter 一种存储引擎，该引擎基于NTFS文件系统之上实现了分层和CoW [1]。





- Docker 镜像都是只读的，当容器启动时，一个新的可写层加载到镜像的顶部！

- 这一层就是我们通常说的**容器层**，容器之下的都叫镜像层！





## 3、Commit镜像



如果你想要保存当前容器的状态，就可以通过commit来提交，获得一个镜像，就好比我们我们使用虚拟机的快照。

```shell
docker commit 提交容器成为一个新的副本
# 命令和git原理类似
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[TAG]

# 1、启动一个默认的tomcat
docker run -d -p 8080:8080 tomcat
# 2、发现这个默认的tomcat 是没有webapps应用，官方的镜像默认webapps下面是没有文件的！
docker exec -it 容器id
# 3、拷贝文件进去
# 4、将操作过的容器通过commit提交为一个镜像！我们以后就使用我们修改过的镜像即可，这就是我们自己的一个修改的镜像。
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[TAG]
docker commit -a="itnxd" -m="add webapps app" 容器id tomcat02:1.0
```



# 六、容器数据卷







## 1、什么是容器数据卷



为了实现数据持久化，使容器之间可以共享数据。可以将容器内的目录，挂载到宿主机上或其他容器内，实现同步和共享的操作。即使将容器删除，挂载到本地的数据卷也不会丢失。



- **卷**就是目录或文件，存在于一个或多个容器中，由**docker**挂载到容器，但不属于联合文件系统，因此能够绕过Union FileSystem提供一些用于持续存储或共享数据的特性。
- 卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不 会在容器删除时删除其挂载的数据卷

**特点：**

- 数据卷可在容器之间共享或重用数据
- 卷中的更改可以直接生效
- 数据卷中的更改不会包含在镜像的更新中
- 数据卷的生命周期一直持续到没有容器使用它为止

**容器的持久化**

**容器间继承+共享数据**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@1bcbfd80e0613305362ebc52c7d60bc3e21a2acb/2021/09/22/6c9594b33410b92df3ad31cd9d171855.png)





## 2、使用容器数据卷



**挂载使用-v命令：**

```shell
dokcer run -it -v 主机内目录:容器内目录 镜像名/id
```



将容器内目录挂载到主机内目录上，通过**docker inspect**命令查看该容器即可以看到挂载信息：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@9f8f1d3e60128d453aa622b554149c6672426de9/2021/09/22/518973a1ca19ea0bfaf44d8929eddcf7.png)





**可在Dockerfile中使用VOLUME指令来给镜像添加一个或多个数据卷：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4201015208f77e62cca7d214aaac4c6cf5e0c81a/2021/09/23/384d35393047e0208992d5afd12c8f43.png)









## 3、匿名挂载



**命令：**

```shell
docker run -d  -v 容器内目录  镜像名/id  # 匿名挂载
```



匿名挂载后，使用**docker volume ls**命令查看所有挂载的卷：

每一个VOLUME NAME对应一个挂载的卷，由于挂载时未指定主机目录，因此无法直接找到目录，他有一个默认目录：在` /var/lib/docker/volumes/xxxx/_data`下，xxx表示VOLUME NAME的字符串！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6938009b0933257de2807c5f883c1d835198fe62/2021/09/22/4a804be7b7984a132b16239e9608286f.png)





## 4、具名挂载



**命令：**

```shell
docker run -d  -v 卷名：容器内目录  镜像名/id  # 具名挂载
```



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2c6ff7336b8110c6420a87d38b92937373ad8609/2021/09/22/01fd38ae9ace11818b0faee6e7cc083c.png)



可以发现挂载的卷：volume01，并通过**docker volume inspect 卷名** 命令找到主机内目录：同样是在默认的`/var/lib/docker/volumes/`下：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@837cf3716d31aa6a6905c7d93ac108f6f9f9e570/2021/09/22/ef607cc67f433877cd0f188bbcff0683.png)



所有docker容器内的卷，在未指定主机内目录时，都在：`/var/lib/docker/volumes/卷名/_data` 下，可通过具名挂载可以方便的找到卷，因此广泛使用这种方式进行挂载。



## 5、MySQL安装



```shell
# 获取mysql镜像
docker pull mysql:5.7
# 运行容器,需要做数据挂载,安装启动mysql，需要配置密码的，这是要注意点！
# 参考官网hub
docker run -d -p 3306:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7
```



## 6、容器数据共享



`--volumes-from`：容器间共享挂载目录



```shell
docker run -d -p 3306:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

docker run -d -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 --volumes-from mysql01 mysql:5.7
# 这个时候，可以实现两个容器数据同步！
```



## 7、小结



```shell
# 三种挂载： 匿名挂载、具名挂载、指定路径挂载
-v 容器内路径			#匿名挂载
-v 卷名：容器内路径		#具名挂载
-v /宿主机路径：容器内路径 #指定路径挂载 docker volume ls 是查看不到的
```



- 所有的docker容器内的卷，没有指定目录的情况下都是在 `/var/lib/docker/volumes/xxxx/_data`下
- 如果指定了目录，`docker volume ls` 是查看不到的。
- 容器之间的配置信息的传递，数据卷容器的生命周期一直持续到没有容器使用为止。但是一旦你持久化到了本地，这个时候，本地的数据是不会删除的！



**拓展：**

```shell
# 通过 -v 容器内路径： ro rw 改变读写权限
ro #readonly 只读
rw #readwrite 可读可写
docker run -d -P --name nginx05 -v juming:/etc/nginx:ro nginx
docker run -d -P --name nginx05 -v juming:/etc/nginx:rw nginx

# ro 只要看到ro就说明这个路径只能通过宿主机来操作，容器内部是无法操作！
```





# 七、Dockerfile







> Dockerfile是用来构建docker镜像的文件！



## 1、构建步骤



**1、编写一个dockerfile文件,随后运行命令**



```shell
docker build -f 文件路径 -t 标签 .  # 文件名为Dockerfile时可省略-f
docker run     # 运行镜像
docker push    # 发布镜像
```



**2、Dockerfile命令**



| 命令           | 效果                                                         |
| -------------- | ------------------------------------------------------------ |
| FROM           | 基础镜像：Centos/Ubuntu                                      |
| MAINTAINER     | 镜像作者+邮箱                                                |
| RUN            | 镜像构建的时候需要运行的命令                                 |
| ADD            | 为镜像添加内容（压缩包）（**Copy + 解压缩**）                |
| WORKDIR        | 镜像工作目录（进入容器时的目录）                             |
| VOLUME         | 挂载的目录                                                   |
| EXPOSE         | 映射端口配置                                                 |
| CMD/ENTRYPOINT | 指定这个容器启动时要运行的命令（CMD替代先前命令，ENTRYPOINT在先前命令后追加） |
| COPY           | 类似于ADD，将文件拷贝到镜像中，COPY src desc 或 COPY["src", "desc"] |
| ENV            | 构建时设置环境变量                                           |



**3、注意事项**

- 每个保留关键字（指令）都必须是大写字母
- 从上到下顺序执行
- "#" 表示注释
- 每一个指令都会创建提交一个新的镜像层并提交







## 2、CMD和ENTRYPOINT





**区别测试：**



CMD：

```shell
# Dockerfile文件：
FROM centos
CMD ["ls","-a"]

# 构建镜像
$ docker build -f dockerfile-test-cmd -t cmd-test:0.1 .
# 运行镜像
$ docker run cmd-test:0.1
.
..
.dockerenv
bin
dev
# 想追加一个命令 -l 成为ls -al 
# cmd的情况下 -l 替换了CMD["ls","-l"]。 -l 不是命令所有报错
$ docker run cmd-test:0.1 -l
docker: Error response from daemon: OCI runtime create failed:
container_linux.go:349: starting container process caused "exec: \"-l\":executable file not found in $PATH": unknown.
ERRO[0000] error waiting for container: context canceled
```

ENTRYPOINT：

```shell
# Dockerfile文件
FROM centos
ENTRYPOINT ["ls","-a"]

$ docker run entrypoint-test:0.1
.
..
.dockerenv
bin
dev
etc ...

# 我们的命令，是直接拼接在我们得ENTRYPOINT命令后面的
$ docker run entrypoint-test:0.1 -l
total 56
drwxr-xr-x 1 root root 4096 May 16 06:32 .
drwxr-xr-x 1 root root 4096 May 16 06:32 ..
-rwxr-xr-x 1 root root 0 May 16 06:32 .dockerenv
```



## 3、案例





**独特的Centos：**

vim mydockerfile-centos：

```dockerfile
FROM centos
MAINTAINER xxx<xxx@qq.com>
ENV MYPATH /usr/local
WORKDIR $MYPATH
RUN yum -y install vim
RUN yum -y install net-tools
EXPOSE 80
CMD echo $MYPATH
CMD echo "-----end----"
CMD /bin/bash
```



```shell
docker build -f mydockerfile-centos -t mycentos:0.1 .
```



**独特的Tomcat：**



```Dockerfile
FROM centos #
MAINTAINER xxx<xxx@qq.com>
COPY README /usr/local/README #复制文件
ADD jdk-8u231-linux-x64.tar.gz /usr/local/ #复制解压
ADD apache-tomcat-9.0.35.tar.gz /usr/local/ #复制解压
RUN yum -y install vim
ENV MYPATH /usr/local #设置环境变量
WORKDIR $MYPATH #设置工作目录
ENV JAVA_HOME /usr/local/jdk1.8.0_231 #设置环境变量
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.35 #设置环境变量
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib #设置环境变量 分隔符是：
EXPOSE 8080 #设置暴露的端口
CMD /usr/local/apache-tomcat-9.0.35/bin/startup.sh && tail -F /usr/local/apachetomcat-9.0.35/logs/catalina.out # 设置默认命令
```



```shell
# 因为dockerfile命名使用默认命名 因此不用使用-f 指定文件
$ docker build -t mytomcat:0.1 .

$ docker run -d -p 8080:8080 --name tomcat01 -v /home/www/build/tomcat/test:/usr/local/apache-tomcat-9.0.35/webapps/test -v /home/www/build/tomcat/logs/:/usr/local/apache-tomcat-9.0.35/logs mytomcat:0.1
```





## 4、发布镜像到DockerHub



**1、使用docker login登录账号**

```shell
[root@VM-8-2-centos ~]# docker login --help

Usage:  docker login [OPTIONS] [SERVER]

Log in to a Docker registry.
If no server is specified, the default is defined by the daemon.

Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username
```



**2、使用docker push到远程仓库**

```shell
# 会发现push不上去，因为如果没有前缀的话默认是push到 官方的library
# 解决方法
# 第一种 build的时候添加你的dockerhub用户名，然后在push就可以放到自己的仓库了
$ docker build -t itnxd/mytomcat:0.1 .
# 第二种 使用docker tag #然后再次push
$ docker tag 容器id itnxd/mytomcat:1.0 #然后再次push
$ docker push itnxd/mytomcat:1.0
```





# 八、Docker网络



## 1、Docker0



通过命令**ip addr**查看本地ip地址，我们发现除了本机回环地址和的内网地址外，还多了一个网卡：Docker0，这是Docker服务启动后自动生成的。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a50f68ce0520830e84a45cc75591815bf54ab148/2021/09/22/01f0e5b3344e413135c7561e28aa4d5d.png)



而如果启动正在后台运行的tomcat容器，同样使用**ip addr**命令，发现容器得到了一个新的网络：**12: eth@if13**，ip地址：**172.17.0.2**。这是Docker在容器启动时为其分配的。

我们惊奇地发现了一个新网络**13: vethda1df4b@if12**，对应容器内网络地址的**12: eth@if13**。

- linux可以ping通docker容器内部，因为docker0的ip地址为**172.17.0.1**，容器为**172.17.0.2**。在一个网段中！
- 原理：我们每启动一个docker容器，docker就会给容器分配一个默认的可用ip，我们只要安装了docker，就会有一个网卡docker0(bridge)。网卡采用桥接模式，并使用veth-pair技术（veth-pair就是一堆虚拟设备接口，成对出现，一段连着协议，一段彼此相连，充当一个桥梁。）。
- docker中的所有网络接口都是虚拟的 ，转发效率高。删除容器后，对应的网桥也随之删除。
- 所有的容器不指定网络的情况下，都是docker0路由的，docker会给我们的容器分配一个默认的可用ip。



## 2、--link



若编写一个微服务并连接数据库，如果数据库ip改变，如何根据容器名而不是ip访问容器？显然，直接使用容器名是无法ping通容器内部的！



这时我们可以在容器启动命令中加入一个选项：**--link**，使得我们可以根据容器名来访问容器。

```shell
docker run -d -P --link 容器名/id 镜像名/id
```



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4d374d776e8aabff6bf2cce9ab3aa40266dd8659/2021/09/22/9cb5deb39011b9a94f887378cd6c553c.png)



然而反向就不可以ping通，这是因为--link的本质是把需要连接的容器名/id写入启动容器的Hosts文件中，即增加了一个ip和容器名/id的映射：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f9507d072e8f53a29ef0be33da81f03bfe36bd28/2021/09/22/c984c3b415f209a0280de3211ff8cd42.png)





**目前已经不建议使用这种方式。**





## 3、自定义网络





**使用如下命令查看docker的网络类型：**



```shell
docker network ls    # 查看所有的docker网络
```



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@63f2050677dc2b15fe5b04761633d2b21ce5c527/2021/09/22/4022f7cc8d8354fdf94bb70012ff9524.png)





- bridge：桥接（docker默认）
- none：不配置网络 
- host：和宿主机共享网络



**创建一个新的网络：**



```shell
docker  network create --driver 网络模式 --subnet 子网ip --gateway 网关 网络名  
```



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2e9a984a38b7e2699df89e9ea403a45d2eddd9e3/2021/09/22/fb627a077e745b7e7947ad030b2b7e2f.png)



**使用docker network inspect命令查看其详细信息：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@927975a27b8481dffffebd5cb2717f3cbddd5e5b/2021/09/22/cf8a9259ffc4889a95cb8c15db080083.png)





只要多个容器启动时都通过 **--net**，选用了同一个已创建的网络，不同容器间即可通过ip地址或容器名/id连通，因为都在一个网段内！





## 4、网络联通



对于建立在不同网络下(docker0, newnet)的两个容器tomcat01和tomcat02，他们的网段不同，因此是无法彼此ping通容器内部的：



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@be29c64960faedbda2d599b29f920ed6544920df/2021/09/22/96741dfd1f07fabd799acc3c6a8df50a.png)







这时我们需要通过**docker network connect**命令打通容器与网络之间的连接：

```shell
docker network connect 网络名 容器名/id
```

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2a6026fd5c305b2e60e809929881b91466d2b57c/2021/09/22/eaef7f917e411751c8bdc78f7c93829f.png)





**原理**：将一个容器赋予多个ip地址，同样可以用**docker network inspect**命令查看网络连通后，该网络的变化：

新建的网络中绑定了一个新的容器！此时

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2f8047ce9f1187ce44617bc63c25240656038bdc/2021/09/22/56567d0b1f90a9df355d88f6880f05e0.png)







# 九、Docker案例



## 1、基于Docker的Redis集群搭建



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@83c77e3c0f36f46d6b4ea23f78da71aacb8e431d/2021/09/22/7f2e9d0b725c43333dfc3337d82d5773.png)



```shell
# 创建网卡
docker network create redis --subnet 172.38.0.0/16
 
# 通过脚本创建六个redis配置
for port in $(seq 1 6); \
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done
# 创建结点1
docker run -p 6371:6379 -p 16371:16379 --name redis-1 \
-v /mydata/redis/node-1/data:/data \
-v /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.11 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
 
#创建结点2
docker run -p 6372:6379 -p 16372:16379 --name redis-2 \
-v /mydata/redis/node-2/data:/data \
-v /mydata/redis/node-2/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.12 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
#创建结点3
docker run -p 6373:6379 -p 16373:16379 --name redis-3 \
-v /mydata/redis/node-3/data:/data \
-v /mydata/redis/node-3/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.13 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
#创建结点4
docker run -p 6374:6379 -p 16374:16379 --name redis-4 \
-v /mydata/redis/node-4/data:/data \
-v /mydata/redis/node-4/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.14 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
#创建结点5
docker run -p 6375:6379 -p 16375:16379 --name redis-5 \
-v /mydata/redis/node-5/data:/data \
-v /mydata/redis/node-5/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.15 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
#创建结点6
docker run -p 6376:6379 -p 16376:16379 --name redis-6 \
-v /mydata/redis/node-6/data:/data \
-v /mydata/redis/node-6/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.16 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
 
# 创建集群
docker exec -it redis-1 /bin/sh
/data # ls
appendonly.aof  nodes.conf
/data # redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 172.38.0.15:6379 to 172.38.0.11:6379
Adding replica 172.38.0.16:6379 to 172.38.0.12:6379
Adding replica 172.38.0.14:6379 to 172.38.0.13:6379
M: 541b7d237b641ac2ffc94d17c6ab96b18b26a638 172.38.0.11:6379
   slots:[0-5460] (5461 slots) master
M: a89c1f1245b264e4a402a3cf99766bcb6138dbca 172.38.0.12:6379
   slots:[5461-10922] (5462 slots) master
M: 259e804d6df74e67a72e4206d7db691a300c775e 172.38.0.13:6379
   slots:[10923-16383] (5461 slots) master
S: 9b19170eea3ea1b92c58ad18c0b5522633a9e271 172.38.0.14:6379
   replicates 259e804d6df74e67a72e4206d7db691a300c775e
S: 061a9d38f22910aaf0ba1dbd21bf1d8f57bcb7d5 172.38.0.15:6379
   replicates 541b7d237b641ac2ffc94d17c6ab96b18b26a638
S: 7a16b9bbb0615ec95fc978fa62fc054df60536f0 172.38.0.16:6379
   replicates a89c1f1245b264e4a402a3cf99766bcb6138dbca
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
...
>>> Performing Cluster Check (using node 172.38.0.11:6379)
M: 541b7d237b641ac2ffc94d17c6ab96b18b26a638 172.38.0.11:6379
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: a89c1f1245b264e4a402a3cf99766bcb6138dbca 172.38.0.12:6379
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: 7a16b9bbb0615ec95fc978fa62fc054df60536f0 172.38.0.16:6379
   slots: (0 slots) slave
   replicates a89c1f1245b264e4a402a3cf99766bcb6138dbca
S: 061a9d38f22910aaf0ba1dbd21bf1d8f57bcb7d5 172.38.0.15:6379
   slots: (0 slots) slave
   replicates 541b7d237b641ac2ffc94d17c6ab96b18b26a638
M: 259e804d6df74e67a72e4206d7db691a300c775e 172.38.0.13:6379
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 9b19170eea3ea1b92c58ad18c0b5522633a9e271 172.38.0.14:6379
   slots: (0 slots) slave
   replicates 259e804d6df74e67a72e4206d7db691a300c775e
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
```



## 2、基于Docker的springboot项目部署





1、打包项目

```shell
mvn package
```

2、编写Dockerfile

```dockerfile
FROM java:8
COPY *.jar /app.jar 
CMD ["--server.port=8080"]
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

3、构建镜像

```shell
# 1.复制jar和DockerFIle到服务器
# 2.构建镜像
$ docker build -t xxxxx:xx  .
```

4、发布运行

```shell
docker run -p 8080:8080 -t springboot/web-app-template 运行
```





# 十、Docker Compose







## 1、简介





Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。





Compose 使用的三个步骤：

- 使用 Dockerfile 定义应用程序的环境。
- 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
- 最后，执行 docker-compose up 命令来启动并运行整个应用程序。







## 2、安装





```shell
# 官网提供 （下载很慢）
curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
 
# 国内地址
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# 授予可执行权限
chmod +x /usr/local/bin/docker-compose

# 测试是否安装成功
docker-compose --version
```



## 3、yaml



> 官方yaml样例及配置语法：[https://docs.docker.com/compose/compose-file/compose-file-v3/#compose-file-structure-and-examples](https://docs.docker.com/compose/compose-file/compose-file-v3/#compose-file-structure-and-examples)
>
> 菜鸟教程相关：[https://www.runoob.com/docker/docker-compose.html](https://www.runoob.com/docker/docker-compose.html)



**执行流程：**

1. 创建网络
2. 执行Docker-compose.yaml
3. 启动服务



## 4、部署自己项目





1、编写项目微服务



2、Dockerfile构建镜像

```dockerfile
FROM java:8
COPY *.jar /app.jar
CMD ["--server.port=8080"]
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```



3、docker-compose.yml编排项目

```yaml
version '3.8'
services:
  xiaofanapp:
    build: .
    image: myapp
    depends_on:
      - redis
    ports:
      - "8080:8080"
 
  redis:
    image: "library/redis:alpine"
```



4、运行

```shell
docker-compose up			# 运行
docker-compose up -d		# 后台运行
docker-compose down         # 关闭容器
docker-compose up --build   # 重新构建
```





# 十一、Docker Swarm



> 需要购买多态服务器，或多台虚拟机！
>
> 推荐去阿里云或腾讯云购买按量付费的4台1h2g即可！









## 1、简介



Docker Swarm 是 Docker 的集群管理工具。它将 Docker 主机池转变为单个虚拟 Docker 主机。 Docker Swarm 提供了标准的 Docker API，所有任何已经与 Docker 守护程序通信的工具都可以使用 Swarm 轻松地扩展到多个主机。

支持的工具包括但不限于以下各项：

- Dokku
- Docker Compose
- Docker Machine
- Jenkins



## 2、Swarm集群搭建



**工作机制：**

如下图所示，swarm 集群由管理节点（manager）和工作节点（work node）构成。

- **swarm mananger**：负责整个集群的管理工作包括集群配置、服务管理等所有跟集群有关的工作。
- **work node**：主要负责运行相应的服务来执行任务（task）。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@43887f3127596be8a4ef325228aa42e7d59b53d2/2021/09/22/776fabf18bc07dd61ead6e65272266c9.png)





```shell
docker swarm init --help
 
ip addr # 获取自己的ip（用内网的不要流量）
 
[root@iZ2ze58v8acnlxsnjoulk5Z ~]# docker swarm init --advertise-addr 172.16.250.97
Swarm initialized: current node (otdyxbk2ffbogdqq1kigysj1d) is now a manager.
To add a worker to this swarm, run the following command:
    docker swarm join --token SWMTKN-1-3vovnwb5pkkno2i3u2a42yrxc1dk51zxvto5hrm4asgn37syfn-0xkrprkuyyhrx7cidg381pdir 172.16.250.97:2377
To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

[root@iZ2ze58v8acnlxsnjoulk6Z ~]# docker swarm join --token SWMTKN-1-3vovnwb5pkkno2i3u2a42yrxc1dk51zxvto5hrm4asgn37syfn-0xkrprkuyyhrx7cidg381pdir 172.16.250.97:2377
This node joined a swarm as a worker.
```



- docker swarm init：初始化结点
- docker swarm join：加入一个结点！
- docker swarm join-token manager：获取manger token令牌
- docker swarm join-token worker：获取worker token令牌
- docker node ls：查看节点信息
- docker swarm leave：暂时离线，Status状态会改为Down



Manager Status：

- Leader：表示是一个manager
- Reachable：表示是另一个manager，且该服务正常
- Unreachable：表示是另一个manager，但服务不正常
- 空：表示是一个worker



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@3d42a3ef3438ea1dd34bfd3becba1018a1f68016/2021/09/22/8c39219df28f4cee550513230609af18.png)







## 3、Raft协议







Raft协议：保证**大多数**（指的是大于百分之五十即可）结点存活才可以使用，至少要有两台活着才能正常使用，集群至少要有3台manager！



例：双主双从时：将第一个Leader的docker停止后，就只有一个Reachable的主机无法判断是自己挂了还是别人挂了，即内部选举无法判断！大于三台才好判断！







## 4、docker service





操作集群，控制一个集群中的所有服务器就得使用docker service命令，可以用于动态扩缩容器！



```shell
docker run 			# 容器启动！ 不具有扩缩容器
docker service 		# 集群启动！ 具有扩缩容器，滚动更新！

docker service --help # 查看服务参数

# 整个集群创建nginx服务，不一定是哪台创建，动态的
docker service create -p 80:80 --name mynginx nginx

docker service ps 服务名	# 查看服务，服务在哪个节点上
docker service ls 		  # 列出服务,查看副本数
docker service rm 服务名	# 移除

# 创建副本 可以创建很多 内存足够即可 动态分配创建（不一定哪台会创建多少台）
# 数字减小也会动态的将多的副本停掉！
docker service update --replicas 3 my-nginx # 不会rm容器，只是stop
docker service scale my-nginx=5 # 会rm容器

# 查看服务具体信息
docker service inspect --pretty 服务名

# 停止某个节点接收新的任务
docker node update --availability drain swarm-worker1
# 重新激活节点
docker node update --availability active swarm-worker1
```

