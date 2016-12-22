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
    const accessToken = resolveHeader(ctx)
    return verifyAsync(accessToken, secret).then((decodedToken) => {
      ctx.state = ctx.state || {}
      ctx.state[key] = decodedToken
      ctx.state.jwtToken = accessToken
    }).catch((err) => {
      ctx.throw(401, `Invalid token - ${err.message}`)
    }).then(() => next())
  }

  middleware.unless = unless
  return middleware
}

function resolveHeader (ctx) {
  if (!ctx.header || !ctx.header.authorization) {
    throw new Error('can\'t find authorization header')
  }
  const parts = ctx.header.authorization.split(' ')
  if (parts.length === 2) {
    const [scheme, credentials] = parts
    if (/^Bearer$/i.test(scheme)) return credentials
  }
  throw new Error('Authorization header format is "Authorization: Bearer token"')
}

jwt.sign = sign
jwt.signAsync = signAsync
jwt.verify = verify
jwt.verifyAsync = verifyAsync
jwt.decode = decode

module.exports = jwt
