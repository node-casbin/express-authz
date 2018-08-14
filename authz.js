// Copyright 2014 Manu Martinez-Almeida.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const { Enforcer } = require('casbin')

// authz returns the authorizer, uses a Casbin enforcer as input
module.exports = function authz (newEnforcer) {
  return async (req, res, next) => {
		const enforcer = await newEnforcer()
		if (!(enforcer instanceof Enforcer)) {
			res.status(500).json({500: 'Invalid enforcer'})
			return
		}
		const authzorizer = new BasicAuthorizer(req, enforcer)
		if (!authzorizer.checkPermission()) {
			res.status(403).json({403: 'Forbidden'})
			return
		}
		next()
  }
}

// BasicAuthorizer class stores the casbin handler
class BasicAuthorizer {
	constructor(req, enforcer) {
		this.req = req
		this.enforcer = enforcer
	}

	// getUserName gets the user name from the request.
	// Currently, only HTTP basic authentication is supported
	getUserName() {
		// customize to get username from context
		const {user} = this.req
		const {username} = user
		return username
	}

	// checkPermission checks the user/method/path combination from the request.
	// Returns true (permission granted) or false (permission forbidden)
	checkPermission() {
		const {req, enforcer} = this
		const {originalUrl: path, method} = req
		const user = this.getUserName()
		return enforcer.enforce(user, path, method)
	}
}
