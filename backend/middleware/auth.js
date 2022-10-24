const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const auth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Error('Authorization Required '));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  console.log('payload', payload);

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Error('Authorization Required '));

    // console.log(err);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
