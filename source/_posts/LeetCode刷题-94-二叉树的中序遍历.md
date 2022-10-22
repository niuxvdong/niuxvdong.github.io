---
title: LeetCode刷题-94. 二叉树的中序遍历
author: Mr.Niu
toc: true
abbrlink: 16898
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/03/0b3055f519f8b35907802af52b89c5d7.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/03/0b3055f519f8b35907802af52b89c5d7.png
categories: LeetCode刷题
tags:
  - 二叉树
  - 中序遍历
date: 2020-08-03 18:15:09
updated:
---







> 题目链接：[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)



# 题解：



> 开始进入二叉树的世界！



## 题目简述：

给定一个二叉树，返回中序遍历序列！

## 题解：

**中序遍历：即左根右的顺序去遍历！**



**递归：**

- 从根节点开始遍历
- 遍历左子树
- 访问当前根节点
- 遍历右子树
- 递归到空节点返回



**时间复杂度**：`O(n)`



## AC代码一：递归实现

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
    vector<int> res;
    vector<int> inorderTraversal(TreeNode* root) {
        dfs(root);
        return res;
    }
    void dfs(TreeNode* root){
        if(!root) return;
        dfs(root->left);
        res.push_back(root->val);
        dfs(root->right);
    }
};
```



## AC代码：非递归实现（模板）



**非递归：即借助栈来实现！**



**思想：**

- 先将左子树都压入栈中
- 出栈栈顶
- 指向当前栈顶的右子树

**终止条件：** 栈空并且当前节点为空



**时间复杂度**：`O(n)`

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
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stk;
        while(root || stk.size()){
            while(root){
                stk.push(root);
                root = root->left;
            }
            root = stk.top();
            stk.pop();
            res.push_back(root->val);
            root = root->right;
        }
        return res;
    }
};
```

