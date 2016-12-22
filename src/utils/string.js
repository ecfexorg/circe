// 替换占位符
exports.format = function (str, ...args) {
  return args.reduce((str, arg, index) => {
    if (typeof arg === 'string') return str.replace(new RegExp('\\{' + index + '\\}'), arg)
    else if (typeof arg === 'object') {
      const props = Object.keys(arg)
      return props.reduce((str, prop) => {
        return str.replace(new RegExp('\\{' + prop + '\\}'), arg[prop])
      }, str)
    }
  }, str)
}
