---
title: LeetCode刷题-26.删除排序数组中的重复项
author: Mr.Niu
toc: true
abbrlink: 20075
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/08c7a474b9fcdadc62d0fc56730cef80.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/19/08c7a474b9fcdadc62d0fc56730cef80.png
categories: LeetCode刷题
tags:
  - 数组
  - 双指针
date: 2020-06-21 23:11:20
updated:
---























> 题目链接：[26.删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array//)



# 题解：



> 嗯，简单题。



## 题目简述：

删除有序数组长度重复项，返回不重复元素的长度！

## 题解：



用两个指针一个指针`t`指向不重复元素的末尾，一个指针`i`指向当前扫描的位置，如果当前扫描位置和不重复元素的末尾相同，则继续后移，找到不一样的插到不重复元素的下一个位置。

最后返回长度，此处`t`指向下标，长度为`t + 1`.



注意：这样写需要特判`nums`为空的情况！

## AC代码：



```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size() == 0) return 0;
        int t = 0;
        for(int i = 0; i < nums.size();){
            while(i < nums.size() && nums[i] == nums[t]) i++;
            if(i < nums.size()) nums[++t] = nums[i];
        }
        return t + 1;
    }
};

// 这样一写，更加简洁：
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size() == 0) return 0;
        int t = 0;
        for(int i = 0; i < nums.size(); i++)
            if(nums[i] ！= nums[t])
                nums[++t] = nums[i];
        return t + 1;
    }
};
```



