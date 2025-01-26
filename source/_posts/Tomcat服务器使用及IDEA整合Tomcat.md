---
title: Tomcat服务器使用及IDEA整合Tomcat
author: ITNXD
toc: true
abbrlink: 61877
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/57f696e6cd722842708032b130b5b0fe.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/57f696e6cd722842708032b130b5b0fe.png
categories:
  - JavaWeb
tags:
  - Tomcat
date: 2021-03-07 10:39:29
updated:
---



# 一、Tomcat服务器使用







## 1、常用web服务器



1. **Tomcat：由 Apache 组织提供的一种 Web 服务器，提供对 jsp 和 Servlet 的支持。它是一种轻量级的 javaWeb 容器（服务器），也是当前应用最广的 JavaWeb 服务器（免费）。**
2. Jboss：是一个遵从 JavaEE 规范的、开放源代码的、纯 Java 的 EJB 服务器，它支持所有的 JavaEE 规范（免费）。
3. GlassFish： 由 Oracle 公司开发的一款 JavaWeb 服务器，是一款强健的商业服务器，达到产品级质量（应用很少）。
4. Resin：是 CAUCHO 公司的产品，是一个非常流行的服务器，对 servlet 和 JSP 提供了良好的支持，性能也比较优良，resin 自身采用 JAVA 语言开发（收费，应用比较多）。
5. WebLogic：是 Oracle 公司的产品，是目前应用最广泛的 Web 服务器，支持 JavaEE 规范，而且不断的完善以适应新的开发要求，适合大型项目（收费，用的不多，适合大公司）。





## 2、Tomcat与Servlet版本对应关系





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/80ad5d35daab196c692fbaca7155dd4a.png)







## 3、Tomcat安装目录介绍



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/0e08f99490d39ab737caf0034a855dad.png)





1. `bin` 专门用来存放 Tomcat 服务器的可执行程序
2. `conf` 专门用来存放 Tocmat 服务器的配置文件
3. `lib` 专门用来存放 Tomcat 服务器的 jar 包
4. `logs` 专门用来存放 Tomcat 服务器运行时输出的日记信息
5. `temp` 专门用来存放 Tomcdat 运行时产生的临时数据
6. `webapps` 专门用来存放部署的 Web 工程。
7. `work` 是 Tomcat 工作时的目录，用来存放 Tomcat 运行时 jsp 翻译为 Servlet 的源码，和 Session 钝化的目录。





## 4、Tomcat服务器启动





#### 3.1、启动



> 注意：启动若一闪而过，则为环境变量`JAVA_HOME`没有配置正确！



- 命令行输入`catalina run`
- 双击安装目录下的`startup.bat`



**经测试**：Tomcat10.0版本启动与关闭可直接使用`Configure Tomcat`进行设置：

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/f8c6fa1e08b152bc28e243b7e8bd36a7.png)



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/297b0556a94500eb17d779fbd2cbf0d2.png)





#### 3.2、关闭



- 命令行输入`catalina stop`
- 双击安装目录下的`shutdown.bat`
- Dos窗口下直接`ctrl + c`







## 5、Tomcat端口修改



> 默认端口为8080，若需修改在安装目录下找到 `conf` 目录，找到 `server.xml` 配置文件，进行修改！
>
> **注意：** 修改配置信息后需要重启服务器生效！







## 6、部署项目到Tomcat中





- 只需要把 web 工程的目录拷贝到 Tomcat 的 webapps 目录下即可。

- 找到 Tomcat 下的目录`conf\Catalina\localhost\` 下，创建配置文件`xxx.xml`：

  - ```xml
    <!-- Context 表示一个工程上下文
    path 表示工程的访问路径:/abc
    docBase 表示你的工程目录在哪里
    -->
    <Context path="/abc" docBase="E:\book" />
    ```

  - **注意**：一定要保存为`utf-8`编码，当然你要是使用IDE当我没说！



**关于访问情况：**

- 不加路径默认为`ROOT`根目录
- 不加路径后面的文件名，默认为`index.html`







# 二、IDEA整合Tomcat



> 本教程针对最新版IDEA，即`2020.3`版本，与旧版本略有不同！这里一并说明各版本差异！





## 1、整合Tomcat



> IDEA由于过于智能，自动将`Tomcat Home` 和 `Tomcat base directory`配置好了！
>
> 旧版本没有配置的手动选择Tomcat安装目录即可！



**IDEA设置路径：**`File | Settings | Build, Execution, Deployment | Application Servers` 点击绿色的`+`号进行添加`Tomcat Server`



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/42eb424eac83cf857ee354ee371bd552.png)









## 2、IDEA创建动态Web工程





#### 2.1、创建普通Web工程



1. 新建一个`module`，选择`Java`
2. 在`module`上右键选择`Add Framework Support...`
3. 然后选择`Web Application`，并勾选右边`Create web.xml`即可



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/a9a53410bee7006c61b1f03f59781ca1.png)





**工程目录结构如下：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/e5f946fdd0da08b36d5a2ba00587761e.png)





#### 2.2、创建Maven Web工程



1. 新建一个`module`，选择`Java Enterprise`，选择`Application server`（默认已经选好），其余默认`next`即可！





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/cabdf17815b0c34a03f665e4df0de19f.png)





2. 选择`Libraries and Frameworks`为`Web Profile`即可！点击`next`完成



**注意：旧版本IDEA选择`Web Application`，点击`Create web.xml`即可！**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/4a67fbf83d5ea56f176ed5f6a6dafbc6.png)









3. 依次输入项目保存路径，包名，项目名称和版本号，点击`finish`即可！





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/722035da6ad72e880262089f8327a53d.png)









## 3、Web工程文件目录介绍



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/0516cf4839864a1bde3882c26776f80b.png)





1. `java`目录：存放`java`源码
2. `resources`目录：存放配置文件
3. `webapp`目录：存放`web`资源，`html js css`等
4. `WEB-INF`目录：受服务器保护的目录，浏览器无法直接访问
5. `web.xml`文件：是整个动态`web`工程的配置部署描述文件，可以配置许多`web`工程的组件，`Servlet、Filter、Listener、Session`等
6. `lib`目录：为自己新建，存放用到的第三方库





## 4、lib目录添加jar包





1. 方式一：选中全部要使用jar包，右键`Add as library`即可

2. 方式二：点击`Project Structure`的绿色`+`号，找到项目文件目录的lib目录选中需要用到的jar包，确认即可！可以创建一个名称例如：`06_web`，右键该库`06_web`选择`Add to Modules`，选择创建的`web`工程模块即可！





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/f83940bf5d5f2edf14d33a82cbe3f683.png)







## 5、Artifacts设置





> `Artifacts`，它的作用是整合编译后的 java 文件，资源文件等，有不同的整合方式，比如`war、jar、war exploded `等，对于 Module 而言，有了 Artifact 就可以部署到 web 容器中了。其中 war 和 war exploded 区别就是后者不压缩，开发时选后者便于看到修改文件后的效果。
>
> 要想使用Tomcat启动，必须配置好Artifacts设置！





**进入`Project Structure`设置：**选择需要部署的`Module`即可！



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/c8486393a4f17e2166345ebfa3873866.png)











## 6、IDEA中Tomcat配置修改











> 点击如下位置的`Edit Configurations ...`即可进入设置！





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/331a3b0aab43e5c97350152551f999d5.png)







1. 修改Tomcat运行实例名称为Web工程名，一个工程一个实例，防止冲突
2. 修改Tomcat端口号和JMX端口号，防止冲突
3. 配置资源热部署，资源变动刷新即可发生改变，自动部署**（自然会更加占用内存）**
4. 修改默认使用浏览器
5. 修改工程访问路径





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/744f42703cce882439819c6ffcec0e51.png)





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/07/8b04404ecd9ef95b731eaf70f4b8b3ef.png)









**控制台输出乱码解决方案：**





> 将Tomcat安装目录下的conf目录下的`logging.properties`文件中的编码方式`UTF-8`全部修改为`GBK`，重新部署即可！

