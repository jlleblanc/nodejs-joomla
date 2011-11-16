var util = require('util'),
  exec = require('child_process').exec,
  MySQL = require('mysql').Client,
  config;

var Joomla = module.exports = function Joomla (options) {
  this.options = options = options || {};
};

var parse_config = function (callback) {
  exec('php node_modules/node-joomla/config_loader.php',
    function (error, stdout, stderr) {
      if(error) {
        console.log('PHP Error: ' + error.message);
        return;
      }

      config = JSON.parse(stdout);
      callback(config);
  });
};

var make_mysql_client = function (config, callback) {
  var client = new MySQL();

  client.user = config.user;
  client.password = config.password;

  client.query('USE ' + config.db, function(error, results) {
    if(error) {
      console.log('MySQL Connection Error: ' + error.message);
      client.end();
      return;
    }

    callback(client);
  });
};

Joomla.connect = function (callback) {
  parse_config(function (config) {
    Joomla.config = config;
    
    make_mysql_client(config, function (client) {
      Joomla.mysql_client = client;
      
      callback();
    });
  });
};


// GetData = function(client) {
//   client.query(
//     'SELECT * FROM ' + config.dbprefix + 'users',
//     function selectCb(error, results, fields) {
//       if (error) {
//           console.log('GetData Error: ' + error.message);
//           client.end();
//           return;
//       }
//       // Uncomment these if you want lots of feedback
//       //console.log('Results:');
//       //console.log(results);
//       //console.log('Field metadata:');
//       //console.log(fields);
//       //console.log(sys.inspect(results));
// 
//       if(results.length > 0)
//       {
//    for (var i=0; i < results.length; i++) {
//      var result = results[i];
// 
//          console.log('First Name: ' + result.username);
//          console.log('Last Name: ' + result.email);
//          console.log('Message: ' + result.id);
//    }
//       }
//  });
// 
// };
