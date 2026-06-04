const express = require('express');
const multer = require('multer');

const {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct   // ✅ FIXED
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// ADMIN ONLY
router.post('/', protect, adminOnly, upload.single('image'), addProduct);

// PUBLIC
router.get('/', getProducts);
router.get('/:id', getProductById);

// ADMIN DELETE
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;