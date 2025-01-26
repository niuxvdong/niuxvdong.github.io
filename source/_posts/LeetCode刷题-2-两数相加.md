---
title: LeetCode刷题-2.两数相加
author: Mr.Niu
toc: true
abbrlink: 1127
categories: LeetCode刷题
tags:
  - 链表
  - 模拟
date: 2020-06-12 22:09:58
updated:
top_img: https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/57ea9cb8f94698210de69d9742d81d04.png
cover: https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/57ea9cb8f94698210de69d9742d81d04.png
---











> 题目链接：[2.两数相加](https://leetcode-cn.com/problems/add-two-numbers/)



# 题解：



> 链表的简单操作！模拟数字相加。



## 题目简述：



两个倒序链表：例如：234的链表为 4 -> 3 -> 2，给定两个倒序链表，返回两个链表正序相加后的倒序链表！



## 题解：



由于给出的顺序是倒序，可以直接像普通加法从个位开始加起，进位即可。

初始化时可以设置一个虚节点：`ListNode* l3 = new ListNode(-1);`，返回时直接返回`l3->next`即可。

用 `t`表示进位，while退出后若仍有进位，则链表末尾补 1 ；







## AC代码1：



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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* l3 = new ListNode(-1);
        ListNode* res = l3;
        int t = 0;
        while(l1 || l2){
            // 链表结束，之后全部置为0
            int n1 = l1 ? l1->val : 0;
            int n2 = l2 ? l2->val : 0;
            int sum = n1 + n2 + t;
            // t 表示进位
            t = sum / 10;
            res->next = new ListNode(sum % 10);
            res = res->next;
            if(l1) l1 = l1->next;
            if(l2) l2 = l2->next;
        }
        // 最高位有进位：
        if(t) res->next = new ListNode(1);
        // 返回除了第一个-1之外的节点
        return l3->next;
    }
};
```





## AC代码2：



> 写法更加简洁：直接使用 `t`进行累加即可！



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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* l3 = new ListNode(-1);
        ListNode* res = l3;
        int t = 0;
        while(l1 || l2 || t){
            if(l1) t += l1->val, l1 = l1->next;
            if(l2) t += l2->val, l2 = l2->next;
            res->next = new ListNode(t % 10);
            res = res->next;
            t /= 10;
        }
        return l3->next;
    }
};
```

