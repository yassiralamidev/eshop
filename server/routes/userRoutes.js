const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  addProductToCart,
  deleteProductFromCart,
  editProduct,
  login,
  updateUserPassword
} = require('../controllers/userController');

// get all users
router.get('/all', getAllUsers);

// get a user with id
router.post('/account/', getUserById);

// create a user
router.post('/account/create', createUser);

// update user password
router.post('/account/update_password', updateUserPassword);

// delete a user
router.delete('/account/delete', deleteUserById);

// add a product to a user cart 
router.post('/cart/add',addProductToCart);

// delete a product from a user cart 
router.post('/cart/delete',deleteProductFromCart);

// edit a product
router.put('/cart/edit',editProduct);

// user login
router.post('/auth',login);

// checkout
router.post('/cart/checkout')



module.exports = router;
