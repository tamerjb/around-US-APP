const urlRegex = /(http(s)?:\/\/.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const customError = (res, number, txt) => res.status(number).send({ message: txt });

module.exports = {
  customError,
  urlRegex,
};
