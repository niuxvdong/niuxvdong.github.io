---
title: AcWing-1324.五子棋
author: Mr.Niu
toc: true
abbrlink: 44380
cover: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_65.jpg'
top_img: 'https://gitcode.net/qq_43590403/images/-/raw/master/img/ACG.GY_65.jpg'
categories:
  - AcWing
tags:
  - AcWing
  - 模拟
date: 2020-02-25 15:29:54
updated:
---



## 首先来首歌曲来放松一下吧！

{% meting "1403215687" "netease" "song" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto"  %}



---



> 题目链接：[1324. 五子棋](https://www.acwing.com/problem/content/description/1326/)



## 题目背景：



#### 题目描述



小 A 和小 B 在下五子棋。

五子棋是在一个由网格构成的棋盘内进行的。

网格有 15 行 15 列，共有 225 个交叉点。

小 A 先手执黑棋，小 B 后手执白棋。

两人轮流下棋，每次下棋都将一个自己的棋子放在棋盘上一个空白的交叉点上。

然而，由于小 A 和小 B 都不知道五子棋的胜利条件，所以即使有一方已经胜利了，他们仍然会继续下棋。

现在想请你帮忙分析一下，所下的棋局是在第几步结束的。

当然，也有可能他们最终仍然没有分出胜负，这时请判定他们平局。

五子棋的胜利条件是这样的：当同一行或同一列或同一斜线（即与网格线成 45° 角的直线）上连续的五个或五个以上交叉点放有同色棋子的时候，立即判定使用该颜色棋子的玩家获得胜利，游戏结束。

#### 输入格式

第一行输入一个正整数 n，表示双方**总共**下了多少步棋。

接下来 n 行，每行两个正整数。其中，第 i 行的两个数 x,y 表示第 i 步的棋子下在了第 x 条横线和第 y 条竖线的交叉点上。若 i 为奇数，则这个棋子是黑棋，否则是白棋。

#### 输出格式

若没有人获得胜利，你需要输出“Tie”（不含引号）。

否则，若小 A 获胜，输出 “A”（不含引号），若小 B 获胜，输出 “B”（不含引号）；并输出一个正整数 w 表示第 w 步下完后游戏应当结束，字母与整数间用一个空格隔开。

#### 数据范围

对于 20% 的数据，游戏结果是平局。
对于 30% 的数据，游戏在最后一手结束。
对于 100% 的数据，0≤n≤225，1≤x,y≤150≤n≤225，1≤x,y≤15。

#### 输入样例：

```
9
1 1
2 1
1 2
2 2
1 3
2 3
1 4
2 4
1 5
```

#### 输出样例：

```
A 9
```

---



## 题目分析：

### 题目要求：



题目意思就是在一个15 x 15 的棋盘下棋，要你求出谁最后赢了，并且是在下第几课棋子时赢的！

### 解题思路：



- 当然还是要下一步棋子，就判断一下是否有人胜利！
- 方法就是要在下棋子的地方展开，如果下了这步棋子，胜利了，那么最后的结果必有这一个棋子，所以从这里展开！
- 有四个方向可能五子连珠：横向，竖向，以及两个斜向！
- 所以直接扫描四个方向即可！
- 五子连珠条件：一个方向的正反向相加再加1大于等于5即可！

## 题解：



由于一个方向的正反完全可以由正或反乘以-1得到，所以只需记录八个方向的相连的四个方向即可。本人用dx 和 dy数组记录。

先后手判断奇偶数即可。

arr 为 0 表示空，为1表示先手，为2表示后手。

win 为 0 表示平局，1表示先手赢，2表示后手赢。

flag 标记是否五子连珠，step 表示胜利时的步数。

需注意越界条件和下一个棋子是否是本方棋色。

一个方向的正向就是+该变量，反向就是-该变量！



```c
#include <cstdio>
#include <iostream> 
#include <algorithm>

using namespace std;

int n;
int arr[20][20];// 1 先手 2 后手 

int main()
{
	cin >> n;
	
	// 四个方向：下、右下、右、右上 
	int dx[4] = {1, 1, 0, -1};
	int dy[4] = {0, 1, 1, 1};
	int step, win = 0;//先手为1，后手为2 
	
	for(int i = 1; i <= n; i++)
	{
		int x, y;
		cin >> x >> y;
		if(i % 2) arr[x][y] = 1;
		else arr[x][y] = 2;
		
		bool flag = false;
		// 判断四个方向 
		for(int j = 0; j < 4; j++)
		{
			int a = 0, b = 0;//一个方向的正反  记录该方向可走的步数 
			// 正向 
			while(true)
			{
				int tx = x + (a + 1) * dx[j];
				int ty = y + (a + 1) * dy[j]; 
				if(tx < 1 || tx > 15 || ty < 1 || ty > 15) break;//越界
				if(arr[x][y] != arr[tx][ty]) break;//棋子颜色不同
				a++;//正方向++ 
			} 
			// 反向 
			while(true)
			{
				int tx = x - (b + 1) * dx[j];
				int ty = y - (b + 1) * dy[j]; 
				if(tx < 1 || tx > 15 || ty < 1 || ty > 15) break;//越界
				if(arr[x][y] != arr[tx][ty]) break;//棋子颜色不同
				b++;//反方向++ 
			}
			
			if(a + b + 1 >= 5) 
			{ 
				flag = true;
				break; 
			}
		} 
		if(flag)
		{
			win = arr[x][y];
			step = i; break;	
		}	
	}
	
	if(win == 0) cout << "Tie" << endl;
	else if(win == 1) printf("A %d\n", step);
	else printf("B %d\n", step);
	
    return 0;
}

```



<center style="color: red; font-size: 25px">欢迎访问！</center>
