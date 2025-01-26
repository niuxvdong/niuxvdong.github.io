---
title: LeetCode刷题-87. 扰乱字符串
author: Mr.Niu
toc: true
abbrlink: 30973
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/3808092cd5513b82d409b4f89a23df8c.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/25/3808092cd5513b82d409b4f89a23df8c.png
categories: LeetCode刷题
tags:
  - 递归
date: 2020-07-25 11:42:54
updated:
---









> 题目链接：[87. 扰乱字符串]( https://leetcode-cn.com/problems/scramble-string/)



# 题解：



> 本题也可以使用动态规划，但是似乎是三位数组的表示，及其复杂！
>
> 本题可以使用递归分解子问题求解！较为简单一些！



## 题目简述：

给定一个字符串，我们可以把它逐层分解为子串，类似于二叉树，我们可以对非叶子节点（叶子节点只有一个字符）进行交换，然后该节点对应的儿子节点和父节点就会发生改变，最终的字符串就会发生一部分的反转！

给定原串和一个待确认字符串，求解是否是原串通过反转得到的，即为扰乱字符串！

## 题解：



由于动态规划及其复杂，我们这里换一种思路来做！



**递归思想：**



对于该扰乱字符串的简单理解，就是将一部分长度内的字符串在某个位置进行了前后对调，既然如此，我们就可以通过递归找到该长度的字符串，进而和待匹配串对应的位置进行比较即可！



**两种情况：**该区间反转和该区间未反转



简单举例：以`gr`区间和`eat`区间为例， 此时区间长度`i = 2`：

- 不反转，`great`和`great`：则需要原串的前`i`个字符和待匹配串的前`i`个字符匹配，并且原串的后`n - i`个字符与待匹配串的后`n - i`个字符匹配，即`isScramble(s1.substr(0, i), s2.substr(0, i)) && isScramble(s1.substr(i), s2.substr(i))`

- 反转，`great`和`eatgr`：则需要原串的前`i`个字符和待匹配串的后`i`个字符匹配，并且原串的后`n - i`个字符与待匹配串的前`n - i`个字符匹配，即`isScramble(s1.substr(0, i), s2.substr(n- 1)) && isScramble(s1.substr(i), s2.substr(0, n - i))`



**递归出口：** 

- 若子问题原串于待匹配串完全相同，则返回`true`
- 否则进行排序，查看是否一致，不一致则说明不可能匹配（例如字符个数不同，字符种类不同），直接返回`false`
- 若一致，则说明有可能匹配，继续进行递归求解



需要枚举每个区间长度，找到直接终止程序，否则继续查找所有可能，找完还没找到一种正确情况，这说明无法匹配，返回`false`







**时间复杂度**：用an表示两个字符串区间长度为n时的计算量，则

```
an = 4(a1 + a2 + ... an-1)
因为：每次都需要四个递归式
同理：
an-1 = 4(a1 + a2 + ... an-2)
两式相减得：
an - an-1 = 4an-1
an = 5an-1 = 5^2 an-2 = .... = 5^n a0
an = 5^n
```



**所以时间复杂度为**：`O(5^n)`



## AC代码：



```c++
class Solution {
public:
    bool isScramble(string s1, string s2) {
        if(s1 == s2) return true;
        string t1 = s1, t2 = s2;
        sort(t1.begin(), t1.end()), sort(t2.begin(), t2.end());
        if(t1 != t2) return false;

        int n = s1.size();
        for(int i = 1; i < n; i++){
            if(isScramble(s1.substr(0, i), s2.substr(0, i)) && 
               isScramble(s1.substr(i), s2.substr(i))) return true;
            if(isScramble(s1.substr(0, i), s2.substr(n - i)) && 
               isScramble(s1.substr(i), s2.substr(0, n - i))) return true;
        }
        return false;
    }
};
```



