import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
import favicon from 'serve-favicon';
import initializeDb from './db';
import authconfig from './middleware/passport';
import api from './api';
import config from './config.json';

const app = express();
app.server = http.createServer(app);

// views
app.set('view engine', 'ejs');
app.use(favicon(`${__dirname}/nodejs_icon.ico`));
app.set('views', path.join(__dirname, 'views'));
// logger
app.use(morgan('dev'));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// passport config
app.use(authconfig);
app.use(express.static(`${__dirname}/public`));
app.use(passport.initialize());
app.use(passport.session());
// connect to db
initializeDb(() => {
  // api router
  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.render('home', { name: req.user.displayName });
    } else {
      res.render('login');
    }
  });
  app.use('/api', api());
  app.get('/error', (req, res) => {
    res.redirect('http:/localhost:3000/error');
  });

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
