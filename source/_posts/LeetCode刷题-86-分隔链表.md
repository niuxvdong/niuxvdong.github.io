---
title: LeetCode刷题-86. 分隔链表
author: Mr.Niu
toc: true
abbrlink: 44795
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/aaed621192835a8a668c671d5e6192cb.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/aaed621192835a8a668c671d5e6192cb.png
categories: LeetCode刷题
tags:
  - 链表
date: 2020-07-25 11:42:41
updated:
---









> 题目链接：[86. 分隔链表]( https://leetcode-cn.com/problems/partition-list/)



# 题解：



> 又是一道链表题，自己做又写成了死循环。。。
>
> 一定要画图去做！



## 题目简述：

给定一个无序链表，给定一个目标值，将小于目标值的节点放到大于等于目标值的左边！

## 题解：

很明显：要将链表一分为二，一部分放小于目标值，一部分放大于目标值。



**具体思路：如下图**



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/c1571c1738339abedaeaeb7f001ea8ae.png)





**遇到小的放到一个链表，遇到大的放到另一个链表，最后将小的链表尾指向大的链表头，再将大的链表的末尾指向空即可！**



**注意**：为了防止两个链表头找不到，一定要预先设置两个头`lh, rh`，并设置虚拟头结点，否则`lt, rt`后面的指向会乱，而且会构成死循环！（我好像就错到了这里）



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
    ListNode* partition(ListNode* head, int x) {
        auto lh = new ListNode(-1), rh = new ListNode(-1);
        auto lt = lh, rt = rh;
        
        for(auto p = head; p; p = p->next){
            if(p->val < x) lt = lt->next = p;
            else rt = rt->next = p;
        }
        lt->next = rh->next;
        rt->next = NULL;
        return lh->next;
    }
};
```



