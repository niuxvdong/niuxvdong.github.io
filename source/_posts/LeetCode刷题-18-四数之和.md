---
title: LeetCode刷题-18.四数之和
author: Mr.Niu
toc: true
abbrlink: 4066
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/19/a8a2fe376e4aa4136ddf2db8a41317be.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/19/a8a2fe376e4aa4136ddf2db8a41317be.png
categories: LeetCode刷题
tags:
  - 双指针
date: 2020-06-19 22:25:18
updated:
---













> 题目链接：[18.四数之和](https://leetcode-cn.com/problems/4sum/)



# 题解：



> 又是使用双指针的题，双指针可以将复杂度降低一维！
>
> 这道题和LeetCode的第15题完全一样！[我的第15题链接](https://niuxvdong.top/posts/55831.html)



## 题目简述：

给定一个`nums`数组，需要求出所有相加为`target`的四元组，并且要求不包含重复四元组！

## 题解：



当然可以使用暴力，嗯，，四重循环，没试过，可能会超时！

使用呢双指针将四维降到三维度，固定前两个数，后两个数使用双指针移动！



**题解：参考我写的LeetCode第15题的题解。具体做法，判重，注意事项，完全一样！**







**时间复杂度：** 第一层循环O(N)，第二层O(N)，第三层看似O(N ^ 2)，实则`l`和`r`各最多扫描N次，所以最终复杂度为`O(N ^ 3)`



## AC代码：



```c++
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        for(int i = 0; i < nums.size(); i ++){
            if(i && nums[i] == nums[i - 1]) continue;
            for(int j = i + 1; j < nums.size(); j ++){
                if(j > i + 1 && nums[j] == nums[j - 1]) continue;
                for(int l = j + 1, r = nums.size() - 1; l < r; l ++){
                    if(l > j + 1 && nums[l] == nums[l - 1]) continue;
                    while(l < r - 1 && nums[i] + nums[j] + nums[l] + nums[r] > target) r --;
                    if(nums[i] + nums[j] + nums[l] + nums[r] == target){
                        res.push_back({nums[i], nums[j], nums[l], nums[r]});
                    }
                }
            }
        }
        return res;
    }
};
```



