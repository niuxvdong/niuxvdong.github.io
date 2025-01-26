---
title: LeetCode刷题-65. 有效数字
author: Mr.Niu
toc: true
abbrlink: 47819
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/b2a472fd03d7676fc29016169f5e4eee.png'
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/b2a472fd03d7676fc29016169f5e4eee.png'
categories: LeetCode刷题
tags:
  - 字符串
  - 模拟
date: 2020-07-20 21:44:52
updated:
---



















> 题目链接：[65. 有效数字]( https://leetcode-cn.com/problems/valid-number/)



# 题解：



> 恶心人的字符串模拟题，边界条件一大堆！



## 题目简述：

判断一个字符串是否可以转化为数字！



## 题解：



**步骤：**

- 去掉首尾空格
- 若只有正负号，返回`false`
- 若只有一个`.`或者`.e`、`.E`都不成立，返回`false`
- 循环整个字符串：
  - 对于`.`：若多于一个或者在`e`或`E`之后，返回`false`
  - 对于`e 或 E`：`e 或 E`前后为空，或者多于一个，返回`false`
  - 对于`e 或 E`：`e 或 E`后为正负号，且正负号后面没有数字，返回`false`
  - 不是`. e E 0-9`：直接返回`false`
- 剩下其他情况合法，返回`true`



**老多的边界条件！！！**

## AC代码：



```c++
class Solution {
public:
    bool isNumber(string s) {
        int i = 0, j = s.size() - 1;
        // 去掉前后空格
        while(i < s.size() && s[i] == ' ') i++;
        while(j >= 0 && s[j] == ' ') j--;
        if(i > j) return false;

        s = s.substr(i, j - i + 1);
        // 只有正负号
        if(s[0] == '+' || s[0] == '-') s = s.substr(1);
        if(s.empty()) return false;

        // . .e .E 都不成立
        if(s[0] == '.' && (s.size() == 1 || s[1] == 'e' || s[1] == 'E')) return false;

        int dot = 0, e = 0;
        for(int i = 0; i < s.size(); i++){
            if(s[i] == '.'){
                // 多余一个点或点在e之后 .2.3  3e5.2
                if(dot > 0 || e > 0) return false;
                dot ++;
            }else if(s[i] == 'e' || s[i] == 'E'){
                // e前为空 e后为空 e出现过
                if(!i || i + 1 == s.size() || e > 0) return false;
                // e后有正负号
                if(s[i + 1] == '+' || s[i + 1] == '-'){
                    // e后正负号后没有数字
                    if(i + 2 == s.size()) return false;
                    // 跳过正负号
                    i ++;
                }
                e ++;
                // 不是. e 0-9
            }else if(s[i] < '0' || s[i] > '9') return false; 
        }
        return true;
    }
};
```



