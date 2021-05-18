const { NO_FOUND } = require('../constants/error-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NO_FOUND;
  }
}

module.exports = NotFoundError;
