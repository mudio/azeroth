/* eslint-disable import/no-extraneous-dependencies */

import _ from 'lodash';
import {assert} from 'chai';

import {
    RouteKeys,
    AutowiredKeys,
    InterceptorKeys,
    ServiceCategory,
    MiddlewareCategory,
    InterceptorCategory,
} from '../src/types';
import Service from '../src/decorators/service';
import Autowired from '../src/decorators/autowired';
import Middleware from '../src/decorators/middleware';
import Controller from '../src/decorators/controller';
import Interceptor from '../src/decorators/interceptor';
import {IController, IInterceptor} from '..';

import {
    PostMethod, GetMethod, PutMethod, DeleteMethod,
} from '../src/decorators/method';

describe('Test decorators', () => {
    it('Test Autowired', () => {
        @Autowired('$uuap', '$log')
        class TestAutowired {}

        assert.property(TestAutowired, AutowiredKeys);
        assert.equal(TestAutowired[AutowiredKeys][0], '$uuap');
        assert.equal(TestAutowired[AutowiredKeys][1], '$log');
    });

    it('Test Service', () => {
        @Service('$uuap')
        class TestService {
        }

        assert.property(TestService, ServiceCategory);
        assert.equal(TestService[ServiceCategory], '$uuap');
    });

    it('Test Middleware', () => {
        @Middleware('$uuap')
        class TestMiddleware {}

        assert.property(TestMiddleware, MiddlewareCategory);
        assert.equal(TestMiddleware[MiddlewareCategory][0], '$uuap');

        @Middleware(['$uuap', false])
        class TestMiddleware2 {}

        assert.equal(TestMiddleware2[MiddlewareCategory][1], false);
    });

    it('Test Controller', () => {
        @Controller()
        class TestController {}

        assert.property(TestController, RouteKeys);
        assert.equal(TestController[RouteKeys], '/');

        @Controller('api/get')
        class TestController2 {}

        assert.equal(TestController2[RouteKeys], 'api/get');

        @Controller(() => true)
        class TestController3 {}

        assert.isFunction(TestController3[RouteKeys]);
    });

    it('Test Interceptor', () => {
        @Interceptor('$interceptor')
        class TestInterceptor extends IInterceptor {}

        assert.property(TestInterceptor, InterceptorCategory);
        assert.equal(TestInterceptor[InterceptorCategory], '$interceptor');

        @Interceptor('$interceptor')
        class TestController extends IController {}

        const foundInterceptor = _.find(TestController[InterceptorKeys], _Type => _Type[0] === '$interceptor');
        assert.property(TestController, InterceptorKeys);
        assert.notEqual(foundInterceptor, undefined);

        class TestController2 extends IController {
            @Interceptor('$interceptor1', '$interceptor2')
            getmehod() {}
        }

        assert.equal(TestController2[InterceptorKeys].getmehod[0], '$interceptor1');
        assert.equal(TestController2[InterceptorKeys].getmehod[1], '$interceptor2');
    });

    it('Test Method', () => {
        class GetController extends IController {
            @GetMethod('/')
            getmethod() {}

            @PostMethod('/post')
            postmethod() {}

            @PutMethod('/api/put')
            putmethod() {}

            @DeleteMethod('/api/delete')
            deletemethod() {}
        }

        assert.property(GetController, Symbol.for('GET'));
        assert.property(GetController, Symbol.for('POST'));
        assert.property(GetController, Symbol.for('DELETE'));
        assert.property(GetController, Symbol.for('PUT'));

        const getMethod = _.find(
            GetController[Symbol.for('GET')],
            ([key, config]) => key === 'getmethod' && config.match === '/',
        );
        assert.notEqual(getMethod, undefined);

        const postMethod = _.find(
            GetController[Symbol.for('POST')],
            ([key, config]) => key === 'postmethod' && config.match === '/post',
        );
        assert.notEqual(postMethod, undefined);

        const putmethod = _.find(
            GetController[Symbol.for('PUT')],
            ([key, config]) => key === 'putmethod' && config.match === '/api/put',
        );
        assert.notEqual(putmethod, undefined);

        const deletemethod = _.find(
            GetController[Symbol.for('DELETE')],
            ([key, config]) => key === 'deletemethod' && config.match === '/api/delete',
        );
        assert.notEqual(deletemethod, undefined);
    });
});
