---
title: LeetCode刷题-103. 二叉树的锯齿形层次遍历
author: Mr.Niu
toc: true
abbrlink: 24916
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/fac501cb17be6741eaff1a36a0b84536.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/fac501cb17be6741eaff1a36a0b84536.png
categories: LeetCode刷题
date: 2020-08-05 19:23:13
updated:
tags:
	- 二叉树
	- 层序遍历
	- BFS
---







> 题目链接：[103. 二叉树的锯齿形层次遍历]( https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)



# 题解：



> 同样是二叉树层序遍历！



## 题目简述：

给定一个二叉树进行层序遍历，但是要保证左右，右左顺序来回交替遍历！

## 题解：



**思路：**和上一题一模一样，多了一个条件，即当层数（从0开始）为奇数时，将遍历得到的`vector`反转一次即可！



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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        int k = 0;
        while(q.size()){
            vector<int> level;
            int len = q.size();
            while(len --){
                auto t = q.front();
                q.pop();
                level.push_back(t->val);
                if(t->left) q.push(t->left);
                if(t->right) q.push(t->right);
            }
            if(k++ % 2) reverse(level.begin(), level.end());
            res.push_back(level);
        }
        return res;
    }
};
```



