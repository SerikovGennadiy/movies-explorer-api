const { NO_VALID } = require('../constants/error-codes');

class NotValidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NO_VALID;
  }
}

module.exports = NotValidError;
