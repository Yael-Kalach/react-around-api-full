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
router.post('/', celebrate(getCreateCardsSchema), createCard);
router.delete('/:cardId', celebrate(getDeleteCardsSchema), deleteCard);
router.put('/:cardId/likes', celebrate(getLikeCard), likeCard);
router.put('/:cardId/likes', celebrate(getLikeCard), dislikeCard);

module.exports = router;
