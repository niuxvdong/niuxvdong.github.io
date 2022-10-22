---
title: 每日一题之LeetCode 456.132模式
author: ITNXD
toc: true
abbrlink: 910
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 单调栈
date: 2021-03-24 15:46:33
updated:
---





> 题目链接：[LeetCode 456. 132模式](https://leetcode-cn.com/problems/132-pattern/)
>
> 这是一道**非典型**的单调栈问题！





# 一、题解





**先来简单分析一下该题：**



就是找是否有满足如下条件的数 `i < j < k 并且 nums[i] < nums[k] < nums[j]`，对于本题，我们可以从暴力角度考虑，即三层for循环，但实在是过于暴力，于是乎就产生了一个新的想法：



我们可以枚举每个`nums[i]`，对于每个`nums[i]`，判断其后是否有一个慢如如下要求的`nums[k]`：

- `nums[k] > nums[i]`
- `nums[i]` 和 `nums[k]` 之间存在一个 `nums[j]` 且 `nums[j] > nums[k]`



**对于如上要求的nums[k]，我们可以进行转化：**



即只要找到满足要求（所谓满足要求，这里是指上面的两个要求都满足）的`nums[k]`中**最大**的`nums[k]`即可！

即此时的`nums[k]`是大于`nums[i]`的数且比`num[j]`小的数中的最大的数！

而这样的数一定满足要求！

- 如果有这样的数，则本题有解，否则无解



**那么，如何求得满足要求的最大的 `nums[k]` 呢？**

这里就要用到单调栈的知识了，但求这样一个数又和单调栈的经典定义不太一样，这便是这道题的难点！



经典的单调栈的为：在一个序列中可以求出左边第一个比他小或右边第一个比他小，左边第一个比他大或右边第一个比他大的数！



很明显，则并不是一个经典的单调栈问题！



- 我们用一个栈`stk`来存储当前**未满足要求**的nums集合！我们会**惊奇的发现** ，**未满足要求的集合是单调的！** 这时，可以我们就可来维护一个未满足条件的单调栈来解题！
- 我们用一个`right_max`数组来存储当前当前数右边比他大的最大的数，即满足要求的数



若存在right_max，使得`nums[i] < right_max`，即可说明存在一个132序列，否则说明无解！





**还有一个比较容易困惑的事情：**

- 当前得到的`right_max`并不是给当前的`nums[i]`使用的，而是给下一次循环的`nums[i]`之前的`nums[i - 1]`使用的！
- 即 `num[i - 1] num[i] right_max`三者为`i,j,k`的关系，`right_max`会在下一层循环`num[i - 1]`时候会用到，这时候已经保证了`nums[j] > nums[k]`，且`nums[k]`取到最大的条件了！





**如何维护该单调栈呢？**



对于当前的`nums[i]`（**此时的`nums[i]`就是132序列的`nums[j]`**）来说，若栈中有元素比当前`nums[i]`要小，我们要取到比`nums[i]`小的区间内的最大值，因此，该区间就可以被删去，只要该最大值存在，那么栈中该区间中的任意值就都不会被使用到！





![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/25/53fb0a7ec5f791f404f107661e3baeac.png)







**时间复杂度**：`O(n)`

**空间复杂度**：`O(n)`







# 二、AC代码





**参考代码：**





```c++
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        stack<int> stk;
        int right_max = INT_MIN;
        for(int i = nums.size() - 1; i >= 0; i --){
            if(nums[i] < right_max) return true;
            while(stk.size() && stk.top() < nums[i]){
                right_max = max(right_max, stk.top());
                stk.pop();
            }
            stk.push(nums[i]);
        }
        return false;
    }
};
```

