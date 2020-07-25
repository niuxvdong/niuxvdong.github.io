---
title: LeetCode刷题-71. 简化路径
author: Mr.Niu
toc: true
abbrlink: 59982
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/421cf50ab9899709c3165b33accdfa0c.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/421cf50ab9899709c3165b33accdfa0c.png
categories: LeetCode刷题
tags:
  - 栈
  - 模拟
date: 2020-07-22 22:25:39
updated:
---

















> 题目链接：[71. 简化路径](https://leetcode-cn.com/problems/simplify-path/)



# 题解：



> 模拟题，总是处理两个斜杠中间字符！



## 题目简述：

给定一个绝对路径，该绝对路径以`/`开始，不一定以`/`结束，并且可能会出现连续斜杠，要求转换为最简的路径！

- `./`：当前目录
- `../`：上层目录
- 根目录没有上层目录，仍为根目录



## 题解：

**思路：** 将两个斜杠中间的字符截取出来，进行判断

答案的格式保证一定是`/xxx/xxx...`

1. `.`：即为当前目录，不处理，跳过即可
2. `..`：即返回上一层目录，将当前答案字符串`res`从后向前删到第一个斜杠，再将此处斜杠删掉（保证不越界）
3. 空：即两个斜杠挨着，不处理，跳过
4. 目录名：合法目录，将在答案最后加一个斜杠，再加上当前目录名
5. `/`：即累积的中间字符结束

**注意：** 

- 以防给定的绝对路径最后不是空格，导致最后一组斜杠中间的字符无法截取，我们给最后没有斜杠的绝对路径加一个斜杠进行统一！
- 每次将`name`字符串清空
- 对于在根目录进行上层操作的行为，会使得最后答案为空，所以在最后判断一下是否为空，是则返回一个斜杠！
- `string`的`back()`和`pop_back()`属于C++ 11 标准！

## AC代码：



```c++
class Solution {
public:
    string simplifyPath(string path) {
        string res, name;
        if (path.back() != '/') path += '/';
        for (auto c : path) {
            if (c != '/') name += c;
            else {
                if (name == "..") {
                    while (res.size() && res.back() != '/') res.pop_back();
                    if (res.size()) res.pop_back();
                } else if (name != "." && name != "") {
                    res +=  '/' + name;
                }
                name.clear();
            }
        }

        if (res.empty()) res = "/";
        return res;
    }
};
```



