---
title: LeetCode刷题-63. 不同路径 II
author: Mr.Niu
toc: true
abbrlink: 8265
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/8f7e2b60c489d794b40e5a793f4cf20e.png'
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/8f7e2b60c489d794b40e5a793f4cf20e.png'
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-07-20 21:44:16
updated:
---











> 题目链接：[63. 不同路径 II]( https://leetcode-cn.com/problems/unique-paths-ii/)



# 题解：



> 和上一道题相比多了一些障碍物设置，基本类似！



## 题目简述：

仍然是`n * m`的方格从左上到右下的路径数，路径中可能有障碍物！



## 题解：



**动态规划：**

**状态表示**：`f[i][j]`表示从起点到当前位置的路径数！

**状态计算**：由于到当前位置只有两条路径，即上和左，所以状态转移方程为，`f[i][j] = f[i - 1][j] + f[i][j - 1]`



初始状态由`path[0][0]`决定，若起点有障碍物，则`f[0][0]`为0，且最终方案数为0

若终点`path[n - 1][m - 1]`有障碍物，则最终方案数为0

以上两种情况需要特判！

最终结果：`f[n - 1][m - 1]`



**与上一道题不同之处：** 当前位置有了障碍物则到达当前位置的方案数为`f[i][j] = 0`



时间复杂度：$O(n \times m)$

## AC代码：



```c++
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& path) {
        int n = path.size(), m = path[0].size();
        vector<vector<int>> f(n, vector<int>(m));
        if(path[n - 1][m - 1] || path[0][0]) return 0;
        f[0][0] = 1;
        for(int i = 0; i < n; i++){
            for(int j = 0; j < m; j++){
                if(path[i][j]){
                    f[i][j] = 0;
                    continue;
                }
                if(i - 1 >= 0) f[i][j] += f[i - 1][j];
                if(j - 1 >= 0) f[i][j] += f[i][j - 1];
            }
        }
        return f[n - 1][m - 1];
    }
};
```



