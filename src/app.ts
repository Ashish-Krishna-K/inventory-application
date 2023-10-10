import createError, { HttpError } from 'http-errors';
import express, { type Request, type Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import indexRouter from './routes/index.js';
import charactersRouter from './routes/characters.js';
import visionsRouter from './routes/visions.js';
import weaponsRouter from './routes/weapons.js';

const app = express();

const mongoDevDbUrl = 'mongodb+srv://admin:coV6ZlRuLh4ROEes@cluster0.tapiqdj.mongodb.net/?retryWrites=true&w=majority';
// Connect to mongodb database.
(async () => {
  try {
    await mongoose.connect(mongoDevDbUrl);
  } catch (error) {
    console.error(error);
  }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// setting up routes
app.use('/', indexRouter);
app.use('/characters', charactersRouter);
app.use('/visions', visionsRouter);
app.use('/weapons/', weaponsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
