---
title: JavaScript教程系列之标准对象
author: Mr.Niu
toc: true
abbrlink: 15769
img: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/a/27.jpg'
thumbnail: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/a/27.jpg'
categories:
  - JavaScript教程
tags:
  - JavaScript
  - Data
  - RegExp
  - JSON
date: 2020-02-17 15:31:19
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "1409329965" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 在 JavaScript 的世界里，一切皆对象！



## 一、包装对象



### 1、用typeof来识别身份

> `number`、`string`、`boolean`、`function`和`undefined`有别于其他类型。特别注意`null`的类型是`object`，`Array`的类型也是`object`，如果我们用`typeof`将无法区分出`null`、`Array`和通常意义上的object——`{}`。

```javascript
typeof 123; // 'number'
typeof NaN; // 'number'
typeof 'str'; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Math.abs; // 'function'
typeof null; // 'object'
typeof []; // 'object'
typeof {}; // 'object'
```

### 2、通过new来包装对象



> `number`、`boolean`和`string`都有包装对象。没错，在JavaScript中，字符串也区分`string`类型和它的包装类型。包装对象用`new`创建：
>
> 经过new包装的元素类型已经变为了对象！

<p style="font-size:20px; color:red;">注意：闲的蛋疼也不要使用包装对象！尤其是针对`string`类型！！！<p>

```javascript
var n = new Number(123); // 123,生成了新的包装类型
var b = new Boolean(true); // true,生成了新的包装类型
var s = new String('str'); // 'str',生成了新的包装类型
```

```javascript
typeof new Number(123); // 'object'
new Number(123) === 123; // false

typeof new Boolean(true); // 'object'
new Boolean(true) === true; // false

typeof new String('str'); // 'object'
new String('str') === 'str'; // false
```

注意：创建包装对象后的与原始值不同！！！



### 3、不使用new的结果

> `Number()`、`Boolean`和`String()`被当做普通函数，把任何类型的数据转换为`number`、`boolean`和`string`类型（注意不是其包装类型）：

```javascript
var n = Number('123'); // 123，相当于parseInt()或parseFloat()
typeof n; // 'number'

var b = Boolean('true'); // true
typeof b; // 'boolean'

var b2 = Boolean('false'); // true! 'false'字符串转换结果为true！因为它是非空字符串！
var b3 = Boolean(''); // false

var s = String(123.45); // '123.45'
typeof s; // 'string'
```



### 4、简单总结



- 不要使用`new Number()`、`new Boolean()`、`new String()`创建包装对象；
- 用`parseInt()`或`parseFloat()`来转换任意类型到`number`；
- 用`String()`来转换任意类型到`string`，或者直接调用某个对象的`toString()`方法；

- `typeof`操作符可以判断出`number`、`boolean`、`string`、`function`和`undefined`；
- 判断`Array`要使用`Array.isArray(arr)`；
- 判断`null`请使用`myVar === null`；
- 判断某个全局变量是否存在用`typeof window.myVar === 'undefined'`；



#### toString()方法

> 除了null 和 undefined ,其他对象都有此方法！
>
> 用来将一个对象转换为字符串类型！
>
> 注意，数字调用toString方法时，会报错，因为程序会认为`.`不是调用方法而是看成了小数；
>
> 所以要使用两个点，或者加一个括号，将他变成整体！



```javascript
123.toString(); // SyntaxError

123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'
```



## 二、Data对象



### 1、获取对象

> 通过new Data()来构建一个时间对象
>
> 可以获得，年月日，星期，时分秒，毫秒，以及时间戳！
>
> 注意，当前时间是浏览器从本机操作系统获取的时间，所以不一定准确，因为用户可以把当前时间设定为任何值。

```javascript
var now = new Date();
now; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
now.getFullYear(); // 2015, 年份
now.getMonth(); // 5, 月份，注意月份范围是0~11，5表示六月
now.getDate(); // 24, 表示24号
now.getDay(); // 3, 表示星期三
now.getHours(); // 19, 24小时制
now.getMinutes(); // 49, 分钟
now.getSeconds(); // 22, 秒
now.getMilliseconds(); // 875, 毫秒数
now.getTime(); // 1435146562875, 以number形式表示的时间戳
```



### 2、创建对象



#### 创建指定日期的Data对象:

```javascript
var d = new Date(2015, 5, 19, 20, 15, 30, 123);
d; // Fri Jun 19 2015 20:15:30 GMT+0800 (CST)
```

<p style="font-size:20px; color:red;">注意：JavaScript的Date对象月份值从0开始，牢记0=1月，1=2月，2=3月，……，11=12月。！<p>

<p>注意：JavaScript的Date对象月份值从0开始，牢记0=1月，1=2月，2=3月，……，11=12月。

#### 通过解析[ISO 8601](https://www.w3.org/TR/NOTE-datetime)格式的字符串

> 返回值为时间戳！
>
>  使用Date.parse()时传入的字符串使用实际月份01 ~ 12，转换为Date对象后getMonth()获取的月份值为0 ~ 11。
>
> 要获取具体内容，得通过传入时间戳创建对象，再调用函数获得具体信息！

```javascript
var d = Date.parse('2015-06-24T19:49:22.875+08:00');
d; // 1435146562875

var d = new Date(1435146562875);
d; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
d.getMonth(); // 5
```



#### 时间戳

> 时间戳是个什么东西？时间戳是一个自增的整数，它表示从1970年1月1日零时整的GMT时区开始的那一刻，到现在的毫秒数。假设浏览器所在电脑的时间是准确的，那么世界上无论哪个时区的电脑，它们此刻产生的时间戳数字都是一样的，所以，时间戳可以精确地表示一个时刻，并且与时区无关。
>
> 我们只需要传递时间戳，或者把时间戳从数据库里读出来，再让JavaScript自动转换为当地时间就可以了。

获取当前时间戳：

两种方法：

- Data的now方法
- Data的getTime方法

```javascript
console.log(Date.now()); 
console.log(new Date().getTime());
```

#### 时区

> `Date`对象表示的时间总是按浏览器所在时区显示的，不过我们既可以显示本地时间，也可以显示调整后的UTC时间：
>
> 只要我们传递的是一个`number`类型的时间戳，我们就不用关心时区转换。任何浏览器都可以把一个时间戳正确转换为本地时间。

```javascript
var d = new Date(1435146562875);
d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时
```

## 三、RegExp对象

> 就是正则表达式！

### 1、基础匹配

- `\d` ：一个数字

- `\w` ：一个数字或一个字母（大小写）

- `\s` ：一个空格

- `.` ：一个任意字符

- `\.` ：一个小数点

- `*` ：任意个（包括0个）

- `+` ：至少一个

- `？` ：0个或1个

- `{n}` ：n个

- `{n, m}` ：n 到 m 个

- `\-` ：一个`-`

- `\\` ：一个`\`

  

```javascript
js.					//可以表示js! js1 jsp
\d{3}\s+\d{3,8}		//即三个数字一个空格然后是三到八个数字eg:010-12345

```

### 2、做到更精确的匹配，用方括号表示范围：

- `[0-9a-zA-Z\_]`可以匹配一个数字、字母或者下划线；
- `[0-9a-zA-Z\_]+`可以匹配至少由一个数字、字母或者下划线组成的字符串
- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]*`可以匹配由字母或下划线、`$`开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就JavaScript允许的变量名
- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}`更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）
- `A|B`可以匹配A或B，所以`(J|j)ava(S|s)cript`可以匹配`'JavaScript'`、`'Javascript'`、`'javaScript'`或者`'javascript'`。
- `^`表示行的开头，`^\d`表示必须以数字开头。
- `$`表示行的结束，`\d$`表示必须以数字结束。
- 你可能注意到了，`js`也可以匹配`'jsp'`，但是加上`^js$`就变成了整行匹配，就只能匹配`'js'`了。

### 3、创建正则表达式



#### 通过`/正则表达式/` 创建

#### 通过`new RegExp('正则表达式')`创建

> 注意，如果使用第二种写法，因为字符串的转义问题，字符串的两个`\\`实际上是一个`\`。

```javascript
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

re1; // /ABC\-001/
re2; // /ABC\-001/
```

### 4、正则表达式匹配

> 使用`re.test(待测字符串)`

```javascript
var re = /^\d{3}\-\d{3,8}$/;
re.test('010-12345'); // true
re.test('010-1234x'); // false
re.test('010 12345'); // false
```

### 5、切分字符串



> 使用`字符串.split(正则表达式)` 来切割：

- 第一个：按一个空格分隔
- 第二个：按一个或多个空格分隔
- 第三个：按按空格和逗号大于等于一个的任意组合分隔
- 第四个：按空格和逗号和分号的大于等于一个的任意组合分隔

```javascript
'a b   c'.split(' '); // ['a', 'b', '', '', 'c']
'a b   c'.split(/\s+/); // ['a', 'b', 'c']
'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']
'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
```

### 6、字符串分组

> 将需要分组的部分用`()`括起来即可
>
> 使用：`正则表达式.exec(待测字符串)` 进行分组
>
> 结果返回一个`Array`，`[原字符串， 分组1， 分组2，....]`
>
> 若无法匹配字符串，则返回null



```javascript
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null
```

看一个凶残的例子：

```javascript
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
re.exec('19:05:30'); // ['19:05:30', '19', '05', '30']
```

`|` 表示或者，首先看冒号前的，从前往后表示00-09、10-19、20-29...最后一个是1-9，因为有时候01不写01，而写1，所以加一个[0-9]更合适。后面类似。。。



### 7、贪婪匹配

> 正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。举例如下，匹配出数字后面的`0`：

```javascript
var re = /^(\d+)(0*)$/;
re.exec('102300'); // ['102300', '102300', '']
```

> 由于`\d+`采用贪婪匹配，直接把后面的`0`全部匹配了，结果`0*`只能匹配空字符串了。
>
> 必须让`\d+`采用非贪婪匹配（也就是尽可能少匹配），才能把后面的`0`匹配出来，加个`?`就可以让`\d+`采用非贪婪匹配：
>
> `?` ：即先满足后方的条件，再考虑前方！

```javascript
var re = /^(\d+?)(0*)$/;
re.exec('102300'); // ['102300', '1023', '00']
```

### 8、全局搜索



> JavaScript的正则表达式还有几个特殊的标志，最常用的是`g`，表示全局匹配：
>
> 即在正则表达式的最后加一个`g`
>
> 全局匹配可以多次执行`exec()`方法来搜索一个匹配的字符串。当我们指定`g`标志后，每次运行`exec()`，正则表达式本身会更新`lastIndex`属性，表示上次匹配到的最后索引：
>
> 全局匹配类似搜索，因此不能使用`/^...$/`，那样只会最多匹配一次。
>
> 拓展：正则表达式还可以指定`i`标志，表示忽略大小写；`m`标志，表示执行多行匹配。

```javascript
var r1 = /test/g;
// 等价于:
var r2 = new RegExp('test', 'g');
```

如下：

```javascript
var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;

// 使用全局匹配:
re.exec(s); // ['JavaScript']
re.lastIndex; // 10

re.exec(s); // ['VBScript']
re.lastIndex; // 20

re.exec(s); // ['JScript']
re.lastIndex; // 29

re.exec(s); // ['ECMAScript']
re.lastIndex; // 44

re.exec(s); // null，直到结束仍没有匹配到
```

### 9、小栗子

#### 实现验证邮箱的正则表达式：

> 邮箱组成：
>
> - 数字字母、下划线、小数点、`-` ,并且不以`-`开头
> - @符号
> - 域名前缀：字母数字以及·`-`的任意组合，且不能以`-`开头
> - `.`
> - 域名后缀：
>   - 1、只有一组字符：eg ：.com, .cn
>   - 2、有两组：eg: edu.cn、.com.cn
> - eg：9zdfsk7sdf-hsdf7sdf88dsf.sdfhi.sjiodf99sdf@bbsdkf-88sdf-sgd.com.cn
> - 例子有点夸张，哈哈哈哈哈！

```javascript
let re = /^\w+\.?\w+@\w+\.\w+$/;
let re = /^[0-9a-zA-Z]+\.?[0-9a-zA-Z]+\@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;
let re = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]+[_-]?[a-zA-Z0-9]+)([_-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/;
```

## 四、JSON对象

> JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。

### 1、JSON的故事

> 在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据。XML本身不算复杂，但是，加上DTD、XSD、XPath、XSLT等一大堆复杂的规范以后，任何正常的软件开发人员碰到XML都会感觉头大了，最后大家发现，即使你努力钻研几个月，也未必搞得清楚XML的规范。
>
> 终于，在2002年的一天，道格拉斯·克罗克福特（Douglas Crockford）同学为了拯救深陷水深火热同时又被某几个巨型软件企业长期愚弄的软件工程师，发明了JSON这种超轻量级的数据交换格式。

### 2、JSON的数据类型

- number：和JavaScript的`number`完全一致；
- boolean：就是JavaScript的`true`或`false`；
- string：就是JavaScript的`string`；
- null：就是JavaScript的`null`；
- array：就是JavaScript的`Array`表示方式——`[]`；
- object：就是JavaScript的`{ ... }`表示方式。

> JSON还定死了字符集必须是UTF-8，表示多语言就没有问题了。
>
> 为了统一解析，JSON的字符串规定必须用双引号`""`，Object的键也必须用双引号`""`。
>
> 由于JSON非常简单，很快就风靡Web世界，并且成为ECMA标准。几乎所有编程语言都有解析JSON的库，而在JavaScript中，我们可以直接使用JSON，因为JavaScript内置了JSON的解析。

### 3、JSON序列化

> 通过JSON的stringfy()方法来进行序列化：

```javascript
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

var s = JSON.stringify(xiaoming);
console.log(s);//{"name":"小明","age":14,"gender":true,"height":1.65,"grade":null,"middle-school":"\"W3C\" Middle School","skills":["JavaScript","Java","Python","Lisp"]}
```

为了好看一点：按照缩进输出：

```javascript
JSON.stringify(xiaoming, null, '  ');
//结果：
{
  "name": "小明",
  "age": 14,
  "gender": true,
  "height": 1.65,
  "grade": null,
  "middle-school": "\"W3C\" Middle School",
  "skills": [
    "JavaScript",
    "Java",
    "Python",
    "Lisp"
  ]
}
```



```javascript
JSON.stringify(xiaoming, ['name', 'skills'], '  ');
//结果：只输出name和skills的结果：
{
  "name": "小明",
  "skills": [
    "JavaScript",
    "Java",
    "Python",
    "Lisp"
  ]
}


function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}

JSON.stringify(xiaoming, convert, '  ');
//结果：将值为String类型的都大写输出：
{
  "name": "小明",
  "age": 14,
  "gender": true,
  "height": 1.65,
  "grade": null,
  "middle-school": "\"W3C\" MIDDLE SCHOOL",
  "skills": [
    "JAVASCRIPT",
    "JAVA",
    "PYTHON",
    "LISP"
  ]
}
```

更精确控制：

> 可以在对象内部定义一个`toJSON()`的方法：

```javascript
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
```

### 4、反序列化

> 将JSON格式化后的字符串变为JavaScript对象
>
> 格式：`JSON.parse(格式化的字符串)`；

```javascript
JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
JSON.parse('{"name":"小明","age":14}'); // Object {name: '小明', age: 14}
JSON.parse('true'); // true
JSON.parse('123.45'); // 123.45
```

parse()还可以跟一个函数来控制：

> 如果属性是name，则在对应的值上加同学两个字：

```javascript
var obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
    if (key === 'name') {
        return value + '同学';
    }
    return value;
});
console.log(JSON.stringify(obj)); // {"name": "小明同学", "age": 14}
```

## 本节到此结束，欢迎阅读，敬请期待后续章节！