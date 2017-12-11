/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

import Runtime from '../../src/runtime';
import Service from '../../src/decorators/service';
import Middleware from '../../src/decorators/middleware';
import Controller from '../../src/decorators/controller';
import Interceptor from '../../src/decorators/interceptor';
import {IMiddleware, IController, IService, IInterceptor} from '../../src/index';

describe('Test Runtime', () => {
    const _runtime = new Runtime({
        workspace: `${__dirname}/${__filename}`,
        services: {
            alias: {
                $RuntimeServiceAlias: '$RuntimeService',
            },
        },
        middlewares: {
            match: {
                '@RuntimeMiddleware': '/api',
            },
            denyAnonymous: true,
        },
        plugins: [
            (req, res, next) => next(),
        ],
    });

    @Service('$RuntimeService')
    class TestService extends IService {} // eslint-disable-line no-unused-vars

    @Controller('/')
    class TestController extends IController {} // eslint-disable-line no-unused-vars

    @Middleware('@RuntimeMiddleware')
    class TestMiddleware extends IMiddleware {} // eslint-disable-line no-unused-vars

    @Middleware()
    class TestMiddleware2 extends IMiddleware {} // eslint-disable-line no-unused-vars

    @Interceptor('$RuntimeInterceptor')
    class TestInterceptor extends IInterceptor {} // eslint-disable-line no-unused-vars

    it('Test Runtime', (done) => {
        _runtime.run().then((server) => {
            request(server.listen(8844))
                .get('/')
                .expect(404, 'Not Found', done);
        });
    });
});
