const User = require('../models/User');


// ADD TO WISHLIST
const addToWishlist = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    const productId = req.body.productId;

    // CHECK ALREADY EXISTS
    if (user.wishlist.includes(productId)) {

      return res.status(400).json({
        message: 'Already in wishlist'
      });
    }

    user.wishlist.push(productId);

    await user.save();

    res.json({
      message: 'Added to wishlist'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// GET WISHLIST
const getWishlist = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)
      .populate('wishlist');

    res.json(user.wishlist);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// REMOVE FROM WISHLIST
const removeWishlist = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      item => item.toString() !== req.params.id
    );

    await user.save();

    res.json({
      message: 'Removed from wishlist'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist
};