/* eslint-disable import/no-extraneous-dependencies */

import _ from 'lodash';
import {assert} from 'chai';

import {httpcode} from '..';

describe('test httpcode', () => {
    it('test httpcode', () => {
        Object.keys(httpcode).forEach((key) => {
            const code = new httpcode[key]('Message');
            assert.ok(_.isError(code));
            assert.equal(code.HttpCode, +key.match(/^Http([\d]{3})/)[1]);
            assert.typeOf(code.HttpMessage, 'string');
            assert.equal(code.message, 'Message');
        });
    });
});
