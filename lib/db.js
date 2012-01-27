var MySQL = require('mysql').Client,
  config = require('./config');

var Db = module.exports;

Db.connect = function (callback) {
  var client = new MySQL();

  client.user = config.configuration.user;
  client.password = config.configuration.password;

  client.query('USE ' + config.configuration.db, function(error, results) {
    if(error) {
      console.log('MySQL Connection Error: ' + error.message);
      client.end();
      return;
    }

    Db.client = client;
    callback();
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
