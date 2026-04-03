const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema({
  user: {               
    type: String,
    required: true,
  },

  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});

module.exports = { PositionsSchema };