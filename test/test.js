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

const request = require('supertest')
const app = require('./server')

describe('pass through tests', () => {
  const agent = request(app.listen())

  it('test: p, alice, /dataset1/*, GET', done => {
    agent
    .get('/dataset1/users')
    .set('Authorization', 'alice')
    .expect(200, done())
  })

  it('test: p, alice, /dataset1/resource1, POST', done => {
    agent
    .post('/dataset1/resource1')
    .set('Authorization', 'alice')
    .expect(200, done())
  })

  it('test: bob, /dataset2/folder1/*, POST', done => {
    agent
    .post('/dataset2/folder1/file')
    .set('Authorization', 'bob')
    .expect(403, done())
  })

  it('test: p, bob, /dataset2/resource1, * - GET', done => {
    agent
    .get('/dataset2/resource1')
    .set('Authorization', 'bob')
    .expect(200, done())
  })

  it('test: p, bob, /dataset2/resource1, * - POST', done => {
    agent
    .post('/dataset2/resource1')
    .set('Authorization', 'bob')
    .expect(200, done())
  })

  it('test: p, bob, /dataset2/resource1, * - PUT', done => {
    agent
    .put('/dataset2/resource1')
    .set('Authorization', 'bob')
    .expect(200, done())
  })

  it('test: p, bob, /dataset2/resource1, * - DELETE', done => {
    agent
    .delete('/dataset2/resource1')
    .set('Authorization', 'bob')
    .expect(200, done())
  })

  it('test: p, bob, /dataset2/resource2, GET', done => {
    agent
    .get('/dataset2/resource2')
    .set('Authorization', 'bob')
    .expect(200, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - GET', done => {
    agent
    .get('/dataset1/resource')
    .set('Authorization', 'cathy')
    .expect(200, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - POST', done => {
    agent
    .post('/dataset1/resource')
    .set('Authorization', 'cathy')
    .expect(200, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - PUT', done => {
    agent
    .put('/dataset1/resource')
    .set('Authorization', 'cathy')
    .expect(200, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - DELETE', done => {
    agent
    .delete('/dataset1/resource')
    .set('Authorization', 'cathy')
    .expect(200, done())
  })
})

describe('success through tests', () => {
  const agent = request(app.listen())

  it('test: p, alice, /dataset1/*, GET - 403', done => {
    agent
    .post('/dataset1/users')
    .set('Authorization', 'alice')
    .expect(403, done())
  })

  it('test: p, alice, /dataset1/resource1, POST - 403', done => {
    agent
    .post('/dataset1/resource')
    .set('Authorization', 'alice')
    .expect(403, done())
  })

  it('test: bob, /dataset2/folder1/*, POST', done => {
    agent
    .put('/dataset2/folder1/file')
    .set('Authorization', 'bob')
    .expect(403, done())
  })

  it('test: p, bob, /dataset2/resource1, * - GET', done => {
    agent
    .get('/dataset2/resource')
    .set('Authorization', 'bob')
    .expect(403, done())
  })

  it('test: p, bob, /dataset2/resource1, * - POST', done => {
    agent
    .post('/dataset2/resource')
    .set('Authorization', 'bob')
    .expect(403, done())
  })

  it('test: p, bob, /dataset2/resource1, * - PUT', done => {
    agent
    .put('/dataset2/resource')
    .set('Authorization', 'bob')
    .expect(403, done())
  })

  it('test: p, bob, /dataset2/resource1, * - DELETE', done => {
    agent
    .delete('/dataset2/resource')
    .set('Authorization', 'bob')
    .expect(403, done())
  })

  it('test: p, bob, /dataset2/resource2, GET', done => {
    agent
    .post('/dataset2/resource2')
    .set('Authorization', 'bob')
    .expect(403, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - GET', done => {
    agent
    .get('/dataset1/resource')
    .set('Authorization', 'chalin')
    .expect(403, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - POST', done => {
    agent
    .post('/dataset1/resource')
    .set('Authorization', 'chalin')
    .expect(403, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - PUT', done => {
    agent
    .put('/dataset1/resource')
    .set('Authorization', 'chalin')
    .expect(403, done())
  })

  it('test: p & g, dataset1_admin, /dataset1/*, * - DELETE', done => {
    agent
    .delete('/dataset1/resource')
    .set('Authorization', 'chalin')
    .expect(403, done())
  })
})
