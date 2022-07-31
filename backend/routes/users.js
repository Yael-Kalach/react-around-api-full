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
router.get('/me', getUserById);
router.get('/:userId', celebrate(getCurrentUserSchema), getUserById);
router.put('/me/profile', celebrate(updateUserSchema), updateProfile);
router.put('/me/avatar', celebrate(updateAvatarSchema), updateAvatar);


module.exports = router;
