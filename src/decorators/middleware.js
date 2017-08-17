/**
 * Azeroth - Decorators - Middleware
 *
 * @file Middleware.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import {normalizeArgs} from '../utils';
import {MiddlewareCategory} from '../types';
import {registerMiddleware} from '../context';

export default (...args) => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Middleware` only support classType');
    }

    const _args = normalizeArgs(...args);

    Constructor[MiddlewareCategory] = _.flatten(_args);

    registerMiddleware(Constructor);

    return Constructor;
};
