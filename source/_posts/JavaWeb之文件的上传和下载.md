---
title: JavaWeb之文件的上传和下载
author: ITNXD
toc: true
abbrlink: 15689
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/15/7684201c6e0c7e79a55a4ca670a497ca.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/15/7684201c6e0c7e79a55a4ca670a497ca.png
categories:
  - JavaWeb
tags:
  - 文件上传下载
date: 2021-03-15 19:26:30
updated:
---





# 一、文件上传









## 1、文件上传介绍





1. 要有一个 form 标签，method=post 请求

2. form 标签的 encType 属性值必须为 multipart/form-data 值

3. 在 form 标签中使用 input type=file 添加上传的文件

4. 编写服务器代码（Servlet 程序）接收，处理上传的数据。

   

**注意：**`encType=multipart/form-data` 表示提交的数据，以多段（每一个表单项一个数据段）的形式进行拼接，然后以二进制流的形式发送给服务器。





**upload.jsp文件：**



注意：get的url长度有限制，post无限制，一般上传使用post



```jsp
<%--get的url长度有限制，post无限制--%>
<form action="uploadServlet" method="post" enctype="multipart/form-data">
    用户名：<input type="text" name="username"><br>
    头像：<input type="file" name="photo"><br>
    <input type="submit" value="提交"><br>
</form>
```





**配置XML文件：**



```xml
<servlet>
    <servlet-name>UploadServlet</servlet-name>
    <servlet-class>com.atguigu.servlet.UploadServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>UploadServlet</servlet-name>
    <url-pattern>/upload</url-pattern>
</servlet-mapping>
```





**uploadServlet文件：**



注意：以流的形式发送，无法通过请求参数接收！form表单的enctype属性决定的！

使用如下方式接收上传的文件，在控制台自然是乱码的，毕竟是二进制数据！



```java
@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
    System.out.println("收到文件了！");

    /*以流的形式发送，无法通过请求参数接收！
        form表单的enctype属性决定的！
     * */
    // System.out.printf(req.getParameter("username"));
    // System.out.printf(req.getParameter("photo"));

    // 需要以流形式接收！
    ServletInputStream is = req.getInputStream();

    // 够大为100k，读一次即可读完！
    byte[] buffer = new byte[102400000];
    int len = is.read(buffer);
    // 可在控制台打印输出！自然为
    System.out.println(new String(buffer, 0, len));
}
```





**文件上传发送的HTTP协议内容：**



注意：谷歌浏览器中上传的文件的数据显示的是空行，毕竟数据太多，还不是文本数据，但不影响服务器接收数据！



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/15/203cdd0e57e5ad682758cc8bd2cfa933.png)









## 2、使用第三方包解决





> 需要使用第三方包 commons-fileupload.jar来解决！





#### 2.1、导包

- commons-fileupload.jar
- commons-io.jar



#### 2.2、该开源库的常用方法





**ServletFileUpload 类，用于解析上传的数据：**

1. public static final boolean isMultipartContent(HttpServletRequest request)：判断当前上传的数据格式是否是多段的格式。
2. public List\<FileItem\> parseRequest(HttpServletRequest request)：解析上传的数据，返回包含每一个表单项的List集合



**FileItem类，表示每一个表单项：**

1. public boolean isFormField()：如果当前表单项是普通表单项，返回true，文件类型返回false
2. public String getFieldName()：获取当前表单项的name属性值
3. public String getString()：获取当前表单项的value属性值，参数为”UTF-8”可解决乱码问题
4. public String getName()：获取上传的文件名
5. public void write(File file)：将上传的文件写到参数File所指向的硬盘位置





#### 2.3、解析上传数据的代码





**注意：此开源jar包并不兼容Tomcat10，Tomcat10实在太新了。请安装Tomcat8使用!**







```java
public class UploadServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{

        // 1. 判断上传数据是否是多段数据
        /*
        tomcat10实在太新了，包都无法兼容，安装tomcat8使用!
        * */
        if(ServletFileUpload.isMultipartContent(req)){
            // 2. 创建 FileItemFactory工厂类
            FileItemFactory fileItemFactory = new DiskFileItemFactory();
            // 3. 创建用于解析上传数据的工具类ServletFileUpload
            ServletFileUpload servletFileUpload = new ServletFileUpload(fileItemFactory);

            try {
                // 4. 解析上传数据，得到表单项FileItem集合
                List<FileItem> list = servletFileUpload.parseRequest(req);

                for (FileItem fileItem : list) {
                    // 5. 判断每一个表单项是普通类型还是文件类型
                    if(fileItem.isFormField()){
                        // 普通类型
                        System.out.println("表单项的name属性为：" + fileItem.getFieldName());
                        // 写入字符集，防止乱码
                        System.out.println("表单项的value属性为：" + fileItem.getString("UTF-8"));
                    }else{
                        // 上传的文件类型
                        System.out.println("表单项的name属性为：" + fileItem.getFieldName());
                        System.out.println("上传的文件名为：" + fileItem.getName());

                        // 写入本地：
                        fileItem.write(new File("C:\\Users\\15890\\Desktop\\" + fileItem.getName()));
                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}

```









# 二、文件下载





## 1、文件下载过程



1. 获取要下载的文件名
2. 创建ServletContext对象
3. 回传客户端前，通过ServletContext对象设置响应头告诉客户端返回的**数据类型**及**用途**
4. 通过ServletContext对象流读取该文件
5. 通过Response获取输出流
6. 通过commons-io包下的 IOUtils工具类的copy方法读到输出流







## 2、代码实现





**注意点：**

- 告诉客户端设置数据类型：`resp.setContentType(mimeType)`
- 告诉客户端为下载用途：`resp.setHeader("Content-Disposition", "attachment; fileName=" + fileName)`
  - Content-Disposition：表示收到数据如何处理
  - attachment：表示附件，用于下载
  - fileName：表示下载文件的保存名字





**下载文件名为中文的乱码问题：**



使用URL编码即可：`  String fileName = URLEncoder.encode(downloadFileName, "UTF-8")`









```java
public class DownLoadServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1. 获取要下载文件名
//        String downloadFileName = "美女.jpg";
        String downloadFileName = "ghs.mp4";
        // 2. 读取要下载的文件（ServletContext）
        ServletContext servletContext = getServletContext();

        // 3. 回传到客户端前，通过响应头告诉客户端返回的数据类型及用途
        // 获取要下载文件的类型！
        String mimeType = servletContext.getMimeType("/file/" + downloadFileName);
        // 通过响应头设置告诉客户端文件类型
        resp.setContentType(mimeType);
        System.out.println("文件类型为：" + mimeType);
        // 通过响应头告诉客户端获取到的文件是用于下载的
        // Content-Disposition：表示收到数据如何处理
        // attachment：表示附件，用于下载
        // fileName：表示下载文件的保存名字
        // 处理中文文件名下载乱码问题:使用URL编码：把汉字转换为%xx%xx格式
        String fileName = URLEncoder.encode(downloadFileName, "UTF-8");
        resp.setHeader("Content-Disposition", "attachment; fileName=" + fileName);



        // 通过User-Agent判断浏览器类型，分别处理！
        // 处理火狐，使用Base64编码
//        if(req.getHeader("User-Agent").contains("Firefox")){
//            // 新版本火狐已不需要！
//            String str = "attachment; fileName=" + "=?utf-8?B?" + Base64.getEncoder().encodeToString(downloadFileName.getBytes("utf-8")) + "?=";
//            // 设置到响应头中
//            resp.setHeader("Content-Disposition", str);
//        }else{
//            // 处理谷歌和IE，使用URL编码
//            String fileName = URLEncoder.encode(downloadFileName, "UTF-8");
//            resp.setHeader("Content-Disposition", "attachment; fileName=" + fileName);
//        }




        // 4. 使用流读取该文件
        InputStream resourceAsStream = servletContext.getResourceAsStream("/file/" + downloadFileName);
        // 5. 通过Response获取输出流
        ServletOutputStream outputStream = resp.getOutputStream();
        // 6. 通过commons-io包下的 IOUtils工具类的copy方法读到输出流
        IOUtils.copy(resourceAsStream, outputStream);

    }
}

```





## 3、火狐浏览器乱码问题（了解）



> 以前的火狐浏览器下载的文件名含有中文会乱码，使用URL编码后仍然乱码，必须使用BASE64编码！
>
> But：如今新时代的火狐浏览器使用和谷歌或IE浏览器一样的URL编码即可正确显示中文文件名！
>
> So：下方处理火狐浏览器下载中文乱码的内容，仅作为学习记录，了解即可！









#### 3.1、Base64使用





> 注意：jdk8之后不再支持BASE64Decoder和BASE64Encoder两个类！
>
> 取而代之的是`java.util.Base64`类！





**JDK8之前的旧版、废弃版：**（了解）



```java
import sun.misc.BASE64Decoder;
 import sun.misc.BASE64Encoder;
//jdk8之后不再支持上述两个类
public class Base64Test {
    public static void main(String[] args) throws Exception {
        String content = "这是需要Base64编码的内容";
        System.out.println("初始内容：" + content);
        // 创建一个Base64编码器
        BASE64Encoder base64Encoder = new BASE64Encoder();
        // 执行Base64编码操作，encode()参数是字节数组
        String encodedString = base64Encoder.encode(content.getBytes("UTF-8"));
        System.out.println("编码后的结果：" + encodedString );
        // 创建Base64解码器
        BASE64Decoder base64Decoder = new BASE64Decoder();
        // 解码操作
        byte[] bytes = base64Decoder.decodeBuffer(encodedString);
        //以utf-8编码，以utf-8解码
        String str = new String(bytes, "UTF-8");
        System.out.println("解码后的结果：" + str);
    }
}
```





**JDK8之后的新版、高效率版：**



> 与sun.misc套件和Apache Commons Codec所提供的Base64编解码器来比较的话，Java 8提供的Base64拥有更好的效能。
>
> 实际测试编码与解码速度的话，Java 8提供的Base64，要比sun.misc套件提供的还要**快至少11倍**，比Apache Commons Codec提供的还要快至少3倍。
>
> 因此在Java上若要使用Base64，这个Java 8底下的java.util套件所提供的Base64类别绝对是**首选！**



```java
public class Base64Test {

    public static void main(String[] args) throws UnsupportedEncodingException {
        String str = "这是我的祖国！";

        // 编码：
        Base64.Encoder encoder = Base64.getEncoder();
        String s = encoder.encodeToString(str.getBytes(StandardCharsets.UTF_8));
        System.out.println(s); // 6L+Z5piv5oiR55qE56WW5Zu977yB

        // 解码：
        Base64.Decoder decoder = Base64.getDecoder();
        String s1 = new String(decoder.decode(s), "UTF-8");
        System.out.println(s1); // 这是我的祖国！

    }
}
```









#### 3.2、火狐乱码解决（了解）





- 谷歌浏览器请求头： `Content-Disposition: attachment; filename=中文名`
- 火狐浏览器请求头：`Content-Disposition: attachment; filename==?charset?B?xxxxx?=` 



**filename后的参数介绍：**



1. `=?` 表示编码内容的开始
2. `charset` 表示字符集(UTF-8、GBK等)
3. `B` 表示BASE64编码
4. `xxxx` 表示BASE64编码后的内容
5. `?=` 表示编码内容的结束





**通过User-Agent判断浏览器类型，分别处理：**（了解）



```java
// 通过User-Agent判断浏览器类型，分别处理！
// 处理火狐，使用Base64编码
if(req.getHeader("User-Agent").contains("Firefox")){
    // 新版本火狐已不需要！
    String str = "attachment; fileName=" + "=?utf-8?B?" + Base64.getEncoder().encodeToString(downloadFileName.getBytes("utf-8")) + "?=";
    // 设置到响应头中
    resp.setHeader("Content-Disposition", str);
}else{
    // 处理谷歌和IE，使用URL编码
    String fileName = URLEncoder.encode(downloadFileName, "UTF-8");
    resp.setHeader("Content-Disposition", "attachment; fileName=" + fileName);
}
```









