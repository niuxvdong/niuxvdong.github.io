---
title: LeetCode刷题-64. 最小路径和
author: Mr.Niu
toc: true
abbrlink: 27804
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/09/d7bffbbec3505a4922666b4a6b090658.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/09/d7bffbbec3505a4922666b4a6b090658.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-07-20 21:44:50
updated:
---













> 题目链接：[64. 最小路径和]( https://leetcode-cn.com/problems/minimum-path-sum/)



# 题解：



> 和前两道类似，同样使用动态规划！



## 题目简述：



给定一个方格，从左上走到右下，求最小代价！

## 题解：

**动态规划：**



**状态表示：** `f[i][j]`表示到达当前点的最小代价

**状态计算**： 在不越界的情况下 `f[i][j] = min(f[i - 1][j], f[i][j - 1]) + grid[i][j]`

初始转态：`f[0][0] = gird[0][0]`

最终结果：`f[n - 1][m - 1]`



**时间复杂度：** $O(n \times m)$

## AC代码：



```c++
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<vector<int>> f(n, vector<int>(m, INT_MAX));
        f[0][0] = grid[0][0];
        for(int i = 0; i < n; i++){
            for(int j =0; j < m; j++){
                if(i && j) f[i][j] = min(f[i - 1][j], f[i][j - 1]) + grid[i][j];
                else if(i) f[i][j] = f[i - 1][j] + grid[i][j];
                else if(j) f[i][j] = f[i][j - 1] + grid[i][j];
            }
        }
        return f[n - 1][m - 1];
    }
};
```



