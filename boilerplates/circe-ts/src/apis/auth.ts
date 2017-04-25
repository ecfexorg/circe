import * as Circe from 'circe'
const router = new Circe.Router()

router.get('/auth', async (ctx: IContext) => {
  const user = { userid: 1, name: 'harrie' }
  const token = Circe.jwt.sign(user, ctx.$config.app.secret)

  ctx.success({token})
})

export default router
