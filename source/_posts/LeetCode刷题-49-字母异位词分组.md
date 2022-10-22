---
title: LeetCode刷题-49.字母异位词分组
author: Mr.Niu
toc: true
abbrlink: 15108
top_img: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/dbc10f616e914a13e8bf45ac07a7f34f.png
cover: >-
  https://gitcode.net/qq_43590403/pic/-/raw/master/2020/07/07/dbc10f616e914a13e8bf45ac07a7f34f.png
categories: LeetCode刷题
tags:
  - 哈希表
  - 排序
date: 2020-07-07 10:53:42
updated:
---



















> 题目链接：[49.字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)



# 题解：



> 又是一个好巧的做法，借用排序即可处理！



## 题目简述：

将一组字符串数组中每个字符串每个字符相同且数量一致的放到一组返回！

## 题解：



**怎么处理？**

既然你不一样，我就把你变成一样的，排个序不就行了，排完序后，该是一组的就都变成同一个字符串了，然后使用哈希表做一下映射即可！



**具体做法：**

定义一个哈希表：`unordered_map<string, vector<string>> hash;`第一维度存储排序后统一的字符串，第二维度存储没有排序的原始字符串。例如：`aet` 对应 `ate, aet, tae, tea, eat, eta`



然后再将第二维度导入一个新数组即可！





## AC代码：



```c++
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> hash;
        for(auto& str : strs){
            string s = str;
            sort(str.begin(), str.end());
            hash[str].push_back(s);
        }
        vector<vector<string>> res;
        for(auto& item : hash) res.push_back(item.second);
        return res;
    }
};
```



