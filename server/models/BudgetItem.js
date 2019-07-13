const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetItemSchema = new Schema({
  budgetCategoryId: String,
  tripId: String,
  budgetItem: String,
  estimatedCost: String,
  notes: String
});

mongoose.model("budgetItems", budgetItemSchema);
