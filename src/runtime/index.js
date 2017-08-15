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

import Router from '../router';
import {Http500} from '../error';
import Processor from '../processor';
import {MiddlewareCategory} from '../types';
import {
    register,
    registerServiceAlias,
    getMiddlewareRepository,
} from '../context';

export default class Runtime {
    constructor(option = {}) {
        const {workspace, plugins = [], services = {}, middlewares = {}} = option;
        const {match = {}, denyAnonymous = false} = middlewares;

        this._workspace = workspace;
        this._plugins = plugins;
        this._services = services;
        this._denyAnonymousMiddleware = denyAnonymous;
        this._middlewareMapping = match;
    }

    run() {
        this.compile();
        this.link();

        const app = connect();

        /**
         * connect plugin register
         */
        this._plugins.forEach(plugin => app.use(plugin));

        /**
         * dispatch middleware
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
         * dispatch controller
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
            this._middlewares = this._middlewares.filter(
                _middleware => !!_middleware[MiddlewareCategory].name,
            );
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

        registerServiceAlias(this._services.alias);
    }
}
