---
title: LeetCode刷题-124. 二叉树中的最大路径和
author: Mr.Niu
toc: true
abbrlink: 20454
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/2bcff4775e0cd158fd49248c9d78cbe9.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/2bcff4775e0cd158fd49248c9d78cbe9.png
categories: LeetCode刷题
tags:
  - 二叉树
  - 递归
  - DFS
date: 2020-08-08 23:14:51
updated:
---









> 题目链接：[124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)



# 题解：



> 很是巧妙的递归求解路径问题！



## 题目简述：

非空二叉树返回最大路径和！路径定义为从任意一个节点出发到任意一个节点序列！

## 题解：

**思考：** 如何将所有路径遍历全面（注意：路径是任意点到任意点，不一定是要经过根节点或者叶子节点）！

- 对于一条路径，该路径的最高点是一定的，所以我们来枚举它的最高点！



**对于该最高点的路径有几种情况**：`res = max(res, left + root->val + right)`

- 根节点
- 根节点和左子树最大值
- 根节点和右子树最大值
- 根节点和左右子树最大值





**对于计算左右子树的最大值：**

 `int dfs(TreeNode* root)`：计算当前根节点的最大路径

- `return root->val + max(left, right)`：返回根节点和左右子树最大值的和
- `left = max(0, dfs(root->left))`：保证往下走是可以增大路径的，和0取一下`max`。若为负值，即不走当前路径
- `right = max(0, dfs(root->right))`：同理









**时间复杂度**：每个节点遍历一次，为`O(n)`

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
    int res;
    int maxPathSum(TreeNode* root) {
        res = INT_MIN;
        dfs(root);
        return res;
    }
    int dfs(TreeNode* root){
        if(!root) return 0;
        int left = max(0, dfs(root->left));
        int right = max(0, dfs(root->right));
        res = max(res, left + root->val + right);
        return root->val + max(left, right);
    }
};
```



