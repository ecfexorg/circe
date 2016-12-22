const request = require('supertest')
const Circe = require('../../circe')

const app = require('./app')
const router = new Circe.Router()

router.get('/checkQuery', function (ctx, next) {
  const sortBy = ctx.checkQuery('sortBy').required().val
  const skip = ctx.checkQuery('skip').defaultTo(0).val
  const limit = ctx.checkQuery('limit').defaultTo(10).val

  ctx.body = {success: true, sortBy, skip, limit}
})

app.route(router)

describe('inline checkQuery', function (done) {
  it('respond 200', function (done) {
    request(app.listen())
      .get('/checkQuery')
      .query({sortBy: 'date'})
      .expect(200, {
        success: true,
        sortBy: 'date',
        skip: 0,
        limit: 10
      }, done)
  })

  it('respond 500', function (done) {
    request(app.listen())
      .get('/checkQuery')
      .expect(500, {
        success: false,
        msg: 'sortBy is required'
      }, done)
  })
})
