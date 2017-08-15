/**
 * Azeroth - Decorators - Method
 *
 * @file method.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';
import {isController} from '../types';


const invokeMethod = (method, rule) => (target, name) => {
    if (!isController(target)) {
        throw new Error(`Decorator '${method.toUpperCase()}' only support Controller`);
    }

    const _classType = target.constructor;
    const handlerMapping = _classType[Symbol.for(method)] || [];

    if (_.isArray(rule) || _.isFunction(rule)) {
        handlerMapping.push({match: rule, key: name});
    } else if (_.isString(rule)) {
        handlerMapping.push({match: _.compact(rule.split('/')), key: name});
    } else {
        throw new Error(`Decorator \`${method}\` \`Rule\` must be String|Array|Func`);
    }

    _classType[Symbol.for(method)] = handlerMapping;

    return target[name];
};

export const PutMethod = rule => invokeMethod('PUT', rule);
export const GetMethod = rule => invokeMethod('GET', rule);
export const PostMethod = rule => invokeMethod('POST', rule);
export const DeleteMethod = rule => invokeMethod('DELETE', rule);
