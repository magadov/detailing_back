const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
