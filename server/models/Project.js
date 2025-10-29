const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  completion: { type: Date },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
