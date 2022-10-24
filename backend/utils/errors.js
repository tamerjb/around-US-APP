const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;
const SERVER_ERROR = 500;

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = {
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  SERVER_ERROR,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
};
