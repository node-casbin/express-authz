Express-Authz 
====
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]
[![codebeat badge](https://codebeat.co/badges/c17c9ee1-da42-4db3-8047-9574ad2b23b1)](https://codebeat.co/projects/github-com-node-casbin-express-authz-master)
[![Build Status](https://travis-ci.org/node-casbin/express-authz.svg?branch=master)](https://travis-ci.org/node-casbin/express-authz)
[![Coverage Status](https://coveralls.io/repos/github/node-casbin/express-authz/badge.svg?branch=master)](https://coveralls.io/github/node-casbin/express-authz?branch=master)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/casbin/lobby)

[npm-image]: https://img.shields.io/npm/v/casbin-express-authz.svg?style=flat-square
[npm-url]: https://npmjs.org/package/casbin-express-authz
[download-image]: https://img.shields.io/npm/dm/casbin-express-authz.svg?style=flat-square
[download-url]: https://npmjs.org/package/casbin-express-authz

Express-Authz is an authorization middleware for [Express](https://github.com/expressjs/express), it's based on ``Node-Casbin``: [https://github.com/casbin/node-casbin](https://github.com/casbin/node-casbin).

## Installation

```
npm install casbin-express-authz
```

## Simple Example

```js
const { Enforcer } = require('casbin')
const express = require('express')
const authz = require('express-authz')

const app = express()

// set userinfo
app.use((req, res, next) => {
  const username = req.get('Authorization') || 'anonymous'
  req.user = {username}
  next()
})

// use authz middleware
app.use(authz(async() => {
  // load the casbin model and policy from files, database is also supported.
  const enforcer = await Enforcer.newEnforcer("authz_model.conf", "authz_policy.csv")
  return enforcer
}))

// response
app.use((req, res, next) => {
  res.status(200).json({status: 'OK'})
})

app.listen(3000)
```

## How to control the access

The authorization determines a request based on ``{subject, object, action}``, which means what ``subject`` can perform what ``action`` on what ``object``. In this plugin, the meanings are:

1. ``subject``: the logged-on user name
2. ``object``: the URL path for the web resource like "dataset1/item1"
3. ``action``: HTTP method like GET, POST, PUT, DELETE, or the high-level actions you defined like "read-file", "write-blog"


For how to write authorization policy and other details, please refer to [the Casbin's documentation](https://casbin.org).

## Getting Help

- [Node-Casbin](https://github.com/casbin/node-casbin)

## License

This project is licensed under the [Apache 2.0 license](LICENSE).
