---
title: DDIA
date: 2024-01-01 13:54:32
categories:
- Technical stack
- Distributed System
tags: 
- DDIA
---

# DDIA

Designing Data-Intensive Applications

数据密集型应用系统设计

<!-- more -->

## 概述

后端应用程序 如何 解决问题

本书分为三个部分：

第一部分：

设计数据密集型的基本思想(数据系统的基础)

第二部分：

存储在一台机器上的数据----> 分布在多台机器上的数据(分布式数据：复制，分片，事务，一致性和共识)

第三部分：

衍生数据集的系统（衍生数据：批处理，流处理，数据系统未来）

> 衍生数据库通常是指从其他数据源中提取、变换和加载（ETL）数据以创建的数据库。



## 数据系统基础

我们遇到的大部分系统都是数据密集型（ Data-Intensive Applications）



用户通过API访问

Application code 用来处理用户请求

App code一般有一个 对应的 in-memory cache（先从cache读数据）

如果缓存miss的话，再从Primary的database中 拿数据

CCTD的渠道： 当primary database发生变化

别的app监听到改动，对cache进行操作



对于search功能，会在full-text index中来实现



对于asy tasks， 会在message queue中处理，另外的app从message queue中拿数据 处理。

![image-20240101221110401](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/DDIA.assets/image-20240101221110401.png)



分布式存储数据增加了很多复杂度：考虑 数据怎么去复制 处理 分区, 复制事物

 

## 分布式数据

可扩展性

> 单台机器能力有限 ---> 负载分散到多台计算机上。

容错/高可用性

> 如果你的应用需要在单台机器（或多台机器，网络或整个数据中心）出现故障的情况下仍然能继续工作，则可使用多台机器，以提供冗余。一台故障时，另一台可以接管。

延迟

> 如果在世界各地都有用户，你也许会考虑在全球范围部署多个服务器，从而每个用户可以从地理上最近的数据中心获取服务，避免了等待网络数据包穿越半个世界。

### shared memory architecture

存在于大型机中， vertical scacling

不停地给机器加内存，加设备，让其变得越来越强

### shared-disk architecture

每台机器节点，相对独立，处理器，内存，磁盘都是相对独立的。 horizontal scale

可以是不同的机器，通过网络进行协调

### 复制 和 分区

#### 复制 Replication

有一个数据A， 复制数据A到其它的地方

#### 分区 Partitioning

也叫 shard

有一个数据A，分为a1,a2,a3 然后分别存在其它不同的地方

`a1  + a2 + a3 == A`

**虽然两个机制不一样，但是通常一起使用。**

![image-20240101231443303](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/DDIA.assets/image-20240101231443303.png)

### 复制的三种情况

一个领导者的复制

