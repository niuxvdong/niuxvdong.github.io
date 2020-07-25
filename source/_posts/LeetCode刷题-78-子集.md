---
title: LeetCode刷题-78. 子集
author: Mr.Niu
toc: true
abbrlink: 61204
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/23/7c68d7c420ae3710476e3656966f7318.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/23/7c68d7c420ae3710476e3656966f7318.png
categories: LeetCode刷题
tags:
  - 递归
  - 二进制
date: 2020-07-23 10:52:04
updated:
---

















> 题目链接：[78. 子集]( https://leetcode-cn.com/problems/subsets/)



# 题解：



> 与之前的题几乎一致：[AcWing-92.递归实现指数型枚举](https://niuxvdong.top/posts/14886.html)



## 题目简述：

给定一个集合，枚举所有子集，包括空集！



## 题解一：使用二进制

和之前题一样，做法一模一样：

每个数选与不选两种情况，一共有`0 ~ 1 << nums.size() - 1`种情况，枚举每个二进制位是否为1即可！



**时间复杂度：** 一共枚举2<sup>n</sup> 个数，每个数枚举n位，总时间复杂度为 O(2<sup>n</sup> * n)



**注意：** 当 n >= 30时，2<sup>n</sup> > 10<sup>9</sup> 会超时

## AC代码一：



```c++
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        for(int state = 0; state < 1 << nums.size(); state ++){
            vector<int> path;
            for(int k = 0; k < nums.size(); k++)
                if(state >> k & 1) path.push_back(nums[k]);
            res.push_back(path);
        }
        return res;
    }
};
```

## 题解二：使用DFS

**思路：**

- 使用`for`循环分别去搜索位数为`0 ~ nums.size()`的序列
- `dfs(int u, int cnt, int start)`：参数分别为 目标位数，当前第几位，下一次的起始位置（防止重复）



## AC代码二：

```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<int> nums;
    vector<vector<int>> subsets(vector<int>& _nums) {
        nums = _nums;
        sort(nums.begin(), nums.end());
        for(int i = 0; i <= nums.size(); i++) dfs(i, 0, 0);
        return res;
    }
    void dfs(int u, int cnt, int start){
        if(cnt == u){
            res.push_back(path);
            return;
        }
        for(int i = start; i < nums.size(); i++){
            path.push_back(nums[i]);
            dfs(u, cnt + 1, i + 1);
            path.pop_back();
        }
    }
};
```

