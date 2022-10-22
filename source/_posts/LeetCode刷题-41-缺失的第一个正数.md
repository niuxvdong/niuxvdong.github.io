---
title: LeetCode刷题-41.缺失的第一个正数
author: Mr.Niu
toc: true
abbrlink: 50883
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/777a4a3670cc50eafae809ce48667231.png'
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/777a4a3670cc50eafae809ce48667231.png'
categories: LeetCode刷题
tags:
  - 排序
date: 2020-07-05 09:17:41
updated:
---















> 题目链接：[41.缺失的第一个正数]( https://leetcode-cn.com/problems/first-missing-positive/)



# 题解：



> 一种排序算法的应用？



## 题目简述：



给定一组未排序数组，找出其中没有出现过的最小正整数！

**要求：时间 O(n) 空间 O(1)**

## 题解：

由于时间为O(n)限制，不能直接使用`sort`再扫描，现在给出一种排序：



1.  小于等于0，大于 n 的数字不用管（因为我们要正数的排序，排序的最后一个数应该为n，所以大于n的不用管）
2. 从前向后扫描，保证每个数字出现在正确位置上，即 5 应该跑到下标为 4 的位置，即`nums[i]`要跑到下标为`nums[i] - 1`的位置
3. 扫描一遍以后，整个数组1 ~ n的数字已经正确归位，所以只需要从前向后再扫描一遍没出现过的数字即可，即`nums[i] != i + 1`。若全部匹配，则说明是第 `n +1  ` 个数没有出现



**具体解释：**



遇到1 ~ n的就进行归位，将该数放到该放的位置，使用swap进行交换，交换完成后一个数已经归位，交换过来的数若不是它该待的正确位置，继续进行交换，直到当前位置为正确数字或遇到不在1 ~ n范围内的数结束当前位置。



**时间复杂度：** 别看有两层循环，但是两层循环加起来最多执行`n`次，因为`while`循环一次就会归位一个该归位的数（1 ~ n），所以时间复杂度为`O(n)`

**空间复杂度：** 没有使用额外空间，所以空间复杂度为 `O(1)`



## AC代码：



```c++
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for(int i = 0; i < n; i++)
            while(nums[i] > 0 && nums[i] <= n && nums[i] != nums[nums[i] - 1])
                swap(nums[i], nums[nums[i] - 1]);

        for(int i = 0; i < n; i++)
            if(nums[i] != i + 1)
                return i + 1;

        return n + 1;
    }
};
```



