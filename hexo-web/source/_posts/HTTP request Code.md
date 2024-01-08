# HTTP request code

## 4xx

**client error 客户端错误**

> The person who sent the request has a problem.

400 Bad Request： Grammatical errors

401 Unauthorized:  HTTP authentication fails. 			eg: token fails.

> There is no way to judge who you are.

403 Forbidden： Reject access to resources.

> Indicates that it already knows who you are, but you don't have access.

404 Not Found: Can't find resources

409 Conflict： Request conflict

> There are several requests to process something at the same time, leading to conflicts.
>
> eg: Many request happens at the same time: like at the same time, many cilents open the web page and try to edit same information, which will creates a conflict.

415： Unsupported Media Type： The request type resources are inconsistent.

418： I am teapot. Usually used as Easter eggs.

422：unprocessable Entity

> The grammar is correct, but there is something wrong with the content.
>
> Eg: the user name and password are wrong, and the verification code is wrong.

429：too many requests

> Site Traffic Limit: A user sends too many requests at a given time.

## 5xx

**5xx Server Error 服务器错误**

500 internal Server Error：There is a bug in the server itself.

> It's basically a problem with the server itself.
>
> Try to get the 500 error rate down to 0.

502 Bad Gateway： One or two machines hung up.

An invalid request was received from the upstream server when the request was executed.

503 Serice Unvaliable: The service is temporarily unavailable.

> Server Maintenance
>
> Server overload
>
> It's a temporary situation, just refresh.

504 Gateway Timeout: Request timeout。

> 502 means that there is no available gateway.
>
> 504 means that the gateway can be used, but the processing timeout.（the problem is in the server）

## 3xx

**Redirection重定向**

Additional operations are required to complete the request.

> The process of automatically transferring a network request or data stream from one address or path to another.

This is usually because the resource has been moved to a different location, notifying the client to take additional action to fulfill the request.

301 Moved Permanently: Permanent redirection

> Visiting http://www.baidu.com will jump to https://www.baidu.com

302  Found: Temporary redirection

> For non-logged-in users, go to the login page

## 2xx

**Success 成功状态码，请求成功**

200 Generic Success Codes

201 Created: The result of the post request. Successfully created resource at the server.

202 Accepeted: The server accepts the request but has not yet processed it because of asy tasks.

204 No Cotent: The server processed it successfully, but nothing was returned.

206 Patial Cotent：The client's request was a scoping request, and this part of the request was successfully executed.

> Client needs is a very large file.
>
> The server needs to pass it to the client part by part.
>
> After each successful delivery of a portion of the file, it replies with 206.

## 1xx

**informational 信息状态码** 

Request accepted and being processed

## Relevant key concepts

### Idempotent 幂等

No matter how many times it is executed, the result is the same as the act of only one execution.

> eg:
>
> The setTrue() function, no matter how many times it is executed, just changes the variable to true.

GET Get content with idempotent

POST does not have idempotent

> Post, for example, Publish a post
>
> The results of post 1 time and many times are definitely different.

PUT and Patch

> PUT All Updates
>
> Patch partial update

PUT has idempotent

Patch does not available

![image-20240102220433866](/Users/zhouzhenzhou/Library/Application Support/typora-user-images/image-20240102220433866.png)

 put and post

> post: create a new resource, such as  create a new post.
>
> put: replace existing resources
>
> Usually: post creates a new one and then modifies it via put.
>
> The difference between the two is idempotence
>
> But sometimes put is also used directly to create an object.
>
> > The use of put is if it exists, overwrite it. If it doesn't, create a new one for me.

Head method

Only for requesting header information

> The application scenario: When we need to download a large resource
>
> The first thing to do is to go to the HEAD to view the information, and use the HEAD method.
>
> Getting resources directly with get method directly may waste bandwidth.

Options method

Used to get which methods are currently supported by the server

> For cross-cutting issues

trace method

Implement loop-back tests for debugging the

> Generally disabled, for now it's just debug
>
> Production environments are not required because they are easily hacked

For a certain feature, it is recommended that you turn it off if you don't use it

Because if you don't use it, you're reserving extra information for hackers.

connect method

Used for proxy servers, not usually used.





**You must think about it when you read, otherwise you will never get anything! **

**Of course it's not enough to finish thinking, you must go on writing. **
