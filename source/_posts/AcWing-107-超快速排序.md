---
title: AcWing-107.超快速排序
author: Mr.Niu
toc: true
abbrlink: 8382
img: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/e%20(24).jpg'
thumbnail: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/e%20(24).jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 归并排序
  - 逆序对
date: 2020-03-06 11:58:14
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "1346104327" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[107. 超快速排序](https://www.acwing.com/problem/content/109/)



## 题目背景：



> 又是归并排序求逆序对的问题！
>
> 参考我关于这类问题的一篇题解：[AcWing-788.逆序对的数量](https://niuxvdong.top/posts/25834.html)

#### 题目描述



在这个问题中，您必须分析特定的排序算法----超快速排序。

该算法通过交换两个相邻的序列元素来处理n个不同整数的序列，直到序列按升序排序。

对于输入序列`9 1 0 5 4`，超快速排序生成输出`0 1 4 5 9`。

您的任务是确定超快速排序需要执行多少交换操作才能对给定的输入序列进行排序。

#### 输入格式

输入包括一些测试用例。

每个测试用例的第一行输入整数n，代表该用例中输入序列的长度。

接下来n行每行输入一个整数ai,代表用例中输入序列的具体数据，第i行的数据代表序列中第i个数。

当输入用例中包含的输入序列长度为0时，输入终止，该序列无需处理。

#### 输出格式

对于每个需要处理的输入序列，输出一个整数op，代表对给定输入序列进行排序所需的最小交换操作数，每个整数占一行。

#### 数据范围

0≤N<500000
0≤ai≤999999999

#### 输入样例：

```
5
9
1
0
5
4
3
1
2
3
0
```

#### 输出样例：

```
6
0
```



## 题目分析：

### 题目要求：



就是求逆序对的数目，遇到0结束输入！



### 解题思路：



同样是归并排序再求逆序对的数目：

`sum += mid - i + 1;`

详细题解看类似的题目下面这篇我之前写的题解！

> [AcWing-788.逆序对的数量](https://niuxvdong.top/posts/25834.html)



## 题解：



注意：以防越界，全部改为long long！

```c
#include <iostream>

using namespace std;
typedef long long LL;

const int N = 500010;

LL a[N], temp[N];
LL n, sum;

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
    while(cin >> n && n)
    {
        sum = 0;
        for(int i = 0, x; i < n; i++) cin >> a[i];
        
        merge_sort(0, n - 1);
        cout << sum << endl;
    }
    return 0;
}
```

