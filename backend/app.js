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
const { PORT = 3000 } = process.env;

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
app.use(cors());
app.options('*', cors()); // enable requests for all routes
app.use(router);
app.use(errorHandler);
app.use(errors());
app.use(errorLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

/// ///////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
