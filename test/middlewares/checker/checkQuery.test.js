const request = require('supertest')
const Circe = require('../../circe')

const app = require('./app')
const router = new Circe.Router()

router.get('/checkQuery', Circe.checker({
  sortBy: (ctx) => ctx.checkQuery('sortBy').required(),
  skip: (ctx) => ctx.checkQuery('skip').defaultTo(0),
  limit: (ctx) => ctx.checkQuery('limit').defaultTo(10)
}), function (ctx, next) {
  const {sortBy, skip, limit} = ctx.vals
  ctx.body = {success: true, sortBy, skip, limit}
})

app.route(router)

describe('checkQuery', function (done) {
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
