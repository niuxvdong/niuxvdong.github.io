---
title: LeetCode刷题-115. 不同的子序列
author: Mr.Niu
toc: true
abbrlink: 39299
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/05e7675faec1d766ab3d3bf58464a9b4.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/05e7675faec1d766ab3d3bf58464a9b4.png
categories: LeetCode刷题
date: 2020-08-07 22:09:40
updated:
tags:
	- 动态规划
---





> 题目链接：[115. 不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)



# 题解：



> 熟悉的动态规划又来了！



## 题目简述：

给定两个字符串，问按顺序可以从第一个字符串中找到多少种方案可以组成第二个字符！

## 题解：

**动态规划：**同样字符串前面加空格更好的处理边界问题！

**状态表示：** 两个字符串，使用二维数组`f[i][j]`表示`s`串前`i`个字符和`t`串前`j`个字符的方案数

**状态计算：** 两种情况：

- `s[i] != t[j]`：则当前状态`f[i][j] = f[i - 1][j]`，即为`s`串前`i - 1`个字符和`t`串前`j`个字符的方案数
- `s[i] == t[j]`：则当前状态`f[i][j] = f[i - 1][j] + f[i - 1][j - 1]`，即可以匹配最后一个字符即为`f[i - 1][j - 1]`，也可以不匹配即为`f[i - 1][j]`

**最终答案：** `f[n][m]`

**边界条件：** `f[i][0] = 1`，即`s`串前`i`个字符和`t`串前0个字符（空格）的方案数都是1，`s`一定有一个空格（开始部分）。

**时间复杂度**：`O(nm)`

## AC代码：



```c++
class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.size(), m = t.size();
        s = ' ' + s, t = ' ' + t;
        vector<vector<long long>> f(n + 1, vector<long long>(m + 1));
        for(int i = 0; i <= n; i++) f[i][0] = 1;
        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                f[i][j] = f[i - 1][j];
                if(s[i] == t[j]) f[i][j] += f[i - 1][j - 1];
            }
        }
        return f[n][m];
    }
};
```



