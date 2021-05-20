const { UNAUTHORIZED } = require('../constants/error-codes');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
