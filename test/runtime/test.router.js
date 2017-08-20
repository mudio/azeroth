/* eslint-disable import/no-extraneous-dependencies */

import _ from 'lodash';
import {assert} from 'chai';
import httpMocks from 'node-mocks-http';

import {IController} from '../..';
import Router from '../../src/runtime/router';
import {Http404, Http405} from '../../src/httpcode';
import Controller from '../../src/decorators/controller';
import {getControllerRepository} from '../../src/context';
import {GetMethod, PostMethod} from '../../src/decorators/method';
import Interceptor from '../../src/decorators/interceptor';
import IInterceptor from '../../src/interface/interceptor';
// 清理缓存
getControllerRepository().length = 0;

describe('Test Router', () => {
    const _router = new Router();
    const interceptorKey = 'interceptor';

    @Interceptor(interceptorKey)
    class TestInterceptor extends IInterceptor { // eslint-disable-line no-unused-vars
        before() {
            return {intercept: true};
        }
    }

    @Controller('/api')
    class GetController extends IController { // eslint-disable-line no-unused-vars
        @GetMethod('/get')
        getmethod() {
            return {result: 'get'};
        }

        @PostMethod('/post')
        postmethod() {}

        @GetMethod('/interceptor')
        @Interceptor(interceptorKey)
        testinterceptor() {
            return {result: 'testinterceptor'};
        }
    }

    it('Test dispatch 404', () => {
        const request = httpMocks.createRequest({method: 'GET', url: '/http404'});
        const response = httpMocks.createResponse();

        const content = _router.dispatch(request, response);

        assert.instanceOf(content, Http404);
    });

    it('Test dispatch 405', () => {
        const request = httpMocks.createRequest({method: 'POST', url: '/api/get'});
        const response = httpMocks.createResponse();

        const content = _router.dispatch(request, response);

        assert.instanceOf(content, Http405);
    });

    it('Test dispatch 200', () => {
        const request = httpMocks.createRequest({method: 'GET', url: '/api/get'});
        const response = httpMocks.createResponse();

        return _router.dispatch(request, response).then((content) => {
            assert.equal(content.result, 'get');
        });
    });

    it('Test dispatch with interceptor not pass', () => {
        const request = httpMocks.createRequest({method: 'GET', url: '/api/interceptor'});
        const response = httpMocks.createResponse();

        return _router.dispatch(request, response).then((content) => {
            assert.ok(content.intercept);
        });
    });
});
