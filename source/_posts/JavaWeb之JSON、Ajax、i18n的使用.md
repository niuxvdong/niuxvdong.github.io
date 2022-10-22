---
title: JavaWeb之JSON、Ajax、i18n的使用
author: ITNXD
toc: true
abbrlink: 59901
categories:
  - JavaWeb
tags:
  - JSON
  - Ajax
  - i18n
date: 2021-03-18 17:33:40
updated:
top_img: https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/4fb7fc6f404e546446eff3f9e9ad3881.png
cover: https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/4fb7fc6f404e546446eff3f9e9ad3881.png
---





# 一、JSON









## 1、概述





> JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式。易于人阅读和编写。同时也易于机器解析和生成。JSON采用完全独立于语言的文本格式，而且很多语言都提供了对 json 的支持。 这样就使得 JSON 成为理想的数据交换格式。



- json 是一种**轻量**级的数据交换格式。（轻量级指的是跟 xml 做比较。）
- 数据交换指的是客户端和服务器之间业务数据的传递格式。











## 2、JSON基本使用





> json 是由键值对组成，并且由花括号（大括号）包围。每个键由引号引起来，键和值之间使用冒号进行分隔，多组键值对之间进行逗号进行分隔。
>
> json 本身是一个对象。
> json 中的 key 我们可以理解为是对象中的一个属性。
> json 中的 key 访问就跟访问对象的属性一样： `json 对象.key`







```javascript
// json的定义
var jsonObj = {
    "key1":12,
    "key2":"abc",
    "key3":true,
    "key4":[11,"arr",false],
    "key5":{
        "key5_1" : 551,
        "key5_2" : "key5_2_value"
    },
    "key6":[{
        "key6_1_1":6611,
        "key6_1_2":"key6_1_2_value"},{
            "key6_2_1":6621,
            "key6_2_2":"key6_2_2_value"
        }]
};

alert(typeof jsonObj); // object

// json的访问
alert(jsonObj.key1); //12
alert(jsonObj.key2); // abc
alert(jsonObj.key3); // true
alert(jsonObj.key4);// 得到数组[11,"arr",false]
// json 中 数组值的遍历
for(var i = 0; i < jsonObj.key4.length; i++) {
    alert(jsonObj.key4[i]);
}
alert(jsonObj.key5.key5_1);//551
alert(jsonObj.key5.key5_2);//key5_2_value
alert( jsonObj.key6 );// 得到 json 数组
// 取出来每一个元素都是 json 对象
var jsonItem = jsonObj.key6[0];
// alert( jsonItem.key6_1_1 ); //6611
alert( jsonItem.key6_1_2 ); //key6_1_2_value
```















## 3、JSON两方法







**json 的存在有两种形式：**

- 对象的形式存在，我们叫它 json 对象。一般我们要操作 json 中的数据的时候，需要 json 对象的格式
- 字符串的形式存在，我们叫它 json 字符串。一般我们要在客户端和服务器之间进行数据交换的时候，使用 json 字符串。



**两个方法：**



- `JSON.stringify()`：把 json 对象转换成为 json 字符串
- `JSON.parse()`：把 json 字符串转换成为 json 对象



**代码示例：**





```javascript
// json对象转字符串

// 类似java的toString方法：
var jsonString = JSON.stringify(jsonObj);
alert(jsonString);

// json字符串转json对象

var jsonObj1 = JSON.parse(jsonString);
alert(jsonObj1);
```

















## 4、Java与JSON转换





**Java与JSON的转换需要使用谷歌的Gson包！**



`gson-2.2.4.jar`





**Gson的两个方法：**



- toJson()：参数可以是JavaBean、Map、List
- fromJson()：
  - 参数一：JSON字符串
  - 参数二：要转换的类型
    - JavaBean：直接为对应类.class
    - List：需要使用TypeToken.getType()获取







#### 4.1、JavaBean与JSON



```java
@Test
public void test1(){
    Person p = new Person(1, "itnxd");

    // 1. JavaBean -> JSON
    Gson gson = new Gson();
    String s = gson.toJson(p);
    System.out.println(s);

    // 2. JSON -> JavaBean
    Person person = gson.fromJson(s, Person.class);
    System.out.println(person);
}
```







#### 4.2、List集合与JSON







```java
@Test
public void test2(){
    ArrayList<Person> person = new ArrayList<>();

    person.add(new Person(1, "itnxd"));
    person.add(new Person(2, "itnnn"));

    Gson gson = new Gson();
    // 1. List -> Json
    String s = gson.toJson(person);
    System.out.println(s);

    // 2. Json -> List
    // 方案一：
    List<Person> list = gson.fromJson(s, new PersonListType().getType());
    // 方案二：
    List<Person> list = gson.fromJson(s, new TypeToken<List<Person>>(){}.getType());
    System.out.println(list);
    System.out.println(list.get(1));

}
```





**获取Type方案一：** 创建继承TypeToken的类！



使用：`new 该类.getType()`即可

泛型参数为你的List集合，如`List<Person>`



```java
public class PersonListType extends TypeToken<List<Person>> {
}
```





**获取Type方案二：** 使用匿名内部类实现！（推荐）



使用：`new TypeToken<List<Person>>(){}.getType()`

泛型参数为你的List集合，如`List<Person>`



#### 4.3、Map与JSON



**获取Type方案与List转换类似，参见4.2！**



```java
@Test
public void test3(){
    Map<Integer, Person> map = new HashMap<>();
    map.put(1, new Person(1, "it"));
    map.put(2, new Person(2, "it2"));

    Gson gson = new Gson();
    // 1. Map -> Json
    String s = gson.toJson(map);
    System.out.println(s);
    // 2. Json -> Map
    //        Map<Integer, Person> map1 = gson.fromJson(s, new PersonMapType().getType());

    // 使用匿名内部类实现：
    Map<Integer, Person> map1 = gson.fromJson(s, new TypeToken<Map<Integer, Person>>(){}.getType());
    System.out.println(map1);

    System.out.println(map1.get(1));

}
```













# 二、Ajax





## 1、概述





> AJAX 即“Asynchronous Javascript And XML”（**异步** JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。
>
> Ajax 是一种浏览器通过 js **异步发起请求，局部更新页面**的技术。
>
> Ajax 请求的局部更新，浏览器地址栏不会发生变化
>
> 局部更新不会舍弃原来页面的内容







## 2、原生Ajax请求（了解）







**向服务器发送请求：**



| 方法                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| open(*method*,*url*,*async*) | 规定请求的类型、URL 以及是否异步处理请求。 *method*：请求的类型；GET 或 POST  *url*：文件在服务器上的位置  *async*：true（异步）或 false（同步） |
| send(*string*)               | 将请求发送到服务器。 *string*：仅用于 POST 请求              |



**GET 还是 POST？**

与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。

然而，在以下情况中，请使用 POST 请求：

- 无法使用缓存文件（更新服务器上的文件或数据库） 
- 向服务器发送大量数据（POST 没有数据量限制） 
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠





**服务器响应：**

如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。

| 属性         | 描述                       |
| ------------ | -------------------------- |
| responseText | 获得字符串形式的响应数据。 |
| responseXML  | 获得 XML 形式的响应数据。  |





**onreadystatechange 事件：**

当请求被发送到服务器时，我们需要执行一些基于响应的任务。

每当 readyState 改变时，就会触发 onreadystatechange 事件。

readyState 属性存有 XMLHttpRequest 的状态信息。



**XMLHttpRequest 对象的三个重要的属性：**

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| onreadystatechange | 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。 |
| readyState         | 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。 0: 请求未初始化  1: 服务器连接已建立  2: 请求已接收  3: 请求处理中  4: 请求已完成，且响应已就绪 |
| status             | 200: "OK" 404: 未找到页面                                    |



在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。

**当 readyState 等于 4 且状态为 200 时，表示响应已就绪！**





**使用 Callback 函数：**

callback 函数是一种以参数形式传递给另一个函数的函数。

如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个*标准*的函数，并为每个 AJAX  任务调用该函数。

该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：



```javascript
function ajaxRequest() {

    // 1、我们首先要创建XMLHttpRequest
    var xmlHttpRequest = new XMLHttpRequest();

    // 2、调用open方法设置请求参数
    // 参数：method, url, async：true（异步）或 false（同步）
    xmlHttpRequest.open("get", "http://localhost:8080/19_json_ajax_i18n/ajaxServlet?action=JavaScriptAjax", true);

    // 本步骤要在第三步前完成绑定！
    // 4、在send方法前绑定onreadystatechange事件，处理请求完成后的操作。
    // 接收响应
    xmlHttpRequest.onreadystatechange = function (){
        if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            // 把响应数据放到div里面！
            // document.getElementById("div01").innerText = xmlHttpRequest.responseText;

            // 让显示更加人性化！转换为JSON对象
            var JsonObj = JSON.parse(xmlHttpRequest.responseText);
            document.getElementById("div01").innerText = "编号：" + JsonObj.id + "\n" + "姓名：" + JsonObj.name;
        }
    };

    // 3、调用send方法发送请求
    xmlHttpRequest.send();
}
```





## 3、jquery中的Ajax请求



> 由于原生JS实现Ajax过于复杂，可使用jQuery封装好的对象使用！



#### 3.1、\$.ajax



> [详细参数查看这里，这里只讲最常见参数！](https://jquery.cuishifeng.cn/jQuery.Ajax.html)



1. url：表示请求的地址
2. type：表示请求的类型 GET 或 POST 请求
3. data：表示发送给服务器的数据，两种格式：
   1. `name=value&name=value`
   2. `{key:value}`
4. success：请求成功，响应的回调函数
5. dataType：响应的数据类型，常用的数据类型有：
   1. text 表示纯文本（需要自己转换为JSON对象使用）
   2. xml 表示 xml 数据（弃用）
   3. json 表示 json 对象（**常用**：回调函数的参数是已经转换完毕的JSON对象，可直接使用）





```javascript
$.ajax({
    url:"http://localhost:8080/19_json_ajax_i18n/ajaxServlet",
    // data: "action=JqueryAjax",
    data:{action:"JqueryAjax"},
    type:"GET",
    success: function (msg){
        // 无需再进行转换
        // let dataJson = JSON.parse(data);
        $("#msg").html("编号：" + msg.id + "，" + "姓名：" + msg.name );
    },
    // data_type: "text"
    // text：需要自己转换为json对象使用，可以直接使用json实现自动转换
    dataType: "json"
});
```





#### 3.2、\$.get与\$.post



> 与上方相比少了type参数！



1. url：请求的 url 地址
2. data：发送的数据
3. callback：成功的回调函数
4. dataType：返回的数据类型



```javascript
// ajax--get请求
$("#getBtn").click(function(){
    $.get("http://localhost:8080/19_json_ajax_i18n/ajaxServlet","action=JqueryGet",function (data) {
        $("#msg").html(" get 编号：" + data.id + " , 姓名：" + data.name);
    },"json");
});

// ajax--post请求
$("#postBtn").click(function(){
    $.post("http://localhost:8080/19_json_ajax_i18n/ajaxServlet","action=JqueryPost",function (data) {
        $("#msg").html(" post 编号：" + data.id + " , 姓名：" + data.name);
    },"json");
});
```







#### 3.3、$.getJSON



> 与上方相比少了dataType参数！



1. url：请求的 url 地址
2. data：发送给服务器的数据
3. callback：成功的回调函数



```javascript
$("#getJSONBtn").click(function(){
    $.getJSON("http://localhost:8080/19_json_ajax_i18n/ajaxServlet","action=JqueryGetJSON",function (data) {
        $("#msg").html(" getJSON 编号：" + data.id + " , 姓名：" + data.name);
    });
});
```





#### 3.4、serialize



> 表单序列化 serialize()
>
> serialize()：可以把表单中所有表单项的内容都获取到，并以 `name=value&name=value` 的形式进行拼接。





```javascript
$("#submit").click(function(){

    // 获取表单信息拼接
    alert($("#form01").serialize());

    // 参数拼接：
    // "action=jQuerySerialize&" + $("#form01").serialize()

    // 把参数序列化
    $.getJSON("http://localhost:8080/19_json_ajax_i18n/ajaxServlet","action=JquerySerialize&" +
              $("#form01").serialize(),function (data) {
        $("#msg").html(" Serialize 编号：" + data.id + " , 姓名：" + data.name);
    });
});
```





**ajaxServlet.java：**可以获取到序列化的参数！



```java
protected void JquerySerialize(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("JquerySerialize请求已到达！");

    System.out.println(req.getParameter("username"));
    System.out.println(req.getParameter("password"));

    Person person = new Person(1, "itnxd");

    // 客户端与服务器交流需要使用JSON字符串
    // Servlet处理响应，js中处理接收！
    Gson gson = new Gson();
    String personJSONString = gson.toJson(person);

    // 响应到客户端
    resp.getWriter().write(personJSONString);

}
```







## 4、使用Ajax校验用户名





**前端JS：**



```javascript
// 为用户名绑定ajax请求
$("#username").blur(function (){
    var username = this.value;
    $.getJSON("userServlet", "action=ajaxExistUsername&username=" + username, function (data){
        // 用户名不存在
        if(data.existUsername){
            $("span.errorMsg").text("用户名已存在！");
        }else{
            $("span.errorMsg").text("用户名可用！");
        }
    });
});
```





**Servlet程序：**



```java
/**
 * 使用ajax处理用户名验证！
 * @param req
 * @param resp
 * @throws ServletException
 * @throws IOException
 */
protected void ajaxExistUsername(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 1. 获取参数
    String username = req.getParameter("username");
    // 2. 调用userService的existUsername检查用户名是否存在
    // 此处为调用数据库操作！
    boolean existUsername = userService.existUsername(username);
    // 3. 封装为map对象
    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put("existUsername", existUsername);
    // 4. 使用Gson解析为Json
    Gson gson = new Gson();
    String json = gson.toJson(hashMap);
    // 5. 传回客户端
    resp.getWriter().write(json);
}
```

















# 三、i18n（了解）







## 1、概述



> 国际化（Internationalization）指的是同一个网站可以支持多种不同的语言，以方便不同国家，不同语种的用户访问。
>
> 关于国际化我们想到的最简单的方案就是为不同的国家创建不同的网站，比如苹果公司，他的英文官网是：http://www.apple.com 而中国官网是 http://www.apple.com/cn，苹果公司这种方案并不适合全部公司，而我们希望相同的一个网站，而不同人访问的时候可以根据用户所在的区域显示不同的语言文字，而网站的布局样式等不发生改变。
>
> 国际化的英文 Internationalization，但是由于拼写过长，老外想了一个简单的写法叫做 I18N，代表的是 Internationalization这个单词，以 I 开头，以 N 结尾，而中间是 18 个字母，所以简写为 I18N。以后我们说 I18N 和国际化是一个意思。





**国际化实现的三要素：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/9c2c6ffa6e34299697551db4ea92d33c.png)



## 2、国际化资源 properties





> 用来配置语言文件的配置文件！
>
> 这里只配置两个即中文和英文！





**src下新建：**

i18n_en_US.properties：



```properties
username=username
password=password
sex=sex
age=age
regist=regist
boy=boy
girl=girl
email=email
reset=reset
submit=submit
```





i18n_zh_CN.properties：



```properties
username=用户名
password=密码
sex=性别
age=年龄
regist=注册
boy=男
girl=女
email=邮箱
reset=重置
submit=提交
```





## 3、Local对象介绍





> 通过该对象获取默认国家信息，或指定国家信息，如需要也可以遍历国家信息查看！





```java
@Test
public void testLocale(){

    Locale locale = Locale.getDefault();

    // 获取系统默认的国家语言信息
    System.out.println(locale); // zh_CN

    // 所有可用的语言信息！
    //        for (Locale availableLocale : Locale.getAvailableLocales()) {
    //            System.out.println(availableLocale);
    //        }

    // 指定获取某国
    System.out.println(Locale.CHINA);
    System.out.println(Locale.US);

}
```





## 4、ResourceBundle介绍



> 根据给定的baseName和Locale读取相应的配置文件，得到文字信息!





```java
@Test
public void testI18n(){
    // 获取Locale对象
    //        Locale locale = Locale.US;
    Locale locale = Locale.CHINA;
    // 通过指定的 basename 和 Locale 对象，读取 相应的配置文件
    ResourceBundle bundle = ResourceBundle.getBundle("i18n", locale);

    System.out.println("username：" + bundle.getString("username"));
    System.out.println("password：" + bundle.getString("password"));
    System.out.println("Sex：" + bundle.getString("sex"));
    System.out.println("age：" + bundle.getString("age"));
}
```







## 5、通过请求头国际化页面



**使用**：在需要处理语言的地方 `<%=i18n.getString("xxx")%>`，获取对应的语言字符串！



**jsp页面：**



```jsp
<%

    // 方案一：从请求头获取语言信息自动识别
    // accept-language: zh-CN,zh;q=0.9

    // 从请求头中获取 Locale 信息（语言）
    Locale locale = request.getLocale();
    System.out.println(locale);
    // 获取读取包（根据 指定的 baseName 和 Locale 读取 语言信息）
    ResourceBundle i18n = ResourceBundle.getBundle("i18n", locale);

    // 获取读取包（根据 指定的 baseName 和 Locale 读取 语言信息）
    ResourceBundle i18n = ResourceBundle.getBundle("i18n", locale);
%>
      
```







## 6、通过显示的选择语言类型进行国际化



> 通过页面的按钮显示的发送请求参数`country=xxx`！



**使用**：在需要处理语言的地方 `<%=i18n.getString("xxx")%>`，获取对应的语言字符串！



**jsp页面：**





```jsp
<a href="i18n.jsp?country=cn">中文</a>|
<a href="i18n.jsp?country=usa">english</a>
```





```jsp
<%
	// 方案二：通过点击给地址传参country确定
    // 从请求头中获取 Locale 信息（语言）
    Locale locale = null;
    String country = request.getParameter("country");
    if ("cn".equals(country)) {
        locale = Locale.CHINA;
    } else if ("usa".equals(country)) {
        locale = Locale.US;
    } else {
        locale = request.getLocale();
    }
    // 获取读取包（根据 指定的 baseName 和 Locale 读取 语言信息）
    ResourceBundle i18n = ResourceBundle.getBundle("i18n", locale);
%>
```







## 7、JSTL 标签库实现国际化



> 记得引入`<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>`，当然IDE会自动引入！



**使用**：在需要处理语言的地方 `<fmt:message key="xxx" />`，获取对应的语言字符串！



**jsp页面：**



```jsp
<a href="i18n_fmt.jsp?locale=zh_CN">中文</a>|
<a href="i18n_fmt.jsp?locale=en_US">english</a>
```



```jsp
<%--1 使用标签设置 Locale 信息--%>
    
<fmt:setLocale value="${param.locale}" />
    
<%--2 使用标签设置 baseName--%>
    
<fmt:setBundle basename="i18n"/>
    
<%--3 输出指定 key 的国际化信息--%>
    
<fmt:message key="username" />
```





