---
title: Front End Learning Notes
date: 2023-11-05 21:29:54
categories:
- Technical stack
tags: 
- Front
- React
- JavaScript
- TypeScript
- Technical stack
---

# Front End Learning Notes

<!-- more -->

### Vue 和 React的区别

考点在于React的 虚拟Dom

## Hooks

## what is hook?

常用hook

useState

useEffect

useContext

useReducer

useCallback

useMemo

useRef

useLayoutEffect

useImperativeHandle

useDebugValue

## 自定义hook，并使用

### What is SSR

### 如何防范SSR



# 快速上手React的Demo

**用脚手架 快速初始化**

```
npx craete-react-app my-react-app
```

```
cd my-react-app
```



**启动项目**

```
npm start
```

明确项目分布情况

源代码 src 目录

静态页面资源 public

**关键文件**

src下面的，

index 项目入口文件

该文件两个重要引入 React 和 ReactDOM

主要是通过 ReactDOM.createRoot方法 创建实例

通过render进行渲染



根组件 APP.js

react的组件就是函数组件形式(也有类组件，但是不推荐)

JSX 只能返回一个元素



**变量插入值不是双引号内,而是{}内**

```
function App() {

  const divContent = "content"
  const divTitle = "title"
  
  return (
      <div title ={divTitle}>{divContent}</div>
  );
}
export default App;
```

**条件插入**

```
function App() {
  
  const divTitle = "title"
  const flag = true;
  let divContent = null

  if (flag) {
    divContent = <p>flag为true</p>
  } else {
    divContent = <span>flag为false</span>
  }
  return (
      <div title ={divTitle}>
        {divContent}
      </div>
  );
}
export default App;
```

**遍历 list.map**

```

function App() {

  const list = [
    { id: 1, name:'x1'},
    { id: 2, name:'x2'},
    { id: 3, name:'x3'}
  ]
  const listContent = list.map(item => (
    <li key={item.id}>{item.name}</li>
  ))

  return (
      <div >{listContent}
      </div>
  );
}
export default App;
```

**Fragment 每次增加其他行**

```
import { Fragment } from "react";

function App() {

  const list = [
    { id: 1, name:'x1'},
    { id: 2, name:'x2'},
    { id: 3, name:'x3'}
  ]
  

  const listContent = list.map(item => (
    <Fragment>
    <li key={item.id}>{item.name}</li>
    <li>----------------</li>
    </Fragment>
  ))

  return (
      <div >{listContent}
      </div>
  );
}

export default App;
```

**事件操作 和 setContent**

```
import { useState } from "react";

function App() {

  let divContent = "Default Content"
  
  function handle(e) {
    console.log("press the button: ", e)
    setData("new Content")
  }

  const [data, setData] = useState("Default content")

  return (
    <>
      <div>{data}</div>
      <button onClick={handle}>button</button>    
    </>
    );
}

export default App;
```

**...data**

```
import { useState } from "react";

function App() {

  let divContent = "Default Content"
  
  function handle(e) {
    setData({
      ...data,
      content: "new content"
    })
  }

  const [data, setData] = useState({
    title: "default title",
    content: "default content"
  })

  return (
    <>
      <div title={data.title}>{data.content}</div>
      <button onClick={handle}>button</button>    
    </>
    );
}

export default App;
```

**增加元素**

```
import { useState } from "react";

function App() {

  let divContent = "Default Content"
  
  const [data, setData]  = useState([
    { id: 1, name:'x1'},
    { id: 2, name:'x2'},
    { id: 3, name:'x3'}
  ])
  
  const listData = data.map(item => (
    <li key={item.id}>{item.name}</li>
  ))

  let id = 3;

  function handle() {
    setData([
      {id: ++id, name: "cat"}, // 前面加
      ...data,
      // {id: ++id, name: "cat"} 后面加
    ])
  }

  return (
    <>
    <ul>{listData}</ul>
      <button onClick={handle}>button</button>    
    </>
    );
}

export default App;
```

**过滤功能filter**

```
import { useState } from "react";

function App() {

  let divContent = "Default Content"
  
  const [data, setData]  = useState([
    { id: 1, name:'x1'},
    { id: 2, name:'x2'},
    { id: 3, name:'x3'}
  ])
  
  const listData = data.map(item => (
    <li key={item.id}>{item.name}</li>
  ))


  function handle() {
      setData(data.filter(item => item.id != 2))
  }

  return (
    <>
    <ul>{listData}</ul>
      <button onClick={handle}>button</button>    
    </>
    );
}

export default App;
```

自定义图片格式

```
import { useState } from "react";
import image from './logo.svg'
function App() {

  // const imageStyle = {
  //   width: 100,
  //   height: 100,
  //   backgroundColor: "grey"
  // }

  const imgData = {
    className: "small",
    style : {
      width: 100,
      height: 100,
      backgroundColor: "grey"
    }
  }

  return (
    <div>
      <img
        src={image}
        alt=""
        {...imgData}
      >
      </img>
    </div>
    );
}

export default App;
```

**传入参数式生成多个对象**

请求功能所需的数据（例如文章信息） 创建 Article 组件进行遍历
将文章的数据分别传递给 Article

```
function Article(props) {
  return (<div>
    <h2> {props.title}</h2>
    <p>{props.content}</p>
  </div>)
}

function App() {

  return (
    <>
        <Article
          title="title1"
          content="content1"
        />
        <Article
          title="title2"
          content="content2"
        />
        <Article
          title="title3"
          content="content3"
        />
        <Article
          title="title4"
          content="content4"
        />
    </>
    );
}

export default App
```

解构方式，简化上述写法 + 层嵌套

```

function Detail({content, active}){
  return (
    <>
      <p>{content}</p>
      <p>state: {active ? "showing" : "hidden"}</p>
    </>
  )
}
function Article({title, articleData}) {
  return (<div>
    <h2> {title}</h2>
    <Detail {...articleData}/>
  </div>)
}
function App() {
  const articleData = {
    title: "title1",
    detailData: {
      content: "content1",
      active: true
    }
  }
  return (
    <>
        <Article {...articleData}/>
    </>
    );
}
export default App;

```

父组件向子组件进行数据传递

注意 传递过去的数据都是 仅可读的，不可以修改

```

function List({ title, children, footer = <div>default bottom</div> }){
  return (
      <>
        <h2>{title}</h2>
        <ul>{children}</ul> 
        {footer}     
      </>
    )
}

function App() {
  return (
    <>
       <List
          title="list1"
          footer={<p>This the bottom content</p>}
       >
          <li>list item1</li>
          <li>list item2</li>
          <li>list item3</li>
       </List>
       <List
          title="list2"
       >
          <li>list itemA</li>
          <li>list itemB</li>
          <li>list itemC</li>
       </List>
    </>
    );
}
export default App;
```

**子组件向父组件传递**

涉及到 回调函数

```
import { useState } from "react";

function Detail({onActive}) {
  const [status, setStatus] = useState(false)
  
  function handle(){
    setStatus(!status)
    onActive(status)
  }

  return(
    <div>
      <p style={{
        display: status ? "block" : "none"
      }}>Detail的内容</p>
      <button onClick={handle}> button</button>
    </div>
  )
}

function App() {

  function handleActive (status){
      console.log(status)
  }

  return (
    <>
        <Detail
          onActive={handleActive}
        />
    </>
    );
}
export default App;
```

同级组件传值， 借助 父组件进行中转



**多层级组件传播，借助hooks**

# 快速上手 JavaScript

下面是一个点击生成新的内容的快速展示

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .change{
            width: 100px;
            line-height: 100px;
            background-color: red;
            color: white;
            text-align: center;
            transition: all 1s;
        }
    </style>
</head>
<body>
    <div id="box">default content</div>
    <script>
        box.onclick = function (){
            this.innerText = "new Content"
            this.className = "change"
        }
    </script>
</body>
</html>
```

拆为两个文件

```
<body>
    <div id="box">default content</div>
    <script src="quicklearn.js">
    </script>
</body>
```

文件名为 quicklearn.js

```
    <script>
        box.onclick = function (){
            this.innerText = "new Content"
            this.className = "change"
        }
    </script>
```



![image-20231116232522368](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/React-Learning-Notes.assets/image-20231116232522368.png)



**基本语法**

```
// name
var num = 10
var myAge = 18
var num1 = 20
var num2 = 30
// var myFriend 
```

```
// data type
var myNum = 10 //number
var myStr = 'text' // string
var myBool = true // boolean
var myNull = null // Clear variable content
var myUn // undefined, the default value
```



```
// operator
var sum = 1 - 2 * 3 / 4

var resStr = "hello" + "javaScript"

var isTrue = 21 > 3

// compare two items
console.log(2 === 2)
```

```
// statement
if (2 > 3) {
    console.log("i will execute")
} else if (false) {
    console.log("i won't execute")
} else {
    console.log("rest")
}

var sum = 0;
for (var i = 0; i < 10; i++) {
    sum += i
    console.log(i)
}
console.log(sum)


function getSum(start, end){
    var sum = 0;
    for (var i = start; i <= end; i++) {
        sum += i
    }
    return sum
}
var res2 = getSum(100, 200)
console.log(res2)



//Nested functions
function getSum2(start, end, fn){
    var sum = 0;
    for (var i = start; i <= end; i++) {
        if(fn(i)) sum += i
    }
    return sum
}

var res3 = getSum2(1, 100, function  (n) {
    if (n % 2 === 0) {
        return true
    } 
    return false
})
```



```
// array
var myArr = [10,20,30,40,50]
console.log(myArr.length)
console.log(myArr[0])
console.log(myArr[1])
console.log(myArr)

// add element from end
myArr.push(100)
// from start
myArr.unshift(200)
console.log(myArr)

// for each
myArr.forEach(function (item, index) {
    console.log(item, index)
})
```

```
// Object 
var obj = {
    name: "joe",
    age: 1
}
console.log(obj)
console.log(obj.name)

for (var k in obj) {
    console.log(k, obj[k])
}
```

**DOM 和 BOM**

DOM叫做文档对象模型

BOM叫做浏览器对象模型

**获取id，修改页面内容**

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="block">default content</div>
    <p>default content</p>
    <p>default content</p>
    <p>default content</p>
    <p>default content</p>

    <script>
        var block = document.getElementById('block')
        console.log(block)
        block.textContent="JS set content"

        var contents = document.getElementsByTagName('p')
        console.log(contents)

        // contents[0].textContent = "the firsrt p title"
        var textArr = [
            '震山的虎',
            '敏捷的豹',
            '远见的鹰',
            '善战的狼'
        ]

        for(var i = 0; i < contents.length; i++) {
            // contents[i].textContent = "new Content"
            contents[i].textContent = textArr[i]
        }

        
    </script>
</body>
</html>
```

采用document

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="block">default content</div>
    <div id="container">
    <p>default content</p>
    <p class="item">default content</p>
    <p>default content</p>
    <p>default content</p>
    </div>
    <script>
        var block = document.getElementById('block')

        var contents = document.querySelectorAll('#container p')
        console.log(contents)

        var textArr = [
            '震山的虎',
            '敏捷的豹',
            '远见的鹰',
            '善战的狼'
        ]
        for (var i = 0; i < contents.length; i++) {
            contents[i].textContent = textArr[i]
        }
        
        // 只具备单个item 
        var secondItem = document.querySelector('.item')
        secondItem.textContent = '替罪的羊'

        // 前一个同级别的元素
        secondItem.previousElementSibling.textContent = '划水的鱼'
        // 后一个同级别的元素
        secondItem.nextElementSibling.textContent = '装饭的桶'


        // 父元素
        var container = secondItem.parentElement
        console.log(container)
        // container.textContent = '新内容' // 替换所有的话

        var items = container.children
        console.log(items)
        

    </script>
</body>
</html>
```

![image-20231117173219033](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/React-Learning-Notes.assets/image-20231117173219033.png)



####   

**样式处理**

下面是通过DOM修改block的样式

一共是两种方式

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            margin: 10px;
        }
        div {
            width: 100px;
            height: 100px;
            border: 1px dashed #ccc;
            margin-bottom: 10px;
        }

        
        .changesStyle{
            width: 80px;
            height: 80px;
            background-color: tomato;
        }

    </style>
</head>
<body>
    <div id="block">default content</div>
    <script>
        // 样式处理
        var block = document.querySelector('#block')
        // block.style.width = '80px'
        // block.style.height = '80px'
        // block.style.backgroundColor = 'tomato';// 修正属性名和颜色值
        block.className = 'changesStyle'
    </script>
</body>
</html>
```

文本处理

```
 <head>
 <style>
 .bold-text {
            font-size: 20px;
            font-weight: 700;
        }

</style>
</head>
<body>
    <div id="block">default content</div>
    <script>
        // 样式处理
        var block = document.querySelector('#block')
        // 文本处理
        block.innerHTML = "普通内容<span class='bold-text'>加粗文本</span>"
</script>
```

事件处理

原始方式

```
var block = document.querySelector('#block')
block.onclick = function () {
alert("surprise again")
}
```

新版, 相比原版，可以处理多个 点击事件

```
var block = document.querySelector('#block')
// 事件处理
block.addEventListener('click', function () {
alert('suprise!')
})

block.addEventListener('click', function () {
alert("surprise again!")
})
```







# 网络请求

**什么是网络请求**

网络资源 从服务器 传送到 本地客户端

这样我们就能看到网页的内容了。

这每次一的传输就 是 网路请求。

**网络请求方式**

ajax

第三方工具 和 fetch API(替代ajax)

### ajax

前端发送请求给后端

**get例子**

```
// or ajax

const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://wuyou.com/common/get?name=wuyou&age=18')
xhr.send()

// 根据状态，触发function 改变
xhr.onreadystatechange = function () {
    // response 完成
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText)
        console.log(JSON.parse(xhr.responseText))
    }
}
```



get只能发纯文本数据

post可以发送各种各样的格式的数据

比如 图片, 视频等

要添加 发送给 服务器的数据是什么类型

post发送的参数在 send()中

```
const xhr = new XMLHttpRequest()
xhr.open('POST', 'http://wuyou.com/common/post') 
// url-encoded 格式
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send('name=wuyou&age=18')

// 根据状态，触发function 改变
xhr.onreadystatechange = function () {
    // response 完成
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText)
        console.log(JSON.parse(xhr.responseText))
    }
}
```

### Axios

使用第三方工具包简化 请求

下面以Axios为例子

```
npm install axios
```



```
const { default: axios } = require("axios");


// axios
// axios.get("http://wuyou.com/common/get?name=吴悠&age=18")
(async() => {

    // configure base address
    const ins = axios.create({
        baseURL: "http://wuyou.com/common/"
    })

    // 配置拦截器

    // 请求拦截器
    ins.interceptors.request.use(config => {
        console.log("发送了请求")
        return config
    })

    ins.interceptors.response.use(res => {
        return res
    })

    // 响应拦截器
    const res = ins.get("get", {
        params: {
            name: 'wuyou',
            age: 18
        }
    })

    const res2 = await ins.post("post", {
        name: 'wuyou',
        age: 18
    })
    
    console.log(res1.data)
    console.log(res2.data)
})
```

### Fetch API

**Fetch API**

用来 代替原来的AJAX

```
npm install node-fetch
```

get请求

```

const fetch = require('node-fetch');

fetch("http://wuyou.com/common/get?name=wuyou&age=18")
    .then(res => {
        if (res.ok) {
            return res.json()
        }
    })
    .then(data => {
        console.log(data)
    })
```

POST请求

```

const fetch = require('node-fetch');

fetch("http://wuyou.com/common/post", {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    
    // 将2javascript格式转为JSON
    body: JSON.stringify({
        name: 'wuyou',
        age: 18
    })

})
    .then(res => {
        if (res.ok) {
            return res.json()
        }
    })
    .then(data => {
        console.log(data)
    })
```



# 异步编程

### Promise

将 异步 变为 同步， 返回数据

因为 前端 向 后端 发送请求之后， 需要等待一定时间，如果直接调用，会返回undefine

```

function one(){
    return 'I am One'
}

function two(){
    setTimeout(() => {
        return 'I am Two'
    }, 3000) // 3s后返回
    
}
function three(){
    return 'I am Three'
}

function run() {
    console.log(one())
    console.log(two())
    console.log(three())
}
run()
```



![image-20231117153851937](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/React-Learning-Notes.assets/image-20231117153851937.png)

undefined是因为two函数没return，里面的return是settimeout的回调函数的

```
function one(){
    return 'I am One'
}

function two(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("I am two")
        })
    })
}
function three(){
    return 'I am Three'
}

function run() {
    console.log(one())
    console.log(two())
    console.log(three())
}
run()
```

![image-20231117154546035](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/React-Learning-Notes.assets/image-20231117154546035.png)



添加async 调用 和 await等待

```
function one(){
    return 'I am One'
}

function two(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("I am two")
        })
    })
}
function three(){
    return 'I am Three'
}

async function run() {
    console.log(one())
    console.log(await two()) // 等two() 执行完后，在进行three()
    console.log(three())
}
run()
```

上面是解释Promise基本，下面是Poromise常用基本语法

```
//下面是 js 中 Promise 对象的基本用法
//创建一个 Promise 对象：
const promise = new Promise((resolve, reject) => {
  // 异步操作
  // 如果操作成功，调用 resolve 并传递结果值
  // 如果操作失败，调用 reject 并传递错误信息
});

//使用 Promise 对象的 then() 方法处理操作成功的情况：
promise.then((result) => {
  // 处理操作成功的情况，result 为操作的结果值
});

//使用 Promise 对象的 catch() 方法处理操作失败的情况：
promise.catch((error) => {
  // 处理操作失败的情况，error 为错误信息
});

//可以链式调用 then() 方法，处理多个异步操作的情况：
promise
  .then((result1) => {
    // 处理第一个异步操作的结果
    return result1;
  })
  .then((result2) => {
    // 处理第二个异步操作的结果
    return result2;
  })
  .then((result3) => {
    // 处理第三个异步操作的结果
    return result3;
  })
  .catch((error) => {
    // 处理操作失败的情况
  });
```



## TypeScript

官网： https://www.typescriptlang.org/

类型推断

```
let str = 'abc'
```

类型注解

```
let str: string;
str = 'abc';
```

指定输出参数类型

下面操作必须 自己知道 数组中 必然有元素 > 2的结果

否定 返回 undefined 会报错

```
let numArr = [1,2,5,4]
let res = numArr.find(item => item > 2) as number
console.log(res)
```

`find` 方法接受一个测试函数作为参数，这个测试函数对数组中的每个元素执行一次，直到找到一个使函数返回 `true` 的元素。在这个例子中，测试函数是 `item => item > 2`，意味着 `find` 方法会查找数组中第一个大于 2 的元素。

指定分配类型

```
let v1: string = 'abc'
let v2: number = 10
let v3: boolean = true
let nu: null = null
let un: undefined = undefined

// 分配多个类型
let v4: string | null = null 
let v5: 1 | 2 | 3 = 2
```

```
let arr: number[] = [1 ,2 ,3]
let arr1: Array<String> = ['a', 'b', 'c']
```

```
let t1: [number, string, number] = [1, 'a', 2]
t1[0] = 1
// 指定位置必须为对应类型
```

增加？变为可选值

第三个值设为可选值之后，可以写，可以不写

```
let t1: [number, string, number?] = [1, 'a']
```

枚举类型

```
enum myEnum{
    A,
    B,
    C
}
console.log(myEnum.A) // 0
console.log(myEnum[0]) // A
```

### 函数

```
function myFn(a: number, b: string): number{
    return 100
}
```

? 设置节选

=是必选参数

必选放在最左边

可选放在右边

```
function myFn(a: number, b: string, c?: boolean, ...rest: number[]): number{
    return 100
}

const f = myFn(20, 'abc', true, 1, 2, 3)
```

### 接口

interface

```
interface Obj {
    name: string,
    age: number
}

const obj: Obj = {
    name: 'a',
    age: 10
}

const obj2: Obj = {
    name: 'b',
    age: 11
}
```

### type使用

```
type MyUserName = string | number
let a: MyUserName = 10
let b: MyUserName = "azz"
```

### 泛型

```
function myFn<T>(a: T, b: T): T[] {
    return [a, b]
}

myFn<number>(1 ,2)
myFn<String>("a", "b")

```



**谁无暴风劲雨时，守得云开见月明。**

