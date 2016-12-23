const Circe = require('../../src/circe')

const router = new Circe.Router()

router.get('/articles', function (ctx) {
  ctx.body = {success: true}
})

module.exports = router
