---
title: JavaWeb之Servlet使用总结
author: ITNXD
toc: true
abbrlink: 58740
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/08/ba2bb57f28e91a5b1ea717ac93817640.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/08/ba2bb57f28e91a5b1ea717ac93817640.png
categories:
  - JavaWeb
tags:
  - Servlet
date: 2021-03-08 20:03:24
updated:

---











# 一、Servlet介绍



1. Servlet 是 JavaEE 规范之一。规范就是接口！
2. Servlet 就 JavaWeb 三大组件之一。三大组件分别是：Servlet 程序、Filter 过滤器、Listener 监听器。
3. Servlet 是运行在服务器上的一个 java 小程序，**它可以接收客户端发送过来的请求，并响应数据给客户端。**







# 二、Servlet程序创建





## 1、通过实现Servlet接口创建Servlet程序





#### 1.1、创建步骤



> [创建Web工程方式，点击这里！](https://www.itnxd.cn/posts/61877.html#2-1%E3%80%81%E5%88%9B%E5%BB%BA%E6%99%AE%E9%80%9AWeb%E5%B7%A5%E7%A8%8B)



1. 编写一个类去实现 `Servlet` 接口
2. 实现 `service` 方法，处理请求，并响应数据
3. 到 `web.xml` 中去配置 `servlet` 程序的访问地址



#### 1.2、Servlet创建



> **注意**：需要导入servlet的jar包，直接去Tomcat安装目录下的lib目录找到`servlet-api.jar`复制到当前lib目录并`Add as Library`即可！
>
> **包名略有不同：**
>
> - 旧版本包名为为`javax.servlet.xxx`
> - 新版本包名为`jakarta.servlet.xxx`





```java
public class HelloServlet implements Servlet {

    public HelloServlet(){
        System.out.println("1. 构造器方法");
    }

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("2. 初始化方法");
    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    /**
     *service方法专门用来处理请求和响应！
     *
     * @param servletRequest
     * @param servletResponse
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("3. service方法 ---- HelloServlet被执行了！");
    }

    /**
     * 处理Get请求！
     */
    public void doGet(){
        System.out.println("Get请求");
    }

    /**
     * 处理Post请求！
     */
    public void doPost(){
        System.out.println("Post请求");
    }


    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {
        System.out.println("4. destroy销毁方法");
    }
}
```





#### 1.3、配置XML



> `servlet`和`servlet-mapping`标签共同配置一个Servlet程序，一个程序一组配置！
>
> **注意：Servlet程序的访问地址区分大小写！**



1. 创建`servlet`标签：表示配置一个Servlet程序
   1. 创建`servlet-name`标签：给Servlet程序起别名（一般为类名）
   2. 创建`servlet-class`标签：Servlet程序的全类名
2. 创建`servlet-mapping`标签：为Servlet程序配置访问地址
   1. 创建`servlet-name`标签：指明访问地址的配置对象（一般为类名）
   2. 创建`url-pattern`标签：访问地址，以`/`开始



**注意**：`/`表示 `http://ip:port/工程名`，全地址为`http://ip:端口/工程名 + url-pattern信息`





```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <!-- 一、servlet标签给Tomcat配置Servlet程序 -->
    <servlet>
        <!--servlet-name标签 Servlet程序起一个别名（一般是类名） -->
        <servlet-name>HelloServlet</servlet-name>
        <!--servlet-class是Servlet程序的全类名-->
        <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>
    </servlet>

    <!--二、servlet-mapping标签给servlet程序配置访问地址-->
    <servlet-mapping>
        <!--servlet-name标签的作用是告诉服务器，当前配置的地址给哪个Servlet程序使用-->
        <servlet-name>HelloServlet</servlet-name>
        <!--
            url-pattern标签配置访问地址
            访问地址为：http://localhost:8081/工程名/hello
        -->
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>

</web-app>
```





#### 1.4、运行Servlet程序



> 点击运行即可！



**注意点：** 配置文件，web文件，java源文件更改需要重新部署`Redeploy`，除了java文件外似乎可以直接使用选项`Update classes and resouces`，但是似乎好多时候部署的项目都不会自动更新，建议直接使用`Redeploy`进行重新部署，可解决一切bug问题，当然重启服务器也可解决，但重启耗时属实费事耗时！





#### 1.5、Servlet的生命周期





1. 构造器和初始化：第一次创建`Servlet`时调用
2. `service`方法：每次请求都会调用
3. `destroy`方法：web工程停止时调用





#### 1.6、URL地址访问Servlet过程





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/08/dc61049254c888868b487c6e1dfdf732.png)









#### 1.7、GET和POST请求分发处理



> 将`ServletRequest`对象向下转型为`HttpServletRequest`来调用`getMethod()`方法获取`method`类型！



```java
/**
 *service方法专门用来处理请求和响应！
 *
 * @param servletRequest
 * @param servletResponse
 * @throws ServletException
 * @throws IOException
 */
@Override
public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
    System.out.println("3. service方法 ---- HelloServlet被执行了！");

    // 1. 向下转型调用getMethod()方法！
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    String method = request.getMethod();
    if("GET".equals(method)){
        doGet();
    }else{
        doPost();
    }
}

/**
 * 处理Get请求！
 */
public void doGet(){
    System.out.println("Get请求");
}

/**
 * 处理Post请求！
 */
public void doPost(){
    System.out.println("Post请求");
}
```







## 2、通过继承HttpServlet创建Servlet程序（推荐）





#### 2.1、创建步骤



> 一般在实际项目开发中，都是使用继承 `HttpServlet` 类的方式去实现 Servlet 程序。







1. 编写一个类去继承 `HttpServlet` 类
2. 根据业务需要重写 `doGet` 或 `doPost` 方法
3. 到 `web.xml` 中的配置 `Servlet` 程序的访问地址









#### 2.2、Servlet创建





```java
public class HelloServlet2 extends HttpServlet {
    /**
     * HelloServlet2的doGet方法！
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("HelloServlet2的doGet方法调用！");
    }

    /**
     * HelloServlet2的doPost方法！
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("HelloServlet2的doPost方法调用！");
    }
}
```





#### 2.3、配置XML



**略：同上一种方式！**





## 3、使用IDEA创建Servlet程序





> **注意：新版本IDEA并无此选项可直接创建Servlet程序！**



#### 3.1、使IDEA支持直接创建Servlet的方法



1. 找到当前web工程下的`imi`配置文件，例如：`07_Servlet.iml`
2. 找到如下位置添加如下信息即可！
3. 无需重启即可生效，若无法生效，可重启尝试



```imi
<?xml version="1.0" encoding="UTF-8"?>
<module type="JAVA_MODULE" version="4">
  <component name="FacetManager">
    <facet type="web" name="Web">
      <configuration>
        <descriptors>
          <deploymentDescriptor name="web.xml" url="file://$MODULE_DIR$/web/WEB-INF/web.xml" />
        </descriptors>
        <webroots>
          <root url="file://$MODULE_DIR$/web" relative="/" />
        </webroots>
        
        在这里添加如下内容：
        ------------------------------------------------------
        <sourceRoots>
          <root url="file://$MODULE_DIR$/src" />
        </sourceRoots>
        -----------------------------------------------------
        
      </configuration>
    </facet>
  </component>
  <component name="NewModuleRootManager" inherit-compiler-output="true">
    <exclude-output />
    <content url="file://$MODULE_DIR$">
      <sourceFolder url="file://$MODULE_DIR$/src" isTestSource="false" />
    </content>
    <orderEntry type="jdk" jdkName="14" jdkType="JavaSDK" />
    <orderEntry type="sourceFolder" forTests="false" />
    <orderEntry type="module-library">
      <library>
        <CLASSES>
          <root url="jar://$MODULE_DIR$/web/WEB-INF/lib/servlet-api.jar!/" />
        </CLASSES>
        <JAVADOC />
        <SOURCES>
          <root url="jar://$MODULE_DIR$/../../../学习笔记/4、JavaWeb/apache-tomcat-10.0.2-src.zip!/apache-tomcat-10.0.2-src/java" />
        </SOURCES>
      </library>
    </orderEntry>
  </component>
</module>
```





**配置生效后，会在右键菜单出现创建选项，如下：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/08/f56a6c227cb52a1d38eed157cfbfc23d.png)



#### 3.2、Servlet创建



> 通过IDEA创建Servlet特点：
>
> 1. 自动生成两个重写方法`doGet()、doPost()`方法
> 2. 自动生成一半XML配置文件`servelt`标签，`servlet-mapping`标签仍需手动配置



**注意：** 当前先以XML配置，后续再讲注解配置！先不要勾选如下配置！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/08/e76879bd855202d23767b0b6e9598d54.png)





**生成代码如下：**



```java
public class HelloServlet3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("HelloServlet3的doGet方法调用！");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("HelloServlet3的doPost方法调用！");
    }
}
```









# 三、Servlet类继承体系



**类继承体系如下：**

- GenericServlet实现了三大接口：`Servlet、ServletConfig、java.io.Serializable`

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/08/52b063fa55ca37c504939958f226d6dd.png)







# 四、ServletConfig类介绍



## 1、概述



> 简单理解，局部变量，局部配置信息！



1. ServletConfig 类从类名上来看，就知道是 Servlet 程序的**配置信息类**。
2. Servlet 程序和 ServletConfig 对象都是由 Tomcat 负责创建，我们负责使用。
3. Servlet 程序默认是第一次访问的时候创建，ServletConfig 是**每个 Servlet 程序创建时，就创建一个对应的 ServletConfig 对象**。





## 2、作用



1. 可以获取 Servlet 程序的**别名** `servlet-name` 的值
2. 获取**初始化参数** `init-param`
3. 获取 `ServletContext` 对象







## 3、配置XML



> 配置位置：`servlet`标签内部，局部配置，正常！
>
> 初始化参数：是一组组键值对！可以多组！



```xml
<!-- 一、servlet标签给Tomcat配置Servlet程序 -->
<servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>


    
    <!----------------------------------------------------------------------------------------->
    <!--二、配置init-param初始化参数！-->
    <init-param>
        <!--参数名-->
        <param-name>password</param-name>
        <!--参数值-->
        <param-value>xxx</param-value>
    </init-param>
    <init-param>
        <param-name>username</param-name>
        <param-value>root</param-value>
    </init-param>
    <init-param>
        <param-name>url</param-name>
        <param-value>jdbc:mysql://localhost:3306/test</param-value>
    </init-param>
    <!----------------------------------------------------------------------------------------->


</servlet>
```





## 4、通过Java程序获取配置



> 当前ServletConfig对象只能获取当前Servlet程序的配置信息，无法获取其他人的信息！（局部配置只给自己用！）





**关于获取servletConfig对象：**



- 可以通过`getServletConfig()`方法获取`servletConfig`对象！
  - 在`implements Servlet`的类中，需要重写`public ServletConfig getServletConfig() {}`方法才可获取！
  - 在`extends HttpServlet`的类中，父类的父类`GenericServlet`有该类实现返回当前`ServletConfig`对象!
    - **注意：**该方法需要在重写的`init`方法中显示调用父类的`super.init(config)`方法为`ServletConfig`对象赋值！否则将发生空指针异常！



```java
// implements Servlet的init方法：

@Override
public void init(ServletConfig servletConfig) throws ServletException {
    System.out.println("2. 初始化方法");

    // 1、可以获取 Servlet 程序的别名 servlet-name 的值
    System.out.println("HelloServlet程序的别名是：" + servletConfig.getServletName());

    // 2、获取初始化参数 init-param（写在<servlet><servlet/>之中）
    System.out.println("初始化参数username的值是" + servletConfig.getInitParameter("username"));
    System.out.println("初始化参数password的值是" + servletConfig.getInitParameter("password"));
    System.out.println("初始化参数url的值是" + servletConfig.getInitParameter("url"));

    // 3、获取 ServletContext 对象
    System.out.println("servletConfig对象为：" + servletConfig.getServletContext());


    // 可以通过getServletConfig()方法获取servletConfig对象！
    // 在implements Servlet的类中，需要重写public ServletConfig getServletConfig() {}方法才可获取！
    // 在extends HttpServlet的类中，父类的父类GenericServlet有该类实现返回当前ServletConfig对象!
    ServletConfig servletConfig1 = getServletConfig();
    System.out.println(servletConfig1); // null

}

// extends HttpServlet的init方法：

/**
 * 对init方法的重写：
 * 注意：一定要显示调用super.init()方法，将当前config对象赋值给父类实现覆盖！
 *      否则会发生空指针异常！
 * @param config
 * @throws ServletException
 */
@Override
public void init(ServletConfig config) throws ServletException {
    // 调用父类init方法！
    super.init(config);
    System.out.println("重写init初始化方法做了一些操作！");
    // 可以调用该方法获取当前servletConfig对象！该方法有GenericServlet父类实现！
    System.out.println(getServletConfig());
}
```











# 五、ServletContext类介绍



## 1、概述





> 简单理解：就是针对整个web工程的全局配置，任何`Servlet`程序都可以访问！





1. `ServletContext` 是一个接口，它表示 `Servlet` 上下文对象
2. 一个 web 工程，**只有一个** `ServletContext` 对象实例。
3. `ServletContext` 对象是一个**域对象**。
4. `ServletContext` 是在 web 工程部署**启动的时候创建**。在 web **工程停止的时候销毁**。



**什么是域对象?**



域对象，是可以像 Map 一样存取数据的对象，叫域对象。这里的域指的是存取数据的操作范围，整个 web 工程。



**三个操作全局配置的方法：**



- `setAttribute() `
- `getAttribute()`
- `removeAttribute()`





## 2、作用







1. 获取 web.xml 中配置的**上下文参数** `context-param`
2. 获取当前的**工程路径**，格式: /工程路径
3. 获取工程部署后在服务器硬盘上的**绝对路径**
4. 像 Map 一样**存取数据**







## 3、配置XML





> 配置位置：一般放到XML的最前面，表示是针对整个web工程的全局配置！
>
> 是一组组键值对，可以由多组！







```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

	<!------------------------------------------------------------------------>
    <!--context-param配置，是上下文参数，属于整个web工程！-->
    <context-param>
        <param-name>username</param-name>
        <param-value>itnxd</param-value>
    </context-param>
    <context-param>
        <param-name>password</param-name>
        <param-value>password123</param-value>
    </context-param>
    <!------------------------------------------------------------------------>

    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>

</web-app>
```







## 4、通过Java程序处理配置





**关于获取工程部署后在服务器硬盘上的绝对路径：**



1. `/`会被服务器解析为`http://ip:port/工程名/`，然后被映射到IDEA工程下的web目录
   1. 斜杠后面可以添加路径及文件名，该路径以web目录为根目录
2. 启动部署后输出的第一行内容：`Using CATALINA_BASE:   "C:\Users\15890\AppData\Local\JetBrains\IntelliJIdea2020.3\tomcat\a65c5dac-b285-42bc-bb15-73d8c6c7bf83"`
3. 该路径为Tomcat服务器在C盘的一个针对IDEA的web项目的配置目录
4. 该路径`C:\Users\15890\AppData\Local\JetBrains\IntelliJIdea2020.3\tomcat\a65c5dac-b285-42bc-bb15-73d8c6c7bf83\conf\Catalina\localhost`下有一个`07_Servlet.xml`配置文件
5. 内容为`<Context path="/07_Servlet" docBase="E:\Java学习\IdeaProject\JavaWeb\out\artifacts\07_Servlet_war_exploded" />`
6. 该路径就是对IDEA的web工程下web目录的一个映射
7. 其实就是之前讲到的一种部署方式：[通过Tomcat配置信息进行web项目映射！点击这里！](https://www.itnxd.cn/posts/61877.html#6%E3%80%81%E9%83%A8%E7%BD%B2%E9%A1%B9%E7%9B%AE%E5%88%B0Tomcat%E4%B8%AD)



```java
public class ContextServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1. 获取ServletContext对象
        ServletContext servletContext = getServletConfig().getServletContext();

        // 2.  获取上下文参数
        String username = servletContext.getInitParameter("username");
        String password = servletContext.getInitParameter("password");
        System.out.println("context-param参数username值：" + username);
        System.out.println("context-param参数password值：" + password);

        // 3. 获取工程路径
        System.out.println("当前工程路径是：" + servletContext.getContextPath()); // /07_Servlet

        // 4. 获取工程部署后在服务器硬盘上的绝对路径
        System.out.println("工程部署的路径是：" + servletContext.getRealPath("/")); // E:\Java学习\IdeaProject\JavaWeb\out\artifacts\07_Servlet_war_exploded\

        System.out.println("工程下CSS的绝对路径是：" + servletContext.getRealPath("/css"));

        System.out.println("工程下CSS下1.css的路径是：" + servletContext.getRealPath("/css/1.css"));

        // 5. 像 Map一样存取数据 ContextServlet2.java中查看！

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```





**关于像Map一样存取数据：**





> **配置作用时间**：在 web 工程部署**启动**的时候**创建**。在 web 工程**停止**的时候**销毁**，所有由程序创建的属性会在**重新部署或重启服务器**后**自动被销毁**
>
> **作用域**：针对整个web工程：所以其他Servlet程序也可以访问到这些属性，并且该`servletContext`对象地址唯一确定！



```java
public class ContextServlet2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 父类GenericServlet也实现了该方法，return getServletConfig().getServletContext();
        ServletContext servletContext = getServletContext();

        // 5. 像 Map一样存取数据

        // 设置
        servletContext.setAttribute("key1", "value1");
        servletContext.setAttribute("key2", "value2");

        // 获取
        Object value1 = servletContext.getAttribute("key1");
        Object value2 = servletContext.getAttribute("key2");
        System.out.println("获取context-param中的域数据（全局数据）key1的值为：" + value1);
        System.out.println("获取context-param中的域数据（全局数据）key2的值为：" + value2);

        // 移除
        servletContext.removeAttribute("key2");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```













# 六、HTTP 协议介绍





## 1、概述







**什么是协议?**

协议是指双方，或多方，相互约定好，大家都需要遵守的**规则**，叫协议。

**HTTP 协议?**

就是指，客户端和服务器之间通信时，发送的数据，需要遵守的规则，叫 HTTP 协议。

HTTP 协议中的数据又叫**报文**。



**多种请求方法：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/86708542870c12bdb3f79cb36549ebcf.png)





## 2、请求HTTP协议格式



> - 客户端给服务器发送数据叫请求。
> - 服务器给客户端回传数据叫响应。
> - 请求主要分为 GET 请求，和 POST 请求两种







#### 2.1、GET请求





**GET请求组成：**



1. 请求行
   1. 请求的方式 `GET`
   2. 请求的资源路径
   3. 请求的协议的版本号 `HTTP/1.1`
2. 请求头
   1. `key : value` 组成不同的**键值对**，表示不同的含义。



**如下图：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/39b56c6af0c8be22abce73cb6a99cde6.png)















**使用GET请求的情景：**



1. `form` 标签 `method=get`
2. `a` 标签
3. `link` 标签引入 css
4. `Script` 标签引入 js 文件
5. `img` 标签引入图片
6. `iframe` 引入 html 页面
7. 在**浏览器地址**栏中输入地址后敲回车





#### 2.2、POST请求





**POST请求组成：**



1. 请求行:
   1. 请求的方式 `POST`
   2. 请求的资源路径`[+?+请求参数]`
   3. 请求的协议的版本号 `HTTP/1.1`
2. 请求头：
   1. `key : value` 不同的请求头，有不同的含义
   2. 空行
3. 请求体：就是发送给服务器的数据



**如下图：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/b31ac0e653e1cc9cf15c77a5fb50e7a7.png)









**使用POST请求的情景：**



- `form` 标签 `method=post`







#### 2.3、常用请求头



1. Accept: 表示客户端可以接收的数据类型
2. Accpet-Languege: 表示客户端可以接收的语言类型
3. User-Agent: 表示客户端浏览器的信息
4. Host： 表示请求时的服务器 ip 和端口号





#### 2.4、全部请求头一览表



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/4e5806ca994d381e1692f6c73b9b29d2.png)











## 3、响应HTTP协议格式





#### 3.1、响应HTTP协议组成



1. 响应行
   1. 响应的协议和版本号
   2. 响应状态码
   3. 响应状态描述符
2. 响应头
   1. key : value 不同的响应头，有其不同含义
   2. 空行
3. 响应体：就是回传给客户端的数据



**如下图：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/62a8e8622a89a0b27c6f2ad437953bf5.png)







#### 3.2、常见响应码



1. 200 表示请求成功
2. 302 表示请求重定向
3. 404 表示请求服务器已经收到了，但是你要的数据不存在（请求地址错误）
4. 500 表示服务器已经收到请求，但是服务器内部错误（代码错误）





#### 3.3、全部响应头一览表



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/2cf403091b8cfbf30dfe56af58510110.png)





## 4、MIME格式







> MIME 是 HTTP 协议中数据类型。
>
> MIME 的英文全称是`"Multipurpose Internet Mail Extensions" `多功能 Internet 邮件扩充服务。MIME 类型的格式是“大类型/小类型”，并与某一种文件的扩展名相对应。
>
> 所谓MIME格式：就是请求头和响应头中`content-type`的值，表示数据类型！







**常见MIME类型：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/0daee5aae527b7a6381401b6f552cfea.png)

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/d1d9f178cd9120da55de7e355b6ff50d.png)





# 七、HttpServletRequest类介绍





## 1、概述





> 每次只要有请求进入 Tomcat 服务器，Tomcat 服务器就会把请求过来的 HTTP 协议信息解析好封装到 Request 对象中。然后传递到 service 方法（doGet 和 doPost）中给我们使用。我们可以通过 HttpServletRequest 对象，获取到所有请求的信息。 











## 2、常用方法







#### 2.1、一般方法





1. `getRequestURI()` 获取请求的资源路径
2. `getRequestURL()` 获取请求的统一资源定位符（绝对路径）
3. `getRemoteHost()` 获取客户端的 ip 地址
   1. 在 IDEA 中，使用 localhost 访问时，得到的客户端 ip 地址是 127.0.0.1，新版本中为：0:0:0:0:0:0:0:1
   2. 在 IDEA 中，使用 127.0.0.1 访问时，得到的客户端 ip 地址是 127.0.0.1
   3. 在 IDEA 中，使用 真实 ip 访问时，得到的客户端 ip 地址是真实的客户端 ip 地址
4. `getHeader()` 获取请求头
5. `getMethod()` 获取请求的方式 GET 或 POST



```java
public class RequestAPIServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        System.out.println(req.getRequestURI());
        System.out.println(req.getRequestURL());
        System.out.println(req.getRemoteHost());
        System.out.println(req.getHeader("User-Agent"));
        System.out.println(req.getMethod());

    }
}
```





#### 2.2、请求参数获取



1. `getParameter()` 获取请求的参数
2. `getParameterValues()` 获取请求的参数（多个值的时候使用）
3. `setAttribute(key, value)` 设置域数据
4. `getAttribute(key) `获取域数据
5. `getRequestDispatcher()` 获取请求转发对象





**操作步骤：**

- 发送请求：访问`http://localhost:8080/08_Servlet/form.html`勾选选项后点击提交按钮
- 接收并查看请求：IDEA控制台查看信息



```html
<!--form.html文件：-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<form action="http://localhost:8080/08_Servlet/PatameterServlet" method="post">
    用户名：<input type="text" name="username"/><br/>
    密&nbsp;&nbsp;&nbsp;码：<input type="password" name="password"/><br/>
    兴&nbsp;&nbsp;&nbsp;趣：<input type="checkbox" name="hobby" value="C++">C++
    <input type="checkbox" name="hobby" value="Java">Java
    <input type="checkbox" name="hobby" value="Python">Python<br/>

    <input type="submit" value="提交"/>
</form>

</body>
</html>
```





```java
public class PatameterServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String[] hobbies = request.getParameterValues("hobby");

        System.out.println("用户名：" + username);
        System.out.println("密  码：" + password);
        System.out.println("爱  好：" + Arrays.toString(hobbies));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        System.out.println("------------doPost--------------");

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String[] hobbies = request.getParameterValues("hobby");

        System.out.println("用户名：" + username);
        System.out.println("密  码：" + password);
        System.out.println("爱  好：" + Arrays.toString(hobbies));
    }
}
```





## 3、乱码解决



#### 3.1、GET请求乱码



> 我目前没发生乱码，先进行一下记录！



```java
// 获取请求参数
String username = req.getParameter("username");
//解决：先以 iso8859-1 进行编码，再以 utf-8 进行解码
username = new String(username.getBytes("iso-8859-1"), "UTF-8");
```





#### 3.2、POST请求乱码



> 在doPost最前方设置字符集解决乱码！
>
> **注意：必须将该设置放到调用方法之前才会有效**



```java
@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    // 设置请求体的字符集为 UTF-8，从而解决 post 请求的中文乱码问题
    // 注意：必须将该设置放到调用方法之前才会有效！
    request.setCharacterEncoding("UTF-8");

    System.out.println("------------doPost--------------");

    String username = request.getParameter("username");
    String password = request.getParameter("password");
    String[] hobbies = request.getParameterValues("hobby");

    System.out.println("用户名：" + username);
    System.out.println("密  码：" + password);
    System.out.println("爱  好：" + Arrays.toString(hobbies));
}
```





## 4、请求转发





#### 4.1、概述



> 请求转发是指，服务器收到请求后，从一次资源跳转到另一个资源的操作叫请求转发。





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/ab1611a6a28185912214ea645492aabe.png)





#### 4.2、请求转发特点



1. **浏览器地址栏没有变化**

2. 他们是**一次请求**
3. 他们共享`Request`域中的数据
4. 可以转发到`WEB-INF`目录下**（直接无法访问，只有请求转发可以）**
5. 不可以访问工程以外的资源







#### 4.3、请求转发示例



**注意：**

- 请求转发路径必须要以斜杠打头！`/ `斜杠表示地址为：`http://ip:port/工程名/ `, 映射到 IDEA 代码的 web 目录

- **无法**访问Web工程以外的资源，必须以斜杠开头！
-  请求转发**可以**获取`WEB-INF`下的文件，具体见下方代码
- 使用`requestDispatcher.forward(req, resp)`方法转发到其他地址



```java
// Servlet1代码：

public class Servlet1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1. 获取请求参数，获取材料
        Object username = req.getParameter("username");
        System.out.println("在Servlet1（柜台一）中查看参数（材料）：" + username);
        // 2. 保存参数，材料盖章
        req.setAttribute("key1", "柜台一的章");
        // 3. 获取请求转发路径，问路Servlet2怎么走
        /*
        请求转发必须要以斜杠打头，/ 斜杠表示地址为：http://ip:port/工程名/ , 映射到 IDEA 代码的 web 目录
         */

        RequestDispatcher requestDispatcher = req.getRequestDispatcher("/Servlet2");

        // 请求转发可以获取WEB-INF下的文件！
        // RequestDispatcher requestDispatcher = req.getRequestDispatcher("/WEB-INF/a.html");

        // 无法访问Web工程以外的资源，必须一斜杠开头！
        // 请求的资源[/08_Servlet/https://www.baidu.com/]不可用
        // RequestDispatcher requestDispatcher = req.getRequestDispatcher("https://www.baidu.com/");

        // 4. 请求转发，走向Servlet2
        requestDispatcher.forward(req, resp);
    }
}

// Servlet2代码：

public class Servlet2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 5. 获取请求参数，获取材料
        Object username = req.getParameter("username");
        System.out.println("在Servlet1（柜台二）中查看参数（材料）：" + username);
        // 6. 查看材料是否盖章
        Object value1 = req.getAttribute("key1");
        System.out.println("柜台是否有章：" + value1);
        // 7. 处理Servlet2自己业务
        System.out.println("处理Servlet2自己业务");
        // 8. 一次请求转发完成，返回到客户端
        System.out.println("一次请求转发完成，返回到客户端");
    }
}
```





#### 4.2、base标签使用



> `base`标签可以设置当前页面中所有相对路径工作时，参照哪个路径来进行跳转！
>
> **主要用来解决请求转发导致的浏览器地址栏不发生改变，而相对路径却是参考浏览器地址进行判断导致的地址回退错误问题！**





**运行结果：**

- 不使用请求转发，由于浏览器地址动态改变，并不会产生地址回退错误
- 使用请求转发（需要在`index.html`写入a标签的地址为当前Servlet程序，即`ForwardC`），由于浏览器地址不发生改变，地址回退参考地址是转发前的地址，而不是转发后的地址导致回退错误
- 使用`base`标签（在回退的`c.html`文件写入`base`标签的地址为当前`c.html`的绝对路径），相当于针对相对路径的参考路径**写死**了！



1. **web目录下的index.html文件**



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    <p>这是web工程下的index.html文件！</p>

    <a href="a/b/c.html">跳转到a/b/c.html文件！</a>

    <br/>

    <!--  使用ForwardC类  -->
    <a href="http://localhost:8080/08_Servlet/ForwardC">使用请求转发到：a/b/c.html</a>

</body>
</html>
```







2. **web下的a下的b下的c.html文件**



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <!--
        base 标签设置页面相对路径工作时参照的地址
        href 属性就是参数的地址值

        base路径中的最后一个c.html可以省略！当然还是得保留最后一个斜杠表名为一个目录！
        http://localhost:8080/08_Servlet/a/b/

        显示指明使用跳转时候的参照路径，防止使用请求转发导致地址栏地址的不改动造成参照地址错误，请求不到目标地址！

    -->
    <base href="http://localhost:8080/08_Servlet/a/b/c.html">
    
</head>
<body>
    <p>这是web工程下的a下的b下的c.html文件</p>

    <a href="../../index.html">跳转到首页index.html！</a>
</body>
</html>
```





3. **ForwardC的Servlet程序**



```java
public class ForwardC extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("经过了ForwardC程序转发！");
        req.getRequestDispatcher("a/b/c.html").forward(req, resp);
    }
}
```







## 5、Web项目的路径与 / 含义





#### 5.1、相对路径与绝对路径



- 相对路径

  - `.` 表示当前目录
  - `..` 表示上一级目录
  - `资源名` 表示当前目录/资源名

- 绝对路径：`http://ip:port/工程路径/资源路径

  

**注意**：在实际开发中，**路径都使用绝对路径**，而不简单的使用相对路径。

- 绝对路径
- `base`标签 + 相对路径



#### 5.2、斜杠 / 含义



> 在 web 中 `/` 斜杠 是一种绝对路径。



- `/` 斜杠 如果被浏览器解析，得到的地址是：`http://ip:port/`

- `/` 斜杠 如果被服务器解析，得到的地址是：`http://ip:port/工程路径`
  - `<url-pattern>/servlet1</url-pattern>`
  - `servletContext.getRealPath(“/”)`
  - `request.getRequestDispatcher(“/”)`



**特殊情况**： `response.sendRediect(“/”)`把斜杠发送给浏览器解析。得到 `http://ip:port/`









# 八、HttpServletResponse类介绍





## 1、概述





> `HttpServletResponse` 类和 `HttpServletRequest` 类一样。每次请求进来，Tomcat 服务器都会创建一个 `Response` 对象传递给 `Servlet` 程序去使用。`HttpServletRequest` 表示请求过来的信息，`HttpServletResponse` 表示所有响应的信息，我们如果需要设置返回给客户端的信息，都可以通过 `HttpServletResponse` 对象来进行设置！
>
> **简单来说：**
>
> - `HttpServletRequest` ：负责接收客户端请求
>
> - `HttpServletResponse` ：负责响应客户端请求







## 2、两个输出流





1. `getOutputStream()`：字节流，常用于下载（传递二进制数据）
2. `getWriter()`： 字符流，常用于回传字符串（常用）



**注意：二者不可同时使用，否则报错！**





## 3、向客户端回传数据





> 使用字符流响应请求向浏览器发送数据！浏览器页面会有内容！



```java
public class ResponseIOServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 举例：向客户端回传字符串数据！
        PrintWriter writer = resp.getWriter();
        writer.write("服务器响应的内容...");
    }
}
```







## 4、响应乱码解决





- 解决方案一：先设置服务器字符集，再通过响应头设置浏览器字符集为UTF-8**（不推荐）**

- 解决方案二：使用`setContentType("text/html; charset=UTF-8")`即可，可同时设置服务器，浏览器，响应头都为UTF-8**（推荐）**





**注意：方案二一定要在获取流对象前调用才会生效！简单来说，设置字符集直接放到方法第一行即可！**



```java
public class ResponseIOServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 中文会发生乱码：
        // 服务器默认字符集为：ISO-8859-1
        System.out.println(resp.getCharacterEncoding());

        // 解决方案一：
        // 设置服务器字符集为UTF-8
        resp.setCharacterEncoding("UTF-8");
        // 通过响应头设置浏览器字符集为UTF-8，默认为GBK
        resp.setHeader("Content-Type", "text/html; charset=UTF-8");

        // 解决方案二：
        // 它会同时设置服务器和客户端都使用 UTF-8 字符集，还设置了响应头
        // 此方法一定要在获取流对象之前调用才有效
        resp.setContentType("text/html; charset=UTF-8");
    }
}
```







## 5、请求重定向



> 请求重定向：是指客户端给服务器发请求，然后服务器告诉客户端说。我给你一些地址。你去新地址访问。叫请求重定向（因为之前的地址可能已经被废弃）。



#### 5.1、请求重定向图示



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/09/e412c3428884540e03cd083bbfe7693a.png)





#### 5.2、请求重定向特点





1. 浏览器地址栏会发生**变化**

2. **两次**请求

3. **不共享**`Request`域中数据（两次请求完全无关）

4. **不能**访问`WEB-INF`下的资源（只能使用请求转发访问）

5. **可以访问工程外的资源**





#### 5.3、重定向方案一（不推荐）





```java
public class Response1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1. 设置状态码为302
		resp.setStatus(302);
        // 2. 设置响应头，说明新地址
		resp.setHeader("Location", "http://localhost:8080/08_Servlet/Response2");
    }
}
```







#### 5.4、重定向方案二（推荐）





```java
public class Response1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 方案二：（推荐）
        resp.sendRedirect("http://localhost:8080/08_Servlet/Response2");
        // 也可以
		resp.sendRedirect("https://www.baidu.com");
    }
}
```



