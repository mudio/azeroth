/**
 * Azeroth - Decorators - Controller
 *
 * @file controller.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import {RouteKeys} from '../types';
import {registerController} from '../context';

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
        Constructor[RouteKeys] = rule;
    } else if (_.isString(rule)) {
        Constructor[RouteKeys] = _.compact(rule.split('/'));
    } else {
        throw new Error('Decorator `Controller` `Rule` must be String|Array|Func');
    }

    registerController(Constructor);

    return Constructor;
};
