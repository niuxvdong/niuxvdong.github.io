---
title: LeetCode刷题-35.搜索插入位置
author: Mr.Niu
toc: true
abbrlink: 24432
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/ecfd34a7e91fda4bf46196524b181e38.png'
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/ecfd34a7e91fda4bf46196524b181e38.png'
categories: LeetCode刷题
tags:
  - 二分
date: 2020-06-27 11:01:50
updated:
---

























> 题目链接：[35.搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)



# 题解：



> 同样是二分！



## 题目简述：

给一个有序数组，查找目标值的位置，若数组中存在，返回该下标，否则返回目标值应该插入的位置！

## 题解：

**继续二分：**

找到二分条件：`x >= target`，右端满足，左端不满足！

如果最终该目标值越界，即`nums[r] < target`，直接返回`r + 1`或`nums.size()`。



**会发现**：其实直接使用右端点`r = nums.size()`二分即可！最后也可以不用判断是否越界！	

## AC代码：



```c++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while(l < r){
            int mid = l + r >> 1;
            if(nums[mid] >= target) r = mid;
            else l = mid + 1;
        }
        if(nums[r] < target) return r + 1;
        return r;
    }
};

// 或者这样：
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size();
        while(l < r){
            int mid = l + r >> 1;
            if(nums[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```



