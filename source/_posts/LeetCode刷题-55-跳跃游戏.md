---
title: 'LeetCode刷题-55. 跳跃游戏 '
author: Mr.Niu
toc: true
abbrlink: 23034
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/54514a2eb1838702cc79850ed7e794dd.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/07/54514a2eb1838702cc79850ed7e794dd.png
categories: LeetCode刷题
tags:
  - 动态规划
  - 贪心
date: 2020-07-07 14:11:12
updated:
---













> 题目链接：[55. 跳跃游戏 ](https://leetcode-cn.com/problems/jump-game/)



# 题解：



> 这个是45题跳跃游戏的简化版！



## 题目简述：

本题和 `LeetCode刷题-45.跳跃游戏II`一样，上一题是要计算到达终点的最小步数！本题不一定能走到终点，问是否能走到终点！



## 题解一：



**首先**：能跳到的位置一定是连续的一段，即某个位置跳不到，后面位置一定跳不到！

**反证法：** 假如能跳到`i + 1`位置，跳不到`i`位置，那么跳到`i + 1`位置的位置应该在`i`位置之前，因为`i`位置无法跳到，无法从他开始跳，那么该位置可以调到`i + 1`一定可以跳到`i`，矛盾！假设不成立，即跳到的位置一定是连续的一段！



**解法，一模一样：**



同样是具有单调性的动态规划，找到第一个可以到达当前位置`i`的位置即可！若`last`已经到了当前位置`i`，说明到不了当前位置`i`，也就到不了最后的终点，直接返回`false`

否则：说明全部点都能到达，返回`true`



**时间复杂度**：`O(n)`

**空间复杂度**：`O(1)`



## AC代码一：



```c++
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size();
        for(int i = 1, last = 0; i < n; i++){
            while(last < i && last + nums[last] < i) last++;
            if(last == i) return false;
        }
        return true;
    }
};
```





## 题解二：

**另一种解释：基本和题解一类似！**



使用`j`表示从可以跳到的最远位置，`i`表示扫描到的位置！

- 若`j < i`：说明当前能跳到的最远位置到不了`i`，即到不了终点，直接返回`false`
- 否则：更新`j`，即`j = max(j, i + nums[i])`，即从第`i`个位置可以跳多远，更新一下`j`



**初始化**：`j = 0`，能跳到的最远处为起点！

## AC代码二：





```c++
class Solution {
public:
    bool canJump(vector<int>& nums) {
        for(int i = 0, j = 0; i < nums.size(); i++){
            if(j < i) return false;
            j = max(j, i + nums[i]);
        }
        return true;
    }
};
```

