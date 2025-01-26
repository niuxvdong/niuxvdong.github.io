---
title: 用法总结之Markdown
author: Mr.Niu
toc: true
abbrlink: 25708
categories:
  - Markdown
tags:
  - Markdown
cover: https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/ACG.GY_35.jpg
top_img: https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/ACG.GY_35.jpg
date: 2020-02-03 19:36:46
updated: 
---

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。Markdown 编写的文档后缀为 .md, .markdown。


> 技术支持：[Markdown教程|菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)

> 注意：Markdown可以使用Html语法及标签

## 一、编写 Markdown 好用软件

### 1、[Typora](https://typora.io/)

- 优点：可视化很强，写了后回车即可见到真实效果。

### 2、[VS Code](https://code.visualstudio.com/)

- 最强大的编辑器，只要安装了对应的插件，即可实现所有的编辑即代码运行调试！

## 二、Markdown 语法

### 1、标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

显示效果：

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/20200206195510.png)

### 2、段落

> Markdown 段落没有特殊的格式，直接编写文字就好，**段落的换行是使用两个以上空格加上回车**。

```markdown
这是段落！  
下一段落...  
```

显示效果：

这是段落！  

下一段落...  

### 3、字体

#### 3.1 粗体

```markdown
**粗体**
```

显示效果：

**粗体**

#### 3.2 斜体

```markdown
*斜体*
```

显示效果：

*斜体*

#### 3.3 粗斜体

```markdown
___粗斜___
```

显示效果：

___粗斜体___

### 4、分割线

> 你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。下面每种写法都可以建立分隔线：

```markdown
***

*****

---

----------
```

显示效果：

***

****

---

----

### 5、列表

#### 5.1 有序列表

> 有序列表使用数字并加上 **.** 号来表示

```markdown
1. 第一项
2. 第二项
3. 第三项
```

显示效果：

1. 第一项
2. 第二项
3. 第三项

#### 5、2 无序列表

> 无序列表用 * + -来表示

```markdown
- 第一项
- 第二项
- 第三项
+ 第一项
+ 第二项
+ 第三项
* 第一项
* 第二项
* 第三项
```

显示效果：

- 第一项
- 第二项
- 第三项
+ 第一项
+ 第二项
+ 第三项
* 第一项
* 第二项
* 第三项

#### 5.3 列表嵌套

```markdown
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```

显示效果：

1. 第一项：
   - 第一项嵌套的第一个元素
   - 第一项嵌套的第二个元素
2. 第二项：
   - 第二项嵌套的第一个元素
   - 第二项嵌套的第二个元素

### 6、区块

> Markdown 区块引用是在段落开头使用 **>** 符号 ，然后后面紧跟一个**空格**符号.

#### 6.1 普通区块

```markdown
> 普通区块
> hello
> 床前明月光
```

显示效果：

> 普通区块
> hello
> 床前明月光

#### 6.2 列表中使用区块

```markdown
- 第一层
    > 我是Mr.Niu
- 第二层
    > 你好，世界！
```

显示效果：

- 第一层
  
  > 我是Mr.Niu

- 第二层
  
  > 你好，世界！

#### 6.3 区块中使用列表

```markdown
> 第一层
    - 我是Mr.Niu
    - 你好世界！
```

显示效果：

> 第一层
> 
> - 我是Mr.Niu
> - 你好世界！

#### 6.4 区块嵌套

```markdown
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
```

显示效果：

> 最外层
> 
> > 第一层嵌套
> > 
> > > 第二层嵌套

### 7、代码

#### 7.1 段落内代码

```markdown
这是`printf()`函数
```

显示效果：

这是`printf()`函数！

#### 7.2 代码块

>  用 **```** 包裹一段代码，并指定一种语言（也可以不指定）：

~~~
```c++
#include <iostream>

using namesapce std;

int main()
{
    cout << "hello world!" << endl;
    return 0;
}
```

~~~

显示效果：


```c
#include <iostream>

using namesapce std;

int main()
{
    cout << "hello world!" << endl;
    return 0;
}
```

### 8、链接

#### 8.1 普通用法

```markdown
[链接名称](链接地址)

[Mr.Niu's Blog](https://itnxd.eu.org)

或者

<https://itnxd.eu.org>
```

显示效果：

[Mr.Niu's Blog](https://itnxd.eu.org)

<https://itnxd.eu.org>

#### 8.2 高级用法：

```markdown
链接也可以用变量来代替，文档末尾附带变量地址：
这个链接用 1 作为网址变量 [Baidu][1]
这个链接用 niu 作为网址变量 [Blog][niu]
然后在文档的结尾为变量赋值（网址）

  [1]: https://www.baidu.com
  [niu]: https://itnxd.eu.org
```

显示效果：

链接也可以用变量来代替，文档末尾附带变量地址：
这个链接用 1 作为网址变量 [Baidu][1]
这个链接用 niu 作为网址变量 [Blog][niu]
然后在文档的结尾为变量赋值（网址）：

[1]: https://www.baidu.com
[niu]: https://itnxd.eu.org

### 9、图片

> 格式如下：

> ```markdown
> ![alt 属性文本](图片地址)
> 
> ![alt 属性文本](图片地址 "可选标题")
> ```

```markdown
![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/e%20(2).jpg)
```

显示效果：

![](https://cdn.itnxd.eu.org/gh/niuxvdong/images/img/e%20(2).jpg)

### 10、表格

> Markdown 制作表格使用 **|** 来分隔不同的单元格，使用 **-** 来分隔表头和其他行。
> 
> 格式如下：

> ```markdown
> |  表头   | 表头  |
> |  ----  | ----  |
> | 单元格  | 单元格 |
> | 单元格  | 单元格 |
> ```

显示效果：

| 表头  | 表头  |
| --- | --- |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

对齐方式：

**我们可以设置表格的对齐方式：**

- **-:** 设置内容和标题栏居右对齐。
- **:-** 设置内容和标题栏居左对齐。
- **:-:** 设置内容和标题栏居中对齐。

```markdown
|左对齐|右对齐|居中对齐|
|:----- | -----:|:------:|
|单元格|单元格|单元格|
|单元格|单元格|单元格|
```

| 左对齐 | 右对齐 | 居中对齐 |
|:--- | ---:|:----:|
| 单元格 | 单元格 | 单元格  |
| 单元格 | 单元格 | 单元格  |

### 11、高级技巧（使用HTML）

#### 11.1 使用html标签实现键盘按键图标

```markdown
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
```

显示效果：

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

#### 11.2 用 `\` 来实现转义

> Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，Markdown 使用反斜杠转义特殊字符：

```markdown
**文本加粗** 
\*\* 正常显示星号 \*\*
```

显示效果：

**文本加粗** 
\*\* 正常显示星号 \*\*

可实现的转义字符如下：

```
\   反斜线
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```

#### 11.3 更多高级用法参考菜鸟教程

```mermaid
​```mermaid
graph LR
A[方形] -->B(圆角)
    B --> C{条件a}
    C -->|a=1| D[结果1]
    C -->|a=2| E[结果2]
    F[横向流程图]
```

```

​```mermaid
graph LR
A[方形] -->B(圆角)
    B --> C{条件a}
    C -->|a=1| D[结果1]
    C -->|a=2| E[结果2]
    F[横向流程图]
```
