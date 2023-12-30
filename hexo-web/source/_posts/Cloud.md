---
title: Cloud
date: 2023-11-23 20:49:21
categories:
- Technical stack
tags: 
- Cloud
- Technical stack
---

# Cloud

This note is related to record knowledge related to cloud and used to facilitate one's own learning of relevant knowledge points.

<!-- more --> 

# 云平台知识

<!-- more --> 

常见云服务供应商：
Amazon Web Services (AWS)、Microsoft Azure、Google Cloud Platform

提供主要服务： 虚拟机，服务器， 存储解决方案 和 网路服务。

## 云原生架构

DevOps + 持续交付 + 微服务 + 容器

将符合云原生的程序 使用 K8s + Docker 容器化

<!-- more --> 

### DevOps

DevOps： 开发 + 运维

### 微服务

应用程序： 低耦合(一个一个独立接口) 高内聚

### 持续交付

CI/CD

在不影响用户使用服务的前提下， 频繁更新功能

### 容器化

使用Docker 和 K8s容器化部署方案

不关心服务的技术栈，而是统一管理和使用

## 虚拟化技术

理解云服务架构核心

VMware， Hyper-V

## 容器技术

云服务组成关键部分

容器： Docker， Kubernates

微服务架构: Spring Boot、Micronaut

## DevOps

CI/CD 持续集成和部署

相关工具： Jenkins, GitLab CI

## 系统监控和管理

AWS CloudWatch 和 Azure Monitor 



# 分布式系统

分布式计算架构

Apache Hadoop、Apache Spark

微服务架构 和 容器化技术

Docker、Kubernetes

消息对别和流处理系统

Apache Kafka、RabbitMQ

分布式数据库：

Cassandra, Hadoop, 

缓存和消息队列系统：如Redis、RabbitMQ、Apache Kafka

负载均衡和网络通信：理解和应用负载均衡技术，以及RESTful API和gRPC等通信协议。

#### 负载均衡

Load Balancing:分散工作负载（如网络流量、应用请求等）在多个服务器或资源之间的技术。

用于处理 大规模网络环境 和 云计算平台。

##### 分类

- **硬件负载均衡器**：专用设备，用于网络流量的负载均衡。
- **软件负载均衡器**：程序。

**算法**:

- **轮询（Round Robin）**：按顺序将请求分配给服务器列表。
- **最少连接（Least Connections）**：将请求发送到当前连接数最少的服务器。
- **源IP哈希（Source IP Hashing）**：根据请求的源IP地址决定将请求发送到哪个服务器。
- **加权分配（Weighted Distribution）**：根据服务器的能力和负载分配不同的权重。



负载均衡 是一个概念 而非具体的某项技术。下面以例子来理解，负载均衡在项目中的体现：

> >开发一个销售仪表盘，用来观察 销售指标， eg:总销售额、区域销售绩效、产品线销售趋势。
>
> 技术栈
>
> >- **前端**: React.js (用于构建用户界面)
> >- **后端**: Node.js with Express (用于构建API)
> >- **数据库**: PostgreSQL (用于存储销售数据)
> >- **数据可视化**: D3.js 或 Chart.js (用于数据可视化)
> >- **认证**: OAuth 2.0 (用于安全认证)
> >- **云服务**: AWS (用于部署和托管应用)
> >- **数据集成**: Python脚本 (用于从现有系统中提取和转换数据)
>
> 开发流程
>
> >1. **需求收集**: 与销售和管理团队会面，明确他们的需求和预期。
> >2. **系统设计**: 设计仪表盘的布局和用户交互，规划所需的API和数据库模式。
> >3. **前端开发**: 使用React.js构建交互式界面。
> >4. **后端开发**: 使用Node.js和Express创建RESTful API，用于处理前端的数据请求。
> >5. **数据集成**: 编写Python脚本从不同来源提取销售数据，转换格式，并定期更新数据库。
> >6. **测试**: 对仪表盘的功能和用户体验进行测试。
> >7. **部署**: 将应用部署到AWS云服务。
> >8. **培训和文档**: 为销售团队提供使用指南和培训。
>
> 均衡的地方
>
> > web服务器均衡
> >
> > 使用多个web服务器 避免访问量大。
> >
> > 云负载均衡器 **AWS Elastci Load Blancer** 自动分配流量，避免单一服务器过载。

>
>
>数据库负载均衡
>
>> 避免大量数据的查询和更新
>>
>> 涉及到 **主从复制** 和 **读写分离**
>
>微服务架构的负载均衡
>
>>后端是 微服务架构，每个服务会承担不同的功能 (eg: 数据处理， 用户认证， 报告生成...)
>>
>>负载均衡确保服务的稳定性
>
>
>
>CDN 内容分发网络
>
>>前端资源 (JS文件, CSS样式, 图片) 擦用CDN 负载均衡和内容缓存
>>
>>将内容分发到全球节点， 提升访问速度， 减轻主服务负担。
>
>应用层负载均衡
>
>> 使用Nginx 或 Apache 作为**反向代理服务器**，根据不同API请求类型 和 内容 将流量分配到 不同的后端服务器。



**反向代理服务器**

定义：

位于 客户端 和 多个后端服务器之间的中介。

中介： 客户端发送请求到反向代理服务器，然后它将请求转发到后端服务器，并将从后端服务器收到的响应返回给客户端。

功能：

1. 负载均衡： 分配流量给 多个服务器，提高性能和可靠性。

2. 安全性： 隐藏后端服务器身份，避免直接攻击。

3. 缓存静态内容： 缓存来自后端的响应，提高速度。
4. 压缩和优化： 优化压缩后端发出的内容，提高传输速度。
5. 处理响应和请求： URL重写， 限制流量， 添加和删除头信息。

常见反向代理：

Nginx、Apache HTTP Server、HAProxy。

### Apache 

负责接收来自客户端（如浏览器）的HTTP请求，处理这些请求，并向客户端发送HTTP响应。

适合 快速 托管静态内容 (JS文件，CSS, HTML)

PrestoDB、Hive 和 Hadoop。

## 数据库

关系型数据库： MySQL、PostgreSQL、Oracle

非关系型数据库：MongoDB

## 数学工具

统计工具：MATLAB、R、Python（eg: NumPy、SciPy、Pandas)。

线性和非线性优化工具： Gurobi、CPLEX、SciPy的优化模块

## MPI 和 NCCL

## Linux System

## 技术沟通

方法论：敏捷开发、SCRUM

项目管理工具:  Jira、Trello

模型设计工具:  Figma、Sketch、Adobe XD

## DDIA 分布式系统

![image-20231202145739567](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Cloud.assets/image-20231202145739567.png)

**为什么会存在分布式？**

可扩展性

> 单台数据处理能力有限， 数据量， 读取负载，写入负载
>
> 通过分散到多台机器可以提升处理能力

容错/高可用性

> 单体机器出国张，该应用仍然可以运行。 一台机器故障，另一台可以接管。

延迟

> 在世界各地部署服务器，提升用户获取服务速度。

### 数据系统基石

#### 共享和无共享架构

共享内存架构 shared-memory-architecture

大机器，不停地加内容，加配置，让该电脑配置越来越高

现在流行的是 无共享架构(shared-nothing architecture)： 也称为 horizontal sacle 水平扩展。

#### 复制和分区

数据分布多个节点的方式

复制(Replication)：你有一个数据A，你把它复制到另外一个地方。

分区 (Partitioning)： 你有一个数据A， 你把其拆分为a1, a2, a3, .... 然后分布到不同的地方。但是a1, a2, a3.....合起来是A。

将一个大型数据库拆分成较小的子集（称为分区 (partitions)) 有时候也叫做 shard 分片。

两个机制经常放在一起用：


![image-20231202152812337](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Cloud.assets/image-20231202152812337.png)



#### 如何在分布式系统中复制数据

1. 一个领导者复制(leader-based replicatior)

   active/passive 复制

   工作原理如下：

   



2. 多个领导者复制

3. 无领导者复制

