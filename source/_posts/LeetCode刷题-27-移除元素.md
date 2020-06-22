---
title: LeetCode刷题-27.移除元素
author: Mr.Niu
toc: true
abbrlink: 37226
top_img: 'https://i.loli.net/2020/05/20/JVxn1AeYryo9CaE.png'
cover: 'https://i.loli.net/2020/05/20/JVxn1AeYryo9CaE.png'
categories: LeetCode刷题
tags:
  - 双指针
date: 2020-06-21 23:11:51
updated:
---





















> 题目链接：[27.移除元素](https://leetcode-cn.com/problems/remove-element/)



# 题解：



> 简单题，两行代码！



## 题目简述：

去除数组中值等于val的数，并返回去掉后的长度。

## 题解：

同样使用双指针，一个指针`i`指向数组当前扫描位置，一个指针`k`指向当前新数组的下一个元素，遇到和`val`值相等的，直接跳过即可！

## AC代码：



```c++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for(int i = 0; i < nums.size(); i++)
            if (nums[i] != val) nums[k++] = nums[i];
        return k;
    }
};
```



