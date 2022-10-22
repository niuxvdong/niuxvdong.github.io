---
title: LeetCode刷题-83. 删除排序链表中的重复元素
author: Mr.Niu
toc: true
abbrlink: 20015
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/25/061bb6b581fe08d5dfa479acb700d138.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/25/061bb6b581fe08d5dfa479acb700d138.png
categories: LeetCode刷题
tags:
  - 链表
date: 2020-07-25 11:41:50
updated:
---









> 题目链接：[83. 删除排序链表中的重复元素]( https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)



# 题解：



> 与上一个题类似，链表操作！



## 题目简述：

给定一个有序链表，将有重复的元素删掉（有重复的保留一个）

与上一题全删有点不同

## 题解：

由于重复元素可以保留一个，所以第一个节点处理和后面一样，所以这里不需要建立虚拟头结点了！

**思路：**

- 判断后面节点和当前已扫描节点形成的链表的最后一个节点是否相同
- 若相同，则跳过当前节点，指向该节点下一个节点`l->next = l->next->next`
- 若不同，则指向当前节点，即`l = l->next`



相同时，保证末尾`l`不动，`next`移动，不同时，`l`直接移到不同的节点。



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
        if(!head) return head;
        auto l = head;
        while(l->next){
            if(l->val == l->next->val) l->next = l->next->next;
            else l = l->next;
        }
        return head;
    }
};
```



