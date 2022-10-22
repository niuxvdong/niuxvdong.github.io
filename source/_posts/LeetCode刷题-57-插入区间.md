---
title: LeetCode刷题-57. 插入区间
author: Mr.Niu
toc: true
abbrlink: 4935
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/08/8037cc41e6d20d092693539e2add3e8a.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/08/8037cc41e6d20d092693539e2add3e8a.png
categories: LeetCode刷题
tags:
  - 模拟
  - 排序
date: 2020-07-08 21:47:29
updated:
---

















> 题目链接：[57. 插入区间]( https://leetcode-cn.com/problems/insert-interval/)



# 题解：



> 看似和上一题区间合并类似，实则没什么关系！



## 题目简述：



给一个按照区间左端点排序的列表，给定一个待插入区间，使得插入后，没有重叠元素！

## 题解：



由于已经排好序了，所以我们就不需要排序了！



**分三段处理：**



1. 找到可以插入待插入区间的上一个区间，即从开始到该区间是不需要参与合并的，即`a[k][1] < b[0]`
2. 找到可以和待插入区间合并的区间的最后一个区间，即`a[k][0] <= b[1]`，不断更新待插入区间的右端点，直到无法合并结束，此时区间为待插入区间
3. 最后一段就是剩下的区间了，按顺序插入即可



**看一下简图：**



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/08/8caa0f75a700023ee6ca9c06a0968bc0.png)



**注意：**



- 处理第二段不要越界，即`k < a.size()`



**时间复杂度：** 扫描一遍，为`O(n)`

## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& a, vector<int>& b) {
        vector<vector<int>> res;
        int k = 0;
        while(k < a.size() && a[k][1] < b[0]) res.push_back(a[k++]);
        if(k < a.size()){
            b[0] = min(a[k][0], b[0]);
            while(k < a.size() && a[k][0] <= b[1]) b[1] = max(b[1], a[k++][1]);
        }
        res.push_back(b);
        while(k < a.size()) res.push_back(a[k++]);
        return res;
    }
};
```



