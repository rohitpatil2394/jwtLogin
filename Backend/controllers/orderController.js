const Order = require('../models/Order');
const User = require('../models/User');


// ✅ PLACE ORDER
const placeOrder = async (req, res) => {

  try {

    // GET USER WITH CART PRODUCTS
    const user = await User.findById(req.user._id)
      .populate('cart.product');

    // CHECK EMPTY CART
    if (!user || user.cart.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty'
      });
    }

    let total = 0;

    // ✅ REMOVE NULL PRODUCTS
    const items = user.cart
      .filter(item => item.product)
      .map(item => {

        total +=
          (item.product?.price || 0) *
          (item.quantity || 1);

        return {
          product: item.product._id,
          quantity: item.quantity || 1
        };
      });

    // CHECK VALID ITEMS
    if (items.length === 0) {
      return res.status(400).json({
        message: 'Invalid cart items'
      });
    }

    // CREATE ORDER
    const order = await Order.create({
      user: user._id,
      items,
      totalAmount: total
    });

    // CLEAR CART
    user.cart = [];

    await user.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
};


// ✅ USER ORDERS
const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id
    })
    .populate('items.product');

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


// ✅ ADMIN ORDERS
const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate('items.product')
      .populate('user', 'name email');

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};


module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders
};