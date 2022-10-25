const router = require('express').Router();
const {
  getUsers,
  updateAvatar,
  getCurrentUser,
  getUserId,
  updateProfile,
} = require('../controllers/users');
const {
  validateProfile,
  validateAvatar,
  validateObjectId,
} = require('../middleware/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateObjectId, getUserId);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
