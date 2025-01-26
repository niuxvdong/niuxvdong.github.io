---
title: LeetCode刷题-12.整数转罗马数字
author: Mr.Niu
toc: true
abbrlink: 61074
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/19/644556c608c10919145eea06863697f4.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/19/644556c608c10919145eea06863697f4.png
categories: LeetCode刷题
tags:
  - 字符串
date: 2020-06-19 11:24:14
updated:
---











> 题目链接：[12.整数转罗马数字](https://leetcode-cn.com/problems/integer-to-roman/)



# 题解：



> 嗯，，这题挺简单，字符串处理，我使用了具有对应关系的哈希表！



## 题目简述：



给定了一个正数，转化成罗马数字。



 例如：1994--------->  "MCMXCIV"

## 题解：

罗马数字就是下面十三种字母的组合，首先使用一种数据结构将对应的数字与罗马数字对应起来！

这里我使用了`unordered_map`哈希表存储！

和每次将一个数取余取除类似，可以搞到每一位！

所以：思路就是将普通数字，一直对高位取除，即从1000、900、500.....1，取除：

- 如果等于0，则说明剩余部分比该数字要小，直接跳过；
- 不等于0，则进行处理，将`str` 累加一下对应的字符`t`次，即可
- 每次进行取余计算剩下的即可！

## AC代码：



```c++
class Solution {
public:
    string intToRoman(int num) {
        unordered_map<int, string> hash;
        int a[13] = {1,4,5,9,10,40,50,90,100,400,500,900,1000};
        int k = 12;
        string str = "";
        hash[1] = "I";
        hash[4] = "IV";
        hash[5] = "V";
        hash[9] = "IX";
        hash[10] = "X";
        hash[40] = "XL";
        hash[50] = "L";
        hash[90] = "XC";
        hash[100] = "C";
        hash[400] = "CD";
        hash[500] = "D";
        hash[900] = "CM";
        hash[1000] = "M";
        while(num){ // 3 / 1
            int t = num / a[k];
            num %= a[k];
            if(t != 0){
                for(int i = 0; i < t; i++) 
                    str += hash[a[k]];
            }
            k--;
        }
        return str;
    }
};
```





