const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
    required: true,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: [2, 'The minimum length of About is 2'],
    maxlength: [30, 'The maximum length of About is 30'],
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL',
    },
  },
  email: {
    type: String,
    required: [true, 'The "email" field must be filled in.'],
    unique: true,

    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Valid email is required',
    },
  },
  password: {
    type: String,
    required: [true, 'The "Password" field must be filled in.'],

    select: false, // add the select field
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  const { password, ...rest } = obj;
  return rest;
};

module.exports = mongoose.model('user', userSchema);
