const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Provider', providerSchema);
