const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictError = require('../utils/errors/ConflictError');

const UnauthorizedError = require('../utils/errors/UnauthorizedError');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const processUserWithId = (req, res, action, next) =>
  action
    .orFail(() => {
      throw new Error('No user found with this Id');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error(err.message));
      } else if (err.name === 'ValidationError') {
        next(new Error(err.message));
      } else {
        next(err);
      }
    });

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  processUserWithId(req, res, User.findById(req.user._id), next);
};
const getUserId = (req, res, next) => {
  processUserWithId(req, res, User.findById(req.params._id), next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  processUserWithId(
    req,
    res,
    User.findByIdAndUpdate(
      _id,
      { name, about },
      { new: true, runValidators: true }
    ),
    next
  );
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  processUserWithId(
    req,
    res,
    User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true }),
    next
  );
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ data: user, token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

module.exports = {
  getUsers,
  getUserId,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
