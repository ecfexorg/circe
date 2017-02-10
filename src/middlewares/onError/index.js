module.exports = function onError (handler) {
  return function middleware (ctx, next) {
    return next().catch((err) => {
      if (typeof handler === 'function') handler(err, ctx)
      else throw err
    })
  }
}
