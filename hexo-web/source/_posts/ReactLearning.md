---
title: React Learning Notes
date: 2023-11-23 20:49:45
categories:
- Technical stack
tags: 
- React
---

# React

Hello everyone, This is what I use to document the difficulties I encountered during the React development and the corresponding solutions.

<!-- more -->

## 时间问题

我使用new Date() 获取当前时间的过程中，发现使用new Date获取的时间和我本地的时间不一致的情况。

解决方法：

使用第三方库 moment.js

安装

```
npm install moment
# 或者
yarn add moment
```

导入和使用

```
import moment from 'moment';
```



默认格式为'2023-03-28'

```
// 获取当前时间
const now = moment();
console.log(now.format()); // 默认格式化为 ISO 日期时间
```

包含时分秒的格式"2022-04-10T01:30"

```
const now = moment();
const formattedNow = now.format('YYYY-MM-DDTHH:mm');
```

## Search Bar 

添加搜索功能，将用户输入处理后，发送给后端



## 向后端发送JSON数据

使用 fetch方法

配置backendurl

```
const backendUrl = `http://localhost:8080/backendAddress`;
```

配置post的 body

```
const dataToSend = {
"key1": xxx,
"key2": xxx,
"key3": "xxx"
};
```

Fetch 使用post发送

```
const response = await fetch(backendUrl, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(dataToSend) // 把发送的string转为json格式
});
```

接受来自后端的数据

```
if (response.ok) {
const backendData = await response.json();
console.log('Received backendData:', backendData);

} else {
console.error('Server responded with a non-200 status code');
}
```

Eg: 下面是个实际例子

发送数据给后端

```
  const handleSearch = async () => {
    setFiltered(false)

    const tickets = [searchTerm.toUpperCase()];

    const now = moment();
    const timeFrom = now.format('YYYY-MM-DDTHH:mm');
    
    const dataToSend = {
      "tickets": tickets,
      "time_from": timeFrom,
      "limit": "50"
    };

    console.log("dataToSend")
    console.log(dataToSend)

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {

        const backendData = await response.json();

        if (backendData == null) onSearchResults(null);
        
        console.log('Received backendData:', backendData);

        
        onSearchResults(backendData); 

      } else {
        console.error('Server responded with a non-200 status code');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
}
```

## const 和 let区别

let声明 是在{} 块级作用域

const声明 也是  块级作用域

区别

let可以对变量重新赋值

const不允许重新赋值，一旦被声明，不能改变值(变量指向的内存地址不能改变)

- `const` 声明的变量必须在声明时初始化，即必须在声明时赋予一个值。
- `let` 声明的变量可以在声明时不赋值。



## 根据tap选项的不同 基于当前时间点 生成 上个礼拜 上个星期 上个月



下面是sort的选项

```react
<select value={timeFrame} onChange={e => { setTimeFrame(e.target.value);  }}>
<option value="">Time Frame</option>
<option value="today">Last Day</option>
<option value="week">Last Week</option>
<option value="month">Last Month</option>
</select>
```

下面是生成对应的时间点

```react
    const now = moment();
    let timeFrom = now.format('YYYY-MM-DDTHH:mm');
    
    const yesterday = now.clone().subtract(1, 'days').format('YYYY-MM-DDTHH:mm');
    const lastWeek = now.clone().subtract(1, 'weeks').format('YYYY-MM-DDTHH:mm');
    const lastMonth = now.clone().subtract(1, 'months').format('YYYY-MM-DDTHH:mm');

    const timeFrameChecks = {
      'today': () => timeFrom = yesterday,
      'week': () => timeFrom = lastWeek,
      'month': () => timeFrom = lastMonth
    };

  if (timeFrame in timeFrameChecks) {
    timeFrameChecks[timeFrame]();
  }
```

### 根据后端传入内容，动态生成每一列

```react
                   <div style={containerStyle}>
                                        <p style={pStyle}> Assess and choose a diversified portfolio of financial products that match your risk tolerance and investment goals. Options for fund allocation include:</p>
                                        <ul style={ulStyle}>
                                            {investmentDescriptions.map((desc, index) => (
                                                <li key={index}>{desc}</li>
                                            ))}
                                        </ul>
                                    </div>
```

```react
      const investmentDescriptions = backendData && backendData['data']
      ? Object.entries(backendData['data']).map(([key, value]) => {
          const description = getDescriptionForKey(key);
          return `${value}% in ${description}`;
      })
      : [];
```

```react
    const getDescriptionForKey = (key) => {
        switch (key) {
          case "Exchange-traded funds (ETFs)":
            return "growth-focused ETFs";
          case "Stocks":
            return "dividend stocks";
          case "Treasury bills (T-bills)":
            return "short-term safety with Treasury bills";
          case "Cash":
            return "cash for emergencies";
          
          default:
            return key.toLowerCase();
        }
      };
```



获取后端backendData数据，存在data这里

然后将其中的 key 对应为 description, 根据key不同选择不用的值作为 desciption

返回一个 value in description的格式

```react
{investmentDescriptions.map((desc, index) =>(<li key={index}>{desc}</li>))}                                 
```

在页面html格式出就为

调用 investmentDescriptions.map 传入desc 和 index，生成 string 然后作为一个li

![image-20231202181117408](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/ReactLearning.assets/image-20231202181117408.png)
