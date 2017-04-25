const Circe = require('circe')
const router = new Circe.Router()

router.get('/users/loggined', async (ctx) => {
  const user = ctx.state.user

  ctx.success({user})
})

module.exports = router
