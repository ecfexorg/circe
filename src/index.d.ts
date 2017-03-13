// Type definitions for Circe v1.x
// Project: http://git.oschina.net/hwhao/circe
// Definitions by: hwhao(varharrie) <https://github.com/varHarrie/>

/* =================== USAGE ===================
    import Circe from 'koa-router'
    const circe = new Circe()
 =============================================== */

/// <reference types="node" />

import {IncomingMessage, ServerResponse, Server} from 'http'
import {Socket, ListenOptions} from 'net'
import * as Keygrip from 'keygrip'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

import * as ResponseApis from './libs/responseApis'
import * as CirceConfig from './libs/config'
import * as CirceBodyParser from './middlewares/bodyParser'
import * as CirceChecker from './middlewares/checker'
import * as CirceCors from './middlewares/cors'
import * as CirceJwt from './middlewares/jwt'
import * as CirceUnless from './middlewares/unless'
import * as CirceOnError from './middlewares/onError'

declare class Circe extends Koa{
  app: Koa
  server: Server

  constructor()

  route (router: KoaRouter): void
  route (path: string): void
  inject (key: string, value:any): void
  inject (pairs: Object): void
}

declare namespace Circe {
  export interface IContext extends KoaRouter.IRouterContext, ResponseApis.IResponseApiContext, CirceChecker.ICheckerContext {
    [propName: string]: any
  }

  export function logger (options?: any): Koa.Middleware

  export {
    KoaRouter as Router,
    CirceConfig as config,
    CirceBodyParser as bodyParser,
    CirceChecker as checker,
    CirceCors as cors,
    CirceJwt as jwt,
    CirceUnless as unless,
    CirceOnError as onError
  }
}

export = Circe