/**
 * Azeroth - Interface - Middleware
 *
 * using "plugins" known as middleware
 *
 * @file Middleware.js
 * @author mudio(job.mudio@gmail.com)
 */

import {MiddlewareCategory} from '../types';

export default class IMiddleware {
    static [MiddlewareCategory] = true;

    static invoke(req, res, next) {
        return next();
    }
}
