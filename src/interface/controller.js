/**
 * Azeroth - Interface - Controller
 *
 * @file Controller.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';
import cookie from 'cookie';

import {Http302} from '../httpcode';
import {ControllerCategory} from '../types';

export default class IController {
    constructor(req, res) {
        this._request = req;
        this._response = res;
    }

    static [ControllerCategory] = true;

    /**
     * 获取请求的`Cookies`
     *
     * @returns Array<string>
     * @memberof IController
     */
    getCookies() {
        return cookie.parse(this._request.headers.cookie || '');
    }

    /**
     * 设置`Response`
     *
     * @param {any} Header Key
     * @param {any} Header Value
     * @memberof IController
     */
    setHeader(key, value) {
        this._response.setHeader(key, value);
    }

    /**
     * 设置`Response` Cookie
     *
     * @see https://www.npmjs.com/package/cookie
     *
     * @param {any} cookie key
     * @param {any} cookie value
     * @param {any} [options={}]
     * @memberof IController
     */
    setCookie(name, value, options = {}) {
        const cookies = this._response.getHeader('Set-Cookie') || [];
        const [host] = this._request.headers.host.split(':');

        options = _.defaults(options, {domain: host, path: '/'});
        cookies.push(cookie.serialize(name, value, options));

        this._response.setHeader('Set-Cookie', cookies);
    }

    /**
     * 重定向
     *
     * @param {string} [location='']
     * @param {Azeroth.HttpCode} [HttpCode=Http302]
     * @memberof IController
     */
    redirect(location = '/', HttpCode = Http302) {
        this.setHeader('Location', location);

        throw new HttpCode();
    }
}
