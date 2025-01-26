---
title: 每日一题之LeetCode 1006.笨阶乘
author: ITNXD
toc: true
abbrlink: 337
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 栈
  - 找规律
date: 2021-03-31 11:22:52
updated:
---







> 题目链接：[LeetCode 1006. 笨阶乘 ](https://leetcode-cn.com/problems/clumsy-factorial/)







# 一、题解





## 解法一：



**思路：** 



找规律！



`n * (n - 1) / (n - 2) + (n - 3) - (n - 4) * (n - 5) / (n - 6) + (n - 7) - (n - 8).... `



对于乘除法：`n(n - 1)/(n - 2)`，多项式进行一下除法可知道结果为`n + 1 + 2 / (n - 2)`，因此在`n > 4`的情况下，最终结果为`n + 1`，在`n <= 4`的情况下，则直接算即可！



**`n > 4`的情况下：**



第一组三项为`n + 1`，同理，下一组三项的乘除法结果为`n - 3`，可以发现正好和第四项抵消！



结论：除了前三个，连续的四个数结果都为0。



所以有四种情况，根据模4结果处理！





**因此最终为：**



1. `n > 4` 时：
   1. `n % 4 == 0`：最终结果为`n + 1 + 5 - 4 * 3 / 2 + 1`
   2. `n % 4 == 1`：最终结果为`n + 1 + 2 - 1`
   3. `n % 4 == 2`：最终结果为`n + 1 + 3 - 2 * 1`
   4. `n % 4 == 3`：最终结果为`n + 1 + 4 - 3 * 2 / 1`
2. `n < 4`时：
   1. `n == 1`：1
   2. `n == 2`：2 * 1
   3. `n == 3`：3 * 2 + 1
   4. `n == 4`：4 * 3 + 2 - 1









## 解法二：





**思路：**



用栈保存数据，保存用于加减法的数据！可以每四次运算循环一次！

1. 乘除法直接用当前栈顶数据计算即可，计算完毕再入栈
2. 加减法直接入栈；减法入栈该数的相反数即可！
3. 此时栈内元素都是用于加法的数据，最后将栈的数据依次计算出来即可



记得每次运算都要判断是否为0！











# 二、AC代码









**参考代码一：**



```c++
class Solution {
public:
    stack<int> stk;
    int clumsy(int N) {
        if(N == 1) return 1;
        if(N == 2) return 2 * 1;
        if(N == 3) return 3 * 2 / 1;
        if(N == 4) return 4 * 3 / 2 + 1;
        if(N % 4 == 0) return N + 1 + 5 - 4 * 3 / 2 + 1;
        if(N % 4 == 1) return N + 1 + 2 - 1;
        if(N % 4 == 2) return N + 1 + 3 - 2 * 1;
        // N % 4 == 3
        return N + 1 + 4 - 3 * 2 / 1;
    }
};
```





**参考代码二：**



```c++
class Solution {
public:
    stack<int> stk;
    int clumsy(int N) {
        stk.push(N--);
        while(N){
            if(N) stk.top() *= N --;
            if(N) stk.top() /= N --;
            if(N) stk.push(N --);
            if(N) stk.push(-N --);
        }
        int res = 0;
        while(stk.size()){
            res += stk.top();
            stk.pop();
        }
        return res;
    }
};
```





