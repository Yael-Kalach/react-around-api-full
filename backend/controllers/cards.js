const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail()
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  console.log('in createCard')
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      console.log(err)
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { owner } = req.body;
  console.log(owner)
  console.log(req.user._id)
  Card.authorizeAndDelete({ cardId, reqUserId: req.user._id, ownerId: owner })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(err))
);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send(card))
    .catch((err) => next(err))
);

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
