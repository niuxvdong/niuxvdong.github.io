---
title: LeetCode刷题-107. 二叉树的层次遍历 II
author: Mr.Niu
toc: true
abbrlink: 61896
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/05/b050b4181064ebb1df3d5b04248302b0.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/05/b050b4181064ebb1df3d5b04248302b0.png
categories: LeetCode刷题
date: 2020-08-05 19:24:27
updated:
tags:
	- 二叉树
	- 层序遍历
	- BFS
---









> 题目链接：[107. 二叉树的层次遍历 II]( https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)



# 题解：



> 和第102道题一样！



## 题目简述：

二叉树层次遍历，要求先遍历最底层！

## 题解：

**嗯，按照正常顺序层序遍历，最后将答案进行反转即可！**

正常层序遍历思路参见第102道题题解！使用博客搜索框搜索即可！



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
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        vector<vector<int>> res;
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);
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
            res.push_back(level);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```



