---
title: AcWing-93.递归实现组合型枚举
author: Mr.Niu
toc: true
abbrlink: 53888
cover: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_08.jpg'
top_img: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_08.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - DFS
  - 栈
date: 2020-02-28 19:17:32
updated:
---





## 首先来首歌曲来放松一下吧！

{% meting "25638340" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[93. 递归实现组合型枚举](https://www.acwing.com/problem/content/95/)

---



## 题目背景：



> 递归实现，看完本篇你大概将知道递归转化为非递归方法！

#### 题目描述

从 1~n 这 n 个整数中随机选出 m 个，输出所有可能的选择方案。

#### 输入格式

两个整数 n,m ,在同一行用空格隔开。

#### 输出格式

按照从小到大的顺序输出所有方案，每行1个。

首先，同一行内的数升序排列，相邻两个数用一个空格隔开。

其次，对于两个不同的行，对应下标的数一一比较，字典序较小的排在前面（例如1 3 5 7排在1 3 6 8前面）。

#### 数据范围

n>0
0≤m≤n
n+(n−m)≤25

#### 输入样例：

```
5 3
```

#### 输出样例：

```
1 2 3 
1 2 4 
1 2 5 
1 3 4 
1 3 5 
1 4 5 
2 3 4 
2 3 5 
2 4 5 
3 4 5 
```

**思考题**：如果要求使用非递归方法，该怎么做呢？

---



## 题目分析：

### 题目要求：





### 解题思路：





> [一篇好理解的题解，点击这里！](https://www.acwing.com/solution/AcWing/content/812/)



## 题解：



### 题解一：最普通的递归：



不解释了！



```c
#include <iostream> 

using namespace std;

const int N = 30;
int n, m;
int a[N];
bool visit[N];

void dfs(int k, int t, int m)
{
	if(k == m)
	{
		for(int i = 0; i < k; i++) cout << a[i] << " ";
		cout << endl;
		return; 
	}
	for(int i = t + 1; i <= n; i++)
	{
		if(!visit[i])
		{
			a[k] = i;
			visit[i] = true;
			dfs(k + 1, i, m);
			visit[i] = false;
		}
	}
}

int main()
{
	cin >> n >> m;
	dfs(0, 0, m);
	return 0;
}
```

### 题解二：这是错误的。。



题目要求最后要按字典序输出，如果用上次的二进制表示，结果没问题，但是顺序是乱的！没有规律的！

Go Out！



```c
#include <iostream> 

using namespace std;

int n, m;

int main()
{
	cin >> n >> m;
	for(int i = 0; i < 1 << n; i++)
	{
		int k = 0;
		for(int j = 0; j < n; j++)
			if(i >> j & 1) k++;
		if(k == m)
		{
			for(int t = 0; t < n; t++)
				if(i >> t & 1) cout << t + 1 << " ";
			cout << endl; 
		}	
	}
		
	return 0;
}
```



### 题解三：yxc大神的递归，以及递归转非递归：



递归容易爆栈，有时候需要使用非递归！



递归仍然和上一题一样，稍微修改一下，多一个计数器，如果sum + 后面可以取到的数的最大位数 n - u， 还达不到 要求的m为，直接return；后面为了输出按照字典序，要换一下dfs选与不选的顺序，至于为什么（自己大脑稍微模拟一下过程即可）。

接下来就是，转化为非递归的做法，将递归的过程分为三部分，如图上所标示的：

pos 为0，为1，为2，三种状态！

使用State结构体存储状态，多一个pos来标识当前处于的状态：

将初状态鸭压入栈中：`stk.push({0, 0, 0, 0});`

进入while循环来判断三种状态：

- pos = 0，将递归的那一段写进去，改一下变量，将return改为continue，然后将当前状态改为1，压入栈中，将状态0的最后一句dfs也压入栈中。
- pos = 1，将当前状态改为2，压入栈中，将状态1的那一句dfs也压入栈中。
- pos =  2， 直接continue。



```c
#include <stack>
#include <iostream> 

using namespace std;

struct State
{
	int pos, u, sum, state;	
};

int n, m;

void dfs(int u, int sum, int state)
{
	// pos = 0
	if(sum + n - u < m) return;
	if(sum == m)
	{
		for(int i = 0; i < n; i++)
			if(state >> i & 1) cout << i + 1 <<" ";
		cout << endl;	
		return;
	}
	dfs(u + 1, sum + 1, state | 1 << u);
	// pos = 1
	dfs(u + 1, sum, state);
	// pos = 2
}

int main()
{
	cin >> n >> m;
	//dfs(0, 0, 0);
	stack<State> stk;
	stk.push({0, 0, 0, 0});
	
	while(stk.size())
	{
		State t = stk.top();
		stk.pop();
		
		if(t.pos == 0)
		{
			if(t.sum + n - t.u < m) continue;
			if(t.sum == m)
			{
				for(int i = 0; i < n; i++)
					if(t.state >> i & 1) cout << i + 1 << " ";
				cout << endl;
				continue;
			}
			
			t.pos = 1;
			stk.push(t);
			stk.push({0, t.u + 1, t.sum + 1, t.state | 1 << t.u});
		}
		else if(t.pos == 1)
		{
			t.pos = 2;
			stk.push(t);
			stk.push({0, t.u + 1, t.sum, t.state});
		}
		else continue;
	}
	
	return 0;
}
```

