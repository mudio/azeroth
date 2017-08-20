/**
 * Azeroth - Types
 *
 * @file types.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

const assertType = (_type, category) => {
    if (_.isFunction(_type)) {
        return category in _type;
    }

    return category in _type.constructor;
};

export const AutowiredKeys = Symbol.for('AutowiredKeys');

export const InterceptorKeys = Symbol.for('InterceptorKeys');

export const MiddlewareCategory = Symbol.for('MiddlewareCategory');
export const isMiddleware = _type => assertType(_type, MiddlewareCategory);

export const ServiceCategory = Symbol.for('ServiceCategory');
export const isService = _type => assertType(_type, ServiceCategory);

export const ControllerCategory = Symbol.for('ControllerCategory');
export const isController = _type => assertType(_type, ControllerCategory);

export const InterceptorCategory = Symbol.for('InterceptorCategory');
export const isInterceptor = _type => assertType(_type, InterceptorCategory);

export const RouteKeys = Symbol.for('RouteKeys');
export const hasRoute = _type => assertType(_type, RouteKeys);

export const MethodCategory = Symbol.for('MethodCategory');
export const hasMethod = _type => assertType(_type, MethodCategory);
