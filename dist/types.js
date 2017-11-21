'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasMethod = exports.MethodCategory = exports.hasRoute = exports.RouteKeys = exports.isInterceptor = exports.InterceptorCategory = exports.isController = exports.ControllerCategory = exports.isService = exports.ServiceCategory = exports.isMiddleware = exports.MiddlewareCategory = exports.InterceptorKeys = exports.ServiceKeys = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assertType = (_type, category) => {
    if (_lodash2.default.isFunction(_type)) {
        return category in _type;
    }

    return category in _type.constructor;
}; /**
    * Azeroth - Types
    *
    * @file types.js
    * @author mudio(job.mudio@gmail.com)
    */

const ServiceKeys = exports.ServiceKeys = Symbol.for('ServiceKeys');

const InterceptorKeys = exports.InterceptorKeys = Symbol.for('InterceptorKeys');

const MiddlewareCategory = exports.MiddlewareCategory = Symbol.for('MiddlewareCategory');
const isMiddleware = exports.isMiddleware = _type => assertType(_type, MiddlewareCategory);

const ServiceCategory = exports.ServiceCategory = Symbol.for('ServiceCategory');
const isService = exports.isService = _type => assertType(_type, ServiceCategory);

const ControllerCategory = exports.ControllerCategory = Symbol.for('ControllerCategory');
const isController = exports.isController = _type => assertType(_type, ControllerCategory);

const InterceptorCategory = exports.InterceptorCategory = Symbol.for('InterceptorCategory');
const isInterceptor = exports.isInterceptor = _type => assertType(_type, InterceptorCategory);

const RouteKeys = exports.RouteKeys = Symbol.for('RouteKeys');
const hasRoute = exports.hasRoute = _type => assertType(_type, RouteKeys);

const MethodCategory = exports.MethodCategory = Symbol.for('MethodCategory');
const hasMethod = exports.hasMethod = _type => assertType(_type, MethodCategory);