const path = require('path')
const expect = require('chai').expect
const Circe = require('../circe')

describe('config', function () {
  it('from --development', function (done) {
    const config = Circe.config.from(path.resolve(__dirname, 'config'))
    expect(config.app.appName).to.equal('test')
    expect(config.app.port).to.equal('80')
    done()
  })

  it('from --production', function (done) {
    process.env.NODE_ENV = 'production'
    const config = Circe.config.from(path.resolve(__dirname, 'config'))
    expect(config.app.appName).to.equal('demo')
    expect(config.app.port).to.equal('2333')
    expect(config.app.token).to.equal('tttt')
    done()
  })
})
