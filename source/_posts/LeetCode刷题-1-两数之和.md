---
title: LeetCode刷题-1.两数之和
author: Mr.Niu
toc: true
abbrlink: 43672
top_img: 'https://img.niuxvdong.top/wallhaven-39joqy.jpg'
cover: 'https://img.niuxvdong.top/wallhaven-39joqy.jpg'
categories: LeetCode刷题
tags:
  - 数组
  - 哈希表
date: 2020-06-12 20:53:28
updated:
---







> 题目链接：[1.两数之和](https://leetcode-cn.com/problems/two-sum/)



# 题解：

## 1、暴力



由于答案的解唯一，可以使用两层循环，找到直接返回！

假如：最后为{i, j}， i < j，两层循环如下方代码。

时间复杂度：O(N^2)



### AC代码：

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for(int i = 0; i < nums.size(); i++)
        {
            for(int j = i + 1; j < nums.size(); j++)
            {
                if(nums[i] + nums[j] == target)
                    return {i, j};
            }
        }
        return {};
    }
};
```





## 2、使用哈希表



本题的目标就是找一个数，`target - nums[i]` ，找到一个即为答案，对于快速的查找可以使用哈希表！



这里的 下标 i 规定为 `{j, i}，j < i，` 只需要每次从i - j 的范围找一个 `target - nums[i]`即可，找到即为答案，返回`{hash[target - nums[i]], i}`.



1. 判断`target - nums[i]`是否在哈希表
2. 不在则将当前数加到哈希表



哈希表：



`unordered_map`： 增删改查复杂度为O(1)



两个函数：



1. `count()`：统计个数，C++  `unordered_map`不允许有重复的 key，所以该返回值为1 或 0；
2. `find()`：找到返回迭代器，找不到返回 `hash.end()`



时间复杂度：O(N)



### AC代码：



```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hash;
        for(int i = 0; i < nums.size(); i++){
            int r = target - nums[i];
            // 使用find
            // if(hash.find(r) != hash.end()){
            //     return {hash[r], i};
            // }
            // count
            if(hash.count(r)){
                return {hash[r], i};
            }
            hash[nums[i]] = i;
        }
        return {};
    }
};
```



