---
title: LeetCode刷题-48.旋转图像
author: Mr.Niu
toc: true
abbrlink: 39221
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/fad941d32ceb2a5488fdb34d132743a1.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/fad941d32ceb2a5488fdb34d132743a1.png
categories: LeetCode刷题
tags:
  - 旋转
date: 2020-07-07 10:53:21
updated:
---



















> 题目链接：[48.旋转图像]( https://leetcode-cn.com/problems/rotate-image/)



# 题解：



> 将一个矩阵反转，顺时针，逆时针，以及180度反转！
>
> 有更精妙的方法吗？详见下文！



## 题目简述：

将一个矩阵顺时针反转90度！

不能使用额外的数组！

## 题解：

**第一想法**：转圈来回换，例如1 3 9 7，2 6 8 4， ...

但是找下标的关系会很复杂，我第一次就是这样做的，果然，找下标成功将我绕晕了！

**有没有更好的办法了？**

**有的！**



- 对于顺时针90度，先按主对角线对称，再按中间竖线对称！

- 对于逆时针90度，先按主对角线对称，再按中间横线对称！

- 对于180度，先按主对角线对称，再按副对角线对称！





**顺时针90度：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/28704e149047f611dc7b3f02a055ecf3.png)

**逆时针90度：**

![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/1756276eacb08963189833b07d18b5e9.png)



**180度**：



![](https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/a2d276068952a25459c49e6ef8cd071d.png)





## AC代码：



```c++
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for(int i = 0; i < n; i++){
            for(int j = 0; j < i; j++){
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        for(int i = 0; i < n; i++){
            for(int j = 0, k = n - 1; j < k; j++, k--){
                swap(matrix[i][j], matrix[i][k]);
            }
        }
    }
};
```



