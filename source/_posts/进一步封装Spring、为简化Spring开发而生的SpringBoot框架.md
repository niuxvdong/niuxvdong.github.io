---
title: 进一步封装Spring、为简化Spring开发而生的SpringBoot框架
author: ITNXD
toc: true
abbrlink: 12809
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@a597bd7c2e1ea1f995776f0c08d7e835663009e4/2021/10/13/f4ee28a291f9feb683183e72ba34bb7a.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@a597bd7c2e1ea1f995776f0c08d7e835663009e4/2021/10/13/f4ee28a291f9feb683183e72ba34bb7a.png
categories:
  - 开发框架
tags:
  - SpringBoot
date: 2021-10-06 16:14:09
updated:
---



# 一、SpringBoot概述





## 1、能做什么





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@070a54f65a2cbae040ef9c87af1c25eae5b0ab93/2021/10/06/65eb698fde4c6ee99e6cd7cc114f4866.png)



### Spring能力



1. 微服务开发
2. 响应式编程（异步非阻塞）
3. 分布式云开发
4. web开发
5. 无服务开发（FAAS：函数级开发）
6. 事件驱动（使用数据流利用响应式编程）
7. 批处理开发

### Spring生态



1. web开发
2. 数据访问
3. 安全控制
4. 分布式
5. 消息服务
6. 移动开发
7. 批处理
8. .....



### Spring5升级



**响应式编程：占用少量线程，使用少量资源就可以处理大量的并发和需要的业务！**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@4eef956453523418391a3e9a52eb77a14586eb82/2021/10/06/1e165f8821bebc82c49e38f8951f93e6.png)





**内部源码设计：基于Java8的一些新特性，如：接口默认实现（适配器模式）。重新设计源码架构。**











## 2、为什么用





> **能快速创建出生产级别的Spring应用！**



### SpringBoot优点



> SpringBoot是整合Spring技术栈的一站式框架！
>
> SpringBoot是简化Spring技术栈的快速开发脚手架！



1. 创建独立Spring应用
2. 内嵌web服务器
3. 自动starter依赖，简化构建配置
4. 自动配置Spring以及第三方功能
5. 提供生产级别的监控、健康检查及外部化配置
6. 无代码生成、无需编写XML





### SpringBoot缺点





- 人称版本帝，迭代快，需要时刻关注变化
- 封装太深，内部原理复杂，不容易精通







## 3、时代背景





### 微服务



1. 微服务是一种架构风格
2. 一个应用拆分为一组小型服务
3. 每个服务运行在自己的进程内，也就是可独立部署和升级
4. 服务之间使用轻量级HTTP交互
5. 服务围绕业务功能拆分
6. 可以由全自动部署机制独立部署
7. 去中心化，服务自治。服务可以使用不同的语言、不同的存储技术



### 分布式



**分布式的困难：**



- 远程调用
- 服务发现

- 负载均衡
- 服务容错

- 配置管理
- 服务监控

- 链路追踪
- 日志管理

- 任务调度
- ......



**分布式问题解决： SpringBoot + SpringCloud**



### 云原生



**原生应用如何上云。 Cloud Native！**



**上云的困难：**

- 服务自愈
- 弹性伸缩

- 服务隔离
- 自动化部署

- 灰度发布
- 流量治理

- ......







## 4、SpringBoot特点





### 依赖管理



**父项目做依赖管理：几乎声明了所有开发中常用的依赖的版本号，自动版本仲裁机制**



```xml
依赖管理！
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.4.RELEASE</version>
</parent>

他的父项目中声明了所有可能会用到的包的版本信息！
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.3.4.RELEASE</version>
</parent>
```



**开发导入starter场景启动器**





- 有很多官方 `spring-boot-starter-*` 配置各种场景，`*-spring-boot-starter` 为第三方为我们提供的简化开发的场景启动器。
- 只要引入starter，这个场景的所有常规需要的依赖我们都自动引入
- SpringBoot所有支持的场景：[https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)
- 所有场景启动器最底层的依赖



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <version>2.3.4.RELEASE</version>
    <scope>compile</scope>
</dependency>
```



**可以修改默认版本号：**



- 查看spring-boot-dependencies里面规定当前依赖的版本用的 key。
- 在当前项目里面重写配置



```xml
<properties>
    <mysql.version>5.1.43</mysql.version>
</properties>
```





**无需关注版本号，自动版本仲裁**



- 引入依赖默认都可以不写版本
- 引入非版本仲裁的 jar ，要写版本号。





### 自动配置



- 自动配好Tomcat：引入Tomcat依赖，配置Tomcat
- 自动配好SpringMVC：引入SpringMVC全套组件，自动配好SpringMVC常用组件（功能）
- 自动配好Web常见功能：如：字符编码问题，
- SpringBoot帮我们配置好了所有web开发的常见场景



- 默认的包结构
  - 主程序所在包及其下面的所有子包里面的组件都会被默认扫描进来
  - 无需以前的包扫描配置
  - 改变扫描路径`@SpringBootApplication(scanBasePackages="com.itnxd")` 或者 `@ComponentScan` 指定扫描路径



- **各种配置拥有默认值**
  - 默认配置最终都是映射到某个类上
  - 配置文件的值最终会绑定每个类上，这个类会在容器中创建对象
- **按需加载所有自动配置项**
- **非常多的starter：引入了哪些场景这个场景的自动配置才会开启**
- SpringBoot所有的自动配置功能都在 **spring-boot-autoconfigure 包**里面




```java
// 指定包扫描（默认扫描的是主启动类同目录即子目录）
@SpringBootApplication(scanBasePackages = "com.itnxd")
// 或 
@ComponentScan("com.itnxd")

// 一个@SpringBootApplication等同于下面三个：
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
```









# 二、容器功能





## 1、组件添加



### @Configuration



> 指明是一个配置类！



1. 配置类里面使用@Bean标注在方法上给容器注册组件，**默认是单实例的**
2. 配置类本身也是组件
3. proxyBeanMethods：代理bean的方法，`@Configuration`的配置属性
   1. Full(`proxyBeanMethods = true`)：保证每个@Bean方法被调用多少次返回的组件都是单实例的。**去容器中找，慢，单实例，默认**
   2. Lite(`proxyBeanMethods = false`)：每个@Bean方法被调用多少次返回的组件都是新创建的。**新建一个，快，多实例**



**建议：**

组件依赖（一个组件依赖另一个组件如user依赖cat）必须使用Full模式默认（防止实例不统一）。其他默认是否Lite模式！

- 配置类组件之间无依赖关系，用Lite模式加速容器启动过程，减少判断
- 配置类组件之间有依赖关系，方法会被调用得到之前单实例组件，用Full模式



```java
@Configuration(proxyBeanMethods = true)
public class MyConfig {
    ...
}

// 获取IOC容器进行测试
@SpringBootApplication
public class HelloWorldApplication {

    public static void main(String[] args) {
        // 1. 返回我们的IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(HelloWorldApplication.class, args);
        // 2. 查看容器内的组件
        String[] beanDefinitionNames = run.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            System.out.println(beanDefinitionName);
        }

        // 3. 从容器中获取我们自己的Bean组件
        User user01 = run.getBean("user01", User.class);
        System.out.println(user01);
        MyConfig bean = run.getBean(MyConfig.class);
        System.out.println(bean);

        /*
        如果 @Configuration(proxyBeanMethods = true)
            就是代理对象调用代理方法！
         SpringBoot总会检查这个组件是否在容器中有。保持组件单实例
         */
        User user = bean.user01();
        User user1 = bean.user01();
        System.out.println(user == user1); // true

        // 组件依赖测试
        User user2 = bean.user01();
        System.out.println(user2.getCat() == bean.getCat()); // false
    }
}
```





### @Import



> 给容器中自动创建出这些个类型的组件（自动调用无参构造）、默认组件的名字就是全类名！



```java
@Import({User.class, DBHelper.class})
@Configuration(proxyBeanMethods = true)
public class MyConfig {
    ...
}
```





### @Bean

> 给容器添加组件！



- id：方法名

 *  组件类型：返回值类型
 *  IOC容器中对象：返回值





```java
/**
 * 给容器添加组件！
 *  id：方法名
 *  组件类型：返回值类型
 *  IOC容器中对象：返回值
 */
@Bean
public User user01(){
    User zs = new User("zs", 18);
    zs.setCat(getCat());
    return zs;
}
```









### @Conditional





> 条件装配：满足Conditional指定的条件，则进行组件注入！





有如下条件配置注解！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c5ddfed4b340d47f65d422c7046e8a4cbf42719a/2021/10/06/d130dc527896a28992051955b6a10843.png)





```java
@ConditionalOnBean(name = "tom")
@Configuration(proxyBeanMethods = true)
public class MyConfig {

    /**
     *  @ConditionalOnBean
     *  有tom这个Bean才会生效！
     *
     *  可以添加到类和方法上！
     */
    @ConditionalOnBean(name = "tom")
    @Bean
    public User user01(){
        User zs = new User("zs", 18);
        zs.setCat(getCat());
        return zs;
    }
    
	...
}
```







## 2、原生配置文件引入



- @ImportResource：导入旧项目的xml配置文件，任何类上都可以！





```java
// @ImportResource() ：导入旧项目的xml配置文件，任何类上都可以
@ImportResource("classpath:bean.xml")
@Configuration(proxyBeanMethods = true)
public class MyConfig {
    ...
}
```



## 3、配置绑定



> 如何使用Java读取到properties文件中的内容，并且把它封装到JavaBean中，以供随时使用！





### @ConfigurationProperties



**我们之前将配置文件绑定到JavaBean可以这样做：**



```java
public class getProperties {
     public static void main(String[] args) throws FileNotFoundException, IOException {
         Properties pps = new Properties();
         pps.load(new FileInputStream("a.properties"));
         Enumeration enum1 = pps.propertyNames();//得到配置文件的名字
         while(enum1.hasMoreElements()) {
             String strKey = (String) enum1.nextElement();
             String strValue = pps.getProperty(strKey);
             System.out.println(strKey + "=" + strValue);
             //封装到JavaBean。
         }
     }
 }
```



**使用注解@ConfigurationProperties：**



```java
@Component
// 将application.properties配置文件中的以prefix内容开头的配置注入到当前容器！
@ConfigurationProperties(prefix = "mycar")
public class Car {
    private String brand;
    private Integer price;
    ...
}
```



**properties配置文件：**

```properties
mycar.brand=BYD
mycar.price=100000
```





### 两种配置文件绑定方法



1. 实体类添加 `@Component 和 @ConfigurationProperties(prefix = "mycar")`
2. 启动类或配置类添加 `@EnableConfigurationProperties(Car.class)`，实体类添加 `@ConfigurationProperties(prefix = "mycar")`
   1. 第二种适合第三方类使用，毕竟我们不能直接添加@Component注解到该类！







# 三、自动配置原理



> 从分析@SpringBootApplication这个启动类注解入手！



```java
// @SpringBootApplication注解有下面三个注解组成

@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
    @Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication{}
```





## 1、@SpringBootConfiguration





```java
@Configuration
public @interface SpringBootConfiguration {}
```



@Configuration：代表当前是一个配置类







## 2、@ComponentScan



指定扫描哪些包，用来扫描注解！



```java
public @interface ComponentScan {
    @AliasFor("basePackages")
    String[] value() default {};

    @AliasFor("value")
    String[] basePackages() default {};
    
    ...
}
```





## 3、@EnableAutoConfiguration





**该注解由以下两个注解组成：**

```java
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    Class<?>[] exclude() default {};

    String[] excludeName() default {};
}
```



### @AutoConfigurationPackage



自动配置包，指定了默认的包规则！



```java
@Import({Registrar.class}) // 给容器中导入一个组件, 利用Registrar给容器中导入一系列组件
public @interface AutoConfigurationPackage {
    String[] basePackages() default {};

    Class<?>[] basePackageClasses() default {};
}


// Registrar.class
static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {
    Registrar() {
    }

    public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
        // 将指定的一个包下的所有组件导入进来？MainApplication 所在包下。
        AutoConfigurationPackages.register(registry, (String[])(new AutoConfigurationPackages.PackageImports(metadata)).getPackageNames().toArray(new String[0]));
    }

    public Set<Object> determineImports(AnnotationMetadata metadata) {
        return Collections.singleton(new AutoConfigurationPackages.PackageImports(metadata));
    }
}
//将指定的一个包下的所有组件导入进来？MainApplication 所在包下。
```









### @Import



```java
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class}) // 分析这个
public @interface EnableAutoConfiguration {
```





- 利用 `getAutoConfigurationEntry(annotationMetadata);`给容器中批量导入一些组件
- 调用`List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes)`获取到所有需要导入到容器中的配置类



```java
protected AutoConfigurationImportSelector.AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
    if (!this.isEnabled(annotationMetadata)) {
        return EMPTY_ENTRY;
    } else {
        AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
        List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
        configurations = this.removeDuplicates(configurations);
        Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
        this.checkExcludedClasses(configurations, exclusions);
        configurations.removeAll(exclusions);
        configurations = this.getConfigurationClassFilter().filter(configurations);
        this.fireAutoConfigurationImportEvents(configurations, exclusions);
        return new AutoConfigurationImportSelector.AutoConfigurationEntry(configurations, exclusions);
    }
}
```



**configurations有一百多个组件：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@58a232297854193984cf8a6b07b6a2af58dedbe0/2021/10/06/25fb6c3a05f9002b0332d3893f292354.png)





- 利用工厂加载 `Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader)`得到所有的组件
- 从`META-INF/spring.factories`位置来加载一个文件。 默认扫描我们当前系统里面所有`META-INF/spring.factories`位置的文件



```java
public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
    ClassLoader classLoaderToUse = classLoader;
    if (classLoader == null) {
        classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
    }

    String factoryTypeName = factoryType.getName();
    // 点进去
    return (List)loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}
```



到了这里：

```java
private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
    Map<String, List<String>> result = (Map)cache.get(classLoader);
    if (result != null) {
        return result;
    } else {
        HashMap result = new HashMap();

        try {
            // 从`META-INF/spring.factories`位置来加载一个文件。
            Enumeration urls = classLoader.getResources("META-INF/spring.factories");

            while(urls.hasMoreElements()) {
                URL url = (URL)urls.nextElement();
                UrlResource resource = new UrlResource(url);
                Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                Iterator var6 = properties.entrySet().iterator();

                while(var6.hasNext()) {
                    Entry<?, ?> entry = (Entry)var6.next();
                    String factoryTypeName = ((String)entry.getKey()).trim();
                    String[] factoryImplementationNames = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());
                    String[] var10 = factoryImplementationNames;
                    int var11 = factoryImplementationNames.length;

                    for(int var12 = 0; var12 < var11; ++var12) {
                        String factoryImplementationName = var10[var12];
                        ((List)result.computeIfAbsent(factoryTypeName, (key) -> {
                            return new ArrayList();
                        })).add(factoryImplementationName.trim());
                    }
                }
            }

            result.replaceAll((factoryType, implementations) -> {
                return (List)implementations.stream().distinct().collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
            });
            cache.put(classLoader, result);
            return result;
        } catch (IOException var14) {
            throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var14);
        }
    }
}
```



**spring.factories文件：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@b7d39fa224ed410fdffb23385bddf446ea8c65ef/2021/10/06/2c5db5b36ccc621210a24badc43e7fc5.png)





- `spring-boot-autoconfigure-2.3.4.RELEASE.jar` 包里面也有 `META-INF/spring.factories`
- **文件里面写死了 spring-boot 一启动就要给容器中加载的所有配置类**
- 目前最新版132个自动配置项



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d14eedd1c7511c79c95689337360b0851383a44f/2021/10/06/fb00fd4e010448ace612ed1f995e393f.png)









### 按需开启自动配置组件





虽然我们127个场景的所有自动配置启动的时候默认全部加载。

xxxxAutoConfiguration 按照条件装配规则（@Conditional），最终会按需配置。



**以aop包为例：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e1a222ec7f5ce4787bd15506fce409fa7c1c84cb/2021/10/06/dd174fbd8692652cb04aa847ace8f530.png)









### 修改默认配置



**SpringBoot 规范化命名例子：**



给容器中加入了文件上传解析器：

```java
@Bean
@ConditionalOnBean({MultipartResolver.class}) // 容器中有这个类型组件
@ConditionalOnMissingBean(
    name = {"multipartResolver"} // 容器中没有这个名字 multipartResolver 的组件
)
public MultipartResolver multipartResolver(MultipartResolver resolver) {
    // 给@Bean标注的方法传入了对象参数，这个参数的值就会从容器中找。
    // SpringMVC multipartResolver。防止有些用户配置的文件上传解析器不符合规范
    // Detect if the user has created a MultipartResolver but named it incorrectly
    return resolver;
}
```



**修改默认配置：**

SpringBoot默认会在底层配好所有的组件。但是如果用户自己配置了以用户的优先！

找到这些组件，默认就是方法名，因此我们可以在自己的配置类中添加如下即可：



```java
@Bean
public MultipartResolver multipartResolver() {
    // 写自己的逻辑
    return null;
}
```





### 总结



1. SpringBoot先加载所有的自动配置类  xxxxxAutoConfiguration
2. 每个自动配置类按照条件进行生效，默认都会绑定配置文件指定的值。**xxxxProperties**里面拿。xxxProperties和配置文件进行了绑定
3. 生效的配置类就会给容器中装配很多组件
4. 只要容器中有这些组件，相当于这些功能就有了
5. 定制化配置
   1. 用户直接自己@Bean替换底层的组件
   2. 用户去看这个组件是获取的配置文件什么值就去修改。





- 引入场景依赖：[https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter](https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter)
- 查看自动配置了哪些
  - 自己分析，引入场景对应的自动配置一般都生效了
  - **配置文件中debug=true开启自动配置报告**。Negative（不生效）\Positive（生效）
- 是否需要修改
  - 参照文档修改配置项：https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#common-application-properties
  - 自己分析。xxxxProperties绑定了配置文件的哪些。（详见下方图解）
- 自定义加入或者替换组件：@Bean





**xxxxxAutoConfiguration ---> 导入组件  ---> 从xxxxProperties里面拿值  ----> 去application.properties获取**





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2b76a558ef517d130608ba6ad5c7fe3758b51bef/2021/10/06/d0f3565fd7f85bb4a2149a3821d11124.png)









# 四、开发技巧

## 1、Lombok



> 可以简化 JavaBean 开发！同时包含了Slf4j日志框架！
>
> 似乎公司一般不使用，需要安装对应的Idea插件！（新版本以及默认安装）
>
> 最好的一点是改动JavaBean不用进行其他操作，自动完成！



### 依赖引入



```xml
<!--插件市场安装（默认已经安装）简化JavaBean与引入日志Slf4j-->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```





### 简化JavaBean



```java
@Component
@ConfigurationProperties(prefix = "mycar")
// lombok
@Data // getter和 setter方法 以及 equals方法和toString方法！
@ToString // 编译时候自动生成toString
@AllArgsConstructor // 全参构造器
@NoArgsConstructor // 无参构造器
@EqualsAndHashCode // Equals和HashCode方法
public class Car {

    private String brand;
    private Integer price;
}
```





### 简化日志Slf4j



```java
@Slf4j // 同样是lombok的
@RestController
public class HelloController {

    @Autowired
    Car car;

    @RequestMapping("/car")
    public Car car(){
        // 可以使用{}进行占位的，逗号后添加变量或常量！
        log.info("请求来了....");
        return car;
    }

}
```









## 2、Dev-tools



> 可以用来热更新，但有时还不如直接重启！



底层有两个类加载器。一个复制加载第三方库，一个负贵加载本地java库。

第三方库是不会变的，也就是重就启动只需要加载本地java类即可，节省了重启时间！



快捷键 `CTRL + F9`：**文件有变化时候才会生效**



```xml
<!--
开发工具-快速重启

快捷键CTRL + F9：文件有变化时候才会生效

底层有两个类加载器。一个复制加载第三方库，一个负贵加载本地java库
第三方库是不会变的，也就是重就启动只需要加载本地java类即可，节省了重启时间

https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools.restart

可以使用官方推荐的付费插件 ：jrebel https://www.jrebel.com/products/jrebel
-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```



## 3、Spring Initailizr



> Idea提供的快速构建SpringBoot项目初始化向导！



可以根据选择自动引入各种开发场景的starter包，以及一些其他工具等等！





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e19d007d254720a7d8dcd6d6ea184f7cffe75d96/2021/10/06/d6bf94dc7313fd25b5479a840f776260.png)









# 五、配置文件





> 分为properties和两种配置文件！



## 1、配置文件分类



- properties：略
- yaml：下方介绍







## 2、yaml





### 简介



YAML 是 "YAML Ain't Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。 



**非常适合用来做以数据为中心的配置文件！**



### 基本语法

- key: value；kv之间有空格
- 大小写敏感

- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格（**idea忽略，自动替换为空格，也可用CTRL + ALT + L自动格式化**）

- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释
- 字符串无需加引号，如果要加，''与""表示字符串内容 会被 转义/不转义



### 数据类型





**字面量：单个的、不可再分的值。date、boolean、string、number、null**



```yaml
k: v
```



**对象：键值对的集合。map、hash、set、object** 



```yaml
# 行内写法：  
k: {k1: v1,k2: v2,k3: v3}
# 或
k: 
  k1: v1
  k2: v2
  k3: v3
```



**数组：一组按次序排列的值。array、list、queue**



```yaml
# 行内写法：  
k: [v1,v2,v3]
# 或者
k:
 - v1
 - v2
 - v3
```





### 案例



**JavaBean：**



```java
@Data
@ToString
@Component
@ConfigurationProperties(prefix = "person")
public class Person {
  
  private String userName;
  private Boolean boss;
  private Date birth;
  private Integer age;
  private Pet pet;
  private String[] interests;
  private List<String> animal;
  private Map<String, Object> score;
  private Set<Double> salarys;
  private Map<String, List<Pet>> allPets;
}

@Data
@ToString
public class Pet {
  private String name;
  private Double weight;
}
```





**yaml文件：**



```yaml
# 使用IDEA快捷键一键格式化防止出错：CTRL + ALT + L
# properties配置优先级更高！

person:
  userName: zs
  # "zhang \n san" 字符串单引号作为字符串输出，双引号作为换行符输出
  # 单引号不触发转义，双引号触发转义...（不重要）
  boss: true
  birth: 2021/10/6
  age: 18
  #  interests: [篮球,足球]
  interests:
    - 篮球
    - 足球
    - 18
  animal: [ 猫,狗 ]
  #  score:
  #    english: 80
  #    math: 90
  score: { english: 80, math: 90 }
  salarys:
    - 9999.89
    - 8832.22
  pet:
    name: 狗狗
    weight: 99
  allPets:
    sick:
      - { name: 狗, weight: 99 }
      - name: 猫
        weight: 98
    health:
      - { name: 狗, weight: 99 }
```





## 3、配置提示



自定义的类和配置文件绑定一般没有提示，可以添加如下包就会由一些友好的提示！



**依赖导入**



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <!--lombok不进行打包-->
                    <exclude>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </exclude>
                    <!--yml配置提示 不进行打包-->
                    <exclude>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>  
```









# 六、Web开发







## 1、SpringMVC自动配置概览





> **大多场景我们都无需自定义配置！**



1. 内容协商视图解析器和BeanName视图解析器
2. 静态资源（包括webjars）
3. 自动注册 Converter，GenericConverter，Formatter 
4. 支持 HttpMessageConverters （后来我们配合内容协商理解原理）
5. 自动注册 MessageCodesResolver （国际化用）
6. 静态index.html 页支持
7. 自定义 Favicon  
8. 自动使用 ConfigurableWebBindingInitializer ，（DataBinder负责将请求数据绑定到JavaBean上）



- 不用@EnableWebMvc注解。使用 `@Configuration` + `WebMvcConfigurer` 自定义规则

- 声明 `WebMvcRegistrations` 改变默认底层组件
- 使用 `@EnableWebMvc+@Configuration+DelegatingWebMvcConfiguration 全面接管SpringMVC`





## 2、简单功能分析





### 静态资源访问



只要静态资源放在类路径下： `/static` or `/public` or `/resources` or `/META-INF/resources`



访问 ： 当前项目根路径/ + 静态资源名 

原理： 静态映射/**。

请求进来，先去找Controller看能不能处理。不能处理的所有请求又都交给静态资源处理器。静态资源也找不到则响应404页面！





**改变默认的静态资源路径和前缀：**



默认无前缀！



```yaml
spring:
  mvc:
    # 静态资源访问前缀 当前项目 + static-path-pattern + 静态资源名 = 静态资源文件夹下找
    # 配置了欢迎页，要关闭前缀访问，否则无法直达欢迎页，导致欢迎页也得加前缀！
    static-path-pattern: /res/**
  # 静态资源路径，下方配置已过期
#  resources:
#    static-locations: classpath:/haha/
  # 新版为如下，若修改后不生效，可以mvn clean一下，
  # 实测指定静态资源文件夹后，META-INF/resources目录仍可以访问
  web:
    resources:
      static-locations: classpath:/haha/
```





### webjar

> 即将一些第三方其他包打包成了jar供我们导入！





官网：[https://www.webjars.org/](https://www.webjars.org/)

自动映射 `/webjars/**`



```xml
<!--
    webjars支持
    地址：http://localhost:8080/webjars/jquery/3.6.0/jquery.js
	后面地址要按照依赖里面的包路径
    自动映射/webjars/**
    -->
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>jquery</artifactId>
    <version>3.6.0</version>
</dependency>
```









### 欢迎页支持



> 即默认的index页面！



- 静态资源路径下  index.html
  - 可以配置静态资源路径
  - 但是不可以配置静态资源的访问前缀。否则导致 index.html不能被默认访问





### 自定义 Favicon



favicon.ico：放在静态资源目录下即可。



注意：同样配置静态资源访问前缀会导致失效！无法生效重启项目或rebuild项目并强制刷新浏览器！



### 静态资源配置原理







- 1、SpringBoot启动默认加载  xxxAutoConfiguration 类（自动配置类）
- 2、SpringMVC功能的自动配置类 WebMvcAutoConfiguration，生效





```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class,
		ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration {}
```





- 3、给容器中配了什么。
  - 配置文件的相关属性和xxx进行了绑定。WebMvcProperties，**spring.mvc**、ResourceProperties，**spring.resources**
  - 配置类只有一个有参构造器



```java
@Configuration(proxyBeanMethods = false)
@Import(EnableWebMvcConfiguration.class)
//  绑定配置文件
@EnableConfigurationProperties({ WebMvcProperties.class, ResourceProperties.class })
@Order(0)
public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer {}


// 配置类只有一个有参构造器

//有参构造器所有参数的值都会从容器中确定
//ResourceProperties resourceProperties；获取和spring.resources绑定的所有的值的对象
//WebMvcProperties mvcProperties 获取和spring.mvc绑定的所有的值的对象
//ListableBeanFactory beanFactory Spring的beanFactory
//HttpMessageConverters 找到所有的HttpMessageConverters
//ResourceHandlerRegistrationCustomizer 找到 资源处理器的自定义器。=========
//DispatcherServletPath  
//ServletRegistrationBean   给应用注册Servlet、Filter....
public WebMvcAutoConfigurationAdapter(ResourceProperties resourceProperties, WebMvcProperties mvcProperties,
                                      ListableBeanFactory beanFactory, ObjectProvider<HttpMessageConverters> messageConvertersProvider,
                                      ObjectProvider<ResourceHandlerRegistrationCustomizer> resourceHandlerRegistrationCustomizerProvider,
                                      ObjectProvider<DispatcherServletPath> dispatcherServletPath,
                                      ObjectProvider<ServletRegistrationBean<?>> servletRegistrations) {
    this.resourceProperties = resourceProperties;
    this.mvcProperties = mvcProperties;
    this.beanFactory = beanFactory;
    this.messageConvertersProvider = messageConvertersProvider;
    this.resourceHandlerRegistrationCustomizer = resourceHandlerRegistrationCustomizerProvider.getIfAvailable();
    this.dispatcherServletPath = dispatcherServletPath;
    this.servletRegistrations = servletRegistrations;
}
```



- 4、资源处理的默认规则





```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // spring.web.resources.add-mappings设置为false将会导致静态资源配置全部不生效，即静态资源全部无法访问
    if (!this.resourceProperties.isAddMappings()) {
        logger.debug("Default resource handling disabled");
        return;
    }
    Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
    CacheControl cacheControl = this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl();
    //webjars的规则
    if (!registry.hasMappingForPattern("/webjars/**")) {
        customizeResourceHandlerRegistration(registry.addResourceHandler("/webjars/**")
                                             .addResourceLocations("classpath:/META-INF/resources/webjars/")
                                             .setCachePeriod(getSeconds(cachePeriod)).setCacheControl(cacheControl));
    }

    // 其他静态文件 this.resourceProperties.getStaticLocations() 里有默认路径值
    String staticPathPattern = this.mvcProperties.getStaticPathPattern();
    if (!registry.hasMappingForPattern(staticPathPattern)) {
        customizeResourceHandlerRegistration(registry.addResourceHandler(staticPathPattern)
                                             .addResourceLocations(getResourceLocations(this.resourceProperties.getStaticLocations()))
                                             .setCachePeriod(getSeconds(cachePeriod)).setCacheControl(cacheControl));
    }
}
```



**对应配置：**



```yaml
spring:
  web:
    resources:
      static-locations: classpath:/haha/
      add-mappings: true # 是否禁用静态资源的全部配置，true不禁用
```



- 5、这里的 `this.resourceProperties.getStaticLocations())` 默认静态资源路径值

```java
@ConfigurationProperties(prefix = "spring.resources", ignoreUnknownFields = false)
public class ResourceProperties {

    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
                                                                  "classpath:/resources/", "classpath:/static/", "classpath:/public/" };

    /**
	 * Locations of static resources. Defaults to classpath:[/META-INF/resources/,
	 * /resources/, /static/, /public/].
	 */
    private String[] staticLocations = CLASSPATH_RESOURCE_LOCATIONS;
```



- 6、欢迎页面处理规则



```java
// HandlerMapping：处理器映射。保存了每一个Handler能处理哪些请求。  

    @Bean
    public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext,
                                                               FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
    WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(
        new TemplateAvailabilityProviders(applicationContext), applicationContext, getWelcomePage(),
        this.mvcProperties.getStaticPathPattern());
    welcomePageHandlerMapping.setInterceptors(getInterceptors(mvcConversionService, mvcResourceUrlProvider));
    welcomePageHandlerMapping.setCorsConfigurations(getCorsConfigurations());
    return welcomePageHandlerMapping;
}

WelcomePageHandlerMapping(TemplateAvailabilityProviders templateAvailabilityProviders,
                          ApplicationContext applicationContext, Optional<Resource> welcomePage, String staticPathPattern) {
    if (welcomePage.isPresent() && "/**".equals(staticPathPattern)) {
        //要用欢迎页功能，必须是/**
        logger.info("Adding welcome page: " + welcomePage.get());
        setRootViewName("forward:index.html");
    }
    else if (welcomeTemplateExists(templateAvailabilityProviders, applicationContext)) {
        // 调用Controller  /index
        logger.info("Adding welcome page template: index");
        setRootViewName("index");
    }
}
```









## 3、请求参数处理





### 请求映射



#### REST原理



**原理（表单提交要使用REST的时候）：**

- 表单提交会带上`_method=PUT`
- 请求过来被`HiddenHttpMethodFilter`拦截
  - 请求是否正常，并且是POST
    - 获取到`_method`的值。
    - 兼容以下请求；`PUT.DELETE.PATCH`
    - 原生request（post），**包装模式requesWrapper重写了getMethod方法，返回的是传入的值**。
    - **过滤器链放行的时候用wrapper。以后的方法调用getMethod是调用requesWrapper的。**
- Rest使用客户端工具，如PostMan直接发送Put、delete等方式请求，无需Filter，不会经过Filter过滤！还是因为表单不支持put，delete请求才进行包装重写！



**rest风格手动开启：**

```yaml
spring:
  mvc:
    # 开启rest风格发送delete和put请求
    hiddenmethod:
      filter:
        enabled: true # 默认false
```





**SpringBoot的一批新的注解：**



```java
@RestController
public class HelloController {

    /**
     * 处理顺序：动态请求 -> META-INF/resource -> resource -> static -> public
     * @return
     */
    @RequestMapping("/mn.jpg")
    public String hello(){
        return "aaa";
    }

//    @RequestMapping(value = "/user",method = RequestMethod.GET)
    @GetMapping("/user")
    public String getUser(){
        return "GET-张三";
    }

//    @RequestMapping(value = "/user",method = RequestMethod.POST)
    @PostMapping("/user")
    public String saveUser(){
        return "POST-张三";
    }


//    @RequestMapping(value = "/user",method = RequestMethod.PUT)
    @PutMapping("/user")
    public String putUser(){
        return "PUT-张三";
    }

//    @RequestMapping(value = "/user",method = RequestMethod.DELETE)
    @DeleteMapping("/user")
    public String deleteUser(){
        return "DELETE-张三";
    }
}
```



**修改默认的_method参数名称：**

1. 使用@Bean 注入 WebMvcConfigurer
2. 直接实现WebMvcConfigurer接口即可



```java
@Configuration(proxyBeanMethods = false)
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public HiddenHttpMethodFilter hiddenHttpMethodFilter(){
        HiddenHttpMethodFilter methodFilter = new HiddenHttpMethodFilter();
        // 修改默认的_method参数名！
        methodFilter.setMethodParam("_m");
        return methodFilter;
    }
}
```





#### 请求映射原理





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@6b35b8ebdb3c465d8e5ced40a7a7289cbf1a0951/2021/10/11/8cca2ed66bbba4ff1a11520617195442.png)

**SpringMVC功能分析都从 org.springframework.web.servlet.DispatcherServlet ->doDispatch()**



```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null;
    boolean multipartRequestParsed = false;

    WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);

    try {
        ModelAndView mv = null;
        Exception dispatchException = null;

        try {
            processedRequest = checkMultipart(request);
            multipartRequestParsed = (processedRequest != request);

            // 找到当前请求使用哪个Handler（Controller的方法）处理
            mappedHandler = getHandler(processedRequest);

            //HandlerMapping：处理器映射。/xxx->>xxxx
```





**getHandler()方法的handlerMappings处理器映射：**



所有的请求映射都在HandlerMapping中：

- SpringBoot自动配置欢迎页的 `WelcomePageHandlerMapping` 。访问 `/`能访问到index.html；
- SpringBoot自动配置了默认的 `RequestMappingHandlerMapping`
- 请求进来，挨个尝试所有的HandlerMapping看是否有请求信息。
  - 如果有就找到这个请求对应的 handler
  - 如果没有就是下一个 HandlerMapping







![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@cec8117ceca031738d134b74945b7153c49fb34d/2021/10/11/d5badd0222c88c887ffa1f31d861fc5d.png)





**RequestMappingHandlerMapping：保存了所有@RequestMapping 和handler的映射规则。**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@475512060b2c7fac6297ca81ca72057da2c00de2/2021/10/11/22bb1f8063e993e558d2144ecc0ea81e.png)



我们需要一些自定义的映射处理，我们也可以自己给容器中放**HandlerMapping**。自定义 **HandlerMapping**







### 普通参数与基本注解







#### 注解



- @PathVariable：路径参数获取，或使用`Map<String, String>`
- @RequestHeader：请求头参数获取，或使用`Map<String, String>, MultiValueMap<String, String>, or HttpHeaders`
- @RequestParam：请求参数获取，或使用`Map<String, String> or MultiValueMap<String, String>`
- @RequestBody：请求体获取（**post请求才有请求体，表单提交**）

- @CookieValue：cookie获取





```java
@RestController
public class ParameterController {

    /**
     * 路径参数获取！
     * 请求头参数获取！
     *
     *  Map<String, String> mp：将路径参数全部保存到该map，类型必须为String,String类型
     * 	其他的map类似，规定好了的，多参数直接自动封装为map！
     */
    @GetMapping("/car/{id}/owner/{username}")
    public Map<String, Object> getCar(@PathVariable Integer id,
                                      @PathVariable String username,
                                      @PathVariable Map<String, String> mp,
                                      // 请求头参数获取
                                      @RequestHeader("User-Agent") String userAgent,
                                      @RequestHeader Map<String, String> header,
                                      // 请求参数获取 Map<String, String> or MultiValueMap<String, String>
                                      @RequestParam("age") Integer age,
                                      @RequestParam("inters") List<String> inters,
                                      @RequestParam Map<String, String> params
                                      // cookie获取
                                      // @CookieValue("_ga") String _ga,
                                      //@CookieValue Cookie cookie,
                                      ){
        HashMap<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("username", username);
        map.put("mp", mp);
        map.put("UA", userAgent);
        map.put("header", header);
        map.put("age", age);
        map.put("inters", inters);
        map.put("params", params);
        // 谷歌浏览器测试没有Cookie，可以set进去在测试
        // map.put("_ga", _ga);
        // map.put("cookie", cookie);
        return map;
    }

    /**
     * 请求体获取！
     * 获取表单的post提交信息！
     */
    @PostMapping("/save")
    public Map<String, Object> postMethod(@RequestBody String content){
        HashMap<String, Object> map = new HashMap<>();

        map.put("content", content);
        return map;
    }
}
```





- @RequestAttribute：获取请求域参数，也可以`HttpServletRequest`



```java
@Controller
public class RequestController {

    @GetMapping("/goto")
    public String goToPage(HttpServletRequest request){
        request.setAttribute("msg", "成功了...");
        request.setAttribute("code", 200);
        return "forward:/success";
    }

    /**
     *
     *  获取request域中数据！
     */
    @ResponseBody
    @GetMapping("/success")
    public Map<String, Object> success(@RequestAttribute(value = "msg", required = false) String msg,
                                       @RequestAttribute(value = "code", required = false) Integer code,
                                       // 同一次请求可以直接调用request对象
                                       HttpServletRequest request){

        Map<String, Object> map = new HashMap<>();
        Object attribute = request.getAttribute("msg");

        map.put("msg", msg);
        map.put("code", code);
        map.put("request", attribute);


        // 又一次测试
        map.put("map", request.getAttribute("map"));
        map.put("model", request.getAttribute("model"));
        map.put("request", request.getAttribute("request"));


        return map;
    }
}
```



- @MatrixVariable：矩阵变量参数获取



1、语法： 请求路径：`/cars/sell;low=34;brand=byd,audi,yd`

2、SpringBoot 默认是禁用了矩阵变量的功能

 *      手动开启：原理。对于路径的处理是UrlPathHelper进行解析。
 *              removeSemicolonContent（移除分号内容）支持矩阵变量的，默认是true，需要改为true进行支持！

3、矩阵变量必须有url路径变量才能被解析，即矩阵变量在url中要`{}`括起来





**手动开启矩阵变量功能：**





```java
@Configuration(proxyBeanMethods = false)
public class WebConfig implements WebMvcConfigurer {

    // 1. @Bean 一个 WebMvcConfigurer
    // 2. 直接实现WebMvcConfigurer接口后重写方法即可


    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        UrlPathHelper urlPathHelper = new UrlPathHelper();
        // 设置不移除分号后面内容，矩阵变量才可以生效！
        urlPathHelper.setRemoveSemicolonContent(false);
        configurer.setUrlPathHelper(urlPathHelper);
    }
    
    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void configurePathMatch(PathMatchConfigurer configurer) {
                UrlPathHelper urlPathHelper = new UrlPathHelper();
                // 设置不移除分号后面内容，矩阵变量才可以生效！
                urlPathHelper.setRemoveSemicolonContent(false);
                configurer.setUrlPathHelper(urlPathHelper);
            }
        };
    }
}
```



**测试：**

```java
/**
 * /cars/sell;low=34;brand=byd,audi,yd  ；矩阵变量
 *
 * 问题：页面开发，cookie禁用了，session里面的内容怎么使用；
 * 		session.set(a,b)---> jsessionid ---> cookie ----> 每次发请求携带。
 * 		url重写：/abc;jsesssionid=xxxx 把cookie的值使用矩阵变量的方式进行传递.
 * 
 * /cars/sell;low=34;brand=byd,audi,yd
 */
@ResponseBody
@GetMapping("/cars/{path}")
public Map<String, Object> carsSell(@MatrixVariable("low") Integer low,
                                    @MatrixVariable("brand") List<String> brand,
                                    @PathVariable("path") String path){
    Map<String, Object> map = new HashMap<>();

    map.put("low", low);
    map.put("brand", brand);
    map.put("path", path);
    return map;
}

// 可以使用pathVar指定哪个路径的相同参数！
// /boss/1;age=20/2;age=10
@ResponseBody
@GetMapping("/boss/{bossId}/{empId}")
public Map boss(@MatrixVariable(value = "age",pathVar = "bossId") Integer bossAge,
                @MatrixVariable(value = "age",pathVar = "empId") Integer empAge){
    Map<String,Object> map = new HashMap<>();

    map.put("bossAge",bossAge);
    map.put("empAge",empAge);
    return map;

}
```







#### Servlet API



**ServletRequestMethodArgumentResolver 来解析以下的部分参数：**

```
WebRequest、ServletRequest、MultipartRequest、 HttpSession、javax.servlet.http.PushBuilder、Principal、InputStream、Reader、HttpMethod、Locale、TimeZone、ZoneId
```





#### 复杂参数



> **Map**、**Model（map、model里面的数据会被放在request的请求域  request.setAttribute）、**Errors/BindingResult、**RedirectAttributes（ 重定向携带数据）**、**ServletResponse（response）**、SessionStatus、UriComponentsBuilder、ServletUriComponentsBuilder







#### 自定义对象参数



可以自动类型转换与格式化，可以级联封装！



```java
/**
 *     姓名： <input name="userName"/> <br/>
 *     年龄： <input name="age"/> <br/>
 *     生日： <input name="birth"/> <br/>
 *     宠物姓名：<input name="pet.name"/><br/>
 *     宠物年龄：<input name="pet.age"/>
 */
@Data
public class Person {
    
    private String userName;
    private Integer age;
    private Date birth;
    private Pet pet;
    
}

@Data
public class Pet {

    private String name;
    private String age;

}
```





### POJO封装过程

ServletModelAttributeMethodProcessor来解析参数！



### 参数处理原理





- HandlerMapping中找到能处理请求的Handler（Controller.method()）

- 为当前Handler 找一个适配器 HandlerAdapter； **RequestMappingHandlerAdapter**

- 适配器执行目标方法并确定方法参数的每一个值



- **1、HandlerAdapter**
  - 支持方法上标注@RequestMapping 
  - 支持函数式编程的等等



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@15c74bc21dd01ebfd0f2ee20be1e894c24f4cd82/2021/10/11/ef03fb15f5c7380a241c11a435287243.png)





- **2、执行目标方法**



```java
// Actually invoke the handler.
//DispatcherServlet -- doDispatch
mv = ha.handle(processedRequest, response, mappedHandler.getHandler());



mav = invokeHandlerMethod(request, response, handlerMethod); //执行目标方法


//ServletInvocableHandlerMethod 执行当前请求，会调用controller中的对应方法
Object returnValue = invokeForRequest(webRequest, mavContainer, providedArgs);
```





- **3、参数解析器-HandlerMethodArgumentResolver**
  - 确定将要执行的目标方法的每一个参数的值是什么;
  - SpringMVC目标方法能写多少种参数类型。取决于参数解析器。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@88c9d39faaed2eedbf40994e339047ea76298e44/2021/10/11/29271034c9ae0e77eb06ddfb54565dce.png)





- 当前解析器是否支持解析这种参数
- 支持就调用 resolveArgument



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2c723527870166a2072dba7b6809a14cf2ad94fe/2021/10/11/79460da51895f8cedf0c38f8cd132994.png)







- **4、返回值处理器**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@867deb127af530101f4a0cb92e2b5e4af739e894/2021/10/11/6fa478f1b0d1cc8f2dbd9f04b345cc48.png)



- **5、如何确定目标方法每一个参数的值**





```java
//获取方法的参数值
Object[] args = getMethodArgumentValues(request, mavContainer, providedArgs);
```





- **5.1、挨个判断所有参数解析器哪个支持解析这个参数**

- **5.2、解析这个参数的值**
  - 调用各自 `HandlerMethodArgumentResolver` 的 `resolveArgument` 方法即可

- **5.3、自定义类型参数封装POJO**
  - 这个参数处理器支持
  - 是否为简单类型。



````java
WebDataBinder binder = binderFactory.createBinder(webRequest, attribute, name);
````

- WebDataBinder：web数据绑定器，将请求参数的值绑定到指定的JavaBean里面
- WebDataBinder：利用它里面的 Converters 将请求数据转成指定的数据类型。再次封装到JavaBean中
- GenericConversionService：在设置每一个值的时候，找它里面的所有converter那个可以将这个数据类型（request带来参数的字符串）转换到指定的类型（JavaBean -- Integer）
- **未来我们可以给WebDataBinder里面放自己的Converter；**





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5f1084d1ebf5f0431a625dd2c4900e3b4d393d1f/2021/10/11/a8f341a19125c1df86bb2fb2b8f96dbc.png)





- **5.4、自定义 Converter**



```java
@Configuration(proxyBeanMethods = false)
public class WebConfig implements WebMvcConfigurer {

    // 1. @Bean // WebMvcConfigurer
    // 2. 直接实现WebMvcConfigurer接口即可

    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            // 重写一个 自定义 converter
            @Override
            public void addFormatters(FormatterRegistry registry) {
                registry.addConverter(new Converter<String, Pet>() {

                    @Override
                    public Pet convert(String source) {
                        if(!StringUtils.isEmpty(source)){
                            Pet pet = new Pet();
                            String[] split = source.split(",");
                            pet.setName(split[0]);
                            pet.setAge(Integer.parseInt(split[1]));
                            return pet;
                        }
                        return null;
                    }
                });
            }
        }
    }
}
```





- **6、目标方法执行完成**
  - 将所有的数据都放在 **ModelAndViewContainer**；包含要去的页面地址View。还包含Model数据。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f6a9ecdd692c3e1969fd4a28b10ccd5a31982597/2021/10/11/79c81cc12f49e78ecd76b3f8c4ab34bf.png)





- **7、处理派发结果**



```java
processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
renderMergedOutputModel(mergedModel, getRequestToExpose(request), response);
// 暴露模型作为请求域属性
// Expose the model object as request attributes.
exposeModelAsRequestAttributes(model, request);

protected void exposeModelAsRequestAttributes(Map<String, Object> model,
                                              HttpServletRequest request) throws Exception {

    //model中的所有数据遍历挨个放在请求域中
    model.forEach((name, value) -> {
        if (value != null) {
            request.setAttribute(name, value);
        }
        else {
            request.removeAttribute(name);
        }
    });
}
```









## 4、数据响应与内容协商





### 响应JSON



#### jackson.jar+@ResponseBody



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

web场景自动引入了json场景
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-json</artifactId>
    <version>2.3.4.RELEASE</version>
    <scope>compile</scope>
</dependency>
```





### 返回值解析器原理



- 返回值处理器判断是否支持这种类型返回值 supportsReturnType
- 返回值处理器调用 handleReturnValue 进行处理
- RequestResponseBodyMethodProcessor 可以处理返回值标了@ResponseBody 注解的。
  - 利用 MessageConverters 进行处理将数据写为json
    - **内容协商**（浏览器默认会以请求头的方式告诉服务器他能接受什么样的内容类型）
    - 服务器最终根据自己自身的能力，决定服务器能生产出什么样内容类型的数据，
    - SpringMVC会挨个遍历所有容器底层的 HttpMessageConverter ，看谁能处理？
      - 得到MappingJackson2HttpMessageConverter可以将对象写为json
      - 利用MappingJackson2HttpMessageConverter将对象转为json再写出去。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@a372e301c116846f1e7f17e86ef9007ff4b8e7f7/2021/10/11/be510f7c44ea2be159f2edab440e8099.png)





### SpringMVC支持的返回值





```
ModelAndView
Model
View
ResponseEntity 
ResponseBodyEmitter
StreamingResponseBody
HttpEntity
HttpHeaders
Callable
DeferredResult
ListenableFuture
CompletionStage
WebAsyncTask
有 @ModelAttribute 且为对象类型的
@ResponseBody 注解 ---> RequestResponseBodyMethodProcessor
```





### HTTPMessageConverter原理



#### MessageConverter规范



HttpMessageConverter: 看是否支持将此 Class类型的对象，转为MediaType类型的数据。



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c6ecb86479bc98fd6465630a6a8f9fddfd2770c3/2021/10/11/3b87214940a1331d9259c6c189c704a2.png)

#### 默认的MessageConverter

最终 `MappingJackson2HttpMessageConverter`  把对象转为JSON（利用底层的jackson的objectMapper转换的）

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@fb5e5213706a29b0b6749a01f750e34e0037d07e/2021/10/11/ad48ee43f3360d1c895ae2c489902254.png)





### 内容协商

> 根据客户端接收能力不同，返回不同媒体类型的数据。





#### 引入xml依赖



```xml
<!--支持内容协商 jackson 支持 xml模块 -->
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
</dependency>
```



#### postman分别测试返回json和xml

只需要改变请求头中Accept字段。Http协议中规定的，告诉服务器本客户端可以接收的数据类型！

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@eaf0b9c6d3875e3caccfad11bc4fb89e72c0a50c/2021/10/11/c3466f78461255e24bbcb7798b72c1ad.png)





#### 开启浏览器参数方式内容协商功能



```yaml
spring:
    contentnegotiation:
      favor-parameter: true  #开启请求参数内容协商模式
```



**发请求：**

-  `http://localhost:8080/test/person?format=json`
- `http://localhost:8080/test/person?format=xml`



#### 内容协商原理





- 1、判断当前响应头中是否已经有确定的媒体类型。MediaType
- **2、获取客户端（PostMan、浏览器）支持接收的内容类型。获取客户端Accept请求头字段 application/xml**
  - contentNegotiationManager 内容协商管理器 默认使用基于请求头的策略
  - HeaderContentNegotiationStrategy  确定客户端可以接收的内容类型 

- 3、遍历循环所有当前系统的 **MessageConverter**，看谁支持操作这个对象（Person）
- 4、找到支持操作Person的converter，把converter支持的媒体类型统计出来。

- 5、客户端需要 application/xml。服务端能力【10种、json、xml】



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@b4c25d376ded87360da6273ba33ec84fa93cdbb7/2021/10/11/97917c71f0a940faed8d2264caaeff2c.png)

- 6、进行内容协商的最佳匹配媒体类型
- 7、用支持将对象转为最佳匹配媒体类型的converter。调用它进行转化 。







#### 自定义 MessageConverter



实现多协议数据兼容。json、xml、x-nb



**流程：**

- @ResponseBody 响应数据出去 调用 RequestResponseBodyMethodProcessor 处理
- Processor 处理方法返回值。通过 MessageConverter 处理
- 所有 MessageConverter 合起来可以支持各种媒体类型数据的操作（读、写）
- 内容协商找到最终的 messageConverter；



**自定义的NBMessageConverter：**

```java
public class NBMessageConverter implements HttpMessageConverter<Person> {

    @Override
    public boolean canRead(Class<?> clazz, MediaType mediaType) {
        return false;
    }

    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        // Person类型时可写
        return clazz.isAssignableFrom(Person.class);
    }

    /**
     * 告诉MessageConverter这个Converter能写那些数据类型！
     *
     *  application/x-nb
     *
     * @return
     */
    @Override
    public List<MediaType> getSupportedMediaTypes() {
        return MediaType.parseMediaTypes("application/x-nb");
    }

    @Override
    public Person read(Class<? extends Person> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        return null;
    }

    /**
     * 自定义数据类型的写出！
     * @param person
     * @param contentType
     * @param outputMessage
     * @throws IOException
     * @throws HttpMessageNotWritableException
     */
    @Override
    public void write(Person person, MediaType contentType, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        // 自定义写出格式
        String data = person.getUserName() + ";" + person.getAge() + ";" + person.getBirth();
        // 获取写出流写出去
        OutputStream body = outputMessage.getBody();
        body.write(data.getBytes());
    }
}
```



**加入容器：**



```java
@Configuration(proxyBeanMethods = false)
public class WebConfig implements WebMvcConfigurer {


    // 1. @Bean // WebMvcConfigurer
    // 2. 直接实现WebMvcConfigurer接口即可


    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            // 自定义 messageConverter
            @Override
            public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
                // 添加我们自定义的Converter！
                converters.add(new NBMessageConverter());
            }
        };
    }
}
```





**测试：**

使用postman在请求头添加 `Accept=application/x-nb`发送请求测试即可！





#### 基于浏览器参数的内容协商



将自定义的 `application/x-nb`绑定为`nb`使用浏览器请求参数format传进去！

有可能我们添加的自定义的功能会覆盖默认很多功能，导致一些默认的功能失效。

**测试**：`http://localhost:8080/test/person?format=nb`



```java
@Configuration(proxyBeanMethods = false)
public class WebConfig implements WebMvcConfigurer {

    // 1. @Bean // WebMvcConfigurer
    // 2. 直接实现WebMvcConfigurer接口即可
    
    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            
            // 自定义 messageConverter
            @Override
            public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
                // 添加我们自定义的Converter！
                converters.add(new NBMessageConverter());
            }

            // 添加参数format支持的自定义类型 nb
            @Override
            public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
                HashMap<String, MediaType> mediaTypes = new HashMap<>();
                // 指定解析映射（基于请求参数）
                mediaTypes.put("json", MediaType.APPLICATION_JSON);
                mediaTypes.put("xml", MediaType.APPLICATION_ATOM_XML);
                mediaTypes.put("nb", MediaType.parseMediaType("application/x-nb"));
                ParameterContentNegotiationStrategy paramsStrategy = new
                        ParameterContentNegotiationStrategy(mediaTypes);

                // 同样可以设置默认的请求参数名format！
                // paramsStrategy.setParameterName("ff");

                // （基于请求头）
                // 配置完毕上面的自定义请求参数映射后，将会覆盖底层默认的两种，因此再次将
                // 基于请求头的再注入回去！
                HeaderContentNegotiationStrategy headerStrategy = new HeaderContentNegotiationStrategy();

                configurer.strategies(Arrays.asList(paramsStrategy, headerStrategy ));
            }
        };
    }
}
```







## 5、视图解析原理





- 目标方法处理的过程中，所有数据都会被放在 **ModelAndViewContainer** 里面。**包括数据和视图地址**
- 方法的参数是一个自定义类型对象（从请求参数中确定的），把他重新放在 ModelAndViewContainer 
- **任何目标方法执行完成以后都会返回 ModelAndView（数据和视图地址）。**
- **processDispatchResult  处理派发结果（页面改如何响应）**
  - **render(mv, request, response); 进行页面渲染逻辑**
    - 根据方法的String返回值得到 **View** 对象【定义了页面的渲染逻辑】
      - 所有的视图解析器尝试是否能根据当前返回值得到View对象
      - 得到了  redirect:/main.html --> Thymeleaf new RedirectView()
      - ContentNegotiationViewResolver 里面包含了下面所有的视图解析器，内部还是利用下面所有视图解析器得到视图对象。
      - `view.render(mv.getModelInternal(), request, response)`   视图对象调用自定义的render进行页面渲染工作
        - RedirectView 如何渲染【重定向到一个页面】
        - 获取目标url地址
        - response.sendRedirect(encodedURL);





**视图解析：**

- 返回值以 **forward:** 开始： `new InternalResourceView(forwardUrl)`, 转发 `request.getRequestDispatcher(path).forward(request, response)`
- 返回值以 **redirect:** 开始： `new RedirectView()`，render就是重定向 
- 返回值是普通字符串： `new ThymeleafView()`











## 6、模板引擎Thymeleaf



### thymeleaf简介

Thymeleaf is a modern server-side Java template engine for both web and standalone environments, capable of processing HTML, XML, JavaScript, CSS and even plain text.

**现代化、服务端Java模板引擎**



### 基本语法



**表达式：**

| 表达式名字 | 语法   | 用途                               |
| ---------- | ------ | ---------------------------------- |
| 变量取值   | ${...} | 获取请求域、session域、对象等值    |
| 选择变量   | *{...} | 获取上下文对象值                   |
| 消息       | #{...} | 获取国际化等值                     |
| 链接       | @{...} | 生成链接                           |
| 片段表达式 | ~{...} | jsp:include 作用，引入公共页面片段 |



**字面量：**

文本值: **'one text'** **,** **'Another one!'** **,…**

数字: **0** **,** **34** **,** **3.0** **,** **12.3** **,…**

布尔值: **true** **,** **false**

空值: **null**

变量： one，two，.... 变量不能有空格



**文本操作：**

字符串拼接: **+**

变量替换: **|The name is ${name}|** 



**数学运算：**

运算符: + , - , * , / , %



**布尔运算：**

运算符:  **and** **,** **or**

一元运算: **!** **,** **not** 



**比较运算：**

比较: **>** **,** **<** **,** **>=** **,** **<=** **(** **gt** **,** **lt** **,** **ge** **,** **le** **)**

等式: **==** **,** **!=** **(** **eq** **,** **ne** **)** 



**条件运算：**

If-then: **(if) ? (then)**

If-then-else: **(if) ? (then) : (else)**

Default: (value) **?: (defaultvalue)** 



### 设置属性值



**设置单个值：**

```html
<form action="subscribe.html" th:attr="action=@{/subscribe}">
  <fieldset>
    <input type="text" name="email" />
    <input type="submit" value="Subscribe!" th:attr="value=#{subscribe.submit}"/>
  </fieldset>
</form>
```

**设置多个值：**

```html
<img src="../../images/gtvglogo.png"  th:attr="src=@{/images/gtvglogo.png},title=#{logo},alt=#{logo}" />
```



**以上两个的代替写法 `th:xxxx`：**

```html
<input type="submit" value="Subscribe!" th:value="#{subscribe.submit}"/>
<form action="subscribe.html" th:action="@{/subscribe}">
```



**所有h5兼容的标签写法：**[https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#setting-value-to-specific-attributes](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#setting-value-to-specific-attributes)





### 迭代

```html
<tr th:each="prod : ${prods}">
        <td th:text="${prod.name}">Onions</td>
        <td th:text="${prod.price}">2.41</td>
        <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>
```



```html
<tr th:each="prod,iterStat : ${prods}" th:class="${iterStat.odd}? 'odd'">
  <td th:text="${prod.name}">Onions</td>
  <td th:text="${prod.price}">2.41</td>
  <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>
```



### 条件运算

```html
<a href="comments.html"
th:href="@{/product/comments(prodId=${prod.id})}"
th:if="${not #lists.isEmpty(prod.comments)}">view</a>
```



```html
<div th:switch="${user.role}">
  <p th:case="'admin'">User is an administrator</p>
  <p th:case="#{roles.manager}">User is a manager</p>
  <p th:case="*">User is some other thing</p>
</div>
```



### 属性优先级



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2e1557bb632c59b865e577f9878a1251e8f56687/2021/10/12/1a621ab5b3d001466c9c21624fab7963.png)





## 7、Thymeleaf使用





### 引入Starter



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```



### 自动配置好了thymeleaf

```java
@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(ThymeleafProperties.class)
@ConditionalOnClass({ TemplateMode.class, SpringTemplateEngine.class })
@AutoConfigureAfter({ WebMvcAutoConfiguration.class, WebFluxAutoConfiguration.class })
public class ThymeleafAutoConfiguration { }
```



### 自动配好的策略



- 所有thymeleaf的配置值都在 ThymeleafProperties
- 配置好了 **SpringTemplateEngine** 

- 配好了 **ThymeleafViewResolver** 
- 我们只需要直接开发页面



**默认配置好的前后缀：**

```java
public static final String DEFAULT_PREFIX = "classpath:/templates/";

public static final String DEFAULT_SUFFIX = ".html";  //xxx.html
```





**需引入thymeleaf的名称空间：**

```html
<html lang="en" xmlns:th="http://www.thymeleaf.org">
```



### $和@



@会自动用地址拼串，即使你加了 全局访问前缀路径，也会自动帮你拼接！



即使添加了访问前缀路径！

```yaml
server:
  servlet:
    context-path: /hello # 访问前缀路径
```



**测试页面：**

```html
<!DOCTYPE html>
<!--加入thymeleaf名称空间-->
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    <h1 th:text="${msg}">哈哈</h1>

    <h2>
        <!--
        解析结果：
            <a href="https://www.itnxd.cn">去百度</a>
            <a href="link">去百度</a>

        @会自动用地址拼串，即使你加了 全局访问前缀路径，也会自动帮你拼接！

        <a href="/hello/link">去百度</a>
        -->
        <a href="www.baidu.com" th:href="${link}">去百度</a>
        <a href="www.baidu.com" th:href="@{/link}">去百度</a>
    </h2>

</body>
</html>
```





### 行内写法



`th:text="${xxx}"`：标签内写法

`[[${xxx}]]`：行内写法，标签外写法



```html
<a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    <img src="images/photos/user-avatar.png" alt="" />
    [[${session.loginUser.userName}]]
    <span class="caret"></span>
</a>

 <div class="value" th:text="${indexCount}">230</div>
```



### 抽取公共页面



> 官方文档：[https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#template-layout](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#template-layout)

**可使用`th:fragment`或直接使用id选择器也可以声明为公共页面！**



```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">

<head th:fragment="commonheader">
    <link href="css/style.css" th:href="@{/css/style.css}" rel="stylesheet">
    <link href="css/style-responsive.css" th:href="@{/css/style-responsive.css}" rel="stylesheet">
</head>
<body>

<div id="leftmenu" class="left-side sticky-left-side"></div>

<div th:fragment="headermenu" class="header-section"></div>
    
<div id="commonscript">...</div>
</body>
</html>
```





**引用公共页面：**



- th:insert

- th:replace

- th:include



```html
<!--公共页面-->
<div th:fragment="copy">
    &copy; 2011 The Good Thymes Virtual Grocery
</div>


<body>

  ...

    <div th:insert="footer :: copy"></div>

    <div th:replace="footer :: copy"></div>

    <div th:include="footer :: copy"></div>
    
    <!--效果如下-->
    <div>
        <footer>
            &copy; 2011 The Good Thymes Virtual Grocery
        </footer>
    </div>

    <footer>
        &copy; 2011 The Good Thymes Virtual Grocery
    </footer>

    <div>
        &copy; 2011 The Good Thymes Virtual Grocery
    </div>
    
    <!--语法：两种都可-->
    <div th:insert="~{footer :: copy}"></div>
    <div th:insert="footer :: copy"></div>
  
</body>
```



**测试使用：**



```html
<div th:include="common :: commonheader"> </div>
<div th:replace="common :: #leftmenu"></div>
<div th:replace="common :: headermenu"></div>
<div th:replace="common :: #commonscript"></div>
```



### 数据渲染



> 遍历状态：[https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#keeping-iteration-status](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#keeping-iteration-status)
>
> 路径参数的获取：[https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls)
>
> 当前标签生成序列：[https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#numbers](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#numbers)
>
> 带有参数的处理规则：[https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls)





`th:each="user,stats:${users}"`：遍历状态，user变量后面用逗号隔开的变量stats就是Thymeleaf的状态变量

- stats.count：计数，获取当前是第几个
- stats.current：获取当前对象



```html
<tr class="gradeX" th:each="user,stats:${users}">
    <td th:text="${stats.count}">Trident</td>
    <td th:text="${user.userName}">Internet</td>
    <td >[[${user.password}]]</td>
</tr>
```



`${#numbers.sequence(1,page.pages)}`：Thymeleaf的工具类用来生成一个序列，可以将当前标签按照规则重复生成！

```html
<!--/user/delete/id?pn=xx-->
<a th:href="@{/user/delete/{id}(id=${user.id},pn=${page.current})}" type="button">删除</a>

<!--
页码为当前页码时，设为激活状态
${#numbers.sequence(1,page.pages)}：Thymeleaf的工具类用来生成一个序列
-->
<li th:class="${num==page.current?'active':''}" th:each="num:${#numbers.sequence(1,page.pages)}">
    <a th:href="@{/dynamic_table(pn=${num})}">[[${num}]]</a>
</li>

<li class="next"><a th:href="@{/dynamic_table(pn=${page.current+1})}">Next → </a></li>
```



## 8、拦截器





### HandlerInterceptor 接口



```java
/**
 * 登录检查！
 * 1、配置好拦截器要拦截哪些请求
 * 2、把这些配置放在容器中
 * @author ITNXD
 * @create 2021-10-08 11:19
 */
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    /**
     * 目标方法执行之前执行！
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        log.info("拦截的路径是{}", request.getRequestURI());

        HttpSession session = request.getSession();
        Object loginUser = session.getAttribute("loginUser");
        if(loginUser != null){
            return true;
        }
        // 未登录，跳转到登录页面！
        request.setAttribute("msg", "请先登录！");
        request.getRequestDispatcher("/").forward(request, response);
        return false;
    }

    /**
     * 目标方法执行之后执行！
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * 目标方法执行完成后执行！
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```







### 配置拦截器



```java
/**
 * 1、编写一个拦截器实现HandlerInterceptor接口
 * 2、拦截器注册到容器中（实现WebMvcConfigurer的addInterceptors）
 * 3、指定拦截规则【如果是拦截所有，静态资源也会被拦截】
 *
 * @EnableWebMvc：可以全面接管SpringMVC，所有规则全部自己重新配置，实现定制和扩展功能
 */
@Configuration
public class AdminConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                // 拦截路径（动静态全部都拦了）
                .addPathPatterns("/**")
                // 放行路径：css,js,font,images
                .excludePathPatterns("/", "/login", "/css/**", "/js/**",
                        "/fonts/**", "/images/**", "/aa/**");
    }
}
```





### 拦截器原理





- 根据当前请求，找到**HandlerExecutionChain**【可以处理请求的handler以及handler的所有 拦截器】
- 先来**顺序执行**所有拦截器的 preHandle方法
  - 如果当前拦截器prehandler返回为true。则执行下一个拦截器的preHandle
  - 如果当前拦截器返回为false。直接**倒序执行**所有已经执行了的拦截器的  afterCompletion；
- **如果任何一个拦截器返回false。直接跳出不执行目标方法**
- **所有拦截器都返回True。执行目标方法**
- **倒序**执行所有拦截器的postHandle方法。
- **前面的步骤有任何异常都会直接倒序触发 afterCompletion**
- 页面成功渲染完成以后，也会**倒序**触发 afterCompletion



**如下图：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@f0355d3cbf2aa8ec7e4c26a70c6949a7acb31fd7/2021/10/12/ce9ebec135c8a426e53e93a5c291bdb1.png)





## 9、文件上传





### 页面表单



```html
<!--文件上传必须为post-->
<form role="form" th:action="@{/upload}" method="post" enctype="multipart/form-data">
    <div class="form-group">
        <label for="exampleInputEmail1">邮箱</label>
        <input type="email" name="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">名字</label>
        <input type="text" name="username" class="form-control" id="exampleInputPassword1" placeholder="username">
    </div>
    <div class="form-group">
        <!--单文件上传-->
        <label for="exampleInputFile">头像</label>
        <input type="file" name="headerImg" id="exampleInputFile">
    </div>
    <div class="form-group">
        <!--多文件上传-->
        <label for="exampleInputFile">生活照</label>
        <input type="file" name="photos" multiple>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox"> Check me out
        </label>
    </div>
    <button type="submit" class="btn btn-primary">提交</button>
</form>
```





### 文件上传代码





```java
@Slf4j
@Controller
public class FormController {

    @GetMapping("/form_layouts")
    public String form_layouts(){
        return "form/form_layouts";
    }

    /**
     * MultipartFile 自动封装上传过来的文件
     * @param email
     * @param username
     * @param headerImg
     * @param photos
     * @return
     */
    @PostMapping("/upload")
    public String upload(@RequestParam("email") String email,
                         @RequestParam("username") String username,
                         // @RequestPart获取表单文件
                         @RequestPart("headerImg") MultipartFile headerImg,
                         @RequestPart("photos") MultipartFile[] photos) throws IOException {

        log.info("上传的信息：email={}，username={}，headerImg={}，photos={}",
                email,username,headerImg.getSize(),photos.length);

        if(!headerImg.isEmpty()){
            //保存到文件服务器，OSS服务器
            String originalFilename = headerImg.getOriginalFilename();
            headerImg.transferTo(new File("C:\\Users\\15890\\Desktop\\"+originalFilename));
        }

        if(photos.length > 0){
            for (MultipartFile photo : photos) {
                if(!photo.isEmpty()){
                    String originalFilename = photo.getOriginalFilename();
                    photo.transferTo(new File("C:\\Users\\15890\\Desktop\\"+originalFilename));
                }
            }
        }

        return "index";
    }
}
```



### 文件上传配置



```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB # 单文件大小
      max-request-size: 100MB # 请求文件总大小
```



### 自动配置原理



- 文件上传自动配置类-**MultipartAutoConfiguration**-MultipartProperties
  - 自动配置好了 StandardServletMultipartResolver   【**文件上传解析器**】
  - **原理步骤：**
    - 1、请求进来使用文件上传解析器判断（isMultipart）并封装（resolveMultipart，返回MultipartHttpServletRequest）文件上传请求
    - **2、参数解析器来解析请求中的文件内容封装成MultipartFile**
    - 3、将request中文件信息封装为一个Map；`MultiValueMap<String, MultipartFile>`



**FileCopyUtils。实现文件流的拷贝，底层就是该工具类实现的！**







## 10、异常/错误 处理





### 默认规则



- 默认情况下，Spring Boot提供**/error**处理所有错误的映射
- 对于机器客户端，它将生成JSON响应，其中包含错误，HTTP状态和异常消息的详细信息。
- 对于浏览器客户端，响应一个“ whitelabel”错误视图，以HTML格式呈现相同的数据



**机器客户端JSON响应：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@94ab30ffec93b779b641ca1b9c2928668ce39c8d/2021/10/12/f66c672fb1c46bed938a9ea9d29e392d.png)



**浏览器的白页：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@c0362e57d72dcb1a2ec29339298db24e3e2ded74/2021/10/12/a4acc09c2aaa69da2df2b3cc0053b0af.png)





- 要完全替换默认行为，可以实现 ErrorController 并注册该类型的Bean定义，或添加ErrorAttributes类型的组件以使用现有机制但替换其内容。
- error/下的4xx，5xx页面会被自动解析；



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d9f3b80ee1ede4b9c819dc3148b7abaa9976c72b/2021/10/12/fc1077950557e0d2d2f9d771ce65b9d8.png)







### 异常处理自动配置原理



- **ErrorMvcAutoConfiguration  自动配置异常处理规则**
  - 容器中的组件：类型：**DefaultErrorAttributes** -> id：errorAttributes
    - `public class DefaultErrorAttributes implements ErrorAttributes, HandlerExceptionResolver`
    - DefaultErrorAttributes：**定义错误页面中可以包含哪些数据**。   
  - 容器中的组件：类型：**BasicErrorController** --> id：basicErrorController（**json+白页 适配响应**）
    - 处理默认 **/error** 路径的请求；页面响应 `new ModelAndView("error", model)；`
    - 容器中有组件 View->id 是error；（**响应默认错误页**）
  - 容器中放组件 **BeanNameViewResolver**（**视图解析器**）；按照返回的视图名作为组件的id去容器中找View对象。
    - 容器中的组件：类型：DefaultErrorViewResolver -> id：conventionErrorViewResolver
    - **如果发生错误，会以HTTP的状态码 作为视图页地址（viewName），找到真正的页面**
    - error/404、5xx.html 



如果想要返回页面；就会找error视图【**StaticView**】。(默认是一个白页)



**小总结：**

- 如果想向错误页面保存数据（Request域）则修改DefaultErrorAttributes
- 如果想修改默认的错误页json或白页就去修改BasicErrorController
- 如果想修改错误页面的文件位置则去修改BeanNameViewResolver





### 异常处理步骤流程



- 1、执行目标方法，**目标方法运行期间有任何异常都会被catch**、而且标志当前请求结束；并且用 dispatchException 来封装
- 2、**进入视图解析流程（页面渲染）** `processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException)`
- 3、`mv = processHandlerException`，处理handler发生的异常，**处理完成返回ModelAndView**；
  - 1、**遍历所有的 handlerExceptionResolvers**，看谁能处理当前异常【HandlerExceptionResolver处理器异常解析器】
  - 2、系统默认的  异常解析器：
    - 1、**DefaultErrorAttributes先来处理异常。把异常信息保存到request域**，并且返回null；
    - 2、**默认没有任何人能处理异常，则将异常抛出**
      - 1、如果没有任何人能处理最终底层就会发送 **/error** 请求。**会被底层的BasicErrorController处理**
      - 2、解析错误视图；遍历所有的  **ErrorViewResolver**  看谁能解析。
      - 3、默认的 **DefaultErrorViewResolver** ,**作用是把响应状态码作为错误页的地址**，error/500.html 
      - 4、**模板引擎最终响应**这个页面 error/500.html 





### 发生错误放到request域的数据



- status
- error
- trace
- message
- path



**postman返回的json数据：**



```json
{
    "timestamp": "2021-10-08T11:44:47.853+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "trace": "java.lang.ArithmeticException: / by zer",
    "message": "/ by zero",
    "path": "/basic_table"
}
```



**错误页面获取数据：**

```html
<section class="error-wrapper text-center">
    <h1><img alt="" src="images/500-error.png"></h1>
    <h2>OOOPS!!!</h2>
    <h3 th:text="${message}">Something went wrong.</h3>
    <h3 th:text="${error}">Something went wrong.</h3>
    <p class="nrml-txt" th:text="${trace}">Why not try refreshing you page? Or you can <a href="#">contact our support</a> if the problem persists.</p>
    <a class="back-btn" href="index.html" th:text="${status}"> Back To Home</a>
</section>
```





### 定制错误处理逻辑



#### 自定义错误页



error/404.html   error/5xx.html；有精确的错误状态码页面就匹配精确，没有就找 4xx.html；如果都没有就触发白页！



```java
/**
 * 不带请求参数a，将会返回400错误码！400---一般是请求参数错误！
 * @param a
 * @return
 */
@GetMapping(value = {"/basic_table", "/basic_table.html"})
public String basicTable(@RequestParam("a") int a){

    int i = 10 /0;

    return "table/basic_table";
}
```



#### @ControllerAdvice+@ExceptionHandler



> 处理全局异常；底层是 ExceptionHandlerExceptionResolver 支持的！



```java
/**
 * 处理全局 controller 异常！
 * @author ITNXD
 * @create 2021-10-08 21:07
 */
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 用来处理数学异常！
     * 数学异常、空指针异常、请求参数错误异常！
     * @return
     */
    @ExceptionHandler({ArithmeticException.class, NullPointerException.class,
            MissingServletRequestParameterException.class})
    public String handleArithException(Exception e){
        log.error("异常是: {}", e);
        return "login"; // 返回一个视图地址 ModelAndView;
    }
}
```



#### @ResponseStatus+自定义异常



> 底层是 ResponseStatusExceptionResolver ，把responsestatus注解的信息组装成ModelAndView返回，底层调用 `response.sendError(statusCode, resolvedReason)`
>
> 相当于调用tomcat发送的 /error ! 





```java
/**
 * 自定义异常：用户太多异常！
 * @author ITNXD
 * @create 2021-10-08 21:28
 */
// 表示该异常会返回一个状态码信息！
@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "用户数量太多！")
public class UserTooManyException extends RuntimeException{

    public UserTooManyException(){

    }

    public UserTooManyException(String msg){
        super(msg);
    }
}
```





**测试：**



```java
@GetMapping(value = {"/dynamic_table", "/dynamic_table.html"})
public String dynamicTable(Model model){
    List<User> users = Arrays.asList(new User("牛逼", "123456"),
                                     new User("张三", "89032"),
                                     new User("李四", "93993"));
    model.addAttribute("users", users);


    // 模拟异常
    if(users.size() > 2){
        throw new UserTooManyException("用户太多了！");
    }

    return "table/dynamic_table1";
}
```





#### Spring底层的异常



> 如参数类型转换异常；DefaultHandlerExceptionResolver 处理框架底层的异常。
>
> 没人处理tomcat发送 /error请求，SpringBoot会处理，要是SpringBoot也不处理则会返回tomcat的默认错误蓝白页！







#### 自定义异常解析器

> 自定义实现 HandlerExceptionResolver 处理异常；可以作为默认的全局异常处理规则!





```java
/**
 * 实现异常解析的底层接口 HandlerExceptionResolver，自定义异常解析器！
 * @author ITNXD
 * @create 2021-10-08 21:46
 */

// 自定义异常解析器权重最低，防止已有的解析器生效，我们可以指定他为最高优先级！
@Order(value = Ordered.HIGHEST_PRECEDENCE)
@Component
public class CustomerHandlerExceptionResolver implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response,
                                         Object handler, Exception ex) {
        try {
            response.sendError(520, "我喜欢的错误！");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 这里可以不返回ModelAndView使得底层源码的for循环可以继续适配其他ExceptionResolver
        // 就相当于可以在解析异常处理之前执行一些方法！类似 preHandler 方法！
        return new ModelAndView();
    }
}
```





## 11、Web原生组件注入





### 使用Servlet API



> SpringBoot为了兼容旧系统的Servlet！



- @ServletComponentScan(basePackages = **"com.itnxd.admin"**) ：指定原生Servlet组件都放在那里

- @WebServlet(urlPatterns = **"/my"**)：效果：直接响应，**没有经过Spring的拦截器**

- @WebFilter(urlPatterns={**"/css/\*"**,**"/images/\*"**})

- @WebListener





**主应用开启扫描Servlet包：**



```java
// 指定扫描包 扫描原生Servlet
@ServletComponentScan(basePackages = "com.itnxd.helloworld4")
// 快捷复制 ctrl + alt + shift + c 复制包路径！
@SpringBootApplication
public class HelloWorld4Application {

    public static void main(String[] args) {
        SpringApplication.run(HelloWorld4Application.class, args);
    }

}
```



**WebServlet：**

```java
@WebServlet(urlPatterns = "/my")
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("666");
    }
}
```





**WebFilter：**



```java
@Slf4j
// /**是spring里的，原生的是/*
@WebFilter(urlPatterns = {"/my", "/css/*", "/images/*"})
public class MyFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("filter初始化！");
    }

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        log.info("filter工作！");
        // 放行
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        log.info("filter销毁！");
    }
}
```





**WebListener：**



```java
@Slf4j
@WebListener
public class MyListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        log.info("Listener监听到项目初始化完成！");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        log.info("Listener监听到项目销毁！");
    }
}
```







### 使用RegistrationBean



- ServletRegistrationBean
- FilterRegistrationBean
- ServletListenerRegistrationBean



```java
// 默认也是true
@Configuration(proxyBeanMethods = true) // 保证是单示例的，防止每次拦截都会向容器中添加一些东西
public class MyRegistConfig {

    @Bean
    public ServletRegistrationBean myServlet(){
        MyServlet myServlet = new MyServlet();
        return new ServletRegistrationBean(myServlet, "/my", "/my2");
    }

    @Bean
    public FilterRegistrationBean myFilter(){
        MyFilter myFilter = new MyFilter();
        // myServlet()拦截啥filter就拦啥！
        // return new FilterRegistrationBean(myFilter, myServlet());

        // 或者
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(myFilter);
        filterRegistrationBean.setUrlPatterns(Arrays.asList("/my", "/my2", "/css/*"));
        return filterRegistrationBean;
    }

    @Bean
    public ServletListenerRegistrationBean myListener(){
        MyListener myListener = new MyListener();
        return new ServletListenerRegistrationBean(myListener);
    }
}
```



### 不经过spring拦截器？



**多个Servlet都能处理到同一层路径，精确优选原则！**



**DispatchServlet 如何注册进来：**

- 容器中自动配置了  DispatcherServlet  属性绑定到 WebMvcProperties；对应的配置文件配置项是 **spring.mvc。**

- 通过 `ServletRegistrationBean<DispatcherServlet>` 把 DispatcherServlet  配置进来。

- **默认映射的是 / 路径。**



```yaml
spring:
  mvc:
    servlet:
      path: / # DispatcherServlet默认映射的是/
```



**原生Servlet默认使我们自己定义的，例如：`/my`**



**因此：精确匹配的话，默认是到不了DispatcherServlet 的！**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@2ccb263e65e75140cafc5c4b337ecb85fe94f0d2/2021/10/12/8075fe0af3c4cb62841802a36ea546cf.png)







## 12、嵌入式Servlet容器







### 原理



- SpringBoot 应用启动发现当前是Web应用。web场景包-导入tomcat
- web应用会创建一个web版的ioc容器 `ServletWebServerApplicationContext `
- ·ServletWebServerApplicationContext·  启动的时候寻找 `ServletWebServerFactory`（**Servlet 的web服务器工厂，Servlet 的web服务器**）  
- SpringBoot底层默认有很多的WebServer工厂；TomcatServletWebServerFactory, JettyServletWebServerFactory, UndertowServletWebServerFactory
- 底层直接会有一个自动配置类。**ServletWebServerFactoryAutoConfiguration**
- ServletWebServerFactoryAutoConfiguration 导入了 **ServletWebServerFactoryConfiguration**（**配置类**）
- ServletWebServerFactoryConfiguration 配置类动态判断系统中到底导入了那个Web服务器的包。（**默认是web-starter导入tomcat包**），容器中就有 **TomcatServletWebServerFactory**
- TomcatServletWebServerFactory 创建出 Tomcat 服务器并启动；TomcatWebServer 的构造器拥有初始化方法 **initialize---this.tomcat.start();**
- 内嵌服务器，就是手动把启动服务器的代码调用（tomcat核心jar包存在）





### 切换嵌入式Servlet容器





- 默认支持的webServer：Tomcat, Jetty, or Undertow
- ServletWebServerApplicationContext 容器启动寻找ServletWebServerFactory 并引导创建服务器
- 切换服务器





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@e529acfec77d5502c58d55cc2b0a67b998db40b9/2021/10/12/bbfae54edad820015245af09170a3df2.png)





**先手动排除默认的tomcat依赖，在手动添加其他服务器依赖：**



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```





### 定制Servlet容器

- 1、实现  `WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> `
  - 把配置文件的值和 ServletWebServerFactory 进行绑定
  - 修改配置文件 **server.xxx** (xxx表示服务器名)
- 2、直接自定义 **ConfigurableServletWebServerFactory** 



xxxxxCustomizer：**定制化器**，可以改变xxxx的默认规则！



```java
@Component
public class CustomizationBean implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    @Override
    public void customize(ConfigurableServletWebServerFactory server) {
        server.setPort(9000);
    }

}
```





## 13、定制化原理



### 定制化的常见方式 



- 修改配置文件；
- xxxxxCustomizer，实现定制化器接口
- 编写自定义的配置类   xxxConfiguration + @Bean**替换、增加容器中默认组件；视图解析器** 
- Web应用 编写一个配置类实现 `WebMvcConfigurer` 即可定制化web功能；+ @Bean给容器中再扩展一些组件
- `EnableWebMvc + WebMvcConfigurer  @Bean`  可以**全面接管SpringMVC，所有规则全部自己重新配置； 实现定制和扩展功能**



@EnableWebMvc开启手动定制，则springmvc底层实现好的组件将全部失效，只能自己自定义！



```java
@EnableWebMvc // 可以全面接管SpringMVC，所有规则全部自己重新配置，实现定制和扩展功能
@Configuration
public class AdminConfig implements WebMvcConfigurer {
  	/**
     * 定义资源行为！
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 访问/aa下的资源都去类路径下的static目录去匹配！
        registry.addResourceHandler("/aa/**")
            .addResourceLocations("classpath:/static");
    }
}
```







### @EnableWebMvc 原理

- 1、WebMvcAutoConfiguration  默认的SpringMVC的自动配置功能类。静态资源、欢迎页.....
- 2、一旦使用 **@EnableWebMvc** 。会 `@Import(DelegatingWebMvcConfiguration.class)`
- **3、DelegatingWebMvcConfiguration 的作用，只保证SpringMVC最基本的使用**
  - 把所有系统中的 WebMvcConfigurer 拿过来。所有功能的定制都是这些 WebMvcConfigurer  合起来一起生效
  - **自动配置了一些非常底层的组件**。RequestMappingHandlerMapping、这些组件依赖的组件都是从容器中获取
- 4、WebMvcAutoConfiguration 里面的配置要能生效 必须  **@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)**
  - `public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport`
- 5、@EnableWebMvc  导致了 WebMvcAutoConfiguration  没有生效。



### 原理分析套路



- **导入场景starter** 

- xxxxAutoConfiguration

- 导入xxx组件

- 绑定xxxProperties

- **绑定配置文件项** 





# 七、数据访问







## 1、整合JDBC







### 导入JDBC场景



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```



**自动导入的东西：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@d1a01f29d84da987c3b01ccc19d30ef4ebbccf24/2021/10/13/dc3347c97dc569dae877dc73f3a707ac.png)







### 导入数据库驱动



```xml
<properties>
    <java.version>1.8</java.version>
    <!--版本仲裁或者自己指定！
		想要修改版本
            1、直接依赖引入具体版本（maven的就近依赖原则）
            2、重新声明版本（maven的属性的就近优先原则）
    -->
    <!-- <mysql.verson>8.0.26</mysql.verson>-->
</properties>

<!--mysql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```



### 分析自动配置





- **DataSourceAutoConfiguration** ： 数据源的自动配置
  - 修改数据源相关的配置：**spring.datasource**
  - **数据库连接池的配置，是自己容器中没有DataSource才自动配置的**
  - 底层配置好的连接池是：**HikariDataSource**
- DataSourceTransactionManagerAutoConfiguration： **事务管理器**的自动配置
- JdbcTemplateAutoConfiguration： **JdbcTemplate**的自动配置，可以来对数据库进行crud
  - 可以修改这个配置项 @ConfigurationProperties(prefix = "**spring.jdbc**") 来修改JdbcTemplate
- JndiDataSourceAutoConfiguration： **jndi**的自动配置
- XADataSourceAutoConfiguration： **分布式事务相关**的





### 修改配置项





```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/book
    username: root
    password: xxxxx
    driver-class-name: com.mysql.cj.jdbc.Driver
  jdbc:
    template:
    query-timeout: 3 # 查询时间限制（单位秒）
```



### 测试



```java
@Slf4j
@SpringBootTest
class HelloWorld4ApplicationTests {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {

        Long num = jdbcTemplate.queryForObject("select count(*) from t_book", Long.class);
        System.out.println(num);
    }
}
```





## 2、整合Druid





> druid官方github地址：[https://github.com/alibaba/druid](https://github.com/alibaba/druid)



**整合第三方技术的两种方式：**

- 自定义
- 找starter



### 自定义方式



**导入依赖：**

```xml
<!--第三方德鲁伊数据源-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.17</version>
</dependency>
```



**配置数据源：**



```java
@Deprecated
@Configuration
public class MyDataSourceConfig {


    /**
     * 默认自动配置判断没有数据源才会使用自定义数据源！
     *
     */
    @Bean
    // 配置直接去yml配置文件找对应前缀开头的即可（因为属性一一对应）
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() throws SQLException {
        DruidDataSource druidDataSource = new DruidDataSource();
        return  druidDataSource;
    }
}
```



**指定配置文件前缀可直接在配置文件中找：**



```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/book
    username: root
    password: xxxxx
    driver-class-name: com.mysql.cj.jdbc.Driver
```







**测试：**

```java
@Slf4j
@SpringBootTest
class HelloWorld4ApplicationTests {

    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    DataSource dataSource;

    @Test
    void contextLoads() {

        Long num = jdbcTemplate.queryForObject("select count(*) from t_book", Long.class);
        System.out.println(num);

        log.info("数据源类型是：{}", dataSource.getClass());
    }
}
```





#### StatViewServlet





**StatViewServlet的用途包括：**

- 提供监控信息展示的html页面
- 提供监控信息的JSON API



**旧版的xml配置：**

```xml
<servlet>
    <servlet-name>DruidStatView</servlet-name>
    <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>DruidStatView</servlet-name>
    <url-pattern>/druid/*</url-pattern>
</servlet-mapping>
```



**SpringBoot配置：**



```java
@Deprecated
@Configuration
public class MyDataSourceConfig {

    /**
     * 配置druid的监控页功能！
     * https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatViewServlet%E9%85%8D%E7%BD%AE
     * https://github.com/alibaba/druid/wiki/Druid%E8%BF%9E%E6%8E%A5%E6%B1%A0%E4%BB%8B%E7%BB%8D#37-%E5%8C%BA%E9%97%B4%E5%88%86%E5%B8%83
     *
     *  Druid使用，访问密码设置：
     * https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatViewServlet%E9%85%8D%E7%BD%AE#12-%E9%85%8D%E7%BD%AE%E7%9B%91%E6%8E%A7%E9%A1%B5%E9%9D%A2%E8%AE%BF%E9%97%AE%E5%AF%86%E7%A0%81
     *
     *
     * @return
     */
    @Bean
    public ServletRegistrationBean statViewServlet(){
        StatViewServlet statViewServlet = new StatViewServlet();
        ServletRegistrationBean<StatViewServlet> servletRegistrationBean =
                new ServletRegistrationBean<>(statViewServlet, "/druid/*");


        servletRegistrationBean.addInitParameter("loginUsername", "admin");
        servletRegistrationBean.addInitParameter("loginPassword", "admin");


        return servletRegistrationBean;
    }
}
```



**开启 StatFilter和wallfilter：**



```java
@Deprecated
@Configuration
public class MyDataSourceConfig {


    /**
     * 默认自动配置判断没有数据源才会使用自定义数据源！
     *
     * StatFilter开启：
     * https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatFilter
     *
     * 防火墙wall开启:
     * https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE-wallfilter
     *
     */
    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() throws SQLException {
        DruidDataSource druidDataSource = new DruidDataSource();

        // 监控统计用的filter:stat和防火墙用的 wall
        druidDataSource.setFilters("stat, wall");
        return  druidDataSource;
    }
}
```





**或直接在配置文件里写：**



```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/book
    username: root
    password: n158903258
    driver-class-name: com.mysql.cj.jdbc.Driver
    # type: com.zaxxer.hikari.HikariDataSource
    # 这里的是druid里属性，不会有提示
	filters: stat,wall
```





**访问地址：** http://localhost:8080/druid







#### StatFilter



用于统计监控信息；如SQL监控、URI监控！



```java
@Deprecated
@Configuration
public class MyDataSourceConfig {
    
    /**
     * 配置webStatFilter webUrl监控！
     * https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_%E9%85%8D%E7%BD%AEWebStatFilter
     */
    @Bean
    public FilterRegistrationBean webStatFilter(){
        WebStatFilter webStatFilter = new WebStatFilter();

        FilterRegistrationBean<WebStatFilter> filterRegistrationBean =
                new FilterRegistrationBean(webStatFilter, statViewServlet());
        filterRegistrationBean.setUrlPatterns(Arrays.asList("/*"));
        // 添加初始化参数！
        filterRegistrationBean.addInitParameter("exclusions",
                "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        return filterRegistrationBean;
    }
}
```





### Starter方式





**引入依赖：**



```xml
<!--通过starter引入数据源-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.17</version>
</dependency>
```





#### 分析自动配置

- 扩展配置项 **spring.datasource.druid**
- 导入了一些组件：
  - DruidSpringAopConfiguration.**class**,   监控SpringBean的；配置项：**spring.datasource.druid.aop-patterns**
  - DruidStatViewServletConfiguration.**class**, 监控页的配置：**spring.datasource.druid.stat-view-servlet；默认开启**
  -  DruidWebStatFilterConfiguration.**class**, web监控配置；**spring.datasource.druid.web-stat-filter；默认开启**
  - DruidFilterConfiguration.**class**}) 所有Druid自己filter的配置





**DruidFilterConfiguration的组件：** 

```java
    private static final String FILTER_STAT_PREFIX = "spring.datasource.druid.filter.stat";
    private static final String FILTER_CONFIG_PREFIX = "spring.datasource.druid.filter.config";
    private static final String FILTER_ENCODING_PREFIX = "spring.datasource.druid.filter.encoding";
    private static final String FILTER_SLF4J_PREFIX = "spring.datasource.druid.filter.slf4j";
    private static final String FILTER_LOG4J_PREFIX = "spring.datasource.druid.filter.log4j";
    private static final String FILTER_LOG4J2_PREFIX = "spring.datasource.druid.filter.log4j2";
    private static final String FILTER_COMMONS_LOG_PREFIX = "spring.datasource.druid.filter.commons-log";
    private static final String FILTER_WALL_PREFIX = "spring.datasource.druid.filter.wall";
```



**系统中所有filter：**

| 别名          | Filter类名                                              |
| ------------- | ------------------------------------------------------- |
| default       | com.alibaba.druid.filter.stat.StatFilter                |
| stat          | com.alibaba.druid.filter.stat.StatFilter                |
| mergeStat     | com.alibaba.druid.filter.stat.MergeStatFilter           |
| encoding      | com.alibaba.druid.filter.encoding.EncodingConvertFilter |
| log4j         | com.alibaba.druid.filter.logging.Log4jFilter            |
| log4j2        | com.alibaba.druid.filter.logging.Log4j2Filter           |
| slf4j         | com.alibaba.druid.filter.logging.Slf4jLogFilter         |
| commonlogging | com.alibaba.druid.filter.logging.CommonsLogFilter       |



#### 配置文件



SpringBoot配置示例：[https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter](https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter)



配置项列表：[https://github.com/alibaba/druid/wiki/DruidDataSource%E9%85%8D%E7%BD%AE%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8](https://github.com/alibaba/druid/wiki/DruidDataSource配置属性列表)



```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/book
    username: root
    password: xxxx

    # 引入stater后使用
    # https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter
    druid:
      #      aop-patterns: com.itnxd.helloworld4.* #监控SpringBean
      filters: stat,wall  # 底层开启功能，stat（sql监控），wall（防火墙）
      stat-view-servlet: # 配置监控页功能
        enabled: true
        login-password: admin
        login-username: admin
        reset-enable: false
      web-stat-filter:  # 监控web
        enabled: true
        url-pattern: /*
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'

      # https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE-filter
      filter: # 对上面filters里面的组件的详细配置
        stat: # 慢查询
          enabled: true
          slow-sql-millis: 1000
          log-slow-sql: true
        wall:
          enabled: true
          config:
            update-allow: true
            drop-table-allow: false
```







## 3、整合MyBatis





> 官方地址：[https://github.com/mybatis](https://github.com/mybatis)





**starter：**

- SpringBoot官方的Starter：`spring-boot-starter-*`
- 第三方的： `*-spring-boot-starter`



### 导入依赖



```xml
<!--mybatis starter引入-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.4</version>
</dependency>
```



**自动导入的东西：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@523354c93a5ec59bb1b904625cd4b4053112df87/2021/10/13/2860a1714570f560ceb0cd8f9c52fbe9.png)







### 配置模式



- 全局配置文件
- SqlSessionFactory: 自动配置好了

- SqlSession：自动配置了 **SqlSessionTemplate 组合了SqlSession**
- @Import(**AutoConfiguredMapperScannerRegistrar**.**class**）；

- Mapper： 只要我们写的操作MyBatis的接口标注了 **@Mapper 就会被自动扫描进来**



```java
@EnableConfigurationProperties(MybatisProperties.class) ： MyBatis配置项绑定类。
@AutoConfigureAfter({ DataSourceAutoConfiguration.class, MybatisLanguageDriverAutoConfiguration.class })
public class MybatisAutoConfiguration{}

@ConfigurationProperties(prefix = "mybatis")
public class MybatisProperties
```





**配置文件：**



mybatis.configuration下面的所有，就是相当于改mybatis全局配置文件中的值！



```yaml
# 可以不写全局；配置文件，所有全局配置文件的配置都放在configuration配置项中即可
mybatis:
  #  config-location: classpath:mybatis/mybatis-config.xml  #全局配置文件位置
  mapper-locations: classpath:mybatis/mapper/*.xml  #sql映射文件位置
  configuration: # 该配置与全局配置不可同时存在！
    map-underscore-to-camel-case: true # 驼峰命名开启
```





**测试：**



**AccountMapper.xml文件：**



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.itnxd.helloworld4.mapper.AccountMapper">

    <!--public Account getAcct(Long id);-->
    <select id="getAcct" resultType="com.itnxd.helloworld4.bean.Account">
        select * from account_tbl where id = #{id}
    </select>

</mapper>
```



**Mapper层、Service层、Controller层：**



```java
@Mapper
public interface AccountMapper {

    public Account getAcct(Long id);
}

@Service
public class AccountService {

    @Autowired
    AccountMapper accountMapper;

    public Account getAcctById(Long id){
        return accountMapper.getAcct(id);
    }
}


@Autowired
AccountService accountService;

// http://localhost:8888/acct?id=1
@ResponseBody
@GetMapping("/acct")
public Account getById(@RequestParam("id") Long id){
    return accountService.getAcctById(id);
}
```



**小总结：**



- 导入mybatis官方starter
- 编写mapper接口。标准@Mapper注解

- 编写sql映射文件并绑定mapper接口
- 在application.yaml中指定Mapper配置文件的位置，以及指定全局配置文件的信息 （建议；**配置在mybatis.configuration**）



### 注解配置混合模式



- 简单sql标注注解，复杂sql还是写xml映射文件！



```java
@Mapper // 每个接口写麻烦，在启动类上标注mapper扫描包即可！但建议直接使用Mapper!
public interface CityMapper {

    @Select("select * from city where id=#{id}")
    public City getById(Long id);

    @Insert("insert into city(`name`,`state`,`country`) values(#{name}, #{state}, #{country})")
    // 可以添加选项，获取主键值进行封装
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public void insert(City city);
}
```

**复杂写映射文件：**

```xml
<insert id="insert" useGeneratedKeys="true" keyProperty="id">
    insert into city(`name`,`state`,`country`) values(#{name}, #{state}, #{country})
</insert>
```





**启动类标注@MapperScan指定mapper扫描，即可不用每个mapper上单独标注注解：**



```java
@MapperScan("com.itnxd.helloworld4.mapper")
// MyBatis建议直接在接口标注mapper！ MP建议直接使用MapperScan扫描！
@SpringBootApplication
public class HelloWorld4Application {

    public static void main(String[] args) {
        SpringApplication.run(HelloWorld4Application.class, args);
    }

}
```







**小总结：**

- 引入mybatis-starter
- **配置application.yaml中，指定mapper-location位置即可**

- 编写Mapper接口并标注@Mapper注解
- **简单方法直接注解方式**

- **复杂方法编写mapper.xml进行绑定映射**
- 启动类标注 `@MapperScan("com.itnxd.admin.mapper")` 简化，其他的接口就可以不用标注@Mapper注解，**但不建议使用**







## 4、整合Mybatis-Plus





### 导入依赖



```xml
<!--mp引入 自动引入mybatis和jdbc，因此上面这两个可以注释掉-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.1</version>
</dependency>
```





### 自动配置





- MybatisPlusAutoConfiguration 配置类，MybatisPlusProperties 配置项绑定。**mybatis-plus：xxx **就是对mybatis-plus的定制
- **SqlSessionFactory 自动配置好。底层是容器中默认的数据源**

- mapperLocations 自动配置好的。有默认值。`classpath*:/mapper/**/*.xml` 任意包的类路径下的所有mapper文件夹下任意路径下的所有xml都是sql映射文件。  建议以后sql映射文件，放在 mapper下。
- **容器中也自动配置好了** **SqlSessionTemplate**

- @Mapper 标注的接口也会被自动扫描；**建议直接 @MapperScan("com.itnxd.admin.mapper") 批量扫描**
- 只需要我们的Mapper继承 **BaseMapper** 就可以拥有crud能力









### 测试



**前提：**



```java
public interface UsersMapper extends BaseMapper<Users> {
}

public interface UsersService extends IService<Users> {

}


/**
 * implements UsersService：为MP的顶级Service! 有许多要重写的方法！
 * extends ServiceImpl<UsersMapper, Users>：MP对重写方法的实现！
 *
 * @author ITNXD
 * @create 2021-10-09 21:17
 */
@Service
public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users> implements UsersService {

}
```



**测试：**



```java
@Autowired
UsersMapper usersMapper; // 波浪线不用管，启动后容器就有了

@Test
void testUserMapper(){
    Users user = usersMapper.selectById(1);
    log.info("用户信息：{}", user);
}
```





### 分页测试



**向request域保存page对象：**



```java
 @GetMapping(value = {"/dynamic_table", "/dynamic_table.html"})
    public String dynamicTable(@RequestParam(value = "pn", defaultValue = "1") Integer pn,
                               Model model){

        // 当前页数 每页数量
        Page<Users> usersPage = new Page<>(pn, 2);
        Page<Users> page = usersService.page(usersPage, null);

        // 需要结合分页插件使用！
        model.addAttribute("page", page);

        /**
         * Thymeleaf生成一个序列，用来展示分页！
         *  Create a sequence (array) of integer numbers going
         *  from x to y
            ${#numbers.sequence(from,to)}
            ${#numbers.sequence(from,to,step)}
         */

        return "table/dynamic_table1";
    }
```





**开启MP分页插件使分页生效：**



```java
@Configuration
public class MyBatisConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){

        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();

        // 添加分页插件！
        PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor();
        // 最后一页以后跳回首页
        paginationInnerInterceptor.setOverflow(true);
        paginationInnerInterceptor.setMaxLimit(500L);
        interceptor.addInnerInterceptor(paginationInnerInterceptor);

        return interceptor;
    }
}
```





**html页面获取数据：**



用到了Thymeleaf的用法，详见注释！



```html
 <table class="display table table-bordered table-striped" id="dynamic-table">
     <thead>
         <tr>
             <th>#</th>
             <th>id</th>
             <th>name</th>
             <th>age</th>
             <th>email</th>
             <th>操作</th>
         </tr>
     </thead>
     <tbody>
         <tr class="gradeX" th:each="user,stat:${page.records}">
             <td th:text="${stat.count}"></td>
             <td th:text="${user.id}"></td>
             <td th:text="${user.name}"></td>
             <td th:text="${user.age}"></td>
             <td>[[${user.email}]]</td>
             <td>
                 <!--
                路径参数的获取！
                https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls
                -->
                 <a th:href="@{/user/delete/{id}(id=${user.id},pn=${page.current})}" class="btn btn-danger btn-sm" type="button">删除</a>
             </td>
         </tr>
     </tbody>
</table>

<div class="row-fluid">
    <div class="span6">
        <div class="dataTables_info" id="hidden-table-info_info">
            当前第 [[${page.current}]] 页 总计 [[${page.pages}]] 页 共 [[${page.total}]] 条记录
        </div>
    </div>
    <div class="span6">
        <div class="dataTables_paginate paging_bootstrap pagination">
            <ul>
                <li class="prev disabled"><a href="#">← Previous</a></li>

                <!--
                页码为当前页码时，设为激活状态
                ${#numbers.sequence(1,page.pages)}：Thymeleaf的工具类用来生成一个序列
                当前标签生成序列！
                https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#numbers

                带有参数的处理规则；
                https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls
                -->
                <li th:class="${num==page.current?'active':''}" th:each="num:${#numbers.sequence(1,page.pages)}">
                    <a th:href="@{/dynamic_table(pn=${num})}">[[${num}]]</a>
                </li>

                <li class="next"><a th:href="@{/dynamic_table(pn=${page.current+1})}">Next → </a></li>
            </ul>
        </div>
    </div>
</div>
```





**重定向携带参数：**



其实就是将参数拼接到url最后进行携带！



```java
@GetMapping("/user/delete/{id}")
public String deleteUser(@PathVariable("id") Long id,
                         @RequestParam(value = "pn", defaultValue = "1") Integer pn,
                         // 重定向携带参数
                         RedirectAttributes redirectAttributes){
    usersService.removeById(id);
    // 将请求参数放到重定向中携带
    redirectAttributes.addAttribute("pn", pn);
    return "redirect:/dynamic_table";
}
```





## 5、整合Redis





### 导入依赖



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```





**自动导入的东西：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@37016f82dbb364adcf6bb70660a8cb7ca7b302c3/2021/10/13/d50a62f713dccb3f6123b60f31d3f62e.png)



### 自动配置



- RedisAutoConfiguration 自动配置类。RedisProperties 属性类 --> **spring.redis.xxx** 是对redis的配置

- 连接工厂是准备好的。**Lettuce**ConnectionConfiguration（**默认**）、**Jedis**ConnectionConfiguration

- **自动注入了RedisTemplate**<**Object**, **Object**>
- **自动注入了StringRedisTemplate；k：v都是String**

- 底层只要我们使用 **StringRedisTemplate、RedisTemplate就可以操作redis**





### 导入Jedis



默认是Lettuce，导入后就有了两个，可以通过配置文件指定选择哪个！



```xml
<!--引入jedis-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```





### 配置文件



```yaml
spring:
  redis:
    url: redis://82.156.11.189:6379
    client-type: jedis # 默认是 Lettuce
    jedis:
      pool:
        max-idle: 10
        max-active: 10
```





### 测试



```java
@Autowired
StringRedisTemplate stringRedisTemplate;
@Autowired
RedisConnectionFactory redisConnectionFactory;

@Test
void testRedis(){
    ValueOperations<String, String> operations =
            stringRedisTemplate.opsForValue();

    operations.set("hello", "world");
    String hello = operations.get("hello");
    System.out.println(hello);

    System.out.println(redisConnectionFactory.getClass());
}
```





### 计数器案例



**添加拦截器拦截url地址：**



```java
@Component // 为了WebMvcConfigurer可以从容器中获取到！
public class RedisUrlCountInterceptor implements HandlerInterceptor {

    @Autowired
    StringRedisTemplate redisTemplate;

    /**
     *
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURL = request.getRequestURI();
        // 每次访问当前url就+1
        redisTemplate.opsForValue().increment(requestURL);

        return true;
    }
}
```



**将拦截器加入容器：**



```java
@Configuration
public class AdminConfig implements WebMvcConfigurer {

    /**
     * filter和Interceptor？
     * filter是Servlet定义的原生组件，脱离spring也可以使用！
     * interceptor是spring定义的接口，可以使用spring的自动装配功能！
     */
    @Autowired
    RedisUrlCountInterceptor redisUrlCountInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                // 拦截路径（动静态全部都拦了）
                .addPathPatterns("/**")
                // 放行路径：css,js,font,images
                .excludePathPatterns("/", "/login", "/css/**", "/js/**",
                        "/fonts/**", "/images/**", "/aa/**");

        // 注入redis的拦截器!
        // 这里不能直接new，RedisUrlCountInterceptor中我们使用的是IOC注入的组件 StringRedisTemplate
        //registry.addInterceptor(new RedisUrlCountInterceptor());
        registry.addInterceptor(redisUrlCountInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/", "/login", "/css/**", "/js/**",
                        "/fonts/**", "/images/**", "/aa/**");
    }
}
```



**Controller保存数据：**



```java
@Autowired
StringRedisTemplate redisTemplate;

@GetMapping("/index.html")
public String indexPage(HttpSession session, Model model){

    ValueOperations<String, String> operations = redisTemplate.opsForValue();
    String s = operations.get("/index.html");
    String s1 = operations.get("/query");

    model.addAttribute("indexCount", s);
    model.addAttribute("queryCount", s1);

    return "index";
}
```





# 八、单元测试





## 1、JUnit5 的变化





**Spring Boot 2.2.0 版本开始引入 JUnit 5 作为单元测试默认库**

作为最新版本的JUnit框架，JUnit5与之前版本的Junit框架有很大的不同。由三个不同子项目的几个不同模块组成。

**JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage**

- **JUnit Platform**: Junit Platform是在JVM上启动测试框架的基础，不仅支持Junit自制的测试引擎，**其他测试引擎也都可以接入**。

- **JUnit Jupiter**: JUnit Jupiter提供了JUnit5的新的编程模型，是JUnit5新特性的核心。内部 包含了一个**测试引擎**，用于在Junit Platform上运行。

- **JUnit Vintage**: 由于JUint已经发展多年，为了照顾老的项目，JUnit Vintage提供了兼容JUnit4.x,Junit3.x的测试引擎。



**注意：**

SpringBoot 2.4 以上版本移除了默认对 Vintage 的依赖。如果需要兼容junit4需要自行引入（不能使用junit4的功能 @Test）



```xml
<dependency>
    <groupId>org.junit.vintage</groupId>
    <artifactId>junit-vintage-engine</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.hamcrest</groupId>
            <artifactId>hamcrest-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```



**依赖导入，默认已经导入：**



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```





**以前：**

@SpringBootTest + @RunWith(SpringTest.class)

**SpringBoot整合Junit以后：**

- 编写测试方法：@Test标注（注意需要使用junit5版本的注解）
- Junit类具有Spring的功能，@Autowired、比如 @Transactional 标注测试方法，测试完成后自动**回滚**





## 2、JUnit5常用注解



> JUnit5的注解与JUnit4的注解有所变化：[https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations](https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations)



- **@Test :**表示方法是测试方法。但是与JUnit4的@Test不同，他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试
- **@ParameterizedTest :**表示方法是参数化测试

- **@RepeatedTest :**表示方法可重复执行
- **@DisplayName :**为测试类或者测试方法设置展示名称

- **@BeforeEach :**表示在每个单元测试之前执行
- **@AfterEach :**表示在每个单元测试之后执行

- **@BeforeAll :**表示在所有单元测试之前执行
- **@AfterAll :**表示在所有单元测试之后执行

- **@Tag :**表示单元测试类别，类似于JUnit4中的@Categories
- **@Disabled :**表示测试类或测试方法不执行，类似于JUnit4中的@Ignore

- **@Timeout :**表示测试方法运行如果超过了指定时间将会返回错误
- **@ExtendWith :**为测试类或测试方法提供扩展类引用







**测试：**



```java
@DisplayName("Junit5功能测试！")
@SpringBootTest // 不标注也能用，但标注了才能使用容器内的组件！
public class Junit5Test {

    @DisplayName("测试DisplayName 注解！")
    @Test
    void testDisplayName (){
        System.out.println("==========1==========");
    }

    @Disabled // 禁用该测试
    @DisplayName("测试2！")
    @Test
    void testDisplayName2 (){
        System.out.println("=========2===========");
    }

    @BeforeEach
    void testBeforeEach(){
        System.out.println("============beforeEach=======");
    }

    @AfterEach
    void testAfterEach(){
        System.out.println("============afterEach============");
    }

    @BeforeAll
    static void testBeforeAll(){
        System.out.println("============BeforeAll ==============");
    }

    @AfterAll
    static void testAfterAll(){
        System.out.println("============afterAll ==============");
    }

    @Timeout(value = 500, unit = TimeUnit.MILLISECONDS)
    @Test
    void testTimeout() throws InterruptedException {
        Thread.sleep(500);
    }

    @RepeatedTest(5)
    void testRepeat(){
        System.out.println("hhhhhhhhh");
    }

    @ParameterizedTest()
    @ValueSource(strings = { "racecar", "radar", "able was I ere I saw elba" })
    void palindromes(String candidate) {
        System.out.println(candidate);
    }

}
```





## 3、断言（assertions）



断言（assertions）是测试方法中的核心部分，用来对测试需要满足的条件进行验证。**这些断言方法都是 org.junit.jupiter.api.Assertions 的静态方法**。



- **检查业务逻辑返回的数据是否合理。**

- **所有的测试运行结束以后，会有一个详细的测试报告；**







### 简单断言



用来对单个值进行简单的验证。



| 方法            | 说明                                 |
| --------------- | ------------------------------------ |
| assertEquals    | 判断两个对象或两个原始类型是否相等   |
| assertNotEquals | 判断两个对象或两个原始类型是否不相等 |
| assertSame      | 判断两个对象引用是否指向同一个对象   |
| assertNotSame   | 判断两个对象引用是否指向不同的对象   |
| assertTrue      | 判断给定的布尔值是否为 true          |
| assertFalse     | 判断给定的布尔值是否为 false         |
| assertNull      | 判断给定的对象引用是否为 null        |
| assertNotNull   | 判断给定的对象引用是否不为 null      |



**测试：**



```java
/**
 *
 * 可以使用maven的生命周期clean + test在项目上线前进行一次全部的测试！
 *
 * @author ITNXD
 * @create 2021-10-10 14:00
 */
@DisplayName("断言测试！")
public class AssertTest {

    int cal(int a, int b){
        return a + b;
    }

    // 前面断言失败后面代码不会执行！
    @DisplayName("简单断言测试！")
    @Test
    void testSimple(){
        int c = cal(2, 3);
        // Assertions.assertEquals("5", c);
        // assertEquals(5, c);
        assertEquals(5, c, "计算失败！");

        Object o1 = new Object();
        Object o2 = new Object();
        assertSame(o1, o2, "对象不一致！");

    }
}
```



### 数组断言

通过 assertArrayEquals 方法来判断两个对象或原始类型的数组是否相等!



```java
@DisplayName("数组断言测试！")
@Test
void testArray(){
    assertArrayEquals(new int[] {1, 2}, new int[] {1, 2});
}
```





### 组合断言

assertAll 方法接受多个 org.junit.jupiter.api.Executable 函数式接口的实例作为要验证的断言，可以通过 lambda 表达式很容易的提供这些断言!



```java
// 都成功才成功
@Test
@DisplayName("assert all")
public void all() {
    assertAll("Math",
              () -> assertEquals(2, 1 + 1, "失败"),
              () -> assertTrue(1 > 0, "失败")
             );
}
```



### 异常断言

在JUnit4时期，想要测试方法的异常情况时，需要用**@Rule**注解的ExpectedException变量还是比较麻烦的。而JUnit5提供了一种新的断言方式**Assertions.assertThrows()** ,配合函数式编程就可以进行使用。



```java
@Test
@DisplayName("异常测试")
public void exceptionTest() {
    ArithmeticException exception = Assertions.assertThrows(
        //扔出断言异常
        ArithmeticException.class, () -> System.out.println(1 % 0));

}
```



### 超时断言

Junit5还提供了**Assertions.assertTimeout()** 为测试方法设置了超时时间!



```java
@Test
@DisplayName("超时测试")
public void timeoutTest() {
    //如果测试方法时间超过1s将会异常
    Assertions.assertTimeout(Duration.ofMillis(1000), () -> Thread.sleep(500));
}
```



### 快速失败

通过 fail 方法直接使得测试失败!



```java
@Test
@DisplayName("fail")
public void shouldFail() {
    fail("This should fail");
}
```





## 4、前置条件（assumptions）





JUnit 5 中的前置条件（assumptions【假设】）类似于断言，不同之处在于不满足的断言会使得测试方法失败，而不满足的前置条件只会使得测试方法的执行终止。前置条件可以看成是测试方法执行的前提，当该前提不满足时，就没有继续执行的必要。



- assumeTrue 和 assumFalse 确保给定的条件为 true 或 false，不满足条件会使得测试执行终止。
- assumingThat 的参数是表示条件的布尔值和对应的 Executable 接口的实现对象。只有条件满足时，Executable 对象才会被执行；当条件不满足时，测试执行并不会终止。



- **assume 出现错误就跳过了，进行maven clean+test时显示的是ignore而不是error，**
- assert错误就是错误！



```java
// assume 出现错误就跳过了，进行maven clean+test时显示的是ignore而不是error，
// assert错误就是错误！

private final String environment = "DEV";

@Test
@DisplayName("simple")
public void simpleAssume() {
    // 同样需要导入静态包 Assumptions
    assumeTrue(Objects.equals(this.environment, "jjj"));
    assumeFalse(() -> Objects.equals(this.environment, "PROD"));
}

@Test
@DisplayName("assume then do")
public void assumeThenDo() {
    assumingThat(
        Objects.equals(this.environment, "DEV"),
        () -> System.out.println("In DEV")
    );
}
```





## 5、嵌套测试



JUnit 5 可以通过 Java 中的内部类和@Nested 注解实现嵌套测试，从而可以更好的把相关的测试方法组织在一起。在内部类中可以使用@BeforeEach 和@AfterEach 注解，而且嵌套的层次没有限制。







```java
/**
 *
 * 内层可以调用外层，外层无法调用内层！
 *
 * @author ITNXD
 * @create 2021-10-10 14:34
 */
@DisplayName("嵌套测试！")
public class TestingAStackDemo {

    Stack<Object> stack;

    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>();
    }

    // 表示是一个嵌套测试！
    @Nested
    @DisplayName("when new")
    class WhenNew {

        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty());
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, stack::pop);
        }

        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, stack::peek);
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {

            String anElement = "an element";

            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }

            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}
```





## 6、参数化测试



参数化测试是JUnit5很重要的一个新特性，它使得用不同的参数多次运行测试成为了可能，也为我们的单元测试带来许多便利。

利用**@ValueSource**等注解，指定入参，我们将可以使用不同的参数进行多次单元测试，而不需要每新增一个参数就新增一个单元测试，省去了很多冗余代码。



- **@ValueSource**: 为参数化测试指定入参来源，支持八大基础类以及String类型,Class类型

- **@NullSource**: 表示为参数化测试提供一个null的入参

- **@EnumSource**: 表示为参数化测试提供一个枚举入参

- **@CsvFileSource**：表示读取指定CSV文件内容作为参数化测试入参

- **@MethodSource**：表示读取指定方法的返回值作为参数化测试入参(注意方法返回需要是一个流)





- 当然如果参数化测试仅仅只能做到指定普通的入参还达不到让我觉得惊艳的地步。让我真正感到他的强大之处的地方在于他可以支持外部的各类入参。

- 如:CSV,YML,JSON 文件甚至方法的返回值也可以作为入参。只需要去实现**ArgumentsProvider**接口，任何外部文件都可以作为它的入参。







```java
// 参数化测试：
@ParameterizedTest
@ValueSource(strings = {"one", "two", "three"})
@DisplayName("参数化测试1")
public void parameterizedTest1(String string) {
    System.out.println(string);
    Assertions.assertTrue(StringUtils.isNotBlank(string));
}

@ParameterizedTest
@MethodSource("method")    //指定方法名
@DisplayName("方法来源参数")
public void testWithExplicitLocalMethodSource(String name) {
    System.out.println(name);
    Assertions.assertNotNull(name);
}

static Stream<String> method() {
    return Stream.of("apple", "banana");
}
```





## 7、迁移指南





**Junit4迁移到Junit5：**

- 注解在 org.junit.jupiter.api 包中，断言在 org.junit.jupiter.api.Assertions 类中，前置条件在 org.junit.jupiter.api.Assumptions 类中。
- 把@Before 和@After 替换成@BeforeEach 和@AfterEach。

- 把@BeforeClass 和@AfterClass 替换成@BeforeAll 和@AfterAll。
- 把@Ignore 替换成@Disabled。

- 把@Category 替换成@Tag。
- 把@RunWith、@Rule 和@ClassRule 替换成@ExtendWith。







# 九、指标监控





## 1、SpringBoot Actuator



> 未来每一个微服务在云上部署以后，我们都需要对其进行监控、追踪、审计、控制等。SpringBoot就抽取了Actuator场景，使得我们每个微服务快速引用即可获得生产级别的应用监控、审计等功能。





### 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```





**自动导入的东西：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@8bbe00a7c41946061a7a173ed11cbec470d214b7/2021/10/13/735adc4a2a3e922404ac737911a36015.png)





### 版本差异



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@55f891ecfa3076845af59deba7da2c0905a0b29b/2021/10/13/43f1a7eecac8e6447a2d74be0cc12422.png)





### 配置文件



- HTTP：默认只暴露**health** Endpoint，即web方式暴露！
- **JMX**：默认暴露所有Endpoint，即电脑cmd输入jconsole即可打开一个JDK自带的控制台，可以监控所有信息！



```yaml
management:
  endpoints:
    enabled-by-default: true # 开启全部endpoints 或设置为false，在下面动开启某一项
    web:
      exposure:
        include: '*' # web方式全部暴露，默认只有health一个
```



### 访问测试



访问地址：http://localhost:8080/actuator/**

返回的结果都是JSON格式！推荐使用浏览器插件格式化JSON数据！

暴露所有监控信息为HTTP！



- http://localhost:8080/actuator/beans

- http://localhost:8080/actuator/configprops

- http://localhost:8080/actuator/metrics

- http://localhost:8080/actuator/metrics/jvm.gc.pause

- http://localhost:8080/actuator/metrics/ + endpointName







## 2、Actuator Endpoint





### 最常使用的端点



| ID                 | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `auditevents`      | 暴露当前应用程序的审核事件信息。需要一个`AuditEventRepository组件`。 |
| `beans`            | 显示应用程序中所有Spring Bean的完整列表。                    |
| `caches`           | 暴露可用的缓存。                                             |
| `conditions`       | 显示自动配置的所有条件信息，包括匹配或不匹配的原因。         |
| `configprops`      | 显示所有`@ConfigurationProperties`。                         |
| `env`              | 暴露Spring的属性`ConfigurableEnvironment`                    |
| `flyway`           | 显示已应用的所有Flyway数据库迁移。 需要一个或多个`Flyway`组件。 |
| `health`           | 显示应用程序运行状况信息。                                   |
| `httptrace`        | 显示HTTP跟踪信息（默认情况下，最近100个HTTP请求-响应）。需要一个`HttpTraceRepository`组件。 |
| `info`             | 显示应用程序信息。                                           |
| `integrationgraph` | 显示Spring `integrationgraph` 。需要依赖`spring-integration-core`。 |
| `loggers`          | 显示和修改应用程序中日志的配置。                             |
| `liquibase`        | 显示已应用的所有Liquibase数据库迁移。需要一个或多个`Liquibase`组件。 |
| `metrics`          | 显示当前应用程序的“指标”信息。                               |
| `mappings`         | 显示所有`@RequestMapping`路径列表。                          |
| `scheduledtasks`   | 显示应用程序中的计划任务。                                   |
| `sessions`         | 允许从Spring Session支持的会话存储中检索和删除用户会话。需要使用Spring Session的基于Servlet的Web应用程序。 |
| `shutdown`         | 使应用程序正常关闭。默认禁用。                               |
| `startup`          | 显示由`ApplicationStartup`收集的启动步骤数据。需要使用`SpringApplication`进行配置`BufferingApplicationStartup`。 |
| `threaddump`       | 执行线程转储。                                               |





**如果您的应用程序是Web应用程序（Spring MVC，Spring WebFlux或Jersey），则可以使用以下附加端点：**

| ID           | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `heapdump`   | 返回`hprof`堆转储文件。                                      |
| `jolokia`    | 通过HTTP暴露JMX bean（需要引入Jolokia，不适用于WebFlux）。需要引入依赖`jolokia-core`。 |
| `logfile`    | 返回日志文件的内容（如果已设置`logging.file.name`或`logging.file.path`属性）。支持使用HTTP`Range`标头来检索部分日志文件的内容。 |
| `prometheus` | 以Prometheus服务器可以抓取的格式公开指标。需要依赖`micrometer-registry-prometheus`。 |





**最常用的Endpoint：**

- Health：健康状况
- **Metrics：运行时指标**

- Loggers：日志记录





### Health Endpoint



健康检查端点，我们一般用于在云平台，平台会定时的检查应用的健康状况，我们就需要Health Endpoint可以为平台返回当前应用的一系列组件健康状况的集合。

重要的几点：全部健康才健康！

- health endpoint返回的结果，应该是一系列健康检查后的一个汇总报告
- 很多的健康检查默认已经自动配置好了，比如：数据库、redis等

- 可以很容易的添加自定义的健康检查机制





**设置某个endpoint，开启详细信息：**



```yaml
management:
  endpoints:
    enabled-by-default: true # 开启全部endpoints 或设置为false，在下面动开启某一项
    web:
      exposure:
        include: '*' # web方式全部暴露，默认只有health一个
  endpoint:
    health:
      show-details: always # 开启显示健康状况的详细信息
```





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@678cd4b7c7c91480763f48c4d4300f0507719308/2021/10/13/31b4aa0e6b18da3b6f752fcfe1865588.png)





### Metrics Endpoint



提供详细的、层级的、空间指标信息，这些信息可以被pull（主动推送）或者push（被动获取）方式得到；

- 通过Metrics对接多种监控系统
- 简化核心Metrics开发

- 添加自定义Metrics或者扩展已有Metrics



访问查看：http://localhost:8080/actuator/metrics/jvm.gc.pause，后面跟上下面的项即可！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@20dd9ded66831acf436c96ccbee2ffb2ca37c372/2021/10/13/b89587bbd68464913c414df3dda00790.png)





### 管理Endpoints



**开启与禁用Endpoints：**

- 默认所有的Endpoint除过shutdown都是开启的。
- 需要开启或者禁用某个Endpoint。配置模式为  management.endpoint.endpointName.enabled = true
- jmx和http方式都会受到总开关的控制！



```yaml
management:
  endpoints:
    enabled-by-default: true # 开启全部endpoints 或设置为false，在下面动开启某一项
```



- 或者禁用所有的Endpoint然后手动开启指定的Endpoint



```yaml
management:
  endpoints:
    enabled-by-default: false
  endpoint:
    beans:
      enabled: true
    health:
      enabled: true
```









## 3、定制 Endpoint



### 定制 Health 信息



```java
/**
 * @author ITNXD
 * @create 2021-10-10 15:54
 */
@Component
// 组件名字就是类名截掉HealthIndicator剩下的！
// 继承抽象类或者实现 HealthIndicator 接口！
public class MyHealthIndicator extends AbstractHealthIndicator {

    /**
     * 自定义健康检查！
     *
     * @param builder
     * @throws Exception
     */
    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {

        HashMap<String, Object> map = new HashMap<>();

        if(true){
            // builder.up(); 健康
            // builder.status(Status.OUT_OF_SERVICE);
            builder.status(Status.UP);
            map.put("count", 5);
            map.put("ms", 100);
        }else{
            // builder.down();
            builder.status(Status.DOWN);
            map.put("error", "连接超时");
            map.put("ms", 3000);
        }

        builder.withDetail("code", 110).withDetails(map);
    }
}
```







### 定制info信息



#### 编写配置文件

```yaml
# 定制info信息
info:
  appName: boot-admin
  version: 2.0.1
  mavenProjectName: @project.artifactId@  #使用@@可以获取maven的pom文件值
  mavenProjectVersion: @project.version@
```



#### 编写InfoContributor



```java
@Component // 这个不要求类名后缀为 InfoContributor
public class AppInfoContributor implements InfoContributor {

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("msg","你好")
                .withDetail("hello", "哈哈哈")
                .withDetails(Collections.singletonMap("world", 666));
    }

}
```



**测试**：http://localhost:8080/actuator/info



### 定制Metrics信息



#### SpringBoot默认支持



- JVM metrics, report utilization of:

  - Various memory and buffer pools
  - Statistics related to garbage collection
  - Threads utilization
  - Number of classes loaded/unloaded

- CPU metrics
- File descriptor metrics

- Kafka consumer and producer metrics
- Log4j2 metrics: record the number of events logged to Log4j2 at each level

- Logback metrics: record the number of events logged to Logback at each level
- Uptime metrics: report a gauge for uptime and a fixed gauge representing the application’s absolute start time

- Tomcat metrics (`server.tomcat.mbeanregistry.enabled` must be set to `true` for all Tomcat metrics to be registered)
- [Spring Integration](https://docs.spring.io/spring-integration/docs/5.4.1/reference/html/system-management.html#micrometer-integration) metrics





#### 增加定制Metrics



调用一次saveCity方法，设置的指标值`myservice.method.running.counter`就会加一！



```java
@Service
public class CityService {

    Counter counter;

    // 定制metrics
    public CityService(MeterRegistry meterRegistry){
        counter = meterRegistry.counter("myservice.method.running.counter");
    }

    public void saveCity(City city) {
        // 定制metrics
        counter.increment();

        cityMapper.insert(city);
    }
}
```





### 定制Endpoint



```java
/**
 * 自定义endpoint!
 *
 * @author ITNXD
 * @create 2021-10-10 17:05
 */
// 自定义的不在默认的配置里，默认开启！可以使用 @ConfigurationProperties绑定配置文件
@Component
@Endpoint(id = "myService")
public class MyServiceEndPoint {

    /**
     * http://localhost:8888/actuator/myService 即可调用该方法！
     * http://localhost:8888/actuator
     *
     * @return
     */
    @ReadOperation
    public Map getDockerInfo(){
        return Collections.singletonMap("info","docker started...");
    }

    @WriteOperation
    private void restartDocker(){
        System.out.println("docker restarted....");
    }
}
```







## 4、微服务可视化监控



> 官方地址：[https://github.com/codecentric/spring-boot-admin](https://github.com/codecentric/spring-boot-admin)
>
> 快速开启：[https://codecentric.github.io/spring-boot-admin/2.5.1/#getting-started](https://codecentric.github.io/spring-boot-admin/2.5.1/#getting-started)





### 准备 Admin Server



新建一个module，用来配置admin server！





**导入依赖：**



```xml
<dependencies>

    <!--
    https://codecentric.github.io/spring-boot-admin/2.5.1/#getting-started
    -->
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-starter-server</artifactId>
        <version>2.5.1</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```







**主配置类开启AdminServer：**



```java
@EnableAdminServer
@SpringBootApplication
public class HelloWorld5Application {

    public static void main(String[] args) {
        SpringApplication.run(HelloWorld5Application.class, args);
    }

}
```





**指定一个不同端口：**



```properties
server.port=8889
```





**启动即可！**





### 项目中引用AdminServer



**引入监控依赖：**



```xml
<!--
 引入admin监控！
-->
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.5.1</version>
</dependency>
```



**配置文件配置监控地址：**



```properties
spring.boot.admin.client.url=http://localhost:8889
# 使用ip注册，默认是使用电脑名为主机地址
spring.boot.admin.client.instance.prefer-ip=true
# 指定应用名称
spring.application.name=HelloWorld4
management.endpoints.web.exposure.include=*
```







# 十、原理解析





## 1、profile功能



> 为了方便多环境适配，springboot简化了profile功能！







### application-profile功能



- 默认配置文件  application.yaml；任何时候都会加载
- 指定环境配置文件  application-{env}.yaml

- 激活指定环境

  - 配置文件激活
  - 命令行激活：java -jar xxx.jar --**spring.profiles.active=prod  --person.name=haha**
    - **修改配置文件的任意值，命令行优先**

- 默认配置与环境配置同时生效
- 同名配置项，profile配置优先





**application.properties：**

```properties
person.name=张三111
person.age=2222
```

**application-prod.yml：**

```yaml
person:
  name: prod-李四
```

**application-test.yml：**

```yaml
person:
  name: test-李四
  age: 45
```



**测试：** 返回张三111



```java
@RestController
public class HelloController {

    // 从配置文件中取，取不到取:后的默认值
    @Value("${person.name:李四}")

    @GetMapping("/hello")
    public String hello(){
        return name;
    }
}
```



**可以在application.properties中激活指定环境：**

```properties
# 激活指定环境，当前环境和指定环境都会生效，同配置则指定环境覆盖当前环境！
spring.profiles.active=test
```



### @Profile条件装配功能



**可以标注在方法上也可以标注在类上，用来在指定环境下生效的条件装配功能！**



**二者都实现了Person接口，可以使用profile注解标注指定什么环境下有效：**



```java
public interface Person {

}

@Profile({"prod", "default"})
@Data
@Component
@ConfigurationProperties(prefix = "person")
public class Boss implements Person{

    private String name;
    private Integer age;
}

@Profile("test")
@Data
@Component
@ConfigurationProperties(prefix = "person")
public class Worker implements Person{

    private String name;
    private Integer age;
}
```



**application.properties文件来指定生效配置：**

```properties
spring.profiles.active=test
```



**测试：**

```java
@RestController
public class HelloController {

    @Autowired
    private Person person;

    @GetMapping("/person")
    public String person(){
        return person.getClass().toString();
    }
}
```









### profile分组



可以将各种配置文件都通过profile分组写进来，显示指明使用哪个组，一个组可以有多个配置文件，相当于分文件分类配置，清晰明了！



```properties
# 几乎分组myprod
spring.profiles.active=myprod

spring.profiles.group.myprod[0]=ppd
spring.profiles.group.myprod[1]=prod

spring.profiles.group.mytest[0]=test
```





## 2、外部化配置



> [https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)









### 外部配置源

- Java属性文件
- YAML文件
- 环境变量
- 命令行参数



**value注解获取系统环境变量：**



```java
// 从本电脑取环境变量值
@Value("${CLASSPATH}")
private String msg;
```



**启动类获取系统环境变量：**

```java
@SpringBootApplication
public class HelloWorld6Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext run = 
                SpringApplication.run(HelloWorld6Application.class, args);

        ConfigurableEnvironment environment = run.getEnvironment();

        Map<String, Object> systemEnvironment = environment.getSystemEnvironment();

        MutablePropertySources propertySources = environment.getPropertySources();

        System.out.println(systemEnvironment);
        System.out.println(propertySources);

    }

}
```





### 配置文件查找位置



- classpath 根路径
- classpath 根路径下config目录

- jar包当前目录

- jar包当前目录的config目录

- jar包当前目录/config子目录的直接子目录



**后面覆盖前面！**





### 配置文件加载顺序

1. 当前jar包内部的application.properties和application.yml
2. 当前jar包内部的application-{profile}.properties 和 application-{profile}.yml
3. 引用的外部jar包的application.properties和application.yml
4. 引用的外部jar包的application-{profile}.properties 和 application-{profile}.yml



**后面覆盖前面！**



**指定环境优先，外部优先，后面的可以覆盖前面的同名配置项！**







## 3、自定义starter



### Starter结构图



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@7ebf05025645ac65d8bc4b3973dbcb2d5af3918f/2021/10/13/1801e123a25a56561be9abd1ea7a7050.png)





- autoconfigure包中配置使用 **META-INF/spring.factories** 中 **EnableAutoConfiguration 的值，使得项目启动加载指定的自动配置类**
- **编写自动配置类 xxxAutoConfiguration -> xxxxProperties**

- - **@Configuration**
  - **@Conditional**

- - **@EnableConfigurationProperties**
  - **@Bean**

- - ......

**引入starter** **--- xxxAutoConfiguration --- 容器中放入组件 ---- 绑定xxxProperties ----** **配置项**





### 创建 Starter Maven Module

- 用来让人引用
- 引用autoconfigure包实现功能
- 全部完成后使用Maven的生命周期中的 clean + install 进行打包并安装到本地Maven仓库即可！



```xml
<groupId>com.itnxd</groupId>
<artifactId>itnxd-hello-spring-boot-starter</artifactId>
<version>1.0-SNAPSHOT</version>


<!--引入自动配置包-->
<dependencies>
    <dependency>
        <groupId>com.itnxd</groupId>
        <artifactId>itnxd-hello-spring-boot-starter-autoconfigure</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </dependency>
</dependencies>
```





### 创建 Autoconfigure Boot Module



下方全部配置完成，使用Maven的生命周期中的 clean + install 进行打包并安装到本地Maven仓库即可！



```xml
<groupId>com.itnxd</groupId>
<artifactId>itnxd-hello-spring-boot-starter-autoconfigure</artifactId>
<version>0.0.1-SNAPSHOT</version>

<name>itnxd-hello-spring-boot-starter-autoconfigure</name>
<description>itnxd-hello-spring-boot-starter-autoconfigure</description>

<properties>
    <java.version>1.8</java.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```





**HelloService：**

不要放在容器中，要使用自动配置类来控制！

```java
/**
 * 不要放在容器中！使用配置类放！
 * @author ITNXD
 * @create 2021-10-11 9:57
 */
public class HelloService {

    @Autowired
    HelloServiceProperties helloServiceProperties;

    public String sayHello(String name){
        return helloServiceProperties.getPrefix() + name +
                helloServiceProperties.getSuffix();
    }
}
```



**HelloServiceProperties：**



- 绑定配置文件前缀



```java
/**
 * @author ITNXD
 * @create 2021-10-11 10:03
 */
@ConfigurationProperties(prefix = "itnxd.hello")
public class HelloServiceProperties {

    private String prefix;
    private String suffix;

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }
}
```





**HelloServiceAutoConfiguration：**



自动配置类！我们自己的项目没有实现HelloService的话，自动配置类才会向容器中添加默认的HelloService！



```java
@Configuration
@EnableConfigurationProperties(HelloServiceProperties.class)
public class HelloServiceAutoConfiguration {

    // 这个写到下面，没有HelloService，但是属性配置文件绑定还得在！
    @ConditionalOnMissingBean(HelloService.class)
    @Bean
    public HelloService helloService(){
        return new HelloService();
    }
}
```





**resources/META-INF/spring.factories：**



上面配置的自动配置类默认不会生效，需要在spring.factories指定开启的自动配置类才行！



```factories
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.itnxd.hello.auto.HelloServiceAutoConfiguration
```











### 创建测试 Module





**导入自定义的依赖：**

```xml
<dependency>
    <groupId>com.itnxd</groupId>
    <artifactId>itnxd-hello-spring-boot-starter</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```



**自定义的配置前缀：**



```properties
itnxd.hello.prefix=hh
itnxd.hello.suffix=zz
```



**Controller测试：**

```java
@RestController
public class HelloController {

    // 自动注入我们的HelloService
    @Autowired
    HelloService helloService;

    @GetMapping("/hello")
    public String hello(){
        String h = helloService.sayHello("张三");
        return h;
    }
}
```



**若我们自己实现了HelloService，自动配置类会发现，则不会放入默认的HelloService：**



```java
@Configuration
public class MyConfig {

    // 容器中有了自己的HelloService则不会去调用autoconfigure中的HelloService!
    @Bean
    public HelloService helloService(){
        HelloService helloService = new HelloService();
        // 我们的逻辑...
        return helloService;
    }
}
```









## 4、SpringBoot原理





### SpringBoot启动过程





- **创建 SpringApplication**
  - 保存一些信息。
  - 判定当前应用的类型。ClassUtils。Servlet
  - **bootstrappers：初始启动引导器**（`List<Bootstrapper>`）：去**spring.factories**文件中找 org.springframework.boot.Bootstrapper
  - 找 **ApplicationContextInitializer**；去**spring.factories**找 ApplicationContextInitializer
  - 找 **ApplicationListener**  ；应用监听器。去**spring.factories**找 ApplicationListener
- **运行 SpringApplication**
  - **StopWatch**
  - 记录应用的启动时间
  - **创建引导上下文（Context环境）**createBootstrapContext()
    - **获取到所有之前的 bootstrappers 挨个执行 intitialize() 来完成对引导启动器上下文环境设置**
  - 让当前应用进入**headless模式**。java.awt.headless
  - 获取所有 **RunListener（运行监听器）**【为了方便所有Listener进行事件感知】
    - **getSpringFactoriesInstances** 去**spring.factories**找 SpringApplicationRunListener. 
  - **遍历 SpringApplicationRunListener 调用 starting 方法**
    - 相当于通知所有感兴趣系统正在启动过程的人，项目正在 starting。
  - 保存命令行参数；ApplicationArguments
  - **准备环境** prepareEnvironment（）;
    - 返回或者**创建基础环境信息对象**。StandardServletEnvironment
    - **配置**环境信息对象。读取所有的配置源的配置属性值。
    - 绑定环境信息
    - **监听器**调用 listener.environmentPrepared()；**通知所有的监听器当前环境准备完成**
  - **创建IOC容器**（createApplicationContext（））
    - 根据项目类型（Servlet）创建容器，
    - 当前会创建 AnnotationConfigServletWebServerApplicationContext
  - **准备ApplicationContext IOC容器的基本信息**   prepareContext()
    - 保存环境信息
    - IOC容器的后置处理流程。
    - **应用初始化器**；applyInitializers；
      - 遍历所有的 ApplicationContextInitializer 。**调用 initialize。来对ioc容器进行初始化扩展功能**
      - **遍历所有的 listener 调用 contextPrepared**。EventPublishRunListenr；通知所有的监听器contextPrepared
    - **所有的监听器调用 contextLoaded。通知所有的监听器 contextLoaded；**
  - **刷新IOC容器**。refreshContext。创建容器中的所有组件（Spring注解）
  - 容器刷新完成后工作 afterRefresh
  - 所有监听器调用 listeners.started(context); **通知所有的监听器 started**
  - **调用所有runners**；callRunners()
    - 获取容器中的 **ApplicationRunner** 
    - 获取容器中的  **CommandLineRunner**
    - 合并所有runner并且**按照@Order进行排序**
    - **遍历所有的runner。调用 run 方法**
  - **如果以上有异常，调用Listener 的 failed**
  - 调用所有监听器的 running 方法  listeners.running(context); **通知所有的监听器 running** 
  - **running如果有问题。继续通知 failed** 。调用所有 Listener 的 failed；**通知所有的监听器 failed**









### 自定义五大组件



- ApplicationContextInitializer

- ApplicationListener
- SpringApplicationRunListener
- ApplicationRunner
- CommandLineRunner



**ApplicationContextInitializer：**

```java
public class MyApplicationContextInitializer implements ApplicationContextInitializer {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {

        System.out.println("MyApplicationContextInitializer的initialize方法");
    }
}
```





**SpringApplicationRunListener：**



应用启动到终止的各个状态！



```java
public class MySpringApplicationRunListener implements SpringApplicationRunListener {

    private SpringApplication springApplication;

    public MySpringApplicationRunListener(SpringApplication application, String[] args){
        this.springApplication = application;
    }

    @Override
    public void starting(ConfigurableBootstrapContext bootstrapContext) {
        System.out.println("MySpringApplicationRunListener---------starting");
    }

    @Override
    public void environmentPrepared(ConfigurableBootstrapContext bootstrapContext, ConfigurableEnvironment environment) {
        System.out.println("MySpringApplicationRunListener---------environmentPrepared");
    }

    @Override
    public void contextPrepared(ConfigurableApplicationContext context) {
        System.out.println("MySpringApplicationRunListener---------contextPrepared");
    }

    @Override
    public void contextLoaded(ConfigurableApplicationContext context) {
        System.out.println("MySpringApplicationRunListener---------contextLoaded");
    }

    @Override
    public void started(ConfigurableApplicationContext context) {
        System.out.println("MySpringApplicationRunListener---------started");
    }

    @Override
    public void running(ConfigurableApplicationContext context) {
        System.out.println("MySpringApplicationRunListener---------running");
    }

    @Override
    public void failed(ConfigurableApplicationContext context, Throwable exception) {
        System.out.println("MySpringApplicationRunListener---------failed");
    }
}
```





**ApplicationListener：**



```java
public class MyApplicationListener implements ApplicationListener {

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        System.out.println("MyApplicationListener的onApplicationEvent");
    }
}
```



**ApplicationRunner：**

```java
@Order(1)
@Component
public class MyApplicationRunner implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("MyApplicationRunner===============run");
    }
}
```



**CommandLineRunner：**

```java
/**
 * 应用启动做一些事情！
 * @author ITNXD
 * @create 2021-10-11 13:30
 */
@Order(2)
@Component
public class MyCommandLineRunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("MyCommandLineRunner===============run");
    }
}
```



**前三大组件需要在spring.factories指定：**



```factories
# Initializers
org.springframework.context.ApplicationContextInitializer=\
com.itnxd.boot.listener.MyApplicationContextInitializer

# Application Listeners
org.springframework.context.ApplicationListener=\
com.itnxd.boot.listener.MyApplicationListener

# Application RunListener
org.springframework.boot.SpringApplicationRunListener=\
com.itnxd.boot.listener.MySpringApplicationRunListener
```







**效果：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@5c0811d843827515d0140795b184382643e024e7/2021/10/13/7ad9bff975d5f0e7299540f3118c2da6.png)

