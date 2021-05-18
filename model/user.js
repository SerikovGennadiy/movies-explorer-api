const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Укажите корректные email'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Укажите корректные email',
    },
  },
  password: {
    type: String,
    required: [true, 'Укажите корректные пароль'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Имя должно занимать от 2 до 30 символов'],
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
