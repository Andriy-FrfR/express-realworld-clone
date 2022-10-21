const { Router } = require('express');
const { body } = require('express-validator');
const authRequiredMiddleware = require('../../middlewares/auth-required.middleware');
const checkValidationErrorsMiddleware = require('../../middlewares/check-validation-errors.middleware');
const articleController = require('./article.controller');

const router = Router();

router.post(
  '/',
  body('article.title')
    .trim()
    .isLength({ min: 1 })
    .withMessage("can't be blank"),
  body('article.description')
    .trim()
    .isLength({ min: 1 })
    .withMessage("can't be blank"),
  body('article.body')
    .trim()
    .isLength({ min: 1 })
    .withMessage("can't be blank"),
  body('article.tagList')
    .optional({ checkFalsy: true })
    .isArray()
    .withMessage('should be list'),
  body('article.tagList.*').isString().withMessage('should be list of strings'),
  authRequiredMiddleware,
  checkValidationErrorsMiddleware,
  articleController.createArticle
);

module.exports = router;
