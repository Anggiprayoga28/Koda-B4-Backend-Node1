const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * POST /auth/register
 * @summary Register new user
 * @tags Auth
 * @param {object} request.body.required
 * @return {object} 201
 * @return {object} 400 
 */
router.post('/register', AuthController.register);

/**
 * POST /auth/login
 * @summary Login user
 * @tags Auth
 * @param {object} request.body.required
 * @return {object} 200
 * @return {object} 401
 */
router.post('/login', AuthController.login);

module.exports = router;