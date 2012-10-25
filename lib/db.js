var MySQL = require('mysql'),
  config = require('./config');

var Db = module.exports;

Db.connect = function (callback) {
  Db.client = MySQL.createClient({
    user: config.configuration.user,
    password: config.configuration.password,
    host: config.configuration.host,
    database: config.configuration.db
  });
};

Db.query = function (query_string, callback) {
  query_string = query_string.replace('#__', config.configuration.dbprefix);

  Db.client.query(query_string, function  (error, results) {
    if (error) {
      console.log('MySQL query error, following query failed: ' + query_string + "\nWith this message: " + error);
      callback();
      return;
    }

    callback(results);
  });  
};
