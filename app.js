var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var session=require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db=require('./config/connection');
const { Session } = require('inspector');
// var bodyParser = require('body-parser');
var app = express();

console.log("Data base connectd")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir:__dirname+'/views/layout/',
  partialsDir:__dirname+'/views/partials'
}))
// app.use(bodyParser.json())
app.use(logger('dev'));
// app.use(express.json());
app.use(session({secret:"key",cookie:{maxAge:30000}}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.connect((err)=>{
  if (err)console.log('Data base error')
  else console.log('Data base connected')
})
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
