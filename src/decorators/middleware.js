/**
 * Azeroth - Decorators - Middleware
 *
 * @file Middleware.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';
import {MiddlewareCategory} from '../types';

export default middlewareName => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Middleware` only support classType');
    }

    Constructor[MiddlewareCategory] = _.defaults(middlewareName, {path: ''});

    return Constructor;
};
