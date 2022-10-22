---
title: LeetCode刷题-31.下一个排列
author: Mr.Niu
toc: true
abbrlink: 17783
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/57ea9cb8f94698210de69d9742d81d04.png'
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/57ea9cb8f94698210de69d9742d81d04.png'
categories: LeetCode刷题
tags:
  - 全排列
date: 2020-06-25 18:37:25
updated:
---



















> 题目链接：[31.下一个排列](https://leetcode-cn.com/problems/next-permutation/)



# 题解：



> 手动实现全排列函数，有点巧妙！



## 题目简述：

给定一个序列，计算出按照字典序的下一组更大的排列！

## 题解一：

直接调用`algorithm`头文件里的`next_permutation`即可！

当然，本题意在让你自己实现，而不是调用库函数，题解二将进行手动实现。

## AC代码一：



```c++
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        next_permutation(nums.begin(), nums.end());
    }
};
```





## 题解二：

**思路：**

1. 从后向前找一个降序序列，该序列的第一个元素为最大值，找到当前序列的上一个元素，即非降序位置。
2. 从后面的降序序列找一个比当前非降序位置值大的最小元素，交换二者位置。
3. 将降序序列倒序



**简图如下：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/06/25/fddbd1eb2ccc78a725021b54d36a8a4b.png)



**我的简单理解与解释：**

后面是一个降序序列，要想找到下一个字典序，必须找到降序的上一个非降序的位置，因为降序序列的位置是不能动的，该降序序列已经到了字典序的最大值，要动也是前一个位置进行变大。

变多大呢？

当然是变一个比当前值大的，而且是大的中的最小值，然后后面从小到大排列，像是加法的进位一样！





## AC代码二：





```c++
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int k = nums.size() - 1;
        while(k > 0 && nums[k - 1] >= nums[k]) k--;
        if(k <= 0){
            reverse(nums.begin(), nums.end());
        }else{
            int t = k;
            while(t < nums.size() && nums[t] > nums[k - 1]) t++;
            swap(nums[t - 1], nums[k - 1]);
            reverse(nums.begin() + k, nums.end());
        }
    }
};
```



