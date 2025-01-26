---
title: LeetCode刷题-88. 合并两个有序数组
author: Mr.Niu
toc: true
abbrlink: 33104
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/98d5bf28bc4294fbaed30835ef623e13.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/98d5bf28bc4294fbaed30835ef623e13.png
categories: LeetCode刷题
tags:
  - 双指针
  - 数组
date: 2020-07-25 11:43:06
updated:
---









> 题目链接：[88. 合并两个有序数组]( https://leetcode-cn.com/problems/merge-sorted-array/)



# 题解：



> 挺有意思的题，使用原数组多余空间来存储！



## 题目简述：

给定两个有序序列，第一个序列的总长度为两序列之和，多出来的长度为0，即空的！要求使用原数组（可以放得下两数组的数据）不开辟空间进行有序存储！

## 题解：



嗯，如果从前向后扫描，会将第一个数组的前面覆盖掉！

既然第一个数组后面是空的，何不利用起来，先往第一个数组最后从后向前放数据，这样就不会造成覆盖问题！



**具体：**从后向前扫描，较大的放到第一个数组最后，依次向前放



双指针？一个指针`i`指向第一个数组最后一个元素，一个指针`j`指向第二个数组最后一个元素，然后从后向前扫描即可！

- `nums1[i] > nums2[j]`：`nums1[k--] = nums1[i--];`
- `nums1[i] <= nums2[j]`：`nums1[k--] = nums1[i--];`
- 结束条件：其中一个数组扫描完了



**最后：**两种情况

- 第二个数组没扫描完，则从后向前依次放到第一个数组
- 第一个数组没扫描完，则不用操作，想想，是不是？因为剩下的空间和第一个数组空间一致，并且，第一个数组本来就是有序的，所以他们所在的位置都是在正确位置上，不需要处理！





**时间复杂度**：`O(n)`

## AC代码：



```c++
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int k = n + m - 1;
        int i = m - 1, j = n - 1;
        while(i >= 0 && j >= 0){
            if(nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
        while(j >= 0) nums1[k--] = nums2[j--];
    }
};
```



