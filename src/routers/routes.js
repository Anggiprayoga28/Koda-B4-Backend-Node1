const express = require('express');
const AuthController = require('../controllers/auth.controller');
const ProductController = require('../controllers/product.controller');

const router = express.Router();


router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);


router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.create);
router.patch('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

module.exports = router;
