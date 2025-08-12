const mongoose = require('mongoose');

const GroceryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  expiryDate: { type: Date }
});

module.exports = mongoose.model('GroceryItem', GroceryItemSchema);
