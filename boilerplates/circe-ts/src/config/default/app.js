module.exports = {
  name: 'circe-ts',
  port: 8080,
  secret: 'JSOM_WEB_TOKEN_SECRET',
  whitelist: [
    /^\/auth/
  ]
}
