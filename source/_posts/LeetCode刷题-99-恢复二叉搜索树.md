---
title: LeetCode刷题-99. 恢复二叉搜索树
author: Mr.Niu
toc: true
abbrlink: 9694
top_img: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/03/3a0eaccd4cf2bb974d9f9d308550fc18.png
cover: >-
  https://cdn.jsdelivr.net/gh/niuxvdong/pic@latest/2020/08/03/3a0eaccd4cf2bb974d9f9d308550fc18.png
categories: LeetCode刷题
tags:
  - Morris-traversal
  - 递归
  - DFS
date: 2020-08-03 18:16:32
updated:
---







> 题目链接：[99. 恢复二叉搜索树]( https://leetcode-cn.com/problems/recover-binary-search-tree/)



# 题解：



> 一个占用空间为`O(1)`的新的二叉树遍历算法面世！



## 题目简述：

交换了两个节点的二叉搜索树，需要我们将其恢复回来！

要求空间复杂度为`O(1)`

## 题解一：空间O(n)



**先给出空间占用为O(n)的算法！**



**当前很好想，就是使用递归或非递归的栈来实现！**



**现在先简单介绍一下这题怎么能找出两个被交换的节点？**

我们知道，二叉搜索树中序遍历有序，若交换两个点会造成**逆序对**出现，我们就根据逆序对来找两个点的位置！

两种情况：

- 交换两元素相邻：如 1 3 2 4 5 6 7，即3，2逆序对，就是交换的两个节点 
- 交换两元素不相邻：如 1 6 3 4 5 2 7，即6，2交换，对于**相邻元素的逆序对**有两个，即`6 3`和`5 2`，即交换位置为第一个相邻元素逆序对的第一个值和第二个相邻元素逆序对的第二个值！





**具体做法：**

- 与中序遍历递归写法一样，多一个指针指向当前节点的上一个节点`last`，每次进行相邻元素判断是否是逆序对，是则更新两个交换指针`first, second`，之后再次遇到只更新`second`即可
- 最后进行两节点值的交换`swap(first->val, second->val)`





**时间复杂度**：`O(n)`

**空间复杂度**：`O(n)`

## AC代码一：



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* first, *second, *last;
    void recoverTree(TreeNode* root) {
        dfs(root);
        swap(first->val, second->val);
    }
    void dfs(TreeNode* root){
        if(!root) return;
        dfs(root->left);
        if(last && last->val > root->val){
            if(!first) first = last, second = root;
            else second = root;
        }
        last = root;
        dfs(root->right);
    }
};
```









## 题解二：空间O(1)



为了符合题目要求只能使用这个牛逼有难写的`Morris`遍历，可将空间复杂度降低到O(1)!



`Morris-traversal`：核心就是将栈进行了优化，非递归栈的最大作用是为了回溯时找到该节点（即栈顶），而这个遍历就是为了优化这一步！优化步骤：将子树最后遍历的节点的右指针指向要回溯的节点！



**该遍历算法流程：**

- 若该节点没有左子树，则**遍历当前节点**，然后遍历右子树
- 若该节点有左子树，则找该节点的前驱结点`p`（即指向该节点的节点，这里指的是该子树要遍历的最后一个节点）
  - 若`p->right == NULL`：说明我们的遍历顺序是从上面下来的，即该左子树并没有进行遍历，然后将前驱结点指向根节点`p->right = root` ，继续遍历左子树`root = root->left`！
  - 若`p->right != NULL`：说明我们的遍历顺序是从下面上去的，则该左子树已经遍历过了，将当前状态清空`p->right = NULL`，**遍历当前节点**，继续遍历右子树`root = root->right`！
- 我们要在上面两处遍历当前点的情况时进行寻找逆序对，和题解一一样！
- 最终结果：将`first second`的值进行交换即可！



**如何去找该子树最后一个被遍历的节点？**

很简单，即先往左走一步，然后一直往右走到底就是该节点！想想是不是！右节点一定是最后遍历的！



**注意：** 

- 找该节点时的条件为：`p->right && p->right != root`，使用`p->right != root`，防止形成环成为死循环！









**时间复杂度**：关键在于求前驱结点的`while`循环，求前驱结点的最坏情况为`O(n)`，然而对于二叉树来说，每条边最多被遍历两次，时间复杂度为O(2n)，即为`O(n)`

**哪两次呢？** 第一次：对于左儿子没有右子树的情况，后面的点即左儿子最多会被根节点遍历一次！第二次：对于左儿子有右子树的情况，后面的点最多被根节点遍历一次！终上所述，每个节点最多遍历两次！

**空间复杂度**：没有开辟额外空间，为`O(1)`

## AC代码二：





```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    void recoverTree(TreeNode* root) {
        TreeNode *first = NULL, *second = NULL, *last = NULL;
        while(root){
            // 没有左子树
            if(!root->left){
                // 遍历当前根节点
                if(last && last->val > root->val){
                    if(!first)  first = last, second = root;
                    else second = root;
                }
                // 更新当前节点的上一个节点为当前节点
                last = root;
                // 走向右子树
                root = root->right;
            }else{ // 有左子树
                // 走向第一个左儿子
                auto p = root->left; 
                // 走向第一个左儿子的最右边即前驱结点
                while(p->right && p->right != root) p = p->right;
                // 说明是从上面下来的
                if(!p->right) p->right = root, root = root->left;
                else{ // 说明是从下面上来的
                    // 恢复该指针
                    p->right = NULL;
                    // 遍历当前节点
                    if(last && last->val > root->val){
                        if(!first)  first = last, second = root;
                        else second = root;
                    }
                    last = root;
                    // 走向右子树
                    root = root->right;
                }
            }
        }
        swap(first->val, second->val);
    }
};
```

