---
title: Operation System
date: 2023-11-23 20:48:53
categories:
- Technical stack
tags: 
- Operation System
---

# Operation System

<!-- more -->

# Process and Thread

进程 Process ： The Basic Unit of Resource Management.

线程 Thread： he basic unit of program execution.

### How to understand the difference between the process and thread？

Thread：

It can be compared to doing multiple things for a person at the same time, such as playing with a mobile phone while eating.

Process：

If threads are compared to cars, processes can be compared to highways. The same number of cars operate on multiple highways.



Using highways and cars to understand this question:

Process: highways

Each highway has its own route, traffic rules and signs, which is equivalent to the memory space, resources and operating system allocation environment of the process.

Thread: Cars driving on the highways

Each car has its own destination (task) and driving path (execution sequence), but they share the resources of the highway (such as lanes, traffic lights, etc.).

### Thread and Process switching(线程切换)

进程提供了一个隔离和资源管理的环境.

线程则是在这个环境中执行实际任务的实体。

线程之间的资源共享提高了效率，但也带来并发的问题。同时，进程的隔离性可以避免这些问题。

Thread switch quicker than process

> > Cars can quickly change direction or stop, similar to the speed of thread context switching faster than process switching. 

Multiple threads sharing processes

> > Multiple cars can drive simultaneously on the same road, just like multiple threads can execute concurrently in the same process.

Theads isolation

> > Different roads (processes) are isolated from each other. A traffic accident on one road will not directly affect another road, similar to a process crash that usually does not directly affect another independent process.

> 想象一个大型公司，这个公司有许多不同的部门（进程），每个部门负责不同的任务。公司的总部（操作系统）分配给这些部门资源（比如资金、办公空间）并监督它们的总体运作。
>
> 部门（进程）：每个部门有自己的空间和资源。部门负责其内部的具体运作，如分配工作、管理内部资源。总部负责监督这些部门，决定哪个部门被开设、哪个需要关闭。
>
> 小组或团队（线程）：每个部门内部有不同的小组或团队。这些小组共享部门的资源，如办公设备、预算等。小组的日常管理（谁负责哪个项目，任务的分配等）通常由部门内部决定，而不是由总部直接管理。在这个类比中，操作系统就像公司的总部，它管理着整个公司的大局，并直接对部门（进程）进行监督。
>
> 而部门内部如何运作，特别是如何在其成员（线程）间分配任务和资源，这更多的是部门内部的事情，总部不会过多干预。这就类似于操作系统管理进程，而进程内部管理自己的线程。

## Coroutine(协程)

Suitable for handling I/O intensive tasks

Collaborating and threading are both used to handle multitasking.

1. Swtich

   Thread switch: content switch **controlled by the operating system kernel **.

   Coroutine switch: content  **switch in user state **, do not need kernel.

2. Memory and resouces cost

   Thread switch:  **relatively slow**, especially when **the load is high.**

   Coroutine switch:  **Faster** and **less** expensive. It only involves saving and restoring the values of several registers.

3. control structure

   Thread : Preemptive(抢占式) multitasking.

   **operating system controls** the running time of each thread and decides when to interrupt the running thread and switch to another thread. This process is called "preemption".

   Coroutine : Collaborative(协作式) multitasking.

   Task switching is **controlled by the task itself**

4. Practical Application Selection

   Computation-intensive: thread (Statistical analysis, data mining)

   I/O intensive: corroutine (Network server or database application)

   

### User State and Kernel State

#### user state

normal  applications

cannot perform certain high-privileged operations

> > library visitors: can access most books but cannot enter some special areas

#### kernel state

execute any CPU instructions and access all memory

allows the operating system kernel to access all resources and perform all operations.

> > library managers: can access all the areas in library. Including special areas(visitor cannot access)



## I/O

input and output

It refers to data transmission among computer system and others(users, other system, devices).

hardware I/O and software I/O

### I/O category

#### Hardware I/O

Data exchange between computers and external hardware devices (Keyboard, mouse, monitor, printer, hard drive, network device, etc.)

> >use keyword to type word and see it on screen
> >
> >When you type the keyboard, the keyboard (input device) sends the key signal to the computer; The computer processes these signals and may display the results on the display, which is a process of input and output.

#### Software I/O

Data exchange between programs and external environments (such as file systems, networks, and other programs).

> >Read or write file
> >
> >A program reads data (input) from a file on the hard disk, or writes data to a file (output)

### I/O operation

#### Synchronous IO

wait and when the IO finish, it can continue

The program that initiates the I/O request must wait for the I/O operation to complete before continuing.

#### Asynchronous IO

not need to wait, but receive notification after the I/O finished

Asynchronous I/O allows the program to continue to perform other tasks after initiating the I/O request. When the I/O operation is completed, the program will receive a notification.

This is very useful when handling internet request or large data for efficiency



> > Example to understand asynchronous IO
> >
> > We want to design a network chat software Application
> >
> > This chat applcation needs to handle information exhange from mutiple clients
>
> 
>
> > For tradition way, We use Sychronuous IO
> >
> > The service need to create one thread to handle the request for each client
> >
> > when handing request, the thread will be in a waiting staus,  because the Network latency or waiting for the client to send information
> >
> > therefore, **Most threads are in a waiting state due to I/O operations (such as network latency).**
>
> 
>
> >Using Asynchronous IO
> >
> >In the asynchronous I/O model, the server no longer creates a separate thread for each connection.
> >
> >**One thread will handle multiple connections in a non-blocking manner**. when the server sends a message to a client and waits for a response, it can immediately switch to processing messages from another client instead of waiting idle.



## 进程间通信方式

There are five types in total： 管道，消息队列，共享内存，信号量，信号， socket

#### 为什么进程间需要通信？
每个进程的用户地址空间都是独立的，一般而言是不能互相访问的，但内核空间是每个进程都共享的，所以进程之间要通信必须通过内核。

![image-20231130100443938](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/operationsystem.assets/image-20231130100443938.png)





![image-20231129112245378](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/operationsystem.assets/image-20231129112245378.png)

### 管道

管道中的数据只能单向流动，只能在具有亲缘关系的进程间使用。

亲缘关系通常是指父子进程关系。



**实际应用场景**

linux命令中下面的 | 就是管道的意思

```
ps auxf | grep mysql
```

上面命令行里的「`|`」竖线就是一个**管道**，它的功能是将前一个命令（`ps auxf`）的输出，作为后一个命令（`grep mysql`）的输入，从这功能描述，可以看出**管道传输数据是单向的**，如果想相互通信，我们需要创建两个管道才行。

**特点**

单向通信

不适合频繁交换数据

**本质**

**所谓的管道，就是内核里面的一串缓存**。从管道的一段写入的数据，实际上是缓存在内核中的，另一端读取，也就是从内核中读取这段数据。另外，管道传输的数据是无格式的流且大小受限。



**管道分类**

**匿名管道**

如何实现进程间的通信

**通信范围是存在父子关系的进程**。

> - 父进程创建管道，得到两个⽂件描述符指向管道的两端
> - 父进程fork出子进程，⼦进程也有两个⽂件描述符指向同⼀管道。
> - 父进程关闭fd[0],子进程关闭fd[1]，即⽗进程关闭管道读端,⼦进程关闭管道写端（因为管道只支持单向通信）。⽗进程可以往管道⾥写,⼦进程可以从管道⾥读,管道是⽤环形队列实现的,数据从写端流⼊从读端流出,这样就实现了进程间通信。

**命名管道**

 (named pipe) ：有名管道也是半双工的通信方式，但是**可以在不相关的进程间也能相互通信**

FIFO：无关的进程之间交换数据，与无名管道不同。

**两者的联系**

进程写入的数据都是缓存在内核中，另一个进程读取数据时候自然也是从内核中获取，同时通信数据都遵循**先进先出**原则，不支持 lseek 之类的文件定位操作。

### 消息队列

解决process间的频繁交换数据。

**消息队列是保存在内核中的消息链表**

> 在发送数据时，会分成一个一个独立的数据单元，也就是**消息体**（数据块）。
>
> 消息体是用户自定义的数据类型，消息的发送方和接收方要约定好消息体的数据类型，所以
>
> 每个消息体都是**固定大小的存储块**，不像管道是无格式的字节流数据。
>
> 如果进程从消息队列中**读取了消息体**，内核就会把这个**消息体删除**。

**消息队列如何通信？**

> A 进程要给 B 进程发送消息，
>
> A 进程把数据放在对应的消息队列后就可以正常返回了，
>
> B 进程需要的时候再去读取数据就可以了。
>
> 同理，B 进程要给 A 进程发送消息也是如此。



**特点**

**通信不及时**

> **消息队列通信过程中，存在用户态与内核态之间的数据拷贝开销**，因为进程写入数据到内核中的消息队列时，会发生从用户态拷贝数据到内核态的过程，同理另一进程读取内核中的消息数据时，会发生从内核态拷贝数据到用户态的过程。



**不适合比较大数据的传输**， 因给 消息体都有 最大长度限制， 同时 队列中的消息体数量也有上限。

> 在 Linux 内核中，会有两个宏定义 `MSGMAX` 和 `MSGMNB`，它们以字节为单位，分别定义了一条消息的最大长度和一个队列的最大长度。

### 共享内存

shared memory

解决 消息队列的读取和写入的过程，都会有发生用户态与内核态之间的消息拷贝过程。

**共享内存通信方式**

共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。

多个进程可以同时操作，所以需要进行同步。

共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号，配合使用，来实现进程间的同步和通信。

> > 现代操作系统，对于内存管理，采用的是虚拟内存技术，也就是每个进程都有自己独立的虚拟内存空间，不同进程的虚拟内存映射到不同的物理内存中。所以，即使进程 A 和 进程 B 的虚拟地址是一样的，其实访问的是不同的物理内存地址，对于数据的增删查改互不影响。
>
> **共享内存的机制，就是拿出一块虚拟地址空间来，映射到相同的物理内存中**。这样这个进程写入的东西，另外一个进程马上就能看到了，都不需要拷贝来拷贝去，传来传去，大大提高了进程间通信的速度。

![image-20231130101958359](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/operationsystem.assets/image-20231130101958359.png)

**特点**

进程冲突：

多个进程同时修改同一个共享内存，很有可能就冲突了。例如两个进程都同时写一个地址，那先写的那个进程会发现内容被别人覆盖了。

### 信号量

解决共享内存的 进程冲突问题

> 防止多进程竞争共享资源，而造成的数据错乱，所以需要保护机制，使得共享的资源，在任意时刻只能被一个进程访问。正好，**信号量**就实现了这一保护机制。

信号量是一个计数器，可以用来控制多个进程对共享资源的访问。它常作为一种锁机制，防止某进程正在访问共享资源时，其他进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。

**信号量操作方式**

原子操作： P 和 V

**P 操作**，这个操作会把信号量减去 1，相减后如果信号量 < 0，则表明资源已被占用，进程需阻塞等待；相减后如果信号量 >= 0，则表明还有资源可使用，进程可正常继续执行。

**V 操作**，这个操作会把信号量加上 1，相加后如果信号量 <= 0，则表明当前有阻塞中的进程，于是会将该进程唤醒运行；相加后如果信号量 > 0，则表明当前没有阻塞中的进程；



互斥的例子

> - 进程 A 在访问共享内存前，先执行了 P 操作，由于信号量的初始值为 1，故在进程 A 执行 P 操作后信号量变为 0，表示共享资源可用，于是进程 A 就可以访问共享内存。
> - 若此时，进程 B 也想访问共享内存，执行了 P 操作，结果信号量变为了 -1，这就意味着临界资源已被占用，因此进程 B 被阻塞。
> - 直到进程 A 访问完共享内存，才会执行 V 操作，使得信号量恢复为 0，接着就会唤醒阻塞中的线程 B，使得进程 B 可以访问共享内存，最后完成共享内存的访问后，执行 V 操作，使信号量恢复到初始值 1。

信号初始化为 `1`，就代表着是**互斥信号量**，它可以保证共享内存在任何时刻只有一个进程在访问，这就很好的保护了共享内存。



合作例子

> 进程 A 是负责生产数据，而进程 B 是负责读取数据，这两个进程是相互合作、相互依赖的，进程 A 必须先生产了数据，进程 B 才能读取到数据，所以执行是有前后顺序的。

### 信号 

上面说的进程间通信，都是常规状态下的工作模式。**对于异常情况下的工作模式，就需要用「信号」的方式来通知进程。**



一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。

eg： 对于Linux来说，实际信号是软中断，许多重要的程序都需要处理信号。信号，为Linux提供了一种处理异步事件的方法。比如，终端用户输入了ctrl+c来中断程序，会通过信号机制停止一个程序。



### Socket

不同机器间的进程通信。



## Why virtual address space switching can be time-consuming？

The picture below is used to show how cache in the machine works.

The purpose: convert a **virtual address** requested by a program into **data** bytes



![image-20231202082051602](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/operationsystem.assets/image-20231202082051602.png)





**如果你能像达尔文那样，带着好奇的毅力，循序渐进地去做，那么你就不会觉得这是艰巨的任务。你将会惊讶地发现自己完全能够胜任。**
