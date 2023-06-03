const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  addImageToProduct
} = require('../controllers/productController');

// get all products
router.get('/', getAllProducts);

// get a single product by id
router.get('/:id', getProductById);

// create a new product
router.post('/create', createProduct);

// update a product by id
router.put('/:id', updateProductById);

// delete a product by id
router.delete('/:id', deleteProductById);


module.exports = router;
