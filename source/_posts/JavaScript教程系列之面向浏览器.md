---
title: JavaScript教程系列之面向浏览器
author: Mr.Niu
toc: true
abbrlink: 57030
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/04.jpg'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/04.jpg'
categories: 
	- JavaScript教程
tags:
	- JavaScript
	- BOM
	- DOM
date: 2020-02-19 19:20:35
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "32619064" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



## 一、浏览器对象(BOM)



> BOM是一套操作浏览器的API（接口/方法/属性）



常见的BOM对象：

- window：代表整个浏览器窗口（window是BOM中的一个对象，并且是顶级的对象）
-  Navigator ：代表浏览器当前的信息，通过Navigator我们可以获取用户当前使用的是什么浏览器
- Location： 代表浏览器当前的地址信息，通过Location我们可以获取或者设置当前的地址信息
-  History：代表浏览器的历史信息，通过History我们可以实现上一步/刷新/下一步操作（出于
   对用户的隐私考虑，我们只能拿到当前的浏览记录，不能拿到所有的历史记录）
- Screen：代表用户的屏幕信息

### 1、window对象



> `window`对象不但充当全局作用域，而且表示浏览器窗口。
>
> 还记得之前的什么alert，console啥的没，那都是全局对象window的属性或者成员！
>
> window对象的成员加不加window都一样，不加默认就是window！

#### innerWidth 和 innerHeight

> 获取浏览器窗口的内部宽度和高度。内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高。(当然：包括滚动条)
>
> 简而言之就是网页部分的尺寸！
>
> 当然他会随网页大小而改变：

```javascript
console.log('window inner size: ' + innerWidth + ' x ' + innerHeight);
// 一样的效果：
console.log('window inner size: ' + window.innerWidth + ' x ' + window.innerHeight);
```

效果如下：

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200222195240.png)



#### outerWidth 和  outerHeight

> 获取浏览器窗口的整个宽高。
>
> 计算的是浏览器，而不是网页。
>
> 也是随浏览器大小而改变的！

```javascript
console.log('window outersize: ' + window.outerWidth+ ' x ' + window.outerHeight);
// window outersize: 1536 x 864
```



### 2、navigator对象



> `navigator`对象表示浏览器的信息，获取浏览器信息

常见属性：

- navigator.appName：浏览器名称；
- navigator.appVersion：浏览器版本；
- navigator.language：浏览器设置的语言；
- navigator.platform：操作系统类型；（不是你的电脑系统！）
- navigator.userAgent：浏览器设定的`User-Agent`字符串。

```javascript
console.log('appName = ' + navigator.appName);
console.log('appVersion = ' + navigator.appVersion);
console.log('language = ' + navigator.language);
console.log('platform = ' + navigator.platform);
console.log('userAgent = ' + navigator.userAgent);
```

效果如下：

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200222201034.png)



### 3、screen对象

> `screen`对象用来获取屏幕的信息！

常用属性：

- screen.width：屏幕宽度，以像素为单位；
- screen.height：屏幕高度，以像素为单位；
- screen.colorDepth：返回颜色位数，如8、16、24。



```javascript
console.log('Screen size = ' + screen.width + ' x ' + screen.height);
console.log('colorDepth = ' + screen.colorDepth );
// Screen size = 1536 x 864
// colorDepth = 24
```

### 4、location对象

> `location`对象表示当前页面的URL信息！

常用属性：

```javascript
http://www.example.com:8080/path/index.html?a=1&b=2#TOP

location.href;//http://www.example.com:8080/path/index.html?a=1&b=2#TOP
location.protocol; // 'http'
location.host; // 'www.example.com'
location.port; // '8080'
location.pathname; // '/path/index.html'
location.search; // '?a=1&b=2'
location.hash; // 'TOP'

window.location.href;  //获取当前地址栏的地址
window.location.href = “http://www.baidu.com”; // 设置当前地址栏的地址
```

刷新和强制刷新（Ctrl + F5）:

```javascript
window.location.reload();  //刷新
window.location.reload(true);  //强制刷新
window.location.assign('/'); // 设置一个新的URL地址
```

### 5、document对象

> `document`对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，`document`对象就是整个DOM树的根节点。
>
> 其独特之处是唯一一个既属于BOM又属于DOM的对象！



- `document.title`：改变title标签的属性

```javascript
document.title = '努力学习JavaScript!';
```

- `getElementById()`和`getElementsByTagName()`

> 通过id获取和通过标签获取！

```javascript
var menu = document.getElementById('drink-menu');
var drinks = document.getElementsByTagName('dt');
```



- document.cookie

> `document`对象还有一个`cookie`属性，可以获取当前页面的Cookie。

```javascript
document.cookie; // 'v=123; remember=true; prefer=zh'
```

### 6、history对象



> `history`对象保存了浏览器的历史记录，JavaScript可以调用`history`对象的`back()`或`forward ()`，相当于用户点击了浏览器的“后退”或“前进”按钮。
>
> 这个对象属于历史遗留对象，对于现代Web页面来说，由于大量使用AJAX和页面交互，简单粗暴地调用`history.back()`可能会让用户感到非常愤怒。
>
> 新手开始设计Web页面时喜欢在登录页登录成功时调用`history.back()`，试图回到登录前的页面。这是一种错误的方法。
>
> 任何情况，你都不应该使用`history`这个对象了。

```javascript
window.history.forword(); //上一步
 window.history.back();  //下一步
 window.history.go(0);  //接收参数 0   表示刷新当前页面
 window.history.go(2); //接收正整数  表示前进2个页面
 window.history.go(-2); //接收负整数  表示后退2个页面
```



## 二、操作DOM



> DOM是一套操作标签的API（接口/方法/属性）
>
> 由于HTML文档被浏览器解析后就是一棵DOM树，要改变HTML的结构，就需要通过JavaScript来操作DOM。
>
> 始终记住DOM是一个树形结构。



DOM的基本操作：

- 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；
- 遍历：遍历该DOM节点下的子节点，以便进行进一步操作；
- 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；
- 删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。



### 1、获取DOM节点



- `document.getElementById()`：通过id获取
- `document.getElementsByTagName()`：通过标签获取
- `document.getElementsByClassName()`：通过class获取

注意：通过id获取是唯一的，通过标签和class获取的是一组DOM节点



#### 1.1 可以通过先定位父节点再来定位子节点来进行唯一确定！

```javascript
// 返回ID为'test'的节点：
var test = document.getElementById('test');

// 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
var trs = document.getElementById('test-table').getElementsByTagName('tr');

// 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
var reds = document.getElementById('test-div').getElementsByClassName('red');

// 获取节点test下的所有直属子节点:
var cs = test.children;

// 获取节点test下第一个、最后一个子节点：
var first = test.firstElementChild;
var last = test.lastElementChild;
```

#### 1.2 通过 `querySelector()` 和 `querySelectorAll()` 获取



```javascript
// 通过querySelector获取ID为q1的节点：
var q1 = document.querySelector('#q1');

// 通过querySelectorAll获取q1节点内的符合条件的所有节点：
var ps = q1.querySelectorAll('div.highlighted > p');
```

#### 1.3 一道简单测试题：

题目背景：

```html
<!-- HTML结构 -->
<div id="test-div">
	<div class="c-red">
    	<p id="test-p">JavaScript</p>
    	<p>Java</p>
  	</div>
  	<div class="c-red c-green">
    	<p>Python</p>
    	<p>Ruby</p>
    	<p>Swift</p>
  	</div>
  	<div class="c-green">
    	<p>Scheme</p>
    	<p>Haskell</p>
  	</div>
</div>
```

选择指定项：



```javascript
// 1、选择<p>JavaScript</p>:
var js = document.getElementById('test-p');

// 2、选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>:
// 2.1 分开写：
var arr = document.querySelector('div[class = "c-red c-green"]').querySelectorAll('p');
// 2.2 合并写：
var arr = document.querySelectorAll('div[class = "c-red c-green"] > p');
// 2.3 另一种写法：
var arr = document.querySelectorAll('.c-red.c-green p');
// 2.4 另一种：
var arr = document.getElementsByClassName('c-red')[1].children;

// 3、选择<p>Haskell</p>:
// 3.1 用数组序号获取元素：
var haskell = document.querySelectorAll('div[class = "c-green"] > p')[1];
// 3.2 另一种写法：
var haskell = document.querySelector('.c-green:not(.c-red)').lastElementChild;

// 测试:
if (!js || js.innerText !== 'JavaScript') {
    alert('选择JavaScript失败!');
} else if (!arr || arr.length !== 3 || !arr[0] || !arr[1] || !arr[2] || arr[0].innerText !== 'Python' || arr[1].innerText !== 'Ruby' || arr[2].innerText !== 'Swift') {
    console.log('选择Python,Ruby,Swift失败!');
} else if (!haskell || haskell.innerText !== 'Haskell') {
    console.log('选择Haskell失败!');
} else {
    console.log('测试通过!');
}
```

### 2、更新DOM节点



> 用来直接修改节点的文本！



#### 2.1 innerHTML属性

> 可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树：
>
> 通过innerHTML属性，原内容已经被覆盖！
>
> 1、可以传入普通内容
>
> 2、也可以传入标签，标签会直接被解析为HTML内容！



```javascript
<p id="my-p">...</p>

<script>
    // 获取<p id="p-id">...</p>
    let p1 = document.getElementById('my-p');
    // 设置文本为abc:
    p1.innerHTML = 'cde'; // <p id="p-id">ABC</p>
    // 设置HTML:
    p1.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
    // <p>...</p>的内部结构已修改
</script>
```

#### 2.2 innerText属性

> 属性中无法传入html标签，若传入，则会直接被解析为文本显示！不是解析为HTML标签！

```javascript
<p id="my-p">...</p>

<script>
    // 获取<p id="p-id">...</p>
    var p = document.getElementById('my-p');
    // 设置文本:
    p.innerText = '<span>hhhhh</span>';
</script>

```

特殊点：

无法正常显示script标签：

```javascript
<p id="p-id">hello</p>

<script>
    var p = document.getElementById('p-id');
    // 设置文本:此句无法正常显示
    p.innerText = '<script>alert("Hi")</script>';
    // HTML被自动编码，无法设置一个<script>节点:
</script>
// 正常显示方法：
<p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p>
```

#### 2.3 textContent属性



> 两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本
>
> 作用和 innerText 一样！



```javascript
<p id="my-p">...</p>

<script>
    // 获取<p id="p-id">...</p>
    var p = document.getElementById('my-p');
    // 设置文本:
    p.textContent = '<span>hhhhh</span>';

</script>
```



#### 2.4 style属性



> DOM节点的`style`属性对应所有的CSS，可以直接获取或设置。因为CSS允许`font-size`这样的名称，但它并非JavaScript有效的属性名，所以需要在JavaScript中改写为驼峰式命名`fontSize`：
>
> CSS 的属性带有`-` 的都变为驼峰命名法！

```javascript
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px';
p.style.paddingTop = '2em';
```

### 3、插入DOM节点



- 如果这个DOM节点是空的，例如，`<div></div>`，那么，直接使用`innerHTML = 'child'`就可以修改DOM节点的内容，相当于“插入”了新的DOM节点。

- 如果这个DOM节点不是空的，那就不能这么做，因为`innerHTML`会直接替换掉原来的所有子节点。

#### 方法一：使用 `appendChild`

> 把一个子节点添加到父节点的最后一个子节点
>
> 首先会从原先的位置删除，再插入到新的位置。

```javascript
<!-- HTML结构 -->
<p id="js">JavaScript</p>
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
// JavaScript代码
var
    js = document.getElementById('js'),
    list = document.getElementById('list');
list.appendChild(js);
```

最终结果：

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
    <p id="js">JavaScript</p>
</div>
```



一个例子：打开谷歌控制台，将下面代码复制到任意个网页，观看网页CSS变化！

```javascript
var d = document.createElement('style');
d.setAttribute('type', 'text/css');
d.innerHTML = 'p { color: red }';
document.getElementsByTagName('head')[0].appendChild(d);
```

如下，会发现多了一行CSS，而网页只要是p标签都会被修改颜色！

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200223190055.png)



#### 方法二：使用 `insertBefore`

> 可将子节点插入到指定位置！
>
> 可以使用`parentElement.insertBefore(newElement, referenceElement);`，子节点会插入到`referenceElement`之前。



```javascript
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>

var
    list = document.getElementById('list'),
    ref = document.getElementById('python'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
// 将新建的p标签（haskell）插入到ref的前面
list.insertBefore(haskell, ref);
```

效果如下：

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="haskell">Haskell</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```



#### 使用 `children` 属性来遍历

> 遍历一个父节点的所有子节点！

```javascript
var
    i, c,
    list = document.getElementById('list');
for (i = 0; i < list.children.length; i++) {
    c = list.children[i]; // 拿到第i个子节点
}
```

### 4、删除DOM



> 要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的`removeChild`把自己删掉：
>
> 注意到删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。

```javascript
// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
removed === self; // true
```

> 当你遍历一个父节点的子节点并进行删除操作时，要注意，`children`属性是一个只读属性，并且它在子节点变化时会实时更新。

```javascript
<div id="parent">
    <p>First</p>
    <p>Second</p>
</div>

var parent = document.getElementById('parent');
parent.removeChild(parent.children[0]);
parent.removeChild(parent.children[1]); // <-- 浏览器报错
```





## 三、操作表单

  

表单类型主要有以下几种：

- 文本框，对应的`<input type="text">`，用于输入文本；
- 口令框，对应的`<input type="password">`，用于输入口令；
- 单选框，对应的`<input type="radio">`，用于选择一项；
- 复选框，对应的`<input type="checkbox">`，用于选择多项；
- 下拉框，对应的`<input type="select">`，用于选择一项；
- 隐藏文本，对应的`<input type="hidden">`，用户不可见，但表单提交时会把隐藏文本发送到服务器。



### 1、获取值



> 如果我们获得了一个`<input>`节点的引用，就可以直接调用`value`获得对应的用户输入值：



```javascript
// <input type="text" id="email">
var input = document.getElementById('email');
input.value; // '用户输入的值'
```

> 这种方式可以应用于`text`、`password`、`hidden`以及`select`。
>
> 但是，对于单选框和复选框，`value`属性返回的永远是HTML预设的值，而我们需要获得的实际是用户是否“勾上了”选项，所以应该用`checked`判断：



```javascript
// <label><input type="radio" name="weekday" id="monday" value="1"> Monday</label>
// <label><input type="radio" name="weekday" id="tuesday" value="2"> Tuesday</label>
var mon = document.getElementById('monday');
var tue = document.getElementById('tuesday');
mon.value; // '1'
tue.value; // '2'
mon.checked; // true或者false
tue.checked; // true或者false
```



### 2、设置值



> 设置值和获取值类似，对于`text`、`password`、`hidden`以及`select`，直接设置`value`就可以：



```javascript
// <input type="text" id="email">
var input = document.getElementById('email');
input.value = 'test@example.com'; // 文本框的内容已更新
```



> 对于单选框和复选框，设置`checked`为`true`或`false`即可。

```javascript
// <label><input type="radio" name="weekday" id="monday" value="1"> Monday</label>
// <label><input type="radio" name="weekday" id="tuesday" value="2"> Tuesday</label>
var mon = document.getElementById('monday');
var tue = document.getElementById('tuesday');
mon.checked = true; // true或者false
tue.checked = false; // true或者false
```



### 3、HTML5控件



> HTML5新增了大量标准控件，常用的包括`date`、`datetime`、`datetime-local`、`color`等，它们都使用``标签：

具体效果自己试一下！

```javascript
<input type="date" value="2015-07-01">
<input type="datetime-local" value="2015-07-01T02:03:04">
<input type="color" value="#ff0000">
```



### 3、提交表单



> JavaScript可以以两种方式来处理表单的提交（AJAX方式在后面章节介绍）。



#### 通过绑定`submit()`方法实现：

> 这种方式的缺点是扰乱了浏览器对form的正常提交。浏览器默认点击``时提交表单，或者用户在最后一个输入框按回车键！

```javascript
<!-- HTML -->
<form id="test-form">
    <input type="text" name="test">
    <button type="button" onclick="doSubmitForm()">Submit</button>
</form>

<script>
function doSubmitForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 提交form:
    form.submit();
}
</script>
```







#### 通过`form`本身的`onsubmit`事件

> 注意要`return true`来告诉浏览器继续提交，如果`return false`，浏览器将不会继续提交form，这种情况通常对应用户输入有误，提示用户错误信息后终止提交form。
>
> 在检查和修改``时，要充分利用``来传递数据。

```javascript
<!-- HTML -->
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" name="test">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 继续下一步:
    return true;
}
</script>
```



#### 关于MD5

> 安全考虑，提交表单时不传输明文口令，而是口令的MD5
>
> 这个做法看上去没啥问题，但用户输入了口令提交时，口令框的显示会突然从几个`*`变成32个`*`（因为MD5有32个字符）。

```javascript
<!-- HTML -->
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="password" name="password">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var pwd = document.getElementById('password');
    // 把用户输入的明文变为MD5:
    pwd.value = toMD5(pwd.value);
    // 继续下一步:
    return true;
}
</script>
```

#### 利用`<input type="hidden">`实现：

> 可以实现不改变用户的输入！
>
> 注意到`id`为`md5-password`的``标记了`name="password"`，而用户输入的`id`为`input-password`的``没有`name`属性。没有`name`属性的``的数据不会被提交。

```javascript
<!-- HTML -->
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="input-password">
    <input type="hidden" id="md5-password" name="password">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var input_pwd = document.getElementById('input-password');
    var md5_pwd = document.getElementById('md5-password');
    // 把用户输入的明文变为MD5:
    md5_pwd.value = toMD5(input_pwd.value);
    // 继续下一步:
    return true;
}
</script>
```

#### 4、一个例子

利用JavaScript检查用户注册信息是否正确，在以下情况不满足时报错并阻止提交表单：

- 用户名必须是3-10位英文字母或数字；
- 口令必须是6-20位；
- 两次输入口令必须一致。

```html
<!-- HTML结构 -->
<form id="test-register" action="#" target="_blank" onsubmit="return checkRegisterForm()">
    <p id="test-error" style="color:red"></p>
    <p>
        用户名: <input type="text" id="username" name="username">
    </p>
    <p>
        口令: <input type="password" id="password" name="password">
    </p>
    <p>
        重复口令: <input type="password" id="password-2">
    </p>
    <p>
        <button type="submit">提交</button> <button type="reset">重置</button>
    </p>
</form>
```



```javascript
<script>
    var checkRegisterForm = function () {
        let
            re1 = /^\w{3,10}$/;
            re2 = /^.{6,20}$/;
            user = document.getElementById('username');
            pwd = document.getElementById('password');
            pwd2 = document.getElementById('password-2');

        if ( re1.test(user.value) && re2.test(pwd.value) && pwd.value === pwd2.value ) {
            return true;
        } else {
            return false;
        }
        return false;
    }

        // 测试:
    ;(function () {
        window.testFormHandler = checkRegisterForm;
        var form = document.getElementById('test-register');
        if (form.dispatchEvent) {
            var event = new Event('submit', {
                bubbles: true,
                cancelable: true
            });
            form.dispatchEvent(event);
        } else {
            form.fireEvent('onsubmit');
        }
    })();

</script>
```

## 四、操作文件



> 在HTML表单中，可以上传文件的唯一控件就是`<input type="file">`。
>
> *注意*：当一个表单包含`<input type="file">`时，表单的`enctype`必须指定为`multipart/form-data`，`method`必须指定为`post`，浏览器才能正确编码并以`multipart/form-data`格式发送表单的数据。
>
> 出于安全考虑，浏览器只允许用户点击`<input type="file">`来选择本地文件，用JavaScript对`<input type="file">`的`value`赋值是没有任何效果的。当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径：
>
> 通常，上传的文件都由后台服务器处理，JavaScript可以在提交表单时对文件扩展名做检查，以便防止用户上传无效格式的文件：
>
> 参考教程：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023022494381696#0](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022494381696#0)
>
> 补充教程：[https://www.w3school.com.cn/jsref/event_onchange.asp](https://www.w3school.com.cn/jsref/event_onchange.asp)
>
> 目前一脸懵逼，以后再细看把！



```java
var f = document.getElementById('test-file-upload');
var filename = f.value; // 'C:\fakepath\test.png'
if (!filename || !(filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
    alert('Can only upload image file.');
    return false;
}
```

### File API

> 由于JavaScript对用户上传的文件操作非常有限，尤其是无法读取文件内容，使得很多需要操作文件的网页不得不用Flash这样的第三方插件来实现。
>
> 随着HTML5的普及，新增的File API允许JavaScript读取文件内容，获得更多的文件信息。
>
> HTML5的File API提供了`File`和`FileReader`两个主要对象，可以获得文件信息并读取文件。
>
> 下面的例子演示了如何读取用户选取的图片文件，并在一个``中预览图像：



可以自己编一下看看效果：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>文件api</title>
    <style>
        #test-image-preview {
            width:500px;
            height:500px;
            border:1px solid #ff0000;
        }

    </style>

</head>
<body>

<form>
    <div id="test-file-info"></div>
    <div id="test-image-preview"></div>
    <input id="test-image-file" type="file">
</form>

<script >
    window.onload=function(){
        var fileInput = document.getElementById('test-image-file');
        var info = document.getElementById('test-file-info');
        var preview = document.getElementById('test-image-preview');


        fileInput.addEventListener('change',function(){
            console.log('change...');
            preview.style.backgroundImage='';
            if (!fileInput.value){
                info.innerHTML = '没有选择文件';
                return ;
            }
            var file = fileInput.files[0];
            info.innerHTML = '文件:' + file.name + '<br>'+'大小:'+file.size+'<br>'+'修改:'+file.lastModifiedDate;
            if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif'){
                alert('不是有效的图片文件!');
                return;
            }

            var reader = new FileReader();
            reader.onload=function(e){
                console.log('reader.onload');
                var data = e.target.result;// 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'  
                preview.style.backgroundImage='url('+ data +')';
            };
            reader.readAsDataURL(file);
        });
    };
</script>

</body>
</html>
```




> 上面的代码演示了如何通过HTML5的File API读取文件内容。以DataURL的形式读取到的文件是一个字符串，类似于`data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...`，常用于设置图像。如果需要服务器端处理，把字符串`base64,`后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容。



## 五、AJAX



### 1、AJAX 的起源



> ------
>
> AJAX不是JavaScript的规范，它只是一个哥们“发明”的缩写：Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求。
>
> 如果仔细观察一个Form的提交，你就会发现，一旦用户点击“Submit”按钮，表单开始提交，浏览器就会刷新页面，然后在新页面里告诉你操作是成功了还是失败了。如果不幸由于网络太慢或者其他原因，就会得到一个404页面。
>
> 这就是Web的运作原理：一次HTTP请求对应一个页面。
>
> 如果要让用户留在当前页面中，同时发出新的HTTP请求，就必须用JavaScript发送这个新请求，接收到数据后，再用JavaScript更新页面，这样一来，用户就感觉自己仍然停留在当前页面，但是数据却可以不断地更新。
>
> 最早大规模使用AJAX的就是Gmail，Gmail的页面在首次加载后，剩下的所有数据都依赖于AJAX来更新。
>
> 用JavaScript写一个完整的AJAX代码并不复杂，但是需要注意：AJAX请求是异步执行的，也就是说，要通过回调函数获得响应。





### 2、编写AJAX



> 通过检测`window`对象是否有`XMLHttpRequest`属性来确定浏览器是否支持标准的`XMLHttpRequest`。注意，*不要*根据浏览器的`navigator.userAgent`来检测浏览器是否支持某个JavaScript特性，一是因为这个字符串本身可以伪造，二是通过IE版本判断JavaScript特性将非常复杂。
>
> 当创建了`XMLHttpRequest`对象后，要先设置`onreadystatechange`的回调函数。在回调函数中，通常我们只需通过`readyState === 4`判断请求是否完成，如果已完成，再根据`status === 200`判断是否是一个成功的响应。
>
> `XMLHttpRequest`对象的`open()`方法有3个参数，第一个参数指定是`GET`还是`POST`，第二个参数指定URL地址，第三个参数指定是否使用异步，默认是`true`，所以不用写。
>
> *注意*，千万不要把第三个参数指定为`false`，否则浏览器将停止响应，直到AJAX请求完成。如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。
>
> 最后调用`send()`方法才真正发送请求。`GET`请求不需要参数，`POST`请求需要把body部分以字符串或者`FormData`对象传进去。
>
> 参考教程：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023022332902400](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022332902400)



在现代浏览器上写AJAX主要依靠`XMLHttpRequest`对象：

```javascript
function success(text) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = 'Error code: ' + code;
}

var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...');

```

对于低版本的IE，需要换一个`ActiveXObject`对象：

```javascript
function success(text) {
    var textarea = document.getElementById('test-ie-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-ie-response-text');
    textarea.value = 'Error code: ' + code;
}

var request = new ActiveXObject('Microsoft.XMLHTTP'); // 新建Microsoft.XMLHTTP对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...');

```

### 3、安全限制



> 有点看不懂了！
>
> 参考教程：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023022332902400#0](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022332902400#0)

### 4、CORS

> 有点看不懂了！
>
> 参考教程：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023022332902400#0](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022332902400#0)



## 六、Promise



> 有点看不懂了！
>
> 参考教程：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544)

## 七、Canvas

以后再看吧！

参考教程：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023022423592576](https://www.liaoxuefeng.com/wiki/1022910821149312/1023022423592576)





## 目前告一段落了！以后有机会再进行 JavaScript 的学习！

