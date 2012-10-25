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

  var query = "SELECT * FROM #__session WHERE session_id IN (" + where_cookies + ") AND guest = 0 LIMIT 1";

  db.query(query, function (results) {
    if (results !== undefined && results.length > 0) {
      callback(results[0]);
    } else {
      callback();
    }
  });
};