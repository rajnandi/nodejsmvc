var express = require('express');
var path = require('path');
var http = require('http');
var sql = require('mssql');
var loader = new (require('./lib/loader'))();
//var index = require('./routes/index');
//var users = require('./routes/users');

var routes = require('./config/routes');
var config = require('./config/config');

var app = express();

// PORT

app.set('port', config.port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
// });

var setheader = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('X-Powered-By', 'sastasundar.com');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Content-Type', 'application/json; charset=UTF-8');
    
    next();
}

var dbcon = function (req, res, next) {
    var connection = new sql.Connection(config.db, function (err) {
        if (err)
            console.log("DB connection error.", err);
        req.db = connection;
        next();
    });

}

// Routes
for (var controllerName in routes) {
    app.use('/' + routes[controllerName], dbcon, setheader, loader.loadController(controllerName));
}

http.createServer(app).listen(app.get('port'),function(){
	console.log('Hi I am listening port : ' + app.get('port'));
});
