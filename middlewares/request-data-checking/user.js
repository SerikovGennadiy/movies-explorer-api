const { celebrate, Joi } = require('celebrate');

const updateProfilePostedDataCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Пароль обязателен для заполнения',
        'string.min': 'Наименование должно занимать от 2 до 30 символов',
        'string.max': 'Наименование должно занимать от 2 до 30 символов',
      }),
    email: Joi.string().required().email().messages({
      'string.email': 'Укажите корректный email',
      'any.required': 'Email обязателен для заполнения',
    }),
  }).unknown(true),
}, {}, { mode: 'full' });

const signUpPostedDataCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Пароль обязателен для заполнения',
        'string.min': 'Наименование должно занимать от 2 до 30 символов',
        'string.max': 'Наименование должно занимать от 2 до 30 символов',
      }),
    email: Joi.string().required().email().messages({
      'string.email': 'Укажите корректный email',
      'any.required': 'Email обязателен для заполнения',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль обязателен для заполнения',
    }),
  }),
});

const signInPostedDataCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Укажите корректный email',
      'any.required': 'Email обязателен для заполнения',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль обязателен для заполнения',
    }),
  }),
});

module.exports = {
  updateProfilePostedDataCheck,
  signInPostedDataCheck,
  signUpPostedDataCheck,
};
