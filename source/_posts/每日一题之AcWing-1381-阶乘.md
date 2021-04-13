---
title: 每日一题之AcWing 1381.阶乘
author: ITNXD
toc: true
abbrlink: 33788
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 数论
  - 因式分解
date: 2021-04-01 11:23:15
updated:
---







> 题目链接：[AcWing 1381. 阶乘](https://www.acwing.com/problem/content/1383/)





# 一、题解



**数学思想：**



0是如何产生的？



当然是有2和5相乘得到的！那么，只要我们将2和5都除掉，那不就没有0了！



**具体思路：**

1. 遍历过程中，将每个数的因子2和5计数并除掉
2. 结果每次只保留个位数即可
3. 由于因子2和因子5的个数不一定相等，所以再进行一次乘2运算



因子2的个数一定比因子5的多，因此最终一定是2被除了多次，我们只要再将其乘回来即可！乘的次数为`a - b`















# 二、AC代码





```c++
#include <iostream>

using namespace std;

int n;

int main(){
    cin >> n;
    int a = 0, b = 0, res = 1;
    for(int i = 1; i <= n; i ++){
        int x = i;
        while(x % 2 == 0) x /= 2, a ++;
        while(x % 5 == 0) x /= 5, b ++;
        res = res * x % 10;
    }
    for(int i = 0; i < a - b; i ++) res = res * 2 % 10;
    cout << res << endl;
    return 0;
}
```

