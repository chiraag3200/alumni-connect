
const mongoose = require('mongoose');
const validator = require("validator");

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  student_id: {
    type: String,
    required: true
  },
  alumni_id: {
    type: String,
    required: true
  },
  is_approved: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
