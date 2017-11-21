/**
 * Azeroth - router
 *
 * @file router.js
 * @author mudio(job.mudio@gmail.com)
 */

import URL from 'url';
import _ from 'lodash';
import path from 'path';
import querystring from 'querystring';

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
                return this.execute(_classType, req, res);
            }

            const isMatch = pathname.startsWith(routeHandler)
                && pathname.substr(routeHandler.length).startsWith('/');

            if (isMatch) {
                return this.execute(_classType, req, res);
            }
        }

        return new Http404();
    }

    /**
     * 执行Controller
     *
     * @param {IController} _Controller
     * @param {HttpRequest} req
     * @param {HttpResponse} res
     * @returns
     * @memberof Router
     */
    execute(_Controller, req, res) {
        const controller = Processor.Autowire(_Controller, req, res);
        const actionKey = this.findAction(_Controller, req.url, req.method);

        if (actionKey) {
            return this.invokeAction(controller, actionKey, req, res);
        }

        return new Http405();
    }

    /**
     * 根据匹配规则分发到Action
     *
     * @param {IController} _Controller
     * @param {String}      pathname
     * @param {String}      method
     * @returns
     * @memberof Router
     */
    findAction(_Controller, url, method) {
        const {pathname} = URL.parse(url);
        const _routeKeys = _Controller[RouteKeys];
        const _methodKeys = _Controller[Symbol.for(method)] || [];

        for (let index = 0; index < _methodKeys.length; index += 1) {
            const [key, option = {}] = _methodKeys[index];
            /**
             * 如果是函数，则执行匹配
             */
            if (_.isFunction(option.optionmatch) && option.match(url)) {
                return key;
            }

            if (_.isString(_routeKeys) && _.isString(option.match)) {
                const targetUrl = path.join(_routeKeys, option.match);
                if (targetUrl === pathname) {
                    return key;
                }
            }
        }
    }

    /**
     * 执行Action
     *
     * @param {Controller}      target
     * @param {String}          key
     * @param {HttpRequest}     req
     * @param {HttpResponse}    res
     * @returns
     * @memberof Router
     */
    invokeAction(target, key, req, res) {
        const _classType = target.constructor;
        const category = _classType[InterceptorKeys] || [];
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

            const {url, headers} = req;

            const body = [];
            const urlData = URL.parse(url, true, true);
            const contentType = headers['content-type'] || '';

            const _asyncRead = new Promise((resolve, reject) => {
                req.on('data', chunked => body.push(chunked));
                req.on('end', () => resolve(Buffer.concat(body).toString()));
                req.on('error', err => reject(err));
            });

            return _asyncRead.then((bufferData) => {
                const bodyData = contentType.indexOf('application/json') > -1
                    ? JSON.parse(bufferData)
                    : querystring.parse(bufferData);

                return target[key]({url: urlData, body: bodyData});
            });
        });
    }
}
