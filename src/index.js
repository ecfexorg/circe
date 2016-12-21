const path = require('path')
const Circe = require('./circe')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('./middlewares/bodyParser')
const checker = require('./middlewares/checker')
const jwtVerifier = require('./middlewares/jwtVerifier')
const unless = require('./middlewares/unless')

Circe.prototype.Circe = Circe
Circe.__parentDir = path.dirname(module.parent.filename)
Circe.Koa = Koa
Circe.Router = Router
Circe.bodyParser = bodyParser
Circe.checker = checker
Circe.jwtVerifier = jwtVerifier
Circe.unless = unless

module.exports = Circe
