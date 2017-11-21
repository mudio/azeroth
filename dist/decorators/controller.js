'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _types = require('../types');

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Azeroth - Decorators - Controller
 *
 * @file controller.js
 * @author mudio(job.mudio@gmail.com)
 */

exports.default = (rule = '/') => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Controller` only support classType');
    }

    /**
     * `Rule` String|Func
     */
    if (_lodash2.default.isFunction(rule)) {
        Constructor[_types.RouteKeys] = rule;
    } else if (_lodash2.default.isString(rule)) {
        Constructor[_types.RouteKeys] = _path2.default.normalize(rule);
    } else {
        throw new Error('Decorator `Controller` `Rule` must be String|Array|Func');
    }

    (0, _context.registerController)(Constructor);

    return Constructor;
};