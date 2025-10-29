const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
