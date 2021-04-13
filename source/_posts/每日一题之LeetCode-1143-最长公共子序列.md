---
title: 每日一题之LeetCode 1143. 最长公共子序列
author: ITNXD
toc: true
abbrlink: 55105
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 动态规划
  - DP
date: 2021-04-02 10:24:36
updated:
---





> 题目链接：[LeetCode 1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)





# 一、题解





最长公共子序列，经典的线性DP问题！



**思路：**

**状态表示**：两个字符串，使用二维数组`f[i][j]`表示字符串a的前i个和字符串b的前j个子串的集合！属性为：计算**最大值**！

**状态计算**：

1. 都选，在二者相同情况下有解：`f[i - 1][j - 1] + 1`
2. a[i]选b[j]不选：`f[i][j - 1]`，a[i]不一定可以匹配，包含第四种情况
3. a[i]不选b[j]选：`f[i - 1][j]`，b[j]不一定可以匹配，包含第四种情况
4. 都不选：`f[i - 1][j - 1]`

**最终答案：** `f[n][m]`



**因此：** 只计算前三种情况最大值即可，第四种已经被包含在内！

**注意：** 下标问题，`f[i][j]`对应字符串下标为`i - 1, j - 1`





# 二、AC代码





**参考代码：**



```c++
class Solution {
public:
    int longestCommonSubsequence(string a, string b) {
        int n = a.size(), m = b.size();
        vector<vector<int>> f(n + 1, vector<int>(m + 1));
        for(int i = 1; i <= n; i ++)
            for(int j = 1; j <= m; j ++){
                f[i][j] = max(f[i - 1][j], f[i][j - 1]);
                if(a[i - 1] == b[j - 1]) f[i][j] = max(f[i][j], f[i - 1][j - 1] + 1);
            }
        return f[n][m];
    }
};
```

