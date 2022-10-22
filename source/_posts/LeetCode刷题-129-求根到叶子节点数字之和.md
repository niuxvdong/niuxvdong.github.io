---
title: LeetCode刷题-129. 求根到叶子节点数字之和
author: Mr.Niu
toc: true
abbrlink: 59814
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/6156e307a3f1005e38762fff222fa879.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/6156e307a3f1005e38762fff222fa879.png
categories: LeetCode刷题
tags:
  - 二叉树
  - 递归
  - DFS
date: 2020-08-08 23:16:05
updated:
---





> 题目链接：[129. 求根到叶子节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)



# 题解：



> 简单递归求解二叉树问题！



## 题目简述：

给定一棵二叉树，求出所有从根节点到叶子节点构成的数的和！

## 题解：

**简单DFS：**



- 从根节点开始搜索
- 当前节点为空直接返回
- 当前节点的左右儿子都不存在时即为叶子节点，进行累加当前和后返回
- 搜索左子树和右子树，值为`sum * 10 + val`





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
    int res;
    int sumNumbers(TreeNode* root) {
        dfs(root, 0);
        return res;
    }
    void dfs(TreeNode* root, int sum){
        if(!root) return;
        if(!root->left && !root->right){
            res += sum * 10 + root->val;
            return;
        }
        dfs(root->left, sum * 10 + root->val);
        dfs(root->right, sum * 10 + root->val);
    }
};
```



