const { Router } = require('express');
const tagController = require('./tag.controller');

const router = Router();

router.get('/tags', tagController.getTags);

module.exports = router;
