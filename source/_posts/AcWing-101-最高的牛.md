---
title: AcWing-101.最高的牛
author: Mr.Niu
toc: true
abbrlink: 63414
cover: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/56.jpg'
top_img: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/56.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 差分序列
date: 2020-03-01 16:44:34
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "1407551413" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[101. 最高的牛](https://www.acwing.com/problem/content/103/)



## 题目背景：



> 差分应用！

#### 题目描述



有 N 头牛站成一行，被编队为1、2、3…N，每头牛的身高都为整数。

当且仅当两头牛中间的牛身高都比它们矮时，两头牛方可看到对方。

现在，我们只知道其中最高的牛是第 P 头，它的身高是 H ，剩余牛的身高未知。

但是，我们还知道这群牛之中存在着 M 对关系，每对关系都指明了某两头牛 A 和 B 可以相互看见。

求每头牛的身高的最大可能值是多少。

#### 输入格式

第一行输入整数N,P,H,M，数据用空格隔开。

接下来M行，每行输出两个整数 A 和 B ，代表牛 A 和牛 B 可以相互看见，数据用空格隔开。

#### 输出格式

一共输出 NN 行数据，每行输出一个整数。

第 ii 行输出的整数代表第 ii 头牛可能的最大身高。

#### 数据范围

1≤N≤10000
1≤H≤1000000
1≤A,B≤10000
0≤M≤10000

#### 输入样例：

```
9 3 5 5
1 3
5 3
4 3
3 7
9 8
```

#### 输出样例：

```
5
4
5
3
4
4
5
5
5
```

##### 注意：

- 此题中给出的关系对可能存在重复





---



## 题目分析：

### 题目要求：



n头牛，给出多组互相可以看见的牛，求所有牛的最大高度是多少？

并且，如果两头牛可以互相看到，则两头牛中间的牛的高度一定小于两端的高度！

### 解题思路：



了解一个性质：

可不可能有两组可看到的牛发生重合，例如：（3, 8），（5, 11），很明显不可能，5要比8小，才能使得3和8看见；5还要比8大，才能使得5和11看见，很明显，已经矛盾了！

所以所有的组数，都不会有覆盖，只可能是嵌套，所以假设原高度都是h，如果当前牛在区间内则必须得减一，才能保证互相看到，假如另一组数据正好包围当前数据，那么由于传递性，最外面要比中间的高，所以中间得减一，最内部还得减一！



这是就可以用到差分序列了，如果假设原数组高度都是h，则差分序列：

g[1] = h；剩下的都是0。即可！

给区间-1操作：

`g[a + 1] --, g[b] ++;`

可以画一下看看！

最后为了得到牛的高度，即将差分序列再转回前缀和序列即可！





> [yxc大神的视频讲解：点击这里！](https://www.acwing.com/video/85/)



## 题解：



注意：a，b大小，逆序时交换一下，方便！

注意：可能有重复数据，则判断一下，防止多减一操作！



```c
#include <iostream>
using namespace std;

const int N = 10010;
int g[N];
bool visit[N][N];

int main()
{
    int n, p, h, m;
    cin >> n >> p >> h >> m;
    
    g[1] = h;
    for(int i = 0, a, b; i < m; i++)
    {
        cin >> a >> b;
        if(a > b) swap(a, b);
        if(!visit[a][b])
        {
            visit[a][b] = true;
            g[a + 1] --;
            g[b] ++; 
        }
    }
    
    for(int i = 1; i <= n; i++)
    {
        g[i] += g[i - 1];
        
        cout << g[i] << endl;
    }
    
    return 0;
}
```



更好一点的话：可以使用set集合来代替数组，毕竟set具有极快的查找速度！



```c
#include <iostream>
#include <set>
using namespace std;

const int N = 10010;
int g[N];

int main()
{
    int n, p, h, m;
    cin >> n >> p >> h >> m;
    
    g[1] = h;
    set<pair<int, int>> s;
    for(int i = 0, a, b; i < m; i++)
    {
        cin >> a >> b;
        if(a > b) swap(a, b);
        if(!s.count({a, b}))
        {
            s.insert({a, b});
            g[a + 1] --;
            g[b] ++; 
        }
    }
    
    for(int i = 1; i <= n; i++)
    {
        g[i] += g[i - 1];
        
        cout << g[i] << endl;
    }
    
    return 0;
}
```

