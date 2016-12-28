module.exports = function cors (options = {}) {
  const defaults = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE'
  }

  options = Object.assign({}, options, defaults)

  if (Array.isArray(options.exposeHeaders)) {
    options.exposeHeaders = options.exposeHeaders.join(',')
  }

  if (Array.isArray(options.allowMethods)) {
    options.allowMethods = options.allowMethods.join(',')
  }

  if (Array.isArray(options.allowHeaders)) {
    options.allowHeaders = options.allowHeaders.join(',')
  }

  if (options.maxAge) {
    options.maxAge = String(options.maxAge)
  }

  options.credentials = !!options.credentials

  return function middleware (ctx, next) {
    const requestOrigin = ctx.get('Origin') || ctx.origin

    if (!requestOrigin) return next()

    let origin = options.origin
                  ? typeof options.origin === 'function'
                  ? options.origin(ctx)
                  : options.origin
                  : requestOrigin

    if (ctx.method === 'OPTIONS') {
      // 找不到预请求方法，忽略
      if (!ctx.get('Access-Control-Request-Method')) return next()

      ctx.set('Access-Control-Allow-Origin', origin)

      if (origin !== '*') ctx.vary('Origin')

      if (options.allowMethods) {
        ctx.set('Access-Control-Allow-Methods', options.allowMethods)
      }

      if (options.maxAge) {
        ctx.set('Access-Control-Max-Age', options.maxAge)
      }

      if (options.credentials) {
        ctx.set('Access-Control-Allow-Credentials', 'true')
      }

      let allowHeaders = options.allowHeaders
      if (allowHeaders === undefined) {
        allowHeaders = ctx.get('Access-Control-Request-Headers')
      }
      ctx.set('Access-Control-Allow-Headers', allowHeaders)

      ctx.status = 204
    } else {
      ctx.set('Access-Control-Allow-Origin', origin)

      if (origin !== '*') ctx.vary('Origin')

      if (options.credentials) {
        ctx.set('Access-Control-Allow-Credentials', 'true')
      }

      if (options.exposeHeaders) {
        ctx.set('Access-Control-Expose-Headers', options.exposeHeaders)
      }

      return next()
    }
  }
}
