---
title: LeetCode刷题-125. 验证回文串
author: Mr.Niu
toc: true
abbrlink: 33082
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/09/777a4a3670cc50eafae809ce48667231.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/09/777a4a3670cc50eafae809ce48667231.png
categories: LeetCode刷题
tags:
  - 双指针
date: 2020-08-08 23:15:04
updated:
---





> 题目链接：[125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)



# 题解：



> 简单回文串的验证！



## 题目简述：

验证一个字符串是不是回文串，只考虑数字和大小写字母！

## 题解：



**简单双指针：**

- 一个指针从前向后，一个指针从后向前
- 遇到不少字母和数字则向后或向前移动
- 由于题目忽略大小写的存在，我们将其全部转化为小写字母比较即可！





**注意：**

- `tolower() 和 toupper()`：位于`cctype`或`ctype.h`头文件



**时间复杂度**：`O(n)`

## AC代码：



```c++
class Solution {
public:
    bool check(char c){
        return c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
    }
    bool isPalindrome(string s) {
        for(int i = 0, j = s.size() - 1; i < j; i++, j--){
            while(i < j && !check(s[i])) i++;
            while(i < j && !check(s[j])) j--;
            if(i < j && tolower(s[i]) != tolower(s[j])) return false;
        }
        return true;
    }
};
```



