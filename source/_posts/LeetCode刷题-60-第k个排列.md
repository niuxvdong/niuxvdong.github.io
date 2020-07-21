---
title: LeetCode刷题- 60. 第k个排列
author: Mr.Niu
toc: true
abbrlink: 40239
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/08/2551073f07a67ad60680fbe2eb942569.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/08/2551073f07a67ad60680fbe2eb942569.png
categories: LeetCode刷题
tags:
  - 全排列
date: 2020-07-20 21:42:25
updated:
---









> 题目链接：[60. 第k个排列]( https://leetcode-cn.com/problems/permutation-sequence/)



# 题解：



> 依次考虑每一位，很是巧妙的做法！



## 题目简述：



求一个序列字典序的第k个排列！

## 题解一：





**直接使用全排列函数**：`next_permutation()`

第k个序列，就是要循环`k - 1`次。



**时间复杂度**：$O(n! \times k)$



## AC代码一：



```c++
class Solution {
public:
    string getPermutation(int n, int k) {
        string res;
        for(int i = 1; i <= n; i++) res += i + '0';
        for(int i = 0; i < k - 1; i++){
            next_permutation(res.begin(), res.end());
        }
        return res;
    }
};
```





## 题解二：

**计数**

**思路**：

- 从高到低依次考虑每一位
- 对于每一位，从小到大枚举没有使用过的数，确定当前位

**看下方的一个例子**：` n = 4, k = 10`



第一位放1，后面有3！= 6种情况，放2后面也有3！= 6种情况，而k = 10，所以第一位一定是2，k = 10 - 6= 4

第二位放1，后面有2！= 2种情况，放3后面也有2！= 2种情况，而k = 4，所以第二位一定是3， k = 4 - 2 = 2

第三位放1，后面有1！= 1种情况，放4后面也有1！= 1种情况，而k = 2，所以第三位一定是4，k = 2 - 1 = 1

第四位放1，后面有1种情况，而k = 1, 所以第四位一定是1，k = 1





![](https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/20/6c7692fd4d611fbd9f1299e2fcb5fee6.png)

**时间复杂度**：$O(n^2)$



**注意：**

- `else`内进入后即已经找到当前为改填的数，标记为`true`后直接`break`！

## AC代码二：



```c++
class Solution {
public:
    string getPermutation(int n, int k) {
        string res;
        vector<bool> vis(10);
        for(int i = 0; i < n; i++){
            int fact = 1;
            for(int j = 1; j <= n - i - 1; j++) fact *= j;
            for(int j = 1; j <= n; j++){
                if(!vis[j]){
                    if(fact < k) k -= fact;
                    else {
                        res += j + '0';
                        vis[j] = true;
                        break;
                    }
                }
            }
        }
        return res;
    }
};
```



