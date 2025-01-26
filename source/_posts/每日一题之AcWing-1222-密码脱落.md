---
title: 每日一题之AcWing 1222.密码脱落
author: ITNXD
toc: true
abbrlink: 62813
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 动态规划
  - 区间DP
date: 2021-04-03 10:25:10
updated:
---





> 题目链接：[AcWing 1222. 密码脱落](https://www.acwing.com/problem/content/1224/)





# 一、题解



**题目大意：**

给定一个字符串，求其最长回文子序列，返回其最少脱落的字母数！



**思路：**



**转态表示**：由于是回文，因此我们使用区间来处理，使用`f[i][j]`表示区间 i 到 j 的回文子序列集合。属性为：**最大值**！

**状态计算**：

1. 都选：在`a[i] == a[j]`的情况下有解：`f[i + 1][j - 1] + 2`
2. a[i]选a[j]不选：`f[i][j - 1]`，a[i]不一定可以匹配，包含第四种情况
3. a[i]不选a[j]选：`f[i + 1][j]`，a[j]不一定可以匹配，包含第四种情况
4. 都不选：`f[i + 1][j - 1]`

**最终答案：** `n - f[0][n - 1]`



**因此：** 只需要计算前三种情况即可，第四种情况已经被包含！



**注意：** 当长度为1的时候特殊处理`f[i][j] = 1`，防止越界！











# 二、AC代码

**参考代码：**



```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010;

string s;
int f[N][N];

int main(){
    cin >> s;
    int n = s.size();
    for(int len = 1; len <= n; len ++){
        for(int i = 0; i + len - 1 < n; i ++){
            int j = i + len - 1;
            if(len == 1) f[i][j] = 1;
            else{
                f[i][j] = max(f[i][j - 1], f[i + 1][j]);
                if(s[i] == s[j]) f[i][j] = max(f[i][j], f[i + 1][j - 1] + 2);
            }
        }
    }
    cout << n - f[0][n - 1] << endl;
    return 0;
}
```

