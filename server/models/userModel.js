const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [{
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
  orders: [{
    products: [{
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      color: { type: String, required: true },
      quantity: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    date: { type: Date, required: true },
  }],
  accDate: { type: Date, required: true },
});

module.exports = mongoose.model('User', userSchema);
