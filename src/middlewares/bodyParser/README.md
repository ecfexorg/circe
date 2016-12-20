# Circe.bodyParser

## 使用方法

```javascript
const Circe = require('circe)
const circe = new Circe()

circe.use(Circe.bodyParser())

circe.use(async function (ctx, next) {
  console.log(ctx.request.body) // 从ctx.request.body获取到解析后的请求体
})
```

## 参数

### onError(err, ctx) 解析错误回调

### encoding 编码，默认为`'utf-8'`

### jsonLimit json限制，默认为`'1mb'`

### formLimit form限制，默认为`'56kb'`

### textLimit text限制， 默认为`'56kb'`

### multipart 是否开启multipart，默认为`false`

### formidable formidable参数，开启multipart才有效，默认为`{}`