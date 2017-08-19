/**
 * Azeroth - Decorators - Controller
 *
 * @file controller.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';
import path from 'path';

import {RouteKeys} from '../types';
import {registerController} from '../context';

export default (rule = '/') => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Controller` only support classType');
    }

    /**
     * `Rule` String|Func
     */
    if (_.isFunction(rule)) {
        Constructor[RouteKeys] = rule;
    } else if (_.isString(rule)) {
        Constructor[RouteKeys] = path.normalize(rule);
    } else {
        throw new Error('Decorator `Controller` `Rule` must be String|Array|Func');
    }

    registerController(Constructor);

    return Constructor;
};
