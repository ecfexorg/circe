const request = require('supertest')
const expect = require('chai').expect
const Circe = require('../../circe')
const circe = new Circe()
const router = new Circe.Router()

const user = {userid: 10000, username: 'harrie'}
const secret = 'SECRET'
let token

circe.use(function (ctx, next) {
  return next().catch((err) => {
    ctx.status = 500
    ctx.body = err.message
  })
})

circe.use(Circe.jwt({secret}).unless('/token'))

router.get('/token', function (ctx, next) {
  return Circe.jwt.signAsync(user, secret).then((token) => {
    ctx.body = {token}
  })
})

router.get('/users/loggined', function (ctx, next) {
  const user = ctx.state.user
  ctx.body = user
})

circe.route(router)

describe('jwt', function () {
  it('signAsync()', function (done) {
    request(circe.listen())
      .get('/token')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.token).to.be.a('string')
        token = res.body.token
        done()
      })
  })

  it('can\'t found authorization header', function (done) {
    request(circe.listen())
      .get('/users/loggined')
      .expect(500, 'can\'t find authorization header', done)
  })

  it('bad authorization header format', function (done) {
    request(circe.listen())
      .get('/users/loggined')
      .set('authorization', `BADDDDDDDDDDDDBearer ${token}`)
      .expect(500, 'Authorization header format is "Authorization: Bearer token"', done)
  })

  it('success', function (done) {
    request(circe.listen())
      .get('/users/loggined')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.userid).to.equal(user.userid)
        expect(res.body.username).to.equal(user.username)
        done()
      })
  })
})
