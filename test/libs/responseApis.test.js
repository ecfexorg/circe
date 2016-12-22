const request = require('supertest')
const expect = require('chai').expect
const Circe = require('../circe')
const circe = new Circe()

circe.use(function (ctx) {
  switch (ctx.path) {
    case '/success/data':
      ctx.success({a: 1, b: 2})
      break
    case '/success/string':
      ctx.success('hello')
      break
    case '/fail/data':
      ctx.fail({a: 1, b: 2})
      break
    case '/fail/string':
      ctx.fail('hello')
      break
  }
})

describe('responseApis', function () {
  it('ctx.success&ctx.fail', function (done) {
    expect(circe.context.success).to.be.a('function')
    expect(circe.context.fail).to.be.a('function')
    done()
  })

  it('ctx.success(data)', function (done) {
    request(circe.listen())
      .get('/success/data')
      .expect(200, {success: true, a: 1, b: 2}, done)
  })

  it('ctx.success(string)', function (done) {
    request(circe.listen())
      .get('/success/string')
      .expect(200, {success: true, msg: 'hello'}, done)
  })

  it('ctx.success(data)', function (done) {
    request(circe.listen())
      .get('/fail/data')
      .expect(200, {success: false, a: 1, b: 2}, done)
  })

  it('ctx.success(string)', function (done) {
    request(circe.listen())
      .get('/fail/string')
      .expect(200, {success: false, msg: 'hello'}, done)
  })
})
