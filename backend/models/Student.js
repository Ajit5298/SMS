const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  enrollmentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', StudentSchema);
