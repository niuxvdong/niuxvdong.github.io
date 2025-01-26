---
title: LeetCode刷题-43.字符串相乘
author: Mr.Niu
toc: true
abbrlink: 1953
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/06/226c79ee980a2d2332b5979fbd32b216.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/06/226c79ee980a2d2332b5979fbd32b216.png
categories: LeetCode刷题
tags:
  - 高精度
date: 2020-07-06 20:41:23
updated:
---















> 题目链接：[43.字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)



# 题解：



> 高精度乘以高精度！



## 题目简述：

两个字符串高精度相乘返回结果的字符串！

## 题解：



**模拟小学乘法即可！**

**两个数相乘，最后积的位数为两数长度之和或者为长度之和减 1 ！**

**思路：** 

1. 先将字符串映射成数字，再倒序存到数组，为了方便计算！
2. 两层循环，让第二个数的每一位去乘第一个数，存到新数组`c[i + j]`，这样可以保证该放到同一列的都在同一列
3. 然后将需要进位的给了下一位，即`c[i + j + 1] += c[i + j] / 10`
4. 再将本位的余数留下即可，即`c[i + j] %= 10`
5. 最后需要将末尾的零去掉，即反转为正常数字的前导0.（例如乘以0，或者位数为两数之和减 1）
6. 在将其映射为字符串，倒序存储到新数组，返回！



**算了，懒得画图了，太好理解了！**



**时间复杂度：** `O(n * m)`

## AC代码：



```c++
class Solution {
public:
    string multiply(string num1, string num2) {
        int n = num1.size(), m = num2.size();
        vector<int> a(n), b(m), c(n + m);
        for(int i = 0; i < n; i++) a[n - i - 1] = num1[i] - '0';
        for(int i = 0; i < m; i++) b[m - i - 1] = num2[i] - '0';
        for(int i = 0; i < n; i++){
            for(int j = 0; j < m; j++){
                c[i + j] += a[i] * b[j];
                c[i + j + 1] += c[i + j] / 10;
                c[i + j] %= 10;
            }
        }
        int len = n + m;
        while(len > 1 && c[len - 1] == 0) len--;
        string res = "";
        for(int i = len - 1; i >= 0; i--) res += c[i] + '0';
        return res;
    }
};
```



