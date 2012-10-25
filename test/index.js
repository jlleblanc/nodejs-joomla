var joomla = require('../lib/joomla');

describe('Joomla', function  () {
  describe('constructor', function  () {
    it('should take blank object', function (done) {
      joomla({
        db: 'test_joomla_node',
        user: 'root',
        host: 'localhost',
        password: ''
      });
      done();
    });
  });
  
  describe('constructor', function  () {
    it('should take path to Joomla installation', function (done) {
      joomla(__dirname);
      done();
    });
  });

  describe('query', function  () {
    it('should return a list of users', function  (done) {
      var query = "SELECT * FROM #__users";

      joomla.db.query(query, function  (results) {
        if (results === undefined) {
          throw "No results from " + query;
        }
        
        done();
      });
    });
  });
});