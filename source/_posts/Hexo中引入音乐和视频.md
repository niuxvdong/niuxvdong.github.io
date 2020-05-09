---
title: Hexo中引入音乐和视频
author: Mr.Niu
toc: true
abbrlink: 14163
img: https://cdn.jsdelivr.net/gh/niuxvdong/images/img/f%20(42).png
thumbnail: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/f (42).png'
categories:
  - Hexo
tags:
  - aplayer
  - dplayer
top: true
date: 2020-02-03 21:06:43
updated: 
---

## 1、通过网易云网站引入外链HTML代码:

<br>

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200203211028.png)

#### 如图所示，复制当中的HTML代码即可。

<p style="color:red; font-size:16px">效果如下:<p>

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=86 src="//music.163.com/outchain/player?type=2&id=1346281717&auto=1&height=66"></iframe>

## 2、通过B站来引入外链HTML代码:

<br>

![](https://cdn.jsdelivr.net/gh/niuxvdong/images/img/20200203212844.png)

#### 如图所示，复制当中的HTML代码即可。

<p style="color:red; font-size:16px">效果如下:<p>

<iframe src="//player.bilibili.com/player.html?aid=84850049&cid=145104388&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 3、通过Hexo的插件来引用音乐:

- hexo-tag-aplayer： [点击这里！](https://github.com/MoePlayer/hexo-tag-aplayer)

- hexo-tag-dplayer： [点击这里！](https://github.com/MoePlayer/hexo-tag-dplayer)

<p style="color:red; font-size:16px">通过npm来安装两个插件：<p>

```bash

$ npm install hexo-tag-aplayer --save

$ npm install hexo-tag-dplayer --save
```

### 第一种：meting后面根歌单id。

例如 :https://music.163.com/playlist?id=523845661&userid=46562117 ，这个歌

单的id就是523845661，公司名可以是tencent、netease或是其他公司。

- 最新版的 hexo-tag-aplayer 已经支持了MetingJS的使用，可以直接解析网络平台的歌曲，在站点配置文件_config.yml中将aplayer的meting属性开启。

```yaml

aplayer:
    meting: true
```

- [参考文章：点击这里！](https://www.jianshu.com/p/f1005ae09e5a)

- [有关细节及参数，点击这里！](https://blog.csdn.net/hushhw/article/details/88092728)

```javascript
{% meting "523845661" "netease" "playlist" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```

{% meting "523845661" "netease" "playlist" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto" %}

### 第二种：写上名字，歌手，链接地址即可。

- [参考文章：点击这里！](https://www.zhsh666.xyz/2019/08/19/Hexo%E5%8D%9A%E5%AE%A2%E4%B8%AD%E6%8F%92%E5%85%A5%E9%9F%B3%E4%B9%90-%E8%A7%86%E9%A2%91/)

```javascript
{% aplayer "她的睫毛" "周杰伦" "https://home.ustc.edu.cn/~mmmwhy/%d6%dc%bd%dc%c2%d7%20-%20%cb%fd%b5%c4%bd%de%c3%ab.mp3"  "http://home.ustc.edu.cn/~mmmwhy/jay.jpg" "autoplay=false" %}
```

{% aplayer "她的睫毛" "周杰伦" "https://home.ustc.edu.cn/~mmmwhy/%d6%dc%bd%dc%c2%d7%20-%20%cb%fd%b5%c4%bd%de%c3%ab.mp3"  "http://home.ustc.edu.cn/~mmmwhy/jay.jpg" %}

### 通过meting 和 aplayer 的引用，无法同时使用，都在的时候，只能加载meting!

## 4、通过Hexo的插件来引用视频:

<p style="color:red; font-size:16px">效果如下:<p>

```javascript

{% dplayer "url=http://home.ustc.edu.cn/~mmmwhy/GEM.mp4"  "pic=http://home.ustc.edu.cn/~mmmwhy/GEM.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}
```

{% dplayer "url=http://home.ustc.edu.cn/~mmmwhy/GEM.mp4"  "pic=http://home.ustc.edu.cn/~mmmwhy/GEM.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}
