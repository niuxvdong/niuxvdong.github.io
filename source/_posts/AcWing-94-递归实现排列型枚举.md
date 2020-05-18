---
title: AcWing-94.递归实现排列型枚举
author: Mr.Niu
toc: true
abbrlink: 45388
cover: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/ACG.GY_51.jpg'
top_img: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/ACG.GY_51.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - DFS
date: 2020-02-28 21:10:57
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "355992" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[94. 递归实现排列型枚举](https://www.acwing.com/problem/content/description/96/)

---



## 题目背景：



#### 题目描述

把 1~n 这 n 个整数排成一行后随机打乱顺序，输出所有可能的次序。

#### 输入格式

一个整数n。

#### 输出格式

按照从小到大的顺序输出所有方案，每行1个。

首先，同一行相邻两个数用一个空格隔开。

其次，对于两个不同的行，对应下标的数一一比较，字典序较小的排在前面。

#### 数据范围

1≤n≤9

#### 输入样例：

```
3
```

#### 输出样例：

```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

---



## 题目分析：

### 题目要求：



全排列，字典序小的在前！

### 解题思路：



具体看代码以及注释和介绍！



## 题解：



### 题解一：最普通的递归：



不解释了！没什么说的，极易理解！



```c
#include <iostream> 

using namespace std;

int n;
int a[10];
bool visit[10];

void dfs(int u)
{
	if(u == n)
	{
		for(int i = 0; i < n ; i++) cout << a[i] << " ";
		cout << endl;
		return;
	}
	for(int i = 1; i<= n; i++)
	{
		if(!visit[i])
		{
			a[u] = i;
			visit[i] = true;
			dfs(u + 1);
			visit[i] = false;
		}
	}
}

int main()
{
	cin >> n;
	dfs(0);
	return 0;
}
```



### 题解二：yxc大神的使用vector的版本



auto 是C++ 11 的新特性，要想编译通过，需要在编译器设置好！具体百度！

和上面注释掉的for循环是一样的！

用state存储二进制状态，u表示当前枚举到的数，退出条件：u == n 时！

dfs结束后记得还原vector的状态！



```c
#include <vector>
#include <iostream> 

using namespace std;

int n;
vector<int> v;

void dfs(int u, int state)
{
	if(u == n)
	{
		//for(int i = 0; i < v.size() ; i++) cout << v[i] << " ";
		for(auto x : v) cout << x << " ";
		cout << endl;
		return;
	}
	for(int i = 1; i<= n; i++)
	{
		if(!(state >> i & 1))
		{
			v.push_back(i);
			dfs(u + 1, state | 1 << i);
			v.pop_back();
		}
	}
}

int main()
{
	cin >> n;
	dfs(0, 0);
	return 0;
}
```

