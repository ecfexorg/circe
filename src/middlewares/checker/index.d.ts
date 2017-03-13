import * as Koa from 'koa'

declare namespace checker {
  interface ICheckerOptions {
    getQuery?(ctx: Koa.Context): any
    getParams?(ctx: Koa.Context): any
    getBody?(ctx: Koa.Context): any
  }

  interface ICheckers {
    [prop: string]: (ctx: ICheckerContext) => Validator
  }

  export function init(options?: ICheckerOptions): Koa.Middleware

  export interface ICheckerContext {
    vals: any
    validators: any
    checkValue(value: any, required?: boolean): Validator
    checkQuery(name: string, required?: boolean): Validator
    checkParam(name: string, required?: boolean): Validator
    checkBody(name: string, required?: boolean): Validator
  }

  export class Validator {
    key: string
    val: any
    is(type: string, tip?: string): Validator
    optional(): Validator
    required(tip?: string): Validator
    defaultTo(defaultVal: any): Validator
    eq(otherVal: any, tip?: string): Validator
    neq(otherVal: any, tip?: string): Validator
    toArray(): Validator
    in(array, tip?: string): Validator
    notIn(array, tip?: string): Validator
    uniq(): Validator
    isLength(min, max, tip?: string): Validator
    toNumber (defaultVal): Validator
    gt(otherVal, tip?: string): Validator
    gte(otherVal, tip?: string): Validator
    lt(otherVal, tip?: string): Validator
    lte(otherVal, tip?: string): Validator
    inRange(min, max, tip?: string): Validator
    toString(): Validator
    trim(): Validator
    notEmpty(trim, tip?: string): Validator
    match(regExp: RegExp, tip?: string): Validator

    [propName: string]: any

    static addMethod(name: string, method: (...args) => Validator): void
  }

  export class ValidationError extends Error{
    name: string
    key: string
    message: string
  }

  export function onError(handler: (err: ValidationError, ctx: Koa.Context) => void): Koa.Middleware
}

declare function checker(checkers: checker.ICheckers): Koa.Middleware

export = checker
