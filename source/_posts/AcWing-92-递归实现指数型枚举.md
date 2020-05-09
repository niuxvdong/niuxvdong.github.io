---
title: AcWing-92.递归实现指数型枚举
author: Mr.Niu
toc: true
abbrlink: 14886
img: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/ACG.GY_41.jpg'
thumbnail: 'https://cdn.jsdelivr.net/gh/niuxvdong/images/img/ACG.GY_41.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - DFS
  - 二进制
  - 状态压缩
date: 2020-02-28 17:02:35
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "1297498908" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



> 题目链接：[92. 递归实现指数型枚举](https://www.acwing.com/problem/content/description/94/)

---



## 题目背景：



> 多种做法！

#### 题目描述

从 1~n 这 n 个整数中随机选取任意多个，输出所有可能的选择方案。

#### 输入格式

输入一个整数n。

#### 输出格式

每行输出一种方案。

同一行内的数必须升序排列，相邻两个数用恰好1个空格隔开。

对于没有选任何数的方案，输出空行。

本题有自定义校验器（SPJ），各行（不同方案）之间的顺序任意。

#### 数据范围

1≤n≤15

#### 输入样例：

```
3
```

#### 输出样例：

```

3
2
2 3
1
1 3
1 2
1 2 3
```



---



## 题目分析：

### 题目要求：



输出任任意位的组合（从小到大），包括0位组合（即输出空行），不限制输出顺序！

### 解题思路：



详见下方四种解法：



> [一篇好理解的题解，点击这里！](https://www.acwing.com/solution/AcWing/content/812/)



## 题解：



注意：选择0位也是一种情况，千万别忘记！要输出一个空行！



### 解法一：本人能想到的最粗糙的做法：



```c
#include <iostream> 

using namespace std;

const int N = 15;
int n, b[N];
bool flag[N];

void dfs(int k, int cnt, int pos)
{
	if(cnt >= k) 
	{
		for(int i = 0; i < k; i++) cout << b[i] << " ";
		cout << endl;
		return;
	}
	
	for(int i = pos + 1; i <= n; i++)
	{
		if(!flag[i])
		{
			b[cnt] = i;
			flag[i] = true;
			dfs(k, cnt + 1, i);	
			flag[i] = false;
		} 
	}
}

int main()
{
	cin >> n;
	for(int i = 0; i <= n; i++) dfs(i, 0, 0);
	return 0;
}
```

### 解法二：使用二进制优化：



和之前做过的类似：将每一位的选择变成0和1的二进制即可，和直接使用数组存储（解法一）不一样的点：

- 添加第 i 位时：`state |= 1 <<(i - 1);`
- 最后还要恢复原状态：`state ^= 1 << (i - 1);`

用到了异或和按位或，不懂的去学习一下！

为何数组不需要恢复状态，而二进制需要恢复状态？

因为数组存储时时从下标为0开始存储，一次dfs结束后，会进入下一次for循环，此时，数组存储的下标仍然是cnt，没有变化，即进行了覆盖，不会影响；

然而：使用二进制就不一样了，二进制存储的是每一位的状态，没有下标的关系，如果不进行恢复状态，下一次for循环可不是数组的原位覆盖，而是在新的地方置为了1，这样state状态就会多一位被选择的数，造成错误答案！



```c
#include <iostream> 

using namespace std;

const int N = 15;
int n, b[N];
bool flag[N];

void dfs(int state, int k, int cnt, int pos)
{
	if(cnt >= k) 
	{
		for(int i = 0; i < n; i++)
			if(state >> i & 1) cout << i + 1 << " ";
		cout << endl;
		return;
	}
	
	for(int i = pos + 1; i <= n; i++)
	{
		if(!flag[i])
		{
			state |= 1 <<(i - 1);
			flag[i] = true;
			dfs(state, k, cnt + 1, i);	
			flag[i] = false;
			state ^= 1 << (i - 1);
		} 
	}
}

int main()
{
	cin >> n;
	for(int i = 0; i <= n; i++) dfs(0, i, 0, 0);
	return 0;
}
```

### 解法三：状态压缩非递归



类似于第二种解法：用state来存储二进制集合，当然共有 2 <sup>n</sup>种，然后第二层for循环直接去从第0位开始扫描即可，遇到1 就输出，遇到0就跳过即可！



本人最喜欢这种做法，既好理解又简洁！推荐！！！



```c
#include <iostream> 

using namespace std;

const int N = 15;
int n, state[N];
bool flag[N];

int main()
{
	cin >> n;
	for(int state = 0; state < 1 << n; state++)
	{
		for(int j = 0; j < n; j++)
			if(state >> j & 1) cout << j + 1 << " ";
		cout << endl;
	}
		
	return 0;
}
```

### 解法四：状态压缩递归形式（来自yxc大神）



也就是第三种解法的递归写法，仍然是每一位数都有两种选择，选与不选，所以，此处的dfs的两个参数，第一个代表当前扫描到了哪一位，state表示当前状态的二进制为情况！

两种状态：

- `dfs(u + 1, state);` ：不选，state 没有进行改变！
- `dfs(u + 1, state | (1 << u));` ：选择，state 已经将 u + 1加入到了state中！

退出条件，扫描到最后一项时进行输出和判断！

总而言之：就像是一个二叉搜索树，都有选与不选两种情况，答案则在最后的叶子节点上！

```c
#include <iostream> 

using namespace std;

const int N = 15;
int n;

void dfs(int u, int state)
{
	if(u == n)
	{
		for(int i = 0; i < n; i++)
			if(state >> i & 1) cout << i + 1 << " ";
		cout << endl;
		return; 
	}
	dfs(u + 1, state);
	dfs(u + 1, state | (1 << u));
} 

int main()
{
	cin >> n;
	dfs(0, 0);
	return 0;
}
```



