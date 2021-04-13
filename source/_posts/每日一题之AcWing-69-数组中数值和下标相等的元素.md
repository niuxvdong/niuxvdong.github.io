---
title: 每日一题之AcWing 69.数组中数值和下标相等的元素
author: ITNXD
toc: true
abbrlink: 31655
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 二分
date: 2021-04-08 15:17:09
updated:
---



> 题目连接：[AcWing 69. 数组中数值和下标相等的元素](https://www.acwing.com/problem/content/65/)







# 一、题解





**题目大意：**



一个单调递增序列，有**一些数**是和下标匹配的，找出任意一个该数！





**思路：**



很明显，还是二分，关键点，二分的核心：需要找到二段性是啥！



从目标答案该数向左向右分析，可以得到：

- 该数左边，每个数都比下标要小
- 该数右边，每个数都比下标要大或相等



因此可以通过二分找到第二段第一个满足条件的即可，即第一个下标和数值匹配的数即可！



**时间复杂度： **`O(logn)`

**空间复杂度： **`O(1)`







# 二、AC代码



**参考代码：**



```c++
class Solution {
public:
    int getNumberSameAsIndex(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while(l < r){
            int mid = l + r >> 1;
            if(nums[mid] >= mid) r = mid;
            else l = mid + 1;
        }
        if(nums[r] == r) return r;
        return -1;
    }
};
```

