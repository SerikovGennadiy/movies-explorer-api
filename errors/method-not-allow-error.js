const { METHOD_NOT_ALLOWED } = require('../constants/error-codes');

class MethodNotAllowError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = METHOD_NOT_ALLOWED;
  }
}

module.exports = MethodNotAllowError;
