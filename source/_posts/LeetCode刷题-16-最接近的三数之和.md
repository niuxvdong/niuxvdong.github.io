---
title: LeetCode刷题-16.最接近的三数之和
author: Mr.Niu
toc: true
abbrlink: 14896
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/19/08c7a474b9fcdadc62d0fc56730cef80.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/19/08c7a474b9fcdadc62d0fc56730cef80.png
categories: LeetCode刷题
tags:
  - 双指针
date: 2020-06-19 21:54:22
updated:
---











> 题目链接：[16.最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/)



# 题解：



> 嗯，也是双指针，和LeetCode的第15题（也就是[我的上一篇文章的题解](https://niuxvdong.top/posts/55831.html)基本类似）。



## 题目简述：

上一题求三数字和为0， 这一题求三数之和最接近！

## 题解：

和上一题类似，求为0的三元组每次只有一种情况，即`nums[i] + nums[j] + nums[k]`

但是求最接近则有两种（左和右）：`nums[i] + nums[j] + nums[k] - target`，`nums[i] + nums[j] + nums[k + 1] - target`



**思路是一样的，同样是双指针！思路见上一篇题解，即第15题 三数之和！**

本题此题不需要去重，最终结果也只有一个！





**同样需要排序！**

**不同之处：**

- `nums[i] + nums[j] + nums[k] > target`时，就`k--`，找到最接近的位置
- 若`k + 1`没有超界，则计算一下`nums[i] + nums[j] + nums[k + 1]`的情况（右边）
- 还有左边的情况（一定不会超界）
- 使用`minv`更新与目标值相差最小的差值，即最接近值，若`minv`发生了更新，则更新`res`的值为差值较小的一方。



初始值`minv，t1，t2`都初始化为极大值`INT_MAX`。

**注意：** 差值计算需要使用绝对值`abs()`，同样`while`内的条件`j < k - 1`也得保证`k--`不会越界。





## AC代码：



```c++
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int res = 0, minv = INT_MAX;
        for(int i = 0; i < nums.size(); i++){
            for(int j = i + 1, k = nums.size() - 1; j < k; j++){
                while(j < k - 1 && nums[i] + nums[j] + nums[k] > target) k--;
                int t1 = INT_MAX, t2 = INT_MAX;

                t1 = abs(nums[i] + nums[j] + nums[k] - target);
                if(k + 1 < nums.size()) t2 = abs(nums[i] + nums[j] + nums[k + 1] - target);
                
                if(minv > min(t1, t2)){
                    minv = t1 < t2 ? t1 : t2;
                    res = t1 < t2 ? nums[i] + nums[j] + nums[k] : nums[i] + nums[j] + nums[k + 1];
                }
            }
        }
        return res;
    }
};
```



