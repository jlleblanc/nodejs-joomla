var util = require('util'),
    exec = require('child_process').exec,
	MySQL = require('mysql').Client,
    child,
	config;

child = exec('php config_loader.php',
  function (error, stdout, stderr) {
	config = JSON.parse(stdout);

	var client = new MySQL();

	client.user = config.user;
	client.password = config.password;

	ClientConnectionReady(client);
  }
);

ClientConnectionReady = function(client)
{
    client.query('USE ' + config.db, function(error, results) {
        if(error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }

		GetData(client);
    });
};

GetData = function(client) {
  client.query(
    'SELECT * FROM ' + config.dbprefix + 'users',
    function selectCb(error, results, fields) {
      if (error) {
          console.log('GetData Error: ' + error.message);
          client.end();
          return;
      }
      // Uncomment these if you want lots of feedback
      //console.log('Results:');
      //console.log(results);
      //console.log('Field metadata:');
      //console.log(fields);
      //console.log(sys.inspect(results));

      if(results.length > 0)
      {
		for (var i=0; i < results.length; i++) {
			var result = results[i];

	        console.log('First Name: ' + result.username);
	        console.log('Last Name: ' + result.email);
	        console.log('Message: ' + result.id);
		}
      }
	});

};
