---
title: LeetCode刷题-90. 子集 II
author: Mr.Niu
toc: true
abbrlink: 51468
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/25/0e4ff5a73c462da6852db59c8e7bb797.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/25/0e4ff5a73c462da6852db59c8e7bb797.png
categories: LeetCode刷题
tags:
  - 递归
date: 2020-07-25 11:43:41
updated:
---









> 题目链接：[90. 子集 II]( https://leetcode-cn.com/problems/subsets-ii/)



# 题解：



> 又是不能重复的递归问题，和[LeetCode刷题-47.全排列II](https://niuxvdong.top/posts/23499.html)此题的关键位置有点像！



## 题目简述：

给定一个包含重复元素的无序序列，返回该序列可以构成的不能重复的所有组合！

## 题解：



**递归：**

关键部分：如何去重？

- 首先将数组排序，使得相同元素挨到一起
- 对于`1 2 2`来说，处理`1 x x`时，第二位只使用第一个2即可，不要让他使用第二个2即可！
- `i <= start` ：保证该位置的第一次选择直接使用第一个重复元素
- `i <= start && nums[i] == nums[i - 1]`：保证该位置的下一种选择方案要保证不是重复元素







**时间复杂度**：最多有 `2^n` 个子集，每个子集存储需要`O(n)`计算量，总时间复杂度为：`O(n * 2^n)`

## AC代码一：



`for`循环去处理长度为`0 ~ n`的情况！

**递归出口**：当前位数 == 需要位数，即`u == n`



**AC代码二更加简洁！**





```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path, nums;
    vector<vector<int>> subsetsWithDup(vector<int>& _nums) {
        nums = _nums;
        sort(nums.begin(), nums.end());
        for(int i = 0; i <= nums.size(); i++) dfs(i, 0, 0);
        return res;
    }
    void dfs(int n, int u, int start){
        if(u == n){
            res.push_back(path);
            return;
        }
        for(int i = start; i < nums.size(); i++){
            if(i > start && nums[i] == nums[i - 1]) continue;
            path.push_back(nums[i]);
            dfs(n, u + 1, i + 1);
            path.pop_back();
        }
    }
};
```



## AC代码二：



**不用那么麻烦，使用for循环，由于递归本就是一颗二叉树，所以到达每个节点都是一种情况，所以可以像下面这样写！**





```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path, nums;
    vector<vector<int>> subsetsWithDup(vector<int>& _nums) {
        nums = _nums;
        sort(nums.begin(), nums.end());
        dfs(0);
        return res;
    }
    void dfs(int start){
        res.push_back(path);
        for(int i = start; i < nums.size(); i++){
            if(i > start && nums[i] == nums[i - 1]) continue;
            path.push_back(nums[i]);
            dfs(i + 1);
            path.pop_back();
        }
    }
};
```

