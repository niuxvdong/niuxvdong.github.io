---
title: 每日一题之LeetCode-92. 反转链表 II反转链表
author: ITNXD
toc: true
abbrlink: 25333
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 链表
date: 2021-03-19 09:47:32
updated:
---



 





# 一、反转链表I









> 题目链接：[https://www.acwing.com/problem/content/33/](https://www.acwing.com/problem/content/33/)





## 1、解法一





**如下方简图：**

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@182b2233ca636988b9d269312b590afb555e7d0c/2021/03/19/c593a61eccabce51a8d7688741514caa.png)



**迭代：**

- 维护两个一前一后的指针a, b即可，每次将 b 指向 a 完成反转
- 然后 a, b 两个指针都后移一步，由于b指向a会导致`b->next`丢失，所以先将其保存下来作为c指针
- 直到b指针为空，再将头结点指向空，返回a节点即可



**时间复杂度**：`O(n)​`

**空间复杂度**：`O(1)`



**AC代码：**



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
    ListNode* reverseList(ListNode* head) {
        if(!head || !head->next) return head;
        auto a = head, b = a->next;
        while(b){
            auto c = b->next;
            b->next = a;
            a = b, b = c;
        }
        head->next = NULL;
        return a;
    }
};
```



## 2、题解二



**递归：**

- 可使用`reverseList` 函数，该函数内部通过**递归**实现，该函数可以翻转一个链表，并返回新链表的头节点`tail`，也就是原链表的尾节点。
- 因此，我们可以让他反转除了头结点以外的节点
- 然后让反转后新链表的尾结点也就是`head->next`指向头结点完成整条链表反转
- 最后将整条新链表的尾结点即`head`指向空即可!



**时间复杂度**：`O(n)​`

**空间复杂度**：总共递归 n 层，系统栈的空间复杂度是 `O(n)`​





**AC代码：**





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
    ListNode* reverseList(ListNode* head) {
        if(!head || !head->next) return head;
        auto tail = reverseList(head->next);
        head->next->next = head;
        head->next = NULL;
        return tail;
    }
};
```











# 二、反转链表II







>题目链接：[https://leetcode-cn.com/problems/reverse-linked-list-ii/](https://leetcode-cn.com/problems/reverse-linked-list-ii/)



## 1、题解



> 这是反转链表I的变形，指定了区间的反转！



**如下方图示：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/03/83914c72b2707151b8a59258ab3aecc1.png)



**迭代：**

**思路同上方的反转链表I**，同样是维护一前一后两个指针b，c即可！

1. 由于左端点的位置情况有两种，若为头结点则反转后头结点不再是头结点，若不为头结点，则反转后该头结点还是头结点；所以，我们新建虚拟头结点指向头结点，即可将该两种情况统一处理！
2. 先找到左端点的上一个端点a，即循环m - 1次即可
3. 通过a节点找到需要维护的b，c节点
4. 让c节点指向b节点，然后两节点同步后移一步
5. 由于c指向b会导致`c->next`丢失，所以先将其保存下来作为d指针
6. 循环n - m次即可完成该区间的反转
7. 然后完成上图的两个节点的**乱指**！即左端点`a->next`指向右端点的下一个节点c，左端点的上一个节点a指向右端点b即可！





**时间复杂度**：`O(n)​`

**空间复杂度**：`O(1)`



## 2、AC代码







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
        for(int i = 0; i < m - 1; i ++) a = a ->next;
        auto b = a->next, c = b->next;
        for(int i = 0; i < n - m; i ++){
            auto d = c->next;
            c->next = b;
            b = c, c = d;
        }
        a->next->next = c, a->next = b;
        return dummy->next;
    }
};
```

