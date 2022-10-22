---
title: JavaWeb之Filter过滤器、ThreadLocal的使用
author: ITNXD
toc: true
abbrlink: 24926
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/d318c7b9707b249e866ceabe5c169fc9.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/d318c7b9707b249e866ceabe5c169fc9.png
categories: JavaWeb
tags:
  - Filter
  - ThreadLocal
date: 2021-03-18 17:29:01
updated:
---





# 一、Filter









## 1、概述







1. Filter 过滤器它是 JavaWeb 的三大组件之一。三大组件分别是：Servlet 程序、Listener 监听器、Filter 过滤器。
2. Filter 过滤器它是 JavaEE 的规范。也就是接口。
3. Filter 过滤器它的作用是：**拦截请求，过滤响应。**



**拦截请求常见的应用场景有：**

1. 权限检查
2. 日记操作
3. 事务管理













## 2、Filter使用





**Filter 过滤器的使用步骤：**

1. 编写一个类去实现 Filter 接口
2. 实现过滤方法 doFilter()
3. 到 web.xml 中去配置 Filter 的拦截路径





**AdminFilter.java：**





- doFilter方法中的`filterChain.doFilter()`方法必须要写，可以让未被拦截的请求继续向下执行，若不写该方法，则不被拦截的请求也无法访问到目标资源文件！具体原理请看下方的Filter实现原理图示！





```java
public class AdminFilter implements Filter {

    public AdminFilter(){
        System.out.println("1. 构造器方法");
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("2. 初始化方法");
    }

    /**
     * 专门用于拦截请求！可以处理权限检查！
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        System.out.println("3. doFilter方法");

        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpSession session = httpServletRequest.getSession();

        Object user = session.getAttribute("user");
        if(user == null){
			// 未登录则转发到登录页面
            servletRequest.getRequestDispatcher("/login.jsp").forward(servletRequest, servletResponse);
        }else{
            // 登录则放行：让用户继续访问!
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }

    @Override
    public void destroy() {
        System.out.println("5. 销毁方法");
    }
}
```







**web.xml：**



- `url-pattern`：配置拦截路径，拦截到的请求使用Filter实现类中的doFilter()方法捕捉处理！



```xml
<filter>
    <filter-name>AdminFilter</filter-name>
    <filter-class>com.atguigu.filter.AdminFilter</filter-class>
</filter>

<!--配置filter过滤器的拦截路径！-->
<filter-mapping>
    <!--表示当前的拦截路径给哪个filter使用！-->
    <filter-name>AdminFilter</filter-name>
    <!--
        配置拦截路径！
        / 映射到工程的web目录
        /* 表示匹配该目录下所有文件
        -->
    <url-pattern>/admin/*</url-pattern>
</filter-mapping>
```









**Filter实现原理：**





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/846f506a4971c87179c8935f8699472d.png)





## 3、Filter生命周期







1. 构造器方法
2. init 初始化方法（前两步web工程启动时执行，Filter已经创建）
3. doFilter 过滤方法，每次拦截到请求，就会执行
4. destroy 销毁，停止 web 工程的时候，就会执行（停止 web 工程，也会销毁 Filter 过滤器）







## 4、FilterConfig类









> Filter 过滤器的配置文件类。
>
> Tomcat 每次创建 Filter 的时候，也会同时创建一个 FilterConfig 类，这里包含了 Filter 配置文件的配置信息。



**FilterConfig 类的作用是获取 filter 过滤器的配置内容：**

1. 获取 Filter 的名称 filter-name 的内容
2. 获取在 Filter 中配置的 init-param 初始化参数
3. 获取 ServletContext 对象









**web.xml配置初始化参数：**



```xml
<filter>
    <filter-name>AdminFilter</filter-name>
    <filter-class>com.atguigu.filter.AdminFilter</filter-class>
    <!--这里配置init-param参数-->
    <init-param>
        <param-name>username</param-name>
        <param-value>itnxd</param-value>
    </init-param>
</filter>

<filter-mapping>
    <filter-name>AdminFilter</filter-name>
    <url-pattern>/admin/*</url-pattern>
</filter-mapping>
```







**获取配置信息：**



```java
@Override
public void init(FilterConfig filterConfig) throws ServletException {
    System.out.println("2. 初始化方法");

    // FilterConfig类的使用：

    // 1、获取 Filter 的名称 filter-name 的内容

    String filterName = filterConfig.getFilterName();
    System.out.println("filter-name的值是：" + filterName);

    // 2、获取在 Filter 中配置的 init-param 初始化参数

    String username = filterConfig.getInitParameter("username");
    System.out.println("初始化参数的username的值是：" + username);

    // 3、获取 ServletContext 对象

    System.out.println(filterConfig.getServletContext());

}
```









## 5、FilterChain过滤器链



> 多个过滤器时候的执行顺序！



**多个过滤器时执行过程图示：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/18/d690988ed033ff5eeb71c9e4ec0f95e1.png)











**Filter1代码：**





```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter1的前置代码1");
    System.out.println("Filter1的线程：" + Thread.currentThread().getName());

    filterChain.doFilter(servletRequest, servletResponse);

    System.out.println("Filter1的线程：" + Thread.currentThread().getName());
    System.out.println("Filter1的后置代码2");
}
```







**Filter2代码：**



```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter2的前置代码1");
    System.out.println("Filter2的线程：" + Thread.currentThread().getName());

    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Filter2的线程：" + Thread.currentThread().getName());

    System.out.println("Filter2的后置代码2");
}
```





**总结：** 这些总结可以根据上方图示来理解！



  1. Filter执行顺序由web.xml顺序决定
  2. 若删除Filter2的filterChain.doFilter方法，则访问不到资源，直接跳回Filter1
  3. 若删除Filter1的filterChain.doFilter方法，则Filter2也无法执行
  4. 同一个拦截目标经过的Filter**共用一个线程**
  5. 同一个拦截目标经过的Filter中的request域共用(**一次请求，一次响应**)





## 6、拦截路径





1. 精确匹配 `1.html`
2. 目录匹配 `admin/*`
3. 后缀名匹配 `*.jsp`



注意：

- `url-pattern`标签可以有多个！
- Filter过滤器它只关心请求的地址是否匹配，不关心请求的资源是否存在！





```xml
<filter>
    <filter-name>Filter2</filter-name>
    <filter-class>com.atguigu.filter.Filter2</filter-class>
</filter>
<filter-mapping>
    <filter-name>Filter2</filter-name>
    <url-pattern>/target.jsp</url-pattern>
    <url-pattern>/admin/*</url-pattern>
    <url-pattern>/*.html</url-pattern>
</filter-mapping>

```





















# 二、ThreadLocal









## 1、概述





1. ThreadLocal 的作用，它可以解决**多线程的数据安全问题**。
2. ThreadLocal 它可以给当前线程关联一个数据（可以是普通变量，可以是对象，也可以是数组，集合）
3. **可以用来处理项目中的数据库事务问题，即始终使用ThreadLocal维护一个Connection连接，可以进行事务管理！**





**补充**：对于数据库事务问题，据我理解，只要所有数据库操作都传入一个连接对象，且不在操作中进行关闭连接就可以达到事务操作的目的！**[正如康师傅的JDBC中的考虑事务操作的通用增删改查的实现，点击这里！](https://www.itnxd.cn/posts/49844.html#%E5%85%AD%E3%80%81%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BA%8B%E5%8A%A1)**







## 2、ThreadLocal 特点







1. ThreadLocal 可以为当前线程关联一个数据。（它可以像 Map 一样存取数据，**key 为当前线程**）
2. 每一个 ThreadLocal 对象，只能为当前线程关联一个数据，如果要为当前线程关联多个数据，就需要使用多个ThreadLocal 对象实例。
3. 每个 ThreadLocal 对象实例定义的时候，一般都是 static 类型
4. ThreadLocal 中保存数据，在线程销毁后。会由 JVM 虚拟自动释放。







## 3、ThreadLocal使用





- ThreadLocal中定义了set、get、remove方法，用来关联 / 取出 / 移除数据



**ThreadLocalTest类：**



该类中调用多个线程分别使用ThreadLocal绑定一个随机数，会发现每个线程始终绑定一个随机数，即使在该线程结束前调用别的类，在别的类中打印线程名和绑定的值仍然是一样的！





> 作用主要就是为了解决多线程问题，只要该ThreadLocal没有结束前，使用是一个线程，绑定的内容也是唯一的！







```java
public class ThreadLocalTest {

    // ConcurrentHashMap是线程安全的Map！
//    public static Map<String, Object> map = new ConcurrentHashMap<>();
    // 或 public static Map<String, Object> mao = new Hashtable<>();

    // 使用ThreadLocal，key为当前线程！
    public static ThreadLocal<Object> threadLocal = new ThreadLocal<>();


    private static Random random = new Random();

    public static class Task implements Runnable{

        @Override
        public void run() {

            // 在 Run 方法中，随机生成一个变量（线程要关联的数据），然后以当前线程名为 key 保存到 map 中
            Integer i = random.nextInt(1000);
            String name = Thread.currentThread().getName();

            System.out.println("线程【"+ name +"】生成的随机数是：" + i);
//            map.put(name, i);
            threadLocal.set(i);

            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            new OrderService().createOrder();

            // 在 Run 方法结束之前，以当前线程名获取出数据并打印。查看是否可以取出操作
//            Object value = map.get("name");
            Object value = threadLocal.get();
            System.out.println("在线程【"+ name +"】快结束时得到的随机数是：" + i);
        }
    }

    public static void main(String[] args) {
        Task task = new Task();
        for(int i = 0; i < 3; i ++){
            new Thread(task).start();
        }
    }

}
```



**OrderService类：**



```java
public class OrderService {

    public void createOrder(){
        String name = Thread.currentThread().getName();
//        System.out.println("当前线程【"+ name +"】保存的数据是：" + ThreadLocalTest.map.get(name));
        System.out.println("当前线程【"+ name +"】保存的数据是：" + ThreadLocalTest.threadLocal.get());
    }

}
```







# 三、Tomcat配置错误页面





- error-code：错误码（404，500）
- location：错误时要跳转的路径



```xml
<!--error-page 标签配置，服务器出错之后，自动跳转的页面-->
<error-page>
	<!--error-code 是错误类型-->
	<error-code>500</error-code>
	<!--location 标签表示。要跳转去的页面路径-->
	<location>/pages/error/error500.jsp</location>
</error-page>

<!--error-page 标签配置，服务器出错之后，自动跳转的页面-->
<error-page>
    <!--error-code 是错误类型-->
    <error-code>404</error-code>
    <!--location 标签表示。要跳转去的页面路径-->
    <location>/pages/error/error404.jsp</location>
</error-page>
```























