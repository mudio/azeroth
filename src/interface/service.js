/**
 * Azeroth - Interface - Service
 *
 * 1. 通过Ioc方式注入
 * 2. 服务不允许匿名
 * 3. 生命周期同controller
 *
 * @file service.js
 * @author mudio(job.mudio@gmail.com)
 */

import {ServiceCategory} from '../types';

export default class IService {
    static [ServiceCategory] = true;
}
