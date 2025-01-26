---
title: 每日一题之LeetCode 781.森林中的兔子
author: ITNXD
toc: true
abbrlink: 43253
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - LeetCode刷题
tags:
  - 思维题
  - 数学
date: 2021-04-04 10:25:42
updated:
---





> 题目链接：[LeetCode 781. 森林中的兔子](https://leetcode-cn.com/problems/rabbits-in-forest/)





# 一、题解





一道有趣的数学问题，类似脑筋急转弯！



**题目大意：**



通过每个兔子报的数（表示和自己一样颜色的兔子数），计算得到最少有多少只兔子！





**思路：**

- 先将报的数相同的进行一下统计
- 设报的数为 x，报 x 数的兔子有 sum 只！
  - `sum % (x + 1) == 0`：则最少需要`sum / (x + 1)`种颜色，且sum只兔子都进行了回答
  - 否则：最少需要`sum / (x + 1) + 1 `种颜色，共有`(sum / (x + 1) + 1) * (x + 1)` 只兔子回答了









# 二、AC代码



**参考代码：**





```c++
class Solution {
public:
    int numRabbits(vector<int>& answers) {
        unordered_map<int, int> hash;
        for(auto x : answers) hash[x] ++;
        int res = 0;
        for(auto it : hash){
            int x = it.first, sum = it.second;
            if(sum % (x + 1) == 0) res += sum;
            else res += (sum / (x + 1) + 1) * (x + 1);
        }
        return res;
    }
};
```

