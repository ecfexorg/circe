# Circe

> A framework based on Koa v2.
>
> 基于Koa v2的开发框架。

> 关于发音
>
> 英语：Circe[ˈsə:si]
>
> 中文：瑟茜[sè xī]

## 安装

```bash
npm install circe --save
```

## 特性列表

### 特性一：跟Koa一模一样的用法

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

### 特性二：可获得Koa实例和http server实例

```javascript
const Circe = require('circe')
const circe = new Circe()

// koa实例
console.log(circe.app)

// server实例，可用于其他框架的结合，如socket.io
console.log(circe.server)
```

### 特性三：更多的实例方法

**circe.route(Router)** 注册路由，传入路由对象

```javascript
const Circe = require('circe')
const router = new Circe.Router()

router.get('/user', async () => { /* 中间件 */ })
router.post('/user', async () => { /* 中间件 */ })

circe.route(router)
```

**circe.route(Router)** 注册路由，传入路由目录

```javascript
//////// apis/user.js ////////////////////
const Circe = require('circe')
const router = new Circe.Router()

router.get('/user', async () => { /* 中间件 */ })
router.post('/user', async () => { /* 中间件 */ })

module.exports = router

//////// app.js ////////////////////
const Circe = require('circe')

// 将导入apis目录下的所有路由文件
circe.route('./apis')
```

**circe.inject(key, value)** 注入内容到context，传入键和值参数

```javascript
const Circe = require('circe')
const circe = new Circe()

circe.inject('$hello', function () { console.log('hello') })
circe.inject('$a.b', 'test' })

circe.use(asynct (ctx, next) => {
  ctx.$hello() // 打印'hello'
  ctx.$a.b // 'test'
})
```

**circe.inject(key, value)** 注入内容到context，传入对象和前缀

```javascript
const Circe = require('circe')
const circe = new Circe()

circe.inject({a: 1, b: 2})
circe.inject({c: 3, d: 4}, '$')
circe.inject({e: 5, f: 6}, 'test.')
circe.inject({g: 7, h: 8}, 'test.$')

circe.use(asynct (ctx, next) => {
  ctx.a // 1
  ctx.b // 2
  ctx.$c // 3
  ctx.$d // 4
  ctx.test.e // 5
  ctx.test.f // 6
  ctx.test.$g // 7
  ctx.test.$h // 8
})
```

### 特性四：中间件全家桶

内置的中间件全都绑定在`Circe`类上，更多的中间件正在丰富中，致力于实现项目的单一依赖，不需要再去npm或github上需找和对比需要的中间件。

- [Circe.Router](https://github.com/alexmingoia/koa-router/tree/master) 引用koa-router@7
- [Circe.bodyParser](./src/middlewares/bodyParser/README.md) body解析器
- [Circe.checker](./src/middlewares/checker/README.md) 参数验证器

### 特性五：常用工具库

~~内容待补充~~