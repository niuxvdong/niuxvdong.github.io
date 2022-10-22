---
title: 每日一题之LeetCode 154.寻找旋转排序数组中的最小值 II
author: ITNXD
toc: true
abbrlink: 23461
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 二分
date: 2021-04-07 15:16:37
updated:
---





> 题目链接：[LeetCode 154. 寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)









# 一、题解



**题目大意：**



将一个递增序列（可能有**重复元素**）进行旋转，所谓旋转一次，就是将最后一个数和第一个数交换！要求旋转后的数组找到其最小值！







**思路：**

 仍然是二分，虽然本题的序列不是递增或递减，但是二分的本质是看是否有二段性！

序列旋转过后一等会得到两个单调递增序列，由于有重复元素，因此旋转过后的第一段开始和第二段结束可能会有相等的部分！



由于我们要找最小值，和重复元素无关，我们可以将第二段的重复元素先全部删掉！

- 当然，全部删掉后若只剩下第一段，则直接返回第一点第一个点，即 nums[0]



这样第二段终点一定小于第一段起点！



这样就有了二段性：

- 第一段都大于等于nums[0]
- 第二段都小于nums[0]

最终的答案当然就是第二段的第一个满足条件的点！







**时间复杂度：** `O(n)`，若整段都是同样的数则会之间扫描一遍，因此达不到logn

**空间复杂度：** `O(1)`







、





# 二、AC代码

**参考代码：**



```c++
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size() - 1;
        while(n > 0 && nums[n] == nums[0]) n --;
        if(nums[n] > nums[0]) return nums[0];
        int l = 0, r = n;
        while(l < r){
            int mid = l + r >> 1;
            if(nums[mid] < nums[0]) r = mid;
            else l = mid + 1;
        }
        return nums[r];
    }
};
```

