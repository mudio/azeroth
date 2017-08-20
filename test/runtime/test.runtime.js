/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

import Runtime from '../../src/runtime';

describe('test Runtime', () => {
    const _runtime = new Runtime({workspace: `${__dirname}/${__filename}`});

    it('test Runtime', (done) => {
        _runtime.run().then((server) => {
            request(server.listen(8844))
                .get('/')
                .expect(404, 'Not Found', done);
        });
    });
});
