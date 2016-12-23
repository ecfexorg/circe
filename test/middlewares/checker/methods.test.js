const request = require('supertest')
const Circe = require('../../circe')

const app = require('./app')
const router = new Circe.Router()

app.route(router)

describe('methods', function (done) {
  it('', function (done) {
  })
})
