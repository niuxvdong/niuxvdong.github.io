---
title: 每日一题之AcWing 85.不用加减乘除做加法
author: ITNXD
toc: true
abbrlink: 24538
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 全加器
  - 位运算
date: 2021-03-22 15:43:05
updated:
---







> 题目链接：[AcWing 85.不用加减乘除做加法](https://www.acwing.com/problem/content/81/)
>
> 计算机底层加法的实现原理 --- 全加器！



# 一、题解





> 要求不使用加减乘除实现加法！这样的话，必然就是计算机底层实现加法的原理了！即**全加器**的实现！





所谓全加器：就是将一个数加另一个数转换为不进位加法与加法的和！





**过程如下：**

1. 先通过**异或运算**得到不进位加法的结果
2. 再通过**与运算**得到进位加法的进的位，由于进位是向左边的数进位，因此将结果左移一位即可
3. 二者相加即为最终结果！



**一个问题，上一步要用到加法，题目要求不能使用加法，如何处理？**



我们可以将得到的两个结果通过**迭代**的方式再次进行一次**异或和与运算**，直到进位结果为0为止！得到的就是最终答案**！**



**那么，如何确定该循环一定会结束？**



我们会发现每次进行进位运算时，都会左移1，即末尾会至少多个0，每次迭代多一个0，那么最多迭代32次，必然该数为0，退出循环！





**时间复杂度**：`O(1)`

**空间复杂度**：`O(1)`









# 二、AC代码





**参考如下：**



```c++
class Solution {
public:
    int add(int num1, int num2){
        while(num2){
            int sum = num1 ^ num2;
            int carry = (num1 & num2) << 1;
            num1 = sum, num2 = carry;
        }
        return num1;
    }
};
```

