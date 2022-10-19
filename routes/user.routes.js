const { Router } = require('express');
const { body } = require('express-validator');
const checkValidationErrors = require('../middlewares/check-validation-errors.middleware');
const userController = require('../controllers/user.controller');

const router = Router();

router.post(
  '/users',
  body('user.username')
    .trim()
    .isLength({ min: 1 })
    .withMessage("can't be blank"),
  body('user.email')
    .trim()
    .isLength({ min: 1 })
    .withMessage("can't be blank")
    .isEmail()
    .withMessage('is invalid'),
  body('user.password')
    .trim()
    .isLength({ min: 1 })
    .withMessage("can't be blank"),
  checkValidationErrors,
  userController.register
);

router.post(
  '/users/login',
  body('user.email').trim().isLength({ min: 1 }).withMessage("can't be blank"),
  body('user.password')
    .trim()
    .isLength({ min: 1 })
    .withMessage("can't be blank"),
  checkValidationErrors,
  userController.login
);

module.exports = router;
