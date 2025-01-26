---
title: LeetCode刷题-128. 最长连续序列
author: Mr.Niu
toc: true
abbrlink: 44196
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/09/ac7c428e16634f1aa7e9b851c0847fe9.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/09/ac7c428e16634f1aa7e9b851c0847fe9.png
categories: LeetCode刷题
tags:
  - 哈希
date: 2020-08-08 23:15:50
updated:
---



> 题目链接：[128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)



# 题解：



> 



## 题目简述：

给定一个无序序列，求最长连续序列长度！

要求时间复杂度为：`O(n)`

## 题解：



**哈希：**

- 先将所有数存到哈希表

- 对于连续序列，我们可以从一个数开始，每次加一进行判断是否存在即可！
- 为了保证不重复遍历，我们每次只枚举该连续区间的起始值即可，例如1 2 3 4，我们只枚举从1开始，而不枚举从2 3 4开始！即保证`S.count(x) && !S.count(x - 1`!
- 每次更新最大值即可，区间长度为`y - x + 1`



**注意：** 对于重复数字特别多的时候，上述做法会造成所有重复数字的重复枚举，时间复杂度增大，为了解决该问题，我们可以将枚举过的数字全部删掉，这样可以保证所有数字只枚举一次！



**时间复杂度**：所有数只枚举一次`O(n)`

## AC代码：



```c++
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> S;
        for(auto x : nums) S.insert(x);
        int res = 0;
        for(auto x : nums){
            if(S.count(x) && !S.count(x - 1)){
                int y = x;
                S.erase(x);
                while(S.count(y + 1)) y ++, S.erase(y);
                res = max(res, y - x + 1);
            }
        }
        return res;
    }
};
```



