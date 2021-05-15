const mongoose = require('mongoose');
const { default: validator } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validator: {
      validate: (email) => validator.isEmail(email),
      message: 'Укажите корректные email и пароль',
    },
  },
  password: {
    type: String,
    required: true,
    validator: {
      validate: (password) => validator.isAlphanumeric(password),
      message: 'Укажите корректные email и пароль',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
