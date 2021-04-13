---
title: 每日一题之AcWing 68.0到n-1中缺失的数字
author: ITNXD
toc: true
abbrlink: 20480
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 二分
date: 2021-04-06 15:15:50
updated:
---







> 题目连接：[AcWing 68. 0到n-1中缺失的数字](https://www.acwing.com/problem/content/64/)





# 一、题解







**题目大意：**



0 到 n - 1 的数依次升序排列，其中有某个数不在该序列中！要求找出该数！



**思路：**



很明显，是一道二分题目！

但是最关键的是要找到如何二分，即这道题的二段性，也就是前一段满足一个条件而后一段满足另一个条件！



还是很容易找到一个规律：

- 目标数的左边，都是下标和数值相等的
- 目标数的右边，都是下标和数值不相等的

因此我们可以利用二段性，二分出第一段最后一点，或者是第二段的第一个点！

本题的答案当然就是第二段的第一个点，即第一个下标和数值不相等的点！



还可以做一下特判，如果该序列的最后一个数 nums[n - 1] 与下标 n - 1 相同，直接返回 n！





**时间复杂度：** `O(logn)`

**空间复杂度：** `O(1)`











# 二、AC代码



**参考代码：**



```c++
class Solution {
public:
    int getMissingNumber(vector<int>& nums) {
        if(nums.empty()) return 0;
        int n = nums.size();
        if(nums[n - 1] == n - 1) return n;
        int l = 0, r = n - 1;
        while(l < r){
            int mid = l + r >> 1;
            if(nums[mid] != mid) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```

