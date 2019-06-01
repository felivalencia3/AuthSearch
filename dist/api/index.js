'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _checkAuth = require('./checkAuth');

var _checkAuth2 = _interopRequireDefault(_checkAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var app = (0, _express.Router)();
  app.get('/profile', _checkAuth2.default, function (req, res) {
    res.send({
      user: req.user
    });
  });
  app.get('/logout', function (req, res) {
    req.logout();res.redirect('/');
  });
  // Facebook Login
  app.get('/facebook/login', _passport2.default.authenticate('facebook'));
  app.get('/facebook/callback', _passport2.default.authenticate('facebook', {
    failureRedirect: '/error'
  }), function (req, res) {
    res.redirect('/');
  });

  // Spotify Login
  app.get('/spotify/login', _passport2.default.authenticate('spotify'));
  app.get('/spotify/callback', _passport2.default.authenticate('spotify', {
    failureRedirect: '/error'
  }), function (req, res) {
    res.cook;
    res.redirect('/');
  });

  // Github Login
  app.get('/github/login', _passport2.default.authenticate('github'));
  app.get('/github/callback', _passport2.default.authenticate('github', {
    failureRedirect: '/error'
  }), function (req, res) {
    res.redirect('/');
  });
  return app;
};
//# sourceMappingURL=index.js.map