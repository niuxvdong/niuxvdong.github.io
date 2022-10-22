---
title: LeetCode刷题-93. 复原IP地址
author: Mr.Niu
toc: true
abbrlink: 14783
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/25/4a2f73a21291f7a3f80ada6a6ebae9e4.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/25/4a2f73a21291f7a3f80ada6a6ebae9e4.png
categories: LeetCode刷题
tags:
  - DFS
  - 搜索
date: 2020-08-03 18:06:50
updated:
---





> 题目链接：[93. 复原IP地址]( https://leetcode-cn.com/problems/restore-ip-addresses/)



# 题解：



> 带有剪枝的搜索，挺有意思！



## 题目简述：

给定一串数字，需要将其可以转化为的`IP`地址返回！

## 题解：



**暴力搜索DFS：**`void dfs(string s, int u, int k, string path)`

- `u`：当前搜索到的位置
- `k`：当前搜索的点的个数
- `path`：当前状态下的IP地址



**思路：**

- 对于前导`0`的处理，即`012`，IP地址没有前导0的，这个已经见过很多次了，直接`i > u && s[u] == '0'`即可判断！
- 然后搜索下一位时保证下一位在`0 ~ 255`范围即为合法数字，否则直接`return`
- 下一个数的搜索要从上一个数的后一位开始，即`i = u`开始





**终止条件：**

- `u == s.size()`：即搜到了字符串末尾
- **剪枝优化**：`u < s.size() && k == 4`：即没有搜到最后，已经够了四个点



**答案：** `u == s.size() && k == 4`：即恰好组成一组IP地址，此时将该IP地址`path`最后的小数点去掉，即为答案











**时间复杂度**：一共`n`位，`n - 1`个空隙可插入点，即从`n - 1`个空隙三个点，即时间复杂度为：C<sub>n-1</sub><sup>3</sup>





## AC代码：

## AC代码：



```c++
class Solution {
public:
    vector<string> res;
    vector<string> restoreIpAddresses(string s) {
        dfs(s, 0, 0, "");
        return res;
    }
    void dfs(string s, int u, int k, string path){
        if(u == s.size()){
            if(k == 4){
                path.pop_back();
                res.push_back(path);
            }
            return;
        }
        if(k == 4) return;
        for(int i = u, t = 0; i < s.size(); i++){
            if(i > u && s[u] == '0') return;
            t = t * 10 + s[i] - '0';
            if(t <= 255) dfs(s, i + 1, k + 1, path + to_string(t) + '.');
            else return;
        }
    }
};
```



