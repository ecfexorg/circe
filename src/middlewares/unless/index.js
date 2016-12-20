const {parse} = require('url')

module.exports = function (options = {}) {
  const parent = this

  if (Array.isArray(options) || typeof options === 'string') options = {path: options}

  return function (ctx, next) {
    const url = parse(ctx.url, true)
    let skip = false

    const paths = ensureArray(options.path)

    if (paths) {
      skip = skip || paths.some((p) => {
        return (typeof p === 'string' && p === url.pathname) ||
          (p instanceof RegExp && p.test(url.pathname))
      })
    }

    const startWith = ensureArray(options.startWith)
    if (startWith) {
      skip = skip || skip.some((prefix) => url.pathname.startsWith(prefix))
    }

    const endWith = ensureArray(options.endWith)
    if (endWith) {
      skip = skip || skip.some((suffix) => url.pathname.endsWith(suffix))
    }

    const methods = ensureArray(options.method)
    if (methods) {
      skip = skip || methods.includes(ctx.methods)
    }

    if (skip) return next()
    return parent(ctx, next)
  }
}

function ensureArray (arr) {
  if (arr) return Array.isArray(arr) ? arr : [arr]
  return null
}
