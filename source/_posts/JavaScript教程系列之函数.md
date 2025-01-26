---
title: JavaScript教程系列之函数
author: Mr.Niu
toc: true
abbrlink: 52313
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/f (26).png'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/04.jpg'
categories:
  - JavaScript教程
tags:
  - JavaScript
  - 函数
date: 2020-02-11 16:29:20
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "1383927243" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}

## 一、函数的定义与调用



### 定义

```javascript
function abs(x) 
{
    if (x >= 0) return x;
    else return -x;
}

abs(-9);// 9
```

- JavaScript用function来指出这是一个函数
- JavaScript不写return语句自动返回undefined



### 调用

- 调用时参数可以有多个，即使定义时参数为1个

```JavaScript
abs(10, 'blablabla'); // 返回10
abs(-9, 'haha', 'hehe', null); // 返回9
```

- 传入参数比定义还少也可以，返回NaN

> 此时参数 x 将收到undefined，为了避免参数收到undefined，可以进行一下判断：
>
> 这样，若没有参数，或参数传错即可输出一条提示语句。
>
> typedef 来返回值得类型，可以用括号将参数括起来，也可以直接以空格隔开。
>
> throw 语句：语句允许您创建自定义错误。从技术上讲能够*抛出异常（抛出错误）*。异常可以是 JavaScript 字符串、数字、布尔或对象：

```javascript
abs(); // 返回NaN x 收到参数为undefined

function abs(x) 
{
    if (typeof x !== 'number') 
        throw 'Not a number';
    if (x >= 0) return x;
    else return -x;
}

```

### arguments

> JavaScript还有一个免费赠送的关键字`arguments`，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。`arguments`类似`Array`但它不是一个`Array`：
>
> 可以接收传入的所有参数

```javascript
function foo(x) 
{
    console.log('x = ' + x); // 10
    for (var i=0; i<arguments.length; i++) 
    {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);
```

- 关键字在可以用来解决没有参数，但却传参无法接收参数的问题

```javascript
function abs() 
{
    if (arguments.length === 0)
    	return 0;
    var x = arguments[0];
    return x >= 0 ? x : -x;
}

abs(); // 0
abs(10); // 10
abs(-9); // 9
```

- 解决可选参数问题

> 此函数可以用来解决可选参数与函数内部实际参数的对应关系，以免造成混乱
>
> 调用时是将a给了a，c给了b，所以为了保证对应，用if来判断，并作出修改

```java
// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) 
{
    if (arguments.length === 2) 
    {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}
```

### rest参数

> rest参数只能写在最后，前面用`...`标识，从运行结果可知，传入的参数先绑定`a`、`b`，多余的参数以数组形式交给变量`rest`，所以，不再需要`arguments`我们就获取了全部参数。
>
> 如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是`undefined`）。

```javascript
function foo(a, b, ...rest) 
{
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
```

### return 语句

注意：与C++不同，JavaScript引擎有一个在行末自动添加分号的机制，所以要保证你的句子不要写错。

```javascript
function foo1() 
{
    return //这就是错的
    { name: 'foo' };
}

function foo2() 
{
    return { 
        name: 'foo'
    };
}

function foo3() 
{
    return { name: 'foo' };
}

foo3(); // { name: 'foo' }
```

如上：1是错的，2、3是对的。

## 二、变量作用域



### 1、变量作用域同其他语言一样，从内到外



### 2、变量提升



#### 变量提升介绍

> 只针对var声明的变量，let没有这些奇怪的用法

```javascript
function foo()
{
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

foo();//Hello, undefined

//上面的写法相当于下面的写法
function foo()
{
    var y; // 提升变量y的申明，此时y为undefined
    var x = 'Hello, ' + y;
    console.log(x);
    y = 'Bob';
}
```

> 不会报错，原因是变量`y`在稍后申明了。但是`console.log`显示`Hello, undefined`，说明变量`y`的值为`undefined`。
>
> 这正是因为JavaScript引擎自动提升了变量`y`的声明，但不会提升变量`y`的赋值。

So 用到的变量最好提前声明。。。以防 不必要麻烦。。。

#### var 声明变量

一次声明所有需要的变量。。

```javascript
function foo() 
{
    var
        x = 1, // x初始化为1
        y = x + 1, // y初始化为2
        z, i; // z和i为undefined
}
```

#### 全局作用域

> 不在任何函数内定义的变量就具有全局作用域。
>
> 实际上，JavaScript默认有一个全局对象`window`，全局作用域的变量实际上被绑定到`window`的一个属性.

```javascript
var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'

function foo() 
{
    alert('foo');
}

foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用

alert("hhhhh");
window.alert('调用window.alert()');
```

#### 名字空间

> 全局变量会绑定到`window`上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。
>
> 减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中
>
> 著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。
>
> 其实就是用一个自定义的对象绑定了。。。

```javascript
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () 
{
    return 'foo';
};
```

#### 局部作用域

##### var

无法实现for循环的局部范围

```javascript
function foo() 
{
    for (var i=0; i<100; i++)
    {
        //
    }
    i += 100; // 仍然可以引用变量i
}
```

##### let

let没有这个问题

```javascript
function foo() 
{
    var sum = 0;
    for (let i=0; i<100; i++) 
    {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}
```



<p style="color:red; font-size: 25px">所以定义变量建议全部使用let，而不使用var;</p>

##### const

> 用来定义常量，定义的常量不会被修改值

```javascript
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14
```

### 3、解构赋值



#### 具体使用

> 使用解构赋值，直接对多个变量同时赋值
>
> 数组结构多个变量要使用`[]`来解构
>
> 数组若是嵌套，要保证对应层次相同
>
> 可以省略不想解构的值，逗号隔开即可
>
> 对对象解构要使用`{}`
>
> 对象的嵌套也要保证解构的层次对应清楚，属性后面根冒号再写大括号，eg：`,address: {city, zip},`
>
> 找不到的属性会报错undefined

```javascript
let [x, y, z] = ['hello', 'JavaScript', 'ES6'];
console.log(x,y,z);//hello JavaScript ES6

let [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];

let [, , z] = ['hello', 'JavaScript', 'ES6']; // 忽略前两个元素，只对z赋值第三个元素

let person ={
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
let {name, age, passport} = person;

let person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
let {name, address: {city, zip}} = person;

let {name, single=true} = person;
```



> 声明过的变量要想赋值，不能直接使用，要使用圆括号括起来
>
> 这是因为JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。解决方法是用小括号括起来：

```javascript
// 声明变量:
let x, y;
// 解构赋值:
{x, y} = { name: '小明', x: 100, y: 200};
// 语法错误: Uncaught SyntaxError: Unexpected token =
//正确写法:
({x, y} = { name: '小明', x: 100, y: 200});
```

> 如果想给对象中的属性换个名字，解构的时候可以在变量名后面加一个冒号，加上想要改的别名即可。。



```javascript
let person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};

// 把passport属性赋值给变量id:
let {name, passport:id} = person;
name; // '小明'
id; // 'G-12345678'
// 注意: passport不是变量，而是为了让变量id获得passport属性:
passport; // Uncaught ReferenceError: passport is not defined
```

> 添加默认值，直接用等号赋值即可，
>
> 可以解决找不到属性，返回undefined的错误

```javascript
let person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678'
};

// 如果person对象没有single属性，默认赋值为true:
let {name, single=true} = person;
name; // '小明'
single; // true
```

#### 用处

> 用来交换两个值！

```javascript
let x=1, y=2;
[x, y] = [y, x]
```

> 快速获取当前页面域名和路径

```
var {hostname:domain, pathname:path} = location;
```



> 创建Date对象

```javascript
function buildDate({year, month, day, hour=0, minute=0, second=0})
{
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}

let t = buildDate({ year: 2020, month: 2, day: 12, hour: 20, minute: 15 });
console.log(t);
//Wed Feb 12 2020 20:15:00 GMT+0800 (中国标准时间)

//或者这样进行解构
var time = {};
time.year = 2018;
time.month = 1;
time.day = 1;
time.hour = 23;
time.minute = 45;
time.second = 18;
console.log(buildDate(time));
```

## 三、对象内的函数



### 1、定义及使用

> 调用时加上括号是调用函数
>
> 不加括号是调用函数内容，直接打印函数体

#### 合着来写：

```javascript
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

console.log(xiaoming.age); // function xiaoming.age()
console.log(xiaoming.age()); // 今年调用是25,明年调用就变成26了
```

浏览器返回的结果：

```javascript
ƒ ()
{
	var y = new Date().getFullYear();
	return y - this.birth;
}
30
```

#### 分开来写：

```JavaScript
function getAge() 
{
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

console.log(xiaoming.age()); // 25, 正常结果
console.log(getAge()); // NaN
```

>直接调用函数，由于this的指向就变成了全局对象windows，而windows并没有birth这个属性，所以最后会返回一个NaN;

#### 错误写法

```JavaScript
var fn = xiaoming.age; // 先拿到xiaoming的age函数
fn(); // NaN
```

这种写法也是错的，必须直接用对象加点加属性来调用

```javascript
xiaoming.age();
```

#### 重构函数

- 第一种，this指向是windows，结果为NaN
- 第二种：this指向that,that指向xiaoming，结果正确



```javascript
//第一种，this指向是windows

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () 
    {
        function getAgeFromBirth() 
        {
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // NaN

//第二种：this指向that,that指向xiaoming
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () 
    {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() 
        {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};

xiaoming.age(); // 25
```





### 2、this

> 在一个方法内部，`this`是一个特殊变量，它始终指向当前对象，也就是`xiaoming`这个变量。所以，`this.birth`可以拿到`xiaoming`的`birth`属性。
>
> 而直接在函数内部使用this，则指向的是windows全局对象



#### apply()方法

> 用来改变this 指向
>
> 它接收两个参数，第一个参数就是需要绑定的`this`变量，第二个参数是`Array`，表示函数本身的参数。

```JavaScript
function getAge() 
{
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25

getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
```

#### call()方法

- `apply()`把参数打包成`Array`再传入；
- `call()`把参数按顺序传入。

> 对于一般函数，通常把this绑定为 null 即可

```JavaScript
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
```





### 3、装饰器

> 通过apply()方法我们可以动态改变函数作用
>
> 可以实现在原函数不变的情况下增加功能的效果

- 先保留原函数
- 再改变原函数，最后通过apply()方法传入this指向和参数，return回去原函数的作用
- 达到增加功能的效果
- arguments即当前函数接收到的所有参数，再次传给保留的旧函数，进行作用

##### 而apply最大的作用就是可以将改造函数传入的一堆参数再原封不动的传给旧函数！！！

```javascript
var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () 
{
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};
// 测试:
parseInt('10');
parseInt('20');
parseInt('30');
console.log('count = ' + count); // 3

```



## 四、高阶函数



> JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

简单的例子：

```javascript
function add(x, y, f)
{
    return f(x) + f(y);
}
let x = add(-5, 8, Math.abs);
console.log(x);//13
```

### 1、map()函数

> 此方法是专门针对数组的
>
> 由于`map()`方法定义在JavaScript的`Array`中，我们调用`Array`的`map()`方法，传入我们自己的函数，就得到了一个新的`Array`作为结果
>
> map参数为函数名

```javascript
function pow(x)
{
    return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
console.log(results);

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
```

### 2、reduce()函数

> Array的`reduce()`把一个函数作用在这个`Array`的`[x1, x2, x3...]`上
>
> 这个函数必须接收两个参数，`reduce()`把结果继续和序列的下一个元素做累积计算，其效果就是：
>
> ```javascript
> [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
> ```
>
> 就是一个迭代过程！

#### 利用reduce求乘积

```javascript
function product(arr)
{
	return arr.reduce((x,y)=>x*y);
}
console.log(product([1,5,2,7,9]));//630
```

#### 利用reduce 将数字数组转化为整数

```javascript
let arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) 
{
    return x * 10 + y;
}); // 13579
```

#### 将字符串变为数字

```javascript
function stringToint(s) 
{
    let ss = [];
    for(let i = 0; i < s.length; i++) ss.push(s[i]);
    let arr = ss.map(x => x -= '0'); 
    let res = arr.reduce((x,y) => x * 10 + y);

    return res;
    
    //或者合并一下操作，这样也可以：
    return ss.map((x) => x -= '0').reduce((x, y) => (x*10+y));
    
    //用split函数来得到一个副本为单个字符的数组
    return s.split('').map(x => x * 1).reduce((x, y) => x * 10 + y)
    
    //或者直接使用下面的语句：
    return s* 1;
    
    //使用自带的parseInt函数
    r = ss.map(function(x){
    return parseInt(x)});
}
stringToint('43859843');//43859843
```

注意：

- return s* 1 ：隐式类型转换 ，会将操作数转换成数字类型，如运算符-, *, /,%



#### 首字母大写，其他小写

> 输入：`['adam', 'LISA', 'barT']`，输出：`['Adam', 'Lisa', 'Bart']`。

```javascript
function normalize(arr) 
{
	let arrs = [];
    arrs = arr.map(function(x){
    	let s = x[0].toUpperCase();
   		for(let i = 1; i < x.length; i++) 
    		s += x[i].toLowerCase();
    	return s;
    });
    return arrs;
    
    //或者这样
    return arr.map((x) => {
    	let a = '';
    	for (let v of x) 
        {
      		if (!a) a += v.toUpperCase();
        	else a += v.toLowerCase();
    	}
    	return a;
  })；
    //或者使用split函数分割再使用reduce进行拼接
    return  arr.map(function(s){
        var c=s.toLowerCase().split('');
        c[0]=c[0].toUpperCase();
        return c.reduce((x,y)=>x+y);

    });
}
	//或者这样，比较精巧，使用字符串的substr函数
	return arr.map(function(arr){
  		return arr[0].toUpperCase()+arr.substr(1).toLowerCase();
    });
	//或者这样，使用数组的slice函数
    return arr.map(s => s[0].toUpperCase() + s.slice(1).toLowerCase());

console.log(normalize(['adam', 'LISA', 'barT']));
```





### 3、filter()函数



> filter同样是作用于数组Array的函数！
>
> filter也是一个常用的操作，它用于把`Array`的某些元素过滤掉，然后返回剩下的元素。
>
> 简而言之：就是一个按条件过滤函数；
>
> 返回新数组！



过滤掉偶数：

```javascript
let arr = [1, 2, 4, 5, 6, 9, 10, 15];
let r = arr.filter(function (x){
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]
```

过滤掉空字符串：

> 字符串的trim函数用来删除字符串的头尾空格。

```javascript
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
    return s && s.trim();
});
r; // ['A', 'B', 'C']
```

> `filter()`接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示`Array`的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

```javascript
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // ['A', 'B', 'C']
    return true;
});
```



过滤掉相同的元素

> 过滤掉数组找到的当前元素下标和当前元素的真正下标不相等的
>
> indexOf函数总是返回数组中找到的第一个匹配的下标，所以后面有相同字符串不同下标的时候就会自动过滤。

```javascript
var
    r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
    
r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});

console.log(r);

```



### 4、sort()函数



> 通常规定，对于两个元素`x`和`y`，如果认为`x < y`，则返回`-1`，如果认为`x == y`，则返回`0`，如果认为`x > y`，则返回`1`
>
> sort函数会直接修改当前Array，注意！
>
> sort 返回修改后的数组！



```javascript
// 看上去正常的结果:
['Google', 'Apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];

// apple排在了最后:
['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']

// 无法理解的结果:
[10, 20, 1, 2].sort(); // [1, 10, 2, 20]
```

- 第一个正常
- 第二个不正常，都是按照ASKII码排序的
- 第三个不正常，虽然是数字，但`Array`的`sort()`方法默认把所有元素先转换为String再排序

作为高阶函数sort自然可以穿函数参数：

> 与其他语言不同，比较函数得写全，不能只写一个if
>
> 返回的1可以理解为需要交换
>
> 返回-1表示不需要交换
>
> 返回0表示。。。

- 数字比价

```javascript
arr.sort(function (x, y) {
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
});
console.log(arr); // [1, 2, 10, 20]

arr.sort(function (x, y) {
    if (x < y) return 1;
    if (x > y) return -1;
    return 0;
});
console.log(arr); // [20,10,2,1]
```

- 字符串比较

> 既有大写又有小写，则统一一下进行比较

```
var arr = ['Google', 'apple', 'Microsoft'];
arr.sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); // ['apple', 'Google', 'Microsoft']
```

### 5、every()函数

> `every()`方法可以判断数组的所有元素是否满足测试条件。
>
> 返回值为 true 或 false



```javascript
var arr = ['Apple', 'pear', 'orange'];
console.log(arr.every(function (s) {
    return s.length > 0;
})); // true, 因为每个元素都满足s.length>0

console.log(arr.every(function (s) {
    return s.toLowerCase() === s;
})); // false, 因为不是每个元素都全部是小写

```

### 6、find()函数

> `find()`方法用于查找符合条件的第一个元素，如果找到了，返回这个元素，否则，返回`undefined`：
>
> 返回元素



```javascript
var arr = ['Apple', 'pear', 'orange'];

console.log(arr.find(function (s) {
    return s.toLowerCase() === s;
})); // 'pear', 因为pear全部是小写

console.log(arr.find(function (s) {
    return s.toUpperCase() === s;
})); // undefined, 因为没有全部是大写的元素
```

### 7、findIndex()函数

> `findIndex()`和`find()`类似，也是查找符合条件的第一个元素，不同之处在于`findIndex()`会返回这个元素的索引，如果没有找到，返回`-1`：
>
> 返回索引

```javascript
var arr = ['Apple', 'pear', 'orange'];
console.log(arr.findIndex(function (s) {
    return s.toLowerCase() === s;
})); // 1, 因为'pear'的索引是1

console.log(arr.findIndex(function (s) {
    return s.toUpperCase() === s;
})); // -1

```



### 8、forEach

> `forEach()`和`map()`类似，它也把每个元素依次作用于传入的函数，但不会返回新的数组。`forEach()`常用于遍历数组，因此，传入的函数不需要返回值：



```javascript
var arr = ['Apple', 'pear', 'orange'];
arr.forEach(console.log); // 依次打印每个元素
```



## 五、闭包



### 1、函数作为返回值

```javascript
function sum(arr) 
{
    return arr.reduce(function (x, y) {
        return x + y;
    });
}

sum([1, 2, 3, 4, 5]); // 15
```



### 2、延迟执行函数



> 对上一个进行包装，写成一个函数套函数即可实现
>
> `f1()`和`f2()`的调用结果互不影响，返回的都是一个新的独立的函数！

```javascript
function lazy_sum(arr) 
{
    var sum = function ()
    {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}

var f = lazy_sum([1, 2, 3, 4, 5]); // f接收sum用来求和的函数
f(); // 15 调用f指向的sum函数

var f1 = lazy_sum([1, 2, 3, 4, 5]);
var f2 = lazy_sum([1, 2, 3, 4, 5]);
f1 === f2; // false
```

### 3、闭包



> 闭包参考，加深理解：
>
> [JavaScript之闭包](https://www.cnblogs.com/cjvae/p/9786598.html)



> 在面向对象的程序设计语言里，比如Java和C++，要在对象内部封装一个私有变量，可以用`private`修饰一个成员变量。
>
> 在没有`class`机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量。
>
> 函数内部的函数不进行函数的函数调用是不会执行的！
>
> 简而言之：就是为了让外部的人访问不到内部的东西，外部的人看不到内部存在的闭包

#### 最简单的闭包：



```javascript
function makeFunc() 
{
    var name = "Mozilla";
    function displayName() 
    {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();
```

> 在一些编程语言中，函数中的局部变量仅在函数的执行期间可用。
>
> 一旦 `makeFunc()` 执行完毕，我们会认为 `name` 变量将不能被访问。然而，因为代码运行得没问题，所以很显然在 JavaScript 中并不是这样的。
>
>  JavaScript这样的原因是：JavaScript中的函数会形成**闭包**。 闭包是由函数以及创建该函数的词法环境组合而成，这个环境包括了这个闭包创建时所能访问的所有局部变量。在上面的例子中，`myFunc` 是执行 `makeFunc` 时创建的 `displayName` 函数实例的引用，而 `displayName` 实例仍可访问其词法作用域中的变量，即可以访问到 `name` 。由此，当 `myFunc` 被调用时，`name` 仍可被访问，其值 `Mozilla` 就被传递到`alert`中。



#### 函数生产工厂

```javascript
function makeAdder(x) 
{
  return function(y)
  {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7 实现参数和5加的函数
console.log(add10(2)); // 12 实现参数和10加的函数
```



#### 闭包问题来源

> 本例子引用[廖雪峰JavaScript之闭包](https://www.liaoxuefeng.com/wiki/1022910821149312/1023021250770016#0)

```javascript
function count() 
{
    var arr = [];
    for (var i=1; i<=3; i++) 
    {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
```



> 在上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都添加到一个`Array`中返回了。你可能认为调用`f1()`，`f2()`和`f3()`结果应该是`1`，`4`，`9`，但实际结果是：



```javascript
f1(); // 16
f2(); // 16
f3(); // 16
```

**问题解析：**

> 首先我们弄懂上面代码的运行流程：
>
> 首先`var results = count();`之后，函数`count`已经被调用了，所以一次执行函数内的各段代码：`var arr = [];`，`for (var i=1; i<=3; i++)`，这个for循环尤其值得注意。
>
> 因为此时循环体执行了push方法，将一个个函数`function () { return i * i;}`添加到数组内，但是这个函数并**没有被调用**，还只是一个变量，所以for循环依次执行，直到`i = 4`。因为闭包，内部函数`function () { return i * i;}`引用的`i`就是外部变量，for循环中的`i = 4`。所以，之后数组`arr`内的函数的`i`都是4。
>
>  调用函数`count`后，变量`results`已经是数组`arr`了。数组里面元素依次是`function f1() { return i * i;} function f2() { return i * i;} function f3() { return i * i;}`。但是三个函数都没有被调用，直到`var f1 = results[0];`，此时`function f1() { return i * i;}`开始执行，如上段所写，此时的`i = 4`，所以，返回值就是16了。后面两个调用也是类似情况。
>
> 简而言之：就是因为函数内部的函数不会直接执行，会等到调用了外部函数之后，在调用 到内部的函数时，才会执行，也就是说，`var results = count();`这里还没有调用到内部的函数，直到`var f1 = results[0];`被调用时，才会调用到内部的函数！
>
> 然而：在count()函数被调用时，i的值就已经变为了4，所以在result()调用时，i 其实是4,； 同理：后面的所有i 就都变为了4！

**解决办法**

> 为了实现我们理想的结果，1，4，9；可以这样做：
>
> 注意这里用了一个“创建一个匿名函数并立刻执行”的语法：

```javascript
function count() 
{
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

f1(); // 1
f2(); // 4
f3(); // 9

//或者这样：

function count() 
{
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return n * n;
        })(i));
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

console.log(f1); // 1
console.log(results[1]);//4
```

**“创建一个匿名函数并立刻执行”**

> 最后小括号内引用的参数是用来保存值的，也是为了传递到函数的 x 参数使用的，同时做到了即刻执行的效果！
>
> 注意：函数要用小括号括起来：

```javascript
(function (x) {
    return x * x;
})(3); // 9
```

### 4、对象作为返回值

> 此时return 后面跟的是一个大括号，即是一个对象：

```javascript
function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function () {
            x += 1;
            return x;
        }
    }
}

var c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

var c2 = create_counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13
```

解析：

> 在返回的对象中，实现了一个闭包，该闭包携带了局部变量`x`，并且，从外部代码根本无法访问到变量`x`。换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来。
>
> 函数内部的x += 1;实际上他已经改变了函数内部的x，也就是对当前函数来说的局部变量x,由于闭包的出现，导致c2这个函数不会终止，即第一次的调用对后续是有累积效应的！
>
> 而c1和c2则是完全独立的！

## 六、箭头函数

最简单的例子：二者一样：

### 一条语句

```javascript
x => x * x

function (x)
{
    return x * x;
}
```

> 箭头函数相当于匿名函数(即没有函数名！)，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连`{ ... }`和`return`都省略掉了。还有一种可以包含多条语句，这时候就不能省略`{ ... }`和`return`：

### 多条语句

```javascript
x => {
    if (x > 0) return x * x;
    else return - x * x;
}
```

### 多个参数：

> 需要用小括号括起来：无参数也需要括起来；

```javascript
// 两个参数:
(x, y) => x * x + y * y

// 无参数:
() => 3.14

// 可变参数:
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
```

### 返回对象

> 本来要用大括号，但是对象也是大括号，所以用小括号来括住了！

```javascript
x => ({ foo: x })
```

### this

> 箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的`this`是词法作用域，由上下文确定。
>
> 箭头函数this的指向永远是作用域内的那个指向！
>
> 而不是普通函数的指向；要想实现真正指向，如以前教程，可以`var that = this;`
>
> 如下：普通函数this指向windows会undefined

```javascript
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};
```

> 改用箭头函数后：this始终指向obj对象！

```javascript
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
```

> 使用了箭头函数后，无法通过参数来改变this指向
>
> this指向还是obj，而不是此时的year！
>
> 由于`this`在箭头函数中已经按照词法作用域绑定了，所以，用`call()`或者`apply()`调用箭头函数时，无法对`this`进行绑定，即传入的第一个参数被忽略：

```javascript
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
obj.getAge(2015); // 25
```

## 七、generator



> 一个generator看上去像一个函数，但可以返回多次。
>
> 可以实现多次return的作用





### 1、普通的

> 实现斐波那契数列的算法
>
> 只有返回一个数组才能得到最终结果

```javascript
function fib(max) 
{
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        [a, b] = [b, a + b];
        arr.push(b);
    }
    return arr;
}

// 测试:
fib(5); // [0, 1, 1, 2, 3]
fib(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### 2、使用generator

> - generator和函数不同的是，generator由`function*`定义（注意多出的`*`号），并且，除了`return`语句，还可以用`yield`返回多次。
> - 直接调用一个generator和调用函数不一样，`fib(5)`仅仅是创建了一个generator对象，还没有去执行它。



> - 调用方法一：调用generator对象的`next()`方法：
> - `next()`方法会执行generator的代码，然后，每次遇到`yield x;`就返回一个对象`{value: x, done: true/false}`，
> - 然后“暂停”。返回的`value`就是`yield`的返回值，`done`表示这个generator是否已经执行结束了。如果`done`为`true`，则`value`就是`return`的返回值。
> - 当执行到`done`为`true`时，这个generator对象就已经全部执行完毕，不要再继续调用`next()`了。

```javascript
function* fib(max) 
{
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}

var f = fib(5);// fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
```

> 调用方法二：使用for of语句
>
> 此调用不需要我们来判断done,for of 可以自动判断！



```javascript
function* fib(max) 
{
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}

for (var x of fib(10))
{
    console.log(x); // 依次输出0, 1, 1, 2, 3, ...
}

```

### 3、一个小栗子

> 实现打印下一个id:

```javascript
function* next_id() 
{
    var x=0;
  	while(true)
	{
   		yield ++x;
 	}
}
// 测试:
let x
    g = next_id();
for (x = 1; x < 100; x ++)
       console.log(g.next().value);//[1,2,3....99]
```

<p style="color: red; font-size:25px">函数这节有点难度，也是看了好久，需要经常看！经过艰难险阻，终于完结了！敬请期待下一节！</p>



