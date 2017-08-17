/**
 * Azeroth - index
 *
 * @file index.js
 * @author mudio(job.mudio@gmail.com)
 */

import Runtime from './runtime';
import * as _types from './types';
import pkg from '../package.json';
import * as _httpCode from './httpcode';
import Service from './interface/service';
import * as _decorators from './decorators';
import Controller from './interface/controller';
import Middleware from './interface/middleware';
import Interceptor from './interface/interceptor';

export const types = _types;
export const httpcode = _httpCode;
export const IController = Controller;
export const IMiddleware = Middleware;
export const IInterceptor = Interceptor;
export const IService = Service;
export const decorators = _decorators;

export const runServer = (port, option = {}) => {
    const _runtime = new Runtime(option);

    return _runtime.run().then(server => server.listen(port));
};

export const version = pkg.version;
