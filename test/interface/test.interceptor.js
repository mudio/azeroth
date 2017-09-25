/* eslint-disable import/no-extraneous-dependencies */

import {assert} from 'chai';

import {InterceptorCategory} from '../../src/types';
import IInterceptor from '../../src/interface/interceptor';

describe('Test Interceptor', () => {
    it('Test Interceptor', () => {
        class Interceptor extends IInterceptor {}
        const _interceptor = new Interceptor();

        assert.property(Interceptor, InterceptorCategory);
        assert.isFunction(_interceptor.before);
        assert.isFunction(_interceptor.after);
    });
});
