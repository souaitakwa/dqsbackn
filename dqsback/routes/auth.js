const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
    body('role').trim().isLength({ min: 5 }).not().isEmpty(),
    body('picture').trim().isLength({ min: 1 }).not().isEmpty(),
    body('description').trim().isLength({ min: 5 }).not().isEmpty(),
    body('element').trim().isLength({ min: 5 }).not().isEmpty(),
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/', authController.fetchAll);

router.delete('/:id', authController.deleteuser);


module.exports = router;