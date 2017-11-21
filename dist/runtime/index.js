'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _connect = require('connect');

var _connect2 = _interopRequireDefault(_connect);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _logger = require('../logger');

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _utils = require('../utils');

var _httpcode = require('../httpcode');

var _types = require('../types');

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Azeroth - Runtime
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file runtime.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author mudio(job.mudio@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

let Runtime = class Runtime {
    constructor(option = {}) {
        const { workspace, plugins = [], services = {}, middlewares = {} } = option;
        const { match = {}, denyAnonymous = false } = middlewares;

        this._workspace = workspace;
        this._plugins = plugins;
        this._serviceAlisa = services.alias;
        this._denyAnonymousMiddleware = denyAnonymous;
        this._middlewareMapping = match;
    }

    run() {
        var _this = this;

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

        const app = (0, _connect2.default)();

        /**
         * 注册插件
         */
        this._plugins.forEach(plugin => app.use(plugin));

        /**
         * 注册中间件
         */
        this._middlewares.forEach(_ClassType => {
            const _Middleware = _processor2.default.Autowire(_ClassType);
            const [name, config = {}] = _Middleware[_types.MiddlewareCategory]; // eslint-disable-line no-unused-vars

            if (!config.disabled) {
                if (config.path) {
                    app.use(config.path, (...args) => _Middleware.invoke(...args));
                } else {
                    app.use((...args) => _Middleware.invoke(...args));
                }
            }
        });

        /**
         * 分发路由
         */
        app.use((() => {
            var _ref = _asyncToGenerator(function* (req, res) {
                let content = null;
                const timestamp = Date.now();

                try {
                    content = yield _this._ruoter.dispatch(req, res);
                } catch (ex) {
                    if ((0, _utils.isHttpError)(ex)) {
                        content = ex;
                    } else {
                        (0, _logger.debug)(ex.message);
                        content = new _httpcode.Http500(ex.message);
                    }
                }

                if (!res.finished) {
                    if ((0, _utils.isHttpError)(content)) {
                        switch (content.constructor) {
                            case _httpcode.Http302:
                                res.setHeader('Location', content.location);
                            default:
                                // eslint-disable-line no-fallthrough
                                res.writeHead(content.HttpCode);
                                res.end(content.HttpMessage);
                        }
                    } else if (_lodash2.default.isObject(content)) {
                        res.end(JSON.stringify(content));
                    } else {
                        res.end(content || '');
                    }
                }

                (0, _logger.debug)([`execute => [${req.method}] ${req.url}`, `code = ${res.statusCode}`, `take time ${Date.now() - timestamp}ms`].join(','));
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());

        return Promise.resolve(_http2.default.createServer(app));
    }

    compile() {
        if (this._workspace) {
            const filePaths = _glob2.default.sync(this._workspace);

            filePaths.forEach(relativePath => {
                // delete require.cache[require.resolve(module)];
                // const absolutePath = path.join(process.cwd(), relativePath);
                const _module = require.main.require(relativePath); // eslint-disable-line

                // register(_module.__esModule ? _module.default : _module, absolutePath);
            });
        }
    }

    link() {
        this._ruoter = new _router2.default();

        this._middlewares = (0, _context.getMiddlewareRepository)();

        /**
         * 去除匿名的中间件
         */
        if (this._denyAnonymousMiddleware) {
            this._middlewares = this._middlewares.map(_middleware => {
                const [name, config = {}] = _middleware[_types.MiddlewareCategory];

                if (!name) {
                    config.disabled = true;
                    _middleware[_types.MiddlewareCategory] = [name, config];
                }

                return _middleware;
            });
        }

        /**
         * 覆盖中间件配置
         */
        if (Object.keys(this._middlewareMapping).length > -1) {
            this._middlewares = this._middlewares.map(_ClassType => {
                const [name, config = {}] = _ClassType[_types.MiddlewareCategory];

                if (name in this._middlewareMapping) {
                    const enabled = this._middlewareMapping[name];

                    if (!enabled) {
                        config.disabled = true;
                    }

                    config.path = enabled;

                    _ClassType[_types.MiddlewareCategory] = [name, config];
                }

                return _ClassType;
            });
        }

        /**
         * 处理服务别名
         */
        (0, _context.registerServiceAlias)(this._serviceAlisa);
    }

    analysis() {
        (0, _logger.info)('=============== load middlewares ===============');
        this._middlewares.forEach(_middleware => {
            const [name, config = {}] = _middleware[_types.MiddlewareCategory];
            (0, _logger.info)([`load middleware => ${_middleware.name}`, `alias = ${name || 'anonymous'}`, `disabled = ${!!config.disabled}`, `path = ${config.path || '/'}`].join(', '));
        });

        (0, _logger.info)('=============== load services ==================');
        const services = (0, _context.getServiceRepository)();
        Object.entries(services).forEach(entry => {
            const [alias, _service] = entry;
            (0, _logger.info)([`load service => ${_service.name}`, `alias = ${alias || 'anonymous'}`].join(', '));
        });

        (0, _logger.info)('=============== load controllers ===============');
        const controllers = (0, _context.getControllerRepository)();
        Object.values(controllers).forEach(_controller => {
            const category = _controller[_types.RouteKeys];
            (0, _logger.info)([`load controller => ${_controller.name}`, `path = ${category}`].join(', '));
        });
    }
};
exports.default = Runtime;