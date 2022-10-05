const User = require('../models/user');
const { customError } = require('../utils/consts');

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
    return customError(res, 400, 'Please update these fields name+about');
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
