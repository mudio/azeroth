'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _context = require('../context');

var _types = require('../types');

/**
 * InterceptorKeys Array<InterceptorName>           放置类装饰器
 * InterceptorKeys Object<Method, InterceptorName>  放置方法装饰器
 */
/**
 * Azeroth - Decorators - Interceptor
 *
 * @file interceptor.js
 * @author mudio(job.mudio@gmail.com)
 */

exports.default = (...args) => (target, name) => {
  const isFuncDecorator = !!name;

  if (isFuncDecorator || !(0, _types.isInterceptor)(target)) {
    throw new Error('Decorator `interceptor` only support IInterceptor,');
  }

  target[_types.InterceptorCategory] = args[0];

  (0, _context.registerInterceptor)(target);

  return target;
};