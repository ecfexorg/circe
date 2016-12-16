const expect = require('chai').expect
const Circe = require('../src/circe.js')
const Koa = require('koa')
const http = require('http')

describe('Circe', function () {
  it('new Circe', function (done) {
    const circe = new Circe()
    circe.listen(8080, (err) => {
      if (err) return done(err)
      expect(circe).to.be.instanceof(Circe)
      expect(circe.app).to.be.instanceof(Koa)
      expect(circe.server).to.be.instanceof(http.Server)
      expect(circe.server.listening).to.be.true
      done()
    })
  })
})
