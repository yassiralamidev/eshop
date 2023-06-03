const Product = require('../models/productModel');

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single product by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// update a product by id
const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete a product by id
const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description,category,price,quantity, color , url } = req.body;
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      quantity,
      images:{color:color,url:url}
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

const addImageToProduct = async (req, res) => {
  try {
    // const { name } = req.params;
    // const { color, url } = req.body;
    // const product = await Product.findById(id);
    const product = await Product.findOne({'name':'GoPro HERO11'})
    console.log(product);
    // if (!product) {
    //   return res.status(404).json({ message: 'Product not found' });
    // }
    // product.images.push({ color, url });
    // const updatedProduct = await product.save();
    // res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  addImageToProduct,
  updateProductById,
  deleteProductById,
};
