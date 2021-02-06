---
title: LeetCode刷题-8.字符串转换整数(atoi)
author: Mr.Niu
toc: true
abbrlink: 64625
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@17c97399b674dcb1510ec70327813fd1f8a1ecb2/2021/02/06/2e09b303e87eda57aaef64c5f127abcb.png'
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@17c97399b674dcb1510ec70327813fd1f8a1ecb2/2021/02/06/2e09b303e87eda57aaef64c5f127abcb.png'
categories: LeetCode刷题
tags:
  - 字符串
  - 模拟
date: 2020-06-14 13:39:07
updated:
---











> 题目链接：[8.字符串转换整数(atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)



# 题解：



> 细节特别多，水题！



## 题目简述：



将字符串开头是数字的抠出来！



## 题解：

大致有一下这五种情况：

1. `<空格>123`：返回123
2. `+123`：返回123
3. `-123`：返回-123
4. `+-123`或`-+123`：返回 0
5. `w123`： 返回 0



注意：如果转换后的数字大于`INT_MAX` 或小于`INT_MIN`，返回`INT_MAX` 或`INT_MIN`。

注意：`long long`也不一定能存下，所以只要超过`INT_MAX` 或`INT_MIN`就返回`INT_MAX` 或`INT_MIN`。



具体解释：查看代码中注释。

## AC代码：



```c++
class Solution {
public:
    int myAtoi(string str) {
        int i = 0, t = 1;
        long long res = 0;
        // 处理开头空格
        while(str[i] == ' ') i++; 
        // 处理++ -- +- -+
        if((str[i] == '+' || str[i] == '-') && (str[i + 1] == '+' || str[i + 1] == '-')) return 0;
        // 处理负数
        if(str[i] == '-') t = -1, i++;
        // 处理正数
        if(str[i] == '+') i++;
        for(; i < str.size(); i++){
            if(str[i] >= '0' && str[i] <= '9'){
                res = res * 10 + str[i] - '0';
                // 超过int范围
                if(res * t < INT_MIN) return INT_MIN;
                if(res * t > INT_MAX) return INT_MAX;
            }else break;
        }
        res *= t;
        return res;
    }
};
```



> 只使用 `int`处理：

`res = res * 10 + str[i] - '0';`可能会溢出，处理这里即可。

1. `res * 10 + x > INT_MAX ---> res > (INT_MAX - x) / 10`
2. `-res * 10 - x < INT_MIN ---> -res < (INT_MAX + x) / 10`
3. `-2147483648`：这个循环内算的是 2147483648，但是res为正数的int，最大为2147483647，会发生越界。判断条件：`-res * 10 - x == INT_MIN`





```c++
class Solution {
public:
    int myAtoi(string str) {
        int i = 0, t = 1;
        int res = 0;
        while(str[i] == ' ') i++; 
        if((str[i] == '+' || str[i] == '-') && (str[i + 1] == '+' || str[i + 1] == '-')) return 0;
        if(str[i] == '-') t = -1, i++;
        if(str[i] == '+') i++;
        for(; i < str.size(); i++){
            if(str[i] >= '0' && str[i] <= '9'){
                int x = str[i] - '0';
                // res * 10 + x > INT_MAX ---> res > (INT_MAX - x) / 10
                if(t == 1 &&  res > (INT_MAX - x) / 10) return INT_MAX;
                // -res * 10 - x < INT_MIN ---> -res < (INT_MAX + x) / 10
                if(t == -1 &&  -res < (INT_MIN + x) / 10) return INT_MIN;
                // -2147483648
                if(-res * 10 - x == INT_MIN) return INT_MIN;
                res = res * 10 + x;
            }else break;
        }
        res *= t;
        return res;
    }
};
```

