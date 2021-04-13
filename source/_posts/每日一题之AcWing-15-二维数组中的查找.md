---
title: 每日一题之AcWing 15.二维数组中的查找
author: ITNXD
toc: true
abbrlink: 20007
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 思维
date: 2021-03-30 11:22:11
updated:
---





> 题目链接：[AcWing 15. 二维数组中的查找](https://www.acwing.com/problem/content/16/)





# 一、题解





**题目大意：**

在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。判断是否包含某个数字！



**思路分析：**



本题真的是一个思维题目！巧妙的很！

**我们可以将右上角位置作为突破口！**



对于有上角来说，它是一行最大，它又是一列最小！



这是一个很好的特性！





1. 若目标数字小于右上角，则它一定不是最后一列，删掉即可
2. 若目标数字大于右上角，则它一定不是第一行，删掉即可
3. 若目标数子等于右上角，则表名已经找到，否则没有找到





**时间复杂度**：矩阵一共有 n 行，m 列，则复杂度为 `O(n + m)`

**空间复杂度**：`O(1)`











# 二、AC代码





```c++
class Solution {
public:
    bool searchArray(vector<vector<int>> array, int target) {
        if(array.empty() || array[0].empty()) return false;
        int i = 0, j = array[0].size() - 1;
        while(i < array.size() && j >= 0){
            if(array[i][j] == target) return true;
            if(array[i][j] > target) j --;
            else i ++;
        }
        return false;
    }
};
```





