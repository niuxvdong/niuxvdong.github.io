---
title: AcWing-114.国王游戏
author: Mr.Niu
toc: true
abbrlink: 55540
cover: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/a748bd6cf1ce9794a730ee2ac026ca16.png'
top_img: 'https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/a748bd6cf1ce9794a730ee2ac026ca16.png'
categories:
  - AcWing
tags:
  - AcWing
  - 贪心
  - 高精度
date: 2020-03-18 21:12:46
updated:
---







## 首先来首歌曲来放松一下吧！

{% meting "1429392929" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[114. 国王游戏](https://www.acwing.com/problem/content/116/)



## 题目背景：



> 贪心 + 高精度
>
> 以前好像在牛客做过一次。。。
>
> 以前的题解链接：[点击这里！]([https://blog.csdn.net/qq_43590403/article/details/98646341?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522158453443719195162540988%2522%252C%2522scm%2522%253A%252220140713.130056874..%2522%257D&request_id=158453443719195162540988&biz_id=0&utm_source=distribute.pc_search_result.none-task](https://blog.csdn.net/qq_43590403/article/details/98646341?ops_request_misc=%7B%22request%5Fid%22%3A%22158453443719195162540988%22%2C%22scm%22%3A%2220140713.130056874..%22%7D&request_id=158453443719195162540988&biz_id=0&utm_source=distribute.pc_search_result.none-task))
>
> 可以再一次温习一下高精度写法以及本题的贪心思路！



#### 题目描述



恰逢 H 国国庆,国王邀请 n 位大臣来玩一个有奖游戏。

首先,他让每个大臣在左、右手上面分别写下一个整数,国王自己也在左、右手上各写一个整数。

然后,让这 n 位大臣排成一排,国王站在队伍的最前面。

排好队后,所有的大臣都会获得国王奖赏的若干金币,每位大臣获得的金币数分别是:

排在该大臣前面的所有人的左手上的数的乘积除以他自己右手上的数,然后向下取整得到的结果。

国王不希望某一个大臣获得特别多的奖赏,所以他想请你帮他重新安排一下队伍的顺序,使得获得奖赏最多的大臣,所获奖赏尽可能的少。

注意,国王的位置始终在队伍的最前面。

#### 输入格式

第一行包含一个整数 n,表示大臣的人数。

第二行包含两个整数 a 和 b,之间用一个空格隔开,分别表示国王左手和右手上的整数。

接下来 n 行,每行包含两个整数 a 和 b,之间用一个空格隔开,分别表示每个大臣左手和右手上的整数。

#### 输出格式

输出只有一行,包含一个整数,表示重新排列后的队伍中获奖赏最多的大臣所获得的金币数。

#### 数据范围

1≤n≤1000
0<a,b<10000

#### 输入样例：

```
3
1 1
2 3
7 4
4 6
```

#### 输出样例：

```
2
```

## 题目分析：

### 题目要求：



一个国王，n个大臣，排成一排，国王在最前边，发一些金币，大臣得到的金币数计算方法为，大臣前面的所有人的左手上的数字乘积除以自己右手的数下取整的到的数。

通过一定的排序，想要达到一个得到金币最多的大臣得到的金币尽可能少！

最后输出这个大臣的金币数！

### 解题思路：



贪心思路：（猜想。。）

按照大臣的左右手乘积从小到大排序，然后找出最大值！



证明过程：

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2021/02/06/942034150e5f0ea74d610e3a27758100.png)



由于是累乘，而且每个数最大为10000，则必须使用高精度来存储：

涉及到高精度乘法，除法，比较大小的操作。

这里不做介绍了，参考下面高精度模板：

> [我的傻瓜解释版高精度模板！]([https://blog.csdn.net/qq_43590403/article/details/98651050?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522158453831219724846402107%2522%252C%2522scm%2522%253A%252220140713.130056874..%2522%257D&request_id=158453831219724846402107&biz_id=0&utm_source=distribute.pc_search_result.none-task](https://blog.csdn.net/qq_43590403/article/details/98651050?ops_request_misc=%7B%22request%5Fid%22%3A%22158453831219724846402107%22%2C%22scm%22%3A%2220140713.130056874..%22%7D&request_id=158453831219724846402107&biz_id=0&utm_source=distribute.pc_search_result.none-task))
>
> [yxc官网高精度模板！](https://www.acwing.com/blog/content/277/)



相关题解如下：

> [以前做过一次的题解：点击这里！]([https://blog.csdn.net/qq_43590403/article/details/98646341?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522158453443719195162540988%2522%252C%2522scm%2522%253A%252220140713.130056874..%2522%257D&request_id=158453443719195162540988&biz_id=0&utm_source=distribute.pc_search_result.none-task](https://blog.csdn.net/qq_43590403/article/details/98646341?ops_request_misc=%7B%22request%5Fid%22%3A%22158453443719195162540988%22%2C%22scm%22%3A%2220140713.130056874..%22%7D&request_id=158453443719195162540988&biz_id=0&utm_source=distribute.pc_search_result.none-task))
>
> [yxc大神的题解及证明过程！](https://www.acwing.com/solution/AcWing/content/1062/)
>
> [yxc视频讲解，点击这里！](https://www.acwing.com/video/91/)



## 题解：



这里涉及到的计算都是高精度乘除一个小的数！

比较简单！



可以使用pair来存储 a*b 和 a ，另一个没有存储的数可以直接由二者计算得到！同时也可以借助pair默认排序安装第一个参数排序。。

同时比较两个vector的大小可以借助vector的自动按照字典序比较，当然我们得从高位到低位进行字典序比较，所以需要将vector反转一下，变成下标为0存储最高位即可！



反转方法：可以使用vector构造函数：

```c
vector<int>(a.rbegin(), a.rend())
```

也可以使用：

```c
reverse(c.begin(), c.end());
```

注意：后者会修改原vector！



参考具体代码进行理解！



```c
#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;
typedef pair<int, int> PII;
typedef long long LL;
const int N = 1010;

int n;
PII T[N];
LL S[N], maxn;
// 692
// i=2、1、0

vector<int> mul(vector<int> a, int b)
{
    int t = 0;
    vector<int> c;
    for(int i = 0; i < a.size(); i++)
    {
        t += a[i] * b;
        c.push_back(t % 10);
        t /= 10;
    }
    while(t) c.push_back(t % 10), t /= 10;
    return c;
}

vector<int> div(vector<int> a, int b)
{
    int t = 0;
    vector<int> c;
    bool is_0 = false;
    for(int i = a.size() - 1; i >= 0; i--)
    {
        t = t * 10 + a[i];
        int x = t / b;
        // x 不为0 或前导不是0
        if(x || is_0)
        {
            is_0 = true;
            c.push_back(x);
        }
        t %= b;
    }
    reverse(c.begin(), c.end());
    return c;
}

vector<int> max_vec(vector<int> a, vector<int> b)
{
    if(a.size() > b.size()) return a;
    if(a.size() < b.size()) return b;
    
    if(vector<int>(a.rbegin(), a.rend()) < vector<int>(b.rbegin(), b.rend()))
		return b;
	else return a; 
}

void print(vector<int> res)
{
    for(int i = res.size() - 1; i >= 0; i --) cout << res[i];
}

int main()
{
    cin >> n;
    for(int i = 0; i <= n; i++)
    {
        int l, r;
        cin >> l >> r;
        T[i] = {l * r, l};
    }
    sort(T + 1, T + n + 1);
    
    vector<int> p(1, T[0].second);  // 记录累乘
    vector<int> res(1, 0);			// 记录最大结果 
    for(int i = 1; i <= n; i++)
    {
        res = max_vec(res, div(p, T[i].first/T[i].second));
        p = mul(p, T[i].second);
    }
    
    print(res);
    
    return 0;
}
```

