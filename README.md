# Joomla connector module for Node

This module assumes you have an existing Joomla installation and wish to connect to it. The constructor takes either a path to the root of the Joomla installation, or a JavaScript object literal with the configuration details. When the module connects to the database, it executes the callback function you pass in.

## Installation

Using `npm`:

	npm install joomla

You can also clone this repository into your `node_modules` directory.

## Examples

### Path style

	var joomla = require('joomla');

	joomla('/path/to/joomla/site');


### Object literal style

	var joomla = require('joomla');

	joomla({
		db: 'test_joomla_node',
		user: 'root',
		host: 'localhost',
		password: ''
	});

## Authorization

Once connected to the site, you can authenticate against the Joomla database using the request cookies. Here's an example using Connect, assuming a pre-connected `joomla` object:

	var connect = require('connect');

	connect.createServer(connect.cookieParser(), function (req, res, next) {

	  joomla.auth_cookies(req.cookies, function  (result) {
	    res.writeHead(200, {'Content-Type': 'text/plain'});

	    if (result !== undefined) {
	      res.end(result.username + ' ' + result.userid);
	    } else {
	      res.end('no session');
	    }
	  });

	}).listen(8080, "localhost");

## Queries

You can also use the db.query function to make queries against the database:

	joomla.db.query('SELECT * FROM #__users', function  (results) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    for (var i=0; i < results.length; i++) {
      var row = results[i];

      res.end(row.username + "\n");
    }

  });

The `#__` prefix is automatically converted to the prefix set in your Joomla configuration.
