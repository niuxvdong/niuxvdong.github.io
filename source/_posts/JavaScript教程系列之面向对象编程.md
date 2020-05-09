---
title: JavaScript教程系列之面向对象编程
author: Mr.Niu
toc: true
abbrlink: 55519
date: 2020-02-17 22:17:37
updated:
img: https://cdn.jsdelivr.net/gh/niuxvdong/images/a/18.jpg
thumbnail: https://cdn.jsdelivr.net/gh/niuxvdong/images/a/18.jpg
categories:
	- JavaScript教程
tags:
	- JavaScript
	- 面向对象
---

## 首先来首歌曲来放松一下吧！

{% meting "569200213" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 有人这样说：这种高大上的东西都是造火箭才用得上的，平时干的都是拧螺丝的活当然用不上咯！
>
> 但还是得知道并掌握。。。。！
>
> class继承需要掌握，原型继承知道就好了......

## 一、面向对象编程概述



> JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。

### 1、通过`__proto__` 来指向Student，并且继承Student的所有属性！

> JavaScript它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。

```javascript
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

var xiaoming = {
    name: '小明'
};

xiaoming.__proto__ = Student;

xiaoming.name; // '小明'
xiaoming.run(); // 小明 is running...
```

### 2、指向（原型）是可以改变的！



> 在指向一个类后，可以直接修改他的指向（原型）！

```javascript
var Bird = {
    fly: function () {
        console.log(this.name + ' is flying...');
    }
};

var xiaoming = {
    name: '小明'
};

xiaoming.__proto__ = Bird;
xiaoming.fly(); // 小明 is flying...
```

<p style="color:red; font-size:20px">注意：不建议使用`__proto__`来改变指向</p>



### 3、要使用`Object.create()`方法

> 该方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有
>
> 为了方便，可以创建一个函数来接收姓名参数，在函数内部做一下赋值的过程即可！

```javascript
// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}
//直接创建是没有属性“小明”的：
let xiaoming = Object.create(Student);
//通过新建函数，传入名字，即可：
var xiaoming = createStudent('小明');
xiaoming.run(); // 小明 is running...
xiaoming.__proto__ === Student; // true
```

## 二、关于proto和prototype

> `prototype`是**函数**的一个属性（每个函数都有一个prototype属性），这个属性是一个指针，指向一个对象。它是显示修改对象的原型的属性。
>
> `__proto__`是一个**对象**拥有的内置属性（请注意：prototype是函数的内置属性，`__proto__`是对象的内置属性），是JS内部使用寻找原型链的属性。

区别参考链接：[https://www.cnblogs.com/yangjinjin/archive/2013/02/01/2889103.html](https://www.cnblogs.com/yangjinjin/archive/2013/02/01/2889103.html)

## 三、创建对象



> 为了区分普通函数和构造函数，按照约定，构造函数首字母应当大写，而普通函数首字母应当小写.
>
> 这样，一些语法检查工具如[jslint](http://www.jslint.com/)将可以帮你检测到漏写的`new`。
>
> 本节参考：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023022043494624](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022043494624)

### 1、原型链



> 当我们用`obj.xxx`访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到`Object.prototype`对象，最后，如果还没有找到，就只能返回`undefined`。



#### 数组原型链

> `Array.prototype`定义了`indexOf()`、`shift()`等方法，因此你可以在所有的`Array`对象上直接调用这些方法。

```javascript
var arr = [1, 2, 3];
arr ----> Array.prototype ----> Object.prototype ----> null
```

#### 函数原型链

> `Function.prototype`定义了`apply()`等方法，因此，所有函数都可以调用`apply()`方法。

```javascript
function foo() {
    return 0;
}
foo ----> Function.prototype ----> Object.prototype ----> null
```

### 2、构造函数



>用new来调用函数，返回一个对象！
>
>函数内部的this指向新创建的对象！并默认返回this!不需要写return了！
>
>必须写new，不写new，函数返回的是undefined！

```javascript
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}

var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
```

此时小明的原型链：

```javascript
xiaoming ----> Student.prototype ----> Object.prototype ----> null
```

### 3、constructor

> 用`new Student()`创建的对象还从原型上获得了一个`constructor`属性，它指向函数`Student`本身：

```javascript
xiaoming.constructor === Student.prototype.constructor; // true
Student.prototype.constructor === Student; // true

Object.getPrototypeOf(xiaoming) === Student.prototype; // true

xiaoming instanceof Student; // true
```

### 4、公用函数（共享方法）

> 如果我们通过`new Student()`创建了很多对象，这些对象的`hello`函数实际上只需要共享同一个函数就可以了，这样可以节省很多内存。
>
> 通过够着函数.prototype.函数名来创建公用函数，节省内存！

```javascript
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};
```



### 5、解决忘写new的方法

> 我们还可以编写一个`createStudent()`函数，在内部封装所有的`new`操作。
>
> `||` ：用或符号来实现默认值，毕竟是就近原则的！
>
> 将new封装后，即可不用写new了，以防忘写！



```javascript
function Student(props) {
    this.name = props.name || '匿名'; // 默认值为'匿名'
    this.grade = props.grade || 1; // 默认值为1
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function createStudent(props) {
    return new Student(props || {})
}
```

- 不传参都行
- 也可以这样定义

> 这样传参传的是一个对象，是不需要顺序的！

```javascript
var xiaoming = createStudent({
    name: '小明'
});

xiaoming.grade; // 1
```



## 四、原型继承



> 本节参考：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023021997355072](https://www.liaoxuefeng.com/wiki/1022910821149312/1023021997355072)



原型链：

```javascript
new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null
```

> 我们必须借助一个中间对象来实现正确的原型链，这个中间对象的原型要指向`Student.prototype`。为了实现这一点，参考道爷（就是发明JSON的那个道格拉斯）的代码，中间对象可以用一个空函数`F`来实现：
>
> F空函数起到一个桥接的作用！

```javascript
// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 创建xiaoming:
var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});
xiaoming.name; // '小明'
xiaoming.grade; // 2

// 验证原型:
xiaoming.__proto__ === PrimaryStudent.prototype; // true
xiaoming.__proto__.__proto__ === Student.prototype; // true

// 验证继承关系:
xiaoming instanceof PrimaryStudent; // true
xiaoming instanceof Student; // true
```



关于call()函数：[https://www.runoob.com/w3cnote/js-call-apply-bind.html](https://www.runoob.com/w3cnote/js-call-apply-bind.html)

**是用来重定义 this 这个对象的!**

## 五、class继承

> 在上面的章节中我们看到了JavaScript的对象模型是基于原型实现的，特点是简单，缺点是理解起来比传统的类－实例模型要困难，最大的缺点是继承的实现需要编写大量代码，并且需要正确实现原型链。
>
> 有没有更简单的写法？有！
>
> 新的关键字`class`从ES6开始正式被引入到JavaScript中。`class`的目的就是让定义类更简单。

用class来写，上面章节中的继承和对象编程就简单多了！

> constructor很明显是够着函数！
>
> 注意没有`function`关键字！

```javascript
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
var xiaoming = new Student('小明');
xiaoming.hello();
```



### class继承

> 用`class`定义对象的另一个巨大的好处是继承更方便了。想一想我们从`Student`派生一个`PrimaryStudent`需要编写的代码量。现在，原型继承的中间对象，原型对象的构造函数等等都不需要考虑了，直接通过`extends`来实现：
>
> `extends`表示原型链对象来自`Student`！
>
> 使用super()函数来调用父类的（即Student）的构造方法！
>
> class继承和原型继承没有任何区别，`class`的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。简而言之，用`class`的好处就是极大地简化了原型链代码。

```javascript
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
```





## 本章节到此结束，敬请期待后续章节！



