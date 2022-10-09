const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { customError } = require('../utils/consts');
const { JWT_SECRET } = process.env;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => customError(res, 500, 'We have encountered an error'));
};
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('User Not Found');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'User ID not found');
      } else if (err.type === 404) {
        customError(res, 404, 'We have encountered an error');
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};
const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(req.body.password, 10);
  then((hash) =>
    User.create({
      name,
      about,
      avatar,
      email,
      // adding the hash to the database as password field
      password: hash,
    })
  )
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};

const updateUserData = (req, res) => {
  const id = req.user._id;
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(id, { name, about, avatar }, { runValidators: true })
    .orFail(() => {
      const error = new Error('Invalid user id');

      error.status = 404;

      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'User ID not found');
      } else if (err.status === 404) {
        customError(res, 404, 'Requested resource not found');
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return customError(res, 400, 'Please update these fields name/about');
  }
  return updateUserData(req, res);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return customError(res, 400, 'Please update avatar');
  }
  return updateUserData(req, res);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      customError(res, 401, err.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
