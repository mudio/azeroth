/**
 * Azeroth - router
 *
 * @file router.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import Processor from './processor';
import {isNullValue} from '../utils';
import {Http404, Http405} from '../httpcode';
import {InterceptorKeys, RouteKeys} from '../types';
import {getInterceptor, getControllerRepository} from '../context';

export default class Router {
    /**
     * 根据匹配规则分发到控制器
     *
     * @param {HttpRequest} req
     * @param {HttpResponse} res
     * @returns
     * @memberof Router
     */
    dispatch(req, res) {
        if (res.finished) {
            return;
        }

        const pathname = req.url;
        const controllers = getControllerRepository();
        const _classTypes = Object.values(controllers);

        for (let index = 0; index < _classTypes.length; index += 1) {
            const _classType = _classTypes[index];
            const routeHandler = _classType[RouteKeys];

            if (_.isFunction(routeHandler) && routeHandler(pathname)) {
                return this.findAction(_classType, req, res);
            }

            const prefixs = pathname.split('/').slice(1, 1 + routeHandler.length);
            const isMatch = _.every(routeHandler, (v, k) => prefixs[k] === v);

            if (isMatch) {
                return this.findAction(_classType, req, res);
            }
        }

        return new Http404();
    }

    /**
     * 根据匹配规则分发到Action
     *
     * @param {IController} _classType
     * @param {HttpRequest} req
     * @param {HttpResponse} res
     * @returns
     * @memberof Router
     */
    findAction(_classType, req, res) {
        const pathname = req.url;
        const method = req.method;
        const routeHandler = _classType[RouteKeys];
        const handlers = _classType[Symbol.for(method)];
        const controller = Processor.Autowire(_classType, req, res);

        for (let index = 0; index < handlers.length; index += 1) {
            const {match, key} = handlers[index];
            /**
             * 如果是函数，则执行匹配
             */
            if (_.isFunction(match) && match(pathname)) {
                return this.invokeAction(controller, key, req, res);
            }

            if (_.isArray(routeHandler)) {
                const targetUrl = ['', ...routeHandler, ...match].join('/');
                if (targetUrl === pathname) {
                    return this.invokeAction(controller, key, req, res);
                }
            }
        }

        return new Http405();
    }

    invokeAction(target, key, req, res) {
        const _classType = target.constructor;
        const category = _classType[InterceptorKeys];
        const actionCategory = category[key] || [];

        const interceptors = _.uniqBy([...actionCategory, ...category], item => item[0]);

        /**
         * Interceptor如果发生异常或者返回结果，都会组织后续的行为
         */
        async function invokeInterceptor(iterator) {
            const {done, value} = iterator.next();

            if (done) {
                return;
            }

            const [name, ...args] = value;
            const _interceptorClass = getInterceptor(name);
            const interceptor = Processor.Autowire(_interceptorClass, ...args);

            const content = await interceptor.before(req, res);

            if (!isNullValue(content)) {
                return content;
            }

            return invokeInterceptor(iterator);
        }

        const iterator = interceptors[Symbol.iterator]();

        return invokeInterceptor(iterator).then((content) => {
            if (!isNullValue(content)) {
                return content;
            }

            return target[key]();
        });
    }
}
