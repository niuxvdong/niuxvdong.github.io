---
title: LeetCode刷题-73. 矩阵置零
author: Mr.Niu
toc: true
abbrlink: 11107
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/20/b256de1e46e3a3fc0746be4ecd589fa9.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/20/b256de1e46e3a3fc0746be4ecd589fa9.png
categories: LeetCode刷题
tags:
  - 取巧算法
  - 模拟
date: 2020-07-22 22:26:14
updated:
---





















> 题目链接：[73. 矩阵置零]( https://leetcode-cn.com/problems/set-matrix-zeroes/)



# 题解：



> LeetCode题目总是要求不使用额外空间。。导致这道题做法就特别取巧，不好想！



## 题目简述：



给定一个矩阵只有0和其他数，将是0的对应的改行与该列都变为0！

要求不使用额外空间！

## 题解：

本来这题开一个数组即可，非要求原地处理。。。

**现在给出空间`O(1)`的算法：**

- 使用两个变量`r0`和`c0`分别记录第一列和第一行是否有0

- 使用矩阵的第一行`matrix[0][j]`记录第`j`列是否有0（j 的范围为 1 - m - 1)
- 使用矩阵的第一列`matrix[i][0]`记录第`i`行是否有0 （i 的范围为 1 - n - 1)

**现在就可以根据上面的记录去处理每一行和每一列了！**



**时间复杂度：** `O(n * m)`

## AC代码：



```c++
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        if(matrix.empty()) return;
        int n = matrix.size(), m = matrix[0].size();
        int r0 = 1, c0 = 1;
        for(int i = 0; i < n; i++) if(!matrix[i][0]) r0 = 0;
        for(int i = 0; i < m; i++) if(!matrix[0][i]) c0 = 0;

        for(int i = 1; i < n; i++)
            for(int j = 0; j < m; j++)
                if(!matrix[i][j]) matrix[i][0] = 0;

        for(int i = 1; i < m; i++)
            for(int j = 0; j < n; j++)
                if(!matrix[j][i]) matrix[0][i] = 0;

        for(int i = 1; i < n; i++)
            if(!matrix[i][0])
                for(int j = 0; j < m; j++)
                    matrix[i][j] = 0;

        for(int i = 1; i < m; i++)
            if(!matrix[0][i])
                for(int j = 0; j < n; j++)
                    matrix[j][i] = 0;
        
        if(!r0) for(int i = 0; i < n; i++) matrix[i][0] = 0;
        if(!c0) for(int i = 0; i < m; i++) matrix[0][i] = 0;
    }
};
```



