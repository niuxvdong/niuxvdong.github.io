---
title: 持久化层数据库框架-MyBatis使用总结
author: ITNXD
toc: true
abbrlink: 33442
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/5f345a4085a6573345ec63d7be527cb2.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/5f345a4085a6573345ec63d7be527cb2.png
categories:
  - 开发框架
tags:
  - MyBatis
  - PageHelper
date: 2021-04-09 15:18:18
updated:
---









# 一、MyBatis简介





> MyBatis，和数据库进行交互的持久化层框架（SQL映射框架）
>
> 官方文档也很详细：[点击这里！](https://mybatis.org/mybatis-3/zh/)







**MyBatis特点：**



1. MyBatis将重要的步骤抽取出来可以人工定制，其他步骤自动化
2. 重要步骤都是写在配置文件中(好维护) 
3. 完全解决数据库的优化问题
4. MyBatis底层就是对原生JDBC的一个简单封装
5. 既将java编码与sq|抽取了出来,还不会失去自动化功能;半自动的持久化层框架





**实现原理图示：** 复杂场景可以实现手动！半自动



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/a1b6b194c6439e39313c38b37acc6484.png)









# 二、MyBatis搭建





## 1、数据库建表和对应JavaBean（略）





## 2、pom.xml导包



> 导入MyBatis、数据库驱动、以及log4j依赖！



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itnxd.mybatis</groupId>
    <artifactId>3_MyBatis</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>14</maven.compiler.source>
        <maven.compiler.target>14</maven.compiler.target>
    </properties>

    <dependencies>
        <!--MyBatis-->
        <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.6</version>
        </dependency>
        <!--数据库驱动-->
        <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.23</version>
        </dependency>
        <!--loj4j日志，可以显示sql语句！-->
        <!-- https://mvnrepository.com/artifact/log4j/log4j -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>


        <!--Junit-->
        <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.8.0-M1</version>
            <scope>test</scope>
        </dependency>

    </dependencies>

</project>
```





## 3、创建log4j配置文件





> 在maven工程的resources目录下新建log4j.xml文件（名字固定），这样可以在运行程序时显示更详细的信息，会有发送的sql语句提示信息！
>
> 在mybatis配置文件中加入`<setting name="logImpl" value="LOG4J"/>`即可！



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">

<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">

 <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
   <param name="Encoding" value="UTF-8" />
   <layout class="org.apache.log4j.PatternLayout">
    <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m  (%F:%L) \n" />
   </layout>
 </appender>
 <logger name="java.sql">
   <level value="debug" />
 </logger>
 <logger name="org.apache.ibatis">
   <level value="info" />
 </logger>
 <root>
   <level value="debug" />
   <appender-ref ref="STDOUT" />
 </root>
</log4j:configuration>
```



## 4、创建mybatis配置文件





> 在maven工程的resources目录下新建mybatis-config.xml配置文件（名字任意）！



**注意**：

- dtd: 配置文件约束

- 配置文件 configuration 中的元素，不但有类型限制，也有顺序限制。必须按照：



```
properties?,settings?,typeAliases?,typeHandlers?,objectFactory?,objectWrapperFactory?,reflectorFactory?,plugins?,environments?,databaseIdProvider?,mappers?
```





````xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<!--
dtd: 配置文件约束！

配置文件 configuration 中的元素，不但有类型限制，也有顺序限制。必须按照
The content of element type "configuration" must match "(properties?,settings?,typeAliases?,typeHandlers?,objectFactory?,objectWrapperFactory?,reflectorFactory?,plugins?,environments?,databaseIdProvider?,mappers?)".
-->

<configuration>
    
	<settings>
        <setting name="logImpl" value="LOG4J"/>
    </settings>

    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <!--配置连接池-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="xxx"/>
            </dataSource>
        </environment>
    </environments>

</configuration>
````



## 5、创建sql映射文件





> 在maven工程的resources目录下新建EmployeeDao.xml（名称与Dao接口名称一致）！
>
> 该文件作为Dao的实现，类似之前的EmployeeDaoImpl实现类！



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!--
namespace:名称空间:写接口的全类名，相当于告诉MyBatis这个配置文件是实现哪个接口的;
-->
<mapper namespace="com.itnxd.dao.EmployeeDao">
    <!-- Employee getEmpById(Integer id); -->
    <!--
    select:用来定义一个查询操作
    id:方法名，相当于这个配置是对于某个方法的实现
    resultType :指定方法运行后的返回值类型(全类名); (查询操作必须指定的)
                可以配置typeAliases属性指定别名！
    #{属性名}:代表取出传递过来的某个参数的值
    参数也无需写！
    -->
    <select id="getEmpById" resultType="com.itnxd.bean.Employee">
        /*sql语句不要写分号*/
        select * from t_employee where id = #{id}
    </select>

    <!--
    增删改不用谢返回值类型！自动的！直接返回影响多少行！
        增删改不用写返回值类型;增删改是返回影响多少行
        mybatis自动判断，如果是数字(int, 1ong)
        如果是boolean (影响0行自动封装false,否则true)

    -->
    <delete id="deleteEmployee">
        delete from t_employee where id = #{id}
    </delete>

    <update id="updateEmployee">
        update t_employee set empname = #{empname},
                              gender = #{gender},email = #{email} where id = #{id}
    </update>

    <insert id="insertEmployee">
        insert into t_employee(empname, gender, email)
        values(#{empname}, #{gender}, #{email})
    </insert>
</mapper>
```







## 6、将sql映射文件注册到mybatis中





> 在mybatis-config.xml中注册sql映射文件位置！



```xml
    
	<!--
	引入我们自己编写的每一个接口的实现文件
    resource :表示从类路径下找资源
    -->
    <mappers>
        <mapper resource="EmployeeDao.xml"/>
    </mappers>
```





## 7、测试







```java
// 查询测试
@Test
public void test1() throws IOException {

    // 1. 根据全局配置文件创建出一个SqlSessionFactory
    // SqlSessionFactory:是SqlSession工厂，负责创建SqlSession对象;
    // SqlSession:sq1会话(代表和数据库的一次会话)
    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    // 2. 获取和数据库的一次会话,类似getConnection
    // 参数可以添加true或false，表示是否自动提交！
    try (SqlSession session = sqlSessionFactory.openSession()) {

        // 3、使用SqlSession操作数据库，获取到dao接口的实现
        EmployeeDao employeeDao = session.getMapper(EmployeeDao.class);

        // 4. 调用Dao方法
        Employee emp = employeeDao.getEmpById(3);
        System.out.println(emp);
    } catch (Exception e) {
        e.printStackTrace();
    }

}

// 增删改测试
@Test
public void test2() throws IOException {

    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    try (SqlSession session = sqlSessionFactory.openSession()) {
        EmployeeDao employeeDao = session.getMapper(EmployeeDao.class);
        // 查
        Employee emp = employeeDao.getEmpById(1);
        System.out.println(emp);
        // 改
        int i = employeeDao.updateEmployee(new Employee(1, "itnxd", 1, "itnxd@gmail.com"));
        System.out.println(i);
        // 增
        int i1 = employeeDao.insertEmployee(new Employee(null, "admin", 1, "admin@gmail.com"));
        System.out.println(i1);
        // 删
        int i2 = employeeDao.deleteEmployee(1);
        System.out.println(i2);

        // 需要手动提交，也可在openSession方法中传入true实现自动提交！
        session.commit();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```







# 三、MyBatis全局配置文件



> [官方全局配置文件详解，点击这里！](https://mybatis.org/mybatis-3/zh/configuration.html)





## 1、properties



> 引入外部配置文件！
>
> 如下方为引入数据库配置信息文件，可以在environment中使用`${}`获取值！



```xml
<!--
1. properties
和Spring的context: property-placeholder;引用外部配置文件

resource:从类路径下开始引用
url:引用磁盘路径或者网络路径的资源
-->
<properties resource="dbconfig.properties"/>
```









## 2、settings





> [settings属性的各类设置，可以设置许多东西，官方地址，点击这里！](https://mybatis.org/mybatis-3/zh/configuration.html#settings)
>
> settings这是MyBatis中极为重要的调整设置，它们会改变MyBatis的运行时行为。





```xml
<settings>
    <!--
        mapUnderscoreToCamelCase：驼峰命名开启
        JavaBean为loginAccount
        sql为login_account
        自动映射
    -->
    <!--开启日志打印sql-->
    <setting name="logImpl" value="LOG4J"/>
    <!--开启驼峰命名-->
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    <!--开启延迟加载-->
    <setting name="lazyLoadingEnabled" value="true"/>
    <!--开启属性延迟加载

        开启时，任一方法的调用都会加载该对象的所有延迟加载属性。
        否则，每个延迟加载属性会按需加载
    -->
    <setting name="aggressiveLazyLoading" value="false"/>

    <!--开启全局缓存，默认为true,但最好显示开启-->
    <setting name="cacheEnabled" value="true"/>
</settings>
```







## 3、typeAliases（了解）



> 类型别名，可以为常用的类型(JavaBean)起别名！
>
> 一些官方别名：[查看这里，防止被你占用！](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)



**推荐：使用全类名，而不是别名！**



```xml
<typeAliases>
    <!--
    typeAlias:就是为一个javaBean起别名;
    别名默认就是类名(不区分大小写)
    也可以使用alias指定别名
    <typeAlias type="com.itnxd.bean.Employee" alias=""/>

    批量起别名
    批量起别名; name=""指定包名,默认别名就是类名(不区分大小写)

    仍然想要起别名，在类上使用@Alias注解

    推荐：使用全类名，可以点击，快速定位！
    -->
    <package name="com.itnxd.bean"/>
</typeAliases>
```







## 4、typeHandlers（了解）



> MyBatis 在设置预处理语句（PreparedStatement）中的参数或从结果集中取出一个值时， 都会用类型处理器将获取到的值以合适的方式转换成 Java 类型！



```xml
<!--4. typeHandlers：
MyBatis 在设置预处理语句（PreparedStatement）中的参数或从结果集中取出一个值时，
 都会用类型处理器将获取到的值以合适的方式转换成 Java 类型
-->
<typeHandlers>
    <!--自定义好的类型处理器就这么配置上就行了-->
    <typeHandler handler=""/>
</typeHandlers>
```









## 5、plugins（了解）



> 插件，动态代理的使用，可以提供强大功能！







## 6、environments（了解）



> 配置一个具体环境，需要事务管理器 transactionManager 和数据源 dataSource（连接池）
>
> 做事务管理：mybatis不如spring，因此一般transactionManager标签不用配置。
>
> 数据库连接池：第三方连接池比默认的更强，因此这个一般也不用配置。



可以配置多个环境，使用 default 指定默认使用环境！



**后来的数据源和事务管理都是spring来做！**



```xml
<!--
6. environments，配置环境

environment：配置一个具体环境，需要事务管理器和数据源（连接池）
    transactionManager
    dataSource

default：指定默认使用环境

做事务管理：mybatis不如spring，因此一般transactionManager标签不用配置
数据库连接池：第三方连接池比默认的更强，因此这个一般也不用配置

后来的数据源和事务管理都是spring来做！
-->

<environments default="development">

    <!--id：当前环境的唯一标识-->
    <environment id="testEnv">
        <transactionManager type="JDBC"/>
        <!--配置连接池-->
        <dataSource type="POOLED">
            <!--使用${}取出配置文件值-->
            <property name="driver" value="${driverClass}"/>
            <property name="url" value="jdbc:mysql://192.168.1.1/test"/>
            <property name="username" value="${username}"/>
            <property name="password" value="${password}"/>
        </dataSource>
    </environment>

    <environment id="development">
        <transactionManager type="JDBC"/>
        <!--配置连接池-->
        <dataSource type="POOLED">
            <!--使用${}取出配置文件值-->
            <property name="driver" value="${driverClass}"/>
            <property name="url" value="${jdbcUrl}"/>
            <property name="username" value="${username}"/>
            <property name="password" value="${password}"/>
        </dataSource>
    </environment>
</environments>
```



## 7、databaseIdProvider



> 数据库厂商标识，mybatis用来处理数据库移植性的！
>
> type固定值：从官方文档扣过来即可！
>
> 去Dao.xml中增加各类数据库实现即可！





- 默认通过databaseId值区分数据库，若都不匹配执行没有添加databaseId属性的默认语句！
- 可以精确匹配就精确匹配，否则使用默认的模糊匹配！



```xml
<!--
7. 数据库厂商标识（databaseIdProvider）
mybatis用来考虑数据库移植性的

type固定值：从官方文档扣过来即可

去Dao.xml中增加各类数据库实现即可！

默认通过databaseId值区分数据库，若都不匹配执行没有添加databaseId属性的默认语句！
可以精确匹配就精确匹配，否则使用默认的模糊匹配！


-->
<databaseIdProvider type= "DB_VENDOR">
    <!--
    name:数据库厂商标识（固定值）
    value:给这个标识起一个好用的名字
            MySQL、Oracle、SQL Server;
    -->
    <property name= "MySQL" value="mysql"/>
    <property name= "SQL Server" value="sqlserver"/>
    <property name= "Oracle" value="oracle"/>
</databaseIdProvider>
```





```xml
<select id="getEmpById" resultType="com.itnxd.bean.Employee">
    /*sql语句不要写分号*/
    select * from t_employee where id = #{id}
</select>

<select id="getEmpById" resultType="com.itnxd.bean.Employee" databaseId="mysql">
    /*sql语句不要写分号*/
    select * from t_employee where id = #{id}
</select>

<select id="getEmpById" resultType="com.itnxd.bean.Employee" databaseId="oracle">
    /*sql语句不要写分号*/
    select * from t_employee where id = #{id}
</select>
```







## 8、mappers



> 写好的Dao.xml sql映射文件注册进来！



1. 普通注册
   1. resource：类路径下找映射文件
   2. class：直接写Dao接口的全类名
      1. 可以将xml放在和dao接口同目录下，而且文件名和接口名一致
      2. 还可以用来配置注解版本的Dao接口，不使用配置文件！
   3. url：从磁盘或者网络路径
2. 批量注册：
   1. 映射文件和dao必须同路径才可以
   2.  解决方法：
      1. 在maven工程下的resources文件夹下新建一个和dao包名同路径的文件夹，映射文件放到这里
      2. 同时配置pom.xml文件，让其将配置文件一同打包到与源文件同路径！



**pom.xml文件：**



- src/main/java：若映射文件和类文件同在该目录下，则指定maven打包将该目录一起打包
- src/main/resources：若映射文件在工程下的resources目录下同报名路径，则指定maven打包将该目录一起打包



```xml
<!--处理maven不会把源文件路径下的配置文件打包到类路径！-->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory><!--所在的目录-->
            <includes><!--包括目录下的.properties,.xml文件都会扫描到-->
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```



**mybatis-config.xml文件:**

```xml
<!--8. mappers：写好的Dao.xml sql映射文件注册进来-->
<mappers>
    <!--
        resource: 类路径下找映射文件
        class: 直接写Dao接口的全类名
            可以将xm1放在和dao接口同目录下，而且文件名和接口名-致
            还可以用来配置注解版本的Dao接口，不使用配置文件！
        url: 从磁盘或者网络路径


        配合使用;重要的dao可以写配置;
        简单的dao就直接标注解;

        -->
    <!--<mapper class="com.itnxd.dao.EmployeeDao"/>
        <mapper class="com.itnxd.dao.EmployeeAnnoDao"/>-->
    <!--<mapper resource="com/itnxd/dao/EmployeeDao.xml"/>-->
    <!--<mapper resource="EmployeeDao.xml"/>-->

    <!--
        批量注册

        配置文件实现的，配置文件和dao必须同路径才可以！
        否则可以通过getMapper获取到Dao，但无法绑定配置文件的方法而报错！

        解决方法：在资源文件夹下新建一个和dao包名同路径的文件夹即可找到！
        同时配置pom.xml文件，让其将配置文件一同打包到与源文件同路径！
        因为：编译完成后配置文件和类文件是同路径的！可以找到！
        -->
    <package name="com.itnxd.dao"/>
</mappers>
```





## 9、注解映射文件



- 重要的复杂的dao可以写配置

- 简单的dao就直接标注解



```java
package com.itnxd.dao;

import com.itnxd.bean.Employee;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * @author ITNXD
 * @create 2021-04-06 20:57
 */
public interface EmployeeAnnoDao {

    @Select(" select * from t_employee where id = #{id}")
    Employee getEmpById(Integer id);

    @Insert("insert into t_employee(empname, gender, email) " +
            "values(#{empname}, #{gender}, #{email})")
    int insertEmployee(Employee employee);

    @Update(" update t_employee set empname = #{empname} " +
            "gender = #{gender},email = #{email} where id = #{id}")
    int updateEmployee(Employee employee);

    @Delete("delete from t_employee where id = #{id}")
    int deleteEmployee(Integer id);
}
```







# 四、Sql映射配置文件





## 0、可以写的标签



```
cache – 该命名空间的缓存配置。
cache-ref – 引用其它命名空间的缓存配置。

resultMap – 描述如何从数据库结果集中加载对象，是最复杂也是最强大的元素。
parameterMap（废弃） – 用来做复杂参数映射
sql – 抽取可重用sql语句块。

insert – 映射插入语句。
update – 映射更新语句。
delete – 映射删除语句。
select – 映射查询语句。
```



**增删改标签属性：**



1. id：对应的方法名
2. parameterType：默认可以自动推断，不写
3. flusthCache：后续介绍
4. timeout：一般使用spring管理！
5. statementType：默认为preparedStatement（一般不改），callable：调用存储过程使用



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/f71e50a3a1e0902d7ef1939cec24abe4.png)





## 1、获取参数值



#### 1.1、各种参数取值



1. 单个参数：基本类型：`#{随便写}`
2. 多个参数：内部使用Map存储，通过key取值，默认key为`#{arg0, arg1 或 param1, param2}`
3. 使用@param注解为参数指定key，称之为命名参数（推荐）：`#{指定的key}`
4. JavaBean：`#{JavaBean的属性值}`，无需`.`
5. Map：`#{key}`
6. 混合型：
   1. 使用注解：可以使用 `#{JavaBean.属性}` 获取
   2. 不使用注解：使用`{paramN.属性}` 获取





**几个例子：**



**例子一：不使用@Param注解**



默认有一个对应关系，`(参数1，参数2 .. )` 对应 `arg0, arg1`或`param1, param2`！

单个参数：随便写即可

多个参数：按照默认情况写（内部为使用Map保存）



```xml
<!--传参到底可以传那些参数！
Employee getEmpByIdAndEmpName(Integer id, String empName);
旧版本为 0,1，param1,param2
[arg1, arg0, param1, param2]
-->
<select id="getEmpByIdAndEmpName" resultType="com.itnxd.bean.Employee">
    select * from t_employee where id = #{arg0} and empname = #{arg1}
</select>

<select id="getEmpByIdAndEmail3" resultType="com.itnxd.bean.Employee">
    select * from t_employee where id = #{id} and email = #{param2.email}
</select>
```





**例子二：使用@Param注解（推荐）**



使用注解起别名可以更方便获取值！

使用@param注解为参数指定key，称之为**命名参数**！



```java
Employee getEmpByIdAndEmail3(@Param("id") Integer id, @Param("employee") Employee employee);
```



```xml
<select id="getEmpByIdAndEmail3" resultType="com.itnxd.bean.Employee">
    select * from t_employee where id = #{id} and email = #{employee.email}
</select>
```



#### 1.2、取值时可设置规则



> javaType、jdbcType、mode、numericScale、resultMap、typeHandler、jdbcTypeName、expression等！
>
> 实际上通常被设置的是：可能为空的列名指定 `jdbcType`



eg：`id=#{id,jdbcType=INT};`



只有jdbcType才可能是需要被指定的：

- 正常情况，默认不指定jdbcType，mysql没问题，oracle没问题;
- 万一传入的数据是null，mysql插入null没问题，oracle不知道null到底是什么类型





#### 1.3、\#{key}和\${key}区别





- #{key}：获取参数的值，预编译到SQL中。安全。（无法使用在非参数位置进行预编译）
- \${key}：获取参数的值，拼接到SQL中。有SQL注入问题。ORDER BY \${name}    
- **在不支持参数预编译的情况下，使用\${}，例如表名位置。。**   









## 2、获取自增主键的值



- useGeneratedKeys：开启使用自增主键，mybatis自动获取自增主键

- keyProperty：获取到自增主键交给JavaBean的该属性（java代码中可以调用getId方法获取到封装的自增主键）



```xml
<!--
    让MyBatis自动的将自增id赋值给传入的employee对象的id属性

    useGeneratedKeys="true ":
    keyProperty="":将刚才自增的id封装给哪个属性
    -->
<insert id="insertEmployee" useGeneratedKeys="true" keyProperty="id">
    insert into t_employee(empname, gender, email)
    values(#{empname}, #{gender}, #{email})
</insert>


```



**对于不支持自增数据库的处理：** 例如Oracle!



> 使用selectKey标签和order属性指定提前运行的sql语句，便于主sql语句可以取到该值！
>
> 同样查询到的最大id赋值给了JavaBean对应的属性！



```xml
<!--
    对于不支持自增的数据库可以这样搞！

	查询主键
        order="BEFORE":
        在核心s.ql语句之前先运行一个查询sql查到id;将查到的id赋值给javaBean的哪个属性;

    在执行sql之前，先执行一个sql查询出下一个id(即最大id+1)的值赋值给javaBean的id，
    方便在主sql语句执行时可以获取到id！而不是null
-->
<insert id="insertEmployee2">

    <selectKey order="BEFORE" resultType="Integer" keyProperty="id">
        select max(id) + 1 from t_employee
    </selectKey>

    insert into t_employee(id, empname, gender, email)
    values(#{id}, #{empname}, #{gender}, #{email})
</insert>
```







## 3、resultType





> 指定返回值类型！





#### 2.1、集合



> 如果返回的是集合，写的是集合里面元素的类型!



```java
List<Employee> getAllEmps();
```





```xml
<!--
resultType=""。如果返回的是集合，写的是集合里面元素的类型
-->
<select id="getAllEmps" resultType="com.itnxd.bean.Employee">
    select * from t_employee
</select>
```





#### 2.2、单条记录返回Map

> 查询返回一个Map，则写map，mybatis指定的别名，Map->map

```java
/**
 * 列名作为key,值作为value
 */
Map<String, Object> getEmpByIdReturnMap(Integer id);
```



```xml
<!--
查询返回一个map,
mybatis指定的别名，Map->map
-->
<select id="getEmpByIdReturnMap" resultType="map">
    select * from t_employee where id = #{id};
</select>
```





#### 2.3、多条记录返回Map



> 使用@MapKey注解指定那个属性作为主键！
>
> resultType写JavaBean类型！



```java
/**
 * key是主键，value是对象
 * @MapKey：指定以哪个主键作为key
 * @return
 */
@MapKey("id")
Map<Integer, Employee> getAllEmpsReturnMap();
```



```xml
<!--
查询多条记录返回map
 resultType：多条记录要写JavaBean类型！
-->
<select id="getAllEmpsReturnMap" resultType="com.itnxd.bean.Employee">
    select * from t_employee
</select>
```





#### 2.4、普通类型



> 直接写JavaBean类型！





## 4、resultMap





> 自定义返回类型！自己定义每一列数据和JavaBean的映射规则！





```xml
<!--
    自定义结果集:自己定义每一列数据和javaBean的映射规则

    type="":指定为哪个javaBean自定义封装规则，全类名
    id="":唯一标识，让别名在后面引用

    select 上 resultMap属性指定自定义结果集id

-->
<resultMap id="myCat" type="com.itnxd.bean.Cat">
    <!--
        指定主键列的对应规则;
        column= "id":指定哪一列是主键列
        property="":指定cat的哪个属性封装id这一列数据

        当然主键也可以使用result标签，但使用id会告诉mybatis是主键，底层会做一些优化！
    -->

    <id property="id" column="id"/>
    <!--普通列-->
    <result property="name" column="cname"/>
    <result property="gender" column="cgender"/>
    <result property="age" column="cage"/>

</resultMap>

<!--使用-->
<select id="getCatById" resultMap="myCat">
    select * from t_cat where id = #{id}
</select>
```







## 5、联合查询





**Key类和Lock类：**



```java
public class Key {

    private Integer id;
    private String keyName;

    private Lock lock; // 当前钥匙可开哪把锁子
    
    ...
}

public class Lock {

    private Integer id;
    private String lockName;

    // 将锁子对应的钥匙全部查到
    private List<Key> keys;
    
    ...
}
```



#### 5.1、级联属性



```xml
<!--<select id="getKeyById" resultType="com.itnxd.bean.Key">-->
<select id="getKeyById" resultMap="myKey">
    SELECT k.*, l.id lid, l.`lockName` FROM t_key k
        LEFT JOIN t_lock l ON k.`lockid`=l.`id`
    WHERE k.`id`=1
</select>

<!--自定义ResultMap-->
<resultMap id="myKey" type="com.itnxd.bean.Key">

    <id property="id" column="id"/>

    <result property="keyName" column="keyName"/>
    <result property="lock.id" column="lid"/>
    <result property="lock.lockName" column="lockName"/>
</resultMap>
```







#### 5.2、association（推荐）



> 比直接自定义更方便！处理JavaBean内的JavaBean！



```xml
<!--<select id="getKeyById" resultType="com.itnxd.bean.Key">-->
<select id="getKeyById" resultMap="myKey">
    SELECT k.*, l.id lid, l.`lockName` FROM t_key k
        LEFT JOIN t_lock l ON k.`lockid`=l.`id`
    WHERE k.`id`=1
</select>

<!--2. mybatis推荐的association标签-->
<resultMap id="myKey" type="com.itnxd.bean.Key">

    <id property="id" column="id"/>

    <result property="keyName" column="keyName"/>
    <!--处理对象封装规则，用association，表示联合了一个对象-->
    <association property="lock" javaType="com.itnxd.bean.Lock">
        <!--定义如何封装-->
        <id property="id" column="lid"/>

        <result property="lockName" column="lockName"/>
    </association>
</resultMap>
```







#### 5.3、collection



> 处理JavaBean内的集合！





```xml
<select id="getLockById" resultMap="myLock">
    SELECT l.*, k.id kid, k.`keyName`, k.`lockId` FROM t_lock l
        LEFT JOIN t_key k ON k.`lockid`=l.`id`
    WHERE l.`id`=#{id}
</select>

<!--3. 使用collection查询集合-->
<resultMap id="myLock" type="com.itnxd.bean.Lock">
    <id property="id" column="id"/>

    <result property="lockName" column="lockName"/>

    <!--
    collection:定义集合元素的封装
        property="":指定哪个属性是集合属性
        javaType:指定对象类型; association
        ofType="":指定集合里面元素的类型

    -->
    <collection property="keys" ofType="com.itnxd.bean.Key">
        <id property="id" column="kid"/>
        <result property="keyName" column="keyName"/>
        <!--疯狂套娃-->
        <!--<association property="lock" javaType="com.itnxd.bean.Lock">
            <id property="id" column="id"/>
            <result property="lockName" column="lockName"/>
        </association>-->
    </collection>
</resultMap>
```







## 6、分步查询



> 也就是一步步查，下一步根据上一步结果继续查询，直到查到最终结果！





对于分步查询，我们可以开启**延迟加载**：即对于分的步，用到的时候再去发送sql语句！

1. 全局开启延迟加载
2. 可使用fetch设置进行局部配置开或关（当然是在全局已经开启的情况下）默认为 `fetchType="lazy"` ,如果本次的查询不想使用延迟加载，则可设置为`fetchType="eager"`

mybatis-config.xml：

```xml
<settings>
    <!--开启延迟加载-->
    <setting name="lazyLoadingEnabled" value="true"/>
    <!--开启属性延迟加载

    开启时，任一方法的调用都会加载该对象的所有延迟加载属性。
    否则，每个延迟加载属性会按需加载
    -->
    <setting name="aggressiveLazyLoading" value="false"/>

</settings>
```



KeyDao.xml文件：

```xml
<resultMap id="myKeySimple" type="com.itnxd.bean.Key">
    <id property="id" column="id"/>
    <result property="keyName" column="keyName"/>
    <!---
    fetchType：配置是否懒加载！
    全局已经配置为支持懒加载！
    -->
    <association property="lock"
                 select="com.itnxd.dao.LockDao.getLockByIdSimple"
                 column="lockId" fetchType="lazy"/>
</resultMap>
```





**例子一：先根据获取lockId获取锁子信息，再将信息封装到key对象内！**



**KeyDao.xml文件：**



```xml
<!--4. 分步查询-->
<!--查询时带上锁子信息-->
<select id="getKeyByIdSimple" resultMap="myKeySimple">
    SELECT * from t_key where id = #{id}
</select>

<!--id keyName lockId -->
<resultMap id="myKeySimple" type="com.itnxd.bean.Key">
    <id property="id" column="id"/>
    <result property="keyName" column="keyName"/>
    <!---告诉mybatis自己去调用一个查询查锁子
    select="":指定一个查询sql的唯一标识:mybatis自动调用指定的sql将查出的lock封装进来

    防止id重复加上LockDao.xml的文件namespace

    Lock getLockByIdSimple(Integer id);
    需要传入锁子id告诉mybatis把哪一列的值传递过去
    column:指定将哪一列的数据传递过去

    fetchType：配置是否支持懒加载！
    全局已经配置为支持懒加载！

    -->
    <association property="lock"
                 select="com.itnxd.dao.LockDao.getLockByIdSimple"
                 column="lockId" fetchType="lazy"/>
</resultMap>
```





**LockDao.xml文件：**



```xml
<select id="getLockByIdSimple" resultType="com.itnxd.bean.Lock">
    SELECT * from t_lock where id = #{id}
</select>
```



**例子二：先根据锁子id获取获取对应的所有钥匙，再将得到结果封装到keys属性！**



**LockDao.xml文件：**



```xml
<!--Lock getLockByIdByStep(Integer id);-->
<select id="getLockByIdByStep" resultMap="myLockStep">
    SELECT * from t_lock where id = #{id}
</select>

<!--collection分步查询-->
<resultMap id="myLockStep" type="com.itnxd.bean.Lock">
    <id property="id" column="id"/>
    <result property="lockName" column="lockName"/>
    <!--指定集合类型的类型属性的封装规则-->
    <collection property="keys"
                select="com.itnxd.dao.KeyDao.getKeysByLockId"
                column="id"/>
</resultMap>
```



**KeyDao.xml文件：**



```xml
<!--List<Key> getKeysByLockId(Integer id);-->
<!--按照锁子id查出所有key-->
<select id="getKeysByLockId" resultType="com.itnxd.bean.Key">
    select * from t_key where lockId = #{id}
</select>
```



## 7、关联关系中外键的选择





1. 一对一关联：随便
2. 一对多关联：多的一端
3. 多对多关联：中间表存储对应关系







# 五、动态Sql







## 0、EGNL表达式



> 用于下面test属性的条件书写！
>
> OGNL（ Object Graph Navigation Language ）对象图导航语言，这是一种强大的表达式语言，通过它可以非常方便的来操作对象属性。 类似于我们的 EL。



1. 访问对象属性： person.name

2. 调用方法： person.getName()

3. 调用静态属性/方法： @java.lang.Math@PI，@java.util.UUID@randomUUID()

4. 调用构造方法： new com.atguigu.bean.Person("admin").name

5. 运算符： +,-*,/,%

6. 逻辑运算符： in,not in,>,>=,<,<=,==,!= 

   

**注意：xml 中特殊符号如”,>,<等这些都需要使用转义字符**



## 1、if标签



> 后面添加and用于连接！



```xml
<if test="id != null">
    id >= #{id} and
</if>
<if test="name != null &amp;&amp; !name.equals(&quot;&quot;) ">
    teachName like #{name} and
</if>
```



## 2、where标签

> where可以不用手写，使用标签where，还可以过滤多余的and，or！
>
> 注意：只能过滤条件前面的！不能过滤后面的！



```xml
<where>
    <if test="id != null">
        id >= #{id}
    </if>
    <if test="name != null &amp;&amp; !name.equals(&quot;&quot;) ">
        and teachName like #{name}
    </if>
    <if test="birth != null">
        and birth_date &lt; #{birth}
    </if>
</where>
```



## 3、trim标签



> 可以用于过滤前后多余字符！



```xml
<!--
    prefix="":前缀;为我们下面的sql整体添加一个前缀
    prefixoverrides="":取出整体字符串前面多余的字符
    suffix=""，为整体添加一个后缀
    suffixoverrides="":后面哪个多了可以去掉

    推荐：
    我们的查询条件就放在where标签中;每个and写在前面，where帮我们自动取除前面
    多余的and

-->
<trim prefix="where" prefixOverrides="and" suffixOverrides="and">
    <if test="id != null">
        id >= #{id}
    </if>
    <if test="name != null &amp;&amp; !name.equals(&quot;&quot;) ">
        and teachName like #{name}
    </if>
    <if test="birth != null">
        and birth_date &lt; #{birth}
    </if>
</trim>
```





## 4、foreach标签



> 遍历集合！



collection：指定要便利集合的key,List只能填list

解决：使用@Param注解指明key



```xml
<!--List<Teacher> getTeacherByIdIn(List<Integer> ids);-->
<!--类型于sql中的in-->
<select id="getTeacherByIdIn" resultMap="myTeacher">
    select * from t_teacher where id in
    <!--
        4. foreach遍历集合
        collection：指定要便利集合的key,List只能填list
        解决：使用@Param注解指明key

        collection=":指定要遍历的集合的key
        close="";以什么结束
        index="i":索引;
            如果遍历的是一个list;
                index:指定的变量保存了当前索引i
                item:保存当前遍历的元素的值
            如果遍历的是一-个map:
                index:指定的变量就是保存了当前遍历的元素的key
                item:就是保存当前遍历的元素的值
        item="变量名":每次遍历出的元素起一个变量名方便引用
        open="":以什么开始
        separator="";每次遍历的元素的分隔符


    -->
    <!--可以使用OGNL表达式的伪属性，详见ppt63页-->
    <if test="ids.isEmpty"></if>
    <foreach collection="ids" open="(" close=")" item="id_item" separator=",">
        #{id_item}
    </foreach>
</select>
```



## 5、choose标签



> 类似switch case！

```xml
<!--
List<Teacher> getTeacherByConditionChose(Teacher teacher);

5. choose(类似switch case)
-->
<select id="getTeacherByConditionChose" resultMap="myTeacher">
    select * from t_teacher
    <where>
        <choose>
            <when test="id != null">
                id = #{id}
            </when>
            <when test="name != null and !name.equals(&quot;&quot;)">
                teachName = #{name}
            </when>
            <when test="birth != null">
                birthDate = #{birth}
            </when>
            <otherwise>
                1 = 1
            </otherwise>
        </choose>
    </where>
</select>
```





## 6、set标签



> set 替换原生的update(可以解决逗号多余问题)



```xml
<!-- int updateTeacher(Teacher teacher);
6. set 替换原生的update(可以解决逗号多余问题)
传入啥就修改啥
-->
<update id="updateTeacher">
    update t_teacher
    <set>
        <if test="name != null and !name.equals(&quot;&quot;)">
            teachName = #{name},
        </if>
        <if test="course != null and !course.equals(&quot;&quot;)">
            class_name = #{course},
        </if>
        <if test="address != null">
            class_name = #{course},
        </if>
        <if test="birth != null">
            birth_date = #{birth)
        </if>
    </set>
    <where> id = #{id} </where>
</update>
```

## 7、bind标签（了解）



> 对于传递进来的属性绑定一些内容，例如模糊匹配等等！



```xml
<!--7. bind标签 （一般不用，修改匹配规则麻烦）-->

<select id="">
    select * from t_teacher
    <where>
        <if test="id != null">
            id >= #{id}
        </if>
        <!--
        绑定一个表达式的值到一个变量

        将value: "%name%" 绑定到name属性的_name
        -->
        <bind name="_name" value="'%' + name + '%'"/>
        <if test="name != null &amp;&amp; !name.equals(&quot;&quot;) ">
            and teachName like #{name}
        </if>
        <if test="birth != null">
            and birth_date &lt; #{birth}
        </if>
    </where>
</select>
```



## 8、sql标签



> 抽取可重用sql！



```xml
<!--
8. sql标签 抽取可重用sql
    include 标签包含可重用sql
-->
<sql id="selectSql">
    select * from t_teacher
</sql>


<select id="">
    <include refid="selectSql"/>
</select>
```







# 六、缓存机制





> 自然是将查过的数据保存下来，方便下一次使用，而无需再次查询！





## 1、一级缓存



> **Sqlsession级别缓存**，也就是说每次会话关闭会自动清空缓存！
>
> 每次查询，先看一级缓存中有没有，如果没有就去发送新的sql，每个sqlSession拥有自己的一级缓存!





**一级缓存失效的几种情况：**



1. 不同的SqlSession对应不同的一级缓存
2. 同一个SqlSession但是查询条件不同，由于可能之前没查询过，所有还会发新的sql
3. 同一个SqlSession两次查询期间执行了任何一次增删改操作，增删改操作会把缓存清空
4. 同一个SqlSession两次查询期间手动清空了缓存（调用`session.clearCache()`）





**一级缓存的工作机制：**

同一次会话期间只要查询过的数据都会保存在当前 SqlSession 的一个 Map 中！

key: hashCode+查询的 Sqlid+编写的 sql 查询语句+参数





## 2、二级缓存



> **namespace级别缓存**，全局作用域缓存！
>
> **一级缓存 SqlSession关闭或者提交以后, 一级缓存的数据会放在二级缓存中！**
>
> 二级缓存默认不开启，需要手动配置！



**全局配置mybatis-config.xml开启二级缓存：**

```xml
<!-- 
开启全局缓存开关;
-->
<setting name= "cacheEnabled" value="true"/>
```



**配置某个dao.xml文件，让其使用二级缓存：**



```xml
<!--开启全局缓存（二级缓存）-->
<cache/>
```



**每个实体类JavaBean都要加上implements Serializable**



```java
public class Teacher implements Serializable {
    ...
}
```



 **测试：**

```java
@Test
public void test7() throws IOException, InterruptedException {
    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    // try中用完自动关闭，无需手动写！
    try (SqlSession session = sqlSessionFactory.openSession(true)) {

        TeacherDao teacherDao = session.getMapper(TeacherDao.class);
        Teacher teacher = teacherDao.getTeacherById(1);
        System.out.println(teacher);
    }

    // 两次会话！
    try (SqlSession session = sqlSessionFactory.openSession(true)) {

        TeacherDao teacherDao = session.getMapper(TeacherDao.class);
        Teacher teacher = teacherDao.getTeacherById(1);
        System.out.println(teacher);
    }
}
```



## 3、二级缓存相关属性





```xml
<!--开启全局缓存（二级缓存）-->
<cache/>
```



1. eviction=“FIFO”：缓存回收策略：
   1. LRU – 最近最少使用的：移除最长时间不被使用的对象。
   2. FIFO – 先进先出：按对象进入缓存的顺序来移除它们。
   3. SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。
   4. WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。
   5. 默认的是 LRU。
2. flushInterval：刷新间隔，单位毫秒，默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新
3. size：引用数目，正整数，代表缓存最多可以存储多少个对象，太大容易导致内存溢出
4. readOnly：只读，true/false
   1. true：只读缓存；会给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改。这提供了很重要的性能优势。
   2. false：读写缓存；会返回缓存对象的拷贝（通过序列化）。这会慢一些，但是安全，
   3. 因此默认是 false。





## 4、缓存相关属性设置



1. 全局 setting 的 cacheEnable：配置二级缓存的开关，一级缓存一直是打开的。
2. select 标签的 useCache 属性：配置这个 select 是否使用二级缓存。一级缓存一直是使用的
3. sql 标签的 flushCache 属性：增删改默认 flushCache=true。sql 执行以后，会同时清空一级和二级缓存。查询默认 flushCache=false。
4. sqlSession.clearCache()：只是用来清除一级缓存。





## 5、缓存原理



1. 不会出现一级缓存和二级缓存中有同一个数据
   1. 二级缓存中：一级缓存关闭了就有了
   2. 一级缓存中：二级缓存中没有此数据，就会看一级缓存，一级缓存没有去查数据库  
   3. 数据库的查询后的结果放在一级缓存中了
2. 任何时候都是先看二级缓存、再看一级缓存，如果大家都没有就去查询数据库





**缓存原理图示：**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/7911daee3733d9f17110660bc5c777bb.png)









## 6、整合第三方缓存EhCache





> 原因：自带缓存太菜！
>
> MyBatis留了一个Cache接口，可以让第三方进行实现！
>
> EhCache非常专业的Java进程内的缓存框架！





#### 6.1、pom.xml导包



> 核心包和整合包，整合包（可选，不导包则需要自己继承Cache接口进行实现）
> 还依赖于slf4j-api和slf4j-log4j12



```xml
<!--第三方缓存-->
<!-- https://mvnrepository.com/artifact/org.ehcache/ehcache -->
<dependency>
    <groupId>org.ehcache</groupId>
    <artifactId>ehcache</artifactId>
    <version>3.9.2</version>
</dependency>
<!--针对mybatis对ehcache的实现（解决自己继承实现cache接口的步骤）-->
<!-- https://mvnrepository.com/artifact/org.mybatis.caches/mybatis-ehcache -->
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-ehcache</artifactId>
    <version>1.2.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>2.0.0-alpha1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.0-alpha1</version>
</dependency>
```



#### 6.2、配置ehcache.xml



> 各个属性配置见下方注释！



```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
 <!-- 磁盘保存路径 -->
 <diskStore path="D:\ehcache" />
 
 <defaultCache 
   maxElementsInMemory="100000"
   maxElementsOnDisk="10000000"
   eternal="false" 
   overflowToDisk="true" 
   timeToIdleSeconds="120"
   timeToLiveSeconds="120" 
   diskExpiryThreadIntervalSeconds="120"
   memoryStoreEvictionPolicy="LRU">
 </defaultCache>
</ehcache>
 
<!-- 
属性说明：
l diskStore：指定数据在磁盘中的存储位置。
l defaultCache：当借助CacheManager.add("demoCache")创建Cache时，EhCache便会采用<defalutCache/>指定的的管理策略
 
以下属性是必须的：
l maxElementsInMemory - 在内存中缓存的element的最大数目 
l maxElementsOnDisk - 在磁盘上缓存的element的最大数目，若是0表示无穷大
l eternal - 设定缓存的elements是否永远不过期。如果为true，则缓存的数据始终有效，如果为false那么还要根据timeToIdleSeconds，timeToLiveSeconds判断
l overflowToDisk - 设定当内存缓存溢出的时候是否将过期的element缓存到磁盘上
 
以下属性是可选的：
l timeToIdleSeconds - 当缓存在EhCache中的数据前后两次访问的时间超过timeToIdleSeconds的属性取值时，这些数据便会删除，默认值是0,也就是可闲置时间无穷大
l timeToLiveSeconds - 缓存element的有效生命期，默认是0.,也就是element存活时间无穷大
 diskSpoolBufferSizeMB 这个参数设置DiskStore(磁盘缓存)的缓存区大小.默认是30MB.每个Cache都应该有自己的一个缓冲区.
l diskPersistent - 在VM重启的时候是否启用磁盘保存EhCache中的数据，默认是false。
l diskExpiryThreadIntervalSeconds - 磁盘缓存的清理线程运行间隔，默认是120秒。每个120s，相应的线程会进行一次EhCache中数据的清理工作
l memoryStoreEvictionPolicy - 当内存缓存达到最大，有新的element加入的时候， 移除缓存中element的策略。默认是LRU（最近最少使用），可选的有LFU（最不常使用）和FIFO（先进先出）
 -->
```



#### 6.3、在mapper.xmI中配置使用自定义的缓存



> 还可以使用cache-ref指定和其他dao.xml使用同一块缓存！





```xml
<!--使用第三方缓存ehcache-->
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>

<!--和别的Dao公用一块缓存-->
<!--<cache-ref namespace="com.itnxd.dao.TeacherDao"/>-->
```







# 七、MyBatis逆向工程







> MyBatis Generator: 简称 MBG，是一个专门为 MyBatis 框架使用者定制的代码生成器，可以快速的根据表生成对应的映射文件，接口，以及 bean 类。
>
> **可以通过数据库表生成对应的文件！**
>
> 官方地址：[所有的配置都可以在这里找到详细答案，点击这里！](http://mybatis.org/generator/)







## 1、pom.xml添加插件



> 该插件执行依赖于mybatis-generator-core和mysql-connector-java！



**指定配置文件地址：**

```xml
 <!--指定插件配置文件地址-->
 <configurationFile>src/main/resources/generatorConfig.xml</configurationFile>
```



**点击生成覆盖旧文件：**

```xml
 <!--如果相同直接覆盖-->
 <overwrite>true</overwrite>
```





```xml
<build>
    <plugins>
        <!--MyBatis代码生成器插件
        http://mybatis.org/generator/running/runningWithMaven.html
        -->
        <plugin>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-maven-plugin</artifactId>
            <version>1.4.0</version>

            <configuration>
                <!--指定插件配置文件地址-->
                <configurationFile>src/main/resources/generatorConfig.xml</configurationFile>
                <verbose>true</verbose>
                <!--如果相同直接覆盖-->
                <overwrite>true</overwrite>
            </configuration>
            <executions>
                <execution>
                    <id>Generate MyBatis Artifacts</id>
                    <goals>
                        <goal>generate</goal>
                    </goals>
                </execution>
            </executions>
            <dependencies>
                <dependency>
                    <groupId>org.mybatis.generator</groupId>
                    <artifactId>mybatis-generator-core</artifactId>
                    <version>1.4.0</version>
                </dependency>
                <!-- 数据库 Mysql -->
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <version>8.0.23</version>
                </dependency>
            </dependencies>

        </plugin>

    </plugins>
</build>
```



## 2、generatorConfig.xml配置



> 配置插件详细配置，文件名和pom.xml配置相符即可！
>
> 更详细配置参考官方文档！



```xml
<!DOCTYPE generatorConfiguration PUBLIC
        "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>

    <!--targetRuntime可指定生成级别，复杂sql或是简单sql
    http://mybatis.org/generator/configreference/context.html
    -->
    <context id="simple" targetRuntime="MyBatis3">

        <!--指定连接的数据库信息-->
        <jdbcConnection
                driverClass="com.mysql.cj.jdbc.Driver"
                connectionURL="jdbc:mysql:///mybatis"
                password="xxxx"
                userId="root"
        />

        <!--
        生成JavaBean：
        targetPackage：JavaBean的存放包的路径
        targetProject：项目路径（包路径）
        -->
        <javaModelGenerator targetPackage="com.itnxd.bean" targetProject="./src/main/java"/>

        <!--
        sql映射文件生成器，指定xml文件生成位置
        -->
        <sqlMapGenerator targetPackage="com.itnxd.dao" targetProject="src/main/resources"/>

        <!--Dao接口生成器-->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.itnxd.dao" targetProject="src/main/java"/>

        <!--
        指定要生成的sql表

        tableName：指定要生成的表
        domainObjectName：这个表对应的JavaBean类
        -->
        <table tableName="t_teacher" domainObjectName="Teacher"/>
        <table tableName="t_cat" domainObjectName="Cat"/>
        <table tableName="t_employee" domainObjectName="Employee"/>
    </context>
</generatorConfiguration>
```



## 3、生成所有文件



> 可以生成Bean，Dao，mapper.xml映射文件！



**双击命令即可！**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/f018abc5ac3b1b05e912fecb613d9cdf.png)





**生成文件展示：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/afb674f07dbdf1ad5ceb7433d0eeac17.png)





## 4、测试





> xxxExample用来封装查询条件,null查询所有，没有条件！
>
> 详细看下方代码！

```java
@Test
public void test1() throws IOException {
    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    try (SqlSession session = sqlSessionFactory.openSession()) {

        CatMapper catMapper = session.getMapper(CatMapper.class);

        Cat cat = catMapper.selectByPrimaryKey(1);
        System.out.println(cat);

        // xxxExample用来封装查询条件,null查询所有，没有条件
        List<Cat> cats = catMapper.selectByExample(null);
        System.out.println(cats);

        // 封装查询条件的
        /*
        and条件拼装到第一个criteria1
        or条件拼装到第二个criteria2
        再使用 xxxExample.or(criteria2);即可
         */
        CatExample catExample = new CatExample();
        // Criteria：拼装查询条件
        CatExample.Criteria criteria = catExample.createCriteria();
        // and关系
        criteria.andCnameLike("%猫%");
        criteria.andCageGreaterThan(3);

        // or关系（需要再次创建一个criteria）
        CatExample.Criteria criteria1 = catExample.createCriteria();
        criteria1.andCageEqualTo(1);
        // or关系：
        catExample.or(criteria1);

        // 升序
        catExample.setOrderByClause("id");
        // 降序
        catExample.setOrderByClause("id desc");

        List<Cat> cats1 = catMapper.selectByExample(catExample);
        System.out.println(cats1);

    }
}
```







# 八、SSM整合



**整合完成项目结构图：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/04/09/6c35c36c39d9852b935c47241540251f.png)







## 1、pom.xml导包





#### 1.1、Spring-IOC模块



```xml
<!--spring IOC 核心模块-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-aop -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-beans -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-core -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-expression -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
    <version>${spring.version}</version>
</dependency>
<!--spring日志依赖-->
<!-- https://mvnrepository.com/artifact/commons-logging/commons-logging -->
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.2</version>
</dependency>
```



#### 1.2、Jdbc和事务模块



```xml
<!--jdbc模块-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-tx -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-orm -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-orm</artifactId>
    <version>${spring.version}</version>
</dependency>
```



#### 1.3、测试模块



```xml
<!--测试模块-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>${spring.version}</version>
    <scope>test</scope>
</dependency>
<!--Junit-->
<!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.8.0-M1</version>
    <scope>test</scope>
</dependency>
```





#### 1.4、AOP及动态代理模块



```xml
<!--aop动态代理-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-aspects -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.6</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.aopalliance/com.springsource.org.aopalliance -->
<dependency>
    <groupId>org.aopalliance</groupId>
    <artifactId>com.springsource.org.aopalliance</artifactId>
    <version>1.0.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/cglib/cglib -->
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.3.0</version>
</dependency>
```



#### 1.5、SpringMvc模块



```xml
<!--springmvc模块-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-web -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
</dependency>
```



#### 1.6、JSTL标签库





```xml
<!--jstl-jar-->
<!-- https://mvnrepository.com/artifact/javax.servlet.jsp.jstl/jstl -->
<dependency>
    <groupId>javax.servlet.jsp.jstl</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
<!-- jstl-api -->
<dependency>
    <groupId>javax.servlet.jsp.jstl</groupId>
    <artifactId>jstl-api</artifactId>
    <version>1.2</version>
</dependency>
<!-- jstl-impl -->
<dependency>
    <groupId>org.glassfish.web</groupId>
    <artifactId>jstl-impl</artifactId>
    <version>1.2</version>
</dependency>
```





#### 1.7、文件上传模块



```xml
<!--文件上传依赖-->
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>
```



#### 1.8、Hibernate的数据校验模块



```xml
<!--hibernate的数据校验包-->
<!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-validator -->
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>6.0.0.Final</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.hibernate.validator/hibernate-validator-annotation-processor -->
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator-annotation-processor</artifactId>
    <version>6.0.0.Final</version>
</dependency>
```





#### 1.9、SpringMvc-Json-Ajax支持模块



```xml
<!--SpringMvc-json-ajax-->
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.12.2</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.12.2</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.12.2</version>
</dependency>
```



#### 1.10、谷歌验证码模块



> 由于谷歌官方并没有上传到Maven仓库，但是有人上传了，我们可以使用下面这个！

```xml
<!--谷歌验证码-->
<!-- https://mvnrepository.com/artifact/com.github.penggle/kaptcha -->
<dependency>
    <groupId>com.github.penggle</groupId>
    <artifactId>kaptcha</artifactId>
    <version>2.3.2</version>
</dependency>
```





#### 1.11、MyBatis核心即整合Spring模块





```xml
<!--MyBatis核心-->
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.6</version>
</dependency>
<!--mybatis整合spring包-->
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.6</version>
</dependency>
```





#### 1.12、数据库驱动即连接池模块



```xml
<!--数据库驱动-->
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
</dependency>
<!--c3p0数据库连接池-->
<!-- https://mvnrepository.com/artifact/com.mchange/c3p0 -->
<dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5.5</version>
</dependency>
```



#### 1.13、log4j日志模块



```xml
<!--loj4j日志，可以显示sql语句！-->
<!-- https://mvnrepository.com/artifact/log4j/log4j -->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```





#### 1.14、EhCache缓存模块





```xml
<!--第三方缓存-->
<!-- https://mvnrepository.com/artifact/org.ehcache/ehcache -->
<dependency>
    <groupId>org.ehcache</groupId>
    <artifactId>ehcache</artifactId>
    <version>3.9.2</version>
</dependency>
<!--针对mybatis对ehcache的实现（解决自己继承实现cache接口的步骤）-->
<!-- https://mvnrepository.com/artifact/org.mybatis.caches/mybatis-ehcache -->
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-ehcache</artifactId>
    <version>1.2.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>2.0.0-alpha1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.0-alpha1</version>
</dependency>
```



#### 1.15、PageHelper分页插件模块



```xml
<!--分页插件依赖-->
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
</dependency>
```



#### 1.16、配置Maven打包resources下的xml到类路径





```xml
<!--处理maven不会把源文件路径下的配置文件打包到类路径！-->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory><!--所在的目录-->
            <includes><!--包括目录下的.properties,.xml文件都会扫描到-->
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```





## 2、web.xml配置







```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--配置spring容器启动-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <!--指定spring配置文件位置-->
        <param-value>classpath:spring/applicationContext.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!--配置springmvc前端控制器-->
    <servlet>
        <servlet-name>springDispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring/applicationContext-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springDispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!--两个标准配置-->
    <!--字符编码-->
    <!--配置请求和响应乱码，SpringMvc特有-->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceRequestEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>forceResponseEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--支持REST风格的过滤器-->
    <!--为了支持REST，Spring需要使用Filter-->
    <filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <!--拦截所有请求-->
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    
</web-app>
```





## 3、Spring.xml配置





```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:mybatis-spring="http://mybatis.org/schema/mybatis-spring"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://mybatis.org/schema/mybatis-spring http://mybatis.org/schema/mybatis-spring.xsd">

    <!--配置分容器处理，禁用默认规则-->
    <context:component-scan base-package="com.itnxd">
        <!--除了Controller都要-->
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        <!--<context:exclude-filter type="annotation" expression="org.springframework.web.bind.annotation.ControllerAdvice"/>-->
    </context:component-scan>

    <!--0. 导入外部配置文件-->
    <context:property-placeholder location="classpath:dbconfig.properties"/>
    <!--1. 配数据源-->
    <bean id="ds" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="user" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="jdbcUrl" value="${jdbc.jdbcUrl}"/>
        <property name="driverClass" value="${jdbc.driverClass}"/>

        <property name="maxPoolSize" value="${jdbc.maxPoolSize}"/>
        <property name="minPoolSize" value="${jdbc.minPoolSize}"/>
    </bean>

    <!--2. 配置JdbcTemplate操作数据库。pass-->
    <!--3. 配置使用mybatis操作数据库-->
    <!--可以根据配置文件得到sqlSessionFactory-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--指定mybatis配置文件路径-->
        <property name="configLocation" value="classpath:mybatis/mybatis-config.xml"/>
        <!--指定用的数据源（即连接池）-->
        <property name="dataSource" ref="ds"/>
        <!--指定xml映射文件的位置-->
        <property name="mapperLocations" value="classpath:mybatis/mapper/*.xml"/>
    </bean>

    <!--我们要把每一个dao接口的实现加入到ioc容器-->
    <bean id="mapperScannerConfigurer" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!--指定dao接口所在包-->
        <property name="basePackage" value="com.itnxd.dao"/>
    </bean>
    <!--或者-->
    <!--<mybatis-spring:scan base-package="com.itnxd.dao"/>-->


    <!--4. 配置事务控制-->
    <!--配置事务控制器，控制数据源的关闭和提交-->
    <bean id="tm" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="ds"/>
    </bean>

    <!--5. 基于xml配置事务-->
    <aop:config>
        <!--配置切入点表达式-->
        <aop:pointcut id="txPoint" expression="execution(* com.itnxd.service.*.*(..))"/>
        <aop:advisor advice-ref="myTx" pointcut-ref="txPoint"/>
    </aop:config>

    <!--6. 配置事务增强，事务属性
    transaction-manager= "tm":指定要配置的事务管理器的id
    -->
    <tx:advice id="myTx" transaction-manager="tm">
        <!--配置事务属性-->
        <tx:attributes>
            <!--任何方法出现任何异常都回滚-->
            <tx:method name="*" rollback-for="java.lang.Exception"/>
            <!--get方法只读-->
            <tx:method name="get*" read-only="true"/>
            <!--配置插入方法隔离级别-->
            <!--<tx:method name="insert*" isolation="READ_UNCOMMITTED"/>-->
        </tx:attributes>
    </tx:advice>

</beans>
```







## 4、SpringMvc.xml配置



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--开启组件扫描-->
    <!--配置分容器，SpringMvc只扫描除了Controller，禁用默认过滤规则-->
    <context:component-scan base-package="com.itnxd" use-default-filters="false">
        <!--处理器注解-->
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        <!--进行错误控制的注解-->
        <!--<context:include-filter type="annotation" expression="org.springframework.web.bind.annotation.ControllerAdvice"/>-->
    </context:component-scan>

    <!--配置视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--配置文件上传解析器-->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!--限制文件最大为20Mb -->
        <property name="maxUploadSize" value="#{1024*1024*20}"/>
        <!--设置编码-->
        <property name="defaultEncoding" value="utf-8"/>
    </bean>


    <!--扫描静态资源-->
    <mvc:default-servlet-handler/>
    <!--扫描动态资源-->
    <mvc:annotation-driven/>

</beans>
```





## 5、MyBatis.xml配置





```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <settings>
        <!--开启日志打印sql-->
        <setting name="logImpl" value="LOG4J"/>
        <!--开启驼峰命名-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!--开启延迟加载-->
        <setting name="lazyLoadingEnabled" value="true"/>
        <!--开启属性延迟加载
        开启时，任一方法的调用都会加载该对象的所有延迟加载属性。
        否则，每个延迟加载属性会按需加载
        -->
        <setting name="aggressiveLazyLoading" value="false"/>
        <!--开启全局缓存，默认为true,但最好显示开启-->
        <setting name="cacheEnabled" value="true"/>
    </settings>

    <!--分页插件-->
    <plugins>
        <!-- com.github.pagehelper为PageHelper类所在包名 -->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"/>
    </plugins>

    <!--<mappers>
        <package name="com.itnxd.dao"/>
    </mappers>-->

</configuration>
```









## 6、其他配置





#### 6.1、EhCache.xml配置



```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
 <!-- 磁盘保存路径 -->
 <diskStore path="D:\ehcache" />
 
 <defaultCache 
   maxElementsInMemory="100000"
   maxElementsOnDisk="10000000"
   eternal="false" 
   overflowToDisk="true" 
   timeToIdleSeconds="120"
   timeToLiveSeconds="120" 
   diskExpiryThreadIntervalSeconds="120"
   memoryStoreEvictionPolicy="LRU">
 </defaultCache>
</ehcache>
 
<!-- 
属性说明：
l diskStore：指定数据在磁盘中的存储位置。
l defaultCache：当借助CacheManager.add("demoCache")创建Cache时，EhCache便会采用<defalutCache/>指定的的管理策略
 
以下属性是必须的：
l maxElementsInMemory - 在内存中缓存的element的最大数目 
l maxElementsOnDisk - 在磁盘上缓存的element的最大数目，若是0表示无穷大
l eternal - 设定缓存的elements是否永远不过期。如果为true，则缓存的数据始终有效，如果为false那么还要根据timeToIdleSeconds，timeToLiveSeconds判断
l overflowToDisk - 设定当内存缓存溢出的时候是否将过期的element缓存到磁盘上
 
以下属性是可选的：
l timeToIdleSeconds - 当缓存在EhCache中的数据前后两次访问的时间超过timeToIdleSeconds的属性取值时，这些数据便会删除，默认值是0,也就是可闲置时间无穷大
l timeToLiveSeconds - 缓存element的有效生命期，默认是0.,也就是element存活时间无穷大
 diskSpoolBufferSizeMB 这个参数设置DiskStore(磁盘缓存)的缓存区大小.默认是30MB.每个Cache都应该有自己的一个缓冲区.
l diskPersistent - 在VM重启的时候是否启用磁盘保存EhCache中的数据，默认是false。
l diskExpiryThreadIntervalSeconds - 磁盘缓存的清理线程运行间隔，默认是120秒。每个120s，相应的线程会进行一次EhCache中数据的清理工作
l memoryStoreEvictionPolicy - 当内存缓存达到最大，有新的element加入的时候， 移除缓存中element的策略。默认是LRU（最近最少使用），可选的有LFU（最不常使用）和FIFO（先进先出）
 -->
```



#### 6.2、log4j.xml配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">

<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">

 <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
   <param name="Encoding" value="UTF-8" />
   <layout class="org.apache.log4j.PatternLayout">
    <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m  (%F:%L) \n" />
   </layout>
 </appender>
 <logger name="java.sql">
   <level value="debug" />
 </logger>
 <logger name="org.apache.ibatis">
   <level value="info" />
 </logger>
 <root>
   <level value="debug" />
   <appender-ref ref="STDOUT" />
 </root>
</log4j:configuration>
```



#### 6.3、dbconfig.properties配置



```properties
jdbc.user=root
jdbc.password=xxx
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.jdbcUrl=jdbc:mysql:///mybatis
jdbc.maxPoolSize=20
jdbc.minPoolSize=5
```



## 7、测试





**index.jsp页面：**



```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 15890
  Date: 2021/4/8
  Time: 15:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<a href="getTeacher?id=1">查询Teacher在success页面显示!</a>

</body>
</html>
```



**Controller程序：**



```java
@Autowired
TeacherService teacherService;

@RequestMapping("/getTeacher")
public String getTeacher(@RequestParam(value = "id", defaultValue = "1") Integer id,
                         Model model){
    Teacher teacher = teacherService.getTeacherById(id);
    model.addAttribute("teacher", teacher);
    return "success";
}
```







# 九、PageHelper分页插件





> PageHelper 是 MyBatis 中非常方便的第三方分页插件!
>
> 官方地址：[官方项目地址！点击这里！](https://github.com/pagehelper/Mybatis-PageHelper)





## 1、pom.xml导包





```xml
<!--分页插件依赖-->
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
</dependency>
```





## 2、MyBatis.xml配置



```xml
<!--分页插件-->
<plugins>
    <!-- com.github.pagehelper为PageHelper类所在包名 -->
    <plugin interceptor="com.github.pagehelper.PageInterceptor"/>
</plugins>
```









## 3、测试









**Controller程序：**



```java
@RequestMapping("/getAll")
public String getAll(@RequestParam(value = "p", defaultValue = "1") Integer p,  Model model){
    // 紧跟一次查询即可，这就是分页查询
    PageHelper.startPage(p, 10);
    List<Teacher> list = teacherService.getAll();


    // 第二个参数，连续要显示的页数
    PageInfo<Teacher> pageInfo = new PageInfo<>(list, 5);
    System.out.println("当前页码：" + pageInfo.getPageNum());
    System.out.println("总页码：" + pageInfo.getPages());
    System.out.println("总记录数：" + pageInfo.getTotal());
    System.out.println("总记录数：" + pageInfo.getTotal());
    System.out.println("当前页记录条数：" + pageInfo.getSize());
    System.out.println("每页记录数" + pageInfo.getPageSize());
    System.out.println("前一页：" + pageInfo.getPrePage());

    System.out.println("取出pageInfo信息：" + pageInfo.getList());

    // 连续分页的int数组：
    int[] nums = pageInfo.getNavigatepageNums();

    model.addAttribute("pageInfo", pageInfo);
    /*model.addAttribute("teachers", list);*/
    return "success";
}
```







**index.jsp页面：**





```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<a href="getAll">查询所有员工！</a>

</body>
</html>
```



**success.jsp页面：**



> 取出从Model中传过来的pageInfo使用即可！



```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<h1>success!</h1>

${teacher}

<br>

<table cellspacing="0" border="1" cellpadding="5">
    <tr>
        <th>id</th>
        <th>name</th>
        <th>course</th>
        <th>address</th>
    </tr>
    <%--<c:forEach items="${teachers}" var="teacher">--%>
    <c:forEach items="${pageInfo.list}" var="teacher">
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.course}</td>
            <td>山西</td>
        </tr>
    </c:forEach>

    <tr>
        <td colspan="4">
            <a href="getAll?p=1">首页</a><a href="getAll?p=${pageInfo.prePage}">前一页</a>
            <c:forEach items="${pageInfo.navigatepageNums}" var="pageNum">
                <c:if test="${pageInfo.pageNum == pageNum}">
                    【${pageNum}】
                </c:if>
                <c:if test="${pageInfo.pageNum != pageNum}">
                    <a href="getAll?p=${pageNum}">${pageNum}</a>
                </c:if>
            </c:forEach>
            <a href="getAll?p=${pageInfo.nextPage}">后一页</a><a href="getAll?p=${pageInfo.pages}">末页</a>
        </td>
    </tr>

</table>

</body>
</html>

```

