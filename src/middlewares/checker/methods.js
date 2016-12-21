const assert = require('better-assert')
const _ = require('lodash')

// built-in methods
module.exports = exports = {
  'is' (type, tip) {
    this.type = type
    switch (type) {
      case 'string':
        this.throwIfNot(_.isString(this.val), tip || this.key + 'must be a string')
        break
      case 'object':
        this.throwIfNot(_.isObject(this.val), tip || this.key + 'must be an object')
        break
      case 'number':
        this.throwIfNot(_.isNumber(this.val), tip || this.key + ' must be a number')
        break
      case 'array':
        this.throwIfNot(_.isArray(this.val), tip || this.key + ' must be an array')
        break
      case 'date':
        this.throwIfNot(_.isDate(this.val), tip || this.key + ' must be a Date object')
        break
      default:
        throw new Error('Not support for type:' + type)
    }
    return this
  },
  'optional' () {
    this._optional = true
    return this
  },
  'required' (tip) {
    this.throwIf(_.isUndefined(this.val), tip || this.key + ' is required')
    return this
  },
  'defaultTo' (defaultVal) {
    if (_.isUndefined(this.val)) this.val = defaultVal
    return this
  },
  'eq' (otherVal, tip) {
    this.throwIfNot(_.isEqual(this.val, otherVal) || this.key + ' must be equal to ' + otherVal)
    return this
  },
  'neq' (otherVal, tip) {
    this.throwIf(_.isEqual(this.val, otherVal), tip || this.key + ' must be not equal to ' + otherVal)
    return this
  },
  // array /////////////////////////////////
  'toArray' () {
    this.defaultTo([])
    this.val = _.isArray(this.val) ? this.val : [this.val]
    return this
  },
  'in' (array, tip) {
    assert(_.isArray(array))
    this.throwIfNot(array.includes(this.val), tip || 'the value of ' + this.key + ' is not supported')
    return this
  },
  'notIn' (array, tip) {
    assert(_.isArray(array))
    this.throwIf(array.includes(this.val), tip || 'the value of ' + this.key + ' is not supported')
    return this
  },
  'uniq' () {
    assert(_.isArray(this.val))
    this.val = _.uniq(this.val)
    return this
  },
  'isLength' (min, max, tip) {
    assert(_.isArray(this.val))
    this.throwIfNot(_.inRange(this.val.length, min, max), tip)
    return this
  },
  // number /////////////////////////////////
  'toNumber' (defaultVal) {
    try {
      this.val = Number(this.val)
    } catch (error) {
      if (defaultVal === undefined) this.throw(error.message)
      else this.val = defaultVal
    }
    return this
  },
  'gt' (otherVal, tip) {
    this.throwIfNot(_.gt(this.val, otherVal))
    return this
  },
  'gte' (otherVal, tip) {
    this.throwIfNot(_.gte(this.val, otherVal))
    return this
  },
  'lt' (otherVal, tip) {
    this.throwIfNot(_.lt(this.val, otherVal))
    return this
  },
  'lte' (otherVal, tip) {
    this.throwIfNot(_.lte(this.val, otherVal))
    return this
  },
  'inRange' (min, max, tip) {
    this.throwIfNot(_.inRange(this.val, min, max), tip)
    return this
  },
  // string /////////////////////////////////
  'toString' () {
    this.val = this.val.toString()
    return this
  },
  'trim' () {
    this.is('string')
    this.val = this.val.trim()
    return this
  },
  'notEmpty' (trim, tip) {
    this.is('string')
    if (trim) this.val = this.val.trim()
    this.neq('', tip)
    return this
  }
}
