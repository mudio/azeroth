/**
 * Azeroth - Decorators - Middleware
 *
 * @file Middleware.js
 * @author mudio(job.mudio@gmail.com)
 */

import {MiddlewareCategory} from '../types';
import {registerMiddleware} from '../context';

export default (...args) => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Middleware` only support classType');
    }

    Constructor[MiddlewareCategory] = args;

    registerMiddleware(Constructor);

    return Constructor;
};
