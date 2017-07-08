const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');//打印nodejs 服务器接受到的请求的信息。
const cookieParser = require('cookie-parser');//获取web浏览器发送的cookie中的内容
const bodyParser = require('body-parser');//解析http请求体
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');//页面通知中间件
const multer  = require('multer');// Express文件上传

const routes = require('./routes/index');
const settings = require('./settings');

const fs = require('fs');
const accessLog = fs.createWriteStream('access.log', {flags: 'a'});
const errorLog = fs.createWriteStream('error.log', {flags: 'a'});

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(logger({stream: accessLog}));
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}//30 days
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});