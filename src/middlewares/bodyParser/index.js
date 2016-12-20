const parse = require('co-body')
const formidable = require('formidable')

module.exports = function bodyParser (options = {}) {
  const onError = options.onError
  const encoding = options.encoding || 'utf-8'
  const jsonLimit = options.jsonLimit || '1mb'
  const formLimit = options.formLimit || '56kb'
  const textLimit = options.textLimit || '56kb'
  const multipart = options.multipart || false
  const formidable = options.formidable || {}

  return function (ctx, next) {
    let promise
    try {
      if (ctx.is('json')) {
        promise = parse.json(ctx, {encoding, jsonLimit})
      } else if (ctx.is('urlencoded')) {
        promise = parse.form(ctx, {encoding, formLimit})
      } else if (ctx.is('text')) {
        promise = parse.text(ctx, {encoding, textLimit})
      } else if (multipart && ctx.is('multipart')) {
        promise = parseMultipart(ctx, formidable)
      }
      promise = promise || Promise.resolve({})
      return promise.then((body) => {
        ctx.request.body = body
        return next()
      })
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error, ctx)
      } else {
        throw error
      }
    }
  }
}

function parseMultipart (ctx, options) {
  return new Promise((resolve, reject) => {
    const fields = {}
    const files = {}
    const form = new formidable.IncomingForm(options)
    form
      .on('end', () => resolve({fields, files}))
      .on('error', (error) => reject(error))
      .on('field', (field, value) => { addTo(fields, field, value) })
      .on('file', function (field, file) { addTo(fields, field, file) })
    form.parse(ctx.req)
  })
}

function addTo (list, key, value) {
  if (list[key]) {
    if (Array.isArray(list[key])) {
      list[key].push(value)
    } else {
      list[key] = [list[key], value]
    }
  } else {
    list[key] = value
  }
}
