// Copyright 2018 The Casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import server from './server';
import customServer from './customserver';
import * as supertest from 'supertest';

const request = supertest(server);
const customRequest = supertest(customServer);

describe('pass through tests', () => {
  test('test: p, alice, /dataset1/*, GET', (done) => {
    request
      .get('/dataset1/name')
      .set('Authorization', `Basic ${Buffer.from('alice:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p, alice, /dataset1/resource1, POST', (done) => {
    request
      .post('/dataset1/resource1')
      .set('Authorization', `Basic ${Buffer.from('alice:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: bob, /dataset2/folder1/*, POST', (done) => {
    request
      .post('/dataset2/folder1/file')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - GET', (done) => {
    request
      .get('/dataset2/resource1')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - POST', (done) => {
    request
      .post('/dataset2/resource1')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - PUT', (done) => {
    request
      .put('/dataset2/resource1')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - DELETE', (done) => {
    request
      .delete('/dataset2/resource1')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource2, GET', (done) => {
    request
      .get('/dataset2/resource2')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - GET', (done) => {
    request
      .get('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('cathy:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - POST', (done) => {
    request
      .post('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('cathy:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - PUT', (done) => {
    request
      .put('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('cathy:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - DELETE', (done) => {
    request
      .delete('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('cathy:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('success through tests', () => {
  test('test: p, alice, /dataset1/*, GET - 403', (done) => {
    request
      .post('/dataset1/users')
      .set('Authorization', `Basic ${Buffer.from('alice:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p, alice, /dataset1/resource1, POST - 403', (done) => {
    request
      .post('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('alice:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: bob, /dataset2/folder1/*, POST', (done) => {
    request
      .put('/dataset2/folder1/file')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - GET', (done) => {
    request
      .get('/dataset2/resource')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - POST', (done) => {
    request
      .post('/dataset2/resource')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - PUT', (done) => {
    request
      .put('/dataset2/resource')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource1, * - DELETE', (done) => {
    request
      .delete('/dataset2/resource')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p, bob, /dataset2/resource2, GET', (done) => {
    request
      .post('/dataset2/resource2')
      .set('Authorization', `Basic ${Buffer.from('bob:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - GET', (done) => {
    request
      .get('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('chalin:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - POST', (done) => {
    request
      .post('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('chalin:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - PUT', (done) => {
    request
      .put('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('chalin:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - DELETE', (done) => {
    request
      .delete('/dataset1/resource')
      .set('Authorization', `Basic ${Buffer.from('chalin:password').toString('base64')}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - DELETE', (done) => {
    request
      .delete('/dataset1/resource')
      .set('Authorization', `Basic alice`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });
});

describe('pass through custom server tests', () => {
  test('test: p, alice, /dataset1/*, GET', (done) => {
    customRequest.get('/dataset1/name').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('no header and no custom username test', (done) => {
    request.put('/dataset1/resource').then((response) => {
      expect(response.statusCode).toBe(403);
      done();
    });
  });

  test('different HTTP Authentication test', (done) => {
    request
      .put('/dataset1/resource')
      .set('Authorization', `Bearer awdhdjshdcxckcfk`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('invalid header test', (done) => {
    request
      .put('/dataset1/resource')
      .set('Authorization', `awdhdjshdcxckcfk`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });

  test('test: p & g, dataset1_admin, /dataset1/*, * - DELETE', (done) => {
    customRequest.delete('/dataset1/resource').then((response) => {
      expect(response.statusCode).toBe(403);
      done();
    });
  });
});
