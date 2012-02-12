var config = require('./config'),
  db = require('./db'),
  auth = require('./auth');

var Joomla = module.exports = function (conf, callback) {
  config.init(conf, function  () {
    db.connect(function  () {
      Joomla.db_client = db.client;
      Joomla.db = db;
      callback();
    });
  });
};

Joomla.auth_cookies = function  (cookies, callback) {
  auth.auth_cookies(cookies, callback);
};