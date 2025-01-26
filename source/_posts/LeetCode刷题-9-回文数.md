---
title: LeetCode刷题-9.回文数
author: Mr.Niu
toc: true
abbrlink: 22431
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/2b7168dde2a4484253dacbd3dac53d12.png'
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/2b7168dde2a4484253dacbd3dac53d12.png'
categories: LeetCode刷题
tags:
  - 回文数
date: 2020-06-14 18:37:52
updated:
---





> 题目链接：[9. 回文数](https://leetcode-cn.com/problems/palindrome-number/)



# 题解：



> 虽然简单，但是还是有可以优化的地方！



## 题目简述：



给一个 int  类型的数，判断是不是回文数！

注意：-121 反转后 为 121- 不是回文数。





## 题解一：循环

嗯，太简单了，不写解释了！



注意一点：`int` 正序可能没溢出，但是反转过来就不一定没有溢出，所以，要用 `long long` 来存储一下！

## AC代码：



```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0) return false;
        long long t = 0, r = x;
        while(r){
            t = t * 10 + r % 10;
            r /= 10;
        }
        return t == x;
    }
};
```





## 题解二：循环优化



由于是回文串，那么如果是的话，他的前半部分和后半部分是完全一样的，所以我们可以只处理一半即可得到答案。

1. 如果为负数和末尾有0一定不是回文数。（除了 0）
2. 如果后半部分等于前半部分即是回文数，否则不是：
   1. 奇数：`s == x / 10`
   2. 偶数：`s == x`
3. 退出条件 `s <= x`，大于就超过了中点位置！ 

## AC代码：



```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0 || (x && x % 10 == 0)) return false;
        int t = 0;
        while(t <= x){
            t = t * 10 + x % 10;
            if(t == x || t == x / 10) return true;
            x /= 10;
        }
        return false;
    }
};
```





## 题解三：使用 string



- `to_string`：是 `C++11`支持的。
- `s.rbegin() 和 s.rend()`：返回一个逆向迭代器，分别指向字符串的最后一个字符和起始位置（第一个字符前面一个字符位置）
- 也可以使用`reverse()`进行反转，不过他没有返回值，而是直接将原串都修改了，不推荐使用。

## AC代码：



```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0) return false;
        string s = to_string(x);
        return s == string(s.rbegin(), s.rend());
        
        // 或者：
        // string t = s;
        // reverse(t.begin(), t.end());
        // return s == t;
    }
};
```

