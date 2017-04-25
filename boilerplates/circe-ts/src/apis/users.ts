import * as Circe from 'circe'
const router = new Circe.Router()

router.get('/users/loggined', async (ctx: IContext) => {
  const user = ctx.state.user

  ctx.success({user})
})

export default router
