---
title: Go
date: 2023-12-01 12:50:49
categories:
- Technical stack
tags: 
- GO
- Technical stack
---

 # GO

距离2023年结束还有一个月，暂定一个小目标是在2024年1月1日前，每天可以用1小时来学习Go语言，并记录自己的学习过程。

<!-- more -->

# 2023.12.01

## Go的应用

云基础架构语言

> > 大部分的现代与计算基础设施软件都是用Go写的
> >
> > Docker、Kubernetes、Prometheus、Ethereum（以太坊）、Istio、CockroachDB、InfluxDB、Terraform、Etcd、Consul 等等。

适合 DevOps/SRE区块链

命令式交互程序

Web服务

数据处理

微控制器，机器人，游戏领域

## Go的历史

Go诞生的原因：当时的谷歌内部主要使用 C++ 语言构建各种系统，但 C++ 的巨大复杂性、编译构建速度慢以及在编写服务端程序时对并发支持的不足。



## Go语言设计哲学

即 go演化进程的高级原则和依据。

5个原则：简单、显式、组合、并发和面向工程。

### 简单

> 仅有25 个关键字，主流编程语言最少；
>
> 内置垃圾收集，降低开发人员内存管理的心智负担；
>
> 首字母大小写决定可见性，无需通过额外关键字修饰；
>
> 变量初始为类型零值，避免以随机值作为初值的问题；
>
> 内置数组边界检查，极大减少越界访问带来的安全隐患；
>
> 内置并发支持，简化并发程序设计；
>
> 内置接口类型，为组合的设计哲学奠定基础；
>
> 原生提供完善的工具链，开箱即用；

### 显式

显式转型

不允许不同类型混合

下面会报错

```go
package main

import "fmt"

func main() {
    var a int16 = 5
    var b int = 8
    var c int64

    c = a + b
    fmt.Printf("%d\n", c)
}
```

下面采用了类型转换，不会报错

```
c = int64(a) + int64(b)
fmt.Printf("%d\n", c)
```

### 组合

Go 推崇组合设计

不是面向对象语言(C++, Java)

不存在 面向对象语法， 类 和 继承

> > Go 语言无类型层次体系，各类型之间是相互独立的，没有子类型的概念；
> >
> > 每个类型都可以有自己的方法集合，类型定义与方法实现是正交独立的；
> >
> > 实现某个接口时，无需像 Java 那样采用特定关键字修饰；
> >
> > 包之间是相对独立的，没有子包的概念。

继承功能 是通过 Type Embedding(类型嵌入) 实现 功能继承。



eg: 

Type Embedding

```Go
// $GOROOT/src/sync/pool.go
type poolLocal struct {
    private interface{}   
    shared  []interface{}
    Mutex               
    pad     [128]byte  
}
```

> 在 poolLocal 这个结构体类型中嵌入了类型 Mutex，这就使得 poolLocal 这个类型具有了互斥同步的能力，我们可以通过 poolLocal 类型的变量，直接调用 Mutex 类型的方法 Lock 或 Unlock。

```
private interface{}: 这个字段可能用于存储特定于某个线程（goroutine）的数据，使得这些数据可以快速访问，而无需同步机制，因为它们仅在特定线程中使用。

shared []interface{}: 这个切片可能用于存储可以被多个线程共享的数据。访问这些共享数据需要同步机制以避免并发冲突。

Mutex: 这是嵌入的 sync.Mutex 类型，提供了锁定和解锁方法来控制对结构体中的共享数据的并发访问。
```



**互斥同步(Mutually exclusive synchronization)**:确保多个线程不会同时访问同一资源或数据的一种机制.

互斥同步通常是通过 `sync.Mutex` 类型实现的

Mutex 确保 任何时候只有一个线程可以执行临界区代码。



大接口： 通过嵌入接口类型的方式来实现接口行为的聚合，组成大接口。

```go
// $GOROOT/src/io/io.go
type ReadWriter interface {
    Reader
    Writer
}
```

### 并发

面向多核、原生支持并发

Go 放弃了传统的基于操作系统线程的并发模型，而采用了用户层轻量级线程，Go 将之称为 goroutine。



**go协程** 占用资源小，切换速度快

goroutine 占用的资源非常小，Go 运行时默认为每个 goroutine 分配的栈空间仅 2KB

goroutine 调度的切换也不用陷入（trap）操作系统内核层完成



一个 Go 程序中可以创建成千上万个并发的 goroutine。

所有的 Go 代码都在 goroutine 中执行，哪怕是 go 运行时的代码也不例外。

**channel** 和 **select**

通过语言内置的 channel 传递消息或实现同步，并通过 select 实现多路 channel 的并发控制。



goroutines 各自执行特定的工作，通过 channel+select 将 goroutines 组合连接起来。

### 面向工程

面向解决真实世界中 Google 内部**大规模软件开发存在的各种问题**，为这些问题提供答案，这些问题包括：程序构建慢、依赖管理失控、代码难于理解、跨语言构建难等。

**如果源文件导入它不使用的包，则程序将无法编译**

> 重新设计编译单元和目标文件格式，实现 Go 源码快速构建，让大工程的构建时间缩短到类似动态语言的交互式解释的编译速度；如果源文件导入它不使用的包，则程序将无法编译。这可以充分保证任何 Go 程序的依赖树是精确的。这也可以保证在构建程序时不会编译额外的代码，从而最大限度地缩短编译时间；

> 去除包的循环依赖，循环依赖会在大规模的代码中引发问题，因为它们要求编译器同时处理更大的源文件集，这会减慢增量构建；包路径是唯一的，而包名不必唯一的。导入路径必须唯一标识要导入的包，而名称只是包的使用者如何引用其内容的约定。“包名称不必是唯一的”这个约定，大大降低了开发人员给包起唯一名字的心智负担；

> 故意不支持默认函数参数。因为在规模工程中，很多开发者利用默认函数参数机制，向函数添加过多的参数以弥补函数 API 的设计缺陷，这会导致函数拥有太多的参数，降低清晰度和可读性；
>

> 增加类型别名（type alias），支持大规模代码库的重构。

Gofmt 统一的go语言代码风格



## Go 安装

### Linux 安转go

下载安装包

```
$wget -c https://golang.google.cn/dl/go1.16.5.linux-amd64.tar.gz
```

解压

```
$tar -C /usr/local -xzf go1.16.5.linux-amd64.tar.gz
```

查看对应位置

```
$ls -F /usr/local/go
AUTHORS          CONTRIBUTORS  PATENTS    SECURITY.md  api/  doc/         lib/   pkg/        src/
CONTRIBUTING.md  LICENSE       README.md  VERSION      bin/  favicon.ico  misc/  robots.txt  test/
```

配置用户环境变量

```
export PATH=$PATH:/usr/local/go/bin
```

source一下生效

```
$source ~/.profile
```

查看版本

```
$go version
```



### 开启 Helllo World

VScode编辑器

```go
$mkdir ~/goprojects // 创建一个可以集合所有专栏项目的根文件夹
$cd ~/goprojects
$mkdir helloworld // 创建存储helloworld示例的文件夹
$cd helloworld
```

Go 中的一个包 package。包是 Go 语言的基本组成单元，通常使用单个的小写单词命名，一个 Go 程序本质上就是一组包的集合。

```go
package main
fmt.Println("hello, world")
func main() {
    fmt.Println("hello, world")
}
```

go build 编译文件

```
$go build main.go
$./main
hello, world
```

查看编译后的文件

```
$ls
main*    main.go
```



**Go 是一种编译型语言，这意味着只有你编译完 Go 程序之后，才可以将生成的可执行文件交付于其他人，并运行在没有安装 Go 的环境中。**



直接run的话

通过 **go run xxx.go 命令**

```
$go run main.go
hello, world
```

### 开启一个服务器

创建了一个在 8081 端口监听的 http 服务，当我们向它发起请求后，这个服务会在终端标准输出上输出一段访问日志。

```
package main

import ( "github.com/valyala/fasthttp" 
"go.uber.org/zap"
)

var logger *zap.Logger

func init() {
	logger, _ = zap.NewProduction()
}

func fastHTTPHandler(ctx *fasthttp.RequestCtx) {
	logger.Info("hello, go module", zap.ByteString("uri", ctx.RequestURI()))
}

func main() {
	fasthttp.ListenAndServe(":8081", fastHTTPHandler)
}
```



要配套 go module 模式

核心为go.mod文件， 用来存储module 对于第三方依赖的所有信息

```bash
go mod init github.com/bigwhite/hellomodule
```

一个 module 就是一个包的集合，这些包和 module 一起打版本、发布和分发。go.mod 所在的目录被我们称为它声明的 module 的根目录。

然后将 相关依赖添加到 mod文件

当然也可以使用 

```
go mod dity
```

自动生成



go build 生成文件 并 运行

```
go build main.go
```

```
./main 
```



重新开一个bash，使用curl发送命令给本地主机查看效果。

```
curl localhost:8081/foo/bar
```

> >使用 `curl` 命令行工具发送 HTTP 请求到本地主机（localhost）上指定端口（8081）的特定路径（/foo/bar）的命令
> >
> >`curl` 是一个广泛使用的命令行工具，用于发送和接收数据，支持多种协议，包括 HTTP、HTTPS、FTP 等。



### 小节

Go 包是 Go 语言的基本组成单元。一个 Go 程序就是一组包的集合，所有 Go 代码都位于包中；



Go 源码可以导入其他 Go 包，并使用其中的导出语法元素，包括类型、变量、函数、方法等。

main 函数是整个 Go 应用的入口函数；



Go 源码需要先编译，再分发和运行。如果是单 Go 源文件的情况，我们可以直接使用 go build 命令 +Go 源文件名的方式编译。不过，对于复杂的 Go 项目，我们需要在 Go Module 的帮助下完成项目的构建。



# 2023.12.04

## Go 项目

go语言创世项目源代码(C语言为主)

```bash
git clone https://github.com/golang/go.git
```

查看go最初源代码布局，以1.3版本为例

```bash
cd go // 进入Go语言项目根目录
git checkout go1.3 // 切换到go 1.3版本
tree -LF 1 ./src // 查看src目录下的结构布局
```

tree: 主命令，用于以树状图的形式显示目录和文件。

-L:  后面跟着一个数字，表示要展示的目录深度。在这个例子中，它后面没有指定数字，所以默认为 1。

-F: 让 `tree` 在每个项目后面添加一个指示符。例如，`/` 表示目录，`*` 表示可执行文件。

> >- 当 `tree` 命令遇到一个目录时，它会在该目录名的后面添加一个斜杠 (`/`)。
> >- 如果一个文件是可执行的，它的名字后面会添加一个星号 (`*`)。
> >- 对于符号链接（即链接到另一个文件或目录的快捷方式），`tree` 会在其名字后面添加一个 `@` 符号。
> >- 如果开启了其他特定的选项，可能还会看到其他类型的指示符，例如管道 (`|`) 或套接字 (`=`)。
>
> Eg: 
>
> ```bash
> src/
> ├── main.c
> ├── utils/
> │   ├── helper.c
> │   └── test_helper
> ├── lib/
> │   └── libmath.a
> └── run.sh*
> 
> ```
>
> 在上面目录结构中，`main.c` 和 `helper.c` 是普通文件，`utils` 和 `lib` 是子目录，`run.sh` 是一个可执行文件（这里通过 `*` 表示），而 `libmath.a` 可能是一个静态库文件。

`./src`: 指定了 `tree` 命令的起始目录。在这个例子中，它是当前目录下的 `src` 目录。

src下 cmd 存放go相关可执行文件

src下 pkg存放，标准库包

### Go 衍化

1.4 删除pkg，直接放在src下

一日internal包机制，增加internal

1.6 增vendor， 解决go包依赖包问题

1.7 引入 go.mod 和 go.sum

这三次演进主要体现在简化结构布局，以及优化包依赖管理方面

### Go 公认布局

#### go 可执行程序布局

go 可执行程序布局： 构建可执行程序为目的的项目。

```bash
$tree -F exe-layout 
```

```
exe-layout
├── cmd/
│   ├── app1/
│   │   └── main.go
│   └── app2/
│       └── main.go
├── go.mod
├── go.sum
├── internal/
│   ├── pkga/
│   │   └── pkg_a.go
│   └── pkgb/
│       └── pkg_b.go
├── pkg1/
│   └── pkg1.go
├── pkg2/
│   └── pkg2.go
└── vendor/
```

**Cmd**: 存放 项目要编译执行文件 对应的 mian包的源文件。

mian包： 命令行参数解析、资源初始化、日志设施初始化、数据库连接初始化等工作。

之后就会将程序的执行权限交给更高级的执行控制对象。

(一些Go项目会将cmd改为app或者其他名字)

**pkgN目录**： 存放依赖库

```
存放项目自身要使用、同样也是可执行文件对应 main 包所要依赖的库文件
些目录下的包还可以被外部项目引用
```

**go.mod**

**gosum**

都是go 依赖管理配置文件

推荐使用 go moudle 管理包依赖

**vendor目录**

在项目本地缓存特定版本依赖包的机制

```
可以将vendor 目录视为一个可选目录。原因在于，Go Module 本身就支持可再现构建，而无需使用 vendor。
```

**第三方辅助工具**

一般放在项目的顶层

```
比如：make、bazel 等。你可以将这类外部辅助构建工具涉及的诸多脚本文件（比如 Makefile）放置在项目的顶层目录下，就像 Go 创世项目中的 all.bash 那样。
```

#### go 库项目

Go 库项目： 对外暴露库包

Go 库项目的初衷是为了对外部（开源或组织内部公开）暴露 API，

对于仅限项目内部使用而不想暴露到外部的包，可以放在项目顶层的 internal 目录下面。

当然 internal 也可以有多个并存在于项目结构中的任一目录层级中，关键是项目结构设计人员要明确各级 internal 包的应用层次和范围。

```
lib-layout
├── go.mod
├── internal/
│   ├── pkga/
│   │   └── pkg_a.go
│   └── pkgb/
│       └── pkg_b.go
├── pkg1/
│   └── pkg1.go
└── pkg2/
    └── pkg2.go
```



### 小节

对于以生产可执行程序为目的的 Go 项目，它的典型项目结构分为五部分：

放在项目顶层的 Go Module 相关文件，包括 go.mod 和 go.sum；

cmd 目录：存放项目要编译构建的可执行文件所对应的 main 包的源码文件；

项目包目录：每个项目下的非 main 包都“平铺”在项目的根目录下，每个目录对应一个 Go 包；

internal 目录：存放仅项目内部引用的 Go 包，这些包无法被项目之外引用；

vendor 目录：这是一个可选目录，为了兼容 Go 1.5 引入的 vendor 构建模式而存在的。这个目录下的内容均由 Go 命令自动维护，不需要开发者手工干预。

# 2023.12.05

## Go 构建模式演化

go程序： go包组合而成。

go程序构建： 确定包版本， 编译包， 将编译后得到的目标文件链接到一起。

go语言 经过三个迭代：

> 	1. gopath
> 	1. 1.5 vendor
> 	1. go module

### go path

go编译器 在本地path环境配置路径下， 搜寻go依赖的第三方包，没有就报错。

eg:

```
package main

import "github.com/sirupsen/logrus"

func main() {
    logrus.Println("hello, gopath mode")
}
```

没有依赖包，会报错

需要自己配置环境变量

下面是一个例子

```
export GOPATH=/usr/local/goprojects:/home/tonybai/go
```

配置好之后，就会从两个地方找go第三方依赖包

```
/usr/local/goprojects/src/github.com/user/repo
```

```
/home/tonybai/go/src/github.com/user/repo
```

如果不配置，会在默认环境下找， HOME/go



通过使用 go get 下载本地缺失的 环境依赖包

### Vendor Mechanism

1.5版本 引入 vendor机制

优先使用vendor目录下 缓存的第三方依赖包

```
.
├── main.go
└── vendor/
    ├── github.com/
    │   └── sirupsen/
    │       └── logrus/
    └── golang.org/
        └── x/
            └── sys/
                └── unix/
```

所谓 `vendor` 机制，就是每个项目的根目录下可以有一个 `vendor` 目录，里面存放了该项目的依赖的 `package`。`go build` 的时候会先去 `vendor` 目录查找依赖，如果没有找到会再去 `GOPATH` 目录下查找



### GO Module

解决包依赖问题

go module： 一个go包的集合。

一个代码仓库 对应一个 go module。存放一个go.mod文件。



创建一个 go module

第一步，通过 go mod init 创建 go.mod 文件，将当前项目变为一个 Go Module；

第二步，通过 go mod tidy 命令自动更新当前 module 的依赖信息；

第三步，执行 go build，执行新 module 的构建。



打开文件创建一个main.go

内容如下

```go
package main

import "github.com/sirupsen/logrus"

func main() {
	logrus.Println("hello, gopath mode")
}

```



```
go mod init github.com/bigwhite/module-mode
```

```
go mod tidy
```

go mod tidy 命令会扫描 Go 源码，并自动找出项目依赖的外部 Go Module 以及版本，下载这些依赖并更新本地的 go.mod 文件。



生成运行文件

```
go build
```

如果顺利的话，我们会在当前目录下看到一个新生成的可执行文件 module-mode，执行这个文件我们就能得到正确结果了。



运行

```
 ./module-mode
```



#### Go Module语言导入版本机制 Semantic Import Versioning

语义版本号分成 3 部分：主版本号（major）、次版本号（minor）和补丁版本号（patch）

> Eg:
>
> 上面的 logrus module 的版本号是 v1.8.1，这就表示它的主版本号为 1，次版本号为 8，补丁版本号为 1。

![image-20231205222855795](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231205222855795.png)



主版本 之间 不兼容。

此版本 大 兼容小。



如果是不同版本包，同时使用也是可以的

下面就是两个版本

```
import ( "github.com/sirupsen/logrus" 
logv2 "github.com/sirupsen/logrus/v2"
)
```

v0版本是不稳定的，视为和v1主版本同等对待



#### go module 最小版本呢选择原则

思考：

yproject 有两个直接依赖 A 和 B，

A 和 B 有一个共同的依赖包 C，

但 A 依赖 C 的 v1.1.0 版本，

而 B 依赖的是 C 的 v1.3.0 版本，

并且此时 C 包的最新发布版为 C v1.7.0。

这个时候，Go 命令是如何为 myproject 选出间接依赖包 C 的版本呢？

```
但是 没有选择1.7.0
go会选择 符合项目整体要求的最小版本
所以是1.3.0版本
```



三个不同版本分界线

1.13 前 取决于要构建的源码目录所在位置，

1.13 只要 当前目录或父目录下有go.mod 就是go Module

1.16 只有 当前目录或父目录下有go.mod 就是go Module

![image-20231205225448137](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231205225448137.png)



# 2023.12.06

## Go Module6类常见操作

### go module 维护

##### 为当前项目添加一个依赖包

添加到go代码

```
package main

import (
  "github.com/google/uuid"
  "github.com/sirupsen/logrus"
)

func main() {
  logrus.Println("hello, go module mode")
  logrus.Println(uuid.NewString())
}
```

手动使用go get下载uuid第三方依赖包

```
go get github.com/google/uuid
```

go get 命令将我们新增的依赖包下载到了本地 module 缓存里

go.mod 文件的 require 段中新增了一行内容

```
require (
  github.com/google/uuid v1.3.0 //新增的依赖
  github.com/sirupsen/logrus v1.8.1
)
```



或者直接 go mod tidy 直接自配配置

##### 升降级依赖包

依赖 语义导入版本机制

> Go Module 的版本号采用了语义版本规范，也就是版本号使用 vX.Y.Z 的格式。其中 X 是主版本号，Y 为次版本号（minor），Z 为补丁版本号（patch）。主版本号相同的两个版本，较新的版本是兼容旧版本的。如果主版本号不同，那么两个版本是不兼容的。



Eg： logrus为例子

```
go list -m -versions github.com/sirupsen/logrus
```

基于初始状态执行的 go mod tidy 命令，帮我们选择了 logrus 的最新发布版本 v1.8.1

```
go get github.com/sirupsen/logrus@v1.7.0
```

或者 自动降级

```
go mod edit -require=github.com/sirupsen/logrus@v1.7.0
```

```
go mod tidy
```



升降

```
go get github.com/sirupsen/logrus@v1.7.1
```



##### 添加版本大于1的依赖

如果版本为V0 或者V1 是不需要写版本号的

```
import github.com/user/repo/v0 等价于 import github.com/user/repo
import github.com/user/repo/v1 等价于 import github.com/user/repo
```



如果是版本大于1

以2为例子

```
import github.com/user/repo/v2/xxx
```



Eg:

以“向 module-mode 项目添加 github.com/go-redis/redis 依赖包的 v7 版本”为例，

```
package main

import (
  _ "github.com/go-redis/redis/v7" // “_”为空导入
  "github.com/google/uuid"
  "github.com/sirupsen/logrus"
)

func main() {
  logrus.Println("hello, go module mode")
  logrus.Println(uuid.NewString())
}
```

```
go get github.com/go-redis/redis/v7
```



升级依赖版本到一个不兼容版本

先将代码中 redis 包导入路径中的版本号改为 v8

```
import (
  _ "github.com/go-redis/redis/v8"
  "github.com/google/uuid"
  "github.com/sirupsen/logrus"
)
```

```
go get github.com/go-redis/redis/v8
```

##### 移除一个依赖

go list 命令列出当前 module 的所有依赖

```
go list -m all
```

在原文件，删除该依赖

用 go mod tidy 命令，将这个依赖项彻底从 Go Module 构建上下文中清除掉。go mod tidy 会自动分析源码依赖，而且将不再使用的依赖从 go.mod 和 go.sum 中移除。

##### 使用vendor

为什么 Go Module 的维护，还有要用 vendor 的情况

Go Module 构建模式下，它依旧被保留了下来，并且成为了 Go Module 构建机制的一个很好的补充



为该项目建立 vendor

```
go mod vendor
```

go mod vendor 命令在 vendor 目录下，创建了一份这个项目的依赖包的副本，并且通过 vendor/modules.txt 记录了 vendor 下的 module 以及版本。

如果我们要基于 vendor 构建，而不是基于本地缓存的 Go Module 构建，我们需要在 go build 后面加上 -mod=vendor 参数。

# 2023.12.11

## GO程序执行

### Go 应用的入口函数 main函数

可执行程序的 main 包必须定义 main 函数，否则 Go 编译器会报错。

> 在启动了多个 Goroutine（Go 语言的轻量级用户线程，后面我们会详细讲解）的 Go 应用中，main.main 函数将在 Go 应用的主 Goroutine 中执行。

```go
package main
​
func main() {
    // 用户层执行逻辑
    ... ...
}
```

### Go 初始化函数 init函数

用于进行包初始化的 init 函数

和 main.main 函数一样，init 函数也是一个无参数无返回值的函数

```go
func init() {
    // 包初始化逻辑
    ... ...
}
```

> 如果 main 包依赖的包中定义了 init 函数，或者是 main 包自身定义了 init 函数，那么 Go 程序在这个包初始化的时候，就会自动调用它的 init 函数，因此这些 init 函数的执行就都会发生在 main 函数之前。

![image-20231211221059812](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231211221059812.png)

1. main 包依赖 pkg1 和 pkg4 两个包，所以第一步，Go 会根据包导入的顺序，先去初始化 main 包的第一个依赖包 pkg1。

2. Go 在进行包初始化的过程中，会采用“深度优先”的原则，递归初始化各个包的依赖包。在上图里，pkg1 包依赖 pkg2 包，pkg2 包依赖 pkg3 包，pkg3 没有依赖包，于是 Go 在 pkg3 包中按照“常量 -> 变量 -> init 函数”的顺序先对 pkg3 包进行初始化

​	在 pkg3 包初始化完毕后，Go 会回到 pkg2 包并对 pkg2 包进行初始化，接下来再回到 pkg1 包并对 pkg1 包进行初始化。在调用完 pkg1 包的 init 函数后，Go 就完成了 main 包的第一个依赖包 pkg1 的初始化。

3. Go 会初始化 main 包的第二个依赖包 pkg4，pkg4 包的初始化过程与 pkg1 包类似，也是先初始化它的依赖包 pkg5，然后再初始化自身；
4. 当 Go 初始化完 pkg4 包后也就完成了对 main 包所有依赖包的初始化，接下来初始化 main 包自身。
5. main 包中，Go 同样会按照“常量 -> 变量 -> init 函数”的顺序进行初始化，执行完这些初始化工作后才正式进入程序的入口函数 main 函数。



```
prog-init-order
```

```
├── go.mod
├── main.go
├── pkg1
│   └── pkg1.go
├── pkg2
│   └── pkg2.go
└── pkg3
    └── pkg3.go
```

main 包依赖 pkg1 包和 pkg2 包；pkg1 包和 pkg2 包都依赖 pkg3 包。



下面只列出了 main 包的代码，pkg1、pkg2 和 pkg3 包的代码与 main 包都是类似的，你可以自己尝试去列一下。

```go
package main
​
import (
    "fmt"
​
    _ "github.com/bigwhite/prog-init-order/pkg1"
    _ "github.com/bigwhite/prog-init-order/pkg2"
)
​
var (
    _  = constInitCheck()
    v1 = variableInit("v1")
    v2 = variableInit("v2")
)
​
const (
    c1 = "c1"
    c2 = "c2"
)
​
func constInitCheck() string {
    if c1 != "" {
        fmt.Println("main: const c1 has been initialized")
    }
    if c2 != "" {
        fmt.Println("main: const c2 has been initialized")
    }
    return ""
}
​
func variableInit(name string) string {
    fmt.Printf("main: var %s has been initialized\n", name)
    return name
}
​
func init() {
    fmt.Println("main: first init func invoked")
}
​
func init() {
    fmt.Println("main: second init func invoked")
}
​
func main() {
    // do nothing
}
```

在 main 包中其实并没有使用 pkg1 和 pkg2 中的函数或方法，而是直接通过空导入的方式“触发”pkg1 包和 pkg2 包的初始化（pkg2 包也是通过空导入的方式依赖 pkg3 包的），下面是这个程序的运行结果：

```
$go run main.go
pkg3: const c has been initialized
pkg3: var v has been initialized
pkg3: init func invoked
pkg1: const c has been initialized
pkg1: var v has been initialized
pkg1: init func invoked
pkg2: const c has been initialized
pkg2: var v has been initialized
pkg2: init func invoked
main: const c1 has been initialized
main: const c2 has been initialized
main: var v1 has been initialized
main: var v2 has been initialized
main: first init func invoked
main: second init func invoked
```

Go 运行时是按照“pkg3 -> pkg1 -> pkg2 -> main”的顺序，来对 Go 程序的各个包进行初始化的，而在包内，则是以“常量 -> 变量 -> init 函数”的顺序进行初始化。此外，main 包的两个 init 函数，会按照在源文件 main.go 中的出现次序进行调用。

pkg1 包和 pkg2 包都依赖 pkg3 包，但根据 Go 语言规范，一个被多个包依赖的包仅会初始化一次，因此这里的 pkg3 包仅会被初始化了一次。

###### init 函数用途

1. 重置包级变量值

```go
package mypackage

// 包级变量
var packageVar int = 10

// 重置函数
func ResetPackageVar() {
    packageVar = 0 // 重置为0
}

// 其他使用packageVar的函数...
```

> 在这个例子中，`packageVar` 是一个包级变量，它在 `mypackage` 包内是全局可见的。`ResetPackageVar` 函数被用来重置这个变量的值。

2. 包级变量的复杂初始化

> 由于包级变量是在包被导入时初始化的，因此这种初始化通常会在程序启动时完成，且仅执行一次。

```go
package mypackage

import "fmt"

// 包级变量
var complexVar SomeType

// init函数用于复杂的初始化
func init() {
    complexVar = complexInitialization()
}

func complexInitialization() SomeType {
    // 这里可以是任何复杂的逻辑
    // 比如计算结果、加载文件、连接到数据库等

    var result SomeType
    // ...初始化result
    return result
}

// 其他函数可以使用初始化好的complexVar...

```

# 2023.12.12

### 搭建一个服务器

Go应用最广泛领域 API/RPC services

![image-20231212235009262](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231212235009262.png)



**建立一个http服务器。收到http请求。发送hello world 响应。**



建议 simple-http-server目录

```
mkdir simple-http-server
cd simple-http-server
go mod init simple-http-server
```

在 simple-http-server 目录下创建一个 main.go 源文件

```
  package main
 
  import "net/http"
  
  func main() {
      http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
          w.Write([]byte("hello, world"))
      })
      http.ListenAndServe(":8080", nil)
 }
```

> 两个重要的函数，一个是 ListenAndServe，另一个是 HandleFunc



处理请求函数

```
func(w http.ResponseWriter, r *http.Request)
```

两个参数，w 和 r。

第二个参数 r 代表来自客户端的 HTTP 请求，

第一个参数 w 则是用来操作返回给客户端的应答的，基于 http 包实现的 HTTP 服务的处理函数都要符合这一原型。

> 在这个例子中，我们仅设置了“/”这一个模式字符串，并且所有请求的 URI 都能与之匹配，自然所有请求都会被我们设置的处理函数处理。



运行代码

```
cd simple-http-server
go build
./simple-http-server
```



使用curl测试 模拟 客户端

```
$curl localhost:8080/
```

> hello, world

### 图书管理API服务

项目介绍：

图书馆 CRUD项目

>  模拟的是真实世界的一个书店的图书管理后端服务。这个服务为平台前端以及其他客户端，提供针对图书的 CRUD（创建、检索、更新与删除）的基于 HTTP 协议的 API。



![image-20231212235607611](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231212235607611.png)



模块拆分：

一部分是 HTTP 服务器，用来对外提供 API 服务；

另一部分是图书数据的存储模块，所有的图书数据均存储在这里。



```
mkdir bookstore
cd bookstore
go mod init bookstore
```

> go: creating new go.mod: module bookstore

项目布局

```
├── cmd/
│   └── bookstore/         // 放置bookstore main包源码
│       └── main.go
├── go.mod                 // module bookstore的go.mod
├── go.sum
├── internal/              // 存放项目内部包的目录
│   └── store/
│       └── memstore.go     
├── server/                // HTTP服务器模块
│   ├── middleware/
│   │   └── middleware.go
│   └── server.go          
└── store/                 // 图书数据存储模块
    ├── factory/
    │   └── factory.go
    └── store.go
```

**main包流程**

main 包是主要包，用于搞清楚各个模块之间的关系

1. 整个程序的入口

2. 整个程序中主要模块初始化与组装的场所

![image-20231212235729459](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231212235729459.png)

main包代码

```go
  package main
 
  import (
      _ "bookstore/internal/store"
      "bookstore/server"
      "bookstore/store/factory"
      "context"
      "log"
      "os"
      "os/signal"
      "syscall"
      "time"
 )
 
 func main() {
     s, err := factory.New("mem") // 创建图书数据存储模块实例
     if err != nil {
         panic(err)
     }
 
     srv := server.NewBookStoreServer(":8080", s) // 创建http服务实例
 
     errChan, err := srv.ListenAndServe() // 运行http服务
     if err != nil {
         log.Println("web server start failed:", err)
         return
     }
     log.Println("web server start ok")
 
     c := make(chan os.Signal, 1)
     signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
 
     select { // 监视来自errChan以及c的事件
     case err = <-errChan:
         log.Println("web server run failed:", err)
         return
     case <-c:
         log.Println("bookstore program is exiting...")
         ctx, cf := context.WithTimeout(context.Background(), time.Second)
         defer cf()
         err = srv.Shutdown(ctx) // 优雅关闭http服务实例
     }
 
     if err != nil {
         log.Println("bookstore program exit error:", err)
         return
     }
     log.Println("bookstore program exit ok")
 }
```

分块理解代码

```go
s, err := factory.New("mem")
```

> 调用工厂对象的 New 方法来创建一个新的数据存储模块实例
> "mem" 参数可能指示工厂方法使用内存作为数据存储的方式。这种模式通常用于创建具有不同实现但共同接口的对象
>
> `s` 是新创建的存储模块实例，而 `err` 用于捕获在创建实例过程中可能发生的任何错误。

```go
if err != nil {
panic(err)
}
```

> nil 是表示 空值 or 不存在的状态, 变量没有指向任何有效的内存地址或对象。
>
> 这一行是错误处理的代码。如果在创建存储模块时出现错误，`err` 将不会是 `nil`。通过检查 `err` 是否为 `nil`，代码可以确定是否发生了错误。
>
> `panic(err)`: 如果确实发生了错误（即 `err` 不为 `nil`），代码将触发一个 panic，这通常会导致程序崩溃并打印出错误消息。使用 panic 是一种处理不可恢复错误的方式，在这种情况下，它表示无法创建数据存储模块。

##### panic && deffered function && call stack && recover 

类比理解：

> 你正在一个大型的公司大楼里工作。这个大楼有许多楼层，每层楼都进行着不同的活动和操作。
>
> 每层楼 比作一个 函数调用栈（call stack） ： 每个楼层代表程序中的一个函数。
>
> 正常情况下，人们（即数据和控制流）按计划在楼层之间上下移动，就像程序在不同函数间按照预定的逻辑执行。
>
> 突然间有火警警报响起，这就像是在程序中调用了 `panic`。
>
> 警报是一个紧急信号，表明所有的正常活动都必须立即停止，人们需要按照特定的紧急程序（即“延迟函数(defered function)”）撤离大楼。
>
> 每层楼的人都会立刻停止他们正在做的事情，并开始执行紧急撤离程序。这就像是程序中的 `panic` 逐层向上回退栈帧，并执行每层栈帧上的延迟函数。
>
> 最终，如果火警是真实的，整个大楼（即程序）可能会被疏散，这代表程序的终止。如果火警被确认是虚假的，可能通过某种方式（类似于 `recover`），人们可以被告知返回他们的工作岗位，程序也可以继续执行。

**panic**

当panic被调用，会立即终止函数，并向上层 退栈，运行在这些栈上的 延迟函数(deferred functions)。然后继续，一直到程序最顶层报告panic发生原因。

用于处理不可恢复的错误情况： 数组越界访问， 空指针引用 or 严重的逻辑错误。

用于处理致命错误，立即停止，并汇报错误。

**deferred functions**

go语言中，是用defer关键字来进行标识。

这个函数的执行不会立即发生，而是在包含它的函数即将返回时执行。

通常用于 closing a file handle， Unlocking a mutex，执行清理工作。

例子：

```go
func readFile(filename string) ([]byte, error) {
    file, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer file.Close() // 确保在函数结束时关闭文件

    return ioutil.ReadAll(file)
}
```

> 在上面读取file的函数中，无论读取成功，还是遇到错误，读取失败，readFile函数都会在关闭前执行 file.Close()函数



什么是closing a file handle？

使用完一个文件之后释放与之相关联的资源的过程

File handle: 一个指向打开文件的引用或指针，它是操作系统提供的一种方式，用于访问和操作文件。

> 当一个程序打开一个文件时（例如用于读取或写入数据），操作系统会创建一个文件句柄，这个句柄包含了访问该文件所需的所有信息。程序通过这个句柄与文件交互，例如读取数据、写入数据或更改文件的位置。

不同的语言通过调用特定函数实现

> C 语言中的 `fclose()`
>
> Python 中的 `close()` 

当然高级语言 java 和 python也会自动回收



什么是Unlocking a mutex?

用于Control access to shared resources，以防止数据竞争和保证线程安全。

Mutex 互斥

Mutual Exclusion： 使用它可以实现thread间的互相排斥。

> 在多线程环境中，当一个线程需要访问一个共享资源时，它会先尝试“锁定（lock）”Mutex。如果Mutex已经被另一个线程锁定，这个thread将会等待（或阻塞），直到Mutex被释放。
>
> 当thread完成对shared resource的访问后，它必须“解锁（unlock）”互斥量，这样其他等待访问该资源的thread就可以锁定mutex并安全地访问资源了。

lock and unlock function to implement mutex

> C++: use lock() and unlock() in <mutex> library
>
> Go: use Lock() and Unlock() in sync package

**call stack**

一个程序在执行过程中，函数调用和返回值的堆栈结构。

> 每当程序调用一个新的函数，这个函数的信息（如参数、局部变量和返回地址）就会被放入这个栈中，而当函数执行完成后，其信息又会从栈中移除。



**recover function**

用于"Catch"或"recover"从 `panic` 引起的Abnormal control流程。

> 当一个 Go 程序触发 `panic` 时，它会立即停止当前函数的执行，并开始逐层向上回退栈（即退出函数调用），直到遇到合适的 `recover` 调用为止。`recover` 的作用是终止 panic 引起的异常控制流程，允许程序恢复正常执行。

1. recover 只有在 deferred function中 调用才会有效

   > `recover` 只有在延迟函数（deferred function）中调用时才有效。如果在延迟函数外调用 `recover`，它将不会捕获到任何 panic。

2. 用于catch panic

   >  当 `recover` 捕获到 panic，它会停止 panic 的传播（unwinding the stack），并返回传递给 `panic` 的值（如果有的话）。

3. Allow progress to continue run

   >  一旦 `recover` 成功捕获到 panic 并处理它，程序控制流程可以从 `recover` 调用之后的点继续执行。

4. use to handle error or clear

   > `recover` 常用于处理异常情况和执行必要的清理工作，如关闭文件、释放资源等，特别是在可能发生 panic 的情况下。

例子
```go
func mayPanic() {
    panic("a problem")
}

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from error:", r)
        }
    }()
    mayPanic()
    fmt.Println("After mayPanic()") // 这行代码只有在没有 panic 或 panic 被恢复时才会执行
}
```

> `main` 函数中有一个延迟函数，该函数使用 `recover` 来捕获和处理任何可能发生的 panic。
>
> 如果 `mayPanic` 函数触发 panic，延迟函数会捕获到它，并允许程序继续执行，而不是立即崩溃。

# 2023.12.13

继续分解代码模块2

建一个监听8080端口的 HTTP 服务器实例，并可能在创建过程中使用了 `s` 这个参数。这个服务器可以用来处理来自客户端的HTTP请求，并根据具体需求执行相应的操作。

```go
srv := server.NewBookStoreServer(":8080", s) // 创建http服务实例
```

> srv 变量名
>
> `:=` 表示在声明变量的同时初始化它。
>
> `erver.NewBookStoreServer(":8080", s)`：这个函数的目的是创建一个新的 HTTP 服务器实例。
>
> >  这部分代码调用了 `server` 包中的 `NewBookStoreServer` 函数，并传递了两个参数 `":8080"` 和 `s`。
> >
> > `":8080"`：这是服务器监听的端口号。在这里，服务器将监听本机的8080端口，以便接收来自客户端的HTTP请求。
> >
> > `s`：这是传递给服务器的参数，可能是配置信息、处理程序或其他服务器需要的信息。`s` 的具体含义需要查看 `NewBookStoreServer` 函数的实现来确定。

启动 HTTP 服务器，如果启动过程中出现错误，就记录错误信息并提前退出函数，否则，输出成功启动的日志消息。

```go
errChan, err := srv.ListenAndServe() // 运行http服务
if err != nil {
log.Println("web server start failed:", err)
return
}
log.Println("web server start ok")
```

> `errChan, err := srv.ListenAndServe()`：调用了 `srv`（之前创建的 HTTP 服务器实例）的 `ListenAndServe` 方法来启动服务器。
>
> > `ListenAndServe` 函数会监听指定的端口并处理来自客户端的 HTTP 请求。这个函数会返回两个值，一个是 `errChan`，另一个是 `err`。
>
> > `errChan`：这是一个通道（channel），通道是用于在不同 Go 协程之间传递数据的机制。在这里，`errChan` 可能用于在服务器运行时发送错误信息。
>
> > `err`：这是一个错误变量，如果 `ListenAndServe` 函数成功运行，`err` 将为 `nil`，否则，它将包含一个描述错误的值。

创建一个通道（channel）`c`，并注册信号通知，以便在操作系统接收到指定信号时发送通知到这个通道。

```go
c := make(chan os.Signal, 1)
     signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
```

> 创建了一个通道 `c`，并指定了通道的缓冲区大小为 1。
>
> 通道用于在不同的 Go 协程之间传递数据。
>
> > 这里的通道类型是 `os.Signal`，表示它将用于接收操作系统信号。
>
> `signal.Notify` 的主要作用是将指定的信号注册到通道 `c`，以便在程序运行时等待信号，并在接收到信号时执行相应的操作。一旦信号被注册，通道 `c` 就会在接收到这些信号时收到通知。
>
> 后面syscall.SIGINT, syscall.SIGTERM就是两个信号
>
> > `syscall.SIGINT` 通常表示终止程序，例如，**用户**在终端中按下 Ctrl+C 会触发这个信号。
> >
> > 它的主要目的是通知正在运行的进程立即中断执行，以便程序可以优雅地终止。
> >
> > **用户交互式**
>
> > `os.Signal(syscall.SIGTERM)`：表示终止信号，通常由**系统或管理员**发出，用于请求程序正常退出。
> >
> > 它的目的是请求进程正常退出，但不会立即强制终止，允许程序有机会执行清理操作。
> >
> > **系统管理和脚本控制**

# 2023.12.14 

## 详细拆解代码

```go
     select { // 监视来自errChan以及c的事件
     case err = <-errChan:
         log.Println("web server run failed:", err)
         return
     case <-c:
         log.Println("bookstore program is exiting...")
         ctx, cf := context.WithTimeout(context.Background(), time.Second)
         defer cf()
         err = srv.Shutdown(ctx) // 优雅关闭http服务实例
     }
```

> `select` 语句，它用于同时监视两个通道 (`errChan` 和 `c`) 的事件，根据不同的事件执行相应的操作。
>
> `case err = <-errChan:`：这个 `case` 表示当从 `errChan` 接收到数据（或者通道关闭）时，执行以下操作。
>
> - 如果从 `errChan` channel 接收到数据，表示 `err` 变量将被设置为接收到的错误值，并输出错误消息。
> - 然后，函数使用 `return` 语句提前退出。
>
> `case <-c:`：这个 `case` 表示当从 `c` channel 接收到数据（或者通道关闭）时，执行以下操作。
>
> start a graceful shutdown( respond to an interrrupt signal)
>
> >  context.Background(): 返回一个空的Context，它通常用在主函数、初始化以及测试代码中，作为上下文的根。这个空的Context没有任何数据、取消信号或截止时间。
>
> ctx, cf := context.WithTimeout(context.Background(), time.Second) ： 创建一个带有超时的上下文。
>
> `defer cf()`：延迟取消上下文，以确保在包围函数退出时调用。
>
> `err = srv.Shutdown(ctx)`：用创建的上下文调用服务器（`srv`）的`Shutdown`方法。

**select语句**

用于wait on multiple channel operations. 

**context包**

> `context` 包被广泛用于控制多个goroutine之间的超时、取消信号、截止时间等。

**什么是上下文contxt和context.Background()联系 ** 

房子的地基context.Background 和 上面的建造的东西 context

> 你正在建造一栋房子。这个房子需要一个基础或地基。这个基础是最基本的，它本身并不决定房子的最终样式、大小或功能，但它是建造房子的起点。
>
> - **房子的基础** 就像是 `context.Background()`。它是最基础的、最简单的，没有任何额外的结构或功能。
>
> - **建造的房子** 可以比作基于这个基础上下文创建的具有特定行为的上下文（比如带有超时或取消功能的上下文）
>
>   在这个比喻中，`context.Background()` 提供了一个起始点，但它本身并不包含任何特定的行为（就像一个简单的房子基础并不决定房子的具体设计）。当你需要创建一个具有特定需求（比如处理超时或取消操作）的上下文时，你会在这个基础上下文的基础上进行扩展，就像在房子的基础上建造具体的房屋结构一样。

**timescond**

好比一个计时器，代表了一秒钟的时间长度。

在这里传进去，就是说 计时器时间到了，房子就毁灭掉，这也是为什么 context.WithTimeout(context.Background(), time.Second) 传两个参数

**ctx 和 cf**

`ctx` 和 `cf` 是从 `context.WithTimeout` 函数返回的两个值。

**`ctx` (Context)**：

`ctx` 是一个被设定为在一秒后自动超时的上下文。意味着任何使用这个 `ctx` 的操作（如HTTP请求、数据库查询等）都会在一秒后自动被取消，除非它们更早完成。

**`cf` (CancelFunc)**：

用于手动取消其关联的上下文 `ctx`。 手动立即拆毁房子。

当 `cf()` 被调用时，它立即发送取消信号到 `ctx`。这对于**提前中止使用该上下文的操作**非常有用。

与 def 结合使用

`defer cf()` 是一种常见的用法，它确保在当前函数返回之前调用 `cf()`，以释放与 `ctx` 相关联的资源并发送取消信号。

综上理解代码：
这个调用中，ctx 是一个被设定为在一秒后自动超时的上下文。这意味着任何使用这个 ctx 的操作（如HTTP请求、数据库查询等）都会在一秒后自动被取消，除非它们更早完成。

```go
     if err != nil {
         log.Println("bookstore program exit error:", err)
         return
     }
     log.Println("bookstore program exit ok")
 }
```

> if err != nil 说明存在错误
>
> return 退出函数

## 图书数据存储模块 (store)

用来存储整个 bookstore 的图书数据的。

最简单的方式莫过于在内存中创建一个 map，以图书 id 作为 key，来保存图书信息。

考虑 持久化：存储到 Nosql 数据库甚至是关系型数据库。

为了多种 存储方式， 实现一个接口类型 store

```go
// store/store.go

 type Book struct {
     Id      string   `json:"id"`      // 图书ISBN ID
     Name    string   `json:"name"`    // 图书名称
     Authors []string `json:"authors"` // 图书作者
     Press   string   `json:"press"`   // 出版社
 }
 
 type Store interface {
     Create(*Book) error        // 创建一个新图书条目
     Update(*Book) error        // 更新某图书条目
     Get(string) (Book, error)  // 获取某图书信息
     GetAll() ([]Book, error)   // 获取所有图书信息
     Delete(string) error       // 删除某图书条目
 }
```

**struct**

创建自定义数据类型的方式

允许你将多个不同类型的数据项组合成一个单一的复合类型

**interface**

定义了一组方法，但不实现这些方法。

如果一个类型实现了接口中的所有方法，我们说这个类型实现了该接口。

类比理解 interface

> 在餐馆点菜， interface 就可以比作manu，你可以在manu上点各种菜
>
> - **菜单（接口）**：定义了可以提供什么（定义了方法）。
> - **厨师（类）**：根据菜单（接口）准备食物（实现方法）。
> - **顾客（代码使用者）**：只需要看菜单来决定他们想要什么，而不需要知道厨师是如何准备食物的。
>
> 在不同的餐馆，相同的菜（比如炒面）可能会有不同的制作方式，但对顾客来说，他们只需通过菜单（接口）来点菜。

实际例子

一个打印机的interface， 有两个不同的类型的打印机实现

>  打印机interface

```go
type Printer interface {
    Print(document string)
}
```

> 喷墨打印机

```go
type InkjetPrinter struct {
    // InkjetPrinter的特定属性
}

func (p InkjetPrinter) Print(document string) {
    fmt.Println("Print with InkjetPrinter: ", document)
}
```

> 激光打印机

```go
type LaserPrinter struct {
    // LaserPrinter的特定属性
}

func (p LaserPrinter) Print(document string) {
    fmt.Println("Print with LaserPrinter: ", document)
}
```

使用不一样的打印机打印

```go
inkjetPrinter := InkjetPrinter{}
laserPrinter := LaserPrinter{}
```

```go
var printer Printer

// 使用喷墨打印机
printer = inkjetPrinter
printer.Print("This is a test document.")

// 切换到激光打印机
printer = laserPrinter
printer.Print("This is another test document.")
```

# 2023.12.15

上面关于web的小项目困惑的地方太多，决定先学语法，再回头巩固。

## Go 语法

### go变量声明

变量：方便操作内存特定位置的数据，我们用一个特定的名字与位于特定位置的内存块绑定在一起。

**动态语言 和 静态语言的区别**

动态语言（比如 Python、Ruby 等）的解释器可以在运行时通过对变量赋值的分析，自动确定变量的边界。

静态语言，需要声明变量类型。。

> 静态类型语言编译器必须明确知道一个变量的边界才允许使用这个变量，但静态语言编译器又没能力自动提供这个信息，这个边界信息必须由这门语言的使用者提供，于是就有了“变量声明”。

Go属于静态语言，需要声明变量。

需要告诉 编译器 该变量 可以操控的内存边界的信息。

```go
var a int = 10
```

> var 是修饰变量声明的关键字；
>
> a 为变量名；
>
> int 为该变量的类型；
>
> 10 是变量的初值。

![image-20231215151930679](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231215151930679.png)

没有显式为变量赋予初值，Go 编译器会为变量赋予这个类型的零值

```go
var a int // a的初值为int类型的零值：0
```



**变量声明块**

用一个 var 关键字将多个变量声明放在一起

```go
var (
	a int = 123
	b int8 = 6
	c string = "hello"
	d rune = 'A'
	e bool = true
)
```

```go
var a, b, c int = 5, 6, 7
```

```go
var (
    a, b, c int = 5, 6, 7
    c, d, e rune = 'C', 'D', 'E'
)

```



**go语法自补全**

```go
var b = 13
```

> Go 编译器会根据右侧变量初值自动推导出变量的类型，并给这个变量赋予初值所对应的默认类型。
>
> 比如，整型值的默认类型 int，浮点值的默认类型为 float64，复数值的默认类型为 complex128。
>
> 比如布尔值的默认类型只能是 bool，字符值默认类型只能是 rune，字符串值的默认类型只能是 string 等。

也可以已通过 显示类型转型

```go
var b = int32(13)
```

多变量声明

```go
var a, b, c = 12, 'A', "hello"
```

下面是错误的

```go
var b
```

**另外一种短变量声明**

```go
a := 12
b := 'A'
c := "hello"
```

> 短变量声明将通用变量声明中的四个部分省去了两个，但它并没有使用赋值操作符“=”，而是使用了短变量声明专用的“:=”。

```go
a, b, c := 12, 'A', "hello"
```

## Go语言变量分类

包级变量 package variable

> 在包级别可见的变量。如果是导出变量（大写字母开头），那么这个包级变量也可以被视为全局变量

```go
//第一种：
plain
var a = 13 // 使用默认类型
var b int32 = 17  // 显式指定类型
var f float32 = 3.14 // 显式指定类型

//第二种：
var a = 13 // 使用默认类型
var b = int32(17) // 显式指定类型
var f = float32(3.14) // 显式指定类型
```

```go
var (
	a = 13
	b = int32(17)
	f = float32(3.14)
)
```

局部变量 local variable

> Go 函数或方法体内声明的变量，仅在函数或方法体内可见

```go
a := 17
f := 3.14
s := "hello, gopher!"
```

```go
a := int32(17)
f := float32(3.14)
s := []byte("hello, gopher!")
```

包边了只可以使用var 形式声明，不能用`:=`

# 2023.12.16

**延迟声明**

```go
var a int32
var f float64
```

变量声明遵循**就近原则**

> 尽可能在 靠近第一次使用变量的位置声明这个变量

短声明 + 分支

短声明：`:=`

下面是一个 if + 短声明例子

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	s := "Hello, world"
	if index := strings.LastIndexAny(s, "wo"); index != -1 {
		fmt.Println("Found at index:", index)
	} else {
		fmt.Println("Not found")
	}
}
```

> index变量是在if语句中声明的，使用 `:=`短声明
>
> 该index只能在if语句块中，包括 所有 else 和 else if 分支



### Variable Shadowing

```go
var a = 11

func foo(n int) {
  a := 1
  a += n
}

func main() {
  fmt.Println("a =", a) // 11
  foo(5)
  fmt.Println("after calling foo, a =", a) // 11
}
```

> 函数 foo 调用前后，包级变量 a 的值都没有发生变化。
>
> > 这是因为，虽然 foo 函数中也使用了变量 a，但是 foo 函数中的变量 a 遮蔽了外面的包级变量 a，这使得包级变量 a 没有参与到 foo 函数的逻辑中，所以就没有发生变化了。

### Block 和 Scope

#### Block

![image-20231217110330639](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Go.assets/image-20231217110330639.png)

block分为Explict Blocks 和 Implict Blocks

显示 和 隐式

Implict Block没有括号

```go
func foo() { //代码块1
    { // 代码块2
        { // 代码块3
            { // 代码块4

            }
        }
    }
}
```

工具检测代码遮蔽问题

安装

```go
go install golang.org/x/tools/go/analysis/passes/shadow/cmd/shadow@latest
```

检查

```go
go vet -vettool=$(which shadow) -strict complex.go
```



### Go data type

#### Basic data types

##### bool

只有 true 和 false，默认为 false。

```go
var isTrue bool = true
var isFlase = false
```

##### number

```go
var age int = 18
```

`int8` `uint8
int16` `uint16
int32` `uint32
int64` `uint64`

```go
var a int8 = 127
```

> int8 存储 -127-128

```go
var b unit8 = 255
```

> unit8 是 0到255 也称为byte

```go
var c int16 = 32767
```

> int16 存储-32768 到32767

```go
var g int64 = 9223372036854775807
```

##### float

`float32` `float64`

```go
var temp float64 = 36.6
```

##### String

It can only be defined with a pair of double quotation marks ("") or inverse quotation marks ("), not with single quotation marks (")!

```go
var hello string = "Hello, world!"
```

Distinguish between single and double quotation marks

> In the Go language, there is indeed a clear distinction between single and double quotation marks, which are used to represent different types of data:
>
> 1. **Double quotation marks** are used to represent the string (`string`) type. A string can contain one or more characters, including empty strings. For example:
>    - `var greeting string = "Hello, World!"`
> 2. **Single quotation marks** are used to represent a single character (`rune`) type, that is, a Unicode code point. For example:
>    - `var letter rune = 'A'`

#### Composite data type Complex

```go
var coEx1 complex64 = 1 + 2i
```

Above is a plural type

##### Array

**declaration**

```go
var a [5]int
```

> Declare an array of 5 elements, with a default initial value of 0

Declare and assign values

```go
b := [5]int{1, 2, 3, 4, 5}
```

Specify the first and last positions, do not specify the remaining positions

```go
c := [5]int{0:1, 4: 5}
```

> Create an array of 5 elements, with the first and last elements initialized as 1 and 5, and the rest as 0

There are five classicial type to build an arr in go

```go
package main

import "fmt"

func main() {
    var a [3]int //The array will be initialized to a zero value of type int
    fmt.Println(a) //Output: [0 0 0]

    b := [3]int{1, 2, 3} //Declare and initialize arrays
    fmt.Println(b) //Output: [1 2 3]
  
    c := [...]int{4, 5, 6} // Use... Let the compiler calculate the length of the array.
    fmt.Println(c) // Output: [4 5 6]

    d := [3]int{1, 2} // Initialize the first two elements, with the third element having a zero value
    fmt.Println(d) //Output: [1 2 0]
    
    e := [3]int{2: 3} //Initialize only the last element.
    fmt.Println(e) // Output: [0 0 3]
}
```



**Access and modify array elements**

**access**

```go
a[0]
```

> accessing the first element in arr

**modify**

```go
a[0] = 10
```

**get the len of arr**

len()

```go
len(a)
```

> Len(a) will return the length of the array a.

##### Slice 切片

```go
s := []int{1, 2, 3}
```

> Create and initialize an integer slice.

```go
arr := [5]int{1,2,3,4,5}
slice := arr[1:4] // 2,3,4 [left closed && right open)
```

> create a slice and Quote the 2nd to 4th elements of arr.

```go
s := make([]int, 5)
```

> Create a slice with len of 5

```go
 package main
 
 import "fmt"

func main(){
  s := []int{1, 2, 3}
  fmt.Println(s) // [1, 2, 3]
  
  arr := [5]int{1,2,3,4,5}
  slice := arr[1, 4] 
  fmt.Println(slice) // [2, 3, 4]
  

  s2 := make([]int, 5)
  fmt.Println(s2) // [0, 0, 0, 0, 0]
  
  // s [1, 2, 3]
  s = append(s, 4, 5)
  fmt.Println(s) // [1, 2, 3, 4, 5]
  s3 := s[1:3]
  fmt.Println(s3) // [2, 3]
}
```

**append function**

When the capacity of the slice is not enough to accommodate more elements, 

the append function can be used to expand the slice.

```go
s = [...]int{1, 2, 3}
s = append(s, 4, 5)
```

> add two new element 4 and 5 in the ending of arr s

##### Mapping

use to store key-value paris

Each key is mapped to a value. The mapped key is unique, which means that each key can only appear once.

```go
m := make(map[string]int)
```

> create a map, which key type is string, value type is int

**operation related to map**

Add, delete, check and modify

```go
m["apple"] = 5
```

```go
delete(m, "apple")
```

```go
m["apple"]
```

```go
m["apple"] = 6
```

eg:

```go
package main

import "fmt"

func main() {
//Initialize mapping
  m := map[string]int{"apple" : 5, "banana": 3}

//Update values in the mapping
    m["apple"] = 10

//Delete key value pairs
    delete(m, "banana")

//Check and modify
  if value, ok := m["orange"]; ok {
    m["orange"] = value + 5
  } else {
    m["orange"] = 1
  }

//Print Mapping
    fmt.Println(m) // 输出: map[apple:10 orange:1]
}

```



**HashSet**

```go
set := make(map[string]bool)
```

```go
set["apple"] = true
set["banana"] = true
```

```go
if _, exists := set["apple"]; exists {
		fmt.Println("apple exists in the set")
}
```

```go
delete(set, "apple")
```

Eg:

```go
package main

import "fmt"

func main() {
//Create a simulated HashSet
    set := make(map[string]bool)

//Add elements
    set["apple"] = true
    set["banana"] = true

//Check if the element exists
    if _, exists := set["apple"]; exists {
        fmt.Println("apple exists in the set")
    }

//Delete Element
    delete(set, "apple")

//Check again if the element exists
    if _, exists := set["apple"]; exists {
        fmt.Println("apple still exists in the set")
    } else {
        fmt.Println("apple no longer exists in the set")
    }
}
```

##### Struct 结构体

common grammar

```go
type StructName struct{
	Field1 fieldtype1
	Field2 fieldtype2
	//...
}
```

> - `StructName` is the name of the structure.
> - `Field1`, `Field2`, ... It is the field name in the structure.
>
> - `FieldType1`, `FieldType2`, ... It is the data type of the corresponding field.

Eg: 

```go
package main

import "fmt"

//Defining the Person structure
type Person struct {
    Name string
    Age  int
}

func main() {
//Create an instance of Person
    p := Person{Name: "Alice", Age: 25}

//Accessing Fields
    fmt.Println("Name:", p.Name)
    fmt.Println("Age:", p.Age)

//Modifying Fields
    p.Age = 26
    fmt.Println("Updated Age:", p.Age)
}

```

create a struct  without pass value

```go
var p Person
```

```go
p := new (Person)
```

```go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func main() {
    var p Person
    fmt.Println(p) // Output: {0}

    p2 := new(Person)
    fmt.Println(p2) //Output:&{0}
}
```

##### Channel 通道

Channel is a special type used for communication between different Go coroutines

```go
ch := make(chan int)
```

> Create a channel to transfer int type data

```go
ch <- 10 //Send 10 to channel ch
```

> use <- to send data the channel ch

```go
value := <-ch //Receive data from channel ch and store it in variable value
```

> receive data from channel ch and store in value variable

```go
close(ch)
```

> close channel ch

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    ch := make(chan int) // Create an integer channel

    var wg sync.WaitGroup
    wg.Add(2)

//Sender Go Collaboration
    go func() {
        defer wg.Done()
        for i := 0; i < 5; i++ {
            ch <- i //Send data to the channel
            time.Sleep(time.Second)
        }
        close(ch)
    }()

//Receiver Go Collaboration
    go func() {
        defer wg.Done()
        for value := range ch {
            fmt.Println("Received:", value)
        }
    }()

    wg.Wait()
}
```

> Created an integer channel ch. 
>
> One Go protocol sends numbers 0 to 4 to the channel, 
>
> while another Go protocol receives these numbers from the channel and prints them. 
>
> Use sync WaitGroup will wait for the completion of the two Go processes.
>
>  After the sender's Go protocol completes sending, it closes the channel, indicating that no new data will be sent.

## 2023.12.17

#### Special types

##### Pointer 指针

The memory address used to point to another variable.

In Go, the type is `*T`

T is the type of value pointed to by the pointer.

Eg:

```go
*int
```

###### Quotation

Dereference refers to accessing the value of the variable pointed by the pointer through the pointer.

*

>p is the pointer pointed to int value
>
>*p is the int value

Eample:

```go
package main

import "fmt"

function main() {
	var a int = 10 // Define an integer variable a
	var p *int //Define a pointer p pointing to an integer a
	
	
	p = & a //Point pointer p to the address of variable a
	
	fmt.Println("the address of a is ", p)
	fmt.Println("the p pinter pointed to value: ", *p)

}
```



Example2:

```go
package main

import "fmt"

func doubleValue(x *int) {
	*x = *x * 2; //Modify the original value through a pointer
}


func main() {
  
  value := 5
  doubleValue(&value) // passing  Address of the value
  fmt.Println("Value becomes:", value)
}
```

Example3:

```go
package main
	
import "fmt"


type Point struct {
  X, Y int
}

func main() {
  p1 := &Pint{1, 2}
  fmt.Println("Point:" *p1)
 
   p1.X = 3           //modifying structural fields through pointers
   p1.Y = 4
   fmt.Println("Updated Point:", *p1)
}

```

## 2023.12.18

##### interface 接口 

interface is a special type declaration：

specifies a set of methods but does not implement them.

Example:

```go
type Speaker interface {
	Speak() string
}
```

> Speaker is an interface that defines a method called Speak, which has no parameters and returns a value of type string.

###### Implicit implementation

In Go, a type does not need to explicitly declare that it implements a certain interface.

Example:

define Aminal interface

```go
type Animal interface {
    Speak() string
}
```

define Dog 

```go
type Dog struct{}

func (d Dog) Speak() string {
	return "Woof!“
}
```

> In Go, methods are usually **defined separately outside the structure definition**,
>
>  but they are still associated with specific structure types.

>  Even if the definition of the Speak() method is outside the Dog structure, it is still part of the Dog type because its receiver is of the Dog type (Func (d Dog)). In this way, any instance of Dog type can call the Speak() method.

##### polymorphism

How to use interfaces to achieve polymorphism

Example:

1. build a Write base class

```go
type Writer interface {
	Write(message string) error
}
```

2. build two sub interface i

## 2023.12.19 

##### 函数
