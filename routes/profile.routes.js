const { Router } = require('express');
const router = Router();
const profileController = require('../controllers/profile.controller');
const authRequiredMiddleware = require('../middlewares/auth-required.middleware');

router.get('/:username', profileController.getProfile);

router.post(
  '/:username/follow',
  authRequiredMiddleware,
  profileController.followUser
);

router.delete(
  '/:username/follow',
  authRequiredMiddleware,
  profileController.unfollowUser
);

module.exports = router;
