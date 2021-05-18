const jwt = require('jsonwebtoken');

const { JWT_SIGN_WORD } = require('../config');

const Unauthorized = require('../errors/unauthorized');

const checkClientToken = (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    const unauth = new Unauthorized('Авторизация не прошла');
    next(unauth);
  } else {
    const token = req.cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, JWT_SIGN_WORD);
      req.currentUser = payload;
    } catch (err) {
      const unauth = new Unauthorized('Авторизация не прошла');
      next(unauth);
    }
    next();
  }
};

module.exports = checkClientToken;
