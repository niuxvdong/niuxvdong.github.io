---
title: LeetCode刷题-81. 搜索旋转排序数组 II
author: Mr.Niu
toc: true
abbrlink: 38820
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/23/690a23f110781db7ce5ea5da57b4378c.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/23/690a23f110781db7ce5ea5da57b4378c.png
categories: LeetCode刷题
tags:
  - 二分
  - 线性扫描
date: 2020-07-23 10:53:18
updated:
---



















> 题目链接：[81. 搜索旋转排序数组 II]( https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)



# 题解：



> 和之前题目类似：[LeetCode刷题-33.搜索旋转排序数组](https://www.itnxd.cn/posts/51598.html)



## 题目简述：

给定一个有序有重复元素的序列，从某一个点反转一下，问该序列是否存在目标值！

比之前类似题目多了一个重复元素！

## 题解一：二分





**其实不需要使用二分，因为二分最坏时间复杂度也为`O(n)`！**



**我们使用二分的思路来做一下：**

与之前写法完全一致，就是多了一点，不能直接进行二分！

由于多了重复元素，会使得，该序列前一个升序的开始和后一个升序的结尾会有重合部分，无法通过二分得到中间值！



**所以**：将第二个升序序列从末尾开始，如果和第一个升序序列开始一样，就删去，这样就完全转化为之前的题目了！



**具体操作：**

-  `while(R >= 0 && nums[0] == nums[R]) R--;` 就多了这一句，将重复部分删掉，注意删到只有一个元素的情况，直接判断返回即可
- 接下来和之前类似题目一模一样
- 先二分得到两端升序序列的分隔点
- 再判断在哪个序列
- 进行第二次二分找目标值
- 最后判断返回结果



具体思路：参考之前题目：[LeetCode刷题-33.搜索旋转排序数组](https://www.itnxd.cn/posts/51598.html)



**时间复杂度：** 最坏情况为，整个序列元素完全一样，这样第一个`while`循环会扫描`n`次，所以最坏时间复杂度为 `O(n)`，所以不如直接扫描一遍来的快！



## AC代码一：



```c++
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        if(nums.empty()) return false;
        int R = nums.size() - 1;
        while(R >= 0 && nums[0] == nums[R]) R--;
        if(R < 0) return nums[0] == target;

        int l = 0, r = R;
        while(l < r){
            int mid = l + r + 1 >> 1;
            if(nums[mid] >= nums[0]) l = mid;
            else r = mid - 1;
        }
        if(nums[0] <= target) l = 0;
        else l = r + 1, r = R;
        while(l < r){
            int mid = l + r >> 1;
            if(nums[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return nums[r] == target;
    }
};
```



## 题解二：直接扫描

没什么可解释的！



**时间复杂度：** `O(n)`

## AC代码二：





```c++
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        for(auto x : nums)
            if(x == target) return true;
        return false;
    }
};
```

