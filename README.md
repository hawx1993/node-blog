### 使用Node.js可以做什么

Web开发：`Express + EJS + Mongoose`

```
Express 是轻量灵活的Nodejs Web应用框架，它可以快速地搭建网站。
Express框架建立在Nodejs内置的Http模块上，并对Http模块再包装，从而实际Web请求处理的功能。

ejs是一个嵌入的Javascript模板引擎，通过编译生成HTML的代码。

mongoose 是MongoDB的对象模型工具，通过Mongoose框架，可以进行访问MongoDB的操作。
```
mysql 是连接MySQL数据库的通信API，可以进行访问MySQL的操作。
通常用Node.js做Web开发，需要3个框架配合使用，就像Java中的SSH。

### `Express`

`Express`框架是一款基于 Node.js 平台，实现快速开发、极简的 web 开发框架。它提供一系列强大的特性，可以帮助你创建各种 Web 和移动设备应用。可以通过执行如下命令安装：

```js
$ npm install express --save
```

### MongoDB

`MongoDB` 是一个跨平台的，面向文档的非关系型数据库，具有高性能，高可用性和可扩展性方便等优点。他支持的数据结构非常松散，是类似于json的格式，因此可以存储比较复杂的数据类型。

在MongoDB里，数据模型是这样的：
```
1）：Mongo系统含有多个数据库
2）数据库汇总含有多个集合
3）一个集合含有多个文件
4）一个文件还有多个域
5）一个域含有多个键/值对
7) 一个值可以是：基本数据类型，如string，integer，float，时间戳，二进制，一个文件，一个数组
```
### Mongoose

`Mongoose`是在Node环境中操作`MongoDB`数据库的一种便捷封装，是一种对象模型工具，类似于`MySQL`的ORM。`Mongoose`将数据库中的数据转换为`JavaScript`对象以供你在应用中使用。

更多详情可以浏览器官方主页：http://www.nodeclass.com/api/mongoose.html

### ejs模板引擎

模板引擎（Template Engine）是一个将页面模板和要显示的数据结合起来生成 HTML 页面的工具。它既可以运 行在服务器端又可以运行在客户端，大多数时候它都在服务器端直接被解析为 HTML，解析完成后再传输给客户端，因此客户端甚至无法判断页面是否是模板引擎生成的。

ejs 是模板引擎的一种， 可以将数据和模板合并然后生成 HTML 文本。因为它使用起来十分简单，而且与 express 集成良好。所以非常适合用来做Node系统的模板引擎。

安装ejs：

```js
npm install ejs
```

ejs 的标签系统非常简单，它只有以下三种标签：

```js
<% code %>：JavaScript 代码。
<%= code %>：显示替换过 HTML 特殊字符的内容。
<%- code %>：显示原始 HTML 内容。
```

## 开发环境搭建
```js
Node.js版本:v5.9.0
Express版本：v4.13.1
MongoDB版本:v3.2.0
```

### 在Mac系统上安装Node.js

`Node.js`是一个内嵌在Chrome的V8 js 引擎上，Node.js使用一个事件驱动，非阻塞`I/O`模型。安装Node.js可以到官网去下载：https://nodejs.org/en/

安装完后在Mac终端输入`$ node -v `，当看到`v4.2.4`这样的版本号表示安装成功。


### 安装`Express`框架
首先在系统根目录新建一个名为‘Nblog’的的文件夹，然后在该文件夹下安装`Express`框架，执行如下命令：
```
$ sudo npm install -g express-generator
$ express -e
$ npm install
```
运行该app输入：`$ DEBUG=N-blog:* npm start`，成功后，打开浏览器输入localhost:3000，看到如下图所示说明安装成功：

![](img/express-start.png)

成功后，我们来看一下该项目的主要目录结构：

![](img/mulu.png)

其中：
```
app.js：启动文件，或者说入口文件
package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块
node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下
public：存放 image、css、js 等文件
routes：存放路由文件
views：存放视图文件或者说模版文件
bin：存放可执行文件
```

### 安装MongoDB数据库
首先安装`homebrew`，通过打开Mac终端输入如下命令行：
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
有关homebrew的使用详情请见官方文档：http://brew.sh/

然后通过命令行 `$ brew install mongodb `来安装`MongoDB`数据库，这里我们下载了`mongodb-osx-x86_64-3.2.0`文件，通过如下命令行解压相关文件：
```
$ tar -zxvf mongodb-osx-x86_64-3.0.7.tgz
```
这时我们可以在根目录看到相应的解压的文件夹，然后通过命令将其移动到另外一个文件夹：

```
$ mv -n ~/mongodb-osx-x86_64-3.2.0 ~/usr/local
```
在根目录 `/ `下创建  `data/db` 目录，用于放置`mongodb`数据，并且给该目录设置权限

```
sudo mkdir -p /data/db
sudo chown -R  trigkit4 /data
```
其中，`trigkit4`是我电脑的用户名

运行`MongoDB`，只需要在终端输入`mongod`命令，然后打开另一个终端窗口输入`mongo`，默认运行在：http://127.0.0.1:27017/


### Mongoose的安装和使用

`Mongoose` 是一款`MongoDB` 对象模型工具被用于异步环境中。

>`github`托管地址：https://github.com/Automattic/mongoose



首先新建一个名为`mongo`的文件夹，该文件夹就是数据库目录。然后在该目录下安装`mongoose`：

```
$ npm install mongoose
```


## 博客功能分析

我们要搭建的是一款简单的具有多人注册、登录、发表文章、登出功能的基于Node.js的博客。

>设计目标

未登录：主页左侧导航显示 home、login、register，右侧显示已发表的文章、发表日期及作者。
登陆后：主页左侧导航显示 home、post、logout，右侧显示已发表的文章、发表日期及作者。
用户登录、注册、发表成功以及登出后都返回到主页。

>路由规划

```
/ ：首页
/login ：用户登录
/reg ：用户注册
/post ：发表文章
/logout ：登出
```
我们要求 `/login` 和 `/reg` 只能是未登录的用户访问，而 `/post` 和 `/logout` 只能是已登录的用户访问。


<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/gWs9P5H4YpntyAR6x1qG5EkX/hawx1993/node-blog'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/gWs9P5H4YpntyAR6x1qG5EkX/hawx1993/node-blog.svg' />
</a>
