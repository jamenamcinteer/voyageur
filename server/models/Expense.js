const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  budgetCategoryId: String,
  budgetItemId: String,
  tripId: String,
  date: Number,
  cost: String,
  currency: String,
  notes: String,
  originalCost: String,
  summary: String,
  uid: String
});

mongoose.model("expenses", expenseSchema);
