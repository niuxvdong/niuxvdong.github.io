---
title: LeetCode刷题-20.有效的括号
author: Mr.Niu
toc: true
abbrlink: 15525
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/19/e28e373e27f4a7479c3ef24d07458bd2.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/06/19/e28e373e27f4a7479c3ef24d07458bd2.png
categories: LeetCode刷题
tags:
  - 栈
date: 2020-06-19 22:43:38
updated:
---















> 题目链接：[20.有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)



# 题解：



> 嗯，经典的栈的应用，括号匹配！



## 题目简述：

给定一堆大中小括号，询问是否能完整匹配！

## 题解一：

就是经典括号匹配，具体细节自己想想就明白了！

具体思想：

1. 左括号直接入栈
2. 右括号先判断是不是栈空，栈空则无法匹配返回`false`，不空则和当前栈顶进行匹配，匹配了直接从栈中弹出，否则直接返回`false`
3. 最后判断栈是否为空，不为空这说明无法完成匹配，直接返回`false`，其他情况返回`true`



## AC代码一：



```c++
class Solution {
public:
    bool isValid(string s) {
        stack<char> stk;
        for(int i = 0; i < s.size(); i++){
            if(stk.empty() && (s[i] == ')' || s[i] == ']' || s[i] == '}')) return false;
            if(s[i] == '(') stk.push('(');
            else if(s[i] == ')' && stk.top() == '(') stk.pop();
            else if(s[i] == '[') stk.push('[');
            else if(s[i] == ']' && stk.top() == '[') stk.pop();
            else if(s[i] == '{') stk.push('{');
            else if(s[i] == '}' && stk.top() == '{') stk.pop();
            else return false;
        }
        return stk.empty();
    }
};
```





## 题解二：



嗯，题解一是我写的，是不是看起来有点臃肿，是的！

所以接下来看一下 伟大的 `y总`这偷工减料的优质写法！



**实现原理：**



判断是否匹配做了改进，由于差ASCII码表可以知道，匹配的括号的ASCII码值最多相差2， 所以匹配的写法可以简化为`abs(stk.top() - c) <= 2`

真。。。会玩，优秀的 y总！



## AC代码二：





```c++
class Solution {
public:
    bool isValid(string s) {
        stack<char> stk;
        // y总的偷工减料做法！
        for(auto c : s){
            if(c == '(' || c == '[' || c == '{') stk.push(c);
            else{
                if(!stk.empty() && abs(stk.top() - c) <= 2) stk.pop();
                else return false;
            }
        }
        return stk.empty();
    }
};
```

