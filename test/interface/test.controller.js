/* eslint-disable import/no-extraneous-dependencies */

import {assert} from 'chai';
import httpMocks from 'node-mocks-http';

import {Http302} from '../../src/httpcode';
import {ControllerCategory} from '../../src/types';
import IController from '../../src/interface/controller';

describe('Test Controller', () => {
    it('Constructor Controller', () => {
        class Controller extends IController {}
        const _controller = new Controller(Symbol.for('request'), Symbol.for('response'));

        assert.property(Controller, ControllerCategory);
        assert.equal(_controller._request, Symbol.for('request'));
        assert.equal(_controller._response, Symbol.for('response'));
    });

    it('Controller.getCookies', () => {
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/http404',
            headers: {
                cookie: 'testcookie=testcookie',
            },
        });
        const response = httpMocks.createResponse();

        class Controller extends IController {}
        const _controller = new Controller(request, response);

        assert.isFunction(_controller.getCookies);

        const cookies = _controller.getCookies();

        assert.equal(cookies.testcookie, 'testcookie');
    });

    it('Controller.setHeader', () => {
        const request = httpMocks.createRequest({method: 'GET', url: '/http404'});
        const response = httpMocks.createResponse();

        class Controller extends IController {}
        const _controller = new Controller(request, response);

        assert.isFunction(_controller.setHeader);

        _controller.setHeader('test', 'test');

        assert.equal(response.getHeader('test'), 'test');
    });

    it('Controller.setCookie', () => {
        const request = httpMocks.createRequest({method: 'GET', url: '/http404'});
        const response = httpMocks.createResponse();

        class Controller extends IController {}
        const _controller = new Controller(request, response);

        assert.isFunction(_controller.setCookie);

        _controller.setCookie('test1', 'test1', {httpOnly: true});
        _controller.setCookie('test2', 'test2', {maxAge: 60 * 60 * 24 * 7});

        const [cookie1, cookie2] = response.getHeader('Set-Cookie');

        assert.equal(cookie1, 'test1=test1; Path=/; HttpOnly');
        assert.equal(cookie2, 'test2=test2; Max-Age=604800; Path=/');
    });

    it('Controller.redirect', () => {
        const request = httpMocks.createRequest({method: 'GET', url: '/http404'});
        const response = httpMocks.createResponse();

        class Controller extends IController {}
        const _controller = new Controller(request, response);

        assert.isFunction(_controller.redirect);

        try {
            _controller.redirect('/aa');
        } catch (ex) {
            const location = response.getHeader('Location');

            assert.instanceOf(ex, Http302);
            assert.equal(location, '/aa');
        }
    });
});
