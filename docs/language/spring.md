---
sidebar: 'auto'
---

# Spring

## Spring 基础

### Spring 是什么？
Spring 是一个轻量级的 **IoC** 和 **AOP** 容器框架，是为 Java 应用程序提供基础性服务的一套框架，目的是用于简化企业应用程序的开发，它使得开发者只需要关心业务需求。

主要包括以下七个模块：
- `Spring Context`：提供框架式的 Bean 访问方式，以及企业级功能（JNDI、定时任务等）。
- `Spring Core`：核心类库，所有功能都依赖于该类库，提供 IOC 和 DI 服务。
- `Spring AOP`：AOP 服务。
- `Spring Web`：提供了基本的面向 Web 的综合特性，提供对常见框架如 Struts2 的支持，Spring 能够管理这些框架，将 Spring 的资源注入给框架，也能在这些框架的前后插入拦截器。
- `Spring MVC`：提供面向 Web 应用的 Model-View-Controller，即 MVC 实现。
- `Spring DAO`：对 JDBC 的抽象封装，简化了数据访问异常的处理，并能统一管理 JDBC 事务。
- `Spring ORM`：对现有的 ORM 框架的支持。

### Spring 的优点？
- Spring 属于低侵入式设计，代码的污染极低。
- spring 的 DI 机制将对象之间的依赖关系交由框架处理，减低组件的耦合性。
- Spring 提供了 AOP 技术，支持将一些通用任务，如安全、事务、日志、权限等进行集中式管理，从而提供更好的复用。
- Spring 对于主流的应用框架提供了集成支持。

## AOP

[切面 AOP 实现权限校验](https://blog.csdn.net/mu_wind/article/details/102758005)

### 概念

AOP（Aspect Oriented Programming）意为：
面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。
利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

::: tip
简单地去理解，其实 AOP 要做三类事：
- **在哪里切入**，也就是权限校验等非业务操作在哪些业务代码中执行。
- **在什么时候切入**，是业务代码执行前还是执行后。
- **切入后做什么事**，比如做权限校验、日志记录等。
:::