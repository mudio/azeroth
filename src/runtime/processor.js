/**
 * Azeroth - Processor
 *
 * @file Processor.js
 * @author mudio(job.mudio@gmail.com)
 */

import {
    isService,
    isController,
    isMiddleware,
    isInterceptor,
    ServiceKeys,
} from '../types';
import {error} from '../logger';
import {getServiceRepository} from '../context';

const __serviceCache = getServiceRepository();

export default class Processor {
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

        if (ServiceKeys in ClassType) {
            ClassType[ServiceKeys].forEach((name) => {
                const serviceClass = __serviceCache[name];

                if (!serviceClass) {
                    return error(`Service ${name} not found!`);
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
        if (isController(ClassType)) {
            return Processor.InjectService(ClassType, ...args);
        }

        if (isMiddleware(ClassType)) {
            if (ServiceKeys in ClassType) {
                ClassType[ServiceKeys].forEach((name) => {
                    ClassType[name] = Processor.InjectService(__serviceCache[name]);
                });
            }

            return ClassType;
        }

        if (isInterceptor(ClassType)) {
            const interceptor = new ClassType(...args);

            if (ServiceKeys in ClassType) {
                ClassType[ServiceKeys].forEach((name) => {
                    interceptor[name] = Processor.InjectService(__serviceCache[name]);
                });
            }

            return interceptor;
        }

        if (isService(ClassType)) {
            return Processor.InjectService(ClassType, ...args);
        }

        throw new Error('AutoInject only support `Controller`|`Service`|`Middleware`');
    }
}
