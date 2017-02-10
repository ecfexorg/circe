# Circe.onError

## 使用方法

```javascript
const Circe = require('circe')
const circe = new Circe()

circe.use(Circe.onError((err, ctx) => {
  ctx.status = 500
  ctx.body = err.message
}))
```

用于拦截500服务器内部错误