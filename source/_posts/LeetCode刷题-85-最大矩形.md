---
title: LeetCode刷题-85. 最大矩形
author: Mr.Niu
toc: true
abbrlink: 16580
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/4a2f73a21291f7a3f80ada6a6ebae9e4.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/4a2f73a21291f7a3f80ada6a6ebae9e4.png
categories: LeetCode刷题
tags:
  - 单调栈
  - 动态规划
date: 2020-07-25 11:42:22
updated:
---









> 题目链接：[85. 最大矩形]( https://leetcode-cn.com/problems/maximal-rectangle/)



# 题解：



> 似乎动态规划也可以做，但好像是三维的数组表示，比较复杂！
>
> 本题可以借助上一题思想，使用单调栈求矩形面积！
>
> 本题求矩形面积，使用动态规划较为复杂，如果求的是正方形，使用动态规划就简单了！



## 题目简述：

给定一个只包含0，1的矩阵，找到一个只包含1的面积最大的矩形！

## 题解：



**暴力思想**：枚举每个点，将其作为右下角，枚举长宽，枚举长宽围成的矩形内的0，1。

**时间复杂度为**：`O(n^2 * n^2  * n^2)`，爆炸级别的复杂度！



**正确思想：**

本题竟然能和单调栈求矩形面积的上一题有关联！

我们按照矩阵的每一行作为可能出现都是1的矩形的底边，从该底边求一个最大矩形即可，和上一题类似，求最大矩形面积一样，将所有行作为底边枚举一遍求出来的就是所有可以形成的矩形，最大矩形就是答案！



- 完全使用上一题求最大矩形的函数
- 枚举每一行，并取最大值即可



**关键问题：如何求柱子高度，即从当前点可以向上走的高度（即该柱子都是1）？**

可以使用**动态规划：**

**状态表示：**`h[i][j]`表示该位置向上可以走的最大距离

**状态计算：**`h[i][j] = 1 + h[i - 1][j]`，即该位置为上一个位置的最大距离加上自己本身，前提是本身得是1，否则该位置为`h[i][j] = 0`



**最终答案**：`res = max(res, largestRectangleArea(h[i]))`



**时间复杂度**：枚举`n`行，每行单调栈求矩形面积需要枚举`m`列，所以为：`O(n * m)` ，即`O(n^2)`级别的

## AC代码：



```c++
class Solution {
public:
    int largestRectangleArea(vector<int>& h) {
        int n = h.size();
        vector<int> left(n), right(n);
        stack<int> stk;
        for(int i = 0; i < n; i ++){
            while (stk.size() && h[stk.top()] >= h[i]) stk.pop();
            if (stk.empty()) left[i] = -1;
            else left[i] = stk.top();
            stk.push(i);
        }

        stk = stack<int>();
        for(int i = n - 1; i >= 0; i --){
            while (stk.size() && h[stk.top()] >= h[i]) stk.pop();
            if (stk.empty()) right[i] = n;
            else right[i] = stk.top();
            stk.push(i);
        }

        int res = 0;
        for(int i = 0; i < n; i ++ ) res = max(res, h[i] * (right[i] - left[i] - 1));
        return res;
    }

    int maximalRectangle(vector<vector<char>>& matrix) {
        if(matrix.empty() || matrix[0].empty()) return 0;
        int n = matrix.size(), m = matrix[0].size();

        vector<vector<int>> h(n, vector<int>(m));
        for(int i = 0; i < n; i++)
            for(int j = 0; j < m; j++)
                if(matrix[i][j] == '1'){
                    if(i) h[i][j] = 1 + h[i - 1][j];
                    else h[i][j] = 1;
                }

        int res = 0;
        for(int i = 0; i < n; i++) res = max(res, largestRectangleArea(h[i]));
        return res;
    }
};
```



