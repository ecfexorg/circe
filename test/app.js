const expect = require('chai').expect
const Circe = require('../src/circe.js')
const Koa = require('koa')
const http = require('http')

describe('Circe', function () {
  it('listen', function (done) {
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

  it('delegates', function (done) {
    const circe = new Circe()
    circe.context.a = '1'
    circe.context.b = '2'
    expect(circe.app.context.a).to.equal('1')
    expect(circe.app.context.b).to.equal('2')
    expect(circe.use).to.be.a('function')
    expect(circe.toJSON).to.be.a('function')
    expect(circe.inspect).to.be.a('function')
    done()
  })
})
