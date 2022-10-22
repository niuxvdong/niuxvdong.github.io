---
title: LeetCode刷题-119. 杨辉三角 II
author: Mr.Niu
toc: true
abbrlink: 50033
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/07/b19bb6e352c464b616706e20ca8e5b05.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/07/b19bb6e352c464b616706e20ca8e5b05.png
categories: LeetCode刷题
date: 2020-08-07 22:10:23
updated:
tags:
	- 递推
	- 位运算
	- 滚动数组
---







> 题目链接：[119. 杨辉三角 II](https://leetcode-cn.com/problems/pascals-triangle-ii/)



# 题解：



> 类似于上一个杨辉三角！



## 题目简述：

赶回第`k`行杨辉三角，要求空间`O(k)`

## 题解一：普通版

**思路：**

- 为了省空间到`O(k)`，我么使用滚动数组解决
- 一个数组记录上一层，一个数组记录下一层，来回滚动即可



**时间复杂度**：`O(n^2)`

## AC代码一：



```c++
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> res, last;
        for(int i = 0; i <= rowIndex; i++){
            res.clear();
            for(int j = 0; j <= i; j++){
                if(!j || j == i) res.push_back(1);
                else res.push_back(last[j] + last[j - 1]);
            }
            last = res;
        }
        return res;
    }
};
```

## 题解二：位运算优化

**思路：** 对于滚动数组是有特点的，我们可以用位运算来优化一下：

**位运算滚动数组：** 根据行数编号的奇偶来运算，上一层若为奇数，则下一层为偶数，使用`i`表示下一层，则上一层为`i - 1`，若直接这样那么空间复杂度是`n^2`级别的，但是，我们只要两层，可以对其奇偶进行判断即可，即和1左与运算即可，当前层为`i & 1`，上一层为`i - 1 & 1`，这样就把空间降到了两层！

**使用位运算优化：** 会比普通的滚动数组快一点！

**最后答案：** `f[n & 1]`

**实现：** 构建二维数组，第一维只有2，使用时将第一维都与1做一下与运算即可！

**时间复杂度**：`O(n)`

## AC代码二：





```c++
class Solution {
public:
    vector<int> getRow(int n) {
        vector<vector<int>> f(2, vector<int>(n + 1));
        for(int i = 0; i <= n; i++){
            f[i & 1][0] = f[i & 1][i] = 1;
            for(int j = 1; j < i; j++)
                f[i & 1][j] = f[i - 1 & 1][j - 1] + f[i - 1 & 1][j];
        }
        return f[n & 1];
    }
};
```

