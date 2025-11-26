const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { 
  registerValidation, 
  loginValidation, 
  validate 
} = require('../validators/auth.validator');

const router = express.Router();

/**
 * POST /auth/register
 * @summary Register new user
 * @tags Auth
 * @param {object} request.body.required - {username: string, email: string, password: string}
 * @return {object} 201 - Registration successful
 * @return {object} 400 - Validation error or email/username already exists
 */
router.post('/register', registerValidation, validate, AuthController.register);

/**
 * POST /auth/login
 * @summary Login user
 * @tags Auth
 * @param {object} request.body.required - {email: string, password: string}
 * @return {object} 200 - Login successful
 * @return {object} 401 - Invalid credentials
 */
router.post('/login', loginValidation, validate, AuthController.login);

module.exports = router;