---
title: 每日一题之LeetCode 173.二叉搜索树迭代器
author: ITNXD
toc: true
abbrlink: 23863
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 二叉树
  - 树的遍历
date: 2021-03-28 11:26:39
updated:
---







> 题目链接：[LeetCode 173. 二叉搜索树迭代器](https://leetcode-cn.com/problems/binary-search-tree-iterator/)





# 一、题解





**题目大意：**



实现一个中序遍历的二叉树！但是要通过迭代器实现！即完成下面三个方法！



**思路：**



其实就是二叉树中序遍历非递归写法的拆分！

二叉树非递归中序遍历写法：[LeetCode的94题就是！](https://www.itnxd.cn/posts/16898.html)

1. 构造器处理第一部分
2. next处理下一部分，然后还得处理和构造器相同的部分
3. hasNext则可以直接判断栈是否为空即可







**时间复杂度：** `O(n)`

**空间复杂度：** `O(h)`，h为树的高度





# 二、AC代码







**参考代码：**







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
class BSTIterator {
public:
    stack<TreeNode*> stk;
    BSTIterator(TreeNode* root) {
        while(root){
            stk.push(root);
            root = root->left;
        }
    }
    
    int next() {
        auto root = stk.top();
        stk.pop();
        int val = root->val;
        root = root->right;
        while(root){
            stk.push(root);
            root = root->left;
        }
        return val;
    }
    
    bool hasNext() {
        return stk.size();
    }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator* obj = new BSTIterator(root);
 * int param_1 = obj->next();
 * bool param_2 = obj->hasNext();
 */
```

