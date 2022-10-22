---
title: Java自动化构建工具之Maven的使用介绍
author: ITNXD
toc: true
abbrlink: 49783
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/19b1d656cb7ddd17c5069f31a4b61b81.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/19b1d656cb7ddd17c5069f31a4b61b81.png
categories:
  - 构建工具
tags:
  - Maven
date: 2021-03-27 15:10:02
updated:
---







# 一、Maven介绍



## 1、Maven是什么





> Maven是一款服务于Java平台的自动化构建工具！是Apache的一款开源的项目管理工具！





**什么是构建？**



简单来说：就是以“Java源文件”、“框架配置文件”、“JSP”、“HTML”、“图片”等资源为“原材料”，去“生产”一个可以运行的项目的过程。



**构建过程中的各个环节：**

1. 清理∶将以前编译得到的旧的class字节码文件删除，为下一次编译做准备[2]编译∶将Java源程序编程成class字节码文件
2. 测试∶自动测试，自动调用junit程序
3. 报告∶测试程序执行的结果
4. 打包∶动态Web工程打war包，Java工程打jar包
5. 安装：Maven特定的概念——将打包得到的文件复制到“仓库”中的指定位置
6. 部署︰将动态Web工程生成的war包复制到Servlet容器的指定目录下，使其可以运行









## 2、Maven能干什么





1. 如果项目非常庞大，就不适合继续使用package来划分模块。借助于Maven就可以将一个项目拆分成多个工程。
2. 借助于Maven，可以将jar包仅仅保存在“仓库”中，有需要使用的工程“**引用**”这个文件接口，并不需要真的把jar包复制过来。
3. 借助于Maven可以一种规范的方式下载jar包。因为所有知名框架或第三方工具的jar包以及按照统一的规范存放在了Maven的中央仓库中。
4. 借助于Maven可以自动将一个包被依赖的所有jar包全部导入进来。











# 二、Maven配置









> **Maven下载地址：** [http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)
>
> Maven 的核心程序中仅仅**定义了抽象的生命周期**，而具体的操作则是由 Maven 的**插件**来完成的。可是Maven 的插件并不包含在 Maven 的核心程序中，在首次使用时需要联网下载。







## 1、Maven配置



1. 环境变量配置`M2_HOME`为Maven安装路径
2. 环境变量配置`PATH`为`%M2_HOME%\lib`
3. CMD运行命令`mvn -v`查看是否配置正确





## 2、Maven的settings.xml配置





> 文件位于安装目录的conf目录下！



1. 配置默认的本地仓库位置



一般默认地址为：`C:\Users[当前登录的用户名].m2\repository`

```xml
<localRepository>D:\MyMavenRep</localRepository>
```



2. 配置阿里镜像地址



```xml
<mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
</mirror>
```





3. 指定JDK和编译器信息



```xml
<profile>
    <!-- 配置为使用jdk8 -->
    <id>jdk-1.8</id>
    <activation>
        <!-- 激活，使用该配置 -->
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
        <!-- 编译器配置 -->
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
</profile>
```









# 三、Maven工程目录结构







![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/b75c1f28e36a0093c70067f05368f789.png)







1. 根目录︰工程名
2. src目录︰源码
3. pom.xml文件：Maven工程的核心配置文件
4. main目录∶存放主程序
5. test目录∶存放测试程序
6. java目录∶存放Java源文件
7. resources目录∶存放框架或其他工具的配置文件
8. target目录：存放编译后的内容





# 四、常用Maven命令



> 注意∶执行与构建过程相关的Maven命令，必须进入pom.xml所在的目录。与构建过程相关∶编译、测试、打包、...…







**常用命令：**



1. mvn clean：清理
2. mvn compile：编译主程序
3. mvn test-compile：编译测试程序
4. mvn test：执行测试
5. mvn package：打包
6. mvn install：安装
7. mvn site：生成站点







# 五、POM





> POM（Project Object Model）：项目对象模型。将 Java 工程的相关信息封装为对象作为便于操作和管理的模型。Maven 工程的核心配置。可以说学习 Maven 就是学习 pom.xml 文件中的配置。







# 六、坐标







> 所谓坐标，就是可以用来唯一定位目标的方法！
>
> Maven中的坐标由三个标签唯一决定！可以在 Maven 的仓库中唯一的确定一个 Maven 工程。
>
> 我们自己的 Maven 工程必须执行安装操作才会进入仓库。安装的命令是：mvn install





**三大标签又被称之为：GAV坐标**



1. groupId：公司或组织的域名倒序+当前项目名称
2. artifactId：当前项目的模块名称
3. version：当前模块的版本





```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>4.0.0.RELEASE</version>
	</dependency>
</dependencies>
```







**Maven工程坐标与仓库路径对应关系：**



以上方依赖举例：`org/springframework/spring-core/4.0.O.RELEASE/spring-core-4.0.0.RELEASE.jar`











# 七、仓库







## 1、仓库分类





1. 本地仓库
2. 远程仓库
   1. 私服：搭建在局域网使用的Maven仓库
   2. 中央仓库：架设在互联网上的官方Maven仓库
   3. 中央仓库镜像：镜像仓库，自然是为了加速，分担流量



**优先级：** 本地仓库，本地仓库没有则去中央仓库找，找到则下载到本地仓库，下次使用同一包，则无需去中央仓库下载！





## 2、仓库中的文件



1. Maven自身所需要的插件
2. 第三方框架或工具的jar包
3. 我们自己开发的Maven工程







# 八、依赖





> Maven解析依赖信息时会到本地仓库中查找被依赖的jar包。
>
> 对于我们自己开发的Maven工程，使用mvn install命今安装后就可以进入仓库。





## 1、依赖范围



**如下图：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/56bb0fd1e4dacd6921f9c41b4cab218e.png)







**使用scope标签指定：**





```xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```







#### 1.1、compile



> 默认值，表示该依赖在编译和运行时都生效



1. 对主程序是否有效：有效
2. 对测试程序是否有效：有效
3. 是否参与打包：参与
4. 是否参与部署：参与
5. 典型例子：spring-core





#### 1.2、test



> 见名之意，就是针对测试程序的！



1. 对主程序是否有效：无效
2. 对测试程序是否有效：有效
3. 是否参与打包：不参与
4. 是否参与部署：不参与
5. 典型例子：Junit





#### 1.3、provided



> 见名之意，Tomcat服务器有的，即被提供的，就不需要再导包部署到容器运行了！



1. 对主程序是否有效：有效
2. 对测试程序是否有效：有效
3. 是否参与打包：不参与
4. 是否参与部署：不参与
5. 典型例子：servlet-api





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/eaf5a7dba024e92c82159af8cab584a0.png)











## 2、依赖的传递性



> A依赖B，A则会具有B声明为compile范围的依赖！
>
> 只需要将B使用命令`mvn install`到本地仓库即可在A中通过GAV坐标形式引入！



**好处**：可以传递的依赖不必在每个模块工程中都重复声明，在”最下面”的工程中依赖一次即可。

**注意**：非compile范围的依赖不能传递。所以在各个工程模块中,如果有需要就得重复声明依赖。











## 3、依赖的排除



> 由于依赖的传递性会导致一些不需要的依赖被传递过来，则可以使用`exclusions`标签指定排除的依赖！
>
> 无需指定版本号，默认全部排除！







```xml
<!-- 项目A的pom.xml -->
<dependencies>
    <!-- 依赖项目B -->
    <dependency>
        <groupId>com.atguigu</groupId>
        <artifactId>DemoB</artifactId>
        <version>1.0-SNAPSHOT</version>

        <exclusions>
            <exclusion>
                <groupId>commons-logging</groupId>
                <artifactId>commons-logging</artifactId>
                <!-- 不写版本号 -->
            </exclusion>
        </exclusions>
    </dependency>
</dependencies>
```











## 4、依赖的原则





> 解决模块之间jar包冲突问题！



**最短路径优先原则：**



A依赖B，B依赖C，若B和C有同一个依赖，即使版本不同，A仍然使用更近的B！



**路径相同时先声明者优先：**



A依赖B，A依赖C，B和C无关，则路径相同的情况下，A依赖pom.xml文件中先声明的！





## 5、统一管理依赖版本



> 若想指定统一版本，例如Spring各个包的版本，可以使用自定义标签进行指定，然后在需要的地方统一引用即可！





```xml
<properties>
    <!--自定义标签-->
    <spring.version>4.0.0.RELEASE</spring.version>
</properties>

<!--指定版本的地方直接引用即可-->
<version>${ atguigu. spring. version }</version>
```





**可以使用下面的标签指定编码方式：**



```xml
<properties>
    <!--内置标签-->
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
```







## 6、依赖的继承







> 由于非 compile 范围的依赖信息是不能在“依赖链”中传递的，所以有需要的工程只能单独配置！
>
> 例如Junit，各个模块版本会不一致！





#### 6.1、创建打包方式为pom的父工程



> 创建打包方式为pom的父工程，并在其中使用`dependencyManagement`统一管理依赖！



```xml
<groupId>com.atguigu.maven</groupId>
<artifactId>Parent</artifactId>
<version>0.0.1-SNAPSHOT</version>
<packaging>pom</packaging>

<!--在父工程中管理依赖-->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.9</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```







#### 6.2、子工程引用父工程实现继承



> 注意：标签中的`relateivePath`是相对于当前pom.xml目录的父工程路径！
>
> 删除子工程的版本号配置，也可以不删除，即表示不使用父工程版本！
>
> 删除范围scope！
>
> 注意：配置了继承，执行安装命令要先安装父工程！



```xml
<!--这个groupId父工程也有，也可以删掉-->
<groupId>com.atguigu.maven</groupId>
<artifactId>WebProject01</artifactId>
<version>0.0.1-SNAPSHOT</version>
<packaging>war</packaging>

<!--在子工程中声明使用父工程-->
<parent>
    <groupId>com.atguigu.maven</groupId>
    <artifactId>Parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <!-- 指定从当前子工程的pom.xml文件出发，查找父工程的pom.xml的路径 -->
    <relativePath>../Parent/pom.xml</relativePath>
</parent>

<!--在子工程中声明使用父工程具体依赖-->
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <!-- 无需声明版本号，继承父工程的版本号 -->
    </dependency>
</dependencies>
```





# 九、生命周期







> Maven 生命周期定义了各个构建环节的执行顺序，有了这个清单，Maven 就可以自动化的执行构建命令了。





1. 各个构建环节执行的顺序: 不能打乱顺序,必须按照既定的正确顺序来执行。
2. Maven的核心程序中定义了抽象的生命周期，生命周期中各个阶段的具体任务是由插件来完成的。
3. Maven核心程序为了更好的实现自动化构建,按照这一 的特点执行生命周期中的各个阶段，不论现在要执行生命周期中的哪一个阶段，都是从这个生命周期最初的位置开始执行。
4. Maven 的生命周期与插件目标相互绑定，以完成某个具体的构建任务。例如：compile 就是插件 maven-compiler-plugin 的一个目标；pre-clean 是插件 maven-clean-plugin 的一个目标。











# 十、聚合



> 一键安装各个模块工程！
>
> 将多个工程拆分为模块后，需要手动逐个安装到仓库后依赖才能够生效。修改源码后也需要逐个手动进行 clean 操作。而使用了聚合之后就可以批量进行 Maven 工程的安装、清理工作。
>
> 可以在其他工程做聚合操作，也可以直接在实现继承的父工程中做聚合操作！一般就在实现继承的父工程内！





**在总的聚合工程（父工程）中使用 modules/module 标签组合，指定模块工程的相对路径即可：**



```xml
<modules>
    <module>../Hello</module>
    <module>../HelloFriend</module>
    <module>../MakeFriends</module>
</modules>
```





**使用方式：**

在聚合工程的pom.xml上点右键 run as - maven install即可！









# 十一、在Eclipse中使用Maven





> Eclipse内置了Maven插件！





## 1、Maven插件的设置



> 设置路径：window -> preference -> Maven



1. installations：指定Maven核心程序的位置。不建议使用插件自带的Maven程序，而应该使用我们自己解压的那个。





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/143fec9846f5cc9a7eebf605e1605aa1.png)





2. user settings：指定conf/settings.xml的位置，进而获取本地仓库的位置。



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/ea50c4e8e0fcf72438579df845d47869.png)





## 2、创建Maven版的Java工程



> 打包方式设置为`jar`即可！



**若右键new没有Maven project选项，可以在如下位置进行设置：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/59a6fbac3f4d789c7290e8e3deab06f2.png)



**在下方选项卡中找到Maven Project勾选上即可！**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/f58b93b1018380e35393b4d29b7ab962.png)





**记得勾选如下位置：** 这样创建的为标准结构的Maven工程！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/b3c452d36f6939bbf188966202cf8b1b.png)







**解决Eclipse工程JDK默认为1.5的bug：**



直接在Maven的settings.xml中添加配置如下：



```xml
<profile>
    <id>jdk-1.8</id>
    <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
</profile>
```













## 3、创建Maven版的Web工程（了解）



> 打包方式设置为`war`即可！





**解决创建完成之后因缺少 web.xml 文件工程pom.xml出现小红叉：**







1. 在工程上右键→Build Path→Configure Build Path…
2. 点击 Project Facets 表示 Eclipse 当前工程不是 Web 工程，点击应用
3. 再告诉 Eclipse 当前工程是一个 Web 工程，点击应用并关闭，出现一个配置项，设置一个`Content diretory`目录存放web资源，设置为WebContext或`src/main/webapp`，此时会生成web.xml文件和WEB-INF目录



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/d6c944b26f1cfd211ada501669449c9e.png)





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/a47943f9d8a0b22daf3f2c12d5376972.png)









## 4、在 Eclipse 中导入 Maven 工程





**点击 File→Import…**



- 标准的Maven工程自然就可以方式一导入！
- 手动创建的 Maven 项目时，由于项目中没有 Eclipse 生成的一些文件，使用方式一导入时 Eclipse 认为它不是一个工程！只能使用方式二！
- Eclipse是通过pom.xml文件识别为Maven项目的
- 导入到 Eclipse 中之后就会生成一些 Eclipse 能识别的文件
- 有了这些 Eclipse 能识别的文件之后以后再往 Eclipse 中导入的时候选择方式一和方式二都可以







![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/69af540806e740fe7a659f5d8f19ffec.png)









![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/604c0ed6a92e162363d9aa592133ecde.png)











# 十二、在IDEA中使用Maven









> Idea 中也自带 Maven 插件，而且我们也可以给自带的 Maven 插件进行配置，所以我们可以使用自带的 Maven，也可以使用我们安装的 Maven 核心程序。





## 1、Maven插件设置



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/72e5b5fc50d53c0286c1a56854a830e9.png)





## 2、创建Maven版的Java工程





> 直接新建Module，记得勾选下方圈中的部分，表示创建标准结构的Maven工程！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/5748d5e560bcf6aaaace3b16e7160beb.png)





## 3、创建Maven版的Web工程（了解）







**创建方式同上，修改配置打包方式为war如下：**



```xml
<groupId>com.atguigu.maven</groupId>
<artifactId>WebMavenProject</artifactId>
<version>1.0-SNAPSHOT</version>

<!--手动指定为Web工程的打包方式war-->
<packaging>war</packaging>
```



**在project structure中设置添加生成web.xml配置文件：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/3c195065e14d22d2681b578b03bb8974.png)









## 4、在Idea中导入Maven工程



> Idea导入和Eclipse一样，也是引用，而非复制，若想导入到本项目路径下，需要手动复制，再进行导入！





**在project structure中导入：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/27/c4a7da5749c2054c6321c98f0f5e8d1a.png)

