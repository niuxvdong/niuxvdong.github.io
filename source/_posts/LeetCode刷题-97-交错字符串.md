---
title: LeetCode刷题-97. 交错字符串
author: Mr.Niu
toc: true
abbrlink: 40380
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/03/97d4e855ae78d65415914b8425660095.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/03/97d4e855ae78d65415914b8425660095.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-08-03 18:16:01
updated:
---







> 题目链接：[97. 交错字符串]( https://leetcode-cn.com/problems/interleaving-string/)



# 题解：



> 简单动态规划！



## 题目简述：

给定三个字符串，前两个字符串能否组成第三个字符串！

## 题解：

**动态规划：**



**状态表示：** 两个字符串，使用二维数组`f[i][j]`，`s1`串的前`i`个字符串和`s2`串的前`j`个字符能否构成`s3`串的前`i + j`个字符！

**状态计算：**同样的套路，只考虑最后一步，即能交错形成的条件：

- 当`s1[i] == s3[i + j]`时：`s1`串的前`i - 1`个和`s2`的前`j`个匹配
- 当`s2[j] == s3[i + j]`时：`s1`串的前`i`个和`s2`的前`j - 1`个匹配

**综上所述：** 状态转移方程为：`f[i][j] = f[i - 1][j] || f[i][j - 1]`

**初始转态：** `f[0][0] == true` 同样取决于能否将所有状态全部计算对！不解释了！

**最终结果：** `f[n][m]`



**时间复杂度**：`O(n^2)`

## AC代码：



```c++
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int n = s1.size(), m = s2.size();
        if(n + m != s3.size()) return false;
        s1 = ' ' + s1, s2 = ' ' + s2, s3 = ' ' + s3;
        vector<vector<bool>> f(n + 1, vector<bool>(m + 1));
        for(int i = 0; i <= n; i++){
            for(int j = 0; j <= m; j++){
                if(!i && !j) f[i][j] = true;
                else{
                    if(i && s1[i] == s3[i + j]) f[i][j] = f[i - 1][j];
                    if(j && s2[j] == s3[i + j]) f[i][j] = f[i][j] || f[i][j - 1];
                }
            }
        }
        return f[n][m];
    }
};
```



