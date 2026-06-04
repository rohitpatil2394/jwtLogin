const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getAllOrders
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');
const { notAdmin } = require('../middleware/notAdminMiddleware');

const router = express.Router();

// USER ROUTES
router.post('/', protect, notAdmin, placeOrder);
router.get('/my', protect, notAdmin, getMyOrders);

// ADMIN ROUTE
router.get('/all', protect, getAllOrders);

module.exports = router;