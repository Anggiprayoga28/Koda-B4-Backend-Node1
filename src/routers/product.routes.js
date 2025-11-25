const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();
const upload = require('../lib/upload'); 

/**
 * GET /products
 * @summary Get all products with search, filter, and sort
 * @tags Products
 * @param {string} search.query
 * @param {number} minPrice.query
 * @param {number} maxPrice.query
 * @param {string} sortBy.query.enum:name,price,stock,createdAt
 * @param {string} order.query.enum:asc,desc
 * @return {object} 200
 */
router.get('/', ProductController.getAll);

/**
 * GET /products/{id}
 * @summary Get product by ID
 * @tags Products
 * @param {string} id.path.required
 * @return {object} 200
 * @return {object} 404
 */
router.get('/:id', ProductController.getById);

/**
 * POST /products
 * @summary Create new product
 * @tags Products
 * @param {string} name.form.required 
 * @param {string} description.form
 * @param {number} price.form.required
 * @param {number} stock.form
 * @param {file} image.form
 * @return {object} 201
 * @return {object} 400
 */
router.post('/', upload.single('image'), ProductController.create);

/**
 * PATCH /products/{id}
 * @summary Update product
 * @tags Products
 * @param {string} id.path.required
 * @param {string} name.form
 * @param {string} description.form
 * @param {number} price.form
 * @param {number} stock.form 
 * @param {file} image.form
 * @return {object} 200
 * @return {object} 404
 */
router.patch('/:id', upload.single('image'), ProductController.update);

/**
 * DELETE /products/{id}
 * @summary Delete product
 * @tags Products
 * @param {string} id.path.required
 * @return {object} 200
 * @return {object} 404
 */
router.delete('/:id', ProductController.delete);

module.exports = router;