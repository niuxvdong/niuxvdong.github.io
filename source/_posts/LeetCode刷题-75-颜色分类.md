---
title: LeetCode刷题-75. 颜色分类
author: Mr.Niu
toc: true
abbrlink: 3416
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/22/ef40da7a8d735fcde83f7ef515453a0d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/22/ef40da7a8d735fcde83f7ef515453a0d.png
categories: LeetCode刷题
tags:
  - 双指针
  - 三指针
date: 2020-07-22 22:26:43
updated:
---























> 题目链接：[75. 颜色分类]( https://leetcode-cn.com/problems/sort-colors/)



# 题解：



> 通过双指针思路将区间划分开，并进行维护区间操作！



## 题目简述：



给定0、1、2三个数字的乱序序列，按照0，1，2的顺序将相同数字排到一起！

要求不使用排序函数！

## 题解：

**思路：双指针，其实是三指针，`i`和`j` 从前往后扫描，`k`从后往前扫描，维护下面三个区间**

- `0 ~ j - 1`：保证都是0
- `j ~ i - 1`：保证都是1
- `nums.size() - 1 ~ k + 1`：保证都是2



**`i`和`k`相遇即排好序！**

**`nums[i]`的三种情况：**

- `nums[i] == 0`：`swap(nums[j++], nums[i++])` 交换后`i`位置为1，可以直接往后走，即`i++`
- `nums[i] == 1`：该位置属于为1的区间，直接`i`后移，即`i++`
- `nums[i] == 2`：`swap(nums[i], nums[k--])` 交换后`i`位置未知，不可以直接往后走



**时间复杂度：** `O(n)`

## AC代码：



```c++
class Solution {
public:
    void sortColors(vector<int>& nums) {
        for(int i = 0, j = 0, k = nums.size() - 1; i <= k;){
            if(nums[i] == 0) swap(nums[i++], nums[j++]);
            else if(nums[i] == 2) swap(nums[i], nums[k--]);
            else i++;
        }
    }
};
```



