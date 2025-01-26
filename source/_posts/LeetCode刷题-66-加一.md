---
title: LeetCode刷题-66. 加一
author: Mr.Niu
toc: true
abbrlink: 48186
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/4d849c5821bd7235d4066a88c51740b7.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/4d849c5821bd7235d4066a88c51740b7.png
categories: LeetCode刷题
tags:
  - 模拟
date: 2020-07-20 21:45:14
updated:
---









> 题目链接：[66. 加一]( https://leetcode-cn.com/problems/plus-one/)



# 题解：



> 简单题！



## 题目简述：

给定一个数字序列，最后一位加一，满十进一，求加一后的序列！



## 题解：

从最后一位开始，给他加一，然后更新当前位的值为`digits[i] %= 10`

`t`更新为`digits[i] / 10`



最后若进位到最前面，需要进行插入，即在最前面插入`t`即可!

## AC代码：



```c++
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        vector<int> res;
        int t = 1;
        for(int i = digits.size() - 1; i >= 0; i--){
            digits[i] += t;
            t = digits[i] / 10;
            digits[i] %= 10;
        }
        if(t) digits.insert(digits.begin(), t);
        return digits;
    }
};


// 几乎一样：
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        vector<int> res;
        int t = 1;
        for(int i = digits.size() - 1; i >= 0; i--){
            t += digits[i];
            digits[i] = t % 10;
            t /= 10;
        }
        if(t) digits.insert(digits.begin(), t);
        return digits;
    }
};
```



