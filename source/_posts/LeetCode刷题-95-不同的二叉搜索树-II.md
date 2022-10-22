---
title: LeetCode刷题-95. 不同的二叉搜索树 II
author: Mr.Niu
toc: true
abbrlink: 3575
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/03/06cb42b3145cd9442359446004c0d14e.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/08/03/06cb42b3145cd9442359446004c0d14e.png
categories: LeetCode刷题
tags:
  - 二叉搜索树
  - DFS
  - 递归
date: 2020-08-03 18:15:25
updated:
---







> 题目链接：[95. 不同的二叉搜索树 II]( https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)



# 题解：



> 生成所有二叉搜索树！有意思的题！



## 题目简述：

给定一个序列，生成所有二叉搜索树的序列！

## 题解：



**递归DFS：**

对于一个区间的二叉搜索树，我们只需要枚举根节点所在的位置即可，通过递归一步步构建不同的二叉搜索树！

- 从`1 ~ n`开始搜索
- 枚举根节点位置为`l ~ r`
- 递归左子树`l ~ i - 1`，右子树`i + 1 ~ r`
- 由于相当于乘法原理，左子树随便一种情况和右子树随便一种情况组合都是一个合法的二叉搜索树
- 左子树取一种情况，右子树取一种情况，构建根节点，连接起来形成当前结构的二叉搜索树
- 将当前所有二叉搜索树插入`res`并返回



**递归终止条件：**

- `l > r`：即为空树，返回`NULL`
- `n == 0`：即输入为0，直接返回空容器`{}`



**注意：**

- 根节点一定要随用随创建，若创建第一层for循环，会导致覆盖情况发生，由于存储的是指针，最后存储将都会是一样的一个二叉树
- 此处的`res`不能创建到全局的，那样无法完成下一层向上一层的传递





**时间复杂度**：是卡特兰数，n个节点构成的二叉搜索树种类是卡特兰数，即 C<sub>2n</sub><sup>n</sup> / n + 1 ！对于n个点的二叉搜索树，方案数如下：



<svg xmlns="http://www.w3.org/2000/svg" width="21.785ex" height="2.922ex" viewBox="0 -948 9629.1 1291.3" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-130-TEX-I-210E" d="M137 683Q138 683 209 688T282 694Q294 694 294 685Q294 674 258 534Q220 386 220 383Q220 381 227 388Q288 442 357 442Q411 442 444 415T478 336Q478 285 440 178T402 50Q403 36 407 31T422 26Q450 26 474 56T513 138Q516 149 519 151T535 153Q555 153 555 145Q555 144 551 130Q535 71 500 33Q466 -10 419 -10H414Q367 -10 346 17T325 74Q325 90 361 192T398 345Q398 404 354 404H349Q266 404 205 306L198 293L164 158Q132 28 127 16Q114 -11 83 -11Q69 -11 59 -2T48 16Q48 30 121 320L195 616Q195 629 188 632T149 637H128Q122 643 122 645T124 664Q129 683 137 683Z"></path><path id="MJX-130-TEX-I-1D45B" d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z"></path><path id="MJX-130-TEX-N-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path id="MJX-130-TEX-SO-2211" d="M61 748Q64 750 489 750H913L954 640Q965 609 976 579T993 533T999 516H979L959 517Q936 579 886 621T777 682Q724 700 655 705T436 710H319Q183 710 183 709Q186 706 348 484T511 259Q517 250 513 244L490 216Q466 188 420 134T330 27L149 -187Q149 -188 362 -188Q388 -188 436 -188T506 -189Q679 -189 778 -162T936 -43Q946 -27 959 6H999L913 -249L489 -250Q65 -250 62 -248Q56 -246 56 -239Q56 -234 118 -161Q186 -81 245 -11L428 206Q428 207 242 462L57 717L56 728Q56 744 61 748Z"></path><path id="MJX-130-TEX-N-2212" d="M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"></path><path id="MJX-130-TEX-N-31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path><path id="MJX-130-TEX-I-1D458" d="M121 647Q121 657 125 670T137 683Q138 683 209 688T282 694Q294 694 294 686Q294 679 244 477Q194 279 194 272Q213 282 223 291Q247 309 292 354T362 415Q402 442 438 442Q468 442 485 423T503 369Q503 344 496 327T477 302T456 291T438 288Q418 288 406 299T394 328Q394 353 410 369T442 390L458 393Q446 405 434 405H430Q398 402 367 380T294 316T228 255Q230 254 243 252T267 246T293 238T320 224T342 206T359 180T365 147Q365 130 360 106T354 66Q354 26 381 26Q429 26 459 145Q461 153 479 153H483Q499 153 499 144Q499 139 496 130Q455 -11 378 -11Q333 -11 305 15T277 90Q277 108 280 121T283 145Q283 167 269 183T234 206T200 217T182 220H180Q168 178 159 139T145 81T136 44T129 20T122 7T111 -2Q98 -11 83 -11Q66 -11 57 -1T48 16Q48 26 85 176T158 471L195 616Q196 629 188 632T149 637H144Q134 637 131 637T124 640T121 647Z"></path><path id="MJX-130-TEX-N-30" d="M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"></path><path id="MJX-130-TEX-N-2217" d="M229 286Q216 420 216 436Q216 454 240 464Q241 464 245 464T251 465Q263 464 273 456T283 436Q283 419 277 356T270 286L328 328Q384 369 389 372T399 375Q412 375 423 365T435 338Q435 325 425 315Q420 312 357 282T289 250L355 219L425 184Q434 175 434 161Q434 146 425 136T401 125Q393 125 383 131T328 171L270 213Q283 79 283 63Q283 53 276 44T250 35Q231 35 224 44T216 63Q216 80 222 143T229 213L171 171Q115 130 110 127Q106 124 100 124Q87 124 76 134T64 161Q64 166 64 169T67 175T72 181T81 188T94 195T113 204T138 215T170 230T210 250L74 315Q65 324 65 338Q65 353 74 363T98 374Q106 374 116 368T171 328L229 286Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="msub"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-210E"></use></g><g data-mml-node="TeXAtom" transform="translate(576, -150) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-1D45B"></use></g></g></g><g data-mml-node="mo" transform="translate(1328, 0)"><use xlink:href="#MJX-130-TEX-N-3D"></use></g><g data-mml-node="TeXAtom" data-mjx-texclass="ORD" transform="translate(2383.8, 0)"><g data-mml-node="mstyle"><g data-mml-node="munderover"><g data-mml-node="mo"><use xlink:href="#MJX-130-TEX-SO-2211"></use></g><g data-mml-node="TeXAtom" transform="translate(1056, 477.1) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-1D45B"></use></g><g data-mml-node="mo" transform="translate(600, 0)"><use xlink:href="#MJX-130-TEX-N-2212"></use></g><g data-mml-node="mn" transform="translate(1378, 0)"><use xlink:href="#MJX-130-TEX-N-31"></use></g></g><g data-mml-node="TeXAtom" transform="translate(1056, -285.4) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-1D458"></use></g><g data-mml-node="mo" transform="translate(521, 0)"><use xlink:href="#MJX-130-TEX-N-3D"></use></g><g data-mml-node="mn" transform="translate(1299, 0)"><use xlink:href="#MJX-130-TEX-N-30"></use></g></g></g></g></g><g data-mml-node="msub" transform="translate(4817.8, 0)"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-210E"></use></g><g data-mml-node="TeXAtom" transform="translate(576, -150) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-1D458"></use></g></g></g><g data-mml-node="mo" transform="translate(6034.4, 0)"><use xlink:href="#MJX-130-TEX-N-2217"></use></g><g data-mml-node="msub" transform="translate(6756.6, 0)"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-210E"></use></g><g data-mml-node="TeXAtom" transform="translate(576, -150) scale(0.707)" data-mjx-texclass="ORD"><g data-mml-node="mi"><use xlink:href="#MJX-130-TEX-I-1D45B"></use></g><g data-mml-node="mo" transform="translate(600, 0)"><use xlink:href="#MJX-130-TEX-N-2212"></use></g><g data-mml-node="mn" transform="translate(1378, 0)"><use xlink:href="#MJX-130-TEX-N-31"></use></g><g data-mml-node="mo" transform="translate(1878, 0)"><use xlink:href="#MJX-130-TEX-N-2212"></use></g><g data-mml-node="mi" transform="translate(2656, 0)"><use xlink:href="#MJX-130-TEX-I-1D458"></use></g></g></g></g></g></svg>

其实推完公式就是卡特兰数，这里就不推了！

## AC代码：



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
    vector<TreeNode*> generateTrees(int n) {
        if(!n) return {};
        return dfs(1, n);
    }
    vector<TreeNode*> dfs(int l, int r) {
        if(l > r) return {NULL};
        vector<TreeNode*> res;
        for(int i = l; i <= r; i++){
            auto left = dfs(l, i - 1), right = dfs(i + 1, r);
            for(auto& l : left){
                for(auto& r : right){
                    auto root = new TreeNode(i);
                    root->left = l, root->right = r;
                    res.push_back(root);
                }
            }
        }
        return res;
    }
};
```



