var MySQL = require('mysql'),
  config = require('./config');

var Db = module.exports;

Db.connect = function (callback) {
  var host = config.configuration.host.split(':');

  Db.client = MySQL.createClient({
    user: config.configuration.user,
    password: config.configuration.password,
    host: host[0],
    database: config.configuration.db,
    port: host[1] == undefined ? 3306 : host[1]
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
