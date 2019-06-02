import passport from 'passport';
import config from '../config.json';

const FacebookStrategy = require('passport-facebook').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const GithubStrategy = require('passport-github').Strategy;

const authconfig = (req, res, next) => {
  passport.use(new FacebookStrategy({
    clientID: config.facebookID,
    clientSecret: config.facebookSecret,
    callbackURL: 'https://authsearch.herokuapp.com/api/facebook/callback',
    profileFields: ['id', 'displayName', 'email'],
  }, ((accessToken, refreshToken, profile, cb) => cb(null, profile))));
  passport.use(new GithubStrategy({
    clientID: config.githubID,
    clientSecret: config.githubSecret,
    callbackURL: 'https://authsearch.herokuapp.com/api/github/callback',
  }, ((accessToken, refreshToken, profile, cb) => cb(null, profile))));
  passport.use(new SpotifyStrategy({
    clientID: config.spotifyID,
    clientSecret: config.spotifySecret,
    callbackURL: 'https://authsearch.herokuapp.com/api/spotify/callback',
    profileFields: ['id', 'displayName', 'email'],
  }, ((accessToken, refreshToken, profile, cb) => cb(null, profile))));
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
  next();
};
export default authconfig;
