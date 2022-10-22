---
title: LeetCode刷题-127. 单词接龙
author: Mr.Niu
toc: true
abbrlink: 25443
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/4b148adc93f4697b24a75e5a27009923.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/09/4b148adc93f4697b24a75e5a27009923.png
categories: LeetCode刷题
tags:
  - 最短路
  - BFS
date: 2020-08-08 23:15:33
updated:
---





> 题目链接：[127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/)



# 题解：



> 是上一道题的简化版，只需要记录方案数即可！



## 题目简述：

和上一题一样，给定起始和终止单词和一个字典，求每次只能改变一个单词并且该单词存在于字典可以到达终止单词的方案数！

## 题解：

**具体见上一题：** 可以通过博客上方搜索功能搜索或者使用文章下方上一篇按钮跳转！



由于只需要记录方案数，所以我们只需要上一道题的最短路的过程即可，即只需要BFS并在中途计数既可！



**最终答案：**`if(t == endWord) return dist[t];`



**时间复杂度**：同样见上一题分析，为`O(26nL^2 + nL)`即`O(nL^2)`

## AC代码：



```c++
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> S;
        unordered_map<string, int> dist;
        queue<string> q;
        q.push(beginWord);
        dist[beginWord] = 1;
        for(auto x : wordList) S.insert(x); 
        while(q.size()){
            auto s = q.front();
            q.pop();
            for(int i = 0; i < s.size(); i++){
                string t = s;
                for(char j = 'a'; j <= 'z'; j++){
                    if(j == s[i]) continue;
                    t[i] = j;
                    if(S.count(t) && dist.count(t) == 0){
                        dist[t] = dist[s] + 1;
                        if(t == endWord) return dist[t];
                        q.push(t);
                    }
                }
            }
        }
        return 0;
    }
};
```



