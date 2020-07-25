---
title: LeetCode刷题-72. 编辑距离
author: Mr.Niu
toc: true
abbrlink: 60666
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/5a1285fa8dfb418ef183fc7c80b41a60.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/5a1285fa8dfb418ef183fc7c80b41a60.png
categories: LeetCode刷题
tags:
  - 动态规划
date: 2020-07-22 22:26:00
updated:
---





















> 题目链接：[72. 编辑距离]( https://leetcode-cn.com/problems/edit-distance/)



# 题解：



> 动态规划应用，很有意思！



## 题目简述：

将一个单词变为另一个单词，只有三种操作，替换，删除，插入！问最少步数！



## 题解：

**动态规划：**

**状态表示：** 两个字符串，使用二维数组`f[i][j]`表示`a`字符串的的`0 - i`和`b`字符串的 `0 - j`匹配时的最少步数！

**状态计算：** 处理最后一步， 三种情况

1. 删除一个字符：`f[i][j] = f[i - 1][j] + 1` 即`a`字符串删除一个会匹配，则`a`字符串的前`i - 1`个是和`b`字符串的前`j`个匹配，所以当前最少步数就是该匹配最少步数加一（当前删除操作的一步）
2. 插入一个字符：`f[i][j] = f[i][j - 1] + 1` 解释：与上面同理
3. 替换一个字符：两种情况
   1. `a[i] == b[j]`：即该字符已经匹配无需替换，`f[i - 1][j - 1] + 0`
   2. `a[i] != b[j]`：即该字符已经匹配需要替换，`f[i - 1][j - 1] + 1`

**综上所述：** 状态转移方程为：`f[i][j] = min(f[i - 1][j], f[i][j - 1]) + 1; f[i][j] = min(f[i][j], f[i - 1][j - 1] + t);` 



**最终答案：** `f[n][m]` 表示`a`字符串变为`b`字符串的最少步数！

**初始化：** `f[i][0] = i, f[0][j] = j` 即一个为空，一个不空，则最少需要不空的长度才可以转变为一样



**注意：**

- 为了不对边界0的处理，字符串都在最前端加一个空格！



**时间复杂度：** `O(n)`

## AC代码：



```c++
class Solution {
public:
    int minDistance(string a, string b) {
        int n = a.size(), m = b.size();
        a = ' ' + a, b = ' ' + b;
        vector<vector<int>> f(n + 1, vector<int>(m + 1));
        for(int i = 0; i <= n; i++) f[i][0] = i;
        for(int i = 0; i <= m; i++) f[0][i] = i;
        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                f[i][j] = min(f[i - 1][j], f[i][j - 1]) + 1;
                int t = a[i] == b[j] ? 0: 1;
                f[i][j] = min(f[i][j], f[i - 1][j - 1] + t);
            }
        }
        return f[n][m];
    }
};
```



