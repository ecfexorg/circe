# Circe.jwt

## 使用方法

基于[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)，详细参数说明请参考官方文档

```javascript
const Circe = require('circe')
const circe = new Circe()

// 添加中间件
circe.use(Circe.jwt({
  secret: 'SECRET'
}))

rouer.get('/users'), async (ctx) => {
  const user = ctx.state.user
  // ...
})
```

## 参数

- secret 秘钥，必须
- key 解密后存放在state的属性名，默认为`user`

## API

- [jwt.sign(payload, secret[, options, callback])](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) 签名
- jwt.signAsync(payload, secret[, options]) 同上，返回promise
- [jwt.verify(token, secret[, options, callback])](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) 解码并校验
- jwt.verifyAsync(token, secret[, options]) 同上，返回promise
- [jwt.decode(token[, options])](https://github.com/auth0/node-jsonwebtoken#jwtdecodetoken--options) 解码但不校验

inspired by [koa-jsonwebtoken](https://github.com/f0rr0/koa-jsonwebtoken)