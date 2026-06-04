const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// Add Product (Protected)
const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: result.secure_url,
      category: req.body.category,
      stock: req.body.stock
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("ERROR:", error); // 🔥 show real error
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Single Product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// DELETE PRODUCT (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = { addProduct, getProducts, getProductById, deleteProduct };