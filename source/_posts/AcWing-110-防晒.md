---
title: AcWing-110.防晒
author: Mr.Niu
toc: true
abbrlink: 10715
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/ce8c2bfb909a31b425c145d594cafde9.png'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/ce8c2bfb909a31b425c145d594cafde9.png'
categories:
  - AcWing
tags:
  - AcWing
  - 贪心
  - 排序
date: 2020-03-07 19:36:56
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "536099160" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[110. 防晒](https://www.acwing.com/problem/content/112/)



## 题目背景：



> 贪心的证明就略过了，运用了大量数学知识，二分图。。。。

#### 题目描述



有C头奶牛进行日光浴，第i头奶牛需要minSPF[i]到maxSPF[i]单位强度之间的阳光。

每头奶牛在日光浴前必须涂防晒霜，防晒霜有L种，涂上第i种之后，身体接收到的阳光强度就会稳定为SPF[i]，第i种防晒霜有cover[i]瓶。

求最多可以满足多少头奶牛进行日光浴。

#### 输入格式

第一行输入整数C和L。

接下来的C行，按次序每行输入一头牛的minSPF和maxSPF值,即第i行输入minSPF[i]和maxSPF[i]。

再接下来的L行，按次序每行输入一种防晒霜的SPF和cover值,即第i行输入SPF[i]和cover[i]。

每行的数据之间用空格隔开。

#### 输出格式

输出一个整数，代表最多可以满足奶牛日光浴的奶牛数目。

#### 数据范围

1≤C,L≤2500
1≤minSPF≤maxSPF≤1000
1≤SPF≤1000

#### 输入样例：

```
3 2
3 10
2 5
1 5
6 2
4 1
```

#### 输出样例：

```
2
```



## 题目分析：

### 题目要求：



有一些奶牛，一些防晒霜，最大可能的使更多的牛涂了防晒霜后处于需求范围内！

### 解题思路：



将牛的区间按照左端点从大到小排序，如下图；

从上向下处理每一头牛，扫描当前区间的最大强度的防晒霜即可！



简单解释：

第一头牛从右端点开始找起，找到的一定是在牛的区间范围内最少的，而左边的则可以满足多头牛！



最终答案就是区间上使用了防晒霜的个数！



用完一个就将防晒霜个数--，减到0从容器中删除！





![](https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/d394e4ac22f43a1013d66b9d477d2c94.png)



为了方便，使用map来存储防晒霜，由于防晒霜类型有重复，`sp[spf] += cover;`这里变为+=即可！

找满足牛区间的最大值，可以使用upper_bound(x)函数

- lower_bound(x)  返回大于等于x的最小的数的迭代器

- upper_bound(x)  返回大于x的最小的数的迭代器

找到大于右端点值时，直接--就找到了一个可能存在的防晒霜！

若当前防晒霜在区间内，则当前牛可以满足条件，计数器++；



可参考下面题解：



> [yxc大神参考题解：点击这里！](https://www.acwing.com/solution/AcWing/content/785/)
>
> [yxc视频讲解](https://www.acwing.com/video/87/)



## 题解：



在这里map确实好用！



```c
#include <map>
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 2510;

struct Cow
{
    int first, second;
};

bool cmp(Cow x, Cow y)
{
    if(x.first != y.first) return x.first > y.first;
}

int n, m;
Cow cows[N];
map <int, int> sp;

int main()
{
    cin >> n >> m;
    for(int i = 0; i < n; i++) cin >> cows[i].first >> cows[i].second;
    for(int i = 0; i < m; i++)
    {
        int spf, cover;
        cin >> spf >> cover;
        sp[spf] += cover;
    }
    sort(cows, cows + n, cmp);
    
    int res = 0;
    sp[0] = sp[1001] = n;
    for(int i = 0; i < n; i++)
    {
        // it是一个迭代器！
        auto it = sp.upper_bound(cows[i].second);
        it --;
        if(it->first >= cows[i].first)
        {
            res ++;
            it->second --;
            if(it->second == 0) sp.erase(it);
        }
    }
    cout << res << endl;
    return 0;
}
```

