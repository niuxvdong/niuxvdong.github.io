---
title: LeetCode刷题-39.组合总和
author: Mr.Niu
toc: true
abbrlink: 34556
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/9fd846795f34be8edc6238ce1ef30584.png'
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/9fd846795f34be8edc6238ce1ef30584.png'
categories: LeetCode刷题
tags:
  - 递归
  - DFS
date: 2020-06-27 22:08:53
updated:
---





















> 题目链接：[39.组合总和](https://leetcode-cn.com/problems/combination-sum/)



# 题解：



> 递归同一元素可重复选取的解决，用减法减到 0 为止！
>
> 当然也可以加法加到目标值，都行！



## 题目简述：

给定一个无重复元素的序列，找到符合目标值的所有组合，不重复的组合。

## 题解：

**使用深搜即可，关键点，每个数可以选不止一次。**

本题可进行累加，也可以进行累减。推荐使用累减版本！

**具体解决：**

`dfs(vector<int>& candidates, int target, int start)`

`start`用来指向从该数组的哪一个数进行循环。

1. 递归出口：
   1. `target < 0`，即已经将目标值减没了，可以`return`了。
   2. `target == 0`，恰好等于0，则说明找到了一种组合，将当前有效路径`path`加入答案`res`
2. 从`start`开始循环，`path`添加当前选取值，进行下一轮`dfs(candidates, target - candidates[i], i)`，start仍然从`i`开始即可，选同一个数的最多次，超过即`target < 0`，直接返回
3. 同一个数的最多次选择完毕将会进入下一个数的选取。
4. `for`循环内`dfs`的结束有两种情况，一是当前数的次数已经选到了最多，二是当前次数条件下无解。然后进行回溯，取消`path`中的路径，找下一个数的多次选取情况。

## AC代码：



```c++
// 累减版本
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        dfs(candidates, target, 0);
        return res;
    }
    void dfs(vector<int>& candidates, int target, int start){
        if(target < 0) return;
        if(target == 0){
            res.push_back(path);
            return;
        }
        for(int i = start; i < candidates.size(); i++){
            path.push_back(candidates[i]);
            dfs(candidates, target - candidates[i], i);
            path.pop_back();
        }
    }
};


// 累加版本
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        dfs(candidates, target, 0, 0);
        return res;
    }
    void dfs(vector<int>& candidates, int target, int start, int num){
        if(target < num) return;
        if(target == num){
            res.push_back(path);
            return;
        }
        for(int i = start; i < candidates.size(); i++){
            path.push_back(candidates[i]);
            dfs(candidates, target, i, num + candidates[i]);
            path.pop_back();
        }
    }
};
```



