'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInterceptor = exports.getControllerRepository = exports.getMiddlewareRepository = exports.getServiceRepository = exports.register = exports.registerInterceptor = exports.registerController = exports.registerServiceAlias = exports.registerService = exports.registerMiddleware = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _types = require('./types');

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const __middlewareCache = []; /**
                               * Azeroth - context
                               *
                               * @file context.js
                               * @author mudio(job.mudio@gmail.com)
                               */

const __serviceCache = {};
const __controllerCache = [];
const __interceptorCache = {};

/**
 * 注册中间件
 *
 * @param {IMiddleware} classType
 */
const registerMiddleware = exports.registerMiddleware = classType => {
    const index = _lodash2.default.findIndex(__middlewareCache, _Type => classType === _Type);

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
const registerService = exports.registerService = classType => {
    const category = classType[_types.ServiceCategory];
    __serviceCache[category] = classType;
};

/**
 * 设置服务别名
 *
 * @param {Map} aliasMapping
 */
const registerServiceAlias = exports.registerServiceAlias = (aliasMapping = {}) => {
    Object.entries(aliasMapping).forEach(entry => {
        const [alias, name] = entry;

        if (alias in __serviceCache) {
            (0, _logger.warn)(`Service ${name} override by ${alias}!`);
        }

        if (name in __serviceCache) {
            __serviceCache[alias] = __serviceCache[name];
        } else {
            (0, _logger.warn)(`Service ${name} not found, Alias ${alias} error!`);
        }
    });
};

/**
 * 注册控制器
 *
 * @param {IController} classType
 * @param {String} filePath
 */
const registerController = exports.registerController = _ClassType => {
    __controllerCache.push(_ClassType);
};

const registerInterceptor = exports.registerInterceptor = _ClassType => {
    const category = _ClassType[_types.InterceptorCategory];
    __interceptorCache[category] = _ClassType;
};

/**
 * 通用注册方法
 *
 * @param {IController|IMiddleware|IService} classType
 * @param {*} args
 */
const register = exports.register = (classType, ...args) => {
    if (_types.ControllerCategory in classType) {
        registerController(classType, ...args);
    }

    if (_types.MiddlewareCategory in classType) {
        registerMiddleware(classType, ...args);
    }

    if (_types.ServiceCategory in classType) {
        registerService(classType, ...args);
    }

    if (_types.InterceptorCategory in classType) {
        registerInterceptor(classType, ...args);
    }
};

const getServiceRepository = exports.getServiceRepository = () => __serviceCache;
const getMiddlewareRepository = exports.getMiddlewareRepository = () => __middlewareCache;
const getControllerRepository = exports.getControllerRepository = () => __controllerCache;
const getInterceptor = exports.getInterceptor = name => __interceptorCache[name];