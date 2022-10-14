const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
// router.post('/users', createUser);
router.get('/users/me', getUser);
router.patch('/users/:userId', updateUser);
router.patch('/users/:userId/avatar', updateAvatar);

module.exports = router;
