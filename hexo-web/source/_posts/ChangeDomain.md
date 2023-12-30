---
title: ChangeDomain
date: 2023-10-22 23:13:30
categories:
- Technical stack
tags: 
- Domain
- Technical stack
---

# This the Note Related How to Set Your First Domain

<!-- more -->

## The reasons behind this



1. **Custom Domain Name** : By default, the website format of GitHub Pages is' [username]. github. io ', but if you want to use your own domain name, such as' www.mywebsite. com', then you need to configure a custom domain name.

   

2. **DNS Provider** : The service provider responsible for resolving domain names to specific IP addresses. For example, when someone tries to access' www.mywebsite. com ', DNS is responsible for telling them which IP address to go to to find the website.

## Buy a domain

I buy my domain in https://www1.domain.com/.



and I type the name that I wanted in the search bar.

![image-20231022231656624](/Users/zhouzhenzhou/Desktop/hexo-web/source/_posts/ChangeDomain.assets/image-20231022231656624.png)



choose the one that you liked and check out.

![image-20231022231807498](/Users/zhouzhenzhou/Desktop/hexo-web/source/_posts/ChangeDomain.assets/image-20231022231807498.png)



## Modify the Setting in DNS and in Github

### Modify the Setting in DNS

in the website: https://www1.domain.com/controlpanel/foundation/

![image-20231022232914419](/Users/zhouzhenzhou/Desktop/hexo-web/source/_posts/ChangeDomain.assets/image-20231022232914419.png)

delete all of them, as long as the content is 66xxx.x142 

this is the default, and next change it into the one that we need 

![image-20231022232118997](/Users/zhouzhenzhou/Desktop/hexo-web/source/_posts/ChangeDomain.assets/image-20231022232118997.png)

add the new ones

The following four A records have been added:

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

![image-20231022232250520](/Users/zhouzhenzhou/Desktop/hexo-web/source/_posts/ChangeDomain.assets/image-20231022232250520.png)



### Add subdomain

If you are using a subdomain name, such as `www.zhoujoe.us`, you need to add a `CNAME` record:

- Name/Host/Alias: `www`

- Value/Answer/Destination: `your-github-username.github.io` (Replace `your-github-username with your actual GitHub username)

### Check DNS broadcast in Global Case

access in the web

 https://dnschecker.org/

![image-20231022233325801](/Users/zhouzhenzhou/Desktop/hexo-web/source/_posts/ChangeDomain.assets/image-20231022233325801.png)

### Modify the Page Configure in GitHub

click the github repo

choose the settings

click pages

fill the DNS site Costom domain

choose Enforce HTTPS

![image-20231022233557649](/Users/zhouzhenzhou/Desktop/hexo-web/source/_posts/ChangeDomain.assets/image-20231022233557649.png)
