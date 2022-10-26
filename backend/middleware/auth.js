const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// if NODE_ENV is 'production', use secret key. Otherwise use 'not-so-secret-string'
// const token = jwt.sign(
//   { _id: user._id },
//   NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string'
// );
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization Required '));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string'
    );
  } catch (err) {
    return next(new UnauthorizedError('Authorization Required '));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
