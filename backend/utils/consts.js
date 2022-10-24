const customError = (res, number, txt) =>
  res.status(number).send({ message: txt });

module.exports = {
  customError,
};
