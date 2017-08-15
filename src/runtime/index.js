/**
 * Azeroth - Runtime
 *
 * @file runtime.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';
import path from 'path';
import glob from 'glob';
import http from 'http';
import connect from 'connect';

import Router from './router';
import {info} from '../logger';
import {Http500} from '../httpcode';
import Processor from './processor';
import {RouteCategory, MiddlewareCategory} from '../types';
import {
    register, registerServiceAlias,
    getMiddlewareRepository, getServiceRepository, getControllerRepository,
} from '../context';

export default class Runtime {
    constructor(option = {}) {
        const {workspace, plugins = [], services = {}, middlewares = {}} = option;
        const {match = {}, denyAnonymous = false} = middlewares;

        this._workspace = workspace;
        this._plugins = plugins;
        this._serviceAlisa = services.alias;
        this._denyAnonymousMiddleware = denyAnonymous;
        this._middlewareMapping = match;
    }

    run() {
        /**
         * 编译模块
         */
        this.compile();

        /**
         * 处理一些准备工作
         */
        this.link();

        /**
         * 分析加载情况
         */
        this.analysis();

        const app = connect();

        /**
         * 注册插件
         */
        this._plugins.forEach(plugin => app.use(plugin));

        /**
         * 注册中间件
         */
        this._middlewares.forEach((_ClassType) => {
            const _Middleware = Processor.Autowire(_ClassType);
            const category = _Middleware[MiddlewareCategory];

            if (!category.disabled) {
                if (category.path) {
                    app.use(category.path, (...args) => _Middleware.invoke(...args));
                } else {
                    app.use((...args) => _Middleware.invoke(...args));
                }
            }
        });

        /**
         * 分发路由
         */
        app.use(async (req, res) => {
            let content = null;

            try {
                content = await this._ruoter.dispatch(req, res);
            } catch (ex) {
                content = new Http500(ex.message);
            }

            if (!res.finished) {
                if (_.isError(content)) {
                    res.writeHead(content.HttpCode);
                    res.end(content.HttpMessage);
                } else if (_.isObject(content)) {
                    res.end(JSON.stringify(content));
                } else {
                    res.end(content || '');
                }
            }
        });

        return Promise.resolve(http.createServer(app));
    }

    compile() {
        const filePaths = glob.sync(this._workspace);

        filePaths.forEach((relativePath) => {
            // delete require.cache[require.resolve(module)];
            const absolutePath = path.join(process.cwd(), relativePath);
            const _module = require.main.require(relativePath);    // eslint-disable-line

            register(_module.__esModule ? _module.default : _module, absolutePath);
        });
    }

    link() {
        this._ruoter = new Router();

        this._middlewares = getMiddlewareRepository();

        /**
         * 去除匿名的中间件
         */
        if (this._denyAnonymousMiddleware) {
            this._middlewares = this._middlewares.map((_middleware) => {
                const category = _middleware[MiddlewareCategory];

                if (!category.name) {
                    category.disabled = true;
                }

                return _middleware;
            });
        }

        /**
         * 覆盖中间件配置
         */
        if (Object.keys(this._middlewareMapping).length > -1) {
            this._middlewares = this._middlewares.map((_ClassType) => {
                const category = _ClassType[MiddlewareCategory];

                if (category.name in this._middlewareMapping) {
                    const enabled = this._middlewareMapping[category.name];

                    if (!enabled) {
                        category.disabled = true;
                    }

                    category.path = enabled;
                }

                return _ClassType;
            });
        }

        /**
         * 处理服务别名
         */
        registerServiceAlias(this._serviceAlisa);
    }

    analysis() {
        info('=============== load middlewares ===============');
        this._middlewares.forEach((_middleware) => {
            const category = _middleware[MiddlewareCategory];
            info(
                [
                    `load middleware => ${_middleware.name}`,
                    `alias = ${category.name || 'anonymous'}`,
                    `disabled = ${!!category.disabled}`,
                    `path = ${category.path || '/'}`,
                ].join(', '),
            );
        });

        info('=============== load services ==================');
        const services = getServiceRepository();
        Object.entries(services).forEach((entry) => {
            const [alias, _service] = entry;
            info(
                [
                    `load service => ${_service.name}`,
                    `alias = ${alias || 'anonymous'}`,
                ].join(', '),
            );
        });

        info('=============== load controllers ===============');
        const controllers = getControllerRepository();
        Object.values(controllers).forEach((_controller) => {
            const category = _controller[RouteCategory];
            info(
                [
                    `load controller => ${_controller.name}`,
                    `path = ${['', ...category].join('/')}`,
                ].join(', '),
            );
        });
    }
}
