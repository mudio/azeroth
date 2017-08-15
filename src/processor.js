/**
 * Azeroth - Processor
 *
 * @file Processor.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import {
    isService,
    isController,
    isMiddleware,
    AutowiredKeys, HeaderKeys,
} from './types';
import {error} from './logger';
import {getServiceRepository} from './context';

const __serviceCache = getServiceRepository();

export default class Processor {
    /**
     * 自动装配Header装饰器
     *
     * @static
     * @param {Controller} instance
     * @returns
     * @memberof Processor
     */
    static AutowireHttpHeader(instance) {
        if (HeaderKeys in instance.constructor) {
            _.each(instance.constructor[HeaderKeys], (value, key) => {
                instance.response.setHeader(key, value);
            });
        }

        return instance;
    }

    /**
     * 自动装配服务
     *
     * @static
     * @param {IService} ClassType
     * @param {any} args
     * @returns
     * @memberof Processor
     */
    static AutowireService(ClassType, ...args) {
        const instance = new ClassType(...args);

        if (AutowiredKeys in ClassType) {
            ClassType[AutowiredKeys].forEach((name) => {
                const serviceClass = __serviceCache[name];

                if (!serviceClass) {
                    return error(`Service ${name} not found!`);
                }

                instance[name] = Processor.AutowireService(serviceClass);
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
            const instance = Processor.AutowireService(ClassType, ...args);
            return Processor.AutowireHttpHeader(instance);
        }

        if (isMiddleware(ClassType)) {
            if (AutowiredKeys in ClassType) {
                ClassType[AutowiredKeys].forEach((name) => {
                    ClassType[name] = Processor.AutowireService(__serviceCache[name]);
                });
            }

            return ClassType;
        }

        if (isService(ClassType)) {
            return Processor.AutowireService(ClassType, ...args);
        }

        throw new Error('Autowire only support `Controller`|`Service`|`Middleware`');
    }
}
