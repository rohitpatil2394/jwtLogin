const express = require('express');

const {
  addToWishlist,
  getWishlist,
  removeWishlist
} = require('../controllers/wishlistController');

const { protect } = require('../middleware/authMiddleware');

const { notAdmin } = require('../middleware/notAdminMiddleware');

const router = express.Router();

router.post('/', protect, notAdmin, addToWishlist);

router.get('/', protect, notAdmin, getWishlist);

router.delete('/:id', protect, notAdmin, removeWishlist);

module.exports = router;