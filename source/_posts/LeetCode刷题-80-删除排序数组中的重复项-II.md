---
title: LeetCode刷题-80. 删除排序数组中的重复项 II
author: Mr.Niu
toc: true
abbrlink: 40432
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/23/e294d8cbf3a6cd60851a3cbdd93e66be.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/23/e294d8cbf3a6cd60851a3cbdd93e66be.png
categories: LeetCode刷题
date: 2020-07-23 10:52:28
updated:
tags:
---

















> 题目链接：[80. 删除排序数组中的重复项 II]( https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)



# 题解：



> 与之前一道题几乎类似：[LeetCode刷题-26.删除排序数组中的重复项](https://niuxvdong.top/posts/20075.html)



## 题目简述：

类似题目是删除排序数组重复项，最多出现一次，这个题是最多出现两次！

要求：使用原地算法，即不开辟额外空间！

## 题解：



**思路：**

- `k < 2`时，直接存储到原数组
- `k > 2`时，判断当前元素和和该元素之前的前两个元素是否相同，若之前已经有两个和当前元素相同，则该元素多余直接跳过，否则累积起来，即`nums[k ++ ] = x`
- 最后返回长度`k`



**时间复杂度**：`O(n)`

## AC代码：



```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 0;
        for(auto& x : nums)
            if(k < 2 || nums[k - 1] != x || nums[k - 2] != x)
                nums[k ++ ] = x;
        return k;
    }
};
```



