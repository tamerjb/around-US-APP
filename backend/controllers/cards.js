const Card = require('../models/card');
const { processCardWithId } = require('../utils/helpers');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');

// GET

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST
const createCard = (req, res, next) => {
  const { name, link, owner } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => res.status(201).send(card)) // changed from data to cards :data
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => {
      throw new NotFoundError('Card Not Found');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('You are not authorized to delete this card'));
      } else {
        Card.findByIdAndRemove(id).then((deletedCard) =>
          res.status(200).send(deletedCard)
        );
      }
    })
    .catch(next);
};
// { id = used for card id} , { _id = used for user id}
const updateLikes = (req, res, next, method) => {
  const { id } = req.params;
  const { _id } = req.user;
  processCardWithId(
    req,
    res,
    Card.findByIdAndUpdate(id, { [method]: { likes: _id } }, { new: true }),
    next
  );
};

const likeCard = (req, res, next) => updateLikes(req, res, next, '$addToSet');

const unlikeCard = (req, res, next) => updateLikes(req, res, next, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
