---
title: 'LeetCode刷题-54. 螺旋矩阵 '
author: Mr.Niu
toc: true
abbrlink: 395
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/a87fbbf6814aa0b0d4462eac5c55bcb4.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/a87fbbf6814aa0b0d4462eac5c55bcb4.png
categories: LeetCode刷题
tags:
  - 模拟
date: 2020-07-07 14:10:12
updated:
---













> 题目链接：[54. 螺旋矩阵]( https://leetcode-cn.com/problems/spiral-matrix/)



# 题解：



> 又是旋转相关的模拟题！



## 题目简述：

给定一个矩阵，按照右下左上的顺序进行遍历！



## 题解：

**枚举 `n *  m`个点，按照右下左上的顺序循环进行，如螺旋般，一个方向走到头，换下一个方向！**



- 使用`0,1,2,3`分别表示四个方向，走到头就换一下方向，即`d = (d + 1) % 4`

- 使用`dx`和`dy`数组表示四个方向坐标的变化。



如果，坐标越界（第一次访问该方向），或者已经访问过的位置（不是第一次访问该方向），就要换到当前方向的下一个方向，同时更新当前坐标。即`a < 0 || a >= n || b < 0 || b >= m || vis[a][b]`



**注意**：数组为空的判断！

## AC代码：



```c++
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int n = matrix.size();
        if(n == 0) return res;
        int m = matrix[0].size();
        
        int dx[] = {0, 1, 0, -1}, dy[] = {1, 0, -1, 0};
        vector<vector<bool>> vis(n, vector<bool>(m));
        
        for(int i = 0, x = 0, y = 0, d = 0; i < n * m; i++){
            res.push_back(matrix[x][y]);
            vis[x][y] = true;
            int a = x + dx[d], b = y + dy[d];
            if(a < 0 || a >= n || b < 0 || b >= m || vis[a][b]){
                d = (d + 1) % 4;
                a = x + dx[d], b = y + dy[d];
            }
            x = a, y = b;
        }
        return res;
    }
};
```



