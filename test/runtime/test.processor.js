/* eslint-disable import/no-extraneous-dependencies */

import {assert} from 'chai';

import {IMiddleware, IController, IService, IInterceptor} from '../..';

import Service from '../../src/decorators/service';
import Autowire from '../../src/decorators/autowired';
import Middleware from '../../src/decorators/middleware';
import Controller from '../../src/decorators/controller';
import Interceptor from '../../src/decorators/interceptor';

import Processor from '../../src/runtime/processor';

describe('test Processor', () => {
    const $basename = Symbol('$base');
    const $uuapname = Symbol('$uuap');

    @Service($basename)
    class BaseService extends IService {}

    @Service($uuapname)
    @Autowire($basename)
    class TestService extends IService {}

    @Controller('/')
    @Autowire($uuapname)
    class TestController extends IController {}

    @Autowire($uuapname)
    @Middleware('$uuap')
    class TestMiddleware extends IMiddleware {}

    @Autowire($uuapname)
    @Interceptor('$interceptor')
    class TestInterceptor extends IInterceptor {}

    it('test AutowireController', () => {
        const httpresponse = {setHeader: (key, value) => {
            assert.equal(key, 'key');
            assert.equal(value, 'value');
        }};

        const controller = Processor.Autowire(TestController, {}, httpresponse);

        assert.instanceOf(controller, TestController);
        assert.instanceOf(controller[$uuapname], TestService);
    });

    it('test AutowireMiddleware', () => {
        const _ClasType = Processor.Autowire(TestMiddleware);

        assert.ok(_ClasType === TestMiddleware);
        assert.instanceOf(_ClasType[$uuapname], TestService);
    });

    it('test AutowireInterceptor', () => {
        const interceptor = Processor.Autowire(TestInterceptor);

        assert.instanceOf(interceptor, TestInterceptor);
        assert.instanceOf(interceptor[$uuapname], TestService);
    });

    it('test AutowireService', () => {
        const service = Processor.Autowire(TestService);

        assert.instanceOf(service, TestService);
        assert.instanceOf(service[$basename], BaseService);
    });
});
