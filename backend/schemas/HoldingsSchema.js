const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
  user: {              
    type: String,
    required: true,
  },

  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
});

module.exports = { HoldingsSchema };