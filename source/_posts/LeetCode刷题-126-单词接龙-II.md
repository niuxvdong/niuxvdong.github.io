---
title: LeetCode刷题-126. 单词接龙 II
author: Mr.Niu
toc: true
abbrlink: 48766
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/09/60d39eeb07a42b0d0aaf7e9be6d86138.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/08/09/60d39eeb07a42b0d0aaf7e9be6d86138.png
categories: LeetCode刷题
tags:
  - 最短路
  - DFS
  - BFS
date: 2020-08-08 23:15:16
updated:
---





> 题目链接：[126. 单词接龙 II](https://leetcode-cn.com/problems/word-ladder-ii/)



# 题解：



> 是一道难题，DFS和BFS的结合使用！



## 题目简述：

给定两个不一样的单词和一个字典，找到所有从一个单词到另一个单词的序列！

单词的变化每次转换只能改变一个字母，字典中不一定存在起始单词！

## 题解：



**这道题本质是一道求最短路的问题：即从起始单词到结束单词的最短路，并且边权为一，可以使用`BFS`来求最短路！**



这道题不仅仅要求最短路的长度，而是要记录出所有最短路的路径，这里需要使用`DFS`来搜索路径！



**关于建图方法：** 假设单词数为`n`，单词长度为`L`

- 枚举所有单词，判断两两单词（n^2）是否只有一位不同（L），为 `n^2L`
- 枚举每个单词，每个单词的每一位（26nL）判断是否只有一位不同，哈希表优化判断存在或使用过，为 `26nL^2`



**简单计算：** 当`26L < n` 时，使用第二种，否则使用第一种，本题的数据为`n > 26L`，所以要使用第二种，否则超时



---



进入正题！！！**本题思路：**

**DFS + BFS：**

- 使用`BFS`来求一个`dist`数组，表示当前点到起始点的最短路径长度
  - 使用第二种建图方式，即要枚举每一位的二十六种变化即可，若该点在字典中并且没有被遍历过，即`S.count(t) && dist.count(t) == 0`，我们就进行遍历`dist[t] = dist[s] + 1`，正常宽搜顺序，将当前点加入队列即可！
  - 若搜到了终点，直接`break`，跳到上一层循环，防止搜索不必要的路径
- 通过`dist`数组来倒着`DFS`搜索到起点的路径即可 `dfs(endWord)`
  - 对于最当前点`s`，只需要搜索可以到达改点的路径，即`s`的邻接点，并且只要保证`dist[s] = dist[t] + 1`即说明有一条从`t`到`s`的最短路径，当然我们要保证该点在字典中即`dist.count(t) != 0 `
  - 接下来继续向上搜索，直到起始单词，由于路径数组`path`是倒序存储的，所以搜到起点要将容器进行反转计入答案，完事之后再将其恢复
- 若`BFS`搜完发现最短路径数组`dist`中没有终点单词，即`dist.count(endWord) == 0`，说明字典中都没有终点单词或者通过字典中单词根本变不成终点单词，直接`return`，防止进行不必要的`DFS`





**注意：**

- 对于`BFS`的生成的单词是否在字典中的判断，采用了`unordered_set`来做，提前将其全部插入哈希表，判断为`O(L)`
- 对于`DFS`的生成的单词是否在字典中的判断，采用`dist`数组来做，为什么不采用`BFS`用到的`S`数组呢？因为字典中不一定有起始单词，而`dist`一定有



**时间复杂度**：

1. 建图：见上面建图分析，为`O(26nL^2)`
2. 最短路BFS：每个点遍历一次，每次需要`O(L)`进行判断字典中是否存在或使用过，总共为`O(nL)`
3. 搜索路径DFS：路径数量是指数级别的，记录方案需要`O(nL)`，总共为`O(2^n nL)`

终上为：`O(26nL^2 + nL + 2^n nL) = O(2^n nL)`

## AC代码：



```c++
class Solution {
public:
    vector<vector<string>> res;
    vector<string> path;
    unordered_set<string> S;
    unordered_map<string, int> dist;
    string beginWord;
    queue<string> q;
    vector<vector<string>> findLadders(string _beginWord, string endWord, vector<string>& wordList) {
        beginWord = _beginWord;
        q.push(beginWord);
        dist[beginWord] = 0;
        for(auto x : wordList) S.insert(x); 
        while(q.size()){
            auto s = q.front();
            q.pop();
            for(int i = 0; i < s.size(); i++){
                string t = s;
                for(char j = 'a'; j <= 'z'; j++){
                    if(j == t[i]) continue;
                    t[i] = j;
                    if(S.count(t) && dist.count(t) == 0){
                        dist[t] = dist[s] + 1;
                        if(t == endWord) break;
                        q.push(t);
                    }
                }
            }
        }
        if(dist.count(endWord) == 0) return res;
        path.push_back(endWord);
        dfs(endWord);
        return res;
    }
    void dfs(string s){
        if(s == beginWord){
            reverse(path.begin(), path.end());
            res.push_back(path);
            reverse(path.begin(), path.end());
            return;
        }
        for(int i = 0; i < s.size(); i++){
            string t = s;
            for(char j = 'a'; j <= 'z'; j++){
                if(j == s[i]) continue;
                t[i] = j;
                if(dist.count(t) && dist[t] + 1 == dist[s]){
                    path.push_back(t);
                    dfs(t);
                    path.pop_back();
                }
            }
        }
    }
};
```



