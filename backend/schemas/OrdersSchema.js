const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  user: {               
    type: String,
    required: true,
  },

  name: String,
  qty: Number,
  price: Number,
  mode: String,
  product: String,      // 🔥 ADD THIS (CNC / MIS)
});

module.exports = { OrdersSchema };