---
title: 'LeetCode刷题-50. Pow(x, n)'
author: Mr.Niu
toc: true
abbrlink: 4834
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/11b296738651c93c0ae7ad546ee201cb.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/11b296738651c93c0ae7ad546ee201cb.png
categories: LeetCode刷题
tags:
  - 快速幂
date: 2020-07-07 10:54:18
updated:
---









> 题目链接：[50. Pow(x, n)]( https://leetcode-cn.com/problems/powx-n/)



# 题解：



> 快速幂应用！



## 题目简述：

浮点数的幂运算！



## 题解：

[详见之前的这道题详解！](https://niuxvdong.top/posts/2286.html)



不同之处，可能有负数，一个数的负数次幂，等于1 除以正数次幂，判断一下即可！



**注意**：由于有负数，要求绝对值可能会越界，使用`LL`强转一下即可！



## AC代码：



```c++
class Solution {
public:
    double myPow(double x, int n) {
        typedef long long LL;
        double res = 1;
        for(LL k = abs((LL)n); k; k >>= 1){
            if(k & 1) res *= x;
            x *= x;
        }
        return n > 0 ? res : 1 / res;
    }
};
```



