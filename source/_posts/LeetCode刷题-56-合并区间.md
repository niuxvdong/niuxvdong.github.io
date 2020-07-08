---
title: LeetCode刷题-56. 合并区间
author: Mr.Niu
toc: true
abbrlink: 63206
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/08/707ffd3b6a20221bd3c49bac34a055ff.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/08/707ffd3b6a20221bd3c49bac34a055ff.png
categories: LeetCode刷题
tags:
  - 排序
  - 模拟
date: 2020-07-08 21:46:14
updated:
---











> 题目链接：[56. 合并区间]( https://leetcode-cn.com/problems/merge-intervals/)



# 题解：



> 区间合并问题，先人的总结，先按照左端点排序再进行合并！



## 题目简述：



给定一堆区间，将重叠的区间进行合并，重新返回！

## 题解：

**思路：**

1. 按照左端点排序，左端点相同，按照右端点排序
2. 使用`l`，`r`两个指针维护最大可拓展区间
3. 若当前左端点严格大于右指针，说明当前区间无法和上一个区间合并，则将上一个区间保存起来，更新新的左右指针为当前区间
4. 若当前左端点小于等于上一个区间，则说明当前区间可以与上一个区间进行合并，则更新最大可拓展区间的右端点（即右指针）
5. 最后将最后一个区间也保存起来



**稍做解释：** 

按左端点排序，再按右端点排序，那么如果有重叠部分的区间，该区间的左端点一定在上一个区间的左端点的后面！这样如果有重叠就合并，没有就插入新的容器！



**时间复杂度：** 排序O(nlogn)，线性扫描O(n)，总时间复杂度为`O(nlogn)`



**注意点：**

- 特判为空的情况，直接返回
- 记得要把最后一个区间插入
- `vector`进行排序默认按照第一个值，第二个值等等进行排序

## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        vector<vector<int>> res;
        if(intervals.empty()) return res;
        sort(intervals.begin(), intervals.end());
        int l = intervals[0][0], r = intervals[0][1];
        for(int i = 1; i < intervals.size(); i++){
            if(intervals[i][0] > r) {
                res.push_back({l, r});
                l = intervals[i][0], r = intervals[i][1];
            } else r = max(r, intervals[i][1]);
        }
        res.push_back({l, r});
        return res;
    }
};
```



