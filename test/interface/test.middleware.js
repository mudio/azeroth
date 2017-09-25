/* eslint-disable import/no-extraneous-dependencies */

import {assert} from 'chai';

import {MiddlewareCategory} from '../../src/types';
import IMiddleware from '../../src/interface/middleware';

describe('Test Middleware', () => {
    it('Test Middleware', (done) => {
        class Middleware extends IMiddleware {}

        assert.property(Middleware, MiddlewareCategory);
        assert.isFunction(Middleware.invoke);

        Middleware.invoke(null, null, () => done());
    });
});
