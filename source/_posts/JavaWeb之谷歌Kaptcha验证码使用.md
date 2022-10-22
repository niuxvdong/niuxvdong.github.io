---
title: JavaWeb之谷歌Kaptcha验证码使用
author: ITNXD
toc: true
abbrlink: 44470
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/19d2bb4f35a6be2f5dfef634db6c2cd2.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/19d2bb4f35a6be2f5dfef634db6c2cd2.png
categories:
  - JavaWeb
tags:
  - Kaptcha
  - 验证码
date: 2021-03-18 16:40:28
updated:
---







# 一、概述







## 1、表单重复提交



> 一些操作可能会导致表单的重复提交，造成数据错误的发生！这时验证码就横空出世了！



1. 提交完表单。服务器使用**请求转发**进行页面跳转。这个时候，用户按下功能键 F5，就会发起最后一次的请求。造成表单重复提交问题。**解决方法**：使用**重定向**来进行跳转
2. 用户正常提交服务器，但是由于**网络延迟**等原因，迟迟未收到服务器的响应，这个时候，用户以为提交失败，就会着急，然后**多点了几次提交**操作，也会造成表单重复提交。
3. 用户正常提交服务器。服务器也没有延迟，但是**提交完成后**，用户**回退浏览器**。重新提交。也会造成表单重复提交。







## 2、验证码解决表单重复提交原理





**如下图所示：** 经过Servlet程序进行拦截！



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/9090df039bb10f0a6a12ed31d67a78ca.png)





# 二、谷歌Kaptcha使用









## 1、导包



- 需要导入谷歌验证码的包`kaptcha-2.3.2.jar`









## 2、XML配置





**在web.xml文件中进行配置如下：**





```xml
<servlet>
    <servlet-name>KaptchaServlet</servlet-name>
    <servlet-class>com.google.code.kaptcha.servlet.KaptchaServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>KaptchaServlet</servlet-name>
    <url-pattern>/kaptcha.jpg</url-pattern>
</servlet-mapping>
```



- 每次访问`http:ip:port/工程路径/kaptcha.jpg`都会生成一个新的验证码！





## 3、在表单中使用





**表单中如下：** 在img标签中加入该链接即可！



```html
<form action="registServlet" method="get">
    用户名：<input type="text" name="username"/><br>
    验证码：<input type="text" name="code" style="width: 60px"/>
    <img src="http://localhost:8080/15_code/kaptcha.jpg" alt=""><br>
    <input type="submit"/>
</form>
```





## 4、在Servlet中处理





**注意：**

- 每次刷新页面获取到的验证码会被自动保存到Session域中

- 属性名为：`KAPTCHA_SESSION_KEY`

- 由于验证码只使用一次，请获取后立马删除

  





```java
public class RegistServlet extends HttpServlet {

    /*
    谷歌验证码开源包也是使用Tomcat8，servlet-api包最好也用8.0的！
    * */

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取Session域中的验证码！
        String token = (String) req.getSession().getAttribute(KAPTCHA_SESSION_KEY);
        // 获取完毕，马上删除
        req.getSession().removeAttribute(KAPTCHA_SESSION_KEY);

        // 获取表单中的信息
        String code = req.getParameter("code");
        String username = req.getParameter("username");

        if(token != null && token.equalsIgnoreCase(code)){
            System.out.println("保存到数据库：" + username);
            resp.sendRedirect(req.getContextPath() + "/ok.jsp");
        }else{
            System.out.println("请不要重复提交表单！");
        }
    }
}
```



## 5、点击图片切换验证码



> 在前端 JS 页面中处理即可！



**注意：**

- 重新设置img标签的src属性，其实就是再次给服务器发送了一次请求，所以验证码会改变
- 为了解决除谷歌浏览器以外其他浏览器的缓存问题，可以简单的修改资源路径，在后面添加一个唯一的参数即可！
- 这里采用时间戳方式保证唯一性即可！



```javascript
$("#code_img").click(function (){
    this.src = "${basePath}" + "kaptcha.jpg?d=" + new Date();
});
```













