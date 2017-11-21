'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _types = require('../types');

var _logger = require('../logger');

var _context = require('../context');

const __serviceCache = (0, _context.getServiceRepository)(); /**
                                                              * Azeroth - Processor
                                                              *
                                                              * @file Processor.js
                                                              * @author mudio(job.mudio@gmail.com)
                                                              */

let Processor = class Processor {
    /**
     * 自动装配服务
     *
     * @static
     * @param {IService} ClassType
     * @param {any} args
     * @returns
     * @memberof Processor
     */
    static InjectService(ClassType, ...args) {
        const instance = new ClassType(...args);

        if (_types.ServiceKeys in ClassType) {
            ClassType[_types.ServiceKeys].forEach(name => {
                const serviceClass = __serviceCache[name];

                if (!serviceClass) {
                    return (0, _logger.error)(`Service ${name} not found!`);
                }

                instance[name] = Processor.InjectService(serviceClass);
            });
        }

        return instance;
    }

    /**
     * 自动装配
     *
     * @static
     * @param {IController|IService|IMiddleware} ClassType
     * @param {any} args
     * @returns
     * @memberof Processor
     */
    static Autowire(ClassType, ...args) {
        if ((0, _types.isController)(ClassType)) {
            return Processor.InjectService(ClassType, ...args);
        }

        if ((0, _types.isMiddleware)(ClassType)) {
            if (_types.ServiceKeys in ClassType) {
                ClassType[_types.ServiceKeys].forEach(name => {
                    ClassType[name] = Processor.InjectService(__serviceCache[name]);
                });
            }

            return ClassType;
        }

        if ((0, _types.isInterceptor)(ClassType)) {
            const interceptor = new ClassType(...args);

            if (_types.ServiceKeys in ClassType) {
                ClassType[_types.ServiceKeys].forEach(name => {
                    interceptor[name] = Processor.InjectService(__serviceCache[name]);
                });
            }

            return interceptor;
        }

        if ((0, _types.isService)(ClassType)) {
            return Processor.InjectService(ClassType, ...args);
        }

        throw new Error('AutoInject only support `Controller`|`Service`|`Middleware`');
    }
};
exports.default = Processor;