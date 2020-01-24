const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  DOE:{
    type: Date,
    required: true
  },
  Year: {
    type: String,
    required: true
  },
  Major: {
    type: String,
    required: true
  },
  GPA: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Student', studentSchema)