'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookStrategy = require('passport-facebook').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;
var GithubStrategy = require('passport-github').Strategy;

var authconfig = function authconfig(req, res, next) {
  _passport2.default.use(new FacebookStrategy({
    clientID: _config2.default.facebookID,
    clientSecret: _config2.default.facebookSecret,
    callbackURL: '/api/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
  }, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));
  _passport2.default.use(new GithubStrategy({
    clientID: _config2.default.githubID,
    clientSecret: _config2.default.githubSecret,
    callbackURL: '/api/github/callback'
  }, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));
  _passport2.default.use(new SpotifyStrategy({
    clientID: _config2.default.spotifyID,
    clientSecret: _config2.default.spotifySecret,
    callbackURL: '/api/spotify/callback',
    profileFields: ['id', 'displayName', 'email']
  }, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));
  _passport2.default.serializeUser(function (user, cb) {
    cb(null, user);
  });

  _passport2.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  next();
};
exports.default = authconfig;
//# sourceMappingURL=passport.js.map