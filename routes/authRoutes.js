const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const validateLogin = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

router.post('/login', validateLogin, authController.login);

module.exports = router;
