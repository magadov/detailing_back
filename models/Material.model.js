const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    volumeType: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
    },
    left: {
      type: Number,
      default: 0,
    },
    direction: [
      {
        volume: {
          type: Number,
          default: 0,
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
