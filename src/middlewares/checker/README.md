# Circe.checker

## 使用方法

```javascript
const Circe = require('circe')
const circe = new Circe()

// 初始化，注入checker函数
circe.use(Circe.checker.init())

// 用法1：作为中间件
rouer.post('/users', Circe.checker({
  username: (ctx) => ctx.checkBody('username', true).notEmpty(true, '用户名不能为空'),
  age: (ctx) => ctx.checkBody('age', true).is('number', '年龄必须为数字')
}), async (ctx) => {
  const {username, age} = ctx.vals // 拿到上面验证的参数
  // ...
})

// 方法2：作为ctx函数使用
router.post('/article', async (ctx) => {
  // 务必调用val属性！！！！！
  const title = ctx.checkBody('title', true).notEmpty(true).val
  const content = ctx.checkBody('content', true).notEmpty(true).val
  // ...
})
```

## 参数

```javascript
const Circe = require('circe')
const circe = new Circe()
// 调用init中间件，初始化
circe.use(Circe.checker.init(/* options参数 */))
```

其中`options`对象支持以下属性：

- getQuery `function(ctx)` 获取query的方法，默认为`(ctx) => ctx.query`
- getParams `function(ctx)` 获取params的方法，默认为`(ctx) => ctx.params`
- getBody `function(ctx)` 获取body的方法，默认为`(ctx) => ctx.body`

## API

**创建验证器：**

- ctx.checkQuery(属性名:String[, 是否必须:Boolean]) 验证query参数
- ctx.checkParam(属性名:String[, 是否必须:Boolean]) 验证param参数
- ctx.checkBody(属性名:String[, 是否必须:Boolean]) 验证body参数

> 第二个参数为可选，
>
> 当值为`true`时，等价于调用`ctx.checkXXXX(String).required()`
>
> 当值为`false`时，等价于调用`ctx.checkXXXX(String).optional()`

**验证器属性：**

- key 验证的属性名
- val 验证的属性值，每次连接调用验证函数都马上更新到该值

**验证器内置函数:**

验证器分为两种，一种用于判断，若判断失败则抛出message为`tip`的错误，一种用于转化，用于确保`val`符合某种条件，具体逻辑请查看[源码](./methods.js)

- is(type, tip) 判断是否为指定类型
- optional() 是否可选，当`val`为`undefined`，不执行后面的验证函数
- required(tip) 是否必须，当`val`为`undefined`，验证失败
- defaultTo(defaultVal) 设置默认值，当`val`为`undefined`，赋予默认值
- eq(otherVal, tip) 判断等于，判断规则查看`lodash.isEqual`
- neq(otherVal, tip) 判断不等于，判断规则查看`lodash.isEqual`
- toArray() 转化为数组，当`val`为`undefined`，转化为`[]`，当`val`为数组不转化，否则转化为`[val]`
- in(array, tip) 判断val必须存在于array中
- notIn(array, tip) 判断val不能存在于arrary中
- uniq() val必须为数组，排除`val数组`中重复的元素
- isLength(min, max, tip) val必须为数组，判断`val数组`长度是否大于等于`min`，小于等于`max`，判断规则查看`lodash.gt`
- toNumber (defaultVal) 转为`val`为`number`类型，若不成功，并且指定了`defaultVal`，则转化为`defaultVal`，否则抛出异常
- gt(otherVal, tip) 判断是否大于指定值，判断规则查看`lodash.gt`
- gte(otherVal, tip) 判断是否大于等于指定值，判断规则查看`lodash.gte`
- lt(otherVal, tip) 判断是否小于指定值，判断规则查看`lodash.lt`
- lte(otherVal, tip) 判断是否小于等于指定值，判断规则查看`lodash.lte`
- inRange(min, max, tip) 判断是否在指定范围，判断规则查看`lodash.inRange`
- toString() 转化为字符串，调用`val.toString()`
- trim() 除去字符串两端空格，调用`val.trim()`
- notEmpty(trim, tip) 判断是否为字符串并且不能为空字符串，第一个参数于是否去除两端空格再判断
- match(regexp, tip) 判断字符串是否匹配指定正则表达式

**自定义验证器函数**

除了内置的验证器函数，还提供自定义验证器函数

```javascript
const Validator = Circe.checker.Validator

Validator.addMethod('myMethod', function (tip) {
  this.val = 'hello'
  return this // 切记return this，以实现链式调用
})
```

验证器函数中可以使用的属性和方法：

- this.key 验证属性名，不建议修改
- this.val 验证属性值
- this.throw(message) 抛出ValidationError
- this.throwIf(bool, mesage) 当bool为true时，抛出ValidationError
- this.throwIfNot(bool, mesage) 当bool为false时，抛出ValidationError

除此之外，还可以调用所有已注册的验证器函数：

```javascript
Validator.addMethod('myMethod', function (tip) {
  this.trim() // trim为内置验证器
  this.val = this.val + ' hello'
  return this
})
```

inspired by [koa-bouncer](https://github.com/danneu/koa-bouncer/tree/next)