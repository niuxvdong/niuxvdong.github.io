---
title: LeetCode刷题-77. 组合
author: Mr.Niu
toc: true
abbrlink: 14686
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/23/6583fe827366a022745863c6131c7720.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/23/6583fe827366a022745863c6131c7720.png
categories: LeetCode刷题
tags:
  - 递归
date: 2020-07-23 10:51:52
updated:
---

















> 题目链接：[77. 组合]( https://leetcode-cn.com/problems/combinations/)



# 题解：



> 简单递归！



## 题目简述：



在 n 个数选取 k 个数的组合！

## 题解：

**DFS思路：**`dfs(int u, int start)`

- `u`：记录当前搜到了第几个数
- `start`：记录当前数的开始位置，即从上一个数的后一个开始，有效避免重复
- `res`累积答案，`path`保存每一组合法序列！
- 递归出口：`u == k` 搜完u个数即终止！

**时间复杂度：** 方案数为 O(C<sub>n</sub><sup>k</sup> )，每个方案需要O(k)，总时间复杂度为O(C<sub>n</sub><sup>k</sup> * k)

## AC代码：



```c++
class Solution {
public:
    int n, k;
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> combine(int _n, int _k) {
        n = _n, k = _k;
        dfs(0, 1);
        return res;
    }
    void dfs(int u, int start){
        if(u == k){
            res.push_back(path);
            return;
        }
        for(int i = start; i <= n; i++){
            path.push_back(i);
            dfs(u + 1, i + 1);
            path.pop_back();
        }
    }
};
```



