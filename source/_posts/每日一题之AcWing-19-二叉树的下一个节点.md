---
title: 每日一题之AcWing 19.二叉树的下一个节点
author: ITNXD
toc: true
abbrlink: 43631
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 树的遍历
  - 二叉树
  - 链表
date: 2021-03-28 11:27:05
updated:
---





> 题目链接：[AcWing 19. 二叉树的下一个节点  ](https://www.acwing.com/problem/content/31/)





# 一、题解





**题目大意：**



给定一个二叉树中的一个节点，找到使用中序遍历的下一个节点！



**思路：**

分情况讨论即可！

1. 若当前节点有右子树（例如下图的C），则表示当前节点的左子树已经遍历完毕，则只要去找他的右子树得最左边节点就是该节点的后继节点（即B）
2. 若当前节点没有右子树（例如下图的D），则表示当前节点左子树已经遍历完毕，需要沿着父节点找，找第一个是其父节点左儿子的节点，例如当前节点是D，则第一个满足是其父节点左儿子的节点是F，则C的father就是D的后继，即F是D的后继。





**简图如下：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/29/376c4c695431432777b3d9575e3deb6d.png)



**时间复杂度**：`O(n)`

**空间复杂度**：`O(1)`





# 二、AC代码





**参考代码：**



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode *father;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL), father(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* p) {
        while(p->right){
            p = p->right;
            while(p->left) p = p->left;
            return p;
        }
        while(p->father && p->father->right == p) p = p->father;
        return p->father;
    }
};
```

