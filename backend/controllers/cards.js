const Card = require('../models/card');
const { customError } = require('../utils/consts');
const { processCardWithId } = require('../utils/helpers');

// GET

// const getCards = (req, res) => {
//   Card.find({})
//     .populate('owner')
//     .then((cards) => res.status(200).send({ data: cards }))
//     .catch(() => customError(res, 500, 'We have encountered an error'));
// };
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

const getCards = (_req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => res.status(201).send(card)) // changed from data to cards :data
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params._id;
  console.log(cardId);
  Card.findById(cardId)
    .orFail(() => {
      throw new Error('Card not found');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new Error('You are not authorized to delete this card'));
      } else {
        Card.findByIdAndRemove(cardId).then((deletedCard) =>
          res.status(200).send(deletedCard)
        );
      }
    })
    .catch(next);
};
const updateLikes = (req, res, next, method) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  processCardWithId(
    req,
    res,
    Card.findByIdAndUpdate(cardId, { [method]: { likes: _id } }, { new: true }),
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
