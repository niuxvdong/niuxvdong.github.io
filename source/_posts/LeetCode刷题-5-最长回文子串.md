---
title: LeetCode刷题-5.最长回文子串
author: Mr.Niu
toc: true
abbrlink: 30088
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@25fe3876042973d1968601ddec4adf8b598d7334/2021/02/06/1cd30885cbb41802e41b1e6d976cb2cb.png'
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@25fe3876042973d1968601ddec4adf8b598d7334/2021/02/06/1cd30885cbb41802e41b1e6d976cb2cb.png'
categories: LeetCode刷题
tags:
  - 枚举
  - 双指针
date: 2020-06-14 09:27:14
updated:
---







> 题目链接：[5.最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)



# 题解：



> 本题有一个将时间复杂度降到O(N)的算法：`马拉车算法 Manacher‘s Algorithm` 
>
> 此算法专门由于求解最长回文子串问题！但是 y总说不太常用！
>
> 还有一个O(NlogN)的算法：哈希 + 二分 
>
> 有点困难，能力强了再去玩玩！
>
> 本次：使用枚举暴力做法！时间复杂度 O(n^2)



## 题目简述：

求解最长回文子串！若不止一个最长，随便输出一个！



## 题解：



使用暴力枚举即可：



使用两个指针 l, r, 从中间往两边扩即可！



1. 奇数：另 `l = i - 1, r = i + 1`
2. 偶数：另 `l = i, r = i + 1`



条件：

- `l >= 0 && r < s.size() && s[l] == s[r]`：即可以往两边移
- `str.size() < r - l -1`：即当前回文子串更长，则更新 str



时间复杂度：O(n^2)

## AC代码：



```c++
class Solution {
public:
    string longestPalindrome(string s) {
        string str;
        for(int i = 0; i < s.size(); i++){
            int l = i - 1, r = i + 1;
            while(l >= 0 && r < s.size() && s[l] == s[r]) l--, r++;
            if(str.size() < r - l -1) str = s.substr(l + 1, r - l - 1);

            l = i, r = i + 1;
            while(l >= 0 && r < s.size() && s[l] == s[r]) l--, r++;
            if(str.size() < r - l -1) str = s.substr(l + 1, r - l - 1);
        }
        return str;
    }
};
```



