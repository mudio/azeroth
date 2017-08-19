/**
 * Azeroth - Decorators - Interceptor
 *
 * @file interceptor.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import {normalizeArgs} from '../utils';
import {registerInterceptor} from '../context';
import {
    isController,
    isInterceptor,
    InterceptorKeys,
    InterceptorCategory,
} from '../types';

/**
 * InterceptorKeys Array<InterceptorName>           放置类装饰器
 * InterceptorKeys Object<Method, InterceptorName>  放置方法装饰器
 */
export default (...args) => (target, name, descriptor) => {
    const isFuncDecorator = !!name;
    const _classType = isFuncDecorator ? target.constructor : target;

    /**
     * 如果挂载在`Controller`上，则装配拦截器
     */
    if (isController(_classType)) {
        const _args = normalizeArgs(...args);
        const categoryMap = _classType[InterceptorKeys] || [];

        _args.forEach((category) => {
            if (isFuncDecorator) {
                const methodCategoryMap = categoryMap[name] || [];
                methodCategoryMap.push(category);
                categoryMap[name] = methodCategoryMap;
            } else {
                const index = _.findIndex(categoryMap, ([key]) => key === category[0]);

                if (index > -1) {
                    categoryMap[index] = category;
                } else {
                    categoryMap.push(category);
                }
            }
        });

        _classType[InterceptorKeys] = categoryMap;

        return descriptor || _classType;
    }

    /**
     * 如果挂载在Class上，则注册拦截器
     */
    if (isInterceptor(_classType)) {
        target[InterceptorCategory] = args[0];

        registerInterceptor(_classType);

        return _classType;
    }

    throw new Error('Decorator `interceptor` only support IController | IInterceptor,');
};
