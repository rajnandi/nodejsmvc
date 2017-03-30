var Base = new (require('./BaseController'))();

Base.router.get('/', function(req, res, next) {
	console.log('hello : Node MVC Working');
  res.send('Hello Welcome to Sasta Sundar');
});

Base.router.get('/hello', function(req, res, next) {
  res.send('Hello');
});

module.exports = Base.router;
