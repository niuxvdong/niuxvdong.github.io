---
title: LeetCode刷题-61. 旋转链表
author: Mr.Niu
toc: true
abbrlink: 20286
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/09/ad2e2254ab79cd26beee82cbf73f5951.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/09/ad2e2254ab79cd26beee82cbf73f5951.png
categories: LeetCode刷题
tags:
  - 链表
date: 2020-07-20 21:42:55
updated:
---















> 题目链接：[61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)



# 题解：



> 直接移动



## 题目简述：

将一个链表向后移动k个位置！

## 题解一：暴力



傻傻的移动k次即可，每次将倒数第一个节点指向最前面的头结点，倒数第二个节点指向空，完成一个交换即可！



由于k太大，会导致超时，所以请看题解二！



## TLE代码：



```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        if(head == NULL) return head;
        for(int i = 0; i < k; i++){
            auto l = dummy;
            while(l->next->next) l = l->next;
            auto t = l->next;
            l->next = NULL;
            auto s = dummy->next;
            dummy->next = t;
            t->next = s;
        }
        return dummy->next;
    }
};
```



## 题解二：取余优化



如果k是节点数的倍数，那么会发现我们做了倍数次重复操作。。。

所以直接对节点数取余，然后就是我们实际需要移动的次数！



**具体操作：**

- 先遍历链表，计算节点数以及找到最后一个节点
- 若k是节点数的整数倍，直接返回原来的表头，即不需要移动，都是重复操作
- 否则，找到前`len - k`和后`k`位置，将二者交换即可！
- 简单的链表连接操作，不说了！



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
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        auto dummy = new ListNode(-1), l = dummy;
        dummy->next = head;
        if(head == NULL) return head;

        int len = 0;
        ListNode* tail;
        while(l->next){
            l = l->next; tail = l; len++;
        } 
        k %= len;
        if(k == 0) return head;
        
        l = dummy;
        for(int i = 0; i < len - k; i++) l = l->next;
        tail->next = dummy->next;
        dummy->next = l->next;
        l->next = NULL;
        return dummy->next;
    }
};
```



