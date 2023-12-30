---
title: Java Learning Notes
date: 2023-11-23 20:48:40
tags:
---

# Java Learning Notes

This is the notes related to java knowledge.

<!-- more -->

## Some suggestions for learning Java technology stack

JavaSE: JDBC, Servlet (directly look at the basic knowledge and overall architecture of SSM)

SpringBoot(Integration of SSM) (Get started with SpringBoot directly no need to learn Spring)

**How to learn business project？**

1. Record the project outline and project features
2. manually implement them yourself

**组件项目**

限流， 日志

手写springMVC， RPC等



**How to learn 八股**

Practice output by writing a blog.



**middleware **

redis：Writing a project will give you a lot of understanding. 黑马redis， 进阶 看书。

MQ： Clearly define the application scenario.



**SpringCloud**

The core of SpringCloud：Decompose from a single architecture to a distributed architecture，What problems will arise, solve these problems, ideas and architectural solutions.

After learning SpringCloud, I found that I will become a configuration expert. In actual work, there is basically no need for configuration. It is recommended to **read the blog to learn SpringCloud.** Find a monolitarchite architecture and split it into a distributed blog for reading and understanding.



# Spring Boot



### 基本概念

### **自动配置（Auto-configuration）**

Spring Boot 自动配置尝试根据添加到项目中的 jar 依赖自动配置 Spring 应用程序

### **起步依赖（Starter Dependencies)**

添加一些配置，可以快速启动项目。

例如，`spring-boot-starter-web` 用于构建 web 应用程序

常见起步依赖包括：

spring-boot-starter-web 构建web应用

spring-boot-starter-data-jpa 连接数据库，默认 Hibernate 作为默认的 JPA(Java Persistence API)实现

spring-boot-starter-security 身份验证功能

spring-boot-starter-test 测试库，如 JUnit、Spring Test、Mockito

eg:

在pom.xml，对于Maven项目添加相关配置

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```



### **内嵌服务器（Embedded Servers）**

定义： 

Spring Boot支持多个内嵌的 HTTP 服务器：Tomcat、Jetty 或 Undertow。

**默认使用tomcat**

如果想修改为 jetty or undertow 需要在 Maven or Gradle 依赖中修改。



#### WAR文件

Web Application Archive： 分发和部署 Java Web 应用程序的文件格式。

用于打包 Web 应用程序的相关文件，包括：

​			静态资源（HTML、CSS、JavaScript 文件）

​			服务器端类（如 JavaBeans）
