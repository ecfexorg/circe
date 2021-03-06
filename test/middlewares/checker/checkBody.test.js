const request = require('supertest')
const Circe = require('../../circe')

const app = require('./app')
const router = new Circe.Router()

router.get('/checkBody', Circe.checker({
  username: (ctx) => ctx.checkBody('username').is('string'),
  age: (ctx) => ctx.checkBody('age').is('number'),
  hobby: (ctx) => ctx.checkBody('hobby').is('array')
}), function (ctx, next) {
  const data = ctx.vals
  ctx.body = {success: true, data}
})

app.route(router)

describe('checkBody', function (done) {
  it('respond 200', function (done) {
    const data = {
      username: 'harrie',
      age: 8,
      hobby: ['painting']
    }
    request(app.listen())
      .get('/checkBody')
      .send(data)
      .expect(Object.assign({success: true, data}), done)
  })

  it('respond 500', function (done) {
    request(app.listen())
      .get('/checkBody')
      .expect(500, {
        success: false,
        msg: 'username is required'
      }, done)
  })
})
