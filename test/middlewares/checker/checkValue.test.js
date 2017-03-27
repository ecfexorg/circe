const request = require('supertest')
const Circe = require('../../circe')

const app = require('./app')
const router = new Circe.Router()

router.get('/checkValue', function (ctx, next) {
  const test = ctx.checkValue('    test    ').is('string').trim().val
  ctx.body = {success: true, test}
})

app.route(router)

describe('checkValue', function (done) {
  it('respond 200', function (done) {
    request(app.listen())
      .get('/checkValue')
      .expect(Object.assign({success: true, test: 'test'}), done)
  })
})
