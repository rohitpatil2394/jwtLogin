const express = require('express');

const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
} = require('../controllers/cartController');

const {
  protect
} = require('../middleware/authMiddleware');

const {
  notAdmin
} = require('../middleware/notAdminMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  notAdmin,
  addToCart
);

router.get(
  '/',
  protect,
  notAdmin,
  getCart
);

router.delete(
  '/:id',
  protect,
  notAdmin,
  removeFromCart
);

router.put(
  '/:id',
  protect,
  notAdmin,
  updateQuantity
);


module.exports = router;