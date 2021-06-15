const mongoose = require('mongoose');
const { default: validator } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Указан некорректный URL постера',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Указан некорректный URL трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Указан некорректный URL мини-постера',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (name) => validator.isAlpha(name, 'ru-RU', { ignore: /[\-,:«»\s+]/g }),
      message: 'Наименование должно быть на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (name) => validator.isAlpha(name, 'en-US', { ignore: /[\-,:«»\s+]/g }),
      message: 'Наименование должно быть на английском языке',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
