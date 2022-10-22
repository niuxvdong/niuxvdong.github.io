---
title: LeetCode刷题-23.合并K个排序链表
author: Mr.Niu
toc: true
abbrlink: 57955
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/f5d5e0b0a1853639c27713d160d41792.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/f5d5e0b0a1853639c27713d160d41792.png
categories: LeetCode刷题
tags:
  - 链表
  - 堆
  - k路归并
date: 2020-06-21 19:56:39
updated:
---





















> 题目链接：[23.合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)



# 题解：



> 由二路归并变为k路归并，有优化的地方的！



## 题目简述：

k个有序链表，合并生成一个有序链表。

## 题解一：低效率（我的）



嗯，暴力去扫描每个最小值！

具体：

- `mint`：记录当前最小的节点。
- `minv`：记录当前最小节点所在的链表的下标
- 特判一下当前链表是否为空，是的话直接跳过。
- 如果能找到最小值，即`minv != -1`，则更新当前链表即最小值所在链表！
- 找不到最小值直接退出



**时间复杂度**：假设链表数组个数为 N，扫描每个最小值都要N次，所有链表元素为M的话，最终时间复杂度为 `O(N*M)`



**欢迎查看题解二：使用堆优化！**

## AC代码一：



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
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto dummy = new ListNode(-1), p = dummy;
        
        while(1){
            auto mint = new ListNode(INT_MAX);
            int minv = -1;
            for(int i = 0; i < lists.size(); i++){
                if(!lists[i]) continue; 
                if(mint->val > lists[i]->val){
                    mint = lists[i];
                    minv = i;
                }
            }
            if(minv != -1) {
                p->next = mint;
                p = p->next;
                lists[minv] = lists[minv]->next;
            }
            else break;
        }
        return dummy->next;
    }
};
```







## 题解二：高效率（别人的）



**查找最小值可以使用堆来进行优化，将查询的时间复杂度从O(N)降到O(logN)，整体时间复杂度为`O(M*logN)`**



堆，即使用优先队列`priority_queue`：

- 先将每个序列的头结点插入堆，（如果存在）
- 然后去取堆顶元素，直到去完（即最小值都已查找了一遍），若当前最小值有后继结点，则将其插入堆中。



由于使用的是`priority_queue<ListNode*>`类型，所以需要重载小括号：

- `return a->val < b->val`：即默认的降序
- `return a->val > b->val`：即升序



特殊之处：`priority_queue`的排序函数不是函数，是一个结构体，需要这样来写：



```c++
struct Cmp{
    bool operator() (ListNode* a, ListNode* b){
    	return a->val > b->val;
    }
};
```



## AC代码二：





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
    struct Cmp{
        bool operator() (ListNode* a, ListNode* b){
            return a->val > b->val;
        }
    };
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Cmp> heap;
        auto dummy = new ListNode(-1), p = dummy;
        for(auto l : lists) if(l) heap.push(l);
        while(heap.size()){
            auto t = heap.top();
            heap.pop();

            p->next = t;
            p = p->next;
            if(t->next) heap.push(t->next);
        }
        return dummy->next;
    }
};
```

