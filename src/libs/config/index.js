const fs = require('fs')
const path = require('path')
const debug = require('debug')('circe:config')
const requireDir = require('require-dir')
const _ = require('lodash')

function isDirectory (dir) {
  try {
    const stat = fs.statSync(dir)
    return stat.isDirectory()
  } catch (err) {
    return false
  }
}

function requirePath (p) {
  try {
    if (isDirectory(p)) return requireDir(p, {recurse: true})
    else return require(p)
  } catch (err) {
    return undefined
  }
}

exports.from = function (dir) {
  debug(process.env.NODE_ENV)
  const env = process.env.NODE_ENV || 'development'
  if (!dir || !isDirectory(dir)) throw new Error('Directory must be specified.')

  const defaultPath = path.join(dir, 'default')
  const envPath = path.join(dir, env)

  const defaultConfig = requirePath(defaultPath)
  const envConfig = requirePath(envPath)

  return _.defaultsDeep(envConfig, defaultConfig, {})
}
