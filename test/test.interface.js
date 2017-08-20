/* eslint-disable import/no-extraneous-dependencies */

import {assert} from 'chai';

import IService from '../src/interface/service';
import IController from '../src/interface/controller';
import IMiddleware from '../src/interface/middleware';
import IInterceptor from '../src/interface/interceptor';

import {
    ServiceCategory,
    ControllerCategory,
    InterceptorCategory,
    MiddlewareCategory,
} from '../src/types';

describe('Test Interface', () => {
    it('Test Controller', () => {
        class Controller extends IController {}
        const _controller = new Controller(Symbol.for('request'), Symbol.for('response'));

        assert.property(Controller, ControllerCategory);
        assert.equal(_controller.request, Symbol.for('request'));
        assert.equal(_controller.response, Symbol.for('response'));
    });

    it('Test Interceptor', () => {
        class Interceptor extends IInterceptor {}
        const _interceptor = new Interceptor();

        assert.property(Interceptor, InterceptorCategory);
        assert.isFunction(_interceptor.before);
        assert.isFunction(_interceptor.after);
    });

    it('Test Middleware', (done) => {
        class Middleware extends IMiddleware {}

        assert.property(Middleware, MiddlewareCategory);
        assert.isFunction(Middleware.invoke);

        Middleware.invoke(null, null, () => done());
    });

    it('Test Service', () => {
        class Service extends IService {}

        assert.property(Service, ServiceCategory);
    });
});
