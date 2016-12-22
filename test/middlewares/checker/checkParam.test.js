const request = require('supertest')
const Circe = require('../../circe')

const app = require('./app')
const router = new Circe.Router()

router.get('/checkParam/:userid', Circe.checker({
  userid: (ctx) => ctx.checkParam('userid', true)
}), function (ctx, next) {
  const {userid} = ctx.vals
  ctx.body = {success: true, userid}
})

app.route(router)

describe('checkParam', function (done) {
  it('respond 200', function (done) {
    request(app.listen())
      .get('/checkParam/123')
      .expect(Object.assign({success: true, userid: 123}), done)
  })
})
