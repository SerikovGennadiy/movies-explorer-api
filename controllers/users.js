const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SIGN_WORD } = require('../config');

const NotFoundError = require('../errors/not-found-error');
const DefaultError = require('../errors/internal-server-error');
const NotValidError = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/conflict');

const User = require('../model/user');

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Пользователя нет. Зарегистрируйтесь');
      } else {
        bcrypt.compare(password, user.password, (error, isValid) => {
          if (error) {
            const err = new Unauthorized('В доступе отказано');
            next(err);
          } else if (isValid) {
            const token = jwt.sign({ id: user._id }, JWT_SIGN_WORD, { expiresIn: '7d' });

            const userForAnswer = JSON.parse(JSON.stringify(user));
            delete userForAnswer.password;

            res
              .cookie('jwt', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 604800000,
              })
              .status(200).send({ user: userForAnswer });
          } else {
            const err = new Unauthorized('В доступе отказано');
            next(err);
          }
        });
      }
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res
      .cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(1),
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .send({ isLogOut: true, message: 'сессия завершена' });
  } catch (err) {
    next(err);
  }
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt
    .hash(password, 5)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const userForAnswer = JSON.parse(JSON.stringify(user));
      delete userForAnswer.password;
      res.status(201).send({ data: userForAnswer });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotValidError('Укажите корректные имя, email и пароль');
      } else if (err.name === 'MongoError') {
        throw new Conflict('Пользователь с такими данными уже записан');
      } else {
        throw new DefaultError('Ошибка по умолчанию.');
      }
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { id } = req.currentUser;
  User.findById(id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new NotValidError('Невалидный id');
      } else {
        throw new DefaultError('Ошибка по умолчанию.');
      }
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.currentUser.id;
  User.findByIdAndUpdate(userId, { name, email },
    {
      new: true,
      runValidators: true,
    })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new NotValidError('Невалидный id');
      } else if (err.name === 'ValidationError') {
        throw new NotValidError('Переданы некорректные данные при обновлении профиля.');
      } else {
        throw new DefaultError('Ошибка по умолчанию.');
      }
    })
    .catch(next);
};

module.exports = {
  login,
  logout,
  createUser,
  updateUserProfile,
  getCurrentUser,
};
