const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  city: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
