const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  getCreateCardsSchema,
  getDeleteCardsSchema,
  getLikeCard,
 } = require('../utils/validators');

router.get('/', getCards);
router.delete('/:cardId', celebrate(getDeleteCardsSchema), deleteCard);
router.post('/', celebrate(getCreateCardsSchema), createCard);
router.patch('/:cardId', celebrate(getLikeCard), likeCard);
router.patch('/:cardId', celebrate(getLikeCard), dislikeCard);

module.exports = router;
