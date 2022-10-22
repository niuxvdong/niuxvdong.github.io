---
title: LeetCode刷题-19.删除链表的倒数第N个节点
author: Mr.Niu
toc: true
abbrlink: 29380
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/7d49a6c699d55e139247be551281b761.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/7d49a6c699d55e139247be551281b761.png
categories: LeetCode刷题
tags:
  - 链表
date: 2020-06-19 22:33:24
updated:
---











> 题目链接：[19.删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)



# 题解：



> 链表的基本操作！



## 题目简述：

如题，删除链表倒数第n个节点！

## 题解：

题目说，要使用一遍扫描解决？？？我想了想，这是不可能的，最起码都得两遍。。。



或许人家是说O(N)的时间复杂度。。。



**具体做法：**

1. 同样使用一个虚拟节点 值为`-1`做头节点，便于操作
2. 先计算节点总数，包括虚拟的节点
3. 然后计算一下应该循环到哪里进行删除（即要找到要删元素的上一个元素进行删除）
4. 如` 1->2->3->4->5`删除倒数第二个，加了一个虚拟节点，所以现在应该为` -1->1->2->3->4->5`，即下标要遍历到总结点数-倒数的数-1，即`k - n - 1`即可，这时，p指向要删的倒数第n个节点的上一个节点
5. 这时，直接`p->next = p->next->next;`，删除完毕！
6. 返回`dummy->next`



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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // ListNode* dummy = new ListNode(-1);
        auto dummy = new ListNode(-1);
        dummy->next = head;

        int k = 0;
        for(auto p = dummy; p; p = p->next) k++;

        auto p = dummy;
        for(int i = 0; i < k - n - 1; i++) p = p->next;
        p->next = p->next->next;

        return dummy->next;
    }
};
```



