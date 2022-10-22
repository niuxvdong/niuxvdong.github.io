---
title: LeetCode刷题-24.两两交换链表中的节点
author: Mr.Niu
toc: true
abbrlink: 28774
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/18/71c8e00671678eeed46f918fd9cf6e0e.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/18/71c8e00671678eeed46f918fd9cf6e0e.png
categories: LeetCode刷题
tags:
  - 链表
date: 2020-06-21 21:14:13
updated:
---













> 题目链接：[24.两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)



# 题解：



> 链表的指针切换问题！



## 题目简述：

给定一个链表，两两相邻的做一下交换。

## 我的错误题解：



**我的代码如下：** `l`指向 2 再指向 1 ，此时2到3已经断了，会发现1和2已经成环了，会形成死循环！



我看了好久，都没发现2到3已经断了，还以为`head->next->next`为3了，懵逼了！



**以此为戒：做链表题一定要画好图，看清哪里断了，哪里没断！**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/21/ea939ed3419513945f6226db2e773d7c.png)

## 错误代码：



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
    ListNode* swapPairs(ListNode* head) {
        auto dummy = new ListNode(-1), l = dummy;
        while(head){
            l->next = head->next; l = head->next;
            l->next = head; l = head;
            head = head->next->next;   
        }
        return dummy->next;
    }
};
```





## 题解：



使用两个指针，（类似双指针解法），一个指向带翻转的第一个，一个指向第二个。如下图：



第二步一定要在第三步之前，否则下一个节点就找不到了！



- `p`永远指向下一组节点的上一个节点，`a、b`永远指向下一组节点。
- 要严格保证后面有两个节点或以上才可以，`p->next && p->next->next`，即这两个节点非空！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/21/2e36441ffbccf9e87472cd90383b3274.png)

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
    ListNode* swapPairs(ListNode* head) {
        auto dummy = new ListNode(-1), p = dummy;
        dummy->next = head;
        while(p->next && p->next->next){
            auto a = p->next, b = a->next;
            p->next = b;
            a->next = b->next;
            b->next = a;
            p = a;
        }
        return dummy->next;
    }
};
```

