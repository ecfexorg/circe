import * as path from 'path'
import * as Bluebird from 'bluebird'
import * as _ from 'lodash'
import * as Circe from 'circe'
import config from './config'

global.Promise = Bluebird

const circe = new Circe()

circe.use(Circe.onError((err, ctx) => {
  ctx.status = 500
  ctx.body = process.env.NODE_ENV === 'development'
    ? err.message
    : 'Internal Server Error'
}))

circe.use(Circe.cors())
circe.use(Circe.logger())
circe.use(Circe.jwt({secret: config.app.secret}).unless({path: config.app.whitelist}))
circe.use(Circe.bodyParser())
circe.use(Circe.checker.init())
circe.use(Circe.checker.onError((err, ctx: IContext) => ctx.fail(err.message)))

circe.inject({
  $config: config,
  _
})

circe.route(path.resolve(__dirname, './apis'))

function run () {
  circe.listen(config.app.port, () => {
    console.log(config.app.name + ' listening at ' + config.app.port)
  })
}

export {
  circe,
  run
}
