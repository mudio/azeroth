'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _utils = require('../utils');

var _httpcode = require('../httpcode');

var _types = require('../types');

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Azeroth - router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file router.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author mudio(job.mudio@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

let Router = class Router {
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
        const controllers = (0, _context.getControllerRepository)();
        const _classTypes = Object.values(controllers);

        for (let index = 0; index < _classTypes.length; index += 1) {
            const _classType = _classTypes[index];
            const routeHandler = _classType[_types.RouteKeys];

            if (_lodash2.default.isFunction(routeHandler) && routeHandler(pathname)) {
                return this.execute(_classType, req, res);
            }

            const isMatch = pathname.startsWith(routeHandler) && pathname.substr(routeHandler.length).startsWith('/');

            if (isMatch) {
                return this.execute(_classType, req, res);
            }
        }

        return new _httpcode.Http404();
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
        const controller = _processor2.default.Autowire(_Controller, req, res);
        const actionKey = this.findAction(_Controller, req.url, req.method);

        if (actionKey) {
            return this.invokeAction(controller, actionKey, req, res);
        }

        return new _httpcode.Http405();
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
        const { pathname } = _url2.default.parse(url);
        const _routeKeys = _Controller[_types.RouteKeys];
        const _methodKeys = _Controller[Symbol.for(method)] || [];

        for (let index = 0; index < _methodKeys.length; index += 1) {
            const [key, option = {}] = _methodKeys[index];
            /**
             * 如果是函数，则执行匹配
             */
            if (_lodash2.default.isFunction(option.optionmatch) && option.match(url)) {
                return key;
            }

            if (_lodash2.default.isString(_routeKeys) && _lodash2.default.isString(option.match)) {
                const targetUrl = _path2.default.join(_routeKeys, option.match);
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

        /**
         * Interceptor如果发生异常或者返回结果，都会组织后续的行为
         */
        let invokeInterceptor = (() => {
            var _ref = _asyncToGenerator(function* (iterator) {
                const { done, value } = iterator.next();

                if (done) {
                    return;
                }

                const [name, ...args] = value;
                const _interceptorClass = (0, _context.getInterceptor)(name);
                const interceptor = _processor2.default.Autowire(_interceptorClass, ...args);

                const content = yield interceptor.before(req, res);

                if (!(0, _utils.isNullValue)(content)) {
                    return content;
                }

                return invokeInterceptor(iterator);
            });

            return function invokeInterceptor(_x) {
                return _ref.apply(this, arguments);
            };
        })();

        const _classType = target.constructor;
        const category = _classType[_types.InterceptorKeys] || [];
        const actionCategory = category[key] || [];

        const interceptors = _lodash2.default.uniqBy([...actionCategory, ...category], item => item[0]);

        const iterator = interceptors[Symbol.iterator]();

        return invokeInterceptor(iterator).then(content => {
            if (!(0, _utils.isNullValue)(content)) {
                return content;
            }

            const { url, headers } = req;

            const body = [];
            const urlData = _url2.default.parse(url, true, true);
            const contentType = headers['content-type'] || '';

            const _asyncRead = new Promise((resolve, reject) => {
                req.on('data', chunked => body.push(chunked));
                req.on('end', () => resolve(Buffer.concat(body).toString()));
                req.on('error', err => reject(err));
            });

            return _asyncRead.then(bufferData => {
                const bodyData = contentType.indexOf('application/json') > -1 ? JSON.parse(bufferData) : _querystring2.default.parse(bufferData);

                return target[key]({ url: urlData, body: bodyData });
            });
        });
    }
};
exports.default = Router;