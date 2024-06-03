const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  kryptonian: { type: mongoose.Schema.Types.ObjectId, ref: 'Kryptonian', required: true },
  filename: { type: String, required: true },
  data: { type: String, required: true },
  contentType: { type: String, required: true }
});

module.exports = mongoose.model('File', FileSchema);
