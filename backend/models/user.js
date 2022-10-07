const mongoose = require('mongoose');
const { urlRegex } = require('../utils/consts');
import isEmail from 'validator/lib/isEmail';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in.'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },
  about: {
    type: String,
    required: [true, 'The "About" field must be filled in.'],
    minlength: [2, 'The minimum length of About is 2'],
    maxlength: [30, 'The maximum length of About is 30'],
  },
  avatar: {
    type: String,
    required: [true, 'The "Avatar" field must be filled in.'],
    validate: {
      validator(value) {
        return urlRegex.test(value);
      },
      message: 'Invalid URL',
    },
  },
  email: {
    type: String,
    required: [true, 'The "Avatar" field must be filled in.'],

    validate: {
      validator(value) {
        return isEmail(value);
      },
      message: 'Invalid Email',
    },
  },
  password: {
    type: String,
    required: [true, 'The "Password" field must be filled in.'],
    minlength: [2, 'The minimum length of Password is 2'],
    maxlength: [30, 'The maximum length of Password is 30'],
    validate: {
      validator(value) {
        return value;
      },
      message: 'Invalid password',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
