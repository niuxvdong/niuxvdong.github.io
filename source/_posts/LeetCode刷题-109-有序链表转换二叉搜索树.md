---
title: LeetCode刷题-109. 有序链表转换二叉搜索树
author: Mr.Niu
toc: true
abbrlink: 11732
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/05/194bad4776d7dd2f04978342a28a66d3.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/05/194bad4776d7dd2f04978342a28a66d3.png
categories: LeetCode刷题
date: 2020-08-05 19:25:17
updated:
tags:
	- 二叉搜索树
	- 链表
	- 递归
	- DFS
---







> 题目链接：[109. 有序链表转换二叉搜索树]( https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)



# 题解：



> 同样是构造二叉搜索树！链表比较麻烦一点！



## 题目简述：

将有序链表构造为高度平衡的二叉搜索树！

## 题解：

链表构造二叉树会麻烦一点！

**思路：**总思路和数组相同，递归解决，仍是区间角度考虑！

与数组不同，这个无法使用正常的区间，由于是链表，只能使用一个指针指向区间起点！

- 为了找到节点数，需要遍历一次求长度
- 长度为1直接返回当前节点（也是为了处理边界问题）
- 找到中间节点：我们应该扎到左子树区间的终点`cur`，这样可以通过改点找到右子树的起点`cur->next->next`，循环`n / 2 - 1`次即可，保证左边比右边多一（偶数时）或者相等（奇数时），可以处理边界条件（当节点为2时，防止左右子树起点都不正确）
- 先处理右子树，在处理左子树，否则左子树的区间长度就不是一半了，变成整个区间了，不正确！先处理右子树，处理完将`cur->next = NULL`将区间分为两段`head ~ cur， cur->next->next ~ NULL`
- 最后返回当前根节点`root`，区间为空返回`NULL`



**时间复杂度**：递归`logn`层，每层为`O(n)`，总复杂度为`O(nlogn)`

## AC代码：



```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
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
    TreeNode* sortedListToBST(ListNode* head) {
        if(!head) return NULL;
        int n = 0;
        for(auto p = head; p; p = p->next) n++;
        if(n == 1) return new TreeNode(head->val);
        auto cur = head;
        for(int i = 0; i < n / 2 - 1; i++) cur = cur->next;
        auto root = new TreeNode(cur->next->val);
        root->right = sortedListToBST(cur->next->next);
        cur->next = NULL;
        root->left = sortedListToBST(head);
        return root;
    }
};
```



