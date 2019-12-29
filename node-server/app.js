var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')

// 一级路由的文件关联
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 使用app.use来实现登陆拦截
// 未登录不能操作购物车
app.use(function (req,res,next) {
  if(req.cookies.userId){
    // 允许执行请求到router
    next();
  }else{
      console.log(`path:${req.path}, originalUrl:${req.originalUrl}`);
      //允许登入登出
      // location.pathname始终是'/' ; location.href=www.localhost:8989/?id=123  用path不用考虑各种参数
      if(req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.path == '/goods/list'
          // || req.originalUrl.indexof('goods/list') >-1
      ){
          next();
      }else{
          res.json({
            status:'10001',
            msg:'当前未登录',
            result:''
          });
      }
  }
});

// 加载二级路由路径
// 加载顺序必须在最后
app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
