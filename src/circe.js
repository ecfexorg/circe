const http = require('http')
const Koa = require('koa')
const Router = require('koa-router')

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
    this.server.listen.apply(this.server, arguments)
  }
}

Circe.Koa = Koa
Circe.Router = Router

module.exports = Circe
