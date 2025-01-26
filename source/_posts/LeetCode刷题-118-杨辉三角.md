---
title: LeetCode刷题-118. 杨辉三角
author: Mr.Niu
toc: true
abbrlink: 46834
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/d9fdd86ecc2a578d6f85b809f8c31224.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/d9fdd86ecc2a578d6f85b809f8c31224.png
categories: LeetCode刷题
date: 2020-08-07 22:10:12
updated:
tags:
	- 递推
---







> 题目链接：[118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/)



# 题解：



> 简单的杨辉三角！



## 题目简述：

给定一个数，生成杨辉三角的那几行！

## 题解：

**递推：**

- 对于每一行第一个和最后一个都是1，即`!j || j == i`
- 其他数字，都等于该数正上方和左上方的和，即`res[i - 1][j - 1] + res[i - 1][j]`



**时间复杂度**：`O(n^2)`

## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for(int i = 0; i < numRows; i++){
            vector<int> level;
            for(int j = 0; j <= i; j++){
                if(!j || j == i) level.push_back(1);
                else level.push_back(res[i - 1][j - 1] + res[i - 1][j]);
            }
            res.push_back(level);
        }
        return res;
    }
};
```



