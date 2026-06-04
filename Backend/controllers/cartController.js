const User = require('../models/User');


// ADD TO CART
const addToCart = async (req, res) => {

  try {

    const { productId } = req.body;

    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      i => i.product.toString() === productId
    );

    if (item) {

      item.quantity += 1;

    } else {

      user.cart.push({
        product: productId,
        quantity: 1
      });
    }

    await user.save();

    res.json({
      message: 'Added to cart',
      cart: user.cart
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// GET CART
const getCart = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)
      .populate('cart.product');

    const validCart = user.cart.filter(
      item => item.product
    );

    user.cart = validCart;

    await user.save();

    res.json(validCart);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// REMOVE
const removeFromCart = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      item =>
        item.product.toString() !== req.params.id
    );

    await user.save();

    res.json({
      message: 'Removed from cart'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// UPDATE QUANTITY
const updateQuantity = async (req, res) => {

  try {

    const { quantity } = req.body;

    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      i => i.product.toString() === req.params.id
    );

    if (!item) {

      return res.status(404).json({
        message: 'Item not found'
      });
    }

    item.quantity = quantity;

    await user.save();

    res.json({
      message: 'Quantity updated'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
};