const Address = require('../models/Address');


// SAVE ADDRESS
exports.saveAddress = async (req, res) => {

  try {

    const address = new Address({

      user: req.user.id,

      fullName: req.body.fullName,

      mobile: req.body.mobile,

      address: req.body.address,

      city: req.body.city,

      pincode: req.body.pincode
    });

    await address.save();

    res.status(201).json(address);

  } catch (err) {

    res.status(500).json({
      message: 'Save failed'
    });
  }
};


// GET ADDRESS
exports.getAddress = async (req, res) => {

  try {

    const address = await Address.findOne({
      user: req.user.id
    });

    res.json(address);

  } catch (err) {

    res.status(500).json({
      message: 'Error'
    });
  }
};