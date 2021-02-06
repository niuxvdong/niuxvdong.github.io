---
title: LeetCode刷题-28.实现strStr()
author: Mr.Niu
toc: true
abbrlink: 45773
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@3d575d3988500f3358577ab8a2828cec65c21afc/2021/02/06/f45b0094f57dd09e8807ead0f6b2ee9d.png'
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@3d575d3988500f3358577ab8a2828cec65c21afc/2021/02/06/f45b0094f57dd09e8807ead0f6b2ee9d.png'
categories: LeetCode刷题
tags:
  - KMP
date: 2020-06-21 23:13:02
updated:
---





















> 题目链接：[28.实现strStr()](https://leetcode-cn.com/problems/implement-strstr/)



# 题解：



> 嗯，使用暴力就是简单题！
>
> 提高效率使用KMP，复杂了，好好理解，多实现，最好记住模板！本题就是一个模板。



## 题目简述：

给定两个字符串，从第一个中找第二个串，能找到返回起始下标，找不到返回-1，第二个串为空，直接返回0。

## 题解一：暴力

直接扫描一遍原串即可：

- 先判断当前位置是否够子串的长度，不够直接返回-1，因为肯定没有可以匹配的。
- 如果位置长度够，就从当前位置截取和子串长度相同，查看是否相等，相等直接返回当前下标`i`，否则继续下次循环



时间复杂度：`substr(pos, m)`：复杂度为O(len)，总时间复杂度为`O(n*m)`

## AC代码一：



```c++
class Solution {
public:
    int strStr(string haystack, string needle) {
        if(needle.empty()) return 0;
        for(int i = 0; i < haystack.size(); i++){
            if(haystack.size() - i < needle.size()) return -1;
            if(haystack.substr(i, needle.size()) == needle)
                return i;
        }
        return -1;
    }
};

// 改一下这样可能更好。
class Solution {
public:
    int strStr(string haystack, string needle) {
        if(needle.empty()) return 0;
        for(int i = 0; haystack.size() - i >= needle.size(); i++)
            if(haystack.substr(i, needle.size()) == needle)
                return i;
        return -1;
    }
};
```





## 题解二：KMP



> 为了弄明白KMP算法，我也是盯着看，画着图搞了一上午！
>
> 这也是一个模板题，需要记下来并掌握代码的实现及理解该算法的运行流程！





**时间复杂度：** `O(n + m)`



**为了方便，这里将字符串都从1开始！**



```c++
s = " " + s, p = " " + p;
```



`KMP`算法的核心就是一个`next`数组：



> `next`数组的作用：若没有该数组，后续匹配过程中出现不匹配的话，需要将起始位置后移一位，重新开始一一匹配，但是有了该数组，就不一定是移动一位了，而是移动尽可能多的位置，使得前`j`个字符和原串仍然匹配，只需判断第`j + 1`个字符即可！



**首先搞清楚next数组存储的东西是什么？**



`next[i]：` 所有`s[1]-s[i]`中前缀等于后缀的最大长度（特指非平凡前缀和后缀）



非平凡：指的是不包括自己，eg：`abc`中的`next[3]`不能为3，应该为0。



举个例子：



举个例子：`abcdefghabcd`中，`next[12]`就应该为4，即前缀和后缀相等的最大长度，为前缀`abcd`和后缀`abcd`匹配时的值。



**下一个问题，怎么求next数组？**



首先，`next[0]`不需要管，下标从1开始，`next[1] = 0`，非平凡不包括自己！

从下标为2开始即可！



假设当前状态如下：`i - 1`为原串`p`指向的位置，`j`为`p`的前缀后缀相等时前缀的尾。序号1和序号2是同一段，序号3是原串`1 ~ (i - 1)`中与前缀相等的后缀，此时序号1，2，3都是相等的。

![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/22/5880ff8272e6debedb8138c4b76db5d0.png)

**若 `i` 和 `j + 1`可以匹配，此时`next[i]`就会由`j`变为`j + 1`，则效果图如下：**



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/22/9411c5d614a964bc2fe5df17302a9ab1.png)

**若 `i` 和 `j + 1`无法匹配，则说明前缀串`1 ~ j`无法满足当前`next[i]`的条件，此时`j`的位置就需要发生变化，将前缀缩小为`1 ~ next[j]`去试探此时是否可以匹配`next[i]`的条件，若一直无法匹配，已经到了`next[1] = 0`或`j == 0`时，仍然无法匹配，则当前`next[i] = 0`；若试探中，某次可以匹配，则当前`next[i]`的值就可以更新为当前`next[j] + 1`**







![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/22/ab2c3a53e468247615e02a1579fbaf64.png)



会发现后面的`next`计算都在前面已经算出来的基础上进行试探的，而前面算出来的都是前后缀相等且最长的，所以这样可以求得所有`next`数组的值，且一定是正确的！

----

**下一个问题，怎么求子串与原串的匹配并计算得到起始下标？**



和求解`next`数组一样，求解`next`数组是用的两个待匹配字符串`p`，求下面这个问题则只需要将第一个串换成`s`串即可，最后只需要判断什么时候等于待匹配字符串的长度，直接计算返回该下标即可！



![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/22/196ae57ca0cee7dde9393d23354933c6.png)

**什么时候就算找到了？**

当然是当`j == m`的时候，即说明此时已经匹配完了`p`串。



最终返回的长度就是`i - m`，即`s`串的匹配终点的前m个字符的位置，应该为`i - m + 1`，但是我们下标是从1开始，所以要减去1，`i - m + 1 - 1`即`i - m`。



注意：需要特判`p`串为空的情况，需要返回0。



## AC代码二：





```c++
class Solution {
public:
    int strStr(string s, string p) {
        if(p.empty()) return 0;
        int n = s.size(), m = p.size();
        s = " " + s, p = " " + p;
        vector<int> next(m + 1);
        for (int i = 2, j = 0; i <= m; i ++){
            while(j && p[i] != p[j + 1]) j = next[j];
            if(p[i] == p[j + 1]) j ++;
            next[i] = j;
        }

        for (int i = 1, j = 0; i <= n; i ++){
            while(j && s[i] != p[j + 1]) j = next[j];
            if(s[i] == p[j + 1]) j ++;
            if(j == m) return i - m;
        }
        return -1;
    }
};
```

