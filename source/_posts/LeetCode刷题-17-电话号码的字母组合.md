---
title: LeetCode刷题-17.电话号码的字母组合
author: Mr.Niu
toc: true
abbrlink: 24700
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/18/c1310e34e87ef382cbac996baf719385.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/18/c1310e34e87ef382cbac996baf719385.png
categories: LeetCode刷题
tags:
  - 递归
date: 2020-06-19 22:13:39
updated:
---











> 题目链接：[17.电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)



# 题解：



> 嗯，，一道经典的递归问题，简单！



## 题目简述：

有一个电话，九键，和手机键盘一样，都有3-4个字母，要求按了几个数字后，要将所有组合全排列输出！

## 题解：



定义函数`dfs(string digits, int u, string path)`

- `digits`：输入的按键
- `u`：表示当前处理到第几个按键
- `path`：表示当前处理了的按键构成的组合



递归终止条件：`u == digits.size()`，即每个数字都已经取了一个字母

递归过程：每个`u`的位置去循环每一个字母，`dfs(digits, u + 1, path + c);`



这个最简单的递归过程会将全排列都走一遍的！



**注意：** 需要特判输入为空的情况，应该直接返回，否则会返回一个带有`""`元素的数组。

## AC代码：



```c++
class Solution {
public:
    string str[10] = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };
    vector<string> res;
    vector<string> letterCombinations(string digits) {
        if(digits.empty()) return res;
        dfs(digits, 0, "");
        return res;
    }
    void dfs(string digits, int u, string path){
        if(u == digits.size()) res.push_back(path);
        else{
            for(auto c : str[digits[u] - '0'])
                dfs(digits, u + 1, path + c);
        }
    }
};
```



