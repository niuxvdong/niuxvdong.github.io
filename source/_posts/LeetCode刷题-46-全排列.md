---
title: LeetCode刷题-46.全排列
author: Mr.Niu
toc: true
abbrlink: 44968
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/3caad4f9267a3ea550483630243e5b72.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/3caad4f9267a3ea550483630243e5b72.png
categories: LeetCode刷题
tags:
  - 递归
  - DFS
date: 2020-07-07 10:52:37
updated:
---



















> 题目链接：[46.全排列](https://leetcode-cn.com/problems/permutations/)



# 题解：



> 全排列问题，经典DFS！



## 题目简述：

给定没有重复元素的序列，输出全排列！

## 题解：

**直接搜索加回溯就行了：**

参数：

- `cnt`：表示当前搜到第几位数
- `nums`：传入原数组
- 递归出口：`cnt == nums.size()`
- 搜索过的直接跳过即可，使用`vis`数组标记即可！

## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> vis;
    vector<vector<int>> permute(vector<int>& nums) {
        vis = vector<bool>(nums.size());
        dfs(0, nums);
        return res;
    }
    void dfs(int cnt, vector<int>& nums){
        if(cnt == nums.size()){
            res.push_back(path);
            return;
        }
        for(int i = 0; i < nums.size(); i++){
            if(vis[i]) continue;
            path.push_back(nums[i]); vis[i] = true;
            dfs(cnt + 1, nums);
            path.pop_back(); vis[i] = false;
        }
    }
};
```



