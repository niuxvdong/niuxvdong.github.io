---
title: AcWing-41.包含min函数的栈
author: Mr.Niu
toc: true
abbrlink: 50257
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@abcb0ee99d47116058305ed624d2b854c301e126/2021/02/06/a748bd6cf1ce9794a730ee2ac026ca16.png'
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@abcb0ee99d47116058305ed624d2b854c301e126/2021/02/06/a748bd6cf1ce9794a730ee2ac026ca16.png'
categories:
  - AcWing
tags:
  - AcWing
  - 栈
  - 单调栈
date: 2020-03-23 20:11:57
updated:
---







## 首先来首歌曲来放松一下吧！

{% meting "1293886117" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[41. 包含min函数的栈](https://www.acwing.com/problem/content/90/)



## 题目背景：



> 来源：剑指Offer,《算法竞赛进阶指南》, 美国 [Hulu公式](https://baike.baidu.com/item/HULU/5441661?fr=aladdin) 面试题！
>
> 两种做法：详细见下文！

#### 题目描述



设计一个支持push，pop，top等操作并且可以在O(1)时间内检索出最小元素的堆栈。

- push(x)–将元素x插入栈中
- pop()–移除栈顶元素
- top()–得到栈顶元素
- getMin()–得到栈中最小元素

#### 样例

```
MinStack minStack = new MinStack();
minStack.push(-1);
minStack.push(3);
minStack.push(-4);
minStack.getMin();   --> Returns -4.
minStack.pop();
minStack.top();      --> Returns 3.
minStack.getMin();   --> Returns -1.
```



---



## 题目分析：

### 题目要求：



在普通栈的基础上实现一个可以实时获得最小值的 `最小栈` ，而且使得复杂度达到O(1)的效果！

### 解题思路：



第一想法：暴力即可，其他操作都是O(1)的，只有获得最小值的操作不好弄，暴力的话直接扫描一遍，复杂度为O(N)，很明显不合题意！



好了，正确解法开始！



解法一：维护两个栈，一个为普通栈，一个为保存前i个数最小值的栈！

最小栈的第i个位置永远保存前i个位置的最小值！

最小栈的实现：

- push时：为空直接压入，不为空只需要判断当前栈顶与当前值得大小取一下min放入栈中即可！
- pop时：直接删除即可！
- top时：返回普通栈栈顶！
- getMin时：直接返回栈顶即可！



解法二：维护两个栈，一个为普通栈，一个为单调栈！

单调栈就是：简而言之：就是具有单调性的栈！



单调栈的实现：

- 当我们向栈中压入一个数时，如果该数 <= 单调栈的栈顶元素，则将该数同时压入单调栈中；
- 否则，不压入，这是由于栈具有先进后出性质，所以在该数被弹出之前，栈中一直存在一个数比该数小，所以该数一定不会被当做最小数输出。
- 当我们从栈中弹出一个数时，如果该数等于单调栈的栈顶元素，则同时将单调栈的栈顶元素弹出。
- 单调栈由于其具有单调性，所以它的栈顶元素，就是当前栈中的最小数。

其实两种做法很类似的，但解法二用来单调栈的思想！

可以参考一下的讲解或许会更加清楚！

> [yxc大神的题解，点击这里！](https://www.acwing.com/solution/AcWing/content/749/)
>
> [yxc大神的视频讲解，点击这里！](https://www.acwing.com/activity/content/problem/content/362/1/)

## 题解：



### 解法一：维护前i个数的最小值栈





```c
class MinStack {
public:
    /** initialize your data structure here. */
    stack<int> stk, stk_min;

    MinStack() {

    }

    void push(int x) {
        stk.push(x);
        if(stk_min.size()) x = min(x, stk_min.top());
        stk_min.push(x);
    }

    void pop() {
        stk.pop();
        stk_min.pop();
    }

    int top() {
        return stk.top();
    }
    int getMin() {
        return stk_min.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */
```



---



### 解法二：维护一个单调栈





```c
class MinStack {
public:
    /** initialize your data structure here. */
    stack<int> stk, stk_min;

    MinStack() {

    }

    void push(int x) {
        stk.push(x);
        if(stk_min.empty() || x <= stk_min.top()) stk_min.push(x);
    }

    void pop() {
        if(stk_min.top() == stk.top()) stk_min.pop();
        stk.pop();
    }

    int top() {
        return stk.top();
    }

    int getMin() {
        return stk_min.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */

```

