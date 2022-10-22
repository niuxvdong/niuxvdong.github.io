---
title: LeetCode刷题-120. 三角形最小路径和
author: Mr.Niu
toc: true
abbrlink: 52215
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/20/b2a472fd03d7676fc29016169f5e4eee.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/20/b2a472fd03d7676fc29016169f5e4eee.png
categories: LeetCode刷题
date: 2020-08-07 22:10:33
updated:
tags:
	- 动态规划
---





> 题目链接：[120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)



# 题解：



> 简单动态规划题！



## 题目简述：

给定一个三角形，求自顶向下的最小路径！

## 题解：

**动态规划：**

**状态表示：** 使用原数组`f[i][j]`表示该位置到达最底部的最小距离！

**状态计算：** 只能移动到下一行正下方和右下方，所以该值为`f[i][j] += min(f[i + 1][j], f[i + 1][j + 1])`，即当前值加上从最下面到达当前层的下一层的距离！



**最终答案：** `f[0][0]`



**注意：** 最后一行不必处理！处理也可以！



**时间复杂度**：`O(n^2)`

**空间复杂度：**`O(1)`

## AC代码：



```c++
class Solution {
public:
    int minimumTotal(vector<vector<int>>& f) {
        int n = f.size();
        for(int i = n - 2; i >= 0; i--)
            for(int j = 0; j <= i; j++)
                f[i][j] += min(f[i + 1][j], f[i + 1][j + 1]);
        return f[0][0];
    }
};
```



