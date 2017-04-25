const test = require('ava')
const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')

let req
let token

test.before(t => {
  req = request(app.listen())
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsIm5hbWUiOiJoYXJyaWUiLCJpYXQiOjE0ODIzOTUwNjN9.kKeebGWSqhqGMcqKO1IQvbudW5A3dfHQX-VbpA6Bdak'
})

test('GET /auth', async (t) => {
  const res = await req
    .get('/auth')
    .expect(200)
  expect(res.body.token).to.be.a('string')
})

test('GET /users/loggined', async (t) => {
  const res = await req
    .get('/users/loggined')
    .set('authorization', `Bearer ${token}`)
    .expect(200)
  expect(res.body.user).to.be.a('object')
})
