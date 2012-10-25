var config = require('./config'),
  db = require('./db'),
  auth = require('./auth');

var Joomla = module.exports = function (conf) {
  config.init(conf);
  db.connect();
  Joomla.db = db;
};

Joomla.auth_cookies = function  (cookies, callback) {
  auth.auth_cookies(cookies, callback);
};

