---
title: Java教程系列之正则表达式
author: Mr.Niu
toc: true
abbrlink: 53926
cover: 'https://img.niuxvdong.top/ckjnlk9.png'
top_img: 'https://img.niuxvdong.top/ckjnlk9.png'
categories:
  - Java教程
tags:
  - Regex
date: 2020-04-18 18:06:42
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "423849091" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}





> [由于学JavaScript时就已经学过了正则的规则，所以本文只介绍与其不同支出，大概的一个框架及用法！](https://niuxvdong.top/posts/15769.html)



## 一、正则匹配规则



- `\d` ：一个数字
- `\D`：一个非数字
- `\w` ：一个数字或一个字母（大小写）
- `\W`：与`\w`相对。。。匹配其不能匹配的
- `\s` ：一个空格
- `\S`：与`\s`相对，匹配其不能匹配的
- `\u548c`：匹配一个指定Unicode字符
- `.` ：一个任意字符
- `\.` ：一个小数点
- `*` ：任意个（包括0个）
- `+` ：至少一个
- `？` ：0个或1个
- `{n,}`：至少n个
- `{n}` ：n个
- `{n, m}` ：n 到 m 个
- `\-` ：一个`-`
- `\\` ：一个`\`



- `[abc]`：匹配其中一个

- `[0-9a-zA-Z\_]`可以匹配一个数字、字母或者下划线；

- `[0-9a-zA-Z\_]+`可以匹配至少由一个数字、字母或者下划线组成的字符串

- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]*`可以匹配由字母或下划线、`$`开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就JavaScript允许的变量名

- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}`更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）
- `[^0-9]`：不匹配数字，匹配其他任意字符一个

- `A|B`可以匹配A或B，所以`(J|j)ava(S|s)cript`可以匹配`'JavaScript'`、`'Javascript'`、`'javaScript'`或者`'javascript'`。

- `^`表示行的开头，`^\d`表示必须以数字开头。

- `$`表示行的结束，`\d$`表示必须以数字结束。
- `()`：相当于提取公因式。。



> `^`和`$`写在正则表达式前后可以精确控制字符串，保证开头和结尾的规则，在JavaScript中，`js`也可以匹配`'jsp'`，但是加上`^js$`就变成了整行匹配，就只能匹配`'js'`了；而在Java中，`js`不可以匹配`'jsp'`。





## 二、Java中使用String正则不同之处



> Java没有专门的正则对象，所以用String字符串来表示一个正则表达式：
>
> 这样就会使得与正则表达式不一样了：



格式：标准正则 - - - - - - - -> Java中字符串表示的正则



- `\d` -> `\\d`
- `\\` -> `\\\\`
- `\-` -> `-`
- `\_` -> `_`
- `\$` -> `$`
- `\"` -> `\"`
- `\'` -> `'`
- `/` -> `/`



> 总结：java中的特殊字符可以直接用，双引号特殊得用斜杠转义：
>
> 标准正则两个斜杠代表一个斜杠，Java字符串则是四个斜杠代表一个斜杠，即前两个转义为1个，后两个转义为1个，前面再将后面的转义为斜杠。。。
>
> 大概就是这些。。。



```java
package com.org;

public class Regex01 {
    public static void main(String[] args) {
        // /\d\\\-\_\$\"\'
        String re = "/\\d\\\\-_&\"'";
        System.out.println("/3\\-_&\"'".matches(re));// true
        String re1 = "[^1-9]*";
        System.out.println("h)fkd-+d".matches(re1)); // true
        // 与JavaScript不同，特别的地方。。
        String re3 = "js";
        System.out.println("jsp".matches(re3)); // false JavaScript可以匹配。。。
    }
}
```





## 三、分组匹配（引入regex包）



> `()`的一个重要作用，用来分组：
>
> 使用`String.matches()`方法只能判断，要想获得匹配子串需要使用`regex`包的对象。
>
> 还有：Java的正则匹配和JavaScript有点不一样：（参考第一小节最后的内容！）
>
> 引入`java.util.regex`包，用`Pattern`对象匹配，匹配后获得一个`Matcher`对象，如果匹配成功，就可以直接从`Matcher.group(index)`返回子串：
>
> 下标为0返回原串，下标为1以后的则返回匹配的字串！



### 1、一个例子

```java
package com.org;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regex02 {
    public static void main(String[] args) {
        Pattern p = Pattern.compile("(\\d{3,4})-(\\d{7,8})");
        Matcher m = p.matcher("010-12345678");
        if (m.matches()) {
            System.out.println(m.group(0)); // 010-12345678
            System.out.println(m.group(1)); // 010
            System.out.println(m.group(2)); // 12345678
        } else {
            System.out.println("匹配失败!");
        }
    }
}

```





### 2、Pattern



> 使用`String`和`regex`包，实际上这两种代码本质上是一样的，因为`String.matches()`方法内部调用的就是`Pattern`和`Matcher`类的方法。
>
> 反复使用`String.matches()`对同一个正则表达式进行多次匹配效率较低，因为每次都会创建出一样的`Pattern`对象。
>
> 完全可以先创建出一个`Pattern`对象，然后反复使用，就可以实现编译一次，多次匹配：
>
> 使用`Matcher`时，必须首先调用`matches()`判断是否匹配成功，匹配成功后，才能调用`group()`提取子串。





代码见上面例子：





## 四、贪婪匹配





### 1、贪婪匹配



>看下方例子，这就是贪婪匹配，`\d+`将后面的所有数字都给匹配了，所以`0*`就无法匹配了！
>
>贪婪匹配：任何一个规则，它总是尽可能多地向后匹配，因此，`\d+`总是会把后面的`0`包含进来。



```java
package com.org;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regex04 {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("(\\d+)(0*)");
        Matcher matcher = pattern.matcher("1230000");
        if (matcher.matches()) {
            System.out.println(matcher.group(1)); // "1230000"
            System.out.println(matcher.group(2)); // ""
        }
    }
}
```





### 2、解决方法：（非贪婪匹配）



> 使用`?`，使其尽可能先去满足后面的规则，完事了在满足自己规则；



```java
package com.org;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regex04 {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("(\\d+?)(0*)");
        Matcher matcher = pattern.matcher("1230000");
        if (matcher.matches()) {
            System.out.println(matcher.group(1)); // "123"
            System.out.println(matcher.group(2)); // "0000"
        }
    }
}
```



### 3、`??`



> 连续两个问号：(针对没有+*的时候使用)
>
> 第一个：表示基础意思，匹配0个或1个。。
>
> 第二个：非贪婪匹配
>
> 只有一个问号：（+*符号后面）
>
> 默认就是：非贪婪匹配
>
> 只有一个问号：（没有+*符号）
>
> 默认就是：表示基础意思，匹配0个或1个。。



```java
package com.org;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regex04 {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("(\\d??)(0*)");
        Matcher matcher = pattern.matcher("10000");
        if (matcher.matches()) {
            System.out.println(matcher.group(1)); // "1"
            System.out.println(matcher.group(2)); // "0000"
        }
    }
}
```





## 五、分割



> 使用`split()`方法，返回一个String数组。



### 1、使用Pattern的split方法



```java
package com.org;

import java.util.regex.Pattern;

public class Regex05 {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("[\s,\\\\*;]+");
        String[] str = pattern.split("2 ;;,43\\ 5* ,7");
        for (String s : str) {
            System.out.print(s + " "); // 2 43 5 7 
        }
    }
}
```



### 2、使用String 的split方法



> 直接使用String的split方法更简单！



```java
package com.org;

public class Regex06 {
    public static void main(String[] args) {

        String[] str = "2 ;;,43\\ 5* ,7".split("[\s,\\\\*;]+");
        for (String s : str) {
            System.out.print(s + " "); //2 43 5 7 
        }
    }
}
```

## 六、搜索和替换



### 1、搜索



> 使用`Matcher.find()`判断有没有匹配子串了。
>
> 使用`Matcher.start()`和`Matcher.end()`方法返回子串的起始下标位置，类似于迭代器，找完一个找下一个，直到找完。`Matcher.find()`方法也是，找过一个就不回去找了，直到找不到返回`false`！
>
> 使用`String.substring()`来切割输出！



```java
package com.org;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regex07 {
    public static void main(String[] args) {
        String s = "the quick brown fox jumps over the lazy dog.";
        Pattern p = Pattern.compile("\\wo\\w");
        Matcher m = p.matcher(s);
        while (m.find()) {
            String sub = s.substring(m.start(), m.end());
            System.out.println(sub); // row fox dog
        }
    }
}
```



### 2、替换



> 使用正则表达式替换字符串可以直接调用`String.replaceAll()`，它的第一个参数是正则表达式，第二个参数是待替换的字符串：



如下例子：将多个空格替换为一个空格



```java
package com.org;

public class Regex08 {
    public static void main(String[] args) {
        String s = "The     quick\t\t brown   fox  jumps   over the  lazy dog.";
        String r = s.replaceAll("\\s+", " ");
        System.out.println(r); // "The quick brown fox jumps over the lazy dog."
    }
}
```



### 3、反向引用



> 第二个参数可以使用`$1`、`$2`来反向引用匹配到的子串。
>
> `$1`指的是前面括号的一组内容，`$2`只第二个括号的内容，以此类推。。



一个例子：将四字母单词加上`<b></b>`，即HTML的加粗标签！

即`([a-z]{4})`替换了`$1`。



```java
package com.org;

public class Regex08 {
    public static void main(String[] args) {
        String ss = "the quick brown fox jumps over the lazy dog.";
        String rr = ss.replaceAll("\\s([a-z]{4})\\s", " <b>$1</b> ");
        System.out.println(rr); // the quick brown fox jumps <b>over</b> the <b>lazy</b> dog.
    }
}
```





<center style="color:red; font-size:25px">正则表达式已完结，敬请期待后续内容！</center>