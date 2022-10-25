const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { JWT_SECRET } = process.env;

const auth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization Required '));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Authorization Required '));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
