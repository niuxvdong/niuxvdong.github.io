---
title: 'LeetCode刷题-51. N 皇后 '
author: Mr.Niu
toc: true
abbrlink: 29682
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/1bcdc2bc71dc053d1c14a729bb4420e7.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/1bcdc2bc71dc053d1c14a729bb4420e7.png
categories: LeetCode刷题
tags:
  - DFS
  - 递归
date: 2020-07-07 14:07:12
updated:
---













> 题目链接：[51. N 皇后](https://leetcode-cn.com/problems/n-queens/)



# 题解：



> 经典的N皇后问题！



## 题目简述：



`n * n` 的棋盘放`n`个皇后，保证每行每列每条斜线都不能有大于一个皇后！



## 题解：

**DFS来一遍即可！**



使用`col dg udg`分别存储列和两条对角线是否有皇后。使用`res`存储答案，使用`path`存储路径。



`void dfs(int i, int n)`

- `i`：代表第几层
- `n`：代表皇后数或棋盘行列数



**递归出口：** `i == n`即`n`个皇后都已经找到，将当前方案加入答案`res`

使用`dg[i + j]`和`udg[i - j + n]` 来标识两条对角线，原因就是你可以将它看成坐标系，一条对角线为`y = x + b`，另一条为`y = -x + b`，即可解的`b = y - x, b = y + x`，`y - x`可能越界，让他偏移`n`，即可保证不越界。



**递归开始：** 只要列以及两条斜线以及没有被访问过，即可访问！使用`path[i][j]`记录路径，表示`i`行的`j`列有一个皇后，更新标记，最后清空标记！



**注意**：数组的初始化，`path`需要全部初始化为`.`，`col`要初始化`n`个位置，`dg udg`要初始化`n * 2`个位置。





## AC代码：



```c++
class Solution {
public:
    vector<bool> col, dg, udg;
    vector<vector<string>> res;
    vector<string> path;
    vector<vector<string>> solveNQueens(int n) {
        col = vector<bool>(n);
        dg = udg = vector<bool>(n * 2);
        path = vector<string>(n, string(n, '.'));
        dfs(0, n);
        return res;
    }
    void dfs(int i, int n){
        if(i == n){
            res.push_back(path);
            return;
        }
        for(int j = 0; j < n; j++){
            if(!col[j] && !dg[i + j] && !udg[i - j + n]){
                col[j] = dg[i + j] = udg[i - j + n] = true;
                path[i][j] = 'Q';
                dfs(i + 1, n);
                path[i][j] = '.';
                col[j] = dg[i + j] = udg[i - j + n] = false;
            }
        }
    }
};
```



