const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const loginValidate = [
    body('email')
        .notEmpty()
        .withMessage('Email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const registerValidate = [
    body('email').notEmpty().withMessage('Please enter you email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Please enter your password').isLength({min : 6}).withMessage('Password must contain at least 6 characters')
];

router.post('/login', loginValidate, controller.login);
router.post('/register', registerValidate, controller.register)
module.exports = router;