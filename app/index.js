/* eslint-disable no-console, no-unused-vars */

const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const logService = require('./log.service');
const routes = require('./routes');

class ExpressApp {
  constructor(app) {
    this.app = app;
    this.setMiddleware();
  }

  getApp() {
    return this.app;
  }

  setMiddleware() {
    // view engine setup
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    this.app.use(logger('dev'));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.get('heartbeat', (req, res) => {
      res.json({ success: true, message: 'working' });
    });

    this.app.use('/', routes);

    this.app.get('/ab(cd)?e', (req, res) => {
      res.json({ success: true, message: 'success' });
    });

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    this.app.use((err, req, res, next) => {
      console.log(err);
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      logService.error(err.message);

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}

const myApp = new ExpressApp(express());
export default myApp.getApp();
