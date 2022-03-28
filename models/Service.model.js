const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  car: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Car',
  }],
  client: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Client'
  }
})