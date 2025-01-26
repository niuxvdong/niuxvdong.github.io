---
title: LeetCode刷题-69. x 的平方根
author: Mr.Niu
toc: true
abbrlink: 15768
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/8e833aeee4f00c71911dce61f6891a8a.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/8e833aeee4f00c71911dce61f6891a8a.png
categories: LeetCode刷题
tags:
  - 二分
date: 2020-07-20 21:46:00
updated:
---













> 题目链接：[69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)



# 题解：



> 二分应用求平方根！一定要斟酌好使用哪个模板！



## 题目简述：



开平方，小数部分舍去求整数部分！

## 题解：



使用二分解决，一定要选对模板！

选不对模板，会有特别情况需要去处理！







## AC代码一：二分模板一



防止溢出，加一个 `1ll`
**条件**：`mid <= x / mid` （不要使用`mid * mid`会溢出）最终找到的是小于等于根号`x`的最大整数！





```c++
class Solution {
public:
    int mySqrt(int x) {
        int l = 0, r = x;
        while(l < r){
            int mid = l + r  + 1ll >> 1;
            if(mid <= x / mid) l = mid;
            else r = mid - 1;
        }
        return r;
    }
};
```



## AC代码二：二分模板二

防止溢出，加一个 `0ll`
**条件**：`mid >= x / mid` （不要使用`mid * mid`会溢出）最终找到的是大于等于根号`x`的最小整数！（根号9 找到的是 3； 根号10 找到的是4）



**使用此模板需要特判：**

- `x 为 0 或 1` 进入while会成为死循环，特判返回`x`
- 如果针对根号10的情况，即`r > x / r` 需要 `r--`





```c++
class Solution {
public:
    int mySqrt(int x) {
        if(x <= 1) return x;
        int l = 0, r = x;
        while(l < r){
            int mid = l + 0ll + r >> 1;
            if (mid >= x / mid) r = mid;
            else l = mid + 1;
        }
        if(r > x / r) r--;
        return r;
    }
};
```

