var util = require('util'),
  exec = require('child_process').exec,
  MySQL = require('mysql').Client;

var Joomla = module.exports = function Joomla (options) {
  this.options = options = options || {};
};

Joomla.connect = function (callback) {
  var client = new MySQL();

  client.user = Joomla.config.user;
  client.password = Joomla.config.password;

  client.query('USE ' + Joomla.config.db, function(error, results) {
    if(error) {
      console.log('MySQL Connection Error: ' + error.message);
      client.end();
      return;
    }

    Joomla.mysql_client = client;
    callback();
  });
};

Joomla.configure = function (config, callback) {
	if (typeof config === "string") {
		exec('php node_modules/node-joomla/config_loader.php ' + config,
	    function (error, stdout, stderr) {
	      if(error) {
	        console.log('PHP Error: ' + error.message);
	        return;
	      }

	      Joomla.config = JSON.parse(stdout);
	      Joomla.connect(callback);
	  });
	} else {
		Joomla.config = config;
		Joomla.connect(callback);
	}
};

Joomla.auth_cookies = function  (cookies, callback) {
  var escaped_cookies = [];

  for (var key in cookies) {
    if (cookies.hasOwnProperty(key)) {
      escaped_cookies.push(Joomla.mysql_client.escape(cookies[key]));
    }
  }

  var where_cookies = escaped_cookies.join();

  var query = "SELECT * FROM " + Joomla.config.dbprefix + "session WHERE session_id IN (" + where_cookies + ") LIMIT 1";

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