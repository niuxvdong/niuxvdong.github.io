---
title: LeetCode刷题-36.有效的数独
author: Mr.Niu
toc: true
abbrlink: 63579
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@fb81f08b0a26d4579dc4dcc5c36c7d6244f040a5/2021/02/06/170e230f16ed55ce6d4fbee77063566f.png'
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@fb81f08b0a26d4579dc4dcc5c36c7d6244f040a5/2021/02/06/170e230f16ed55ce6d4fbee77063566f.png'
categories: LeetCode刷题
tags:
  - 数独
  - 模拟
date: 2020-06-27 20:10:38
updated:
---

















> 题目链接：[36.有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)



# 题解：



> 数独游戏的到来，这道题判断是否有解，下一道题咱们来填数独！



## 题目简述：

给定一个9 X 9 的数独，判断当前状态是否有解！

## 题解：

判断是否有解，即判断行和列以及九个小九宫格是否会出现一个数多用的情况即可！

- 判断行：直接遍历即可，每行进行一下数组清零
- 判断列：将`i, j`调换一下即可！每列进行一下数组清零
- 判断九宫格：可以使用`i, j`指向每个九宫格的第一个位置代表不同的九宫格，即`i, j += 3`
  - 然后再在个九宫格中使用两层循环遍历九个格子即可，每个九宫格进行数组清零，指向的位置即为`i + x, j + y`
- 使用过直接返回`false`，全部遍历完都没问题，则返回`true`



**注意**：要将数独中的字符转变为数字进行！转换为了`1 - 9`

## AC代码：



```c++
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        bool s[10];
        for(int i = 0; i < 9; i ++){
            memset(s, 0, sizeof s);
            for(int j = 0; j < 9; j ++){
                if(board[i][j] != '.'){
                    int t = board[i][j] - '0';
                    if(s[t]) return false;
                    s[t] = true;
                }
            }
        }
        for(int i = 0; i < 9; i ++){
            memset(s, 0, sizeof s);
            for(int j = 0; j < 9; j ++){
                if(board[j][i] != '.'){
                    int t = board[j][i] - '0';
                    if(s[t]) return false;
                    s[t] = true;
                }
            }
        }
        for(int i = 0; i < 9; i += 3){
            for(int j = 0; j < 9; j += 3){
                memset(s, 0, sizeof s);
                for(int x = 0; x < 3; x ++){
                    for(int y = 0; y < 3; y ++){
                        if(board[i + x][j + y] != '.'){
                            int t = board[i + x][j + y] - '0';
                            if(s[t]) return false;
                            s[t] = true;
                        }
                    }
                }
            }
        }
        return true;
    }
};
```



