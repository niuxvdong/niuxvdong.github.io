---
title: LeetCode刷题-13.罗马数字转整数
author: Mr.Niu
toc: true
abbrlink: 11911
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/f51d6df1a9d7b3b2d8fbc82c2e336194.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/f51d6df1a9d7b3b2d8fbc82c2e336194.png
categories: LeetCode刷题
tags:
  - 字符串
date: 2020-06-19 20:13:17
updated:
---













> 题目链接：[13.罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)



# 题解：



> 和 [12.整数转罗马数字](https://www.itnxd.cn/posts/61074.html)类似，就是反过来问的！处理稍有不同！



## 题目简述：



给出罗马数字，转化为普通数字！

例如： "MCMXCIV" ------------> 1994

## 题解：

同样适用哈希表存储，不过与上一道题反着的，存储类型反着换了一下！

首先从左到右搜索每一位罗马字符，能找到对应的字符就给`value`进行累加。

- 应该先按`两个`进行搜索，因为会出现这种情况`"MCMXCIV"` ，先按照一个字符搜，遇到`CM`应该处理为900，但是按照一个字母先走，会变成`C` + `M`，就变成了 1100。这是不对的。
- 先按照两个搜索，然后 `i += 2`，然后按照一个进行搜索`i += 1`.

## AC代码：



```c++
class Solution {
public:
    int romanToInt(string s) {
        unordered_map<string, int> hash;
        int value = 0;
        hash["I"] = 1;
        hash["IV"] = 4;
        hash["V"] = 5;
        hash["IX"] = 9;
        hash["X"] = 10;
        hash["XL"] = 40;
        hash["L"] = 50;
        hash["XC"] = 90;
        hash["C"] = 100;
        hash["CD"] = 400;
        hash["D"] = 500;
        hash["CM"] = 900;
        hash["M"] = 1000;
        for(int i = 0; i < s.size();){
            if(hash.count(s.substr(i, 2))) value += hash[s.substr(i, 2)], i += 2;
            else if(hash.count(s.substr(i, 1))) value += hash[s.substr(i, 1)], i += 1;
        }
        return value;
    }
};
```




