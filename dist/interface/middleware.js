'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _class, _temp; /**
                    * Azeroth - Interface - Middleware
                    *
                    * using "plugins" known as middleware
                    *
                    * @file Middleware.js
                    * @author mudio(job.mudio@gmail.com)
                    */

var _types = require('../types');

let IMiddleware = (_temp = _class = class IMiddleware {

    static invoke(req, res, next) {
        return next();
    }
}, _class[_types.MiddlewareCategory] = true, _temp);
exports.default = IMiddleware;