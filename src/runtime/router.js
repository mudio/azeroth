/**
 * Azeroth - router
 *
 * @file router.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

import Processor from './processor';
import {RouteCategory} from '../types';
import {Http404, Http405} from '../httpcode';
import {getControllerRepository} from '../context';

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
            const routeHandler = _classType[RouteCategory];

            if (_.isFunction(routeHandler) && routeHandler(pathname)) {
                return this.executeAction(_classType, req, res);
            }

            const prefixs = pathname.split('/').slice(1, 1 + routeHandler.length);
            const isMatch = _.every(routeHandler, (v, k) => prefixs[k] === v);

            if (isMatch) {
                return this.executeAction(_classType, req, res);
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
    executeAction(_classType, req, res) {
        const pathname = req.url;
        const method = req.method;
        const controller = Processor.Autowire(_classType, req, res);
        const handlers = controller.constructor[Symbol.for(method)];
        const routeHandler = controller.constructor[RouteCategory];

        for (let index = 0; index < handlers.length; index += 1) {
            const {match, key} = handlers[index];
            /**
             * 如果是函数，则执行匹配
             */
            if (_.isFunction(match) && match(pathname)) {
                return controller[key]();
            }

            if (_.isArray(routeHandler)) {
                const targetUrl = ['', ...routeHandler, ...match].join('/');
                if (targetUrl === pathname) {
                    return controller[key]();
                }
            }
        }

        return new Http405();
    }
}
