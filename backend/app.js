const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const auth = require('../backend/middleware/auth');
require('dotenv').config({ path: './.env' });
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes');

/// ///////////////////////////////////////////////////////////////////

const { MONGODB_URI = 'mongodb://localhost:27017/aroundb' } = process.env;
mongoose.connect(MONGODB_URI);

/// ///////////////////////////////////////////////////////////////////

const { PORT = 3001 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { customError } = require('./utils/consts');
const { requestLogger, errorLogger } = require('./middleware/logger');

const allowedOrigins = '*';
app.use(cors({ origin: allowedOrigins }));
app.use(requestLogger); // enabling the request logger
//////////////////////////////////////////////////////////////////////
// app.post('/signin', login);
// app.post('/signup', createUser);
/// ///////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  req.user = {
    _id: '631b713165d31b22ea3d52f1',
  };
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// app.use((req, res) => {
//   customError(res, 404, 'Requested resource not found');
// });

userRouter.use(auth);
cardRouter.use(auth);
app.use(errorHandler);
app.use(errors());
app.use(errorLogger);

//////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`App listiening on port ${PORT}`);
});
