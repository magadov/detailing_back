const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  phoneNumber: {
    type: Number
  },
  VIN: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Car'
  }
})