---
title: LeetCode刷题-70. 爬楼梯
author: Mr.Niu
toc: true
abbrlink: 42551
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/baf40b21e7b2ed67b8a4237118debfb4.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/baf40b21e7b2ed67b8a4237118debfb4.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-07-20 21:46:14
updated:
---













> 题目链接：[70. 爬楼梯]( https://leetcode-cn.com/problems/climbing-stairs/)



# 题解：



> 简单动态规划问题！



## 题目简述：



每次只能爬一个台阶或两个台阶，求爬到第 n 个台阶的方案数！

## 题解：



**动态规划：**

**状态表示**：`f[i]`表示爬到第 `i` 个台阶的方案数

**状态计算**：`f[i] = f[i - 1] + f[i - 2]` 

**简单解释**：爬到第 `i` 个台阶的最后一步，一定是跨了一步或跨了两步，所以到达当前台阶的方案数一定是前 `i - 1`个台阶的方案数和前 `i - 2` 个台阶的方案数之和！

**初始转态：** `f[0] = 1 f[1] = 1`

**最终结果：** `f[n]`



**优化一下，不开辟数组，降低空间复杂度，只使用三个变量即可，如下！**



**时间复杂度：** $O(n)$

**空间复杂度：** $O(1)$ 

## AC代码：



```c++
class Solution {
public:
    int cnt;
    int climbStairs(int n) {
        // vector<int> f(n + 1);
        // f[0] = 1;
        // f[1] = 1;
        // for(int i = 2; i <= n; i++){
        //     f[i] = f[i - 1] + f[i - 2];
        // }
        // return f[n];
        int a = 1, b = 1, c;
        if(n <= 1) return 1;
        for(int i = 2; i <= n; i++){
            c = a + b;
            a = b;
            b = c;
        }
        return c;
    }
};
```



