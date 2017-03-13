import * as Koa from 'koa'

interface ICorsOptions {
  origin?: string | ((ctx: Koa.Context) => string)
  exposeHeaders?: string | string[]
  allowMethods?: string | string[]
  allowHeaders?: string | string[]
  credentials?: boolean,
  maxAge?: string | number
}

declare function cors(options?: ICorsOptions): Koa.Middleware

declare namespace cors {}

export = cors
