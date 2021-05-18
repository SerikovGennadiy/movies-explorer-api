const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error');

const authRouter = require('./auth');
const checkClientToken = require('../middlewares/check-client-token');
const userRouter = require('./user');
const movieRouter = require('./movie');

router.use(authRouter);
router.use(checkClientToken);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (res, req, next) => {
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
});

module.exports = router;
