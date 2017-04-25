const path = require('path')
const Circe = require('circe')

// 根据`process.env.NODE_ENV`读取配置文件，默认为`development`

module.exports = Circe.config.from(path.resolve(__dirname))
