---
title: LeetCode刷题-47.全排列II
author: Mr.Niu
toc: true
abbrlink: 23499
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/b8307f3843a58d597fe0001b7b61b96c.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/b8307f3843a58d597fe0001b7b61b96c.png
categories: LeetCode刷题
tags:
  - 递归
  - DFS
date: 2020-07-07 10:52:56
updated:
---



















> 题目链接：[47.全排列II]( https://leetcode-cn.com/problems/permutations-ii/)



# 题解：



> 相比上一道多了重复元素！



## 题目简述：

给定一个可包含重复数字的序列，返回所有不重复的全排列。

## 题解：

和 46 题类似，多了重复元素和去重！



**步骤也多了两步：**

1. 排序，使得相同的元素排到一起
2. 过滤，同一个位置同一个相同元素只用没有使用的第一个元素，并且使用顺序一定是从前到后



**过滤方法：**`i && nums[i - 1] == nums[i] && !vis[i - 1]`即遇到和上一个相同，上一个没有被用过，则说明当前数不是第一次被用，就不要取用，跳过即可！

**举个例子：**1(1) 1(2)  3  可能为 1(1) 1(2)  3也可能为1(2) 1(1)  3 ，我们要去除重复的，可以只将顺序排列的留下即可！即相同数的第一个没有被用到，就不要使用第二个，第三个！可以保证相同数只有一种情况，即顺序排列的情况！





## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> vis;
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
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
            if(!vis[i]){
                if(i && nums[i - 1] == nums[i] && !vis[i - 1]) continue;
                path.push_back(nums[i]), vis[i] = true;
                dfs(cnt + 1, nums);
                path.pop_back(), vis[i] = false;
            }
        }
    }
};
```



