'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _class, _temp; /**
                    * Azeroth - Interface - Controller
                    *
                    * @file Controller.js
                    * @author mudio(job.mudio@gmail.com)
                    */

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _httpcode = require('../httpcode');

var _types = require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IController = (_temp = _class = class IController {
    constructor(req, res) {
        this._request = req;
        this._response = res;
    }

    /**
     * 获取请求的`Cookies`
     *
     * @returns Array<string>
     * @memberof IController
     */
    getCookies() {
        return _cookie2.default.parse(this._request.headers.cookie || '');
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

        cookies.push(_cookie2.default.serialize(name, value, options));

        this._response.setHeader('Set-Cookie', cookies);
    }

    /**
     * 重定向
     *
     * @param {string} [location='']
     * @param {Azeroth.HttpCode} [HttpCode=Http302]
     * @memberof IController
     */
    redirect(location = '/', HttpCode = _httpcode.Http302) {
        this.setHeader('Location', location);

        throw new HttpCode();
    }
}, _class[_types.ControllerCategory] = true, _temp);
exports.default = IController;