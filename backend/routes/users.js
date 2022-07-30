const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), getUserById);

router.patch('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), updateProfile);

router.patch('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), updateAvatar);

// get the user data
router.get('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), getUserInfo);


module.exports = router;
