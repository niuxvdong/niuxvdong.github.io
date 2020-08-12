---
title: LeetCode刷题-112. 路径总和
author: Mr.Niu
toc: true
abbrlink: 61574
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/07/3cc8f4b6c8f60fc9b7ff2c5f90f14041.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/07/3cc8f4b6c8f60fc9b7ff2c5f90f14041.png
categories: LeetCode刷题
date: 2020-08-07 22:09:02
updated:
tags:
	- 二叉树
	- 递归
	- DFS
---





> 题目链接：[112. 路径总和](https://leetcode-cn.com/problems/path-sum/)



# 题解：



> 简单递归！



## 题目简述：

给定一个二叉树和一个目标值，问是否有从根节点到叶子节点的和为目标值的线路！

## 题解：

**递归：**从根节点开始减，直到叶子节点判断是否为0即可，几种情况

- 根节点为空：返回`false`
- 左右子树都空：返回`!sum`
- 左右子树都不空：左边符合直接返回`true`，否则处理右边
- 左右子树一个空一个非空：放回该方向是否符合！





**注意：**

- 注释部分为分开写法
- 可以合并为最后一句：左边存在且符合直接返回，不符合继续看右边是否存在，存在则看是否符合，最终返回！



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
    bool hasPathSum(TreeNode* root, int sum) {
        if(!root) return false;
        sum -= root->val;
        if(!root->left && !root->right) return !sum;
        // if(root->left && root->right) return hasPathSum(root->left, sum) || hasPathSum(root->right, sum);
        // if(root->left) return hasPathSum(root->left, sum);
        // return hasPathSum(root->right, sum);
        return root->left && hasPathSum(root->left, sum) || root->right && hasPathSum(root->right, sum);
    }
};
```



