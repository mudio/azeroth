/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

import {runServer} from '../';

describe('test azeroth', (done) => {
    it('test runServer', () => {
        runServer(8888).then((server) => {
            request(server)
                .get('/')
                .expect(200, 'hello, world!', done);
        });
    });
});
