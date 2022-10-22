---
title: LeetCode刷题-29.两数相除
author: Mr.Niu
toc: true
abbrlink: 6904
top_img: 'https://gitcode.net/qq_43590403/images/-/raw/master/a/5.jpg'
cover: 'https://gitcode.net/qq_43590403/images/-/raw/master/a/5.jpg'
categories: LeetCode刷题
tags:
  - 倍增
date: 2020-06-22 16:36:25
updated:
---















> 题目链接：[29.两数相除](https://leetcode-cn.com/problems/divide-two-integers/)



# 题解：



> 嗯，倍增思想的应用！



## 题目简述：

给定两个`int`范围的数相除，要求不使用乘除法和取余计算得到结果！

## 题解一：暴力



不能使用乘除就使用减法，一直减去除数直到减到负数即可！



当然这样会超时，例如输入：`2147483647 和 1` ，此时的数量级是10的9次方的，妥妥超时！



超出`int`范围，统一返回`INT_MAX`



**正确做法：请看题解二，使用倍增思想！**



## TLE代码：



```c++
class Solution {
public:
    int divide(int dividend, int divisor) {
        long long res = 0, k = 1;
        if((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) k = -1;
        long long dividend1 = abs(dividend), divisor1 = abs(divisor);
        while(dividend1 - divisor1 >= 0){
            res ++;
            dividend1 -= divisor1;
        }
        return k == 1 ? (res > INT_MAX ? INT_MAX : res) : (-res < INT_MIN ? INT_MAX : -res);
    }
};
```









## 题解二：倍增



一个一个减岂不是有点笨？

那么我们就每次尽可能多的去减！



`a / b = k`



先预处理出来，`1 * b 2 * b 4 * b 8 * b...... k * b`



然后倒着去减，从大到小减，直到剩下的不够减的大小，即终止！

第一次减去  `k * b`，若足够大，继续向后去减！



由于我们的答案求得是`k`的和，而不是`k * b`的和，所以我们要将每次减去的`k`累积起来！



k 的取值：`1 2 4 8 16..... ` 即 `2^0 2^1 2^2 2^3 2^4 ......2^k`



所以每次给`res`累积`1ll << i;`即可！



**注意：**

- `1ll`：防止越界，转化为`ll`类型。例如`i = 31`就会发生越界
- 开始时将其全部转化为正数进行计算，最后再转换回来
- 使用`abs()`也要使用LL强转，防止越界
- 如果`res`最后越界，统一返回`INT_MAX`

## AC代码：



```c++
class Solution {
public:
    int divide(int x, int y) {
        typedef long long LL;
        LL res = 0, k = 1;
        if(x < 0 && y > 0 || x > 0 && y < 0) k = -1;
        LL a = abs((LL)x), b = abs((LL)y);
        vector<LL> p;
        for(LL i = b; i <= a; i += i) p.push_back(i), cout << i << endl;

        for(int i = p.size() - 1; i >= 0; i--){
            if(p[i] <= a){
                res += 1ll << i;
                a -= p[i];
            }
        }

        if(k == -1) res = -res;
        if(res < INT_MIN || res > INT_MAX) res = INT_MAX;
        return res;
    }
};
```

