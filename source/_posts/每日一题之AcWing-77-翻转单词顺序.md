---
title: 每日一题之AcWing 77.翻转单词顺序
author: ITNXD
toc: true
abbrlink: 6719
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 字符串
date: 2021-03-29 11:28:02
updated:
---







> 题目链接：[AcWing 77. 翻转单词顺序](https://www.acwing.com/activity/content/problem/content/3776/1/)



# 一、题解







**思路一：**



1. 开一个额外的字符串来存储每个单词
2. 倒序进行扫描一遍，然后进行拼接`res += tmp + " "`即可
3. 最后记得还要进行一次`res += tmp`



时间复杂度：`O(n)`

空间复杂度：`O(n)`



可以参考代码一！



**思路二：** 



思路一很明显使用了额外的空间，更优的做法是不使用额外的空间进行原地处理！

1. 可以先将整个字符串进行反转
2. 然后对每一个单词进行反转即可





时间复杂度：`O(n)`

空间复杂度：`O(1)`



参考代码二！











# 二、AC代码



**参考代码一：**



```c++
class Solution {
public:
    string reverseWords(string s) {
        string res, tmp;
        for(int i = s.size() - 1; i >= 0; i --){
            if(s[i] == ' ') res += tmp + " ", tmp = "";
            else tmp = s[i] + tmp;
        }
        res += tmp;
        return res;
    }
};
```





**参考代码二：**



```c++
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        for(int i = 0; i < s.size(); i ++){
            int j = i;
            while(j < s.size() && s[j] != ' ') j ++;
            reverse(s.begin() + i, s.begin() + j);
            i = j;
        }
        return s;
    }
};
```

