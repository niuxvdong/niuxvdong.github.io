---
title: LeetCode刷题-14.最长公共前缀
author: Mr.Niu
toc: true
abbrlink: 4096
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/18/c5a8c607c20ae75b03d3b6e04dc1cf2a.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/18/c5a8c607c20ae75b03d3b6e04dc1cf2a.png
categories: LeetCode刷题
tags:
  - 字符串
date: 2020-06-19 20:45:43
updated:
---















> 题目链接：[14.最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)



# 题解：



> 嗯，直接做就行，注意一点细节即可！



## 题目简述：

给定一个字符串数组。求最长公共前缀！

## 题解：

首先：以第一个字符串为基准，和其他字符串一一对应比较，都相同则继续后移，累加`res`；不同则直接返回之前已累积的公共前缀！

**一个注意点：** 若其他字符串的长度小于当前第一个字符串的位置，则直接返回即可。

## AC代码：



```c++
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string res = "";
        if(strs.empty()) return res;
        for(int i = 0; i < strs[0].size(); i++){
            char c = strs[0][i];
            for(int j = 0; j < strs.size(); j++){
                if(i >= strs[j].size() || strs[j][i] != c){
                    return res;
                }
            }
            res += c;
        }
        return res;
    }
};
```



