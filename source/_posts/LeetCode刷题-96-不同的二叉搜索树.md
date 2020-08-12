---
title: LeetCode刷题-96. 不同的二叉搜索树
author: Mr.Niu
toc: true
abbrlink: 31482
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/03/f4536b7bbe00923b14d32e1b5f631f49.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/03/f4536b7bbe00923b14d32e1b5f631f49.png
categories: LeetCode刷题
tags:
  - 二叉搜索树
  - 卡特兰数
  - 动态规划
date: 2020-08-03 18:15:40
updated:
---







> 题目链接：[96. 不同的二叉搜索树]( https://leetcode-cn.com/problems/unique-binary-search-trees/)



# 题解：



> 本题就是求卡特兰数，这里使用动态规划来写！



## 题目简述：

求n个节点可以构成二叉搜索树的个数！

## 题解：

可以直接利用卡特兰数公式来求，似乎不太好求！

**这里使用动态规划来求：**

和上一道类似，同样是乘法原理，`j`表示长度为`1 ~ i`的根节点的位置，左子树的长度为 `j - 1`，右子树的长度为`i - j`

**状态表示：**`f[i]`表示`i`长度的二叉搜索树个数

**状态计算：** `f[i] += f[j - 1] * f[i - j]`（`j`可以取该区间任何位置，累加关系） 乘法原理，左边乘以右边

**初始转态：** `f[0] = 1`，同样这个初始状态由能否使得所有状态算对即可！当`i, j`都为1时，`f[i] = f[j - 1] * f[i - j] `应该为1，即`f[0] = 1`

**最终答案：**` f[n]` 即n长度的二叉搜索树个数





**注意**：对于`1 ~ 5` 和`2 ~ 6`可以构成的二叉搜索树是一样的，可以这样想，将`1 ~ 5`构成的二叉搜索树根据对应关系可以全部替换为`2 ~ 6`，即二叉搜索树的个数时有区间长度决定的！







**时间复杂度**：`O(n^2)`

## AC代码：



```c++
class Solution {
public:
    int numTrees(int n) {
        vector<int> f(n + 1);
        f[0] = 1;
        for(int i = 1; i <= n; i++)
            for(int j = 1; j <= i; j++)
                f[i] += f[j - 1] * f[i - j];
        return f[n];
    }
};
```



