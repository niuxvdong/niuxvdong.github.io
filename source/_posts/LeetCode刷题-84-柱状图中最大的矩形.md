---
title: LeetCode刷题-84. 柱状图中最大的矩形
author: Mr.Niu
toc: true
abbrlink: 64100
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/25/72c15b5bb85e9a5323409fd48b3c6de5.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/07/25/72c15b5bb85e9a5323409fd48b3c6de5.png
categories: LeetCode刷题
tags:
  - 栈
  - 单调栈
date: 2020-07-25 11:42:07
updated:
---









> 题目链接：[84. 柱状图中最大的矩形]( https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)



# 题解：



> 第二次遇到单调栈了，不太好理解的一个算法和思路！
>
> 和[LeetCode刷题-42.接雨水](https://niuxvdong.top/posts/57751.html)很是类似！



## 题目简述：

给了一堆高高低低的柱子，要求从中找到一个面积最大的矩形！

## 题解：



**首先想一下以某一个柱子为矩形上边界怎样得到该最大矩形？**

很好想，只要在其左右两边找到离他最近的第一个比他矮的柱子即可！因为比他高，则说明可以继续向外拓展，比他矮就不行了！



**到了这里，就会发现本题的实质就是：找到一个数左边第一个比他小的数和右边第一个比他大的数即可，面积就是左右间隔乘以该柱子高度取最大值即可！** 



这里就要想到使用**单调栈**了，**单调栈的核心就是：找到一个数左边第一个比他小的数！**



**现在先稍微解释一下单调栈实现的原理：**

- 由于该栈单调递增，对于当前处理的柱子来说，需要找到左边第一个比他矮的柱子
- 所以从栈顶开始往回看第一个比他矮的，比他高则该栈顶出栈，直到找到比他矮的，然后该柱子进栈
- **一个问题**：删了该栈顶不会影响后面的柱子吗，当然不会！对于后面的柱子，也要找左边第一个比他矮的柱子，如果下一个柱子比当前栈顶高，则第一个矮的就是当前栈顶（即上一个柱子）否则，下一个柱子比当前栈顶矮，则之前出栈的柱子都比他高，所以该出栈柱子不会使第一个比他矮的柱子，即删除的柱子对后面柱子处理不会产生影响！

所以该栈就是扫描到谁就是以谁为栈顶的一个递增序列！





**时间复杂度**：`O(n)`



## TLE代码：



暴力求解左右两边第一个矮柱子！

**时间复杂度**：`O(n^2)` 妥妥超时！



```c++
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int res = 0;
        for(int i = 0; i < heights.size(); i++){
            int j = i + 1, k = i - 1;
            while(j < heights.size() && heights[j] >= heights[i]) j++;
            while(k >= 0 && heights[k] >= heights[i]) k--;
            res = max(res, heights[i] * (j - k - 1));
        }
        return res;
    }
};
```



## AC代码一：单调栈



使用`left[i]，right[i]`来表示`i`柱子左右两边比他第一个矮的柱子的下标！



**对于本题的一些细节：**

- 如果该柱子左边都比他高，则当前柱子的左边比他第一矮的为 -1
- 如果该柱子右边都比他高，则当前柱子的左边比他第一矮的为 n
- 最终答案：`res = max(res, h[i] * (right[i] - left[i] - 1))`



**注意：** 栈第二次使用前要清空



**时间复杂度**：`O(n)`

**空间复杂度：**  `O(n)` 比下面的AC代码二多一点空间，但更好理解



```c++
class Solution {
public:
    int largestRectangleArea(vector<int>& h) {
        int n = h.size();
        vector<int> left(n), right(n);
        stack<int> stk;
        for(int i = 0; i < n; i ++){
            while (stk.size() && h[stk.top()] >= h[i]) stk.pop();
            if (stk.empty()) left[i] = -1;
            else left[i] = stk.top();
            stk.push(i);
        }

        stk = stack<int>();
        for(int i = n - 1; i >= 0; i --){
            while (stk.size() && h[stk.top()] >= h[i]) stk.pop();
            if (stk.empty()) right[i] = n;
            else right[i] = stk.top();
            stk.push(i);
        }

        int res = 0;
        for(int i = 0; i < n; i ++ ) res = max(res, h[i] * (right[i] - left[i] - 1));
        return res;
    }
};
```



## AC代码二：单调栈



相比上一个单调栈的写法：此写法不如上一种好理解！主要是省了两个数组空间...

**思想一模一样， 略有不同：**

上一个直接预处理当前柱子`i`的昨天最矮和右边最矮。

本方法直接处理每个栈顶`t`，即遇到当前柱子`i`比栈顶`t`矮，则说明右边第一个矮的已经找到就是当前柱子`i`，栈顶出栈，而左边第一个比他矮的就更简单了，就是该栈顶的上一个元素`stk.top()`（因为该栈递增，所以栈顶的上一个元素就是当前栈顶左边第一个比他矮的元素），两种情况：

- 若该栈顶没有上一个元素，则说明该栈顶的左边比他矮的没有，则为起始位置，面积为：`h[t] * i`	
- 若该栈顶有上一个元素，则说明当前栈顶（原栈顶已出栈）就是左边第一个比他矮的柱子，面积为：` h[t] * (i - stk.top() - 1)`



**注意：**

- 为了保证栈递增，如果`h[stk.top()] <= h[i]`，则当前柱子直接入栈！

- 为了处理最后一个柱子，将柱子最后加一个`-1`，因为他每次处理的都是`i`柱子之前的栈内的柱子，所以最后一个处理不到，加一个-1，即可处理到！





**综上所述：还是AC代码一既正确又好理解！**





**时间复杂度**：`O(n)`

**空间复杂度：**  `O(n)` 





```c++
class Solution {
public:
    int largestRectangleArea(vector<int>& h) {
        int n = h.size();
        h.push_back(-1);
        stack<int> stk;
        int res = 0;
        for(int i = 0; i <= n; i++){
            while(stk.size() && h[stk.top()] > h[i]){
                int t = stk.top();
                stk.pop();
                if(stk.empty()) res = max(res, h[t] * i);
                else res = max(res, h[t] * (i - stk.top() - 1));
            }
            stk.push(i);
        }
        return res;
    }
};
```

