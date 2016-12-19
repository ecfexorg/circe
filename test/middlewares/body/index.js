const request = require('supertest')
// const expect = require('chai').expect
const Circe = require('../../../src/circe')

const circe = new Circe()
circe.use(Circe.body())
circe.use(function (ctx) {
  ctx.body = ctx.request.body
})

describe('body parser', function () {
  it('get json', function (done) {
    request(circe.listen())
      .get('/')
      .type('application/json')
      .send({type: 'json'})
      .expect(200, {type: 'json'}, done)
  })

  it('post json', function (done) {
    request(circe.listen())
      .post('/')
      .type('application/json')
      .send({type: 'json'})
      .expect(200, {type: 'json'}, done)
  })

  it('get urlencoded', function (done) {
    request(circe.listen())
      .get('/')
      .type('application/x-www-form-urlencoded')
      .send({type: 'urlencoded'})
      .expect(200, {type: 'urlencoded'}, done)
  })

  it('post urlencoded', function (done) {
    request(circe.listen())
      .post('/')
      .type('application/x-www-form-urlencoded')
      .send({type: 'urlencoded'})
      .expect(200, {type: 'urlencoded'}, done)
  })

  it('get text', function (done) {
    request(circe.listen())
      .get('/')
      .type('text')
      .send('text data')
      .expect(200, 'text data', done)
  })

  it('post text', function (done) {
    request(circe.listen())
      .post('/')
      .type('text')
      .send('text data')
      .expect(200, 'text data', done)
  })
})