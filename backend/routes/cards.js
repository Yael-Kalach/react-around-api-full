const router = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

router.get('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), getCards);

router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), createCard);

router.patch('/:cardId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), likeCard);

router.patch('/:cardId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
