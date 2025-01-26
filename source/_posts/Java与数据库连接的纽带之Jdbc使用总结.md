---
title: Java与数据库连接的纽带之JDBC使用总结
author: ITNXD
toc: true
abbrlink: 49844
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/04/336cc0b0afbf531ecc0d41f84c7893e7.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/04/336cc0b0afbf531ecc0d41f84c7893e7.png
categories:
  - JDBC
tags:
  - JDBC
date: 2021-03-04 11:05:39
updated:
---





# 一、JDBC概述





## 1、对JDBC的理解



`JDBC(Java Database Connectivity)`是一个独立于特定数据库管理系统、通用的`SQL`数据库存取和操作的**公共接口**（一组`API`）！

**简单理解：**`JDBC`，是`SUN`提供的一套 `API`，使用这套`API`可以实现对具体数据库的操作；不同的数据库厂商，需要针对这套**接口**，提供不同实现。不同的实现的集合，即为不同数据库的**驱动**。提供数据库驱动`jar`包。我们可以导入这些`jar`包进行编程。



**如下图所示：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/04/1452fe993847e6e858c4470c7f997f57.png)





- `JDBC`接口（`API`）包括两个层次：

  - **面向应用的`API`**：`Java API`，抽象接口，供应用程序**开发人员**使用

  - **面向数据库的`API`**：`Java Driver API`，供**开发商**开发数据库驱动程序用。

    





## 2、 Java中数据存储技术分类





- 在`Java`中，数据库存取技术可分为如下几类：
  - **`JDBC`**直接访问数据库
  - `JDO (Java Data Object )`技术

  - **第三方`O/R`工具**，如`Hibernate, Mybatis` 等

- `JDBC`是`java`访问数据库的基石，`JDO、Hibernate、MyBatis`等只是更好的封装了`JDBC`。











# 二、获取数据库连接





> 本教程全部使用最新版的`mysql`数据库驱动，`mysql-connector-java-8.0.23.jar`
>
> **注意**：新版本驱动将旧版驱动遗弃了，由`com.mysql.jdbc.Driver`改为 `com.mysql.cj.jdbc.Driver`



## 1、方式一



> 直接使用`Driver`连接数据库！



```java
public void test1() throws SQLException {

    Driver driver = new com.mysql.cj.jdbc.Driver();

    // jdbc:mysql：协议
    // test：具体数据库
    String url = "jdbc:mysql://localhost:3306/test";
    Properties info = new Properties();
    info.setProperty("user", "root");
    info.setProperty("password", "123");

    Connection conn = driver.connect(url, info);
    System.out.println(conn);
}
```





**几种常用数据库的 JDBC URL：**

- `jdbc:mysql://主机名称:mysql服务端口号/数据库名称?参数=值&参数=值`
- `jdbc:mysql://localhost:3306/test`
- `jdbc:mysql://localhost:3306/test**?useUnicode=true&characterEncoding=utf8`**（如果JDBC程序与服务器端的字符集不一致，会导致乱码，那么可以通过参数指定服务器端的字符集）
- `jdbc:mysql://localhost:3306/atguigu?user=root&password=123456`





## 2、方式二



> 对方式一的迭代：如下程序中不出现第三方`API`，程序具有更好的移植性！





```java
public void test2() throws Exception {

    // 1. 获取driver实现类对象，使用反射
    Class<?> clazz = Class.forName("com.mysql.cj.jdbc.Driver");
    Driver driver = (Driver) clazz.getDeclaredConstructor().newInstance();

    // 2. 提供要连接的数据库
    String url = "jdbc:mysql://localhost:3306/test";

    // 3. 提供连接需要的用户名和密码
    Properties info = new Properties();
    info.setProperty("user", "root");
    info.setProperty("password", "123");

    // 4. 获取连接
    Connection conn = driver.connect(url, info);
    System.out.println(conn);
}
```





## 3、方式三



> 使用`DriverManager`替换`Driver`！





```java

@Test
public void test3() throws Exception{
    // 1. 获取driver实现类对象，使用反射
    Class<?> clazz = Class.forName("com.mysql.cj.jdbc.Driver");
    Driver driver = (Driver) clazz.getDeclaredConstructor().newInstance();

    // 2. 提供连接信息
    String url = "jdbc:mysql://localhost:3306/test";
    String user = "root";
    String password = "123";

    // 3. 注册驱动
    DriverManager.registerDriver(driver);

    // 4. 获取连接（有多个重载方法！）
    Connection conn = DriverManager.getConnection(url, user, password);
    System.out.println(conn);
}
```









## 4、方式四



> 对方式三的优化！



**几个注意点：**



1. `java.sql.driver`中使用静态代码块完成了驱动的注册！该步骤可以省略！

```java
static {
    try {
        java.sql.DriverManager.registerDriver(new Driver());
    } catch (SQLException E) {
        throw new RuntimeException("Can't register driver!");
    }
}
```



2. 数据库厂家（`mysql`）已经内置了`Class.forName("com.mysql.cj.jdbc.Driver");`其中的指定的包名在：该包下的`META-INF/services/java.sql.Driver`文件中为`com.mysql.cj.jdbc.Driver`虽然可以省略，但**不建议省略**，可能有的数据库厂家没有内置！目前`mysql`和`oracle`都内置了！



```java
public void test4() throws Exception{

    // 1. 提供连接信息
    String url = "jdbc:mysql://localhost:3306/test";
    String user = "root";
    String password = "xxx";

    // 2. 加载Driver
    Class.forName("com.mysql.cj.jdbc.Driver");

    //        Driver driver = (Driver) clazz.getDeclaredConstructor().newInstance();

    //        DriverManager.registerDriver    (driver);

    // 3. 获取连接
    Connection conn = DriverManager.getConnection(url, user, password);
    System.out.println(conn);
}
```







## 5、方式五（终极版）



> **对方式四改进，最终版本！**
>
> 将连接所需信息写到**配置文件**中再进行**读取**！
>
> 防止部署到`tomcat`配置文件读取不到，我们将配置文件放到`src`下！
>
> **优点：**
>
> - 实现了数据与代码的分离
> - 如果需要修改配置文件信息，可以避免程序重新打包







```java
public void test5() throws Exception {
    // 自定义类是系统类加载器：类加载器主要作用就是获取src下的配置文件！
    // 1. 读取配置文件的四个基本信息
    InputStream is = CollectionTest.class.getClassLoader().getResourceAsStream("jdbc.properties");

    Properties properties = new Properties();
    properties.load(is);

    String user = properties.getProperty("user");
    String password = properties.getProperty("password");
    String url = properties.getProperty("url");
    String driverClass = properties.getProperty("driverClass");

    // 2. 加载驱动
    Class.forName(driverClass);

    // 3. 获取连接
    Connection conn = DriverManager.getConnection(url, user, password);
    System.out.println(conn);
}
```



**`jdbc.properties`文件内容如下：**



```properties
# JDBC配置文件，不要有空格！
user=root
password=xxx
url=jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true
driverClass=com.mysql.cj.jdbc.Driver
```





**使用配置文件的好处：**

1. 实现了代码和数据的分离，如果需要修改配置信息，直接在配置文件中修改，不需要深入代码
2. 如果修改了配置信息，省去重新编译的过程。



**用到的类加载器如图：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/13/9871609ce62dff37dbc3dc641218c5c7.png)













# 三、使用PreparedStatement实现CRUD操作





## 1、java.sql下的三大接口



**在 java.sql 包中有 3 个接口分别定义了对数据库的调用的不同方式：**

- `Statement`：用于执行静态 SQL 语句并返回它所生成结果的对象。 
- `PrepatedStatement`：SQL 语句被**预编译**并存储在此对象中，可以使用此对象多次**高效**地执行该语句。
- `CallableStatement`：用于执行 SQL 存储过程



## 2、Statement的弊端



> **SQL注入：**SQL 注入是利用某些系统没有对用户输入的数据进行充分的检查，而在用户输入数据中注入非法的 SQL 语句段或命令(如：`SELECT user, password FROM user_table WHERE user='1' OR 1 = ' AND password = ' OR '1' = '1'`) ，从而利用系统的 SQL 引擎完成恶意行为的做法。
>
> 在上述语句中，`user：1' OR 1 = `，`password： OR '1' = '1`，该语句传到数据库服务器会被理解为几个与或语句，而最后一个语句永远成立，导致数据发生错误与不安全！
>
> **拼串：**`String sql = "SELECT user,password FROM user_table WHERE USER = '" + userName + "' AND PASSWORD = '" + password + "'";`



1. 存在拼串操作，繁琐
2. 存在SQL注入问题
3. `Statement`没办法操作`Blob`类型变量
4. `Statement`实现批量插入时，效率较低



**所以**：使用`preparedStatement`替换，解决上述所有问题！









## 3、两种思想





- 面向接口编程的思想

- ORM思想(`object relational mapping`)
  - 一个数据表对应一个java类
  - 表中的一条记录对应java类的一个对象
  - 表中的一个字段对应java类的一个属性



**注意：sql是需要结合列名和表的属性名来写。注意起别名。**



## 4、preparedStatement使用





#### 4.1、preparedStatement介绍





- 可以通过调用 `Connection` 对象的 `preparedStatement(String sql)`方法获取 `PreparedStatement` 对象
- `PreparedStatement` 接口是 `Statement` 的**子接口**，它表示**一条预编译过的 SQL 语句**
- `PreparedStatement `对象所代表的 SQL 语句中的参数用问号`(?)`来表示，调用 `PreparedStatement `对象的 `setXxx() `方法来设置这些参数. `setXxx()` 方法有两个参数，第一个参数是要设置的 SQL 语句中的参数的索引(从 `1 `开始)，第二个是设置的 SQL 语句中的参数的值





#### 4.2、PreparedStatement vs Statement





- 代码的可读性和可维护性。

- **PreparedStatement 能最大可能提高性能：**
  - DBServer会对**预编译**语句提供性能优化。因为预编译语句有可能被重复调用，所以<u>语句在被DBServer的编译器编译后的执行代码被缓存下来，那么下次调用时只要是相同的预编译语句就不需要编译，只要将参数直接传入编译过的语句执行代码中就会得到执行。</u>
  - 在statement语句中,即使是相同操作但因为数据内容不一样,所以整个语句本身不能匹配,没有缓存语句的意义.事实是没有数据库会对普通语句编译后的执行代码缓存。这样<u>每执行一次都要对传入的语句编译一次。</u>
  - (语法检查，语义检查，翻译成二进制命令，缓存)

- PreparedStatement 可以防止 SQL 注入 







#### 4.3、 Java与SQL对应数据类型转换



|      Java类型      |         SQL类型          |
| :----------------: | :----------------------: |
|      boolean       |           BIT            |
|        byte        |         TINYINT          |
|       short        |         SMALLINT         |
|        int         |         INTEGER          |
|        long        |          BIGINT          |
|       String       | CHAR,VARCHAR,LONGVARCHAR |
|    byte   array    | BINARY  ,    VAR BINARY  |
|   java.sql.Date    |           DATE           |
|   java.sql.Time    |           TIME           |
| java.sql.Timestamp |        TIMESTAMP         |













#### 4.4、数据库连接与释放封装到JDBCUtils中



```java
public class JDBCUtils {

    /**
     * 获取数据库的连接！
     *
     * @return Connection
     * @throws Exception
     */
    public static Connection getConnection() throws Exception{
        // 1. 读取配置文件的四个基本信息
        InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");

        Properties properties = new Properties();
        properties.load(is);

        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        String driverClass = properties.getProperty("driverClass");

        // 2. 加载驱动
        Class.forName(driverClass);

        // 3. 获取连接
        Connection conn = DriverManager.getConnection(url, user, password);

        return conn;
    }

    /**
     * 关闭连接和 Statement的操作！
     *
     * @param conn Connection
     * @param ps Statement
     */
    public static void closeResource(Connection conn, Statement ps){
        try {
            if(ps != null)
                ps.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if(conn != null)
                conn.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    /**
     * 资源关闭操作！
     *
     * @param conn Connection
     * @param ps Statement
     * @param rs ResultSet
     */
    public static void closeResource(Connection conn, Statement ps, ResultSet rs){
        try {
            if(ps != null)
                ps.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if(conn != null)
                conn.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if(rs != null)
                rs.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
```







#### 4.5、增删改实现



1. 若执行查询语句，有结果集，则返回`true`，若执行增删改操作，无返回集，则返回`false`
        
2. 可以使用`executeUpdate()`方法根据返回值判断执行结果的成与败：根据影响的行数返回值，0或非0！来判断是否成功！`return ps.executeUpdate();`



```java
public void update(String sql, Object ...args) {
    Connection conn = null;
    PreparedStatement ps = null;
    try {
        // 1. 获取数据库连接
        conn = JDBCUtils.getConnection();
        // 2. 预编译sql语句，返回PrepareStatement实例
        ps = conn.prepareStatement(sql);
        // 3. 填充占位符
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }
        // 4. 执行操作
        ps.execute();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        // 5. 资源关闭
        JDBCUtils.closeResource(conn, ps);
    }
}

// 测试通用增删改操作！
// 注意：若表名为关键字，需要加上``，例如order
@Test
public void test3(){
    // 删：
    String sql = "delete from customers where id = ?";
    update(sql, 3);

    // 改：
    String sql1 = "update `order` set order_name = ? where order_id = ?";
    update(sql1, "DD", 2);

    // 增：
    String sql2 = "insert into customers(name, email, birth) values(?, ?, ?)";
    update(sql2, "陈小纭", "cxy@gmail.com", new Date(System.currentTimeMillis()));
}
```





#### 4.6、查询实现



```java
/**
 * 1、针对所有表查询的通用方法！
 *
 * @param clazz Class<T>
 * @param sql String
 * @param args Object
 * @param <T> 泛型方法
 * @return T
 */
public <T> T getInstance(Class<T> clazz, String sql, Object ...args){
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
        conn = JDBCUtils.getConnection();
        ps = conn.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }

        rs = ps.executeQuery();
        // 获取结果集的元数据！
        ResultSetMetaData metaData = rs.getMetaData();
        // 通过结果集的元数据获取列数！
        int columnCount = metaData.getColumnCount();
        if(rs.next()){
            T t = clazz.getDeclaredConstructor().newInstance();
            for (int i = 0; i < columnCount; i++) {
                // 获取到每一列的值
                Object columnValue = rs.getObject(i + 1);
                // 获取到每一列的别名或列名！（建议）
                String columnLabel = metaData.getColumnLabel(i + 1);
                // 使用反射设置值，给customer指定的属性columnLabel，赋值为columnValue
                Field field = clazz.getDeclaredField(columnLabel);
                field.setAccessible(true);
                field.set(t, columnValue);
            }
            return t;
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps, rs);
    }

    return null;
}

// 对通用方法的测试！
@Test
public void test(){
    String sql = "select order_id orderId, order_name orderName, order_date orderDate from `order` where order_id = ?";
    Orders order = getInstance(Orders.class, sql, 1);
    System.out.println(order);

    String sql1 = "select id, name, email from customers where id = ?";
    Customers customer = getInstance(Customers.class, sql1, 1);
    System.out.println(customer);
}

/**
 * 2、针对所有表查询的通用方法！---解决多条数据返回！
 * @param clazz Class<T>
 * @param sql String
 * @param args Object
 * @param <T> 泛型方法
 * @return List<T>
 */
public <T> List<T> getList(Class<T> clazz, String sql, Object ...args){
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
        conn = JDBCUtils.getConnection();
        ps = conn.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }

        rs = ps.executeQuery();
        // 获取结果集的元数据！
        ResultSetMetaData metaData = rs.getMetaData();
        // 通过结果集的元数据获取列数！
        int columnCount = metaData.getColumnCount();
        // 创建List集合
        ArrayList<T> list = new ArrayList<>();
        while(rs.next()){
            T t = clazz.getDeclaredConstructor().newInstance();
            for (int i = 0; i < columnCount; i++) {
                // 获取到每一列的值
                Object columnValue = rs.getObject(i + 1);
                // 获取到每一列的别名或列名！（建议）
                String columnLabel = metaData.getColumnLabel(i + 1);
                // 使用反射设置值，给customer指定的属性columnLabel，赋值为columnValue
                Field field = clazz.getDeclaredField(columnLabel);
                field.setAccessible(true);
                field.set(t, columnValue);
            }
            list.add(t);
        }
        return list;
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps, rs);
    }

    return null;
}

@Test
public void test2(){
    String sql = "select id, name, email from customers where id < ?";
    List<Customers> list = getList(Customers.class, sql, 5);
    list.forEach(System.out::println);

    // 或
    String sql1 = "select id, name, email from customers";
    List<Customers> list1 = getList(Customers.class, sql1);
    list1.forEach(System.out::println);
}
```







## 5、ResultSet与ResultSetMetaData介绍







#### 5.1、ResultSet



- 查询需要调用`PreparedStatement` 的 `executeQuery()` 方法，查询结果是一个`ResultSet` 对象
- `ResultSet` 对象以逻辑表格的形式封装了执行数据库操作的结果集，`ResultSet `接口由数据库厂商提供实现
- `ResultSet` 对象维护了一个指向当前数据行的**游标**，初始的时候，游标在**第一行之前**，可以通过 `ResultSet` 对象的 `next()` 方法移动到下一行。调用 `next()`方法检测下一行是否有效。若有效，该方法返回 `true`，且指针**下移**。相当于`Iterator`对象的 `hasNext()` 和 `next()` 方法的结合体。
- 当指针指向一行时, 可以通过调用 `getXxx(int index)` 或 `getXxx(String columnName)` 获取每一列的值。
- **注意：**Java与数据库交互涉及到的相关Java API中的索引都**从1开始。**





#### 5.2、ResultSetMetaData



> 可用于获取关于 `ResultSet` 对象中列的类型和属性信息的对象！

- ResultSetMetaData meta = rs.getMetaData();
  - **getColumnName**(int column)：获取指定列的名称
  - **getColumnLabel**(int column)：获取指定列的别名（无别名则为列名）
  - **getColumnCount**()：返回当前 ResultSet 对象中的列数。 

  - getColumnTypeName(int column)：检索指定列的数据库特定的类型名称。 
  - getColumnDisplaySize(int column)：指示指定列的最大标准宽度，以字符为单位。 
  - **isNullable**(int column)：指示指定列中的值是否可以为 null。 

  - isAutoIncrement(int column)：指示是否自动为指定列进行编号，这样这些列仍然是只读的。







# 四、操作Blob类型字段



## 1、BLOB类型介绍



> MySQL中，BLOB是一个二进制大型对象，是一个可以存储大量数据的容器，它能容纳不同大小的数据。插入BLOB类型的数据必须使用`PreparedStatement`，因为BLOB类型的数据无法使用字符串拼接写的。
>
> 需要注意的是：如果存储的文件过大，数据库的性能会下降。
>
> 如果在指定了相关的Blob类型以后，还报错：xxx too large，那么在mysql的安装目录下，找my.ini文件加上如下的配置参数： **max_allowed_packet=16M**。同时注意：修改了my.ini文件之后，需要重新启动mysql服务。
>
> **注意：mysql8.0以上`mediumblob`（16m）没有`package`的1m限制！无需去my.ini去配置！**



**MySQL的四种BLOB类型：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/04/29e703f205176b182bff881b8e3ebb49.png)



## 2、插入实现



```java
public void test1() {
    Connection conn = null;
    PreparedStatement ps = null;
    try {
        conn = JDBCUtils.getConnection();
        String sql = "insert into customers(name, email, birth, photo) values(?, ?, ?, ?)";

        ps = conn.prepareStatement(sql);

        ps.setObject(1, "牛逼");
        ps.setObject(2, "nb@gmail.com");
        ps.setObject(3, "2021-02-01");
        ps.setBlob(4, new FileInputStream("hh2.png"));

        ps.execute();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps);
    }
}
```



## 4、查询实现





```java
public void test2() {
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    InputStream is = null;
    FileOutputStream fos = null;
    try {
        conn = JDBCUtils.getConnection();
        String sql = "select id,name,email,birth,photo from customers where id = ?";
        ps = conn.prepareStatement(sql);
        ps.setInt(1, 22);

        rs = ps.executeQuery();

        if(rs.next()){
            // 可以通过索引也可以通过别名！
            int id = rs.getInt("id");
            String name = rs.getString("name");
            String email = rs.getString("email");
            Date birth = rs.getDate("birth");
            Blob photo = rs.getBlob("photo");

            Customers cust = new Customers(id, name, email, birth);
            System.out.println(cust);

            // 将二进制图片写入本地！
            is = photo.getBinaryStream();
            fos = new FileOutputStream("nb.jpg");
            byte[] buffer = new byte[1024];
            int len = 0;
            while((len = is.read(buffer)) != -1){
                fos.write(buffer, 0, len);
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            if(is != null)
                is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if(fos != null)
                fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        JDBCUtils.closeResource(conn, ps, rs);
    }
}
```





# 五、批量插入





## 1、方式一：使用Statement



> 已经弃用`Statement`，了解即可！每次都创建`sql`语句！效率极低！



```java
Connection conn = JDBCUtils.getConnection();
Statement st = conn.createStatement();
for(int i = 1;i <= 20000;i++){
    String sql = "insert into goods(name)values('name_" + i + "')";
    st.execute(sql);
}
```





## 2、方式二：使用prepareStatement



> 优化：使用`prepareStatement`的预编译SQL语句，减少SQL创建次数！一次编译，多次使用！可参考`prepareStatement`与`statement`的区别！



```java
public void test1() {
    Connection conn = null;
    PreparedStatement ps = null;
    try {
        conn = JDBCUtils.getConnection();
        String sql = "insert into goods(name) values(?)";
        ps = conn.prepareStatement(sql);

        long start = System.currentTimeMillis();

        for (int i = 0; i < 20000; i++) {
            ps.setObject(1, "name_" + i);
            ps.execute();
        }

        long end = System.currentTimeMillis();

        System.out.println("用时：" + (end - start));
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps);
    }
}
```







## 3、方式三：使用Batch优化



**注意点：** mysql服务器默认是关闭批处理的，我们需要通过一个参数，让mysql开启批处理的支持。`rewriteBatchedStatements=true` 写在配置文件的url后面。



**三个相关方法：**

- **addBatch(String)：添加需要批量处理的SQL语句或是参数；**
- **executeBatch()：执行批量处理语句；**
- **clearBatch(): 清空缓存的数据**



**jdbc.properties文件修改如下：**

```properties
url=jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true
```



**代码实现：**



```java
public void test2(){
    Connection conn = null;
    PreparedStatement ps = null;
    try {
        conn = JDBCUtils.getConnection();
        String sql = "insert into goods(name) values(?)";
        ps = conn.prepareStatement(sql);

        long start = System.currentTimeMillis();

        for (int i = 0; i < 1000000; i++) {
            ps.setObject(1, "name_" + i);

            // 1. 攒够缓存Batch
            ps.addBatch();
            if(i % 500 == 0){
                // 2. 批量执行缓存Batch
                ps.executeBatch();
                // 3. 清空缓存Batch
                ps.clearBatch();
            }
        }

        long end = System.currentTimeMillis();

        System.out.println("用时：" + (end - start)); // 100w数据用时27300
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps);
    }
}
```



## 4、方式四：关闭自动提交（最优）



> mysql默认执行完语句都会自动提交，因此可以设置关闭自动提交来提高效率！执行完毕再进行手动提交！



```java
public void test3(){
    Connection conn = null;
    PreparedStatement ps = null;
    try {
        conn = JDBCUtils.getConnection();

        // 一、关闭自动提交
        conn.setAutoCommit(false);

        String sql = "insert into goods(name) values(?)";
        ps = conn.prepareStatement(sql);

        long start = System.currentTimeMillis();

        for (int i = 0; i < 1000000; i++) {
            ps.setObject(1, "name_" + i);

            // 1. 攒够缓存Batch
            ps.addBatch();
            if(i % 500 == 0){
                // 2. 批量执行缓存Batch
                ps.executeBatch();
                // 3. 清空缓存Batch
                ps.clearBatch();
            }
        }

        // 二、手动提交
        conn.commit();

        long end = System.currentTimeMillis();

        System.out.println("用时：" + (end - start)); // 100w数据用时19448
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps);
    }
}
```











# 六、数据库事务



> [参考我之前写的文章，数据库事务处理，点击这里！](https://itnxd.eu.org/posts/30836.html#%E4%BA%94%E3%80%81TCL%E8%AF%AD%E8%A8%80)





## 1、对通用增删改考虑事务的优化



> 传入Connection连接即可，再外部连接使用全部结束后再关闭！
>
> **注意：** 以防发生自动提交，在获取连接后关闭自动提交！发生异常时进行回滚操作！最终在关闭连接前进行还原事务为自动提交！归还资源



```java
public void update(Connection conn, String sql, Object ...args) {
    PreparedStatement ps = null;
    try {
        // 1. 预编译sql语句，返回PrepareStatement实例
        ps = conn.prepareStatement(sql);
        // 2. 填充占位符
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }
        // 3. 执行操作
        ps.execute();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        // 5. 资源关闭（以防关闭连接导致自动提交，传入null）
        JDBCUtils.closeResource(null, ps);
    }
}

// 测试考虑事务操作的update！
public void test2(){
    // 1. 处理一个连接多条语句
    Connection conn = null;
    try {
        conn = JDBCUtils.getConnection();

        // 2. 处理DML语言的默认提交
        conn.setAutoCommit(false);

        String sql = "update user_table set balance = balance - 100 where user = ?";
        update(conn, sql, "AA");

        // 模拟网络异常：
        System.out.println(10 / 0);

        String sql1 = "update user_table set balance = balance + 100 where user = ?";
        update(conn, sql1, "BB");

        // 3. 手动提交
        conn.commit();

    } catch (Exception e) {
        e.printStackTrace();

        // 4. 发生异常进行回滚
        try {
            if(conn != null)
                conn.rollback();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    } finally {

        // 5. 还原事务为自动提交（用在数据库连接池归还连接时还原为最初状态）
        try {
            conn.setAutoCommit(true);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        // 6. 关闭数据库连接！
        JDBCUtils.closeResource(conn, null);
    }
}
```







## 2、对通用查考虑事务的优化



> 传入Connection连接即可，再外部连接使用全部结束后再关闭！





```java
/**
 * 1、针对所有表查询的通用方法！v2.0 (考虑事务)
 *
 * @param clazz Class<T>
 * @param sql String
 * @param args Object
 * @param <T> 泛型方法
 * @return T
 */
public <T> T getInstance(Connection conn, Class<T> clazz, String sql, Object ...args){
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
        conn = JDBCUtils.getConnection();
        ps = conn.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }

        rs = ps.executeQuery();
        // 获取结果集的元数据！
        ResultSetMetaData metaData = rs.getMetaData();
        // 通过结果集的元数据获取列数！
        int columnCount = metaData.getColumnCount();
        if(rs.next()){
            T t = clazz.getDeclaredConstructor().newInstance();
            for (int i = 0; i < columnCount; i++) {
                // 获取到每一列的值
                Object columnValue = rs.getObject(i + 1);
                // 获取到每一列的别名或别名！（建议）
                String columnLabel = metaData.getColumnLabel(i + 1);
                // 使用反射设置值，给customer指定的属性columnLabel，赋值为columnValue
                Field field = clazz.getDeclaredField(columnLabel);
                field.setAccessible(true);
                field.set(t, columnValue);
            }
            return t;
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps, rs);
    }

    return null;
}
```







## 3、会导致数据自动提交的操作



 * 		DDL操作一旦执行，都会自动提交。`set autocommit = false` 对DDL操作失效
 * 		DML默认情况下，一旦执行，就会自动提交。我们可以通过`set autocommit = false`的方式取消DML操作的自动提交。
 * 		默认在关闭连接时，会自动的提交数据







## 4、JDBC隔离级别的设置





```java
public void test3() throws Exception{
    Connection conn = JDBCUtils.getConnection();

    // 查看当前事务隔离界别(1, 2, 4, 8)
    System.out.println(conn.getTransactionIsolation());
    // 修改为 read uncommitted
    // 1. 通过对应数字修改
    //        conn.setTransactionIsolation(1);
    // 2. 通过隔离级别名称修改
    conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
}
```





# 七、数据访问对象DAO





> - DAO：`Data Access Object`访问数据信息的类和接口，包括了对数据的CRUD（Create、Retrival、Update、Delete），而不包含任何业务相关的信息。有时也称作：BaseDAO
> - 作用：为了实现功能的模块化，更有利于代码的维护和升级



## 1、三部分组成



1. BaseDao：实现数据库增删改、查、分组函数的**通用操作抽象类**！只用于继承不用于实现！
2. XxxDao：实现对于某一个具体类的各种操作规范的**接口**，只用于**定义规范**，具体由`XxxDaoImpl`实现！
3. XxxDaoImpl：实现XxxDao定义的规范！





## 2、BaseDao实现



```java
public abstract class BaseDao<T> {

    // 反射：获取父类实现类的泛型！
    // BaseDao作为通用父类，此处clazz是不确定的，无法声明为静态的，只能在子类实例化时创建！
    private Class<T> clazz = null;

    // 如下方法使用clazz都是通过对象调用的，所以应该在对象实例化之前就知道clazz是谁！
    // 可以显示赋值，构造器赋值，代码块赋值！
    // 通过反射获取父类实现类的泛型，即本例子的customer泛型！

    // 获取BaseDao的子类继承父类中的泛型！

    // clazz为非静态，这里只能使用非静态代码块！
    // 解释：此处this指的是创建对象时的类，即当前类的实现类CustomerDaoImpl！
    // 代码块写在父类Dao中，可以动态的通过反射获取泛型，而无需在子类中进行重复创建！
    {
        // 1. 获取当前对象的父类的泛型！
        Type genericSuperclass = this.getClass().getGenericSuperclass();
        // 2. 转换为带参数泛型！
        ParameterizedType parameterizedType = (ParameterizedType) genericSuperclass;
        // 3. 获取泛型参数
        Type[] actualTypeArguments = parameterizedType.getActualTypeArguments();
        // 4. 获取第一个参数，即customer!
        clazz = (Class<T>) actualTypeArguments[0];
    }


    /**
     * 1. 考虑事务操作的通用增删改！
     *
     * @param conn Connection
     * @param sql String
     * @param args Object
     */
    public void update(Connection conn, String sql, Object ...args) {
        PreparedStatement ps = null;
        try {
            // 1. 预编译sql语句，返回PrepareStatement实例
            ps = conn.prepareStatement(sql);
            // 2. 填充占位符
            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }
            // 3. 执行操作
            ps.execute();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 5. 资源关闭（以防关闭连接导致自动提交，传入null）
            JDBCUtils.closeResource(null, ps);
        }
    }

    /**
     * 2、考虑事务操作的通用查询！ ----解决返回一条数据！
     *
     * 此时不是泛型方法，去掉泛型方法声明，去掉class参数！
     *
     * @param sql String
     * @param args Object
     * @return T
     */
    public T getInstance(Connection conn, String sql, Object ...args){
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = JDBCUtils.getConnection();
            ps = conn.prepareStatement(sql);
            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }

            rs = ps.executeQuery();
            // 获取结果集的元数据！
            ResultSetMetaData metaData = rs.getMetaData();
            // 通过结果集的元数据获取列数！
            int columnCount = metaData.getColumnCount();
            if(rs.next()){
                T t = clazz.getDeclaredConstructor().newInstance();
                for (int i = 0; i < columnCount; i++) {
                    // 获取到每一列的值
                    Object columnValue = rs.getObject(i + 1);
                    // 获取到每一列的别名或别名！（建议）
                    String columnLabel = metaData.getColumnLabel(i + 1);
                    // 使用反射设置值，给customer指定的属性columnLabel，赋值为columnValue
                    Field field = clazz.getDeclaredField(columnLabel);
                    field.setAccessible(true);
                    field.set(t, columnValue);
                }
                return t;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, ps, rs);
        }

        return null;
    }

    /**
     * 3、考虑事务操作的通用查询！---解决多条数据返回！
     *
     * 此时不是泛型方法，去掉泛型方法声明，去掉class参数！
     *
     * @param sql String
     * @param args Object
     * @return List<T>
     */
    public List<T> getList(Connection conn, String sql, Object ...args){
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = JDBCUtils.getConnection();
            ps = conn.prepareStatement(sql);
            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }

            rs = ps.executeQuery();
            // 获取结果集的元数据！
            ResultSetMetaData metaData = rs.getMetaData();
            // 通过结果集的元数据获取列数！
            int columnCount = metaData.getColumnCount();
            // 创建List集合
            ArrayList<T> list = new ArrayList<>();
            while(rs.next()){
                T t = clazz.getDeclaredConstructor().newInstance();
                for (int i = 0; i < columnCount; i++) {
                    // 获取到每一列的值
                    Object columnValue = rs.getObject(i + 1);
                    // 获取到每一列的别名或别名！（建议）
                    String columnLabel = metaData.getColumnLabel(i + 1);
                    // 使用反射设置值，给customer指定的属性columnLabel，赋值为columnValue
                    Field field = clazz.getDeclaredField(columnLabel);
                    field.setAccessible(true);
                    field.set(t, columnValue);
                }
                list.add(t);
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(null, ps, rs);
        }

        return null;
    }


    /**
     * 4. 考虑特殊值返回的操作（例如分组函数）
     *
     * @param conn Connection
     * @param sql String
     * @param args Object
     * @param <E> 泛型方法
     * @return E
     */
    public <E> E getValue(Connection conn, String sql, Object ...args){
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = conn.prepareStatement(sql);
            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }
            rs = ps.executeQuery();
            if(rs.next()){
                return (E) rs.getObject(1);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            JDBCUtils.closeResource(null, ps, rs);
        }
        return null;
    }
}
```



## 3、CustomerDao实现



```java
/**
 * 再一步优化！
 *
 * 该接口用于规范customers表的通用操作！
 *
 * @author ITNXD
 * @create 2021-03-02 22:57
 */
public interface CustomerDAO {
    /**
     * 通过传入的Customers中的id插入数据！
     * @param conn Connection
     * @param cust Customers
     */
    void insert(Connection conn, Customers cust);

    /**
     * 通过传入的Customers中的id更新数据！
     * @param conn Connection
     * @param cust Customers
     */
    void update(Connection conn, Customers cust);

    /**
     * 通过传入的id删除数据！
     * @param conn Connection
     * @param id int
     */
    void deleteById(Connection conn, int id);

    /**
     * 通过传入的id获取Customer!
     * @param conn Connection
     * @param id int
     */
    Customers getCustomerById(Connection conn, int id);

    /**
     * 获取表中所有数据构成的集合！
     * @param conn Connection
     * @return List
     */
    List<Customers> getAll(Connection conn);

    /**
     * 获取表中的数据项总数！
     * @param conn Connection
     * @return long
     */
    long getCount(Connection conn);

    /**
     * 获取最大生日日期返回！
     * @param conn Connection
     * @return Date
     */
    Date getMaxBirth(Connection conn);
}
```



## 4、CustomerDaoImpl实现



```java
public class CustomerDAOImpl extends BaseDao<Customers> implements CustomerDAO {
    @Override
    public void insert(Connection conn, Customers cust) {
        String sql = "insert into customers(name, email, birth) values(?,?,?)";
        update(conn, sql, cust.getName(), cust.getEmail(), cust.getbirth());
    }

    @Override
    public void update(Connection conn, Customers cust) {
        String sql = "update customers set name=?,email=?,birth=? where id = ?";
        update(conn, sql, cust.getName(), cust.getEmail(), cust.getbirth(), cust.getId());
    }

    @Override
    public void deleteById(Connection conn, int id) {
        String sql = "delete from customers where id = ?";
        update(conn, sql, id);
    }

    @Override
    public Customers getCustomerById(Connection conn, int id) {
        String sql = "select id, name, email, birth from customers where id = ?";
        // 优化，customer实现类操作customer，所以应该无需传入customer.class
//        return getInstance(conn, Customers.class, sql, id);
        return getInstance(conn, sql, id);
    }

    @Override
    public List<Customers> getAll(Connection conn) {
        String sql = "select id, name, email, birth from customers";
        // 优化，customer实现类操作customer，所以应该无需传入customer.class
//        return getList(conn, Customers.class, sql);
        return getList(conn, sql);
    }

    @Override
    public long getCount(Connection conn) {
        String sql = "select count(*) from customers";
        return getValue(conn, sql);
    }

    @Override
    public Date getMaxBirth(Connection conn) {
        String sql = "select Max(birth) from customers";
        return getValue(conn, sql);
    }
}
```





## 5、测试该模块体系



> IDEA中快速生成测试：要测试的类上右`go to -> test `选择要测试方法和放在哪个包下就行！



```java
/**
 * 测试CustomerDAOImpl类！
 *
 * 快速生成测试：要测试的类上右键go to -> test 选择要测试方法和放在哪个包下就行！
 *
 * @author ITNXD
 * @create 2021-03-03 9:50
 */
class CustomerDAOImplTest {

    private CustomerDAOImpl dao = new CustomerDAOImpl();

    @Test
    void insert() {
        Connection conn = null;
        try {
            conn = JDBCUtils.getConnection();
            Customers cust = new Customers(1, "牛逼", "nb@gmail.com", new Date(System.currentTimeMillis()));
            dao.insert(conn, cust);
            System.out.println("添加成功");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }

    @Test
    void update() {
        Connection conn = null;
        try {
            conn = JDBCUtils.getConnection();
            Customers cust = new Customers(1, "牛逼", "nb@gmail.com", new Date(System.currentTimeMillis()));
            dao.update(conn, cust);
            System.out.println("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }

    @Test
    void deleteById() {
        Connection conn = null;
        try {
            conn = JDBCUtils.getConnection();
            dao.deleteById(conn, 1);
            System.out.println("删除成功");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }

    @Test
    void getCustomerById() {
        Connection conn = null;
        try {
            conn = JDBCUtils.getConnection();
            Customers cust = dao.getCustomerById(conn, 2);
            System.out.println(cust);
            System.out.println("获取成功");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }

    @Test
    void getAll() {
        Connection conn = null;
        try {
            conn = JDBCUtils.getConnection();
            List<Customers> list = dao.getAll(conn);
            list.forEach(System.out::println);
            System.out.println("获取成功");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }

    @Test
    void getCount() {
        Connection conn = null;
        try {
            conn = JDBCUtils.getConnection();
            long count = dao.getCount(conn);
            System.out.println(count);
            System.out.println("获取成功");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }

    @Test
    void getMaxBirth() {
        Connection conn = null;
        try {
            conn = JDBCUtils.getConnection();
            Date birth = dao.getMaxBirth(conn);
            System.out.println(birth);
            System.out.println("获取成功");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }
}
```





# 八、数据库连接池

## 1、数据库连接池技术的优点



> 类似于线程池，提高效率！



**1. 资源重用**

由于数据库连接得以重用，避免了频繁创建，释放连接引起的大量性能开销。在减少系统消耗的基础上，另一方面也增加了系统运行环境的平稳性。

**2. 更快的系统反应速度**

数据库连接池在初始化过程中，往往已经创建了若干数据库连接置于连接池中备用。此时连接的初始化工作均已完成。对于业务请求处理而言，直接利用现有可用连接，避免了数据库连接初始化和释放过程的时间开销，从而减少了系统的响应时间

**3. 新的资源分配手段**

对于多应用共享同一数据库的系统而言，可在应用层通过数据库连接池的配置，实现某一应用最大可用数据库连接数的限制，避免某一应用独占所有的数据库资源

**4. 统一的连接管理，避免数据库连接泄漏**

在较为完善的数据库连接池实现中，可根据预先的占用超时设定，强制回收被占用连接，从而避免了常规数据库连接操作中可能出现的资源泄露











## 2、多种开源的数据库连接池



- JDBC 的数据库连接池使用 javax.sql.DataSource 来表示，DataSource 只是一个接口，该接口通常由服务器(Weblogic, WebSphere, Tomcat)提供实现，也有一些开源组织提供实现：
  - **DBCP** 是Apache提供的数据库连接池。tomcat 服务器自带dbcp数据库连接池。**速度相对c3p0较快**，但因自身存在BUG，Hibernate3已不再提供支持。
  - **C3P0** 是一个开源组织提供的一个数据库连接池，**速度相对较慢，稳定性还可以。**hibernate官方推荐使用
  - **Proxool** 是sourceforge下的一个开源项目数据库连接池，有监控连接池状态的功能，**稳定性较c3p0差一点**
  - **BoneCP** 是一个开源组织提供的数据库连接池，速度快
  - **Druid** 是阿里提供的数据库连接池，据说是集DBCP 、C3P0 、Proxool 优点于一身的数据库连接池，但是速度不确定是否有BoneCP快
- DataSource 通常被称为数据源，它包含连接池和连接池管理两个部分，习惯上也经常把 DataSource 称为连接池
- **DataSource用来取代DriverManager来获取Connection，获取速度快，同时可以大幅度提高数据库访问速度。**
- **特别注意：**
  - 数据源和数据库连接不同，数据源无需创建多个，它是产生数据库连接的工厂，因此**整个应用只需要一个数据源即可。**
  - 当数据库访问结束后，程序还是像以前一样关闭数据库连接：conn.close(); 但conn.close()并没有关闭数据库的物理连接，它仅仅把数据库连接释放，**归还给了数据库连接池。**







## 3、C3P0



> 需要导入：`c3p0-0.9.1.2.jar`开源包

```java
/*
	方式一：
*/
@Test
public void test1() throws Exception {
    // 从doc目录下的文档找到复制过来！
    // 获取C3P0数据库连接池：
    ComboPooledDataSource cpds = new ComboPooledDataSource();
    cpds.setDriverClass( "com.mysql.cj.jdbc.Driver" ); //loads the jdbc driver
    cpds.setJdbcUrl( "jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true" );
    cpds.setUser("root");
    cpds.setPassword("xxx");

    // 通过设置相关参数对数据库连接池进行管理：
    // 设置初始数据库连接池连接数：
    cpds.setInitialPoolSize(10);

    Connection conn = cpds.getConnection();
    System.out.println(conn);

    // 销毁C3P0数据库连接池：
    // 一般不进行销毁！
    DataSources.destroy(cpds);
}

// 方式二：使用配置文件!
/*
 1. 使用properties文件：c3p0.properties
 2. 使用xml文件配置：c3p0-config.xml 文件内容参考c3p0包下的文档例子！（推荐）
 注意：都在src下
 注意：idea文件创建xml：https://www.cnblogs.com/lvchengda/p/12620098.html
 */
@Test
public void test2() throws SQLException {
    // 参数为xml文件中自定义的named-config
    ComboPooledDataSource cpds = new ComboPooledDataSource("myC3p0");
    Connection conn = cpds.getConnection();
    System.out.println(conn);
}
```



**`c3p0-config.xml`文件：**



**注意事项：** 所有的`name`命名都为小驼峰命名



```xml
<?xml version="1.0" encoding="UTF-8" ?>

<c3p0-config>

<!--    注意：name命名为小驼峰命名!-->
<!--    注意：name命名为小驼峰命名!-->
<!--    注意：name命名为小驼峰命名!-->
<!--    注意：name命名为小驼峰命名!-->


<!--    配置命名：随意-->
    <named-config name="myC3p0">

        <!--提供获取连接的四个基本参数！-->
        <property name="driverClass">com.mysql.cj.jdbc.Driver</property>
        <!--如果为默认的：localhost:3306 则可省略-->
<!--        <property name="JdbcUrl">jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true</property>-->
        <property name="jdbcUrl">jdbc:mysql:///test?rewriteBatchedStatements=true</property>
        <property name="user">root</property>
        <property name="password">xxx</property>

<!--        进行数据库连接池管理的基本信息！-->
<!--        当数据库连接池连接数不够时c3p0一次性向数据库服务器申请的连接数！-->
        <property name="acquireIncrement">50</property>
<!--        c3p0数据库连接池初始化的连接数！-->
        <property name="initialPoolSize">10</property>
<!--        c3p0数据库连接池维护的最少连接数！-->
        <property name="minPoolSize">10</property>
<!--        c3p0数据库连接池维护的最多连接数！-->
        <property name="maxPoolSize">1000</property>

<!--        c3p0数据库连接池最多维护的Statement个数！-->
        <property name="maxStatements">50</property>
<!--        每个连接最多可使用的Statement数！-->
        <property name="maxStatementsPerConnection">2</property>


    </named-config>
</c3p0-config>
```





## 4、DBCP



> **需要导入：**
>
> `commons-dbcp-1.4.jar`：连接池的实现
>
> ``commons-pool-1.5.5.jar`：连接池的依赖库
>
> **Tomcat 的连接池正是采用该连接池来实现的。**该数据库连接池既可以与应用服务器整合使用，也可由应用程序独立使用。

```java
/*
 文档位置：E:commons-dbcp-1.4\apidocs\index.html

 方式一：
 */
@Test
public void test1() throws SQLException {
    // 创建DBCP数据库连接池
    BasicDataSource sources = new BasicDataSource();

    // 设置基本信息：
    sources.setDriverClassName("com.mysql.cj.jdbc.Driver");
    sources.setUrl("jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true");
    sources.setUsername("root");
    sources.setPassword("xxx");

    // 设置其他连接池相关属性！
    // E:\Java学习\尚硅谷Java\1、JavaSE+JavaWeb\4、尚硅谷_宋红康_JDBC核心技术(2019新版)\3-资料\2-驱动\03-数据库连接池驱动\dbcp.txt
    sources.setInitialSize(10);
    sources.setMaxActive(10);

    Connection conn = sources.getConnection();
    System.out.println(conn);
}


// 方式二：使用配置文件：(推荐)
@Test
public void test2() throws Exception {
    Properties properties = new Properties();

    // 方式一：默认为src下：
    //        InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("dbcp.properties");

    // 方式二：默认为当前项目下，所以要转到src下：
    FileInputStream is = new FileInputStream("src/dbcp.properties");

    properties.load(is);
    DataSource source = BasicDataSourceFactory.createDataSource(properties);

    Connection conn = source.getConnection();
    System.out.println(conn);
}
```



**dbcp.properties文件：**



```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true
username=root
password=xxx

initialSize=10
```



**可配置的连接池属性**：



|            属性            | 默认值 |                             说明                             |
| :------------------------: | :----: | :----------------------------------------------------------: |
|        initialSize         |   0    |               连接池启动时创建的初始化连接数量               |
|         maxActive          |   8    |               连接池中可同时连接的最大的连接数               |
|          maxIdle           |   8    | 连接池中最大的空闲的连接数，超过的空闲连接将被释放，如果设置为负数表示不限制 |
|          minIdle           |   0    | 连接池中最小的空闲的连接数，低于这个数量会被创建新的连接。该参数越接近maxIdle，性能越好，因为连接的创建和销毁，都是需要消耗资源的；但是不能太大。 |
|          maxWait           | 无限制 | 最大等待时间，当没有可用连接时，连接池等待连接释放的最大时间，超过该时间限制会抛出异常，如果设置-1表示无限等待 |
|   poolPreparedStatements   | false  |                开启池的Statement是否prepared                 |
| maxOpenPreparedStatements  | 无限制 |             开启池的prepared 后的同时最大连接数              |
| minEvictableIdleTimeMillis |        |    连接池中连接，在时间段内一直空闲， 被逐出连接池的时间     |
|   removeAbandonedTimeout   |  300   |             超过时间限制，回收没有用(废弃)的连接             |
|      removeAbandoned       | false  | 超过removeAbandonedTimeout时间后，是否进 行没用连接（废弃）的回收 |







## 5、Druid（推荐）



> 又称为德鲁伊！
>
> Druid是阿里巴巴开源平台上一个数据库连接池实现，它结合了C3P0、DBCP、Proxool等DB池的优点，同时加入了日志监控，可以很好的监控DB池连接和SQL的执行情况，可以说是针对监控而生的DB连接池，**可以说是目前最好的连接池之一。**



```java
/*
    druid API文档：druid-1.1.10\doc\index.html
 */
@Test
public void test1() throws Exception{
    Properties properties = new Properties();
    InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("druid.properties");
    properties.load(is);
    
    DataSource source = DruidDataSourceFactory.createDataSource(properties);
    Connection conn = source.getConnection();
    System.out.println(conn);
}
```





**druid.properties文件：**



```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/test?rewriteBatchedStatements=true
username=root
password=xxx

initialSize=10
maxActive=20
```







**详细配置参数：**



|           **配置**            | **缺省** |                           **说明**                           |
| :---------------------------: | :------: | :----------------------------------------------------------: |
|             name              |          | 配置这个属性的意义在于，如果存在多个数据源，监控的时候可以通过名字来区分开来。   如果没有配置，将会生成一个名字，格式是：”DataSource-” +   System.identityHashCode(this) |
|              url              |          | 连接数据库的url，不同数据库不一样。例如：mysql :   jdbc:mysql://10.20.153.104:3306/druid2      oracle :   jdbc:oracle:thin:@10.20.149.85:1521:ocnauto |
|           username            |          |                      连接数据库的用户名                      |
|           password            |          | 连接数据库的密码。如果你不希望密码直接写在配置文件中，可以使用ConfigFilter。详细看这里：<https://github.com/alibaba/druid/wiki/%E4%BD%BF%E7%94%A8ConfigFilter> |
|        driverClassName        |          | 根据url自动识别   这一项可配可不配，如果不配置druid会根据url自动识别dbType，然后选择相应的driverClassName(建议配置下) |
|          initialSize          |    0     | 初始化时建立物理连接的个数。初始化发生在显示调用init方法，或者第一次getConnection时 |
|           maxActive           |    8     |                        最大连接池数量                        |
|            maxIdle            |    8     |                 已经不再使用，配置了也没效果                 |
|            minIdle            |          |                        最小连接池数量                        |
|            maxWait            |          | 获取连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置useUnfairLock属性为true使用非公平锁。 |
|    poolPreparedStatements     |  false   | 是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。在mysql下建议关闭。 |
|   maxOpenPreparedStatements   |    -1    | 要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100 |
|        validationQuery        |          | 用来检测连接是否有效的sql，要求是一个查询语句。如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会其作用。 |
|         testOnBorrow          |   true   | 申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。 |
|         testOnReturn          |  false   | 归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能 |
|         testWhileIdle         |  false   | 建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。 |
| timeBetweenEvictionRunsMillis |          | 有两个含义： 1)Destroy线程会检测连接的间隔时间2)testWhileIdle的判断依据，详细看testWhileIdle属性的说明 |
|    numTestsPerEvictionRun     |          |      不再使用，一个DruidDataSource只支持一个EvictionRun      |
|  minEvictableIdleTimeMillis   |          |                                                              |
|      connectionInitSqls       |          |                物理连接初始化的时候执行的sql                 |
|        exceptionSorter        |          | 根据dbType自动识别   当数据库抛出一些不可恢复的异常时，抛弃连接 |
|            filters            |          | 属性类型是字符串，通过别名的方式配置扩展插件，常用的插件有：   监控统计用的filter:stat日志用的filter:log4j防御sql注入的filter:wall |
|         proxyFilters          |          | 类型是List，如果同时配置了filters和proxyFilters，是组合关系，并非替换关系 |





## 6、使用数据库连接池对JDBCUtils重构



> JDBCUtils实现了数据库的连接和资源释放操作！





```java
/**
 * 对JDBCUtils的重构！使用数据库连接池！
 *
 * @author ITNXD
 * @create 2021-03-03 15:24
 */
public class JDBCUtils {

    /**
     * 获取数据库的连接！（最基础）
     *
     * @return Connection
     * @throws Exception
     */
    public static Connection getConnection() throws Exception{
        // 1. 读取配置文件的四个基本信息
        InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");

        Properties properties = new Properties();
        properties.load(is);

        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        String driverClass = properties.getProperty("driverClass");

        // 2. 加载驱动
        Class.forName(driverClass);

        // 3. 获取连接
        Connection conn = DriverManager.getConnection(url, user, password);

        return conn;
    }

    // 数据库连接池只需创建一个！
    private static ComboPooledDataSource cpds = new ComboPooledDataSource("myC3p0");

    /**
     * 1.1 使用c3p0数据库连接池重构的getConnection()方法！
     *
     * @return Connection
     * @throws SQLException 异常
     */
    public static Connection getConnection1() throws SQLException {
        Connection conn = cpds.getConnection();
        return conn;
    }

    /**
     * 1.2 使用dbcp数据库连接池重构的getConnection()方法！
     *
     * @return Connection
     * @throws Exception 异常
     */
    private static DataSource source;
    static{
        try {
            Properties properties = new Properties();
            // 方式一：默认为src下：
            // InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("dbcp.properties");
            // 方式二：默认为当前项目下，所以要转到src下：
            FileInputStream is = new FileInputStream("src/dbcp.properties");
            properties.load(is);
            DataSource source = BasicDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static Connection getConnection2() throws Exception {
        Connection conn = source.getConnection();
        return conn;
    }


    /**
     * 1.3 使用druid数据库连接池重构的getConnection()方法！
     * @return Connection
     * @throws Exception
     */
    private static DataSource source1 = null;
    static{
        try {
            Properties properties = new Properties();
            InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("druid.properties");
            properties.load(is);
            source1 = DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static Connection getConnection3() throws Exception{
        Connection conn = source1.getConnection();
        return conn;
    }

    /**
     * 2. 关闭连接和 Statement的操作！
     *
     * @param conn Connection
     * @param ps Statement
     */
    public static void closeResource(Connection conn, Statement ps){
        try {
            if(ps != null)
                ps.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if(conn != null)
                conn.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    /**
     * 3. 资源关闭操作！
     *
     * @param conn Connection
     * @param ps Statement
     * @param rs ResultSet
     */
    public static void closeResource(Connection conn, Statement ps, ResultSet rs){
        try {
            if(ps != null)
                ps.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if(conn != null)
                conn.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if(rs != null)
                rs.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}

```





# 九、Apache-DBUtil实现CRUD操作



> `commons-dbutils` 是 Apache 组织提供的一个开源 JDBC工具类库，它是对JDBC的简单封装!
>
> 需要导入：`commons-dbutils-1.3.jar`开源包！
>
> dbutils API文档：`commons-dbutils-1.3\apidocs\index.html`



**API介绍：**

- org.apache.commons.dbutils.QueryRunner：提供数据库操作的一系列重载的`update()`和`query()`操作
- org.apache.commons.dbutils.ResultSetHandler：此**接口**用于处理数据库查询操作得到的**结果集**。不同的结果集的情形，由其**不同的子类来实现**
- 工具类：org.apache.commons.dbutils.DbUtils









## 1、QueryRunner类

- **该类简单化了SQL查询，它与ResultSetHandler组合在一起使用可以完成大部分的数据库操作，能够大大减少编码量。**
- QueryRunner类提供了两个构造器：
  - 默认的构造器
  - 需要一个 javax.sql.DataSource 来作参数的构造器
- QueryRunner类的主要方法：
  - **更新**
    - `public int update(Connection conn, String sql, Object... params) throws SQLException`:用来执行一个更新（插入、更新或删除）操作。
  - **插入**
    - `public <T> T insert(Connection conn,String sql,ResultSetHandler<T> rsh, Object... params) throws SQLException`：只支持INSERT语句
  - **批处理**
    - `public int[] batch(Connection conn,String sql,Object[][] params)throws SQLException`： INSERT, UPDATE, or DELETE语句
    - `public &lt;T&gt; T insertBatch(Connection conn,String sql,ResultSetHandler&lt;T&gt; rsh,Object[][] params)throws SQLException`：只支持INSERT语句
  - **查询**
    - `public Object query(Connection conn, String sql, ResultSetHandler rsh,Object... params) throws SQLException`：执行一个查询操作，在这个查询中，对象数组中的每个元素值被用来作为查询语句的置换参数。该方法会自行处理 PreparedStatement 和 ResultSet 的创建和关闭。



````java
// dbutils API文档：commons-dbutils-1.3\apidocs\index.html

public class QueryRunnerTest {

    // 测试增删改：
    @Test
    public void test1() {
        Connection conn = null;
        try {
            QueryRunner runner = new QueryRunner();

            // 使用德鲁伊数据库连接池获取连接：
            conn = JDBCUtils.getConnection3();

            String sql = "insert into customers(name, email, birth) values(?,?,?)";
            int insertCount = runner.update(conn, sql, "牛逼1", "nb1@gmail.com", "2021-3-3");
            System.out.println(insertCount);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            JDBCUtils.closeResource(conn, null);
        }
    }
}
````





## 2、ResultSetHandler接口及实现类

- 该接口用于处理 java.sql.ResultSet，**将数据按要求转换为另一种形式。**

- ResultSetHandler 接口提供了一个单独的方法：`Object handle (java.sql.ResultSet .rs)`

- 接口的主要实现类：

  - ArrayHandler：把结果集中的第一行数据转成对象数组。
  - ArrayListHandler：把结果集中的每一行数据都转成一个数组，再存放到List中。
  - **BeanHandler：**将结果集中的第一行数据封装到一个对应的JavaBean实例中。
  - **BeanListHandler：**将结果集中的每一行数据都封装到一个对应的JavaBean实例中，存放到List里。
  - ColumnListHandler：将结果集中某一列的数据存放到List中。
  - KeyedHandler(name)：将结果集中的每一行数据都封装到一个Map里，再把这些map再存到一个map里，其key为指定的key。
  - **MapHandler：**将结果集中的第一行数据封装到一个Map里，key是列名，value就是对应的值。
  - **MapListHandler：**将结果集中的每一行数据都封装到一个Map里，然后再存放到List
  - **ScalarHandler：**查询单个值对象



```java
// 测试查询1：
/*
    BeanHander：是ResultSetHandler的实现类！用于封装表中一条记录！
     */
@Test
public void testQuery1(){
    Connection conn = null;
    try {
        QueryRunner runner = new QueryRunner();

        conn = JDBCUtils.getConnection3();
        String sql = "select id, name, email, birth from customers where id = ?";
        BeanHandler<Customers> handler = new BeanHandler<Customers>(Customers.class);
        Customers customers = runner.query(conn, sql, handler, 20);

        System.out.println(customers);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, null);
    }
}

// 测试查询2：
/*
    BeanListHandler：是ResultSetHandler的实现类！用于封装表中多条记录！
     */
@Test
public void testQuery2(){
    Connection conn = null;
    try {
        QueryRunner runner = new QueryRunner();
        conn = JDBCUtils.getConnection3();
        String sql = "select id, name, email, birth from customers where id < ?";
        BeanListHandler<Customers> handler = new BeanListHandler<Customers>(Customers.class);
        List<Customers> list = runner.query(conn, sql, handler, 20);
        list.forEach(System.out::println);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, null);
    }
}

// 测试查询3：
/*
    MapHandler：是ResultSetHandler的实现类！对应表中一条记录！
    将字段和相应字段的值作为map中的key和value!
     */
@Test
public void testQuery3(){
    Connection conn = null;
    try {
        QueryRunner runner = new QueryRunner();
        conn = JDBCUtils.getConnection3();
        String sql = "select id, name, email, birth from customers where id = ?";
        MapHandler handler = new MapHandler();
        Map<String, Object> map = runner.query(conn, sql, handler, 20);
        System.out.println(map);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, null);
    }
}

// 测试查询4：
/*
    MapListHandler：是ResultSetHandler的实现类！对应表中多条记录！
    将字段和相应字段的值作为map中的key和value!
     */
@Test
public void testQuery4(){
    Connection conn = null;
    try {
        QueryRunner runner = new QueryRunner();
        conn = JDBCUtils.getConnection3();
        String sql = "select id, name, email, birth from customers where id < ?";
        MapListHandler handler = new MapListHandler();
        List<Map<String, Object>> list = runner.query(conn, sql, handler, 20);
        list.forEach(System.out::println);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, null);
    }
}

// 测试查询5：
/*
    ScalarHandler：是ResultSetHandler的实现类！返回分组函数查询的结果！
    查询特殊值！
     */
@Test
public void testQuery5(){
    Connection conn = null;
    try {
        QueryRunner runner = new QueryRunner();
        conn = JDBCUtils.getConnection3();
        String sql = "select count(*) from customers";
        ScalarHandler handler = new ScalarHandler();
        long count = (long) runner.query(conn, sql, handler);
        System.out.println(count);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, null);
    }
}

// 测试查询6：
/*
    使用ResultSetHandler实现自定义handler
    查询特殊值！
     */
@Test
public void testQuery6(){
    Connection conn = null;
    try {
        QueryRunner runner = new QueryRunner();
        conn = JDBCUtils.getConnection3();
        String sql = "select id, name, email, birth from customers where id = ?";

        // 自定义类实现：匿名内部类里实现重写方法！
        ResultSetHandler<Customers> handler = new ResultSetHandler<>() {
            @Override
            public Customers handle(ResultSet rs) throws SQLException {
                if(rs.next()){
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    String email = rs.getString("email");
                    Date birth = rs.getDate("birth");
                    return new Customers(id, name, email, birth);
                }
                return null;
            }
        };
        Customers cust = runner.query(conn, sql, handler, 7);
        System.out.println(cust);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, null);
    }
}
```



## 3、DbUtils工具类

- DbUtils ：提供如关闭连接、装载JDBC驱动程序等常规工作的工具类，里面的所有方法都是静态的。主要方法如下：
  - **public static void close(…) throws java.sql.SQLException**：　DbUtils类提供了三个重载的关闭方法。这些方法检查所提供的参数是不是NULL，如果不是的话，它们就关闭Connection、Statement和ResultSet。
  - public static void closeQuietly(…): 这一类方法不仅能在Connection、Statement和ResultSet为NULL情况下避免关闭，还能隐藏一些在程序中抛出的SQLEeception。
  - public static void commitAndClose(Connection conn)throws SQLException： 用来提交连接的事务，然后关闭连接
  - public static void commitAndCloseQuietly(Connection conn)： 用来提交连接，然后关闭连接，并且在关闭连接时不抛出SQL异常。 
  - public static void rollback(Connection conn)throws SQLException：允许conn为null，因为方法内部做了判断
  - public static void rollbackAndClose(Connection conn)throws SQLException
  - rollbackAndCloseQuietly(Connection)
  - public static boolean loadDriver(java.lang.String driverClassName)：这一方装载并注册JDBC驱动程序，如果成功就返回true。使用该方法，你不需要捕捉这个异常ClassNotFoundException。





```java
 /*
    资源关闭操作：使用DBUtils库实现：
     */
public static void closeResource1(Connection conn, Statement ps, ResultSet rs){

    // 没啥意思的关闭操作！
    //        try {
    //            DbUtils.close(conn);
    //        } catch (SQLException throwables) {
    //            throwables.printStackTrace();
    //        }
    //        try {
    //            DbUtils.close(ps);
    //        } catch (SQLException throwables) {
    //            throwables.printStackTrace();
    //        }
    //        try {
    //            DbUtils.close(rs);
    //        } catch (SQLException throwables) {
    //            throwables.printStackTrace();
    //        }

    // 这样一次性关闭并处理异常！
    DbUtils.closeQuietly(conn, ps, rs);
}
```





# 十、JDBC总结



```java
@Test
public void testUpdateWithTx() {
		
	Connection conn = null;
	try {
		//1.获取连接的操作
		//① 手写的连接：JDBCUtils.getConnection();
		//② 使用数据库连接池：C3P0;DBCP;Druid
        
        conn.setAutoCommit(false); 
        
		//2.对数据表进行一系列CRUD操作
		//① 使用PreparedStatement实现通用的增删改、查询操作（version 1.0 \ version 2.0)
            //version2.0的增删改public void update(Connection conn,String sql,Object ... args){}
            //version2.0的查询 public <T> T getInstance(Connection conn,Class<T> clazz,String sql,Object ... args){}
		//② 使用dbutils提供的jar包中提供的QueryRunner类
			
		//提交数据
		conn.commit();
			
	
	} catch (Exception e) {
		e.printStackTrace();

		try {
			//回滚数据
			conn.rollback();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
			
	}finally{
		//3.关闭连接等操作
		//① JDBCUtils.closeResource();
		//② 使用dbutils提供的jar包中提供的DbUtils类提供了关闭的相关操作	
	}
}
```

