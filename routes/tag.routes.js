const { Router } = require('express');
const tagController = require('../controllers/tag.controller');

const router = Router();

router.get('/tags', tagController.getTags);

module.exports = router;
