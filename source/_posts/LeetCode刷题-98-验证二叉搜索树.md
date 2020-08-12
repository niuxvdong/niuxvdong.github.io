---
title: LeetCode刷题-98. 验证二叉搜索树
author: Mr.Niu
toc: true
abbrlink: 58463
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/03/0e45f44c8abbb58a540266046d1e0b7b.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/03/0e45f44c8abbb58a540266046d1e0b7b.png
categories: LeetCode刷题
tags:
  - 二叉搜索树
  - 递归
  - DFS
  - 中序遍历
date: 2020-08-03 18:16:15
updated:
---







> 题目链接：[98. 验证二叉搜索树]( https://leetcode-cn.com/problems/validate-binary-search-tree/)



# 题解：



> 判断是否是二叉搜索树！递归写法有点意思！



## 题目简述：

判断是否是二叉搜索树！

## 题解一：非递归



**我们知道二叉搜索树中序遍历后是有序的！**

**思路：**

- 中序遍历二叉搜索树
- 两个变量指向一前一后
- 若后面大于前面直接返回`false`





**时间复杂度**：`O(n)`

## AC代码一：



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        TreeNode* pre = NULL;
        stack<TreeNode*> stk;
        while(root || stk.size()){
            while(root){
                stk.push(root);
                root = root->left;
            }
            root = stk.top();
            stk.pop();
            if(pre && pre->val >= root->val) return false;
            pre = root;
            root = root->right;
        }
        return true;
    }
};
```





## 题解二：递归

**递归写法就不太好写了！**



**思路：** 由二叉搜索树定义来递归验证，即验证左子树和右子树是否符合，逐级向上，直到根节点！

`dfs`的`vector`返回值存储三项，当前子树是否是二叉搜索树，当前子树的最小值，当前子树的最大值！

**具体来说：**

- 若左子树存在则遍历左子树
  - 若左子树不是二叉搜索树，或者左子树是二叉搜索树但根节点小于左子树的最大值，则说明当前根节点不是二叉搜索树，标记`res[0] = 0`
  - 更新包含当前根节点的子树的最大最小值
- 若右子树存在则遍历右子树
  - 若右子树不是二叉搜索树，或者右子树是二叉搜索树但根节点大于右子树的最小值，则说明当前根节点不是二叉搜索树，标记`res[0] = 0`
  - 更新包含当前根节点的子树的最大最小值
- 返回`res`



**最终结果：** `dfs[root][0]`





**时间复杂度：** 每个节点遍历一次，为 `O(n)`



## AC代码二：



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        if(!root) return true;
        return dfs(root)[0];
    }
    vector<int> dfs(TreeNode* root){
        vector<int> res({1, root->val, root->val});
        if(root->left){
            auto t = dfs(root->left);
            if(!t[0] || t[2] >= root->val) res[0] = 0;
            res[1] = min(res[1], t[1]);
            res[2] = max(res[2], t[2]);
        }
        if(root->right){
            auto t = dfs(root->right);
            if(!t[0] || t[1] <= root->val) res[0] = 0;
            res[1] = min(res[1], t[1]);
            res[2] = max(res[2], t[2]);
        }
        return res;
    }
};
```

