const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('../backend/controllers/users');
const app = express();
const auth = require('../backend/middleware/auth');

/// ///////////////////////////////////////////////////////////////////

mongoose.connect('mongodb://localhost:27017/aroundb');
/// ///////////////////////////////////////////////////////////////////

const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { customError } = require('./utils/consts');
//////////////////////////////////////////////////////////////////////
app.post('/signin', login);
app.post('/signup', createUser);
/// ///////////////////////////////////////////////////////////////////
// app.use((req, res, next) => {
//   req.user = {
//     _id: '631b713165d31b22ea3d52f1',
//   };
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(cardRouter);
app.use((req, res) => {
  customError(res, 404, 'Requested resource not found');
});

router.use(auth);

//////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`App listiening on port ${PORT}`);
});
