---
title: AcWing-122.糖果传递
author: Mr.Niu
toc: true
abbrlink: 58067
cover: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/d%20(2).jpg'
top_img: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/31.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 贪心
  - 前缀和
  - 中位数
date: 2020-03-05 18:37:38
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "30431366" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[122. 糖果传递](https://www.acwing.com/problem/content/124/)



## 题目背景：



> 又是一道环形的均分纸牌问题，这也是这类题的一个基础的经典的例题了！
>
> 我先做的 [七夕祭](https://www.itnxd.cn/posts/47007.html) 这道题，一个二维的环形均分纸牌问题，比这个复杂一点。。

#### 题目描述

有n个小朋友坐成一圈，每人有a[i]个糖果。

每人只能给左右两人传递糖果。

每人每次传递一个糖果代价为1。

求使所有人获得均等糖果的最小代价。

#### 输入格式

第一行输入一个正整数n，表示小朋友的个数。

接下来n行，每行一个整数a[i]，表示第i个小朋友初始得到的糖果的颗数。

#### 输出格式

输出一个整数，表示最小代价。

#### 数据范围

1≤n≤1000000
数据保证一定有解。

#### 输入样例：

```
4
1
2
5
4
```

#### 输出样例：

```
4
```



---



## 题目分析：

### 题目要求：



n个人围成一圈，没人有一些糖果，问最少交换多少次会达到均等时的最小步数！

传递一个糖果代价为1！

### 解题思路：



同样是环形均分纸牌问题，里面的公式推导就不再推了，请看我的上一篇题解：

> [AcWing-105.七夕祭](https://www.itnxd.cn/posts/47007.html) 



接下来总结一下环形纸牌问题：

- 第一步：将原值减去平均值
- 第二步：求当前的前缀和
- 第三步：将前缀和排序
- 此时转化为了货仓问题
- 第四部：求中位数
- 第五步：求 `abs(b[i] - mid)` 的和



## 题解：



小技巧：求前缀和时，输入从下标为1开始，方便后序求前缀和等等！



```c
#include <iostream>
#include <algorithm>

using namespace std;
typedef long long LL;

const int N = 1e6 + 10;
LL a[N], b[N];

int main()
{
    int n;
    cin >> n;
    for(int i = 1; i <= n; i++) cin >> a[i], a[0] += a[i];
    for(int i = 1; i <= n; i++) b[i] = b[i - 1] + a[i] - a[0]/n;
    
    sort(b + 1, b + 1 + n);
    
    LL sum = 0, mid = b[n + 1 >> 1];
    for(int i = 1; i <= n; i++) sum += abs(b[i] - mid);
    cout << sum << endl;
    return 0;
}
```

