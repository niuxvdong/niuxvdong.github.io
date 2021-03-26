---
title: 每日一题之LeetCode 82.删除排序链表中的重复元素 II
author: ITNXD
toc: true
abbrlink: 24068
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 链表
date: 2021-03-25 15:47:59
updated:
---





> 题目链接：[LeetCode 82. 删除排序链表中的重复元素 II  ](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)







# 一、题解





同样又是一道熟悉的链表题目：题目要求将有重复的节点全部删掉！









**这道题还是比较好想的：**



如下图：

为了统一该链表，防止第一个节点就是重复节点导致，头结点的改变，我们使用虚拟头结点指向该头节点，实现统一操作！

1. 用一个指针`p`指向当前节点，另一个指针`q`指向下一个节点
2. 接下来，`q`从`p->next`开始，一直走到第一个与`p->next`不同元素的位置，这时有两种情况：
   1. `p->next->next == q`：则说明`p`后面没有重复元素，直接后移`p = p->next`
   2. `p->next->next != q`：则说明`p`后面有重复元素，则跳过这一堆重复元素，p直接指向q即可，`p->next = q`
3. 最后返回`dummy->next`即可





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@262e99faf8d56b2d42a30462f72af62840f880ee/2021/03/25/161038bc9cc2562618f2d2640432e918.png)











# 二、AC代码



**参考代码：**



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
    ListNode* deleteDuplicates(ListNode* head) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        auto p = dummy;
        while(p->next){
            auto q = p->next;
            while(q && p->next->val == q->val) q = q->next;
            if(p->next->next == q) p = p->next;
            else p->next = q;
        }
        return dummy->next;
    }
};
```

