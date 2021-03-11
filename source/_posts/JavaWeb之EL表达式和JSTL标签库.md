---
title: JavaWeb之EL表达式和JSTL标签库
author: ITNXD
toc: true
abbrlink: 12961
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@b9476a848aaa5e5b4eb55f2c162e138184cc4f88/2021/03/11/3bf3e14497a262785628aa9f76a3386e.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@b9476a848aaa5e5b4eb55f2c162e138184cc4f88/2021/03/11/3bf3e14497a262785628aa9f76a3386e.png
categories:
  - JavaWeb
tags:
  - EL
  - JSTL
date: 2021-03-11 17:19:55
updated:
---





# 一、EL表达式









## 1、EL表达式概述







> - EL 表达式的全称是：Expression Language。是表达式语言。
> - EL 表达式的什么作用：EL 表达式主要是**代替 jsp 页面中的表达式脚本在 jsp 页面中进行数据的输出。**
> - 因为 EL 表达式在输出数据的时候，要比 jsp 的表达式脚本要简洁很多。
> - EL 表达式的格式是：`${表达式}`
> - EL 表达式在输出 null 值的时候，输出的是空串。jsp 表达式脚本输出 null 值的时候，输出的是 null 字符串。





```jsp
<%
	request.setAttribute("key1", "value1");
%>

表达式脚本输出：<%=request.getAttribute("key1")%> <br>
<%-- 放入key值即可！ --%>
EL表达式输出：${key1} <br>

表达式脚本输出：<%=request.getAttribute("key2")%> <br>
EL表达式输出：${key2} <br>
表达式脚本判空输出：<%=request.getAttribute("key2") == null ? "" : request.getAttribute("key2")%> <br>
```









## 2、EL表达式搜索域数据的顺序



> EL 表达式主要是在 jsp 页面中输出数据。主要是输出域对象中的数据。
>
> 当四个域中都有相同的 key 的数据的时候，EL 表达式会按照四个域的从小到大的顺序去进行搜索，找到就输出。



```jsp
<%
    // 往四个域中都分别保存了数据
    pageContext.setAttribute("key", "pageContext");
    request.setAttribute("key", "request");
    session.setAttribute("key", "session");
    application.setAttribute("key", "application");
%>

<%--
    按照作用域范围大小，从小到大，就近原则去取！
    注意：session需要关闭浏览器才会销毁！
    application需要重启服务器才会销毁！
--%>

${key}
```







## 3、EL表达式输出Java类



> EL 表达式输出 Bean 的普通属性，数组属性。List 集合属性，map 集合属性！
>
> **注意：EL表达式是通过对应属性的get方法获取的！没有对应的get方法则无法访问！`boolean`类型通过`is`方法获得！**



```java
public class Person {
    private String name;
    private String[] phones;
    private List<String> cities;
    private Map<String,Object> map;
	
	.....
}
```



**示例如下：**



```jsp
<body>

    <%
        Person person = new Person();
        person.setName("ITNXD");
        person.setPhones(new String[]{"18610541354","18688886666","18699998888"});
        List<String> cities = new ArrayList<String>();
        cities.add("北京");
        cities.add("上海");
        cities.add("深圳");
        person.setCities(cities);
        Map<String,Object> map = new HashMap<>();
        map.put("key1","value1");
        map.put("key2","value2");
        map.put("key3","value3");
        person.setMap(map);pageContext.setAttribute("p", person);
    %>

    输出 Person：${ p }<br/>
    输出 Person 的 name 属性：${p.name} <br>
    输出 Person 的 pnones 数组属性值：${p.phones[2]} <br>
    输出 Person 的 cities 集合中的元素值：${p.cities} <br>
    输出 Person 的 List 集合中个别元素值：${p.cities[2]} <br>
    输出 Person 的 Map 集合: ${p.map} <br>
    输出 Person 的 Map 集合中某个 key 的值: ${p.map.key3} <br>

    <%--EL表达式是通过get方法获取的！没有对应的get方法则无法访问！--%>

    输出 Person 的 age 属性：${p.age} <br>

</body>
```







## 4、EL表达式运算





#### 4.1、关系运算



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@49204176293f4b911e724e57064cc4977c995c47/2021/03/11/6b5685971f99452bed99efb2685dca71.png)



#### 4.2、逻辑运算





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@876d8c87ebc278f37d8068a1255cf946660cc26a/2021/03/11/20799829d9c3118d16aa21df4fbb1148.png)





#### 4.3、算术运算





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d6f58e42fbef58b58b27ada64b4e76e8b3cd7fe5/2021/03/11/62d7181c62997a8d09aa771b8c04c941.png)



#### 4.4、empty运算



> empty 运算可以判断一个数据是否为空，如果为空，则输出 true,不为空输出 false。



**以下几种情况为空：**

1. 值为 null 值的时候，为空
2. 值为空串的时候，为空
3. 值是 Object 类型数组，长度为零的时候
4. list 集合，元素个数为零
5. map 集合，元素个数为零



```jsp
<%
    request.setAttribute("key1", null);
    request.setAttribute("key2", new Object());

    request.setAttribute("key3", "");

    request.setAttribute("key4", new Object[]{});

    request.setAttribute("key5", new ArrayList<Integer>());

    request.setAttribute("key6", new HashMap<String, Integer>());
%>

${empty key1}
${empty key2}
${empty key3}
${empty key4}
${empty key5}
${empty key6}
```





#### 4.5、三元运算符





格式：`表达式 1？表达式 2：表达式 3`

如果表达式 1 的值为真，返回表达式 2 的值，如果表达式 1 的值为假，返回表达式 3 的值。





```jsp
${ 12 != 12 ? "不等于":"等于" }
```





#### 4.6、“.”点运算 和 [] 中括号运算符





> `.`点运算，可以输出 Bean 对象中某个属性的值。
> `[]`中括号运算，可以输出有序集合中某个元素的值。
> **注意**：`[]`中括号运算，还可以输出 map 集合中 key 里含有**特殊字符**的 key 的值。





```jsp
<%
    Map<String,Object> map = new HashMap<String, Object>();
    map.put("a.a.a", "aaaValue");
    map.put("bb", "bbbValue");
    map.put("c-c-c", "cccValue");
    request.setAttribute("map", map);
%>

${map.bb}
<%--有特殊字符使用中括号括起来，并使用引号引起来，单双引号都可！--%>
${map["a.a.a"]}
<%--找不到c,则会以0运算，结果为0--%>
${map.c-c-c}
```









## 5、EL表达式11个隐含对象



> EL 个达式中 11 个隐含对象，是 EL 表达式中自己定义的，可以直接使用。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5dc7495ef506a39768b7573caadb704900bb4bd5/2021/03/11/0a7b79a55578b82a3e6b3ba53ab5493a.png)





#### 5.1、四个特定域对象使用



1. pageScope 

2. requestScope

3. sessionScope

4. applicationScope



```jsp
 <%
    pageContext.setAttribute("key1", "pageContext1");

    pageContext.setAttribute("key2", "pageContext2");
    request.setAttribute("key2", "request");
    session.setAttribute("key2", "session");
    application.setAttribute("key2", "application");
%>

<%--同样作用域问题，默认为最小作用域pageContext--%>
${key2}
<%--想要获取需要使用四个特定域对象！--%>
${requestScope.key2}
${sessionScope.key2}
${applicationScope.key2}
```













#### 5.2、pageContext 对象使用





>  `pageContext、pageContextImpl `它可以获取 jsp 中的九大内置对象：
>
> `Request,response,application,config,session,exception,out,page,pageContext`
>
> **注意：EL表达式默认去找对应属性的get方法！无需再次写get!**





1. request.getScheme()：它可以获取请求的协议
2. request.getServerName()：获取请求的服务器 ip 或域名
3. request.getServerPort()：获取请求的服务器端口号
4. getContextPath()：获取当前工程路径
5. request.getMethod()：获取请求的方式（GET 或 POST）
6. request.getRemoteHost()：获取客户端的 ip 地址
7. session.getId()：获取会话的唯一标识





```jsp
<%--org.apache.jasper.runtime.PageContextImpl@158751e5--%>
${pageContext}

<br>
<%=request.getScheme()%>

<br>

1. 协议： ${pageContext.request.scheme}<br>
2. 服务器 ip： ${pageContext.request.serverName}<br>
3. 服务器端口： ${pageContext.request.serverPort}<br>
4. 获取工程路径： ${pageContext.request.contextPath}<br>
5. 获取请求方法： ${pageContext.request.method}<br>
6. 获取客户端 ip 地址： ${pageContext.request.remoteHost}<br>
7. 获取会话的 id 编号： ${pageContext.session.id}<br>

<%
    /*简便写法，req就表示pageContext.request*/
    pageContext.setAttribute("req", request);
%>
1. 协议：<br> ${req.scheme}
```









#### 5.3、param、paramValues对象的使用



- `param Map<String,String>`： 它可以获取请求参数的值
- `paramValues Map<String,String[]>`： 它也可以获取请求参数的值，获取多个值的时候使用。



```jsp
<%--
    http://localhost:8080/11_EL_JSTL/f.jsp?username=itnxd&password=9999
    在后面添加参数即可获取到！
    {password=9999, username=itnxd}
--%>

${param}<br>

输出请求参数username的值：${param.username}<br>
输出请求参数password的值：${param.password}<br>

<%--
    {password=[Ljava.lang.String;@278ba21, username=[Ljava.lang.String;@cbf441e, hobby=[Ljava.lang.String;@880d151}
--%>
    
${paramValues}<br>

<%--
    例如hobby有多个值，则只能使用paramValues获取！
    http://localhost:8080/11_EL_JSTL/f.jsp?username=itnxd&password=9999&hobby=python&hobby=cpp&hobby=java


    输出请求参数username的值：itnxd
    输出请求参数password的值：9999
    输出请求参数hobby的值：[Ljava.lang.String;@4d824e25

--%>

输出请求参数username的值：${paramValues.username[0]}<br>
输出请求参数password的值：${paramValues.password[0]}<br>
<%--[Ljava.lang.String;@4d824e25--%>
输出请求参数hobby的值：${paramValues.hobby}<br>

输出请求参数hobby的值：${paramValues.hobby[0]}<br>
输出请求参数hobby的值：${paramValues.hobby[1]}<br>
输出请求参数hobby的值：${paramValues.hobby[2]}<br>

<%--
    遍历输出paramValues的值！
    讲到JSTL会有遍历！
--%>
```







#### 5.4、header、headerValues对象的使用



- header：它可以获取请求头的信息
- headerValues：它可以获取请求头的信息，它可以获取多个值的情况





```jsp
<%--
        请求头：

    {sec-fetch-mode=navigate, sec-fetch-site=none, accept-language=zh-CN,zh;q=0.9, cookie=JSESSIONID=1344E72E74FE9D73D18790C77093CCCD; goSessionid=OpXuceHmsYklJ-IXbQpZk1V23NRp2vhWhnruBe3I7aE%3D; Webstorm-9f808640=3b2f49b2-7084-46ed-84b3-60c2292a9e29; Idea-898f7731=e37b1876-f485-4481-921d-da5853ecd0c3; Webstorm-e01d478=665eb7b3-3726-4179-a46c-f044518546e5; Idea-898f7733=304f9d70-c0f4-4aa1-b403-f0137f8f5b27; Hm_lvt_8d3bd59bf6303bd5f44677445d369df5=1613967148,1614062180,1614999148,1615085606, sec-fetch-user=?1, accept=text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9, sec-ch-ua="Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99", sec-ch-ua-mobile=?0, host=localhost:8080, upgrade-insecure-requests=1, connection=keep-alive, cache-control=max-age=0, accept-encoding=gzip, deflate, br, user-agent=Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36, sec-fetch-dest=document}
--%>
    ${header}<br>

    <hr>

<%--
    {sec-fetch-mode=[Ljava.lang.String;@202f1058, sec-fetch-site=[Ljava.lang.String;@49b7b0c5, accept-language=[Ljava.lang.String;@66149d54, cookie=[Ljava.lang.String;@337032dd, sec-fetch-user=[Ljava.lang.String;@6b85493b, accept=[Ljava.lang.String;@1f40ed16, sec-ch-ua=[Ljava.lang.String;@5dfc3d97, sec-ch-ua-mobile=[Ljava.lang.String;@6fa81a2f, host=[Ljava.lang.String;@2e254a70, upgrade-insecure-requests=[Ljava.lang.String;@36953aff, connection=[Ljava.lang.String;@ab9b93f, cache-control=[Ljava.lang.String;@25efb325, accept-encoding=[Ljava.lang.String;@219d1b22, user-agent=[Ljava.lang.String;@3ec08f2c, sec-fetch-dest=[Ljava.lang.String;@79f7a98a}
--%>
    ${headerValues}<br>

    <hr>

    <%--特殊字符需要中括号[]和引号（单双都可）--%>
    输出请求头中的User-Agent：${header.User-Agent}<br> <%--0--%>
    <%--
        输出请求头中的User-Agent：Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
    --%>
    输出请求头中的User-Agent：${header["User-Agent"]}<br>
    输出请求头中的Connection：${header["Connection"]}<br>
    输出请求头中的Connection：${header.Connection}<br>

    使用headerValues输出请求头中的User-Agent：${headerValues["User-Agent"][0]}<br>
```





#### 5.5、cookie对象的使用



- cookie：它可以获取当前请求的 Cookie 信息





```jsp
<%--
    下方运行结果：

    {goSessionid=jakarta.servlet.http.Cookie@5d54917d, Idea-898f7731=jakarta.servlet.http.Cookie@66a38548, Webstorm-e01d478=jakarta.servlet.http.Cookie@4e123a21, Idea-898f7733=jakarta.servlet.http.Cookie@59f25158, JSESSIONID=jakarta.servlet.http.Cookie@20d4ec62, Webstorm-9f808640=jakarta.servlet.http.Cookie@5a27a4f5}
    jakarta.servlet.http.Cookie@91228a5
    获取cookie的名称：JSESSIONID
    获取cookie的值：0AF4F9558A6A7BD88594920E5999E181
--%>
    ${cookie}<br>

    ${cookie.JSESSIONID}<br>
    <%--调用cookie的getName()方法--%>
    获取cookie的名称：${cookie.JSESSIONID.name}<br>
    <%--调用cookie的getValue()方法--%>
    获取cookie的值：${cookie.JSESSIONID.value}<br>
```









#### 5.6、initParam对象使用



- initParam：它可以获取在 web.xml 中配置的`<context-param>`上下文参数



**web.xml：**



```xml
 <context-param>
     <param-name>username</param-name>
     <param-value>itnxd</param-value>
 </context-param>
 <context-param>
     <param-name>password</param-name>
     <param-value>89898989</param-value>
 </context-param>
```



**使用initParam获取参数：**



```jsp
<%--
    处理域数据！
    输出结果：
        {password=89898989, username=itnxd}
        输出<context-param>中username的值为：itnxd
        输出<context-param>中password的值为：89898989
--%>
    ${initParam}<br>

    输出&lt;context-param&gt;中username的值为：${initParam.username}<br>
    输出&lt;context-param&gt;中password的值为：${initParam.password}<br>
```













# 二、JSTL标签库





## 1、JSTL概述



> JSTL 标签库 全称是指 `JSP Standard Tag Library`  JSP标准标签库。是一个不断完善的开放源代码的 JSP 标签库。
>
> EL 表达式主要是为了替换 jsp 中的表达式脚本，而标签库则是为了替换代码脚本。这样使得整个 jsp 页面变得更佳简洁。







**分类，五个不同标签库：**



目前只使用第一个核心库！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@62ab576b163bed3bd682e6b5be1b6e8c3c6c7527/2021/03/11/c4a315200425e05471990e0275e601aa.png)





## 2、JSTL配置



> 由于没有使用Mavent会有一堆版本问题！
>
> 先去下方`stackoverflow`查看**各个版本的解决方案**！



**Tomcat10安装JSTL非Maven用户可用：[stackoverflow的解决方案，点击这里!](https://stackoverflow.com/questions/4928271/how-to-install-jstl-the-absolute-uri-http-java-sun-com-jstl-core-cannot-be-r/4928309#4928309)**
    

**两个包下载地址：**



- `jakarta.servlet.jsp.jstl`：[https://repo.maven.apache.org/maven2/jakarta/servlet/jsp/jstl/jakarta.servlet.jsp.jstl-api/](https://repo.maven.apache.org/maven2/org/glassfish/web/jakarta.servlet.jsp.jstl/)
- `jakarta.servlet.jsp.jstl-api`：[https://repo.maven.apache.org/maven2/jakarta/servlet/jsp/jstl/jakarta.servlet.jsp.jstl-api/](https://repo.maven.apache.org/maven2/jakarta/servlet/jsp/jstl/jakarta.servlet.jsp.jstl-api/)





**在 jsp 标签库中使用 taglib 指令引入标签库：**





```jsp
CORE 标签库：<%@ taglib prefix=“c” uri=“http://java.sun.com/jsp/jstl/core” %>

XML 标签库：<%@ taglib prefix=“x” uri=“http://java.sun.com/jsp/jstl/xml” %>

FMT 标签库：<%@ taglib prefix=“fmt” uri=“http://java.sun.com/jsp/jstl/fmt” %>

SQL 标签库：<%@ taglib prefix=“sql” uri=“http://java.sun.com/jsp/jstl/sql” %>

FUNCTIONS 标签库：<%@ taglib prefix=“fn” uri=“http://java.sun.com/jsp/jstl/functions” %>
```





## 3、JSTL核心库





#### 2.1、set（使用很少）



> **作用**：set 标签可以往域中保存数据
>
> **格式**：`域对象.setAttribute(key,value)`



**scope 属性设置保存到哪个域：**
    

1. page：表示 PageContext 域（默认值）
2. request：表示 Request 域
3. session：表示 Session 域
4. application：表示 ServletContext 域





- var 属性设置 key
- value 属性设置 value



```jsp
保存之前：${pageScope.key1}<br>
<c:set scope="page" var="key1" value="value1"/>
保存之后：${pageScope.key1}<br>
```





#### 2.2、if



> if 标签用来做 if 判断。
>
> - test 属性表示判断的条件（使用 EL 表达式输出）



```jsp
<c:if test="${12 == 12}">
    <h1>12等于12</h1>
</c:if>
<c:if test="${12 != 12}">
    <h1>12不等于12</h1>
</c:if>
```









#### 2.2、choose、when、otherwise



> **作用**：多路判断。类似`switch ... case .... default` 



1. choose：标签开始选择判断
2. when：标签表示每一种判断情况（无需`switch`的`break`操作）
3. test：属性表示当前这种判断情况的值（一般使用EL表达式）
4. otherwise：标签表示剩下的情况



**注意的点：**



- 标签里不能使用 html 注释，要使用 jsp 注释
- when 标签的父标签一定要是 choose 标签

   





```jsp
 <%
request.setAttribute("height", 180);
%>
<c:choose>
    <%--<!-- 这是 html 注释, 会报错 -->--%>
    <%--jsp注释才可以！--%>
    <c:when test="${ requestScope.height > 190 }">
        <h2>小巨人</h2>
    </c:when>
    <c:when test="${ requestScope.height > 180 }">
        <h2>很高</h2>
    </c:when>
    <c:when test="${ requestScope.height > 170 }">
        <h2>还可以</h2>
    </c:when>
    <c:otherwise>
        <%--套娃一定要加<c:choose>标签！--%>
        <c:choose>
            <c:when test="${requestScope.height > 160}">
                <h3>大于 160</h3>
            </c:when>
            <c:when test="${requestScope.height > 150}">
                <h3>大于 150</h3>
            </c:when>
            <c:when test="${requestScope.height > 140}">
                <h3>大于 140</h3>
            </c:when>
            <c:otherwise>
                其他小于 140
            </c:otherwise>
        </c:choose>
    </c:otherwise>
</c:choose>
```







#### 2.4、forEach



> 用于遍历！



1. begin：属性设置开始的索引
2. end：属性设置结束的索引
3. var：属性表示循环的变量(也是当前正在遍历到的数据)
4. items：表示遍历的数据源（遍历的集合）
5. step：属性表示遍历的步长值
6. varStatus：属性表示当前遍历到的数据的状态





**varStatus的常用方法：** 同样无需`get`和`is`，自动去找对应的`get`和`is`方法！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4b3f0884355aa8042e770b3bddc08a5d78f74793/2021/03/11/c2e3d2daa238d1c4c9714b875b711322.png)





```jsp
<%--简单遍历--%>
<table border="1" cellspacing="0">
    <c:forEach begin="1" end="10" var="i">
        <tr>
            <td>第${i}行</td>
        </tr>
    </c:forEach>
</table>

<%--遍历数组--%>
<%
	request.setAttribute("arr", new String[]{"11", "22", "33"});
%>

<c:forEach items="${requestScope.arr}" var="item">
    ${item}<br>
</c:forEach>

<%--遍历集合--%>
<%
    Map<String, Integer> hashMap = new HashMap<>();
    hashMap.put("AA", 11);
    hashMap.put("BB", 22);
    hashMap.put("CC", 33);
    //        for ( Map.Entry<String,Integer> entry : hashMap.entrySet()) {}
    request.setAttribute("map", hashMap);
%>

<c:forEach items="${requestScope.map}" var="entry">
    <h1>${entry}<h1/>
    <%--这里调用的仍是对应的get方法！--%>
    <h3>key = ${entry.key}，value = ${entry.value}</h3>
</c:forEach>
 
<%--遍历List--%>
<%
    List<Student> stu = new ArrayList<>();
    for(int i = 1; i <= 10; i++) {
        stu.add(new Student(i, "name" + i, "pwd" + i, 18 + i, "phone" + i));
    }
    request.setAttribute("stu", stu);
%>

<table border="1" cellspacing="0" width="600">
    <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>密码</th>
        <th>年龄</th>
        <th>电话</th>
        <th>操作</th>
    <tr>
		<c:forEach begin="2" end="9" step="2" varStatus="status" items="${requestScope.stu}" var="stu">
            <tr>
                <td>${stu.id}</td>
                <td>${stu.username}</td>
                <td>${stu.password}</td>
                <td>${stu.age}</td>
                <td>${stu.phone}</td>
                <td>${status}</td>
                <%--
    
    			varStatus的常用方法使用：
    
                <td>${status.current}</td>
                <td>${status.index}</td>
                <td>${status.count}</td>
                <td>${status.firsh}</td>
                <td>${status.last}</td>
                <td>${status.begin}</td>
                <td>${status.end}</td>
                <td>${status.step}</td>
                --%>
            </tr>
        </c:forEach>
</table>
```











