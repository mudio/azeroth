/**
 * Azeroth - context
 *
 * @file context.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import {
    ServiceCategory,
    MiddlewareCategory,
    ControllerCategory,
    InterceptorCategory,
} from './types';
import {warn} from './logger';

const __middlewareCache = [];
const __serviceCache = {};
const __controllerCache = [];
const __interceptorCache = {};

/**
 * 注册中间件
 *
 * @param {IMiddleware} classType
 */
export const registerMiddleware = (classType) => {
    const index = _.findIndex(__middlewareCache, _Type => classType === _Type);

    if (index > -1) {
        __middlewareCache[index] = classType;
    } else {
        __middlewareCache.push(classType);
    }
};

/**
 * 注册服务
 * @param {IService} classType
 */
export const registerService = (classType) => {
    const category = classType[ServiceCategory];
    __serviceCache[category] = classType;
};

/**
 * 设置服务别名
 *
 * @param {Map} aliasMapping
 */
export const registerServiceAlias = (aliasMapping = {}) => {
    Object.entries(aliasMapping).forEach((entry) => {
        const [alias, name] = entry;

        if (alias in __serviceCache) {
            warn(`Service ${name} override by ${alias}!`);
        }

        if (name in __serviceCache) {
            __serviceCache[alias] = __serviceCache[name];
        } else {
            warn(`Service ${name} not found, Alias ${alias} error!`);
        }
    });
};

/**
 * 注册控制器
 *
 * @param {IController} classType
 * @param {String} filePath
 */
export const registerController = (_ClassType) => {
    __controllerCache.push(_ClassType);
};

export const registerInterceptor = (_ClassType) => {
    const category = _ClassType[InterceptorCategory];
    __interceptorCache[category] = _ClassType;
};

/**
 * 通用注册方法
 *
 * @param {IController|IMiddleware|IService} classType
 * @param {*} args
 */
export const register = (classType, ...args) => {
    if (ControllerCategory in classType) {
        registerController(classType, ...args);
    }

    if (MiddlewareCategory in classType) {
        registerMiddleware(classType, ...args);
    }

    if (ServiceCategory in classType) {
        registerService(classType, ...args);
    }

    if (InterceptorCategory in classType) {
        registerInterceptor(classType, ...args);
    }
};

export const getServiceRepository = () => __serviceCache;
export const getMiddlewareRepository = () => __middlewareCache;
export const getControllerRepository = () => __controllerCache;
export const getInterceptor = name => __interceptorCache[name];

