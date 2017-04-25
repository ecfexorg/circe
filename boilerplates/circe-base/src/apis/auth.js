const Circe = require('circe')
const router = new Circe.Router()
const config = require('../config')

router.get('/auth', async (ctx) => {
  const user = {userid: 1, name: 'harrie'}
  const token = Circe.jwt.sign(user, config.app.secret)

  ctx.success({token})
})

module.exports = router
