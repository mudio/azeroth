/**
 * Azeroth - Decorators - Interceptor
 *
 * @file interceptor.js
 * @author mudio(job.mudio@gmail.com)
 */

import {registerInterceptor} from '../context';
import {isInterceptor, InterceptorCategory} from '../types';

/**
 * InterceptorKeys Array<InterceptorName>           放置类装饰器
 * InterceptorKeys Object<Method, InterceptorName>  放置方法装饰器
 */
export default (...args) => (target, name) => {
    const isFuncDecorator = !!name;

    if (isFuncDecorator || !isInterceptor(target)) {
        throw new Error('Decorator `interceptor` only support IInterceptor,');
    }

    target[InterceptorCategory] = args[0];

    registerInterceptor(target);

    return target;
};
