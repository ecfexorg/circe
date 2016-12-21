# Circe.cors

## 使用方法

```javascript
const Circe = require('circe')
const circe = new Circe()

// 添加中间件
circe.use(Circe.cors(/* 参数 */))
```

## 参数

- origin {String|Function(ctx)} `Access-Control-Allow-Origin`，默认`*`
- exposeHeaders {String|Array} `Access-Control-Expose-Headers`
- allowMethods {String|Array} `Access-Control-Allow-Methods`，默认`GET,HEAD,PUT,POST,DELETE`
- allowHeaders {String|Array} `Access-Control-Allow-Headers`
- credentials {Boolean} `Access-Control-Allow-Credentials`
- maxAge {String|Number} `Access-Control-Max-Age`

inspired by [kcors](https://github.com/koajs/cors/tree/v2.x)