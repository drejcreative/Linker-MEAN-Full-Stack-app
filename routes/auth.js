var jwt = require('express-jwt');
var secret = require('../config').secret;

var auth = jwt({
  secret: secret,
  userProperty: 'payload'
});

module.exports = auth;
