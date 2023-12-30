---
title: Lambda and Anonymous function Java
date: 2023-10-29 11:43:33
categories:
- Technical stack
- Java
tags: 
- Lambda Java
- Technical stack
---

# Lambda Function and Anonymous function

<!-- more -->

## Defination

A more concise way to represent anonymous classes that implement certain interfaces

## Grammar

```
(Parameters) ->{Code Block}
```

eg:

without para

```
() -> System.out.println("Hello, World!")
```

With one para

```
x -> System.out.println(x)
```

with more para

```
(x, y) -> x + y
```



combine with the function

```
Runnable run = () -> System.out.println("Running...");
new Thread(run).start();
```



# Anonymous function

## Defination

An unnamed function

Often used for brief, one-time operations



## Compare beteween Lambda and Anonymous Function

lambda

```java
List<String> names = Arrays.asList("Anna", "Bob", "Charlie");
Collections.sort(names, (a, b) -> a.compareTo(b));
```

anonymous function

```
List<String> names = Arrays.asList("Anna", "Bob", "Charlie");
Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.compareTo(b);
    }
});
```

