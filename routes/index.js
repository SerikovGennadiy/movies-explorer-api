const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error');

const { requestLogger, errorLogger } = require('../middlewares/logger');

const authRouter = require('./auth');
const checkClientToken = require('../middlewares/check-client-token');
const userRouter = require('./user');
const movieRouter = require('./movie');

router.use(requestLogger);

router.use(authRouter);
router.use(checkClientToken);
router.use(userRouter);
router.use(movieRouter);

router.use('*', (res, req, next) => {
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
});

router.use(errorLogger);

module.exports = router;
