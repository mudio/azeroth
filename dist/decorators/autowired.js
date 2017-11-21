'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * InterceptorKeys Array<InterceptorName>           放置类装饰器
 * InterceptorKeys Object<Method, InterceptorName>  放置方法装饰器
 */
/**
 * Azeroth - Decorators - Autowired
 *
 * 用于拦截器配置装配
 *
 * @file Autowired.js
 * @author mudio(job.mudio@gmail.com)
 */

exports.default = (...args) => (target, name, descriptor) => {
    const isFuncDecorator = !!name;
    const _classType = isFuncDecorator ? target.constructor : target;

    /**
     * 如果挂载在`Controller`上，则装配拦截器
     */
    if ((0, _types.isController)(_classType)) {
        const categoryMap = _classType[_types.InterceptorKeys] || [];

        if (isFuncDecorator) {
            const methodCategoryMap = categoryMap[name] || [];
            methodCategoryMap.unshift(args);
            categoryMap[name] = methodCategoryMap;
        } else {
            const index = _lodash2.default.findIndex(categoryMap, ([key]) => key === args[0]);

            if (index > -1) {
                categoryMap[index] = args;
            } else {
                categoryMap.unshift(args);
            }
        }

        _classType[_types.InterceptorKeys] = categoryMap;

        return descriptor || _classType;
    }

    throw new Error('Decorator `Invoke` only support IController');
};