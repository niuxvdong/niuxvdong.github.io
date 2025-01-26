---
title: JavaScript教程系列之基础语法入门
author: Mr.Niu
toc: true
abbrlink: 41103
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/e (19).jpg'
categories:
	- JavaScript教程
tags:
	- JavaScript
	- 入门
date: 2020-02-09 13:53:06
updated:
top_img: https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/04.jpg
---



## 首先来首歌曲来放松一下吧！

{% meting "1345848098" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}

> 在Web世界里，只有JavaScript能跨平台、跨浏览器驱动网页，与用户交互。
>
> 新兴的Node.js把JavaScript引入到了服务器端，JavaScript已经变成了全能型选手。
>
> JavaScript确实很容易上手，但其精髓却不为大多数开发人员所熟知。编写高质量的JavaScript代码更是难上加难。



> 教程参考：[JavaScript全栈教程](https://www.liaoxuefeng.com/wiki/1022910821149312)

## 一、JavaScript的诞生

> 在上个世纪的1995年，当时的网景公司正凭借其Navigator浏览器成为Web时代开启时最著名的第一代互联网公司。
>
> 由于网景公司希望能在静态HTML页面上添加一些动态效果，于是叫Brendan Eich这哥们在两周之内设计出了JavaScript语言。你没看错，这哥们只用了10天时间。
>
> 为什么起名叫JavaScript？原因是当时Java语言非常红火，所以网景公司希望借Java的名气来推广，但事实上JavaScript除了语法上有点像Java，其他部分基本上没啥关系。



## 二、JavaScript引入



> JavaScript代码可以直接嵌在网页的任何地方，不过通常我们都把JavaScript代码放到head中

- 第一种

```javascript
<script>
    alert('hello world!');
</script>
```

- 第二种

```javascript
<script src="/static/js/abc.js"></script>
```

- 第三种

> 默认的`type`就是JavaScript，所以不必显式地把`type`指定为JavaScript。

```javascript
<script type="text/javascript">
  ...
</script>
```

## 三、基本语法



### 句子以分号结束

### `'Hello, world';` 也是完整语句



### 注释

- `//`：单行注释
- `/**/`：多行注释

## 四、数据类型



### Number类型

> 123; 						// 整数123
> 0.456;					 // 浮点数0.456
> 1.2345e3; 				// 科学计数法表示1.2345x1000，等同于1234.5
> -99;						 // 负数
> NaN; 					// NaN表示Not a Number，当无法计算结果时用NaN表示
> Infinity; 				// Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity



### 字符串类型

> 使用单引号或双引号引起来的内容
>
> 同样，要输出无法输出的字符，仍然可以使用`\`来转义

#### 字符串转义：

```javascript
'I\'m \"OK\"!';			//I'm "OK"!
'\x41'; 				// 完全等同于 'A'---\x表示ASCII编码字符
'\u4e2d\u6587'; 		// 完全等同于 '中文' ----\u表示一个Unicode字符
```

#### 多行字符串：

> 由于多行字符串用`\n`写起来比较费事，所以最新的ES6标准新增了一种多行字符串的表示方法，用反引号 "``"表示：
>
> 反引号位于数字1的左边

```javascript
`这是一个
多行
字符串`;
```

#### 模板字符串：

> 将多个字符串连接起来

- 使用 + 号

```javascript
var name = '小明';
var age = 20;
var message = '你好, ' + name + ', 你今年' + age + '岁了!';
```

- 使用`${变量}`来表示，得用反引号引起来

```javascript
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
alert(message);
```

显示结果都是：

你好, 小明, 你今年20岁了!



#### str.length

```javascript
var s = 'Hello, world!';
s.length; // 13
```

#### 索引操作

略。

对索引赋值，无返回结果，不影响原值，并且字符串类型无法进行修改，是不可变类型

```javascript
var s = 'Test';
s[0] = 'X';
alert(s); // s仍然为'Test'
```

#### toUpperCase()函数

> 小写变大写

```javascript
var s = 'Hello';
s.toUpperCase(); // 返回'HELLO'
```

####  toLowerCase()函数

> 大写边小写

```javascript
var s = 'Hello';
var lower = s.toLowerCase(); // 返回'hello'并赋值给变量lower
lower; // 'hello'
```

#### indexOf()函数

> 返回字串出现位置，没有找到返回-1

```javascript
var s = 'hello, world';
s.indexOf('world'); // 返回7
s.indexOf('World'); // 没有找到指定的子串，返回-1
```

#### substring()函数

> 返回索引区间字串

```javascript
var s = 'hello, world'
s.substring(0, 5); // 从索引0开始到5（不包括5），返回'hello'
s.substring(7); // 从索引7开始到结束，返回'world'
```

#### split()函数

> split() 方法用于把一个字符串分割成字符串数组。
>
> 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
>
>  split() 方法不改变原始字符串。
>
> `*string*.split(*separator*,*limit*)` 第一个参数：分隔符；第二个参数：限制返回字符数组的最大长度，不指定则不限制；

```javascript
var str="How are you doing today?";
var n=str.split(" ");//["How", "are", "you", "doing", "today?"]

var nn = str.split();
console.log(nn);//["How are you doing today?"]

var nnn = str.split("");
console.log(nnn);//["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", " ", "t", "o", "d", "a", "y", "?"]

var nnnn = str.split(" ", 3);
console.log(nnnn);//["How", "are", "you"]
```

### 布尔类型

> true 和 false



```javascript
false == 0; // true
false === 0; // false
```

#### 注意：

- `==`：它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果
- `===`：它不会自动转换数据类型，如果数据类型不一致，返回`false`，如果一致，再比较。

**所以：**

尽量不要使用 `==`来进行比较，要使用`===`来比较！

#### 特例1：NaN 与自己比较也会返回false

```javascript
NaN === NaN; // false
```

判断方法：使用isNaN()函数比较

```javascript
isNaN(NaN); // true
```

#### 特例2：浮点数比较

> 浮点数在运算过程中会产生误差，因为计算机无法精确表示无限循环小数。要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值.（二级制无法表示0.1 。。。。。。）

```javascript
1 / 3 === (1 - 2 / 3); // false
```

解决方法：使用Math.abs()函数

```javascript
Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true
```

### null 和 undefined

> JavaScript的设计者希望用`null`表示一个空的值，而`undefined`表示值未定义.

### 数组

> 数组可以包括任意数据类型

#### 中括号创建数组



```javascript
[1, 2, 3.14, 'Hello', null, true];
```

#### 使用Array()函数创建数组：



```javascript
new Array(1, 2, 3); // 创建了数组[1, 2, 3]
```

#### 建议直接使用`[]`来创建数组

> 与其他语言一样，可以只用下标访问，超出下标范围返回undeifined

```javascript
var arr = [1, 2, 3.14, 'Hello', null, true];
arr[0]; // 返回索引为0的元素，即1
arr[5]; // 返回索引为5的元素，即true
arr[6]; // 索引超出了范围，返回undefined
```

#### for循环遍历

```javascript
var arr2 = [1,2,3,'', "jdsoa", null];
for(var n in arr) console.log(arr[n]);
```

#### s.length

注意点：直接给`Array`的`length`赋一个新的值会导致`Array`大小的变化：

```javascript
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]
```



#### 可通过索引修改值

> 切记不可超出下标范围



#### indexOf()函数

>  与String类似，`Array`也可以通过`indexOf()`来搜索一个指定的元素的位置：没有找到返回-1



```javascript
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2
```

#### slice()函数

> `slice()`就是对应String的`substring()`版本，它截取`Array`的部分元素，然后返回一个新的`Array`：
>
> 注意到`slice()`的起止参数包括开始索引，不包括结束索引。
>
> 如果不给`slice()`传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个`Array`：

```javascript
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']

var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
```

#### push()和pop()函数

> `push()`向`Array`的末尾添加若干元素，`pop()`则把`Array`的最后一个元素删除掉：

```javascript
var arr = [1, 2];
arr.push('A', 'B'); // 返回Array新的长度: 4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'
arr; // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
arr; // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
arr; // []
```

#### unshift()和shift()函数

> 如果要往`Array`的头部添加若干元素，使用`unshift()`方法，`shift()`方法则把`Array`的第一个元素删掉：

```javascript
var arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
arr; // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
arr; // []
```

#### sort()函数

> `sort()`可以对当前`Array`进行排序，它会直接修改当前`Array`的元素位置，直接调用时，按照默认顺序排序：
>
> 可自定义参数实现自定义排序

```javascript
var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']
```

#### reverse()函数

> `reverse()`把整个`Array`的元素给掉个个，也就是反转：

```javascript
var arr = ['one', 'two', 'three'];
arr.reverse(); 
arr; // ['three', 'two', 'one']
```

#### splice()函数

> `splice()`方法是修改`Array`的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：



```javascript
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
```

#### concat()函数

> `concat()`方法把当前的`Array`和另一个`Array`连接起来，并返回一个新的`Array`：

```javascript
var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
```

> 实际上，`concat()`方法可以接收任意个元素和`Array`，并且自动把`Array`拆开，然后全部添加到新的`Array`里：

```javascript
var arr = ['A', 'B', 'C'];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
```



#### join()函数



> `join()`方法是一个非常实用的方法，它把当前`Array`的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：

```javascript
var arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'
```

#### 多维数组

> 如果数组的某个元素又是一个`Array`，则可以形成多维数组

```javascript
var arr = [[1, 2, 3], [400, 500, 600], '-'];
```



### 对象

> JavaScript的对象是一组由键-值组成的无序集合
>
> JavaScript用一个`{...}`表示一个对象，键值对以`xxx: xxx`形式申明，用`,`隔开。注意，最后一个键值对不需要在末尾加`,`，如果加了，有的浏览器（如低版本的IE）将报错。
>
> JavaScript对象的键都是字符串类型，值可以是任意数据类型。`person`对象一共定义了6个键值对，其中每个键又称为对象的属性，例如，`person`的`name`属性为`'Bob'`，`zipcode`属性为`null`。
>
> 属性名若包括特殊字符，需用引号引起来。eg：middle-school



```javascript
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    'middle-school': 'No.1 Middle School',
    zipcode: null
};
```

对象访问方法：

```javascript
person.name; // 'Bob'
person.zipcode; // null
```



- 注意：属性若有`-`等特殊字符，需要用引号引起来使用，并且访问时只能使用[]来访问，不能通过.访问。否则显示xxxx is not defined
- for循环遍历对象：用 in 来遍历，变量访问的是属性，通过[]来访问值。
- 若用`.`访问的属性不存在会自动创建一个，使用deletek可以进行删除，删除后再次访问会显示undefined。
- 用 `in`来判断属性名是否是对象的属性，但是无法判断由于继承得到的属性
- 使用hasOwnProperty()函数来判断解决继承问题得到的属性

```javascript
var xiaoming =
            {
                name : "小明",
                age : 24,
                height : 9999,
                score : null,
                ps : undefined,
                str : '',
                hr : NaN,
                'n-x' : 89,
            };
        console.log(xiaoming.n-x);//报错，x is not defined
        console.log(xiaoming['n-x']);
        console.log(xiaoming['name']);

        for(var i in xiaoming) console.log(i + ':' + xiaoming[i]);

        xiaoming.zdf = '增加';
        console.log(xiaoming.zdf);
        delete xiaoming.zdf;
        console.log(xiaoming.zdf); //undefined

        console.log('name' in xiaoming); //true
        console.log('toString' in xiaoming); //true
        console.log(xiaoming.hasOwnProperty('toString')); //false
```









### 变量

> 变量名是大小写英文、数字、`$`和`_`的组合，且不能用数字开头
>
> 申明一个变量用`var`语句

```javascript
var a; // 申明了变量a，此时a的值为undefined
var $b = 1; // 申明了变量$b，同时给$b赋值，此时$b的值为1
var s_007 = '007'; // s_007是一个字符串
var Answer = true; // Answer是一个布尔值true
var t = null; // t的值是null
```

> 在JavaScript中，使用等号`=`对变量进行赋值。可以把任意数据类型赋值给变量，同一个变量可以反复赋值，
>
> JavaScript是动态语言，弱类型语言

```javascript
var a = 123; // a的值是整数123
a = 'ABC'; // a变为字符串
```

### console.log()函数

> 可以在控制台打印需要的东西

## 无、条件判断



> 和C++一模一样，不做介绍



## 六、循环



### break和continue

> 和C++一模一样，不做介绍

### for循环

#### 普通循环

#### for in 循环

> 可以遍历对象，得到对象的属性名

要过滤掉对象继承的属性，用`hasOwnProperty()`来实现：

```javascript
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) 
{
    if (o.hasOwnProperty(key)) 
    {
        console.log(key); // 'name', 'age', 'city'
    }
}
```

> 由于`Array`也是对象，而它的每个元素的索引被视为对象的属性，因此，`for ... in`循环可以直接循环出`Array`的索引：
>
> **请注意**，`for ... in`对`Array`的循环得到的是`String`而不是`Number`。

```javascript
var a = ['A', 'B', 'C'];
for (var i in a) {
    console.log(i); // '0', '1', '2'
    console.log(a[i]); // 'A', 'B', 'C'
}
```

### while循环和do while循环

> 和C++一模一样，不做介绍



## 七、Map



>  `Map`是一组键值对的结构，具有极快的查找速度。

```javascript
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95
```

### set()添加，get()查找，delete()删除，has()查询

> set是一组key,value,后三个参数都为key

```javascript
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```

set()添加时，后添加的会覆盖前面添加的。

```javascript
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```

### for of 遍历Map对象

```javascript
for(var j of m) console.log(j[0]+':'+j[1]);
```

## 八、Set



> `Set`和`Map`类似，也是一组key的集合，但不存储value。由于key**不能重复**，所以，在`Set`中，没有重复的key。

### Set创建

```javascript
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```

### 重复元素自动过滤

```javascript
var s = new Set([1, 2, 3, 3, '3']);
s; // Set {1, 2, 3, "3"}
```



### add()添加，delete()删除

> 参数都是key

```javascript
s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}

var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```

### for of 遍历Set对象

```javascript
for(var j of s) console.log(j);
```

## 九、iterable



> 遍历`Array`可以采用下标循环，遍历`Map`和`Set`就无法使用下标。为了统一集合类型，ES6标准引入了新的`iterable`类型，`Array`、`Map`和`Set`都属于`iterable`类型。
>
> 具有`iterable`类型的集合可以通过新的`for ... of`循环来遍历。
>
> for in ：遍历属性名
>
> for of：遍历值

```javascript
var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}
//for in 会将所以属性名都遍历
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
//for of 只遍历该遍历的
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
```



### 使用forEach()函数

>  它接收一个函数，每次迭代就自动回调该函数



结构：

参数可以有多个，可以只有一个。

> 参数1：对应值
>
> 参数2：对应键
>
> 参数3：对应类型

```javascript
a.forEach(function(参数1,参数2,参数3)
{
	语句块
})；

var a = [3,4,5,6,7];
var sum = 0;
// 第一种
a.forEach(function(item){sum += item;});
// 第二种
a.forEach(item => sum += item);
console.log(sum);
```

#### 遍历Array

```javascript
var a = ['A', 'B', 'C'];

//访问值和键
a.forEach(function (element, index, array)
{
    console.log(element + ', index = ' + index);
});
//只访问值
a.forEach(function (element) 
{
    console.log(element);
});
```

#### 遍历Set

```javascript
var s = new Set(['A', 'B', 'C']);
s.forEach(function (element, set) 
{
    console.log(element);
});
```

#### 遍历Map

```javascript
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
m.forEach(function (value, key, map)
{
    console.log(value);
});
```



# JavaScript教程系列一完美结束，敬请期待后续教程！