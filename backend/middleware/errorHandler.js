const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = 500 ? 'Server Error' : err.message;
  res.status(statusCode).send({ message });
  next();
};
module.exports = errorHandler;
