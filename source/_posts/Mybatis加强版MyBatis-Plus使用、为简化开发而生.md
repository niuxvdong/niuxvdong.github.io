---
title: Mybatis加强版MyBatis-Plus使用、为简化开发而生
author: ITNXD
toc: true
abbrlink: 5524
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/09/26/124fa3c7859ae9eb301e9b4d0e5cbfea.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/09/26/124fa3c7859ae9eb301e9b4d0e5cbfea.png
categories: 开发框架
tags:
  - MyBatis-Plus
date: 2021-09-26 17:48:32
updated:
---







# 一、简介







## 1、概述





> [MP官网！](https://baomidou.com/)



MyBatis-Plus(简称 MP),是一个 MyBatis 的增强工具包，只做增强不做改变. 为简化开发工作、提高生产率而生

我们的愿景是成为 Mybatis 最好的搭档，就像 魂斗罗 中的 1P、2P，基友搭配，效率翻倍。





## 2、特点



- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作







# 二、继承MP





## 1、pom.xml



> 使用MP目前最新版，3.4.3.4！
>
> 注意：Mybatis 及 Mybatis-Spring 依赖请勿加入项目配置，以免引起版本冲突！！！Mybatis-Plus 会自动帮你维护！

```xml
<dependencies>
    <!-- mp 依赖 -->
    <!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus</artifactId>
        <version>3.4.3.4</version>
    </dependency>
    <!--junit -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.9</version>
    </dependency>
    <!-- log4j -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
    </dependency>
    <!--数据库驱动，我是用的MySQL8-->
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
    <!-- spring -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>4.3.10.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-orm</artifactId>
        <version>4.3.10.RELEASE</version>
    </dependency>
</dependencies>
```





## 2、log4j.xml



> 便于看到SQL语句情况！



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
    <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8" />
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%-5p %d{MM-dd
HH:mm:ss,SSS} %m (%F:%L) \n" />
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









## 3、spring.xml



> 关键点：只需要`SqlSessionFactoryBean`替换为MP的`MybatisSqlSessionFactoryBean`即可！

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:mybatis-spring="http://mybatis.org/schema/mybatis-spring"
       xsi:schemaLocation="http://mybatis.org/schema/mybatis-spring
       http://mybatis.org/schema/mybatis-spring-1.2.xsd
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context-4.0.xsd
       http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx-4.0.xsd">

    <!-- 数据源 -->
    <context:property-placeholder location="classpath:jdbc.properties"/>
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driver}"></property>
        <property name="jdbcUrl" value="${jdbc.url}"></property>
        <property name="user" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>
    <!-- 事务管理器 -->
    <bean id="dataSourceTransactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>
    <!-- 基于注解的事务管理 -->
    <tx:annotation-driven transaction-manager="dataSourceTransactionManager"/>


    <!--
        配置 SqlSessionFactoryBean!
        MyBatis：SqlSessionFactoryBean
        MyBatisPlus：com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean
    -->
    <bean id="sqlSessionFactoryBean" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
        <!-- 数据源 -->
        <property name="dataSource" ref="dataSource"/>
<!--        <property name="configLocation" value="classpath:mybatis-config.xml"/>-->
        <!-- 别名处理 -->
        <property name="typeAliasesPackage" value="com.itnxd.bean"/>

        <!--引入MP全局配置-->
        <!--configuration和configLocation两个配置互斥！-->
        <property name="configuration" ref="configuration"/>
        <property name="globalConfig" ref="globalConfig"/>
    </bean>


    <!--
        版本不同配置不同：https://baomidou.com/config/#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F
        定义MP的全局配置！
        - configuration
        - globalConfig
            - dbConfig
    -->

    <bean id="configuration" class="com.baomidou.mybatisplus.core.MybatisConfiguration">
        <!--
                驼峰命名！
                字段到数据库映射（JavaBean的lastName -> 数据库的last_name）
                默认都为true
            -->
        <property name="mapUnderscoreToCamelCase" value="true"></property>
    </bean>

    <bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
        <!--将dbConfig注册到globalConfig中-->
        <property name="dbConfig" ref="dbConfig"/>
    </bean>

    <bean id="dbConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig.DbConfig">
        <!--
            全局主键配置！全局表名前缀配置！
        -->
        <property name="idType" value="AUTO"></property>
        <property name="tablePrefix" value="tbl_"></property>
    </bean>

    <!--
    配置 mybatis 扫描 mapper 接口的路径
    -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.itnxd.mapper"></property>
    </bean>
</beans>
```





## 4、jdbc.properties





```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mp
jdbc.username=root
jdbc.password=123456
```







# 三、简单CRUD





## 1、MyBatis VS MyBatis-Plus



**基于 Mybatis：**

- 需要编写 EmployeeMapper 接口，并手动编写 CRUD 方法
- 提供 EmployeeMapper.xml 映射文件，并手动编写每个方法对应的 SQL 语句.

**基于 MP：**

- 只需要创建 EmployeeMapper 接口, 并继承 BaseMapper 接口.这就是使用 MP
- 需要完成的所有操作，甚至不需要创建 SQL 映射文件。 



```java
public interface EmployeeMapper extends BaseMapper<Employee> {

}
```



## 2、一些注解



- @TableName：JavaBean到表名的映射
- @TableId：主键注解，可以指明是自增主键
- @TableField：字段名到列名映射
  - exist属性：指明表中是否有该属性



**关于自增主键回显：**

- Mybatis：需要通过 useGeneratedKeys 以及 keyProperty 来设置
- MP：自动将主键值回写到实体类中



```java
@TableName(value = "tbl_employee")
public class Employee {
    /**
     * @TableId：主键注解
     * value：映射数据表的id列，一致无需设置
     * type：设置主键类型
     */
	@TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * @TableField：指定列名映射
     */
	@TableField(value = "last_name")
    private String lastName;
    private String email;
    private Integer gender;
    private Integer age;

    /**
     * exist=false：表示数据库中并没有对应字段，无需加进SQL语句中！
     */
    @TableField(exist = false)
    private Double salary;
    
    ...
```





**也可以在application-context.xml中配置：**

```xml
<bean id="sqlSessionFactoryBean" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">

    ...
    
    <!-- 别名处理 -->
    <property name="typeAliasesPackage" value="com.itnxd.bean"/>

    <!--引入MP全局配置-->
    <!--configuration和configLocation两个配置互斥！-->
    <property name="configuration" ref="configuration"/>
    <property name="globalConfig" ref="globalConfig"/>
</bean>


<!--
        版本不同配置不同：https://baomidou.com/config/#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F
        定义MP的全局配置！
        - configuration
        - globalConfig
            - dbConfig
    -->

<bean id="configuration" class="com.baomidou.mybatisplus.core.MybatisConfiguration">
    <!--
                驼峰命名！
                字段到数据库映射（JavaBean的lastName -> 数据库的last_name）
                默认都为true
            -->
    <property name="mapUnderscoreToCamelCase" value="true"></property>
</bean>

<bean id="globalConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig">
    <!--将dbConfig注册到globalConfig中-->
    <property name="dbConfig" ref="dbConfig"/>
</bean>

<bean id="dbConfig" class="com.baomidou.mybatisplus.core.config.GlobalConfig.DbConfig">
    <!--
            全局主键配置！全局表名前缀配置！
        -->
    <property name="idType" value="AUTO"></property>
    <property name="tablePrefix" value="tbl_"></property>
</bean>
```





## 3、简单CRUD





```java
public class TestMp {

    private ApplicationContext ioc =
            new ClassPathXmlApplicationContext("application-context.xml");

    private EmployeeMapper employeeMapper =
            ioc.getBean("employeeMapper", EmployeeMapper.class);

    /**
     * insert！！!
     */
    @Test
    public void test1(){
        Employee employee = new Employee(null, null, "nxd@email.com", 0, 23);
        /**
         * 上方insert方法会进行判断，不是全字段则默认插入NULL！
         * INSERT INTO tbl_employee ( email, gender, age ) VALUES ( ?, ?, ? )
         *
         * 旧版本可以全字段插入，insertAllColumn，新版本没有！
         *
         * 最后效果是一样！未写字段最后插入的都是NULL!
         */
        int res = employeeMapper.insert(employee);
        System.out.println(res);

        // 获取自增主键测试！(我们插入并没有设置id值)
        Integer id = employee.getId();
        System.out.println(id);
    }

    /**
     * update！！！
     */
    @Test
    public void test2(){
        int res = employeeMapper.updateById(new Employee(6, "nxd", "nnxxdd@email.con", 1, 22));
        System.out.println(res);

        UpdateWrapper<Employee> updateWrapper = new UpdateWrapper<>();
        updateWrapper.in("age", Arrays.asList(25, 30));

        employeeMapper.update(
                new Employee(null, "nxd", "nnxxdd@email.con",
                        1, 22), updateWrapper);

    }

    /**
     * select！！！
     */
    @Test
    public void test3(){

        Employee employee = employeeMapper.selectById(1);
        System.out.println(employee);

        /*QueryWrapper<Employee> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("age", 35);
        Employee employee1 = employeeMapper.selectOne(queryWrapper);
        System.out.println(employee1);

        queryWrapper.clear();
        queryWrapper.like("last_name", "%x%").lt("age", 26);
        List<Employee> employees = employeeMapper.selectList(queryWrapper);
        System.out.println(employees);

        List<Employee> employees1 = employeeMapper.selectBatchIds(Arrays.asList(2, 3, 4));
        System.out.println(employees1);

        HashMap<String, Object> map = new HashMap<>();
        map.put("last_name", "nxd");
        List<Employee> employees2 = employeeMapper.selectByMap(map);
        System.out.println(employees2);*/

        // 需要配置分页插件！后面配置！
        IPage<Employee> page = employeeMapper.selectPage(new Page<>(2, 3), null);
        System.out.println(page);
        List<Employee> records = page.getRecords();
        System.out.println(records);
    }

    /**
     * delete！！！
     */
    @Test
    public void test4(){

        int i = employeeMapper.deleteById(8);
        System.out.println(i);

        QueryWrapper<Employee> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("age", 23);
        int delete = employeeMapper.delete(queryWrapper);
        System.out.println(delete);

    }
}
```







# 四、Wrapper条件构造器



> 官方文档条件构造器介绍：[https://baomidou.com/guide/wrapper.html](https://baomidou.com/guide/wrapper.html)



**图示如下：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/09/26/eb28695e55bc92f35f38fae334453d8b.png)



**使用如下：**

```java
/**
 * 条件构造器Wrapper！
 *
 *  略！！！
 */
@Test
public void test5(){
	QueryWrapper<Employee> queryWrapper = new QueryWrapper<>();
    ....
    UpdateWrapper<Employee> employeeUpdateWrapper = new UpdateWrapper<>();
    ....
}
```







# 五、AR活动记录









## 1、简介





Active Record(活动记录)，是一种领域模型模式，特点是一个模型类对应关系型数据库中的一个表，而模型类的一个实例对应表中的一行记录。

ActiveRecord 一直广受动态语言（ PHP 、 Ruby 等）的喜爱，而 Java 作为准静态语言，对于 ActiveRecord 往往只能感叹其优雅，所以 MP 也在 AR 道路上进行了一定的探索！







## 2、使用



仅仅需要让实体类继承 Model 类且实现主键指定方法，即可开启 AR 之旅！



````java
public class Employee extends Model<Employee> {
	
    private Integer id;

    ....
}
````





**测试：**



```java
/**
     * ActiveRecord操作！
     * 增删改查！
     *
     * 由于JavaBean继承了Model！因此可以直接使用实体类调用其中Model中的方法！
     */
@Test
public void test6(){
    // 别扭操作！
    Employee employee = new Employee(null, "苍老师", "cjk@email.com", 0, 25);
    employee.insert();

    /*
            略！
    employee.update();
    employee.delete();
    employee.update();
    employee.selectPage();
    */
}
```





# 六、代码生成器



> 比MBG更加强大！



## 1、简介



MP 的代码生成器都是基于 java 代码来生成。

- MBG 基于 xml 文件进行代码生成 MyBatis 的代码生成器可生成: 实体类、Mapper 接口、Mapper 映射文件！

- MP 的代码生成器可生成: 实体类(可以选择是否支持 AR)、Mapper 接口、Mapper 映射文件、 Service 层、Controller 层！



## 2、pom.xml





```xml
<!--MP代码生成器-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.0</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.7</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.7</version>
</dependency>
```







## 3、测试



> 新版本配置：[https://baomidou.com/guide/generator-new.html](https://baomidou.com/guide/generator-new.html)

```java
 /**
     * 代码生成器生成代码！
     */
@Test
public void testGenerator() {

    // 1. 全局配置
    // 2. 数据源配置
    // 3. 策略配置
    // 4. 包名策略配置
    // 5. 整合配置

    // 代码生成器（基于3.4.1版本，新版改动太大）

    // 1. 全局配置
    GlobalConfig globalConfig = new GlobalConfig();
    String projectPath = System.getProperty("user.dir");
    // 文件输出目录
    globalConfig.setOutputDir(projectPath + "/src/main/java");
    // 设置作者名
    globalConfig.setAuthor("itnxd");
    // 是否打开输出目录（默认为true）
    globalConfig.setOpen(false);
    // 是否覆盖已有文件
    globalConfig.setFileOverride(true);
    // 去除生成的Service接口默认的"I"前缀
    globalConfig.setServiceName("%sService");
    // 指定生成的主键ID类型，这里一样的，设置为常规的主键自增
    globalConfig.setIdType(IdType.AUTO);

    globalConfig.setBaseResultMap(true);
    globalConfig.setBaseColumnList(true);
    globalConfig.setActiveRecord(true);

    // 2. 数据源配置
    DataSourceConfig dataSourceConfig = new DataSourceConfig();
    // 设置连接的数据库
    dataSourceConfig.setDbType(DbType.MYSQL);
    dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/mp");
    dataSourceConfig.setDriverName("com.mysql.cj.jdbc.Driver");
    dataSourceConfig.setUsername("root");
    dataSourceConfig.setPassword("n158903258");

    // 3. 包的配置
    PackageConfig packageConfig = new PackageConfig();
    // 设置父包名
    packageConfig.setParent("com.itnxd");
    packageConfig.setMapper("mapper");
    packageConfig.setController("controller");
    packageConfig.setEntity("bean");
    packageConfig.setService("service");
    packageConfig.setXml("mapper");

    // 4. 策略配置
    StrategyConfig strategy = new StrategyConfig();
    // 全局大写命名
    strategy.setCapitalMode(true);
    // 表名前缀
    strategy.setTablePrefix("tbl_");
    // 需要生成的表名（支持正则表达式）
    strategy.setInclude("tbl_employee");
    // 设置数据库表和字段映射到实体的命名策略，这里设置为蛇形命名转化为驼峰式
    strategy.setNaming(NamingStrategy.underline_to_camel);
    strategy.setColumnNaming(NamingStrategy.underline_to_camel);
    // 不设置为lombok模型（默认为false，如果需要，改为true）
    strategy.setEntityLombokModel(false);

    // 设置逻辑删除属性
    strategy.setLogicDeleteFieldName("deleted");
    // 自动填充策略设置
    TableFill gmtCreate = new TableFill("gmt_create", FieldFill.INSERT);
    TableFill gmtModified = new TableFill("gmt_modified", FieldFill.INSERT_UPDATE);
    ArrayList<TableFill> tableFills = new ArrayList<>();
    tableFills.add(gmtCreate);
    tableFills.add(gmtModified);
    strategy.setTableFillList(tableFills);
    // 乐观锁设置
    strategy.setVersionFieldName("version");

    // 创建一个代码自动生成器对象
    AutoGenerator autoGenerator = new AutoGenerator();
    // 配置注入代码生成器
    autoGenerator.setGlobalConfig(globalConfig);
    autoGenerator.setStrategy(strategy);
    autoGenerator.setDataSource(dataSourceConfig);
    autoGenerator.setPackageInfo(packageConfig);
    // 运行自动生成器
    autoGenerator.execute();
}
```



## 3、效果





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/09/26/d7a2515d42820cc95618fd6c78edc384.png)









# 七、MP插件拓展





## 1、简介





所有插件都将基于InnerInterceptor接口来实现功能：

目前已有的功能：

- 自动分页: PaginationInnerInterceptor
- 多租户: TenantLineInnerInterceptor
- 动态表名: DynamicTableNameInnerInterceptor
- 乐观锁: OptimisticLockerInnerInterceptor
- sql性能规范: IllegalSQLInnerInterceptor
- 防止全表更新与删除: BlockAttackInnerInterceptor





**注意：几个插件都一起配置了，在分页插件章节！**





## 2、分页插件



**application-context.xml：**

```xml
<bean id="sqlSessionFactoryBean" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
        <!-- 数据源 -->
        <property name="dataSource" ref="dataSource"/>
<!--        <property name="configLocation" value="classpath:mybatis-config.xml"/>-->
        <!-- 别名处理 -->
        <property name="typeAliasesPackage" value="com.itnxd.bean"/>

        <!--引入MP全局配置-->
        <!--configuration和configLocation两个配置互斥！-->
        <property name="configuration" ref="configuration"/>
        <property name="globalConfig" ref="globalConfig"/>

        <!--插件配置-->
        <property name="plugins">
            <array>
                <ref bean="mybatisPlusInterceptor"/>
            </array>
        </property>
    </bean>

    <bean id="mybatisPlusInterceptor" class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
        <property name="interceptors">
            <list>
                <ref bean="paginationInnerInterceptor"/>
                <ref bean="illegalSQLInnerInterceptor"/>
                <ref bean="optimisticLockerInnerInterceptor"/>
                <ref bean="blockAttackInnerInterceptor"/>
            </list>
        </property>
    </bean>

    <!--
    自动分页: PaginationInnerInterceptor
    多租户: TenantLineInnerInterceptor
    动态表名: DynamicTableNameInnerInterceptor
    乐观锁: OptimisticLockerInnerInterceptor
    sql性能规范: IllegalSQLInnerInterceptor
    防止全表更新与删除: BlockAttackInnerInterceptor
    -->
    <bean id="paginationInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor">
        <!-- 对于单一数据库类型来说,都建议配置该值,避免每次分页都去抓取数据库类型 -->
        <constructor-arg name="dbType" value="MYSQL"/>
    </bean>
    <bean id="illegalSQLInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.IllegalSQLInnerInterceptor"/>
    <bean id="optimisticLockerInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor"/>
    <bean id="blockAttackInnerInterceptor" class="com.baomidou.mybatisplus.extension.plugins.inner.BlockAttackInnerInterceptor"/>

```







**使用：**



```java
/**
 *
 * PaginationInnerInterceptor
 * 分页插件测试！
 */
@Test
public void test(){
    IPage<Employee> iPage = employeeMapper.selectPage(new Page<>(1, 2), null);

    List<Employee> records = iPage.getRecords();

    System.out.println(records);

    Page<Employee> page = new Page<>();
    System.out.println(page.getTotal()); // 总条数
    System.out.println(page.getCurrent()); // 当前页码
    System.out.println(page.getPages()); // 总页码
    System.out.println(page.getSize()); // 每页条数
    System.out.println(page.hasPrevious()); // 有没有上一页
    System.out.println(page.hasNext()); // 有没有下一页
}
```



## 3、防全表操作插件



SQL 执行分析拦截器，只支持 MySQL5.6.3 以上版本！

该插件的作用是分析 DELETE UPDATE 语句,防止小白或者恶意进行 DELETE UPDATE 全表操作！

- 只建议在开发环境中使用，不建议在生产环境使用

- 在插件的底层 通过 SQL 语句分析命令:Explain 分析当前的 SQL 语句，根据结果集中的 Extra 列来断定当前是否全表操作。





**使用：**

```java
/**
 *
 * BlockAttackInnerInterceptor
 * 针对 update 和 delete 语句 作用: 阻止恶意的全表更新删除
 */
@Test
public void test1(){
    // 全表删除会被阻止！抛出异常
    employeeMapper.delete(null);
}
```



## 4、乐观锁插件





如果想实现如下需求: 当要更新一条记录的时候，希望这条记录没有被别人更新！

**乐观锁的实现原理：**

- 取出记录时，获取当前 version 2 
- 更新时，带上这个 version 2 
- 执行更新时， set version = yourVersion+1 where version = yourVersion
- 如果 version 不对，就更新失败
- @Version 用于注解实体字段，必须要有。



**添加版本字段用于判断！**

```java
public class Employee extends Model<Employee> {
    private Integer id;
    private String lastName;
    private String email;
    private Integer gender;
    private Integer age;


    @Version
    private Integer version;
```



**表中同步增加version列！**



**使用：**

```java
/**
 * 乐观锁插件！
 * OptimisticLockerInnerInterceptor
 *
 * JavaBean中添加version字段，添加@Version注解，表中同步增加version列！
 *
 * 表中version列和更新时version不一致将不会update！
 */
@Test
public void test3(){

    Employee employee = new Employee(3, "ff", "hh", 1, 33);
    // 表中为2，我为1，无法更新成功！
    employee.setVersion(1);
    employeeMapper.update(employee, null);

}
```





## 5、性能分析插件





性能分析拦截器，用于输出每条 SQL 语句及其执行时间！

SQL 性能执行分析,开发环境使用，超过指定时间，停止运行。有助于发现问题！



**使用：**

```java
/**
 * sql性能分析插件！
 * IllegalSQLInnerInterceptor
 *
 * 没有生效，鬼知道哪里配置错误了！
 * 略！
 *
 */
@Test
public void test2(){

    employeeMapper.insert(new Employee(null, "jj", "hh", 1, 33));

}
```







# 八、公共字段自动填充







> 官方文档：[https://baomidou.com/guide/auto-fill-metainfo.html](https://baomidou.com/guide/auto-fill-metainfo.html)



**JavaBean的字段上增加注解 @TableFile(fill = FieldFill.INSERT)：** 



```java
/**
 * 插入和更新时自动填充！
 */
@TableField(fill = FieldFill.INSERT_UPDATE)
private String email;
```



**自定义公共字段填充处理器：**

```java
package com.itnxd.metaHandler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;

/**
 * @author ITNXD
 * @create 2021-09-26 14:44
 */
public class MyMetaObjectHandler implements MetaObjectHandler {

    /**
     * 插入操作自动填充！
     * @param metaObject
     */
    @Override
    public void insertFill(MetaObject metaObject) {
        Object fieldName = getFieldValByName("email", metaObject);
        if(fieldName == null){
            System.out.println("空，进行填充！------------");
            setFieldValByName("email", "xxx@email.com", metaObject);
        }
    }

    /**
     * 更新操作自动填充！
     * @param metaObject
     */
    @Override
    public void updateFill(MetaObject metaObject) {
        Object fieldName = getFieldValByName("email", metaObject);
        if(fieldName == null){
            System.out.println("空，进行填充！------------");
            setFieldValByName("email", "xxx@email.com", metaObject);
        }
    }
}
```



# 九、Idea 快速开发插件





MybatisX 辅助 idea 快速开发插件，为效率而生！在Idea插件市场搜索安装即可！

- 可以实现 java 与 xml 跳转
- 根据 Mapper 接口中的方法自动生成 xml 结构





