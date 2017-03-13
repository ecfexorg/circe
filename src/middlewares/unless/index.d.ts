import * as Koa from 'koa'

type stringOrArray = string | string[]
type regexpOrArray = RegExp | RegExp[]

interface IUnlessOptions {
  path?: stringOrArray | regexpOrArray,
  startWith?: stringOrArray,
  endWith?: stringOrArray,
  method?: stringOrArray
}

declare function unless(options?: IUnlessOptions): Koa.Middleware

declare namespace unless {}

export = unless
