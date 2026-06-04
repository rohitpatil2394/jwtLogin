const express = require('express');

const router = express.Router();

const {
  saveAddress,
  getAddress
} = require('../controllers/addressController');

const {
  protect
} = require('../middleware/authMiddleware');

router.post('/', protect, saveAddress);

router.get('/', protect, getAddress);

module.exports = router;