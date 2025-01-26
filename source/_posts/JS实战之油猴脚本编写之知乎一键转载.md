---
title: JS实战之油猴脚本编写之知乎一键转载
author: Mr.Niu
toc: true
abbrlink: 1495
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/0eaff35043c619dc102d61019cf0b07b.png'
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/0eaff35043c619dc102d61019cf0b07b.png'
categories: JS实战
tags:
  - 油猴脚本
  - 知乎
date: 2020-06-07 22:23:46
updated:
---



# 首先来首歌曲来放松一下吧！

{% meting "1397679310" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}





# 一、准备工作

> 根据所学JS知识以及又拍云小哥直播的讲解实战开发的一个小脚本！
>
> 所有链接：
>
> 1. [又拍云上直播地址：点击这里！](http://live.shangzhibo.tv/43CwQ4UC)
> 2. [又拍云油猴脚本开发：点击这里！](http://shangzhibo.tv/watch/10036080)
> 3. [我的油猴知乎实战脚本，点击这里！](https://greasyfork.org/zh-CN/scripts/404822-%E7%9F%A5%E4%B9%8E%E4%B8%80%E9%94%AE%E8%BD%AC%E8%BD%BD)





# 二、实现功能

1. 隐藏回答界面的右边侧栏，提升阅读舒适性！
2. 加宽回答的可视区域，让您看的更加舒服！
3. 增加一个一键转载按钮（一键复制），禁止转载的给出提示信息！



实现效果如下：



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/08/174972b9ac2b582593a8d6ad6b862d57.png)

# 三、完整代码

> [脚本地址，点击这里！](https://greasyfork.org/zh-CN/scripts/404822-%E7%9F%A5%E4%B9%8E%E4%B8%80%E9%94%AE%E8%BD%AC%E8%BD%BD)

```JavaScript
// ==UserScript==
// @name         知乎一键转载
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  模仿又拍云 demo 实现并修改的知乎一件转载，可以一键复制到剪贴板！隐藏知乎右边侧栏，加宽回答可视区域，使您阅读的更加舒服！欢迎食用！
// @author       NXD
// @match        https://www.zhihu.com/question/*
// @grant        GM_addStyle
// ==/UserScript==

// Question-sideColumn 隐藏右边栏
GM_addStyle('.Question-sideColumn {display: none !important}');
// 回答界面加宽
GM_addStyle('.Question-mainColumn {width: 1000px !important}');

(function() {
    'use strict';
    function createElement(eleName, text, attrs){
        let ele = document.createElement(eleName);
        ele.innerText = text;
        for(let k in attrs){
            ele.setAttribute(k, attrs[k]);
        }
        return ele;
    }
    // 复制到剪贴板函数
    function addToClipboard(text){
        navigator.clipboard.writeText(text).then(function() {
            // 一切都没问题的话会执行 alert 操作
            alert('succeed copy');
        }, function(err) {
            // 失败时执行的函数
            console.info('failed copy', err);
            alert('faild copy')
        });
    }
    // added 是一个全局变量, 用来保存已经添加过按钮的节点.
    let added = [];
    // 按钮样式
    let btnStyle = 'background-color: #0084ff; margin-top: 15px; margin-bottom: 15px; margin-left:-5px; cursor:pointer; color: #fff; border-radius: 3px; border: 1px solid; padding: 3px 6px';
    // 第一个回答 Card AnswerCard
    function addFirstBtn(){
        // 获得第一个回答
        let first = document.querySelector("#root > div > main > div > div.Question-main > div.ListShortcut > div > div.Card.AnswerCard");
        // 获取每个回答的头部信息位置
        let meta = first.querySelector('div[class="ContentItem-meta"]');
        // https://www.zhihu.com/question/398927155/answer/1266562835 获取到网址拿到最后的answer Id
        let who = meta.querySelector('meta[itemprop="url"]').getAttribute('content').split('/').pop();
        // 添加过的不再添加
        if(added.indexOf(who) === -1){
           // 没添加的插入数组
            added.push(who);
            // 创建按钮
            let btn = createElement('button', '转载按钮', {style: btnStyle});
            // 获取文章内容
            let text = first.querySelector('div[class="RichContent-inner"]').innerText;
            // 将文章内容复制到剪贴板
            btn.addEventListener('click', ()=>{addToClipboard(text)});
            meta.append(btn);
        }
    }
    // 更多回答：Card MoreAnswers
    function addBtn(){
        // 更多回答
        let all = document.querySelectorAll('div[class="List-item"]');
        for(let item of all){
            // 获取每个回答的头部信息位置
            let meta = item.querySelector('div[class="ContentItem-meta"]');
            // https://www.zhihu.com/question/398927155/answer/1266562835 获取到网址拿到最后的answer Id
            let who = meta.querySelector('meta[itemprop="url"]').getAttribute('content').split('/').pop();
            // 添加过的不再添加
            if(added.indexOf(who) !== -1){
                continue;
            }
            // 没添加的插入数组
            added.push(who);
            // 创建按钮
            let btn = createElement('button', '转载按钮', {style: btnStyle});
            // 获取文章内容
            let text = item.querySelector('div[class="RichContent-inner"]').innerText;
            // 将文章内容复制到剪贴板
            btn.addEventListener('click', ()=>{addToClipboard(text)});
            meta.append(btn);
        }
    }
    // 点击查看全部回答调用addBtn
    // 点击后
    window.addEventListener('load', addBtn);
    // 点击前
    // 1. 加载完调用 处理第一个回答
    window.addEventListener('load', addFirstBtn);
    // 2. 随着滚动条调用后续方法
    window.addEventListener('scroll', addBtn);
})();
```



# 四、代码实现介绍



> 模仿又拍云小哥demo实现，由于小哥原版的有一些bug，我做了简单修复，具体内容如下：
>
> 1. 修复回答界面点击查看全部回答后第一个回答无法加载按钮的bug
> 2. 修复点进回答界面第一个回答按钮无法加载需要触发滚动事件的bug
> 3. 修复来修复去，又多了一个bug，点进查看全部回答界面似乎又不进行加载脚本了，我心累了！原脚本也有这个bug。





## 1、油猴脚本头部



```
// ==UserScript==
// @name         知乎一键转载
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  模仿又拍云 demo 实现并修改的知乎一件转载，可以一键复制到剪贴板！隐藏知乎右边侧栏，加宽回答可视区域，使您阅读的更加舒服！欢迎食用！
// @author       NXD
// @match        https://www.zhihu.com/question/*
// @grant        GM_addStyle
// ==/UserScript==
```



1. name：脚本名称
2. version：版本
3. description：脚本描述
4. author：作者
5. match：匹配生效的网址
6. grant：导入[油猴官方的API](https://www.tampermonkey.net/documentation.php?ext=dhdg)
7. namespace：是命名空间，可以用你的网站名称



> 其他关键词及API请访问[油猴文档](https://www.tampermonkey.net/documentation.php?ext=dhdg)！



## 2、相关函数介绍



### 2.1 GM_addStyle



> 油猴官方实现的接口用于写更方便的写CSS！
>
> 怎么写CSS就怎么使用该方法。

```javascript
GM_addStyle('.Question-mainColumn {width: 1000px !important}');
```



### 2.2 createElement

> 创建元素函数！
>
> `createElement(eleName, text, attrs)`：元素名，元素内的文本信息，以及属性接收一个对象（即{}参数）



### 2.3 addToClipboard

> 复制到剪贴板函数！
>
> 传入text参数，为复制的文本信息。



### 2.4 addFirstBtn



> 由于不点击查看全部回答第一个回答和后续回答不一样，要格外设置一个函数去处理第一个回答！
>
> 第一个回答的 class：`Card AnswerCard`
>
> 点击查看全部回答后的 class：`Card MoreAnswers`



### 2.5 addBtn

> 同样：处理没点击查看全部回答的后续回答（除了第一个不一样的）以及点击查看全部回答的所有回答。



## 3、加载事件设置

> 1. `window.addEventListener('load', addFirstBtn)`：处理第一个不一样的回答
> 2. `window.addEventListener('load', addBtn)`：主要用于处理点击查看全部回答后的回答，加载完调用。
> 3. `window.addEventListener('scroll', addBtn)`：同时处理点击或每点击后续流式加载出现的回答，随滚动条加载。
>
> 防止出现重复添加按钮，使用`added`数组来判断：`added.indexOf(who) !== -1`
>
> - 添加按钮即push到数组
> - 没有添加则应该为 -1

```javascript
// 点击查看全部回答调用addBtn
// 点击后
window.addEventListener('load', addBtn);
// 点击前
// 1. 加载完调用 处理第一个回答
window.addEventListener('load', addFirstBtn);
// 2. 随着滚动条调用后续方法
window.addEventListener('scroll', addBtn);
```



# 五、总结



1. 一个脚本的编写需要去网页找到对应的元素class，获取到位置再进行操作
2. 需要修复好多的bug，泪目啊！
3. 需要有HTML CSS JS知识，最好有强硬的JS能力。
4. 这一次脚本编写也是极大的锻炼了我的JS实战能力，掌握了一些用法。虽然本脚本实现的功能较为简单与简陋，甚至有好多bug，但是我会在后续不断改进，完善的！



很开心的一次实战！