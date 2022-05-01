const mongoose = require('mongoose');
const validator = require("validator");

const Schema = mongoose.Schema;

const alumniSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot conatin "password"');
      }
    }
  },
  skills: {
    type : Array ,
    "default" : ["c++", "python"]
  },
  employers: {
    type : Array ,
    "default" : ["amazon", "google", "uber"]
  },
  token: { 
    type: String
  },
}, {
  timestamps: true,
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
