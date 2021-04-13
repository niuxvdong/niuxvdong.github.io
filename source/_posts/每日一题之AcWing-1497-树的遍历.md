---
title: 每日一题之AcWing 1497.树的遍历
author: ITNXD
toc: true
abbrlink: 20698
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@c200773d85f5eb15e2deb2c05823538e4c5f2fe8/2021/03/21/2efbc4cb93b487fd05b4faaa113a1b7d.png
categories:
  - AcWing
tags:
  - 树的遍历
date: 2021-03-23 15:46:10
updated:
---







> 题目链接：[AcWing 1497.树的遍历](https://www.acwing.com/problem/content/1499/)
>
> 经典的题目，给定中序和后序遍历得到层序遍历！





# 一、题解





一道经典的问题，通过中序和后序遍历建树，然后再bfs搜一遍即可得到层序遍历的结果！





**如何通过中序和后序进行建树呢？**



1. 我们知道，后序遍历的最后一个节点是根节点
2. 中序遍历可以通过后序遍历得到的根节点将该序列分为两部分，左子树和右子树
3. 然后即可递归的找到每一个根节点





**一个问题，如何快速的从中序遍历序列中找到根节点所在的下标呢？**



很简单，在进行输入中序遍历的时候可以使用哈希表将中序遍历的值和下标进行一次存储，便可在使用的时候通过`O(1)`的时间内将其找出来！



**其他存储：**

左右子树的存储同样使用哈希表进行存储，很方便！



**具体来说：**



1. 需要一个递归函数，该函数返回值为当前的根节点
2. 参数为当前中序遍历的区间`[il, ir]`和后序遍历的区间`[pl, pr]`
3. 若中序序列中根节点的下标为`k`，则可以得到：
   1. 对于左子树：`(il, k - 1, pl, k - 1 - il + pl)`
   2. 对于右子树：`(k + 1, ir, k - 1 - il + pl + 1, pr - 1)`





**时间复杂度**：`O(n)`

**空间复杂度**：`O(n)`



# 二、AC代码



**参考代码：**



```c++
#include <iostream>
#include <unordered_map>
#include <queue>

using namespace std;

const int N = 40;
int n, postOrder[N], inOrder[N];
unordered_map<int, int> l, r, pos;

// 中序左右，后序左右
int build(int il, int ir, int pl, int pr){
    int root = postOrder[pr];
    int k = pos[root];
    if(il < k) l[root] = build(il, k - 1, pl, k - 1 - il + pl);
    if(ir > k) r[root] = build(k + 1, ir, k - 1 - il + pl + 1, pr - 1);
    return root;
}

void bfs(int root){
    queue<int> q;
    q.push(root);
    while(q.size()){
        int k = q.front();
        q.pop();
        cout << k << " ";
        if(l.count(k)) q.push(l[k]);
        if(r.count(k)) q.push(r[k]);
    }
}

int main(){
    cin >> n;
    
    for(int i = 0; i < n; i ++) cin >> postOrder[i];
    for(int i = 0; i < n; i ++) cin >> inOrder[i], pos[inOrder[i]] = i;
    
    int root = build(0, n - 1, 0, n - 1);
    
    bfs(root);
    
    return 0;
}
```

