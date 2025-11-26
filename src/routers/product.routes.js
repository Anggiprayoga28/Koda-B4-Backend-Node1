import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import upload from '../lib/upload.js';
import { 
  createProductValidation, 
  updateProductValidation, 
  getProductValidation, 
  deleteProductValidation, 
  queryProductValidation, 
  validate 
} from '../validators/product.validators.js';

const router = Router();

/**
 * GET /products
 * @summary Get all products with search, filter, and sort
 * @tags Products
 * @param {string} search.query - Search by name or description
 * @param {number} minPrice.query - Minimum price filter
 * @param {number} maxPrice.query - Maximum price filter
 * @param {string} sortBy.query.enum:name,price,stock,createdAt - Sort field
 * @param {string} order.query.enum:asc,desc - Sort order
 * @return {object} 200 - Success response with products list
 */
router.get('/', queryProductValidation, validate, ProductController.getAll);

/**
 * GET /products/{id}
 * @summary Get product by ID
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @return {object} 200 - Success response with product data
 * @return {object} 404 - Product not found
 */
router.get('/:id', getProductValidation, validate, ProductController.getById);

/**
 * POST /products
 * @summary Create new product with image upload
 * @tags Products
 * @param {Upload} request.body.required - Product details - multipart/form-data
 * @consumes multipart/form-data
 * @return {object} 201 - Product created successfully
 * @return {object} 400 - Validation error
 */
router.post('/', upload.single('image'), createProductValidation, validate, ProductController.create);

/**
 * Upload
 * @typedef {object} Upload
 * @property {string} name.required - Product name
 * @property {string} description - Product description
 * @property {number} price.required - Product price
 * @property {number} stock - Product stock quantity
 * @property {string} image - Product image - binary
 */

/**
 * PATCH /products/{id}
 * @summary Update product with optional image upload
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @param {Upload} request.body.required - Product details - multipart/form-data
 * @consumes multipart/form-data
 * @return {object} 200 - Product updated successfully
 * @return {object} 404 - Product not found
 */
router.patch('/:id', upload.single('image'), updateProductValidation, validate, ProductController.update);

/**
 * DELETE /products/{id}
 * @summary Delete product
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @return {object} 200 - Product deleted successfully
 * @return {object} 404 - Product not found
 */
router.delete('/:id', deleteProductValidation, validate, ProductController.delete);

export default router;