---
title: LeetCode刷题-68. 文本左右对齐
author: Mr.Niu
toc: true
abbrlink: 6698
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/49e538714d7d004149658918a880bbcc.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/20/49e538714d7d004149658918a880bbcc.png
categories: LeetCode刷题
tags:
  - 字符串
  - 模拟
date: 2020-07-20 21:45:42
updated:
---







> 题目链接：[68. 文本左右对齐]( https://leetcode-cn.com/problems/text-justification/)



# 题解：



> 又是一道有点恶心的模拟题，刚开始竟然没有看懂题！



## 题目简述：

给定一堆单词，和一个最大长度，要求在不超过最大长度的条件下尽可能多放单词，并使得单词之间尽可能均匀分布！



## 题解：

**题目解释：** 

假如一行放三个单词长度不超过最大长度，放四个超过了，则当前行只能放三个，还得保证三个单词之间的两个空隙尽可能相等（使用空格填充），如果无法相等，则保证左边的比右边的多一！



**举个例子：**

 该行最多放四个单词，总长为9， 最大长度为20，则剩余空格数为11个，要均匀分布到三个空隙，所以11 / 3 = 3 ... 2

所以三个空隙空格数依次为：3 + 1， 3 + 1，4 即可！



**分析：**

- 左对齐：
  - 最后一行需要左对齐
  - 某一行只有一个单词需要左对齐
- 左右对齐：一般情况，不是最后一行和不仅仅只有一个单词**！**



**具体做法：**

- 先找到一行能放的最大长度，该长度包括两个单词间的一个空隙
- 若为一个单词或最后一行，即`j == words.size() || j == i + 1`，将单词间隔一个空隙，后面的位置填补空格
- 若为一般情况，需要计算空隙数`cnt = j - i - 1`以及剩余空格数`maxWidth - len + cnt`(因为len中已经包含了两个单词间的一个空隙，所以多减了，再加回来) 如果剩余空格和空隙无法平均分配，则将前面的多加一，即`k < blank % cnt`，即空隙为`string(blank / cnt + 1, ' ')`；剩余的空隙为`string(blank / cnt, ' ')`
- 将当前行假如`res` 
- 更新下一行起点为`i = j`





## AC代码：



```c++
class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> res;
        for(int i = 0; i < words.size();){
            int j = i + 1;
            int len = words[i].size(); 
            while(j < words.size() && len + 1 + words[j].size() <= maxWidth) len += 1 + words[j++].size();

            string line;
            // 最后一行或该行只有一个单词 左对齐
            if(j == words.size() || j == i + 1){
                line += words[i];
                for(int k = i + 1; k < j; k++) line += ' ' + words[k];
                 while(line.size() < maxWidth) line += ' ';
            }else{ // 一般情况，左右对齐
                // 空隙数 剩余空格数
                int cnt = j - i - 1, blank = maxWidth - len + cnt;
                line += words[i];
                int k = 0;
                while(k < blank % cnt) line += string(blank / cnt + 1, ' ') + words[i + k + 1], k++;
                while(k < cnt) line += string(blank / cnt, ' ') + words[i + k + 1], k++;
            }
            res.push_back(line);
            // 更新下一行起点
            i = j;
        }
        return res;
    }
};
```



