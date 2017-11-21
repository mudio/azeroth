'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeleteMethod = exports.PostMethod = exports.GetMethod = exports.PutMethod = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const invokeMethod = (method, rule) => (target, name, descriptor) => {
    const _classType = target.constructor;
    /**
     * handlerMapping Array<String, Any>
     */
    const handlerMapping = _classType[Symbol.for(method)] || [];

    if (!(0, _types.isController)(_classType)) {
        throw new Error(`Decorator '${method.toUpperCase()}' only support Controller`);
    }

    if (_lodash2.default.isFunction(rule)) {
        handlerMapping.push([name, { match: rule }]);
    } else if (_lodash2.default.isString(rule)) {
        handlerMapping.push([name, { match: _path2.default.normalize(rule) }]);
    } else {
        throw new Error(`Decorator \`${method}\` \`Rule\` must be String|Array|Func`);
    }

    _classType[Symbol.for(method)] = handlerMapping;

    return descriptor;
}; /**
    * Azeroth - Decorators - Method
    *
    * @file method.js
    * @author mudio(job.mudio@gmail.com)
    */

const PutMethod = exports.PutMethod = rule => invokeMethod('PUT', rule);
const GetMethod = exports.GetMethod = rule => invokeMethod('GET', rule);
const PostMethod = exports.PostMethod = rule => invokeMethod('POST', rule);
const DeleteMethod = exports.DeleteMethod = rule => invokeMethod('DELETE', rule);