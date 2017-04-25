import {expect} from 'chai'
import * as request from 'supertest'
import {circe as app} from '../app'

describe('apis' , () => {
  let req
  let token

  before(() => {
    req = request(app.listen())
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsIm5hbWUiOiJoYXJyaWUiLCJpYXQiOjE0ODIzOTUwNjN9.kKeebGWSqhqGMcqKO1IQvbudW5A3dfHQX-VbpA6Bdak'
  })

  it('/users/loggined', (done) => {
    req
      .get('/auth')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.token).to.be.a('string')
        done()
      })
  })

  it('/users/loggined', (done) => {
    req
      .get('/users/loggined')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.user).to.be.a('object')
        done()
      })
  })
})
