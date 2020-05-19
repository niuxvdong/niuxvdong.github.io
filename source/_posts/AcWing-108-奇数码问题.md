---
title: AcWing-108.奇数码问题
author: Mr.Niu
toc: true
abbrlink: 12934
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/e%20(19).jpg'
top_img: 'https://img.niuxvdong.top/eba0733c87a792c109efa331dbd363e3.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 归并排序
  - 逆序对
  - 奇偶性
date: 2020-03-06 16:12:44
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "1334295185" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[108.奇数码问题](https://www.acwing.com/problem/content/110/)



## 题目背景：



> 同样是归并排序求逆序对的问题！
>
> 参考我关于这类问题的一篇题解：[AcWing-788.逆序对的数量](https://niuxvdong.top/posts/25834.html)
>
> 奇偶性很神奇，对于一类问题，如果属于同种性质（奇偶性相同），那么它们就是完全相同（这个在某种意义上说）的，一些特殊的情况又例外！

#### 题目描述



你一定玩过八数码游戏，它实际上是在一个3×3的网格中进行的,1个空格和1~8这8个数字恰好不重不漏地分布在这3×3的网格中。

例如：

```
5 2 8
1 3 _
4 6 7
```

在游戏过程中，可以把空格与其上、下、左、右四个方向之一的数字交换（如果存在）。

例如在上例中，空格可与左、上、下面的数字交换，分别变成：

```
5 2 8       5 2 _      5 2 8
1 _ 3       1 3 8      1 3 7
4 6 7       4 6 7      4 6 _
```

奇数码游戏是它的一个扩展，在一个n×n的网格中进行，其中n为奇数，1个空格和1~n<sup>2</sup>−1这n<sup>2</sup>−1个数恰好不重不漏地分布在n×n的网格中。

空格移动的规则与八数码游戏相同，实际上，八数码就是一个n=3的奇数码游戏。

现在给定两个奇数码游戏的局面，请判断是否存在一种移动空格的方式，使得其中一个局面可以变化到另一个局面。

#### 输入格式

多组数据，对于每组数据：

第1行输入一个整数n，n为奇数。

接下来n行每行n个整数，表示第一个局面。

再接下来n行每行n个整数，表示第二个局面。

局面中每个整数都是0~n<sup>2</sup>−1之一，其中用0代表空格，其余数值与奇数码游戏中的意义相同，保证这些整数的分布不重不漏。

#### 输出格式

对于每组数据，若两个局面可达，输出TAK，否则输出NIE。

#### 数据范围

1≤n<500

#### 输入样例：

```
3
1 2 3
0 4 6
7 5 8
1 2 3
4 5 6
7 8 0
1
0
0
```

#### 输出样例：

```
TAK
TAK
```



## 题目分析：

### 题目要求：



询问是不是可以将一个矩阵中的空位 `_` 通过上下左右交换变成另一个矩阵！

### 解题思路：



先来一个结论：

**奇数码游戏两个局面可达，当且仅当两个局面下网格中的数依次写成1行n*n-1个元素的序列后(不考虑空格)，逆序对个数的奇偶性相同！**

空格左右移动时，写成的序列显然不变;

空格向上(下)移动时，相当于某个数与它后(前)边的n-1个数交换了位置，因为n-1是偶数，所以逆序对数的变化也只能是偶数。

**该结论的充分性证明较为复杂，我们将不在此大篇幅讨论这样一个 数学问题。**



可以参考下面这位同学的简单证明！



> [我之前的题解：归并求逆序对！点击这里！](https://niuxvdong.top/posts/25834.html)
>
> [参考题解：点击这里！](https://www.acwing.com/solution/AcWing/content/1294/)



## 题解：



同样：使用long long，以防溢出！



判断同奇同偶性，可以直接相减的绝对值对2取余即可，若为0，则是同类，若不为0则是一奇一偶！



```c
#include <iostream>

using namespace std;
typedef long long LL;

const int N = 510;
int a[N * N], temp[N * N], n, k;
LL sum, suma, sumb;

void merge_sort(int l, int r)
{
    if(l >= r) return;

    int mid = l + r >> 1;
    merge_sort(l, mid), merge_sort(mid + 1, r);

    int i = l, j = mid + 1, k = 0;
    while(i <= mid && j <= r)
    {
        if(a[i] <= a[j]) temp[k++] = a[i++];
        else
        {
            temp[k++] = a[j++];
            sum += mid - i + 1;
        }
    }

    while(i <= mid) temp[k++] = a[i++];
    while(j <= r) temp[k++] = a[j++];

    for(int i = l, j= 0; i <= r; i++, j++) a[i] = temp[j];
}

int main()
{
    while(cin >> n)
    {
        sum = 0,  k = 0;
        for(int i = 0, x; i < n * n; i++)
        {
            cin >> x;
            if(x) a[k++] = x;
        }
            
        merge_sort(0, n * n - 1);
        suma = sum;
        
        sum = 0,  k = 0;
        for(int i = 0, x; i < n * n; i++)
        {
            cin >> x;
            if(x) a[k++] = x;
        }
        merge_sort(0, n * n - 1);
        sumb = sum;
        
        if(abs(suma - sumb) % 2) cout << "NIE" << endl;
        else cout << "TAK" << endl;
    }
    
    return 0;
}
```

