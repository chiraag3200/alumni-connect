const mongoose = require('mongoose');
const validator = require("validator");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
    "default" : []
  },
  college_start_year: {
    type: Number,
    required: false,
    trim: true,
    validate: {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  college_end_year: {
    type: Number,
    required: false,
    trim: true,
    validate: {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  token: {
    type: String
  },
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
