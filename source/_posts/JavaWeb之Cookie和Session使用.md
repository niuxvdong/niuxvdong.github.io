---
title: JavaWeb之Cookie和Session使用
author: ITNXD
toc: true
abbrlink: 56534
top_img: https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/16/b89c9c53224f01449998789fa34acfc6.png
cover: https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/16/b89c9c53224f01449998789fa34acfc6.png
categories:
  - JavaWeb
tags:
  - Cookie
  - Session
date: 2021-03-15 22:50:10
updated:
---





# 一、Cookie





## 1、Cookie概述





1. Cookie 翻译过来是饼干的意思。
2. Cookie 是**服务器通知客户端保存键值对的一种技术。**
3. 客户端有了 Cookie 后，每次请求都发送给服务器。
4. 每个 Cookie 的大小不能超过 4kb，对同一个域名下的总cookie数量限制为20个。



**作用：**

1. Cookie一般用于存储少量的安全性较低的数据
2. 在不登陆的情况下，完成服务器对客户端的身份识别，





## 2、Cookie创建









**BaseServlet.java：** 创建的Servlet程序都继承自该抽象类！可以使用**反射**动态获取执行方法！



```java
public abstract class BaseServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // 解决post请求中文乱码问题：
        req.setCharacterEncoding("UTF-8");

        // 解决响应中中文乱码问题：
        resp.setContentType("text/html; charset=UTF-8");

        // 获取隐藏域action的参数！
        String action = req.getParameter("action");

        // 使用反射动态获取action的值对应的方法去调用，避免大量的if判断！
        try {
            Method method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class);

            method.invoke(this, req, resp);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```







**Cookie创建：**



- 请求头收到响应头发来的Set-Cookie，客户端就会保存为Cookie!
  - 若没有，则新创建
  - 若有，则覆盖更新



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/16/a67ec5d90a0514f5a9254ff5a5d69d52.png)





```java
protected void createCookie(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 1. 创建Cookie
    Cookie cookie = new Cookie("key2", "value2");
    // 2. 通知客户端保存Cookie
    resp.addCookie(cookie);


    resp.getWriter().write("cookie创建成功！");
}
```











## 3、服务器获取Cookie





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/16/d1b4e9adde19085e7f6f166f566663be.png)







**Cookie获取代码：**



```java
protected void getCookie(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    Cookie[] cookies = req.getCookies();
    for (Cookie cookie : cookies) {
        resp.getWriter().write(cookie.getName() + ": " + cookie.getValue() + "<br>");
    }

    // 查找特定Cookie，封装到CookieUtils里
    Cookie findCookie = CookieUtils.FindCookie("key1", cookies);
    if(findCookie != null){
        resp.getWriter().write(findCookie.getName() + ": " + findCookie.getValue());
    }
}
```









**由于查找特定Cookie需要循环，所以将其封装到WebUtils工具类：**



````java
public class CookieUtils {

    /**
     * 查找特定Cookie！
     * @param name
     * @param cookies
     * @return
     */
    public static Cookie FindCookie(String name, Cookie[] cookies){

        if(name == null || cookies == null || cookies.length == 0){
            return null;
        }
        for (Cookie cookie : cookies) {
            if(name.equals(cookie.getName())){
                return cookie;
            }
        }
        return null;
    }
}

````









## 4、Cookie值的修改





- 方案一：创建同名Cookie对象进行覆盖
- 方案二：找到要修改Cookie对象，使用Set方法设置



**注意：**

- 汉字，二进制：使用BASE64编码。
- 对于Version 0 cookie，值不应包含空格、方括号、圆括号、等号、逗号、双引号、斜杠、问号、at符号、冒号和分号。空值在所有浏览器上的行为不一定相同。
- Tomcat 8之后Cookie可以存中文，但特殊中文字符仍不支持，建议使用URL编码格式





```java
protected void updateCookie(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    //        方案一：
    //        1、先创建一个要修改的同名（指的就是 key）的 Cookie 对象
    //        2、在构造器，同时赋于新的 Cookie 值。
    Cookie cookie = new Cookie("key1", "newValue");
    //        3、调用 response.addCookie( Cookie );
    resp.addCookie(cookie);
    resp.getWriter().write(cookie.getName() + ": " + cookie.getValue());


    //        方案二：
    //        1、先查找到需要修改的 Cookie 对象
    Cookie cookie1 = CookieUtils.FindCookie("key2", req.getCookies());
    if(cookie1 != null){
        //        2、调用 setValue()方法赋于新的 Cookie 值。
        cookie1.setValue("newValue2");
        //        3、调用 response.addCookie()通知客户端保存修改
        resp.addCookie(cookie1);
    }
    resp.getWriter().write(cookie1.getName() + ": " + cookie1.getValue());
}
```













## 5、浏览器查看Cookie





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/16/2b637587baf07cd25e22fba6ed1e50e0.png)





## 6、Cookie生命控制





> Cookie 的生命控制指的是如何管理 Cookie 什么时候被销毁（删除）!





**需要使用到 setMaxAge()方法：**

1. 正数，表示在指定的秒数后过期
2. 负数，表示浏览器一关，Cookie 就会被删除（**默认值是-1**）
3. 零，表示马上删除 Cookie





```java
// 浏览器关闭后删除 
protected void defaultLife(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
     Cookie cookie = new Cookie("default", "default");
     cookie.setMaxAge(-1);
     resp.addCookie(cookie);
 }

// 马上删除
protected void deleteNow(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 先找到你要删除的 Cookie 对象
    Cookie cookie = CookieUtils.FindCookie("key2", req.getCookies());
    if(cookie != null){
        // 调用 setMaxAge(0);
        cookie.setMaxAge(0); // 表示马上删除，都不需要等待浏览器关闭
        // 调用 response.addCookie(cookie);
        resp.addCookie(cookie);
    }
}

// 一小时后删除
protected void life3600(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Cookie cookie = new Cookie("life3600", "life3600");
    cookie.setMaxAge(3600);
    resp.addCookie(cookie);
}
```









## 7、Cookie有效路径Path的设置





> Cookie 的 path 属性可以有效的过滤哪些 Cookie 可以发送给服务器。哪些不发。
>
> path 属性是通过请求的地址来进行有效的过滤。





**注意：**

- 访问：`http://localhost:8080/14_cookie_session/cookie.html`不会得到path1的cookie，毕竟不匹配`abc`路径
- 访问：`http://localhost:8080/14_cookie_session/abc/cookie.html`可以得到
- 请求头可以看到`set-cookie`属性，但是application看不到！
- **默认情况**：参数是web工程路径`/14_cookie_session`，只有本工程可访问
- **要使本ip和port内所有项目共享**：可以设置参数为 `/`  即 `http://ip:port/` 
- **不同的服务器间cookie的共享**：使用Cookie对象的`setDomain(String path)`方法，参数设置为一级域名，则一级域名相同的不同服务器之间Cookie可共享



```java
protected void setPath(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    Cookie cookie = new Cookie("path1", "path1");
    cookie.setPath(req.getContextPath() + "/abc");
    resp.addCookie(cookie);
}
```











## 8、免用户名登录练习



> 即再次登录时，无需输入用户名，浏览器默认显示上次登录用户名！



**如下图所示：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/16/6848f6055caf9034b73048d038c2c701.png)







**login.jsp：**



```jsp
<form action="http://localhost:8080/14_cookie_session/loginServlet" method="get">
    用户名：<input type="text" name="username" value="${cookie.username.value}">
    密码：<input type="password" name="password">
    <input type="submit" value="登录">
</form>
```





**LoginServlet.java：**



```java
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        if("itnxd".equals(username) == "123456".equals(password)){
            // 登录成功
            Cookie cookie = new Cookie("username", username);
            cookie.setMaxAge(60 * 60 * 24 * 7); // 七天有效
            resp.addCookie(cookie);
            System.out.println("登录成功！");
        }else{
            System.out.println("登录失败！");
        }
    }
}
```









# 二、Session







## 1、Session概述



> Session是服务器端会话技术，在一次会话的多次请求间共享数据，将数据保存到服务器端！





1. Session 就一个接口（HttpSession）。
2. Session 就是会话。它是用来**维护一个客户端和服务器之间关联的一种技术**。
3. 每个客户端都有自己的**一个** Session 会话。
4. Session 会话中，我们经常用来保存用户登录之后的信息。







## 2、Session的创建和获取





**request.getSession()：**

- 第一次调用是：创建 Session 会话
- 之后调用都是：获取前面创建好的 Session 会话对象。

**isNew()：判断到底是不是刚创建出来的（新的）**

**getId()：**得到 Session 的会话 id 值。每个会话都有一个身份证号。也就是 ID 值。而且这个 ID 是唯一的！



```java
protected void createOrGetSession(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 创建或获取Session对象
    HttpSession session = req.getSession();
    // 判断是否是创建
    boolean isNew = session.isNew();
    // 获取会话id
    String id = session.getId();

    resp.getWriter().write("Session的id是：" + id + "<br/>");
    resp.getWriter().write("Session是否是新创建的：" + isNew + "<br/>");
}
```







## 3、Session域数据的存取





```java
protected void setAttribute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    req.getSession().setAttribute("session1", "session1");
    resp.getWriter().write("在Session域中保存了数据！");
}

protected void getAttribute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Object attribute = req.getSession().getAttribute("session1");
    resp.getWriter().write("Session域中保存的session1的值是：" + attribute);
}
```







## 4、Session生命周期控制



> Session超时指的是两次请求之间最大间隔时长！



**public void setMaxInactiveInterval(int interval)：**设置 Session 的超时时间（以秒为单位），超过指定的时长，Session就会被销毁。

- 值为正数的时候，设定 Session 的超时时长。
- 负数表示永不超时（极少使用）

**public int getMaxInactiveInterval()**：获取 Session 的超时时间

**public void invalidate()**：让当前 Session 会话**马上**超时无效。





**注意：**



- Session 默认的超时时间长为 30 分钟。
- Tomcat配置文件的web.xml文件中配置了超时时长



```xml
<!--
    C:\Users\15890\AppData\Local\JetBrains\IntelliJIdea2020.3\tomcat\4d4e0435-4fce-483b-a230-26a04fd14dc4\conf
    该路径下的web.xml指定了超时时长
-->
<session-config>
    <session-timeout>30</session-timeout>
</session-config>
```



- 可通过设置工程下的web.xml文件指定超时时长

```xml
<!--修改Tomcat服务器默认的Session超时时间为20分钟！一般不进行修改！-->
<session-config>
	<session-timeout>20</session-timeout>
</session-config>
```



- 也可通过`setMaxInactiveInterval(int interval)`设置指定的Session超时





**Session超时演示：**





```java
protected void defaultLife(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    int maxInactiveInterval = req.getSession().getMaxInactiveInterval();
    // 默认1800秒，即30分钟
    resp.getWriter().write("Session的默认超时时长为：" + maxInactiveInterval + "秒")
}


protected void life3s(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 设置Session 3秒后超时
    // 先点击创建，再点击设置3秒，再点击获取，三秒内都为false，超过3秒为true(即重新创建的Session)
    // 想要使得新建的再次超时，还需要再次点击设置3秒，重复操作
    req.getSession().setMaxInactiveInterval(3);
    resp.getWriter().write("当前Session已设置为3秒后超时！");
}

protected void deleteNow(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    req.getSession().invalidate();
    resp.getWriter().write("当前Session点击该按钮后马上失效！");
}
```









## 5、浏览器和Session之间的技术





**Session 技术，底层其实是基于 Cookie 技术来实现的。**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/16/12e739a06592871ec25ea5566610be4b.png)







## 6、Session与Cookie总结







**Session的特点：**

1. Session用于存储一次会话的多次请求数据，存在服务器端，一次会话只有一个session对象
2. Session可以存储任意类型，任意大小的数据



**Session与Cookie的区别：**

1. Session存储数据在服务器端，Cookie在客户端
2. Session没有数据大小的限制，Cookie有(4KB)
3. Session数据安全，Cookie相对不安全





**客户端关闭服务器不关闭，两次获取的Session是否是同一个对象?**



- 默认情况下，不是一个对象，默认情况下客户端关闭后Cookie就会被销毁，再次启动客户端发请求给服务器端，服务器端会重新创建Session并响应给客户端保存为Cookie
- 可通过设置该Session对应的Cookie（即`JSESSIONID`）的存活时间实现同一个Session对象的目的！



**客户端不关闭服务器关闭，两次获取的Session是否是同一个对象?**



不是同一个对象，（第二次为新创建的，但数据相同！）但为了保证数据不丢失，Tomcat服务器完成两步操作：



1. Session钝化：在服务器正常关闭之前，将Session对象序列化到硬盘上
2. Session活化：在服务器启动之后，将Session文件反序列化成为内存中的Session对象







