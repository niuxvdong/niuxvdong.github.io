---
title: Spring全家桶之Spring5-JdbcTemplate与事务操作
author: ITNXD
toc: true
abbrlink: 22145
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/bfc3135039b751146d7e559fc3d7f832.png
categories:
  - 开发框架
tags:
  - Spring
  - JdbcTemplate
  - 声明式事务
date: 2021-03-26 10:43:29
updated:
---







# 一、JdbcTemplate







> 可以使用Spring提供的JdbcTemplate来操作数据库！
>
> 虽然后面会被其他框架代替！







## 1、导包



**导入如下包：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/26/1b61ef16d8fdf40b7764476bd1df2d11.png)





## 2、配置XML





1. 开启注解扫描
2. 配置数据库连接池
3. 配置JdbcTemplate



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">


    <!--添加context和aop命名空间!-->

    <!--开启组件扫描-->
    <context:component-scan base-package="com.atguigu"></context:component-scan>

    <!--数据库连接池配置：-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"></property>
        <property name="url" value="jdbc:mysql:///user_db"></property>
        <property name="username" value="root"></property>
        <property name="password" value="xxx"></property>
    </bean>

    <!--jdbcTemplate配置：-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <!--注入dataSource:-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>


</beans>
```





## 3、创建Service和Dao







```java
@Repository
public class UserDaoImpl implements UserDao {

}

@Service
public class UserService {

    // 注入Dao
    @Autowired
    private UserDao userDao;
}
```





## 4、增删改查操作







**UserDaoImpl实现：**



queryForObject有三个参数 ：

- 第一个参数：sql 语句
- 第二个参数：RowMapper 是接口，针对返回不同类型数据，使用这个接口里面实现类完成数据封装\
- 第三个参数：sql 语句值



query有三个参数：

- 第一个参数：sql 语句
- 第二个参数：RowMapper 是接口，针对返回不同类型数据，使用这个接口里面实现类完成数据封装
- 第三个参数：sql 语句值



```java
@Repository
public class UserDaoImpl implements UserDao {

    // 注入JdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void addUser(User user) {
        String sql = "insert into t_user values(?, ?, ?)";
        int update = jdbcTemplate.update(sql, user.getUserId(), user.getUserName(), user.getUserStatus());
        System.out.println(update);
    }

    @Override
    public void update(User user) {
        String sql = "update t_user set user_name = ? where user_id = ?";
        int update = jdbcTemplate.update(sql, user.getUserName(), user.getUserId());
        System.out.println(update);
    }

    @Override
    public void delete(String id) {
        String sql = "delete from t_user where user_id = ?";
        int update = jdbcTemplate.update(sql, id);
        System.out.println(update);
    }

    @Override
    public int queryCount() {
        String sql = "select count(*) from t_user";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public User queryBook(String id) {
        String sql = "select * from t_user where user_id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), id);
    }

    @Override
    public List<User> queryForAll() {
        String sql = "select * from t_user";
        return (List<User>) jdbcTemplate.query(sql, new BeanPropertyRowMapper<User>(User.class));
    }
}
```





## 5、批量操作







```java
/**
 * 将list集合中的object数组拿到，遍历后填入占位符！
 * @param batchArgs
 */
@Override
public void batchAdd(List<Object[]> batchArgs) {
    String sql = "insert into t_user values(?,?,?)";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.out.println(Arrays.toString(ints));
}

@Override
public void batchUpdate(List<Object[]> batchArgs) {
    String sql = "update t_user set user_name = ? where user_id = ?";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.out.println(Arrays.toString(ints));
}

@Override
public void batchDelete(List<Object[]> batchArgs) {
    String sql = "delete from t_user where user_id = ?";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.out.println(Arrays.toString(ints));
}
```











# 二、事务操作







> 以转账多钱和少钱为例！









## 1、概述



1. 事务添加到 JavaEE 三层结构里面 Service 层（业务逻辑层）
2. 在 Spring 进行事务管理操作
   1. 编程式事务管理
   2. 声明式事务管理（使用）：即具体事务管理有Spring底层实现
3. 声明式事务管理
   1. 基于注解方式（使用）
   2. 基于 xml 配置文件方式
4. 在 Spring 进行声明式事务管理，底层使用 AOP 原理
5. Spring事务管理API：提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现类



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/26/e493fc1acabe6b92e33a2e5fe802c2d9.png)









## 2、导包



导的包同上一节的JdbcTemplate！





## 3、创建Dao和Service



> service 注入 dao，在 dao 注入 JdbcTemplate，在 JdbcTemplate 注入 DataSource！





**UserDaoImpl：**



```java
@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // lucy给mary转账100

    @Override
    public void addMoney() {
        String sql = "update t_account set money = money - ? where username = ?";
        jdbcTemplate.update(sql, 100, "lucy");
    }

    @Override
    public void reduceMoney() {
        String sql = "update t_account set money = money + ? where username = ?";
        jdbcTemplate.update(sql, 100, "mary");
    }
}
```









**UserService：**



编程式事务管理和声明式事务管理！



```java
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    // 转账方法：
    public void accountMoney(){

        // 下面这一步步的手动实现就叫做 编程式事务管理！
//        try{
//            // 1. 开启事务
//
//            // 2. 业务逻辑
//            // lucy少100
//            userDao.reduceMoney();
//            // mary多100
//            userDao.addMoney();
//            // 3. 事务提交
//        }catch (Exception e){
//            // 4. 事务回滚
//
//            e.printStackTrace();
//        }


        // 使用事务注解后：
        // lucy少100
        userDao.reduceMoney();

        int i = 1 / 0; // 模拟异常

        // mary多100
        userDao.addMoney();
    }
}
```







## 3、基于注解的声明式事务管理











#### 3.1、XML配置



1. 开启注解扫描
2. 配置数据库连接池
3. 配置jdbcTemplate
4. 创建事务管理器
5. 开启事务注解



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                           http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd"
>


    <!--添加context和aop和tx命名空间!-->

    <!--开启组件扫描-->
    <context:component-scan base-package="com.atguigu"></context:component-scan>

    <!--数据库连接池配置：-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"></property>
        <property name="url" value="jdbc:mysql:///user_db"></property>
        <property name="username" value="root"></property>
        <property name="password" value="xxx"></property>
    </bean>

    <!--jdbcTemplate配置：-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <!--注入dataSource:-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>


    <!--创建事务管理器-->
    <!--DataSourceTransactionManager：myBatis和jdbc使用-->
    <!--HibernateTransactionManager：Hibernate使用-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--注入数据源DataSource，ref指定我们上面创建的数据库连接池-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!--开启事务注解，tx名称空间，指定使用哪个事务管理器-->
    <tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>

</beans>
```







#### 3.2、Service层上添加事务注解



在 service 类上面（或者 service 类里面方法上面）添加事务注解：

1. `@Transactional`，这个注解添加到类上面，也可以添加方法上面
2. 如果把这个注解添加类上面，这个类里面所有的方法都添加事务
3. 如果把这个注解添加方法上面，为这个方法添加事务



**Transactional事务注解有以下参数：**



1. propagation：事务传播行为，**多事务**方法直接进行调用，这个过程中事务 是如何进行管理的，**前两个重要：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/26/c4846dee195138820239ec8c3b569e80.png)



**Spring中的七种传播行为：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/26/570fbc894299b58708dda920fb086048.png)



2. ioslation：事务隔离级别，默认为`REPEATABLE_READ`

3. timeout：超时时间
   1. 事务需要在一定时间内进行提交，如果不提交进行回滚
   2. 默认值是 -1 ，设置时间以秒单位进行计算

4. readOnly：是否只读
   1. 读：查询操作，写：添加修改删除操作
   2. readOnly 默认值 false，表示可以查询，可以添加修改删除操作
   3. 设置 readOnly 值是 true，设置成 true 之后，只能查询
5. rollbackFor：回滚，设置出现哪些异常进行事务回滚
6. noRollbackFor：不回滚，设置出现哪些异常不进行事务回滚



**代码参考：**



```java
@Transactional(propagation = Propagation.REQUIRED,
        isolation = Isolation.REPEATABLE_READ,
        timeout = 5,
        readOnly = false,
        rollbackFor = Exception.class)
public class UserService {
    
}
```



## 4、基于XML配置的声明式事务管理





1. 配置事务管理器
2. 配置通知
3. 配置切入点和切面







```xml
<!--基于xml方式实现！-->

    <!--一、创建事务管理器-->
    <!--DataSourceTransactionManager：myBatis和jdbc使用-->
    <!--HibernateTransactionManager：Hibernate使用-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--注入数据源DataSource，ref指定我们上面创建的数据库连接池-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!--xml方式不需要：-->
<!--    &lt;!&ndash;开启事务注解，tx名称空间，指定使用哪个事务管理器&ndash;&gt;-->
<!--    <tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>-->

    <!--二、配置通知-->
    <tx:advice id="txAdvice">
        <!--配置事务参数-->
        <tx:attributes>
            <!--指定哪种规则的方法上面添加事务-->
            <tx:method name="accountMoney" isolation="REPEATABLE_READ" timeout="5"/>
            <!--或者：account*表示以account开头的都添加事务-->
            <tx:method name="account*" propagation="REQUIRED"></tx:method>
        </tx:attributes>
    </tx:advice>

    <!--三、配置切入点和切面-->
    <aop:config>
        <!--配置切入点，使用切入点表达式-->
        <aop:pointcut id="pt" expression="execution(* com.atguigu.service.UserService.*(..))"/>
        <!--配置切面-->
        <aop:advisor advice-ref="txAdvice" pointcut-ref="pt"></aop:advisor>
    </aop:config>
```





## 5、完全注解开发





> 创建配置类，使用配置类替代 xml 配置文件！







```java
@Configuration // 表名是注解类
@ComponentScan(basePackages = {"com.atguigu"}) // 开启组件扫描
@EnableTransactionManagement // 开启事务
public class TXConfig {

    // 创建数据库连接池
    @Bean
    public DruidDataSource getDruidDataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl("jdbc:mysql:///user_db");
        dataSource.setDriverClassName("com.mysql.cj.jdbc.driver");
        dataSource.setUsername("root");
        dataSource.setPassword("xxx");
        return dataSource;
    }

    // 创建JdbcTemplate对象
    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource dataSource){ // 到IOC容器中找到上面方法的druidDataSource
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        // 注入DataSource
        jdbcTemplate.setDataSource(dataSource);
        // 或者直接调用，这里不会再次创建，这样写没有问题！
//        jdbcTemplate.setDataSource(getDruidDataSource());
        return jdbcTemplate;
    }

    // 创建事务管理器
    // 注入DataSource：两种方法都可，同上
    @Bean
    public DataSourceTransactionManager getDataSourceTransactionManager(){
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        // 注入DataSource
        transactionManager.setDataSource(getDruidDataSource());
        return transactionManager;
    }

}
```







**测试：**



```java
// 基于完全注解
@Test
public void test3() {
    ApplicationContext context = new AnnotationConfigApplicationContext(TXConfig.class);
    UserService userService = context.getBean("userService", UserService.class);
    userService.accountMoney();
}
```