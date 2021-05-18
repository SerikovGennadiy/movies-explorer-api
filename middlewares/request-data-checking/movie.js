const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const saveMoviePostedDataCheck = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Поле "страна создания фильма" обязательно для заполнения',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Поле "режиссер фильма" обязательно для заполнения',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "длительность фильма" обязательно для заполнения',
      'number.base': 'Длительность фильма выражается числом',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Поле "год выпуска фильма" обязательно для заполнения',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле "описание фильма" обязательно для заполнения',
    }),
    image: Joi.string().required()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error('object.pattern')))
      .messages({
        'any.required': 'Поле "ссылка на постер фильма" обязательно для заполнения',
        'object.pattern': 'Укажите корректный URL ссылки на постер',
      }),
    trailer: Joi.string().required()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error('object.pattern')))
      .messages({
        'any.required': 'Поле "ссылка на трейлер фильма" обязательно для заполнения',
        'object.pattern': 'Укажите корректный URL на трейлер фильма',
      }),
    thumbnail: Joi.string().required()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error('object.pattern')))
      .messages({
        'any.required': 'Поле "ссылка на миниатюрное изображение постера к фильму" обязательно для заполнения',
        'object.pattern': 'Укажите корректный URL ссылки на миниатюрное изображение постера к фильму',
      }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле "id фильма, который содержится в ответе сервиса MoviesExplorer" обязательно для заполнения',
      'number.base': 'id фильма, который содержится в ответе сервиса MoviesExplorer, выражается числом',
    }),
    nameRU: Joi.string().required()
      .custom((value, helpers) => (validator.isAlpha(value, 'ru-RU') ? value : helpers.error('object.pattern')))
      .messages({
        'any.required': 'Поле "название фильма на русском языке" обязательно для заполнения',
        'object.pattern': 'Название фильма должно быть на русском языке',
      }),
    nameEN: Joi.string().required()
      .custom((value, helpers) => (validator.isAlpha(value, 'en-US') ? value : helpers.error('object.pattern')))
      .messages({
        'any.required': 'Поле "название фильма на английском языке" обязательно для заполнения',
        'object.pattern': 'Название фильма должно быть на английском языке',
      }),
  }),
});

const deleteMovieParamDataCheck = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required()
      .custom((value, helpers) => (validator.isMongoId(value) ? value : helpers.error('object.pattern')))
      .messages({
        'any.required': 'Поле "id фильма" обязательно для заполнения',
        'object.pattern': 'Укажите корректный id фильма, удаляемого из коллекции пользователя',
      }),
  }),
});

module.exports = {
  saveMoviePostedDataCheck,
  deleteMovieParamDataCheck,
};
