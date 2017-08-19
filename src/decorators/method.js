/**
 * Azeroth - Decorators - Method
 *
 * @file method.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';
import path from 'path';
import {isController} from '../types';

const invokeMethod = (method, rule) => (target, name, descriptor) => {
    const _classType = target.constructor;
    /**
     * handlerMapping Array<String, Any>
     */
    const handlerMapping = _classType[Symbol.for(method)] || [];

    if (!isController(_classType)) {
        throw new Error(`Decorator '${method.toUpperCase()}' only support Controller`);
    }

    if (_.isFunction(rule)) {
        handlerMapping.push([name, {match: rule}]);
    } else if (_.isString(rule)) {
        handlerMapping.push([name, {match: path.normalize(rule)}]);
    } else {
        throw new Error(`Decorator \`${method}\` \`Rule\` must be String|Array|Func`);
    }

    _classType[Symbol.for(method)] = handlerMapping;

    return descriptor;
};

export const PutMethod = rule => invokeMethod('PUT', rule);
export const GetMethod = rule => invokeMethod('GET', rule);
export const PostMethod = rule => invokeMethod('POST', rule);
export const DeleteMethod = rule => invokeMethod('DELETE', rule);
