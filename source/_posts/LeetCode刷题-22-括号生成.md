---
title: LeetCode刷题-22.括号生成
author: Mr.Niu
toc: true
abbrlink: 51962
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/19/19fe2500fa2e00d121ae350b2b9485f4.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/19/19fe2500fa2e00d121ae350b2b9485f4.png
categories: LeetCode刷题
tags:
  - 递归
date: 2020-06-21 19:56:10
updated:
---









> 题目链接：[22.括号生成](https://leetcode-cn.com/problems/generate-parentheses/)



# 题解：



> 简单的递归问题，会在题解二给出一个关于括号匹配的`结论`！非常重要！



## 题目简述：

给定一个`n`，找到所有`n`组括号有效可匹配的情况。

## 题解一：低效率（我的）



很明显：直接使用DFS即可！

`void dfs(int l, int r, int n, string path)`

- `l`：记录左括号使用数
- `r`：记录右括号使用数
- `n`：记录括号组数
- `path`：记录当前情况的括号组合



`bool isMatch(string str)`：判断当前括号序列是否是有效匹配



这里我使用了`dfs(1, 0, n, "(")`作为入口，即可以排除`)`开头的不可能匹配序列！虽然优化了一点点，但是还是请看题解二！



**退出条件** ：`l == n && r == n`，即左右括号都已经使用够了n个。



**这样有一个麻烦**：由于这样会生成一个全排列，每次都需要判断是否是合法的括号序列，浪费了许多时间。所以请查看`题解二`解决这个麻烦！

## AC代码一：



```c++
class Solution {
public:
    vector<string> res;
    vector<string> generateParenthesis(int n) {
        dfs(1, 0, n, "(");
        return res;
    }
    void dfs(int l, int r, int n, string path){
        if(l == n && r == n){
            if(isMatch(path)) res.push_back(path);
            return;
        }
        if(l < n) dfs(l + 1, r, n, path + '(');
        if(r < n) dfs(l, r + 1, n, path + ')');
    }
    bool isMatch(string str){
        stack<char> stk;
        for(int i = 0; i < str.size(); i++){
            if(stk.empty() && str[i] == ')') return false;
            if(str[i] == '(') stk.push('(');
            if(str[i] == ')' && stk.top() == '(') stk.pop();
        }
        return stk.empty();
    }
};
```





## 题解二：高效率（别人的）



**括号匹配问题的充要条件：（只有一种括号）**



1. 任意前缀中`(`数量大于等于`)`数量
2. 左右括号数量相等



这个结论想想就知道是成立的！反证法肯定无法匹配！



第二个条件本题默认满足（都是 n ），所以只要满足第一个条件即可！



**所以本题即变成了这样：**

- 左括号直接使用
- 右括号要满足第一个条件`r < l`，可不是`r <= l`，即当前右括号还没有使用。



**假如本题问的是匹配的数量：可以直接使用公式计算即可：**



<p style="font-size: 25px; color: red">n 组括号 可以构成  C <sub>2n</sub><sup>n</sup> / (n + 1) 个有效匹配序列！和卡特兰数有关！</p>

## AC代码二：





```c++
class Solution {
public:
    vector<string> res;
    vector<string> generateParenthesis(int n) {
        dfs(0, 0, n, "");
        return res;
    }
    void dfs(int l, int r, int n, string path){
        if(l == n && r == n){
            res.push_back(path);
        }else{
            if(l < n) dfs(l + 1, r, n, path + '(');
            if(r < n && r < l) dfs(l, r + 1, n, path + ')');
        }
    }
};
```

