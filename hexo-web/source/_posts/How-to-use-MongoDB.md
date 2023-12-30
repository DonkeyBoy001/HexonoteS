---
title: How to use MongoDB
date: 2023-11-02 18:12:10
categories:
- Technical stack
- MongoDB
tags: 
- MongoDB
- DataBase
- Technical stack
---

# How to use MongoDB

<!-- more -->

## 配置Cluster

查询公网IP并设置connect IP

终端安装

brew install mongosh

检查版本

mongosh --version

终端启动链接MongoDB

mongosh "mongodb+srv://cluster0.knpasgp.mongodb.net/" --apiVersion 1 --username joejoejoe

输入密码登录

登录成功之后，查看当前数据库内容

show dbs

