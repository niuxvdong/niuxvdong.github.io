---
title: LeetCode刷题-59. 螺旋矩阵 II
author: Mr.Niu
toc: true
abbrlink: 63939
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/08/c4d55f5ae8a00a89b777748446cd5ff2.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/08/c4d55f5ae8a00a89b777748446cd5ff2.png
categories: LeetCode刷题
tags:
  - 模拟
date: 2020-07-09 21:40:21
updated:
---























> 题目链接：[59. 螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)



# 题解：



> 螺旋矩阵问题，和上一个基本类似。



## 题目简述：

给定一个数字 n，按照从右、下、左、上的顺序生成一个螺旋矩阵！



## 题解：

和[54题-螺旋矩阵](https://itnxd.eu.org/posts/395.html)类似，同样使用两个方向数组，参考上一篇题解，同样是一个方向走到不能走就换方向。

此处的`res`数组存储每个位置要填的值！

## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n));
        int dx[] = {0, 1, 0, -1}, dy[] = {1, 0, -1, 0};
        vector<vector<bool>> vis(n, vector<bool>(n));
        for(int i = 1, x = 0, y = 0, d = 0; i <= n * n; i++){
            res[x][y] = i;
            vis[x][y] = true;
            int a = x + dx[d], b = y + dy[d];
            if(a < 0 || a >= n || b < 0 || b >= n || vis[a][b]){
                d = (d + 1) % 4;
                a = x + dx[d], b = y + dy[d];
            }
            x = a, y = b;
        }
        return res;
    }
};
```



