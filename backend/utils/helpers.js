class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

const processCardWithId = (req, res, action, next) =>
  action
    .orFail(() => {
      throw new NotFoundError('No card found with this Id');
    })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        next(new NotFoundError('No card found with this Id'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });

const processUserWithId = (req, res, action, next) =>
  action
    .orFail(() => {
      throw new NotFoundError('No user found with this Id');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });

module.exports = { processCardWithId, processUserWithId };
