const http = require('http')
const path = require('path')

const delegates = require('delegates')
const requireDir = require('require-dir')
const debug = require('debug')('circe:application')
const _ = require('lodash')

const Koa = require('koa')
const Router = require('koa-router')
const responseApis = require('./libs/responseApis')

class Circe {
  /**
   * Creates an instance of Circe.
   *
   * @api public
   */
  constructor () {
    this.app = new Koa()
    this.server = http.createServer(this.app.callback())
    this.context.success = responseApis.success
    this.context.fail = responseApis.fail
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
  route (arg, options) {
    options = options || {}
    const routers = []
    if (arg instanceof Router) {
      routers.push(arg)
    } else if (typeof arg === 'string') {
      let dir = arg
      if (dir.startsWith('.')) dir = path.resolve(Circe.__parentDir, arg)
      debug('apis directory: %s', dir)
      const modules = requireDir(dir)
      for (let key in modules) {
        let router = modules[key]
        if (!router) continue
        if (router instanceof Router) routers.push(router)
        else if (router.default instanceof Router) routers.push(router.default)
      }
    } else {
      throw new Error('Can not load routes from: ' + arg)
    }

    routers.forEach((router) => {
      if (typeof options.mount === 'string') {
        router.prefix(options.mount)
      }
      this.use(router.routes())
      this.use(router.allowedMethods())
    })

    return this
  }

  /**
   * Pass variables into app.context
   *
   * @param {Object} variables
   * @returns instance
   *
   * @api public
   */
  inject (arg1, arg2) {
    if (typeof arg1 === 'object') {
      const services = arg1
      for (let name in services) {
        debug('inject [%s] to context.%s', typeof services[name], name)
        _.set(this.app.context, name, services[name])
      }
    } else if (arg1 && typeof arg1 === 'string' && arg2) {
      debug('inject [%s] to context.%s', typeof arg2, arg1)
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

Circe.__parentDir = path.dirname(module.parent.filename)

module.exports = Circe
