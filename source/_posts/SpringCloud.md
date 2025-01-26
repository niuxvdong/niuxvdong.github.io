---
title: 分布式微服务架构的一站式解决方案、多种微服务架构落地技术的集合体、俗称微服务全家桶的 SpringCloud
author: ITNXD
toc: true
abbrlink: 29680
top_img: https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/922026402b21435e77ec5a1c183683b7.png
cover: https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/922026402b21435e77ec5a1c183683b7.png
categories: 分布式微服务
tags:
  - SpringCloud
date: 2021-10-14 09:42:54
updated:
---


# 一、微服务架构概述







## 1、微服务





微服务架构是一种架构模式，它提倡将单一应用程序划分成一组小的服务，服务之间互相协调、互相配合，为用户提供最终价值。每个务运行在其独立的进程中，服务与服务间采用轻量级的通信机制互相协作（通常是基于HTTP协议的RESTful API)。每个服务都围绕着具业务进行构建，并且能够被独立的部署到生产环境、类生产环境等。另外，应当尽量避免统一的、集中式的服务管理机制，对具体的一个服务而言，应根据业务上下文，选择合适的语言、工具对其进行构建。







## 2、架构图



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/14/832db74de6eeebcfc1f133b6eed26244.png)









## 3、SpringCloud技术栈





> **SpringCloud = 分布式微服务架构的一站式解决方案，是多种微服务架构落地技术的集合体，俗称微服务全家桶！**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/14/45af0b8268ab322db231df7ea58a12ca.png)







![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/14/a657ee51aa9acdaeb99e089cdb275db2.png)









## 4、版本选择





**官网版本依赖关系：[https://start.spring.io/actuator/info](https://start.spring.io/actuator/info)**





```json
{
    git: {
        branch: "c3334bd57d199ade45a3701e24917578204bd2a0",
        commit: {
            id: "c3334bd",
            time: "2021-10-08T06:45:57Z"
        }
    },
    build: {
        version: "0.0.1-SNAPSHOT",
        artifact: "start-site",
        versions: {
            spring-boot: "2.5.5",
            initializr: "0.11.1-SNAPSHOT"
        },
        name: "start.spring.io website",
        time: "2021-10-08T06:46:55.676Z",
        group: "io.spring.start"
    },
    bom-ranges: {
        azure: {
            3.2.0: "Spring Boot >=2.3.0.M1 and <2.4.0-M1",
            3.5.0: "Spring Boot >=2.4.0.M1 and <2.5.0-M1",
            3.9.0: "Spring Boot >=2.5.0.M1 and <2.6.0-M1"
		},
	codecentric-spring-boot-admin: {
        2.4.3: "Spring Boot >=2.3.0.M1 and <2.6.0-M1"
	},
    solace-spring-boot: {
        1.1.0: "Spring Boot >=2.3.0.M1 and <2.6.0-M1"
    },
    solace-spring-cloud: {
        1.1.1: "Spring Boot >=2.3.0.M1 and <2.4.0-M1",
        2.1.0: "Spring Boot >=2.4.0.M1 and <2.6.0-M1"
    },
    spring-cloud: {
        Hoxton.SR12: "Spring Boot >=2.2.0.RELEASE and <2.4.0.M1",
        2020.0.4: "Spring Boot >=2.4.0.M1 and <2.5.6-SNAPSHOT",
        2020.0.5-SNAPSHOT: "Spring Boot >=2.5.6-SNAPSHOT and <2.6.0-M1",
        2021.0.0-M1: "Spring Boot >=2.6.0-M1 and <2.6.0-M3",
        2021.0.0-M2: "Spring Boot >=2.6.0-M3 and <2.6.0-SNAPSHOT",
        2021.0.0-SNAPSHOT: "Spring Boot >=2.6.0-SNAPSHOT"
    },
    spring-cloud-gcp: {
        2.0.4: "Spring Boot >=2.4.0-M1 and <2.6.0-M1"
    },
    spring-cloud-services: {
        2.3.0.RELEASE: "Spring Boot >=2.3.0.RELEASE and <2.4.0-M1",
        2.4.1: "Spring Boot >=2.4.0-M1 and <2.5.0-M1"
    },
    spring-geode: {
        1.3.12.RELEASE: "Spring Boot >=2.3.0.M1 and <2.4.0-M1",
        1.4.11: "Spring Boot >=2.4.0-M1 and <2.5.0-M1",
        1.5.5: "Spring Boot >=2.5.0-M1 and <2.6.0-M1",
        1.6.0-M3: "Spring Boot >=2.6.0-M1"
    },
    vaadin: {
        14.7.1: "Spring Boot >=2.1.0.RELEASE and <2.6.0-M1"
    },
    wavefront: {
        2.0.2: "Spring Boot >=2.1.0.RELEASE and <2.4.0-M1",
        2.1.1: "Spring Boot >=2.4.0-M1 and <2.5.0-M1",
        2.2.0: "Spring Boot >=2.5.0-M1"
    }
    },
    dependency-ranges: {
        native: {
            0.9.0: "Spring Boot >=2.4.3 and <2.4.4",
            0.9.1: "Spring Boot >=2.4.4 and <2.4.5",
            0.9.2: "Spring Boot >=2.4.5 and <2.5.0-M1",
            0.10.0: "Spring Boot >=2.5.0-M1 and <2.5.2",
            0.10.1: "Spring Boot >=2.5.2 and <2.5.3",
            0.10.2: "Spring Boot >=2.5.3 and <2.5.4",
            0.10.3: "Spring Boot >=2.5.4 and <2.5.5",
            0.10.4: "Spring Boot >=2.5.5 and <2.5.6-SNAPSHOT",
            0.10.5-SNAPSHOT: "Spring Boot >=2.5.6-SNAPSHOT and <2.6.0-M1",
            0.11.0-M1: "Spring Boot >=2.6.0-M1 and <2.6.0-SNAPSHOT",
            0.11.0-SNAPSHOT: "Spring Boot >=2.6.0-SNAPSHOT and <2.7.0-M1"
        },
        okta: {
            1.4.0: "Spring Boot >=2.2.0.RELEASE and <2.4.0-M1",
            1.5.1: "Spring Boot >=2.4.0-M1 and <2.4.1",
            2.0.1: "Spring Boot >=2.4.1 and <2.5.0-M1",
            2.1.2: "Spring Boot >=2.5.0-M1 and <2.6.0-M1"
        },
        mybatis: {
            2.1.4: "Spring Boot >=2.1.0.RELEASE and <2.5.0-M1",
            2.2.0: "Spring Boot >=2.5.0-M1"
        },
        camel: {
            3.5.0: "Spring Boot >=2.3.0.M1 and <2.4.0-M1",
            3.10.0: "Spring Boot >=2.4.0.M1 and <2.5.0-M1",
            3.12.0: "Spring Boot >=2.5.0.M1 and <2.6.0-M1"
        },
        open-service-broker: {
            3.2.0: "Spring Boot >=2.3.0.M1 and <2.4.0-M1",
            3.3.0: "Spring Boot >=2.4.0-M1 and <2.5.0-M1"
    	}
	}
}
```







**课程版本约束：**



- cloud：Hoxton.SR1
- boot：2.2.2.RELEASE
- cloud alibaba：2.1.0.RELEASE
- java：java8
- Maven 3.5以上
- Mysql：5.7以上





## 5、架构选择





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/14/d6735d92d0dadcdc2f74a9e669b41819.png)





## 6、SpringCloud官网



> SpringCloud Hoxton.SR1版本：[https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/)
>
> 中文文档：[https://www.bookstack.cn/read/spring-cloud-docs/docs-index.md](https://www.bookstack.cn/read/spring-cloud-docs/docs-index.md)





## 7、父工程管理依赖



约定依赖版本，实际并没有导入，子工程用到时进行引用！

- 创建Maven工程
- 删除src目录，只保留pom.xml即可
- mvn install到本地方便子工程继承



**注意**：一些爆红的地方不要紧，由于是约定他不会下载，本地没有就会爆红！



```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.itnxd.springcloud</groupId>
  <artifactId>cloud2021</artifactId>
  <version>1.0-SNAPSHOT</version>
    
  <!--表示是一个pom父工程-->
  <packaging>pom</packaging>

  <!--统一管理jar包版本-->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <junit.version>4.12</junit.version>
    <log4j.version>1.2.17</log4j.version>
    <lombok.version>1.16.18</lombok.version>
    <mysql.version>8.0.18</mysql.version>
    <druid.verison>1.1.17</druid.verison>
    <mybatis.spring.boot.verison>2.1.4</mybatis.spring.boot.verison>
  </properties>

  <!--子模块继承之后，提供作用：锁定版本+子module不用写groupId和version-->
  <dependencyManagement><!--定义规范，但不导入-->
    <dependencies>
      <!--spring boot 2.2.2-->
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>2.2.2.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <!--spring cloud Hoxton.SR1-->
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>Hoxton.SR1</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <!--spring cloud 阿里巴巴-->
      <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-dependencies</artifactId>
        <version>2.1.0.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <!--mysql-->
      <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>${mysql.version}</version>
        <scope>runtime</scope>
      </dependency>
      <!-- druid-->
      <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>${druid.verison}</version>
      </dependency>
      <!--mybatis-->
      <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>${mybatis.spring.boot.verison}</version>
      </dependency>
      <!--junit-->
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>${junit.version}</version>
      </dependency>
      <!--log4j-->
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>${log4j.version}</version>
      </dependency>
    </dependencies>
  </dependencyManagement>
  <!--热启动插件-->
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <version>2.5.5</version>
        <configuration>
          <fork>true</fork>
          <addResources>true</addResources>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>

```









# 二、支付模块构建



## 1、cloud-provider-payment8001



### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <!--继承，父工程已经写了GV，这里只要写A即可！-->
    <artifactId>cloud-provider-payment8001</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>


    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--指标监控模块-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>
        <!--mysql-connector-java-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--jdbc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



### yaml文件



```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-payment-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
	url: jdbc:mysql://localhost:3306/cloud?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: xxxx

mybatis:
  mapperLocations: classpath:mapper/*.xml
  type-aliases-package: com.itnxd.springcloud.entities    # 所有Entity别名类所在包
```



### 建表SQL



```sql
CREATE TABLE `payment`(
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `serial` varchar(200) DEFAULT '',
    PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4
```



### Entities



**主类：**



```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment implements Serializable {

    private long id;
    private String serial;
}
```



**封装JSON类：**



```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonResult<T> {

    private Integer code;
    private String message;
    private T data;

    // 自定义两个参数构造器
    public CommonResult(Integer code, String message) {
        this(code, message, null);
    }
}
```





### Dao



```java
@Mapper
public interface PaymentDao {

    public int create(Payment payment);

    public Payment getPaymentById(@Param("id") Long id);
}
```



**对应的mapper.xml：**



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<mapper namespace="com.itnxd.springcloud.dao.PaymentDao">

    <!--
    public int create(Payment payment);
    已经配置entities的包位置：type-aliases-package: com.itnxd.springcloud.entities

    -->
    <insert id="create" parameterType="Payment" useGeneratedKeys="true" keyProperty="id">
        insert into payment(serial) values(#{serial})
    </insert>

    <resultMap id="baseResultMap" type="com.itnxd.springcloud.entities.Payment">
        <id column="id" property="id" jdbcType="BIGINT"></id>
        <id column="serial" property="serial" jdbcType="VARCHAR"></id>
    </resultMap>
    
    <!--public Payment getPaymentById(@Param("id") Long id);-->
    <select id="getPaymentById" parameterType="Long" resultMap="baseResultMap">
        select * from payment where id=#{id}
    </select>


</mapper>
```





### Service



**Service：**

```java
public interface PaymentService {

    public int create(Payment payment);

    public Payment getPaymentById(@Param("id") Long id);
}
```



**ServiceImpl：**



```java
@Service
public class PaymentServiceImpl implements PaymentService{

    @Resource
    private PaymentDao paymentDao;

    @Override
    public int create(Payment payment) {
        return paymentDao.create(payment);
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentDao.getPaymentById(id);
    }
}
```



### Controller



```java
@Slf4j
@RestController
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    @PostMapping("/payment/create")
    public CommonResult create(@RequestBody Payment payment){
        int result =paymentService.create(payment);
        log.info("插入结果：" + result);
        if(result > 0){
            return new CommonResult(200, "插入数据库成功！");
        }else{
            return new CommonResult(444, "插入数据库失败！");
        }
    }

    @GetMapping("/payment/get/{id}")
    public CommonResult getPaymentById(@PathVariable("id") Long id){
        Payment payment = paymentService.getPaymentById(id);
        log.info("查询结果：" + payment);
        if(payment != null){
            return new CommonResult(200, "查询成功！", payment);
        }else{
            return new CommonResult(444, "查询失败！查询id：" + id, null);
        }
    }
}
```





## 2、cloud-consumer-order80



### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-order80</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

### yaml文件

```yaml
server:
  port: 80
```



### Entities



```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment implements Serializable {

    private long id;
    private String serial;
}


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonResult<T> {

    private Integer code;
    private String message;
    private T data;

    // 自定义两个参数构造器
    public CommonResult(Integer code, String message) {
        this(code, message, null);
    }
}
```

### Controller



- create方法调用RestTemplate将请求参数封装为json以post发送到服务提供方
- 提供方一@RequestBody注解来接收进行封装



```java
@Slf4j
@RestController
public class OrderController {

    private static final String PAYMENT_URL = "http://localhost:8001";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/payment/create")
    public CommonResult<Payment> create(Payment payment){
        return restTemplate.postForObject(PAYMENT_URL + "/payment/create",
                payment, CommonResult.class);
    }

    @GetMapping("/consumer/payment/get/{id}")
    public CommonResult<Payment> getPayment(@PathVariable("id") Long id){
        return restTemplate.getForObject(PAYMENT_URL + "/payment/get/" + id,
                CommonResult.class);
    }

}
```







### RestTemplate



> RestTemplate提供了多种便捷访问远程Http服务的方法，是一种简单便捷的访问restful服务模板类，是Spring提供的用于访问Rest服务的客户端模板工具集。

官网地址：[https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html](https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html)

- 使用restTemplate访问restful接口非常的简单粗暴无脑。
- (url, requestMap, ResponseBean.class)这三个参数分别代表。
- REST请求地址、请求参数、HTTP响应转换被转换成的对象类型。





```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
```





## 3、工程重构



> provider和consumer都有一模一样的Entities模块，我们将其抽取出来！





**新建Module：cloud-api-commons**



**pom文件：**



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-api-commons</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>


    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.1.0</version>
        </dependency>
    </dependencies>


</project>
```





**mvn clean + install 到 本地仓库！**





**服务提供者和消费者引用公共子模块：**



```xml
<!--引入公共api-->
<dependency>
    <groupId>com.itnxd.springcloud</groupId>
    <artifactId>cloud-api-commons</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```







# 三、服务注册中心



> **Eureka（X）、Consul、Zookeeper**





## 1、Eureka注册中心



### 什么是服务治理

Spring Cloud封装了Netflix 公司开发的Eureka模块来实现服务治理！

在传统的RPC远程调用框架中，管理每个服务与服务之间依赖关系比较复杂，管理比较复杂，所以需要使用服务治理，管理服务于服务之间依赖关系，可以实现服务调用、负载均衡、容错等，实现服务发现与注册。



### 什么是服务注册与发现

Eureka采用了CS的设计架构，Eureka Sever作为服务注册功能的服务器，它是服务注册中心。而系统中的其他微服务，使用Eureka的客户端连接到 Eureka Server并维持心跳连接。这样系统的维护人员就可以通过Eureka Server来监控系统中各个微服务是否正常运行。

在服务注册与发现中，有一个注册中心。当服务器启动的时候，会把当前自己服务器的信息比如服务地址通讯地址等以别名方式注册到注册中心上。另一方(消费者服务提供者)，以该别名的方式去注册中心上获取到实际的服务通讯地址，然后再实现本地RPC调用RPC远程调用框架核心设计思想:在于注册中心，因为使用注册中心管理每个服务与服务之间的一个依赖关系(服务治理概念)。在任何RPC远程框架中，都会有一个注册中心存放服务地址相关信息(接口地址)


![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/15/1a036992d2f6c9f403b5e0b70fd11ce2.png)





### Eureka的两个组件



**Eureka Server提供服务注册服务**

各个微服务节点通过配置启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册表中将会存储所有可用服务节点的信息，服务节点的信息可以在界面中直观看到。

**EurekaClient通过注册中心进行访问**

它是一个Java客户端，用于简化Eureka Server的交互，客户端同时也具备一个内置的、使用轮询(round-robin)负载算法的负载均衡器。在应用启动后，将会向Eureka Server发送心跳(默认周期为30秒)。如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，EurekaServer将会从服务注册表中把这个服务节点移除（默认90秒)







### EurekaServer服务端安装



**新建Module：cloud-eureka-server7001**





#### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-eureka-server7001</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--boot web actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般通用配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```





#### yaml文件



```yaml
server:
  port: 7001

eureka:
  instance:
    hostname: locathost #eureka服务端的实例名称
  client:
    #false表示不向注册中心注册自己。
    register-with-eureka: false
    #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      #设置与Eureka server交互的地址查询服务和注册服务都需要依赖这个地址。
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```



#### 主启动类



```java
@SpringBootApplication
// 表名是Eureka服务端
@EnableEurekaServer
public class EurekaMain7001 {

    public static void main(String[] args) {
        SpringApplication.run(EurekaMain7001.class, args);
    }
}
```



测试运行`EurekaMain7001`，浏览器输入`http://localhost:7001/`回车，会查看到Spring Eureka服务主页。







### Provider8001入驻EurekaServer

EurekaClient端cloud-provider-payment8001将注册进EurekaServer成为服务提供者provider，类似学校对外提供授课服务。

#### pom文件



```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```





#### 主启动类



```java
@SpringBootApplication
@EnableEurekaClient // 表名是Eureka客户端，即服务提供者注册到Server端！
public class PaymentMain8001 {

    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8001.class, args);
    }
}
```





启动测试即可：http://localhost:7001/





### Consumer80入驻EurekaServer



EurekaClient端cloud-consumer-order80将注册进EurekaServer成为服务消费者consumer，类似来上课消费的同学



#### pom文件



```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```





#### 主启动类



```java
@SpringBootApplication
@EnableEurekaClient
public class OrderMain80 {

    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class, args);
    }

}
```



#### yaml文件



```yaml
server:
  port: 80

spring:
  application:
    name: cloud-order-service

eureka:
  client:
    #表示是否将自己注册进Eurekaserver默认为true。
    register-with-eureka: true
    #是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用负载均衡
    fetchRegistry: true
    service-url:
      defaultZone: http://localhost:7001/eureka
```





这时候Eureka将会有两个微服务！





## 2、Eureka集群



### Eureka集群原理说明



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/15/80b98ad8fc6914da80541e25fbf31199.png)







- 服务注册：将服务信息注册进注册中心
- 服务发现：从注册中心上获取服务信息
- **实质：存key服务命取value闭用地址**



1. 先启动eureka注主册中心
2. 启动服务提供者payment支付服务
3. 支付服务启动后会把自身信息(比服务地址以别名方式注入进eureka
4. 消费者order服务在需要调用接口时，使用服务别名去注册中心获取实际的RPC远程调用地址
5. 消费者获取调用地址后，底层实际是利用HttpClient技术实现远程调用
6. 消费者获得服务地址后会缓存在本地jvm内存中，默认每间隔30秒更新—次服务调用地址



**问题：微服务RPC远程服务调用最核心的是什么？**

**高可用**，试想你的注册中心只有一个only one，万一它出故障了，会导致整个为服务环境不可用。

解决办法：搭建Eureka注册中心集群，实现**负载均衡+故障容错**。

互相注册，相互守望。





### Eureka集群环境构建



- 找到C:\Windows\System32\drivers\etc路径下的hosts文件，修改映射配置添加进hosts文件：



```hosts
127.0.0.1 eureka7001.com
127.0.0.1 eureka7002.com
```



- 修改cloud-eureka-server7001配置文件



```yaml
server:
  port: 7001

eureka:
  instance:
    hostname: eureka7001.com #eureka服务端的实例名称
  client:
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url:
    #集群指向其它eureka
      defaultZone: http://eureka7002.com:7002/eureka/
    #单机就是7001自己
      #defaultZone: http://eureka7001.com:7001/eureka/
```



- 修改cloud-eureka-server7002配置文件



```yaml
server:
  port: 7002

eureka:
  instance:
    hostname: eureka7002.com #eureka服务端的实例名称
  client:
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url:
    #集群指向其它eureka
      defaultZone: http://eureka7001.com:7001/eureka/
    #单机就是7002自己
      #defaultZone: http://eureka7002.com:7002/eureka/
```





### Provider和Consumer入驻Eureka



**修改二者的yaml文件：**



```yaml
eureka:
  client:
    #表示是否将自己注册进Eurekaserver默认为true。
    register-with-eureka: true
    #是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用负载均衡
    fetchRegistry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
```



**启动顺序：**



1. 先要启动EurekaServer，7001/7002服务
2. 再要启动服务提供者provider，8001
3. 再要启动消费者，80





## 3、Privider集群搭建





### 创建cloud-provider-payment8002



**参考cloud-provicer-payment8001，新建Module cloud-provider-payment8002！**

- 修改端口号为8002







### 修改8001/8002的Controller，添加serverPort



```java
@Slf4j
@RestController
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    @Value("${server.port}")
    private String serverPort;

    @PostMapping("/payment/create")
    // 使用requestbody注解获取请求体中的数据（是消费者使用restTemplate封装的请求参数）
    public CommonResult create(@RequestBody Payment payment){
        int result =paymentService.create(payment);
        log.info("插入结果：" + result);
        if(result > 0){
            return new CommonResult(200, "插入数据库成功！serverPort：" + serverPort, result);
        }else{
            return new CommonResult(444, "插入数据库失败！", null);
        }
    }

    @GetMapping("/payment/get/{id}")
    public CommonResult getPaymentById(@PathVariable("id") Long id){
        Payment payment = paymentService.getPaymentById(id);
        log.info("查询结果：" + payment);
        if(payment != null){
            return new CommonResult(200, "查询成功！serverPort：" + serverPort, payment);
        }else{
            return new CommonResult(444, "查询失败！查询id：" + id, null);
        }
    }
}
```







### 开启负载均衡



在Consumer端开启RestTemplate的负载均衡：

**添加@LoadBalanced注解即可！**



```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
```



OrderController修改固定地址为Provider注册到Eureka的的应用名称`CLOUD-PAYMENT-SERVICE`：



```java
@Slf4j
@RestController
public class OrderController {

    // private static final String PAYMENT_URL = "http://localhost:8001"
    private static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE";
    
    ....
}
```





### 测试



- 先启动EurekaServer，7001/7002服务
- 再启动服务提供者provider，8001/8002服务
- 浏览器输入 - http://localhost/consumer/payment/get/31
- **结果：负载均衡效果达到，8001/8002端口交替出现**
- Ribbon和Eureka整合后Consumer可以**直接调用服务而不用再关心地址和端口号**，且该服务还有负载功能。





**相互注册，互相守望！**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/15/d55aa433a1bb7f955e725f07a55b67ff.png)





## 4、actuator微服务信息完善



### 更换服务名



Eureka中显示的 `itnxd:cloud-payment-service:8002, itnxd:cloud-payment-service:8001`

主机名称：服务名称修改（也就是将原地址，换成可读性高的名字）



在 cloud-provider-payment8002 和 cloud-provider-payment8001 两个微服务的yaml文件中配置服务名称即可：



```yaml
# cloud-provider-payment8002
eureka:
  ...
  instance:
    instance-id: payment8002 #添加此处

# cloud-provider-payment8001
eureka:
  ...
  instance:
    instance-id: payment8001 #添加此处
```



修改之后：eureka主页将显示payment8001，payment8002代替原来显示的一串地址。



### 服务显示ip信息



在 cloud-provider-payment8002 和 cloud-provider-payment8001 两个微服务的yaml文件中配置即可：



即鼠标移动到服务名payment8001上会有ip提示！`http://192.168.1.100:8001/actuator/info`



```yaml
eureka:
  ...	
  instance:
    instance-id: payment8001
    prefer-ip-address: true #添加此处
    
eureka:
  ...	
  instance:
    instance-id: payment8002
    prefer-ip-address: true #添加此处
```





## 5、服务发现Discovery





> 对于注册进eureka里面的微服务，可以通过服务发现来获得该服务的信息！



**修改cloud-provider-payment8001的Controller：**



```java
@Slf4j
@RestController
public class PaymentController {

    // 注册服务发现 注意是cloud下的包！
    @Resource
    private DiscoveryClient discoveryClient;

    @GetMapping("/payment/discovery")
    public Object discovery(){
        // 获取服务名 CLOUD-ORDER-SERVICE CLOUD-PAYMENT-SERVICE
        List<String> services = discoveryClient.getServices();
        for (String service : services) {
            log.info("==========service" + service);
        }
        // 获取一个服务下的多个实例 payment8002 , payment8001
        List<ServiceInstance> instances = discoveryClient.getInstances(
                "CLOUD-PAYMENT-SERVICE");
        for (ServiceInstance instance : instances) {
            log.info(instance.getServiceId() + "\t" + instance.getHost() +
                    "\t" + instance.getPort() + "\t" + instance.getUri());
        }
        return this.discoveryClient;
    }

}
```





**主启动类开启服务发现：**



```java
@SpringBootApplication
@EnableEurekaClient // 表明是Eureka客户端，即服务提供者注册到Server端！
@EnableDiscoveryClient // 开启服务发现
public class PaymentMain8001 {

    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8001.class, args);
    }
}
```



**测试：**



访问：http://localhost:8001/payment/discovery 多刷新几次！



**浏览器返回：**

```json
{
    order: 0,
    services: [
        "cloud-payment-service",
        "cloud-order-service"
    ]
}
```



**日志打印：**



```
==========servicecloud-payment-service
==========servicecloud-order-service
CLOUD-PAYMENT-SERVICE	192.168.1.100	8001	http://192.168.1.100:8001
CLOUD-PAYMENT-SERVICE	192.168.1.100	8002	http://192.168.1.100:8002
```





## 6、Eureka自我保护



### 概述



保护模式主要用于一组客户端和Eureka Server之间存在网络分区场景下的保护。

**一旦进入保护模式，Eureka Server将会尝试保护其服务注册表中的信息，不再删除服务注册表中的数据，也就是不会注销任何微服务。**

如果在Eureka Server的首页看到以下这段提示，则说明Eureka进入了保护模式：



```
EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.
```



### 导致原因



一句话：某时刻某一个微服务不可用了，Eureka不会立刻清理，依旧会对该微服务的信息进行保存。

属于CAP里面的AP分支。



关于CAP理论：[https://itnxd.eu.org/posts/34316.html#4%E3%80%81CAP%E7%90%86%E8%AE%BA](https://itnxd.eu.org/posts/34316.html#4%E3%80%81CAP%E7%90%86%E8%AE%BA)



### 为什么会有Eureka自我保护机制

为了EurekaClient可以正常运行，防止与EurekaServer网络不通情况下，EurekaServer不会立刻将EurekaClient服务剔除



### 什么是自我保护模式



默认情况下，如果EurekaServer在一定时间内没有接收到某个微服务实例的心跳，EurekaServer将会注销该实例(**默认90秒**)。

但是当网络分区故障发生(**延时、卡顿、拥挤**)时，**微服务与EurekaServer之间无法正常通信**，以上行为可能变得非常危险了——因为微服务本身其实是健康的，此时本不应该注销这个微服务。

Eureka通过“自我保护模式”来解决这个问题。

**当EurekaServer节点在短时间内丢失过多客户端时(可能发生了网络分区故障)，那么这个节点就会进入自我保护模式。**





在自我保护模式中，Eureka Server会保护服务注册表中的信息，不再注销任何服务实例。

它的设计哲学就是宁可保留错误的服务注册信息，也不盲目注销任何可能健康的服务实例。**一句话讲解：好死不如赖活着**。

综上，自我保护模式是一种应对网络异常的安全保护措施。**它的架构哲学是宁可同时保留所有微服务（健康的微服务和不健康的微服务都会保留）也不盲目注销任何健康的微服务。使用自我保护模式，可以让Eureka集群更加的健壮、稳定。**





### 禁止自我保护





**在EurekaServer端7001处设置关闭自我保护机制！**



出厂默认，自我保护机制是开启的。

使用`eureka.server.enable-self-preservation = false`可以禁用自我保护模式！



```yaml
eureka:
  ...
  server:
    #关闭自我保护机制，保证不可用服务被及时踢除
    enable-self-preservation: false
    eviction-interval-timer-in-ms: 2000
```





**关闭效果：**

spring-eureka主页会显示出一句：

```
THE SELF PRESERVATION MODE IS TURNED OFF. THIS MAY NOT PROTECT INSTANCE EXPIRY IN CASE OF NETWORK/OTHER PROBLEMS.
```



**生产者客户端eureakeClient端8001设置心跳间隔：**



```yaml
eureka:
  ...
  instance:
    instance-id: payment8001
    prefer-ip-address: true
    #心跳检测与续约时间
    #开发时没置小些，保证服务关闭后注册中心能即使剔除服务
    #Eureka客户端向服务端发送心跳的时间间隔，单位为秒(默认是30秒)
    lease-renewal-interval-in-seconds: 1
    #Eureka服务端在收到最后一次心跳后等待时间上限，单位为秒(默认是90秒)，超时将剔除服务
    lease-expiration-duration-in-seconds: 2
```



**测试：**

- 7001和8001都配置完成
- 先启动7001再启动8001

**结果：先关闭8001，马上被删除了**





## 7、Eureka停更说明



> [https://github.com/Netflix/eureka/wiki](https://github.com/Netflix/eureka/wiki)

```
Eureka 2.0 (Discontinued)

The existing open source work on eureka 2.0 is discontinued. The code base and artifacts that were released as part of the existing repository of work on the 2.x branch is considered use at your own risk.

Eureka 1.x is a core part of Netflix’s service discovery system and is still an active project.
```



**我们用ZooKeeper代替Eureka功能！**





## 8、Provider注册进Zookeeper





> 安装好Zookeeper并开放端口！



**新建 Module：cloud-provider-payment8004**



### pom文件



**注意：Zookeeper安装的版本一定要高于jar包，否则无法使用！若版本低于jar包，可以先排除高版本依赖，再引入对应版本依赖即可！**





```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-provider-payment8004</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合zookeeper客户端 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
            <!--先排除自带的zookeeper3.5.3 防止与3.4.9起冲突-->
            <!--<exclusions>
                <exclusion>
                    <groupId>org.apache.zookeeper</groupId>
                    <artifactId>zookeeper</artifactId>
                </exclusion>
            </exclusions>-->
        </dependency>
        <!--添加zookeeper3.4.9版本-->
        <!--<dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.4.9</version>
        </dependency>-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



### yml文件



```yaml
# 8004表示注册到zookeeper服务器的支付服务提供者端口号
server:
  port: 8004

# 服务别名----注册zookeeper到注册中心名称
spring:
  application:
    name: cloud-provider-payment
  cloud:
    zookeeper:
      connect-string: localhost:2181
```



### Controller



```java
@RestController
@Slf4j
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/zk")
    public String paymentZk() {
        return "springCloud with zookeeper: "+serverPort+"\t"+ UUID.randomUUID().toString();
    }

}
```





### 主启动类



```java
@SpringBootApplication
@EnableDiscoveryClient // 该注解用于向使用consul或者zookeeper作为注册中心时注册服务
public class PaymentMain8004 {

    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8004.class, args);
    }
}
```





### 启动测试



```shell
[zk: localhost:2181(CONNECTED) 70] ls /services
[cloud-provider-payment]
[zk: localhost:2181(CONNECTED) 71] ls /services/cloud-provider-payment 
[ffbe7564-647f-4159-8129-cec9fb062fdf]
[zk: localhost:2181(CONNECTED) 72] get /services/cloud-provider-payment/ffbe7564-647f-4159-8129-cec9fb062fdf 
{"name":"cloud-provider-payment","id":"ffbe7564-647f-4159-8129-cec9fb062fdf","address":"192.168.1.106","port":8004,"sslPort":null,"payload":{"@class":"org.springframework.cloud.zookeeper.discovery.ZookeeperInstance","id":"application-1","name":"cloud-provider-payment","metadata":{}},"registrationTimeUTC":1634352487309,"serviceType":"DYNAMIC","uriSpec":{"parts":[{"value":"scheme","variable":true},{"value":"://","variable":false},{"value":"address","variable":true},{"value":":","variable":false},{"value":"port","variable":true}]}}
[zk: localhost:2181(CONNECTED) 73] 
```





### 临时还是持久节点





ZooKeeper的服务节点是**临时节点**！







## 9、Consumer注册进zookeeper





**新建Module  cloud-consumerzk-order80：**



### pom文件







```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumerzk-order80</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- SpringBoot整合zookeeper客户端 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
            <!--先排除自带的zookeeper-->
            <!--<exclusions>
                <exclusion>
                    <groupId>org.apache.zookeeper</groupId>
                    <artifactId>zookeeper</artifactId>
                </exclusion>
            </exclusions>-->
        </dependency>
        <!--添加zookeeper3.4.9版本-->
        <!--<dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.4.9</version>
        </dependency>-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```





### yml文件



```yaml
server:
  port: 80

spring:
  application:
    name: cloud-consumer-order
  cloud:
    zookeeper:
      connect-string: localhost:2181
```



### 配置类



```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
```



### Controller



```java
@Slf4j
@RestController
public class OrderZkController {

    private static final String INVOKE_URL = "http://cloud-provider-payment";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/payment/zk")
    public String paymentInfo(){
        return restTemplate.getForObject(INVOKE_URL + "/payment/zk", String.class);
    }
}
```



### 主启动类



```java
@SpringBootApplication
@EnableDiscoveryClient // 开启服务发现
public class OrderMain80 {

    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class, args);
    }
}
```



### 启动测试



运行ZooKeeper服务端，cloud-consumerzk-order80，cloud-provider-payment8004。



打开ZooKeeper客户端：



```shell
[zk: localhost:2181(CONNECTED) 22] ls /
[services, zookeeper]
[zk: localhost:2181(CONNECTED) 23] ls /services 
[cloud-consumer-order, cloud-provider-payment]
```



访问测试地址：[http://localhost/consumer/payment/zk](http://localhost/consumer/payment/zk)





## 10、Consul注册中心



> [Consul官网](https://www.consul.io/)
>
> [Consul下载地址](https://www.consul.io/downloads)



### 简介



Consul是一套开源的分布式服务发现和配置管理系统，由HashiCorp 公司用Go语言开发。

提供了微服务系统中的服务治理、配置中心、控制总线等功能。这些功能中的每一个都可以根据需要单独使用，也可以一起使用以构建全方位的服务网格，总之Consul提供了一种完整的服务网格解决方案。

它具有很多优点。包括：基于raft协议，比较简洁；支持健康检查，同时支持HTTP和DNS协议支持跨数据中心的WAN集群提供图形界面跨平台，支持Linux、Mac、Windows。



### 能干嘛



- 服务发现 - 提供HTTP和DNS两种发现方式。
- 健康监测 - 支持多种方式，HTTP、TCP、Docker、Shell脚本定制化
- KV存储 - Key、Value的存储方式
- 多数据中心 - Consul支持多数据中心
- 可视化Web界面



### 安装并运行Consul



```shell
# 建议下载到本地再上传到服务器
wget https://releases.hashicorp.com/consul/1.10.3/consul_1.10.3_linux_amd64.zip

unzip consul_1.10.3_linux_amd64.zip

./consul -v

# 启动运行
./consul agent -dev -ui -node=consul-dev -client=你的私网ip

# 云服务器需要绑定私网ip，用公网ip访问！
```





默认端口：8500





## 11、Provider注册进Consul





**新建 Module cloud-providerconsul-payment8006**



### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-providerconsul-payment8006</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>RELEASE</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>RELEASE</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



### yml文件



```yaml
server:
  port: 8006

spring:
  application:
    name: consul-provider-payment
  ####consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
        # 若服务显示红X将心跳开启
        heartbeat:
          enabled: true
```





### Controller



```java
@RestController
@Slf4j
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/consul")
    public String paymentZk() {
        return "springCloud with consul: "+serverPort+"\t"+ UUID.randomUUID().toString();
    }

}
```





### 主启动类



```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain8006 {

    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8006.class, args);
    }
}
```







### 启动测试



http://localhost:8006/payment/consul

http://localhost:8500 会显示 consul-provider-payment





## 12、Consumer注册进Consul



**新建 Module cloud-consumerconsul-order80**



### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumerconsul-order80</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```









### yml文件



```yaml
server:
  port: 80

spring:
  application:
    name: cloud-consumer-order
  ####consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
        heartbeat:
          enabled: true
```



### Controller

```java
@Slf4j
@RestController
public class OrderController {

    private static final String INVOKE_URL = "http://consul-provider-payment";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping(value = "/consumer/payment/consul")
    public String paymentInfo() {
        return restTemplate.getForObject(INVOKE_URL + "/payment/consul", String.class);
    }
}
```



### 主配置类



```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
```





### 主启动类



```java
@SpringBootApplication
@EnableDiscoveryClient //该注解用于向使用consul或者zookeeper作为注册中心时注册服务
public class OrderMain80 {
    
    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class, args);
    }
}
```



### 启动测试



**运行consul，cloud-providerconsul-payment8006，cloud-consumerconsul-order80：**



- http://localhost:8500/ 主页会显示出 cloud-providerconsul-payment8006，cloud-consumerconsul-order80
- 访问测试地址：http://localhost/consumer/payment/consul







## 13、三注册中心异同点





### 对比表



| 组件名    | 语言 | CAP  | 服务健康检查 | 对外暴露接口 | Spring Cloud集成 |
| --------- | ---- | ---- | ------------ | ------------ | ---------------- |
| Eureka    | Java | AP   | 可配支持     | HTTP         | 已集成           |
| Consul    | Go   | CP   | 支持         | HTTP/DNS     | 已集成           |
| Zookeeper | Java | CP   | 支持         | 客户端       | 已集成           |



### CAP

- C：Consistency (强一致性)
- A：Availability (可用性)
- P：Partition tolerance （分区容错性)





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/16/bb6820a02b511002e10c9a3ac1d79a8c.png)







**最多只能同时较好的满足两个。**

CAP理论的核心是：一个分布式系统不可能同时很好的满足一致性，可用性和分区容错性这三个需求。

因此，根据CAP原理将NoSQL数据库分成了满足CA原则、满足CP原则和满足AP原则三大类：

- CA - 单点集群，满足—致性，可用性的系统，通常在可扩展性上不太强大。
- CP - 满足一致性，分区容错性的系统，通常性能不是特别高。
- AP - 满足可用性，分区容错性的系统，通常可能对一致性要求低一些。



**AP架构（Eureka）**

当网络分区出现后，为了保证可用性，系统B可以返**回旧值**，保证系统的可用性。

结论：违背了一致性C的要求，只满足可用性和分区容错，即AP

**CP架构（ZooKeeper/Consul）**

当网络分区出现后，为了保证一致性，就**必须拒接请求**，否则无法保证一致性。

结论：违背了可用性A的要求，只满足一致性和分区容错，即CP。









# 四、服务调用



> **Ribbon、Feign（X）、OpenFeign**





## 1、Ribbon概述



### 是什么



Spring Cloud Ribbon是基于Netflix Ribbon实现的一套**客户端负载均衡**的工具。

简单的说，Ribbon是Netflix发布的开源项目，主要功能是提供客户端的软件负载均衡算法和服务调用。Ribbon客户端组件提供一系列完善的配置项如连接超时，重试等。

简单的说，就是在配置文件中列出Load Balancer(简称LB)后面所有的机器，Ribbon会自动的帮助你基于某种规则(如简单轮询，随机连接等）去连接这些机器。我们很容易使用Ribbon实现自定义的负载均衡算法。



### 官网资料





[Github - Ribbon](https://github.com/Netflix/ribbon/wiki/Getting-Started)

Ribbon目前也进入**维护模式**。

Ribbon未来可能被Spring Cloud LoadBalacer替代。





### 能干嘛



**LB负载均衡(Load Balance)是什么**



简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA (高可用)。

常见的负载均衡有软件Nginx，LVS，硬件F5等。



**Ribbon本地负载均衡客户端VS Nginx服务端负载均衡区别**



**Nginx是服务器负载均衡**，客户端所有请求都会交给nginx，然后由nginx实现转发请求。即负载均衡是由服务端实现的。

**Ribbon本地负载均衡**，在调用微服务接口时候，会在注册中心上获取注册信息服务列表之后缓存到JVM本地，从而在本地实现**RPC远程服务调用**技术。



**集中式LB**



即在服务的消费方和提供方之间使用独立的LB设施(可以是硬件，如F5, 也可以是软件，如nginx)，由该设施负责把访问请求通过某种策略转发至服务的提供方。

**进程内LB**



将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务器。

Ribbon就属于进程内LB，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址。



**一句话**

**负载均衡 + RestTemplate调用**





## 2、Ribbon负载均衡



### 架构说明



Ribbon其实就是一个软负载均衡的客户端组件，它可以和其他所需请求的客户端结合使用，和Eureka结合只是其中的一个实例。



**Ribbon在工作时分成两步：**

- 第一步先选择EurekaServer ,它优先选择在同一个区域内负载较少的server。
- 第二步再根据用户指定的策略，在从server取到的服务注册列表中选择一个地址。

其中Ribbon提供了多种策略：比如**轮询、随机和根据响应时间加权**。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/16/a74388dba8613b5aa44aaed63a6c8988.png)





### Pom文件



先前工程项目没有引入spring-cloud-starter-ribbon也可以使用ribbon。

这是因为spring-cloud-starter-netflix-eureka-client自带了spring-cloud-starter-ribbon引用。



```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
</dependency>
```





### 再说RestTemplate





[RestTemplate Java Doc](https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html)



- **postForObject() / postForEntity()** - POST请求方法
- **getForObject() / getForEntity()** - GET请求方法

- getForObject()：返回对象为响应体中数据转化成的对象，基本上可以理解为Json。

- getForEntity()：返回对象为ResponseEntity对象，包含了响应中的一些重要信息，比如响应头、响应状态码、响应体等。



**测试Entity：**

```java
@GetMapping("/consumer/payment/getForEntity/{id}")
public CommonResult<Payment> getPayment1(@PathVariable("id") Long id){
    ResponseEntity<CommonResult> entity = restTemplate.getForEntity(PAYMENT_URL +
            "/payment/get/" + id, CommonResult.class);
    if(entity.getStatusCode().is2xxSuccessful()){
        log.info(entity.getStatusCode() + "\t" + entity.getHeaders());
        return entity.getBody();
    }else{
        return new CommonResult<>(444, "操作失败");
    }
}
```





## 3、Ribbon核心组件IRule





**lRule：根据特定算法中从服务列表中选取一个要访问的服务**



- RoundRobinRule 轮询
- RandomRule 随机
- RetryRule 先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重
- WeightedResponseTimeRule 对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择
- BestAvailableRule 会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务
- AvailabilityFilteringRule 先过滤掉故障实例，再选择并发较小的实例
- ZoneAvoidanceRule 默认规则,复合判断server所在区域的性能和server的可用性选择服务器



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/16/b5e711ceda3c95c67ae8b1a6e10eff76.png)







### Ribbon负载规则替换



**修改cloud-consumer-order80**



**注意配置细节：**

官方文档明确给出了警告：

这个自定义配置类不能放在 @ComponentScan 所扫描的当前包下以及子包下，否则我们自定义的这个配置类就会被所有的Ribbon客户端所**共享**，达不到特殊化定制的目的了。



**也就是说不要将Ribbon配置类与主启动类同包**





**新建package com.itnxd.myrule**

包下新建MySelfRule规则类：



```java
@Configuration
public class MySelfRule {

    @Bean
    public IRule myRule(){
        return new RandomRule();
    }
}
```



**主启动类添加@RibbonClient：**

- 指定生产者服务名
- 指定规则类



```java
@SpringBootApplication
@EnableEurekaClient
@RibbonClient(name = "CLOUD-PAYMENT-SERVICE", configuration = MySelfRule.class)
public class OrderMain80 {

    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class, args);
    }

}
```



**测试：**



开启cloud-eureka-server7001，cloud-eureka-server7002，cloud-consumer-order80，cloud-provider-payment8001，cloud-provider-payment8002

浏览器输入：http://localhost/consumer/payment/get/1

返回结果中的serverPort在8001与8002两种间随机变化！





## 4、Ribbon之手写轮询算法





**默认负载轮询算法: rest接口第几次请求数 % 服务器集群总数量 = 实际调用服务器位置下标，每次服务重启动后rest接口计数从1开始**。





80订单微服务改造：ApplicationContextConfig去掉注解@LoadBalanced，OrderMain80去掉注解@RibbonClient



### PaymentController



```java
@RestController
@Slf4j
public class PaymentController{

    ...
    
	@GetMapping(value = "/payment/lb")
    public String getPaymentLB() {
        return serverPort;//返回服务接口
    }
    
    ...
}
```





### 创建LoadBalancer接口



```java
public interface LoadBalancer {

    ServiceInstance instances(List<ServiceInstance> serviceInstances);
}
```



### MyLB实现LoadBalancer接口



```java
@Component
public class MyLB implements LoadBalancer{

    private AtomicInteger atomicInteger = new AtomicInteger(0);

    public final int getAndIncrement(){
        int current;
        int next;
        do {
            current = atomicInteger.get();
            next = current >= 2147483647 ? 0 : current + 1;
        }while (!this.atomicInteger.compareAndSet(current, next));
        System.out.println("==============next：" + next);
        return next;
    }

    @Override
    public ServiceInstance instances(List<ServiceInstance> serviceInstances) {
        int index = getAndIncrement() % serviceInstances.size();
        return serviceInstances.get(index);
    }
}
```





### OrderController



```java
@Slf4j
@RestController
public class OrderController {

    private static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE";

    @Resource
    private RestTemplate restTemplate;
    @Resource
    private LoadBalancer loadBalancer;
    @Resource
    private DiscoveryClient discoveryClient;


    @GetMapping(value = "/consumer/payment/lb")
    public String getPaymentLB(){
        List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");

        if(instances == null || instances.size() <= 0){
            return null;
        }

        ServiceInstance serviceInstance = loadBalancer.instances(instances);
        URI uri = serviceInstance.getUri();

        return restTemplate.getForObject(uri+"/payment/lb",String.class);
    }
}
```



### 启动测试



不停地刷新 http://localhost/consumer/payment/lb ，可以看到8001/8002交替出现。







## 5、OpenFeign





### 概述



> [官方文档](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/#spring-cloud-openfeign)
>
> [Github地址](https://github.com/spring-cloud/spring-cloud-openfeign)



Feign是一个声明式WebService客户端。使用Feign能让编写Web Service客户端更加简单。它的使用方法是**定义一个服务接口然后在上面添加注解**。

Feign也支持可拔插式的编码器和解码器。Spring Cloud对Feign进行了封装，使其**支持了Spring MVC标准注解和HttpMessageConverters**。

**Feign可以与Eureka和Ribbon组合使用以支持负载均衡。**



### Feign能干什么

Feign旨在使编写Java Http客户端变得更容易。

前面在使用Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理，形成了一套模版化的调用方法。

但是在实际开发中，由于对服务依赖的调用可能不止一处，往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一些客户端类来包装这些依赖服务的调用。

所以，Feign在此基础上做了进一步封装，由他来帮助我们定义和实现依赖服务接口的定义。在Feign的实现下，我们只需创建一个接口并使用注解的方式来配置它(以前是Dao接口上面标注Mapper注解,现在是一个微服务接口上面标注一个Feign注解即可)，即可完成对服务提供方的接口绑定，简化了使用Spring cloud Ribbon时，自动封装服务调用客户端的开发量。



### Feign集成了Ribbon



利用Ribbon维护了Payment的服务列表信息，并且通过轮询实现了客户端的负载均衡。

而与Ribbon不同的是，通过**feign只需要定义服务绑定接口且以声明式的方法**，优雅而简单的实现了服务调用。



### Feign和OpenFeign两者区别



Feign是Spring Cloud组件中的一个轻量级RESTful的HTTP服务客户端。

**Feign内置了Ribbon**，用来做客户端负载均衡，去调用服务注册中心的服务。

Feign的使用方式是：使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务。


**OpenFeign是Spring Cloud在Feign的基础上支持了SpringMVC的注解**，如@RequesMapping等等。

OpenFeign的@Feignclient可以解析SpringMVc的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。





```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-feign</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```





## 6、OpenFeign服务调用





**接口+注解：微服务调用接口 + @FeignClient**





**新建Module cloud-consumer-feign-order80**



### pom文件





```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-feign-order80</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!--eureka client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础通用配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



### yml文件



使用OpenFeign无需注册到Eureka注册中心！



```yaml
server:
  port: 80

eureka:
  client:
    register-with-eureka: false
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/
```



### Controller



调用标了@FeignClient注解的Service来实现远程http调用！



```java
@RestController
@Slf4j
public class OrderFeignController {
    @Resource
    private PaymentFeignService paymentFeignService;

    @GetMapping(value = "/consumer/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id) {
        return paymentFeignService.getPaymentById(id);
    }

}
```





### Service

指定注册中心的服务提供者名称，通过名称@FeignClient加实际访问的地址@GetMapping来远程调用生产者方提供的服务！

```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentFeignService {

    @GetMapping(value = "/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id);

}
```



### 主启动类

```java
@SpringBootApplication
@EnableFeignClients // 开启feign功能
public class OrderFeignMain80 {

    public static void main(String[] args) {
        SpringApplication.run(OrderFeignMain80.class, args);
    }
}
```





### 启动测试





- 先启动2个eureka集群7001/7002

- 再启动2个微服务8001/8002

- 启动OrderFeignMain80
- 访问：http://localhost/consumer/payment/get/1





**Feign自带负载均衡配置项，集成了Ribbon！**







## 7、OpenFeign超时控制





**超时设置，故意设置超时演示出错情况**



**1、服务提供方8001/8002故意写暂停程序**



```java
@RestController
@Slf4j
public class PaymentController {
    
    ...
    
    @Value("${server.port}")
    private String serverPort;

    ...
    
    @GetMapping(value = "/payment/feign/timeout")
    public String paymentFeignTimeout(){
        // 业务逻辑处理正确，但是需要耗费3秒钟
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return serverPort;
    }
    
    ...
}
```



**2、服务消费方80添加超时方法PaymentFeignService**



```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentFeignService {

    @GetMapping(value = "/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id);

    @GetMapping("/payment/feign/timeout")
    public String paymentFeignTimeout();

}
```



**3、服务消费方80添加超时方法OrderFeignController**



```java
@RestController
@Slf4j
public class OrderFeignController {
    @Resource
    private PaymentFeignService paymentFeignService;

    @GetMapping(value = "/consumer/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id) {
        return paymentFeignService.getPaymentById(id);
    }

    @GetMapping("/consumer/payment/feign/timeout")
    public String paymentFeignTimeout(){
        // OpenFeign客户端一般默认等待1秒钟
        return paymentFeignService.paymentFeignTimeout();
    }

}
```



**4、测试**



多次刷新 http://localhost/consumer/payment/feign/timeout

将会跳出错误Spring Boot默认错误页面，主要异常：`feign.RetryableException:Read timed out executing GET http://CLOUD-PAYMENT-SERVCE/payment/feign/timeout。`



OpenFeign默认等待1秒钟，超过后报错!



**客户端YML文件里需要开启OpenFeign客户端超时控制：**



```yaml
#设置feign客户端超时时间(OpenFeign默认支持ribbon)(单位：毫秒)
ribbon:
  #指的是建立连接后从服务器读取到可用资源所用的时间
  ReadTimeout: 5000
  #指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间
  ConnectTimeout: 5000
```





## 8、OpenFeign日志增强





### 日志打印功能



Feign提供了日志打印功能，我们可以通过配置来调整日恙级别，从而了解Feign 中 Http请求的细节。

说白了就是对Feign接口的调用情况进行监控和输出！



### 日志级别

- NONE：默认的，不显示任何日志;
- BASIC：仅记录请求方法、URL、响应状态码及执行时间;
- HEADERS：除了BASIC中定义的信息之外，还有请求和响应的头信息;
- FULL：除了HEADERS中定义的信息之外，还有请求和响应的正文及元数据。



### 配置日志bean





```java
@Configuration
public class FeignConfig {
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
```





### yml开启日志



```yaml
logging:
  level:
    # feign日志以什么级别监控哪个接口
    com.itnxd.springcloud.service.PaymentFeignService: debug
```





### 后台日志查看





```shell
[PaymentFeignService#getPaymentById] <--- HTTP/1.1 200 (606ms)
[PaymentFeignService#getPaymentById] connection: keep-alive
[PaymentFeignService#getPaymentById] content-type: application/json
[PaymentFeignService#getPaymentById] date: Sun, 17 Oct 2021 03:21:54 GMT
[PaymentFeignService#getPaymentById] keep-alive: timeout=60
[PaymentFeignService#getPaymentById] transfer-encoding: chunked
[PaymentFeignService#getPaymentById] 
[PaymentFeignService#getPaymentById] {"code":200,"message":"查询成功！serverPort：8002","data":{"id":1,"serial":"dsfdsfsdaf"}}
[PaymentFeignService#getPaymentById] <--- END HTTP (95-byte body)
 Flipping property: CLOUD-PAYMENT-SERVICE.ribbon.ActiveConnectionsLimit to use NEXT property: niws.loadbalancer.availabilityFilteringRule.activeConnectionsLimit = 2147483647
```



# 五、服务降级



> **Hystrix（X）、Resilience4j（X）、Sentienl**





## 1、Hystrix概述





### 分布式系统面临的问题



复杂分布式体系结构中的应用程序有数十个依赖关系，每个依赖关系在某些时候将不可避免地失败。



### 服务雪崩

多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其它的微服务，这就是所谓的“扇出”。如果扇出的链路上某个微服务的调用响应时间过长或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“**雪崩效应**”。

对于高流量的应用来说，单一的后避依赖可能会导致所有服务器上的所有资源都在几秒钟内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的**级联故障**。这些都表示需要对故障和延迟进行隔离和管理，以便单个依赖关系的失败，不能取消整个应用程序或系统。

所以，通常当你发现一个模块下的某个实例失败后，这时候这个模块依然还会接收流量，然后这个有问题的模块还调用了其他的模块，这样就会发生级联故障，或者叫**雪崩**。



### Hystrix是什么

**Hystrix是一个用于处理分布式系统的延迟和容错的开源库**，在分布式系统里，许多依赖不可避免的会调用失败，比如超时、异常等，Hystrix能够保证在一个依赖出问题的情况下，不会导致整体服务失败，**避免级联故障**，以提高分布式系统的弹性。

"断路器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝)，向调用方返回一个符合预期的、可处理的备选响应（FallBack)，而不是长时间的等待或者抛出调用方无法处理的异常，这样就保证了服务调用方的线程不会被长时间、不必要地占用，从而避免了故障在分布式系统中的蔓延，乃至雪崩。





## 2、Hystrix停更进维



### 能干嘛

- 服务降级
- 服务熔断
- 接近实对的监控
- …

### 官网资料



[https://github.com/Netflix/Hystrix/wiki/How-To-Use](https://github.com/Netflix/Hystrix/wiki/How-To-Use)

[https://github.com/Netflix/Hystrix](https://github.com/Netflix/Hystrix)



**Hystrix官宣，停更进维**



- 被动修bugs
- 不再接受合并请求
- 不再发布新版本





## 3、Hystrix重要概念





### 服务降级

服务器忙，请稍后再试，不让客户端等待并立刻返回一个友好提示，fallback



**哪些情况会发生降级：**

- 程序运行导常
- 超时
- 服务熔断触发服务降级
- 线程池/信号量打满也会导致服务降级

### 服务熔断

类比保险丝达到最大服务访问后，直接拒绝访问，拉闸限电，然后调用服务降级的方法并返回友好提示。

**服务的降级 -> 进而熔断 -> 恢复调用链路**

### 服务限流

秒杀高并发等操作，严禁一窝蜂的过来拥挤，大家排队，一秒钟N个，有序进行。







## 4、Hystrix-Provider





**将cloud-eureka-server7001改配置成单机版！**



**新建Module cloud-provider-hystrix-payment8001**





### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-provider-hystrix-payment8001</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--hystrix-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <!--eureka client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!--web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

### yml文件

```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-provider-hystrix-payment

eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      #defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka
      defaultZone: http://eureka7001.com:7001/eureka
```



### Service

```java
@Service
public class PaymentService {

    public String paymentInfo_OK(Integer id) {
        return "线程池:  " + Thread.currentThread().getName() +
                "  paymentInfo_OK,id:  " + id + "\t" + "O(∩_∩)O哈哈~";
    }

    public String paymentInfo_TimeOut(Integer id) {
        try {
            TimeUnit.MILLISECONDS.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "线程池:  " + Thread.currentThread().getName() + " id:  "
                + id + "\t" + "O(∩_∩)O哈哈~" + "  耗时(秒): 3";
    }
}
```



### controller



```java
@RestController
@Slf4j
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfo_OK(@PathVariable("id") Integer id) {
        String result = paymentService.paymentInfo_OK(id);
        log.info("*****result: " + result);
        return result;
    }

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id) {
        String result = paymentService.paymentInfo_TimeOut(id);
        log.info("*****result: " + result);
        return result;
    }
}
```

### 主启动类

```java
@SpringBootApplication
@EnableEurekaClient
public class PaymentHystrixMain8001 {

    public static void main(String[] args) {
        SpringApplication.run(PaymentHystrixMain8001.class, args);
    }
}
```



### 启动测试



- 启动eureka7001
- 启动cloud-provider-hystrix-payment8001



**访问：**

- http://localhost:8001/payment/hystrix/ok/1
- http://localhost:8001/payment/hystrix/timeout/1



上述module均OK！

以上述为根基平台，从正确 -> 错误 -> 降级熔断 -> 恢复。



### JMeter压测



**上述在非高并发情形下，还能勉强满足**

**Jmeter压测测试**

[JMeter官网](https://jmeter.apache.org/index.html)



开启Jmeter，来20000个并发压死8001，20000个请求都去访问 paymentInfo_TimeOut服务

- 测试计划中右键添加-》线程-》线程组（线程组202102，线程数：200，线程数：100，其他参数默认）
- 刚刚新建线程组202102，右键它-》添加-》取样器-》Http请求-》基本 输入 http://localhost:8001/payment/hystrix/ok/1
- 点击绿色三角形图标启动。



看演示结果：拖慢，原因：tomcat的默认的工作线程数被打满了，没有多余的线程来分解压力和处理。

**Jmeter压测结论：**

上面还是服务提供者8001自己测试，假如此时外部的消费者80也来访问，那消费者只能干等，最终导致消费端80不满意，服务端8001直接被拖慢。



## 6、Hystrix-Consumer





**新建Module cloud-consumer-feign-hystrix-order80**





### pom文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-feign-hystrix-order80</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!--hystrix-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <!--eureka client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础通用配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



### yml文件



```yaml
server:
  port: 80

eureka:
  client:
    register-with-eureka: false
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/
      
ribbon:
  ReadTimeout: 5000
  ConnectTimeout: 5000
```

### Service



```java
@Component
@FeignClient(value = "CLOUD-PROVIDER-HYSTRIX-PAYMENT")
public interface PaymentHystrixService {

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfo_OK(@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id);
}
```

### Controller

```java
@RestController
@Slf4j
public class OrderHystrixController {
    @Resource
    private PaymentHystrixService paymentHystrixService;

    @GetMapping("/consumer/payment/hystrix/ok/{id}")
    public String paymentInfo_OK(@PathVariable("id") Integer id) {
        return paymentHystrixService.paymentInfo_OK(id);
    }

    @GetMapping("/consumer/payment/hystrix/timeout/{id}")
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id) {
        return paymentHystrixService.paymentInfo_TimeOut(id);
    }
}
```

### 主启动类

```java
@SpringBootApplication
@EnableFeignClients
//@EnableHystrix
public class OrderHystrixMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderHystrixMain80.class, args);
    }
}
```

### JMeter压测



2W个线程压8001

消费端80微服务再去访问正常的Ok微服务8001地址！

http://localhost/consumer/payment/hystrix/ok/1

消费者80被拖慢

**原因：8001同一层次的其它接口服务被困死，因为tomcat线程池里面的工作线程已经被挤占完毕。**

正因为有上述故障或不佳表现才有我们的降级/容错/限流等技术诞生。





### 降级容错解决的维度要求



- 超时导致服务器变慢(转圈) - **超时不再等待**

- 出错(宕机或程序运行出错) - **出错要有兜底**

**解决：**

- 对方服务(8001)超时了，调用者(80)不能一直卡死等待，必须有服务降级。
- 对方服务(8001)down机了，调用者(80)不能一直卡死等待，必须有服务降级。
- 对方服务(8001)OK，调用者(80)自己出故障或有自我要求(自己的等待时间小于服务提供者)，自己处理降级。





## 7、支付侧服务降级





**降级配置：@HystrixCommand**

8001先从自身找问题

**设置自身调用超时时间的峰值，峰值内可以正常运行，超过了需要有兜底的方法处埋，作服务降级fallback**。



### Service服务降级回调



—旦调用服务方法失败并抛出了错误信息后，会自动调用@HystrixCommand标注好的**fallbackMethod**调用类中的指定方法！



```java
@Service
public class PaymentService {

    public String paymentInfo_OK(Integer id) {
        return "线程池:  " + Thread.currentThread().getName() +
                "  paymentInfo_OK,id:  " + id + "\t" + "O(∩_∩)O哈哈~";
    }

    @HystrixCommand(fallbackMethod = "paymentInfo_TimeOutHandler", commandProperties = {
            @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value="3000")
    })
    public String paymentInfo_TimeOut(Integer id) {

        int i = 10 /0;

        int timeNumber = 5000;

        try {
            TimeUnit.MILLISECONDS.sleep(timeNumber);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "线程池:  " + Thread.currentThread().getName() + " id:  "
                + id + "\t" + "O(∩_∩)O哈哈~" + "  耗时(秒): " + timeNumber;
    }

    public String paymentInfo_TimeOutHandler(Integer id) {
        return "线程池:  " + Thread.currentThread().getName() + "  8001系统繁忙或者运行报错，请稍后再试,id:  "
                + id + "\t" + "o(╥﹏╥)o";
    }
}
```





### 主启动类激活



```java
@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker//添加到此处
public class PaymentHystrixMain8001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentHystrixMain8001.class, args);
    }
}
```



### 启动测试



上面故意制造两种异常：http://localhost:8001/payment/hystrix/ok/1

1. int age = 10/0，计算异常
2. 我们能接受3秒钟，它运行5秒钟，超时异常。

当前服务不可用了，做服务降级，兜底的方案都是 paymentInfo_TimeOutHandler





## 8、订单侧服务降级





80订单微服务，也可以更好的保护自己，自己也依样画葫芦进行客户端降级保护！



### yml文件



防止ribbon服务调用超时影响，现将其设置大，并开启hystrix，会将标注@FeignClient的类上套一层Hystrix！



```yaml
ribbon:
  ReadTimeout: 5000
  ConnectTimeout: 5000

#开启
feign:
  hystrix:
    enabled: true
```



### 主启动类



```java
@SpringBootApplication
@EnableFeignClients
@EnableHystrix//添加到此处
public class OrderHystrixMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderHystrixMain80.class, args);
    }
}
```



### Controller



```java
@RestController
@Slf4j
public class OrderHystrixController {
    @Resource
    private PaymentHystrixService paymentHystrixService;

    @GetMapping("/consumer/payment/hystrix/timeout/{id}")
    @HystrixCommand(fallbackMethod = "paymentTimeOutFallbackMethod",commandProperties = {
            @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value="1500")
    })
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id) {
        //int age = 10/0;
        return paymentHystrixService.paymentInfo_TimeOut(id);
    }

    //善后方法
    public String paymentTimeOutFallbackMethod(@PathVariable("id") Integer id){
        return "我是消费者80,对方支付系统繁忙请10秒钟后再试或者自己运行出错请检查自己,o(╥﹏╥)o";
    }
}
```







### 启动测试



访问：http://localhost/consumer/payment/hystrix/timeout/1

即可发生超时回调！











## 9、全局服务降级



### 目前问题



每个业务方法对应一个兜底的方法，代码膨胀。



### 解决方法



- 1:1每个方法配置一个服务降级方法，技术上可以，但是不聪明
- 1:N除了个别重要核心业务有专属，其它普通的可以通过`@DefaultProperties(defaultFallback = "")`统一跳转到统一处理结果页面
- 通用的和独享的各自分开，避免了代码膨胀，合理减少了代码量



**注意：全局方法不能用参数**



```java
@RestController
@Slf4j
@DefaultProperties(defaultFallback = "payment_Global_FallbackMethod")
public class OrderHystrixController {
    @Resource
    private PaymentHystrixService paymentHystrixService;

    @GetMapping("/consumer/payment/hystrix/ok/{id}")
    public String paymentInfo_OK(@PathVariable("id") Integer id) {
        return paymentHystrixService.paymentInfo_OK(id);
    }

    @GetMapping("/consumer/payment/hystrix/timeout/{id}")
    @HystrixCommand(fallbackMethod = "paymentTimeOutFallbackMethod", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "1500")
    })
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id) {
        //int age = 10/0;
        return paymentHystrixService.paymentInfo_TimeOut(id);
    }

    //善后方法
    public String paymentTimeOutFallbackMethod(@PathVariable("id") Integer id) {
        return "我是消费者80,对方支付系统繁忙请10秒钟后再试或者自己运行出错请检查自己,o(╥﹏╥)o";
    }

    // 下面是全局fallback方法
    public String payment_Global_FallbackMethod() {
        return "Global异常处理信息，请稍后再试，/(ㄒoㄒ)/~~";
    }
}
```











## 10、通配服务降级





### 目前问题



统一和自定义的分开，代码混乱！

服务降级，客户端去调用服务端，碰上服务端宕机或关闭

本次案例服务降级处理是在客户端80实现完成的，与服务端8001没有关系，只需要为Feign客户端定义的接口添加一个服务降级处理的实现类即可**实现解耦**！



**未来我们要面对的异常**

- 运行
- 超时
- 宕机





### 解决方法



**修改cloud-consumer-feign-hystrix-order80**



根据cloud-consumer-feign-hystrix-order80已经有的PaymentHystrixService接口，重新新建一个类(PaymentFallbackService)实现该接口，统一为接口里面的方法进行异常处理！



```java
@Component
public class PaymentFallbackService implements PaymentHystrixService {
    @Override
    public String paymentInfo_OK(Integer id) {
        return "-----PaymentFallbackService fall back-paymentInfo_OK ,o(╥﹏╥)o";
    }

    @Override
    public String paymentInfo_TimeOut(Integer id) {
        return "-----PaymentFallbackService fall back-paymentInfo_TimeOut ,o(╥﹏╥)o";
    }
}
```



**Service指定fallback的类：**

```java
@Component
/*,fallback = PaymentFallbackService.class*/
@FeignClient(value = "CLOUD-PROVIDER-HYSTRIX-PAYMENT",
        fallback = PaymentFallbackService.class)
public interface PaymentHystrixService {

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfo_OK(@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id);
}
```



**yml一定要开启hystrix：**

```yaml
#开启
feign:
  hystrix:
    enabled: true
```





### 启动测试



- 单个eureka先启动7001
- PaymentHystrixMain8001启动



正常访问测试：http://localhost/consumer/payment/hystrix/ok/1

**故意关闭微服务8001**

会调用该实现类的通配服务降级方法处理！





### 降级优先级



1. @HystrixCommand方法上指定的回调
2. @DefaultProperties类上指定的回调
3. 通配降级指定的回调（**一般在服务端发生故障时调用**）





## 11、Hystrix服务熔断



**断路器，相当于保险丝。**



**熔断是机制，降级是手段！**



### 熔断机制概述



熔断机制是应对雪崩效应的一种微服务链路保护机制。当扇出链路的某个微服务出错不可用或者响应时间太长时，会进行服务的降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。**当检测到该节点微服务调用响应正常后，恢复调用链路。**



在Spring Cloud框架里，熔断机制通过Hystrix实现。Hystrix会监控微服务间调用的状况，当失败的调用到一定阈值，缺省是5秒内20次调用失败，就会启动熔断机制。熔断机制的注解是@HystrixCommand。



### Service





[Hutool国产工具类](https://hutool.cn/)

**修改cloud-provider-hystrix-payment8001**



```java
@Service
public class PaymentService {

    ...

    // ===============服务熔断=======================

    @HystrixCommand(fallbackMethod = "paymentCircuitBreaker_fallback", commandProperties = {
            @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),// 是否开启断路器
            @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),// 请求次数
            @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"), // 时间窗口期，打开断路器后尝试恢复的时间，期间拒绝请求
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60"),// 失败率达到多少后跳闸
    })
    public String paymentCircuitBreaker(@PathVariable("id") Integer id) {
        if (id < 0) {
            throw new RuntimeException("******id 不能负数");
        }
        // 糊涂工具包
        String serialNumber = IdUtil.simpleUUID();

        return Thread.currentThread().getName() + "\t" + "调用成功，流水号: " + serialNumber;
    }

    public String paymentCircuitBreaker_fallback(@PathVariable("id") Integer id) {
        return "id 不能负数，请稍后再试，/(ㄒoㄒ)/~~   id: " + id;
    }


}
```





### HystrixCommandProperties



**HystrixCommandProperties配置类**



```java
package com.netflix.hystrix;

...

public abstract class HystrixCommandProperties {
    private static final Logger logger = LoggerFactory.getLogger(HystrixCommandProperties.class);

    /* defaults */
    /* package */ static final Integer default_metricsRollingStatisticalWindow = 10000;// default => statisticalWindow: 10000 = 10 seconds (and default of 10 buckets so each bucket is 1 second)
    private static final Integer default_metricsRollingStatisticalWindowBuckets = 10;// default => statisticalWindowBuckets: 10 = 10 buckets in a 10 second window so each bucket is 1 second
    private static final Integer default_circuitBreakerRequestVolumeThreshold = 20;// default => statisticalWindowVolumeThreshold: 20 requests in 10 seconds must occur before statistics matter
    private static final Integer default_circuitBreakerSleepWindowInMilliseconds = 5000;// default => sleepWindow: 5000 = 5 seconds that we will sleep before trying again after tripping the circuit
    private static final Integer default_circuitBreakerErrorThresholdPercentage = 50;// default => errorThresholdPercentage = 50 = if 50%+ of requests in 10 seconds are failures or latent then we will trip the circuit
    private static final Boolean default_circuitBreakerForceOpen = false;// default => forceCircuitOpen = false (we want to allow traffic)
    /* package */ static final Boolean default_circuitBreakerForceClosed = false;// default => ignoreErrors = false 
    private static final Integer default_executionTimeoutInMilliseconds = 1000; // default => executionTimeoutInMilliseconds: 1000 = 1 second
    private static final Boolean default_executionTimeoutEnabled = true;

    ...
}
```





### Controller





```java
@RestController
@Slf4j
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    ....

    //====服务熔断
    @GetMapping("/payment/circuit/{id}")
    public String paymentCircuitBreaker(@PathVariable("id") Integer id) {
        String result = paymentService.paymentCircuitBreaker(id);
        log.info("****result: " + result);
        return result;
    }
}
```



### 启动测试



自测 cloud-provider-hystrix-payment8001

正确：http://localhost:8001/payment/circuit/1

错误：http://localhost:8001/payment/circuit/-1

**多次错误，再来次正确，但错误得显示**



重点测试 - 多次错误，然后慢慢正确，发现刚开始不满足条件，就算是正确的访问地址也不能进行！



## 12、Hystrix之服务熔断总结





### 熔断类型

- 熔断打开：请求不再进行调用当前服务，内部设置时钟一般为MTTR(平均故障处理时间)，当打开时长达到所设时钟则进入半熔断状态。
- 熔断关闭：熔断关闭不会对服务进行熔断。
- 熔断半开：部分请求根据规则调用当前服务，如果请求成功且符合规则则认为当前服务恢复正常，关闭熔断。





### 断路器在什么情况下开始起作用



**涉及到断路器的三个重要参数：**

- **快照时间窗**：断路器确定是否打开需要统计一些请求和错误数据，而统计的时间范围就是快照时间窗，默认为最近的10秒。
- **请求总数阀值**：在快照时间窗内，必须满足请求总数阀值才有资格熔断。默认为20，意味着在10秒内，如果该hystrix命令的调用次数不足20次,即使所有的请求都超时或其他原因失败，断路器都不会打开。
- **错误百分比阀值**：当请求总数在快照时间窗内超过了阀值，比如发生了30次调用，如果在这30次调用中，有15次发生了超时异常，也就是超过50%的错误百分比，在默认设定50%阀值情况下，这时候就会将断路器打开。





### 断路器开启或者关闭的条件



- 到达以下阀值，断路器将会开启：
  - 当满足一定的阀值的时候（默认10秒内超过20个请求次数)
  - 当失败率达到一定的时候（默认10秒内超过50%的请求失败)
- 当开启的时候，所有请求都不会进行转发
- 一段时间之后（默认是5秒)，这个时候断路器是半开状态，会让其中一个请求进行转发。如果成功，断路器会关闭，若失败，继续开启。



### 断路器打开之后



再有请求调用的时候，将不会调用主逻辑，而是**直接调用降级fallback**。通过断路器，实现了自动地发现错误并将降级逻辑切换为主逻辑，减少响应延迟的效果。



**原来的主逻辑要如何恢复呢？**



对于这一问题，hystrix也为我们实现了自动恢复功能。

当断路器打开，对主逻辑进行熔断之后，hystrix会启动一个休眠时间窗，**在这个时间窗内，降级逻辑是临时的成为主逻辑**。

当休眠时间窗到期，断路器将进入半开状态，释放一次请求到原来的主逻辑上，如果此次请求正常返回，那么断路器将继续闭合，主逻辑恢复，如果这次请求依然有问题，断路器继续进入打开状态，休眠时间窗重新计时。





### 全部配置项



```java
@HystrixCommand(fallbackMethod = "fallbackMethod", 
                groupKey = "strGroupCommand", 
                commandKey = "strCommand", 
                threadPoolKey = "strThreadPool",
                
                commandProperties = {
                    // 设置隔离策略，THREAD 表示线程池 SEMAPHORE：信号池隔离
                    @HystrixProperty(name = "execution.isolation.strategy", value = "THREAD"),
                    // 当隔离策略选择信号池隔离的时候，用来设置信号池的大小（最大并发数）
                    @HystrixProperty(name = "execution.isolation.semaphore.maxConcurrentRequests", value = "10"),
                    // 配置命令执行的超时时间
                    @HystrixProperty(name = "execution.isolation.thread.timeoutinMilliseconds", value = "10"),
                    // 是否启用超时时间
                    @HystrixProperty(name = "execution.timeout.enabled", value = "true"),
                    // 执行超时的时候是否中断
                    @HystrixProperty(name = "execution.isolation.thread.interruptOnTimeout", value = "true"),
                    
                    // 执行被取消的时候是否中断
                    @HystrixProperty(name = "execution.isolation.thread.interruptOnCancel", value = "true"),
                    // 允许回调方法执行的最大并发数
                    @HystrixProperty(name = "fallback.isolation.semaphore.maxConcurrentRequests", value = "10"),
                    // 服务降级是否启用，是否执行回调函数
                    @HystrixProperty(name = "fallback.enabled", value = "true"),
                    // 是否启用断路器
                    @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),
                    // 该属性用来设置在滚动时间窗中，断路器熔断的最小请求数。例如，默认该值为 20 的时候，如果滚动时间窗（默认10秒）内仅收到了19个请求， 即使这19个请求都失败了，断路器也不会打开。
                    @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "20"),
                    
                    // 该属性用来设置在滚动时间窗中，表示在滚动时间窗中，在请求数量超过 circuitBreaker.requestVolumeThreshold 的情况下，如果错误请求数的百分比超过50, 就把断路器设置为 "打开" 状态，否则就设置为 "关闭" 状态。
                    @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"),
                    // 该属性用来设置当断路器打开之后的休眠时间窗。 休眠时间窗结束之后，会将断路器置为 "半开" 状态，尝试熔断的请求命令，如果依然失败就将断路器继续设置为 "打开" 状态，如果成功就设置为 "关闭" 状态。
                    @HystrixProperty(name = "circuitBreaker.sleepWindowinMilliseconds", value = "5000"),
                    // 断路器强制打开
                    @HystrixProperty(name = "circuitBreaker.forceOpen", value = "false"),
                    // 断路器强制关闭
                    @HystrixProperty(name = "circuitBreaker.forceClosed", value = "false"),
                    // 滚动时间窗设置，该时间用于断路器判断健康度时需要收集信息的持续时间
                    @HystrixProperty(name = "metrics.rollingStats.timeinMilliseconds", value = "10000"),
                    
                    // 该属性用来设置滚动时间窗统计指标信息时划分"桶"的数量，断路器在收集指标信息的时候会根据设置的时间窗长度拆分成多个 "桶" 来累计各度量值，每个"桶"记录了一段时间内的采集指标。
                    // 比如 10 秒内拆分成 10 个"桶"收集这样，所以 timeinMilliseconds 必须能被 numBuckets 整除。否则会抛异常
                    @HystrixProperty(name = "metrics.rollingStats.numBuckets", value = "10"),
                    // 该属性用来设置对命令执行的延迟是否使用百分位数来跟踪和计算。如果设置为 false, 那么所有的概要统计都将返回 -1。
                    @HystrixProperty(name = "metrics.rollingPercentile.enabled", value = "false"),
                    // 该属性用来设置百分位统计的滚动窗口的持续时间，单位为毫秒。
                    @HystrixProperty(name = "metrics.rollingPercentile.timeInMilliseconds", value = "60000"),
                    // 该属性用来设置百分位统计滚动窗口中使用 “ 桶 ”的数量。
                    @HystrixProperty(name = "metrics.rollingPercentile.numBuckets", value = "60000"),
                    // 该属性用来设置在执行过程中每个 “桶” 中保留的最大执行次数。如果在滚动时间窗内发生超过该设定值的执行次数，
                    // 就从最初的位置开始重写。例如，将该值设置为100, 滚动窗口为10秒，若在10秒内一个 “桶 ”中发生了500次执行，
                    // 那么该 “桶” 中只保留 最后的100次执行的统计。另外，增加该值的大小将会增加内存量的消耗，并增加排序百分位数所需的计算时间。
                    @HystrixProperty(name = "metrics.rollingPercentile.bucketSize", value = "100"),
                    
                    // 该属性用来设置采集影响断路器状态的健康快照（请求的成功、 错误百分比）的间隔等待时间。
                    @HystrixProperty(name = "metrics.healthSnapshot.intervalinMilliseconds", value = "500"),
                    // 是否开启请求缓存
                    @HystrixProperty(name = "requestCache.enabled", value = "true"),
                    // HystrixCommand的执行和事件是否打印日志到 HystrixRequestLog 中
                    @HystrixProperty(name = "requestLog.enabled", value = "true"),

                },
                threadPoolProperties = {
                    // 该参数用来设置执行命令线程池的核心线程数，该值也就是命令执行的最大并发量
                    @HystrixProperty(name = "coreSize", value = "10"),
                    // 该参数用来设置线程池的最大队列大小。当设置为 -1 时，线程池将使用 SynchronousQueue 实现的队列，否则将使用 LinkedBlockingQueue 实现的队列。
                    @HystrixProperty(name = "maxQueueSize", value = "-1"),
                    // 该参数用来为队列设置拒绝阈值。 通过该参数， 即使队列没有达到最大值也能拒绝请求。
                    // 该参数主要是对 LinkedBlockingQueue 队列的补充,因为 LinkedBlockingQueue 队列不能动态修改它的对象大小，而通过该属性就可以调整拒绝请求的队列大小了。
                    @HystrixProperty(name = "queueSizeRejectionThreshold", value = "5"),
                }
               )
public String doSomething() {
	...
}
```







### 官网图例



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/716a877cea7ef425d243c064a06c029a.png)





### 步骤说明

1. 创建HystrixCommand （用在依赖的服务返回**单个**操作结果的时候）或HystrixObserableCommand（用在依赖的服务返回**多个**操作结果的时候）对象。
2. 命令执行。
3. 其中 HystrixCommand实现了下面前两种执行方式
   1. execute()：**同步执行**，从依赖的服务返回一个单一的结果对象或是在发生错误的时候抛出异常。
   2. queue()：**异步执行**，直接返回一个Future对象，其中包含了服务执行结束时要返回的单一结果对象。
4. 而 HystrixObservableCommand实现了后两种执行方式：
   1. obseve()：返回Observable对象，它代表了操作的多个结果，它是一个Hot Observable （不论“事件源”是否有“订阅者”，都会在创建后对事件进行发布，所以对于Hot Observable的每一个“订阅者”都有可能是从“事件源”的中途开始的，并可能只是看到了整个操作的局部过程）。
   2. toObservable()：同样会返回Observable对象，也代表了操作的多个结果，但它返回的是一个Cold Observable（没有“订间者”的时候并不会发布事件，而是进行等待，直到有“订阅者"之后才发布事件，所以对于Cold Observable 的订阅者，它可以保证从一开始看到整个操作的全部过程）。
5. **若当前命令的请求缓存功能是被启用的**，并且该命令缓存命中，那么缓存的结果会立即以Observable对象的形式返回。
6. **检查断路器是否为打开状态**。如果断路器是打开的，那么Hystrix不会执行命令，而是转接到fallback处理逻辑(**第8步**)；如果断路器是关闭的，检查是否有可用资源来执行命令(**第5步**)。
7. **线程池/请求队列信号量是否占满**。如果命令依赖服务的专有线程地和请求队列，或者信号量（不使用线程的时候）已经被占满，那么Hystrix也不会执行命令，而是转接到fallback处理理辑(**第8步**) 。
8. **Hystrix会根据我们编写的方法来决定采取什么样的方式去请求依赖服务**。
   1. HystrixCommand.run()：返回一个单一的结果，或者抛出异常。
   2. HystrixObservableCommand.construct()：返回一个Observable对象来发射多个结果，或通过onError发送错误通知。
9. Hystix会将“成功”、“失败”、“拒绝”、“超时” 等信息报告给断路器，而断路器会维护一组计数器来统计这些数据。断路器会使用这些统计数据来决定是否要将断路器打开，来对某个依赖服务的请求进行"熔断/短路"。
10. 当**命令执行失败的时候**，Hystix会进入fallback尝试回退处理，我们通常也称波操作为“服务降级”。而能够引起服务降级处理的情况有下面几种：
    1. 第4步∶当前命令处于“熔断/短路”状态，断洛器是打开的时候。
    2. 第5步∶当前命令的钱程池、请求队列或者信号量被占满的时候。
    3. 第6步∶HystrixObsevableCommand.construct()或HytrixCommand.run()抛出异常的时候。
11. **当Hystrix命令执行成功之后**，它会将处理结果直接返回或是以Observable的形式返回。



tips：如果我们没有为命令实现降级逻辑或者在降级处理逻辑中抛出了异常，Hystrix依然会运回一个Obsevable对象，但是它不会发射任结果数惯，而是通过onError方法通知命令立即中断请求，并通过onError方法将引起命令失败的异常发送给调用者。







## 13、Hystrix图形化Dashboard







### 概述

除了隔离依赖服务的调用以外，Hystrix还提供了准实时的调用监控(Hystrix Dashboard)，Hystrix会持续地记录所有通过Hystrix发起的请求的执行信息，并以统计报表和图形的形式展示给用户，包括每秒执行多少请求多少成功，多少失败等。

Netflix通过**hystrix-metrics-event-stream**项目实现了对以上指标的监控。Spring Cloud也提供了Hystrix Dashboard的整合，对监控内容转化成可视化界面。



**新建Module cloud-consumer-hystrix-dashboard9001**



### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-hystrix-dashboard9001</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```







### yml文件



```yaml
server:
  port: 9001
```



### 主启动类



```java
@SpringBootApplication
@EnableHystrixDashboard
public class HystrixDashboardMain9001 {

    public static void main(String[] args) {
        SpringApplication.run(HystrixDashboardMain9001.class, args);
    }
}
```





**所有Provider微服务提供类(8001/8002/8003)都需要监控依赖配置：**



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```



### 启动测试



启动cloud-consumer-hystrix-dashboard9001该微服务

浏览器输入 http://localhost:9001/hystrix



### 监控测试



**修改cloud-provider-hystrix-payment8001**

注意：新版本Hystrix需要在主启动类PaymentHystrixMain8001中指定监控路径



```java
@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker//添加到此处
public class PaymentHystrixMain8001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentHystrixMain8001.class, args);
    }

    /**
     *此配置是为了服务监控而配置，与服务容错本身无关，springcloud升级后的坑
     *ServletRegistrationBean因为springboot的默认路径不是"/hystrix.stream"，
     *只要在自己的项目里配置上下面的servlet就可以了
     *否则，Unable to connect to Command Metric Stream 404
     */
    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }
}
```





- 启动1个eureka
- 启动8001，9001



**观察监控窗口：**

9001监控8001填写监控地址：http://localhost:8001/hystrix.stream 到 http://localhost:9001/hystrix 页面的输入框。

**测试地址：**

http://localhost:8001/payment/circuit/1

http://localhost:8001/payment/circuit/-1

**测试通过：**

先访问正确地址，再访问错误地址，再正确地址，会发现图示断路器都是慢慢放开的。





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/c02404014dfb05992f2d8f495c2fc8ad.png)





**如何看?**

- 7色



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/5e568147c3993b6afdc8c86cf47597c3.png)



- 1圈



实心圆：共有两种含义。它通过颜色的变化代表了实例的健康程度，它的健康度从绿色<黄色<橙色<红色递减。

该实心圆除了颜色的变化之外，它的大小也会根据实例的请求流量发生变化，**流量越大该实心圆就越大**。所以通过该实心圆的展示，就可以在大量的实例中快速的发现故障实例和高压力实例。



- 1线：

曲线：用来记录2分钟内流量的相对变化，可以通过它来观察到流量的上升和下降趋势。





- 整图说明



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/6a90625b58bcc70434c4d3a23185aab5.png)





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/6d7df1b33994e11f0e231dfb3cb9d089.png)









## 14、服务限流



后面的 alibaba 的 Sentinel 再进行说明！





# 六、服务网关



> **Zuul（X）、Zuul2（X）、Gateway**





Zuul开发人员窝里斗，实属明日黄花

重点关注Gateway！



## 1、GateWay是什么





[上一代zuul 1.x官网](https://github.com/Netflix/zuul/wiki)

[Gateway官网](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/)



### 概述

Cloud全家桶中有个很重要的组件就是网关，在1.x版本中都是采用的Zuul网关。

但在2.x版本中，zuul的升级一直跳票，SpringCloud最后自己研发了一个网关替代Zuul，那就是SpringCloud Gateway—句话：gateway是原zuul1.x版的替代。



Gateway是在Spring生态系统之上构建的API网关服务，基于Spring 5，Spring Boot 2和Project Reactor等技术。

Gateway旨在提供一种简单而有效的方式来对API进行路由，以及提供一些强大的过滤器功能，例如:熔断、限流、重试等。

SpringCloud Gateway是Spring Cloud的一个全新项目，基于Spring 5.0+Spring Boot 2.0和Project Reactor等技术开发的网关，它旨在为微服务架构提供—种简单有效的统一的API路由管理方式。

SpringCloud Gateway作为Spring Cloud 生态系统中的网关，目标是替代Zuul，在Spring Cloud 2.0以上版本中，没有对新版本的Zuul 2.0以上最新高性能版本进行集成，仍然还是使用的Zuul 1.x非Reactor模式的老版本。而为了提升网关的性能，**SpringCloud Gateway是基于WebFlux框架实现的，WebFlux框架底层则使用了高性能的Reactor模式通信框架Netty。**

Spring Cloud Gateway的目标提供统一的路由方式且基于 Filter链的方式提供了网关基本的功能，例如:安全，监控/指标，和限流。



### 作用



- 方向代理
- 鉴权
- 流量控制
- 熔断
- 日志监控
- …



### 微服务架构中网关的位置



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/b57373e993833736aae2f1b5a1940c39.png)





## 2、为什么选择Gateway





**有Zuull了怎么又出来Gateway？我们为什么选择Gateway?**

1. netflix不太靠谱，zuul2.0一直跳票，迟迟不发布。
   1. 一方面因为Zuul1.0已经进入了维护阶段，而且Gateway是SpringCloud团队研发的，是亲儿子产品，值得信赖。而且很多功能Zuul都没有用起来,也非常的简单便捷。
   2. Gateway是基于**异步非阻塞模型**上进行开发的，性能方面不需要担心。虽然Netflix早就发布了最新的Zuul 2.x，但Spring Cloud貌似没有整合计划。而且Netflix相关组件都宣布进入维护期；不知前景如何?
   3. 多方面综合考虑Gateway是很理想的网关选择。

2. **SpringCloud Gateway具有如下特性**
   1. 基于Spring Framework 5，Project Reactor和Spring Boot 2.0进行构建；
   2. 动态路由：能够匹配任何请求属性；
   3. 可以对路由指定Predicate (断言)和Filter(过滤器)；
   4. 集成Hystrix的断路器功能；
   5. 集成Spring Cloud 服务发现功能；
   6. 易于编写的Predicate (断言)和Filter (过滤器)；
   7. 请求限流功能；
   8. 支持路径重写。
3. **SpringCloud Gateway与Zuul的区别**
   1. 在SpringCloud Finchley正式版之前，Spring Cloud推荐的网关是Netflix提供的Zuul。
   2. Zuul 1.x，是一个基于阻塞I/O的API Gateway。
   3. **Zuul 1.x基于Servlet 2.5使用阻塞架构**，它不支持任何长连接(如WebSocket)Zuul的设计模式和Nginx较像，每次I/О操作都是从工作线程中选择一个执行，请求线程被阻塞到工作线程完成，但是差别是Nginx用C++实现，Zuul用Java实现，而JVM本身会有第-次加载较慢的情况，使得Zuul的性能相对较差。
   4. Zuul 2.x理念更先进，想基于Netty非阻塞和支持长连接，但SpringCloud目前还没有整合。Zuul .x的性能较Zuul 1.x有较大提升。在性能方面，根据官方提供的基准测试,Spring Cloud Gateway的RPS(每秒请求数)是Zuul的1.6倍。
   5. Spring Cloud Gateway建立在Spring Framework 5、Project Reactor和Spring Boot2之上，使用非阻塞API。
   6. Spring Cloud Gateway还支持WebSocket，并且与Spring紧密集成拥有更好的开发体验







### Zuul1.x模型



Springcloud中所集成的Zuul版本，采用的是Tomcat容器，使用的是传统的Serviet IO处理模型。

Servlet的生命周期？servlet由servlet container进行生命周期管理。

- container启动时构造servlet对象并调用servlet init()进行初始化；
- container运行时接受请求，并**为每个请求分配一个线程**（一般从线程池中获取空闲线程）然后调用service)；
- container关闭时调用servlet destory()销毁servlet。



**上述模式的缺点：**

Servlet是一个简单的网络IO模型，当请求进入Servlet container时，Servlet container就会为其绑定一个线程，在并发不高的场景下这种模型是适用的。但是一旦高并发(如抽风用Jmeter压)，线程数量就会上涨，而线程资源代价是昂贵的（上线文切换，内存消耗大）严重影响请求的处理时间。在一些简单业务场景下，不希望为每个request分配一个线程，只需要1个或几个线程就能应对极大并发的请求，这种业务场景下servlet模型没有优势。

所以Zuul 1.X是基于servlet之上的一个**阻塞式处理模型**，即Spring实现了处理所有request请求的一个servlet (DispatcherServlet)并由该servlet阻塞式处理处理。所以SpringCloud Zuul无法摆脱servlet模型的弊端。



### Gateway模型



**WebFlux是什么？[官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#spring-webflux)**

传统的Web框架，比如说: Struts2，SpringMVC等都是基于Servlet APl与Servlet容器基础之上运行的。

但是在Servlet3.1之后有了**异步非阻塞**的支持。而**WebFlux是一个典型非阻塞异步的框架**，它的核心是基于Reactor的相关API实现的。相对于传统的web框架来说，它可以运行在诸如Netty，Undertow及支持Servlet3.1的容器上。非阻塞式+函数式编程(Spring 5必须让你使用Java 8)。

Spring WebFlux是Spring 5.0 引入的新的响应式框架，区别于Spring MVC，它不需要依赖Servlet APl，它是完全异步非阻塞的，并且基于Reactor来实现响应式流规范。







## 3、Gateway工作流程







### 三大核心概念





- Route(路由) - 路由是构建网关的基本模块,它由ID,目标URI,一系列的断言和过滤器组成,如断言为true则匹配该路由；
- Predicate(断言) - 参考的是Java8的java.util.function.Predicate，开发人员可以匹配HTTP请求中的所有内容(例如请求头或请求参数),如果请求与断言相匹配则进行路由；
- Filter(过滤) - 指的是Spring框架中GatewayFilter的实例,使用过滤器,可以在请求被路由前或者之后对请求进行修改。



web请求，通过一些匹配条件，定位到真正的服务节点。并在这个转发过程的前后，进行一些精细化控制。

predicate就是我们的匹配条件；而fliter，就可以理解为一个无所不能的拦截器。有了这两个元素，再加上目标uri，就可以实现一个具体的路由了。





### Gateway工作流程



- 客户端向Spring Cloud Gateway发出请求。然后在Gateway Handler Mapping 中找到与请求相匹配的路由，将其发送到GatewayWeb Handler。
- Handler再通过指定的过滤器链来将请求发送到我们实际的服务执行业务逻辑，然后返回。
- 过滤器之间用虚线分开是因为过滤器可能会在发送代理请求之前(“pre”)或之后(“post"）执行业务逻辑。
- Filter在“pre”类型的过滤器可以做参数校验、权限校验、流量监控、日志输出、协议转换等，在“post”类型的过滤器中可以做响应内容、响应头的修改，日志的输出，流量监控等有着非常重要的作用。



**核心逻辑：路由转发 + 执行过滤器链。**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/a0ddbb02c8ed47509dcb80c12a0bad0f.png)





## 4、GateWay9527搭建









**新建Module cloud-gateway-gateway9527**





### pom文件

不需要下面两个，引入会报错！

```xml
<!--web-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-gateway-gateway9527</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--gateway-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        <!--eureka-client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--一般基础配置类-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```





### yml文件



**网关如何做路由映射?**

cloud-provider-payment8001看看controller的访问地址

- get
- lb

我们目前不想暴露8001端口，希望在8001外面套一层9527



```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway

  #############################新增网关配置###########################
  cloud:
    gateway:
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          #uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          #uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由
####################################################################

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    service-url:
      register-with-eureka: true
      fetch-registry: true
      defaultZone: http://eureka7001.com:7001/eureka
```



### 主启动类



```java
@SpringBootApplication
@EnableEurekaClient
public class GateWayMain9527 {

    public static void main(String[] args) {
        SpringApplication.run(GateWayMain9527.class, args);
    }
}
```





### 启动测试



- 启动7001
- 启动8001-cloud-provider-payment8001
- 启动9527网关

**访问说明：**

- 添加网关前：http://localhost:8001/payment/get/1
- 添加网关后：http://localhost:9527/payment/get/1
- 两者访问成功，返回相同结果





## 5、GateWay配置路由





### yml配置方式





```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          #uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          #uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由
```





### 配置类方式



> [https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#modifying-the-way-remote-addresses-are-resolved](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#modifying-the-way-remote-addresses-are-resolved)





```java
@Configuration
public class GateWayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder routeLocatorBuilder) {
        RouteLocatorBuilder.Builder routes = routeLocatorBuilder.routes();

        routes.route("path_route_itnxd",
                r -> r.path("/guonei")
                        .uri("http://news.baidu.com/guonei")).build();

        return routes.build();
    }
}
```



**测试：**

浏览器输入http://localhost:9527/guonei，返回http://news.baidu.com/guonei相同的页面。







## 6、GateWay配置动态路由





> 默认情况下Gateway会根据**注册中心**注册的服务列表，以注册中心上**微服务名**为路径创建**动态路由进行转发，从而实现动态路由的功能**（不写死一个地址）。





### 启动

- eureka7001
- payment8001/8002



### pom文件



GateWay9527添加、之前已经添加！



```xml
<!--eureka-client-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```



### yml文件



需要注意的是uri的协议为lb，表示启用Gateway的负载均衡功能。

lb://serviceName是spring cloud gateway在微服务中自动为我们创建的负载均衡uri。

**其实还是用的Ribbon!**



```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway

  #############################新增网关配置###########################
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由
####################################################################

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    service-url:
      register-with-eureka: true
      fetch-registry: true
      defaultZone: http://eureka7001.com:7001/eureka
```







### 启动测试



浏览器输入：http://localhost:9527/payment/lb

结果：不停刷新页面，8001/8002两个端口切换。



## 7、GateWay常用Predicate





### 概述



[官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#gateway-request-predicates-factories)



Spring Cloud Gateway将路由匹配作为Spring WebFlux HandlerMapping基础架构的一部分。

Spring Cloud Gateway包括许多内置的Route Predicate工厂。所有这些Predicate都与HTTP请求的不同属性匹配。多个RoutePredicate工厂可以进行组合。

Spring Cloud Gateway创建Route 对象时，使用RoutePredicateFactory 创建 Predicate对象，Predicate 对象可以赋值给Route。Spring Cloud Gateway包含许多内置的Route Predicate Factories。

所有这些谓词都匹配HTTP请求的不同属性。多种谓词工厂可以组合，并通过逻辑and。



### 常用的Route Predicate Factory



- The **After** Route Predicate Factory
- The **Before** Route Predicate Factory
- The **Between** Route Predicate Factory
- The **Cookie** Route Predicate Factory
- The **Header** Route Predicate Factory
- The **Host** Route Predicate Factory
- The **Method** Route Predicate Factory
- The **Path** Route Predicate Factory
- The **Query** Route Predicate Factory
- The **RemoteAddr** Route Predicate Factory
- The **weight** Route Predicate Factory





### After测试



在指定时间之后才可以路由成功！

Before、Between都类似！



```yaml
spring:
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**
            - After=2021-10-18T18:09:11.438663800+08:00[Asia/Shanghai]
            #- Between=2017-01-20T17:42:47.789-07:00[America/Denver], 2017-01-21T17:42:47.789-07:00[America/Denver]
```





**时间串串获取：**



```java
@Test
void test(){
    ZonedDateTime zbj = ZonedDateTime.now(); // 默认时区
    System.out.println(zbj);

    //2021-10-18T18:09:11.438663800+08:00[Asia/Shanghai]
}
```





### Cookie测试



必须带有该指定的Cookie才会成功！



```yaml
spring:
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
          	- Path=/payment/lb/**
            - After=2021-10-18T18:09:11.438663800+08:00[Asia/Shanghai]
            - Cookie=username,itnxd
```





**测试：**



```shell
# 该命令相当于发get请求，且没带cookie
curl http://localhost:9527/payment/lb

# 带cookie的
curl http://localhost:9527/payment/lb --cookie "username=itnxd"
```



### Header测试



必须带有指定请求头！



```yaml
spring:
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
          	- Path=/payment/lb/**
            - After=2021-10-18T18:09:11.438663800+08:00[Asia/Shanghai]
            - Header=X-Request-Id, \d+
```





**测试：**



```shell
# 带指定请求头的参数的CURL命令
curl http://localhost:9527/payment/lb -H "X-Request-Id:123"
```



### 其他测试



```yaml
predicates:
  -Host=**.itnxd.eu.org
  -Method=GET
  -Query=username, \d+ 3 #请求参数
```







**测试：**



```shell
curl http://localhost:9527/payment/lb -H "Host: itnxd.eu.org"
http://localhost:9527/payment/lb?username=132434
```





**说白了，Predicate就是为了实现一组匹配规则，让请求过来找到对应的Route进行处理。**









## 8、GateWay的Filter



[官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#gatewayfilter-factories)



路由过滤器可用于修改进入的HTTP请求和返回的HTTP响应，路由过滤器只能指定路由进行使用。

Spring Cloud Gateway内置了多种路由过滤器，他们都由GatewayFilter的工厂类来产生。





### 生命周期



- pre
- post



### 种类



[详细请查看官方文档!](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#gatewayfilter-factories)

- GatewayFilter - 有31种
- GlobalFilter - 有10种
- 常用的GatewayFilter：AddRequestParameter GatewayFilter



### 自定义全局GlobalFilter


**能干什么：**

- 全局日志记录
- 统一网关鉴权
- ...



```java
@Component
@Slf4j
public class MyLogGateWayFilter implements GlobalFilter, Ordered {


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("***********come in MyLogGateWayFilter:  " + new Date());

        String uname = exchange.getRequest().getQueryParams().getFirst("uname");

        if (uname == null) {
            log.info("*******用户名为null，非法用户，o(╥﹏╥)o");
            exchange.getResponse().setStatusCode(HttpStatus.NOT_ACCEPTABLE);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    // 数字越小优先级越高
    @Override
    public int getOrder() {
        return 0;
    }
}

```





### 启动测试



**启动：**

- EurekaMain7001
- PaymentMain8001
- GateWayMain9527
- PaymentMain8002



浏览器输入：

- http://localhost:9527/payment/lb：无法访问
- http://localhost:9527/payment/lb?uname=abc：正常访问









# 七、服务配置





> **Config（X）、Nacos**





## 1、概述



> https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/





### 分布式系统面临的配置问题

微服务意味着要将单体应用中的业务拆分成一个个子服务，每个服务的粒度相对较小，因此系统中会出现大量的服务。由于每个服务都需要必要的配置信息才能运行，所以一套集中式的、动态的配置管理设施是必不可少的。

SpringCloud提供了ConfigServer来解决这个问题，我们每一个微服务自己带着一个application.yml，上百个配置文件的管理.……



### 是什么



SpringCloud Config为微服务架构中的微服务提供集中化的外部配置支持，配置服务器为各个不同微服务应用的所有环境提供了一个中心化的外部配置。

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/b29048b8a332bc91f31b3558d198fa11.png)



### 怎么玩

SpringCloud Config分为**服务端和客户端**两部分。

- 服务端也称为分布式配置中心，它是一个独立的微服务应用，用来连接配置服务器并为客户端提供获取配置信息，加密/解密信息等访问接口。

- 客户端则是通过指定的配置中心来管理应用资源，以及与业务相关的配置内容，并在启动的时候从配置中心获取和加载配置信息配置服务器默认采用git来存储配置信息，这样就有助于对环境配置进行版本管理，并且可以通过git客户端工具来方便的管理和访问配置内容。



### 能干嘛



- 集中管理配置文件
- 不同环境不同配置，动态化的配置更新，分环境部署比如dev/test/prod/beta/release
- 运行期间动态调整配置，不再需要在每个服务部署的机器上编写配置文件，服务会向配置中心统一拉取配置自己的信息
- 当配置发生变动时，服务不需要重启即可感知到配置的变化并应用新的配置
- 将配置信息以REST接口的形式暴露 - post/crul访问刷新即可…





### 与GitHub整合配置



由于SpringCloud Config默认使用Git来存储配置文件(也有其它方式,比如支持SVN和本地文件)，但最推荐的还是Git，而且使用的是http/https访问的形式。











## 2、Config服务端配置





### 准备Github仓库



- 用你自己的账号在GitHub上新建一个名为springcloud-config的新Repository。
- 由上一步获得刚新建的git地址 - git@github.com:abc/springcloud-config.git。
- `git clone git@github.com:abc/springcloud-config.git`
- 在springcloud-config的文件夹种创建三个配置文件
- 随后`git add . 、git commit -m "xxx"、git push` 等一系列上传操作上传到springcloud-config的新Repository。





**三个配置文件内容：**



```yaml
# config-dev.yml
config:
  info: "master branch,springcloud-config/config-dev.yml version=7"

# config-prod.yml
config:
  info: "master branch,springcloud-config/config-prod.yml version=1"
  
# config-test.yml
config:
  info: "master branch,springcloud-config/config-test.yml version=1" 
```





**新建Module cloud-config-center-3344**





### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-config-center-3344</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



### yml文件



```yaml
server:
  port: 3344

spring:
  application:
    name:  cloud-config-center #注册进Eureka服务器的微服务名
  cloud:
    config:
      server:
        git:
          uri: git@github.com:xxx/springcloud-config.git #GitHub上面的git仓库名字
          ####搜索目录
          search-paths:
            - springcloud-config
      ####读取分支
      label: master

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka
```



### 主启动类



```java
@SpringBootApplication
@EnableConfigServer
public class ConfigCenterMain3344 {

    public static void main(String[] args) {
        SpringApplication.run(ConfigCenterMain3344.class, args);
    }
}
```





### 启动测试



测试通过Config微服务是否可以从GitHub上获取配置内容

- 启动ConfigCenterMain3344
- 浏览器防问：http://config-3344.com:3344/master/config-dev.yml
- 页面返回结果：返回该配置文件内容





### 配置读取规则



[官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/#_quick_start)

- **/{label}/{application}-{profile}.yml（推荐）**
  - http://localhost:3344/master/config-dev.yml
  - http://localhost.com:3344/master/config-test.yml
  - http://localhost:3344/master/config-prod.yml
- /{application}-{profile}.yml
  - http://config-3344.com:3344/config-dev.yml
  - http://config-3344.com:3344/config-test.yml
  - http://config-3344.com:3344/config-prod.yml
  - http://config-3344.com:3344/config-xxxx.yml (不存在的配置)

- /{application}/{profile}[/{label}]
  - http://config-3344.com:3344/config/dev/master
  - http://config-3344.com:3344/config/test/master
  - http://config-3344.com:3344/config/test/dev



**重要配置细节总结**

- /{name}-{profiles}.yml
- /{label}-{name}-{profiles}.yml
- label：分支(branch)
- name：服务名
- profiles：环境(dev/test/prod)
- 成功实现了用SpringCloud Config通过GitHub获取配置信息









## 3、Config客户端配置





**新建Module cloud-config-client-3355**



### pom文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-config-client-3355</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```





### yml文件



**bootstrap.yml**

- applicaiton.yml是**用户级**的资源配置项
- bootstrap.yml**是系统级的，优先级更加高**

Spring Cloud会创建一个Bootstrap Context，作为Spring应用的Application Context的父上下文。

初始化的时候，BootstrapContext负责从外部源加载配置属性并解析配置。这两个上下文共享一个从外部获取的Environment。

Bootstrap属性有高优先级，默认情况下，**它们不会被本地配置覆盖**。Bootstrap context和Application Context有着不同的约定，所以新增了一个bootstrap.yml文件，保证Bootstrap Context和Application Context配置的分离。

要将Client模块下的application.yml文件改为bootstrap.yml,这是很关键的，因为bootstrap.yml是比application.yml先加载的。bootstrap.yml优先级高于application.yml。



```yaml
server:
  port: 3355

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: master #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://localhost:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址


#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka
```



### Controller





```java
@RestController
public class ConfigClientController {

    // 从配置中心读取配置，远程github读取
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo() {
        return configInfo;
    }
}
```



### 主启动类



```java
@SpringBootApplication
@EnableEurekaClient
public class ConfigClientMain3355 {

    public static void main(String[] args) {
        SpringApplication.run(ConfigClientMain3355.class, args);
    }
}
```



### 启动测试






启动3355作为Client准备访问：http://localhost:3355/configlnfo



**成功实现了客户端3355访问SpringCloud Config3344通过GitHub获取配置信息可题随时而来**



### 分布式配置的动态刷新问题



- Linux运维修改GitHub上的配置文件内容做调整
- 刷新3344，发现ConfigServer配置中心立刻响应
- 刷新3355，发现ConfigClient客户端没有任何响应
- 3355没有变化除非自己重启或者重新加载
- 难到每次运维修改配置文件，客户端都需要重启??噩梦









## 4、Config客户端动态刷新





**避免每次更新配置都要重启客户端微服务3355**



修改3355模块

### POM引入actuator监控



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```









### 修改YML



**添加暴露监控端口配置**



```yaml
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```



### Controller修改



添加@RefreshScope注解！

```java
@RestController
@RefreshScope // 添加
public class ConfigClientController {

    // 从配置中心读取配置，远程github读取
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo() {
        return configInfo;
    }
}
```



### 启动测试



此时修改github配置文件内容 -> 访问3344 -> 访问3355

http://localhost:3355/configInfo

3355改变没有??? **没有**，还需一步！



**需要运维人员发送Post请求刷新3355！**



```shell
curl -X POST "http://localhost:3355/actuator/refresh"
```



**再次测试：**

http://localhost:3355/configInfo



**成功实现了客户端3355刷新到最新配置内容，避免了服务重启**



**想想还有什么问题?**

- 假如有多个微服务客户端3355/3366/3377
- 每个微服务都要执行—次post请求，手动刷新?
- 可否广播，一次通知，处处生效?
- 我们想大范围的自动刷新，求方法！







# 八、消息总线

> Bus（X）、Nacos



## 1、概述



上—讲解的加深和扩充

一言以蔽之，**分布式自动刷新配置功能。**

Spring Cloud Bus配合Spring Cloud Config使用可以实现配置的动态刷新。



### 是什么

Spring Cloud Bus 配合Spring Cloud Config 使用可以实现配置的动态刷新。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/a92fcd5f1d1b60208a5042abd1a3cae1.png)



Spring Cloud Bus是用来将分布式系统的节点与轻量级消息系统链接起来的框架，它整合了Java的事件处理机制和消息中间件的功能。Spring Clud Bus目前支持RabbitMQ和Kafka。

### 能干嘛

Spring Cloud Bus能管理和传播分布式系统间的消息，就像一个分布式执行器，可用于广播状态更改、事件推送等，也可以当作微服务间的通信通道。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/7252d84ed08777672dc7b3234a001549.png)



### 为何被称为总线



**什么是总线：**

在微服务架构的系统中，通常会使用轻量级的消息代理来构建一个共用的消息主题，并让系统中所有微服务实例都连接上来。由于该主题中产生的消息会被所有实例监听和消费，所以称它为消息总线。在总线上的各个实例，都可以方便地广播一些需要让其他连接在该主题上的实例都知道的消息。

**基本原理：**

ConfigClient实例都监听MQ中同一个topic(默认是Spring Cloud Bus)。当一个服务刷新数据的时候，它会把这个信息放入到Topic中，这样其它监听同一Topic的服务就能得到通知，然后去更新自身的配置。





## 2、RabitMQ环境配置



RabbitMQ安装及配置：[https://itnxd.eu.org/posts/49375.html#4%E3%80%81RabbitMQ-%E5%AE%89%E8%A3%85](https://itnxd.eu.org/posts/49375.html#4%E3%80%81RabbitMQ-%E5%AE%89%E8%A3%85)



**开启Web界面管理：**

```shell
rabbitmq-plugins enable rabbitmq _management
```



访问地址：ip:15672



## 3、动态刷新全局广播





### 设计思想



**1、利用消息总线触发一个客户端/bus/refresh,而刷新所有客户端的配置**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/b5675feebb7c07d035731ab561b7e1d3.png)











**2、利用消息总线触发一个服务端ConfigServer的/bus/refresh端点，而刷新所有客户端的配置**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/18/8bd851bc4ced4a595a8bfc65a6bf6ec1.png)







**图二的架构显然更加适合，图—不适合的原因如下：**

- 打破了微服务的职责单一性，因为微服务本身是业务模块，它本不应该承担配置刷新的职责。
- 破坏了微服务各节点的对等性。
- 有一定的局限性。例如，微服务在迁移时，它的网络地址常常会发生变化，此时如果想要做到自动刷新，那就会增加更多的修改
  









### Config3344修改



**给cloud-config-center-3344配置中心服务端添加消息总线支持**





**pom添加消息总线RabbitNQ支持：**



```xml
<!--添加消息总线RabbitNQ支持-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
<dependency>
	<groupId>org-springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```







**yml添加rabbitmq相关配置并暴露刷新端点bus-refresh：**



```yaml
server:
  port: 3344

spring:
  application:
    name:  cloud-config-center #注册进Eureka服务器的微服务名
  cloud:
    config:
      server:
        git:
          uri: git@github.com:niuxvdong/springcloud-config.git #GitHub上面的git仓库名字
          ####搜索目录
          search-paths:
            - springcloud-config
      ####读取分支
      label: master

  #rabbitmq相关配置<--------------------------
  rabbitmq:
    host: localhost
    port: 5672
    username: admin
    password: xxxx

##rabbitmq相关配置,暴露bus刷新配置的端点<--------------------------
management:
  endpoints: #暴露bus刷新配置的端点
    web:
      exposure:
        include: 'bus-refresh'

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka
```





### Config3355/3366修改



**pom添加消息总线RabbitNQ支持：**



```xml
<!--添加消息总线RabbitNQ支持-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
<dependency>
	<groupId>org-springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```





**yml添加rabbitmq相关配置：**



```yaml
server:
  port: 3355/3366

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: master #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://localhost:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址

  #rabbitmq相关配置 15672是Web管理界面的端口；5672是MQ访问的端口<----------------------
  rabbitmq:
    host: localhost
    port: 5672
    username: admin
    password: xxx
#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```



### 启动测试





**启动：**

- EurekaMain7001
- ConfigcenterMain3344
- ConfigclientMain3355
- ConfigclicntMain3366



运维工程师修改Github上配置文件内容，增加版本号：

发送POST请求 `curl -X POST "http://localhost:3344/actuator/bus-refresh"`

**—次发送，处处生效！**



**配置中心**：http://config-3344.com:3344/config-dev.yml

**客户端：**

- http://localhost:3355/configlnfo
- http://localhost:3366/configInfo



**获取配置信息，发现都已经刷新了，—次修改，广播通知，处处生效！**



RabbitMQ后台多了一个 springCloudBus交换机 和 三个队列！





## 4、动态刷新定点通知





**不想全部通知，只想定点通知**

- 只通知3355
- 不通知3366

简单一句话 - 指定具体某一个实例生效而不是全部

公式：`http://localhost:配置中心端口号server端/actuator/bus-refresh/{destination}`

/bus/refresh请求不再发送到具体的服务实例上，而是发给config server通过destination参数类指定需要更新配置的服务或实例！

多个通知用&符号连接即可！



**案例：**

我们这里以刷新运行在3355端口上的config-client（配置文件中设定的应用名称）为例，只通知3355，不通知3366

`curl -X POST "http://localhost:3344/actuator/bus-refresh/config-client:3355`



**destination：**

就是微服务名称+端口号

```yaml
server:
  port: 3355

spring:
  application:
    name: config-client
```





**小总结：**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/3184daab29451e384322177d5ec8892f.png)









# 九、消息驱动



> **SpringCloud Stream**





## 1、消息驱动概述





### Stream为什么被引入





**常见MQ(消息中间件)：**

- ActiveMQ
- RabbitMQ
- RocketMQ
- Kafka



有没有一种新的技术诞生，让我们不再关注具体MQ的细节，我们只需要用一种适配绑定的方式，自动的给我们在各种MQ内切换。



### Stream是什么

屏蔽底层消息中间件的差异，降低切换成本，统一消息的编程模型。

**什么是Spring Cloud Stream？**

官方定义Spring Cloud Stream是一个**构建消息驱动微服务的框架**。

- 应用程序通过inputs或者 outputs 来与Spring Cloud Stream中**binder对象**交互。
- 通过我们配置来binding(绑定)，而Spring Cloud Stream 的binder对象负责与消息中间件交互。所以，我们只需要搞清楚如何与Spring Cloud Stream交互就可以方便使用消息驱动的方式。
- 通过使用Spring Integration来连接消息代理中间件以实现消息事件驱动。
- Spring Cloud Stream为一些供应商的消息中间件产品提供了个性化的自动化配置实现，引用了**发布-订阅、消费组、分区**的三个核心概念。

**目前仅支持RabbitMQ、 Kafka。**



### 官网手册





[官方文档1](https://spring.io/projects/spring-cloud-stream#overview)

[官方文档2](https://cloud.spring.io/spring-tloud-static/spring-cloud-stream/3.0.1.RELEASE/reference/html/Spring)

[Cloud Stream中文指导手册](https://m.wang1314.com/doc/webapp/topic/20971999.html)







## 2、Stream的设计思想





### 标准MQ





- 生产者/消费者之间靠消息媒介传递信息内容
- 消息必须走特定的通道 - 消息通道 Message Channel
- 消息通道里的消息如何被消费呢，谁负责收发处理 - 消息通道MessageChannel的子接口SubscribableChannel，由MessageHandler消息处理器所订阅。
  



### 为什么用Cloud Stream



比方说我们用到了RabbitMQ和Kafka，由于这两个消息中间件的架构上的不同，像RabbitMQ有exchange，kafka有Topic和Partitions分区。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/b07e9e8ec886c3260d1bfd1bc7e4dd73.png)











这些中间件的差异性导致我们实际项目开发给我们造成了一定的困扰，我们如果用了两个消息队列的其中一种，后面的业务需求，我想往另外一种消息队列进行迁移，这时候无疑就是一个灾难性的，一大堆东西都要重新推倒重新做，因为它跟我们的系统耦合了，这时候**Spring Cloud Stream给我们提供了—种解耦合的方式。**



### Stream凭什么能统一底层差异

在没有绑定器这个概念的情况下，我们的SpringBoot应用要直接与消息中间件进行信息交互的时候，由于各消息中间件构建的初衷不同，它们的实现细节上会有较大的差异性通过定义绑定器作为中间层，完美地实现了应用程序与消息中间件细节之间的隔离。通过向应用程序暴露统一的Channel通道，使得应用程序不需要再考虑各种不同的消息中间件实现。

**通过定义绑定器Binder作为中间层，实现了应用程序与消息中间件细节之间的隔离。**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/2e4ad9b31e8d007bab74dd6f97da5b37.png)







**Stream中的消息通信方式遵循了发布-订阅模式**

Topic主题进行广播

- 在RabbitMQ就是Exchange
- 在Kakfa中就是Topic





## 3、Cloud Stream标准流程





### 三大概念





- Binder - 很方便的连接中间件，屏蔽差异。
- Channel - 通道，是队列Queue的一种抽象，在消息通讯系统中就是实现存储和转发的媒介，通过Channel对队列进行配置。
- Source和Sink - 简单的可理解为参照对象是Spring Cloud Stream自身，从Stream发布消息就是输出，接受消息就是输入。







![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/898c4cea615c60b152eb3ce1eb29c481.png)





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/ef69bc0c387648038187cbb46f1c0ade.png)









### 编码API和常用注解

| 组成            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| Middleware      | 中间件，目前只支持RabbitMQ和Kafka                            |
| Binder          | Binder是应用与消息中间件之间的封装，目前实行了Kafka和RabbitMQ的Binder，通过Binder可以很方便的连接中间件，可以动态的改变消息类型(对应于Kafka的topic,RabbitMQ的exchange)，这些都可以通过配置文件来实现 |
| @Input          | 注解标识输入通道，通过该输乎通道接收到的消息进入应用程序     |
| @Output         | 注解标识输出通道，发布的消息将通过该通道离开应用程序         |
| @StreamListener | 监听队列，用于消费者的队列的消息接收                         |
| @EnableBinding  | 指信道channel和exchange绑定在一起                            |



### 案例说明

准备RabbitMQ环境（79_Bus之RabbitMQ环境配置有提及）

工程中新建三个子模块：

- cloud-stream-rabbitmq-provider8801，作为生产者进行发消息模块
- cloud-stream-rabbitmq-consumer8802，作为消息接收模块
- cloud-stream-rabbitmq-consumer8803，作为消息接收模块



## 4、消息驱动之生产者



**新建Module：cloud-stream-rabbitmq-provider8801**



### pom文件







```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-stream-rabbitmq-provider8801</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!--stream处理rabbit-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>
        <!--基础配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```





### yml文件



```yaml
server:
  port: 8801

spring:
  application:
    name: cloud-stream-provider
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: localhost
                port: 5672
                username: admin
                password: xxx
      bindings: # 服务的整合处理
        output: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置


eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://localhost:7001/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: send-8801.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址
```



### 主启动类



```java
@SpringBootApplication
public class StreamMQMain8801 {
    public static void main(String[] args) {
        SpringApplication.run(StreamMQMain8801.class,args);
    }
}
```



### Service

```java
public interface IMessageProvider {
    public String send();
}

@EnableBinding(Source.class) //定义消息的推送管道
public class MessageProviderImpl implements IMessageProvider {
    @Resource
    private MessageChannel output; // 消息发送管道

    @Override
    public String send() {
        String serial = UUID.randomUUID().toString();
        output.send(MessageBuilder.withPayload(serial).build());
        System.out.println("*****serial: " + serial);
        return null;
    }
}
```

### Controller



```java
@RestController
public class SendMessageController {

    @Resource
    private IMessageProvider messageProvider;

    @GetMapping(value = "/sendMessage")
    public String sendMessage() {
        return messageProvider.send();
    }
}
```







### 启动测试



- 启动 7001eureka
- 启动 8801
- 访问 - http://localhost:8801/sendMessage
- 后台将打印serial: UUID字符串





## 5、消息驱动值消费者



**新建Module：cloud-stream-rabbitmq-consumer8802**



### pom文件







### yml文件

```yaml
server:
  port: 8802

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: localhost
                port: 5672
                username: admin
                password: xxx
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为对象json，如果是文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://localhost:7001/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8802.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址
```



### 主启动类



```java
@SpringBootApplication
public class StreamMQMain8802 {
    public static void main(String[] args) {
        SpringApplication.run(StreamMQMain8802.class, args);
    }
}
```



### Controller



```java
@Component
@EnableBinding(Sink.class)
public class ReceiveMessageListenerController {

    @Value("${server.port}")
    private String serverPort;

    @StreamListener(Sink.INPUT) // 消息监听
    public void input(Message<String> message) {
        System.out.println("消费者1号,----->接受到的消息: " + message.getPayload() + "\t  port: " + serverPort);
    }
}
```

### 启动测试



- 启动EurekaMain7001
- 启动StreamMQMain8801
- 启动StreamMQMain8802
- 8801发送8802接收消息









## 6、分组消费与持久化





**依照8802，克隆出来一份运行8803 - cloud-stream-rabbitmq-consumer8803。**





### 重复消费问题



**启动**

- RabbitMQ
- 服务注册 - 8801
- 消息生产 - 8801
- 消息消费 - 8802
- 消息消费 - 8802

**运行后有两个问题**

1. 有重复消费问题
2. 消息持久化问题



**消费**

- http://localhost:8801/sendMessage
- 目前是8802/8803同时都收到了，存在**重复消费**问题
- 如何解决：分组和持久化属性group（重要）





**生产实际案例**

比如在如下场景中，订单系统我们做集群部署，都会从RabbitMQ中获取订单信息，那如果一个订单同时被两个服务获取到，那么就会造成数据错误，我们得避免这种情况。这时我们就可以**使用Stream中的消息分组来解决**。



注意在Stream中处于同一个group中的多个消费者是竞争关系，就能够保证消息只会被其中一个应用消费一次。不同组是可以全面消费的(重复消费)。





**解释：**

Stream默认创建的是RabbitMQ的Topic主题交换机，该交换机会绑定两个消费者队列（组），默认路由key都是`#`，因此这时候的主题交换机就相当于成了扇出交换机，只要有消息是会直接扇出到全部消费者队列！

我们可以通过Stream分组，即将两个消费者放到同一个队列（组），同一个队列（组）内的消费者就是竞争关系，只会有一个人获得，只会消费一次！





### 分组解决



**yml增加配置**



8803/8803增加配置，配置为同一个组，即现在变成了RabbitMQ概念中的一个队列了！



```yaml
bindings: # 服务的整合处理
  input: # 这个名字是一个通道的名称
    destination: studyExchange # 表示要使用的Exchange名称定义
    content-type: application/json # 设置消息类型，本次为对象json，如果是文本则设置“text/plain”
    binder: defaultRabbit # 设置要绑定的消息服务的具体设置
    group: A_Group
```



同一个组的多个微服务实例，每次只会有一个拿到！











### 消息持久化





通过上述，解决了重复消费问题，再看看持久化。

停止8802/8803并去除掉8802的分组group: A_Group，8803的分组group: A_Group没有去掉。

8801先发送4条消息到RabbitMq。

先启动8802，无分组属性配置，后台没有打出来消息。

再启动8803，有分组属性配置，后台打出来了MQ上的消息。(消息持久化体现)



原理：其实就是发送到了A_Group的队列，由于8802不在该队列了，因此无法收到，全部由8803消费，这似乎也没有设计到消息的持久化。。。



或许是不配置组名，由于是动态生成的队列名（组名），将不会生成和原来一样的名字，导致无法收到原来组的消息！









# 十、分布式请求链路跟踪



> **SpringCloud Sleuth**







## 1、Sleuth是什么



**为什么会出现这个技术？要解决哪些问题？**

在微服务框架中，一个由客户端发起的请求在后端系统中会经过多个不同的的服务节点调用来协同产生最后的请求结果，每一个前段请求都会形成一条复杂的分布式服务调用链路，链路中的任何一环出现高延时或错误都会引起整个请求最后的失败。





**是什么**

- https://github.com/spring-cloud/spring-cloud-sleuth
- Spring Cloud **Sleuth**提供了一套完整的服务跟踪的解决方案
- 在分布式系统中提供追踪解决方案并且兼容支持了**zipkin**
- Sleuth负责收集整理，Zipkin负责展现！



## 2、Sleuth之zipkin搭建安装



SpringCloud从F版起已不需要自己构建Zipkin Server了，只需调用jar包即可



Zipkin下载地址：[https://repo1.maven.org/maven2/io/zipkin/zipkin-server/](https://repo1.maven.org/maven2/io/zipkin/zipkin-server/)



```shell
java -jar zipkin-server-2.34.4-exec.jar
```





访问地址：http://localhost:9411/zipkin/



**术语**

完整的调用链路

表示一请求链路，一条链路通过Trace ld唯一标识，Span标识发起的请求信息，各span通过parent id关联起来



—条链路通过Trace ld唯一标识，Span标识发起的请求信息，各span通过parent id关联起来。



**名词解释**

- Trace：类似于树结构的Span集合，表示一条调用链路，存在唯一标识
- span：表示调用链路来源，通俗的理解span就是一次请求信息





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/2070ddb1cbed53469e9bb476362074b2.png)







## 3、Sleuth链路监控



在一下三个模块实现：

- cloud-provider-payment8001
- cloud-eureka-server7001
- cloud-consumer-order80



### cloud-provider-payment8001

**pom引入zipkin**



```xml
<!--包含了sleuth+zipkin-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```





**yml配置**

```yaml
spring:
  zipkin: #<-------------------------------------关键
    base-url: http://localhost:9411
    sleuth: #<-------------------------------------关键
      sampler:
      #采样率值介于 0 到 1 之间，1 则表示全部采集
      probability: 1
```



**controller**

```java
@GetMapping("/payment/zipkin")
public String paymentZipkin() {
    return "hi ,i'am paymentzipkin server fall back，welcome to here, O(∩_∩)O哈哈~";
}
```





### cloud-consumer-order80





**pom引入zipkin**



```xml
<!--包含了sleuth+zipkin-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```



**yml配置**



```yaml
spring:
  application:
    name: cloud-order-service
  zipkin:
    base-url: http://localhost:9411
    sleuth:
      sampler:
        probability: 1
```



**controller**



```java
@GetMapping("/consumer/payment/zipkin")
public String paymentZipkin() {
    return restTemplate.getForObject("http://localhost:8001" + "/payment/zipkin/", String.class);
}
```



### 启动测试



依次启动eureka7001/8001/80 - 80调用8001几次测试下

打开浏览器访问: http://localhost:9411 会显示调用链路信息等等！







# 十一、SpringCloud Alibaba 简介













## 1、为什么会出现SpringCloud alibaba



Spring Cloud Netflix项目进入维护模式

https://spring.io/blog/2018/12/12/spring-cloud-greenwich-rc1-available-now

什么是维护模式？

将模块置于维护模式，意味着Spring Cloud团队将不会再向模块添加新功能。

他们将修复block级别的 bug 以及安全问题，他们也会考虑并审查社区的小型pull request。





## 2、是什么



[官网](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)



Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里微服务解决方案，通过阿里中间件来迅速搭建分布式应用系统。

诞生：2018.10.31，Spring Cloud Alibaba 正式入驻了Spring Cloud官方孵化器，并在Maven 中央库发布了第一个版本。





## 3、能干嘛



- **服务限流降级**：默认支持 WebServlet、WebFlux、OpenFeign、RestTemplate、Spring Cloud Gateway、Zuul、Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。
- **服务注册与发现**：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。
- **分布式配置管理**：支持分布式系统中的外部化配置，配置更改时自动刷新。
- **消息驱动能力**：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。
- **分布式事务**：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。
- **阿里云对象存储**：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。
- **分布式任务调度**：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。
- **阿里云短信服务**：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。





## 4、去哪下





如果需要使用已发布的版本，在 `dependencyManagement` 中添加如下配置。

然后在 `dependencies` 中添加自己所需使用的依赖即可使用。



```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.5.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```





## 5、怎么玩



- **[Sentinel](https://github.com/alibaba/Sentinel)**：把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。
- **[Nacos](https://github.com/alibaba/Nacos)**：一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
- **[RocketMQ](https://rocketmq.apache.org/)**：一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。
- **[Dubbo](https://github.com/apache/dubbo)**：Apache Dubbo™ 是一款高性能 Java RPC 框架。
- **[Seata](https://github.com/seata/seata)**：阿里巴巴开源产品，一个易于使用的高性能微服务分布式事务解决方案。
- **[Alibaba Cloud OSS](https://www.aliyun.com/product/oss)**: 阿里云对象存储服务（Object Storage Service，简称 OSS），是阿里云提供的海量、安全、低成本、高可靠的云存储服务。您可以在任何应用、任何时间、任何地点存储和访问任意类型的数据。
- **[Alibaba Cloud SchedulerX](https://help.aliyun.com/document_detail/43136.html)**: 阿里中间件团队开发的一款分布式任务调度产品，提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。
- **[Alibaba Cloud SMS](https://www.aliyun.com/product/sms)**: 覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。





## 6、官网资料





官网：https://spring.io/projects/spring-cloud-alibaba#overview
英文：

- https://github.com/alibaba/spring-cloud-alibaba
- https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html

中文：https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md




# 十二、Cloud Alibaba Nacos





## 1、Nacos简介



### 为什么叫Nacos



前四个字母分别为Naming和Configuration的前两个字母，最后的s为Service。



### 是什么



一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

- Nacos: Dynamic Naming and Configuration Service
- Nacos就是**注册中心＋配置中心**的组合 -> Nacos = Eureka+Config+Bus



### 能干嘛



- 替代Eureka做服务注册中心
- 替代Config做服务配置中心



### 去哪下



- https://github.com/alibaba/nacos/releases

- [https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring cloud alibaba nacos_discovery](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring cloud alibaba nacos_discovery)







### 配置中心比对



据说Nacos在阿里巴巴内部有超过10万的实例运行，已经过了类似双十一等各种大型流量的考验。



| 服务注册与发现框架 | CAP模型 | 控制台管理 | 社区活跃度      |
| ------------------ | ------- | ---------- | --------------- |
| Eureka             | AP      | 支持       | 低(2.x版本闭源) |
| Zookeeper          | CP      | 不支持     | 中              |
| consul             | CP      | 支持       | 高              |
| Nacos              | AP      | 支持       | 高              |







## 2、安装并运行Nacos



Java8+Maven环境！



```shell
# 安装Maven
wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.8.3/binaries/apache-maven-3.8.3-bin.tar.gz
tar -xvf apache-maven-3.8.3-bin.tar.gz
mv apache-maven-3.8.3 maven-3.8.3
cp -r  maven-3.8.3/ /usr/local/
vim /etc/profile
# 添加 export PATH=$PATH:/usr/local/maven-3.8.3/bin
# 验证
mvn -v

# 安装nacos 添加代理网站加速下载
wget https://ghproxy.com/https://github.com/alibaba/nacos/releases/download/2.0.3/nacos-server-2.0.3.tar.gz
# 解压
tar -xvf nacos-server-2.0.3.tar.gz
# 启动 启动命令(standalone代表着单机模式运行，非集群模式):
cd nacos/bin
sh startup.sh -m standalone
```



**访问地址：ip:8848**

**默认用户名密码都是nacos**





## 3、服务注册中心





### Nacos服务提供者注册



[官方文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_nacos_discovery)

[最新版官网文档](https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html)



#### pom文件



**父pom**



```xml
<dependencyManagement>
    <dependencies>
        <!--spring cloud alibaba 2.1.0.RELEASE-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.1.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```





**本pom**



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-provider-payment9001</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```





#### yml文件



```yaml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```





#### 主启动类



```java
@EnableDiscoveryClient
@SpringBootApplication
public class PaymentMain9001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain9001.class, args);
    }
}
```



#### Controller



```java
@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id) {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }
}
```





#### 启动测试



- http://localhost:9001/payment/nacos/1
- nacos控制台
- nacos服务注册中心+服务提供者9001都OK了



**为了下一章节演示nacos的负载均衡，参照9001新建9002**

- 新建cloudalibaba-provider-payment9002
- 9002其它步骤你懂的
- 或者**取巧**不想新建重复体力劳动，可以利用IDEA功能，直接拷贝虚拟端口映射



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/6f5b03f556f0f1836326b9ba613871e3.png)





### Nacos服务消费者注册

**新建Module cloudalibaba-consumer-nacos-order83**

#### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-consumer-nacos-order83</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



#### yml文件



```yaml
server:
  port: 83

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: losthost:8848

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider
```

#### 主启动类



```java
@EnableDiscoveryClient
@SpringBootApplication
public class OrderNacosMain83 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosMain83.class, args);
    }
}
```





#### 配置类

```java
@Configuration
public class ApplicationContextConfig {
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```



#### Controller

```java
@RestController
@Slf4j
public class OrderNacosController {

    @Resource
    private RestTemplate restTemplate;

    // 从yml读取服务提供者地址
    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping(value = "/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Long id) {
        return restTemplate.getForObject(serverURL + "/payment/nacos/" + id,
                String.class);
    }

}
```



#### 启动测试



- 启动nacos控制台
- http://localhost:83/Eonsumer/payment/nacos/13
- 83访问9001/9002，轮询负载OK



**为什么nacos支持负载均衡？**

因为spring-cloud-starter-alibaba-nacos-discovery内含netflix-ribbon包。







### Nacos服务注册中心对比提升



**Nacos全景图**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/6b72f8a125a700bf1480cd787dd2421f.png)





**Nacos和CAP**

Nacos与其他注册中心特性对比



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/e6399a634f243123a7f4a5772f463f52.png)



**Nacos服务发现实例模型**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/74e4456fad2567f8c3b6b98bb909b9f4.png)



**Nacos支持AP和CP模式的切换**

**C是所有节点在同一时间看到的数据是一致的;而A的定义是所有的请求都会收到响应。**



**何时选择使用何种模式?**

—般来说，如果不需要存储服务级别的信息且服务实例是通过nacos-client注册，并能够保持心跳上报，那么就可以选择AP模式。当前主流的服务如Spring cloud和Dubbo服务，都适用于AP模式，AP模式为了服务的可能性而减弱了一致性，因此**AP模式下只支持注册临时实例**。

如果需要在服务级别编辑或者存储配置信息，那么CP是必须，K8S服务和DNS服务则适用于CP模式。**CP模式下则支持注册持久化实例**，此时则是以**Raft协议**为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误。



**切换命令：**



```shell
curl -X PUT '$NACOS_SERVER:8848/nacos/v1/ns/operator/switches?entry=serverMode&value=CP
```









## 4、服务配置中心





### 基础配置



**新建Module cloudalibaba-config-nacos-client3377** 



#### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-config-nacos-client3377</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--nacos-config-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--nacos-discovery-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--web + actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



#### yml文件



Nacos同springcloud-config一样，在项目初始化时，要保证先从配置中心进行配置拉取，拉取配置之后，才能保证项目的正常启动。

springboot中配置文件的加载是存在优先级顺序的，bootstrap优先级高于application



**bootstrap.yml**



这里的`file-extension`的配置yaml一定要和Nacos中的后缀完全一致，yaml对应yaml，yml对应yml！



```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        #group: DEV_GROUP
        #namespace: 7d8f0f5a-6a53-4785-9686-dd460158e5d4


# ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
# nacos-config-client-dev.yaml

# nacos-config-client-test.yaml   ----> config.info
```



**application.yml**



```yaml
spring:
  profiles:
    active: dev # 表示开发环境
    #active: test # 表示测试环境
    #active: info
```





#### 主启动类

```java
@EnableDiscoveryClient
@SpringBootApplication
public class NacosConfigClientMain3377 {
    public static void main(String[] args) {
        SpringApplication.run(NacosConfigClientMain3377.class, args);
    }
}
```

#### Controller

添加注解@RefreshScope开启Nacos动态刷新！

```java
@RestController
@RefreshScope //支持Nacos的动态刷新功能。
public class ConfigClientController
{
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }
}
```





#### 在Nacos中添加配置信息



**Nacos中的dataid的组成格式及与SpringBoot配置文件中的匹配规则：**

[官方文档说明！](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)

说明：之所以需要配置spring.application.name，是因为它是构成Nacos配置管理dataId 字段的一部分。

**在 Nacos Spring Cloud中,dataId的完整格式如下：**



```
${prefix}-${spring-profile.active}.${file-extension}
```



- **prefix**默认为spring.application.name的值，也可以通过配置项spring.cloud.nacos.config.prefix来配置。
- **spring.profile.active**即为当前环境对应的 profile，详情可以参考 Spring Boot文档。注意：当`spring.profile.active`为空时，对应的连接符 `-` 也将不存在，datald 的拼接格式变成`${prefix}.${file-extension}`
- **file-exetension**为配置内容的数据格式，可以通过配置项`spring .cloud.nacos.config.file-extension`来配置。**目前只支持properties和yaml类型。**
- 通过Spring Cloud 原生注解**@RefreshScope**实现配置**自动更新**。



**最后公式：**

```
${spring.application.name)}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
例如：
nacos-config-client-test.yaml
```



#### Nacos配置新增



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/175f1567cd04c8e234c0196fb3b40791.png)



**Nacos界面配置对应 - 设置DataId**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/3c50537282518121fdf3c3a8729cbe23.png)





**配置小结：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/19/c7adcf1e319860ddbec5860c111304cf.png)







#### 启动测试

- 启动前需要在nacos客户端-配置管理-配置管理栏目下有对应的yaml配置文件
- 运行cloud-config-nacos-client3377的主启动类
- 调用接口查看配置信息 - http://localhost:3377/config/info



**自带动态刷新**

修改下Nacos中的yaml配置文件，再次调用查看配置的接口，就会发现配置已经刷新。







### 分类配置



#### Namespace+Group+DatalD



**是什么**

类似Java里面的package名和类名最外层的namespace是可以用于区分部署环境的，Group和DatalD逻辑上区分两个目标对象。

**三者情况**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/3dc85b949de530e4baca3eae6cc5965c.png)



**默认情况：**

**Namespace=public，Group=DEFAULT_GROUP，默认Cluster是DEFAULT**

- Nacos默认的Namespace是public，**Namespace主要用来实现隔离**。
  - 比方说我们现在有三个环境：开发、测试、生产环境，我们就可以创建三个Namespace，不同的Namespace之间是隔离的。
- Group默认是DEFAULT_GROUP，**Group可以把不同的微服务划分到同一个分组里面去**
- Service就是微服务:**一个Service可以包含多个Cluster (集群)**，Nacos默认Cluster是DEFAULT，Cluster是对指定微服务的一个虚拟划分。
  - 比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这时就可以给杭州机房的Service微服务起一个集群名称(HZ) ，给广州机房的Service微服务起一个集群名称(GZ)，还可以尽量让同一个机房的微服务互相调用，以提升性能。
- **最后是Instance，就是微服务的实例。**





#### Nacos之DataID配置



**在nacos中新建DataID：**

- nacos-config-client-dev.yaml
- nacos-config-client-test.yaml



**配置切换即可： spring.profiles.active**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/307a73bb5f37ae62f2bdb9519eb7d2d2.png)





**测试：http://localhost:3377/config/info**



#### Nacos之Group分组方案



**通过Group实现环境区分**



**在Nacos中新建分组：**

- TEST_GROUP
- DEV_GROUP



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/fd30c6a340e42f8e852b9423b74cac2c.png)



**bootstrap+application配置**

在config下增加一条group的配置即可。可配置为DEV_GROUP或TEST GROUP



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/72823787fd437c18c7c112ef8af137a9.png)





**测试：http://localhost:3377/config/info**





#### Nacos之Namespace空间方案



**在Nacos中新建Namespace：**

- 命名空间名称为 dev 和 test
- 命名空间id可以自动生成也可以我们指定



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/00ff0e70b65e3dd7ee5bc57322efaa76.png)





**bootstrap配置：**

```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        group: DEV_GROUP
        namespace: 7d8f0f5a-6a53-4785-9686-dd460158e5d4 #<------------指定namespace
```





**测试：http://localhost:3377/config/info**





## 5、Nacos集群和持久化





### 架构说明



**[集群官方文档](https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html)**



**集群部署架构图：**

因此开源的时候推荐用户把所有服务列表放到一个vip下面，然后挂到一个域名下面

- [http://ip1](http://ip1/):port/openAPI 直连ip模式，机器挂则需要修改ip才可以使用。
- [http://SLB](http://slb/):port/openAPI 挂载SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，直连SLB即可，下面挂server真实ip，可读性不好。
- [http://nacos.com](http://nacos.com/):port/openAPI 域名 + SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，可读性好，而且换ip方便，**推荐模式**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/a429999c19116193fa93c7ee590878d6.png)



**上图官网翻译，真实情况：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/beab47c11f4403d13c2e5b0a5797433b.png)







[https://nacos.io/zh-cn/docs/deployment.html](https://nacos.io/zh-cn/docs/deployment.html)



默认Nacos使用嵌入式数据库实现数据的存储。所以，如果启动多个默认配置下的Nacos节点，数据存储是存在一致性问题的。为了解决这个问题，Nacos采用了集中式存储的方式来支持集群化部署，**目前只支持MySQL的存储**。

**Nacos支持三种部署模式：**

- 单机模式-用于测试和单机试用。
- 集群模式-用于生产环境，确保高可用。
- 多集群模式-用于多数据中心场景。



**derby到mysql切换配置步骤：**

cmd startup.cmd或者双击startup.cmd文件

单机模式支持mysql

在0.7版本之前，在单机模式时nacos使用嵌入式数据库实现数据的存储，不方便观察数据存储的基本情况。0.7版本增加了支持mysql数据源能力

**具体的操作步骤：**

- 安装数据库，版本要求:5.6.5+
- 初始化mysq数据库，数据库初始化文件: nacos-mysql.sql（配置文件在nacos安装目录的config下，或者[https://github.com/alibaba/nacos/blob/master/distribution/conf/nacos-mysql.sql](https://github.com/alibaba/nacos/blob/master/distribution/conf/nacos-mysql.sql)）
- 修改conf/application.properties文件，增加支持mysql数据源配置（目前只支持mysql)，添加mysql数据源的url、用户名和密码：



```properties
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://11.162.196.16:3306/nacos_devtest?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user=nacos_devtest
db.password=youdontknow
```





**再以单机模式启动nacos，nacos所有写嵌入式数据库的数据都写到了mysql。**

**启动Nacos，可以看到是个全新的空记录界面，以前是记录进derby。**



由于是Windows就先记录，详细使用还得是在Linux！





### Linux部署集群



**1个Nginx+3个nacos注册中心+1个mysql**



**请确保是在环境中安装使用：**

1. 64 bit OS Linux/Unix/Mac，推荐使用Linux系统。
2. 64 bit JDK 1.8+；[下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).[配置](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)。
3. Maven 3.2.x+；[下载](https://maven.apache.org/download.cgi).[配置](https://maven.apache.org/settings.html)。
4. 3个或3个以上Nacos节点才能构成集群。



Nacos安装详解本章节第二小结！



### MySQL配置

SQL脚本在：nacos/conf/nacos-mysql.sql

复制SQL脚本在Linux的MySQL里执行，记得先建一个**nacos_config**数据库！



### properties配置



配置位置：nacos/conf/application.properties



**添加以下内容，设置数据源：**



```properties
### Connect URL of DB:
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user=root
db.password=1234
```



### cluster.conf配置



```shell
cp cluster.conf.example cluster.conf
vim cluster.conf

# 添加如下内容
192.168.111.144:3333
192.168.111.144:4444
192.168.111.144:5555
```



ip可以通过ifconfg查看，建议使用内网ip！

- 阿里云为172开始
- 腾讯云为10开始





### startup.sh修改



**编辑Nacos的启动脚本startup.sh，使它能够接受不同的启动端口！**



/mynacos/nacos/bin目录下有startup.sh

平时单机版的启动，都是./startup.sh即可

但是，集群启动，我们希望可以类似其它软件的shell命令，传递不同的端口号启动不同的nacos实例。
命令: `./startup.sh -p 3333`表示启动端口号为3333的nacos服务器实例，和上一步的cluster.conf配置的一致。



```shell
 # 先备份一份
 cp startup.sh startup.sh.bak
```





**因为目前是测试服务器，内存比较小，而nacos默认设置做大2g左右，最小1g左右，而我们要启动3份，所以我们要设置内存限制：**

这里我们设置最大为300m最小为100m。可根据自身情况进行设定。 如果内存大的请忽略该修改。

```shell
#===========================================================================================
# JVM Configuration
#===========================================================================================
if [[ "${MODE}" == "standalone" ]]; then
    JAVA_OPT="${JAVA_OPT} -Xms512m -Xmx512m -Xmn256m"
    JAVA_OPT="${JAVA_OPT} -Dnacos.standalone=true"
else
    if [[ "${EMBEDDED_STORAGE}" == "embedded" ]]; then
        JAVA_OPT="${JAVA_OPT} -DembeddedStorage=true"
    fi
    #JAVA_OPT="${JAVA_OPT} -server -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
    JAVA_OPT="${JAVA_OPT} -server -Xms300m -Xmx300m -Xmn100m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
    JAVA_OPT="${JAVA_OPT} -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=${BASE_DIR}/logs/java_heapdump.hprof"
    JAVA_OPT="${JAVA_OPT} -XX:-UseLargePages"

fi
```



**由于新版已经有了p参数，索引我们添加-P参数：**



```shell
# 增加P:
while getopts ":m:f:s:c:p:P:" opt
do
    case $opt in
        m)
            MODE=$OPTARG;;
        f)
            FUNCTION_MODE=$OPTARG;;
        s)
            SERVER=$OPTARG;;
        c)
            MEMBER_LIST=$OPTARG;;
        p)
            EMBEDDED_STORAGE=$OPTARG;;
        # 添加如下
        P)  
            PORT=$OPTARG;;
        ?)
        echo "Unknown parameter"
        exit 1;;
    esac
done

# 原配置 start
echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}" > ${BASE_DIR}/logs/start.out 2>&1 &
nohup "$JAVA" "$JAVA_OPT_EXT_FIX" ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
echo "nacos is starting，you can check the ${BASE_DIR}/logs/start.out"

# 改配置start
echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}" > ${BASE_DIR}/logs/start.out 2>&1 &
nohup "$JAVA" -Dserver.port=${PORT} "$JAVA_OPT_EXT_FIX" ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
echo "nacos is starting，you can check the ${BASE_DIR}/logs/start.out"
```



**启动三个Nacos成为集群：**

```shell
./startup.sh -p 3333
./startup.sh -p 4444
./startup.sh -p 5555

# 统计为3个服务
ps -ef | grep nacos | grep -v grep | wc -l
```



**一个问题？**



已经设置好了内存上限，但是启动一个没有问题，第二个第三个无法启动....

内存并没有使用完毕！



**解决方法**：可以分成三个文件夹修改application.properties端口号、以及cluster.conf配置为一样的后分别启动尝试，这里就不试了！





### nginx.conf配置



```shell
upstream  cluster{
    server 127.0.0.1:3333;
    server 127.0.0.1:4444;
    server 127.0.0.1:5555;
}

server {
    listen       1111;
    server_name  localhost;

    location / {
        #root   html;
        #index  index.html index.htm;
        proxy_pass http://cluster;
    }
}
```





### 测试



**可以新建一个配置测试！**

http://ip:1111/nacos/



**让微服务cloudalibaba-provider-payment9002启动注册进nacos集群 - 修改配置文件：**



```yaml
server:
  port: 9002

spring:
  application:
    name: nacos-payment-provider
  c1oud:
    nacos:
      discovery:
        #配置Nacos地址
        #server-addr: Localhost:8848
        #换成nginx的1111端口，做集群
        server-addr: 192.168.111.144:1111

management:
  endpoints:
    web:
      exposure:
        inc1ude: '*'
```



**启动微服务cloudalibaba-provider-payment9002**

**访问nacos，查看注册结果！**



**小总结：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/20/a001d58984feff943f704ec53509a411.png)







# 十三、Cloud Alibaba Sentinel





## 1、Sentinel是什么



[官方Github](https://github.com/alibaba/Sentinel)

[官方文档](https://sentinelguard.io/zh-cn/docs/introduction.html)



### Sentinel 是什么



随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。



**Sentinel 具有以下特征：**

- 丰富的应用场景：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
- 完备的实时监控：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
- 广泛的开源生态：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Dubbo、gRPC 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。
- 完善的 SPI 扩展点：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。



### Sentinel 的主要特性

[link](https://github.com/alibaba/Sentinel/wiki/介绍#sentinel-是什么)

—句话解释，之前我们学习过的Hystrix！

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/566e39522bb978ecfb6172de68f56302.png)



### Hystrix与Sentinel比较



- Hystrix
  1. 需要我们程序员自己手工搭建监控平台
  2. 没有一套web界面可以给我们进行更加细粒度化得配置流控、速率控制、服务熔断、服务降级
- Sentinel
  1. 单独一个组件，可以独立出来。
  2. 直接界面化的细粒度统一配置。









## 2、Sentinel安装并运行



**服务使用中的各种问题：**

- 服务雪崩
- 服务降级
- 服务熔断
- 服务限流



**Sentinel 分为两个部分：**

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。



**下载地址：**[https://github.com/alibaba/Sentinel](https://github.com/alibaba/Sentinel)



[sentinel-dashboard-1.8.2.jar](https://github.com/alibaba/Sentinel/releases/download/1.8.2/sentinel-dashboard-1.8.2.jar)



**注意：**

- 默认端口是8080，防止tomcat占用，将tomcat关了
- 由于sentinel-dashboard要和本地项目进行通信，**因此无法部署到云服务端**，云服务端无法访问到本地的项目端口！
- 要保证本地可以访问，因此就先部署到本地即可...



```shell
# 添加代理加速
wget https://ghproxy.com/https://github.com/alibaba/Sentinel/releases/download/1.8.2/sentinel-dashboard-1.8.2.jar

# 后台运行jar包 指定端口为8888
nohup java -Dserver.port=8888 -jar sentinel-dashboard-1.8.2.jar >logs.txt &
# 或
nohup java -Dserver.port=8888 -Dcsp.sentinel.dashboard.server=localhost:8888 -Dproject.name=sentinel-dashboard-1.8.2 -jar sentinel-dashboard-1.8.2.jar &

# 只能本地访问！。。。
java -jar sentinel-dashboard-1.8.2.jar --server.port=8888
# 关闭直接ps -ef | grep sentinel 后 kill 即可！
```





**访问地址：** ip:8888 用户名密码都是 sentinel





## 3、Sentinel监控初始化





**启动Nacos8848成功**

**新建Module cloudalibaba-sentinel-service8401**



### pom文件



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-sentinel-service8401</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件+actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

</project>
```



### Controller



```java
@RestController
@Slf4j
public class FlowLimitController {
    @GetMapping("/testA")
    public String testA() {
        return "------testA";
    }

    @GetMapping("/testB")
    public String testB() {
        log.info(Thread.currentThread().getName() + "\t" + "...testB");
        return "------testB";
    }
}
```



### yml文件



**注意：配置里的port端口是dashboard与微服务项目通信的端口，因此无法将sentinel面板搭建在云服务器！**



```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8888 #配置Sentinel dashboard地址
        # 默认8719端口，若被占用会从8719开启+1扫描，找到未被占用的端口
        port: 8719

management:
  endpoints:
    web:
      exposure:
        include: '*'

feign:
  sentinel:
    enabled: true # 激活Sentinel对Feign的支持
```







### 主启动类



```java
@EnableDiscoveryClient
@SpringBootApplication
public class MainApp8401 {
    public static void main(String[] args) {
        SpringApplication.run(MainApp8401.class, args);
    }
}
```





### 启动测试





**启动Sentinel8080 - `java -jar sentinel-dashboard-1.8.2.jar --server.port=8888`**

**启动微服务8401**

**启动8401微服务后查看sentienl控制台**

- 刚启动，空空如也，啥都没有

- **原因：Sentinel采用的懒加载**
  - Controller里的方法个访问一次即可
    - http://localhost:8401/testA
    - http://localhost:8401/testB
  - 效果：sentinel8080正在监控微服务8401







## 4、Sentinel流控规则





### 基本介绍



- 资源名：唯一名称，默认请求路径。
- 针对来源：Sentinel可以针对调用者进行限流，填写微服务名，默认default（不区分来源）。
- 阈值类型/单机阈值：
  - QPS(每秒钟的请求数量)︰当调用该API的QPS达到阈值的时候，进行限流。
  - 线程数：当调用该API的线程数达到阈值的时候，进行限流。
- 是否集群：不需要集群。
- 流控模式：
  - 直接：API达到限流条件时，直接限流。
  - 关联：当关联的资源达到阈值时，就限流自己。
  - 链路：只记录指定链路上的流量（指定资源从入口资源进来的流量，如果达到阈值，就进行限流)【API级别的针对来源】。
- 流控效果：
  - 快速失败：直接失败，抛异常。
  - Warm up：根据Code Factor（冷加载因子，默认3）的值，从阈值/codeFactor，经过预热时长，才达到设置的QPS阈值。
  - 排队等待：匀速排队，让请求以匀速的速度通过，阈值类型必须设置为QPS，否则无效。



**流控规则配置图示：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/d7aafffecba6b8adaf2eac900c4da3b8.png)





### 流控模式



> 直接、关联、链路！



#### QPS直接失败



表示1秒钟内查询1次就是OK，若超过次数1，就直接->快速失败，报默认错误！



**测试：**

快速多次点击访问http://localhost:8401/testA

**结果：**

返回页面 Blocked by Sentinel (flow limiting)





#### 线程数直接失败

线程数：当调用该API的线程数达到阈值的时候，进行限流。



testA方法增加线程睡眠！

```java
@GetMapping("/testA")
public String testA() throws InterruptedException {
    Thread.sleep(2000);
    return "------testA";
}
```



**测试：**

快速多次点击访问http://localhost:8401/testA

**结果：**

不加线程睡眠完全可以多次快速点击，但有了线程限制后，将会导致一个线程进入处理流程会在所占用的时间内无法进入第二个线程！







#### 关联



**是什么？**

- 当自己关联的资源达到阈值时，就限流自己
- 当与A关联的资源B达到阀值后，就限流A自己（B惹事，A挂了）

**设置testA**

当关联资源/testB的QPS阀值超过1时，就限流/testA的Rest访问地址，**当关联资源到阈值后限制配置好的资源名**。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/ad10578741ed8160ab8f67da2bb98a57.png)





**Postman模拟并发密集访问testB**

配置完毕点击运行集合即可！

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/5354f7ee5608ce61bb2278514707fb72.png)







**测试：**

Run：大批量线程高并发访问B

Postman运行后，点击访问http://localhost:8401/testA，发现testA挂了

- 结果Blocked by Sentinel(flow limiting)







#### 链路

略！



### 流控效果





#### 快速失败



直接->快速失败：默认的流控处理及效果！



#### 预热Warm up



Warm Up（RuleConstant.CONTROL_BEHAVIOR_WARM_UP）方式，即预热/冷启动方式。

当系统长期处于低水位的情况下，当流量突然增加时，直接把系统拉升到高水位可能瞬间把系统压垮。通过"冷启动"，让通过的流量缓慢增加，在一定时间内逐渐增加到阈值上限，给冷系统一个预热的时间，避免冷系统被压垮。

详细文档可以参考 流量控制 - Warm Up 文档，具体的例子可以参见 WarmUpFlowDemo。

**通常冷启动的过程系统允许通过的 QPS 曲线如下图所示：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/8e0d24031d91e12d69775a2cee47fbb3.png)



**WarmUp配置**

默认coldFactor为3，即请求QPS 从 threshold / 3开始，经预热时长逐渐升至设定的QPS阈值。[link](https://github.com/alibaba/Sentinel/wiki/流量控制#warm-up)



**案例：阀值为10+预热时长设置5秒。**

系统初始化的阀值为10/ 3约等于3,即阀值刚开始为3;然后过了5秒后阀值才慢慢升高恢复到10。

也就是前五秒是10/3，后五秒将会预热升到10！



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/d98068e670b98f0508c77f108c446130.png)





**测试**

多次快速点击http://localhost:8401/testB - 刚开始不行，后续慢慢OK

**应用场景**

秒杀系统在开启的瞬间，会有很多流量上来，很有可能把系统打死，预热方式就是把为了保护系统，可慢慢的把流量放进来,慢慢的把阀值增长到设置的阀值。



#### 排队等待



匀速排队，让请求以均匀的速度通过，阀值类型必须设成QPS，否则无效。

设置：/testA每秒1次请求，超过的话就排队等待，等待的超时时间为20000毫秒。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/38b05a1770f8a64dce0c031ff98d365f.png)





**匀速排队：**

匀速排队（RuleConstant.CONTROL_BEHAVIOR_RATE_LIMITER）方式会严格控制请求通过的间隔时间，也即是让请求以均匀的速度通过，对应的是漏桶算法。详细文档可以参考  [流量控制 - 匀速器模式](https://github.com/alibaba/Sentinel/wiki/流量控制-匀速排队模式)，具体的例子可以参见 [PaceFlowDemo](https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/flow/PaceFlowDemo.java)。

该方式的作用如下图所示：



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/c2fa63a85e8e51fd77c1b30c3002779c.png)







这种方式主要用于处理间隔性突发的流量，例如消息队列。想象一下这样的场景，在某一秒有大量的请求到来，而接下来的几秒则处于空闲状态，我们希望系统能够在接下来的空闲期间逐渐处理这些请求，而不是在第一秒直接拒绝多余的请求。

注意：匀速排队模式暂时不支持 QPS > 1000 的场景。

[https://github.com/alibaba/Sentinel/wiki/流量控制#匀速排队](https://github.com/alibaba/Sentinel/wiki/流量控制#匀速排队)



**测试**



添加日志记录代码到FlowLimitController的testB方法：

```java
@GetMapping("/testB")
public String testB() {
    log.info(Thread.currentThread().getName() + "\t" + "...testB");
    return "------testB";
}
```



- Postman模拟并发密集访问testA。



**结果**：会发现在并发访问下，仍然是按照排队顺序一次访问，一秒一个！





## 5、Sentinel降级规则



### 简介



[https://github.com/alibaba/Sentinel/wiki/熔断降级](https://github.com/alibaba/Sentinel/wiki/熔断降级)

除了流量控制以外，对调用链路中不稳定的资源进行熔断降级也是保障高可用的重要措施之一。一个服务常常会调用别的模块，可能是另外的一个远程服务、数据库，或者第三方 API 等。例如，支付的时候，可能需要远程调用银联提供的 API；查询某个商品的价格，可能需要进行数据库查询。然而，这个被依赖服务的稳定性是不能保证的。如果依赖的服务出现了不稳定的情况，请求的响应时间变长，那么调用服务的方法的响应时间也会变长，线程会产生堆积，最终可能耗尽业务自身的线程池，服务本身也变得不可用。

现代微服务架构都是分布式的，由非常多的服务组成。不同服务之间相互调用，组成复杂的调用链路。以上的问题在链路调用中会产生放大的效果。复杂链路上的某一环不稳定，就可能会**层层级联**，最终导致整个链路都不可用。因此我们需要对不稳定的弱依赖服务调用进行**熔断降级**，暂时切断不稳定调用，避免局部不稳定因素导致整体的雪崩。熔断降级作为保护自身的手段，通常在客户端（调用端）进行配置。





**降级策略：**





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/21/5c52f83f8e6cac6676f45859ac8c856a.png)



- **RT（平均响应时间，秒级）**
  - 平均响应时间 超出阈值 且 在时间窗口内通过的请求>=5，两个条件同时满足后触发降级。
  - 窗口期过后关闭断路器。
  - RT最大4900（更大的需要通过-Dcsp.sentinel.statistic.max.rt=XXXX才能生效）。

- **异常比列（秒级）**
  - QPS >= 5且异常比例（秒级统计）超过阈值时，触发降级;时间窗口结束后，关闭降级 。

- **异常数(分钟级)**
  - 异常数(分钟统计）超过阈值时，触发降级;时间窗口结束后，关闭降级



Sentinel熔断降级会在调用链路中**某个资源出现不稳定状态时（例如调用超时或异常比例升高)**，对这个资源的调用进行限制，让请求快速失败，避免影响到其它的资源而导致级联错误。

当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断（默认行为是抛出 DegradeException）。

Sentinei的断路器是没有类似Hystrix半开状态的。(**Sentinei 1.8.0 已有半开状态**)

**半开的状态系统自动去检测是否请求有异常，没有异常就关闭断路器恢复使用，有异常则继续打开断路器不可用。**



### RT



#### 是什么

平均响应时间(DEGRADE_GRADE_RT)：当1s内持续进入5个请求，对应时刻的平均响应时间（秒级）均超过阈值（ count，以ms为单位），那么在接下的时间窗口（DegradeRule中的timeWindow，以s为单位）之内，对这个方法的调用都会自动地熔断(抛出DegradeException )。注意Sentinel 默认统计的RT上限是4900 ms，超出此阈值的都会算作4900ms，若需要变更此上限可以通过启动配置项-Dcsp.sentinel.statistic.max.rt=xxx来配置。



**注意**：Sentinel 1.7.0才有**平均响应时间**（`DEGRADE_GRADE_RT`），Sentinel 1.8.0的没有这项，取而代之的是**慢调用比例** (`SLOW_REQUEST_RATIO`)。

**慢调用比例 (SLOW_REQUEST_RATIO)**：选择以慢调用比例作为阈值，需要设置允许的慢调用 RT（即最大的响应时间），请求的响应时间大于该值则统计为慢调用。当单位统计时长（statIntervalMs）内请求数目大于设置的最小请求数目，并且慢调用的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求响应时间小于设置的慢调用 RT 则结束熔断，若大于设置的慢调用 RT 则会再次被熔断。[https://github.com/alibaba/Sentinel/wiki/熔断降级#熔断策略](https://github.com/alibaba/Sentinel/wiki/熔断降级#熔断策略)





#### Controller

```java
@GetMapping("/testD")
public String testD() {
    try {
        TimeUnit.SECONDS.sleep(1);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    log.info("testD 测试RT");
    return "----------testD";
}
```



#### Sentinel配置



- 平均响应时间RT大于200ms
- 1s内通过的请求数大于5
- 时间窗口期1s内，熔断期，不可用返回流控，



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/81d75bf62eabf33550581f97a3637c76.png)



#### Jmeter压测



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/45b2b17ed02db4363c19cdcc432adedd.png)



**简单解释：**



按照上述配置，永远一秒钟打进来10个线程（大于5个了）调用testD，我们希望200毫秒处理完本次任务。

如果超过200毫秒还没处理完，在未来1秒钟的时间窗口内，断路器打开（保险丝跳闸）微服务不可用，保险丝跳闸断电了后续我停止jmeter，没有这么大的访问量了，断路器关闭（保险丝恢复），微服务恢复OK。



### 异常比例





#### 是什么



**异常比例(DEGRADE_GRADE_EXCEPTION_RATIO)**：当资源的每秒请求量 >= 5，并且每秒异常总数占通过量的比值超过阈值（ DegradeRule中的 count）之后，资源进入降级状态，即在接下的时间窗口( DegradeRule中的timeWindow，以s为单位）之内，对这个方法的调用都会自动地返回。异常比率的阈值范围是[0.0, 1.0]，代表0% -100%。



**注意**，与Sentinel 1.8.0相比，有些不同（Sentinel 1.8.0才有的半开状态），Sentinel 1.8.0的如下：



**异常比例 (ERROR_RATIO)**：当单位统计时长（statIntervalMs）内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（**HALF-OPEN 状态**），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。异常比率的阈值范围是 [0.0, 1.0]，代表 0% - 100%。[https://github.com/alibaba/Sentinel/wiki/熔断降级#熔断策略](https://github.com/alibaba/Sentinel/wiki/熔断降级#熔断策略)





#### Controller



```java
@GetMapping("/testD")
public String testD() {
    log.info("testD 异常比例");
    int age = 10/0;
    return "------testD";
}
```



#### Sentinel配置



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/fb3b833256a58596bb2d03f9a563f423.png)





#### Jmeter压测



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/5edc313c4699b59b91232fe3cd574ee0.png)



#### 结论



- 按照上述配置，单独访问一次，必然来一次报错一次(int age = 10/0)，调一次错一次。（默认的Error错误页面）
- 开启jmeter后，直接高并发发送请求，多次调用达到我们的配置条件了。断路器开启(保险丝跳闸)，微服务不可用了，不再报错error而是服务降级了。（降级的页面）





### 异常数





#### 是什么



**异常数( DEGRADE_GRADF_EXCEPTION_COUNT )**：当资源近**1分钟**的异常数目超过阈值之后会进行熔断。注意由于统计时间窗口是分钟级别的，若timeWindow小于60s，则结束熔断状态后码可能再进入熔断状态。

**注意**：与Sentinel 1.8.0相比，有些不同（Sentinel 1.8.0才有的半开状态），Sentinel 1.8.0的如下：

**异常数 (ERROR_COUNT)**：当**单位统计时长内**的异常数目超过阈值之后会自动进行熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。



**异常数是按照分钟统计的，时间窗口一定要大于等于60秒**





#### Controller



```java
@GetMapping("/testE")
public String testE() {
    log.info("testE 测试异常数");
    int age = 10 / 0;
    return "------testE 测试异常数";
}
```





#### Sentinel配置





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/5b12873b58eaf740a82fbc894a24f7b8.png)





#### 结果

访问http://localhost:8401/testE，第一次访问绝对报错，因为除数不能为零，我们看到error窗口，但是达到5次报错后，进入熔断后降级。









## 6、Sentinel热点key限流





### 简单介绍



[https://github.com/alibaba/Sentinel/wiki/热点参数限流](https://github.com/alibaba/Sentinel/wiki/热点参数限流)

**何为热点？热点即经常访问的数据。**很多时候我们希望统计某个热点数据中访问频次最高的 Top K 数据，并对其访问进行限制。比如：

- 商品 ID 为参数，统计一段时间内最常购买的商品 ID 并进行限制
- 用户 ID 为参数，针对一段时间内频繁访问的用户 ID 进行限制

热点参数限流会统计传入参数中的热点参数，并根据配置的限流阈值与模式，对包含热点参数的资源调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/4a2b29348ae5ea0ed529a20f4efe7c12.png)

Sentinel 利用 **LRU 策略**统计最近最常访问的热点参数，结合**令牌桶算法**来进行参数级别的流控。**热点参数限流支持集群模式**。





**兜底方法分为系统默认和客户自定义两种**

之前的case，限流出问题后，都是用sentinel系统默认的提示: Blocked by Sentinel (flow limiting)

我们能不能自定？类似hystrix，某个方法出问题了，就找对应的兜底降级方法?

**结论 - 从HystrixCommand到@SentinelResource**



### Controller





```java
@GetMapping("/testHotKey")
@SentinelResource(value = "testHotKey",blockHandler = "deal_testHotKey")
public String testHotKey(@RequestParam(value = "p1",required = false) String p1,
                         @RequestParam(value = "p2",required = false) String p2) {
    //int age = 10/0;
    return "------testHotKey";
}

/*兜底方法*/
public String deal_testHotKey (String p1, String p2, BlockException exception) {
    return "------deal_testHotKey,o(╥﹏╥)o";
    //sentinel系统默认的提示：Blocked by Sentinel (flow limiting)
}
```





### Sentinel配置

**注意**：资源名就是`@SentinelResource`注解的value值！ 不带斜杠！

**参数索引**：值得是方法中的参数顺序，不是url请求地址的顺序！从0开启！



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/1edaf0ea44acbae4db7551ebe0315cdf.png)



- 方法testHotKey里面第一个参数只要QPS超过每秒1次，马上降级处理
- 异常用了我们自己定义的**兜底方法**



### 测试

- http://localhost:8401/testHotKey?p1=abc
- 多次刷新，一秒超过1次就会触发！
- 不添加blockHandler兜底方法的话，QPS超过1将会抛出默认的错误页面Error Page





### 参数例外项



- 普通 - 超过1秒钟一个后，达到阈值1后马上被限流
- **我们期望p1参数当它是某个特殊值时，它的限流值和平时不一样**
- 特例 - 假如当p1的值等于5时，它的阈值可以达到200





### Sentinel配置



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/652d3d655c29eaf979ee686716f34ae8.png)





### 测试



- right - http://localhost:8401/testHotKey?p1=5
- error - http://localhost:8401/testHotKey?p1=3
- 当p1等于5的时候，阈值变为200
- 当p1不等于5的时候，阈值就是平常的1
- **前提条件 - 热点参数的注意点，参数必须是基本类型或者String**



若有了异常，则我们设置的热点key规则是无效的，RunTimeException，@SentinelResource不管，当然可以在其中添加fallback解决！



```java
@GetMapping("/testHotKey")
@SentinelResource(value = "testHotKey",blockHandler = "deal_testHotKey")
public String testHotKey(@RequestParam(value = "p1",required = false) String p1,
                         @RequestParam(value = "p2",required = false) String p2) {
    int age = 10/0;
    return "------testHotKey";
}

/*兜底方法*/
public String deal_testHotKey (String p1, String p2, BlockException exception) {
    return "------deal_testHotKey,o(╥﹏╥)o";
    //sentinel系统默认的提示：Blocked by Sentinel (flow limiting)
}
```







## 7、Sentinel系统规则



### 是什么



[https://github.com/alibaba/Sentinel/wiki/系统自适应限流](https://github.com/alibaba/Sentinel/wiki/系统自适应限流)



Sentinel 系统自适应限流从整体维度对应用入口流量进行控制，结合应用的 Load、CPU 使用率、总体平均 RT、入口 QPS 和并发线程数等几个维度的监控指标，通过自适应的流控策略，让系统的入口流量和系统的负载达到一个平衡，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。



**简单介绍：其实就是一个全局的限制！**



### 系统规则



系统保护规则是从应用级别的入口流量进行控制，从单台机器的 load、CPU 使用率、平均 RT、入口 QPS 和并发线程数等几个维度监控应用指标，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。

系统保护规则是应用整体维度的，而不是资源维度的，并且仅对入口流量生效。入口流量指的是进入应用的流量（EntryType.IN），比如 Web 服务或 Dubbo 服务端接收的请求，都属于入口流量。

**系统规则支持以下的模式：**

- **Load 自适应**（仅对 Linux/Unix-like 机器生效）：系统的 load1 作为启发指标，进行自适应系统保护。当系统 load1 超过设定的启发值，且系统当前的并发线程数超过估算的系统容量时才会触发系统保护（BBR 阶段）。系统容量由系统的 maxQps * minRt 估算得出。设定参考值一般是 CPU cores * 2.5。
- **CPU usage**（1.5.0+ 版本）：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0），比较灵敏。
- **平均 RT**：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。
- **并发线程数**：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。
- **入口 QPS**：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。





## 8、SentinelResource



**Module - cloudalibaba-sentinel-service8401**



### 按资源名称限流+后续处理



**即按照@SentinelResource注解中的value值进行配置！**



#### Controller



```java
@RestController
public class RateLimitController {

    @GetMapping("/byResource")
    @SentinelResource(value = "byResource",blockHandler = "handleException")
    public CommonResult byResource() {
        return new CommonResult(200,"按资源名称限流测试OK",new Payment(2020L,"serial001"));
    }

    public CommonResult handleException(BlockException exception) {
        return new CommonResult(444,exception.getClass().getCanonicalName()+"\t 服务不可用");
    }
}
```



#### 配置流控规则



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/e77c2efe5f28bf191015c08ac8a6b220.png)





#### 启动测试



- 1秒钟点击1下，OK
- 超过上述，疯狂点击，返回了自己定义的限流处理信息，限流发生



```json
{
    code: 444,
    message: "com.alibaba.csp.sentinel.slots.block.flow.FlowException 服务不可用",
    data: null
}
```



#### 额外问题

**此时关闭问服务8401 -> Sentinel控制台，流控规则消失了!**

即临时还是持久化！

后续小结介绍！



### 按URL地址限流+后续处理



**即按照@GetMapping注解中的value值进行配置！**



#### Controller



```java
@GetMapping("/rateLimit/byUrl")
@SentinelResource(value = "byUrl")
public CommonResult byUrl() {
    return new CommonResult(200, "按url限流测试OK", new Payment(2020L, "serial002"));
}
```



#### Sentinel配置



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/517676d84a18317b90659ed9e5e2526e.png)



#### 启动测试

- 快速点击http://localhost:8401/rateLimit/byUrl
- 结果 - 会返回Sentinel自带的限流处理结果 Blocked by Sentinel (flow limiting)





#### 上面兜底方案面临的问题



1. 系统默认的，没有体现我们自己的业务要求。
2. 依照现有条件，我们自定义的处理方法又和业务代码**耦合**在一块，不直观。
3. 每个业务方法都添加—个兜底的，那代码膨胀加剧。
4. 全局统—的处理方法没有体现。



### 自定义限流处理逻辑



**解决上面兜底方案的耦合度，全局处理！**



自定义限流处理类 - 创建CustomerBlockHandler类用于自定义限流处理逻辑：



#### CustomerBlockHandler 



**注意：一定要是static的方法！**

要通过类来调用的！



```java
public class CustomerBlockHandler {
    public static CommonResult handlerException(BlockException exception) {
        return new CommonResult(4444,"按客戶自定义,global handlerException----1");
    }

    public static CommonResult handlerException2(BlockException exception) {
        return new CommonResult(4444,"按客戶自定义,global handlerException----2");
    }
}
```





#### Controller



```java
@GetMapping("/rateLimit/customerBlockHandler")
@SentinelResource(value = "customerBlockHandler",
        blockHandlerClass = CustomerBlockHandler.class,//自定义限流处理类
        blockHandler = "handlerException2")//指定限流处理类的方法
public CommonResult customerBlockHandler() {
    return new CommonResult(200, "按客戶自定义", new Payment(2020L, "serial003"));
}
```



#### Sentinel配置



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/22/ef20b02bc29f86e8e29266adccac2d50.png)





#### 启动测试



启动微服务后先调用一次 - http://localhost:8401/rateLimit/customerBlockHandler。

然后，多次快速刷新http://localhost:8401/rateLimit/customerBlockHandler。

刷新后，我们自定义兜底方法的字符串信息就返回到前端。







### 其他注解属性介绍



[https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81#sentinelresource-%E6%B3%A8%E8%A7%A3](https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81#sentinelresource-%E6%B3%A8%E8%A7%A3)





**@SentinelResource 注解**

**注意：注解方式埋点不支持 private 方法。**

**@SentinelResource 用于定义资源，并提供可选的异常处理和 fallback 配置项。 @SentinelResource 注解包含以下属性：**

- **value**：资源名称，必需项（不能为空）
- **entryType**：entry 类型，可选项（默认为 EntryType.OUT）
- **blockHandler / blockHandlerClass**: blockHandler 对应处理 BlockException 的函数名称，可选项。blockHandler 函数访问范围需要是 public，返回类型需要与原方法相匹配，参数类型需要和原方法相匹配并且最后加一个额外的参数，类型为 BlockException。**blockHandler 函数默认需要和原方法在同一个类中**。若希望使用其他类的函数，则**可以指定 blockHandlerClass 为对应的类的 Class 对象**，**注意对应的函数必需为 static 函数，否则无法解析。**
- **fallback /fallbackClass**：fallback 函数名称，可选项，**用于在抛出异常的时候提供 fallback 处理逻辑**。fallback 函数可以针对所有类型的异常（除了exceptionsToIgnore里面排除掉的异常类型）进行处理。fallback 函数签名和位置要求：
  - 返回值类型必须与原函数返回值类型一致；
  - 方法参数列表需要和原函数一致，或者可以额外多一个 Throwable 类型的参数用于接收对应的异常。
  - **fallback 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 fallbackClass 为对应的类的 Class 对象，注意对应的函数必需为 static 函数，否则无法解析。**
- **defaultFallback**（since 1.6.0）：默认的 fallback 函数名称，可选项，通常用于通用的 fallback 逻辑（即可以用于很多服务或方法）。默认 fallback 函数可以针对所有类型的异常（除了exceptionsToIgnore里面排除掉的异常类型）进行处理。若同时配置了 fallback 和 defaultFallback，则只有 fallback 会生效。defaultFallback 函数签名要求：
  - 返回值类型必须与原函数返回值类型一致；
  - 方法参数列表需要为空，或者可以额外多一个 Throwable 类型的参数用于接收对应的异常。
  - defaultFallback 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 fallbackClass 为对应的类的 Class 对象，注意对应的函数必需为 static 函数，否则无法解析。
- **exceptionsToIgnore**（since 1.6.0）：用于指定哪些异常被排除掉，不会计入异常统计中，也不会进入 fallback 逻辑中，而是会原样抛出。









**Sentinel主要有三个核心Api：**

1. SphU定义资源
2. Tracer定义统计
3. ContextUtil定义了上下文





## 9、Sentinel服务熔断





### Sentinel整合Ribbon+OpenFeign+fallback



**Ribbon系列**

- 启动nacos和sentinel
- 提供者9003/9004
- 消费者84



**新建Module cloudalibaba-provider-payment9003/9004，一模一样即可！**



#### pom文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-provider-payment9003</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



#### yml文件



两个Module一个9003一个9004即可！

```yaml
server:
  port: 9003

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```



#### Controller

```java
@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    //模拟数据库
    public static HashMap<Long, Payment> hashMap = new HashMap<>();

    static {
        hashMap.put(1L, new Payment(1L, "28a8c1e3bc2742d8848569891fb42181"));
        hashMap.put(2L, new Payment(2L, "bba8c1e3bc2742d8848569891ac32182"));
        hashMap.put(3L, new Payment(3L, "6ua8c1e3bc2742d8848569891xt92183"));
    }

    @GetMapping(value = "/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id) {
        Payment payment = hashMap.get(id);
        CommonResult<Payment> result = new CommonResult(200, "from mysql,serverPort:  " + serverPort, payment);
        return result;
    }

}
```



#### 主启动类



```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain9003 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain9003.class, args);
    }
}
```



**新建Module cloudalibaba-consumer-nacos-order84**



#### pom文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2021</artifactId>
        <groupId>com.itnxd.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-consumer-nacos-order84</artifactId>

    <properties>
        <maven.compiler.source>14</maven.compiler.source>
        <maven.compiler.target>14</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud openfeign -->
        <!--
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
      -->
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.itnxd.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

#### yml文件

```yaml
server:
  port: 84

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider

# 激活Sentinel对Feign的支持
feign:
  sentinel:
    enabled: false
```

#### Controller



```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    @SentinelResource(value = "fallback")//没有配置
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/" + id, CommonResult.class, id);

        if (id == 4) {
            throw new IllegalArgumentException("IllegalArgumentException,非法参数异常....");
        } else if (result.getData() == null) {
            throw new NullPointerException("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

}
```



#### 主启动类



```java
@EnableDiscoveryClient
@SpringBootApplication
//@EnableFeignClients
public class OrderNacosMain84 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosMain84.class, args);
    }
}
```



#### 配置类



```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```





#### 注意点



**修改后请重启微服务！**

- 热部署对java代码级生效及时
- 对@SentinelResource注解内属性，有时效果不好

**目的**

- **fallback管运行异常**
- **blockHandler管配置违规**









### Ribbon系列





#### 没有任何配置



**没有任何配置：若果直接访问 http://localhost:84/consumer/fallback/4 会返回 Whitelabel Error Page 的默认错误页面！**



```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    @SentinelResource(value = "fallback")//没有配置
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/" + id, CommonResult.class, id);

        if (id == 4) {
            throw new IllegalArgumentException("IllegalArgumentException,非法参数异常....");
        } else if (result.getData() == null) {
            throw new NullPointerException("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

}
```







#### 只配置fallback



**只配置fallback：若访问 http://localhost:84/consumer/fallback/4 会返回我们的兜底方法设置的json数据！**



```json
{
    code: 444,
    message: "兜底异常handlerFallback,exception内容 IllegalArgumentException,非法参数异常....",
    data: {
        id: 4,
        serial: "null"
    }
}
```



```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    // @SentinelResource(value = "fallback")//没有配置
    @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/" + id, CommonResult.class, id);

        if (id == 4) {
            throw new IllegalArgumentException("IllegalArgumentException,非法参数异常....");
        } else if (result.getData() == null) {
            throw new NullPointerException("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    //本例是fallback
    public CommonResult handlerFallback(@PathVariable Long id, Throwable e) {
        Payment payment = new Payment(id, "null");
        return new CommonResult<>(444, "兜底异常handlerFallback,exception内容  " + e.getMessage(), payment);
    }
}
```





#### 只配置blockHandler



**只配置blockHandler：若访问 http://localhost:84/consumer/fallback/4 会返回我们的兜底方法设置的json数据！**





**Sentinel配置：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/0eff14dd9a18a0717510c0b09f572754.png)



- 不进行Sentinel配置时候会返回默认的Whitelabel Error Page页面
- 配置了流控后，触发流控后才会返回流控后的blockHandler自定义错误页面！









```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    // @SentinelResource(value = "fallback")//没有配置
    // @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
    @SentinelResource(value = "fallback",blockHandler = "blockHandler") //blockHandler只负责sentinel控制台配置违规
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/" + id, CommonResult.class, id);

        if (id == 4) {
            throw new IllegalArgumentException("IllegalArgumentException,非法参数异常....");
        } else if (result.getData() == null) {
            throw new NullPointerException("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    //本例是fallback
    /*public CommonResult handlerFallback(@PathVariable Long id, Throwable e) {
        Payment payment = new Payment(id, "null");
        return new CommonResult<>(444, "兜底异常handlerFallback,exception内容  " + e.getMessage(), payment);
    }*/

    //本例是blockHandler
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
}
```





#### fallback和blockHandler都配置



**二者都配置：**

- 若访问 http://localhost:84/consumer/fallback/1，点的快到达配置的违规异常，会返回blockHandler的违规异常！
- 若访问 http://localhost:84/consumer/fallback/4，且达到配置的违规异常，会返回blockHandler的违规异常！



**结论：**

若blockHandler和fallback 都进行了配置，则被限流降级而抛出BlockException时只会进入blockHandler处理逻辑。

**即业务异常和违规同时发生，Sentinel违规会先执行，在大门外面先挡住！**



```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    // @SentinelResource(value = "fallback")//没有配置
    // @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
    // @SentinelResource(value = "fallback",blockHandler = "blockHandler") //blockHandler只负责sentinel控制台配置违规
    @SentinelResource(value = "fallback",fallback = "handlerFallback",blockHandler = "blockHandler")
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/" + id, CommonResult.class, id);

        if (id == 4) {
            throw new IllegalArgumentException("IllegalArgumentException,非法参数异常....");
        } else if (result.getData() == null) {
            throw new NullPointerException("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    //本例是fallback
    public CommonResult handlerFallback(@PathVariable Long id, Throwable e) {
        Payment payment = new Payment(id, "null");
        return new CommonResult<>(444, "兜底异常handlerFallback,exception内容  " + e.getMessage(), payment);
    }

    //本例是blockHandler
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
}
```





#### 忽略异常属性



**exceptionsToIgnore指定的异常不会进行处理，会抛出默认的错误页！即这些异常不用兜底方法处理。**

```java
@RequestMapping("/consumer/fallback/{id}")
// @SentinelResource(value = "fallback")//没有配置
// @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
// @SentinelResource(value = "fallback",blockHandler = "blockHandler") //blockHandler只负责sentinel控制台配置违规
@SentinelResource(value = "fallback",fallback = "handlerFallback",blockHandler = "blockHandler",
        exceptionsToIgnore = {IllegalArgumentException.class})
public CommonResult<Payment> fallback(@PathVariable Long id) {
    CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/" + id, CommonResult.class, id);

    if (id == 4) {
        throw new IllegalArgumentException("IllegalArgumentException,非法参数异常....");
    } else if (result.getData() == null) {
        throw new NullPointerException("NullPointerException,该ID没有对应记录,空指针异常");
    }

    return result;
}
```







### Feign系列



**修改84模块**

- 84消费者调用提供者9003（注意，只有一个提供者）
- Feign组件一般是消费侧



#### pom文件

```xml
<!--SpringCloud openfeign -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```







#### yaml文件



```yaml
# 激活Sentinel对Feign的支持
feign:
  sentinel:
    enabled: true
```



#### Service



```java
@FeignClient(value = "nacos-payment-provider", fallback = PaymentFallbackService.class)
public interface PaymentService {
    @GetMapping(value = "/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id);
}

@Component
public class PaymentFallbackService implements PaymentService {
    @Override
    public CommonResult<Payment> paymentSQL(Long id) {
        return new CommonResult<>(44444, "服务降级返回,---PaymentFallbackService", new Payment(id, "errorSerial"));
    }
}
```



#### Controller



```java
@RestController
@Slf4j
public class CircleBreakerController {

    ...
        
    //==================OpenFeign
    @Resource
    private PaymentService paymentService;

    @GetMapping(value = "/consumer/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id) {
        return paymentService.paymentSQL(id);
    }
}
```



#### 主启动类

```java
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class OrderNacosMain84 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosMain84.class, args);
    }
}
```



#### 启动测试

测试 - http://localhost:84/consumer/paymentSQL/1

测试84调用9003，此时故意关闭9003微服务提供者，**84消费侧自动降级**，不会被耗死。



### 熔断框架比较



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/6604d2ac7ae8a16d8c8b6b561dfae3bc.png)









## 10、Sentinel服务持久化





### 是什么

一旦我们重启应用，sentinel规则将消失，生产环境需要将配置规则进行持久化。

### 怎么玩

将限流配置规则持久化进Nacos保存，只要刷新8401某个rest地址，sentinel控制台的流控规则就能看到，只要Nacos里面的配置不删除，针对8401上sentinel上的流控规则持续有效。





**修改cloudalibaba-sentinel-service8401**



### pom文件



```xml
<!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```





### yml文件



```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8888 #配置Sentinel dashboard地址
        # 默认8719端口，若被占用会从8719开启+1扫描，找到未被占用的端口
        port: 8719
      datasource: # 关注点，添加Nacos数据源配置
        ds1:
          nacos:
            server-addr: localhost:8848
            dataId: cloudalibaba-sentinel-service
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow

management:
  endpoints:
    web:
      exposure:
        include: '*'

feign:
  sentinel:
    enabled: true # 激活Sentinel对Feign的支持
```







### Nacos配置



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/3aac5d5ad01887c2d6e45b241a4d82cf.png)





**配置内容：**



```json
[
    {
        "resource": "/rateLimit/byUrl",
        "limitApp": "default",
        "grade": 1,
        "count": 1, 
        "strategy": 0,
        "controlBehavior": 0,
        "clusterMode": false
    }
]
```





**配置介绍：**

- resource：资源名称；
- limitApp：来源应用；
- grade：阈值类型，0表示线程数, 1表示QPS；
- count：单机阈值；
- strategy：流控模式，0表示直接，1表示关联，2表示链路；
- controlBehavior：流控效果，0表示快速失败，1表示Warm Up，2表示排队等待；
- clusterMode：是否集群。





### 启动测试



启动8401后刷新sentinel发现业务规则有了，实现了持久化！

快速访问测试接口 - http://localhost:8401/rateLimit/byUrl - 页面返回`Blocked by Sentinel (flow limiting)`









# 十四、Cloud Alibaba Seata





## 1、分布式事务问题





**分布式前**

- 单机单库没这个问题
- 从1:1 -> 1:N -> N:N

单体应用被拆分成微服务应用，原来的三个模块被拆分成三个独立的应用,分别使用三个独立的数据源，业务操作需要调用三三 个服务来完成。此时**每个服务内部的数据一致性由本地事务来保证， 但是全局的数据一致性问题没法保证**。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/4f27f6619433d712f6f51fcb29e3705c.png)



**一句话：一次业务操作需要跨多个数据源或需要跨多个系统进行远程调用，就会产生分布式事务问题。**





## 2、Seata简介



### 是什么

Seata是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

**官方网站：[http://seata.io/zh-cn/](http://seata.io/zh-cn/)**





### 能干嘛

一个典型的分布式事务过程：分布式事务处理过程的一ID+三组件模型。



**Transaction ID XID 全局唯一的事务ID**

**三组件概念**

- **TC** (Transaction Coordinator) - 事务协调者：维护全局和分支事务的状态，驱动全局事务提交或回滚。
- **TM** (Transaction Manager) - 事务管理器：定义全局事务的范围：开始全局事务、提交或回滚全局事务。
- **RM** (Resource Manager) - 资源管理器：管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。



**处理过程：**

- TM向TC申请开启一个全局事务，全局事务创建成功并生成一个全局唯一的XID；
- XID在微服务调用链路的上下文中传播；
- RM向TC注册分支事务，将其纳入XID对应全局事务的管辖；
- TM向TC发起针对XID的全局提交或回滚决议；
- TC调度XID下管辖的全部分支事务完成提交或回滚请求。





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/1c3332a3df9f31df446d5c642aab1d74.png)





### 去哪下

发布说明: https://github.com/seata/seata/releases



### 怎么玩

- 本地@Transactional（Spring）
- 全局@GlobalTransactional（SpringCloud）







### SEATA 的分布式交易解决方案

我们只需要使用一个 `@GlobalTransactional` 注解在业务方法上:



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/a9754cbe057e19fa85dbdbede35a76eb.png)







## 3、Seata Server安装





**官网地址 - http://seata.io/zh-cn/**

**下载版本 - 0.9.0**



```shell
wget https://ghproxy.com/https://github.com/seata/seata/releases/download/v0.9.0/seata-server-0.9.0.tar.gz

tar -zxvf seata-server-0.9.0.tar.gz


```



### 修改file.conf



在\seata-server-0.9.0\seata\conf目录里面

```shell
service {
    ##fsp_tx_group是自定义的
    vgroup_mapping.my.test.tx_group="fsp_tx_group" 
    default.grouplist = "127.0.0.1:8091"
    enableDegrade = false
    disable = false
    max.commitretry.timeout= "-1"
    max.ollbackretry.timeout= "-1"
}

## transaction log store
store {
	## store mode: file, db
	## 改成db
	mode = "db"
	
	## file store
	file {
		dir = "sessionStore"
		
		# branch session size, if exceeded first try compress lockkey, still exceeded throws exceptions
		max-branch-session-size = 16384
		# globe session size, if exceeded throws exceptions
		max-global-session-size = 512
		# file buffer size, if exceeded allocate new buffer
		file-write-buffer-cache-size = 16384
		# when recover batch read size
		session.reload.read_size= 100
		# async, sync
		flush-disk-mode = async
	}

	# database store
	db {
		## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp) etc.
		datasource = "dbcp"
		## mysql/oracle/h2/oceanbase etc.
		## 配置数据源
		db-type = "mysql"
		driver-class-name = "com.mysql.jdbc.Driver"
		url = "jdbc:mysql://127.0.0.1:3306/seata"
		user = "root"
		password = "你自己密码"
		min-conn= 1
		max-conn = 3
		global.table = "global_table"
		branch.table = "branch_table"
		lock-table = "lock_table"
		query-limit = 100
	}
}
```







### 建库建表



**建表 db_store.sql 在 \seata-server-0.9.0\seata\conf 目录里面**



```sql
-- the table to store GlobalSession data
DROP TABLE IF EXISTS `global_table`;
CREATE TABLE `global_table` (
  `xid` VARCHAR(128)  NOT NULL,
  `transaction_id` BIGINT,
  `status` TINYINT NOT NULL,
  `application_id` VARCHAR(32),
  `transaction_service_group` VARCHAR(32),
  `transaction_name` VARCHAR(128),
  `timeout` INT,
  `begin_time` BIGINT,
  `application_data` VARCHAR(2000),
  `gmt_create` DATETIME,
  `gmt_modified` DATETIME,
  PRIMARY KEY (`xid`),
  KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
  KEY `idx_transaction_id` (`transaction_id`)
);

-- the table to store BranchSession data
DROP TABLE IF EXISTS `branch_table`;
CREATE TABLE `branch_table` (
  `branch_id` BIGINT NOT NULL,
  `xid` VARCHAR(128) NOT NULL,
  `transaction_id` BIGINT ,
  `resource_group_id` VARCHAR(32),
  `resource_id` VARCHAR(256) ,
  `lock_key` VARCHAR(128) ,
  `branch_type` VARCHAR(8) ,
  `status` TINYINT,
  `client_id` VARCHAR(64),
  `application_data` VARCHAR(2000),
  `gmt_create` DATETIME,
  `gmt_modified` DATETIME,
  PRIMARY KEY (`branch_id`),
  KEY `idx_xid` (`xid`)
);

-- the table to store lock data
DROP TABLE IF EXISTS `lock_table`;
CREATE TABLE `lock_table` (
  `row_key` VARCHAR(128) NOT NULL,
  `xid` VARCHAR(96),
  `transaction_id` LONG ,
  `branch_id` LONG,
  `resource_id` VARCHAR(256) ,
  `table_name` VARCHAR(32) ,
  `pk` VARCHAR(36) ,
  `gmt_create` DATETIME ,
  `gmt_modified` DATETIME,
  PRIMARY KEY(`row_key`)
);
```





### 修改registry.conf

修改seata-server-0.9.0\seata\conf目录下的registry.conf配置文件

**指明注册中心为nacos，及修改nacos连接信息**

```shell
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  # 改用为nacos
  type = "nacos"

  nacos {
  	## 加端口号
    serverAddr = "localhost:8848"
    namespace = ""
    cluster = "default"
  }
  ...
}
```





### 测试启动



- 先启动Nacos端口号8848
- 再启动seata-server `./seata-server.sh`









## 4、数据库准备



**分布式事务业务说明**

这里我们会创建**三个服务**，一个订单服务，一个库存服务，一个账户服务。

当用户下单时,会在订单服务中创建一个订单, 然后通过远程调用库存服务来扣减下单商品的库存，再通过远程调用账户服务来扣减用户账户里面的余额，最后在订单服务中修改订单状态为已完成。

该操作跨越三个数据库，有两次远程调用，很明显会有分布式事务问题。

**一言蔽之，下订单—>扣库存—>减账户(余额)。**



**建库建表语句**



```sql
CREATE DATABASE seata_order;
CREATE DATABASE seata_storage;
CREATE DATABASE seata_account;

use seata_order;
# seata_order库下建t_order表
CREATE TABLE t_order (
    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
    `count` INT(11) DEFAULT NULL COMMENT '数量',
    `money` DECIMAL(11,0) DEFAULT NULL COMMENT '金额',
    `status` INT(1) DEFAULT NULL COMMENT '订单状态: 0:创建中; 1:已完结'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

SELECT * FROM t_order;

use seata_storage;
# seata_storage库下建t_storage表
CREATE TABLE t_storage (
`id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
`total` INT(11) DEFAULT NULL COMMENT '总库存',
`used` INT(11) DEFAULT NULL COMMENT '已用库存',
`residue` INT(11) DEFAULT NULL COMMENT '剩余库存'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO seata_storage.t_storage(`id`, `product_id`, `total`, `used`, `residue`)
VALUES ('1', '1', '100', '0','100');

SELECT * FROM t_storage;

use seata_account
# seata_account库下建t_account表
CREATE TABLE t_account(
	`id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
	`user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
	`total` DECIMAL(10,0) DEFAULT NULL COMMENT '总额度',
	`used` DECIMAL(10,0) DEFAULT NULL COMMENT '已用余额',
	`residue` DECIMAL(10,0) DEFAULT '0' COMMENT '剩余可用额度'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO seata_account.t_account(`id`, `user_id`, `total`, `used`, `residue`)
VALUES ('1', '1', '1000', '0', '1000');

SELECT * FROM t_account;
```





**按照上述3库分别建对应的回滚日志表**



- 订单-库存-账户3个库下**都需要建各自的回滚日志表**
- \seata-server-0.9.0\seata\conf目录下的db_ undo_ log.sql
- 建表SQL



```sql

-- the table to store seata xid data
-- 0.7.0+ add context
-- you must to init this sql for you business databese. the seata server not need it.
-- 此脚本必须初始化在你当前的业务数据库中，用于AT 模式XID记录。与server端无关（注>：业务数据库）
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
drop table `undo_log`;
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```







## 5、微服务准备







### 业务需求



**下订单 -> 减库存 -> 扣余额 -> 改（订单）状态**



### 订单模块

**新建Module seata-order-service2001**



**创建参考：[https://blog.csdn.net/u011863024/article/details/114298288#t34](https://blog.csdn.net/u011863024/article/details/114298288#t34)**



其中的142/143/144章节！



**又繁又杂！**



### 库存模块



**新建Module seata- storage - service2002**



**创建参考：[https://blog.csdn.net/u011863024/article/details/114298288#t37](https://blog.csdn.net/u011863024/article/details/114298288#t37)**













### 账户模块



**新建Module seata-account-service2003**



**创建参考：[https://blog.csdn.net/u011863024/article/details/114298288#t38](https://blog.csdn.net/u011863024/article/details/114298288#t38)**









## 6、业务测试





**下订单 -> 减库存 -> 扣余额 -> 改（订单）状态**





**数据库初始情况：**

![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/14a6368a8f33a4ca358390634920d23e.png)





**正常下单 - http://localhost:2001/order/create?userId=1&productId=1&count=10&money=100**



**数据库正常下单后状况：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/809358bd1ff14d45dc1aa57f16fa632f.png)



**超时异常，没加@GlobalTransactional**

模拟AccountServiceImpl添加超时



```java
@Service
public class AccountServiceImpl implements AccountService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountServiceImpl.class);


    @Resource
    AccountDao accountDao;

    /**
     * 扣减账户余额
     */
    @Override
    public void decrease(Long userId, BigDecimal money) {
        LOGGER.info("------->account-service中扣减账户余额开始");
        //模拟超时异常，全局事务回滚
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(20); } catch (InterruptedException e) { e.printStackTrace(); }
        accountDao.decrease(userId,money);
        LOGGER.info("------->account-service中扣减账户余额结束");
    }
}
```



另外，OpenFeign的调用默认时间是1s以内，所以最后会抛异常。

**数据库情况**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/e783baaa3b362c354511e7dd6539b41e.png)



**故障情况**

- 当库存和账户金额扣减后，订单状态并没有设置为已经完成，没有从零改为1
- 而且由于feign的重试机制，账户余额还有可能被多次扣减





**超时异常，加了@GlobalTransactional**

用@GlobalTransactional标注OrderServiceImpl的create()方法。



```java
@Service
@Slf4j
public class OrderServiceImpl implements OrderService {
    
    ...

    /**
     * 创建订单->调用库存服务扣减库存->调用账户服务扣减账户余额->修改订单状态
     * 简单说：下订单->扣库存->减余额->改状态
     */
    @Override
    //rollbackFor = Exception.class表示对任意异常都进行回滚
    @GlobalTransactional(name = "fsp-create-order",rollbackFor = Exception.class)
    public void create(Order order){
		...
    }
}
```



还是模拟AccountServiceImpl添加超时，下单后数据库数据并没有任何改变，记录都添加不进来，**达到出异常，数据库回滚的效果**。









## 7、Seata原理介绍





2019年1月份蚂蚁金服和阿里巴巴共同开源的分布式事务解决方案。

Simple Extensible Autonomous Transaction Architecture，简单可扩展自治事务框架。

2020起始，用1.0以后的版本。Alina Gingertail





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/1c3332a3df9f31df446d5c642aab1d74.png)



**简而言之：**

- TC：Seata服务器
- TM：事务的发起方
- RM：事务的参与方



**分布式事务的执行流程**

- TM开启分布式事务(TM向TC注册全局事务记录) ;
- 按业务场景，编排数据库、服务等事务内资源(RM向TC汇报资源准备状态) ;
- TM结束分布式事务，事务一阶段结束(TM通知TC提交/回滚分布式事务) ;
- TC汇总事务信息，决定分布式事务是提交还是回滚；
- TC通知所有RM提交/回滚资源，事务二阶段结束。





**AT模式如何做到对业务的无侵入**



[http://seata.io/zh-cn/docs/overview/what-is-seata.html](http://seata.io/zh-cn/docs/overview/what-is-seata.html)



**前提**

- 基于支持本地 ACID 事务的关系型数据库。
- Java 应用，通过 JDBC 访问数据库。

**整体机制**

**两阶段提交协议的演变：**

- 一阶段：业务数据和回滚日志记录在同一个本地事务中提交，释放本地锁和连接资源。
- 二阶段：
  - 提交异步化，非常快速地完成。
  - 回滚通过一阶段的回滚日志进行反向补偿。



**一阶段加载**

在一阶段，Seata会拦截“业务SQL”

- 解析SQL语义，找到“业务SQL" 要更新的业务数据，在业务数据被更新前，将其保存成"before image”
- 执行“业务SQL" 更新业务数据，在业务数据更新之后,
- 其保存成"after image”，最后生成行锁。

以上操作全部在一个数据库事务内完成, 这样保证了一阶段操作的原子性。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/388c12abce5a8c67ef3673c6f917ecfe.png)

**二阶段提交**

二阶段如果顺利提交的话，因为"业务SQL"在一阶段已经提交至数据库，所以Seata框架只需将一阶段保存的快照数据和行锁删掉，完成数据清理即可。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/e7471d2db0590f7303a170915d9c9564.png)

**二阶段回滚**

二阶段如果是回滚的话，Seata 就需要回滚一阶段已经执行的 “业务SQL"，还原业务数据。

回滚方式便是用"before image"还原业务数据；但在还原前要首先要校验脏写，对比“数据库当前业务数据”和"after image"。

如果两份数据完全一致就说明没有脏写， 可以还原业务数据，如果不一致就说明有脏写, 出现脏写就需要转人工处理。



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/e7471d2db0590f7303a170915d9c9564.png)









![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/278b336174336be0e2e9126cc42fb16c.png)







# 十五、SpringCloud组件总结





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/10/23/f827e1c3f3049ff58ee0d115784f2f4a.png)
