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

router.get('/cards', getCards);
router.post('/cards', validateCardBody, createCard);
router.delete('/:cardId', validateObjectId, deleteCard);
router.put('/:cardId/likes', validateObjectId, likeCard);
router.delete('/:cardId/likes', validateObjectId, unlikeCard);

module.exports = router;
