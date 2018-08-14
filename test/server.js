const { Enforcer } = require('casbin')
const express = require('express')
const authz = require('../authz')

const app = express()

// response
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
  res.status(200).json({200: 'OK'})
})

// app.listen(3000)

module.exports = app
