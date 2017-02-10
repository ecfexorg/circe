const request = require('supertest')
const expect = require('chai').expect
const Circe = require('../../circe')
const circe = new Circe()
const router = new Circe.Router()

circe.use(Circe.onError((err, ctx) => {
  ctx.status = 500
  ctx.body = err.message
}))

router.get('/error', function (ctx, next) {
  const value = undefined.value
  ctx.success({value})
})

circe.route(router)

describe('onError', function () {
  it('get error response', function (done) {
    request(circe.listen())
      .get('/error')
      .expect(500, 'Cannot read property \'value\' of undefined', done)
  })
})
