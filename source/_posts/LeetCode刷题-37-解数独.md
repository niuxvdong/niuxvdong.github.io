---
title: LeetCode刷题-37.解数独
author: Mr.Niu
toc: true
abbrlink: 37046
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/1a3787a3c6f65a1ac029dc769aed5c36.png'
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/1a3787a3c6f65a1ac029dc769aed5c36.png'
categories: LeetCode刷题
tags:
  - 数独
  - DFS
  - 递归
date: 2020-06-27 20:10:59
updated:
---













> 题目链接：[37.解数独](https://leetcode-cn.com/problems/sudoku-solver/)



# 题解：



> 好了，来开始解数独了！



## 题目简述：

同上一题，都是数独，此题用来解数独。

## 题解：

**这道题的第一个关键在于填数字的时候如何处理行列即九宫格是否有该数！**



同上一题的判断有效性，使用三个数组`row[9][9], col[9][9], cell[3][3][9]`来分别指向九行，九列，九个九宫格，的九个数来进行标记。



**对于九宫格的处理：**



可以对行列取除`i / 3, j / 3`，会发现只要是在九宫格他们得到的结果一定是每个九宫格左上角的坐标位置，这样就可以进行轻松的标记！



**递归过程：**

1. 递归出口，由于从左到右从上到下进行爆搜，所以：
   1. 若`y == 9`，则`x ++, y = 0`，即到了行末，进行换行
   2. 若`x == 9`，则`return true` ，即已经搜完了最后一行最后一个了，直接返回
2. 若当前搜到的为`.`，则直接跳过，`return dfs(board, x, y + 1)`
3. 否则，进行循环搜索，若行列九宫格都没有重复，则填充当前值，并将行列九宫格都标记为`true`
4. 继续向后搜索，若可以搜到底，直接返回`true`，说明找到了一种情况。
5. 否则，进行回溯，取消标记，将填充值恢复为`.`
6. 若搜完九个数并没有可以填的数，直接返回`false`



**注意：** 将下标转换为字符，`board[x][y] = '1' + i`，将字符转换为数字，` board[i][j] - '1'`



## AC代码：



```c++
class Solution {
public:
    bool row[9][9], col[9][9], cell[3][3][9];
    void solveSudoku(vector<vector<char>>& board) {
        for(int i = 0; i < 9; i++){
            for(int j = 0; j < 9; j++){
                if(board[i][j] != '.'){
                    int t = board[i][j] - '1';
                    row[i][t] = col[j][t] = cell[i / 3][j / 3][t] = true;
                }
            }
        }
        dfs(board, 0, 0);
    }
    bool dfs(vector<vector<char>>& board, int x, int y){
        if(y == 9) x ++, y = 0;
        if(x == 9) return true;

        if(board[x][y] != '.') return dfs(board, x, y + 1);
        for(int i = 0; i < 9; i++){
            if(!row[x][i] && !col[y][i] && !cell[x / 3][y / 3][i]){
                board[x][y] = '1' + i;
                row[x][i] = col[y][i] = cell[x / 3][y / 3][i] = true;
                if(dfs(board, x, y + 1)) return true;
                board[x][y] = '.';
                row[x][i] = col[y][i] = cell[x / 3][y / 3][i] = false;
            }
        }
        return false;
    }
};
```



