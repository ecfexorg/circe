import * as Koa from 'koa'
import * as unless from '../unless'

interface IJwtOptions {
  secret: string,
  key?: string
}

interface IJwtMiddleware extends Koa.Middleware {
  unless: typeof unless
}

declare function jwt(options: IJwtOptions): IJwtMiddleware

declare namespace jwt {
  export function sign(payload: any, secret: string, options?: any, callback?: any): string

  export function signAsync(payload: any, secret: string, options?: any): Promise<any>

  export function verify(token: string, secret: string, options?: any, callback?: any): any

  export function verifyAsync(token: string, secret: string, options?: any): Promise<any>

  export function decode (token: string, options?: any): any
}

export = jwt
