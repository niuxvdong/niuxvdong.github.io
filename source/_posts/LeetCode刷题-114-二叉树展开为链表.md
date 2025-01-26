---
title: LeetCode刷题-114. 二叉树展开为链表
author: Mr.Niu
toc: true
abbrlink: 34497
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/870f10ccb8cee4adc444d19cac52b1ad.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/870f10ccb8cee4adc444d19cac52b1ad.png
categories: LeetCode刷题
date: 2020-08-07 22:09:28
updated:
tags:
	- 链表
	- 二叉树
---





> 题目链接：[114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)



# 题解：



> 找规律？



## 题目简述：

讲一个二叉树变为一个链表，具体查看题目链接！

## 题解：

**思路：**

- 若当前点存在左子树，则将左子树右链插入当前节点的右儿子
- 否则，当前节点走到右子树



就是每次将从左上到右下方向的链插入到该父节点的右链！



**时间复杂度**：外层循环遍历每个节点一次为`O(n)`，内存循环会将每个右链遍历一次，每个节点最多被遍历两次，为`O(n)`

## AC代码：



```c++
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
    void flatten(TreeNode* root) {
        while(root){
            auto p = root->left;
            if(p){
                while(p->right) p = p->right;
                p->right = root->right;
                root->right = root->left;
                root->left = NULL;
            }
            root = root->right;
        }
    }
};
```



