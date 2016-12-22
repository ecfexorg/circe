/**
 * 封装响应体
 *
 * @param {Boolean} success
 * @param {Object|String} data
 * @param {Number|String} code
 * @returns {Object}
 */
function packBody (success, data, code) {
  let res = {success, code}
  if (typeof data === 'string') res.msg = data
  else if (typeof data === 'object') res = Object.assign(res, data)
  return res
}

/**
 * 处理成功形式的响应体
 *
 * @param {Object|String} data
 * @param {Number|String} code
 * @returns {Object}
 */
function success (data, code) {
  return (this.response.body = packBody(true, data, code))
}

/**
 * 处理错误形式的响应体
 *
 * @param {Object|String} data
 * @param {Number|String} code
 * @returns {Object}
 */
function fail (msg, code) {
  return (this.response.body = packBody(false, msg, code))
}

module.exports = {success, fail}
