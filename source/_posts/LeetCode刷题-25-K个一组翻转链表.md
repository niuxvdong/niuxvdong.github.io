---
title: LeetCode刷题-25.K个一组翻转链表
author: Mr.Niu
toc: true
abbrlink: 42577
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/2217be8958644ff0aeee6c0a11233678.png'
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/2217be8958644ff0aeee6c0a11233678.png'
categories: LeetCode刷题
tags:
  - 链表
date: 2020-06-21 21:24:47
updated:
---









> 题目链接：[25.K个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)



# 题解：



> 两两一组升级为 k 个一组！
>
> 参考上一篇两两一组的解法，基本一致！



## 题目简述：

给定一个链表，k个一组进行倒序反转！

## 题解一：我的 --> 乱



**嗯，不推荐看这个，虽然我自己写的也AC了，但是着实有点乱，有点多，不条理。非常建议直接看题解二：更加清晰！**



接下来介绍一下我的乱乱的思路：

- 特判一下k为1的情况，直接返回即可

- 先通过`pt`指针循环找到第k个节点。用`b`指针指向第k个节点。用`a`指针指向第一个节点。（如果存在）
- 如果不够第k个节点，直接返回。
- 用`t`指向第二个节点， `p`指向第`k`个节点`b`
- 使用循环将第二个节点到第k个节点全部反向指一下。
- 使用`s`指针指向第k个节点到第二个节点。
- 使用`b`来反向连接
- `t->next = a`：第二个指向第一个
- `p = a`：p指向a



。。。。其实画个图还是很明白的，我懒得画了，毕竟有点乱！

**强烈建议看题解二！**



## AC代码一：（复杂，不调理，易错）



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
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(k == 1) return head;
        auto dummy = new ListNode(-1), p = dummy;
        dummy->next = head;
        bool ok = true;
        while(1){
            ListNode* a, *b;
            ListNode* t, *pt = p;
            bool ok = true;
            for(int i = 0; i < k; i++){
                if(i == 0 && pt->next) a = pt->next;
                if(pt->next) pt = pt->next, b = pt;
                else{
                    ok = false; break;
                }
            }
            if(!ok) break;
            p->next = b;
            t = a->next;
            a->next = b->next;
            for(int j = 0; j < k - 2; j++){
                auto s = t;
                for(int i = 0; i < k - j - 3; i++) s = s->next;
                b->next = s;
                b = s;
            }
            t->next = a;
            p = a;
        }
        return dummy->next;
    }
};
```



## 题解二：别人的 --> 清晰



同样：和两个一组反转类似，同样使用`a、b`指向第一个和第二个，多了一个`c`指向第三个，防止找不到下一个。

使用`q`来判断存不存在第k个节点。

内部的`for`循环用来将第1个到第k个节点反转链接。`a、b`顺次后移，如下图的第一二步：

然后让`p`指向第k个节点`a`，让外部的`c`（始终指向第一个节点，即转换后的最后一个节点）指向第k个节点的下一个，即下一组的开始。然后p节点后移，指向下一组节点的上一个节点`c`



具体如图所示：看图更易于理解！



![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/06/21/1d7853d5ea8c377dd3ca3bb280374ff7.png)

## AC代码二：（清晰）





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
    ListNode* reverseKGroup(ListNode* head, int k) {
        auto dummy = new ListNode(-1), p = dummy;
        dummy->next = head;
        while(p){
            auto q = p;
            for(int i = 0; i < k && q; i++) q = q->next;
            if(!q) break;
            auto a = p->next, b = a->next;
            for(int i = 0; i < k - 1; i++){
                auto c = b->next;
                b->next = a;
                a= b, b = c;
            }
            auto c = p->next;
            p->next = a, c->next = b;
            p = c;
        }
        return dummy->next;
    }
};
```

