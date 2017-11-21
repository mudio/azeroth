'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.warn = exports.info = exports.debug = undefined;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'development') {
  _debug2.default.log = console.log.bind(console); // eslint-disable-line no-console
} /**
   * azeroth - 日志记录器
   *
   * @file logger.js
   * @author mudio(job.mudio@gmail.com)
   */

const debug = exports.debug = (0, _debug2.default)('azeroth:debug');
const info = exports.info = (0, _debug2.default)('azeroth:info');
const warn = exports.warn = (0, _debug2.default)('azeroth:warn');
const error = exports.error = (0, _debug2.default)('azeroth:error');