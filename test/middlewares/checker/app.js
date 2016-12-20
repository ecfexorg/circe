const Circe = require('../../circe')

const app = new Circe()
app.use(Circe.bodyParser())
app.use(Circe.checker.init())
app.use(Circe.checker.onError(function (err, ctx) {
  ctx.status = 500
  ctx.body = {success: false, msg: err.message}
}))

module.exports = app
