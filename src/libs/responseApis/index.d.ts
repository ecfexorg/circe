export interface IBodyObject {
  success: Boolean
}

export interface IResponseApiContext {
  success(): IBodyObject
  success(data: any): IBodyObject
  success(data: any, code: any): IBodyObject
  fail(): IBodyObject
  fail(data: any): IBodyObject
  fail(data: any, code: any): IBodyObject
}

export function success(): IBodyObject
export function success(data: any): IBodyObject
export function success(data: any, code: any): IBodyObject
export function fail(): IBodyObject
export function fail(data: any): IBodyObject
export function fail(data: any, code: any): IBodyObject
