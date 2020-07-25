---
title: LeetCode刷题-74. 搜索二维矩阵
author: Mr.Niu
toc: true
abbrlink: 59764
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/7664ee78ebdf1226052b13c7c0c37e23.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/7664ee78ebdf1226052b13c7c0c37e23.png
categories: LeetCode刷题
tags:
  - 二分
  - 二维二分
date: 2020-07-22 22:26:29
updated:
---























> 题目链接：[74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix/)



# 题解：



> 二维的二分，第一次见，其实可以通过取除和取余转换为一维！



## 题目简述：

给定一个二维有序矩阵，从左到右，从上到下，都是升序序列，每行最末小于下一行最开始！

判断知否存在一个目标值！

## 题解：

嗯，暴力，使用额外数组将二维变为一维！

再进行二分！

二分条件：`v[mid] >= target`



**注意：**

- 对空矩阵判断，两种情况`[]`，`[[]]`，所以需要`matrix.empty() || matrix[0].empty()`



---





其实可以将一个`0 ~ n * m - 1`的数转变为一个二维下标的：

`matrix[mid / m][mid % m]`：第一个算行，第二个算列即可！



**详细代码见AC代码二！**

## AC代码一：暴力

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        int n = matrix.size(), m = matrix[0].size();
        vector<int> v(n * m);
        int k = 0;
        for(int i = 0; i < n; i++)
            for(int j = 0; j < m; j++)
                v[k++] = matrix[i][j];
        int l = 0, r = k - 1;
        while(l < r){
            int mid = l + r >> 1;
            if(v[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return v[r] == target;
    }
};
```



## AC代码二：正解



```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        int n = matrix.size(), m = matrix[0].size();
        int l = 0, r = n * m - 1;
        while(l < r){
            int mid = l + r >> 1;
            if(matrix[mid / m][mid % m] >= target) r = mid;
            else l = mid + 1;
        }
        return matrix[r / m][r % m] == target;
    }
};
```



