---
title: AcWing-109.天才ACM
author: Mr.Niu
toc: true
abbrlink: 45606
cover: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/758af1487930ce44515582ac268dbbac.png'
top_img: 'https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2021/02/06/758af1487930ce44515582ac268dbbac.png'
categories:
  - AcWing
tags:
  - AcWing
  - 倍增
  - 归并排序
  - 贪心
date: 2020-03-07 16:44:34
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "449818741" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[109. 天才ACM](https://www.acwing.com/problem/content/111/)



## 题目背景：



> 又是一道好题，参考了许多题解，明白后，有因为粗心，debug了好久才AC了！

#### 题目描述



给定一个整数 M，对于任意一个整数集合 S，定义“校验值”如下:

从集合 S 中取出 M 对数(即 2∗M 个数，不能重复使用集合中的数，如果 S 中的整数不够 M 对，则取到不能取为止)，使得“每对数的差的平方”之和最大，这个最大值就称为集合 S 的“校验值”。

现在给定一个长度为 N 的数列 A 以及一个整数 T。

我们要把 A 分成若干段，使得每一段的“校验值”都不超过 T。

求最少需要分成几段。

#### 输入格式

第一行输入整数 K，代表有 K 组测试数据。

对于每组测试数据，第一行包含三个整数 N,M,T 。

第二行包含 N 个整数，表示数列A1,A2…AN。

#### 输出格式

对于每组测试数据，输出其答案，每个答案占一行。

#### 数据范围

1≤K≤12
1≤N,M≤500000
0≤T≤10<sup>18</sup>
0≤Ai≤2<sup>20</sup>

#### 输入样例：

```
2
5 1 49
8 2 1 7 9
5 1 64
8 2 1 7 9
```

#### 输出样例：

```
2
1
```



---



## 题目分析：

### 题目要求：



校验值：就是每对数的差的平方之和

将一个序列分成若干段，使得每一段的校验值都不超过T，求可分成的最小段数！

每一段要取出M对数，即2 * M 个数，取到不能取为止！

### 解题思路：



贪心 + 归并(只用到合并) + 倍增



首先一段的校验值最大，很简单，直接排序后，取一个最大值和一个最小值，每次都去最大最小即可，这样贪心得到的校验值就是这一段的最大值！（当然不能重复取！）



如何可以使得段数尽可能的小了？

那么一段要取多长？

我们可以进行二分，每次都将二分得到的区间计算的到的校验值和T比较即可，然后动态的改变右端点！

但是这样得到的区间要想计算校验值，得进行该序列的排序，用到sort，复杂度石灰超时的！

这是可以用倍增来解决这个问题！

要想使段数尽可能少，则要保证每一段在不超过T的情况下，尽可能的长！

用 l 和 r 指向区间的左右端点，若区间不超过T，就进行倍增拓展长度（p），p 成倍增加，r 也要一直后移；若某次成倍增加是校验值超过T，则当前p就得成倍减少，直到p为0，此时就是说明找到了不超过T的最大长度！

第一段开始，已排序序列b数组需要和那段倍增的长度进行拓展，需要进行排序，但是 b 数组已经有序，根本不需要去整段去排序，将倍增长度排序后，直接使用归并进行两个序列的合并，得到一个新数组即可！

其后的每一段合并时，b数组都是排好序的，这样可以大大减少时间消耗！



b数组用来保存处理过的序列，c数组来保存每次倍增多出来的序列，temp数组来保存b和c合并后的序列！

若当前序列不超过T，则将合并后的序列temp归还给b数组（表示处理过且当前是有序序列），返回true，右端点右移到倍增后的位置，p继续倍增！

若当前序列超过了T，则直接返回false，此时b数组的存储没有被改变，然后p倍减！



为什么会比二分更优化呢？

因为每次的b数组都是有序的，不需要排序，省了很多时间！



可以参考代码中的注释进行详细了解！

也可以参考如下的一篇题解！



> [参考题解：点击这里！](https://www.cnblogs.com/BigYellowDog/p/11278993.html)



## 题解：



注意：

校验值可能会溢出，要使用long long！

以防倍增后使右端点溢出，使用`t = min(r + p, n - 1)` 来进行约束！

每一段找到右端点后，当前段在b数组就是有序的！



```c
#include <iostream>
#include <algorithm>

using namespace std;
typedef long long LL;

const int N = 5e5 + 10;

int K, n, m;
LL a[N], b[N], c[N], temp[N], T;

// 合并 l1~r1 和 l2~r2
int merge(int l1, int r1, int l2, int r2)
{
    int i = l1, j = l2, k = 0;
    
    while(i <= r1 && j <= r2)
    {
        if(b[i] <= c[j]) temp[k++] = b[i++];
        else temp[k++] = c[j++];
    }
    
    while(i <= r1) temp[k++] = b[i++];
    while(j <= r2) temp[k++] = c[j++];
    return k;
}

// 当前l ~ r1 是有序的 
bool check(int l, int r1, int r2)
{
	// 将 r1 + 1 ~ r2(倍增序列)存储起来 
    for(int i = r1 + 1; i <= r2; i++) c[i] = a[i];
    // 排序倍增序列 
    sort(c + r1 + 1, c + r2 + 1);
    // 合并倍增序列与已排好序的序列 
    int len = merge(l, r1, r1 + 1, r2);
    
    // 合并后的有序序列 计算校验值 
    LL cnt = 0, head = 0, tail = len - 1, sum = 0;
    while(cnt < m && head < tail)
    {
        sum += (temp[head] - temp[tail]) * (temp[head] - temp[tail]);
        head ++, tail --, cnt ++; 
    }
    if(sum > T) return false;
    else
    {
    	// 小于T 将临时temp存回到b数组，此时b数组是一个有序序列 
        int k = 0;
        for(int i = l; i <= r2; i++) b[i] = temp[k++];
        return true;
    }
}

int main()
{
    cin >> K;
    while(K--)
    {
        cin >> n >> m >> T;
        for(int i = 0; i < n; i++) cin >> a[i];
        
        int l = 0, r = 0, p, nes = 0, t;
        
        // 若 r 到了最后就退出 
        while(r < n - 1)
        {
        	// b 在这里每次存储一段序列的头部！r 初始指向 l, p初始倍增为1 nes统计序列段数 
            b[l] = a[l], r = l, p = 1, nes++;
            // p 为0时，即找到了序列的最大长度 
            while(p)
            {
            	// 倍增后的右端点 
            	t = min(r + p, n - 1);
            	// 若此时的合并后的序列的校验值 <= T 则p倍增 合并完成的右端点r后移 否则：p倍减 
                if(check(l, r, t)) r = t, p <<= 1;
                else p >>= 1;
                // 保证r  不超过 n - 1  说明走到了序列末 是切割的最后一段 
                if(r == n - 1) break;
            }
            // 下一段开始的位置 
            l = r + 1;
        }
        cout << nes << endl;
    }
    
    return 0;
}
```

