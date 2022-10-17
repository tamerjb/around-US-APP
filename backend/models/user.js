const mongoose = require('mongoose');
const { urlRegex } = require('../utils/consts');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: [2, 'The minimum length of About is 2'],
    maxlength: [30, 'The maximum length of About is 30'],
  },
  avatar: {
    type: String,
    default: 'link',
    validate: {
      validator(value) {
        return validator.isUrl(value);
      },
      message: 'Invalid Link',
    },
  },
  email: {
    type: String,
    required: [true, 'The "Avatar" field must be filled in.'],
    unique: true,

    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Invalid Email',
    },
  },
  password: {
    type: String,
    required: [true, 'The "Password" field must be filled in.'],
    minlength: [2, 'The minimum length of Password is 2'],
    maxlength: [30, 'The maximum length of Password is 30'],
    select: false, // add the select field

    validate: {
      validator(value) {
        return value;
      },
      message: 'Invalid password',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
