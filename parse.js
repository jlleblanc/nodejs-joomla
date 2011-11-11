var util = require('util'),
    exec = require('child_process').exec,
    child;

child = exec('php config_loader.php',
  function (error, stdout, stderr) {
	var config = JSON.parse(stdout);
    console.log(config);
});