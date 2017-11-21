'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = require('../types');

var _context = require('../context');

/**
 * Azeroth - Decorators - Middleware
 *
 * @file Middleware.js
 * @author mudio(job.mudio@gmail.com)
 */

exports.default = (...args) => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Middleware` only support classType');
    }

    Constructor[_types.MiddlewareCategory] = args;

    (0, _context.registerMiddleware)(Constructor);

    return Constructor;
};