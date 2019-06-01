import {
  Router,
} from 'express';
import passport from 'passport';
import checkAuth from './checkAuth';

export default () => {
  const app = Router();
  app.get('/profile', checkAuth, (req, res) => {
    res.send({
      user: req.user,
    });
  });
  app.get('/logout', (req, res) => { req.logout(); res.redirect('/'); });
  // Facebook Login
  app.get('/facebook/login',
    passport.authenticate('facebook'));
  app.get('/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/error',
    }),
    (req, res) => {
      res.redirect('/');
    });

  // Spotify Login
  app.get('/spotify/login', passport.authenticate('spotify'));
  app.get('/spotify/callback', passport.authenticate('spotify', {
    failureRedirect: '/error',
  }), (req, res) => {
    res.cook;
    res.redirect('/');
  });

  // Github Login
  app.get('/github/login',
    passport.authenticate('github'));
  app.get('/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/error',
    }),
    (req, res) => {
      res.redirect('/');
    });
  return app;
};
