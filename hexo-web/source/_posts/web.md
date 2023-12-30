---
title: web
date: 2023-12-13 10:10:02
categories:
- Technical stack
- Web Development
tags: 
- Web Development
---

# Web Development

<!-- more -->

## Cookies and Sessions

Cookies and sessions are both used to carry user information over HTTP requests, including user login status, user permissions, etc.

#### Cookies:

limited szie

Store on users' device

>  Cookies typically have size limits (4KB). They carry small pieces of information and are stored on the users’ devices. Cookies are sent with each subsequent user request. Users can choose to ban cookies in their browsers.

通常用于 browser remember username and password  --->方便 login easily

#### Session:

use unique session ID

larger data

store on server side

> Unlike cookies, sessions are created and stored on the server side. There is usually a unique session ID generated on the server, which is attached to a specific user session. This session ID is returned to the client side in a cookie. Sessions can hold larger amounts of data. Since the session data is not directly accessed by the client, the session offers more security.

让server more control on users ---> can be managed be memory cache and permanent storeage

like database or history info



#### Summary:

Cookies 容量小，存储在user device。用于记录用户偏好，数据不安全。

Session 容量大，使用unique,存储在 server。 用于Record user interaction status，数据安全,存储敏感信息。



每次http请求都会携带cookies, 可能对performance产生影响。

Sessions 不会自动发送，但是需要Additional server storage and management。



Cookies和Session通常一起使用。

> 一个网站可能使用Cookie来存储用户的会话标识符（Session ID），而将更具体的用户信息存储在服务器端的Session中。

![image-20231213103128722](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/web.assets/image-20231213103128722.png)



