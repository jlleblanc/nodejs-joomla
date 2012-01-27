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
