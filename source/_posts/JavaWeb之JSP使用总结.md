---
title: JavaWeb之JSP使用总结
author: ITNXD
toc: true
abbrlink: 31659
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/11/af59e853e69829cdb079b25f72f9e8d5.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/11/af59e853e69829cdb079b25f72f9e8d5.png
categories:
  - JavaWeb
tags:
  - JSP
  - Listener
date: 2021-03-11 12:03:57
updated:
---







# 一、JSP概述





> JSP 的全称是 `java server pages`。Java 的服务器页面。JSP 的**主要作用是代替 Servlet 程序回传 html 页面的数据。**
>
> 因为 Servlet 程序回传 html 页面数据是一件**非常繁锁**的事情。开发成本和维护成本都极高。





## 1、举例证明繁琐





**这是使用Servlet程序使用字符流写到HTML页面的内容：**



```java
public class PrintHtml extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        resp.setContentType("text/html; charset=utf-8");

        PrintWriter writer = resp.getWriter();

        writer.write("<!DOCTYPE html>\r\n");
        writer.write("<html lang=\"en\">\r\n");
        writer.write("<head>\r\n");
        writer.write("  <meta charset=\"UTF-8\">\r\n");
        writer.write("  <title>Title</title>\r\n");
        writer.write("</head>\r\n");
        writer.write("  这是Servlet程序写的HTML页面内容！\r\n");
        writer.write("</body>\r\n");
        writer.write("</html>\r\n");
    }
}
```





**这是使用JSP程序使用字符流写到HTML页面的内容：**





```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    这是 html 页面数据
</body>
</html>
```







## 2、如何访问



- 同`Servlet`和`Html`程序访问一样，都是映射到了web目录！例如：`http://loscalhost:8080/工程名/xxx.jsp`



## 3、JSP本质







> **JSP 页面本质上是一个 `Servlet` 程序。**
> 当我们第一次访问 JSP 页面的时候。Tomcat 服务器会帮我们把 JSP 页面翻译成为一个 java 源文件。并且对它进行编译成为`.class` 字节码程序。



**被翻译为servlet程序的代码存放位置：**



​    `C:\Users\15890\AppData\Local\JetBrains\IntelliJIdea2020.3\tomcat\af55c368-5e26-45a9-8ee3-43963b4a4710\work\Catalina\localhost\10_Jsp\org\apache\jsp`



可以在IDEA启动服务的时候的日志中看到！



**打开翻译的Java源文件可以看到他继承自HttpServlet类：**



- 首先继承`org.apache.jasper.runtime.HttpJspBase`
- 其次`HttpJspBase`继承`Httpservlet`
- 在翻译的源代码中`public void _jspService(......)`会看到他也是将整个内容用字符流的`write`方法写入到页面！





# 二、三种语法





## 1、JSP头部的page指令







> jsp 的 page 指令可以修改 jsp 页面中一些重要的属性，或者行为。





```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java"
         errorPage="/error.jsp"
%>
```





1. `language` 属性： 表示 jsp 翻译后是什么语言文件。暂时只支持 java。
2. `contentType` 属性： 表示 jsp 返回的数据类型是什么。也是源码中 `response.setContentType()`参数值
3. `pageEncoding` 属性： 表示当前 jsp 页面文件本身的字符集。
4. `import` 属性： 跟 java 源代码中一样。用于导包，导类。
5. `autoFlush` 属性： 设置当 out 输出流缓冲区满了之后，是否自动刷新冲级区。默认值是 true。
6. `buffer` 属性： 设置 out 缓冲区的大小。默认是 8kb
7. `errorPage` 属性： 设置当 jsp 页面运行时出错，自动跳转去的错误页面路径。（斜杠打头，映射到web目录）
8. `isErrorPage` 属性： 设置当前 jsp 页面是否是错误信息页面。默认是 false。如果是 true 可以获取异常信息。
9. `session` 属性： 设置访问当前 jsp 页面，是否会创建 `HttpSession` 对象。默认是 true。
10. `extends` 属性： 设置 jsp 翻译出来的 java 类默认继承谁。









## 2、JSP中的常用脚本





#### 2.1、声明脚本（极少用）



> 格式：`<%! 声明 java 代码 %>`
>
> 该内容会被直接翻译（原封不动）到源代码！



1. 声明类属性
2. 声明 static 静态代码块
3. 声明类方法
4. 声明内部类



```jsp
<%!

    private Integer id;
    private String name;
    private static Map<String, Integer> map;
%>

<%!
    static {
        map = new HashMap<String, Integer>();
        map.put("aa", 1);
    }
%>

<%!
    public void show(){
        System.out.println("hhh");
    }
%>

<%!
    public static class A{
        private int id;
    }
%>
```



#### 2.2、表达式脚本（常用）





> 格式：`<%=表达式%>`
>
> 表达式脚本的作用是：在 jsp 页面上输出数据。



**表达式脚本的特点：**

1. 所有的表达式脚本都会被翻译到`_jspService()` 方法中_
2. 表达式脚本都会被翻译成为 `out.print()`输出到页面上
3. 由于表达式脚本翻译的内容都在`_jspService() `方法中,所以`_jspService()`方法中的对象都可以直接使用。
4. 表达式脚本中的表达式**不能以分号结束**。





```jsp
<%=12%> <br>
<%=12.3%> <br>
<%="我是字符串"%> <br>
<%=map%> <br>
<%=request.getParameter("username")%> <br>
```



#### 2.3、代码脚本



> 格式：`<%  java语句  %>`        
>
> 代码脚本的作用：可以在 jsp 页面中，编写我们自己需要的功能（写的是 java 语句）。



**代码脚本的特点**：

1. 代码脚本翻译之后都在`_jspService()` 方法中
2. 代码脚本由于翻译到`_jspService()`方法中，所以**在`_jspService()`方法中的现有对象都可以直接使用。**
3. 还可以由**多个代码脚本块**组合完成一个完整的 java 语句。
4. 代码脚本还可以和表达式脚本一起组合使用，在 jsp 页面上输出数据





```jsp
	<%
        if(true) System.out.println("哈哈哈");
    %>
    <%
        for (int i = 0; i < 10; i++) {
            System.out.println(i);
        }
    %>
    <%
        System.out.println(request.getParameter("username"));
    %>

	<%-- 拆分也可以，全部都是直接移动到源文件中！ --%>
    <%
        for (int i = 0; i < 10; i++) {

    %>
        <%=i%> <br>
    <%
            System.out.println("hhh");
        }
    %>


    <table border="1px" cellspacing="0">
        <%
            for (int i = 0; i < 10; i++) {
        %>
        <tr>
            <td>
                第<%=i%>行
            </td>
        </tr>
        <%
            }
        %>
    </table>


    <%
        if(true){
    %>
    <h1>你好帅！</h1>
    <%
        }
    %>
```









## 3、JSP中的三种注释





1. Html注释：Html 注释会被翻译到 java 源代码中。在`_jspService` 方法里，以 `out.writer` 输出到客户端。浏览器自动识别为注释，不会输出！
2. Java注释：java 注释会被翻译到 java 源代码中。
3. JSP注释：jsp 注释可以注掉 jsp 页面中所有代码。



```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

    <!--这是html注释，网页右键查看源代码会看到！-->

    <%
        // java单行注释
        /*java多行注释*/
    %>

    <%--  JSP注释，可注释一切jsp页面代码  --%>

</body>
</html>
```









# 三、九大内置对象





**jsp 中的内置对象，是指 Tomcat 在翻译 jsp 页面成为 Servlet 源代码后，内部提供的九大对象，叫内置对象！**





1. request：请求对象
2. response：响应对象
3. pageContext：JSP的上下文对象
4. session：会话对象
5. application：ServletContext对象
6. config：ServletConfig对象
7. out：JSP输出流对象
8. page：指向当前JSP的对象
9. exception：异常对象













# 四、四大域对象









## 1、四大域对象



1. pageContext (PageContextImpl 类)：当前 jsp 页面范围内有效
2. request (HttpServletRequest 类)：一次请求内有效
3. session (HttpSession 类)：一个会话范围内有效（打开浏览器访问服务器，直到关闭浏览器）
4. application (ServletContext 类)：整个 web 工程范围内都有效（只要 web 工程不停止，数据都在）



**注意：从上到下作用域依次增大！**



## 2、作用域



> 域对象是可以像 Map 一样存取数据的对象。四个域对象功能一样。不同的是它们对数据的存取范围。
>
> 虽然四个域对象都可以存取数据。在使用上它们是有优先顺序的。
>
> **四个域在使用的时候，优先顺序分别是，他们从小到大的范围的顺序。**



`pageContext ====>>> request ====>>> session ====>>> application`





**两个文件是为了使用请求转发模拟一次请求！**



**scope.jsp：**



```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java"
         errorPage="error.jsp"
%>
<html>
<head>
    <title>jsp 四大域对象作用范围</title>
</head>
<body>

    <h1>scope.jsp 页面</h1>

    <%
        // 往四个域中都分别保存了数据
        pageContext.setAttribute("key", "pageContext");
        request.setAttribute("key", "request");
        session.setAttribute("key", "session");
        application.setAttribute("key", "application");
    %>
    pageContext 域是否有值：<%=pageContext.getAttribute("key")%> <br>
    request 域是否有值：<%=request.getAttribute("key")%> <br>
    session 域是否有值：<%=session.getAttribute("key")%> <br>
    application 域是否有值：<%=application.getAttribute("key")%> <br>
    
    <%
        request.getRequestDispatcher("/scope2.jsp").forward(request,response);
    %>

</body>
</html>
```



**scope2.jsp：**



```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<h1>scope2.jsp 页面</h1>

    pageContext 域是否有值：<%=pageContext.getAttribute("key")%> <br>
    request 域是否有值：<%=request.getAttribute("key")%> <br>
    session 域是否有值：<%=session.getAttribute("key")%> <br>
    application 域是否有值：<%=application.getAttribute("key")%> <br>

</body>
</html>
```







## 3、解决Tomcat10.x版本问题





一个大bug，新版本Tomcat10.x安装目录下的lib包，没有pageContext类，导入包后无法使用！

需要导入旧版本的包！

旧版本包在tomcat10无法运行servlet，新版本包没有pageContext类！

新旧版本一起导入！。。。。最终解决问题！



> 猜想应该是版本不一样导致的，后面使用`Maven`来解决该问题！
>
> - Servlet程序使用新包`jakarta`
> - 四大域对象就看他从哪里能找到包了，找到谁用谁...







![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/11/1d8f5b4ca78227b340b0fcca4551dda3.png)













# 五、out与response.getWriter输出区别







## 1、out.write与out.print



1. out.write()：输出字符串没有问题
2. out.print()：输出任意数据都没有问题**（都转换成为字符串后调用的 write 输出）**





```jsp
<%
    out.write("1<br>"); // 1
    out.write(1); // 1对应的ASCII码字符
    out.write("<br>");
    out.print(12); // 12
    out.print("12"); // 12

	response.getWriter().write(12345); // 12345
%>
```





## 2、相同点



- response 中表示响应，我们经常用于设置返回给客户端的内容（输出）
- out 也是给客户端做输出使用的。



## 3、不同点



- 先执行`out.flush`刷新缓冲区追加到response缓冲区尾
- 再执行`response`刷新缓存区，将全部数据写入客户端



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/11/1858a33aea7e9c374d5c0a28b2d2408e.png)







## 4、使用建议



> 由于 jsp 翻译之后，底层源代码都是使用 out 来进行输出，所以一般情况下。我们在 jsp 页面中**统一使用 out 来进行输出**。避免打乱页面输出内容的顺序。
>
> 在 jsp 页面中，可以统一使用 **out.print()**来进行输出.







# 六、常用标签



## 1、静态包含





**格式：**`<%@ include file=""%>`



1. file 属性指定你要包含的 jsp 页面的路径        
2. 地址中第一个斜杠 `/` 表示为 `http://ip:port/工程路径/` 映射到代码的 web 目录



 **静态包含的特点：**

1. 静态包含**不会翻译**被包含的 jsp 页面。
2. 静态包含其实是把被包含的 jsp 页面的代码**拷贝到包含的位置执行输出。**



**用途：** 可重复利用的内容，例如：网站导航，菜单，轮播广告，页脚等等！





```jsp
<body>
    头部内容<br>
    主题内容<br>
    <%@ include file="/include/footer.jsp"%>
</body>
```



**footer.jsp：**



```jsp
<body>

    页脚信息

</body>
```





## 2、动态包含





**格式：** `<jsp:include page=""></jsp:include>`



1. page 属性是指定你要包含的 jsp 页面的路径
2. 动态包含也可以像静态包含一样。把被包含的内容执行输出到包含位置



**动态包含的特点：**

1. 动态包含会把包含的 jsp 页面也翻译成为 java 代码
2. 动态包含底层代码使用如下代码去调用被包含的 jsp 页面执行输出。`JspRuntimeLibrary.include(request, response, "/include/footer.jsp", out, false);`
3. 动态包含，还可以传递参数



**动态包含底层原理：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/11/95a3f34c429d2ef9f0dd6dbf6b4b3d20.png)





**动态包含举例：**



```jsp
<body>
    
    头部内容<br>
    主题内容<br>

    <jsp:include page="/include/footer.jsp">
        <jsp:param name="username" value="itnxd"/>
        <jsp:param name="password" value="6666"/>
    </jsp:include>
</body>
```



**footer.jsp：**



```jsp
<body>

    页脚信息
    <%--动态包含获取属性参数信息！--%>
    用户名为：<%=request.getParameter("username")%> <br>
    密码为：<%=request.getParameter("password")%>

</body>
```









## 3、标签转发



> 使用JSP标签实现的请求转发功能！







**格式**：`<jsp:forward page=""></jsp:forward>`



- page 属性设置请求转发的路径





**使用：**



```jsp
<jsp:forward page="/scope2.jsp"></jsp:forward>
```





**与以下方法作用一致：**



```jsp
<%
	request.getRequestDispatcher("/scope2.jsp").forward(request,response);
%>
```













# 七、Listener监听器





## 1、概述



1. Listener 监听器它是 JavaWeb 的三大组件之一。JavaWeb 的三大组件分别是：Servlet 程序、Filter 过滤器、Listener 监听器。
2. Listener 它是 JavaEE 的规范，就是接口
3. 监听器的作用是，监听某种事物的变化。然后通过回调函数，反馈给客户（程序）去做一些相应的处理。



## 2、ServletContextListener 监听器





1. `ServletContextListener` 它可以监听 `ServletContext` 对象的创建和销毁。
2. `ServletContext` 对象在 web 工程**启动**的时候**创建**，在 web 工程**停止**的时候**销毁**。
3. 监听到创建和销毁之后都会分别调用 `ServletContextListener` 监听器的方法反馈。





**使用步骤：**

1. 编写一个类去实现 `ServletContextListener`
2. 实现其两个回调方法
3. 到 `web.xml` 中去配置监听器





```java
public class MyServletContextListener implements ServletContextListener {
    /**
     * 在 ServletContext 对象创建之后马上调用，做初始化
     * @param sce
     */
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("ServletContextListener创建了！");
    }

    /**
     * 在 ServletContext 对象销毁之后调用
     * @param sce
     */
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("ServletContextListener被销毁了！");
    }
}
```







**web.xml配置：**



```xml
<listener>
    <listener-class>com.atguigu.listener.MyServletContextListener</listener-class>
</listener>
```









