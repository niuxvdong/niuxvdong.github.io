---
title: LeetCode刷题-67. 二进制求和
author: Mr.Niu
toc: true
abbrlink: 15234
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/b22e598ae99cda60cdc00ccda877e44c.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/b22e598ae99cda60cdc00ccda877e44c.png
categories: LeetCode刷题
tags:
  - 高精度
date: 2020-07-20 21:45:28
updated:
---











> 题目链接：[67. 二进制求和]( https://leetcode-cn.com/problems/add-binary/)



# 题解：



> 类似于高精度加法！



## 题目简述：

两个二进制数的加法！



## 题解：

为了方便做加法，现将两个字符串倒序！

模拟加法即可！

循环终止条件：`i < a.size() || i < b.size() || t`

最终再次倒序，即为答案！

## AC代码：



```c++
class Solution {
public:
    string addBinary(string a, string b) {
        reverse(a.begin(), a.end());
        reverse(b.begin(), b.end());
        string res;
        for(int i = 0, t = 0; i < a.size() || i < b.size() || t; i++){
            if(i < a.size()) t += a[i] - '0';
            if(i < b.size()) t += b[i] - '0';
            res += t % 2 + '0';
            t /= 2;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```



