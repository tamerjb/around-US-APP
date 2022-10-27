const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Valid email is required')
      .messages({
        'string.required': 'Email is required',
        'string.email': 'Valid email is required',
      }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters ',
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Name must be at least 2 characters ',
      'string.max': 'Name must be less than 30 characters ',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'About must be at least 2 characters ',
      'string.max': 'About must be less than 30 characters ',
    }),
    avatar: Joi.string()
      .custom(validateURL)
      .message('Invalid URL for avatar link'),
    email: Joi.string()
      .required()
      .email()
      .message('Valid email is required')
      .messages({
        'string.required': 'Email is required',
        'string.email': 'Valid email is required',
      }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters ',
    }),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Name must be at least 2 characters ',
      'string.max': 'Name must be less than 30 characters ',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'About must be at least 2 characters ',
      'string.max': 'About must be less than 30 characters ',
    }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom(validateURL)
      .message('Invalid URL for avatar link'),
  }),
});

// validate the params id
const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Invalid id');
      }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters ',
      'string.max': 'Name must be less than 30 characters ',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'Link is required',
      'string.uri': 'Invalid URL for card link',
    }),
  }),
});

module.exports = {
  validateAuthentication,
  validateUserBody,
  validateProfile,
  validateAvatar,
  validateObjectId,
  validateCardBody,
};
