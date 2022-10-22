---
title: 每日一题之AcWing 62.丑数
author: ITNXD
toc: true
abbrlink: 12479
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 多路归并
date: 2021-04-10 17:17:13
updated:
---







> 题目链接：[AcWing 62. 丑数 ](https://www.acwing.com/problem/content/58/)





# 一、题解



**题目大意：**



只包含2，3，5质因子的数，称之为丑数，求第 n 个丑数的值！



**思路：**



假设有一个序列是丑数序列，我们将其中2的倍数，3的倍数，5的倍数抽取出来得到三个序列！

那么原序列的取值一定是1和这三个序列的并集！



因此丑数序列的每一个取值一定可以由这三个序列得到！



我们使用三个指针分别指向三个序列的开始，那么下一项的取值一定是三个序列中最小的一个，取完值后对应指针后移即可！



那三个序列的取值**一定**可以由已知的丑数序列通过乘2，乘3，乘5得到！



**不好理解的地方在于三个指针的移动？**

三个指针都处在已得到序列之前的某个位置，只有该位置的数乘以对应的2，3，5才可以且该结果在三个结果中最小，该指针才会后移！



**三个指针是否会越界？**

自然不会，由于丑数序列下标每次必增加1，而三个序列的指针却不一定增加1，因此一定不会越界！



**注意：**

由于三个序列可能会有重复，即可能同时是几个数的倍数！因此我们遇到相同时，指针一定要同时后移！





**时间复杂度：** `O(n)`

**空间复杂度：** `O(n)`







# 二、AC代码



**参考代码：**



```c++
class Solution {
public:
    int getUglyNumber(int n) {
        vector<int> q(1, 1);
        int i = 0, j = 0, k = 0;
        while(-- n){
            int t = min(q[i] * 2, min(q[j] * 3, q[k] * 5));
            q.push_back(t);
            if(t == q[i] * 2) i ++;
            if(t == q[j] * 3) j ++;
            if(t == q[k] * 5) k ++;
        }
        return q.back();
    }
};
```

