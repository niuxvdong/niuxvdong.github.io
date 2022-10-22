---
title: 每日一题之AcWing 1453.移掉K位数字
author: ITNXD
toc: true
abbrlink: 59024
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 贪心
date: 2021-04-12 17:19:39
updated:
---





> 题目链接：[AcWing 1453. 移掉K位数字 ](https://www.acwing.com/problem/content/1455/)





# 一、题解



**题目大意：**



给定一个很长的字符串表示的非负整数，去掉 k 位数，使得结果表示的数最小！





**思路：**



对于一个单调递增的序列，我们发现，若出现后一个数比序列尾的数要小，即发生了**逆序**，那么我们应该尽可能删掉该序列的末尾比出现的数大的数，这样可以使得结果尽可能的小！

删完后，将当前数加入序列！



当然可以删除的前提是还有次数可以删！

最后处理完毕，若还有删除次数，则此时的单调递增序列，可以直接删掉后面对应个数的数即可！



**注意：**

为了防止全部删完，我们提前在最前方插入一个0，最终我们将前导0去掉即可！











**时间复杂度：** `O(n)`

**空间复杂度：** `O(n)`











# 二、AC代码



**参考代码：**



```c++
#include <iostream>
#include <cstring>
#include <algorithm>

using namespace std;

int main(){
    string s; int k;
    cin >> s >> k;
    string res = "0";
    for(auto c : s){
        while(k && res.back() > c) res.pop_back(), k --;
        res += c;
    }
    while(k --) res.pop_back();
    k = 0;
    while(k + 1 < res.size() && res[k] == '0') k ++;
    cout << res.substr(k);
    return 0;
}
```

