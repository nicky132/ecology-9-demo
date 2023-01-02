---
order: 1
title: 常见问题及注意事项
---

## 脚手架相关

### 1、yarn install 无法连接到 yarnpkg.com ？

- 设置为国内淘宝镜像，再次尝试安装

```shell
$ yarn config set registry http://registry.npm.taobao.org/
```

### 2、Can't resolve '***' in '/...', 找不到模块 ？

- 请更新脚手架目录，执行 yarn install 进行全量安装

### 3、热调试运行缓慢，修改一个代码，需要好久才会刷新页面 ？

- 请检查 src4js 目录下是否有 node_modules 目录，如果有请删掉。

## React 相关

### 1、props.key

- 数组类型的 React 节点请默认为每一项加上一个不同的标识 key
- 不加 key 或者重复 key 会导致列表形组件卸载出现重复数据、错误数据等问题
- 如果需要重新装载组件，可以考虑改变这个 key。例如切换页签，不同页签的相同类型列表数据错乱，可以尝试使用此中方法

### 2、ref 实例

- 最新的 React ref 的调用方法

> ref 不能在无状态组件中使用

```jsx
import React from 'react';

class Demo extends React.Component {
  div = React.createRef();

  componentDidMount() {
    console.log(this.div.current);
  }

  render() {
    return (
      <div ref={this.div} />
    )
  }
}
```

- 兼容 Function 和 String (不建议使用)

```jsx
import React from 'react';

class Demo extends React.Component {
  componentDidMount() {
    console.log(this.div);
  }

  render() {
    return (
      <div ref={(el) => (this.div = el)} />
    )
  }
}
```

```jsx
import React from 'react';

class Demo extends React.Component {
  componentDidMount() {
    console.log(this.refs.div);
  }

  render() {
    return (
      <div ref="div" />
    )
  }
}
```

## react-router 相关

> 更多问题请详细查阅[【官方文档】](https://reacttraining.com/react-router/web/guides/philosophy)

## Mobx 相关

> 更多问题请详细查阅[【官方文档】](https://cn.mobx.js.org/)

### 1、antd、ecCom、weaver-mobile 中的 React 组件传入 mobx 数据报错

- 转换之后再传入给组件使用

```js
//不需要所有类型都处理，视情况选择

// 对象处理
import { toJS } from 'mobx';
const newObj = toJS(obj);

//数组处理
const newArr = arr.slice(0);
```
### 2、修改 mobx 数据有时候不触发组件渲染

- 没有为组件添加 @observer

```jsx
import React from 'react';
import { observer } from 'mobx-react';

@observer
class Demo extends React.Component {
  render() {
    return (<div />)
  }
}
```

- 错误的 observable 对像操作 [详细](https://cn.mobx.js.org/refguide/object-api.html)

- 错误的异步 action 操作 [详细](https://cn.mobx.js.org/best/actions.html)

