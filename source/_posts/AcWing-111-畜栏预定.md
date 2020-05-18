---
title: AcWing-111.畜栏预定
author: Mr.Niu
toc: true
abbrlink: 23513
cover: 'https://img.niuxvdong.top/83765f62e4e17e84b572fe33bb52e50c.jpg'
top_img: 'https://img.niuxvdong.top/83765f62e4e17e84b572fe33bb52e50c.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 贪心
  - 堆
date: 2020-03-10 21:22:43
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "460578140" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[111. 畜栏预定](https://www.acwing.com/problem/content/113/)



## 题目背景：



> 贪心证明略过。。。
>
> 本题我在出列排序后的第一头牛时出现了问题，粗心了。。。

#### 题目描述





有N头牛在畜栏中吃草。

每个畜栏在同一时间段只能提供给一头牛吃草，所以可能会需要多个畜栏。

给定N头牛和每头牛开始吃草的时间A以及结束吃草的时间B，每头牛在[A,B]这一时间段内都会一直吃草。

当两头牛的吃草区间存在交集时（**包括端点**），这两头牛不能被安排在同一个畜栏吃草。

求需要的最小畜栏数目和每头牛对应的畜栏方案。

#### 输入格式

第1行：输入一个整数N。

第2..N+1行：第i+1行输入第i头牛的开始吃草时间A以及结束吃草时间B，数之间用空格隔开。

#### 输出格式

第1行：输入一个整数，代表所需最小畜栏数。

第2..N+1行：第i+1行输入第i头牛被安排到的畜栏编号，编号是从1开始的 **连续** 整数，只要方案合法即可。

#### 数据范围

1≤N≤50000
1≤A,B≤1000000

#### 输入样例：

```
5
1 10
2 4
3 6
5 8
4 7
```

#### 输出样例：

```
4
1
2
3
2
4
```



## 题目分析：

### 题目要求：



给出n头牛吃草的时间区间，问最少可以划分几个容器，使得每个容器牛吃草时间不会冲突，端点相同也算冲突！



### 解题思路：



- 根据时间区间的起点排序
- 用小根堆维护当前容器最后一头牛吃草的结束时间
- 若当前牛的起始值比堆顶结束的值都大，则更新堆顶，否则，新建一个节点，存入堆！



至于为什么这样做是对的，那就是数学问题了，我就不细说了，证明请看下方的视频讲解！



先默认排好序后的第一头牛为第一个容器，后面的牛则从2开始循环！

具体看题解下方的解释！



> [yxc大神参考题解：点击这里！](https://www.acwing.com/solution/AcWing/content/1060/)
>
> [yxc视频讲解](https://www.acwing.com/video/88/)



## 题解：





### 题解一：暴力超时TLE代码



结构体的三个变量：时间区间的开始结束和标号！

S数组存储两个值，当前容器的右端点和容器的编号，第一个变量不需要，随便写个0！

内部for循环来找有没有可以放到同一个容器的区间，若能放到一起，则更新容器的右端点！并记录牛的容器编号！

若没有找到可以放到一起的，则新建容器，编号++，右端点为当前牛的右端点，记录牛的编号！





时间复杂度：O(n<sup>2</sup>) TLE



```c
#include <iostream>
#include <algorithm>

using namespace std;

struct Node
{
	int start, end, pos;
};

bool cmp(Node x, Node y)
{
	return x.start < y.start;
}

const int N = 50010;
int n, id[N];
Node T[N], S[N];

int main()
{
	cin >> n;
	
	for(int i = 1; i <= n; i++) cin >> T[i].start >> T[i].end, T[i].pos = i;
	
	sort(T + 1, T + 1 + n, cmp);
	
	S[1] = {0, T[1].end, 1};
	int k = 1, r = 1;
	id[T[1].pos] = 1;
	for(int i = 2; i <= n; i++)
	{
		bool flag = false;
		for(int j = 1; j <= k; j++)
		{
			if(T[i].start > S[j].end)
			{
				S[j].end = T[i].end;
				id[T[i].pos] = S[j].pos;
				flag = true;
				break;
			}
		}
		if(!flag)
		{
			S[++k] = {0, T[i].end, ++r};
			id[T[i].pos] = r;
		}
	}
    cout << k << endl;
	for(int i = 1; i <= n; i++) cout << id[i] << endl;
	return 0;
} 
```



### 题解二：使用堆优化的AC代码



想要从已知的容器中找一个比当前牛起始端点还小的容器，则可以简化为找一个最小的即可！

然后比较容器右端点最小的容器和当前牛的左端点比较即可！

则变成了动态变化的容器求最小值，这不就是堆的性质吗！

可以建立一个优先队列，即小根堆！

每次取堆顶即可，取出来再和当前牛比较！

同样：排好序的第一头牛初始编号为1，先放入堆，for循环从2开始！

堆中存储两个值，第一个为右端点（动态）第二个值为容器编号！

比堆顶还小则新建一个节点，节点编号++，压入堆中！

否则：取出堆顶，更新右端点，压入堆中！

最后容器个数就是堆的大小！



时间复杂度：O(NlogN)



```c
#include <queue>
#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;
typedef pair<int, int> PII;

struct Node
{
	int start, end, pos;
};

bool cmp(Node x, Node y)
{
	return x.start < y.start;
}

const int N = 50010;
int n, id[N];
Node T[N], S[N];

priority_queue <PII, vector<PII>, greater<PII> > heap;

int main()
{
	cin >> n;
	
	for(int i = 1; i <= n; i++) cin >> T[i].start >> T[i].end, T[i].pos = i;
	
	sort(T + 1, T + 1 + n, cmp);
	
	// first -> end , second -> pos
	heap.push({T[1].end, 1});
	id[T[1].pos] = 1;
	for(int i = 2; i <= n; i++)
	{
		if(T[i].start <= heap.top().first)
		{
			int s = heap.size() + 1;
			PII t = {T[i].end, s};
			id[T[i].pos] = s;
			heap.push(t);
		}
		else
		{
			auto t = heap.top();
			heap.pop();
			t.first = T[i].end;
			id[T[i].pos] = t.second;
			heap.push(t);
		}
	}
    cout << heap.size() << endl;
	for(int i = 1; i <= n; i++) cout << id[i] << endl;
	return 0;
} 
```

