---
title: LeetCode刷题-100. 相同的树
author: Mr.Niu
toc: true
abbrlink: 37006
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/03/2a0bb4739b0b124882beb4e63af8f2e4.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/03/2a0bb4739b0b124882beb4e63af8f2e4.png
categories: LeetCode刷题
tags:
  - 递归
  - DFS
  - BFS
date: 2020-08-03 18:16:50
updated:
---







> 题目链接：[100. 相同的树]( https://leetcode-cn.com/problems/same-tree/)



# 题解：



> 简单判断两颗二叉树是否相同！



## 题目简述：

给定两颗二叉树，判断是否相同！





## 题解一：DFS



**两树相同，即对应的左子树相同，对应的右子树相同即可！**



**思路：**

- 左子树相同，并且右子树相同即可，即`isSameTree(p->left, q->left) && isSameTree(p->right, q->right)`
- 递归出口：
  - 两子树都空，返回`true`
  - 一子树空，一子树不空，或者两子树都不空但值不同，返会`false`

**时间复杂度：**所有节点遍历一次， 为 `O(n)`

## AC代码一：

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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(!p && !q) return true;
        if(!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```





## 题解二：BFS



**使用BFS来遍历一次两树即可！**

**思路：**

- 每次都是将同一方向的两树入队，左左右右，使得需要比较的节点为相邻状态即可！
- 若两树都空，跳过即可，`continue`
- 若一树空，一树不空，或者两树都不空但是值不一样，直接返回`false`
- 然后按照左左右右顺序入队两棵树
- 循环结束没有返回`false`，则最终返回`true`



很明显，递归更好写！



**时间复杂度**：遍历一遍所有节点，为`O(n)`

## AC代码二：



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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        queue<TreeNode*> Q;
        Q.push(p), Q.push(q);
        while(Q.size()){
            p = Q.front(), Q.pop();
            q = Q.front(), Q.pop();
            if(!q && !p) continue;
            if(!p || !q || p->val != q->val) return false;
            Q.push(p->left), Q.push(q->left);
            Q.push(p->right), Q.push(q->right);
        } 
        return true;
    }
};
```



