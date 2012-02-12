var exec = require('child_process').exec,
  configuration = {};

var Config = module.exports;

Config.init = function (config, callback) {
	if (typeof config === "string") {
		exec('php ' + __dirname + '/../config_loader.php ' + config,
	    function (error, stdout, stderr) {
	      if(error) {
	        console.log('PHP Error: ' + error.message);
	        return;
	      }

	      Config.configuration = JSON.parse(stdout);
	      callback();
	  });
	} else {
		Config.configuration = config;
		callback();
	}
};