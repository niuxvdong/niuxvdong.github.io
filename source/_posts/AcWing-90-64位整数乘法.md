---
title: AcWing-90.64位整数乘法
author: Mr.Niu
toc: true
abbrlink: 39845
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/ACG.GY_83.jpg'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/ACG.GY_83.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 快速幂
date: 2020-02-27 14:00:36
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "86369" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[90. 64位整数乘法](https://www.acwing.com/problem/content/92/)



## 题目背景：



#### 题目描述

求 a 乘 b 对 p 取模的值。

#### 输入格式

第一行输入整数a，第二行输入整数b，第三行输入整数p。

#### 输出格式

输出一个整数，表示`a*b mod p`的值。

#### 数据范围

1≤a,b,p≤10<sup>18</sup>

#### 输入样例：

```
3
4
5
```

#### 输出样例：

```
2
```





## 题目分析：

### 题目要求：

两个十八位数相乘，然后模十八位数！

### 解题思路：



直接算肯定会超出数据类型的最大范围，所以不能直接算！

使用高精度乘法去算，显然可以，但是没必要，本题不需要最后结果，需要的是模p 的结果，所以可以借助快速幂思想：

> [参考这里：AcWing-89.a ^ b](https://itnxd.eu.org/posts/2286.html)

类似的：十八位数乘法会溢出，那么加法肯定不会溢出，所以就是要将乘法转化为加法：

> a * b
>
> a + a + a + a + a + a + a ... + a
>
> a *  1 = 1a
>
> a *  2 = 2a
>
> a *  4 = 4a
>
> a *  8 = 8a
>
> ...
>
> 和之前一样同样是倍增思想！

快速幂是一个平方，这个就是一直乘2即可！

> [yxc大神的视频讲解：点击这里！](https://www.acwing.com/video/108/)

## 题解：



注意：`unsigned long long` 的范围是C++最大的

- unsigned  int  0～4294967295  
- int  -2147483648～2147483647 
- unsigned long 0～4294967295
- long  -2147483648～2147483647
- long long的最大值：9223372036854775807（19位）
- long long的最小值：-9223372036854775808
- unsigned long long的最大值：18446744073709551615  （20位）



```c
#include <iostream>

using namespace std;

typedef unsigned long long ULL;

ULL a, b, p;
ULL res;

int main()
{
    cin >> a >> b >> p;
    while(b)
    {
        if(b&1) res = (res + a) % p;
        b >>= 1;
        a = a * 2 % p;
    }
    cout << res << endl;
    return 0;
}
```

