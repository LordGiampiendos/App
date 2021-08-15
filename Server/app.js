var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');
var prenotazioniRouter = require('./routes/prenotazioni');
var parcheggiRouter = require('./routes/parcheggi');
var impiegatiRouter = require('./routes/impiegati');
var notificheRouter = require('./routes/notifiche');
var utenteRouter = usersRouter.router;

var app = express();

app.use(cors({credentials: true, origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', utenteRouter);
app.use('/prenotazioni', prenotazioniRouter);
app.use('/parcheggi', parcheggiRouter);
app.use('/impiegati', impiegatiRouter);
app.use('/notifiche', notificheRouter);

app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
});

module.exports = app;
