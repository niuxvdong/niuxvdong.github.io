---
title: LeetCode刷题-110. 平衡二叉树
author: Mr.Niu
toc: true
abbrlink: 58905
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/ca2c9a2473322564ccef43453b8ffbd3.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/ca2c9a2473322564ccef43453b8ffbd3.png
categories: LeetCode刷题
date: 2020-08-05 19:25:37
updated:
tags:
	- 平衡二叉树
	- 递归
	- DFS
---







> 题目链接：[110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)



# 题解：



> 平衡二叉树的判断！



## 题目简述：

给定一棵二叉树判断是否是平衡二叉树！

## 题解：

**平衡二叉树定义：所有 左右子树高度差不超过1**

**思路：根据定义来求解**

- 求每个左右子树的高度，判断高度差是否大于1即可，即`abs(lh - rh) > 1`
- 二叉树高度，同之前的求高度问题，左右高度最大值加一即可，即`max(lh, rh) + 1`
- 其实就是递归求二叉树高度问题多了一个变量来存储是否差值超过了1！



**时间复杂度**：每个节点遍历一次，为`O(n)`

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
    bool res;
    bool isBalanced(TreeNode* root) {
        res = true; dfs(root);
        return res;
    }
    int dfs(TreeNode* root){
        if(!root) return 0;
        int lh = dfs(root->left), rh = dfs(root->right);
        if(abs(lh - rh) > 1) res = false;
        return max(lh, rh) + 1;
    }
};
```



