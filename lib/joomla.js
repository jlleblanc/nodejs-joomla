var config = require('./config'),
  db = require('./db'),
  auth = require('./auth');

var Joomla = module.exports = function Joomla (options) {
  this.options = options = options || {};
};

Joomla.init = function (conf, callback) {
  config.init(conf, function  () {
    db.connect(function  () {
      Joomla.db_client = db.client;
      callback();
    });
  });
};

Joomla.auth_cookies = function  (cookies, callback) {
  auth.auth_cookies(cookies, callback);
};