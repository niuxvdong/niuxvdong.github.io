---
title: LeetCode刷题-111. 二叉树的最小深度
author: Mr.Niu
toc: true
abbrlink: 24315
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/07/4e04fe0c09115344486623bf311869e8.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/07/4e04fe0c09115344486623bf311869e8.png
categories: LeetCode刷题
date: 2020-08-07 22:08:40
updated:
tags:
	- 二叉树
	- 递归
	- DFS
---











> 题目链接：[111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)



# 题解：



> 求二叉树的深度问题！



## 题目简述：

求二叉树的最小深度！

## 题解：

**简单递归：**最小深度一定是左右子树中较小的一个，递归去处理，分几种情况：

- 根节点为空：返回0
- 左右子树都为空：返回1
- 左右子树都非空：返回左右子树的较小深度加一
- 左右子树一个空一个非空：返回该子树深度加一



**时间复杂度**：遍历每个节点一次，为`O(n)`

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
    int minDepth(TreeNode* root) {
        if(!root) return 0;
        if(!root->left && !root->right) return 1;
        if(root->left && root->right) return min(minDepth(root->left), minDepth(root->right)) + 1;
        if(root->left) return minDepth(root->left) + 1;
        return minDepth(root->right) + 1;
    }
};
```



