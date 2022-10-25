const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const cors = require('cors');
const { limiter } = require('./middleware/limiter');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes');

/// ///////////////////////////////////////////////////////////////////
const { PORT = 3000 || process.env } = process.env;

const { MONGODB_URI = 'mongodb://localhost:27017/aroundb' } = process.env;
mongoose.connect(MONGODB_URI);

/// ///////////////////////////////////////////////////////////////////

const { requestLogger, errorLogger } = require('./middleware/logger');

app.use(requestLogger); // enabling the request logger
app.use(limiter);
app.use(helmet());

/// ///////////////////////////////////////////////////////////////////
/// ///////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);
app.use(errors());
app.use(errorLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
// An array of domains from which cross-domain requests are allowed
const allowedCors = [
  'https://www.aroundtamer.students.nomoredomainssbs.ru/',
  'https://aroundtamer.students.nomoredomainssbs.ru/',
  'https://api.aroundtamer.students.nomoredomainssbs.ru/',

  'localhost:3000',
];

app.use(function (req, res, next) {
  const { origin } = req.headers; // saving the request source to the 'origin' variable
  // checking that the source of the request is mentioned in the list of allowed ones
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  next();
  const { method } = req; // Saving the request type (HTTP method) to the corresponding variable

  // Default value for Access-Control-Allow-Methods header (all request types are allowed)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // If this is a preliminary request, add the required headers
  if (method === 'OPTIONS') {
    // allowing cross-domain requests of any type (default)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
});

app.use(cors());
app.options('*', cors()); //enable requests for all routes

/// ///////////////////////////////////////////////////////////////////

app.listen(PORT);
console.log('port', PORT);
console.log(process.env.NODE_ENV);
