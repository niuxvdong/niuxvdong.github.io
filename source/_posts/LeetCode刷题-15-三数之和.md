---
title: LeetCode刷题-15.三数之和
author: Mr.Niu
toc: true
abbrlink: 55831
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/18/8db64eed4162c45ab5426cf74f4c021a.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/18/8db64eed4162c45ab5426cf74f4c021a.png
categories: LeetCode刷题
tags:
  - 双指针
date: 2020-06-19 20:53:48
updated:
---

















> 题目链接：[15.三数之和](https://leetcode-cn.com/problems/3sum/)



# 题解：



> 又是使用双指针的题，双指针可以将复杂度降低一维！
>
> 这道题和LeetCode后面的`16、18`题类似。



## 题目简述：

给定一个`nums`数组，需要求出所有相加为零的三元组，并且要求不包含重复三元组！

## 题解：



当然可以使用暴力，嗯，，三重循环，没试过，可能会超时！



咱们有好的算法，就不去暴力求解！

使用**双指针**，固定第一个数，后两个数使用双指针，可以将`O(N ^ 3)的复杂度降到O(N ^ 2)`，即使用双指针可以将维度降低一维！



**使用双指针的前提是序列得有序：**



**具体做法：**

1. 固定第一个数
2. 第二个数 `j` 从 `i + 1`开始，`k`从 `nums.size() - 1`开始向内走
3. `nums[i] + nums[j] + nums[k] > 0`三数之和大于0，`k`就一直`--`，直到找到`<= 0`的位置，或者`j`与`k`相邻（即`j = k - 1`）
4. 此时判断三数之和是不是0，是则`push`进去！
5. 此时以`i`和`j`为第一二个数的情况就找完了，继续第二个数的循环。



**Tips：** 由于数组有序，所以我们固定第一个数，嗯，第二个数也相当于固定，去滑动第三个数，直到最接近0的位置，然后去判断是否等于0，这样一定是对的！



**关于判重：**



- 如果第一个数和下一个数重复，那么下一个数的情况和上一个数是完全一样的，不需要进行处理，`continue`即可！
- eg：`1111111-2`， 第一个1的情况和第二个1以及后面的1的情况是完全相同的，可以直接跳过！
- 也就是每次循环都要判断是否和上一个数相同，相同则跳过
- **注意：** 要保证上一个元素下标不越界得保证`i > 0, j > i + 1`







**注意：** `while` 内的`j < k - 1`的条件，要写对，防止下标越界，此处（j 和 k 的关系）最终退出条件为`j == k - 1`，即后两个数相邻！



**时间复杂度：** 第一层循环O(N)，第二层看似O(N ^ 2)，实则`j`和`k`各最多扫描N次，所以最终复杂度为`O(N ^ 2)`



## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        for(int i = 0; i < nums.size(); i++){
            if(i && nums[i] == nums[i - 1]) continue;
            for(int j = i + 1, k = nums.size() - 1; j < k; j++){
                if(j > i + 1 && nums[j] == nums[j - 1]) continue;
                while(j < k - 1 && nums[i] + nums[j] + nums[k] > 0) k--;
                if(nums[i] + nums[j] + nums[k] == 0){
                    res.push_back({nums[i], nums[j], nums[k]});
                }
            }
        }
        return res;
    }
};
```



