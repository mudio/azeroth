/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

import {runServer} from '../';

describe('Test azeroth', (done) => {
    it('Test runServer', () => {
        runServer(8888).then((server) => {
            request(server)
                .get('/')
                .expect(200, 'hello, world!', done);
        });
    });
});
