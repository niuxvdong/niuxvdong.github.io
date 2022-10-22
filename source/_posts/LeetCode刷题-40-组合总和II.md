---
title: LeetCode刷题-40.组合总和II
author: Mr.Niu
toc: true
abbrlink: 41794
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/9a243e58bd4813fdc8ee8059599308f1.png'
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/9a243e58bd4813fdc8ee8059599308f1.png'
categories: LeetCode刷题
tags:
  - 递归
  - DFS
date: 2020-06-27 22:09:19
updated:
---





















> 题目链接：[40.组合总和II]( https://leetcode-cn.com/problems/combination-sum-ii/)



# 题解：



> 和上一道类似，递归解决，多了一个限制！



## 题目简述：



给定一个数组（可能有相同元素），每个数只能用一次，求出和为目标值的组合。组合不能重复。

## 题解：

上一题是没有相同元素，一数可多选。本题是有相同元素，一数只能一选。



**关键点**：将上一道题的` dfs(candidates, target - candidates[i], i)`的`i`改为`i + 1`即可，即可以保证一数一选。

**第二点** ：需要进行**判重**，先**排序**，使得相同元素扎堆在一起，然后在进行同位置的选取时，进行判断跳过相同元素即可`if(i > start && candidates[i] == candidates[i - 1]) continue;`，这样会保证路径在同一个位置的选取不会重复，即可以保证结果不会有重复组合。

**具体如何判重：**

- 如果是同一个位置的第一次选取，是不会影响的，由于`i > start`，第一次进去是`i == start`，同一个位置的多次选取，即回溯时遇到的for循环，`candidates[i] == candidates[i - 1]`，这个条件则可以保证同一个位置不选择重复的数。



**同样使用递归解决：**



`dfs(vector<int>& candidates, int target, int start)`

`start`用来指向从该数组的哪一个数进行循环。

1. 递归出口：
   1. `target < 0`，即已经将目标值减没了，可以`return`了。
   2. `target == 0`，恰好等于0，则说明找到了一种组合，将当前有效路径`path`加入答案`res`
2. 从`start`开始循环，`path`添加当前选取值，进行下一轮`dfs(candidates, target - candidates[i], i + 1)`，start从`i + 1`开始即可，选下一个位置的数，超过即`target < 0`，直接返回
3. 一个位置选择完毕将会进入下一个位置的选取。
4. `for`循环内`dfs`的结束有两种情况，一是当前位置的条件下有解，二是当前位置条件下无解。然后进行回溯，取消`path`中的路径，找下一个位置的选取情况。

## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
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
            if(i > start && candidates[i] == candidates[i - 1]) continue;
            path.push_back(candidates[i]);
            dfs(candidates, target - candidates[i], i + 1);
            path.pop_back();
        }
    }
};
```



