// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   cretedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Service', serviceSchema);

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Added category
  location: { type: String, required: true }, // Added location
  image: { type: String }, // Image can be stored as a URL or file path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);

