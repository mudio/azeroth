'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp; /**
                    * Azeroth - Interface - Service
                    *
                    * 1. 通过Ioc方式注入
                    * 2. 服务不允许匿名
                    * 3. 生命周期同controller
                    *
                    * @file service.js
                    * @author mudio(job.mudio@gmail.com)
                    */

var _types = require('../types');

let IService = (_temp = _class = class IService {}, _class[_types.ServiceCategory] = true, _temp);
exports.default = IService;