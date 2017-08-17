/**
 * Azeroth - interceptor
 *
 * @file interceptor.js
 * @author mudio(job.mudio@gmail.com)
 */

import {InterceptorCategory} from '../types';

export default class IInterceptor {
    static [InterceptorCategory] = true

    before() {}

    after() {}
}
