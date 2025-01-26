---
title: LeetCode刷题-82. 删除排序链表中的重复元素 II
author: Mr.Niu
toc: true
abbrlink: 1807
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/23/cefcc9dc36381f381d68ea297dba3759.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/23/cefcc9dc36381f381d68ea297dba3759.png
categories: LeetCode刷题
tags:
  - 链表
date: 2020-07-25 11:41:38
updated:
---

























> 题目链接：[82. 删除排序链表中的重复元素 II]( https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)



# 题解：



> 链表的操作题，感觉对这类链表操作还不太熟练，多做做吧！



## 题目简述：

给定一个有序链表，只要出现重复元素，就将该段重复元素删去（注意：不是删的只留一个，而是该段全删）

## 题解：

**类似双指针做法：**

一个指针`p->next`指向已扫描位置的下一个位置，一个指针`q`指向第一个与上一个指针值不一样的位置。(直到与上一个指针不同是为止！)

**此时有两种情况：**

- 两指针相距一即`p->next->next == q`：即待扫描该位后面无重复元素，已扫描链表后移`p = p->next`
- 两指针相距大于一即`p->next->next != q`：即待扫描的该位后面有重复元素，跳过重复一段，直接指向第一个不重复元素`p`，即`p->next = q`



**注意：**

- 由于要从没有扫描的下一个位置开始，为了方便，建立虚拟头结点，此时未扫描部分对第一个节点的处理就和其他节点统一了，最终返回`dummy->next`



**时间复杂度**：`O(n)`

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
    ListNode* deleteDuplicates(ListNode* head) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        auto p = dummy;
        while(p->next){
            auto q = p->next->next;
            while(q && p->next->val == q->val) q = q->next;
            if(p->next->next == q) p = p->next;
            else p->next = q;
        }
        return dummy->next;
    }
};
```



