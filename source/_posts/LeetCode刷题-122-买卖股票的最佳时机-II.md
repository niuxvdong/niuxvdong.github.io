---
title: LeetCode刷题-122. 买卖股票的最佳时机 II
author: Mr.Niu
toc: true
abbrlink: 13431
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/09/9778ec76241cd6cfb0c525f4a2128bb2.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/09/9778ec76241cd6cfb0c525f4a2128bb2.png
categories: LeetCode刷题
tags:
  - 贪心
date: 2020-08-08 23:14:26
updated:
---







> 题目链接：[122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)



# 题解：



> 上一题的进化版！



## 题目简述：

给定一个序列，从中选择多次两点（保证：后者大于前者，并且下一次交易前必须把当前股票卖出），求其最大值作为股票的最大利润！

上一题只能交易一次，这题可以交易多次！

## 题解：

**贪心：**类似上一题

**首先给出结论：** 一个区间的交易可以拆分为单天的交易！

**证明：**

```
假设i,j,k三点，i < j < k，对于区间[i, j],[j, k]，以及[i, k]，可以发现：
他们的收益分别为 j - i + k - j 和 k - i
会发现是一样的！
所以：一个区间的收益，可以简化为每一天的收益和！
```



**要想使得股票收益最大，我们只需要将单天收益为正值的累加起来即可！即`res += max(0, prices[i] - prices[i - 1])`**





**时间复杂度**：`O(n)`

## AC代码：



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int res = 0;
        for(int i = 1; i < prices.size(); i++)
            res += max(0, prices[i] - prices[i - 1]);
        return res;
    }
};
```



