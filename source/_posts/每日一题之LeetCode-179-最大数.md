---
title: 每日一题之LeetCode 179.最大数
author: ITNXD
toc: true
abbrlink: 10647
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 排序
date: 2021-04-11 17:19:06
updated:
---





> 题目链接：[LeetCode 179. 最大数](https://leetcode-cn.com/problems/largest-number/)





# 一、题解



**题目大意：**

给定一组非负整数，我们可以任意组合，使其得到的结果最大！



**思路：**

这个题目，我的想法是分析每个数的最高位以及每一位的大小情况，包括0的特殊处理，后来发现这样处理似乎非常复杂！



正确做法：

我们可以把每个数看为一个整体，通过交换相邻两个数的位置，即可得到是否需要交换！

类似排序！

因此这样处理就很简单了，只需要定义一个排序函数处理相邻两个数的大小情况，排完序，自然就是一个最大值的情况了！



**对于前导0的处理？**

能出现前导0的情况一定是给定的数中只有0。

若不只有0，则0和其他数交换的过程中，会发现，0这个数一定会和其他数进行交换放到后方，因为其他数放到前方一定比放到后方要大！因此不可能出现前导0的情况！



因此如果最终结果第一位为0，则该序列都是0，直接返回即可！



**时间复杂度：** `O(nlogn)`

**空间复杂度：** `O(n)`











# 二、AC代码





**参考代码：**





```c++
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end(), cmp);
        string res;
        for(auto s : nums) res += to_string(s);
        if(res[0] == '0') return "0";
        return res;
    }
    static bool cmp(int a, int b){
        return to_string(a) + to_string(b) > to_string(b) + to_string(a);
    }
};
```

