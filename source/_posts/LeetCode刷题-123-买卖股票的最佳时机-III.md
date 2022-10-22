---
title: LeetCode刷题-123. 买卖股票的最佳时机 III
author: Mr.Niu
toc: true
abbrlink: 15796
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/41fc6dda45cbb9874306187ea2afff58.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/41fc6dda45cbb9874306187ea2afff58.png
categories: LeetCode刷题
tags:
  - 动态规划
  - 贪心
  - 前后缀分解
date: 2020-08-08 23:14:39
updated:
---









> 题目链接：[123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)



# 题解：



> 上一题的再次进阶版！



## 题目简述：

给定一个序列，从中选择两次交易（保证：后者大于前者，并且下一次交易前必须把当前股票卖出），求其最大值作为股票的最大利润！

上上一题只能交易一次，上一题可以交易多次，这题只能交易两次！

## 题解一：较好理解的

**贪心 + 动态规划：**

**贪心解释：** 将区间按每个点分为两部分，每部分计算一下只交易一次的最大收益，最终答案就是每个点分为的两部分和的最大值！

**状态表示：** `l`和`r`数组分别表示区间为`0 ~ i`和`i + 1 ~ n - 1`交易一次的最大收益！

**状态计算：**

- 对于`l[i]`：就是前面`0 ~ i - 1`的最小值和当前值的差
- 对于`r[i]`：就是后面`i + 2 ~ n - 1`的最大值与当前值的差

**最终答案：** `max(res, l[i] + r[i])`



**注意：**

- `l`和`r`数组的区间范围



**时间复杂度：** `O(n)` 

**空间复杂度：** `O(n)`

## AC代码一：



```c++
// i为第一段的末尾下标 0 ~ i  i + 1 ~ n - 1

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if(!n) return 0;
        vector<int> l(n + 1), r(n + 1);
        for(int i = 1, minv = prices[0]; i < n; i++){
            l[i] = max(l[i - 1], prices[i] - minv);
            minv = min(minv, prices[i]);
        }
        for(int i = n - 3, maxv = prices[n - 1]; i >= 0; i--){
            r[i] = max(r[i + 2], maxv - prices[i + 1]);
            maxv = max(maxv, prices[i + 1]);
        }
        int res = 0;
        for(int i = 0; i < n; i++) res = max(res, l[i] + r[i]);
        return res;
    }
};
```



## 题解二：不太好理解的



**思路算法和上面解法一完全一致，只是做了优化减少了一层循环！**

**很明显：上面的更加直观明显，建议看上面题解一！**

题解一是枚举的是分界点，本题解枚举的分界点的含义是第**二次交易的起点！**

为了方便区间改变了一下：

- 左边范围为`0 ~ i - 1`
- 右边范围为`i ~ n - 1`



所以，将该点作为第二次交易起点的情况就是：该点之前的最大交易和以该点为交易起点的最大交易的和取最大值！

左边值为：`l[i]`，右边值为：`maxv - prices[i]`

所以最终答案为：`max(res, l[i] + maxv - prices[i])`

**注意：**

- 唯一变化，枚举点的含义变了！
- `minv maxv`初值选取要写对



**时间复杂度：** `O(n)` 

## AC代码二：



```c++
// i为第二段的起始位置下标 0 ~ i - 1  i ~ n - 1

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> l(n + 1);
        for(int i = 1, minv = INT_MAX; i < n; i++){
            l[i] = max(l[i - 1], prices[i - 1] - minv);
            minv = min(minv, prices[i - 1]);
        }
        int res = 0;
        for(int i = n - 1, maxv = 0; i >= 0; i--){
            res = max(res, l[i] + maxv - prices[i]);
            maxv = max(maxv, prices[i]);
        }
        return res;
    }
};

```

