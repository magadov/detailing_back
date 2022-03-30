const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  VIN: {
    type: String,
    required: true,
  },
  vinData: [
    {
      mark: {
        type: String
      },
      model: {
        type: String
      },
      color: {
        type: String
      },
      yearOfRelease: {
        type: Date
      }

    },
  ],
  upgradeDate: {
    type: Date,
    default: null,
    client: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Client",
    },
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
