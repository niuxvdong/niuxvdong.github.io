---
title: LeetCode刷题-117. 填充每个节点的下一个右侧节点指针 II
author: Mr.Niu
toc: true
abbrlink: 18637
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/c33d17ef06cd5cb22550f3b37bd3ce38.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/07/c33d17ef06cd5cb22550f3b37bd3ce38.png
categories: LeetCode刷题
date: 2020-08-07 22:10:02
updated:
tags:
	- 二叉树
	- 链表
	- BFS
---







> 题目链接：[117. 填充每个节点的下一个右侧节点指针 II](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/)



# 题解：



> 上一题的进阶版，二叉树变得更加的普通！



## 题目简述：

给定一棵非常普通的二叉树，每个节点多一个`next`指针，我们需要将其指向同一行紧挨着的下一个节点！

要求空间`O(1)`

## 题解：

不要求空间则可以通过简单BFS实现！

**和上一题思想类似：** 不过这个题我么无法直接通过上一层来找到下一层的对应关系，但是我们可以对下一层进行构造横向链表！

- 若下一层存在：构建虚拟头结点以及尾指针，进行尾插法形成下一层单链表
  - 若上一层节点左儿子存在，则尾插法插入该节点
  - 若上一层节点右儿子存在，则尾插法插入该节点
- 走向下一层，`cur = head->next`，由于`head`为虚拟头节点







**时间复杂度**：同样每个节点遍历一次，为`O(n)`

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
        auto cur = root;
        while(cur){
            auto head = new Node(-1), tail = head;
            for(auto p = cur; p; p = p->next){
                if(p->left) tail = tail->next = p->left;
                if(p->right) tail = tail->next = p->right;
            }
            cur = head->next;
        }
        return root;
    }
};
```



