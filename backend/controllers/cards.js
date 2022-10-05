const Card = require('../models/card');
const { customError } = require('../utils/consts');

// GET

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => customError(res, 500, 'We have encountered an error'));
};
// POST
const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    likes,
    owner: _id,
  })
    .then((card) => res.status(201).send({ data: card }))
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

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ cardId })
    .orFail(() => {
      const error = new Error('no Card found for the specifed id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Invaild Card ID');
      } else if (err.statusCode === 404) {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'We have encountered an error');
      }
    });
};
const updateLikes = (req, res, operator) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId, // searches for the card on the database
    { [operator]: { likes: _id } }, // $pull / $addToSet
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card is not found');
      error.status = 404;

      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Card id is incorrect');
      } else if (err.status === 404) {
        customError(res, 404, 'Invalid user id');
      } else {
        customError(res, 500, 'Something went wrong');
      }
    });
};

const likeCard = (req, res) => updateLikes(req, res, { $addToSet: {} });

const unlikeCard = (req, res) => updateLikes(req, res, { $pull: {} });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
