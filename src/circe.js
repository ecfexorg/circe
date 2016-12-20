const http = require('http')
const path = require('path')

const delegates = require('delegates')
const requireDir = require('require-dir')
const debug = require('debug')('circe:application')
const _ = require('lodash')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('./middlewares/bodyParser')
const checker = require('./middlewares/checker')

class Circe {
  /**
   * Creates an instance of Circe.
   *
   * @api public
   */
  constructor () {
    this.app = new Koa()
    this.server = http.createServer(this.app.callback())
  }

  /**
   * Start and listen on port
   *
   * @param {any} port
   * @param {any} callback
   *
   * @api public
   */
  listen (port, callback) {
    return this.server.listen.apply(this.server, arguments)
  }

  /**
   * Load routers
   *
   * @param {String|Router} arg
   * @returns instance
   *
   * @api public
   */
  route (arg) {
    if (arg instanceof Router) {
      this.use(arg.routes())
      this.use(arg.allowedMethods())
    } else if (typeof arg === 'string') {
      const apiDir = path.resolve(path.dirname(module.parent.filename), arg)
      debug('apis directory: %s', apiDir)
      const routers = requireDir(apiDir)
      for (let key in routers) {
        let router = routers[key]
        if (router instanceof Router) {
          this.use(router.routes())
          this.use(router.allowedMethods())
        }
      }
    } else {
      throw new Error('Can not load routes from: ' + arg)
    }
    return this
  }

  /**
   * Pass variables into app.context
   *
   * @param {Object} variables
   * @param {String} prefix
   * @returns instance
   *
   * @api public
   */
  inject (arg1, arg2) {
    if (typeof arg1 === 'object') {
      const services = arg1
      const prefix = typeof arg2 === 'string' ? arg2.trim() : ''
      for (let name in services) {
        debug('inject %j to context.%s', services[name], prefix + name)
        _.set(this.app.context, prefix + name, services[name])
      }
    } else if (arg1 && typeof arg1 === 'string' && arg2) {
      debug('inject %j to context.%s', arg2, arg1)
      _.set(this.app.context, arg1, arg2)
    }
    return this
  }
}

delegates(Circe.prototype, 'app')
  .method('use')
  .method('toJSON')
  .method('inspect')
  .method('on')
  .access('proxy')
  .access('middleware')
  .access('subdomainOffset')
  .access('env')
  .access('context')
  .access('request')
  .access('response')
  .access('keys')

Circe.Koa = Koa
Circe.Router = Router
Circe.bodyParser = bodyParser
Circe.checker = checker
Circe.prototype.Circe = Circe

module.exports = Circe
