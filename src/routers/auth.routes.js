import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { registerValidation, loginValidation, validate } from '../validators/auth.validators.js';

const router = Router();

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

export default router;