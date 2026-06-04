const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  fullName: String,

  mobile: String,

  address: String,

  city: String,

  pincode: String

}, { timestamps: true });

module.exports = mongoose.model(
  'Address',
  addressSchema
);