---
title: LeetCode刷题-92. 反转链表 II
author: Mr.Niu
toc: true
abbrlink: 56919
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/6283e591b36a3c002dbb019a33a87ee6.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/6283e591b36a3c002dbb019a33a87ee6.png
categories: LeetCode刷题
tags:
  - 链表
date: 2020-08-03 18:06:21
updated:
---





> 题目链接：[92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)



# 题解：



> 又是链表操作题，记得要画图哦！



## 题目简述：



将一个链表的`m ~ n`位置进行翻转！





## 题解：



**思路：**

- 将`m ~ n`进行指针翻转
- 将`m`指向`n`的下一位， 将`a`指向`n`



**如下图：**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/03/20f1752170e4257c6804c9349844c55c.png)



**具体来说：**

- 首先找到`m`的前一个位置`a`
- 让`b`指向`m`， `c`指向`m`的下一位，`t`指向`c`的下一位
- 接下来将`m ~ n`进行指针翻转，即让`c`指向`b`
- 然后`b c`指针顺次后移
- 最后将该链如上图所示，连起来！懒得解释了，看图吧！





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
    ListNode* reverseBetween(ListNode* head, int m, int n) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        auto a = dummy;
        for(int i = 0; i < m - 1; i++) a = a->next;
        auto b = a->next, c = b->next;
        for(int i = 0; i < n - m; i++){
            auto t= c->next;
            c->next = b;
            b = c, c = t;
        }
        auto t = a->next;
        a->next = b;
        t->next = c;
        return dummy->next;
    }
};
```



