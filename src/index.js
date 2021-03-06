const path = require('path')
const Circe = require('./circe')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('./middlewares/bodyParser')
const checker = require('./middlewares/checker')
const jwt = require('./middlewares/jwt')
const unless = require('./middlewares/unless')
const cors = require('./middlewares/cors')
const onError = require('./middlewares/onError')
const logger = require('concurrency-logger').default
const config = require('./libs/config')

Circe.prototype.Circe = Circe
Circe.__parentDir = path.dirname(module.parent.filename)
Circe.Koa = Koa
Circe.Router = Router
Circe.bodyParser = bodyParser
Circe.checker = checker
Circe.jwt = jwt
Circe.unless = unless
Circe.cors = cors
Circe.onError = onError
Circe.logger = logger
Circe.config = config

module.exports = Circe
module.exports.default = Circe
