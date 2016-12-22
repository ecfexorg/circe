# Circe.responseApis

## 使用方法

> success和fail方法已被circe自动注入，可以直接使用

```javascript
const Circe = require('circe')
const circe = new Circe()

rouer.get('/users'), async (ctx) => {
  if (ctx.params.success) {
    // 返回成功响应
    // 在前端：
    // 通过response.body.success判断是成功的响应
    // 通过response.body.users拿到users
    ctx.success({
      users: [{name: 'a'}, {name: 'b'}]
    })
  } else {
    // 返回失败响应
    // 在前端：
    // 通过response.body.success判断是失败的响应
    // 通过response.body.msg拿到错误信息
    ctx.fail('fail to get users')
  }
})
```

## API

- ctx.success(data[, code])
  - 返回response.boy为`{success: true, code}`
  - code可省略
  - 当data为对象时，data的每一个属性都将复制到response.body中
  - 当data为字符串是，data为字符串时，data将赋值到response.body.msg

- ctx.fail(msg[, code])
  - 返回response.boy为`{success: false, code}`
  - code可省略
  - 当msg为对象时，msg的每一个属性都将复制到response.body中
  - 当msg为字符串是，msg为字符串时，msg将赋值到response.body.msg