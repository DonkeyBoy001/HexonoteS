---
title: "hexoUpdate"
date: 2023-11-07 18:56:17
categories:
- Technical stack
tags: 
- Hexo Update Function Notes
- Technical stack
---

# Hexo Update Function Notes

<!-- more -->

## 更新底部进度条显示

github链接

https://github.com/jiangtj-lab/hexo-cake-moon-menu/tree/6f6c6b4558b921188cdce4643f3d9f6ad4485534

注意点：

需要自己在根目录创建any.js 和 any文件夹

{hexo-dir} 是根目录的意思

{hexo-or-theme-dir} 是主题目录的意思

明确基于哪个位置进行作为基准点

## 配置文章浏览数

https://github.com/LEAFERx/hexo-leancloud-counter

1. 注册LeanCloud(选国际版)

https://console.leancloud.app/apps

2. 在setting找到对应的 key配置在next config目录下

```
leancloud_visitors:
  enable: true
  app_id: 配置这里
  app_key: 配置这里
  security: true
```

3. 主目录配置

```
leancloud_counter:
  enable: true
```

## 配置search bar功能

暂时未实现

https://github.com/next-theme/hexo-generator-searchdb

## 字数统计功能

https://github.com/next-theme/hexo-word-counter

## 页面加载速度优化功能

https://github.com/next-theme/hexo-optimize





**积沙成塔**
