const Circe = require('../../src/circe')

const router = new Circe.Router()

router.get('/users', function (ctx) {
  ctx.body = {success: true}
})

module.exports.default = router
