---
title: LeetCode刷题-79. 单词搜索
author: Mr.Niu
toc: true
abbrlink: 24999
top_img: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/23/0333ec0280a1d881254d0c877b62b071.png
cover: >-
  https://cdn.itnxd.eu.org/gh/niuxvdong/pic/2020/07/23/0333ec0280a1d881254d0c877b62b071.png
categories: LeetCode刷题
tags:
  - 递归
  - 搜索
date: 2020-07-23 10:52:15
updated:
---

















> 题目链接：[79. 单词搜索]( https://leetcode-cn.com/problems/word-search/)



# 题解：



> 纯搜索题！



## 题目简述：



在一个矩阵中找一个字符串，看是否存在，找的时候只能上下左右找，不能走走过的地方！

## 题解：

**DFS搜索：** `bool dfs(int x, int y, int u)`

- `x, y`：为当前位置下标
- `u`：记录当前搜到的个数
- 递归出口：`u == word.size() - 1`

**思路：**

- 把每个点都当做起点进行搜索，每次搜索四个方向
- 若当前搜索位置和待匹配字符不匹配，直接`return false`
- 否则标记当前位置为`*`表示该位置已使用，且无法与待匹配字符进行匹配
- 开始搜索四个方向，保证下标不越界
- 如果有一个方向符合条件，直接终止搜索，返回`return true`，即`if(dfs(tx, ty, u + 1)) return true;`（可以保证有一条有效路径就直接终止搜索）
- `for`循环结束，说明当前位置无法继续向前，还原该位置标记，返回`return false`
- 有一个起点符合即终止，全部起点都不匹配，直接返回`return false`



**注意：**

- 向四个方向搜索，判断条件没有写是否访问该点，其实写不写都可以，因为下一次搜索如果搜索上一次用过的，会在下一次搜索的第一句话直接返回`false`，所以无影响

**时间复杂度：** 由于有n<sup>2</sup>个起点，每个起点除了第一个位置四个方向，后面都是三个方向（不能走回头路），每个方向的深度为`k`即待匹配字符串的长度，所以总时间复杂度为：O(n <sup>2</sup> * 3 <sup>k</sup>)。是一个指数级别的爆搜，会爆掉时间，但是一般由于数据较水，也可以通过剪枝，使得搜到的子问题很小，一般不需要考虑爆搜时间复杂度！

## AC代码：不使用数组标记



```c++
class Solution {
public:
    vector<vector<char>> board;
    string word;
    bool exist(vector<vector<char>>& _board, string _word) {
        board = _board, word = _word;
        int n = board.size(), m = board[0].size();
        for(int i = 0; i < n; i++)
            for(int j = 0; j < m; j++)
                if(dfs(i, j, 0)) return true;
        return false;
    }
    bool dfs(int x, int y, int u){
        if(board[x][y] != word[u]) return false;
        if(u == word.size() - 1) return true;

        char t = board[x][y];
        board[x][y] = '*';
        int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
        for(int i = 0; i < 4; i++){
            int tx = x + dx[i], ty = y + dy[i];
            if(tx >= 0 && tx < board.size() && ty >= 0 && ty < board[0].size()){
                if(dfs(tx, ty, u + 1)) return true;
            }
        }
        board[x][y] = t;
        return false;
    }
};
```



## AC代码：使用数组标记

由于使用数组标记，就不具备上面的注意点那条性质了，必须乖乖的判断是否访问过！

这样写会额外开辟一个数组空间，显然前者更加优一点！



```c++
class Solution {
public:
    vector<vector<char>> board;
    vector<vector<bool>> vis;
    string word;
    bool exist(vector<vector<char>>& _board, string _word) {
        board = _board, word = _word;
        int n = board.size(), m = board[0].size();
        vis = vector<vector<bool>>(n, vector<bool>(m));
        for(int i = 0; i < n; i++)
            for(int j = 0; j < m; j++)
                if(dfs(i, j, 0)) return true;
        return false;
    }
    bool dfs(int x, int y, int u){
        if(board[x][y] != word[u]) return false;
        if(u == word.size() - 1) return true;

        vis[x][y] = true;
        int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
        for(int i = 0; i < 4; i++){
            int tx = x + dx[i], ty = y + dy[i];
            if(tx >= 0 && tx < board.size() && ty >= 0 && ty < board[0].size() && !vis[tx][ty]){
                if(dfs(tx, ty, u + 1)) return true;
            }
        }
        vis[x][y] = false; 
        return false;
    }
};
```

