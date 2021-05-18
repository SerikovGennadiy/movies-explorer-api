require('dotenv').config();

const {
  NODE_ENV = 'production',
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SIGN_WORD = 'SECRET',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URL,
  JWT_SIGN_WORD,
};
