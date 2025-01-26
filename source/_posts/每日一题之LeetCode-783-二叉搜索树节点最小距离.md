---
title: 每日一题之LeetCode 783.二叉搜索树节点最小距离
author: ITNXD
toc: true
abbrlink: 16877
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 树的遍历
  - 中序遍历
date: 2021-04-13 17:20:25
updated:
---







# 一、题解



**题目大意：**



求一个二叉搜索树任意两个节点数的差值的最小值！



**思路：**



我们知道，二叉搜索树的中序遍历就是一个单调序列！

因此我们可以在中序遍历的同时保存上一个节点的值，然后每次比较相邻两个数的差值即可！

处理相邻的一定是最优的，非相邻节点的差值一定比相邻节点的差值要大！



**具体：**

- 只要不是第一个遍历的节点，我们就可保存的上一个节点做一个差值，然后取一个最值即可
- 要注意，保存上一个节点的一定要在取过最值之后再保存！





**时间复杂度：** `O(n)`

**空间复杂度：** `O(h)`





# 二、AC代码



**参考代码：**

````c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:

    int last, res;
    bool first;

    void dfs(TreeNode* root){
        if(!root) return;
        dfs(root->left);
        if(!first) res = min(res, root->val - last);
        last = root->val, first = false;
        dfs(root->right);
    }

    int minDiffInBST(TreeNode* root) {
        res = INT_MAX, first = true;
        dfs(root);
        return res;
    }
};
````

