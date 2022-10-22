---
title: LeetCode刷题-44.通配符匹配
author: Mr.Niu
toc: true
abbrlink: 18504
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/06/e53c62159d162b9deb5dfc3babd38c4d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/06/e53c62159d162b9deb5dfc3babd38c4d.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-07-06 20:41:42
updated:
---















> 题目链接：[44.通配符匹配]( https://leetcode-cn.com/problems/wildcard-matching/)



# 题解：



> 又是一道关于正则表达式匹配问题的，和上一道[10.正则表达式匹配](https://www.itnxd.cn/posts/6262.html)几乎类似！
>
> 同样的做法，再来一次动态规划！



## 题目简述：

`?` ：可以匹配任何单个字符。
`*`： 可以匹配任意字符串（包括空字符串）。

给一个字符串，给一个正则，检查能否匹配。



很明显，这个定义和正则的含义不尽相同，没关系，根据题意来就行了。

## 题解：

**同样使用闫式DP分析法：**

**分为状态表示和状态计算：**

如下图，由于我写过了一遍，就不再写了！

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/db3cff8862526da36d3c6226cd967e94.png)



**状态转移方程如下：**

当`p[j] != '*'`   `f[i][j] = f[i - 1][j - 1] && (s[i] == p[j] || p[j] == '?')`

当 `p[j] == '*'` ` f[i][j] = f[i][j - 1] || i && f[i - 1][j]` （添加 `i` 防止越界）



**注意点：**

1. 初始状态`f[0][0] = true`
2. `j`从`0`开始无意义，因为非空串无法匹配空串
3. 第一个`if`同样需要防止越界
4. 最终答案为`f[n][m]`
5. 将字符串从0开始，可以省去边界情况的处理



**时间复杂度**：`O(n * m)`

## AC代码：



```c++
class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size(), m = p.size();
        s = ' ' + s, p = ' ' + p;
        vector<vector<bool>> f(n + 1, vector<bool>(m + 1));
        f[0][0] = true;
        for(int i = 0; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(i && p[j] != '*'){
                     f[i][j] = f[i - 1][j - 1] && (s[i] == p[j] || p[j] == '?');
                }else if(p[j] == '*'){
                    f[i][j] = f[i][j - 1] || i && f[i - 1][j];
                }
            }
        }
        return f[n][m];
    }
};
```



