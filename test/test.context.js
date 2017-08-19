/* eslint-disable import/no-extraneous-dependencies */

import _ from 'lodash';
import {assert} from 'chai';

import {
    register,
    registerServiceAlias,
    getServiceRepository,
    getMiddlewareRepository,
    getControllerRepository,
    getInterceptor,
} from '../src/context';
import {
    RouteKeys,
    MiddlewareCategory,
} from '../src/types';
import {IMiddleware, IController, IService, IInterceptor} from '..';

import Service from '../src/decorators/service';
import Middleware from '../src/decorators/middleware';
import Controller from '../src/decorators/controller';
import Interceptor from '../src/decorators/interceptor';

describe('test context', () => {
    it('test registerMiddleware', () => {
        @Middleware()
        class AnonymousMiddleware extends IMiddleware {
        }

        @Middleware(['@api', {path: '/api'}])
        class ApiMiddleware extends IMiddleware {
        }

        register(AnonymousMiddleware);
        register(ApiMiddleware);

        const repository = getMiddlewareRepository();

        const foundAnonymous = _.find(repository, (_Type) => {
            const [name] = _Type[MiddlewareCategory];
            return _Type === AnonymousMiddleware && !name;
        });
        const foundApi = _.find(repository, (_Type) => {
            const [name, config = {}] = _Type[MiddlewareCategory];
            return _Type === ApiMiddleware && name === '@api' && config.path === '/api';
        });

        assert.notEqual(foundApi, undefined, 'Not anonymous middleware err!');
        assert.notEqual(foundAnonymous, undefined, 'Anonymous middleware err!');
    });

    it('test registerService', () => {
        @Service('$sevicename')
        class TestService extends IService {
        }

        register(TestService);

        const repository = getServiceRepository();

        assert.property(repository, '$sevicename');

        assert.ok(repository.$sevicename === TestService);
    });

    it('test registerServiceAlias', () => {
        @Service('$sevicename')
        class TestService extends IService {
        }

        register(TestService);
        registerServiceAlias({$auth: '$sevicename'});
        registerServiceAlias({$auth: '$aa'});

        const repository = getServiceRepository();

        assert.property(repository, '$auth');
        assert.property(repository, '$sevicename');

        assert.ok(repository.$auth === repository.$sevicename);
    });

    it('test registerController', () => {
        @Controller()
        class TestController extends IController {
        }

        register(TestController);

        const repository = getControllerRepository();


        const foundController = _.find(repository, _Type => _Type === TestController && RouteKeys in _Type);

        assert.notEqual(foundController, undefined);
    });

    it('test registerInterceptor', () => {
        @Interceptor('$interceptor')
        class TestInterceptor extends IInterceptor {
        }

        register(TestInterceptor);

        const intercepotr = getInterceptor('$interceptor');

        assert.notEqual(intercepotr, undefined);
    });
});
