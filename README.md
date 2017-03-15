# Circe

> A framework based on Koa v2.
>
> 基于Koa v2的开发框架。

> 关于发音
>
> 英语：Circe[ˈsə:si]
>
> 中文：瑟茜[sè xī]

## 一、安装

```bash
$ npm install circe --save
```

## 二、入门

基于`Koa2`开发，保留与之相同的用法，所有api和中间件均兼容

```javascript
// Koa
const Koa = require('koa')
const app = new Koa()
app.use(/* 中间件 */)
app.listen(8080. function () {/* 回调 */})

// Circe
const Circe = require('circe')
const circe = new Circe()
circe.use(/* 中间件 */)
circe.listen(8080. function () {/* 回调 */})
```

Koa实例对象的属性都有（具体的作用请查看[Koa官方文档](http://koajs.com/)）：

- use
- toJSON
- inspect
- on
- proxy
- middleware
- subdomainOffset
- env
- context
- request
- response
- keys

## 三、进阶

### 1. 可获得Koa实例和http server实例

```javascript
const Circe = require('circe')
const circe = new Circe()

// koa实例
console.log(circe.app)

// server实例，可用于其他框架的结合，如socket.io
console.log(circe.server)
```

### 2. 更多的实例方法

**circe.route(Router)** 注册路由，传入路由对象

```javascript
const Circe = require('circe')
const router = new Circe.Router()

router.get('/user', async () => { /* 中间件 */ })
router.post('/user', async () => { /* 中间件 */ })

circe.route(router)
```

**circe.route(String)** 注册路由，传入路由目录

```javascript
//////// apis/user.js ////////////////////
const Circe = require('circe')
const router = new Circe.Router()

router.get('/user', async () => { /* 中间件 */ })
router.post('/user', async () => { /* 中间件 */ })

module.exports = router

//////// app.js ////////////////////
const path = require('path')
const Circe = require('circe')

// 将导入apis目录下的所有路由文件
circe.route(path.resolve(__dirname, 'apis'))
```

**circe.inject(key, value)** 注入内容到context，传入键和值参数

```javascript
const Circe = require('circe')
const circe = new Circe()

circe.inject('$hello', function () { console.log('hello') })
circe.inject('$a.b', 'test' })
circe.inject('foo.bar', {a: 1, b: 2})

circe.use(asynct (ctx, next) => {
  ctx.$hello() // 打印'hello'
  ctx.$a.b // 'test'
  ctx.foo.bar.a // 1
  ctx.foo.bar.b // 2
})
```

**circe.inject(object)** 注入内容到context，传入对象和前缀

```javascript
const Circe = require('circe')
const circe = new Circe()

circe.inject({a: 1, b: 2})
circe.inject({$c: 3, $d: 4})

circe.use(asynct (ctx, next) => {
  ctx.a // 1
  ctx.b // 2
  ctx.$c // 3
  ctx.$d // 4
})
```

### 3. 内置中间件全家桶

内置的中间件全都绑定在`Circe`类上，不需要再去npm或github上需找和对比需要的中间件，更多的中间件正在丰富中。

- [Circe.Router](https://github.com/alexmingoia/koa-router/tree/master) 引用`koa-router@7`
- [Circe.bodyParser](./src/middlewares/bodyParser/README.md) body解析器
- [Circe.checker](./src/middlewares/checker/README.md) 参数验证器
- [Circe.jwt](./src/middlewares/jwt/README.md) jwt验证
- [Circe.unless](./src/middlewares/unless/README.md) 中间件过滤
- [Circe.cors](./src/middlewares/cors/README.md) 跨域请求
- [Circe.logger](https://github.com/PabloSichert/concurrency-logger) 引用`concurrency-logger`
- [Circe.onError](./src/middlewares/onError/README.md) 拦截500错误

### 4. 拓展的context

除了koa自带的context方法和属性，circe对context进行了拓展：

- ctx.success(data[, code]) 成功响应，详细文档查看[responseApis](./src/libs/responseApis/README.md)
- ctx.fail(msg[, code]) 错误响应，详细文档查看[responseApis](./src/libs/responseApis/README.md)

### 5. 实用工具库

#### config 配置文件管理

```javascript
const Circe = require('circe')
// 根据环境变量，读取目录下配置文件，支持多级目录
const config = Circe.config.from(__dirname + '/config')
```

**示例１：**

- config
  - default.js
  - development.js
  - production.js

如有以上目录结构，且当前运行环境为`development`，将会整合`default.js`和`development.js`作为导出对象。

**示例２**

- config
  - default
    - app.js
  - development
    - app.js
    - db.js
  - production
    - app.js
    - db.js
    - other.js

如有以上目录结构，且当前运行环境为`production`，将会整合`default`、`production`目录下所有文件作为导出对象。

导出对象结构为：

```json
{
  app: {...},
  db: {...},
  other: {...}
}
```

### 6. 支持typescript

已添加对`typescript`的声明，详情请看[index.d.ts](./src/index.d.ts)

```javascript
import * as Circe from 'circe'

const circe = new Circe()
```

## 模板项目

[circe-template](http://git.oschina.net/hwhao/circe-template) - circe + babel
[circe-template-ts](http://git.oschina.net/hwhao/circe-template-ts) - circe + typescript
