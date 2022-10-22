---
title: AcWing-91.最短Hamilton路径
author: Mr.Niu
toc: true
abbrlink: 30496
cover: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_09.jpg'
top_img: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_09.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 二进制
  - 状压Dp
  - 最短路
date: 2020-02-27 19:19:09
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "33495597" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[91. 最短Hamilton路径](https://www.acwing.com/problem/content/93/)

---



## 题目背景：



> 这对我来说是一道难题，经过我一直理解，看题解，看yxc大神视频，反复多次，一点点的，终于明白了这个思想并且可以自己独立写出来！
>
> 坚持！反复！终将成功！
>
> 此题，时间限制为 3s ！

#### 题目描述



给定一张 n 个点的带权无向图，点从 0~n-1 标号，求起点 0 到终点 n-1 的最短Hamilton路径。 Hamilton路径的定义是从 0 到 n-1 不重不漏地经过每个点恰好一次。

#### 输入格式

第一行输入整数n。

接下来n行每行n个整数，其中第ii行第jj个整数表示点ii到jj的距离（记为a[i,j]）。

对于任意的x,y,z 数据保证 a[x,x]=0，a[x,y]=a[y,x] 并且 a[x,y]+a[y,z]>=a[x,z]。

#### 输出格式

输出一个整数，表示最短Hamilton路径的长度。

#### 数据范围

1 ≤ n ≤ 20
0 ≤ a[i,j] ≤ 10 <sup>7</sup>

#### 输入样例：

```
5
0 2 4 5 1
2 0 6 5 3
4 6 0 8 3
5 5 8 0 5
1 3 3 5 0
```

#### 输出样例：

```
18
```

---



## 题目分析：

### 题目要求：



给了n个点，以及n个点之间的权，要求出从起点到终点的最短路径，并且要不重不漏的走一遍！

### 解题思路：



当然最容易想到的就是直接暴力枚举，但是，n的范围为20，暴力的话会达到20的阶乘，这绝对超过了C++一秒计算可达到的次数，虽然题目是三秒，但是和常数相比，还是远远不够的！

所以要用到状态压缩：

即所有点都有两种状态，选或不选，可以用0,1来表示（二进制），这样，所有的情况就是最大就是2<sup>20</sup> , 这远比阶乘要小。

举个例子：假如有8个点，选择 0,1,5,6 时，当前状态可以表示为：01100011。

**状态转移方程为**：`dp[i][j] = min(dp[i][j], dp[i - (1 << j)][k] + weight[k][j]);`

i 不是一个数，它表示的是二进制，即2的n次方中的一种情况；

j 表示的是，当前的终点；

**首先**：当前状态的终点为 j 为，要想计算当前值，需要拿当前值 和 刨去 第 j 位后的状态中找一个走过的点 k,即` dp[i - (1 << j)][k]` 在加上要到j 的终点 `weight[k][j])` ,就是一个完整的路径，然后将当前状态的所有情况（即k 的取值情况）与 已知`dp[i][j]` 取一个min即可！

最终答案当然就是求：`dp[(1 << n) - 1][n - 1]` 即 `dp[111..共n个1..111]` 表示n个点全部走过来，第二维的 n - 1则是说终点是 最后一个点！

要想保住是从第0个点开始，就要保证二进制的第0位永远为1，即保证他是个奇数；

j 的取值当然要保证在 当前 i 的状态内，即 `i >> j & 1` 用这个来判断！

k 作为中间量，当然要保证当前状态 i 刨去 j 后 k 仍然在 i 的状态内，才能进行与第三者的连接！即 `i - (1 << j) >> k & 1` ！

最终进行状态转移方程：`dp[i][j] = min(dp[i][j], dp[i - (1 << j)][k] + weight[k][j]);`



位运算不太清楚可以百度一下学习！



> [yxc大神的视频讲解，点击这里！](https://www.acwing.com/problem/content/video/93/)
>
> [一篇好理解的题解，点击这里！](https://www.acwing.com/solution/acwing/content/7611/)



## 题解：



加快速度的办法：使用二进制，并且转态压缩本就是用二级制来存储转态的，所以可以提高速度！



注意：要将dp数组初始化为极大值！



```c
#include <cstring>
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1 << 20;
int n, weight[21][21];
int dp[N][21];

int main()
{
    cin >> n;
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> weight[i][j];
    
    memset(dp, 0x3f, sizeof dp);
    dp[1][0] = 0;
    for(int i = 0; i < 1 << n; i++)
    	if(i & 1)
        	for(int j = 0; j < n; j++)
            	if(i >> j & 1)
                	for(int k = 0; k < n; k++)
                    	if(i - (1 << j) >> k & 1)
                        	dp[i][j] = min(dp[i][j], dp[i - (1 << j)][k] + weight[k][j]);
    
    cout << dp[(1 << n) - 1][n - 1] << endl;
    
    return 0;
}
```

