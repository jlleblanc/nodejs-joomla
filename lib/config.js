var exec = require('child_process').exec,
  fs = require('fs');

var Config = module.exports;

Config.init = function (config) {
  if (typeof config === "string") {

    Config.configuration = {};

    var config_file = fs.readFileSync(config + '/configuration.php', 'UTF-8'),
      match,
      re = /public \$(\S+) = '(\S+)';/g;

    while(match = re.exec(config_file)) {
      Config.configuration[match[1]] = match[2];
    }

  } else {
    Config.configuration = config;
  }
};