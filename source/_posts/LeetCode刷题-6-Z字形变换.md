---
title: LeetCode刷题-6.Z字形变换
author: Mr.Niu
toc: true
abbrlink: 60082
categories: LeetCode刷题
tags:
  - 模拟
  - 找规律
date: 2020-06-14 10:44:43
updated:
top_img: https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png
cover: https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png
---









> 题目链接：[6.Z字形变换](https://leetcode-cn.com/problems/zigzag-conversion/)



# 题解：



> 完全就是找规律，找到每行下标的规律即可，为一个等差数列！



## 题目简述：



将字符串按倒Z型排列，然后按行读取完整字符，输出对应字符串！

## 题解：



以一个容易发现规律的例子来解释：



以四行为例：



```
0     6       12
1   5 7    11 13    ..
2 4   8 10    14 16
3     9       15
```



1. 第一行和最后一行公差相同，为 `2 * n - 2`，即从0 - 6 中间隔了1-3 和 4 - 6 即两个 `n - 1`.
2. 中间其他行，看做两个等差序列的混合，分别去处理，竖线上的同样是以`2 * n - 2`为公差的等差数列，不在竖线上的是以`2 * n - 2 - i`为首项，以`2 * n - 2`为公差的等差数列！



`2 * n - 2 - i`：会发现 1 + 5 = 6  2 + 4 = 6，即 `i + x = 2 * n - 2`，`x = 2 * n - 2 - i`



**注意：** n = 1时，`2 * n - 2`为零，循环为死循环，所以进行特判，返回原串 `s`。

## AC代码：



```c++
class Solution {
public:
    string convert(string s, int n) {
        string str;
        if(n == 1) return s;
        for(int i = 0; i < n; i++){
            if(i == 0 || i == n - 1){
                for(int j = i; j < s.size(); j += 2 * n - 2){
                    str += s[j];
                }
            }else{
                for(int j = i, k = 2 * n - 2 - i; j < s.size() || k < s.size(); j += 2 * n - 2, k += 2 * n - 2){
                    if(j < s.size()) str += s[j];
                    if(k < s.size()) str += s[k];
                }
            }
        }
        return str;
    }
};
```



