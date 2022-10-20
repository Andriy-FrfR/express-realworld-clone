const { Router } = require('express');
const router = Router();
const profileController = require('../controllers/profile.controller');

router.get('/profiles/:username', profileController.getProfile);

module.exports = router;
