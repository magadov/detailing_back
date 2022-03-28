const mongoose = require("mongoose")

const carSchema = mongoose.Schema({
  VIN: {
    type: String,
    required: true
  }
});

const Car = mongoose.model("Car", carSchema)
module.exports = Car;