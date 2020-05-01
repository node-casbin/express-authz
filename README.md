# Express-Authz

[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]
[![codebeat badge](https://codebeat.co/badges/d179eb87-cf80-4ddb-ac94-a72a564a2fda)](https://codebeat.co/projects/github-com-node-casbin-express-authz-master)
[![Build Status](https://travis-ci.org/node-casbin/express-authz.svg?branch=master)](https://travis-ci.org/node-casbin/express-authz)
[![Coverage Status](https://coveralls.io/repos/github/node-casbin/express-authz/badge.svg?branch=master)](https://coveralls.io/github/node-casbin/express-authz?branch=master)
[![Release](https://img.shields.io/github/release/node-casbin/express-authz.svg)](https://github.com/node-casbin/express-authz/releases/latest)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/casbin/lobby)

[npm-image]: https://img.shields.io/npm/v/casbin-express-authz.svg?style=flat-square
[npm-url]: https://npmjs.org/package/casbin-express-authz
[download-image]: https://img.shields.io/npm/dm/casbin-express-authz.svg?style=flat-square
[download-url]: https://npmjs.org/package/casbin-express-authz

Express-Authz is an authorization middleware for [Express](https://github.com/expressjs/express), it's based on `Node-Casbin`: [https://github.com/casbin/node-casbin](https://github.com/casbin/node-casbin).

## Installation

### use casbin v2.x

```shell
npm install casbin@2 casbin-express-authz@1 --save
```

### use casbin v3.x

```shell
npm install casbin@3 casbin-express-authz@2 --save
```

or you can simply use,

```shell
npm install express casbin casbin-express-authz --save
```

## Usage with Basic HTTP Authentication

By default casbin-authz supports HTTP Basic Authentication of the form `Authentication: Basic {Base64Encoded(username:password)}`

## Usage with Other HTTP Authentication

To use other HTTP Authentication like `Bearer/Digest` you can use a custom middleware to define the `res.locals.username` variable and casbin-authz will automatically pick up the value from the variable.

```js
const { newEnforcer } = require('casbin');
const express = require('express');
const { authz } = require('casbin-express-authz');

const app = express();
const enforcer = newEnforcer('examples/authz_model.conf', 'examples/authz_policy.csv');

// set userinfo
app.use((req, res, next) => {
  res.locals.username = getUsernameFromToken(); // Your custom function for retrieving username
  next();
});

// use authz middleware
app.use(authz({ newEnforcer: enforcer }));

// response
app.use((req, res, next) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(3000);
```

### Usage with customized authorizer

This package provides `BasicAuthorizer`, it uses HTTP Basic Authentication as the authentication method. If you want to use another authentication method like OAuth, you needs to implement Authorizer as below:

```typescript
import { Enforcer, newEnforcer } from 'casbin';
import { authz, Authorizer } from 'casbin-express-authz';
import * as express from 'express';

const app = express();

class MyAuthorizer implements Authorizer {
  private e: Enforcer;

  constructor(e: Enforcer) {
    this.e = e;
  }

  checkPermission(): Promise<boolean> {
    // do something
    return true;
  }
}
const e = newEnforcer('examples/authz_model.conf', 'examples/authz_policy.csv');

app.use(
  authz({
    newEnforcer: e,
    authorizer: new MyAuthorizer(e),
  })
);

app.listen(3000);
```

## How to control the access

The authorization determines a request based on `{subject, object, action}`, which means what `subject` can perform what `action` on what `object`. In this plugin, the meanings are:

1. `subject`: the logged-on user name
2. `object`: the URL path for the web resource like "dataset1/item1"
3. `action`: HTTP method like GET, POST, PUT, DELETE, or the high-level actions you defined like "read-file", "write-blog"

For how to write authorization policy and other details, please refer to [the Casbin's documentation](https://casbin.org).

## Getting Help

- [Node-Casbin](https://github.com/casbin/node-casbin)

## License

This project is licensed under the [Apache 2.0 license](LICENSE).
