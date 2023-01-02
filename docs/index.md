---
order: 0
title: 快速开始
---

## 一、安装

### 1、安装 [Node.js](http://nodejs.cn/)、[yarn](https://yarnpkg.com/zh-Hans/docs/usage)

### 2、获取仓库

本仓库地址 https://gitee.com/weaver_cs/ecology-9-demo

- 使用 git 获取本仓库的，请新建本地分支进行开发，不要在 master 分支直接开发提交

- 也可拉取压缩包进行本地开发

- 希望自己的开发的项目做为 Demo 分享给其他开发者的可以提交本地分支到远程，并提交 PR，有管理员审核通过后即可合并到主分支。感谢您的贡献！[点击查看详细说明](#/demo/doc/index?id=7)

### 3、安装 node_modules 依赖模块

进入端脚手架目录 `src4js-pctool-v1`，执行 yarn install 安装依赖

[install 安装遇到问题？点击查看解决办法](#/demo/doc/qa)

```shell
$ cd src4js-pctool-v1

$ yarn install
```

## 二、新建源码目录

在 `src4js/pc4ns` 目录下新建模块名的文件夹，一般结构如下

> 可直接复制已有 demo 进行参考修改

```js
├──pc4ns
    ├── demo01            // 一般为模块名
        ├── apis          // 接口配置目录
        ├── components    // React 组件目录
        ├── stores        // mobx Store 目录
        ├── style         // less 样式目录
        ├── index.js      // 模块入口
        ├── debug.js      // 热调试入口
        ├── single.js     // 单页入口
        ├── index.md      // 事例 Demo 说明文档
```

## 三、webpack 打包配置

- 脚手架目录说明

```js
├──src4js-pctool-v1             // 脚手架目录
    ├── config                  // 功能配置
    ├── config_weaver           // 模块开发配置目录
        ├── weapath4e9.js       // 打包配置
    ├── node_modules            // 依赖安装目录（自动生成）
    ├── public                  // node server 热调试服务根路径
        ├── demo01.html         // 特殊定制化模板
        ├── index.html          // 默认模板
    ├── scripts                 // 功能配置（禁止修改提交）
    ├── package.json            // 包配置文件（禁止修改提交）
    ├── webpack-config.js       // 打包配置入口文件
```

- `src4js-pctool-v1/config_weaver/weapath4e9.js` 配置文件

> library 格式为 weans + [模块名]

```js
ns_demo001: {
  entry: '../src4js/pc4ns/demo01/index.js',            // build 模块打包主入口（生成 jsName 文件，全局模块名 library）
  entry4single: '../src4js/pc4ns/demo01/single.js',    // build 单页打包入口，加载 index.js 并进行 render 到根节点
  entry4debug: '../src4js/pc4ns/demo01/debug.js',      // start 热调试入口，类似 entry4single
  buildPath: '../spa/nonstandard/demo01',              // build 打包生成文件目录
  servedPath: '/spa/nonstandard/demo01/',              // build 生成文件对应服务器地址，一般为 buildPath/
  cssName: 'index.css',                                // build 生成 entry 引入的相关模块 css 样式文件
  jsName: 'index.js',                                  // build 生成 entry 对应压缩 js 文件
  jsSingleName: 'index4single.js',                     // build 生成 entry4single 对应压缩 js 文件
  htmlName: 'index.html',                              // start 热调试首页 html，打包模板
  htmlTemplate: 'index.html',                          // build 生成 htmlTemplate 对应文件
  library: 'weansDemo01',                              // build 生成 entry 的全局模块名
  libraryTarget: 'umd'                                 // 模块导出类型
  copyFiles: [                                         // 复制打包后文件到 ecology 目录，便于覆盖服务器
    {from: '../spa/nonstandard/demo01',to: '../ecology/spa/nonstandard/demo01'}
  ]
}
```

> library 需要额外配置 webpack 模块例外

- `src4js-pctool-v1/config/webpack.config.dev.js` 热服务
- `src4js-pctool-v1/config/webpack.config.prod.js` 打包

```js
externals: [
  // 非标
  { 'weansDemo01': 'weansDemo01' },
]
```

## 四、热调试开发

### 1、指定对应模块启动热服务、模块名详见 `weapath4e9.js` 配置

```shell
$ cd src4js-pctool-v1
$ yarn start --pubModule=ns_demo001
```

### 2、服务启动成功，控制台会打印热调试的服务地址，并在浏览器自动打开

```shell
Compiled successfully!

You can now view src4js-pctool-v1 in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.47.218:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

### 3、安装、配置 [nginx](http://nginx.org/) 反向代理

由于前端热服务为独立服务，需要用到 ecology 环境接口，请配置 nginx 反向代理 [参考配置文件](#/demo/doc/index?id=6)

> 启动反向代理后，打开监听端口服务即可进行开发

> 代理登录页进行登陆后可以获取访问接口的权限

参考配置说明：
- nginx 监听端口启动服务 `http://127.0.0.1:8888`
- 代理本地静态文件目录 `/Users/theoton/weaver/project/ecology_207`
- 代理前端热服务 `http://127.0.0.1:3000`
- 代理后端接口服务 `http://192.168.7.216:8080`
- 代理登录页 `http://192.168.7.216:8080/wui/index.html`

## 五、生产打包

> 添加指令 --analyzer=true 可以启动打包分析服务

```shell
$ cd src4js-pctool-v1
$ yarn build --pubModule=ns_demo001
```

## 六、反向代理（nginx）

nginx.conf

```nginx
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                     '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
    server {
        # 主服务监听端口
        listen      8888;
        server_name e9;

        # 代理前端热服务地址
        set $e9_client http://127.0.0.1:3000;

        # 代理后台接口服务地址
        set $e9_server http://192.168.7.216:8080;

        # 本地主服务监听静态文件目录，Windows 系统注意反斜杠
        root /Users/theoton/weaver/project/ecology_207;

        # 根路径代理本地文件和前端热服务
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        # 系统登录页代理为后台接口服务器
        location /wui/index.html {
            proxy_pass http://192.168.7.216:8080/wui/index.html;
        }

        # 表单单页 jsp 代理后台服务器
        location /spa/workflow/index_form.jsp {
            proxy_pass $e9_server;
            proxy_set_header Host $host:$server_port;
        }

        location ~ /templetecheck/ {
            proxy_pass $e9_server;
            proxy_set_header Host $host:$server_port;
        }

        location /login {
            proxy_pass $e9_server;
            proxy_set_header Host $host:$server_port;
        }

        location /rsa {
            proxy_pass $e9_server;
            proxy_set_header Host $host:$server_port;
        }

        location /api {
            proxy_pass $e9_server;
            proxy_set_header Host $host:$server_port;
        }

        location /hrm {
            proxy_pass $e9_server;
            proxy_set_header Host $host:$server_port;
        }

        location /wui {
            index wui;
        }

        location /font {
            index font;
        }

        location /images {
            index images;
        }

        location /spa {
            index spa;
        }

        location /js {
            index js;
        }

        location /social {
            index social;
        }

        location /cloudstore {
            index cloudstore;
        }
    }
    include servers/*;
}
```

## 七、分享 demo 到文档页

- 为自己的项目添加 markdown 说明文档，格式要求如下

`src4js/pc4ns/[demo目录名]/index.md`

```md
---
title: demo001（标题不要过长）
order: 0
demos:
  - path: /spa/nonstandard/demo01/index.html#/main/ns_demo001/baseForm（预览地址）
    title: 基础表单（标题）
    order: 0
  - path: /spa/nonstandard/demo01/index.html#/main/ns_demo001/BaseTable
    title: 基础表格
    order: 1
  - path: /spa/nonstandard/demo01/index.html#/main/ns_demo001/EditTable
    title: 可编辑表格
    order: 2
---

## 基础表单 (统一使用二级标题)

（详细说明）

大概说明一下这个是那种使用情况，书写的注意事项，引用了哪些组件可以加链接到文档

具体的文件说明可以直接链接指向仓库地址的某个文件，让跳转过去看源码注释

## 基础表格


## 可编辑表格

```

- 提交自己的本地分支到远程码云仓库
- 提交 Pull Requests
- 等待管理员审核通过后会更新到文档页
