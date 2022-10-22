---
title: JavaWeb之jQuery使用总结
author: ITNXD
toc: true
abbrlink: 13535
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/06/8c5b8ebc37e71dcc16b03673c4551977.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/06/8c5b8ebc37e71dcc16b03673c4551977.png
categories:
  - JavaWeb
tags:
  - jQuery
date: 2021-03-06 10:45:03
updated:
---





> 由于jQuery内容、选择器等等异常之多，只能随用随查，我找到一个不错的在线查询手册，欢迎查看！
>
> [jQuery在线查询手册](https://jQuery.cuishifeng.cn/)





# 一、jQuery概述



## 1、jQuery介绍



**什么是 jQuery ?**

jQuery，顾名思义，也就是 JavaScript 和查询（Query），它就是辅助 JavaScript 开发的 js 类库。

**jQuery 核心思想！！！**

它的核心思想是 write less,do more(写得更少,做得更多)，所以它实现了很多浏览器的兼容问题。

**jQuery 流行程度**

jQuery 现在已经成为最流行的 JavaScript 库，在世界前 10000 个访问最多的网站中，有超过 55%在使用jQuery。

**jQuery 好处！！！**

jQuery 是免费、开源的，jQuery 的语法设计可以使开发更加便捷，例如操作文档对象、选择 DOM 元素、制作动画效果、事件处理、使用 Ajax 以及其他功能





## 2、jQuery的引入





**方式一：本地引入**



```html
<script type="text/javascript" src="../script/jquery-3.6.0.js"></script>
```





**方式二：使用bootcdn**



> [BootCdn官网，点击这里！](https://www.bootcdn.cn/jquery/)
>
> [CdnJs官网，点击这里！](https://cdnjs.com/libraries/jquery)



```html
<!--BootCdn-->
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!--CdnJs-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js" integrity="sha512-n/4gHW3atM3QqRcbCn6ewmpxcLAHGaDjpEBu4xZd47N0W2oQ+6q7oc3PXstrJYXcbNU1OHdQ1T7pAP+gi5Yu8g==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous"></script>
```





## 3、jQuery核心函数$



> `$` 是 jQuery 的核心函数，能完成 jQuery 的很多功能。`$()`就是调用`$`这个函数！
>
> **注意**：`$(document).ready(function (){})`是`$(function(){})`的全写形式！



```javascript
// $()就是调用$这个函数
$();
// 1、传入参数为 [ 函数 ] 时：表示页面加载完成之后。相当于 window.onload = function(){}
$(function (){
    alert("相当于window.onload()")
});
// 2、传入参数为 [ HTML 字符串 ] 时：会对我们创建这个 html 标签对象
$(function (){
    $("<div>div标签</div>").appendTo("body");
});
// 3、传入参数为 [ 选择器字符串 ] 时：
// $(“#id 属性值”); id 选择器，根据 id 查询标签对象
// $(“标签名”); 标签名选择器，根据指定的标签名查询标签对象
// $(“.class 属性值”); 类型选择器，可以根据 class 属性查询标签对象
$(function (){
    alert($("p").length);
});
// 4、传入参数为 [ DOM 对象 ] 时：会把这个 dom 对象转换为 jQuery 对象
$(function (){
    let p = document.getElementsByTagName("p");
    alert(p) // [object HTMLCollection]
    alert($(p)); // [object Object]
});
```





## 4、jQuery对象和Dom对象区分





1. jQuery对象的本质：DOM对象数据 + 提供的一系列功能函数
2. jQuery 对象和 Dom 对象使用区别：
   1. jQuery 对象不能使用 DOM 对象的属性和方法
   2. DOM 对象也不能使用 jQuery 对象的属性和方法
3. Dom 对象和 jQuery 对象互转：
   1. DOM 对象转化为 jQuery 对象：$( DOM对象 ) 
   2. jQuery 对象转化为 DOM 对象：jQuery对象[下标]



**注意：**

- jQuery对象`alert`的结果是`[object Object]`
- DOM对象`alert`的结果是`[object HTML标签名Element]`



```javascript
// jQuery对象是对DOM对象的封装！
$(function (){
    let $btn = $("button");
    for (let i = 0; i < $btn.length; i++) {
        alert($btn[i]); // [object HTMLCollection]
    }
});

// 互相转化
$(function (){
    let p = document.getElementsByTagName("p");
    alert(p) // [object HTMLCollection]
    alert($(p)); // [object Object]
    alert($(p)[0]) // [object HTMLParagraphElement]
});
```







# 二、jQuery选择器



> 选择器太多，这里只是罗列一下常用的，具体使用还是查看在线手册，[点击这里！](https://jQuery.cuishifeng.cn/)





## 1、基本过滤器



1. `#ID` 选择器：根据 id 查找标签对象
2. `.class `选择器：根据 class 查找标签对象   
3. `element` 选择器：根据标签名查找标签对象
4. `*`选择器：表示任意的，所有的元素
5. `selector1，selector2` 组合选择器：合并选择器 1，选择器 2 的结果并返回    
6. `p.myClass`：表示标签名必须是 p 标签，而且 class 类型还要是 myClass





## 2、层级选择器

1. `ancestor descendant` 后代选择器 ：在给定的祖先元素下匹配所有的后代元素
2. `parent > child` 子元素选择器：在给定的父元素下匹配所有的子元素
3. `prev + next` 相邻元素选择器：匹配所有紧接在 prev 元素后的 next 元素
4. `prev ~ sibings` 之后的兄弟元素选择器：匹配 prev 元素之后的所有 siblings 元素





## 3、基本筛选器

1. `:first` 获取第一个元素
2. `:last` 获取最后个元素    
3. `:not(selector)` 去除所有与给定选择器匹配的元素     
4. `:even` 匹配所有索引值为偶数的元素，从 0 开始计数 
5. `:odd` 匹配所有索引值为奇数的元素，从 0 开始计数  
6. `:eq(index)` 匹配一个给定索引值的元素
7. `:gt(index)` 匹配所有大于给定索引值的元素   
8. `:lt(index)` 匹配所有小于给定索引值的元素   
9. `:header` 匹配如 h1, h2, h3 之类的标题元素 
10. `:animated` 匹配所有正在执行动画效果的元素

## 4、内容过滤器



1. `:contains(text)` 匹配包含给定文本的元素
2. `:empty` 匹配所有不包含子元素或者文本的空元素
3. `:parent` 匹配含有子元素或者文本的元素
4. `:has(selector)` 匹配含有选择器所匹配的元素的元素



## 5、可见性过滤器



1. `:hidden`
2. `:visible`



## 6、属性过滤器



1. `[attribute]` 匹配包含给定属性的元素。
2. `[attribute=value]` 匹配给定的属性是某个特定值的元素
3. `[attribute!=value]` 匹配所有不含有指定的属性，或者属性不等于特定值的元素。
4. `[attribute^=value]` 匹配给定的属性是以某些值开始的元素
5. `[attribute$=value]` 匹配给定的属性是以某些值结尾的元素
6. `[attribute*=value]` 匹配给定的属性是以包含某些值的元素
7. `[attrSel1][attrSel2][attrSelN]` 复合属性选择器，需要同时满足多个条件时使用。



## 7、表单过滤器



1. `:input` 匹配所有 input, textarea, select 和 button 元素 
2. `:text` 匹配所有 文本输入框
3. `:password` 匹配所有的密码输入框
4. `:radio` 匹配所有的单选框
5. `:checkbox` 匹配所有的复选框
6. `:submit` 匹配所有提交按钮   
7. `:image` 匹配所有 img 标签
8. `:reset` 匹配所有重置按钮 
9. `:button` 匹配所有 `input type=button <button>`按钮  
10. `:file` 匹配所有 input type=file 文件上传   
11. `:hidden` 匹配所有不可见元素 `display:none` 或 `input type=hidden`

## 8、表单对象属性过滤器



1. `:enabled` 匹配所有可用元素
2. `:disabled` 匹配所有不可用元素
3. `:checked` 的 匹配所有选中的单选，复选，和下拉列表中选中的 option  标签对象 
4. `:selected` 的 匹配所有选中的 option



## 9、元素筛选器





#### 9.1、过滤



1. `eq()` 获取给定索引的元素 功能跟 `:eq()` 一样
2. `first()` 获取第一个元素 功能跟 `:first` 一样
3. `last()` 获取最后一个元素 功能跟 `:last` 一样
4. `filter(exp)` 留下匹配的元素
5. `is(exp)` 判断是否匹配给定的选择器，只要有个匹配就返回，true
6. `has(exp)` 返回包含有匹配选择器的元素的元素 功能跟 `:has` 一样
7. `not(exp)` 删除匹配选择器的元素 功能跟 `:not` 一样
               



#### 9.2、查找



1. `children(exp)` 返回匹配给定选择器的子元素 功能跟 `parent>child` 一样
2. `next()` 返回当前元素的下一个兄弟元素 功能跟 `prev + next` 功能一样
3. `nextAll()` 返回当前元素后面所有的兄弟元素 功能跟 `prev ~ siblings` 功能一样
4. `nextUntil()` 返回当前元素到指定匹配的元素为止的后面元素
5. `parent()` 返回父元素
6. `prev(exp)` 返回当前元素的上一个兄弟元素
7. `prevAll()` 返回当前元素前面所有的兄弟元素
8. `prevUnit(exp)` 返回当前元素到指定匹配的元素为止的前面元素
9. `find(exp)` 返回匹配给定选择器的后代元素 功能跟 `ancestor descendant` 一样 
10. `siblings(exp)` 返回所有兄弟元素





#### 9.3、串联



- `add()` 把 add 匹配的选择器的元素添加到当前 jQuery 对象中







# 三、jQuery的DOM





## 1、DOM属性操作



> **注意：以下所有方法都是不传参为获取，传参为设置！**



1. `html()` 它可以设置和获取起始标签和结束标签中的内容。 跟 dom 属性 `innerHTML` 一样。  
2. `text()` 它可以设置和获取起始标签和结束标签中的文本。 跟 dom 属性 `innerText` 一样。
3. `val()` 它可以设置和获取表单项的 value 属性值。 跟 dom 属性 `value` 一样
   1. **注意：val专门处理表单项！**
4. `attr()` 可以设置和获取属性的值，**不推荐**操作 `checked、readOnly、selected、disabled` 等等。`attr` 方法还可以操作**非标准的属性**。比如自定义属性：`abc,bbj`
   1. `a.attr('name')`取出a的name值
   2. `a.attr("name","username")`把a的name值设置为username
5. `prop()` 可以设置和获取属性的值, **只推荐**操作 `checked、readOnly、selected、disabled` 等等。
   1. `a.prop('id')`  取出a的id值
   2. `a.prop('id',"bj")`  设置a的id值为bj
6. `removeAttr(name)`：移除属性
7. `removeProp(name)`：移除属性





## 2、DOM增删改





#### 2.1、内部插入

1. `appendTo(content)`：`a.appendTo(b)`， 把a加到所有b里面的最后
2. `prependTo(content)`：`a.prependTo(b)`，把a添加到所有b里面的最前



#### 2.2、外部插入



1. `insertAfter(content)`：`a.insertAfter(b)`，把a插入到所有b的后面
2. `insertBefore(content)`：`a.insertBefore(b)`，把a插入到所有b的前面



#### 2.3、替换

1. `replaceWith(content|fn)`：`a.replaceWith(b)`，用b替换所有a
2. `replaceAll(selector)`：`a.replaceAll(b)`，用a替换所有的b



#### 2.4、删除



1. `empty()`：删除匹配的元素集合中所有的子节点。
2. `remove([expr])`：从DOM中删除所有匹配的元素。这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。但除了这个元素本身得以保留之外，其他的比如绑定的事件，附加的数据等都会被移除。







# 四、jQuery的CSS样式



1. `addClass()`：添加样式
2. `removeClass()`：删除样式
3. `toggleClass()`：有则删除，无则添加样式
4. `offset()`：获取和设置元素的坐标。语法：`jQuery对象.offset({top:值，left:值})；`



# 五、jQuery的事件





## 1、文档加载



**`$(function(){})和window.onload = function(){}的区别`：** 



1. 触发时间：
   1. jQuery 的页面加载完成之后是浏览器的内核解析完页面的标签创建好 DOM 对象之后就会马上执行。
   2. 原生 JS 的页面加载完成之后，除了要等浏览器内核解析完标签创建好 DOM 对象，还要等标签显示时需要的内容加载
      完成。
2. 执行顺序：jQuery先，原生JS后
3. 执行次数：jQuery全部执行，原生JS只执行最后一个





## 2、事件绑定与移除



> 事件绑定方法：`jquery对象.事件方法(回调函数(){ 触发事件执行的代码 }).事件方法(回调函数(){ 触发事件执行的代码 })......`

1. `click()`：有参为绑定事件，无参则为触发事件
2. `mouseover()`：鼠标移入事件
3. `mouseout()`：鼠标移出事件
4. `bind()`：可以给元素一次性绑定一个或多个事件
5. `one()`：用法与bind一致，但是one方法绑定的事件只会响应一次
6. `unbind()`：与bind方法相反的操作，解除事件的绑定
7. `live()`：用来绑定事件，即使这个元素先前并未绑定，而是后面**动态创建**出来的也自动绑定



## 4、事件冒泡



**什么是事件的冒泡？**

事件的冒泡是指，父子元素同时监听同一个事件。当触发子元素的事件的时候，同一个事件也被传递到了父元素的事件里去响应。

**那么如何阻止事件冒泡呢？**

在子元素事件函数体内，`return false;` 可以阻止事件的冒泡传递。





## 5、事件对象



> 事件对象，是封装有触发的事件信息的一个 javascript 对象。



**如何获取呢 javascript 事件对象呢？**

在给元素绑定事件的时候，在事件的 `function( event )` 参数列表中添加一个参数，这个参数名，我们习惯取名为 event。这个 event 就是 javascript 传递参事件处理函数的事件对象。



```javascript
$("#areaDiv").bind("mouseover mouseout",function (event) {
    if (event.type == "mouseover") {
    	console.log("鼠标移入");
    } else if (event.type == "mouseout") {
    	console.log("鼠标移出");
    }
});
```







# 六、jQuery的动画



> 以下方法都可添加参数：
>
> - 第一个参数：动画执行的时长(速度)
> - 第二个参数：回调函数



1. `show()`：将隐藏的元素显示
2. `hide()`：将显示的元素隐藏
3. `toggle()`：显示则隐藏，隐藏则显示
4. `fadeIn()`：淡入
5. `fadeOut()`：淡出
6. `fadeToggle()`：淡入/淡出切换
7. `fadeTo(speed,opacity,[fn])`：在指定时长内将透明度修改到指定的值，第三个参数为回调函数



























