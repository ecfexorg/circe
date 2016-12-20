const Validator = require('./validator')
const ValidationError = require('./validationError')
const errorMiddleware = require('./errorMiddleware')

let _options = {
  getQuery: (ctx) => ctx.query,
  getParams: (ctx) => ctx.params,
  getBody: (ctx) => ctx.request.body
}

function checkValue (val, required) {
  return Validator.create('value', null, val, required)
}

function checkQuery (key, required) {
  return Validator.create('query', key, _options.getQuery(this)[key], required)
}

function checkParam (key, required) {
  return Validator.create('param', key, _options.getParams(this)[key], required)
}

function checkBody (key, required) {
  return Validator.create('body', key, _options.getBody(this)[key], required)
}

function checker (handlers) {
  const checkerMiddleware = function (ctx, next) {
    const validators = ctx.validators = {}
    const vals = ctx.vals = {}

    if (handlers !== undefined) {
      for (let key in handlers) {
        const validator = handlers[key](ctx)
        if (validator instanceof Validator) {
          validators[key] = validator
          vals[key] = validator.val
        } else {
          vals[key] = validator
        }
      }
    }

    return next()
  }

  return checkerMiddleware
}

checker.init = function (options) {
  if (options) Object.assign(_options, options)

  return function (ctx, next) {
    ctx.checkValue = checkValue
    ctx.checkQuery = checkQuery
    ctx.checkParam = checkParam
    ctx.checkBody = checkBody
    return next()
  }
}

checker.Validator = Validator
checker.ValidationError = ValidationError
checker.onError = errorMiddleware

module.exports = exports = checker
