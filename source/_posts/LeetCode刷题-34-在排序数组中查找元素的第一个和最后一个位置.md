---
title: LeetCode刷题-34.在排序数组中查找元素的第一个和最后一个位置
author: Mr.Niu
toc: true
abbrlink: 39392
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/2ead155c241dc7841b557e7750a24927.png'
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/2ead155c241dc7841b557e7750a24927.png'
categories: LeetCode刷题
tags:
  - 二分
date: 2020-06-27 11:01:28
updated:
---









> 题目链接：[34.在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)



# 题解：



> 同样是二分！



## 题目简述：

给定一个有序数组，找到目标值出现的开始和结束位置！

## 题解：



同样是二分：目的在于找到两个端点，如下图：



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/27/b9d900f90664e006ed5e39d98f89e6d4.png)

使用 `x >= target`可以找到满足该条件的最后一个数，即左端点！

使用`x <= target`可以找到满足该条件的最后一个数， 即右端点！



**具体情况：**

- 若数组为空，直接返回-1
- 若左端点不存在，即不存在`target`直接返回-1
- 否则，重新二分该数组找到右端点，最后返回。



**注意：** 二分左端点时，`r`的选取可以是`nums.size() - 1`，也可以是上次二分的结果。复杂度不影响！



## AC代码：



```c++
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        if(nums.empty()) return {-1, -1};
        int l = 0, r = nums.size() - 1;
        while(l < r){
            int mid = l + r >> 1;
            if(nums[mid] >= target) r = mid;
            else l = mid + 1;
        }
        if(nums[r] != target) return {-1, -1};
        int L = r;
        l = 0, r = nums.size() - 1;
        while(l < r){
            int mid = l + r + 1 >> 1;
            if(nums[mid] <= target) l = mid;
            else r = mid - 1;
        }
        return {L, r};
    }
};
```



