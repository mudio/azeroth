/* eslint-disable import/no-extraneous-dependencies */

import {assert} from 'chai';

import {ServiceCategory} from '../../src/types';
import IService from '../../src/interface/service';

describe('Test Service', () => {
    it('Test Service', () => {
        class Service extends IService {}

        assert.property(Service, ServiceCategory);
    });
});
