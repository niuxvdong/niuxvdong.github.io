---
title: 'LeetCode刷题-53. 最大子序和 '
author: Mr.Niu
toc: true
abbrlink: 60904
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/4d3b2a9df4542eb96846cea00a763082.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/4d3b2a9df4542eb96846cea00a763082.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-07-07 14:09:12
updated:
---













> 题目链接：[53. 最大子序和]( https://leetcode-cn.com/problems/maximum-subarray/)



# 题解：



> 动态规划应用！



## 题目简述：



给定一个数组，找一个连续区间，使得该区间和最大！

## 题解一：



**同样使用闫式DP分析法：**

**状态表示：** `f[i]`表示以`i`位置结尾的区间的最大和

**状态计算：** `f[i] = max(f[i - 1] + nums[i], nums[i])`

**初始化：** `f[0] = nums[0]，res = nums[0]`



**稍做解释：**



`f[i]`

- `nums[i]`
- `i - 1 ~ i`,`i - 2 ~ i`......`0 ~ i` ，将最后一位`i`抛掉以后，剩下的其实就是`f[i - 1]`，此种情况的和为 `f[i - 1] + nums[i]`
- 最终就是：`f[i] = max(f[i - 1] + nums[i], nums[i])`



**时间复杂度**：`O(n)`

**空间复杂度**：`O(n)`

## AC代码一：



```c++
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        vector<int> f(nums.size());
        int res = nums[0];
        f[0] = nums[0];
        for(int i = 1; i < nums.size(); i++){
            f[i] = max(f[i - 1] + nums[i], nums[i]);
            res = max(res, f[i]);
        }
        return res;
    }
};
```





## 题解二：优化空间占用



会发现都是前后的关系：`f[i - 1] f[i]`，那么完全可以使用`last`变量来代替，而不去使用数组！



**注意**：`res` 初始化为 极小值！



**时间复杂度**：`O(n)`

**空间复杂度**：`O(1)`



## AC代码二：





```c++
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int res = INT_MIN;
        for(int i = 0, last = 0; i < nums.size(); i++){
            // last = nums[i] +  max(last, 0);
            last = max(last + nums[i], nums[i]);
            res = max(res, last);
        }
        return res;
    }
};
```

