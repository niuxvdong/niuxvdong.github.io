---
title: Java教程系列之日期与时间
author: Mr.Niu
toc: true
abbrlink: 51490
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@019e969a3f119f3d5547732fc720131e1ce6a0ab/2021/02/06/2ead155c241dc7841b557e7750a24927.png'
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@019e969a3f119f3d5547732fc720131e1ce6a0ab/2021/02/06/2ead155c241dc7841b557e7750a24927.png'
categories:
  - Java教程
tags:
  - Date
  - Time
date: 2020-04-13 16:26:06
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "421423806" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}





## 一、一些概念





### 1、本地时间





> 当我们说当前时刻是2019年11月20日早上8:15的时候，我们说的实际上是本地时间。在国内就是北京时间。在这个时刻，如果地球上不同地方的人们同时看一眼手表，他们各自的本地时间是不同的！
>
> 所以，不同的时区，在同一时刻，本地时间是不同的。全球一共分为24个时区，伦敦所在的时区称为标准时区，其他时区按东／西偏移的小时区分，北京所在的时区是东八区！
>
> eg：2020-1-1 20:21:59





### 2、时区



> 光靠本地时间还无法唯一确定一个准确的时刻，所以我们还需要给本地时间加上一个时区：
>
> - 以`GMT`或者`UTC`加时区偏移表示，例如：`GMT+08:00`或者`UTC+08:00`表示东八区。（`GMT`和`UTC`可以认为基本是等价的，只是`UTC`使用更精确的原子钟计时，每隔几年会有一个闰秒，我们在开发程序的时候可以忽略两者的误差，因为计算机的时钟在联网的时候会自动与时间服务器同步时间。）
> - 另一种是缩写，例如，`CST`表示`China Standard Time`，也就是中国标准时间。但是`CST`也可以表示美国中部时间`Central Standard Time USA`，因此，缩写容易产生混淆，我们尽量不要使用缩写。
> - 最后一种是以洲／城市表示，例如，`Asia/Shanghai`，表示上海所在地的时区。特别注意城市名称不是任意的城市，而是由国际标准组织规定的城市。





### 3、夏令时



> 所谓夏令时，就是夏天开始的时候，把时间往后拨1小时，夏天结束的时候，再把时间往前拨1小时。我们国家实行过一段时间夏令时，1992年就废除了，但是矫情的美国人到现在还在使用，所以时间换算更加复杂。
>
> 实行夏令时的不同地区，进入和退出夏令时的时间很可能是不同的。同一个地区，根据历史上是否实行过夏令时，标准时间在不同年份换算成当地时间也是不同的。因此，计算夏令时，没有统一的公式，必须按照一组给定的规则来算，并且，该规则要定期更新。
>
>  计算夏令时请使用标准库提供的相关类，不要试图自己计算夏令时。







| 时区             | 2019-11-20 | 2019-6-20 |
| :--------------- | :--------- | :-------- |
| GMT-05:00        | 19:00      | 19:00     |
| UTC-05:00        | 19:00      | 19:00     |
| America/New_York | 19:00      | 20:00     |





### 4、本地化



>在计算机中，通常使用`Locale`表示一个国家或地区的日期、时间、数字、货币等格式。`Locale`由`语言_国家`的字母缩写构成，例如，`zh_CN`表示中文+中国，`en_US`表示英文+美国。语言使用小写，国家使用大写。
>
>计算机用`Locale`在日期、时间、货币和字符串之间进行转换！



对于日期来说，不同的Locale，例如，中国和美国的表示方式如下：

- zh_CN：2016-11-30
- en_US：11/30/2016





## 二、Date和Calendar





### 1、Epoch Time





> `Epoch Time`是计算从1970年1月1日零点（格林威治时区／GMT+00:00）到现在所经历的秒数！
>
> `Epoch Time`又称为时间戳！



```
1574208900 = 北京时间2019-11-20 8:15:00
           = 伦敦时间2019-11-20 0:15:00
           = 纽约时间2019-11-19 19:15:00
```



因此，在计算机中，只需要存储一个整数`1574208900`表示某一时刻。当需要显示为某一地区的当地时间时，我们就把它格式化为一个字符串

时间戳在不同的编程语言中，会有几种存储方式：

- 以秒为单位的整数：1574208900，缺点是精度只能到秒；
- 以毫秒为单位的整数：1574208900123，最后3位表示毫秒数；
- 以秒为单位的浮点数：1574208900.123，小数点后面表示零点几秒。



它们之间转换非常简单。而在Java程序中，时间戳通常是用`long`表示的毫秒数

```java
long t = 1574208900123L;
```

转换成北京时间就是`2019-11-20T8:15:00.123`。要获取当前时间戳，可以使用`System.currentTimeMillis()`，这是Java程序获取时间戳最常用的方法。



### 2、标准库API





Java标准库有两套处理日期和时间的API：

- 一套定义在`java.util`这个包里面，主要包括`Date`、`Calendar`和`TimeZone`这几个类；
- 一套新的API是在Java 8引入的，定义在`java.time`这个包里面，主要包括`LocalDateTime`、`ZonedDateTime`、`ZoneId`等。

> 为什么会有新旧两套API呢？因为历史遗留原因，旧的API存在很多问题，所以引入了新的API。
>
> 那么我们能不能跳过旧的API直接用新的API呢？如果涉及到遗留代码就不行，因为很多遗留代码仍然使用旧的API，所以目前仍然需要对旧的API有一定了解，很多时候还需要在新旧两种对象之间进行转换。



### 3、Date



> `Date`对象有几个严重的问题：它不能转换时区，除了`toGMTString()`可以按`GMT+0:00`输出外，Date总是以当前计算机系统的默认时区为基础进行输出。此外，我们也很难对日期和时间进行加减，计算两个日期相差多少天，计算某个月第一个星期一的日期等。
>
> `java.util.Date`是用于表示一个日期和时间的对象，注意与`java.sql.Date`区分，后者用在数据库中。如果观察Date的源码，可以发现它实际上存储了一个long类型的以毫秒表示的时间戳：



```java
public class Date implements Serializable, Cloneable, Comparable<Date> {

    private transient long fastTime;

    ...
}
```



#### 常用方法：

> 注意`getYear()`返回的年份必须加上`1900`，`getMonth()`返回的月份是`0`~`11`分别表示1~12月，所以要加1，而`getDate()`返回的日期范围是`1`~`31`，又不能加1。



```java
package com.learn.file;

import java.util.Date;

public class DateTest {
    public static void main(String[] args) {
        // 获取当前时间戳：
        long time = System.currentTimeMillis();
        System.out.println(time); // 1586770437800 最后三位表示毫秒数，即0.xxx秒

        // 获取当前时间:
        Date date = new Date();
        System.out.println(date.getYear() + 1900); // 必须加上1900
        System.out.println(date.getMonth() + 1); // 0~11，必须加上1
        System.out.println(date.getDate()); // 1~31，不能加1
        // 转换为String: 输出为CST格式（即China Standard Time缩写）
        System.out.println(date.toString()); // Mon Apr 13 17:43:12 CST 2020
        // 转换为GMT时区:
        System.out.println(date.toGMTString()); // 13 Apr 2020 09:43:12 GMT
        // 转换为本地时区:
        System.out.println(date.toLocaleString()); // 2020年4月13日 下午5:43:12
    }
}
```





#### 使用SimpleDateFormat进行格式化



有如下格式：

- yyyy：年
- MM：月
- dd: 日
- HH: 小时
- mm: 分钟
- ss: 秒
- E: 周几

```java
package com.learn.file;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTest {
    public static void main(String[] args) {
        Date date1 = new Date();
        var sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf.format(date1)); // 2020-04-13 17:48:42
    }
}
```





Java的格式化预定义了许多不同的格式，我们以`MMM`和`E`为例：



- `M`：输出`9`
- `MM`：输出`09`
- `MMM`：输出`Sep`
- `MMMM`：输出`September`



```java
package com.learn.file;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTest {
    public static void main(String[] args) {
        Date date2 = new Date();
        var sdf2 = new SimpleDateFormat("E M dd, yyyy");
        var sdf3 = new SimpleDateFormat("E MM dd, yyyy");
        var sdf4 = new SimpleDateFormat("E MMM dd, yyyy");
        var sdf5 = new SimpleDateFormat("E MMMM dd, yyyy");
        System.out.println(sdf2.format(date2)); //周一 4 13, 2020
        System.out.println(sdf3.format(date2)); //周一 04 13, 2020
        System.out.println(sdf4.format(date2)); //周一 4月 13, 2020
        System.out.println(sdf5.format(date2)); //周一 四月 13, 2020

    }
}
```







### 4、Calendar





> `Calendar`可以用于获取并设置年、月、日、时、分、秒，它和`Date`比，主要多了一个可以做简单的日期和时间运算的功能。
>
> `Calendar`获取年月日这些信息变成了`get(int field)`，返回的年份不必转换，返回的月份仍然要加1，返回的星期要特别注意，`1`~`7`分别表示周日，周一，……，周六。
>
> `Calendar`只有一种方式获取，即`Calendar.getInstance()`：



```java
package com.learn.file;

import java.util.Calendar;

public class CalendarTest {
    public static void main(String[] args) {
        // 获取当前时间:
        Calendar c = Calendar.getInstance();
        int y = c.get(Calendar.YEAR);
        int m = 1 + c.get(Calendar.MONTH);
        int d = c.get(Calendar.DAY_OF_MONTH);
        int w = c.get(Calendar.DAY_OF_WEEK);
        int hh = c.get(Calendar.HOUR_OF_DAY);
        int mm = c.get(Calendar.MINUTE);
        int ss = c.get(Calendar.SECOND);
        int ms = c.get(Calendar.MILLISECOND);
        System.out.println(y + "-" + m + "-" + d + " " + w + " " + hh + ":" + mm + ":" + ss + "." + ms);
        // 2020-4-13 2 18:1:7.601
    }
}
```



#### 设置成特定的一个日期和时间

> 必须先清除所有字段：
>
> 利用`Calendar.getTime()`可以将一个`Calendar`对象转换成`Date`对象，然后就可以用`SimpleDateFormat`进行格式化了。

```java
package com.learn.file;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class CalendarTest {
    public static void main(String[] args) {
        // 获取当前时间:
        Calendar c = Calendar.getInstance();
        // 清除所有:
        c.clear();
        // 设置2020年:
        c.set(Calendar.YEAR, 2020);
        // 设置4月:注意3表示4月:
        c.set(Calendar.MONTH, 3);
        // 设置2日:
        c.set(Calendar.DATE, 13);
        // 设置时间:
        c.set(Calendar.HOUR_OF_DAY, 18);
        c.set(Calendar.MINUTE, 20);
        c.set(Calendar.SECOND, 23);
        // 使用getTime转化为Date对象，再使用SimpleDateFormat格式化输出：
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(c.getTime()));
        // 2019-09-02 21:22:23
    }
}
```



### 5、TimeZone



> `Calendar`和`Date`相比，它提供了时区转换的功能。时区用`TimeZone`对象表示





```java
package com.learn.file;

import java.util.TimeZone;

public class TimeZoneTest {
    public static void main(String[] args) {
        TimeZone tzDefault = TimeZone.getDefault(); // 当前时区
        TimeZone tzGMT9 = TimeZone.getTimeZone("GMT+09:00"); // GMT+9:00时区
        TimeZone tzNY = TimeZone.getTimeZone("America/New_York"); // 纽约时区
        System.out.println(tzDefault.getID()); // Asia/Shanghai
        System.out.println(tzGMT9.getID()); // GMT+09:00
        System.out.println(tzNY.getID()); // America/New_York
    }
}
```

> 时区的唯一标识是以字符串表示的ID，我们获取指定`TimeZone`对象也是以这个ID为参数获取，`GMT+09:00`、`Asia/Shanghai`都是有效的时区ID。
>
> 可使用`TimeZone.getAvailableIDs()`方法来列出系统支持的所有时区ID：



```java
System.out.println(Arrays.toString(TimeZone.getAvailableIDs()));
```



#### 对指定时间进行转换



利用`Calendar`进行时区转换的步骤是：

1. 清除所有字段；
2. 设定指定时区；
3. 设定日期和时间；
4. 创建`SimpleDateFormat`并设定目标时区；
5. 格式化获取的`Date`对象（注意`Date`对象无时区信息，时区信息存储在`SimpleDateFormat`中）。

> 本质上时区转换只能通过`SimpleDateFormat`在显示的时候完成
>
> 将北京时间转换为纽约时间：

```java
package com.learn.file;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

public class TimeZoneTest {
    public static void main(String[] args) {
        // 当前时间:
        Calendar c = Calendar.getInstance();
        // 清除所有:
        c.clear();
        // 设置为北京时区:
        c.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
        // 设置年月日时分秒:
        c.set(2020, 3 /* 4月 */, 13, 18, 15, 0);
        // 或者这样：
        c.set(2020, Calendar.APRIL /* 11月 */, 13, 18, 15, 0);


        // 显示时间:
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(c.getTime()));
        // 2020-04-13 18:15:00
        var sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("America/New_York"));
        System.out.println(sdf.format(c.getTime()));
        // 2020-04-13 06:15:00
    }
}
```



#### 对日期和时间进行简单加减





```java
package com.learn.file;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

public class TimeZoneTest {
    public static void main(String[] args) {
        // 当前时间:
        Calendar c1 = Calendar.getInstance();
        // 清除所有:
        c1.clear();
        // 设置年月日时分秒:
        c1.set(2020, 3 /* 4月 */, 13, 18, 15, 0);

        var sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf1.format(c1.getTime())); // 2020-04-13 18:15:00
        // 加5天并减去2小时:
        c1.add(Calendar.DAY_OF_MONTH, 5);
        c1.add(Calendar.HOUR_OF_DAY, -2);
        // 显示时间:
        System.out.println(sdf1.format(c1.getTime())); // 2020-04-18 16:15:00
    }
}
```





## 三、LocalDateTime





> 从Java 8开始，`java.time`包提供了新的日期和时间API：
>
> 和旧的API相比，新API严格区分了时刻、本地日期、本地时间和带时区的日期时间，并且，对日期和时间进行运算更加方便。
>
> 此外，新API修正了旧API不合理的常量设计：
>
> - Month的范围用1~12表示1月到12月；
> - Week的范围用1~7表示周一到周日。
>
> 最后，新API的类型几乎全部是不变类型（和String类似），可以放心使用不必担心被修改。
>
> `LocalDateTime`无法与时间戳进行转换，因为`LocalDateTime`没有时区，无法确定某一时刻。后面我们要介绍的`ZonedDateTime`相当于`LocalDateTime`加时区的组合，它具有时区，可以与`long`表示的时间戳进行转换。



主要涉及的类型有：

- 本地日期和时间：`LocalDateTime`，`LocalDate`，`LocalTime`；
- 带时区的日期和时间：`ZonedDateTime`；
- 时刻：`Instant`；
- 时区：`ZoneId`，`ZoneOffset`；
- 时间间隔：`Duration`。

以及一套新的用于取代`SimpleDateFormat`的格式化类型`DateTimeFormatter`。



### 1、LocalDateTime



>本地日期和时间通过now()获取到的总是以当前默认时区返回的，和旧API不同，`LocalDateTime`、`LocalDate`和`LocalTime`默认严格按照[ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)规定的日期和时间格式进行打印。
>
>LocalTime的精度是纳秒！

```java
package com.learn.file;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class LocalDateTimeTest {
    public static void main(String[] args) {
        LocalDate d = LocalDate.now(); // 当前日期
        LocalTime t = LocalTime.now(); // 当前时间
        LocalDateTime dt = LocalDateTime.now(); // 当前日期和时间
        System.out.println(d); // 严格按照ISO 8601格式打印 2020-04-13
        System.out.println(t); // 严格按照ISO 8601格式打印 19:34:03.468952
        System.out.println(dt); // 严格按照ISO 8601格式打印 2020-04-13T19:34:03.468952
    }
}
```



#### LocalDate和LocalTime与LocalDateTime互转

> 下面代码其实有一个小问题，在获取3个类型的时候，由于执行一行代码总会消耗一点时间，因此，3个类型的日期和时间很可能对不上（时间的毫秒数基本上不同）。为了保证获取到同一时刻的日期和时间，可以改写如下：





```java
package com.learn.file;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class LocalDateTimeTest {
    public static void main(String[] args) {
        // LocalDateTime -> LocalDate/LocalTime
    LocalDateTime dt1 = LocalDateTime.now(); // 当前日期和时间
        LocalDate d1 = dt1.toLocalDate(); // 转换到当前日期
        LocalTime t1 = dt1.toLocalTime(); // 转换到当前时间

        // // LocalDate/LocalTime -> LocalDateTime
        // 指定日期和时间:
        LocalDate d2 = LocalDate.of(2019, 11, 30); // 2019-11-30, 注意11=11月
        LocalTime t2 = LocalTime.of(15, 16, 17); // 15:16:17
        LocalDateTime dt2 = LocalDateTime.of(2019, 11, 30, 15, 16, 17);
        LocalDateTime dt3 = LocalDateTime.of(d2, t2);
    }
}
```



#### 字符串转换为LocalDateTime



```java
package com.learn.file;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class LocalDateTimeTest {
    public static void main(String[] args) {
        LocalDateTime dt4 = LocalDateTime.parse("2019-11-19T15:16:17");
        LocalDate d4 = LocalDate.parse("2019-11-19");
        LocalTime t4 = LocalTime.parse("15:16:17");
    }
}
```

#### 日期和时间之间的 'T'



注意ISO 8601规定的日期和时间分隔符是`T`。标准格式如下：

- 日期：yyyy-MM-dd
- 时间：HH:mm:ss
- 带毫秒的时间：HH:mm:ss.SSS
- 日期和时间：yyyy-MM-dd'T'HH:mm:ss
- 带毫秒的日期和时间：yyyy-MM-dd'T'HH:mm:ss.SSS



### 2、DateTimeFormatter



> 自定义输出的格式，或者要把一个非ISO 8601格式的字符串解析成`LocalDateTime`：



```java
package com.learn.file;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeTest {
    public static void main(String[] args) {
        // 自定义格式化:
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        System.out.println(dtf.format(LocalDateTime.now()));

        // 用自定义格式解析:
        LocalDateTime dt5 = LocalDateTime.parse("2019/11/30 15:16:17", dtf);
        System.out.println(dt5); // 2019-11-30T15:16:17
    }
}
```





### 3、对日期和时间进行简单加减



> 注意到月份加减会自动调整日期，例如从`2019-10-31`减去1个月得到的结果是`2019-09-30`，因为9月没有31日：

```java
package com.learn.file;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeTest {
    public static void main(String[] args) {
        LocalDateTime dt6 = LocalDateTime.of(2019, 10, 26, 20, 30, 59);
        System.out.println(dt6); // 2019-10-26T20:30:59
        // 加5天减3小时:
        LocalDateTime dt7 = dt6.plusDays(5).minusHours(3);
        System.out.println(dt7); // 2019-10-31T17:30:59
        // 减1月:
        LocalDateTime dt8 = dt7.minusMonths(1);
        System.out.println(dt8); // 2019-09-30T17:30:59
    }
}
```



### 4、对日期和时间进行调整



常用方法：

- 调整年：withYear()
- 调整月：withMonth()
- 调整日：withDayOfMonth()
- 调整时：withHour()
- 调整分：withMinute()
- 调整秒：withSecond()

> 同样注意到调整月份时，会相应地调整日期，即把`2019-10-31`的月份调整为`9`时，日期也自动变为`30`。

```java
package com.learn.file;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeTest {
    public static void main(String[] args) {
        LocalDateTime dt9 = LocalDateTime.of(2019, 10, 26, 20, 30, 59);
        System.out.println(dt9); // 2019-10-26T20:30:59
        // 日期变为31日:
        LocalDateTime dt10 = dt9.withDayOfMonth(31);
        System.out.println(dt2); // 2019-10-31T20:30:59
        // 月份变为9:
        LocalDateTime dt11 = dt10.withMonth(9);
        System.out.println(dt11); // 2019-09-30T20:30:59
    }
}
```



### 5、使用with()方法做更复杂的运算



> 对于计算某个月第1个周日这样的问题，新的API可以轻松完成。
>
> 基本就是first和last的组合吧！



```java
package com.learn.file;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

public class LocalTest {
    public static void main(String[] args) {
        // 本月第一天0:00时刻:
        LocalDateTime firstDay = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        System.out.println(firstDay); // 2020-04-01T00:00

        // 本月最后1天:
        LocalDate lastDay = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());
        System.out.println(lastDay); // 2020-04-30

        // 下月第1天:
        LocalDate nextMonthFirstDay = LocalDate.now().with(TemporalAdjusters.firstDayOfNextMonth());
        System.out.println(nextMonthFirstDay); // 2020-05-01

        // 本月第1个周一:
        LocalDate firstWeekday = LocalDate.now().with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        System.out.println(firstWeekday); // 2020-04-06
    }
}
```





### 6、判断时间先后





> 要判断两个`LocalDateTime`的先后，可以使用`isBefore()`、`isAfter()`方法，对于`LocalDate`和`LocalTime`类似：

```java
package com.learn.file;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;

public class LocalTest {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime target = LocalDateTime.of(2019, 11, 19, 8, 15, 0);
        System.out.println(now.isBefore(target)); // false
        System.out.println(LocalDate.now().isBefore(LocalDate.of(2019, 11, 19))); // false
        System.out.println(LocalTime.now().isAfter(LocalTime.parse("08:15:00"))); // true
    }
}
```



### 6、Duration和Period





> `Duration`表示两个时刻之间的时间间隔。
>
> 另一个类似的`Period`表示两个日期之间的天数：
>
> `Duration`和`Period`的表示方法也符合ISO 8601的格式，它以`P...T...`的形式表示，`P...T`之间表示日期间隔，`T`后面表示时间间隔。如果是`PT...`的格式表示仅有时间间隔：





```java
package com.learn;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

public class DurationAndPeriod {
    public static void main(String[] args) {
        LocalDateTime start = LocalDateTime.of(2019, 11, 19, 8, 15, 0);
        LocalDateTime end = LocalDateTime.of(2020, 1, 9, 19, 25, 30);
        Duration d = Duration.between(start, end);
        System.out.println(d); // PT1235H10M30S 表示1235小时10分钟30秒

        Period p = LocalDate.of(2019, 11, 19).until(LocalDate.of(2020, 1, 9));
        System.out.println(p); // P1M21D 表示1个月21天
    }
}
```



> 利用`ofXxx()`或者`parse()`方法也可以直接创建`Duration`：



```java
package com.learn;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

public class DurationAndPeriod {
    public static void main(String[] args) {
        Duration d1 = Duration.ofHours(10); // 10 hours
        Duration d2 = Duration.parse("P1DT2H3M"); // 1 day, 2 hours, 3 minutes
        
    }
}
```



## 四、ZonedDateTime



>`LocalDateTime`总是表示本地日期和时间，要表示一个带时区的日期和时间，我们就需要`ZonedDateTime`。
>
>可以简单地把`ZonedDateTime`理解成`LocalDateTime`加`ZoneId`。`ZoneId`是`java.time`引入的新的时区类，注意和旧的`java.util.TimeZone`区别。



### 1、创建ZonedDateTime对象



#### 1.1 一种是通过`now()`方法返回当前时间：



> 下面时区不同，但表示的时间都是同一时刻（毫秒数不同是执行语句时的时间差）：
>
> 时间相不同，时区不同，时刻相同：

```java
package com.learn.file;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeTest {
    public static void main(String[] args) {
        ZonedDateTime zbj = ZonedDateTime.now(); // 默认时区
        ZonedDateTime zny = ZonedDateTime.now(ZoneId.of("America/New_York")); // 用指定时区获取当前时间
        System.out.println(zbj); // 2020-04-13T20:49:45.964482300+08:00[Asia/Shanghai]
        System.out.println(zny); // 2020-04-13T08:49:45.971487100-04:00[America/New_York]
    }
}
```





#### 1.2 通过给一个LocalDateTime附加一个ZoneId

> 以这种方式创建的`ZonedDateTime`，它的日期和时间与`LocalDateTime`相同，但附加的时区不同，因此是两个不同的时刻：
>
> 时间相同，时区不同，时刻不同：

```java
package com.learn.file;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeTest {
    public static void main(String[] args) {
        LocalDateTime ldt = LocalDateTime.of(2019, 9, 15, 15, 16, 17);
        ZonedDateTime zbj1 = ldt.atZone(ZoneId.systemDefault());
        ZonedDateTime zny1 = ldt.atZone(ZoneId.of("America/New_York"));
        System.out.println(zbj1); // 2019-09-15T15:16:17+08:00[Asia/Shanghai]
        System.out.println(zny1); // 2019-09-15T15:16:17-04:00[America/New_York]
    }
}
```



### 2、时区转换



> 通过`withZoneSameInstant()`将关联时区转换到另一个时区，转换后日期和时间都会相应调整：
>
> 时刻相同，时间改变，日期改变，时区改变：

```java
package com.learn.file;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeTest {
    public static void main(String[] args) {
        // 以中国时区获取当前时间:
        ZonedDateTime zbj2 = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
        // 转换为纽约时间:
        ZonedDateTime zny2 = zbj2.withZoneSameInstant(ZoneId.of("America/New_York"));
        System.out.println(zbj2); // 2020-04-13T20:58:58.227352600+08:00[Asia/Shanghai]
        System.out.println(zny2); // 2020-04-13T08:58:58.227352600-04:00[America/New_York]
    }
}
```





### 3、夏令时处理





> 时区转换的时候，由于夏令时的存在，不同的日期转换的结果很可能是不同的。
>
> 涉及到时区时，千万不要自己计算时差，否则难以正确处理夏令时。

如下：有一个小时的夏令时时差：

```
2019-09-15T21:05:50.187697+08:00[Asia/Shanghai]
2019-09-15T09:05:50.187697-04:00[America/New_York]

2019-11-15T21:05:50.187697+08:00[Asia/Shanghai]
2019-11-15T08:05:50.187697-05:00[America/New_York]
```





#### 使用ZonedDateTime处理



> 将一个未知时区转换为本地时间，转换为本地时间时，内部使用的就是ZonedDateTime的时区信息：



```java
package com.learn.file;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeTest {
    public static void main(String[] args) {
        ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("America/New_York"));
        LocalDateTime ldt1 = zdt.toLocalDateTime();
        System.out.println(zdt); // 2020-04-13T09:15:56.939055400-04:00[America/New_York]
        System.out.println(ldt1); // 2020-04-13T09:15:56.939055400
    }
}
```



### 4、对日期和时间进行简单加减



> `ZonedDateTime`仍然提供了`plusDays()`等加减操作。





```java
package com.learn.file;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeTest {
    public static void main(String[] args) {
        ZonedDateTime zdt1 = ZonedDateTime.now();
        System.out.println(zdt1); // 2020-04-13T21:21:24.013394800+08:00[Asia/Shanghai]
        System.out.println(zdt1.plusDays(5).minusHours(3)); // 2020-04-18T18:21:24.013394800+08:00[Asia/Shanghai]
    }
}
```



### 5、一个时间转换例子



> 某航线从北京飞到纽约需要13小时20分钟，请根据北京起飞日期和时间计算到达纽约的当地日期和时间。





```java
package com.learn.file;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeTest {
    public static void main(String[] args) {
        // 一个例子：
        LocalDateTime departureAtBeijing = LocalDateTime.of(2019, 9, 15, 13, 0, 0);
        int hours = 13;
        int minutes = 20;
        LocalDateTime arrivalAtNewYork = calculateArrivalAtNY(departureAtBeijing, hours, minutes);
        System.out.println(departureAtBeijing + " -> " + arrivalAtNewYork); // 2019-09-15T13:00 -> 2019-09-15T14:20
        // test:
        if (!LocalDateTime.of(2019, 10, 15, 14, 20, 0)
                .equals(calculateArrivalAtNY(LocalDateTime.of(2019, 10, 15, 13, 0, 0), 13, 20))) {
            System.err.println("测试失败!");
        } else if (!LocalDateTime.of(2019, 11, 15, 13, 20, 0)
                .equals(calculateArrivalAtNY(LocalDateTime.of(2019, 11, 15, 13, 0, 0), 13, 20))) {
            System.err.println("测试失败!");
        }
    }

    static LocalDateTime calculateArrivalAtNY(LocalDateTime bj, int h, int m) {
        // 加上用时后转化为不带时区的LocalDateTime：
        bj = bj.plusHours(h).plusMinutes(m);
        // lbj和lbj1都可以：将时区转化为上海
        ZonedDateTime lbj = ZonedDateTime.of(bj, ZoneId.of("Asia/Shanghai"));
        ZonedDateTime lbj1 = bj.atZone(ZoneId.of("Asia/Shanghai"));
        // 将时区转化为纽约：
        ZonedDateTime zdt = lbj1.withZoneSameInstant(ZoneId.of("America/New_York"));
        // 返回LocalDateTime类型的时间：
        return zdt.toLocalDateTime();
    }
}
```





## 五、DateTimeFormatter





> 使用旧的`Date`对象时，我们用`SimpleDateFormat`进行格式化显示。使用新的`LocalDateTime`或`ZonedLocalDateTime`时，我们要进行格式化显示，就要使用`DateTimeFormatter`。
>
> 和`SimpleDateFormat`不同的是，`DateTimeFormatter`不但是不变对象，它还是线程安全的（后面会学到！）。
>
> 因为`SimpleDateFormat`不是线程安全的，使用的时候，只能在方法内部创建新的局部变量。而`DateTimeFormatter`可以只创建一个实例，到处引用。



### 1、创建DateTimeFormatter



- 传入字符串

```java
package com.learn.file;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeFormatterTest {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        System.out.println(formatter.format(zonedDateTime)); // 2020-04-13 22:25
    }
}
```

- 同时传入Local

```java
package com.learn.file;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class DateTimeFormatterTest {
    public static void main(String[] args) {
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("E,yyyy-MMMM-dd HH:mm", Locale.US);
        ZonedDateTime zonedDateTime1 = ZonedDateTime.now();
        System.out.println(formatter1.format(zonedDateTime1)); // Mon,2020-April-13 22:30
    }
}
```



### 2、一些格式化例子



> 分别以默认方式、中国地区和美国地区对当前时间进行显示：



```java
package com.learn.file;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class DateTimeFormatterTest {
    public static void main(String[] args) {
        ZonedDateTime zdt = ZonedDateTime.now();
        var formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm ZZZZ");
        System.out.println(formatter2.format(zdt)); // 2020-04-13T22:32 GMT+08:00

        var zhFormatter = DateTimeFormatter.ofPattern("yyyy MMM dd EE HH:mm", Locale.CHINA);
        System.out.println(zhFormatter.format(zdt)); // 2020 4月 13 周一 22:32

        var usFormatter = DateTimeFormatter.ofPattern("E, MMMM/dd/yyyy HH:mm", Locale.US);
        System.out.println(usFormatter.format(zdt)); // Mon, April/13/2020 22:32
    }
}
```





> 当我们直接调用`System.out.println()`对一个`ZonedDateTime`或者`LocalDateTime`实例进行打印的时候，实际上，调用的是它们的`toString()`方法，默认的`toString()`方法显示的字符串就是按照`ISO 8601`格式显示的，我们可以通过`DateTimeFormatter`预定义的几个静态变量来引用：



```java
package com.learn.file;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class DateTimeFormatterTest {
    public static void main(String[] args) {
        var ldt = LocalDateTime.now();
        System.out.println(DateTimeFormatter.ISO_DATE.format(ldt)); // 2020-04-13
        System.out.println(DateTimeFormatter.ISO_DATE_TIME.format(ldt)); // 2020-04-13T22:36:25.9843329

    }
}
```





## 六、Instant



>计算机存储的当前时间，本质上只是一个不断递增的整数。Java提供的`System.currentTimeMillis()`返回的就是以毫秒表示的当前时间戳。
>
>这个当前时间戳在`java.time`中以`Instant`类型表示，我们用`Instant.now()`获取当前时间戳：
>
>`Instant`内部只有两个核心字段：
>
>- 一个是以秒为单位的时间戳，
>- 一个是更精确的纳秒精度。
>
>它和`System.currentTimeMillis()`返回的`long`相比，只是多了更高精度的纳秒。





### 1、Instant的创建



> 直接输出Instant默认是伦敦的标准时区，和我们东八区差半个小时：



```java
package com.learn.file;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class InstantTest {
    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis()); // 1586855486387
        Instant instant = Instant.now();
        System.out.println(instant); // 2020-04-14T09:55:19.411338900Z
        // 按秒表示：
        System.out.println(instant.getEpochSecond()); // 1586855486
        // 按毫秒表示：
        System.out.println(instant.toEpochMilli()); // 1586855486388
    }
}
```







### 2、Instant +ZonedId = ZonedDateTime



> 既然`Instant`就是时间戳，那么，给它附加上一个时区，就可以创建出`ZonedDateTime`：
>
> 对于某一个时间戳，给它关联上指定的`ZoneId`，就得到了`ZonedDateTime`，继而可以获得了对应时区的`LocalDateTime`。



```java
package com.learn.file;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class InstantTest {
    public static void main(String[] args) {
        // 以指定时间戳创建Instant:
        Instant ins = Instant.now();
        Instant ins1 = Instant.ofEpochSecond(1586855486);
        ZonedDateTime zdt = ins.atZone(ZoneId.systemDefault());
        ZonedDateTime zdt1 = ins1.atZone(ZoneId.of("Asia/Shanghai"));
        System.out.println(zdt); // 2020-04-14T17:13:51.251631400+08:00[Asia/Shanghai]
        System.out.println(zdt1); // 2020-04-14T17:11:26+08:00[Asia/Shanghai]
    }
}
```



### 3、类之间的相互转换



> long指的是以long表示的一个时间戳：

```ascii
┌─────────────┐
│LocalDateTime│────┐
└─────────────┘    │    ┌─────────────┐
                   ├───>│ZonedDateTime│
┌─────────────┐    │    └─────────────┘
│   ZoneId    │────┘           ▲
└─────────────┘      ┌─────────┴─────────┐
                     │                   │
                     ▼                   ▼
              ┌─────────────┐     ┌─────────────┐
              │   Instant   │<───>│    long     │
              └─────────────┘     └─────────────┘
```



## 七、新旧API的互相转换



>由于Java提供了新旧两套日期和时间的API，除非涉及到遗留代码，否则我们应该坚持使用新的API。
>
>如果需要与遗留代码打交道，则需要在新旧API之间进行互相转换！
>
>处理日期和时间时，尽量使用新的`java.time`包；



### 1、旧API转新API



> 把旧式的`Date`或`Calendar`转换为新API对象，可以通过`toInstant()`方法转换为`Instant`对象，再继续转换为`ZonedDateTime`：
>
> Calendar -> ZonedDateTime时：应该使用本身自带的时区信息，`calendar.getTimeZone().toZoneId()`，即将旧的`TimeZone`转化为新的`ZoneId`。或者可以直接使用`atZone()`来指定时区：

```java
package com.learn;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;

public class NewOldAPI {
    public static void main(String[] args) {
        // Date -> Instant：（无时区）
        System.out.println(new Date()); // Tue Apr 14 18:12:07 CST 2020
        Instant instant = new Date().toInstant();
        System.out.println(instant);

        // Calendar -> Instant -> ZonedDateTime
        Calendar calendar = Calendar.getInstance();
        Instant instant1 = calendar.toInstant();
        ZonedDateTime zonedDateTime = instant1.atZone(ZoneId.systemDefault());
        System.out.println(zonedDateTime); // 2020-04-14T18:19:18.108+08:00[Asia/Shanghai]

        ZonedDateTime zdt = instant1.atZone(calendar.getTimeZone().toZoneId());
        System.out.println(zdt); // 2020-04-14T18:19:18.108+08:00[Asia/Shanghai]

        System.out.println(calendar.getTimeZone().toZoneId()); // Asia/Shanghai
    }
}
```



### 2、新API转旧API



> 把新的`ZonedDateTime`转换为旧的API对象，只能借助`long`型时间戳做一个“中转”：
>
> 使用ZonedDateTime.toEpochSecond()方法，获得时间戳的秒数，乘以1000获得毫秒数，然后用Date创建即可：（Date接收的参数为毫秒，不是秒！）  

```java
package com.learn;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class NewOldAPI {
    public static void main(String[] args) {
        // ZonedDateTime -> long -> Date
        ZonedDateTime zonedDateTime1 = ZonedDateTime.now();
        long l = zonedDateTime1.toEpochSecond() * 1000;
        Date date = new Date(l);
        System.out.println(date); // Tue Apr 14 18:35:52 CST 2020

        // ZonedDateTime -> long -> Calendar:
        ZonedDateTime zonedDateTime2 = ZonedDateTime.now();
        // 创建Calender：
        Calendar calendar1 = Calendar.getInstance();
        // 清空：
        calendar1.clear();
        //设置时区TimeZone: (两者都可)
        calendar1.setTimeZone(TimeZone.getTimeZone(zonedDateTime2.getZone()));
        calendar1.setTimeZone(TimeZone.getTimeZone(zonedDateTime2.getZone().getId()));
        System.out.println(zonedDateTime2.getZone()); // Asia/Shanghai
        System.out.println(zonedDateTime2.getZone().getId()); // Asia/Shanghai
        // 设置时间戳：（传入毫秒，需要将秒*1000）
        calendar1.setTimeInMillis(zonedDateTime2.toEpochSecond() * 1000);
        // 将Calender转化为Date再使用SimpleDateFormat进行格式化：
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(calendar1.getTime()));
        // 2020-04-14 18:45:59
    }
}
```

### 3、数据库中存储日期时间



> 除了旧式的`java.util.Date`，我们还可以找到另一个`java.sql.Date`，它继承自`java.util.Date`，但会自动忽略所有时间相关信息。这个奇葩的设计原因要追溯到数据库的日期与时间类型。
>
> 在数据库中，我们需要存储的最常用的是时刻（`Instant`），因为有了时刻信息，就可以根据用户自己选择的时区，显示出正确的本地时间。所以，最好的方法是直接用长整数`long`表示，在数据库中存储为`BIGINT`类型。
>
> 在数据库中存储时间戳时，尽量使用`long`型时间戳，它具有省空间，效率高，不依赖数据库的优点。



在数据库中，也存在几种日期和时间类型：

- `DATETIME`：表示日期和时间；
- `DATE`：仅表示日期；
- `TIME`：仅表示时间；
- `TIMESTAMP`：和`DATETIME`类似，但是数据库会在创建或者更新记录的时候同时修改`TIMESTAMP`。



#### 数据库类型与Java新旧API的映射关系



| 数据库    | 对应Java类（旧）   | 对应Java类（新） |
| :-------- | :----------------- | :--------------- |
| DATETIME  | java.util.Date     | LocalDateTime    |
| DATE      | java.sql.Date      | LocalDate        |
| TIME      | java.sql.Time      | LocalTime        |
| TIMESTAMP | java.sql.Timestamp | LocalDateTime    |





### 4、为不同用户以不同的偏好来显示不同的本地时间



> `DateTimeFormatter`：其中的`ofLocalizedDateTime()`方法，传入两个参数，一个日期格式，一个时间格式，具体的参数可以查看JDK源码，Idea直接按住Ctrl+左键即可跳转到源码对应位置：



```java
package com.learn;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class DateTimeWork {
    public static void main(String[] args) {
        Instant instant = Instant.now();
        long l = instant.toEpochMilli();
        System.out.println(instant.toEpochMilli());
        System.out.println(timestampToString(l, Locale.CHINA, "Asia/Shanghai")); // 2020年4月14日 下午7:21
        System.out.println(timestampToString(l, Locale.US, "America/New_York")); //Apr 14, 2020, 7:21 AM
    }

    static String timestampToString(long epochMilli, Locale lo, String zoneId) {
        // 将long转化为Instant：
        Instant ins = Instant.ofEpochMilli(epochMilli);
        // 创建格式化方法：
        DateTimeFormatter f = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM, FormatStyle.SHORT);
        // 将Instant按照当前ZoneId转化为ZonedDateTime再使用DateTimeFormatter进行格式化：
        // 方式一：不传Local则会默认以中国格式输出：
        //return f.format(ZonedDateTime.ofInstant(ins, ZoneId.of(zoneId))); // 2020年4月14日 上午7:28
        // 方式二：传Local会以当前国家格式输出：
        return f.withLocale(lo).format(ZonedDateTime.ofInstant(ins, ZoneId.of(zoneId))); // Apr 14, 2020, 7:28 AM
    }
}
```



<center style="font-size:25px; color:red">本节已经完结！敬请期待后续章节！</center>





