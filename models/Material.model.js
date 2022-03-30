const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    volumeType: {
      type: String,
      enum: ["кг", "шт", "л"],
      default: "шт"
    },
    price: {
      type: Number,
    },
    left: {
      type: Number,
    },
    direction: [
      {
        volume: {
          type: Number
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
