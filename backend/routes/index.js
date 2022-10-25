const router = require('express').Router();
const {
  validateUserBody,
  validateAuthentication,
} = require('../middleware/validation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');

const auth = require('../middleware/auth');
const usersRoute = require('./users');
const cardsRoute = require('./cards');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);

router.use('/users', usersRoute);
router.use('/cards', cardsRoute);
router.use('*', (req, res, next) => {
  next(new NotFoundError('The requested resource was not found'));
});

module.exports = router;
