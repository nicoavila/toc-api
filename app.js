const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const JWT = require('jsonwebtoken');
const fs = require('fs');

//Definición de rutas
const indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuarios');

//Instancia de ExpressJS
const app = express();

//Rutas excluidas de la validación de JWT (agregar cualquiera)
const excludedRoutes = [];

//Middleware que checkea el header de autenticación en la API
app.use((req, res, next) => {
  
  let successResponse = { status: null, data: null };
  let errorResponse = { status: null, statusText: null };
  let token;

  let urlParts = req.originalUrl.split('/');
  if (excludedRoutes.indexOf(urlParts[3]) > -1 || req.method == 'OPTIONS') {
    return next();
  }

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      let scheme = parts[0];
      let credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      errorResponse.status = 400;
      errorResponse.statusText = 'El token provisto está mal formado';
      return res.status(400).json(errorResponse);
    }
  } else {
    errorResponse.status = 400;
    errorResponse.statusText = 'El header de Autorizacion no esta presente';
    return res.status(400).json(errorResponse);
  }

  const cert = fs.readFileSync('./certificate.pem');
  JWT.verify(token, cert, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      errorResponse.status = 400;
      errorResponse.statusText = 'El token provisto es invalido';
      return res.status(400).json(errorResponse);
    }

    return next();
  });
});

//Engine de Vista (usando Jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Configuración
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Habilita CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//Uso de rutas
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);

//404 Catch
app.use(function(req, res, next) {
  next(createError(404));
});

//Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
