---
title: LeetCode刷题-7.整数反转
author: Mr.Niu
toc: true
abbrlink: 58547
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@4ccc80d355832b3686898ac37e5cd99199161851/2021/02/06/106227485d1c1adad38e8b3f36245c1a.png'
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@4ccc80d355832b3686898ac37e5cd99199161851/2021/02/06/106227485d1c1adad38e8b3f36245c1a.png'
categories: LeetCode刷题
tags:
  - 反转
date: 2020-06-14 12:24:06
updated:
---











> 题目链接：[7.整数反转](https://leetcode-cn.com/problems/reverse-integer/)



# 题解：



> 水题一个！



## 题目简述：



正负数都倒序输出即可，负数处理完还是负数。



## 题解：



正负数的原因，应该分开处理，但是`C++`取余不区分正负，和数学不一样，会区分正负。



题目有 `2 ^ 31`的限制，即 int的最大最小值，使用`INT_MAX 和 INTMIN`即可，头文件位于`climits`中。`res`定义为`long long`防止溢出。



注意：不要使用 `2 << 31`，会溢出的，结果为 0。 



## AC代码：



```c++
class Solution {
public:
    int reverse(int x) {
        long long res = 0;
        while(x){
            res = res * 10 + x % 10;
            x /= 10;
        }
        if(res > INT_MAX || res < INT_MIN) return 0;
        return res;
    }
};
```



