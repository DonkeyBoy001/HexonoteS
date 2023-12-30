---
title: Data Progressing
date: 2023-10-26 18:08:17
categories:
- Technical stack
- Python
tags: 
- Domain
- Python
- Technical stack
---

# Data Progressing

## Introduction

This is the note related to prepare data progresssing interview.

there are many common used technical stacks notes below.

<!-- more -->

## Framework

### Data operation

Data viewing

Data Merge

Data Operations and Statistics

Data filtering and filtering

Data sorting

### Data visualization

Basic drawing methods

Line diagram:

The default 'df. plot()' is used to display the value changes after sorting by a certain column。

Bar Chart：

Draw a vertical or horizontal bar chart using 'kind='bar' or 'kind='barh'.

Histogram:

​	Draw a histogram of a column using 'df ['column']. plot (kind='hist ')'.

Pie chart:

​	For 'Series', you can use' s. plot (kind='pie ')' to draw a pie chart.

Box diagram:

​	Use 'df. plot (kind='box') 'to display numerical distribution and outliers.

Additional features:

Using 'secondary'_ Draw a chart with two y-axes using the 'y' parameter.

## Data Operation

### Basic operation:

#### Read CSV file

pd.read_csv(filepath)

Eg: 

```python
path = "/Users/zhouzhenzhou/Desktop/data/phone_data.csv"
```

```
df = pd.read_csv(path)
```

#### DataFrame

Create a DataFrame and specify the number of rows

```python
df2 = pd.DataFrame([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],columns=['col1', 'col2', 'col3', 'col4'])
```

Dictionary creation

```
data = {
    'Name': ['John', 'Doe', 'Anna'],
    'Age': [25, 28, 22]
}

```

```
df = pd.DataFrame(data)
```



Specify the columns title for data reading

```
df = pd.read_csv(path, header=1)
```

| index | date |       duration |   item | month | network | network_type |        |
| ----: | ---: | -------------: | -----: | ----: | ------: | -----------: | ------ |
|     0 |    0 | 15/10/14 06:58 | 34.429 |  data | 2014-11 |         data | data   |
|     1 |    1 | 15/10/14 06:58 | 13.000 |  call | 2014-11 |     Vodafone | mobile |
|     2 |    2 | 15/10/14 14:46 | 23.000 |  call | 2014-11 |       Meteor | mobile |
|     3 |    3 | 15/10/14 14:48 |  4.000 |  call | 2014-11 |        Tesco | mobile |
|     4 |    4 | 15/10/14 17:27 |  4.000 |  call | 2014-11 |        Tesco | mobile |
|   ... |  ... |            ... |    ... |   ... |     ... |          ... | ...    |
|   825 |  825 | 13/03/15 00:38 |  1.000 |   sms | 2015-03 |        world | world  |
|   826 |  826 | 13/03/15 00:39 |  1.000 |   sms | 2015-03 |     Vodafone | mobile |
|   827 |  827 | 13/03/15 06:58 | 34.429 |  data | 2015-03 |         data | data   |
|   828 |  828 | 14/03/15 00:13 |  1.000 |   sms | 2015-03 |        world | world  |
|   829 |  829 | 14/03/15 00:16 |  1.000 |   sms | 2015-03 |        world | world  |

Get  the elements of specified colomns

You can call df ['date '] to directly obtain the corresponding number of columns



If not specified, the original data will be

```
df = pd.read_csv(path)
```

Note that when reading in this way, there is only one column named phone_ Data

|       |                |          |      | phone_data |          |              |
| ----: | -------------: | -------: | ---: | ---------: | -------: | ------------ |
| index |           date | duration | item |      month |  network | network_type |
|     0 | 15/10/14 06:58 |   34.429 | data |    2014-11 |     data | data         |
|     1 | 15/10/14 06:58 |       13 | call |    2014-11 | Vodafone | mobile       |
|     2 | 15/10/14 14:46 |       23 | call |    2014-11 |   Meteor | mobile       |
|     3 | 15/10/14 14:48 |        4 | call |    2014-11 |    Tesco | mobile       |
|   ... |            ... |      ... |  ... |        ... |      ... | ...          |
|   825 | 13/03/15 00:38 |        1 |  sms |    2015-03 |    world | world        |
|   826 | 13/03/15 00:39 |        1 |  sms |    2015-03 | Vodafone | mobile       |
|   827 | 13/03/15 06:58 |   34.429 | data |    2015-03 |     data | data         |
|   828 | 14/03/15 00:13 |        1 |  sms |    2015-03 |    world | world        |
|   829 | 14/03/15 00:16 |        1 |  sms |    2015-03 |    world | world        |

831 rows × 1 columns

Cannot call 'date' to get the corresponding columns

```
df['date']
```



####  Export CSV

Write dataframe into CSV and output ：df.to_csv(filepath, index=False)

```
df.to_csv('/path/to/my_folder/my_data.csv', index=False)
```

Eg: 

```
df2.to_csv('Desktop/output2.csv', index=False)
```



combine with os

```
import os

output_directory = "/path/to/my_folder"
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

df.to_csv(os.path.join(output_directory, 'my_data.csv'), index=False)
```



### Data Viewing

#### View the first few lines

```
df = pd.DataFrame(xxxx) or df = pd.read_scv(path)
df.head()
```

| index | date |       duration |   item | month | network | network_type |        |
| ----: | ---: | -------------: | -----: | ----: | ------: | -----------: | ------ |
|     0 |    0 | 15/10/14 06:58 | 34.429 |  data | 2014-11 |         data | data   |
|     1 |    1 | 15/10/14 06:58 | 13.000 |  call | 2014-11 |     Vodafone | mobile |
|     2 |    2 | 15/10/14 14:46 | 23.000 |  call | 2014-11 |       Meteor | mobile |
|     3 |    3 | 15/10/14 14:48 |  4.000 |  call | 2014-11 |        Tesco | mobile |
|     4 |    4 | 15/10/14 17:27 |  4.000 |  call | 2014-11 |        Tesco | mobile |

#### View Statistics

```
df.describe()
```

![image-20231026215202225](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/dataprocessing.assets/image-20231026215202225.png)

#### View basic information

```
df.info()
```



```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 830 entries, 0 to 829
Data columns (total 7 columns):
 #   Column        Non-Null Count  Dtype  
---  ------        --------------  -----  
 0   index         830 non-null    int64  
 1   date          798 non-null    object 
 2   duration      794 non-null    float64
 3   item          806 non-null    object 
 4   month         800 non-null    object 
 5   network       773 non-null    object 
 6   network_type  799 non-null    object 
dtypes: float64(1), int64(1), object(5)
memory usage: 45.5+ KB
```

#### Check the Missing Values

```python
df.isnull()
```

| index |  date | duration |  item | month | network | network_type |       |
| ----: | ----: | -------: | ----: | ----: | ------: | -----------: | ----- |
|     0 | False |    False | False | False |   False |        False | False |
|     1 | False |    False | False | False |   False |        False | False |
|     2 | False |    False | False | False |   False |        False | False |
|     3 | False |    False | False | False |   False |        False | False |
|     4 | False |    False | False | False |   False |        False | False |
|   ... |   ... |      ... |   ... |   ... |     ... |          ... | ...   |
|   825 | False |    False | False | False |   False |        False | False |
|   826 | False |    False | False | False |   False |        False | False |
|   827 | False |    False | False | False |   False |        False | False |
|   828 | False |    False | False | False |   False |        False | False |
|   829 | False |    False | False | False |   False |        False | False |

830 rows × 7 columns

```
df.isnull().sum()
```

```
index            0
date            32
duration        36
item            24
month           30
network         57
network_type    31
dtype: int64
```

#### View how many unique values each column has

```
df.nunique()
```

```
index           830
date            721
duration        205
item              3
month             6
network          10
network_type      7
dtype: int64
```

Eg:

Select the column and call unque()

```
df2['item'].unique()
```

```
array(['data', 'call', 'sms', nan], dtype=object)
```

打印出所有的

```
for c in columnsChecks:
    print(f"{c} : {df2[c].unique()}")
```

```
item : ['data' 'call' 'sms' nan]
network : ['data' 'Vodafone' 'Meteor' 'Tesco' nan 'Three' 'voicemail' 'landline'
 'special' 'world' 'hree']
network_type : ['data' 'mobile' 'voicemail' 'landline' 'special' 'world' nan 'dat']
```

#### Data Filter

```
df[df['Column Name'] compare condition] 
```

Eg:

```
df2[df2['duration'] > 10]
```

| index | date |       duration |    item | month | network | network_type |        |
| ----: | ---: | -------------: | ------: | ----: | ------: | -----------: | ------ |
|     0 |    0 | 15/10/14 06:58 |  34.429 |  data | 2014-11 |         data | data   |
|     1 |    1 | 15/10/14 06:58 |  13.000 |  call | 2014-11 |     Vodafone | mobile |
|     2 |    2 | 15/10/14 14:46 |  23.000 |  call | 2014-11 |       Meteor | mobile |
|     6 |    6 | 16/10/14 06:58 |  34.429 |  data | 2014-11 |          NaN | data   |
|     7 |    7 | 16/10/14 15:01 | 602.000 |  call | 2014-11 |        Three | mobile |
|   ... |  ... |            ... |     ... |   ... |     ... |          ... | ...    |
|   821 |  821 |  9/3/2015 6:58 |  34.429 |   NaN |     NaN |          NaN | NaN    |
|   822 |  822 | 10/3/2015 6:58 |  34.429 |   NaN |     NaN |          NaN | NaN    |
|   823 |  823 | 11/3/2015 6:58 |  34.429 |   NaN |     NaN |          NaN | NaN    |
|   824 |  824 | 12/3/2015 6:58 |  34.429 |  data | 2015-03 |         data | data   |
|   827 |  827 | 13/03/15 06:58 |  34.429 |  data | 2015-03 |         data | data   |

420 rows × 7 columns

#### View the specified number of rows

```
df.iloc[row]
```

Eg:

View First Line

```
df2.iloc[0]
```



View Last Line

```
df2.iloc[-1]
```

#### View row n and column m

```
df[row, col]
```



Eg: View second row, second column

```
df2.iloc[1,1]
```



### Data Selection

#### Select Column

##### single column

```
df[column_name]
```

Eg:

```
df2['index']
```

##### Multicolumns

```
df[['col1','col2']]
```

Eg:

```
df2[['date', 'item']]
```

| date |           item |      |
| ---: | -------------: | ---- |
|    0 | 15/10/14 06:58 | data |
|    1 | 15/10/14 06:58 | call |
|    2 | 15/10/14 14:46 | call |
|    3 | 15/10/14 14:48 | call |
|    4 | 15/10/14 17:27 | call |
|  ... |            ... | ...  |
|  825 | 13/03/15 00:38 | sms  |
|  826 | 13/03/15 00:39 | sms  |
|  827 | 13/03/15 06:58 | data |
|  828 | 14/03/15 00:13 | sms  |
|  829 | 14/03/15 00:16 | sms  |

830 rows × 2 columns

#### Using. loc and. loc to select columns and rows

##### .iloc[xx]

Selecting based on integer index position

Left Closed Right Open

Select the third row, with index starting from 0

```
row_3 = df.iloc[2]  # 选择第三行，索引从0开始
```

Select the second to fourth rows, excluding the fifth row (index starts from 0)

```
rows_2_to_4 = df.iloc[1:4]  # 选择第二行到第四行，不包括第五行（索引从0开始）
```

Select values for the third and fourth columns (index starting from 0)

```
cell_value = df.iloc[2, 3]  # 选择第三行、第四列的值（索引从0开始）
```

Select the second to fourth columns, excluding the fifth column (index starts from 0)

```
selected_columns = df.iloc[:, 1:4]  # 选择第二列到第四列，不包括第五列（索引从0开始）
```

##### .iloc['col1']

Eg:

The data in the duration column

```
df2.loc[:, 'duration']
```

Specific duration data to the first line

```
df2.loc[0, 'duration']
```

```
34.429
```

### Data Cleaning

#### Detect missing values

```
df.isnull()` 或 `df.notnull()
```

Eg:

```
df2.isnull()
```

| index |  date | duration |  item | month | network | network_type |       |
| ----: | ----: | -------: | ----: | ----: | ------: | -----------: | ----- |
|     0 | False |    False | False | False |   False |        False | False |
|     1 | False |    False | False | False |   False |        False | False |
|     2 | False |    False | False | False |   False |        False | False |
|     3 | False |    False | False | False |   False |        False | False |
|     4 | False |    False | False | False |   False |        False | False |
|   ... |   ... |      ... |   ... |   ... |     ... |          ... | ...   |
|   825 | False |    False | False | False |   False |        False | False |
|   826 | False |    False | False | False |   False |        False | False |
|   827 | False |    False | False | False |   False |        False | False |
|   828 | False |    False | False | False |   False |        False | False |
|   829 | False |    False | False | False |   False |        False | False |

830 rows × 7 columns

```
df2.isnull().sum()
```

```
index            0
date            32
duration        36
item            24
month           30
network         57
network_type    31
dtype: int64
```

```
df2.notnull().sum()
```

```
index           830
date            798
duration        794
item            806
month           800
network         773
network_type    799
dtype: int64
```

#### Fill in missing values

```
df.fillna(value)
```

Filling method

1. Use specific values

   ```
   df.fillna(0)
   ```

   

2. Using column mean

   Only suitable for numbers

```
df.fillna(df.mean())
```



Eg:

```
meanDur = df2['duration'].mean()
```

```
116.44196221662472
```

```
df2['duration'].fillna(meanDur, inplace=True)
```

```
df2['duration'].isnull().sum()
```

```
0
```

2. Use previous value

```
df.fillna(method='ffill')
```

```
df_filled = df.fillna(method='ffill')  # 使用前一个非缺失值填充缺失值
```

3. Use the last value

```
df_filled = df.fillna(method='bfill')  # 使用后一个非缺失值填充缺失值
```

4. Specify specific filling values for specific columns

```
values = {'date': '23/01/01 00:00:00', 'item': data}
```

```
df.fillna(value = values)
```

| index | date |       duration |   item | month | network | network_type |        |
| ----: | ---: | -------------: | -----: | ----: | ------: | -----------: | ------ |
|     0 |    0 | 15/10/14 06:58 | 34.429 |  data | 2014-11 |         data | data   |
|     1 |    1 | 15/10/14 06:58 | 13.000 |  call | 2014-11 |     Vodafone | mobile |
|     2 |    2 | 15/10/14 14:46 | 23.000 |  call | 2014-11 |       Meteor | mobile |
|     3 |    3 | 15/10/14 14:48 |  4.000 |  call | 2014-11 |        Tesco | mobile |
|     4 |    4 | 15/10/14 17:27 |  4.000 |  call | 2014-11 |        Tesco | mobile |
|   ... |  ... |            ... |    ... |   ... |     ... |          ... | ...    |
|   825 |  825 | 13/03/15 00:38 |  1.000 |   sms | 2015-03 |        world | world  |
|   826 |  826 | 13/03/15 00:39 |  1.000 |   sms | 2015-03 |     Vodafone | mobile |
|   827 |  827 | 13/03/15 06:58 | 34.429 |  data | 2015-03 |         data | data   |
|   828 |  828 | 14/03/15 00:13 |  1.000 |   sms | 2015-03 |        world | world  |
|   829 |  829 | 14/03/15 00:16 |  1.000 |   sms | 2015-03 |        world | world  |

830 rows × 7 columns



#### Delete rows Containing Missing Values

````
df.dropna()
````

Eg:

```
df2.isnull().sum()
```

```
index            0
date            32
duration         0
item            24
month           30
network         57
network_type    31
dtype: int64
```

```
df3 = df2.dropna()
```

```
df3.isnull().sum()
```

```
index           0
date            0
duration        0
item            0
month           0
network         0
network_type    0
dtype: int64
```

### Data deformation

##### Using pivot, melt, stack, unstack to reshape data 

##### pivot

Reshape data based on column values, changing data from "long format" to "wide format"

Eg:

```
df = pd.DataFrame({
    'date': ['2021-01-01', '2021-01-01', '2021-01-02', '2021-01-02'],
    'variable': ['A', 'B', 'A', 'B'],
    'value': [1, 2, 3, 4]
})
```

|      |       date | variable | value |
| ---: | ---------: | -------: | ----: |
|    0 | 2021-01-01 |        A |     1 |
|    1 | 2021-01-01 |        B |     2 |
|    2 | 2021-01-02 |        A |     3 |
|    3 | 2021-01-02 |        B |     4 |

```
df.pivot(index='date', columns='variable', values='value')
```

|   variable |    A |    B |
| ---------: | ---: | ---: |
|       date |      |      |
| 2021-01-01 |    1 |    2 |
| 2021-01-02 |    3 |    4 |

##### Using 'groupby' for data grouping and aggregation

```
import pandas as pd

data = {
    'Product': ['Apple', 'Banana', 'Apple', 'Banana', 'Cherry', 'Apple'],
    'Sales': [10, 20, 15, 25, 30, 10]
}

df = pd.DataFrame(data)
```



| Product |  Sales |      |
| ------: | -----: | ---- |
|       0 |  Apple | 10   |
|       1 | Banana | 20   |
|       2 |  Apple | 15   |
|       3 | Banana | 25   |
|       4 | Cherry | 30   |
|       5 |  Apple | 10   |

```
df.groupby('Product').sum()
```

|         | Sales |
| ------: | ----: |
| Product |       |
|   Apple |    35 |
|  Banana |    45 |
|  Cherry |    30 |



Data merger

​	数据拼接 pd.concat([df1, df2], axis=0)

​	数据合并 pd.merge(df1, df2, on="key")

时间序列数据

​	将字符串转化为时间格式：`pd.to_datetime()`

​	时间序列数据的索引和选择

​	`resample`方法进行重新采样

数据运算与统计

​	- 使用`apply`和`applymap`对数据应用函数

​	- 使用`agg`进行统计运算

数据筛选与过滤

- 使用条件选择数据：`df[df["column"] > value]`
- 使用`query`方法进行筛选

数据排序

- 按列值排序：`df.sort_values(by="column_name")`

```
DataFrame.sort_values(by, axis=0, ascending=True, inplace=False, 
kind='quicksort', na_position='last', ignore_index=False, key=None)
```

Eg:

```
df2.sort_values(by=['index','date', 'duration'],ascending=[True,True, False])
```

数据类型转换

通常是string 转 float 或者 interger

```
df['column_name'] = df['column_name'].astype(float)
```

如果包含非数字的字符串

```
df['column_name'] = pd.to_numeric(df['column_name'], errors='coerce')
```

Eg:

```
df2['duration'] = df2['duration'].astype(float)
```

```
type(df2['duration'][0])
```

```
numpy.float64
```

#### 按索引排序

```
df.sort_index()
```

### Data Visualization

```
import matplotlib.pyplot as plt
```



### Basic drawing methods

​	plot()

```
df = pd.DataFrame({
    'x': [1, 2, 3, 4, 5],
    'y': [1, 4, 9, 16, 25]
})
df.plot(kind='line', x='x', y='y')
plt.show()
```

![img](data:image/png;base64,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YbjP/HlN+fj2tNLvP6ZNm2YYhmFMmzbNuPjii3/wnpSUFMPf39/o1auXsXjxYpfnbou2jvGJJ54wevfubQQGBhpRUVHGmDFjjE8++cSc8K1wqrEBJ83LxRdf3DLeb73++utGv379DH9/f2PQoEHGe++959rgrdSe8d1+++1Gt27dDH9/fyMmJsa4/PLLjezsbNeHb4WZM2ca3bt3N/z9/Y2uXbsal1xyScuXsmF49tx9q61j9KT5O53vfzl7wzx+19nG52lzeM011xhxcXGGv7+/kZCQYFxzzTVGXl5ey+vuMn8WwzAM525bEREREfmfDnvMh4iIiJhD5UNERERcSuVDREREXErlQ0RERFxK5UNERERcSuVDREREXErlQ0RERFxK5UNERERcSuVDREREXErlQ0RERFxK5UNERERcSuVDRJzu8OHDxMbG8thjj7UsW79+Pf7+/j+4nbeIeD/dWE5EXOL9998nIyOD9evXk5ycTEpKCpMmTeLJJ580O5qIuJjKh4i4zKxZs/j4449JS0sjJyeHzZs3ExAQYHYsEXExlQ8RcZm6ujoGDx5MQUEBWVlZDBkyxOxIImICHfMhIi6zb98+iouLsdvtfPPNN2bHERGTaMuHiLhEY2MjI0eOJCUlheTkZBYsWEBOTg7R0dFmRxMRF1P5EBGXuPvuu3njjTf46quvCA0N5eKLLyYiIoIVK1aYHU1EXEy7XUTE6dasWcOCBQt46aWXCA8Px8fHh5deeonPPvuMhQsXmh1PRFxMWz5ERETEpbTlQ0RERFxK5UNERERcSuVDREREXErlQ0RERFxK5UNERERcSuVDREREXErlQ0RERFxK5UNERERcSuVDREREXErlQ0RERFxK5UNERERc6v8DQ3L8SuOt4w4AAAAASUVORK5CYII=)



The Kind parameter selections:  line, bar, hist, box, scanner, etc.

```
df.plot(kind='scatter', x='x', y='y')
```

When you encounter a scatter chart, it is scattered and dense, and you can't see the rules.

Adjusting the y-axis display range

```
ax = df2.plot(kind='scatter', x='date', y='duration')
ax.set_ylim([0, 40])  # 设置y轴的范围
```

![img](data:image/png;base64,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MkVEFDqc/0TkK8FicXqCMoTuvfdebN26FW+++SbKy8tty3U6HeLj43HixAls3boV3/jGN5CRkYHDhw9j/fr1yM/PR3V1tU/H0Ov10Ol06O/v57tSIjV1GXGq24iijET+HzhpDuc/kbzUcP+WNYkSnN4yt3r++edxxx13oKWlBd/97nfx+eefw2g0oqCgADfeeCMeeughnztUDYNARETh5WSnAad7Bv1OwgO1HzVSw/1b1gfLveVvBQUFPr/jREREJLdAFWtl0Vd1UMSD5UREROHAU7FWOfZDwcUkioiIKAACVayVRV/Vg0kUERFRAPhSrDWU+6HgYxJFREQUAIEq1sqir+rBJIqIiCgAAlWslUVf1YNJFBERUYAEqlgri76qg6x1okJBDXUmiIgovASqWKuWi76q4f6tmD9ArEahKIKm5UJrRKRMvC55V5wZmL4J1H4oOJhESRCKImgstEZESsPrEpEjPhMlQSiKoLHQGhEpDa9LRI6YRIkUiiJoLLRGRErD6xLReEyiRApFETQWWiMipeF1iWg8JlEihaIIGgutEZHS8LpENJ7kB8sbGhqwc+dOdHR0wGw2O6x75JFH/A5MqaxF0Gobuxze1o4UBMyfnBmQb1GE4hhERGLwukQ0nqQ6UX/84x9xzz33IDMzE7m5uRDsqqoKgoADBw4ENEh/BKPORP/gCNZuOxjUb6iE4hhERGLwukShpIY6UZKSqEmTJuHee+/FAw88EIyYAiqYgxCKImhaLrRGRMrE6xKFQtgmUSkpKairq0NJSUkwYgooNQwCEREROVLD/VvSg+U333wz3n///UDHQkRERKQakh4snzx5Mh5++GHs2bMH06dPR3S042fh69atC0hwREREREol6eO84uJi9zsUBJw8edKvoAJJDW8HEhERkSM13L8lvRPV1NQU6DiIiIiIVMXvYpsWiwUS3swiIiIiUjXJSdSWLVswffp0xMfHIz4+HhUVFfjzn/8cyNiIiIiIFEvSx3mPP/44Hn74YaxZswbz588HAHz88ce4++670dXVhfXr1wc0SCIiIiKlkfxg+aZNm7By5UqH5S+++CJ++tOfKuqZKTU8mEZERESO1HD/lvRxXmtrK+bNmzdu+bx589Da2up3UERERERKJymJmjx5Ml555ZVxy19++WWUlZX5HRQRyetkpwE76zvQ1GWUOxQiIsWS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rr76anR1daG+vh69vb2IiYlBQkICjEYjbrnlFpw9exbDw8O44oorcPPNN4+7by5YsAArVqzweF+96667YLFYYDQacezYMdx+++0BvXeHM9lKHBARERGpGb+dR0RERCQBkygiIiIiCZhEEREREUnAJIqIiIhIAiZRRERERBIwiSIixbrqqqtw3333yR0GEZFLTKKIKCzs2rULgiCgr69P7lCISCOYRBERERFJwCSKiBTBaDRi5cqVSEpKwoQJE/Db3/7WYf2f//xnXHbZZUhOTkZubi5uvfVWdHR0AABOnTpl+7ucaWlpEAQBd9xxBwDAbDajqqoKxcXFiI+Px4wZM/C3v/0tpG0jovDEJIqIFOGHP/whqqur8eabb+L999/Hrl27cODAAdv6kZERPProozh06BDeeOMNnDp1ypYoFRQU4O9//zsAoL6+Hq2trXjyyScBAFVVVdiyZQueffZZHD16FOvXr8d3v/tdVFdXh7yNRBRe+GdfiEh2BoMBGRkZ+Mtf/mL7+189PT3Iz8/HXXfdhd/97nfjttm3bx9mz56NgYEBJCUlYdeuXVi0aBF6e3uRmpoKADCZTEhPT8eHH36IyspK27b/8R//gcHBQWzdujUUzSOiMKWqP0BMROHpxIkTGB4exty5c23L0tPTUV5ebvt9//79+OlPf4pDhw6ht7cXZrMZANDc3IypU6e63G9jYyMGBwfx9a9/3WH58PAwZs6cGYSWEJGWMIkiIsUzGo1YsmQJlixZgr/+9a/IyspCc3MzlixZguHhYbfbGQwGAMA777yDiRMnOqyLjY0NasxEFP6YRBGR7EpLSxEdHY29e/eisLAQANDb24svv/wSV155JY4fP47u7m489thjKCgoAHDh4zx7MTExAICxsTHbsqlTpyI2NhbNzc248sorQ9QaItIKJlFEJLukpCSsWrUKP/zhD5GRkYHs7Gz85Cc/QUTEhe++FBYWIiYmBps3b8bdd9+Nzz//HI8++qjDPiZNmgRBELB9+3Z84xvfQHx8PJKTk3H//fdj/fr1MJvNWLBgAfr7+1FbW4uUlBTcfvvtcjSXiMIEv51HRIrw61//GldccQWWLVuGxYsXY8GCBZg1axYAICsrCy+88AJeffVVTJ06FY899hh+85vfOGw/ceJEbNq0CQ8++CBycnKwZs0aAMCjjz6Khx9+GFVVVZgyZQquu+46vPPOOyguLg55G4kovPDbeUREREQS8J0oIiIiIgmYRBERERFJwCSKiIiISAImUUREREQSMIkiIiIikoBJFBEREZEETKKIiIiIJGASRURERCQBkygiIiIiCZhEEREREUnAJIqIiIhIAiZRRERERBL8f22eNozCMB/vAAAAAElFTkSuQmCC)



Or add a fixed value to the y of all values.

```
df2['adj_duration'] = df2['duration'] + 5000
df2.plot(kind='scatter',x='date', y ='adj_duration')
```

![img](data:image/png;base64,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)

线图：

​	默认的`df.plot()`，用于显示按某一列排序后的值变化。

柱状图/条形图

​	使用`kind='bar'`或`kind='barh'`进行垂直或水平的柱状图绘制。

直方图：

​	用`df['column'].plot(kind='hist')`绘制某一列的直方图。

```
df2['duration'].plot(kind='hist', edgecolor='black', bins=20)
plt.title('Duration Histogram')
plt.xlabel('Duration')
plt.ylabel('Frequency')
plt.show()

```

![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjsAAAHHCAYAAABZbpmkAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguMCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy81sbWrAAAACXBIWXMAAA9hAAAPYQGoP6dpAAA8MElEQVR4nO3de1hVZd7/8c/mKKKAqLAlFckznkosZLSplERFx1OTOqbo2GEMmxR1yp5S0x4xKzMblJpUtKYs57GpLC0UD5OSmWmaGmlpWHLQFBCL8/r94cX+tQNLtxs2rHm/rmtdue91r3t911oGH9e+194WwzAMAQAAmJSbqwsAAACoSYQdAABgaoQdAABgaoQdAABgaoQdAABgaoQdAABgaoQdAABgaoQdAABgaoQdAABgaoQdADVm3rx5slgsri7jitSnWgFcHcIOUMelpKTIYrHYlgYNGigkJEQxMTFatmyZLly44NL6fvzxR82bN0/bt293aR2/ZLFYNHXq1GrXVZ7TTz/99Jr2cfr0ac2bN08HDhy4pnEA1CzCDlBPzJ8/X6+88opWrFihBx98UJI0bdo0devWTQcPHnRZXT/++KOeeOKJasPOY489pp9++qn2i3KAI7WePn1aTzzxBGEHqOM8XF0AgCszaNAg9erVy/Z69uzZSktL05AhQ/SHP/xBR48elY+PzzXvp6ysTBUVFfLy8rrmsTw8POThUT9+zNSnWis581oBZsadHaAe69evnx5//HF9++23evXVV23tt912m2677bYq/SdOnKg2bdrYXp88eVIWi0XPPPOMli5dqrZt28rb21tHjhxRSUmJ5syZo4iICPn7+8vX11e33HKLtm3bZrd98+bNJUlPPPGE7a22efPmSap+HkxZWZkWLFhg21ebNm306KOPqri42K5fmzZtNGTIEH300Ue6+eab1aBBA11//fVau3btNZ616lVXa2pqqvr27auAgAA1atRIHTt21KOPPipJ2r59u2666SZJ0qRJk2zHnpKSYtt+/fr1ioiIkI+Pj5o1a6a7775b33//fZV9r1+/XuHh4WrQoIG6du2qt956y+nX6pdjJCUl6frrr1fDhg01YMAAnTp1SoZhaMGCBWrZsqV8fHw0bNgwnTt3zklnGHCd+vXPGABVjB8/Xo8++qg+/PBD3XvvvQ6NsXr1ahUVFem+++6Tt7e3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FysmJkbLly+3be/u7q6NGzdqypQpioqKkq+vr+Li4jR//nxHDgsAAJiQQ2GnoqLCKTtfuXLlr65v0KCBkpKSlJSUdNk+oaGhev/9951SDwAAMB+nztkBAACoaxy6s5OQkHDFfZcsWeLILgAAAJzCobCzf/9+7d+/X6WlperYsaMk6auvvpK7u7vdVxdYLBbnVAkAAOAgh8LO0KFD1bhxY61Zs0ZNmjSRdOmDBidNmqRbbrlFM2bMcGqRAAAAjnJozs6zzz6rxMREW9CRpCZNmujJJ5+8qqexAAAAappDYaegoEBnzpyp0n7mzBlduHDhmosCAABwFofCzogRIzRp0iRt2LBB3333nb777jv93//9nyZPnqyRI0c6u0YAAACHOTRnJzk5WTNnztSf/vQnlZaWXhrIw0OTJ0/W008/7dQCAQAAroVDYadhw4Zavny5nn76aX399deSpLZt28rX19epxQEAAFyra/pQwaysLGVlZal9+/by9fWVYRjOqgsAAMApHAo7P/zwg/r3768OHTpo8ODBysrKkiRNnjyZx84BAECd4lDYmT59ujw9PZWZmamGDRva2kePHq3Nmzc7rTgAAIBr5dCcnQ8//FAffPCBWrZsadfevn17ffvtt04pDAAAwBkcurNz8eJFuzs6lc6dOydvb+9rLgoAAMBZHAo7t9xyi9auXWt7bbFYVFFRocWLF+v22293WnEAAADXyqG3sRYvXqz+/fvr008/VUlJif72t7/p8OHDOnfunHbt2uXsGgEAABzm0J2drl276quvvlLfvn01bNgwXbx4USNHjtT+/fvVtm1bZ9cIAADgsKu+s1NaWqqBAwcqOTlZ//M//1MTNQEAADjNVd/Z8fT01MGDB2uiFgAAAKdz6G2su+++WytXrnR2LQAAAE7n0ATlsrIyrVq1Slu2bFFERESV78RasmSJU4oDAAC4VlcVdr755hu1adNGX3zxhXr27ClJ+uqrr+z6WCwW51UHAABwja4q7LRv315ZWVnatm2bpEtfD7Fs2TIFBwfXSHEAAADX6qrm7PzyW803bdqkixcvOrUgAAAAZ3JognKlX4YfAACAuuaqwo7FYqkyJ4c5OgAAoC67qjk7hmFo4sSJti/7LCoq0l/+8pcqT2Nt2LDBeRUCAABcg6sKO3FxcXav7777bqcWAwAA4GxXFXZWr15dU3UAAADUiGuaoAwAAFDXEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpEXYAAICpuTTsJCYm6qabblLjxo0VFBSk4cOHKyMjw65PUVGR4uPj1bRpUzVq1EijRo1STk6OXZ/MzEzFxsaqYcOGCgoK0qxZs1RWVlabhwIAAOool4adHTt2KD4+Xh9//LFSU1NVWlqqAQMG6OLFi7Y+06dP17vvvqv169drx44dOn36tEaOHGlbX15ertjYWJWUlGj37t1as2aNUlJSNGfOHFccEgAAqGM8XLnzzZs3271OSUlRUFCQ9u3bp9///vfKz8/XypUr9dprr6lfv36SpNWrV6tz5876+OOP1bt3b3344Yc6cuSItmzZouDgYN1www1asGCBHn74Yc2bN09eXl6uODQAAFBH1Kk5O/n5+ZKkwMBASdK+fftUWlqq6OhoW59OnTqpdevWSk9PlySlp6erW7duCg4OtvWJiYlRQUGBDh8+XO1+iouLVVBQYLcAAABzqjNhp6KiQtOmTVOfPn3UtWtXSVJ2dra8vLwUEBBg1zc4OFjZ2dm2Pj8POpXrK9dVJzExUf7+/ralVatWTj4aAABQV9SZsBMfH68vvvhC69atq/F9zZ49W/n5+bbl1KlTNb5PAADgGi6ds1Np6tSp2rhxo3bu3KmWLVva2q1Wq0pKSpSXl2d3dycnJ0dWq9XW55NPPrEbr/Jprco+v+Tt7S1vb28nHwUAAKiLXHpnxzAMTZ06VW+99ZbS0tIUFhZmtz4iIkKenp7aunWrrS0jI0OZmZmKioqSJEVFRenQoUPKzc219UlNTZWfn5/Cw8Nr50AAAECd5dI7O/Hx8Xrttdf09ttvq3HjxrY5Nv7+/vLx8ZG/v78mT56shIQEBQYGys/PTw8++KCioqLUu3dvSdKAAQMUHh6u8ePHa/HixcrOztZjjz2m+Ph47t4AAADXhp0VK1ZIkm677Ta79tWrV2vixImSpOeee05ubm4aNWqUiouLFRMTo+XLl9v6uru7a+PGjZoyZYqioqLk6+uruLg4zZ8/v7YOAwAA1GEuDTuGYfxmnwYNGigpKUlJSUmX7RMaGqr333/fmaUBAACTqDNPYwEAANQEwg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1wg4AADA1l4adnTt3aujQoQoJCZHFYtG///1vu/WGYWjOnDlq0aKFfHx8FB0drWPHjtn1OXfunMaNGyc/Pz8FBARo8uTJKiwsrMWjAAAAdZlLw87FixfVo0cPJSUlVbt+8eLFWrZsmZKTk7Vnzx75+voqJiZGRUVFtj7jxo3T4cOHlZqaqo0bN2rnzp267777ausQAABAHefhyp0PGjRIgwYNqnadYRhaunSpHnvsMQ0bNkyStHbtWgUHB+vf//63xowZo6NHj2rz5s3au3evevXqJUl64YUXNHjwYD3zzDMKCQmptWMBAAB1U52ds3PixAllZ2crOjra1ubv76/IyEilp6dLktLT0xUQEGALOpIUHR0tNzc37dmz57JjFxcXq6CgwG4BAADmVGfDTnZ2tiQpODjYrj04ONi2Ljs7W0FBQXbrPTw8FBgYaOtTncTERPn7+9uWVq1aObl6AABQV9TZsFOTZs+erfz8fNty6tQpV5cEAABqSJ0NO1arVZKUk5Nj156Tk2NbZ7ValZuba7e+rKxM586ds/Wpjre3t/z8/OwWAABgTnU27ISFhclqtWrr1q22toKCAu3Zs0dRUVGSpKioKOXl5Wnfvn22PmlpaaqoqFBkZGSt1wwAAOoelz6NVVhYqOPHj9tenzhxQgcOHFBgYKBat26tadOm6cknn1T79u0VFhamxx9/XCEhIRo+fLgkqXPnzho4cKDuvfdeJScnq7S0VFOnTtWYMWN4EgsAAEhycdj59NNPdfvtt9teJyQkSJLi4uKU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)

饼图：

​	对于`Series`，可以使用`s.plot(kind='pie')`来绘制饼图。

```
duration_counts = df2['duration'].value_counts()
duration_counts.plot(kind='pie', autopct='%1.1f%%')
plt.ylabel('')
```

`value_counts()`来统计每个唯一值的数量

```
duration
1.000      250
34.429     122
4.000       25
3.000       19
8.000        8
          ... 
21.000       1
114.000      1
81.000       1
174.000      1
768.000      1
Name: count, Length: 196, dtype: int64
```

箱线图/盒须图:

​	使用`df.plot(kind='box')`来展示数值分布和异常值。

额外功能

​	使用`secondary_y`参数绘制具有两个y轴的图表。



### Plotly Graphics Library

Eg:

```
 import plotly

import plotly.graph_objs as go
 
import numpy as np
 
N = 1000
random_x = np.random.randn(N)
random_y = np.random.randn(N)
 
#Create a trace
trace = go.Scatter(x=random_x, y=random_y, mode='markers')

data = [trace]
plotly.offline.plot(data, filename='basic-scatter.html')
```

`The np. random. randn (N) 'function generates an array with a shape of' (N,) ', where the elements come from a standard normal distribution (also known as a Z distribution or Gaussian distribution). A standard normal distribution is a normal distribution with a mean of 0 and a standard deviation of 1.



## Interview Example of Data Processing

Read data

```
df = pd.read_csv(path)
```



Get the specified  columns

```
df[['col1','col2']]
```



Draw a scatter plot for observation

```
import matplotlib.pyplot as plt
```

```
df.plot(kind='scatter', x = 'specified x', y ='specified y')
```



Operation and put the result in new column

```
df['newCol'] = df['old1'] operator df['old2']
```

Export Data

```
pd.to_csv(path, index=False)
```

Draw a normal distribution

what is norma /gaussian distribution?

![image-20231028133753616](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/dataprocessing.assets/image-20231028133753616.png)

**Mean**： The sum of all data points divided by the number of data points.

![image-20231028133733522](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/dataprocessing.assets/image-20231028133733522.png)

**Variance**：  the average square value of the deviation between a data point and its mean

![image-20231028145935990](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/dataprocessing.assets/image-20231028145935990.png)

**Standard Deviation**： The standard deviation is the square root of variance

![image-20231028145923421](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/dataprocessing.assets/image-20231028145923421.png)

These three terms: (Mean, Variance and Standard Deviation)  are used to describe the central trend and degree of dispersion of a set of data

```
mean
std
```

```
x = np.linspace(mean - 3 * std, mean + std, numOfDot)
```

```
plt.plot(x, stats.norm.pdf(x, mean, std))
```

Generate cetain amount of data according to the Normal Describution

```
from scipy import stats
```

```
b=stats.norm.rvs(mean,std,size= the amount of the data)
```

Probability of existence greater than a certain x in statistics

```
import scipy.stats as stats
```

```
mean = 2
std = 3
pro = 1 - stats.norm.cdf(3, loc=mean, scale=std) # Using the Cumulative Distribution Function (CDF)
```

Adding Two Normal Distribution Graphs

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# Define means and standard deviations for two distributions
mu1, sigma1 = 0, 0.1
mu2, sigma2 = 0, 0.2

# Create a range of x values
x = np.linspace(-1, 1, 1000)

# Get the PDF values for each x for the two distributions
pdf1 = norm.pdf(x, mu1, sigma1)
pdf2 = norm.pdf(x, mu2, sigma2)

# The mean and standard deviation of the sum of two normal distributions
mu3 = mu1 + mu2
sigma3 = np.sqrt(sigma1**2 + sigma2**2)
pdf3 = norm.pdf(x, mu3, sigma3)

# Plotting
plt.plot(x, pdf1, label='N(0, 0.1)', color='blue')
plt.plot(x, pdf2, label='N(0, 0.2)', color='green')
plt.plot(x, pdf3, label='Sum', color='red', linestyle='dashed')

plt.legend()
plt.title("Adding Two Normal Distributions")
plt.xlabel("x")
plt.ylabel("Probability Density")
plt.grid(True)
plt.show()

```

![img](data:image/png;base64,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/jznz5+ndu3aREZGsnXrVtO5ly9fpmTJkqnKKF26dIrHly9fBkh1bt68ecmZM2eG4ipYsGCqMRQ5c+bk/v37Ka5TvHjxVOdZYpaXi4sLwcHBpi6onTt30qBBA+rXr49er2fv3r2cPHmSe/fupUhuLl++nOr9gCezrozvTUYUK1aMt99+my+//JKbN2+mev727dvExsamez2DwZBqzEfRokXTvFZa77efnx9BQUGpjgEpPoe4uDjGjh1rGu+RJ08e8ubNy4MHD4iKispYZc306NGjFInE0zp37ky9evXo27cv/v7+dOnShZ9//tmsRCcwMNCswcNPf79rNBpKlChhlbFHyV2+fJkCBQqkej/S+54rVKhQqjKe/tmaMWMGx48fJygoiFq1ajF+/PgUyY94OUhyIxzW33//zc2bN/nxxx8pWbKk6evNN98ESHdgsbWl1boApBogaU3169dn//79xMfHm5KbHDlyUKFCBXbu3GlKfJInN5ZmHHszffp0i5SXvJUlufTe74x8DoMGDWLKlCm8+eab/Pzzz2zevJnQ0FBy585tlSnL165dIyoq6plJrJeXFzt27GDLli28/fbbHD16lM6dO9O8efMUrZHPkt579SLSW2gwozFZQkY+0zfffJOLFy8yf/58ChQowGeffUb58uVTtQIJ5yZTwYXDWrFiBfny5eOLL75I9dyvv/7K2rVrWbx4MV5eXhQuXJhz586lOu/MmTMpHhcuXBiAc+fOpeguuX37dor/Dl9U4cKFOXnyJIqipPijcf78eYuU36BBAxITE1m1ahXXr183JTENGzZk586d+Pv7U6pUKfz9/VPE9PT7AXD69GnT8+YoXrw4b731FkuWLEm1uGLevHnx9vZO93parTZVy4s1rFmzhp49ezJr1izTsfj4eB48eGCV6xnXIgoJCXnmeVqtlqZNm9K0aVM+//xzPv30Uz7++GP++ecfmjVrZvEVjZ/+2VAUhfPnz6dYjydnzpxpvi+XL19O8bNiTmyFCxdmy5YtPHz4MEXrTWa/54zy589P//796d+/P7du3aJatWpMmTKFVq1aZao84Xik5UY4pLi4OH799VdeffVVOnbsmOpr4MCBPHz40DT1uXXr1uzdu5f//vvPVMbt27dTte40a9YMNzc35s+fn+K/wTlz5lg0/pCQEK5fv55ianZ8fDxfffWVRcqv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jYhwNSHc1YzwVgciHA6EOZ1wXroJik4AxYWC2KuoDLHD5HS1PVwumJwCk9MFPQQtTVGAqy22LMKOvSNaoHcBegH0Lmn7VwC9C2hpiQAa29aRTd+Is5ZmKPL9WlMAtH9cOVsHAU1t30XW65pQZW69Nl2+j702n8MZBrToAAialVbYTG2fTaplX3vuchmhE4Pft0O73e51bFC/lrp48SKGDx+O/fv3Iz093d3+5JNP4tNPP0VxsWfJaTQa8fbbb2PGjBnutldffRXLly9HVfslI9fp6MhNfHw8qqur/fq1FNBWVX788ce48847NXlIXOv5AdrPkfkNfFrPkfkNfH2VY21tLaxWa///WspqtUKv13sUJVVVVYiNje1wntjYWJ/iTSYTTCbPu8saDIY+e2P15bL7A63nB2g/R+Y38Gk9R+Y38Pk7R1+WFdRz441GI376059iz5497jaXy4U9e/aojuRcLz09XRUPtB2e7SyeiIiIbixBv2Zt4cKFyM3NxeTJk5Gamoq1a9eioaEBs2fPBgDMnDkTw4cPx6pVqwAACxYsQGZmJv75z38iJycH+fn5OHjwIN58881gpkFERET9RNCLm2nTpuHy5ctYunQpKisrkZKSgp07d7pPGj537hx01918ISMjA++99x6effZZPP300xg7diy2bt3Ke9wQERERgH5Q3ADAvHnzMG/evA6nFRYWerTdf//9uP/++/u4V0RERDQQ9fP7URIRERH5hsUNERERaQqLGyIiItIUFjdERESkKSxuiIiISFNY3BAREZGmsLghIiIiTWFxQ0RERJrC4oaIiIg0pV/coTiQRARA20+n+1trayvsdjtqa2s1+WuvWs8P0H6OzG/g03qOzG/g66sc2/fb7fvxrtxwxU1dXR0AID4+Psg9ISIiIl/V1dUhMjKyyxhFvCmBNMTlcuHixYuIiIiAoih+XXZtbS3i4+Nx/vx5WCwWvy67P9B6foD2c2R+A5/Wc2R+A19f5SgiqKurQ1xcnOoHtTtywx250el0GDFiRJ/+DYvFotk3LaD9/ADt58j8Bj6t58j8Br6+yLG7IzbteEIxERERaQqLGyIiItIUFjd+ZDKZsGzZMphMpmB3pU9oPT9A+zkyv4FP6zkyv4GvP+R4w51QTERERNrGIzdERESkKSxuiIiISFNY3BAREZGmsLghIiIiTWFx44O/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)



**长风破浪会有时，直挂云帆济沧海。**
