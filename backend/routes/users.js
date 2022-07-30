const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');
const {
  getCurrentUserSchema,
  updateUserSchema,
  updateAvatarSchema,
 } = require('../utils/validators');

router.get('/', getUsers);
router.get('/:userId', celebrate(getCurrentUserSchema), getUserById);
router.patch('/:userId', celebrate(updateUserSchema), updateProfile);
router.patch('/:userId', celebrate(updateAvatarSchema), updateAvatar);
// get the user data
router.get('/users/me', celebrate(getCurrentUserSchema), getUserInfo);


module.exports = router;
