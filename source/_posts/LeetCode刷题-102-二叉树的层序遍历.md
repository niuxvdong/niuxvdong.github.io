---
title: LeetCode刷题-102. 二叉树的层序遍历
author: Mr.Niu
toc: true
abbrlink: 30623
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/05/b62661809721f498c6281815e1c045c3.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/05/b62661809721f498c6281815e1c045c3.png
categories: LeetCode刷题
date: 2020-08-05 19:22:59
updated:
tags:
	- 二叉树
	- 层序遍历
	- BFS
---







> 题目链接：[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)



# 题解：



> 二叉树层序遍历，很巧的思路！



## 题目简述：





给定一个二叉树，返回一个层序遍历的二维vector!



## 题解：

**很明显是一个BFS：**

**思路：**

- 宽搜进行遍历每一层
- 遍历当前层时将下一层全部入队即可，循环次数就是当前层的节点数



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
    vector<vector<int>> levelOrder(TreeNode* root) {
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
        return res;
    }
};
```



