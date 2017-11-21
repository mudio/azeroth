'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNullValue = exports.isHttpError = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isHttpError = exports.isHttpError = err => _lodash2.default.isError(err) && 'HttpCode' in err; /**
                                                                                                      * Azeroth - utils
                                                                                                      *
                                                                                                      * @file utils.js
                                                                                                      * @author mudio(job.mudio@gmail.com)
                                                                                                      */

const isNullValue = exports.isNullValue = v => _lodash2.default.isUndefined(v) || _lodash2.default.isNull(v);