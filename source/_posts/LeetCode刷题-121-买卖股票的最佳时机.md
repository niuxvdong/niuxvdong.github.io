---
title: LeetCode刷题-121. 买卖股票的最佳时机
author: Mr.Niu
toc: true
abbrlink: 45780
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/bb0987ae6c2569776383d2b5826c2ae9.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/bb0987ae6c2569776383d2b5826c2ae9.png
categories: LeetCode刷题
tags:
  - 贪心
date: 2020-08-08 23:14:04
updated:
---









> 题目链接：[121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)



# 题解：



> 简单的贪心问题！



## 题目简述：

给定一个序列，从中选择两点（保证：后者大于前者），求其最大值作为股票的最大利润！

## 题解：

**贪心：** `res`表示`0 ~ i`区间的最大股票收益，`minv`表示该区间的最小值。

求最大值，则当前区间的最小值和当前区间的最后一个值的差自然就是该区间的最大股票收益了，遍历一遍该数组即可得到最大股票收益！

- 得到`1 ~ i - 1`的最小值`minv`
- 做差即可：`price[i] - minv`



**时间复杂度**：`O(n)`

## AC代码：



```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int res = 0, minv = INT_MAX;
        for(int i = 0; i < prices.size(); i++){
            res = max(res, prices[i] - minv);
            minv = min(minv, prices[i]);
        }
        return res;
    }
};
```



