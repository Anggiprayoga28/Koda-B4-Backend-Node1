const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();
/**
 * GET /products
 * @summary Get all products with search, filter, and sort
 * @tags Products
 * @param {string} search.query
 * @param {number} minPrice.query
 * @param {number} maxPrice.query
 * @param {string} sortBy.query
 * @param {string} order.query
 * @return {object} 200
 */
router.get('/', ProductController.getAll);

/**
 * GET /products/{id}
 * @summary Get product by ID
 * @tags Products
 * @param {number} id.path.required
 * @return {object} 200
 * @return {object} 404
 */
router.get('/:id', ProductController.getById);

/**
 * POST /products
 * @summary Create new product
 * @tags Products
 * @param {object} request.body.required
 * @return {object} 201
 * @return {object} 400
 */
router.post('/', ProductController.create);

/**
 * PATCH /products/{id}
 * @summary Update product
 * @tags Products
 * @param {number} id.path.required
 * @param {object} request.body.required
 * @return {object} 200
 * @return {object} 404
 */
router.patch('/:id', ProductController.update);

/**
 * DELETE /products/{id}
 * @summary Delete product
 * @tags Products
 * @param {number} id.path.required
 * @return {object} 200
 * @return {object} 404
 */
router.delete('/:id', ProductController.delete);

module.exports = router;