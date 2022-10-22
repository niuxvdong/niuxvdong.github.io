---
title: 每日一题之LeetCode 190.颠倒二进制位
author: ITNXD
toc: true
abbrlink: 51716
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 二进制
date: 2021-03-29 11:27:40
updated:
---





> 题目链接：[LeetCode 190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)





# 一、题解







**题目意思：**



将一个32位无符号整数进行反转！



**思路：**



1. 可以从后往前取出该无符号整数的每一位即`n >> 1 & 1`
2. 然后将结果左移空出最后一位再加上上一步的结果即可，`(res << 1) + (n >> i & 1)`



**注意：**

- 加法优先级高于位运算
- 移位运算高于与或非







**时间复杂度**：`O(1)`

**空间复杂度**：`O(1)`



# 二、AC代码





**参考代码：**



```c++
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for(int i = 0; i < 32; i ++) res = (res << 1) + (n >> i & 1);
        return res;
    }
};
```

