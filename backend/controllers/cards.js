const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.user._id)
    .orFail((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred on the server' });
      }
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const createCard = (req, res) => {
  console.log(req.user._id);

  Card.create(req.user)
    .then((newCard) => res.send(newCard))
    .catch((err) => next(err));
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .catch((err) => next(err))
);

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .catch((err) => next(err))
);

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
