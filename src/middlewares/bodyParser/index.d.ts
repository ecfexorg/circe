import * as Koa from 'koa'

interface IBodyParserOptions {
  encoding?: string
  jsonLimit?: string
  formLimit?: string
  textLimit?: string
  multipart?: boolean
  formidable?: any
}

declare function bodyParser(options?: IBodyParserOptions): Koa.Middleware

declare namespace bodyParser {}

export = bodyParser
