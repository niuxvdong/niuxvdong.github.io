---
title: AcWing-96.奇怪的汉诺塔
author: Mr.Niu
toc: true
abbrlink: 34850
cover: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_67.jpg'
top_img: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_67.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 递推
  - Dp
date: 2020-02-29 17:44:12
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "208902" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[96. 奇怪的汉诺塔](https://www.acwing.com/problem/content/description/98/)

---



## 题目背景：



#### 题目描述



汉诺塔问题，条件如下：

1、这里有A、B、C和D四座塔。

2、这里有n个圆盘，n的数量是恒定的。

3、每个圆盘的尺寸都不相同。

4、所有的圆盘在开始时都堆叠在塔A上，且圆盘尺寸从塔顶到塔底逐渐增大。

5、我们需要将所有的圆盘都从塔A转移到塔D上。

6、每次可以移动一个圆盘，当塔为空塔或者塔顶圆盘尺寸大于被移动圆盘时，可将圆盘移至这座塔上。

请你求出将所有圆盘从塔A移动到塔D，所需的最小移动次数是多少。

![河内塔.jpg](https://www.acwing.com/media/article/image/2019/01/10/19_acbb764014-%E6%B2%B3%E5%86%85%E5%A1%94.jpg)
汉诺塔塔参考模型

#### 输入格式

没有输入

#### 输出格式

对于每一个整数n(1≤n≤121≤n≤12),输出一个满足条件的最小移动次数，每个结果占一行。

#### 输入样例：

```
没有输入
```

#### 输出样例：

```
参考输出格式
```



---



## 题目分析：

### 题目要求：



此题是三根柱子汉诺塔的变形，现在有四根棍子，需要输出n 为1 到12的最小移动次数即可！

### 解题思路：



先介绍一下三根棍子情况：不论有多少个碟子，都可看为这几步：

- 将前n  - 1 个盘子移到第二个棍子
- 再将最底下的1个盘子移到第三个棍子
- 再将n - 1个盘子移到第三个棍子

所以得到递推式：`d[n] = d[n - 1] + 1 + d[n - 1];`

初始值为d[1] = 1;

再看一下四根棍子的情况：不论多少个盘子，都可以看为这几步：

- 将前 i 个盘子移到第二个棍子
- 再将剩下的n - i 个盘子移到第三个棍子
- 再将 前 i 个盘子移到第四根棍子

所以得到递归式：`f[n] = f[i] + d[n - i] + f[i];`

初始值为f[0] = 0；

前i 个盘子有 j种情况！每次取一个min函数即可！

至于为什么是`d[n - 1]`，可以这样想，将前 i 个移走后，第二根柱子就死了，不能再用了，所以可以看做是三根棍子，第二步就变为了三根棍子的情况！





> [yxc大神的视频讲解：点击这里！](https://www.acwing.com/video/115/)

## 题解：





```c
#include <iostream>
#include <cstring>
using namespace std;

int d[20], f[20];

int main()
{
    d[1] = 1;
    for(int i = 2; i <= 12; i++)
        d[i] = d[i - 1] + 1 + d[i - 1];
    
    memset(f, 0x3f, sizeof f);
    f[0] = 0;
    for(int i = 1; i <= 12; i++)
        for(int j = 0; j < i; j++)
            f[i] = min(f[i], f[j] + d[i - j] + f[j]);
    
    for(int i = 1; i <= 12; i++) cout << f[i] << endl;
    return 0;
}
```

