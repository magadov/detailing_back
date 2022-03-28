const mongoose = require('mongoose')

const expensesSchema = mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number
  },
  price: {
    type: Number
  },
},
  { timestamps: true }
);

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;