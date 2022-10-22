---
title: LeetCode刷题-62. 不同路径
author: Mr.Niu
toc: true
abbrlink: 21929
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/09/70565ef50e6782ee3a41f60a5d6499c0.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/09/70565ef50e6782ee3a41f60a5d6499c0.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-07-20 21:43:28
updated:
---















> 题目链接：[62. 不同路径]( https://leetcode-cn.com/problems/unique-paths/)



# 题解：



> 简单的动态规划题目！



一个方格，算出从左上走到右下的不同方案数！



## 题解一：

直接爆搜，时间会爆炸的！

## TLE代码：



```c++
class Solution {
public:
    int cnt;
    int n, m;
    int uniquePaths(int _m, int _n) {
        n = _n, m = _m;
        dfs(1, 1);
        return cnt;
    }
    void dfs(int x, int y){
        if(x > n || y > m) return;
        if(x == n && y == m){
            cnt ++;
        }
        dfs(x, y + 1);
        dfs(x + 1, y);
    }
};
```



## 题解二：

**使用动态规划：**



**状态表示**：`f[i][j]`表示从起点到当前位置的路径数！

**状态计算**：由于到当前位置只有两条路径，即上和左，所以状态转移方程为，`f[i][j] = f[i - 1][j] + f[i][j - 1]`

初始状态，`f[0][0] = 1`，最终结果：`f[n - 1][m - 1]`



**注意**：防止越界，进行一下特判！



**时间复杂度：** `O(n * m)`



## AC代码：



```c++
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> f(n, vector<int>(m));
        f[0][0] = 1;
        for(int i = 0; i < n; i++){
            for(int j = 0; j < m; j++){
                if(i - 1 >= 0) f[i][j] += f[i - 1][j];
                if(j - 1 >= 0) f[i][j] += f[i][j - 1];
            }
        }
        return f[n - 1][m - 1];
    }
};
```

