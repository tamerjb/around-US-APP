const router = require('express').Router();
const {
  validateUserBody,
  validateAuthentication,
} = require('../middleware/validation');
const { createUser, login } = require('../controllers/users');
const auth = require('../middleware/auth');
const usersRoute = require('./users');
const cardsRoute = require('./cards');
// const nonRoute = require('./nonRoute');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);

router.use('/users', usersRoute);
router.use('/cards', cardsRoute);
// router.use('*', nonRoute);

module.exports = router;
