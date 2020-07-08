---
title: LeetCode刷题-45.跳跃游戏II
author: Mr.Niu
toc: true
abbrlink: 31960
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/06/2ca44821b1788ccffa563bcdbb8b9e48.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/06/2ca44821b1788ccffa563bcdbb8b9e48.png
categories: LeetCode刷题
tags:
  - 动态规划
  - 贪心
date: 2020-07-06 20:42:28
updated:
---

















> 题目链接：[45.跳跃游戏II]( https://leetcode-cn.com/problems/jump-game-ii/)



# 题解：



> 普通动态规划超时，需要想到是否具有单调性，再从单调性出发使用贪心求解！
>
> 动态规划难度尚可，加上单调性就复杂了许多！



## 题目简述：

给了一个非负整数数组，每个位置代表能从当前位置挑的最大步数，题目规定一定可以跳到终点，问最短步数！

## 题解一：动态规划



**同样使用闫式DP分析法：**

**状态表示**：使用`f[i]`数组表示跳到`i`位置的最小步数

**状态计算：** 那么`f[i]`应该为前面的所有位置跳到当前位置的步数中的最小值。即`t = min(t, f[j] + 1)`

**最终答案**：答案就是`f[n - 1]`



解释一下：`j + nums[j] >= i`表示能从`j`位置跳到`i`位置



**时间复杂度**：`O(n ^ 2)`

**空间复杂度**：`O(n)`



**时间复杂度有点高，会超时TLE，请看题解二，利用单调性！**

## 超时代码：





```c++
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        vector<int> f(n + 1);
        for(int i = 1; i < n; i++){
            int t = INT_MAX;
            for(int j = 0; j < i; j++){
                if(j + nums[j] >= i){
                    t = min(t, f[j] + 1);
                }
            }
            f[i] = t;
        }
        return f[n - 1];
    }
};
```



## 题解二：动态规划 + 单调性 + 贪心



**既然动态规划会超时，我们就需要想想该状态数组是否具有单调性！**

我们会发现，`f`数组是单调递增的，可能为`0,1,1,2,3,4,4,4,5,6....`也就是`f[i - 1] <= f[i]`

**开始证明：**

**反证法：** 假设`f[i - 1] > f[i]`，不妨假设是从`k`（`k`位置一定在`i - 1` 位置之前）位置跳到了`f[i]`，即 `k + nums[k] >= i`，那么`k + nums[k] >= i - 1`一定成立！此时`f[i - 1] <= f[i]`，即能跳到后一个位置，一定能跳到前一个位置，这样到达前一个位置的步数一定不会大于后一个位置的步数！即假设不成立，状态数组是单调递增的！



**有了单调性的性质，计算步数就会简单多了！**



我们只需要尽可能找到靠前的能跳到当前位置的位置即可，因为其后面的一定可以跳过去，步数也一定会比前面能跳过去的位置要多，所以最优解就是从前往后第一个可以跳到当前位置的位置！即`while(last < i && last + nums[last] < i) last++;`

`last`位置就是第一个可以跳过去的位置，也就是最优解。当前位置的最小步数，当然就是上一个位置的最小步数 + 1，即`f[i] = f[last] + 1 `

**最终答案**：`f[n - 1]`



**时间复杂度**：最多扫描两遍，为`O(n)`

**空间复杂度**：`O(n)`

## AC代码：



```c++
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        vector<int> f(n + 1);
        for(int i = 1, last = 0; i < n; i++){
            while(last < i && last + nums[last] < i) last++;
            f[i] = f[last] + 1; 
        }
        return f[n - 1];
    }
};
```


