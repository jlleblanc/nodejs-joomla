var MySQL = require('mysql').Client,
  config = require('./config');

var Joomla = module.exports = function Joomla (options) {
  this.options = options = options || {};
};

Joomla.init = function (conf, callback) {
  config.init(conf, function  () {
    Joomla.connect(function  () {
      callback();
    });
  });
};

Joomla.connect = function (callback) {
  var client = new MySQL();

  client.user = config.configuration.user;
  client.password = config.configuration.password;

  client.query('USE ' + config.configuration.db, function(error, results) {
    if(error) {
      console.log('MySQL Connection Error: ' + error.message);
      client.end();
      return;
    }

    Joomla.mysql_client = client;
    callback();
  });
};

Joomla.auth_cookies = function  (cookies, callback) {
  var escaped_cookies = [];

  for (var key in cookies) {
    if (cookies.hasOwnProperty(key)) {
      escaped_cookies.push(Joomla.mysql_client.escape(cookies[key]));
    }
  }

  var where_cookies = escaped_cookies.join();

  var query = "SELECT * FROM " + config.configuration.dbprefix + "session WHERE session_id IN (" + where_cookies + ") LIMIT 1";

  Joomla.mysql_client.query(query, function  (error, results) {
    if (error) {
      console.log('MySQL query error, following query failed: ' + query + "\nWith this message: " + error);
      callback();
      return;
    }

    if (results.length > 0) {
      callback(results[0]);
    } else {
      callback();
    }
  });
};