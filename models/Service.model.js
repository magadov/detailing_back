const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  car: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Car",
  },
  client: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Client",
  },
  cost: [
    {
      type: Number,
      default: 0,
    },
  ],
  note: {
    type: String
  }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
