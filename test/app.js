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

  it('circe.route(Router)', function (done) {
    const circe = new Circe()
    const router = new Circe.Router()
    circe.route(router)
    done()
  })

  it('circe.route(String)', function (done) {
    const circe = new Circe()
    circe.route('./apis')
    done()
  })

  it('circe.inject(Object, String)', function (done) {
    const circe = new Circe()

    circe.inject({a: 1, b: 2})
    expect(circe.context.a).to.equal(1)
    expect(circe.context.b).to.equal(2)

    circe.inject({a: 1, b: 2}, '$')
    expect(circe.context.$a).to.equal(1)
    expect(circe.context.$b).to.equal(2)

    circe.inject({a: 1, b: 2}, 'foo.bar.')
    expect(circe.context.foo.bar.a).to.equal(1)
    expect(circe.context.foo.bar.b).to.equal(2)

    circe.inject({a: 1, b: 2}, 'foo.bar.$')
    expect(circe.context.foo.bar.$a).to.equal(1)
    expect(circe.context.foo.bar.$b).to.equal(2)
    done()
  })

  it('circe.inject(name, value)', function (done) {
    const circe = new Circe()

    circe.inject('a', 1)
    circe.inject('b', 2)
    expect(circe.context.a).to.equal(1)
    expect(circe.context.b).to.equal(2)
    done()
  })
})
