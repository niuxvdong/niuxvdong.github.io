---
title: LeetCode刷题-38.外观数列
author: Mr.Niu
toc: true
abbrlink: 58677
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@a7ba0705416b80093aaa91cac65656b3cd023871/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png'
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/pic@a7ba0705416b80093aaa91cac65656b3cd023871/2021/02/06/d5787bbd8ec29096932f5b1b12823ec4.png'
categories: LeetCode刷题
tags:
  - 模拟
  - 双指针
date: 2020-06-27 22:07:59
updated:
---





















> 题目链接：[38.外观数列](https://leetcode-cn.com/problems/count-and-say/)



# 题解：



> 嗯，做这种题得有宏观思想，我就是被细小地方搞混乱了！
>
> 也是双指针的思想。



## 题目简述：

给定一个序列`1`，接下来每一项都是前一项的描述，详细请看官网描述！

## 题解：

说白了，就是从前一项找到相同的字符的起始位置即可。。

例如：`12233344`只要能分成`1`、`22`、`333`、`44`四段即可！



**具体思路：**

借助双指针思想，一个指向该段起点`j`，一个指向该段最后一个位置的下一个位置`k`即可。该段的长度就是`k - j`，该段的字符就是`s[j]`。

即最终为`t += to_string(k - j) + s[j]`



**注意** ：使用两个变量来回切换，`s`指向上一个，`t`指向当前。以及`j = k`，来进行动态跳转到下一段位置起点！



**关于 to_string()：**

C++11支持的转换字符串函数，在这里如果不使用这个函数，也可以通过`'0' + k - j`，但是这样有个缺点，不能超过ASCII码的范围！

## AC代码：



```c++
class Solution {
public:
    string countAndSay(int n) {
        string s = "1";
        for(int i = 0; i < n - 1; i++){
            string t;
            for(int j = 0; j < s.size();){
                int k = j + 1;
                while(k < s.size() && s[j] == s[k]) k++;
                t += to_string(k - j) + s[j];
                j = k;
            }
            s = t;
        }
        return s;
    }
};
```



