const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');
const {
  validateObjectId,
  validateCardBody,
} = require('../middleware/validation');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:id', validateObjectId, deleteCard);
router.put('/:id/likes', validateObjectId, likeCard);
router.delete('/:id/likes', validateObjectId, unlikeCard);

module.exports = router;
