---
title: Test Development Knowledge
date: 2023-10-28 21:50:50
categories:
- Technical stack
- Java
tags: 
- Test Development Knowledge
- Technical stack
- Java
---

# Test Development Knowledge

<!-- more -->

## TTD

Test Driven Development: **测试驱动开发**: 在编写实际功能代码之前先编写测试代码。

### 基本步骤

1. **Writing failed tests **:首先，为即将要开发的功能或修改编写一个测试，并确保在没有相应功能的情况下，这个测试是失败的。
2. **Write functional code**：然后，尽量简单地编写功能代码，使其能够通过测试。
3. **reconfiguration**：当测试通过后，可以考虑重构代码，优化结构，确保在不改变功能的前提下提高代码的可读性和可维护性。在重构的过程中，应当确保已有的测试仍然能够通过，以确保功能没有被破坏。
4. **Repeat the above steps**：对于每一个新的功能或修改，都重复以上的步骤。

## Junit Test

### Junit5 Basic Conceptions

### Library

​	**JUnit Platform**: 提供了在 JVM 上启动测试框架的基础。可以运行JUnit 5，也支持其他测试框架。

​	**JUnit Jupiter**: JUnit 5 的核心部分，提供新的编写和运行测试的模型。

​	**JUnit Vintage**: 提供对运行早期版本（JUnit 3 和 JUnit 4）的测试的支持。

### Core Decorator

**生命周期方法**

@BeforeEach 每次测试前都要执行的方法

@AfterEach 每次测试后都要执行的方法

@BeforeAll 标记所有测试开始前只执行一次的方法。该方法必须是 `static`

@AfterAll 记所有测试结束后只执行一次的方法。该方法必须是 `static`

**测试方法**

`@Test`: 标记一个方法为测试方法。

`@DisplayName`: 可为测试方法或测试类定义一个自定义的显示名称。

`@Nested`: 支持内部测试类，有助于更结构化地组织测试。

`@Tag`: 允许分类测试，例如“快速”、“慢速”等。

**条件执行**

在满足某些条件时才执行测试

@EnabledOnOs`, `@EnabledOnJre`, `@EnabledIfSystemProperty`, `@EnabledIfEnvironmentVariable

 禁用某个特定的测试

@Disabled

**参数注入**

 定义一个参数化测试： @ParameterizedTest。

为参数化测试提供数据： @ValueSource`, `@EnumSource`, `@MethodSource`, `@CsvSource`, `@CsvFileSource。

多次运行一个测试：@RepeatedTest。



其它参数

@DisplayName

主要是辅助功能，增加代码的可以阅读性

```
@DisplayName("some readiable content here!")
```

Eg:

```
package org.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("Calculator Tests")
public class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    public void setUp() {
        calculator = new Calculator();
    }

    @Test
    @DisplayName("Adding 1 + 1 should result in 2")
    public void testAddition() {
        assertEquals(2, calculator.add(1, 1));
    }

    @Test
    @DisplayName("Adding 0 + 0 should result in 0")
    public void testAdditionOfZeros() {
        assertEquals(0, calculator.add(0, 0));
    }
}
```

![image-20231029110517224](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Test-Development-Knowledge.assets/image-20231029110517224.png)



**Fail() method**

Used to clearly indicate that the test case should fail.



When you expect a code block not to be executed, but it is indeed executed.
When you test the exception handling logic, you expect an exception to be thrown, but not.

Eg:

对于下面例子

假设 some应该报错，之后 走 catch 路线

但是没有报错的话， 就走了 fail路线，这样会 爆出 fail(我们在这里设置的异常)

```
try {
    someMethodThatShouldThrowException();
    fail("Expected an exception to be thrown");
} catch (SomeException e) {
    // Handle exception and maybe some assertions about the exception
}
```

**assertEquals**

Used to assert whether two values are equal

Basis assertEquals

```
assertEquals(Object expected, Object actual)
```

With message parameters

```
assertEquals(Object expected, Object actual, String message)
assertEquals(Object expected, Object actual, Supplier<String> messageSupplier)
```

For comparing double and float types, add the delta parameter

```
assertEquals(double expected, double actual, double delta)
assertEquals(float expected, float actual, float delta)
```

Comparison of Arrays

```
assertArrayEquals(Object[] expected, Object[] actual)
assertArrayEquals(int[] expected, int[] actual)
```

### Specific Steps (Actual Practice)

Configuring the environment

```
    <!-- JUnit Jupiter (JUnit 5) API -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.8.2</version>
      <scope>test</scope>
    </dependency>

    <!-- JUnit Jupiter (JUnit 5) Runtime -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-engine</artifactId>
      <version>5.8.2</version>
      <scope>test</scope>
    </dependency>

    <!-- JUnit Vintage Engine to support running JUnit 3 & 4 tests -->
    <dependency>
      <groupId>org.junit.vintage</groupId>
      <artifactId>junit-vintage-engine</artifactId>
      <version>5.8.2</version>
      <scope>test</scope>
    </dependency>
```

Write a test class

eg:

```
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

```
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class CalculatorTest {
    
    @Test
    public void testAdd() {
        Calculator calculator = new Calculator();
        int result = calculator.add(2, 3);
        assertEquals(5, result);
    }
}
```

Eg2:

展示

```
import org.junit.jupiter.api.*;

public class SampleTest {

    @BeforeEach
    public void setup() {
        System.out.println("Setup: Initializing the test environment...");
        // 例如，初始化数据库连接、配置文件等。
    }

    @AfterEach
    public void teardown() {
        System.out.println("Teardown: Cleaning up after the test...");
        // 例如，断开数据库连接、清除临时文件等。
    }

    @Test
    public void testMethod1() {
        System.out.println("Running testMethod1");
        // ...
    }

    @Test
    public void testMethod2() {
        System.out.println("Running testMethod2");
        // ...
    }
}

```

### 实战

进入某个类文件中

shift + command + T  快捷键 直接创建对应的Test class

![image-20231029101927544](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Test-Development-Knowledge.assets/image-20231029101927544.png)
