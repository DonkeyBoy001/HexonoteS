---
title: postgreSQL
date: 2023-12-19 17:42:23
categories:
- Technical stack
tags: 
- Database
_ postgreSQL
---

# PostgreSQL

This is the note to record how to use postgreSQL.

<!-- more -->

## Start to use

通常和docker一起使用

使用postgreSQL image

```bash
docker pull postgres
```

启动容器

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

**注意**

> 这里的name 是自己创建的用户名 
>
> mysecretpassword 是对应密码
>
> 都是要自己改的



下面是一个例子

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=myuser -p 5432:5432 -d postgres
```

> 使用-p 指定了端口号

## 可视化工具

**pgAdmin**

https://www.pgadmin.org/



在servers 上 create server

genernal 随便输入个名字

在connection 界面

> Host name/address: 127.0.0.1
>
> Port: 5432
>
> username: 你自己创建镜像的name
>
> password：你自己设置的摩玛



## 如何往数据库增加数据

#### How to use hibernate to insert data into postgreSQL

配置hibernate 和 postgreSQL

pom.xml配置依赖

```java
      <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>42.6.0</version>
        </dependency>
```



hibernate 可以选择下面JPA 自动包含hibernate作为默认实现 

```java
        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
```

或者 自配版本

```java
<!-- Hibernate 核心 -->
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>[适当的版本]</version>
</dependency>
```



交互

安装 JPA 的话就默认使用hibernate了，不需要自己写相应的配置

使用Spring Data JPA的话，简化了对数据库的访问的实现



配置postgreSQL数据库

在application.properties文件内配置

```java
spring.datasource.url=jdbc:postgresql://localhost:5432/yourdb
spring.datasource.username=这里是用户名
spring.datasource.password=这里是密码
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

```

> spring.jpa.hibernate.ddl-auto=update: 设为update
>
> 当程序启动，hibernate 自动更新数据库 匹配程序中的实体类

> 类比理解
>
> 你正在建房子， 这个房子就是数据库
>
> 一开始根据设计图建房子，这个设计图就是entity
>
> 第一次搭建，类似hibnernate 创建数据库中的表
>
> 你后面想对设计图改变，比如 增加一个壁炉
>
> update相当于，每次你对设计图改变，hierinate 就会自动更新相应配置到数据库中。



创建实体类entity 

使用JPA annotation mapping 数据库表

```java
import javax.persistence.*;

@Entity
public class User {
    // id means primary key
    // generatedValue means how to gererate the primary key
    // here means self-increment strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    // getters and setters
}

```

创建仓库interface

定义一个接口来扩展 `JpaRepository` 或 `CrudRepository`

下面分别给了两个例子

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
```

```java
@Repository
// define an interface
// newRepo extend CrudRepo: it Automatically obtained a series of standard CRUD (create, read, update, delete) operations
public interface NewsCacheRepository extends CrudRepository<NewsCache, Long> {

    // Optional<NewsCache> findByCompanyAndTopicAndStartDateAndEndDate(String
    // company, String topic, LocalDate startDate,LocalDate endDate);

    // self defined method: return the top 10 newCache in descending order
    List<NewsCache> findTop10ByOrderByIdDesc();
}
```

在server 或 control 中 注入 仓库的interface 并用其 执行数据库操作

在repository内创建interface

```java
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NewsCacheRepository extends JpaRepository<NewsCache, Long> {

    List<NewsCache> findTop10ByOrderByIdDesc();
}
```

> 这里关于interface有很多方法用来查询

> findTop10 就是查找前10条
>
> By 是分割条件作用
>
> OrderByIdDesc 按照id字段降序
>
> 当你调用这个方法时，Spring Data JPA 会根据方法名生成相应的 SQL 查询，从而返回 ID 最大的前 10 条 `NewsCache` 记录。

其它interface的常用方法

> 根据单个属性查找
>
> ```java
> List<YourEntity> findByAttributeName(String attributeName);
> ```
>
> > Eg: `List<User> findByLastName(String lastName);` - 查找所有姓氏与给定值匹配的用户。
>
> 多属性查找
>
> ```java
> List<YourEntity> findByFirstAttributeAndSecondAttribute(Type firstAttribute, Type secondAttribute);
> ```
>
> > Eg: `List<User> findByFirstNameAndLastName(String firstName, String lastName);` - 查找所有名字和姓氏同时匹配给定值的用户。
>
> 按属性值排序
>
> ```java
> List<YourEntity> findByOrderByAttributeNameAsc();
> ```
>
> > Eg: `List<User> findByOrderByLastNameAsc();` - 按姓氏升序排列查找所有用户。
>
> 条件筛选 
>
> ```java
> List<YourEntity> findByAttributeNameLessThan(Type value);
> ```
>
> > Eg：List<User> findByAgeLessThan(int age); - 查找年龄小于给定值的所有用户。
>
> **范围查找**
>
> ```java
> List<YourEntity> findByAttributeNameBetween(Type start, Type end);
> ```
>
> > Eg: `List<User> findByAgeBetween(int startAge, int endAge);` - 查找年龄在指定范围内的所有用户。
>
> 模糊查询
>
> ```java
> List<YourEntity> findByAttributeNameContaining(String attributeName);
> ```
>
> > Eg: `List<User> findByLastNameContaining(String name);` - 查找姓氏中包含给定字符串的所有用户。

一般使用@Autowired自动注入

> 就在服务层 写一个全球变量就行
>
> 然后需要保存该数据的时候，就调用save方法

服务层为例子

注入 仓库

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

		//.....
}

```

如果用的是List的话，需要调用saveAll()方法

下面例子是save()和saveAll()区别的例子展示

```java
User user = new User();
user.setName("John Doe");
user.setEmail("john@example.com");
userRepository.save(user);
```

```java
List<NewsCache> newsCaches = new ArrayList<>();
newsCaches.add(new NewsCache("News Title 1", "Content 1"));
newsCaches.add(new NewsCache("News Title 2", "Content 2"));
newsCacheRepository.saveAll(newsCaches);
```

