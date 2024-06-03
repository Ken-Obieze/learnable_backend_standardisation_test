const mongoose = require('mongoose');

const KryptonianSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  apiKey: { type: String, unique: true },
  confirmed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Kryptonian', KryptonianSchema);
