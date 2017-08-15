/**
 * Azeroth - Decorators - Controller
 *
 * @file controller.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import {
    RouteCategory,
    ControllerCategory,
} from '../types';


export default (rule = '/') => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Controller` only support classType');
    }

    /**
     * `Rule` String|Array<String>|Func
     *
     * 最终以`Array<String>|Func`形式保存
     */
    if (_.isArray(rule) || _.isFunction(rule)) {
        Constructor[RouteCategory] = rule;
    } else if (_.isString(rule)) {
        Constructor[RouteCategory] = _.compact(rule.split('/'));
    } else {
        throw new Error('Decorator `Controller` `Rule` must be String|Array|Func');
    }

    Constructor[ControllerCategory] = true;

    return Constructor;
};
