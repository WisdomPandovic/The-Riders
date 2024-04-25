const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  // Array to store image URLs
  images: [{ type: String, required: true, maxItems: 4 }],
});

module.exports = mongoose.model('Product', productSchema);
