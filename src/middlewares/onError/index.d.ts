import * as Koa from 'koa'

interface IHandler {
  (err: Error, ctx: Koa.Context): void
}

declare function onError(handler: IHandler): Koa.Middleware

declare namespace onError {}

export = onError
