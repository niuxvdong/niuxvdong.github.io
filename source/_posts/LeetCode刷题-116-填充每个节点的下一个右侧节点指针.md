---
title: LeetCode刷题-116. 填充每个节点的下一个右侧节点指针
author: Mr.Niu
toc: true
abbrlink: 54940
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/91a43b4c53fe836327920615e5908a4e.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/91a43b4c53fe836327920615e5908a4e.png
categories: LeetCode刷题
date: 2020-08-07 22:09:50
updated:
tags:
	- 链表
	- 二叉树
	- BFS
---





> 题目链接：[116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)



# 题解：



> 类似链表的操作题！



## 题目简述：

给定一个二叉树，该二叉树每个节点多一个`next`指针用来横着指向下一个节点！

要求：空间`O(1)`

## 题解：

**类似BFS：**

该题要求空间`O(1)`，所以使用很简单的栈实现的BFS就不能使用了！

**思路：**

- 若下一层存在，则通过上一层的每个节点`p`来链接下一层之间的关系：
  - 先连接上一层根节点的左儿子为其右儿子，即 `p->left->next = p->right`
  - 若上一层有后一个节点：（即此时为两个父亲四个儿子正中间的情况），即`p->right->next = p->next->left`
- 接下来，走到下一层，即`level = level->left`



**时间复杂度**：每个节点遍历一次为`O(n)`

## AC代码：



```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if(!root) return root;
        auto level = root;
        while(level->left){
            for(auto p = level; p; p = p->next){
                p->left->next = p->right;
                if(p->next) p->right->next = p->next->left;
            }
            level = level->left;
        }
        return root;
    }
};
```



