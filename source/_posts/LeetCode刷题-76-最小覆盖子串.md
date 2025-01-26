---
title: LeetCode刷题-76. 最小覆盖子串
author: Mr.Niu
toc: true
abbrlink: 59607
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/23/b3ad222c3a66d671ede51c8d28ec4449.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/23/b3ad222c3a66d671ede51c8d28ec4449.png
categories: LeetCode刷题
tags:
  - 双指针
  - 滑动窗口
  - 哈希表
date: 2020-07-23 10:51:41
updated:
---





























> 题目链接：[76. 最小覆盖子串]( https://leetcode-cn.com/problems/minimum-window-substring/)



# 题解：



> 滑动窗口界的一大难题！



## 题目简述：



给定两个字符串，从一个串找到包含另一个字符串所有字符的子串，并找到最短的一个！

## 题解：



**双指针算法：**

两个指针都从起点从左向右，`i`指针指向该区间终点，`j`指针指向该区间起点，维护一段区间`i ~ j`使得该区间包含待匹配字符串的每个字符。

**具体做法：**

- 为了判断该区间是否包含待匹配字符串的每个字符，我们使用一个哈希表动态存储该区间每个字符出现的次数
- 使用变量`cnt`统计该区间有效字符个数（即待匹配字符串中对应匹配的字符），只要该区间当前字符个数小于等于待匹配字符串的当前字符个数，即为有效字符，进行统计，即`hs[s[j]] <= ht[s[j]]`
- 维护起点`j`，若新加入的字符导致`hs[s[j]] > ht[s[j]]`，则说明起点`j`可以后移，即` hs[s[j ++ ]] --`，还得保证起点`j`一定是一个合法字符（即起点一定不是待匹配字符串没有的字符，如：`ADOBECODEBA` 匹配 `ABC`，应该要将起点`A`删去，再将`DOBECODE`删去。剩下`BA`，即这里是需要`while`来控制的）
- 当`cnt == t.size()`：即该区间已经匹配，进行更新`res`即可，`res`为空也要更新！



**使用双指针算法的条件：一定要有单调性，即一个指针后移，另一个指针也要后移！**

**对于本题**：`i' < i, j < j'`时，当`i`向后走到`i'`，由于原来的`j ~ i`已经匹配，所以`j`一定不会往前走到`j'`，即`j`一定会不动或者向后走，这样就保证了单调性！



**时间复杂度：** `O(n)`



## AC代码：



```c++
class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> hs, ht;
        for(auto& c : t) ht[c] ++;
        int cnt = 0;
        string res;
        for(int i = 0, j = 0; i < s.size(); i ++){
            hs[s[i]] ++;
            if(hs[s[i]] <= ht[s[i]]) cnt ++;
            while(hs[s[j]] > ht[s[j]]) hs[s[j ++ ]] --;
            if(cnt == t.size()){
                if(res.empty() || i - j + 1 < res.size()) 
                    res = s.substr(j, i - j + 1);
            }
        }
        return res;
    }
};
```



