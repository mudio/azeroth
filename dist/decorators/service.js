'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = require('../types');

var _context = require('../context');

/**
 * Azeroth - Decorators - Service
 *
 * @file Service.js
 * @author mudio(job.mudio@gmail.com)
 */

exports.default = serviceName => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Middleware` only support classType');
    }

    Constructor[_types.ServiceCategory] = serviceName;

    (0, _context.registerService)(Constructor);

    return Constructor;
};