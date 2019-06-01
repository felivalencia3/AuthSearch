'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _passport3 = require('./middleware/passport');

var _passport4 = _interopRequireDefault(_passport3);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// views
app.set('view engine', 'ejs');
app.set('views', _path2.default.join(__dirname, 'views'));
// logger
app.use((0, _morgan2.default)('dev'));
app.use((0, _cookieParser2.default)());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// 3rd party middleware
app.use((0, _cors2.default)({
  exposedHeaders: _config2.default.corsHeaders
}));
app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

// passport config
app.use(_passport4.default);
app.use(_express2.default.static(__dirname + '/public'));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
// connect to db
(0, _db2.default)(function () {
  // api router
  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('home', { name: req.user.displayName });
    } else {
      res.render('login');
    }
  });
  app.use('/api', (0, _api2.default)());
  app.get('/error', function (req, res) {
    res.redirect('http:/localhost:3000/error');
  });

  app.server.listen(process.env.PORT || _config2.default.port, function () {
    console.log('Started on port ' + app.server.address().port);
  });
});

exports.default = app;
//# sourceMappingURL=index.js.map