---
title: LeetCode刷题-105. 从前序与中序遍历序列构造二叉树
author: Mr.Niu
toc: true
abbrlink: 53963
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/05/0ed2492c7a86445b18ce271eea9949e0.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/05/0ed2492c7a86445b18ce271eea9949e0.png
categories: LeetCode刷题
date: 2020-08-05 19:23:54
updated:
tags:
	- 二叉树
	- 前序遍历
	- 中序遍历
	- 递归
---







> 题目链接：[105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)



# 题解：



> 二叉树的前中序构造二叉树！



## 题目简述：

给定二叉树的前中序遍历来构造一颗二叉树！

## 题解：

**必会知识：**

- 前序遍历的第一个节点一定是根节点
- 中序遍历可以借助前序遍历得到的根节点将区间分为左右子树两部分
- 看明白了吧，按照左右子树区间进行递归即可！



**思路：**

- 由于我们要从中序遍历找前序遍历得到的根节点，所以事先将中序遍历的节点和下标关系存储于哈希表，使得可以在O(1)时间查询到下标
- 根节点：前序遍历的第一个节点，`root = new TreeNode(preorder[pl])`
- 当没有节点时即`pl > pr`，返回`NULL`
- `TreeNode* build(vector<int>& preorder, vector<int>& inorder, int pl, int pr, int il, int ir)`，参数分别为：前序，中序，前序起始下标，前序终止下标，中序起始下标，中序终止下标
- `k`为中序遍历根节点下标，创建一个根节点，左右子树递归得到
- 左子树下标：` pl + 1, k - 1 - il + pl + 1, il, k - 1`
- 右子树下标：`k - 1 - il + pl + 1 + 1, pr, k + 1, ir`
- 下标计算见下图：

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/07/80ab36e8217256824ea0dddad60bffb9.png)





**时间复杂度**：由于哈希表的应用使得复杂度降到了`O(n)`

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
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for(int i = 0; i < inorder.size(); i++) pos[inorder[i]] = i;
        return build(preorder, inorder, 0, preorder.size() - 1, 0, inorder.size() - 1);
    }
    TreeNode* build(vector<int>& preorder, vector<int>& inorder, int pl, int pr, int il, int ir){
        if(pl > pr) return NULL;
        auto root = new TreeNode(preorder[pl]);
        int k = pos[root->val];
        root->left = build(preorder, inorder, pl + 1, k - 1 - il + pl + 1, il, k - 1);
        root->right = build(preorder, inorder, k - 1 - il + pl + 1 + 1, pr, k + 1, ir);
        return root;
    }
};
```



