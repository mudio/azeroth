/**
 * Azeroth - Decorators
 *
 * @file decorators.js
 * @author mudio(job.mudio@gmail.com)
 */

import _header from './decorators/header';
import _service from './decorators/service';
import _autowired from './decorators/autowired';
import _middleware from './decorators/middleware';
import _controller from './decorators/controller';
import {
    PostMethod, GetMethod, PutMethod, DeleteMethod,
} from './decorators/method';

export const Header = _header;
export const Get = GetMethod;
export const Post = PostMethod;
export const Put = PutMethod;
export const Delete = DeleteMethod;
export const Service = _service;
export const Autowired = _autowired;
export const Middleware = _middleware;
export const Controller = _controller;
