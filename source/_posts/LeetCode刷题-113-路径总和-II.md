---
title: LeetCode刷题-113. 路径总和 II
author: Mr.Niu
toc: true
abbrlink: 47363
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/07/4df0e41dbfa192fb82847bac28a66ed1.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/07/4df0e41dbfa192fb82847bac28a66ed1.png
categories: LeetCode刷题
date: 2020-08-07 22:09:15
updated:
tags:
	- 二叉树
	- 递归
	- DFS
---





> 题目链接：[113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)



# 题解：



> 和上一题类似，简单递归！



## 题目简述：

和上一题类似，多加了一个记录路径的要求！

## 题解：

**递归：**

- 根节点为空直接返回
- 将当前节点加入路径
- 答案条件：到了叶子结点并且`sum`减到了0
- 左子树不空递归左子树
- 右子树不空递归右子树
- 将当前加点删掉，恢复状态



**由于要走遍所有情况，所以和上一题相比少了一个都不空的情况！**



**时间复杂度**：遍历所有节点为`O(n)`，记录所有路径为`O(n)`，总复杂度为`O(n^2)`

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
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> pathSum(TreeNode* root, int sum) {
        dfs(root, sum);
        return res;
    }
    void dfs(TreeNode* root, int sum){
        if(!root) return;
        path.push_back(root->val);
        sum -= root->val;
        if(!root->left && !root->right){
            if(sum == 0) res.push_back(path);
        }
        if(root->left) dfs(root->left, sum);
        if(root->right) dfs(root->right, sum);
        path.pop_back();
    }
};
```



