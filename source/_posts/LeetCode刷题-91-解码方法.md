---
title: LeetCode刷题-91. 解码方法
author: Mr.Niu
toc: true
abbrlink: 45808
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/25/71f1eb97ccdf6ea186c74b285e2924b9.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/25/71f1eb97ccdf6ea186c74b285e2924b9.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-08-03 11:16:42
updated:
---













> 题目链接：[91. 解码方法]( https://leetcode-cn.com/problems/decode-ways/)



# 题解：



> 简单的动态规划题！



## 题目简述：

将`A ~ Z`编码为 `1 ~ 26`，给定一个数字字符串求共有多少种解码方式！

## 题解：



**动态规划：**

**状态表示：** `f[i]`表示前`i`个字符的解码方法数

**状态计算：**考虑最后一步

- 最后一位不为`0`时，解码数为`f[i - 1]`
- 最后两位为`10 ~ 26`时，解码数为`f[i - 2]`

**综上所述，状态转移方程为：** `f[i] = f[i - 1] + f[i - 2]`

**最终结果：** `f[n]`



**初始转态：** `f[0] = 1` ，初始转态为0还是1由是否能满足所有状态的正确性决定，由于`f[1] = s[1] != '0' ? 1: 0;`，所以`f[0] = 1`!



**时间复杂度**：`O(n)`



**注意：** 

- 为了使得处理边界简单，将字符串前面加空格处理！

## AC代码：



```c++
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        s = ' ' + s;
        vector<int> f(n + 1);
        f[0] = 1;
        for(int i = 1; i <= n; i++){
            if(s[i] != '0') f[i] += f[i - 1];
            if(i > 1){
                int t = s[i] - '0' + (s[i - 1] - '0') * 10;
                if(t >= 10 && t <= 26) f[i] += f[i - 2];
            }
        }
        return f[n];
    }
};
```



