---
title: 'LeetCode刷题-52. N皇后 II '
author: Mr.Niu
toc: true
abbrlink: 47720
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/07/4e7d927a1cc51c6239ed828501c44e97.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/07/4e7d927a1cc51c6239ed828501c44e97.png
categories: LeetCode刷题
tags:
  - DFS
  - 递归
date: 2020-07-07 14:08:12
updated:
---













> 题目链接：[52. N皇后 II ]( https://leetcode-cn.com/problems/n-queens-ii/)



# 题解：



> 同样是N皇后，比上一题更加简单。



## 题目简述：



N皇后问题，问最后的方案数！



## 题解：

**具体思路详见上一题 51题！**

由于问方案数，我们就不必开数组去存储路径了。



在递归出口`i == n`时， 直接进行统计即可`res++`.



## AC代码：



```c++
class Solution {
public:
    vector<bool> col, dg, udg;
    int res;
    int totalNQueens(int n) {
        col = vector<bool>(n);
        dg = udg = vector<bool>(n * 2);
        dfs(0, n);
        return res;
    }
    void dfs(int i, int n){
        if(i == n){
            res ++; return;
        }
        for(int j = 0; j < n; j++){
            if(!col[j] && !dg[i + j] && !udg[i - j + n]){
                col[j] = dg[i + j] = udg[i - j + n] = true;
                dfs(i + 1, n);
                col[j] = dg[i + j] = udg[i - j + n] = false;
            }
        }
    }
};
```



