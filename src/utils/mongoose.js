/**
 * 根据数据库配置对象，生成连接字符串
 *
 * @param {any} config
 * {
 *   host: String | [String],
 *   name: String,
 *   username: String,
 *   password: String,
 *   option: String | [String]
 * }
 * @returns
 */
exports.createConnStr = function (config) {
  let {username, password, host, option, name} = config
  const auth = username && password ? `${username}:${password}@` : ''
  host = host instanceof Array ? host.join(',') : host
  option = option ? option instanceof Array ? option.join('&') : option : ''
  return `mongodb://${auth}${host}/${name}?${option}`
}
