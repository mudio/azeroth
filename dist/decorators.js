'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Invoke = exports.Interceptor = exports.Controller = exports.Middleware = exports.Autowired = exports.Service = exports.Delete = exports.Put = exports.Post = exports.Get = undefined;

var _invoke2 = require('./decorators/invoke');

var _invoke3 = _interopRequireDefault(_invoke2);

var _service2 = require('./decorators/service');

var _service3 = _interopRequireDefault(_service2);

var _autowired2 = require('./decorators/autowired');

var _autowired3 = _interopRequireDefault(_autowired2);

var _middleware2 = require('./decorators/middleware');

var _middleware3 = _interopRequireDefault(_middleware2);

var _controller2 = require('./decorators/controller');

var _controller3 = _interopRequireDefault(_controller2);

var _interceptor2 = require('./decorators/interceptor');

var _interceptor3 = _interopRequireDefault(_interceptor2);

var _method = require('./decorators/method');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Get = exports.Get = _method.GetMethod; /**
                                              * Azeroth - Decorators
                                              *
                                              * @file decorators.js
                                              * @author mudio(job.mudio@gmail.com)
                                              */

const Post = exports.Post = _method.PostMethod;
const Put = exports.Put = _method.PutMethod;
const Delete = exports.Delete = _method.DeleteMethod;
const Service = exports.Service = _service3.default;
const Autowired = exports.Autowired = _autowired3.default;
const Middleware = exports.Middleware = _middleware3.default;
const Controller = exports.Controller = _controller3.default;
const Interceptor = exports.Interceptor = _interceptor3.default;
const Invoke = exports.Invoke = _invoke3.default;