---
title: LeetCode刷题-130. 被围绕的区域
author: Mr.Niu
toc: true
abbrlink: 10602
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/09/ab444f56198af2025a18c92122a07ce7.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/09/ab444f56198af2025a18c92122a07ce7.png
categories: LeetCode刷题
tags:
  - Flood Fill
  - 递归
  - DFS
date: 2020-08-08 23:16:17
updated:
---



> 题目链接：[130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)



# 题解：



> 经典的逆向思维算法，`Flood Fill`



## 题目简述：

给定一个二维矩阵只包含`O和X`，找到没有被包围的`O`用`X`填充。

## 题解：

**题目理解：** 

- 任何与边界的`O`相连的`O`都会被填充为`X`
- 任何与不与边界的`O`相连的`O`都不会被填充为`X`



**逆向思维`Flood Fill`：**

- 我们先将与边界上的`O`相连的`O`全部标记出来，即换一个字符例如`#`
- 此时除了`X和#`剩下的`O`就是需要被修改为`X`的了
- 只需一遍扫描即可，将`O`换为`X`，将`#`换为`O`





**注意：**`vector`为空的特判！



**时间复杂度**：每个点最多遍历两次，为`O(n^2)`

## AC代码：



```c++
class Solution {
public:
    vector<vector<char>> board;
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
    int n, m;
    void solve(vector<vector<char>>& _board) {
        board = _board;
        if(board.empty() || board[0].empty()) return;
        n = board.size(), m = board[0].size();
        for(int i = 0; i < n; i++){
            if(board[i][0] == 'O') dfs(i, 0);
            if(board[i][m - 1] == 'O') dfs(i, m - 1);
        }
        for(int i = 0; i < m; i++){
            if(board[0][i] == 'O') dfs(0, i);
            if(board[n - 1][i] == 'O') dfs(n - 1, i);
        }
        for(int i = 0; i < n; i++){
            for(int j = 0; j < m; j++){
                if(board[i][j] == '#') board[i][j] = 'O';
                else if(board[i][j] == 'O') board[i][j] = 'X';
            }
        }
        _board = board;
    }
    void dfs(int x, int y){
        board[x][y] = '#';
        for(int i = 0; i < 4; i++){
            int a = x + dx[i], b = y + dy[i];
            if(a >= 0 && a < n && b >= 0 && b < m && board[a][b] == 'O') dfs(a, b);
        }
    }
};
```



