/* eslint-disable import/no-extraneous-dependencies */

import {assert} from 'chai';

import {IMiddleware, IController, IService, IInterceptor} from '../..';

import Service from '../../src/decorators/service';
import AutoInject from '../../src/decorators/invoke';
import Middleware from '../../src/decorators/middleware';
import Controller from '../../src/decorators/controller';
import Interceptor from '../../src/decorators/interceptor';

import Processor from '../../src/runtime/processor';

describe('Test Processor', () => {
    const $basename = Symbol('$base');
    const $uuapname = Symbol('$uuap');

    @Service($basename)
    class BaseService extends IService {}

    @Service($uuapname)
    @AutoInject($basename)
    class TestService extends IService {}

    @Controller('/')
    @AutoInject($uuapname)
    class TestController extends IController {}

    @AutoInject($uuapname)
    @Middleware('$uuap')
    class TestMiddleware extends IMiddleware {}

    @AutoInject($uuapname)
    @Interceptor('$interceptor')
    class TestInterceptor extends IInterceptor {}

    it('Test AutoInjectController', () => {
        const httpresponse = {setHeader: (key, value) => {
            assert.equal(key, 'key');
            assert.equal(value, 'value');
        }};

        const controller = Processor.Autowire(TestController, {}, httpresponse);

        assert.instanceOf(controller, TestController);
        assert.instanceOf(controller[$uuapname], TestService);
    });

    it('Test AutoInjectMiddleware', () => {
        const _ClasType = Processor.Autowire(TestMiddleware);

        assert.ok(_ClasType === TestMiddleware);
        assert.instanceOf(_ClasType[$uuapname], TestService);
    });

    it('Test AutoInjectInterceptor', () => {
        const interceptor = Processor.Autowire(TestInterceptor);

        assert.instanceOf(interceptor, TestInterceptor);
        assert.instanceOf(interceptor[$uuapname], TestService);
    });

    it('Test AutoInjectService', () => {
        const service = Processor.Autowire(TestService);

        assert.instanceOf(service, TestService);
        assert.instanceOf(service[$basename], BaseService);
    });
});
