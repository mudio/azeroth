'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.runServer = exports.decorators = exports.IService = exports.IInterceptor = exports.IMiddleware = exports.IController = exports.httpcode = exports.types = undefined;

var _runtime2 = require('./runtime');

var _runtime3 = _interopRequireDefault(_runtime2);

var _types2 = require('./types');

var _types = _interopRequireWildcard(_types2);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _httpcode = require('./httpcode');

var _httpCode = _interopRequireWildcard(_httpcode);

var _service = require('./interface/service');

var _service2 = _interopRequireDefault(_service);

var _decorators2 = require('./decorators');

var _decorators = _interopRequireWildcard(_decorators2);

var _controller = require('./interface/controller');

var _controller2 = _interopRequireDefault(_controller);

var _middleware = require('./interface/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _interceptor = require('./interface/interceptor');

var _interceptor2 = _interopRequireDefault(_interceptor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = exports.types = _types; /**
                                       * Azeroth - index
                                       *
                                       * @file index.js
                                       * @author mudio(job.mudio@gmail.com)
                                       */

const httpcode = exports.httpcode = _httpCode;
const IController = exports.IController = _controller2.default;
const IMiddleware = exports.IMiddleware = _middleware2.default;
const IInterceptor = exports.IInterceptor = _interceptor2.default;
const IService = exports.IService = _service2.default;
const decorators = exports.decorators = _decorators;

const runServer = exports.runServer = (port, option = {}) => {
  const _runtime = new _runtime3.default(option);

  return _runtime.run().then(server => server.listen(port));
};

const version = exports.version = _package2.default.version;