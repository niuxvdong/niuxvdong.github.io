---
title: LeetCode刷题-21.合并两个有序链表
author: Mr.Niu
toc: true
abbrlink: 12870
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/19/c6f35d417d6c223f5f915eb3aec4c2e1.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/19/c6f35d417d6c223f5f915eb3aec4c2e1.png
categories: LeetCode刷题
tags:
  - 链表
  - 二路归并
date: 2020-06-21 19:55:40
updated:
---















> 题目链接：[21.合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)



# 题解：



> 经典的二路归并算法，温习一下吧！



## 题目简述：

给定两个有序链表，合并为一个有序链表！

## 题解：



二路归并：由于原序列都是有序的，所以每次选取头部的最小值即可将所有节点按从小到大排好。

嗯，不需要做过多解释！



**和数组不一样的一点** ：最后某个链表非空时，可以直接指针指向非空链表的头结点即可，数组还需要进行循环去一个一个链接。



## AC代码：



```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        auto dummy = new ListNode(-1), l = dummy;
        while(l1 && l2){
            if(l1->val < l2->val) l->next = l1, l = l1, l1 = l1->next;
            else l->next = l2, l = l2, l2 = l2->next; 
        }
        if(l1) l->next = l1;
        if(l2) l->next = l2;
        return dummy->next;
    }
};
```




