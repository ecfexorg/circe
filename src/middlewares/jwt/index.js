const {sign, verify, decode} = require('jsonwebtoken')
const unless = require('../unless')

const signAsync = function (payload, secret, options = {}) {
  return new Promise((resolve, reject) => {
    sign(payload, secret, options, function (err, token) {
      if (err) reject(err)
      else resolve(token)
    })
  })
}

const verifyAsync = function (accessToken, secret, options = {}) {
  return new Promise((resolve, reject) => {
    verify(accessToken, secret, options, function (err, decodedToken) {
      if (err) reject(err)
      else resolve(decodedToken)
    })
  })
}

function jwt (options = {}) {
  if (!options.secret) throw new Error('missing secret')

  const secret = options.secret
  const key = options.key || 'user'

  function middleware (ctx, next) {
    return resolveHeader(ctx).then((accessToken) => {
      ctx.state = ctx.state || {}
      ctx.state.jwtToken = accessToken
      return verifyAsync(accessToken, secret)
    }).then((decodedToken) => {
      ctx.state[key] = decodedToken
      return next()
    }, (err) => {
      ctx.status = 401
      ctx.body = `Invalid token - ${err.message}`
    })
  }

  middleware.unless = unless
  return middleware
}

function resolveHeader (ctx) {
  return new Promise((resolve, reject) => {
    if (!ctx.header || !ctx.header.authorization) {
      reject(new Error('can\'t find authorization header'))
    } else {
      const parts = ctx.header.authorization.split(' ')
      if (parts.length === 2) {
        const [scheme, credentials] = parts
        if (/^Bearer$/i.test(scheme)) resolve(credentials)
        else reject(new Error('Authorization header format is "Authorization: Bearer token"'))
      } else {
        reject(new Error('Authorization header format is "Authorization: Bearer token"'))
      }
    }
  })
}

jwt.sign = sign
jwt.signAsync = signAsync
jwt.verify = verify
jwt.verifyAsync = verifyAsync
jwt.decode = decode

module.exports = jwt
