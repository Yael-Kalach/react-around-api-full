const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
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


module.exports = router;
