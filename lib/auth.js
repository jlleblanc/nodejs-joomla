var config = require('./config'),
  db = require('./db');
  
var Auth = module.exports;

Auth.auth_cookies = function  (cookies, callback) {
  var escaped_cookies = [];

  for (var key in cookies) {
    if (cookies.hasOwnProperty(key)) {
      escaped_cookies.push(db.client.escape(cookies[key]));
    }
  }

  var where_cookies = escaped_cookies.join();

  var query = "SELECT * FROM " + config.configuration.dbprefix + "session WHERE session_id IN (" + where_cookies + ") LIMIT 1";

  db.client.query(query, function  (error, results) {
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