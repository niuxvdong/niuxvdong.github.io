---
title: 每日一题之LeetCode 61.旋转链表
author: ITNXD
toc: true
abbrlink: 29975
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 链表
date: 2021-03-27 11:25:06
updated:
---







> 题目链接：[LeetCode 61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)



# 一、题解





**题目大意：**



给定一个链表，将链表每个节点都向后移动k个位置！



**思路：**



1. k的数非常大，所以可以和链表长度去个模！
2. 由于`k %= n`，所以以防除0问题，先在最开始判断一下，若链表长度为0，则直接返回即可
3. 将每个节点后移k位，即将链表后k个节点移到链表开头即可
4. 指针向后移动`n - k - 1`次即可走到后k个节点的上一个节点
5. 然后处理一下指针指向即可！





**时间复杂度：** `O(n)`

**空间复杂度：** `O(1)`



# 二、AC代码





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
    ListNode* rotateRight(ListNode* head, int k) {
        if(!head) return head;
        int n = 0;
        for(auto p = head; p; p = p->next) n ++;
        k %= n;
        if(!k) return head;
        auto p = head;
        for(int i = 0; i < n - k - 1; i ++) p = p->next;
        auto tail = p;
        while(tail->next) tail = tail->next;
        tail->next = head, head = p->next, p->next = NULL;
        return head;
    }
};
```

