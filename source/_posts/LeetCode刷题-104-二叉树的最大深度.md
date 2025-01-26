---
title: LeetCode刷题-104. 二叉树的最大深度
author: Mr.Niu
toc: true
abbrlink: 10832
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/d92c45da8050238e8911ec7f8a2256e2.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/d92c45da8050238e8911ec7f8a2256e2.png
categories: LeetCode刷题
date: 2020-08-05 19:23:29
updated:
tags:
	- 二叉树
	- 递归
	- DFS
---







> 题目链接：[104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)



# 题解：



> 二叉树深度问题！



## 题目简述：

求二叉树的最大深度！

## 题解：

很简单的！

**思路：** 深度对于根结点来说就是左子树和右子树的最大深度加一即可，则我们递归去求其高度！





**时间复杂度**：`O(n)`

## AC代码：



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if(!root) return 0;
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```



