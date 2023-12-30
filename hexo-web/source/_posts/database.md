---
title: database
date: 2023-12-13 09:48:31
categories:
- Technical stack
- DataBase
tags: 
- DataBase
- Technical stack
---

# Database

<!-- more -->

### The Four Characteristics of Things(ACID)

ACID is about safely auarantees for database transactions.

Atomicity

事务包含所有操作要么全部成功，要么全部失败回滚。

Consistency

事务必须使数据库从一个一致性状态变换成另一个一致性状态，也就是说一个事务执行之前和执行之后都必须处于一致性状态。

Isolation

是当多个用户并发访问数据库时，比如操作同一张表时，数据表为每个用户开启的事务，不能被其他事务所干扰，多个并发事务之间要相互隔离。

Durabilty

持久性是指一个事务一旦被提交，那么对数据库中的数据的改变就是永久的，即便是在数据库系统遇到故障的性况下也不会丢失提交事务的操作。





![image-20231213094955398](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/database.assets/image-20231213094955398.png)
