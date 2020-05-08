---
title: Java教程系列之加密与安全
author: Mr.Niu
toc: true
abbrlink: 25096
img: 'https://img.niuxvdong.top/ckjnlk6.jpg'
thumbnail: 'https://img.niuxvdong.top/ckjnlk6.jpg'
categories:
  - Java教程
tags:
  - 加密
  - 安全
date: 2020-04-20 20:12:43
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "1210461" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}





> [这一节你一定会懵逼，不过这都是绝对会用到知识，先简单过一遍，用到了再细过一次！点击这里，查看原文！](https://www.liaoxuefeng.com/wiki/1252599548343744/1255943717668160)
>
> 看的是真的艰难啊！坚持中！！！





## 一、URL编码



> URL编码是浏览器发送数据给服务器时使用的编码，它通常附加在URL的参数部分。
>
> 服务器只识别ASCII字符！
>
> **URL编码是编码算法，不是加密算法！（主要用来处理文本如汉字。。）**



### 1、编码规则



- 如果字符是`A` ~ `Z`，`a` ~ `z`，`0` ~ `9`以及`-`、`_`、`.`、`*`、`=`，则保持不变；
- 如果是其他字符，先转换为UTF-8编码，然后对每个字节以`%XX`表示。都是大写。

例如：字符`中`的UTF-8编码是`0xe4b8ad`，因此，它的URL编码是`%E4%B8%AD`。URL编码总是大写。





### 2、使用URLEncoder



> `中`的URL编码是`%E4%B8%AD`，`文`的URL编码是`%E6%96%87`，`!`虽然是ASCII字符，也要对其编码为`%21`。
>
> URL编码与UTF-8编码相对应。
>
> 和标准的URL编码稍有不同，URLEncoder把空格字符编码成`+`，而现在的URL编码标准要求空格被编码为`%20`，不过，服务器都可以处理这两种情况。
>
> 浏览器加号和%20都可以处理为空格：





```java
package com.org;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class EnCode {
    public static void main(String[] args) {
        // https://www.baidu.com/s?wd=%E4%B8%AD%E6%96%87
        // 编码：
        String encoded = URLEncoder.encode("中文!", StandardCharsets.UTF_8);
        System.out.println(encoded); // %E4%B8%AD%E6%96%87%21
        
        // 解码：
        String decoded = URLDecoder.decode(encoded, StandardCharsets.UTF_8);
        System.out.println(decoded); // 中文!
    }
}
```





## 二、Base64编码



> URL编码是对字符进行编码，表示成`%xx`的形式，而Base64编码是对二进制数据进行编码，表示成文本格式。
>
> Base64编码的目的是把二进制数据变成文本格式，这样在很多文本中就可以处理二进制数据。例如，电子邮件协议就是文本协议，如果要在电子邮件中添加一个二进制文件，就可以用Base64编码，然后以文本的形式传送。
>
> Base64编码的缺点是传输效率会降低，因为它把原始数据的长度增加了1/3。（？？？不明白）
>
> **和URL编码一样，Base64编码是一种编码算法，不是加密算法。**
>
> 如果把Base64的64个字符编码表换成32个、48个或者58个，就可以使用Base32编码，Base48编码和Base58编码。字符越少，编码的效率就会越低。



### 1、编码规则



将三字节的十六进制表示为二进制0和1，一共24bit，然后每6bit一组，得到四个十进制数：（6bit范围为0-63，可以用64个字符表示：）

字符`A` ~ `Z`对应索引`0` ~ `25`

字符`a` ~ `z`对应索引`26` ~ `51`

字符`0` ~ `9`对应索引`52` ~ `61`

最后两个索引`62`、`63`分别用字符`+`和`/`表示。



### 2、使用Base64





> 二进制数据就是`byte[]`数组。Java标准库提供了`Base64`来对`byte[]`数组进行编解码：
>
> 编码：3byte转6bit，转化为四个十六进制，将对应的十六进制转化为十进制再去上面的规则中查找，返回四个字符：5Lit
>
> 解码：将编码后字符按上面规则转化为十进制再转换为二进制，得到3byte，24bit的0和1，再将其转化为十进制输出，有正负区别：[-28, -72, -83]



```java
package com.org;

import java.util.Arrays;
import java.util.Base64;

public class Base64EnCode {
    public static void main(String[] args) {
        // 0xe4b8ad
        // 编码：(3byte -> 6bit一组进行十六进制转换【39, 0b, 22, 2d】)
        byte[] input = new byte[] { (byte) 0xe4, (byte) 0xb8, (byte) 0xad };
        String b64encoded = Base64.getEncoder().encodeToString(input);
        System.out.println(b64encoded); // 5Lit

        // 解码：
        byte[] output = Base64.getDecoder().decode(b64encoded);
        System.out.println(Arrays.toString(output)); // [-28, -72, -83]
    }
}
```





### 3、Byte数组长度不为3倍数



> 每三个元素为一组，不为3的倍数如何处理呢？
>
> 这种情况下，需要对输入的末尾补一个或两个`0x00`，编码后，在结尾加一个`=`表示补充了1个`0x00`，加两个`=`表示补充了2个`0x00`，解码的时候，去掉末尾补充的一个或两个`0x00`即可。
>
> 编码后的长度加上`=`总是4的倍数，所以即使不加`=`也可以计算出原始输入的`byte[]`。
>
> 对于下方例子：前3byte按6bit一组为5Lit，最后1byte(0x21)，前6bit为I，后两个bit补充4个0，达到六bit，即对应Q。由于不够3倍数，会多加两个0x00，所以最终结果最后会多两个=号，代表加了两个0x00。
>
> 使用`withoutPadding`去除末尾等号！
>
> 解码同样，变为8bit的字节，转化为带符号的十进制输出！





```java
package com.org;

import java.util.Arrays;
import java.util.Base64;

public class Base64EnCode {
    public static void main(String[] args) {
        byte[] input1 = new byte[] { (byte) 0xe4, (byte) 0xb8, (byte) 0xad, (byte) 0x21 };
        // 编码：
        // 有=号：
        String b64encoded1 = Base64.getEncoder().encodeToString(input1);
        // 去等于号：
        String b64encoded2 = Base64.getEncoder().withoutPadding().encodeToString(input1);
        System.out.println(b64encoded1); // 5LitIQ==
        System.out.println(b64encoded2); // 5LitIQ
        // 解码：
        byte[] output1 = Base64.getDecoder().decode(b64encoded2);
        System.out.println(Arrays.toString(output1)); // [-28, -72, -83, 33]
    }
}
```





### 4、将Base64转化为URL编码



> URL编码允许出现的特殊符号：`-`、`_`、`.`、`*`、`=`
>
> Base64编码允许出现的特殊符号：`+`、`/`、`=`，
>
> 标准的Base64编码会出现`+`、`/`和`=`，所以不适合把Base64编码后的字符串放到URL中。一种针对URL的Base64编码可以在URL中使用的Base64编码，它仅仅是把`+`变成`-`，`/`变成`_`：





```java
package com.org;

import java.util.Arrays;
import java.util.Base64;

public class Base64EnCode {
    public static void main(String[] args) {

        byte[] input2 = new byte[] { 0x01, 0x02, 0x7f, 0x00 };
        // 针对URL的Base64编码：/ -> _
        String b64encoded3 = Base64.getUrlEncoder().encodeToString(input2);
        System.out.println(b64encoded3); // AQJ_AA==
        // 解码：
        byte[] output2 = Base64.getUrlDecoder().decode(b64encoded3);
        System.out.println(Arrays.toString(output2)); // [1, 2, 127, 0]
    }
}
```



---





> 下面就是加密算法：



## 三、哈希算法





### 1、哈希算法简介



> 哈希算法（Hash）又称摘要算法（Digest），它的作用是：对任意一组输入数据进行计算，得到一个固定长度的输出摘要。
>
> 哈希算法的目的就是为了验证原始数据是否被篡改。
>
> Java字符串的`hashCode()`就是一个哈希算法，它的输入是任意字符串，输出是固定的4字节`int`整数。
>
> 同样，有一个哈希冲突问题：（字节组合是有穷的，但输入组合是无穷的，一定会出现冲突。。）



特点：

- 相同的输入一定得到相同的输出；
- 不同的输入大概率得到不同的输出。





安全哈希算法条件：



- 碰撞概率低；
- 不能猜测输出。

一个hashCode例子：



```java
package com.org;

public class HashAlgorithm {
    public static void main(String[] args) {
        System.out.println("hello".hashCode()); // 99162322
        // 使用Ingeter实现十六进制输出
   System.out.println(Integer.toString("hello".hashCode(), 16)); // 5e918d2
    }
}
```

### 2、常见哈希算法



| 算法       | 输出长度（位） | 输出长度（字节） |
| :--------- | :------------- | :--------------- |
| MD5        | 128 bits       | 16 bytes         |
| SHA-1      | 160 bits       | 20 bytes         |
| RipeMD-160 | 160 bits       | 20 bytes         |
| SHA-256    | 256 bits       | 32 bytes         |
| SHA-512    | 512 bits       | 64 bytes         |







#### 2.1 MD5



> 使用`MessageDigest`时，我们首先根据哈希算法获取一个`MessageDigest`实例，然后，反复调用`update(byte[])`输入数据。当输入结束后，调用`digest()`方法获得byte[]数组表示的摘要，最后，把它转换为十六进制的字符串。



```java
package com.org;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class HashAlgorithm {
    public static void main(String[] args) throws Exception {
        // 创建一个MessageDigest实例:
        MessageDigest md = MessageDigest.getInstance("MD5");
        // 反复调用update输入数据:
        md.update("Hello".getBytes(StandardCharsets.UTF_8));
        md.update("World".getBytes(StandardCharsets.UTF_8));
        byte[] result = md.digest(); // 16 bytes: 68e109f0f40ca72a15e05cc22786f8e6
        // BigInteger的第一个signum参数表示符号位（1：正数；-1：负数）
        System.out.println(new BigInteger(1, result).toString(16));
    }
}
```





#### 2.2 其他哈希算法



>  将`MessageDigest.getInstance("MD5");`的算法模式修改即可！
>
> SHA-1也是一种哈希算法，它的输出是160 bits，即20字节。SHA-1是由美国国家安全局开发的，SHA算法实际上是一个系列，包括SHA-0（已废弃）、SHA-1、SHA-256、SHA-512等。
>
> **注意：MD5因为输出长度较短，短时间内破解是可能的，目前已经不推荐使用。**
>
> Java标准库支持的所有哈希算法可以在**[点击这里](https://docs.oracle.com/en/java/javase/14/docs/specs/security/standard-names.html#messagedigest-algorithms)**查到。



再举一个SHA-512算法：



```java
package com.org;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class HashAlgorithm {
    public static void main(String[] args) throws Exception {
        // 创建一个MessageDigest实例:
        MessageDigest md1 = MessageDigest.getInstance("SHA-512");
        // 反复调用update输入数据:
        md1.update("Hello".getBytes(StandardCharsets.UTF_8));
        md1.update("World".getBytes(StandardCharsets.UTF_8));
        byte[] result1 = md1.digest(); // 64 bytes: 8ae6ae71a75d3fb2e0225deeb004faf95d816a0a58093eb4cb5a3aa0f197050d7a4dc0a2d5c6fbae5fb5b0d536a0a9e6b686369fa57a027687c3630321547596
        System.out.println(new BigInteger(1, result1).toString(16));
    }
}
```







### 3、哈希算法的用途



- 验证文件完整性及是否篡改
- 数据库的用户口令密码的安全性和正确性



### 4、彩虹表



> 什么是彩虹表呢？上面讲到了，如果只拿到MD5，从MD5反推明文口令，只能使用暴力穷举的方法。
>
> 然而黑客并不笨，暴力穷举会消耗大量的算力和时间。但是，如果有一个预先计算好的常用口令和它们的MD5的对照表。
>
> 这就是为什么不要使用常用密码，以及不要使用生日作为密码的原因！





解决方法：



> 如果用户使用了常用口令，我们也可以采取措施来抵御彩虹表攻击，方法是对每个口令额外添加随机数，这个方法称之为加盐（salt）：
>
> 加盐的目的在于使黑客的彩虹表失效，即使用户使用常用口令，也无法从MD5反推原始口令。



```java
digest = md5(salt+inputPassword)
```





## 四、BouncyCastle



> [BouncyCastle](https://www.bouncycastle.org/)就是一个提供了很多哈希算法和加密算法的第三方库。它提供了Java标准库没有的一些算法，例如，RipeMD160哈希算法。
>
> 首先，我们必须把BouncyCastle提供的jar包放到classpath中。这个jar包就是`bcprov-jdk15on-xxx.jar`，可以从**[官方网站](https://www.bouncycastle.org/latest_releases.html)**下载。
>
> IDEA下载下来将其移到lib目录下，然后file->project structure->dependencies中右边的加号选择导入jre即可！
>
> **使用第三方算法前需要通过`Security.addProvider()`注册。（Java标准库的`java.security`包提供了一种标准机制，允许第三方提供商无缝接入。）**



```java
package com.org;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.Security;

public class BouncyCastle00 {
    public static void main(String[] args) throws Exception{
        // 注册BouncyCastle:
        Security.addProvider(new BouncyCastleProvider());
        // 按名称正常调用:
        MessageDigest md = MessageDigest.getInstance("RipeMD160");
        md.update("HelloWorld".getBytes(StandardCharsets.UTF_8));
        byte[] result = md.digest();
        // ecabeaa2eb986c85e6a6ea2c22b248ab6916de35
        System.out.println(new BigInteger(1, result).toString(16));
    }
}
```



## 五、Hmac算法



> 前面讲到哈希算法时，我们说，存储用户的哈希口令时，要加盐(salt)存储，目的就在于抵御彩虹表攻击。
>
> 这个salt可以看作是一个额外的“认证码”，同样的输入，不同的认证码，会产生不同的输出。因此，要验证输出的哈希，必须同时提供“认证码”。
>
> Hmac算法就是一种基于密钥的消息认证码算法，它的全称是Hash-based Message Authentication Code，是一种更安全的消息摘要算法。
>
> Hmac算法总是和某种哈希算法配合起来用的。



HmacMD5可以看作带有一个安全的key的MD5。使用HmacMD5而不是用MD5加salt，有如下好处：

- HmacMD5使用的key长度是64字节，更安全；
- Hmac是标准算法，同样适用于SHA-1等其他哈希算法；
- Hmac输出和原有的哈希算法长度一致。

可见，Hmac本质上就是把key混入摘要的算法。验证此哈希时，除了原始的输入数据，还要提供key。



> 为了保证安全，我们不会自己指定key，而是通过Java标准库的KeyGenerator生成一个安全的随机的key：





### 1、加密

一般步骤：

1. 通过名称`HmacMD5`获取`KeyGenerator`实例；
2. 通过`KeyGenerator`创建一个`SecretKey`实例；
3. 通过名称`HmacMD5`获取`Mac`实例；
4. 用`SecretKey`初始化`Mac`实例；
5. 对`Mac`实例反复调用`update(byte[])`输入数据；
6. 调用`Mac`实例的`doFinal()`获取最终的哈希值。





```java
package com.org;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

public class Hmac00 {
    public static void main(String[] args) throws Exception{
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacMD5");
        SecretKey key = keyGen.generateKey();
        // 打印随机生成的key:(64byte)
        byte[] skey = key.getEncoded();
        // 9e62a1d17f27ca9cad816dddce959e3d819e47eb1849adc4fb9a95ee8a2720b14aa9a054acf4a6e1c4028354ce322e58b4b787bab06294f737c606ac98ad6c43
        System.out.println(new BigInteger(1, skey).toString(16));

        Mac mac = Mac.getInstance("HmacMD5");
        // 使用随机key加盐：
        mac.init(key);
        mac.update("HelloWorld".getBytes(StandardCharsets.UTF_8));
        // salt + HelloWorld：转化为字节
        byte[] result = mac.doFinal();
        // 转化为16进制：(仍然是原长16byte)
        // cca902c5a59b5d7ac45bd856fcfdea34
        System.out.println(new BigInteger(1, result).toString(16));
    }
}
```





### 2、解密



> 不知道为啥，解密输出和原来并不一样。。。
>
> 先放下。。。



```java
package com.org;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class Hmac00 {
    public static void main(String[] args) throws Exception{
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacMD5");
        SecretKey key = keyGen.generateKey();
        // 打印随机生成的key:
        byte[] skey = key.getEncoded();
        System.out.println(new BigInteger(1, skey).toString(16));
        System.out.println(Arrays.toString(skey));

        Mac mac = Mac.getInstance("HmacMD5");
        // 使用随机key加盐：
        mac.init(key);
        mac.update("HelloWorld".getBytes(StandardCharsets.UTF_8));
        // salt + HelloWorld：转化为字节
        byte[] result = mac.doFinal();
        // 转化为16进制：
        System.out.println(new BigInteger(1, result).toString(16));
        
        /*解密：*/

        SecretKey key1 = new SecretKeySpec(skey, "HmacMD5");
        Mac mac1 = Mac.getInstance("HmacMD5");
        mac1.init(key1);
        mac1.update("HelloWorld".getBytes(StandardCharsets.UTF_8));
        byte[] result1 = mac.doFinal();
        System.out.println(Arrays.toString(result1));
        System.out.println(new BigInteger(1, result1).toString(16));

    }
}
```





## 六、对称加密算法



> 对称加密算法就是传统的用一个密码进行加密和解密。例如，我们常用的WinZIP和WinRAR对压缩包的加密和解密，就是使用对称加密算法。





### 1、常用对称加密算法



>密钥长度直接决定加密强度，而工作模式和填充模式可以看成是对称加密算法的参数和格式选择。Java标准库提供的算法实现并不包括所有的工作模式和所有填充模式，但是通常我们只需要挑选常用的使用就可以了。

最后注意，DES算法由于密钥过短，可以在短时间内被暴力破解，所以现在已经不安全了。

| 算法 | 密钥长度    | 工作模式             | 填充模式                                |
| :--- | :---------- | :------------------- | :-------------------------------------- |
| DES  | 56/64       | ECB/CBC/PCBC/CTR/... | NoPadding/PKCS5Padding/...              |
| AES  | 128/192/256 | ECB/CBC/PCBC/CTR/... | NoPadding/PKCS5Padding/PKCS7Padding/... |
| IDEA | 128         | ECB                  | PKCS5Padding/PKCS7Padding/...           |





### 2、使用AES加密



> AES算法是目前应用最广泛的加密算法。我们先用ECB模式加密并解密。
>
> 这鸡巴有点难搞。。。



一般步骤：

1. 根据算法名称/工作模式/填充模式获取Cipher实例；
2. 根据算法名称初始化一个SecretKey实例，密钥必须是指定长度；
3. 使用SerectKey初始化Cipher实例，并设置加密或解密模式；
4. 传入明文或密文，获得密文或明文。



#### 2.1 ECB模式



> ECB模式是最简单的AES加密模式，它只需要一个固定长度的密钥，固定的明文会生成固定的密文，这种一对一的加密方式会导致安全性降低！



```java
package com.org;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Base64;

public class AES00 {
    public static void main(String[] args) throws Exception{
        // 原文:
        String message = "Hello, world!";
        System.out.println("Message: " + message);
        // 128位密钥 = 16 bytes Key:（必须指定密钥长度）
        byte[] key = "1234567890abcdef".getBytes(StandardCharsets.UTF_8);
        // 加密:
        byte[] data = message.getBytes(StandardCharsets.UTF_8);
        byte[] encrypted = encrypt(key, data);
        // Encrypted: 2xiGROlFBhC57b7EGu5c3g==
        System.out.println("Encrypted: " + Base64.getEncoder().encodeToString(encrypted));
        // 解密:
        byte[] decrypted = decrypt(key, encrypted);
        // Decrypted: Hello, world!
        System.out.println("Decrypted: " + new String(decrypted, StandardCharsets.UTF_8));
    }

    // 加密:
    public static byte[] encrypt(byte[] key, byte[] input) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        SecretKey keySpec = new SecretKeySpec(key, "AES");
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);
        return cipher.doFinal(input);
    }

    // 解密:
    public static byte[] decrypt(byte[] key, byte[] input) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        SecretKey keySpec = new SecretKeySpec(key, "AES");
        cipher.init(Cipher.DECRYPT_MODE, keySpec);
        return cipher.doFinal(input);
    }
}
```



#### 2.2 CBC模式



> 更好的方式是通过CBC模式，它需要一个随机数作为IV参数，这样对于同一份明文，每次生成的密文都不同：
>
> 在CBC模式下，需要一个随机生成的16字节IV参数，必须使用`SecureRandom`生成。因为多了一个`IvParameterSpec`实例，因此，初始化方法需要调用`Cipher`的一个重载方法并传入`IvParameterSpec`。
>
> 观察输出，可以发现每次生成的IV不同，密文也不同。



```java
package com.org;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Base64;

public class AES_CBC {
    public static void main(String[] args) throws Exception{
    // 原文:
    String message = "Hello, world!";
    System.out.println("Message: " + message);
    // 256位密钥 = 32 bytes Key:
    byte[] key = "1234567890abcdef1234567890abcdef".getBytes(StandardCharsets.UTF_8);
    // 加密:
    byte[] data = message.getBytes(StandardCharsets.UTF_8);
    byte[] encrypted = encrypt(key, data);
    // Encrypted: DSXvNDWdzvPhMp9nGR0lXfiTE9lPcVbKSw4gWLGpxFU=
    System.out.println("Encrypted: " + Base64.getEncoder().encodeToString(encrypted));
    // 解密:
    byte[] decrypted = decrypt(key, encrypted);
    // Decrypted: Hello, world!
    System.out.println("Decrypted: " + new String(decrypted, StandardCharsets.UTF_8));
}

    // 加密:
    public static byte[] encrypt(byte[] key, byte[] input) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
        // CBC模式需要生成一个16 bytes的initialization vector:
        SecureRandom sr = SecureRandom.getInstanceStrong();
        byte[] iv = sr.generateSeed(16);
        IvParameterSpec ivps = new IvParameterSpec(iv);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivps);
        byte[] data = cipher.doFinal(input);
        // IV不需要保密，把IV和密文一起返回:
        return join(iv, data);
    }

    // 解密:
    public static byte[] decrypt(byte[] key, byte[] input) throws GeneralSecurityException {
        // 把input分割成IV和密文:
        byte[] iv = new byte[16];
        byte[] data = new byte[input.length - 16];
        System.arraycopy(input, 0, iv, 0, 16);
        System.arraycopy(input, 16, data, 0, data.length);
        // 解密:
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
        IvParameterSpec ivps = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivps);
        return cipher.doFinal(data);
    }

    public static byte[] join(byte[] bs1, byte[] bs2) {
        byte[] r = new byte[bs1.length + bs2.length];
        System.arraycopy(bs1, 0, r, 0, bs1.length);
        System.arraycopy(bs2, 0, r, bs1.length, bs2.length);
        return r;
    }
}
```





## 七、口令加密算法



> 上一节我们讲的AES加密，细心的童鞋可能会发现，密钥长度是固定的128/192/256位，而不是我们用WinZip/WinRAR那样，随便输入几位都可以。
>
> 这是因为对称加密算法决定了口令必须是固定长度，然后对明文进行分块加密。又因为安全需求，口令长度往往都是128位以上，即至少16个字符。
>
> 但是我们平时使用的加密软件，输入6位、8位都可以，难道加密方式不一样？
>
> 实际上用户输入的口令并不能直接作为AES的密钥进行加密（除非长度恰好是128/192/256位），并且用户输入的口令一般都有规律，安全性远远不如安全随机数产生的随机口令。因此，用户输入的口令，通常还需要使用PBE算法，采用随机数杂凑计算出真正的密钥，再进行加密。
>
> PBE的作用就是把用户输入的口令和一个安全随机的口令采用杂凑后计算出真正的密钥。以AES密钥为例，我们让用户输入一个口令，然后生成一个随机数，通过PBE算法计算出真正的AES口令，再进行加密，代码如下：





```java
package com.org;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.security.Security;
import java.util.Base64;

public class PBE00 {
    public static void main(String[] args) throws Exception {
        // 把BouncyCastle作为Provider添加到java.security:
        Security.addProvider(new BouncyCastleProvider());
        // 原文:
        String message = "Hello, world!";
        // 加密口令:
        String password = "hello12345";
        // 16 bytes随机Salt:
        byte[] salt = SecureRandom.getInstanceStrong().generateSeed(16);
        // salt: salt: 9ae41dc05680b0fda28be0f1d6454f3a
        System.out.printf("salt: %032x\n", new BigInteger(1, salt));
        // 加密:
        byte[] data = message.getBytes(StandardCharsets.UTF_8);
        byte[] encrypted = encrypt(password, salt, data);
        // encrypted: MHVOyeWBxGM7RhpN8xy9fA==
        System.out.println("encrypted: " + Base64.getEncoder().encodeToString(encrypted));
        // 解密:
        byte[] decrypted = decrypt(password, salt, encrypted);
        // decrypted: Hello, world!
        System.out.println("decrypted: " + new String(decrypted, StandardCharsets.UTF_8));
    }

    // 加密:
    public static byte[] encrypt(String password, byte[] salt, byte[] input) throws GeneralSecurityException {
        PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());
        SecretKeyFactory skeyFactory = SecretKeyFactory.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        SecretKey skey = skeyFactory.generateSecret(keySpec);
        PBEParameterSpec pbeps = new PBEParameterSpec(salt, 1000);
        Cipher cipher = Cipher.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        cipher.init(Cipher.ENCRYPT_MODE, skey, pbeps);
        return cipher.doFinal(input);
    }

    // 解密:
    public static byte[] decrypt(String password, byte[] salt, byte[] input) throws GeneralSecurityException {
        PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());
        SecretKeyFactory skeyFactory = SecretKeyFactory.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        SecretKey skey = skeyFactory.generateSecret(keySpec);
        PBEParameterSpec pbeps = new PBEParameterSpec(salt, 1000);
        Cipher cipher = Cipher.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        cipher.init(Cipher.DECRYPT_MODE, skey, pbeps);
        return cipher.doFinal(input);
    }
}

```



>使用PBE时，我们还需要引入BouncyCastle，并指定算法是`PBEwithSHA1and128bitAES-CBC-BC`。观察代码，实际上真正的AES密钥是调用`Cipher`的`init()`方法时同时传入`SecretKey`和`PBEParameterSpec`实现的。在创建`PBEParameterSpec`的时候，我们还指定了循环次数`1000`，循环次数越多，暴力破解需要的计算量就越大。
>
>如果我们把salt和循环次数固定，就得到了一个通用的“口令”加密软件。如果我们把随机生成的salt存储在U盘，就得到了一个“口令”加USB Key的加密软件，它的好处在于，即使用户使用了一个非常弱的口令，没有USB Key仍然无法解密，因为USB Key存储的随机数密钥安全性非常高。



## 八、密钥交换算法



> 解决如何传递密钥的问题：
>
> 在不安全的信道上传递加密文件是没有问题的，因为黑客拿到加密文件没有用。但是，如何如何在不安全的信道上安全地传输密钥？
>
> 要解决这个问题，密钥交换算法即DH算法：**Diffie-Hellman算法**应运而生。
>
> DH算法解决了密钥在双方不直接传递密钥的情况下完成密钥交换，这个神奇的交换原理完全由**数学理论**支持。
>
> 我们来看DH算法交换密钥的步骤。假设甲乙双方需要传递密钥，他们之间可以这么做：
>
> 1. 甲首选选择一个素数`p`，例如509，底数`g`，任选，例如5，随机数`a`，例如123，然后计算`A=g^a mod p`，结果是215，然后，甲发送`p＝509`，`g=5`，`A=215`给乙；
> 2. 乙方收到后，也选择一个随机数`b`，例如，456，然后计算`B=g^b mod p`，结果是181，乙再同时计算`s=A^b mod p`，结果是121；
> 3. 乙把计算的`B=181`发给甲，甲计算`s＝B^a mod p`的余数，计算结果与乙算出的结果一样，都是121。
>
> 所以最终双方协商出的密钥`s`是121。注意到这个密钥`s`并没有在网络上传输。而通过网络传输的`p`，`g`，`A`和`B`是无法推算出`s`的，因为**实际算法选择的素数是非常大的**。
>
> 所以，更确切地说，**DH算法是一个密钥协商算法**，双方最终协商出一个共同的密钥，而这个密钥不会通过网络传输。
>
> 如果我们把`a`看成甲的私钥，`A`看成甲的公钥，`b`看成乙的私钥，`B`看成乙的公钥，DH算法的本质就是双方各自生成自己的私钥和公钥，私钥仅对自己可见，然后交换公钥，并根据自己的私钥和对方的公钥，生成最终的密钥`secretKey`，**DH算法通过数学定律保证了双方各自计算出的`secretKey`是相同的。**
>
> 但是DH算法并未解决中间人攻击，即甲乙双方并不能确保与自己通信的是否真的是对方。消除中间人攻击需要其他方法。



Java实现DH算法如下：



```java
package com.org;

import javax.crypto.KeyAgreement;
import java.math.BigInteger;
import java.security.*;
import java.security.spec.X509EncodedKeySpec;

public class DH00 {
    public static void main(String[] args) {
// Bob和Alice:
        Person bob = new Person("Bob");
        Person alice = new Person("Alice");

        // 各自生成KeyPair:
        bob.generateKeyPair();
        alice.generateKeyPair();

        // 双方交换各自的PublicKey:
        // Bob根据Alice的PublicKey生成自己的本地密钥:
        bob.generateSecretKey(alice.publicKey.getEncoded());
        // Alice根据Bob的PublicKey生成自己的本地密钥:
        alice.generateSecretKey(bob.publicKey.getEncoded());

        // 检查双方的本地密钥是否相同:
        bob.printKeys();
        alice.printKeys();
        // 双方的SecretKey相同，后续通信将使用SecretKey作为密钥进行AES加解密...
    }
}

class Person {
    public final String name;

    public PublicKey publicKey;
    private PrivateKey privateKey;
    private byte[] secretKey;

    public Person(String name) {
        this.name = name;
    }

    // 生成本地KeyPair:
    public void generateKeyPair() {
        try {
            KeyPairGenerator kpGen = KeyPairGenerator.getInstance("DH");
            kpGen.initialize(512);
            KeyPair kp = kpGen.generateKeyPair();
            this.privateKey = kp.getPrivate();
            this.publicKey = kp.getPublic();
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }

    public void generateSecretKey(byte[] receivedPubKeyBytes) {
        try {
            // 从byte[]恢复PublicKey:
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(receivedPubKeyBytes);
            KeyFactory kf = KeyFactory.getInstance("DH");
            PublicKey receivedPublicKey = kf.generatePublic(keySpec);
            // 生成本地密钥:
            KeyAgreement keyAgreement = KeyAgreement.getInstance("DH");
            keyAgreement.init(this.privateKey); // 自己的PrivateKey
            keyAgreement.doPhase(receivedPublicKey, true); // 对方的PublicKey
            // 生成SecretKey密钥:
            this.secretKey = keyAgreement.generateSecret();
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }

    public void printKeys() {
        System.out.printf("Name: %s\n", this.name);
        System.out.printf("Private key: %x\n", new BigInteger(1, this.privateKey.getEncoded()));
        System.out.printf("Public key: %x\n", new BigInteger(1, this.publicKey.getEncoded()));
        System.out.printf("Secret key: %x\n", new BigInteger(1, this.secretKey));
    }
}
```





运行结果：（Secret key是相同的）





```
Name: Bob
Private key: 3081d202010030819706092a864886f70d010301308189024100fca682ce8e12caba26efccf7110e526db078b05edecbcd1eb4a208f3ae1617ae01f35b91a47e6df63413c5e12ed0899bcd132acd50d99151bdc43ee737592e170240678471b27a9cf44ee91a49c5147db1a9aaf244f05a434d6486931d2d14271b9e35030b71fd73da179069b32e2935630e1c2062354d0da20a6c416e50be794ca40202018004330231009b3e8e2cd56ae4b0501da4eeb6c2813370b5a3a73e8a1d9ccbbd6e30f27c1f1aa05d68d20da4bba167a8d141203b4d26
Public key: 3081e030819706092a864886f70d010301308189024100fca682ce8e12caba26efccf7110e526db078b05edecbcd1eb4a208f3ae1617ae01f35b91a47e6df63413c5e12ed0899bcd132acd50d99151bdc43ee737592e170240678471b27a9cf44ee91a49c5147db1a9aaf244f05a434d6486931d2d14271b9e35030b71fd73da179069b32e2935630e1c2062354d0da20a6c416e50be794ca4020201800344000241009b3b7b8ae229ff5f082b725d7f2f4f94c5cd61063e621776012d4a995df4f3ef8df2cadba6e2c54f1e639b7fa51ff84d3fbe74dd2bf55ec2f72cc7cf2a58947b
Secret key: 2e516324b72d75e81da0e9c4d328d9401478a07baf667a87e39e3d7c841c892af27d1cddf4a41767a78a2799a2bbb5f3a08988c5c59f6c058cd84d3e790b9bc5
Name: Alice
Private key: 3081d202010030819706092a864886f70d010301308189024100fca682ce8e12caba26efccf7110e526db078b05edecbcd1eb4a208f3ae1617ae01f35b91a47e6df63413c5e12ed0899bcd132acd50d99151bdc43ee737592e170240678471b27a9cf44ee91a49c5147db1a9aaf244f05a434d6486931d2d14271b9e35030b71fd73da179069b32e2935630e1c2062354d0da20a6c416e50be794ca4020201800433023100b5b2212c1d074a75eab86290b58d275252e062305ccc25a4b81e5cf96f41e053d15b8718b07cc414a2c0b800253d8df5
Public key: 3081df30819706092a864886f70d010301308189024100fca682ce8e12caba26efccf7110e526db078b05edecbcd1eb4a208f3ae1617ae01f35b91a47e6df63413c5e12ed0899bcd132acd50d99151bdc43ee737592e170240678471b27a9cf44ee91a49c5147db1a9aaf244f05a434d6486931d2d14271b9e35030b71fd73da179069b32e2935630e1c2062354d0da20a6c416e50be794ca40202018003430002404585b6c895f58eab57a3028f73d62beda35bea505b1a1ae11faafcc7c3054b61e5c4455d09fb1fd6c817147cb7ca9895620ced591183aa88d70a3fbf4b124213
Secret key: 2e516324b72d75e81da0e9c4d328d9401478a07baf667a87e39e3d7c841c892af27d1cddf4a41767a78a2799a2bbb5f3a08988c5c59f6c058cd84d3e790b9bc5
```



## 九、非对称加密算法



> 从DH算法我们可以看到，公钥-私钥组成的密钥对是非常有用的加密方式，因为公钥是可以公开的，而私钥是完全保密的，由此奠定了非对称加密的基础。
>
> 非对称加密就是加密和解密使用的不是相同的密钥：只有同一个公钥-私钥对才能正常加解密。
>
> 因此，如果小明要加密一个文件发送给小红，他应该首先向小红索取她的公钥，然后，他用小红的公钥加密，把加密文件发送给小红，此文件只能由小红的私钥解开，因为小红的私钥在她自己手里，所以，除了小红，没有任何人能解开此文件。
>
> 非对称加密的典型算法就是RSA算法，它是由Ron Rivest，Adi Shamir，Leonard Adleman这三个哥们一起发明的，所以用他们仨的姓的首字母缩写表示。
>
> 非对称加密相比对称加密的显著优点在于，对称加密需要协商密钥，而非对称加密可以安全地公开各自的公钥，在N个人之间通信的时候：使用非对称加密只需要N个密钥对，每个人只管理自己的密钥对。而使用对称加密需要则需要`N*(N-1)/2`个密钥，因此每个人需要管理`N-1`个密钥，密钥管理难度大，而且非常容易泄漏。
>
> 既然非对称加密这么好，那我们抛弃对称加密，完全使用非对称加密行不行？也不行。因为非对称加密的缺点就是运算速度非常慢，比对称加密要慢很多。
>
> 所以，在实际应用的时候，非对称加密总是和对称加密一起使用。假设小明需要给小红需要传输加密文件，他俩首先交换了各自的公钥，然后：
>
> 1. 小明生成一个随机的AES口令，然后用小红的公钥通过RSA加密这个口令，并发给小红；
> 2. 小红用自己的RSA私钥解密得到AES口令；
> 3. 双方使用这个共享的AES口令用AES加密通信。
>
> 可见非对称加密实际上应用在第一步，即加密“AES口令”。这也是我们在浏览器中常用的HTTPS协议的做法，即浏览器和服务器先通过RSA交换AES口令，接下来双方通信实际上采用的是速度较快的AES对称加密，而不是缓慢的RSA非对称加密。





RSA算法的实现：





```java
package com.org;

import javax.crypto.Cipher;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.*;

public class RSA00 {
    public static void main(String[] args) throws Exception {
        // 明文:
        byte[] plain = "Hello, encrypt use RSA".getBytes(StandardCharsets.UTF_8);
        // 创建公钥／私钥对:
        Person1 alice = new Person1("Alice");
        // 用Alice的公钥加密:
        byte[] pk = alice.getPublicKey();
        System.out.println(String.format("public key: %x", new BigInteger(1, pk)));
        byte[] encrypted = alice.encrypt(plain);
        System.out.println(String.format("encrypted: %x", new BigInteger(1, encrypted)));
        // 用Alice的私钥解密:
        byte[] sk = alice.getPrivateKey();
        System.out.println(String.format("private key: %x", new BigInteger(1, sk)));
        byte[] decrypted = alice.decrypt(encrypted);
        System.out.println(new String(decrypted, StandardCharsets.UTF_8));
    }
}

class Person1 {
    String name;
    // 私钥:
    PrivateKey sk;
    // 公钥:
    PublicKey pk;

    public Person1(String name) throws GeneralSecurityException {
        this.name = name;
        // 生成公钥／私钥对:
        KeyPairGenerator kpGen = KeyPairGenerator.getInstance("RSA");
        kpGen.initialize(1024);
        KeyPair kp = kpGen.generateKeyPair();
        this.sk = kp.getPrivate();
        this.pk = kp.getPublic();
    }

    // 把私钥导出为字节
    public byte[] getPrivateKey() {
        return this.sk.getEncoded();
    }

    // 把公钥导出为字节
    public byte[] getPublicKey() {
        return this.pk.getEncoded();
    }

    // 用公钥加密:
    public byte[] encrypt(byte[] message) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, this.pk);
        return cipher.doFinal(message);
    }

    // 用私钥解密:
    public byte[] decrypt(byte[] input) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, this.sk);
        return cipher.doFinal(input);
    }
}
```





输出结果：







```
public key: 30819f300d06092a864886f70d010101050003818d003081890281810089411cd2ceb3f44d43641d265de1ba63f752eccf739f4e33e8e4c111ce261ba378729d354797afe6991d5e530c849f42390d0ed098a47b51dd130a1f7303b2ee04f589e9f1ca78d8167c8949e619653f6361f05dec81c44427dbd21ab088ad55790eafb7afedcd03472b57cc7d1aba30656db06210b97dba15c649962df42b5b0203010001
encrypted: 7762b626f22c8671049c6114dbe070f551f9a444a11c0e8e9e41a1ff270d2d4515fa0be12c51df055a1ba71cc5360a4646b35498caf69381a959f7e272ede890d7d8d0422e063570116396e2f9bdc2f705c2f6bbc88bc5bdd110026bcbd008d93235a9d27093cfe238b1110115bd2d6d606f44b271152c3f423799fb5ffdda13
private key: 30820275020100300d06092a864886f70d01010105000482025f3082025b0201000281810089411cd2ceb3f44d43641d265de1ba63f752eccf739f4e33e8e4c111ce261ba378729d354797afe6991d5e530c849f42390d0ed098a47b51dd130a1f7303b2ee04f589e9f1ca78d8167c8949e619653f6361f05dec81c44427dbd21ab088ad55790eafb7afedcd03472b57cc7d1aba30656db06210b97dba15c649962df42b5b0203010001028180653eb19b533c6d4e7d12a16a06c096b45ce13fabfb771cc1afdee608534fcafd77c0dbf44c5e3933d9e84f06e5ea026c601720c180877c2c33ee727e2662291ecc0cdc56c5144b47f312cf9021c97dc6adfa9573476a99fd27666f252affe3016699d4a9e739bf7aa8d08525f64b8e9f22bdd33bae5d23125145000219e01a49024100eda89fa24ac30b6b65db6592ba570f228cbfa4a656ccbb13cd8fd2f174e3d4dbc26789aad8c5c0e56e2415e807ff00e957183a3c4de14e6d51d7ed7539f90e9f02410093d8d1ec2e6302d5ea315673b1a44ac4d00f94f5b653fa5b84ff2137eeb8a7f0d3bc0b122f274aa8d4eb08595a6524116e91abe0d0e0e4bf5d019775799b35c50240606ab4b8c6d3f26213e4ba84988c915b56f6b8f9b2e5445078690d0f6078bdf69a1c1f41ecc7edc626b5051e29804f025b8f3cb1127781b5e02a55efe52121c9024019754b6884f04dabb220fec6fb3ed41521d29d0ed66f8d7bb6e20bc14add072623ff8c547c4422ca01a7db0f2fce9cb057bec3bef998d02ad7840fa58de419150240790e8dadbfd8adc0ce6b1eebf1c03d450adcae72e686ac8d9ecc71ce32a34e12ac768cb882ece363ea2f8d6236394ac30187b345d55eb4e42597a7114406ff09
Hello, encrypt use RSA

```





> RSA的公钥和私钥都可以通过`getEncoded()`方法获得以`byte[]`表示的二进制数据，并根据需要保存到文件中。要从`byte[]`数组恢复公钥或私钥，可以这么写：
>
> 以RSA算法为例，它的密钥有256/512/1024/2048/4096等不同的长度。长度越长，密码强度越大，当然计算速度也越慢。
>
> 如果修改待加密的`byte[]`数据的大小，可以发现，使用512bit的RSA加密时，明文长度不能超过53字节，使用1024bit的RSA加密时，明文长度不能超过117字节，这也是为什么使用RSA的时候，总是配合AES一起使用，即用AES加密任意长度的明文，用RSA加密AES口令。
>
> 此外，只使用非对称加密算法不能防止中间人攻击。



```java
byte[] pkData = ...
byte[] skData = ...
KeyFactory kf = KeyFactory.getInstance("RSA");
// 恢复公钥:
X509EncodedKeySpec pkSpec = new X509EncodedKeySpec(pkData);
PublicKey pk = kf.generatePublic(pkSpec);
// 恢复私钥:
PKCS8EncodedKeySpec skSpec = new PKCS8EncodedKeySpec(skData);
PrivateKey sk = kf.generatePrivate(skSpec);
```



## 十、签名算法



> 我们使用非对称加密算法的时候，对于一个公钥-私钥对，通常是用公钥加密，私钥解密。
>
> 如果使用私钥加密，公钥解密是否可行呢？实际上是完全可行的。
>
> 不过我们再仔细想一想，私钥是保密的，而公钥是公开的，用私钥加密，那相当于所有人都可以用公钥解密。这个加密有什么意义？
>
> 这个加密的意义在于，如果小明用自己的私钥加密了一条消息，比如`小明喜欢小红`，然后他公开了加密消息，由于任何人都可以用小明的公钥解密，从而使得任何人都可以确认`小明喜欢小红`这条消息肯定是小明发出的，其他人不能伪造这个消息，小明也不能抵赖这条消息不是自己写的。
>
> 因此，**私钥加密得到的密文实际上就是数字签名，要验证这个签名是否正确，只能用私钥持有者的公钥进行解密验证。使用数字签名的目的是为了确认某个信息确实是由某个发送方发送的，任何人都不可能伪造消息，并且，发送方也不能抵赖。**
>
> 在实际应用的时候，签名实际上并不是针对原始消息，而是针对原始消息的哈希进行签名。
>
> 对签名进行验证实际上就是用公钥解密。
>
> 然后把解密后的哈希与原始消息的哈希进行对比。
>
> 因为用户总是使用自己的私钥进行签名，所以，私钥就相当于用户身份。而公钥用来给外部验证用户身份。





### 常用签名算法





#### 1.1 RSA签名



> 实际上就是指定某种哈希算法进行RSA签名的方式

- MD5withRSA
- SHA1withRSA
- SHA256withRSA





使用其他公钥，或者验证签名的时候修改原始信息，都无法验证成功。



```java
package com.org;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.*;

public class QianMing {
    public static void main(String[] args) throws Exception{
        // 生成RSA公钥/私钥:
        KeyPairGenerator kpGen = KeyPairGenerator.getInstance("RSA");
        kpGen.initialize(1024);
        KeyPair kp = kpGen.generateKeyPair();
        PrivateKey sk = kp.getPrivate();
        PublicKey pk = kp.getPublic();

        // 待签名的消息:
        byte[] message = "Hello, I am Bob!".getBytes(StandardCharsets.UTF_8);

        // 用私钥签名:
        Signature s = Signature.getInstance("SHA1withRSA");
        s.initSign(sk);
        s.update(message);
        byte[] signed = s.sign();
        System.out.println(String.format("signature: %x", new BigInteger(1, signed)));

        // 用公钥验证:
        Signature v = Signature.getInstance("SHA1withRSA");
        v.initVerify(pk);
        v.update(message);
        boolean valid = v.verify(signed);
        System.out.println("valid? " + valid);
    }
}
```

输出结果：

```
signature: 7ce04446376358e2de5b5f299c780385f2e436154f6ad03df846fe4ec14f7de8d1a4acdade4a0951f99c02f4305c6ddb1327321ac4086737690b2bf2b9297050cba1a30451c989ef1512ec453625e289525e492ab707ec110b2928c13faa154b1ebd21f001cb0c61a273a8c74ac51ee6a2bdef5161a05f4e1997b364f5dfc889
valid? true
```



#### 1.2 DSA签名



> 除了RSA可以签名外，还可以使用DSA算法进行签名。DSA是Digital Signature Algorithm的缩写，它使用ElGamal数字签名算法。
>
> 和RSA数字签名相比，DSA的优点是更快。



DSA只能配合SHA使用，常用的算法有：

- SHA1withDSA
- SHA256withDSA
- SHA512withDSA



#### 1.3 ECDSA签名



> 椭圆曲线签名算法ECDSA：Elliptic Curve Digital Signature Algorithm也是一种常用的签名算法，它的特点是可以从私钥推出公钥。比特币的签名算法就采用了ECDSA算法，使用标准椭圆曲线secp256k1。BouncyCastle提供了ECDSA的完整实现。







## 十一、数字证书





> 我们知道，摘要算法用来确保数据没有被篡改，非对称加密算法可以对数据进行加解密，签名算法可以确保数据完整性和抗否认性，把这些算法集合到一起，并搞一套完善的标准，这就是数字证书。
>
> 因此，数字证书就是集合了多种密码学算法，用于实现数据加解密、身份认证、签名等多种功能的一种安全标准。
>
> 数字证书可以防止中间人攻击，因为它采用链式签名认证，即通过根证书（Root CA）去签名下一级证书，这样层层签名，直到最终的用户证书。而Root CA证书内置于操作系统中，所以，任何经过CA认证的数字证书都可以对其本身进行校验，确保证书本身不是伪造的。
>
> 我们在上网时常用的HTTPS协议就是数字证书的应用。浏览器会自动验证证书的有效性。
>
> 要使用数字证书，首先需要创建证书。正常情况下，一个合法的数字证书需要经过CA签名，这需要认证域名并支付一定的费用。开发的时候，我们可以使用自签名的证书，这种证书可以正常开发调试，但不能对外作为服务使用，因为其他客户端并不认可未经CA签名的证书。



在Java程序中，数字证书存储在一种Java专用的key store文件中，JDK提供了一系列命令来创建和管理key store。我们用下面的命令创建一个key store，并设定口令123456：



```bash
$ keytool -storepass 123456 -genkeypair -keyalg RSA -keysize 1024 -sigalg SHA1withRSA -validity 3650 -alias mycert -keystore my.keystore -dname "CN=www.sample.com, OU=sample, O=sample, L=BJ, ST=BJ, C=CN"
```

几个主要的参数是：

- keyalg：指定RSA加密算法；
- sigalg：指定SHA1withRSA签名算法；
- validity：指定证书有效期3650天；
- alias：指定证书在程序中引用的名称；
- dname：最重要的`CN=www.sample.com`指定了`Common Name`，如果证书用在HTTPS中，这个名称必须与域名完全一致。

执行上述命令，JDK会在当前目录创建一个`my.keystore`文件，并存储创建成功的一个私钥和一个证书，它的别名是`mycert`。





通过数字证书进行加解密和签名：



```java
package com.org;

import com.sun.tools.javac.Main;

import javax.crypto.Cipher;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.Signature;
import java.security.cert.X509Certificate;

public class NumberZhengShu {
    public static void main(String[] args) throws Exception {
        byte[] message = "Hello, use X.509 cert!".getBytes(StandardCharsets.UTF_8);
        // 读取KeyStore:
        KeyStore ks = loadKeyStore("my.keystore", "123456");
        // 读取私钥:
        PrivateKey privateKey = (PrivateKey) ks.getKey("mycert", "123456".toCharArray());
        // 读取证书:
        X509Certificate certificate = (X509Certificate) ks.getCertificate("mycert");
        // 加密:
        byte[] encrypted = encrypt(certificate, message);
        System.out.println(String.format("encrypted: %x", new BigInteger(1, encrypted)));
        // 解密:
        byte[] decrypted = decrypt(privateKey, encrypted);
        System.out.println("decrypted: " + new String(decrypted, StandardCharsets.UTF_8));
        // 签名:
        byte[] sign = sign(privateKey, certificate, message);
        System.out.println(String.format("signature: %x", new BigInteger(1, sign)));
        // 验证签名:
        boolean verified = verify(certificate, message, sign);
        System.out.println("verify: " + verified);
    }

    static KeyStore loadKeyStore(String keyStoreFile, String password) {
        try (InputStream input = NumberZhengShu.class.getResourceAsStream(keyStoreFile)) {
            if (input == null) {
                throw new RuntimeException("file not found in classpath: " + keyStoreFile);
            }
            KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
            ks.load(input, password.toCharArray());
            return ks;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    static byte[] encrypt(X509Certificate certificate, byte[] message) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance(certificate.getPublicKey().getAlgorithm());
        cipher.init(Cipher.ENCRYPT_MODE, certificate.getPublicKey());
        return cipher.doFinal(message);
    }

    static byte[] decrypt(PrivateKey privateKey, byte[] data) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return cipher.doFinal(data);
    }

    static byte[] sign(PrivateKey privateKey, X509Certificate certificate, byte[] message)
            throws GeneralSecurityException {
        Signature signature = Signature.getInstance(certificate.getSigAlgName());
        signature.initSign(privateKey);
        signature.update(message);
        return signature.sign();
    }

    static boolean verify(X509Certificate certificate, byte[] message, byte[] sig) throws GeneralSecurityException {
        Signature signature = Signature.getInstance(certificate.getSigAlgName());
        signature.initVerify(certificate);
        signature.update(message);
        return signature.verify(sig);
    }
}
```



输出结果：

```
encrypted: 7f88754e3e31ab5f6aa80d6a2f4610095bc0057b05fab78e5e9e14839103e8648d219a9bb43189d4896b5c5f95c82a85c94e242b6afdc54303650ce7513fa5877e3adb91afb38cbf036e419ade2406ea563bf7a7520454b689ea81281fdc999b58550178403094b44df047c188918b2743b98c5e46f7bcc8f50c3aa2bd8fb11c
decrypted: Hello, use X.509 cert!
signature: 1d13d65d2a8928ccb6639f5d325f77e4b211b5cb3a120f6a182a05c4ddedde29cc8a3af1ee02473015514a8b65e743f6f58997aa5f00e464a68136f8b680682af5107bda5d4de925f3699f7d7327fee21c4b9e5c90641b91a6cb8be93a6f008006eb4052749a6cffa43a7e4749e4afc55293097baebc5a72e3a05b21dbba8a34
verify: true
```

> 在上述代码中，我们从key store直接读取了私钥-公钥对，私钥以`PrivateKey`实例表示，公钥以`X509Certificate`表示，实际上数字证书只包含公钥，因此，读取证书并不需要口令，只有读取私钥才需要。如果部署到Web服务器上，例如Nginx，需要把私钥导出为Private Key格式，把证书导出为X509Certificate格式。
>
> 以HTTPS协议为例，浏览器和服务器建立安全连接的步骤如下：
>
> 1. 浏览器向服务器发起请求，服务器向浏览器发送自己的数字证书；
> 2. 浏览器用操作系统内置的Root CA来验证服务器的证书是否有效，如果有效，就使用该证书加密一个随机的AES口令并发送给服务器；
> 3. 服务器用自己的私钥解密获得AES口令，并在后续通讯中使用AES加密。
>
> 上述流程只是一种最常见的单向验证。如果服务器还要验证客户端，那么客户端也需要把自己的证书发送给服务器验证，这种场景常见于网银等。
>
> 注意：数字证书存储的是公钥，以及相关的证书链和算法信息。私钥必须严格保密，如果数字证书对应的私钥泄漏，就会造成严重的安全威胁。如果CA证书的私钥泄漏，那么该CA证书签发的所有证书将不可信。数字证书服务商[DigiNotar](https://en.wikipedia.org/wiki/DigiNotar)就发生过私钥泄漏导致公司破产的事故。









<center style="font-size:25px; color:red">这艰难的一节终于简单过了一遍，敬请期待后续内容！</center>













