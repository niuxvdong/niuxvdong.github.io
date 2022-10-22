---
title: LeetCode刷题-101. 对称二叉树
author: Mr.Niu
toc: true
abbrlink: 63008
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/05/3e9bc829444dc7b9db2eea96e1c19a60.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/05/3e9bc829444dc7b9db2eea96e1c19a60.png
categories: LeetCode刷题
date: 2020-08-05 19:22:27
updated:
tags:
	- 二叉树
	- 递归
	- DFS
---











> 题目链接：[101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)



# 题解：



> 简单递归！



## 题目简述：

给定一棵二叉树判断是否是对称的！

## 题解一：递归

对于根节点来说，对称意味着左子树和右子树一致。

对于左子树和右子树，即保证左子树的左子树和右子树的右子树一致并且左子树的右子树和右子树的左子树一致即可！

则我们可以递归分解为子问题来解决！



**递归DFS：**

- `dfs(p->left, q->right) && dfs(p->right, q->left);`

- 最终答案：`dfs(root->left, root->right)`
- 递归出口：和前几道题一样：
  - `!p && !q`：都空返回`true`
  - `!p || !q || p->val != q->val`：一个空一个非空，或者都不空但值不相同返回`false`



**注意：**

- 根节点为空，直接返回`true`







**时间复杂度**：每个节点只被遍历一次，为`O(n)`

## AC代码一：



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
    bool isSymmetric(TreeNode* root) {
        if(!root) return true;
        return dfs(root->left, root->right);
    }
    bool dfs(TreeNode* p, TreeNode* q){
        if(!p && !q) return true;
        if(!p || !q || p->val != q->val) return false;
        return dfs(p->left, q->right) && dfs(p->right, q->left);
    }
};
```





## 题解二：非递归





**非递归写法：即用两个栈来模拟正常的中序遍历和反着的中序遍历（右根左）！**



**注意点：**

- `while`条件为`lc || rc || left.size()`
- 内部`while`条件为`lc && rc`，左的往左走，右的往右走
- 退出`while`的判断为`lc || rc`，退出循环的情况一定是都空（不需要处理）或者是一个空一个不空（需要处理，无法对称）
- 值不相同，无法对称
- 左的往右走，右的往左走



**时间复杂度**：每个节点只被遍历一次，为`O(n)`



## AC代码二：





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
    bool isSymmetric(TreeNode* root) {
        if(!root) return true;
        stack<TreeNode*> left, right;
        auto lc = root->left, rc = root->right;
        while(lc || rc || left.size()){
            while(lc && rc){
                left.push(lc), lc = lc->left;
                right.push(rc), rc = rc->right;
            }
            if(lc || rc) return false;
            lc = left.top(), rc = right.top();
            left.pop(), right.pop();
            if(lc->val != rc->val) return false;
            lc = lc->right, rc = rc->left;
        }
        return true;
    }
};
```

