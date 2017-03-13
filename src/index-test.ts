import * as Circe from '.'

const config: Object = Circe.config.from('someDir')

const circe = new Circe()

circe.use(Circe.bodyParser())
circe.use(Circe.bodyParser({}))
circe.use(Circe.bodyParser({
  encoding: '',
  jsonLimit: '',
  formLimit: '',
  textLimit: '',
  multipart: true,
  formidable: {},
}))

circe.use(Circe.checker.onError((err, ctx: Circe.IContext) => {
  ctx.fail(err.message)
}))
circe.use(Circe.checker.init())
circe.use(Circe.checker.init({}))
circe.use(Circe.checker.init({
  getQuery: (ctx) => ctx.query,
  getParams: (ctx: Circe.Router.IRouterContext) => ctx.params,
  getBody: (ctx) => ctx.body
}))

const testRouter = new Circe.Router()

circe.route(testRouter) 
circe.route(testRouter, {mount: '/v1'}) 
circe.route(__dirname + '/apis')
circe.route(__dirname + '/apis', {mount: '/v2'})

const router = new Circe.Router()

router.get('', async (ctx: Circe.IContext) => {
  ctx.success()
  ctx.success({a: 1, b: 2})
  ctx.success({a: 1, b: 2}, 200)
  ctx.fail()
  ctx.fail('lala')
  ctx.fail('lalal', 400)
})

router.get('', Circe.checker({
  a: (ctx) => ctx.checkBody('a'),
  b: (ctx) => ctx.checkParam('b'),
  c: (ctx) => ctx.checkBody('c')
}),
async (ctx: Circe.IContext) => {
  ctx.vals
  ctx.validators
  ctx.checkQuery('a').optional().is('string', '必须为字符串')
  ctx.checkParam('b').required().eq('1').val
  ctx.checkBody('c', true).key
})

Circe.checker.Validator.addMethod('a', (tip) => {
  this.key
  this.val = 'aaa'
  return this
})

circe.use(Circe.cors())
circe.use(Circe.cors({}))
circe.use(Circe.cors({
  origin: '',
  exposeHeaders: '',
  allowMethods: '',
  allowHeaders: '',
  credentials: false,
  maxAge: ''
}))

circe.use(Circe.jwt({secret: 'SECRET'}))
circe.use(Circe.jwt({secret: 'SECRET', key: 'user'}))
circe.use(Circe.jwt({secret: 'SECRET'}).unless())
circe.use(Circe.jwt({secret: 'SECRET'}).unless({
  path: '/',
  startWith: '/a',
  endWith: 'asd',
  method: 'get'
}))


circe.use(Circe.onError((err, ctx) => {
  ctx.body = err.message
}))

circe.use(Circe.logger())
