---
title: LeetCode刷题-106. 从中序与后序遍历序列构造二叉树
author: Mr.Niu
toc: true
abbrlink: 35952
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/328aa867ea9dc1132ebad8f8b1e010f1.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/328aa867ea9dc1132ebad8f8b1e010f1.png
categories: LeetCode刷题
date: 2020-08-05 19:24:13
updated:
tags:
	- 二叉树
	- 后序遍历
	- 中序遍历
	- 递归
---







> 题目链接：[106. 从中序与后序遍历序列构造二叉树]( https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)



# 题解：



> 二叉树的后中序构造二叉树！



## 题目简述：

给定二叉树的后中序遍历来构造一颗二叉树！

## 题解：



- 后序遍历：根节点最后遍历
- 中序遍历：通过后序遍历得到的值找到中序序列的根节点下标位置，将序列分为左右子树

与前中序一样，详细见上一道题！

这里只给出下标对应关系：

- 左子树下标：` pl, k - 1 - il + pl, il, k - 1`
- 右子树下标：` k - 1 - il + pl + 1, pr - 1, k + 1, ir`



下标计算同上一道前中序计算，参考上一题！





**时间复杂度**：同样适用哈希表将复杂度降为`O(n)`

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
    unordered_map<int, int> pos;
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for(int i = 0; i < inorder.size(); i++) pos[inorder[i]] = i;
        return build(postorder, inorder, 0, postorder.size() - 1, 0, inorder.size() - 1); 
    }
    TreeNode* build(vector<int>& postorder, vector<int>& inorder, int pl, int pr, int il, int ir){
        if(pl > pr) return NULL;
        auto root = new TreeNode(postorder[pr]);
        int k = pos[root->val];
        root->left = build(postorder, inorder, pl, k - 1 - il + pl, il, k - 1);
        root->right = build(postorder, inorder, k - 1 - il + pl + 1, pr - 1, k + 1, ir);
        return root;
    }
};
```



