const { CONFLICT } = require('../constants/error-codes');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = Conflict;
