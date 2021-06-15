/* eslint-disable no-unused-vars */
const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    console.log(err);
    res
      .status(400)
      .send({
        message: err.details.get('body').details[0].message,
      });
  } else {
    const { statusCode = 500, message } = err;
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
};

module.exports = errorHandler;
