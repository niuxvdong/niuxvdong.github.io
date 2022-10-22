---
title: LeetCode刷题-58. 最后一个单词的长度
author: Mr.Niu
toc: true
abbrlink: 33807
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/08/fef0e68b8991cbea1171ae1a9406a03c.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/08/fef0e68b8991cbea1171ae1a9406a03c.png
categories: LeetCode刷题
tags:
  - 模拟
date: 2020-07-08 21:47:51
updated:
---



















> 题目链接：[58. 最后一个单词的长度]( https://leetcode-cn.com/problems/length-of-last-word/)



# 题解：



> 简单题！



## 题目简述：

返回最后一个字符串的长度！



## 题解：

**思路：**



先将末尾多余的空格过滤掉！

再从后往前扫描，进行统计，直到遇到第一个空格为止！

**注意：**

- 特判字符串为空的情况！

## AC代码：



```c++
class Solution {
public:
    int lengthOfLastWord(string s) {
        if(s.size() == 0) return 0;
        int res = 0;
        int n = s.size() - 1;
        while(n && s[n] == ' ') n--;
        for(int i = n; i >= 0; i--){
            if(s[i] == ' ') return res;
            res ++;
        }
        return res;
    }
};
```



