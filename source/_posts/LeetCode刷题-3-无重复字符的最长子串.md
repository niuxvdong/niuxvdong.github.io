---
title: LeetCode刷题-3.无重复字符的最长子串
author: Mr.Niu
toc: true
abbrlink: 25173
top_img: 'https://img.niuxvdong.top/thumb-1920-698363.png'
cover: 'https://img.niuxvdong.top/thumb-1920-698363.png'
categories: LeetCode刷题
tags:
  - 双指针
  - 滑动窗口
  - 哈希表
date: 2020-06-13 11:05:26
updated:
---













> 题目链接：[3.无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)



# 题解：



> 双指针形成的滑动窗口实现！双指针被形象表示为滑动窗口！



## 题目简述：



两个概念：

1. 子串：连续的
2. 子序列：不一定连续，下标递增





找出一个字符串中最长不重复的子串，返回最大长度！



## 题解：



使用两个指针`i, j，（j < i）`, 区间`[j, i]`表示以 i 为尾的子串的区间。

使用 `unordered_map<char, int> hash`来表示 字符出现的次数。



双指针扫描时来维护该区间`[j, i]`，使得该区间为以 i 为底的，保证不重复的最大区间。

1. 初始`[j, i]`无重复，`i`往后走，将其加入哈希表
2. 若加入后，`hash[s[i]] > 1`说明 `i`位置出现了和前面重复的字符，由于前面是不重复的，所以只有可能是`i`位置的字符重复，接下来，`j`开始后移，同时进行`hash[s[j++]]--`来j将哈希表前面的字符清零，直到找到一个新的 `j`使的 `hash[s[i]] > 1`不成立，即当前 `j` 的位置为与 `i`重复字符的下一个字符，当前`[j, i]`为以 i为尾的最长子串。



画一个简图如下：





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/13/22c05fc2d493bfde42e956439f6a326f.png)

时间复杂度：每个点最多被i 和 j 各扫描一次，所以为 O(N)



## AC代码：



```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int res = 0;
        // 字符出现的个数
        unordered_map<char, int> hash;
        // [j, i]
        for(int i = 0, j = 0; i < s.size(); i++){
            hash[s[i]]++;
            while(hash[s[i]] > 1){
                hash[s[j++]]--;
            }
            res = max(res, i - j + 1);
        }
        return res;
    }
};
```


