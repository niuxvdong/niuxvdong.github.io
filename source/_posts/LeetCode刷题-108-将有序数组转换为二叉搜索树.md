---
title: LeetCode刷题-108. 将有序数组转换为二叉搜索树
author: Mr.Niu
toc: true
abbrlink: 58650
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/bc11dc8e10269721ba17b477dc5d315d.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/05/bc11dc8e10269721ba17b477dc5d315d.png
categories: LeetCode刷题
date: 2020-08-05 19:24:51
updated:
tags:
	- 二叉树搜索树
	- 递归
	- DFS
---







> 题目链接：[108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)



# 题解：



> 构造二叉搜索树问题！



## 题目简述：

将有序数组构造为高度平衡的二叉搜索树！

## 题解：

仍然从区间角度去考虑递归子问题来解决！

**思路：**

对于有序数组，二叉搜索树的根节点一定是区间的中心，即 `l + r >> 1`

- 根节点：`root = new TreeNode(nums[mid])`
- 左子树区间：`l, mid - 1`
- 右子树区间：`mid + 1, r`
- `l > r`区间为空返回`NULL`



**关于高度平衡即左右子树高度差小于一的证明：**

很明显，和二分一样，高度一定是Log<sub>2</sub> (n + 1)上取整的！

关于更加数学化的证明：[参考 y 总证明！点击这里！](https://www.acwing.com/solution/content/196/)



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
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
    TreeNode* build(vector<int>& nums, int l, int r){
        if(l > r) return NULL;
        int mid = l + r >> 1;
        auto root = new TreeNode(nums[mid]);
        root->left = build(nums, l, mid - 1);
        root->right = build(nums, mid + 1, r);
        return root;
    }
};
```



